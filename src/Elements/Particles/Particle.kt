package Elements.Particles

import Elements.Animatable
import Elements.Drawable
import Pages.adjustForFrameRate
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.Math

class Particle(var dynamics : Dynamics, var radius : Double) : Drawable, Animatable {
    override fun isOutOfBounds(width: Int, height: Int): Boolean {
        return dynamics.x<0-radius || dynamics.y<0-radius || dynamics.x>width+radius || dynamics.y > height-radius
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        //ctx.fillStyle="#000000"
        ctx.save()
        ctx.translate(dynamics.x,dynamics.y)
        val grad = ctx.createLinearGradient(-radius,-radius,radius,radius)
        grad.addColorStop(0.0,"#4d004d")
        grad.addColorStop(0.2,"#000")
        ctx.fillStyle = grad
        ctx.rotate(dynamics.r)
        ctx.arc(0.0,0.0,radius, 0.0, 2*Math.PI)
        ctx.fill()
        ctx.restore()
        //ctx.arc(95.0,50.0,40.0,0.0,5.5)
    }

    override fun update() {
        dynamics.update()
    }

}

data class Dynamics(var x : Double, var y : Double, var r : Double = 0.0, var dx : Double, var dy : Double, var dr : Double = 0.0){
    init {
        val adj = adjustForFrameRate(1.0)
        dx /= adj
        dy /= adj
        dr /= adj
    }

    fun update() {
        x+=dx
        y+=dy
        r+=dr
    }

    fun asArray() = arrayOf(doubleArrayOf(x,y,r), doubleArrayOf(dx,dy,dr))
}
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.Math

class Particle(var dynamics : Dynamics, var radius : Double) : Drawable, Animatable{
    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle="#000000"
        ctx.arc(dynamics.x,dynamics.y,radius, dynamics.r, 2*Math.PI+dynamics.r)
        //ctx.arc(95.0,50.0,40.0,0.0,5.5)
        ctx.fill()
    }

    override fun update() {
        dynamics.update()
    }

}

data class Dynamics(var x : Double, var y : Double, var r : Double = 0.0, var dx : Double, var dy : Double, var dr : Double = 0.0) : Animatable{
    override fun update() {
        x+=dx;
        y+=dy;
        r+=dr;
    }

    fun asArray() = arrayOf(doubleArrayOf(x,y,r), doubleArrayOf(dx,dy,dr))
}
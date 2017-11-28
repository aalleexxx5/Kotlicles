package Elements.Particles

import Elements.Animatable
import Elements.Drawable
import org.w3c.dom.CanvasRenderingContext2D

/**
 * Created by Alex on 22/11/2017.
 */
class LineHelix(val dynamics: Dynamics, val radius : Double) : Drawable, Animatable {
    val color = HueColorAnimation()
    override fun update() {
        dynamics.update()
        color.update()
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean =
            dynamics.x<0-radius || dynamics.y<0-radius || dynamics.x>width+radius || dynamics.y > height+radius

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(dynamics.x,dynamics.y)
        ctx.rotate(dynamics.r)
        ctx.fillStyle = color.toString()

        ctx.fillRect(0.0,radius,20.0,1.0)

        ctx.restore()
    }
}
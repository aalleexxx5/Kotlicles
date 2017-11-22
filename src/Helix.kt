import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.Math

/**
 * Created by Alex on 22/11/2017.
 */
class Helix(val dynamics: Dynamics, val radius : Double) : Drawable, Animatable {
    val color = HueColorAnimation()
    override fun update() {
        dynamics.update()
        color.update()
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean =
            dynamics.x<0-radius || dynamics.y<0-radius || dynamics.x>width+radius || dynamics.y > height+radius

    override fun draw(ctx: CanvasRenderingContext2D) {
        //Style
        ctx.fillStyle = color.toString()
        ctx.strokeStyle = color.toString()
        ctx.lineWidth = 5.0

        //Positioning
        ctx.save()
        ctx.translate(dynamics.x,dynamics.y) // Local location
        ctx.rotate(dynamics.r) // Local rotation


        ctx.beginPath()
        ctx.moveTo(radius,0.0)//Starting location (local)

        ctx.rotate(-dynamics.r) //Undo this frames rotation (To make translation relative to global rotation)
        ctx.translate(dynamics.dx,dynamics.dy) //Translate to next frame starting location
        ctx.rotate(dynamics.r+dynamics.dr) // Rotate to next frame starting location

        ctx.lineTo(radius,0.0)//End location.

        ctx.closePath()
        ctx.stroke()
        ctx.restore()
    }
}
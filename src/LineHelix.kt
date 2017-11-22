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
        //ctx.strokeStyle = color.halfIntensity()
        ctx.strokeStyle = "#888"
        ctx.lineWidth = 3.5
        //ctx.beginPath()
        ctx.fillRect(radius,radius,30.0,1.0);
        //ctx.arc(0.0,0.0,radius,0.0,1.0)
        //ctx.fill()
        //ctx.stroke()
        ctx.restore()
    }
}
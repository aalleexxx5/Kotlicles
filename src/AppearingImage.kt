import org.w3c.dom.CanvasRenderingContext2D
import kotlin.browser.document

class AppearingImage(val dynamics: Dynamics, src : String, val appearX : Int, val appearY : Int) : Animatable {
    val image = document.createElement("img").setAttribute("src",src)

    override fun update() {
        dynamics.update()
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean {
        return false
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(image,0.0,0.0,appearX-dynamics.x,appearY-dynamics.y,appearX-dynamics.x,appearY-dynamics.dy,appearX-dynamics.x,appearY-dynamics.y)
    }

}
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import kotlin.browser.document
import kotlin.js.Math

class AppearingImage(val dynamics: Dynamics, val image : HTMLImageElement, val appearX : Int, val appearY : Int) : Animatable {

    constructor(dynamics: Dynamics,src : String, appearX: Int, appearY: Int) : this(dynamics, document.createElement("img") as HTMLImageElement,appearX,appearX){
        image.setAttribute("src", src)
    }

    override fun update() {
        dynamics.update()
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean {
        return Math.abs(dynamics.x)>image.width || Math.abs(dynamics.y)>image.height
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        //from dynamics x and y to appearX and Y
        // Assume image is moving up in a straight line

        //ctx.drawImage(image,appearX+dynamics.x,appearY+dynamics.y,Math.abs(dynamics.x),Math.abs(dynamics.y))
        ctx.drawImage(image,0.0,0.0, Math.abs(dynamics.x),Math.abs(dynamics.y),appearX.toDouble(),appearY+dynamics.y,Math.abs(dynamics.x),Math.abs(dynamics.y))

    }

}
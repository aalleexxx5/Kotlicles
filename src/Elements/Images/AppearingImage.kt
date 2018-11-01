package Elements.Images

import Elements.Animatable
import Elements.Particles.Dynamics
import Pages.adjustForFrameRate
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import kotlin.browser.document
import kotlin.math.abs

class AppearingImage(val dynamics: Dynamics, val image : HTMLImageElement, val appearX : Double, val appearY : Double) : Animatable {

    constructor(dynamics: Dynamics, src : String, appearX: Double, appearY: Double) : this(dynamics, document.createElement("img") as HTMLImageElement,appearX,appearY){
        image.setAttribute("src", src)
    }

    constructor(image: HTMLImageElement, appearX: Double, appearY: Double, speed : Double) : this(Dynamics(image.width.toDouble(), 0.0, 0.0, 0.0, speed, 0.0),image,appearX-image.width/2, appearY)

    constructor(image: HTMLImageElement, appearX: Double, appearY: Double, width: Int, height: Int, percentagePrFrame: Double) : this(Dynamics(width.toDouble(), 0.0, 0.0, 0.0, percentagePrFrame * (height / 100.0), 0.0),image,appearX-width/2, appearY){
        this.image.width = width
        this.image.height = height
    }

    init {
        update()
    }


    override fun update() {
        dynamics.update()
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean {
        return abs(dynamics.x)>image.width || abs(dynamics.y)>image.height
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        //from dynamics x and y to appearX and Y
        // Assume image is moving up in a straight line

        //ctx.drawImage(image,appearX+dynamics.x,appearY+dynamics.y,abs(dynamics.x),abs(dynamics.y))
        ctx.drawImage(image,
                if(dynamics.dx <= 0) 0.0 else image.width-dynamics.x ,if(dynamics.dy <= 0) 0.0 else image.height-dynamics.y,
                abs(dynamics.x)*image.naturalWidth/image.width,abs(dynamics.y)*image.naturalHeight/image.height,
                if (dynamics.dx >= 0) appearX else appearX+dynamics.x,if (dynamics.dy >= 0) appearY else appearY+dynamics.y,
                abs(dynamics.x),abs(dynamics.y))

    }

}
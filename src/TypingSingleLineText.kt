import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLParagraphElement

class TypingSingleLineText(text : String, font:String, framesPrChar : Double, locationX : Double, locationY : Double, centered: Boolean, color : String = "#000") : Animatable, SingleLineText(text, font, color, framesPrChar.toInt(), locationX, locationY, centered) {

    constructor(textElement: HTMLParagraphElement, font: String, framesPrChar: Double, startingLocationX: Double, startingLocationY: Double, centered: Boolean, color: String = "#000") :
            this(textElement.innerHTML.replace("<br>", ""), font, framesPrChar, startingLocationX, startingLocationY, centered , color )

    constructor(text: String, visualParameters: VisualParameters) : this(text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.centered, visualParameters.color)

    constructor(text: HTMLParagraphElement, visualParameters: VisualParameters) : this(text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.centered ,visualParameters.color)


    override fun isOutOfBounds(width: Int, height: Int): Boolean {
        return currentFrame/fadeInTime >text.length
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.translate(locationX, locationY)
        ctx.fillStyle = color
        ctx.font = font
        ctx.fillText(text.substring(0,currentFrame/fadeInTime),0.0,0.0)
        ctx.restore()
    }
}

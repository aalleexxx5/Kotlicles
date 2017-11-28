package Elements.Text

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLParagraphElement

class MultilineGlowingText(text : HTMLParagraphElement, var font:String, var color: String, var fadeInTime : Int, lineTime : Int, var locationX : Double, val locationY: Double, val centered : Boolean): MultilineText(lineTime) {
    override val lines = text.innerText.split("\n").filterNot { it.isEmpty() }.mapIndexed { index, s -> GlowingSingleLineText(s, font, color, fadeInTime, locationX, locationY, centered) }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        if (wait>0){
            ctx.globalAlpha = wait/lineTime.toDouble()
            lines[currentLine-1].draw(ctx)
        }else{
            lines[currentLine].draw(ctx)
        }
        ctx.restore()
    }
}
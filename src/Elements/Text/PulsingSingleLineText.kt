package Elements.Text

import org.w3c.dom.CENTER
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.CanvasTextAlign
import org.w3c.dom.RIGHT
import kotlin.js.Math

class PulsingSingleLineText(text: String, font: String, color: String, fadeInTime: Int, locationX: Double, locationY: Double, centered: Boolean,val pulseLength : Int) : SingleLineText(text, font, color, fadeInTime, locationX, locationY, centered) {

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.font = font
        if (getHeight()>15){
            ctx.fillStyle = "#000"
            ctx.shadowColor = color
            ctx.shadowBlur = getHeight()/Math.abs((currentFrame%(pulseLength*2))-pulseLength.toDouble())
        }else{
            ctx.fillStyle = color
        }
        if (centered) ctx.textAlign = CanvasTextAlign.CENTER else ctx.textAlign = CanvasTextAlign.RIGHT
        ctx.translate(locationX, locationY)
        ctx.fillText(text,0.0,0.0)
        ctx.restore()
    }

    fun reset(){
        currentFrame = 0
    }

}
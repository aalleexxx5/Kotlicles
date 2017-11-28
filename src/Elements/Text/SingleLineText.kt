package Elements.Text

import Elements.Animatable
import Pages.adjustForFrameRate
import org.w3c.dom.CanvasRenderingContext2D

abstract class SingleLineText(val text : String, var font:String, var color: String, fadeInTime : Int, var locationX : Double, val locationY: Double, val centered : Boolean) : Animatable, TextElement {
    var fadeInTime = adjustForFrameRate(fadeInTime.toDouble())
    override fun getHeight(): Double = font.substring(0,font.indexOf("p")).toDouble()

    var currentFrame = 0

    override fun update() {
        currentFrame++
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean = fadeInTime < currentFrame

    override fun changeColor(color: String) {
        this.color = color
    }

    fun fitToWidth(ctx: CanvasRenderingContext2D, width: Int) : SingleLineText {
        ctx.save()
        var size = font.substring(0,font.indexOf("p")).toInt()+1
        do {
            size--
            ctx.font = size.toString() + font.substring(font.indexOf("p"))
            val length = ctx.measureText(text).width
        }while (length>width)
        font = size.toString() + font.substring(font.indexOf("p"))
        ctx.restore()
        return this
    }
}
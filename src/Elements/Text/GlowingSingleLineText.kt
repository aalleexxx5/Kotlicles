package Elements.Text

import org.w3c.dom.*

class GlowingSingleLineText(text: String, font: String, color: String, fadeInTime: Int, locationX: Double, locationY: Double, centered: Boolean) : SingleLineText(text, font, color, fadeInTime, locationX, locationY, centered) {

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.font = font
        ctx.shadowBlur = 10.0
        ctx.shadowColor = color
        ctx.fillStyle = color
        ctx.globalAlpha = ctx.globalAlpha + if (isOutOfBounds(0,0)) 1.0 else currentFrame /fadeInTime
        if (centered) ctx.textAlign = CanvasTextAlign.CENTER else ctx.textAlign = CanvasTextAlign.RIGHT
        ctx.fillText(text,locationX, locationY)
        ctx.restore()
    }
}
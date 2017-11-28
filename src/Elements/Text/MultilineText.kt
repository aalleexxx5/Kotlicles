package Elements.Text

import Elements.Animatable
import Pages.adjustForFrameRate
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.Math

abstract class MultilineText(lineTime: Int) : Animatable, TextElement {
    protected abstract val lines: List<SingleLineText>
    val lineTime = Math.ceil(adjustForFrameRate( lineTime.toDouble()))
    protected var wait = 0
    protected var currentLine = 0

    override fun update() {
        if (wait > 0) {
            wait--
        } else {
            if (!lines[currentLine].isOutOfBounds(0, 0)) {
                lines[currentLine].update()
                if (lines[currentLine].isOutOfBounds(0, 0)) {
                    wait = lineTime
                    currentLine++
                }
            }
        }
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean = lines.last().isOutOfBounds(0, 0) && wait <= 1

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        if (wait > 0) {
            for (i in 0 until currentLine) {
                lines[i].draw(ctx)
            }
        } else {
            for (i in 0..currentLine) {
                lines[i].draw(ctx)
            }
        }
        ctx.restore()
    }

    override fun changeColor(color: String) {
        lines.forEach { it.changeColor(color) }
    }

    override fun getHeight(): Double = (lines.first().getHeight() + 5) * (currentLine + 1)

    fun fitToWidth(ctx: CanvasRenderingContext2D, width: Int): MultilineText {
        lines.forEach { it.fitToWidth(ctx, width) }
        return this
    }
}
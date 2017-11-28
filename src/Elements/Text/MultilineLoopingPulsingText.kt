package Elements.Text

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLParagraphElement

class MultilineLoopingPulsingText(text: HTMLParagraphElement, lineTime: Int, font: String, color: String, fadeInTime: Int, locationX: Double, locationY: Double, centered: Boolean, pulseLength : Int) : MultilineText(lineTime) {
    override val lines: List<PulsingSingleLineText> = text.innerText.split("\n").filterNot { it.isEmpty() }.map { PulsingSingleLineText(it, font, color, fadeInTime, locationX, locationY, centered, pulseLength) }

    override fun update() {
        super.update()
        if (this.isOutOfBounds(0,0)) {
            currentLine = 0
            lines.forEach { it.reset() }
        }
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        if (wait <= 0) {
            lines[currentLine].draw(ctx)
        }
        ctx.restore()
    }
}
package Pages

import Elements.Images.AppearingImage
import Elements.Text.MultilineTypingText
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLParagraphElement
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

class IntroPage(val ctx: CanvasRenderingContext2D) {
    val image = AppearingImage(
            document.getElementById("exclamation") as HTMLImageElement,
            ctx.canvas.width / 2.0, (ctx.canvas.height + min(ctx.canvas.width * 0.75, ctx.canvas.height * 0.75)) / 2, min(ctx.canvas.width * 0.75, ctx.canvas.height * 0.75).toInt(), min(ctx.canvas.width * 0.75, ctx.canvas.height * 0.75).toInt(), -3.0
    )
    val lineSpace = 5
    val greetingText = MultilineTypingText(document.getElementById("greeting") as HTMLParagraphElement, "16px Serif", 5.0, 30, 1.0, 16.0 + lineSpace, false)

    var frameCount = 0

    var HTMLAnimationPage : HTMLAnimationPage? = null;
    private var skipping: Boolean = false


    init {
        animateExclamationMark()
    }


    fun animateExclamationMark() {
        if (skipping) return
        if (!image.isOutOfBounds(0, 0)) {
            ctx.whiteFrame()
            image.draw(ctx)
            image.update()
            window.requestAnimationFrame { animateExclamationMark() }
        } else {
            if (frameCount > FADE_TIME / 4) {
                frameCount = 0
                window.requestAnimationFrame { animateIntro() }
            } else {
                frameCount++
                ctx.darkenAdjusted(4)
                window.requestAnimationFrame { animateExclamationMark() }
            }
        }
    }

    fun animateIntro() {
        if (skipping) return
        if (!greetingText.isOutOfBounds(0, 0)) {
            ctx.whiteFrame()
            greetingText.draw(ctx)
            greetingText.update()
            window.requestAnimationFrame { animateIntro() }
        } else {
            if (frameCount <= FADE_TIME / 3) {
                frameCount++
                ctx.darkenAdjusted(3)
                window.requestAnimationFrame { animateIntro() }
            } else {
                frameCount = 0
                HTMLAnimationPage = HTMLAnimationPage(ctx)
            }
        }
    }

    fun skip() {
        skipping = true
        HTMLAnimationPage?.skip()

    }
}
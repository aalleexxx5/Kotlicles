package Pages

import Elements.Clickable
import Elements.Images.GreyoutIcon
import Elements.Text.MultilineLoopingPulsingText
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLParagraphElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window

class IndexPage(val ctx: CanvasRenderingContext2D) {

    val fadeFrames = 30
    val socialDim = 64.0
    val padding = 5.0
    val centerX = ctx.canvas.width/2.0
    val socialX =  (centerX-socialDim/2)-(socialDim/2) // -(socialDim/2) if there is an even number of socials
    val socialY = ctx.canvas.height - socialDim - padding
    val facebook = GreyoutIcon(document.getElementById("facebook") as HTMLImageElement, socialX + -2 * (padding + socialDim), socialY, socialDim, socialDim, fadeFrames, { window.location.href = "http://www.facebook.com/alex.holberg.94" }, 400, 10)
    val twitter = GreyoutIcon(document.getElementById("twitter") as HTMLImageElement, socialX + -1 * (padding + socialDim), socialY, socialDim, socialDim, fadeFrames, { window.location.href = "https://twitter.com/Ximias" }, 400, 20)
    val git = GreyoutIcon(document.getElementById("git") as HTMLImageElement, socialX + 0 * (padding + socialDim), socialY, socialDim, socialDim, fadeFrames, { window.location.href = "https://github.com/aalleexxx5" }, 400, 30)
    val linkedin = GreyoutIcon(document.getElementById("linkedin") as HTMLImageElement, socialX + 1 * (padding + socialDim), socialY, socialDim, socialDim, fadeFrames, { window.location.href = "https://www.linkedin.com/in/alex-holberg-46a610174/" },400,40)
    val mail = GreyoutIcon(document.getElementById("gmail") as HTMLImageElement, socialX + 2 * (padding + socialDim), socialY, socialDim, socialDim, fadeFrames, { window.location.href = "mailto:alexx4387@gmail.com" },400, 50)
    val ximias = GreyoutIcon(document.getElementById("ximias") as HTMLImageElement, centerX - 128, ctx.canvas.height / 2 - 128.0, 256.0, 256.0, fadeFrames, { js("""alert("This will eventually lead to a page featuring selected side-projects, and articles about them.")""")})

    val quotes = MultilineLoopingPulsingText(document.getElementById("inspiration") as HTMLParagraphElement, FADE_TIME, "80px verdana", "#F48A00", 800, centerX, 85.0, true, 150).fitToWidth(ctx,if(ctx.canvas.width>ctx.canvas.height) (ctx.canvas.width/2) else ctx.canvas.width)
    var mouseElements = listOf<Clickable>(facebook, twitter, git, linkedin, mail, ximias)
    var mouseUpdateElements : List<Clickable> = emptyList()
    val background = HelixPage(ctx)

    init {
        animate()
        document.addEventListener("mousemove",{event -> mouseMove(event)})
        document.addEventListener("click", {event -> mouseClicked(event)})
    }

    private fun animate() {
        ctx.darkenAdjusted(1)
        background.animate()
        quotes.draw(ctx)
        quotes.update()
        mouseElements.forEach { it.draw(ctx) }
        mouseUpdateElements.forEach { it.onMouseOverUpdate(ctx) }
        window.requestAnimationFrame { animate() }
    }

    fun mouseMove(e : Event){
        if (e is MouseEvent){
            println("moved")
            mouseUpdateElements = mouseElements.filter { it.isMouseOver(e.clientX, e.clientY) }
        }
    }

    fun mouseClicked(e : Event){
        if (e is MouseEvent){
            println("clicked")
            mouseElements.filter { it.isMouseOver(e.clientX, e.clientY) }.forEach { it.clicked() }
        }
    }
}
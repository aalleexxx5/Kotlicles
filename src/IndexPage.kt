import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLParagraphElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window

class IndexPage(val ctx: CanvasRenderingContext2D) {
    val socialDim = 64.0
    val padding = 5.0
    val centerX = ctx.canvas.width/2.0
    val socialX =  (centerX-socialDim/2)-(socialDim/2) // -(socialDim/2) if there is an even number of socials
    val socialY = ctx.canvas.height - socialDim - padding
    val facebook = GreyoutIcon(document.getElementById("facebook") as HTMLImageElement, socialX+-1*(padding+socialDim) ,socialY,socialDim,socialDim,15,{ window.location.href = "http://www.facebook.com/alex.holberg.94"})
    val twitter = GreyoutIcon(document.getElementById("twitter") as HTMLImageElement, socialX,socialY,socialDim,socialDim,15,{ window.location.href = "https://twitter.com/Ximias"})
    val git = GreyoutIcon(document.getElementById("git") as HTMLImageElement, socialX+(padding+socialDim),socialY,socialDim,socialDim,15,{ window.location.href = "https://github.com/aalleexxx5"})
    val mail = GreyoutIcon(document.getElementById("gmail") as HTMLImageElement, socialX+2*(padding+socialDim),socialY,socialDim,socialDim,15,{ window.location.href = "mailto:alexx4387@gmail.com"})
    val ximias = GreyoutIcon(document.getElementById("ximias") as HTMLImageElement, centerX-128,ctx.canvas.height/2-128.0,256.0,256.0,15,{})

    val quotes = MultilineGlowingText(document.getElementById("inspiration") as HTMLParagraphElement,"18px verdana sans-serif", "#F48A00", 15,80,centerX,120.0,true).fitToWidth(ctx,(ctx.canvas.width/1.5).toInt())
    var mouseElements = listOf<Clickable>(facebook, twitter, git, mail, ximias)
    var mouseUpdateElements : List<Clickable> = emptyList()
    init {
        animate()
        document.addEventListener("mousemove",{event -> mouseMove(event)})
        document.addEventListener("click", {event -> mouseClicked(event)})
    }

    private fun animate() {
        ctx.darken(1)
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
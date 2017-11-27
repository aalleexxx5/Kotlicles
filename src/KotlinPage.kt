import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLParagraphElement
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

class KotlinPage(val ctx : CanvasRenderingContext2D) {
    val bulb = AppearingImage(document.getElementById("light") as HTMLImageElement,ctx.canvas.width/2.0,(ctx.canvas.height+ Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75))/2, Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75).toInt(), Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75).toInt(),-3.0)
    val idea = MultilineGlowingText(document.getElementById("idea") as HTMLParagraphElement,"100px sans-serif", "#FF6", 10, 120,ctx.canvas.width/2.0,ctx.canvas.height/2.0, true).fitToWidth(ctx, (ctx.canvas.width/1.5).toInt())


    var wait = FADE_TIME
    fun animateBulb(){
        if (!bulb.isOutOfBounds(0,0)){
            ctx.darken(255)
            bulb.draw(ctx)
            bulb.update()
            window.requestAnimationFrame { animateBulb() }
        }else{
            if (wait>0){
                wait -= 5
                ctx.darken(5)
                window.requestAnimationFrame { animateBulb() }
            }else{
                wait = FADE_TIME
                animateText()
            }
        }
    }

    private fun animateText() {
        if (!idea.isOutOfBounds(0,0)){
            ctx.darken(255)
            idea.draw(ctx)
            idea.update()
            window.requestAnimationFrame { animateText() }
        }else{
            if (wait>0){
                wait-=5
                ctx.darken(5)
                window.requestAnimationFrame { animateText() }
            }else{

            }
        }
    }

    init {
        animateBulb()
    }
}
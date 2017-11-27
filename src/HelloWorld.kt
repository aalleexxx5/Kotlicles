import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.HTMLParagraphElement
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

class Page(val ctx: CanvasRenderingContext2D){
    val image = AppearingImage(
            document.getElementById("exclamation") as HTMLImageElement,
            ctx.canvas.width/2.0,(ctx.canvas.height+Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75))/2, Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75).toInt(),Math.min(ctx.canvas.width*0.75,ctx.canvas.height*0.75).toInt(), -5.0
    )
    val lineSpace = 5
    val greetingText = MultilineTypingText(document.getElementById("greeting") as HTMLParagraphElement,"16px Serif",3.0,25,1.0,16.0+lineSpace, false)

    var frameCount =0
    init {
        animateExclamationMark()
    }

    fun animateExclamationMark(){
        if (!image.isOutOfBounds(0,0)) {
            ctx.whiteFrame()
            image.draw(ctx)
            image.update()
            window.requestAnimationFrame { animateExclamationMark() }
        }else{
            if (frameCount>FADE_TIME/5) {
                frameCount=0
                window.requestAnimationFrame { animateIntro() }
            } else {
                frameCount++
                ctx.darken(5)
                window.requestAnimationFrame { animateExclamationMark() }
            }
        }
    }


    fun animateIntro(){
        if (!greetingText.isOutOfBounds(0,0)){
            ctx.whiteFrame()
            greetingText.draw(ctx)
            greetingText.update()
            window.requestAnimationFrame { animateIntro() }
        }else{
            if (frameCount <= FADE_TIME/5) {
                frameCount++
                ctx.darken(5)
                window.requestAnimationFrame { animateIntro() }
            }else{
                frameCount=0
                HTMLAnimationPage(ctx)
            }
        }
    }
}


fun main(args: Array<String>) {
    val canvas = document.getElementById("where the magic happens") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.globalCompositeOperation="source-over"
    IndexPage(ctx)
}
const val FADE_TIME = 255

fun CanvasRenderingContext2D.darken(amount:Int){
    val ctx = this
    val width:Int = this.canvas.width
    val height : Int = this.canvas.height
    js("var lastImage = ctx.getImageData(0,0,width,height);var pixelData = lastImage.data;var i;for (i=3; i<pixelData.length; i += 4) { pixelData[i] -= amount; }ctx.putImageData(lastImage,0,0);")
}

fun CanvasRenderingContext2D.whiteFrame() {
    this.fillStyle = "#FFF"
    this.fillRect(0.0, 0.0, this.canvas.width.toDouble(), this.canvas.height.toDouble())
}

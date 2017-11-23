import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLImageElement
import kotlin.browser.document
import kotlin.browser.window

class Page(val ctx: CanvasRenderingContext2D){
    var image = AppearingImage(
            Dynamics(400.0,0.0,0.0,0.0,-20.0),
            document.getElementById("light") as HTMLImageElement,
            0,(ctx.canvas.height/1.25).toInt()
    )
    init {
        animate()
    }

    fun animate(){
        if (!image.isOutOfBounds(0,0)) {
            ctx.clearRect(0.0,0.0,ctx.canvas.width.toDouble(),ctx.canvas.height.toDouble())
            image.draw(ctx)
            image.update()
        }else{
            darken(ctx.canvas.width,ctx.canvas.height,ctx,5)
        }
        kotlin.browser.window.requestAnimationFrame { animate() }
    }

    fun darken(width:Int, height:Int, ctx : org.w3c.dom.CanvasRenderingContext2D, amount:Int){
        js("var lastImage = ctx.getImageData(0,0,width,height);var pixelData = lastImage.data;var i;for (i=3; i<pixelData.length; i += 4) { pixelData[i] -= amount; }ctx.putImageData(lastImage,0,0);")
    }
}


fun main(args: Array<String>) {
    val message = "Hello JavaScript!"
    println(message)
    val canvas = document.getElementById("where the magic happens") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.globalCompositeOperation="lighten"
    Page(ctx)
}

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import kotlin.browser.window

class Page(val ctx: CanvasRenderingContext2D){
    var image = AppearingImage(
            Dynamics(400.0,0.0,0.0,0.0,-20.0),
            "Light.png",
            800,800
    )
    init {
        animate()
    }

    fun animate(){
        ctx.clearRect(0.0,0.0,ctx.canvas.width.toDouble(),ctx.canvas.height.toDouble())
        //darken(ctx.canvas.width,ctx.canvas.height,ctx,1)
        image.draw(ctx)
        if (!image.isOutOfBounds(0,0)) image.update()
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

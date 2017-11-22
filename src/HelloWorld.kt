import org.khronos.webgl.Uint8ClampedArray
import org.khronos.webgl.get
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.ImageData
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

class Page(private var ctx: CanvasRenderingContext2D) {
    var particles : Array<Animatable?> = arrayOfNulls(20)
    init {
        populateParticles()
        animate()
    }
    fun animate(){
        darken(ctx.canvas.width,ctx.canvas.height,ctx,1)
        ctx.globalCompositeOperation="lighten"
        particles.filterNotNull().forEach { it.draw(ctx); it.update() }
        populateParticles()
        window.requestAnimationFrame { animate() }
    }

    fun darken(width:Int, height:Int, ctx : CanvasRenderingContext2D, amount:Int){
        js("var lastImage = ctx.getImageData(0,0,width,height);var pixelData = lastImage.data;var i;for (i=3; i<pixelData.length; i += 4) { pixelData[i] -= amount; }ctx.putImageData(lastImage,0,0);")
    }

    fun logToConsole(message: String): Unit {
        js("console.log(message)")
    }

    private fun populateParticles(){
        particles.forEachIndexed { index, particle ->
            if (particle == null||particle.isOutOfBounds(ctx.canvas.width,ctx.canvas.height)) {
                particles[index] = randomHelix()
            } }
    }

    fun specifiedParticle() = Particle(Dynamics(500.0,500.0,50.0,0.1,0.1,0.0),50.0)

    fun randomParticle() : Particle{
        return Particle(
                Dynamics(
                        Math.random()*ctx.canvas.width,
                        Math.random()*ctx.canvas.height,
                        Math.random()*2*Math.PI,
                        Math.random()*2-1,
                        Math.random()*2-1,
                        Math.random()-0.5
                ),
        20.0)
    }
    fun randomHelix() : Helix{
        return Helix(
                Dynamics(
                        Math.random()*ctx.canvas.width,
                        Math.random()*ctx.canvas.height,
                        Math.random()*2*Math.PI,
                        Math.random()*6-3,
                        Math.random()*6-3,
                        Math.random()-0.5
                ),
        30.0)
    }
}

fun main(args: Array<String>) {
    val message = "Hello JavaScript!"
    println(message)
    val canvas = document.getElementById("where the magic happens") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.fillStyle = "#000"
    ctx.fillRect(0.0,0.0, canvas.width.toDouble(), canvas.height.toDouble())
    Page(ctx)
}

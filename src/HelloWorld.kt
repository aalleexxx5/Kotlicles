import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

class Page(private var ctx: CanvasRenderingContext2D) {
    var particles : Array<Particle?> = arrayOfNulls(50)
    init {
        populateParticles()
        animate()
    }
    fun animate(){
        particles.filterNotNull().forEach { it.draw(ctx); it.update() }
        window.requestAnimationFrame { animate() }
    }

    private fun populateParticles(){
        particles.forEachIndexed { index, particle ->
            if (particle == null) {
                particles[index] = randomParticle()
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
                        Math.random()*2-1
                ),
        20.0)
    }

    fun isOutOfBounds(){

    }
}

fun main(args: Array<String>) {
    val message = "Hello JavaScript!"
    println(message)
    val canvas = document.getElementById("where the magic happens") as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    Page(ctx)
}

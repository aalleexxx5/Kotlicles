package Pages

import Elements.*
import Elements.Particles.Dynamics
import Elements.Particles.LineHelix
import Elements.Particles.NHelix
import Elements.Particles.Particle
import org.w3c.dom.Range
import kotlin.js.Math
import kotlin.math.PI
import kotlin.math.abs
import kotlin.random.Random

class HelixPage(private var ctx: org.w3c.dom.CanvasRenderingContext2D) {
    var particles : Array<Animatable?> = arrayOfNulls((ctx.canvas.width*ctx.canvas.height)/160000+1)
    init {
        populateParticles()
    }

    fun animateAsPage(){
        ctx.darkenAdjusted(1)
        particles.filterNotNull().forEach { it.draw(ctx); it.update() }
        populateParticles()
        kotlin.browser.window.requestAnimationFrame { animateAsPage() }
    }

    fun animate(){
        ctx.save()
        ctx.globalCompositeOperation = "lighten"
        particles.filterNotNull().forEach { it.draw(ctx); it.update() }
        ctx.restore()
        populateParticles()
    }

    private fun populateParticles(){
        particles.forEachIndexed { index, particle ->
            if (particle == null||particle.isOutOfBounds(ctx.canvas.width,ctx.canvas.height)) {
                if (random() < 0.1) {
                    particles[index] = randomDoubleHelix()
                }
                else {
                    particles[index] = randomHelix()
                }
            } }
    }

    fun specifiedParticle() = Particle(Dynamics(500.0, 500.0, 50.0, 0.1, 0.1, 0.0), 50.0)

    fun randomParticle() : Particle {
        return Particle(
                Dynamics(
                        random() * ctx.canvas.width,
                        random() * ctx.canvas.height,
                        random() * 2 * PI,
                        randomizeWithMinimum(-2.0,2.0,0.2),
                        randomizeWithMinimum(-2.0,2.0,0.2),
                        randomizeWithMinimum(-0.5,0.5,0.05)
                ),
                20.0)
    }
    fun randomHelix() : LineHelix {
        return LineHelix(
                Dynamics(
                        random() * ctx.canvas.width,
                        random() * ctx.canvas.height,
                        random() * 2 * PI,
                        randomizeWithMinimum(-1.0,1.0,0.1),
                        randomizeWithMinimum(-1.0,1.0,0.1),
                        randomizeWithMinimum(-0.125,0.125,0.005)
                ),
                30.0)
    }

    fun randomDoubleHelix() : NHelix {
        return NHelix(
                Dynamics(
                        random() * ctx.canvas.width,
                        random() * ctx.canvas.height,
                        random() * 2 * PI,
                        randomizeWithMinimum(-1.0,1.0,0.15),
                        randomizeWithMinimum(-1.0,1.0,0.15),
                        randomizeWithMinimum(-0.1,0.1,0.005)
                ),
                30.0, 2)
    }

    fun randomizeWithMinimum(min : Double ,max : Double, lowerValue : Double): Double {
        var ans = random() * (max+abs(min)) + min
        if (abs(ans) < lowerValue){
            if (ans<0){
                ans-=lowerValue
            }else{
                ans+=lowerValue
            }
        }
        return ans
    }
}
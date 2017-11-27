class HelixPage(private var ctx: org.w3c.dom.CanvasRenderingContext2D) {
    var particles : Array<Animatable?> = arrayOfNulls((ctx.canvas.width*ctx.canvas.height)/160000+1)
    init {
        populateParticles()
        animate()
    }
    fun animate(){
        ctx.darken(1)
        particles.filterNotNull().forEach { it.draw(ctx); it.update() }
        populateParticles()
        kotlin.browser.window.requestAnimationFrame { animate() }
    }

    private fun populateParticles(){
        particles.forEachIndexed { index, particle ->
            if (particle == null||particle.isOutOfBounds(ctx.canvas.width,ctx.canvas.height)) {
                if (kotlin.js.Math.random() < 0.1) {
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
                        kotlin.js.Math.random() * ctx.canvas.width,
                        kotlin.js.Math.random() * ctx.canvas.height,
                        kotlin.js.Math.random() * 2 * kotlin.js.Math.PI,
                        kotlin.js.Math.random() * 2 - 1,
                        kotlin.js.Math.random() * 2 - 1,
                        kotlin.js.Math.random() - 0.5
                ),
                20.0)
    }
    fun randomHelix() : LineHelix {
        return LineHelix(
                Dynamics(
                        kotlin.js.Math.random() * ctx.canvas.width,
                        kotlin.js.Math.random() * ctx.canvas.height,
                        kotlin.js.Math.random() * 2 * kotlin.js.Math.PI,
                        kotlin.js.Math.random() * 6 - 3,
                        kotlin.js.Math.random() * 6 - 3,
                        kotlin.js.Math.random() / 1.5 - 0.33
                ),
                30.0)
    }

    fun randomDoubleHelix() : NHelix {
        return NHelix(
                Dynamics(
                        kotlin.js.Math.random() * ctx.canvas.width,
                        kotlin.js.Math.random() * ctx.canvas.height,
                        kotlin.js.Math.random() * 2 * kotlin.js.Math.PI,
                        kotlin.js.Math.random() * 6 - 3,
                        kotlin.js.Math.random() * 6 - 3,
                        kotlin.js.Math.random() / 2 - 0.25
                ),
                30.0, 2)
    }
}
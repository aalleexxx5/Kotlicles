package Elements.Particles

import Elements.Animatable
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.js.Math

class NHelix(val dynamics: Dynamics, val radius : Double, val n : Int) : Animatable {
    val helices = Array(n, {i -> LineHelix(Dynamics(dynamics.x, dynamics.y, ((2 * Math.PI) / n) * i, dynamics.dx, dynamics.dy, dynamics.dr), radius) })


    override fun update() {
        helices.forEach { it.update() }
    }

    override fun isOutOfBounds(width: Int, height: Int): Boolean = helices.first().isOutOfBounds(width, height)

    override fun draw(ctx: CanvasRenderingContext2D) {
        helices.forEach { it.draw(ctx) }
    }
}
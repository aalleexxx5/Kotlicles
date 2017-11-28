package Elements

import org.w3c.dom.CanvasRenderingContext2D

interface Drawable {
    fun draw(ctx : CanvasRenderingContext2D)
}
package Elements

import org.w3c.dom.CanvasRenderingContext2D

interface Clickable : Drawable {
    fun isMouseOver(x : Int, y : Int) : Boolean
    fun onMouseOverUpdate(ctx : CanvasRenderingContext2D)
    fun clicked()
}
package Elements.Text

import Elements.Animatable
import Pages.adjustForFrameRate
import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.floor

open class HTMLTypingElement(val name:String, private val action : (() -> Unit), val font:String, val framesPrChar : Double, val locationX : Double, val locationY : Double, var color : String = "#000", val textElements: List<TextElement> = emptyList()) : Animatable, TextElement {
    constructor(name: String, action: () -> Unit, visualParameters: VisualParameters, singleLines: List<TextElement> = emptyList()) : this(name, action, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.color, singleLines)

    val beginTag = TypingSingleLineText("<" + name + ">", font, framesPrChar, 0.0, 0.0, false, color)
    var wait = 0
    var currentElement = 0
    val WAIT_PR_ELEMENT = floor(adjustForFrameRate(80.0)).toInt()
    var hasActionBeenInvoked = false
    override fun update() {
        if (wait>0){
            wait--
        }else{
            if (!beginTag.isOutOfBounds(0, 0)){
                beginTag.update()
            }else{
                if (textElements.isEmpty()) return
                textElements[currentElement].update()
                if (textElements[currentElement].isOutOfBounds(0,0)){
                    if (currentElement < textElements.size-1){
                        currentElement++
                        wait = WAIT_PR_ELEMENT
                    }
                }
                if (!hasActionBeenInvoked && isOutOfBounds(0,0)) {
                    action.invoke()
                    hasActionBeenInvoked = true
                    wait = WAIT_PR_ELEMENT
                }
            }
        }
    }
    override fun isOutOfBounds(width: Int, height: Int): Boolean = textElements.last().isOutOfBounds(0,0)

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = color
        ctx.font = font
        beginTag.draw(ctx)
        if (beginTag.isOutOfBounds(0,0)){
            newLine(ctx)
            indent(ctx)
            for (i in 0 .. currentElement){
                textElements[i].draw(ctx)

                ctx.translate(0.0, textElements[i].getHeight())
            }
            unindent(ctx)
            ctx.fillText("</"+name.substring(0, if (name.indexOf(" ")!=-1) name.indexOf(" ") else name.length)+">",0.0,0.0)
        }
    }

    fun drawAsRoot(ctx: CanvasRenderingContext2D){
        ctx.save()
        ctx.translate(locationX,locationY)
        draw(ctx)
        ctx.restore()
    }

    private fun newLine(ctx: CanvasRenderingContext2D) {
        ctx.translate(0.0, lineHeight())
    }
    private fun indent(ctx: CanvasRenderingContext2D){
        ctx.translate(lineHeight(),0.0)
    }
    private fun unindent(ctx: CanvasRenderingContext2D){
        ctx.translate(-lineHeight(),0.0)
    }

    private fun lineHeight() = (font.substring(0, font.indexOf("p")).toInt()) + 5.0

    override fun changeColor(color: String){
        textElements.forEach { it.changeColor(color) }
        beginTag.changeColor(color)
        this.color = color
    }
    override fun getHeight(): Double = if (textElements.isEmpty()) lineHeight()*2 else lineHeight()
}

class VisualParameters(val font: String, val framesPrChar: Double, val startingLocationX: Double, val startingLocationY: Double, var color: String = "#000", val centered : Boolean)

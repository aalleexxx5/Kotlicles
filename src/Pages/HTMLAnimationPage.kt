package Pages

import Elements.Text.HTMLTypingElement
import Elements.Text.MultilineTypingText
import Elements.Text.TypingSingleLineText
import Elements.Text.VisualParameters
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLParagraphElement
import kotlin.browser.document
import kotlin.browser.window

class HTMLAnimationPage(val ctx : CanvasRenderingContext2D){
    val visuals = VisualParameters("16px serif", 5.0, 0.0, 16.0, "#000", false)
    val elementVisuals = VisualParameters("16px serif", 3.0, 0.0, 0.0, "#000", false)
    val htmlanimation : HTMLTypingElement = HTMLTypingElement("HTML", {}, visuals, listOf(
            HTMLTypingElement("head", {}, visuals, listOf(
                    TypingSingleLineText("<meta charset=\"UTF-8\">", elementVisuals),
                    HTMLTypingElement("title", { document.title = "Ximias -introduction" }, visuals, listOf(TypingSingleLineText("Ximias -introduction", elementVisuals))),
                    HTMLTypingElement("style", { document.body?.style?.background = "#000"; changeColor("#AAA") }, visuals, listOf(TypingSingleLineText("{background-color:#000; color:#AAA;}", elementVisuals)))
            )),
            HTMLTypingElement("body", {}, visuals, listOf(
                    HTMLTypingElement("div id=\"menu\"", {}, visuals, listOf(
                            MultilineTypingText(document.getElementById("boring") as HTMLParagraphElement, 30, elementVisuals)
                    ))
            ))
    ))
    var wait = 120

    init {
        animateHTML()
    }
    private fun changeColor(color: String){
        visuals.color=color
        htmlanimation.changeColor(color)
    }

    fun animateHTML(){
        wipe()
        if (!htmlanimation.isOutOfBounds(0,0)){
            htmlanimation.drawAsRoot(ctx)
            htmlanimation.update()
            window.requestAnimationFrame { animateHTML() }
        }else{
            if (wait>0){
                htmlanimation.drawAsRoot(ctx)
                wait--
                window.requestAnimationFrame { animateHTML() }
            }else{
                KotlinPage(ctx)
            }
        }
    }


    var darkenTime = FADE_TIME /8
    fun wipe(){
        if (visuals.color=="#000"){
            ctx.whiteFrame()
        }else{
            if (darkenTime>0){
                darkenTime --
                ctx.darkenAdjusted(8)
            }else{
                ctx.darkenAdjusted(255)
            }
        }
    }


}
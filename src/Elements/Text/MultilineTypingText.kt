package Elements.Text

import Elements.Animatable
import org.w3c.dom.HTMLParagraphElement

class MultilineTypingText(text : Array<String>, font:String, val framesPrChar : Double, lineTime : Int, val startingLocationX : Double, val startingLocationY : Double, centered: Boolean,color : String = "#000") : Animatable, MultilineText(lineTime) {

    constructor(text : HTMLParagraphElement, font: String, framesPrChar: Double, lineWait: Int, startingLocationX: Double, startingLocationY: Double,centered: Boolean ,color: String = "#000") :
            this(text.innerText.split("\n").toTypedArray(), font, framesPrChar, lineWait, startingLocationX, startingLocationY, centered, color)

    constructor(htmlParagraphElement: HTMLParagraphElement, lineWait: Int ,visuals: VisualParameters) : this(htmlParagraphElement, visuals.font, visuals.framesPrChar, lineWait, visuals.startingLocationX, visuals.startingLocationY, visuals.centered, visuals.color)

    override val lines = text.filterNot { it.isEmpty() }.mapIndexed { index, s -> TypingSingleLineText(s, font, framesPrChar, startingLocationX, startingLocationY + index * (font.substring(0, font.indexOf("p")).toInt() + 5), centered, color) }

}

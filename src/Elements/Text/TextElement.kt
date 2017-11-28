package Elements.Text

import Elements.Animatable

interface TextElement : Animatable {
    fun changeColor(color : String)
    fun getHeight() : Double
}
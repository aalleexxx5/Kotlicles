interface Animatable :Drawable{
    fun update()
    fun isOutOfBounds(width : Int, height : Int) : Boolean
}
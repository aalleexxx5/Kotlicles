package Elements.Particles

import Pages.random


/**
 * Created by Alex on 22/11/2017.
 */
class HueColorAnimation() {
    var h : Int = (random()*360).toInt()
    var s : Byte = 100
    var l : Byte = 50

    fun update(){
        h++
        h%=360
    }

    override fun toString(): String = "hsl($h,$s%,$l%)"

    fun halfIntensity() : String = "hsl($h,20%,20%)"
}
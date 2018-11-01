package Elements.Images

import Elements.Clickable
import Pages.adjustForFrameRate
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.math.ceil

class GreyoutIcon(val image : HTMLImageElement,var locationX : Double,var locationY : Double, val width : Double, val height : Double,fadeFrames : Int,val onClick : () -> Unit) : Clickable {
    val fadeFrames = ceil(adjustForFrameRate(fadeFrames.toDouble())).toInt()
    var step = this.fadeFrames
    val greyImage : ImageData
    val greyCanvas = document.createElement("canvas") as HTMLCanvasElement

    init {
        greyCanvas.width = width.toInt()
        greyCanvas.height = height.toInt()
        val ctx = greyCanvas.getContext("2d") as CanvasRenderingContext2D
        ctx.clearRect(0.0,0.0,width, height)
        ctx.drawImage(image,0.0,0.0,image.naturalWidth.toDouble(), image.naturalHeight.toDouble(), 0.0,0.0,width, height)
        var imageData = ctx.getImageData(0.0,0.0,width, height)
        js("""var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          var brightness = (0.30 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2])*0.05+0.05;
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }""")
        ctx.putImageData(imageData,0.0,0.0)
        greyImage = imageData

    }
    override fun isMouseOver(x: Int, y: Int): Boolean {
        if (x > locationX && x< locationX+width && y>locationY && y< locationY+height){
            return true
        }
        return false
    }

    override fun onMouseOverUpdate(ctx: CanvasRenderingContext2D) {
        if (step>0){
            step -=2
        }
    }

    override fun clicked() {
        onClick.invoke()
    }

    override fun draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalCompositeOperation = "source-over"
        ctx.drawImage(greyCanvas, locationX, locationY)
        //ctx.putImageData(greyImage, locationX, locationY)
        if (step<fadeFrames){
            step++
            ctx.globalAlpha = ((fadeFrames-step)*(1/fadeFrames.toDouble()))
            ctx.drawImage(image,0.0,0.0,image.naturalWidth.toDouble(),image.naturalHeight.toDouble(),locationX, locationY, width,height)
            if (step ==0) step++
        }
        ctx.restore()
    }
}
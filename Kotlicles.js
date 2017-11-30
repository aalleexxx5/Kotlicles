if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Kotlicles'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Kotlicles'.");
}
var Kotlicles = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var numberToInt = Kotlin.numberToInt;
  var Unit = Kotlin.kotlin.Unit;
  var first = Kotlin.kotlin.collections.first_us0mfu$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var indexOf = Kotlin.kotlin.text.indexOf_l5u8uk$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var first_0 = Kotlin.kotlin.collections.first_2p1efm$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var equals = Kotlin.equals;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var listOf_0 = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_emfgvx$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var toString = Kotlin.toString;
  GlowingSingleLineText.prototype = Object.create(SingleLineText.prototype);
  GlowingSingleLineText.prototype.constructor = GlowingSingleLineText;
  MultilineGlowingText.prototype = Object.create(MultilineText.prototype);
  MultilineGlowingText.prototype.constructor = MultilineGlowingText;
  MultilineLoopingPulsingText.prototype = Object.create(MultilineText.prototype);
  MultilineLoopingPulsingText.prototype.constructor = MultilineLoopingPulsingText;
  MultilineTypingText.prototype = Object.create(MultilineText.prototype);
  MultilineTypingText.prototype.constructor = MultilineTypingText;
  PulsingSingleLineText.prototype = Object.create(SingleLineText.prototype);
  PulsingSingleLineText.prototype.constructor = PulsingSingleLineText;
  TypingSingleLineText.prototype = Object.create(SingleLineText.prototype);
  TypingSingleLineText.prototype.constructor = TypingSingleLineText;
  function Animatable() {
  }
  Animatable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Animatable',
    interfaces: [Drawable]
  };
  function Clickable() {
  }
  Clickable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Clickable',
    interfaces: [Drawable]
  };
  function Drawable() {
  }
  Drawable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Drawable',
    interfaces: []
  };
  function AppearingImage(dynamics, image, appearX, appearY) {
    this.dynamics = dynamics;
    this.image = image;
    this.appearX = appearX;
    this.appearY = appearY;
  }
  AppearingImage.prototype.update = function () {
    this.dynamics.update();
  };
  AppearingImage.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return Math.abs(this.dynamics.x) > this.image.width || Math.abs(this.dynamics.y) > this.image.height;
  };
  AppearingImage.prototype.draw_f69bme$ = function (ctx) {
    ctx.drawImage(this.image, this.dynamics.dx <= 0 ? 0.0 : this.image.width - this.dynamics.x, this.dynamics.dy <= 0 ? 0.0 : this.image.height - this.dynamics.y, Math.abs(this.dynamics.x) * this.image.naturalWidth / this.image.width, Math.abs(this.dynamics.y) * this.image.naturalHeight / this.image.height, this.dynamics.dx >= 0 ? this.appearX : this.appearX + this.dynamics.x, this.dynamics.dy >= 0 ? this.appearY : this.appearY + this.dynamics.y, Math.abs(this.dynamics.x), Math.abs(this.dynamics.y));
  };
  AppearingImage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AppearingImage',
    interfaces: [Animatable]
  };
  function AppearingImage_init(dynamics, src, appearX, appearY, $this) {
    $this = $this || Object.create(AppearingImage.prototype);
    var tmp$, tmp$_0;
    tmp$_0 = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    AppearingImage.call($this, dynamics, tmp$_0, appearX, appearY);
    $this.image.setAttribute('src', src);
    return $this;
  }
  function AppearingImage_init_0(image, appearX, appearY, speed, $this) {
    $this = $this || Object.create(AppearingImage.prototype);
    AppearingImage.call($this, new Dynamics(image.width, 0.0, 0.0, 0.0, speed, 0.0), image, appearX - (image.width / 2 | 0), appearY);
    return $this;
  }
  function AppearingImage_init_1(image, appearX, appearY, width, height, percentagePrFrame, $this) {
    $this = $this || Object.create(AppearingImage.prototype);
    AppearingImage.call($this, new Dynamics(width, 0.0, 0.0, 0.0, percentagePrFrame * (height / 100.0), 0.0), image, appearX - (width / 2 | 0), appearY);
    $this.image.width = width;
    $this.image.height = height;
    return $this;
  }
  function GreyoutIcon(image, locationX, locationY, width, height, fadeFrames, onClick) {
    this.image = image;
    this.locationX = locationX;
    this.locationY = locationY;
    this.width = width;
    this.height = height;
    this.onClick = onClick;
    this.fadeFrames = Math.ceil(adjustForFrameRate(fadeFrames));
    this.step = this.fadeFrames;
    this.greyImage = null;
    var tmp$, tmp$_0;
    this.greyCanvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.greyCanvas.width = numberToInt(this.width);
    this.greyCanvas.height = numberToInt(this.height);
    var ctx = Kotlin.isType(tmp$_0 = this.greyCanvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.clearRect(0.0, 0.0, this.width, this.height);
    ctx.drawImage(this.image, 0.0, 0.0, this.image.naturalWidth, this.image.naturalHeight, 0.0, 0.0, this.width, this.height);
    var imageData = ctx.getImageData(0.0, 0.0, this.width, this.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var brightness = (0.3 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) * 0.05 + 0.05;
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
    ctx.putImageData(imageData, 0.0, 0.0);
    this.greyImage = imageData;
  }
  GreyoutIcon.prototype.isMouseOver_vux9f0$ = function (x, y) {
    if (x > this.locationX && x < this.locationX + this.width && y > this.locationY && y < this.locationY + this.height) {
      return true;
    }
    return false;
  };
  GreyoutIcon.prototype.onMouseOverUpdate_f69bme$ = function (ctx) {
    if (this.step > 0) {
      this.step = this.step - 2 | 0;
    }
  };
  GreyoutIcon.prototype.clicked = function () {
    this.onClick();
  };
  GreyoutIcon.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(this.greyCanvas, this.locationX, this.locationY);
    if (this.step < this.fadeFrames) {
      this.step = this.step + 1 | 0;
      ctx.globalAlpha = (this.fadeFrames - this.step | 0) * (1 / this.fadeFrames);
      ctx.drawImage(this.image, 0.0, 0.0, this.image.naturalWidth, this.image.naturalHeight, this.locationX, this.locationY, this.width, this.height);
      if (this.step === 0) {
        this.step = this.step + 1 | 0;
      }
    }
    ctx.restore();
  };
  GreyoutIcon.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GreyoutIcon',
    interfaces: [Clickable]
  };
  function Helix(dynamics, radius) {
    this.dynamics = dynamics;
    this.radius = radius;
    this.color = new HueColorAnimation();
  }
  Helix.prototype.update = function () {
    this.dynamics.update();
    this.color.update();
  };
  Helix.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.dynamics.x < 0 - this.radius || this.dynamics.y < 0 - this.radius || this.dynamics.x > width + this.radius || this.dynamics.y > height + this.radius;
  };
  Helix.prototype.draw_f69bme$ = function (ctx) {
    ctx.fillStyle = this.color.toString();
    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = 5.0;
    ctx.save();
    ctx.translate(this.dynamics.x, this.dynamics.y);
    ctx.rotate(this.dynamics.r);
    ctx.beginPath();
    ctx.moveTo(this.radius, 0.0);
    ctx.rotate(-this.dynamics.r);
    ctx.translate(this.dynamics.dx, this.dynamics.dy);
    ctx.rotate(this.dynamics.r + this.dynamics.dr);
    ctx.lineTo(this.radius, 0.0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };
  Helix.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Helix',
    interfaces: [Animatable, Drawable]
  };
  function HueColorAnimation() {
    this.h = numberToInt(Math.random() * 360);
    this.s = 100;
    this.l = 50;
  }
  HueColorAnimation.prototype.update = function () {
    this.h = this.h + 1 | 0;
    this.h = this.h % 360;
  };
  HueColorAnimation.prototype.toString = function () {
    return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
  };
  HueColorAnimation.prototype.halfIntensity = function () {
    return 'hsl(' + this.h + ',20%,20%)';
  };
  HueColorAnimation.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HueColorAnimation',
    interfaces: []
  };
  function LineHelix(dynamics, radius) {
    this.dynamics = dynamics;
    this.radius = radius;
    this.color = new HueColorAnimation();
  }
  LineHelix.prototype.update = function () {
    this.dynamics.update();
    this.color.update();
  };
  LineHelix.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.dynamics.x < 0 - this.radius || this.dynamics.y < 0 - this.radius || this.dynamics.x > width + this.radius || this.dynamics.y > height + this.radius;
  };
  LineHelix.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.dynamics.x, this.dynamics.y);
    ctx.rotate(this.dynamics.r);
    ctx.fillStyle = this.color.toString();
    ctx.fillRect(0.0, this.radius, 20.0, 1.0);
    ctx.restore();
  };
  LineHelix.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LineHelix',
    interfaces: [Animatable, Drawable]
  };
  var Array_0 = Array;
  function NHelix(dynamics, radius, n) {
    this.dynamics = dynamics;
    this.radius = radius;
    this.n = n;
    var array = Array_0(this.n);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      array[i] = new LineHelix(new Dynamics(this.dynamics.x, this.dynamics.y, 2 * Math.PI / this.n * i, this.dynamics.dx, this.dynamics.dy, this.dynamics.dr), this.radius);
    }
    this.helices = array;
  }
  NHelix.prototype.update = function () {
    var $receiver = this.helices;
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      element.update();
    }
  };
  NHelix.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return first(this.helices).isOutOfBounds_vux9f0$(width, height);
  };
  NHelix.prototype.draw_f69bme$ = function (ctx) {
    var $receiver = this.helices;
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      element.draw_f69bme$(ctx);
    }
  };
  NHelix.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NHelix',
    interfaces: [Animatable]
  };
  function Particle(dynamics, radius) {
    this.dynamics = dynamics;
    this.radius = radius;
  }
  Particle.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.dynamics.x < 0 - this.radius || this.dynamics.y < 0 - this.radius || this.dynamics.x > width + this.radius || this.dynamics.y > height - this.radius;
  };
  Particle.prototype.draw_f69bme$ = function (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.dynamics.x, this.dynamics.y);
    var grad = ctx.createLinearGradient(-this.radius, -this.radius, this.radius, this.radius);
    grad.addColorStop(0.0, '#4d004d');
    grad.addColorStop(0.2, '#000');
    ctx.fillStyle = grad;
    ctx.rotate(this.dynamics.r);
    ctx.arc(0.0, 0.0, this.radius, 0.0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };
  Particle.prototype.update = function () {
    this.dynamics.update();
  };
  Particle.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Particle',
    interfaces: [Animatable, Drawable]
  };
  function Dynamics(x, y, r, dx, dy, dr) {
    if (r === void 0)
      r = 0.0;
    if (dr === void 0)
      dr = 0.0;
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.dr = dr;
    var adj = adjustForFrameRate(1.0);
    this.dx /= adj;
    this.dy /= adj;
    this.dr /= adj;
  }
  Dynamics.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.r += this.dr;
  };
  Dynamics.prototype.asArray = function () {
    return [new Float64Array([this.x, this.y, this.r]), new Float64Array([this.dx, this.dy, this.dr])];
  };
  Dynamics.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Dynamics',
    interfaces: []
  };
  Dynamics.prototype.component1 = function () {
    return this.x;
  };
  Dynamics.prototype.component2 = function () {
    return this.y;
  };
  Dynamics.prototype.component3 = function () {
    return this.r;
  };
  Dynamics.prototype.component4 = function () {
    return this.dx;
  };
  Dynamics.prototype.component5 = function () {
    return this.dy;
  };
  Dynamics.prototype.component6 = function () {
    return this.dr;
  };
  Dynamics.prototype.copy_15yvbs$ = function (x, y, r, dx, dy, dr) {
    return new Dynamics(x === void 0 ? this.x : x, y === void 0 ? this.y : y, r === void 0 ? this.r : r, dx === void 0 ? this.dx : dx, dy === void 0 ? this.dy : dy, dr === void 0 ? this.dr : dr);
  };
  Dynamics.prototype.toString = function () {
    return 'Dynamics(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', r=' + Kotlin.toString(this.r)) + (', dx=' + Kotlin.toString(this.dx)) + (', dy=' + Kotlin.toString(this.dy)) + (', dr=' + Kotlin.toString(this.dr)) + ')';
  };
  Dynamics.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.r) | 0;
    result = result * 31 + Kotlin.hashCode(this.dx) | 0;
    result = result * 31 + Kotlin.hashCode(this.dy) | 0;
    result = result * 31 + Kotlin.hashCode(this.dr) | 0;
    return result;
  };
  Dynamics.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.r, other.r) && Kotlin.equals(this.dx, other.dx) && Kotlin.equals(this.dy, other.dy) && Kotlin.equals(this.dr, other.dr)))));
  };
  function GlowingSingleLineText(text, font, color, fadeInTime, locationX, locationY, centered) {
    SingleLineText.call(this, text, font, color, fadeInTime, locationX, locationY, centered);
  }
  GlowingSingleLineText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.font = this.font;
    ctx.shadowBlur = 10.0;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = ctx.globalAlpha + (this.isOutOfBounds_vux9f0$(0, 0) ? 1.0 : this.currentFrame / this.fadeInTime);
    if (this.centered) {
      ctx.textAlign = 'center';
    }
     else {
      ctx.textAlign = 'right';
    }
    ctx.fillText(this.text, this.locationX, this.locationY);
    ctx.restore();
  };
  GlowingSingleLineText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GlowingSingleLineText',
    interfaces: [SingleLineText]
  };
  function HTMLTypingElement(name, action, font, framesPrChar, locationX, locationY, color, textElements) {
    if (color === void 0)
      color = '#000';
    if (textElements === void 0)
      textElements = emptyList();
    this.name = name;
    this.action_5spmpm$_0 = action;
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.locationX = locationX;
    this.locationY = locationY;
    this.color = color;
    this.textElements = textElements;
    this.beginTag = new TypingSingleLineText('<' + this.name + '>', this.font, this.framesPrChar, 0.0, 0.0, false, this.color);
    this.wait = 0;
    this.currentElement = 0;
    this.WAIT_PR_ELEMENT = Math.floor(adjustForFrameRate(80.0));
    this.hasActionBeenInvoked = false;
  }
  HTMLTypingElement.prototype.update = function () {
    if (this.wait > 0) {
      this.wait = this.wait - 1 | 0;
    }
     else {
      if (!this.beginTag.isOutOfBounds_vux9f0$(0, 0)) {
        this.beginTag.update();
      }
       else {
        if (this.textElements.isEmpty())
          return;
        this.textElements.get_za3lpa$(this.currentElement).update();
        if (this.textElements.get_za3lpa$(this.currentElement).isOutOfBounds_vux9f0$(0, 0)) {
          if (this.currentElement < (this.textElements.size - 1 | 0)) {
            this.currentElement = this.currentElement + 1 | 0;
            this.wait = this.WAIT_PR_ELEMENT;
          }
        }
        if (!this.hasActionBeenInvoked && this.isOutOfBounds_vux9f0$(0, 0)) {
          this.action_5spmpm$_0();
          this.hasActionBeenInvoked = true;
          this.wait = this.WAIT_PR_ELEMENT;
        }
      }
    }
  };
  HTMLTypingElement.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return last(this.textElements).isOutOfBounds_vux9f0$(0, 0);
  };
  HTMLTypingElement.prototype.draw_f69bme$ = function (ctx) {
    var tmp$;
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    this.beginTag.draw_f69bme$(ctx);
    if (this.beginTag.isOutOfBounds_vux9f0$(0, 0)) {
      this.newLine_1ohm1e$_0(ctx);
      this.indent_3pcfsq$_0(ctx);
      tmp$ = this.currentElement;
      for (var i = 0; i <= tmp$; i++) {
        this.textElements.get_za3lpa$(i).draw_f69bme$(ctx);
        ctx.translate(0.0, this.textElements.get_za3lpa$(i).getHeight());
      }
      this.unindent_2r9j9b$_0(ctx);
      var $receiver = this.name;
      var endIndex = indexOf(this.name, ' ') !== -1 ? indexOf(this.name, ' ') : this.name.length;
      ctx.fillText('<\/' + $receiver.substring(0, endIndex) + '>', 0.0, 0.0);
    }
  };
  HTMLTypingElement.prototype.drawAsRoot_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.locationX, this.locationY);
    this.draw_f69bme$(ctx);
    ctx.restore();
  };
  HTMLTypingElement.prototype.newLine_1ohm1e$_0 = function (ctx) {
    ctx.translate(0.0, this.lineHeight_1pvhjz$_0());
  };
  HTMLTypingElement.prototype.indent_3pcfsq$_0 = function (ctx) {
    ctx.translate(this.lineHeight_1pvhjz$_0(), 0.0);
  };
  HTMLTypingElement.prototype.unindent_2r9j9b$_0 = function (ctx) {
    ctx.translate(-this.lineHeight_1pvhjz$_0(), 0.0);
  };
  HTMLTypingElement.prototype.lineHeight_1pvhjz$_0 = function () {
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    return toInt($receiver.substring(0, endIndex)) + 5.0;
  };
  HTMLTypingElement.prototype.changeColor_61zpoe$ = function (color) {
    var tmp$;
    tmp$ = this.textElements.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.changeColor_61zpoe$(color);
    }
    this.beginTag.changeColor_61zpoe$(color);
    this.color = color;
  };
  HTMLTypingElement.prototype.getHeight = function () {
    return this.textElements.isEmpty() ? this.lineHeight_1pvhjz$_0() * 2 : this.lineHeight_1pvhjz$_0();
  };
  HTMLTypingElement.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HTMLTypingElement',
    interfaces: [TextElement, Animatable]
  };
  function HTMLTypingElement_init(name, action, visualParameters, singleLines, $this) {
    if (singleLines === void 0)
      singleLines = emptyList();
    $this = $this || Object.create(HTMLTypingElement.prototype);
    HTMLTypingElement.call($this, name, action, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.color, singleLines);
    return $this;
  }
  function VisualParameters(font, framesPrChar, startingLocationX, startingLocationY, color, centered) {
    if (color === void 0)
      color = '#000';
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    this.color = color;
    this.centered = centered;
  }
  VisualParameters.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VisualParameters',
    interfaces: []
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  function MultilineGlowingText(text, font, color, fadeInTime, lineTime, locationX, locationY, centered) {
    MultilineText.call(this, lineTime);
    this.font = font;
    this.color = color;
    this.fadeInTime = fadeInTime;
    this.locationX = locationX;
    this.locationY = locationY;
    this.centered = centered;
    var $receiver = split(text.innerText, ['\n']);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (!(element.length === 0))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0, tmp$_0_0;
    var index = 0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      index = index + 1 | 0;
      destination_0.add_11rb$(new GlowingSingleLineText(item, this.font, this.color, this.fadeInTime, this.locationX, this.locationY, this.centered));
    }
    this.lines_xxfx6y$_0 = destination_0;
  }
  Object.defineProperty(MultilineGlowingText.prototype, 'lines', {
    get: function () {
      return this.lines_xxfx6y$_0;
    }
  });
  MultilineGlowingText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    if (this.wait > 0) {
      ctx.globalAlpha = this.wait / this.lineTime;
      this.lines.get_za3lpa$(this.currentLine - 1 | 0).draw_f69bme$(ctx);
    }
     else {
      this.lines.get_za3lpa$(this.currentLine).draw_f69bme$(ctx);
    }
    ctx.restore();
  };
  MultilineGlowingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineGlowingText',
    interfaces: [MultilineText]
  };
  function MultilineLoopingPulsingText(text, lineTime, font, color, fadeInTime, locationX, locationY, centered, pulseLength) {
    MultilineText.call(this, lineTime);
    var $receiver = split(text.innerText, ['\n']);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (!(element.length === 0))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination_0.add_11rb$(new PulsingSingleLineText(item, font, color, fadeInTime, locationX, locationY, centered, pulseLength));
    }
    this.lines_dvr5c1$_0 = destination_0;
  }
  Object.defineProperty(MultilineLoopingPulsingText.prototype, 'lines', {
    get: function () {
      return this.lines_dvr5c1$_0;
    }
  });
  MultilineLoopingPulsingText.prototype.update = function () {
    MultilineText.prototype.update.call(this);
    if (this.isOutOfBounds_vux9f0$(0, 0)) {
      this.currentLine = 0;
      var tmp$;
      tmp$ = this.lines.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        element.reset();
      }
    }
  };
  MultilineLoopingPulsingText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    if (this.wait <= 0) {
      this.lines.get_za3lpa$(this.currentLine).draw_f69bme$(ctx);
    }
    ctx.restore();
  };
  MultilineLoopingPulsingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineLoopingPulsingText',
    interfaces: [MultilineText]
  };
  function MultilineText(lineTime) {
    this.lineTime = Math.ceil(adjustForFrameRate(lineTime));
    this.wait = 0;
    this.currentLine = 0;
  }
  MultilineText.prototype.update = function () {
    var tmp$;
    if (this.wait > 0) {
      this.wait = this.wait - 1 | 0;
    }
     else {
      if (!this.lines.get_za3lpa$(this.currentLine).isOutOfBounds_vux9f0$(0, 0)) {
        this.lines.get_za3lpa$(this.currentLine).update();
        if (this.lines.get_za3lpa$(this.currentLine).isOutOfBounds_vux9f0$(0, 0)) {
          this.wait = this.lineTime;
          tmp$ = this.currentLine, this.currentLine = tmp$ + 1 | 0;
        }
      }
    }
  };
  MultilineText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return last(this.lines).isOutOfBounds_vux9f0$(0, 0) && this.wait <= 1;
  };
  MultilineText.prototype.draw_f69bme$ = function (ctx) {
    var tmp$, tmp$_0;
    ctx.save();
    if (this.wait > 0) {
      tmp$ = this.currentLine;
      for (var i = 0; i < tmp$; i++) {
        this.lines.get_za3lpa$(i).draw_f69bme$(ctx);
      }
    }
     else {
      tmp$_0 = this.currentLine;
      for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
        this.lines.get_za3lpa$(i_0).draw_f69bme$(ctx);
      }
    }
    ctx.restore();
  };
  MultilineText.prototype.changeColor_61zpoe$ = function (color) {
    var tmp$;
    tmp$ = this.lines.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.changeColor_61zpoe$(color);
    }
  };
  MultilineText.prototype.getHeight = function () {
    return (first_0(this.lines).getHeight() + 5) * (this.currentLine + 1 | 0);
  };
  MultilineText.prototype.fitToWidth_ggs6sk$ = function (ctx, width) {
    var tmp$;
    tmp$ = this.lines.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.fitToWidth_ggs6sk$(ctx, width);
    }
    return this;
  };
  MultilineText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineText',
    interfaces: [TextElement, Animatable]
  };
  function MultilineTypingText(text, font, framesPrChar, lineTime, startingLocationX, startingLocationY, centered, color) {
    if (color === void 0)
      color = '#000';
    MultilineText.call(this, lineTime);
    this.framesPrChar = framesPrChar;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    var destination = ArrayList_init();
    var tmp$;
    for (tmp$ = 0; tmp$ !== text.length; ++tmp$) {
      var element = text[tmp$];
      if (!(element.length === 0))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0, tmp$_0_0;
    var index = 0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1 = destination_0.add_11rb$;
      var closure$color = color;
      var index_0 = (tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0);
      var tmp$_2 = this.framesPrChar;
      var tmp$_3 = this.startingLocationX;
      var tmp$_4 = this.startingLocationY;
      var endIndex = indexOf(font, 'p');
      tmp$_1.call(destination_0, new TypingSingleLineText(item, font, tmp$_2, tmp$_3, tmp$_4 + Kotlin.imul(index_0, toInt(font.substring(0, endIndex)) + 5 | 0), centered, closure$color));
    }
    this.lines_ks2pi6$_0 = destination_0;
  }
  Object.defineProperty(MultilineTypingText.prototype, 'lines', {
    get: function () {
      return this.lines_ks2pi6$_0;
    }
  });
  MultilineTypingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineTypingText',
    interfaces: [MultilineText, Animatable]
  };
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function MultilineTypingText_init(text, font, framesPrChar, lineWait, startingLocationX, startingLocationY, centered, color, $this) {
    if (color === void 0)
      color = '#000';
    $this = $this || Object.create(MultilineTypingText.prototype);
    MultilineTypingText.call($this, copyToArray(split(text.innerText, ['\n'])), font, framesPrChar, lineWait, startingLocationX, startingLocationY, centered, color);
    return $this;
  }
  function MultilineTypingText_init_0(htmlParagraphElement, lineWait, visuals, $this) {
    $this = $this || Object.create(MultilineTypingText.prototype);
    MultilineTypingText_init(htmlParagraphElement, visuals.font, visuals.framesPrChar, lineWait, visuals.startingLocationX, visuals.startingLocationY, visuals.centered, visuals.color, $this);
    return $this;
  }
  function PulsingSingleLineText(text, font, color, fadeInTime, locationX, locationY, centered, pulseLength) {
    SingleLineText.call(this, text, font, color, fadeInTime, locationX, locationY, centered);
    this.pulseLength = pulseLength;
  }
  PulsingSingleLineText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.font = this.font;
    if (this.getHeight() > 15) {
      ctx.fillStyle = '#000';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.getHeight() / Math.abs(this.currentFrame % (this.pulseLength * 2 | 0) - this.pulseLength);
    }
     else {
      ctx.fillStyle = this.color;
    }
    if (this.centered) {
      ctx.textAlign = 'center';
    }
     else {
      ctx.textAlign = 'right';
    }
    ctx.translate(this.locationX, this.locationY);
    ctx.fillText(this.text, 0.0, 0.0);
    ctx.restore();
  };
  PulsingSingleLineText.prototype.reset = function () {
    this.currentFrame = 0;
  };
  PulsingSingleLineText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PulsingSingleLineText',
    interfaces: [SingleLineText]
  };
  function SingleLineText(text, font, color, fadeInTime, locationX, locationY, centered) {
    this.text = text;
    this.font = font;
    this.color = color;
    this.locationX = locationX;
    this.locationY = locationY;
    this.centered = centered;
    this.fadeInTime = adjustForFrameRate(fadeInTime);
    this.currentFrame = 0;
  }
  SingleLineText.prototype.getHeight = function () {
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    return toDouble($receiver.substring(0, endIndex));
  };
  SingleLineText.prototype.update = function () {
    this.currentFrame = this.currentFrame + 1 | 0;
  };
  SingleLineText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.fadeInTime < this.currentFrame;
  };
  SingleLineText.prototype.changeColor_61zpoe$ = function (color) {
    this.color = color;
  };
  SingleLineText.prototype.fitToWidth_ggs6sk$ = function (ctx, width) {
    ctx.save();
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    var size = toInt($receiver.substring(0, endIndex)) + 1 | 0;
    do {
      size = size - 1 | 0;
      var tmp$ = size.toString();
      var $receiver_0 = this.font;
      var startIndex = indexOf(this.font, 'p');
      ctx.font = tmp$ + $receiver_0.substring(startIndex);
      var length = ctx.measureText(this.text).width;
    }
     while (length > width);
    var tmp$_0 = size.toString();
    var $receiver_1 = this.font;
    var startIndex_0 = indexOf(this.font, 'p');
    this.font = tmp$_0 + $receiver_1.substring(startIndex_0);
    ctx.restore();
    return this;
  };
  SingleLineText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SingleLineText',
    interfaces: [TextElement, Animatable]
  };
  function TextElement() {
  }
  TextElement.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'TextElement',
    interfaces: [Animatable]
  };
  function TypingSingleLineText(text, font, framesPrChar, locationX, locationY, centered, color) {
    if (color === void 0)
      color = '#000';
    SingleLineText.call(this, text, font, color, numberToInt(framesPrChar), locationX, locationY, centered);
  }
  TypingSingleLineText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.currentFrame / this.fadeInTime > this.text.length;
  };
  TypingSingleLineText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.locationX, this.locationY);
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    var $receiver = this.text;
    var endIndex = numberToInt(this.currentFrame / this.fadeInTime);
    ctx.fillText($receiver.substring(0, endIndex), 0.0, 0.0);
    ctx.restore();
  };
  TypingSingleLineText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TypingSingleLineText',
    interfaces: [SingleLineText, Animatable]
  };
  function TypingSingleLineText_init(textElement, font, framesPrChar, startingLocationX, startingLocationY, centered, color, $this) {
    if (color === void 0)
      color = '#000';
    $this = $this || Object.create(TypingSingleLineText.prototype);
    TypingSingleLineText.call($this, replace(textElement.innerHTML, '<br>', ''), font, framesPrChar, startingLocationX, startingLocationY, centered, color);
    return $this;
  }
  function TypingSingleLineText_init_0(text, visualParameters, $this) {
    $this = $this || Object.create(TypingSingleLineText.prototype);
    TypingSingleLineText.call($this, text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.centered, visualParameters.color);
    return $this;
  }
  function TypingSingleLineText_init_1(text, visualParameters, $this) {
    $this = $this || Object.create(TypingSingleLineText.prototype);
    TypingSingleLineText_init(text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.centered, visualParameters.color, $this);
    return $this;
  }
  function HTMLAnimationPage(ctx) {
    this.ctx = ctx;
    this.visuals = new VisualParameters('16px serif', 3.0, 0.0, 16.0, '#000', false);
    this.elementVisuals = new VisualParameters('16px serif', 3.0, 0.0, 0.0, '#000', false);
    var tmp$;
    this.htmlanimation = HTMLTypingElement_init('HTML', HTMLAnimationPage$htmlanimation$lambda, this.visuals, listOf_0([HTMLTypingElement_init('head', HTMLAnimationPage$htmlanimation$lambda_0, this.visuals, listOf_0([TypingSingleLineText_init_0('<meta charset="UTF-8">', this.elementVisuals), HTMLTypingElement_init('title', HTMLAnimationPage$htmlanimation$lambda_1, this.visuals, listOf(TypingSingleLineText_init_0('Ximias -introduction', this.elementVisuals))), HTMLTypingElement_init('style', HTMLAnimationPage$htmlanimation$lambda_2(this), this.visuals, listOf(TypingSingleLineText_init_0('{background-color:#000; color:#AAA;}', this.elementVisuals)))])), HTMLTypingElement_init('body', HTMLAnimationPage$htmlanimation$lambda_3, this.visuals, listOf(HTMLTypingElement_init('div id="menu"', HTMLAnimationPage$htmlanimation$lambda_4, this.visuals, listOf(MultilineTypingText_init_0(Kotlin.isType(tmp$ = document.getElementById('boring'), HTMLParagraphElement) ? tmp$ : throwCCE(), 30, this.elementVisuals)))))]));
    this.wait = 120;
    this.animateHTML();
    this.darkenTime = FADE_TIME / 8 | 0;
  }
  HTMLAnimationPage.prototype.changeColor_0 = function (color) {
    this.visuals.color = color;
    this.htmlanimation.changeColor_61zpoe$(color);
  };
  function HTMLAnimationPage$animateHTML$lambda(this$HTMLAnimationPage) {
    return function (it) {
      this$HTMLAnimationPage.animateHTML();
      return Unit;
    };
  }
  function HTMLAnimationPage$animateHTML$lambda_0(this$HTMLAnimationPage) {
    return function (it) {
      this$HTMLAnimationPage.animateHTML();
      return Unit;
    };
  }
  HTMLAnimationPage.prototype.animateHTML = function () {
    this.wipe();
    if (!this.htmlanimation.isOutOfBounds_vux9f0$(0, 0)) {
      this.htmlanimation.drawAsRoot_f69bme$(this.ctx);
      this.htmlanimation.update();
      window.requestAnimationFrame(HTMLAnimationPage$animateHTML$lambda(this));
    }
     else {
      if (this.wait > 0) {
        this.htmlanimation.drawAsRoot_f69bme$(this.ctx);
        this.wait = this.wait - 1 | 0;
        window.requestAnimationFrame(HTMLAnimationPage$animateHTML$lambda_0(this));
      }
       else {
        new KotlinPage(this.ctx);
      }
    }
  };
  HTMLAnimationPage.prototype.wipe = function () {
    if (equals(this.visuals.color, '#000')) {
      whiteFrame(this.ctx);
    }
     else {
      if (this.darkenTime > 0) {
        this.darkenTime = this.darkenTime - 1 | 0;
        darkenAdjusted(this.ctx, 8);
      }
       else {
        darkenAdjusted(this.ctx, 255);
      }
    }
  };
  function HTMLAnimationPage$htmlanimation$lambda() {
    return Unit;
  }
  function HTMLAnimationPage$htmlanimation$lambda_0() {
    return Unit;
  }
  function HTMLAnimationPage$htmlanimation$lambda_1() {
    document.title = 'Ximias -introduction';
    return Unit;
  }
  function HTMLAnimationPage$htmlanimation$lambda_2(this$HTMLAnimationPage) {
    return function () {
      var tmp$, tmp$_0;
      (tmp$_0 = (tmp$ = document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#000') : null;
      this$HTMLAnimationPage.changeColor_0('#AAA');
      return Unit;
    };
  }
  function HTMLAnimationPage$htmlanimation$lambda_3() {
    return Unit;
  }
  function HTMLAnimationPage$htmlanimation$lambda_4() {
    return Unit;
  }
  HTMLAnimationPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HTMLAnimationPage',
    interfaces: []
  };
  function HelixPage(ctx) {
    this.ctx_0 = ctx;
    this.particles = Kotlin.newArray((Kotlin.imul(this.ctx_0.canvas.width, this.ctx_0.canvas.height) / 160000 | 0) + 1 | 0, null);
    this.populateParticles_0();
  }
  function HelixPage$animateAsPage$lambda(this$HelixPage) {
    return function (it) {
      this$HelixPage.animateAsPage();
      return Unit;
    };
  }
  HelixPage.prototype.animateAsPage = function () {
    darkenAdjusted(this.ctx_0, 1);
    var tmp$;
    tmp$ = filterNotNull(this.particles).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx_0);
      element.update();
    }
    this.populateParticles_0();
    window.requestAnimationFrame(HelixPage$animateAsPage$lambda(this));
  };
  HelixPage.prototype.animate = function () {
    this.ctx_0.save();
    this.ctx_0.globalCompositeOperation = 'lighten';
    var tmp$;
    tmp$ = filterNotNull(this.particles).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx_0);
      element.update();
    }
    this.ctx_0.restore();
    this.populateParticles_0();
  };
  HelixPage.prototype.populateParticles_0 = function () {
    var $receiver = this.particles;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      var index_0 = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
      if (item == null || item.isOutOfBounds_vux9f0$(this.ctx_0.canvas.width, this.ctx_0.canvas.height)) {
        if (Math.random() < 0.1) {
          this.particles[index_0] = this.randomDoubleHelix();
        }
         else {
          this.particles[index_0] = this.randomHelix();
        }
      }
    }
  };
  HelixPage.prototype.specifiedParticle = function () {
    return new Particle(new Dynamics(500.0, 500.0, 50.0, 0.1, 0.1, 0.0), 50.0);
  };
  HelixPage.prototype.randomParticle = function () {
    return new Particle(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, this.randomizeWithMinimum_yvo9jy$(-2.0, 2.0, 0.2), this.randomizeWithMinimum_yvo9jy$(-2.0, 2.0, 0.2), this.randomizeWithMinimum_yvo9jy$(-0.5, 0.5, 0.05)), 20.0);
  };
  HelixPage.prototype.randomHelix = function () {
    return new LineHelix(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, this.randomizeWithMinimum_yvo9jy$(-1.0, 1.0, 0.1), this.randomizeWithMinimum_yvo9jy$(-1.0, 1.0, 0.1), this.randomizeWithMinimum_yvo9jy$(-0.125, 0.125, 0.005)), 30.0);
  };
  HelixPage.prototype.randomDoubleHelix = function () {
    return new NHelix(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, this.randomizeWithMinimum_yvo9jy$(-1.0, 1.0, 0.15), this.randomizeWithMinimum_yvo9jy$(-1.0, 1.0, 0.15), this.randomizeWithMinimum_yvo9jy$(-0.1, 0.1, 0.005)), 30.0, 2);
  };
  HelixPage.prototype.randomizeWithMinimum_yvo9jy$ = function (min, max, lowerValue) {
    var ans = Math.random() * (max + Math.abs(min)) + min;
    if (Math.abs(ans) < lowerValue) {
      if (ans < 0) {
        ans -= lowerValue;
      }
       else {
        ans += lowerValue;
      }
    }
    return ans;
  };
  HelixPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HelixPage',
    interfaces: []
  };
  var Math_0 = Math;
  function Page(ctx) {
    this.ctx = ctx;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    tmp$_0 = Kotlin.isType(tmp$ = document.getElementById('exclamation'), HTMLImageElement) ? tmp$ : throwCCE();
    tmp$_1 = this.ctx.canvas.width / 2.0;
    var tmp$_5 = this.ctx.canvas.height;
    var a = this.ctx.canvas.width * 0.75;
    var b = this.ctx.canvas.height * 0.75;
    tmp$_2 = (tmp$_5 + Math_0.min(a, b)) / 2;
    var a_0 = this.ctx.canvas.width * 0.75;
    var b_0 = this.ctx.canvas.height * 0.75;
    tmp$_3 = numberToInt(Math_0.min(a_0, b_0));
    var a_1 = this.ctx.canvas.width * 0.75;
    var b_1 = this.ctx.canvas.height * 0.75;
    this.image = AppearingImage_init_1(tmp$_0, tmp$_1, tmp$_2, tmp$_3, numberToInt(Math_0.min(a_1, b_1)), -4.0);
    this.lineSpace = 5;
    this.greetingText = MultilineTypingText_init(Kotlin.isType(tmp$_4 = document.getElementById('greeting'), HTMLParagraphElement) ? tmp$_4 : throwCCE(), '16px Serif', 3.0, 25, 1.0, 16.0 + this.lineSpace, false);
    this.frameCount = 0;
    this.animateExclamationMark();
  }
  function Page$animateExclamationMark$lambda(this$Page) {
    return function (it) {
      this$Page.animateExclamationMark();
      return Unit;
    };
  }
  function Page$animateExclamationMark$lambda_0(this$Page) {
    return function (it) {
      this$Page.animateIntro();
      return Unit;
    };
  }
  function Page$animateExclamationMark$lambda_1(this$Page) {
    return function (it) {
      this$Page.animateExclamationMark();
      return Unit;
    };
  }
  Page.prototype.animateExclamationMark = function () {
    if (!this.image.isOutOfBounds_vux9f0$(0, 0)) {
      whiteFrame(this.ctx);
      this.image.draw_f69bme$(this.ctx);
      this.image.update();
      window.requestAnimationFrame(Page$animateExclamationMark$lambda(this));
    }
     else {
      if (this.frameCount > (FADE_TIME / 4 | 0)) {
        this.frameCount = 0;
        window.requestAnimationFrame(Page$animateExclamationMark$lambda_0(this));
      }
       else {
        this.frameCount = this.frameCount + 1 | 0;
        darkenAdjusted(this.ctx, 4);
        window.requestAnimationFrame(Page$animateExclamationMark$lambda_1(this));
      }
    }
  };
  function Page$animateIntro$lambda(this$Page) {
    return function (it) {
      this$Page.animateIntro();
      return Unit;
    };
  }
  function Page$animateIntro$lambda_0(this$Page) {
    return function (it) {
      this$Page.animateIntro();
      return Unit;
    };
  }
  Page.prototype.animateIntro = function () {
    if (!this.greetingText.isOutOfBounds_vux9f0$(0, 0)) {
      whiteFrame(this.ctx);
      this.greetingText.draw_f69bme$(this.ctx);
      this.greetingText.update();
      window.requestAnimationFrame(Page$animateIntro$lambda(this));
    }
     else {
      if (this.frameCount <= (FADE_TIME / 5 | 0)) {
        this.frameCount = this.frameCount + 1 | 0;
        darkenAdjusted(this.ctx, 5);
        window.requestAnimationFrame(Page$animateIntro$lambda_0(this));
      }
       else {
        this.frameCount = 0;
        new HTMLAnimationPage(this.ctx);
      }
    }
  };
  Page.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Page',
    interfaces: []
  };
  function main(args) {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('where the magic happens'), HTMLCanvasElement) ? tmp$ : throwCCE();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.globalCompositeOperation = 'source-over';
    frameRateCalculator(ctx);
    var x = adjustForFrameRate(255.0);
    FADE_TIME = numberToInt(Math_0.ceil(x));
  }
  var FADE_TIME;
  function darkenAdjusted($receiver, amount) {
    var tmp$;
    var x = (amount * 60 | 0) / fps;
    var adjAmount = numberToInt(Math_0.ceil(x));
    var ctx = $receiver;
    var width = $receiver.canvas.width;
    var height = $receiver.canvas.height;
    var image = ctx.getImageData(0.0, 0.0, width, height);
    var data = image.data;
    var buf = new ArrayBuffer(data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data32 = new Uint32Array(buf);
    tmp$ = data32.length;
    for (var i = 0; i < tmp$; i++) {
      var a = (data32[i] >>> 24) - adjAmount | 0;
      if (a !== 0) {
        println(data32[i]);
        if (a < 0) {
          data32[i] = 0;
        }
         else {
          println('yep' + toString(a << 24));
          data32[i] = a << 24;
        }
      }
    }
    image.data.set(buf8);
    ctx.putImageData(image, 0.0, 0.0);
  }
  function darken($receiver, amount) {
    var ctx = $receiver;
    var width = $receiver.canvas.width;
    var height = $receiver.canvas.height;
    var lastImage = ctx.getImageData(0, 0, width, height);
    var pixelData = lastImage.data;
    var i;
    for (i = 3; i < pixelData.length; i += 4) {
      pixelData[i] -= amount;
    }
    ctx.putImageData(lastImage, 0, 0);
  }
  function whiteFrame($receiver) {
    $receiver.fillStyle = '#FFF';
    $receiver.fillRect(0.0, 0.0, $receiver.canvas.width, $receiver.canvas.height);
  }
  var frameCalCount;
  var startTime;
  var fps;
  function frameRateCalculator$lambda(closure$ctx) {
    return function (it) {
      frameRateCalculator(closure$ctx);
      return Unit;
    };
  }
  function frameRateCalculator(ctx) {
    frameCalCount = frameCalCount + 1 | 0;
    darkenAdjusted(ctx, 3);
    fps = 1000 / (((new Date()).getTime() - startTime.getTime()) / frameCalCount);
    if (frameCalCount % 10 === 0)
      println('fps: ' + toString(fps));
    if (frameCalCount < 50) {
      window.requestAnimationFrame(frameRateCalculator$lambda(ctx));
    }
     else {
      new IndexPage(ctx);
    }
  }
  function adjustForFrameRate(framesIn60) {
    return framesIn60 * (fps / 60.0);
  }
  function IndexPage(ctx) {
    this.ctx = ctx;
    this.fadeFrames = 30;
    this.socialDim = 64.0;
    this.padding = 5.0;
    this.centerX = this.ctx.canvas.width / 2.0;
    this.socialX = this.centerX - this.socialDim / 2 - this.socialDim / 2;
    this.socialY = this.ctx.canvas.height - this.socialDim - this.padding;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.facebook = new GreyoutIcon(Kotlin.isType(tmp$ = document.getElementById('facebook'), HTMLImageElement) ? tmp$ : throwCCE(), this.socialX + -1 * (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, this.fadeFrames, IndexPage$facebook$lambda);
    this.twitter = new GreyoutIcon(Kotlin.isType(tmp$_0 = document.getElementById('twitter'), HTMLImageElement) ? tmp$_0 : throwCCE(), this.socialX, this.socialY, this.socialDim, this.socialDim, this.fadeFrames, IndexPage$twitter$lambda);
    this.git = new GreyoutIcon(Kotlin.isType(tmp$_1 = document.getElementById('git'), HTMLImageElement) ? tmp$_1 : throwCCE(), this.socialX + (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, this.fadeFrames, IndexPage$git$lambda);
    this.mail = new GreyoutIcon(Kotlin.isType(tmp$_2 = document.getElementById('gmail'), HTMLImageElement) ? tmp$_2 : throwCCE(), this.socialX + 2 * (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, this.fadeFrames, IndexPage$mail$lambda);
    this.ximias = new GreyoutIcon(Kotlin.isType(tmp$_3 = document.getElementById('ximias'), HTMLImageElement) ? tmp$_3 : throwCCE(), this.centerX - 128, (this.ctx.canvas.height / 2 | 0) - 128.0, 256.0, 256.0, this.fadeFrames, IndexPage$ximias$lambda);
    this.quotes = (new MultilineLoopingPulsingText(Kotlin.isType(tmp$_4 = document.getElementById('inspiration'), HTMLParagraphElement) ? tmp$_4 : throwCCE(), FADE_TIME, '80px verdana', '#F48A00', 800, this.centerX, 85.0, true, 150)).fitToWidth_ggs6sk$(this.ctx, this.ctx.canvas.width > this.ctx.canvas.height ? this.ctx.canvas.width / 2 | 0 : this.ctx.canvas.width);
    this.mouseElements = listOf_0([this.facebook, this.twitter, this.git, this.mail, this.ximias]);
    this.mouseUpdateElements = emptyList();
    this.background = new HelixPage(this.ctx);
    this.animate_0();
    document.addEventListener('mousemove', IndexPage_init$lambda(this));
    document.addEventListener('click', IndexPage_init$lambda_0(this));
  }
  function IndexPage$animate$lambda(this$IndexPage) {
    return function (it) {
      this$IndexPage.animate_0();
      return Unit;
    };
  }
  IndexPage.prototype.animate_0 = function () {
    darkenAdjusted(this.ctx, 1);
    this.background.animate();
    this.quotes.draw_f69bme$(this.ctx);
    this.quotes.update();
    var tmp$;
    tmp$ = this.mouseElements.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx);
    }
    var tmp$_0;
    tmp$_0 = this.mouseUpdateElements.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      element_0.onMouseOverUpdate_f69bme$(this.ctx);
    }
    window.requestAnimationFrame(IndexPage$animate$lambda(this));
  };
  IndexPage.prototype.mouseMove_9ojx7i$ = function (e) {
    if (Kotlin.isType(e, MouseEvent)) {
      println('moved');
      var $receiver = this.mouseElements;
      var destination = ArrayList_init();
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.isMouseOver_vux9f0$(e.clientX, e.clientY))
          destination.add_11rb$(element);
      }
      this.mouseUpdateElements = destination;
    }
  };
  IndexPage.prototype.mouseClicked_9ojx7i$ = function (e) {
    if (Kotlin.isType(e, MouseEvent)) {
      println('clicked');
      var $receiver = this.mouseElements;
      var destination = ArrayList_init();
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.isMouseOver_vux9f0$(e.clientX, e.clientY))
          destination.add_11rb$(element);
      }
      var tmp$_0;
      tmp$_0 = destination.iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        element_0.clicked();
      }
    }
  };
  function IndexPage$facebook$lambda() {
    window.location.href = 'http://www.facebook.com/alex.holberg.94';
    return Unit;
  }
  function IndexPage$twitter$lambda() {
    window.location.href = 'https://twitter.com/Ximias';
    return Unit;
  }
  function IndexPage$git$lambda() {
    window.location.href = 'https://github.com/aalleexxx5';
    return Unit;
  }
  function IndexPage$mail$lambda() {
    window.location.href = 'mailto:alexx4387@gmail.com';
    return Unit;
  }
  function IndexPage$ximias$lambda() {
    return Unit;
  }
  function IndexPage_init$lambda(this$IndexPage) {
    return function (event) {
      this$IndexPage.mouseMove_9ojx7i$(event);
      return Unit;
    };
  }
  function IndexPage_init$lambda_0(this$IndexPage) {
    return function (event) {
      this$IndexPage.mouseClicked_9ojx7i$(event);
      return Unit;
    };
  }
  IndexPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IndexPage',
    interfaces: []
  };
  function KotlinPage(ctx) {
    this.ctx = ctx;
    var tmp$, tmp$_0;
    this.bulb = AppearingImage_init_1(Kotlin.isType(tmp$ = document.getElementById('light'), HTMLImageElement) ? tmp$ : throwCCE(), this.ctx.canvas.width / 2.0, (this.ctx.canvas.height + Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75)) / 2, numberToInt(Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75)), numberToInt(Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75)), -3.0);
    this.idea = (new MultilineGlowingText(Kotlin.isType(tmp$_0 = document.getElementById('idea'), HTMLParagraphElement) ? tmp$_0 : throwCCE(), '100px sans-serif', '#FF6', 10, 120, this.ctx.canvas.width / 2.0, this.ctx.canvas.height / 2.0, true)).fitToWidth_ggs6sk$(this.ctx, numberToInt(this.ctx.canvas.width / 1.5));
    this.wait = FADE_TIME;
    this.animateBulb();
  }
  function KotlinPage$animateBulb$lambda(this$KotlinPage) {
    return function (it) {
      this$KotlinPage.animateBulb();
      return Unit;
    };
  }
  function KotlinPage$animateBulb$lambda_0(this$KotlinPage) {
    return function (it) {
      this$KotlinPage.animateBulb();
      return Unit;
    };
  }
  KotlinPage.prototype.animateBulb = function () {
    if (!this.bulb.isOutOfBounds_vux9f0$(0, 0)) {
      darkenAdjusted(this.ctx, 255);
      this.bulb.draw_f69bme$(this.ctx);
      this.bulb.update();
      window.requestAnimationFrame(KotlinPage$animateBulb$lambda(this));
    }
     else {
      if (this.wait > 0) {
        this.wait = this.wait - 5 | 0;
        darkenAdjusted(this.ctx, 5);
        window.requestAnimationFrame(KotlinPage$animateBulb$lambda_0(this));
      }
       else {
        this.wait = FADE_TIME;
        this.animateText_0();
      }
    }
  };
  function KotlinPage$animateText$lambda(this$KotlinPage) {
    return function (it) {
      this$KotlinPage.animateText_0();
      return Unit;
    };
  }
  function KotlinPage$animateText$lambda_0(this$KotlinPage) {
    return function (it) {
      this$KotlinPage.animateText_0();
      return Unit;
    };
  }
  KotlinPage.prototype.animateText_0 = function () {
    if (!this.idea.isOutOfBounds_vux9f0$(0, 0)) {
      darkenAdjusted(this.ctx, 255);
      this.idea.draw_f69bme$(this.ctx);
      this.idea.update();
      window.requestAnimationFrame(KotlinPage$animateText$lambda(this));
    }
     else {
      if (this.wait > 0) {
        this.wait = this.wait - 5 | 0;
        darkenAdjusted(this.ctx, 5);
        window.requestAnimationFrame(KotlinPage$animateText$lambda_0(this));
      }
       else {
        new IndexPage(this.ctx);
      }
    }
  };
  KotlinPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KotlinPage',
    interfaces: []
  };
  var package$Elements = _.Elements || (_.Elements = {});
  package$Elements.Animatable = Animatable;
  package$Elements.Clickable = Clickable;
  package$Elements.Drawable = Drawable;
  var package$Images = package$Elements.Images || (package$Elements.Images = {});
  package$Images.AppearingImage_init_xnf5su$ = AppearingImage_init;
  package$Images.AppearingImage_init_trr8f3$ = AppearingImage_init_0;
  package$Images.AppearingImage_init_sq2yn3$ = AppearingImage_init_1;
  package$Images.AppearingImage = AppearingImage;
  package$Images.GreyoutIcon = GreyoutIcon;
  var package$Particles = package$Elements.Particles || (package$Elements.Particles = {});
  package$Particles.Helix = Helix;
  package$Particles.HueColorAnimation = HueColorAnimation;
  package$Particles.LineHelix = LineHelix;
  package$Particles.NHelix = NHelix;
  package$Particles.Particle = Particle;
  package$Particles.Dynamics = Dynamics;
  var package$Text = package$Elements.Text || (package$Elements.Text = {});
  package$Text.GlowingSingleLineText = GlowingSingleLineText;
  package$Text.HTMLTypingElement_init_gvfkb9$ = HTMLTypingElement_init;
  package$Text.HTMLTypingElement = HTMLTypingElement;
  package$Text.VisualParameters = VisualParameters;
  package$Text.MultilineGlowingText = MultilineGlowingText;
  package$Text.MultilineLoopingPulsingText = MultilineLoopingPulsingText;
  package$Text.MultilineText = MultilineText;
  package$Text.MultilineTypingText_init_wdar0h$ = MultilineTypingText_init;
  package$Text.MultilineTypingText_init_br7llk$ = MultilineTypingText_init_0;
  package$Text.MultilineTypingText = MultilineTypingText;
  package$Text.PulsingSingleLineText = PulsingSingleLineText;
  package$Text.SingleLineText = SingleLineText;
  package$Text.TextElement = TextElement;
  package$Text.TypingSingleLineText_init_xie38l$ = TypingSingleLineText_init;
  package$Text.TypingSingleLineText_init_o8s072$ = TypingSingleLineText_init_0;
  package$Text.TypingSingleLineText_init_va5oxi$ = TypingSingleLineText_init_1;
  package$Text.TypingSingleLineText = TypingSingleLineText;
  var package$Pages = _.Pages || (_.Pages = {});
  package$Pages.HTMLAnimationPage = HTMLAnimationPage;
  package$Pages.HelixPage = HelixPage;
  package$Pages.Page = Page;
  package$Pages.main_kand9s$ = main;
  Object.defineProperty(package$Pages, 'FADE_TIME', {
    get: function () {
      return FADE_TIME;
    },
    set: function (value) {
      FADE_TIME = value;
    }
  });
  package$Pages.darkenAdjusted_1nogux$ = darkenAdjusted;
  package$Pages.darken_1nogux$ = darken;
  package$Pages.whiteFrame_qtrdl1$ = whiteFrame;
  Object.defineProperty(package$Pages, 'frameCalCount', {
    get: function () {
      return frameCalCount;
    },
    set: function (value) {
      frameCalCount = value;
    }
  });
  Object.defineProperty(package$Pages, 'startTime', {
    get: function () {
      return startTime;
    },
    set: function (value) {
      startTime = value;
    }
  });
  Object.defineProperty(package$Pages, 'fps', {
    get: function () {
      return fps;
    },
    set: function (value) {
      fps = value;
    }
  });
  package$Pages.frameRateCalculator_f69bme$ = frameRateCalculator;
  package$Pages.adjustForFrameRate_14dthe$ = adjustForFrameRate;
  package$Pages.IndexPage = IndexPage;
  package$Pages.KotlinPage = KotlinPage;
  FADE_TIME = 255;
  frameCalCount = 0;
  startTime = new Date();
  fps = 60.0;
  main([]);
  Kotlin.defineModule('Kotlicles', _);
  return _;
}(typeof Kotlicles === 'undefined' ? {} : Kotlicles, kotlin);

//# sourceMappingURL=Kotlicles.js.map

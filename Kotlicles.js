if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Kotlicles'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Kotlicles'.");
}
var Kotlicles = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var indexOf = Kotlin.kotlin.text.indexOf_l5u8uk$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Unit = Kotlin.kotlin.Unit;
  var equals = Kotlin.equals;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var listOf_0 = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_emfgvx$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var first_0 = Kotlin.kotlin.collections.first_us0mfu$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  function Animatable() {
  }
  Animatable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Animatable',
    interfaces: [Drawable]
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
    AppearingImage.call($this, new Dynamics(width, 0.0, 0.0, 0.0, percentagePrFrame * (height / 100 | 0), 0.0), image, appearX - (width / 2 | 0), appearY);
    $this.image.width = width;
    $this.image.height = height;
    return $this;
  }
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
  function GlowingText(text, font, color, fadeInTime, locationX, locationY, centered) {
    this.text = text;
    this.font = font;
    this.color = color;
    this.fadeInTime = fadeInTime;
    this.locationX = locationX;
    this.locationY = locationY;
    this.centered = centered;
    this.step = 0;
  }
  GlowingText.prototype.changeColor_61zpoe$ = function (color) {
    this.color = color;
  };
  GlowingText.prototype.getHeight = function () {
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    return toDouble($receiver.substring(0, endIndex));
  };
  GlowingText.prototype.update = function () {
    this.step = this.step + 1 | 0;
  };
  GlowingText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.fadeInTime < this.step;
  };
  GlowingText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.font = this.font;
    ctx.shadowBlur = 10.0;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = ctx.globalAlpha + (this.isOutOfBounds_vux9f0$(0, 0) ? 1.0 : this.step / this.fadeInTime);
    if (this.centered) {
      ctx.textAlign = 'center';
    }
     else {
      ctx.textAlign = 'right';
    }
    ctx.fillText(this.text, this.locationX, this.locationY);
    ctx.restore();
  };
  GlowingText.prototype.fitToWidth_ggs6sk$ = function (ctx, width) {
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
  GlowingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GlowingText',
    interfaces: [TextElement]
  };
  function GreyoutIcon(image, locationX, locationY, width, height, fadeFrames, onClick) {
    this.image = image;
    this.locationX = locationX;
    this.locationY = locationY;
    this.width = width;
    this.height = height;
    this.fadeFrames = fadeFrames;
    this.onClick = onClick;
    this.step = this.fadeFrames;
    this.greyImage = null;
    var tmp$, tmp$_0;
    var greyCanvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    greyCanvas.width = this.width | 0;
    greyCanvas.height = this.height | 0;
    var ctx = Kotlin.isType(tmp$_0 = greyCanvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.drawImage(this.image, 0.0, 0.0, this.image.naturalWidth, this.image.naturalHeight, 0.0, 0.0, this.width, this.height);
    var imageData = ctx.getImageData(0.0, 0.0, this.width, this.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
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
    ctx.putImageData(this.greyImage, this.locationX, this.locationY);
    if (this.step < this.fadeFrames) {
      this.step = this.step + 1 | 0;
      ctx.globalAlpha = (this.fadeFrames - this.step | 0) * (1 / this.fadeFrames);
      ctx.drawImage(this.image, 0.0, 0.0, this.image.naturalWidth, this.image.naturalHeight, this.locationX, this.locationY, this.width, this.height);
    }
    ctx.restore();
  };
  GreyoutIcon.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GreyoutIcon',
    interfaces: [Clickable]
  };
  function HTMLAnimationPage(ctx) {
    this.ctx = ctx;
    this.visuals = new VisualParameters('16px serif', 3.0, 0.0, 16.0);
    this.elementVisuals = new VisualParameters('16px serif', 3.0, 0.0, 0.0);
    var tmp$;
    this.htmlanimation = HTMLTypingElement_init('HTML', HTMLAnimationPage$htmlanimation$lambda, this.visuals, listOf_0([HTMLTypingElement_init('head', HTMLAnimationPage$htmlanimation$lambda_0, this.visuals, listOf_0([TypingText_init_0('<meta charset="UTF-8">', this.elementVisuals), HTMLTypingElement_init('title', HTMLAnimationPage$htmlanimation$lambda_1, this.visuals, listOf(TypingText_init_0('Ximias -introduction', this.elementVisuals))), HTMLTypingElement_init('style', HTMLAnimationPage$htmlanimation$lambda_2(this), this.visuals, listOf(TypingText_init_0('{background-color:#000; color:#AAA;}', this.elementVisuals)))])), HTMLTypingElement_init('body', HTMLAnimationPage$htmlanimation$lambda_3, this.visuals, listOf(HTMLTypingElement_init('div id="menu"', HTMLAnimationPage$htmlanimation$lambda_4, this.visuals, listOf(MultilineTypingText_init_0(Kotlin.isType(tmp$ = document.getElementById('boring'), HTMLParagraphElement) ? tmp$ : throwCCE(), 30, this.elementVisuals)))))]));
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
        darken(this.ctx, 8);
      }
       else {
        darken(this.ctx, 255);
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
  function HTMLTypingElement(name, action, font, framesPrChar, startingLocationX, startingLocationY, color, elements) {
    if (color === void 0)
      color = '#000';
    if (elements === void 0)
      elements = emptyList();
    this.name = name;
    this.action_54t4sw$_0 = action;
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    this.color = color;
    this.elements = elements;
    this.beginTag = new TypingText('<' + this.name + '>', this.font, this.framesPrChar, 0.0, 0.0, this.color);
    this.wait = 0;
    this.currentElement = 0;
    this.WAIT_PR_ELEMENT = 50;
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
        if (this.elements.isEmpty())
          return;
        this.elements.get_za3lpa$(this.currentElement).update();
        if (this.elements.get_za3lpa$(this.currentElement).isOutOfBounds_vux9f0$(0, 0)) {
          if (this.currentElement < (this.elements.size - 1 | 0)) {
            this.currentElement = this.currentElement + 1 | 0;
            this.wait = this.WAIT_PR_ELEMENT;
          }
        }
        if (!this.hasActionBeenInvoked && this.isOutOfBounds_vux9f0$(0, 0)) {
          this.action_54t4sw$_0();
          this.hasActionBeenInvoked = true;
          this.wait = this.WAIT_PR_ELEMENT;
        }
      }
    }
  };
  HTMLTypingElement.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return last(this.elements).isOutOfBounds_vux9f0$(0, 0);
  };
  HTMLTypingElement.prototype.draw_f69bme$ = function (ctx) {
    var tmp$;
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    this.beginTag.draw_f69bme$(ctx);
    if (this.beginTag.isOutOfBounds_vux9f0$(0, 0)) {
      this.newLine_sg12h0$_0(ctx);
      this.indent_2dubvo$_0(ctx);
      tmp$ = this.currentElement;
      for (var i = 0; i <= tmp$; i++) {
        this.elements.get_za3lpa$(i).draw_f69bme$(ctx);
        ctx.translate(0.0, this.elements.get_za3lpa$(i).getHeight());
      }
      this.unindent_7qcuwb$_0(ctx);
      var $receiver = this.name;
      var endIndex = indexOf(this.name, ' ') !== -1 ? indexOf(this.name, ' ') : this.name.length;
      ctx.fillText('<\/' + $receiver.substring(0, endIndex) + '>', 0.0, 0.0);
    }
  };
  HTMLTypingElement.prototype.drawAsRoot_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.startingLocationX, this.startingLocationY);
    this.draw_f69bme$(ctx);
    ctx.restore();
  };
  HTMLTypingElement.prototype.newLine_sg12h0$_0 = function (ctx) {
    ctx.translate(0.0, this.lineHeight_qqweet$_0());
  };
  HTMLTypingElement.prototype.indent_2dubvo$_0 = function (ctx) {
    ctx.translate(this.lineHeight_qqweet$_0() * 2, 0.0);
  };
  HTMLTypingElement.prototype.unindent_7qcuwb$_0 = function (ctx) {
    ctx.translate(-this.lineHeight_qqweet$_0() * 2, 0.0);
  };
  HTMLTypingElement.prototype.lineHeight_qqweet$_0 = function () {
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    return toInt($receiver.substring(0, endIndex)) + 5.0;
  };
  HTMLTypingElement.prototype.changeColor_61zpoe$ = function (color) {
    var tmp$;
    tmp$ = this.elements.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.changeColor_61zpoe$(color);
    }
    this.beginTag.changeColor_61zpoe$(color);
    this.color = color;
  };
  HTMLTypingElement.prototype.getHeight = function () {
    return this.elements.isEmpty() ? this.lineHeight_qqweet$_0() * 2 : this.lineHeight_qqweet$_0();
  };
  HTMLTypingElement.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HTMLTypingElement',
    interfaces: [TextElement, Animatable]
  };
  function HTMLTypingElement_init(name, action, visualParameters, elements, $this) {
    if (elements === void 0)
      elements = emptyList();
    $this = $this || Object.create(HTMLTypingElement.prototype);
    HTMLTypingElement.call($this, name, action, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.color, elements);
    return $this;
  }
  function VisualParameters(font, framesPrChar, startingLocationX, startingLocationY, color) {
    if (color === void 0)
      color = '#000';
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    this.color = color;
  }
  VisualParameters.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VisualParameters',
    interfaces: []
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
  function HelixPage(ctx) {
    this.ctx_0 = ctx;
    this.particles = Kotlin.newArray((Kotlin.imul(this.ctx_0.canvas.width, this.ctx_0.canvas.height) / 160000 | 0) + 1 | 0, null);
    this.populateParticles_0();
    this.animate();
  }
  function HelixPage$animate$lambda(this$HelixPage) {
    return function (it) {
      this$HelixPage.animate();
      return Unit;
    };
  }
  HelixPage.prototype.animate = function () {
    darken(this.ctx_0, 1);
    var tmp$;
    tmp$ = filterNotNull(this.particles).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx_0);
      element.update();
    }
    this.populateParticles_0();
    window.requestAnimationFrame(HelixPage$animate$lambda(this));
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
    return new Particle(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() - 0.5), 20.0);
  };
  HelixPage.prototype.randomHelix = function () {
    return new LineHelix(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() / 1.5 - 0.33), 30.0);
  };
  HelixPage.prototype.randomDoubleHelix = function () {
    return new NHelix(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() / 2 - 0.25), 30.0, 2);
  };
  HelixPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HelixPage',
    interfaces: []
  };
  function Page(ctx) {
    this.ctx = ctx;
    var tmp$, tmp$_0;
    this.image = AppearingImage_init_1(Kotlin.isType(tmp$ = document.getElementById('exclamation'), HTMLImageElement) ? tmp$ : throwCCE(), this.ctx.canvas.width / 2.0, (this.ctx.canvas.height + Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75)) / 2, Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75) | 0, Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75) | 0, -5.0);
    this.lineSpace = 5;
    this.greetingText = MultilineTypingText_init(Kotlin.isType(tmp$_0 = document.getElementById('greeting'), HTMLParagraphElement) ? tmp$_0 : throwCCE(), '16px Serif', 3.0, 25, 1.0, 16.0 + this.lineSpace);
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
      if (this.frameCount > (FADE_TIME / 5 | 0)) {
        this.frameCount = 0;
        window.requestAnimationFrame(Page$animateExclamationMark$lambda_0(this));
      }
       else {
        this.frameCount = this.frameCount + 1 | 0;
        darken(this.ctx, 5);
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
        darken(this.ctx, 5);
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
    new IndexPage(ctx);
  }
  var FADE_TIME;
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
  function HueColorAnimation() {
    this.h = Math.random() * 360 | 0;
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
  function IndexPage(ctx) {
    this.ctx = ctx;
    this.socialDim = 64.0;
    this.padding = 5.0;
    this.centerX = this.ctx.canvas.width / 2.0;
    this.socialX = this.centerX - this.socialDim / 2 - this.socialDim / 2;
    this.socialY = this.ctx.canvas.height - this.socialDim - this.padding;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.facebook = new GreyoutIcon(Kotlin.isType(tmp$ = document.getElementById('facebook'), HTMLImageElement) ? tmp$ : throwCCE(), this.socialX + -1 * (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, 15, IndexPage$facebook$lambda);
    this.twitter = new GreyoutIcon(Kotlin.isType(tmp$_0 = document.getElementById('twitter'), HTMLImageElement) ? tmp$_0 : throwCCE(), this.socialX, this.socialY, this.socialDim, this.socialDim, 15, IndexPage$twitter$lambda);
    this.git = new GreyoutIcon(Kotlin.isType(tmp$_1 = document.getElementById('git'), HTMLImageElement) ? tmp$_1 : throwCCE(), this.socialX + (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, 15, IndexPage$git$lambda);
    this.mail = new GreyoutIcon(Kotlin.isType(tmp$_2 = document.getElementById('gmail'), HTMLImageElement) ? tmp$_2 : throwCCE(), this.socialX + 2 * (this.padding + this.socialDim), this.socialY, this.socialDim, this.socialDim, 15, IndexPage$mail$lambda);
    this.ximias = new GreyoutIcon(Kotlin.isType(tmp$_3 = document.getElementById('ximias'), HTMLImageElement) ? tmp$_3 : throwCCE(), this.centerX - 128, (this.ctx.canvas.height / 2 | 0) - 128.0, 256.0, 256.0, 15, IndexPage$ximias$lambda);
    this.quotes = (new MultilineGlowingText(Kotlin.isType(tmp$_4 = document.getElementById('inspiration'), HTMLParagraphElement) ? tmp$_4 : throwCCE(), '18px verdana sans-serif', '#F48A00', 15, 80, this.centerX, 120.0, true)).fitToWidth_ggs6sk$(this.ctx, this.ctx.canvas.width);
    this.mouseElements = listOf_0([this.facebook, this.twitter, this.git, this.mail, this.ximias]);
    this.mouseUpdateElements = emptyList();
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
    darken(this.ctx, 1);
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
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
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
    this.bulb = AppearingImage_init_1(Kotlin.isType(tmp$ = document.getElementById('light'), HTMLImageElement) ? tmp$ : throwCCE(), this.ctx.canvas.width / 2.0, (this.ctx.canvas.height + Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75)) / 2, Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75) | 0, Math.min(this.ctx.canvas.width * 0.75, this.ctx.canvas.height * 0.75) | 0, -3.0);
    this.idea = (new MultilineGlowingText(Kotlin.isType(tmp$_0 = document.getElementById('idea'), HTMLParagraphElement) ? tmp$_0 : throwCCE(), '100px sans-serif', '#FF6', 10, 120, this.ctx.canvas.width / 2.0, this.ctx.canvas.height / 2.0, true)).fitToWidth_ggs6sk$(this.ctx, this.ctx.canvas.width / 1.5 | 0);
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
      darken(this.ctx, 255);
      this.bulb.draw_f69bme$(this.ctx);
      this.bulb.update();
      window.requestAnimationFrame(KotlinPage$animateBulb$lambda(this));
    }
     else {
      if (this.wait > 0) {
        this.wait = this.wait - 5 | 0;
        darken(this.ctx, 5);
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
      darken(this.ctx, 255);
      this.idea.draw_f69bme$(this.ctx);
      this.idea.update();
      window.requestAnimationFrame(KotlinPage$animateText$lambda(this));
    }
     else {
      if (this.wait > 0) {
        this.wait = this.wait - 5 | 0;
        darken(this.ctx, 5);
        window.requestAnimationFrame(KotlinPage$animateText$lambda_0(this));
      }
    }
  };
  KotlinPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'KotlinPage',
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
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  function MultilineGlowingText(text, font, color, fadeInTime, lineTime, locationX, locationY, centered) {
    this.font = font;
    this.color = color;
    this.fadeInTime = fadeInTime;
    this.lineTime = lineTime;
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
      destination_0.add_11rb$(new GlowingText(item, this.font, this.color, this.fadeInTime, this.locationX, this.locationY, this.centered));
    }
    this.lines_0 = destination_0;
    this.wait_0 = 0;
    this.currentLine_0 = 0;
  }
  MultilineGlowingText.prototype.update = function () {
    var tmp$;
    if (this.wait_0 > 0) {
      this.wait_0 = this.wait_0 - 1 | 0;
    }
     else {
      if (!this.lines_0.get_za3lpa$(this.currentLine_0).isOutOfBounds_vux9f0$(0, 0)) {
        this.lines_0.get_za3lpa$(this.currentLine_0).update();
        if (this.lines_0.get_za3lpa$(this.currentLine_0).isOutOfBounds_vux9f0$(0, 0)) {
          this.wait_0 = this.lineTime;
          tmp$ = this.currentLine_0, this.currentLine_0 = tmp$ + 1 | 0;
        }
      }
    }
  };
  MultilineGlowingText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return last(this.lines_0).isOutOfBounds_vux9f0$(0, 0) && this.wait_0 <= 0;
  };
  MultilineGlowingText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    if (this.wait_0 > 0) {
      ctx.globalAlpha = this.wait_0 / this.lineTime;
      this.lines_0.get_za3lpa$(this.currentLine_0 - 1 | 0).draw_f69bme$(ctx);
    }
     else {
      this.lines_0.get_za3lpa$(this.currentLine_0).draw_f69bme$(ctx);
    }
  };
  MultilineGlowingText.prototype.fitToWidth_ggs6sk$ = function (ctx, width) {
    var tmp$;
    tmp$ = this.lines_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.fitToWidth_ggs6sk$(ctx, width);
    }
    return this;
  };
  MultilineGlowingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineGlowingText',
    interfaces: [Animatable]
  };
  function MultilineTypingText(text, font, framesPrChar, lineWait, startingLocationX, startingLocationY, color) {
    if (color === void 0)
      color = '#000';
    this.text = text;
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.lineWait = lineWait;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    this.color = color;
    var $receiver = this.text;
    var destination = ArrayList_init();
    var tmp$;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
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
      var index_0 = (tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0);
      var tmp$_2 = this.font;
      var tmp$_3 = this.framesPrChar;
      var tmp$_4 = this.startingLocationX;
      var tmp$_5 = this.startingLocationY;
      var $receiver_0 = this.font;
      var endIndex = indexOf(this.font, 'p');
      tmp$_1.call(destination_0, new TypingText(item, tmp$_2, tmp$_3, tmp$_4, tmp$_5 + Kotlin.imul(index_0, toInt($receiver_0.substring(0, endIndex)) + 5 | 0), this.color));
    }
    this.lines_0 = destination_0;
    this.currentLine = 0;
    this.wait = 0;
  }
  MultilineTypingText.prototype.update = function () {
    if (this.wait <= 0) {
      if (!this.lines_0.get_za3lpa$(this.currentLine).isOutOfBounds_vux9f0$(0, 0)) {
        this.lines_0.get_za3lpa$(this.currentLine).update();
      }
       else {
        this.currentLine = this.currentLine + 1 | 0;
        this.wait = this.lineWait;
      }
    }
     else {
      this.wait = this.wait - 1 | 0;
    }
  };
  MultilineTypingText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return last(this.lines_0).isOutOfBounds_vux9f0$(0, 0);
  };
  MultilineTypingText.prototype.draw_f69bme$ = function (ctx) {
    var tmp$;
    tmp$ = this.currentLine;
    for (var i = 0; i <= tmp$; i++) {
      this.lines_0.get_za3lpa$(i).draw_f69bme$(ctx);
    }
  };
  MultilineTypingText.prototype.changeColor_61zpoe$ = function (color) {
    var tmp$;
    tmp$ = this.lines_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.changeColor_61zpoe$(color);
    }
    this.color = color;
  };
  MultilineTypingText.prototype.getHeight = function () {
    return (first(this.lines_0).getHeight() + 5) * (this.currentLine + 1 | 0);
  };
  MultilineTypingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MultilineTypingText',
    interfaces: [TextElement, Animatable]
  };
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  function MultilineTypingText_init(text, font, framesPrChar, lineWait, startingLocationX, startingLocationY, color, $this) {
    if (color === void 0)
      color = '#000';
    $this = $this || Object.create(MultilineTypingText.prototype);
    MultilineTypingText.call($this, copyToArray(split(text.innerText, ['\n'])), font, framesPrChar, lineWait, startingLocationX, startingLocationY, color);
    return $this;
  }
  function MultilineTypingText_init_0(htmlParagraphElement, lineWait, visuals, $this) {
    $this = $this || Object.create(MultilineTypingText.prototype);
    MultilineTypingText_init(htmlParagraphElement, visuals.font, visuals.framesPrChar, lineWait, visuals.startingLocationX, visuals.startingLocationY, visuals.color, $this);
    return $this;
  }
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
    return first_0(this.helices).isOutOfBounds_vux9f0$(width, height);
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
  function TextElement() {
  }
  TextElement.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'TextElement',
    interfaces: [Animatable]
  };
  function TypingText(text, font, framesPrChar, startingLocationX, startingLocationY, color) {
    if (color === void 0)
      color = '#000';
    this.text = text;
    this.font = font;
    this.framesPrChar = framesPrChar;
    this.startingLocationX = startingLocationX;
    this.startingLocationY = startingLocationY;
    this.color = color;
    this.step_0 = 0;
  }
  TypingText.prototype.changeColor_61zpoe$ = function (color) {
    this.color = color;
  };
  TypingText.prototype.update = function () {
    this.step_0 = this.step_0 + 1 | 0;
  };
  TypingText.prototype.isOutOfBounds_vux9f0$ = function (width, height) {
    return this.step_0 / this.framesPrChar > this.text.length;
  };
  TypingText.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.startingLocationX, this.startingLocationY);
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    var $receiver = this.text;
    var endIndex = this.step_0 / this.framesPrChar | 0;
    ctx.fillText($receiver.substring(0, endIndex), 0.0, 0.0);
    ctx.restore();
  };
  TypingText.prototype.getHeight = function () {
    var $receiver = this.font;
    var endIndex = indexOf(this.font, 'p');
    return toDouble($receiver.substring(0, endIndex));
  };
  TypingText.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TypingText',
    interfaces: [TextElement, Animatable]
  };
  function TypingText_init(textElement, font, framesPrChar, startingLocationX, startingLocationY, color, $this) {
    if (color === void 0)
      color = '#000';
    $this = $this || Object.create(TypingText.prototype);
    TypingText.call($this, replace(textElement.innerHTML, '<br>', ''), font, framesPrChar, startingLocationX, startingLocationY, color);
    return $this;
  }
  function TypingText_init_0(text, visualParameters, $this) {
    $this = $this || Object.create(TypingText.prototype);
    TypingText.call($this, text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.color);
    return $this;
  }
  function TypingText_init_1(text, visualParameters, $this) {
    $this = $this || Object.create(TypingText.prototype);
    TypingText_init(text, visualParameters.font, visualParameters.framesPrChar, visualParameters.startingLocationX, visualParameters.startingLocationY, visualParameters.color, $this);
    return $this;
  }
  _.Animatable = Animatable;
  _.AppearingImage_init_e1vnu2$ = AppearingImage_init;
  _.AppearingImage_init_trr8f3$ = AppearingImage_init_0;
  _.AppearingImage_init_sq2yn3$ = AppearingImage_init_1;
  _.AppearingImage = AppearingImage;
  _.Clickable = Clickable;
  _.Drawable = Drawable;
  _.GlowingText = GlowingText;
  _.GreyoutIcon = GreyoutIcon;
  _.HTMLAnimationPage = HTMLAnimationPage;
  _.HTMLTypingElement_init_r49sk7$ = HTMLTypingElement_init;
  _.HTMLTypingElement = HTMLTypingElement;
  _.VisualParameters = VisualParameters;
  _.Helix = Helix;
  _.HelixPage = HelixPage;
  _.Page = Page;
  _.main_kand9s$ = main;
  Object.defineProperty(_, 'FADE_TIME', {
    get: function () {
      return FADE_TIME;
    }
  });
  _.darken_1nogux$ = darken;
  _.whiteFrame_qtrdl1$ = whiteFrame;
  _.HueColorAnimation = HueColorAnimation;
  _.IndexPage = IndexPage;
  _.KotlinPage = KotlinPage;
  _.LineHelix = LineHelix;
  _.MultilineGlowingText = MultilineGlowingText;
  _.MultilineTypingText_init_wv3m5m$ = MultilineTypingText_init;
  _.MultilineTypingText_init_68qoea$ = MultilineTypingText_init_0;
  _.MultilineTypingText = MultilineTypingText;
  _.NHelix = NHelix;
  _.Particle = Particle;
  _.Dynamics = Dynamics;
  _.TextElement = TextElement;
  _.TypingText_init_lijiog$ = TypingText_init;
  _.TypingText_init_m0qgyw$ = TypingText_init_0;
  _.TypingText_init_lq2py8$ = TypingText_init_1;
  _.TypingText = TypingText;
  FADE_TIME = 255;
  main([]);
  Kotlin.defineModule('Kotlicles', _);
  return _;
}(typeof Kotlicles === 'undefined' ? {} : Kotlicles, kotlin);

//# sourceMappingURL=Kotlicles.js.map

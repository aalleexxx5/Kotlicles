if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Kotlicles'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Kotlicles'.");
}
var Kotlicles = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_emfgvx$;
  var Unit = Kotlin.kotlin.Unit;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var throwCCE = Kotlin.throwCCE;
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
    interfaces: []
  };
  function Drawable() {
  }
  Drawable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Drawable',
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
    return this.dynamics.x < 0 - this.radius || this.dynamics.y < 0 - this.radius || this.dynamics.x > width + this.radius || this.dynamics.y > height - this.radius;
  };
  Helix.prototype.draw_f69bme$ = function (ctx) {
    ctx.save();
    ctx.translate(this.dynamics.x, this.dynamics.y);
    ctx.rotate(this.dynamics.r);
    ctx.fillStyle = this.color.toString();
    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(0.0, 0.0, this.radius, 0.0, 1.0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };
  Helix.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Helix',
    interfaces: [Animatable, Drawable]
  };
  function Page(ctx) {
    this.ctx_0 = ctx;
    this.particles = Kotlin.newArray(20, null);
    this.populateParticles_0();
    this.animate();
  }
  function Page$animate$lambda(this$Page) {
    return function (it) {
      this$Page.animate();
      return Unit;
    };
  }
  Page.prototype.animate = function () {
    this.darken_8nku3g$(this.ctx_0.canvas.width, this.ctx_0.canvas.height, this.ctx_0, 1);
    this.ctx_0.globalCompositeOperation = 'lighten';
    var tmp$;
    tmp$ = filterNotNull(this.particles).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx_0);
      element.update();
    }
    this.populateParticles_0();
    window.requestAnimationFrame(Page$animate$lambda(this));
  };
  Page.prototype.darken_8nku3g$ = function (width, height, ctx, amount) {
    var lastImage = ctx.getImageData(0, 0, width, height);
    var pixelData = lastImage.data;
    var i;
    for (i = 3; i < pixelData.length; i += 4) {
      pixelData[i] -= amount;
    }
    ctx.putImageData(lastImage, 0, 0);
  };
  Page.prototype.logToConsole_61zpoe$ = function (message) {
    console.log(message);
  };
  Page.prototype.populateParticles_0 = function () {
    var $receiver = this.particles;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      var index_0 = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
      if (item == null || item.isOutOfBounds_vux9f0$(this.ctx_0.canvas.width, this.ctx_0.canvas.height)) {
        this.particles[index_0] = this.randomHelix();
      }
    }
  };
  Page.prototype.specifiedParticle = function () {
    return new Particle(new Dynamics(500.0, 500.0, 50.0, 0.1, 0.1, 0.0), 50.0);
  };
  Page.prototype.randomParticle = function () {
    return new Particle(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() - 0.5), 20.0);
  };
  Page.prototype.randomHelix = function () {
    return new Helix(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() - 0.5), 30.0);
  };
  Page.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Page',
    interfaces: []
  };
  function main(args) {
    var tmp$, tmp$_0;
    var message = 'Hello JavaScript!';
    println(message);
    var canvas = Kotlin.isType(tmp$ = document.getElementById('where the magic happens'), HTMLCanvasElement) ? tmp$ : throwCCE();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    ctx.fillStyle = '#000';
    ctx.fillRect(0.0, 0.0, canvas.width, canvas.height);
    new Page(ctx);
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
  HueColorAnimation.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HueColorAnimation',
    interfaces: []
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
  _.Animatable = Animatable;
  _.Clickable = Clickable;
  _.Drawable = Drawable;
  _.Helix = Helix;
  _.Page = Page;
  _.main_kand9s$ = main;
  _.HueColorAnimation = HueColorAnimation;
  _.Particle = Particle;
  _.Dynamics = Dynamics;
  main([]);
  Kotlin.defineModule('Kotlicles', _);
  return _;
}(typeof Kotlicles === 'undefined' ? {} : Kotlicles, kotlin);

//# sourceMappingURL=Kotlicles.js.map

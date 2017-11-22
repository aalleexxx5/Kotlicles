if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Kotlicles'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Kotlicles'.");
}
var Kotlicles = function (_, Kotlin) {
  'use strict';
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_emfgvx$;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var throwCCE = Kotlin.throwCCE;
  function Animatable() {
  }
  Animatable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Animatable',
    interfaces: []
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
  function Page(ctx) {
    this.ctx_0 = ctx;
    this.particles = Kotlin.newArray(50, null);
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
    var tmp$;
    tmp$ = filterNotNull(this.particles).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.draw_f69bme$(this.ctx_0);
      element.update();
    }
    window.requestAnimationFrame(Page$animate$lambda(this));
  };
  Page.prototype.populateParticles_0 = function () {
    var $receiver = this.particles;
    var tmp$, tmp$_0;
    var index = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var item = $receiver[tmp$];
      var index_0 = (tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0);
      if (item == null) {
        this.particles[index_0] = this.randomParticle();
      }
    }
  };
  Page.prototype.specifiedParticle = function () {
    return new Particle(new Dynamics(500.0, 500.0, 50.0, 0.1, 0.1, 0.0), 50.0);
  };
  Page.prototype.randomParticle = function () {
    return new Particle(new Dynamics(Math.random() * this.ctx_0.canvas.width, Math.random() * this.ctx_0.canvas.height, Math.random() * 2 * Math.PI, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1), 20.0);
  };
  Page.prototype.isOutOfBounds = function () {
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
    new Page(ctx);
  }
  function Particle(dynamics, radius) {
    this.dynamics = dynamics;
    this.radius = radius;
  }
  Particle.prototype.draw_f69bme$ = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(this.dynamics.x, this.dynamics.y, this.radius, this.dynamics.r, 2 * Math.PI + this.dynamics.r);
    ctx.fill();
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
    interfaces: [Animatable]
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
  _.Page = Page;
  _.main_kand9s$ = main;
  _.Particle = Particle;
  _.Dynamics = Dynamics;
  main([]);
  Kotlin.defineModule('Kotlicles', _);
  return _;
}(typeof Kotlicles === 'undefined' ? {} : Kotlicles, kotlin);

//# sourceMappingURL=Kotlicles.js.map

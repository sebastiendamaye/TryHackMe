(window.webpackJsonp = window.webpackJsonp || []).push([
    [1], {
        0: function(l, n, e) {
            l.exports = e("zUnb")
        },
        1: function(l, n) {},
        crnd: function(l, n) {
            function e(l) {
                return Promise.resolve().then(function() {
                    var n = new Error("Cannot find module '" + l + "'");
                    throw n.code = "MODULE_NOT_FOUND", n
                })
            }
            e.keys = function() {
                return []
            }, e.resolve = e, l.exports = e, e.id = "crnd"
        },
        yLV6: function(l, n, e) {
            var t;
            ! function(u, o, a, i) {
                "use strict";
                var r, d = ["", "webkit", "Moz", "MS", "ms", "o"],
                    s = o.createElement("div"),
                    c = "function",
                    f = Math.round,
                    p = Math.abs,
                    m = Date.now;

                function h(l, n, e) {
                    return setTimeout(y(l, e), n)
                }

                function v(l, n, e) {
                    return !!Array.isArray(l) && (g(l, e[n], e), !0)
                }

                function g(l, n, e) {
                    var t;
                    if (l)
                        if (l.forEach) l.forEach(n, e);
                        else if (l.length !== i)
                        for (t = 0; t < l.length;) n.call(e, l[t], t, l), t++;
                    else
                        for (t in l) l.hasOwnProperty(t) && n.call(e, l[t], t, l)
                }

                function b(l, n, e) {
                    var t = "DEPRECATED METHOD: " + n + "\n" + e + " AT \n";
                    return function() {
                        var n = new Error("get-stack-trace"),
                            e = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                            o = u.console && (u.console.warn || u.console.log);
                        return o && o.call(u.console, t, e), l.apply(this, arguments)
                    }
                }
                r = "function" != typeof Object.assign ? function(l) {
                    if (l === i || null === l) throw new TypeError("Cannot convert undefined or null to object");
                    for (var n = Object(l), e = 1; e < arguments.length; e++) {
                        var t = arguments[e];
                        if (t !== i && null !== t)
                            for (var u in t) t.hasOwnProperty(u) && (n[u] = t[u])
                    }
                    return n
                } : Object.assign;
                var _ = b(function(l, n, e) {
                        for (var t = Object.keys(n), u = 0; u < t.length;)(!e || e && l[t[u]] === i) && (l[t[u]] = n[t[u]]), u++;
                        return l
                    }, "extend", "Use `assign`."),
                    C = b(function(l, n) {
                        return _(l, n, !0)
                    }, "merge", "Use `assign`.");

                function R(l, n, e) {
                    var t, u = n.prototype;
                    (t = l.prototype = Object.create(u)).constructor = l, t._super = u, e && r(t, e)
                }

                function y(l, n) {
                    return function() {
                        return l.apply(n, arguments)
                    }
                }

                function w(l, n) {
                    return typeof l == c ? l.apply(n && n[0] || i, n) : l
                }

                function E(l, n) {
                    return l === i ? n : l
                }

                function k(l, n, e) {
                    g(D(n), function(n) {
                        l.addEventListener(n, e, !1)
                    })
                }

                function I(l, n, e) {
                    g(D(n), function(n) {
                        l.removeEventListener(n, e, !1)
                    })
                }

                function S(l, n) {
                    for (; l;) {
                        if (l == n) return !0;
                        l = l.parentNode
                    }
                    return !1
                }

                function T(l, n) {
                    return l.indexOf(n) > -1
                }

                function D(l) {
                    return l.trim().split(/\s+/g)
                }

                function x(l, n, e) {
                    if (l.indexOf && !e) return l.indexOf(n);
                    for (var t = 0; t < l.length;) {
                        if (e && l[t][e] == n || !e && l[t] === n) return t;
                        t++
                    }
                    return -1
                }

                function L(l) {
                    return Array.prototype.slice.call(l, 0)
                }

                function A(l, n, e) {
                    for (var t = [], u = [], o = 0; o < l.length;) {
                        var a = n ? l[o][n] : l[o];
                        x(u, a) < 0 && t.push(l[o]), u[o] = a, o++
                    }
                    return e && (t = n ? t.sort(function(l, e) {
                        return l[n] > e[n]
                    }) : t.sort()), t
                }

                function O(l, n) {
                    for (var e, t, u = n[0].toUpperCase() + n.slice(1), o = 0; o < d.length;) {
                        if ((t = (e = d[o]) ? e + u : n) in l) return t;
                        o++
                    }
                    return i
                }
                var N = 1;

                function q(l) {
                    var n = l.ownerDocument || l;
                    return n.defaultView || n.parentWindow || u
                }
                var P = "ontouchstart" in u,
                    M = O(u, "PointerEvent") !== i,
                    F = P && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
                    j = 25,
                    U = 1,
                    V = 4,
                    B = 8,
                    H = 1,
                    z = 2,
                    Z = 4,
                    $ = 8,
                    Y = 16,
                    Q = z | Z,
                    G = $ | Y,
                    W = Q | G,
                    K = ["x", "y"],
                    X = ["clientX", "clientY"];

                function J(l, n) {
                    var e = this;
                    this.manager = l, this.callback = n, this.element = l.element, this.target = l.options.inputTarget, this.domHandler = function(n) {
                        w(l.options.enable, [l]) && e.handler(n)
                    }, this.init()
                }

                function ll(l, n, e) {
                    var t = e.pointers.length,
                        u = e.changedPointers.length,
                        o = n & U && t - u == 0,
                        a = n & (V | B) && t - u == 0;
                    e.isFirst = !!o, e.isFinal = !!a, o && (l.session = {}), e.eventType = n,
                        function(l, n) {
                            var e = l.session,
                                t = n.pointers,
                                u = t.length;
                            e.firstInput || (e.firstInput = nl(n)), u > 1 && !e.firstMultiple ? e.firstMultiple = nl(n) : 1 === u && (e.firstMultiple = !1);
                            var o = e.firstInput,
                                a = e.firstMultiple,
                                r = a ? a.center : o.center,
                                d = n.center = el(t);
                            n.timeStamp = m(), n.deltaTime = n.timeStamp - o.timeStamp, n.angle = al(r, d), n.distance = ol(r, d),
                                function(l, n) {
                                    var e = n.center,
                                        t = l.offsetDelta || {},
                                        u = l.prevDelta || {},
                                        o = l.prevInput || {};
                                    n.eventType !== U && o.eventType !== V || (u = l.prevDelta = {
                                        x: o.deltaX || 0,
                                        y: o.deltaY || 0
                                    }, t = l.offsetDelta = {
                                        x: e.x,
                                        y: e.y
                                    }), n.deltaX = u.x + (e.x - t.x), n.deltaY = u.y + (e.y - t.y)
                                }(e, n), n.offsetDirection = ul(n.deltaX, n.deltaY);
                            var s, c, f = tl(n.deltaTime, n.deltaX, n.deltaY);
                            n.overallVelocityX = f.x, n.overallVelocityY = f.y, n.overallVelocity = p(f.x) > p(f.y) ? f.x : f.y, n.scale = a ? (s = a.pointers, ol((c = t)[0], c[1], X) / ol(s[0], s[1], X)) : 1, n.rotation = a ? function(l, n) {
                                    return al(t[1], t[0], X) + al(l[1], l[0], X)
                                }(a.pointers) : 0, n.maxPointers = e.prevInput ? n.pointers.length > e.prevInput.maxPointers ? n.pointers.length : e.prevInput.maxPointers : n.pointers.length,
                                function(l, n) {
                                    var e, t, u, o, a = l.lastInterval || n,
                                        r = n.timeStamp - a.timeStamp;
                                    if (n.eventType != B && (r > j || a.velocity === i)) {
                                        var d = n.deltaX - a.deltaX,
                                            s = n.deltaY - a.deltaY,
                                            c = tl(r, d, s);
                                        t = c.x, u = c.y, e = p(c.x) > p(c.y) ? c.x : c.y, o = ul(d, s), l.lastInterval = n
                                    } else e = a.velocity, t = a.velocityX, u = a.velocityY, o = a.direction;
                                    n.velocity = e, n.velocityX = t, n.velocityY = u, n.direction = o
                                }(e, n);
                            var h = l.element;
                            S(n.srcEvent.target, h) && (h = n.srcEvent.target), n.target = h
                        }(l, e), l.emit("hammer.input", e), l.recognize(e), l.session.prevInput = e
                }

                function nl(l) {
                    for (var n = [], e = 0; e < l.pointers.length;) n[e] = {
                        clientX: f(l.pointers[e].clientX),
                        clientY: f(l.pointers[e].clientY)
                    }, e++;
                    return {
                        timeStamp: m(),
                        pointers: n,
                        center: el(n),
                        deltaX: l.deltaX,
                        deltaY: l.deltaY
                    }
                }

                function el(l) {
                    var n = l.length;
                    if (1 === n) return {
                        x: f(l[0].clientX),
                        y: f(l[0].clientY)
                    };
                    for (var e = 0, t = 0, u = 0; u < n;) e += l[u].clientX, t += l[u].clientY, u++;
                    return {
                        x: f(e / n),
                        y: f(t / n)
                    }
                }

                function tl(l, n, e) {
                    return {
                        x: n / l || 0,
                        y: e / l || 0
                    }
                }

                function ul(l, n) {
                    return l === n ? H : p(l) >= p(n) ? l < 0 ? z : Z : n < 0 ? $ : Y
                }

                function ol(l, n, e) {
                    e || (e = K);
                    var t = n[e[0]] - l[e[0]],
                        u = n[e[1]] - l[e[1]];
                    return Math.sqrt(t * t + u * u)
                }

                function al(l, n, e) {
                    return e || (e = K), 180 * Math.atan2(n[e[1]] - l[e[1]], n[e[0]] - l[e[0]]) / Math.PI
                }
                J.prototype = {
                    handler: function() {},
                    init: function() {
                        this.evEl && k(this.element, this.evEl, this.domHandler), this.evTarget && k(this.target, this.evTarget, this.domHandler), this.evWin && k(q(this.element), this.evWin, this.domHandler)
                    },
                    destroy: function() {
                        this.evEl && I(this.element, this.evEl, this.domHandler), this.evTarget && I(this.target, this.evTarget, this.domHandler), this.evWin && I(q(this.element), this.evWin, this.domHandler)
                    }
                };
                var il = {
                        mousedown: U,
                        mousemove: 2,
                        mouseup: V
                    },
                    rl = "mousedown",
                    dl = "mousemove mouseup";

                function sl() {
                    this.evEl = rl, this.evWin = dl, this.pressed = !1, J.apply(this, arguments)
                }
                R(sl, J, {
                    handler: function(l) {
                        var n = il[l.type];
                        n & U && 0 === l.button && (this.pressed = !0), 2 & n && 1 !== l.which && (n = V), this.pressed && (n & V && (this.pressed = !1), this.callback(this.manager, n, {
                            pointers: [l],
                            changedPointers: [l],
                            pointerType: "mouse",
                            srcEvent: l
                        }))
                    }
                });
                var cl = {
                        pointerdown: U,
                        pointermove: 2,
                        pointerup: V,
                        pointercancel: B,
                        pointerout: B
                    },
                    fl = {
                        2: "touch",
                        3: "pen",
                        4: "mouse",
                        5: "kinect"
                    },
                    pl = "pointerdown",
                    ml = "pointermove pointerup pointercancel";

                function hl() {
                    this.evEl = pl, this.evWin = ml, J.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
                }
                u.MSPointerEvent && !u.PointerEvent && (pl = "MSPointerDown", ml = "MSPointerMove MSPointerUp MSPointerCancel"), R(hl, J, {
                    handler: function(l) {
                        var n = this.store,
                            e = !1,
                            t = l.type.toLowerCase().replace("ms", ""),
                            u = cl[t],
                            o = fl[l.pointerType] || l.pointerType,
                            a = "touch" == o,
                            i = x(n, l.pointerId, "pointerId");
                        u & U && (0 === l.button || a) ? i < 0 && (n.push(l), i = n.length - 1) : u & (V | B) && (e = !0), i < 0 || (n[i] = l, this.callback(this.manager, u, {
                            pointers: n,
                            changedPointers: [l],
                            pointerType: o,
                            srcEvent: l
                        }), e && n.splice(i, 1))
                    }
                });
                var vl = {
                        touchstart: U,
                        touchmove: 2,
                        touchend: V,
                        touchcancel: B
                    },
                    gl = "touchstart",
                    bl = "touchstart touchmove touchend touchcancel";

                function _l() {
                    this.evTarget = gl, this.evWin = bl, this.started = !1, J.apply(this, arguments)
                }
                R(_l, J, {
                    handler: function(l) {
                        var n = vl[l.type];
                        if (n === U && (this.started = !0), this.started) {
                            var e = (function(l, n) {
                                var e = L(l.touches),
                                    t = L(l.changedTouches);
                                return n & (V | B) && (e = A(e.concat(t), "identifier", !0)), [e, t]
                            }).call(this, l, n);
                            n & (V | B) && e[0].length - e[1].length == 0 && (this.started = !1), this.callback(this.manager, n, {
                                pointers: e[0],
                                changedPointers: e[1],
                                pointerType: "touch",
                                srcEvent: l
                            })
                        }
                    }
                });
                var Cl = {
                        touchstart: U,
                        touchmove: 2,
                        touchend: V,
                        touchcancel: B
                    },
                    Rl = "touchstart touchmove touchend touchcancel";

                function yl() {
                    this.evTarget = Rl, this.targetIds = {}, J.apply(this, arguments)
                }
                R(yl, J, {
                    handler: function(l) {
                        var n = Cl[l.type],
                            e = (function(l, n) {
                                var e = L(l.touches),
                                    t = this.targetIds;
                                if (n & (2 | U) && 1 === e.length) return t[e[0].identifier] = !0, [e, e];
                                var u, o, a = L(l.changedTouches),
                                    i = [],
                                    r = this.target;
                                if (o = e.filter(function(l) {
                                        return S(l.target, r)
                                    }), n === U)
                                    for (u = 0; u < o.length;) t[o[u].identifier] = !0, u++;
                                for (u = 0; u < a.length;) t[a[u].identifier] && i.push(a[u]), n & (V | B) && delete t[a[u].identifier], u++;
                                return i.length ? [A(o.concat(i), "identifier", !0), i] : void 0
                            }).call(this, l, n);
                        e && this.callback(this.manager, n, {
                            pointers: e[0],
                            changedPointers: e[1],
                            pointerType: "touch",
                            srcEvent: l
                        })
                    }
                });
                var wl = 2500;

                function El() {
                    J.apply(this, arguments);
                    var l = y(this.handler, this);
                    this.touch = new yl(this.manager, l), this.mouse = new sl(this.manager, l), this.primaryTouch = null, this.lastTouches = []
                }

                function kl(l) {
                    var n = l.changedPointers[0];
                    if (n.identifier === this.primaryTouch) {
                        var e = {
                            x: n.clientX,
                            y: n.clientY
                        };
                        this.lastTouches.push(e);
                        var t = this.lastTouches;
                        setTimeout(function() {
                            var l = t.indexOf(e);
                            l > -1 && t.splice(l, 1)
                        }, wl)
                    }
                }
                R(El, J, {
                    handler: function(l, n, e) {
                        var t = "mouse" == e.pointerType;
                        if (!(t && e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents)) {
                            if ("touch" == e.pointerType)(function(l, n) {
                                l & U ? (this.primaryTouch = n.changedPointers[0].identifier, kl.call(this, n)) : l & (V | B) && kl.call(this, n)
                            }).call(this, n, e);
                            else if (t && (function(l) {
                                    for (var n = l.srcEvent.clientX, e = l.srcEvent.clientY, t = 0; t < this.lastTouches.length; t++) {
                                        var u = this.lastTouches[t],
                                            o = Math.abs(n - u.x),
                                            a = Math.abs(e - u.y);
                                        if (o <= 25 && a <= 25) return !0
                                    }
                                    return !1
                                }).call(this, e)) return;
                            this.callback(l, n, e)
                        }
                    },
                    destroy: function() {
                        this.touch.destroy(), this.mouse.destroy()
                    }
                });
                var Il = O(s.style, "touchAction"),
                    Sl = Il !== i,
                    Tl = function() {
                        if (!Sl) return !1;
                        var l = {},
                            n = u.CSS && u.CSS.supports;
                        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(e) {
                            l[e] = !n || u.CSS.supports("touch-action", e)
                        }), l
                    }();

                function Dl(l, n) {
                    this.manager = l, this.set(n)
                }
                Dl.prototype = {
                    set: function(l) {
                        "compute" == l && (l = this.compute()), Sl && this.manager.element.style && Tl[l] && (this.manager.element.style[Il] = l), this.actions = l.toLowerCase().trim()
                    },
                    update: function() {
                        this.set(this.manager.options.touchAction)
                    },
                    compute: function() {
                        var l = [];
                        return g(this.manager.recognizers, function(n) {
                                w(n.options.enable, [n]) && (l = l.concat(n.getTouchAction()))
                            }),
                            function(l) {
                                if (T(l, "none")) return "none";
                                var n = T(l, "pan-x"),
                                    e = T(l, "pan-y");
                                return n && e ? "none" : n || e ? n ? "pan-x" : "pan-y" : T(l, "manipulation") ? "manipulation" : "auto"
                            }(l.join(" "))
                    },
                    preventDefaults: function(l) {
                        var n = l.srcEvent,
                            e = l.offsetDirection;
                        if (this.manager.session.prevented) n.preventDefault();
                        else {
                            var t = this.actions,
                                u = T(t, "none") && !Tl.none,
                                o = T(t, "pan-y") && !Tl["pan-y"],
                                a = T(t, "pan-x") && !Tl["pan-x"];
                            if (u && 1 === l.pointers.length && l.distance < 2 && l.deltaTime < 250) return;
                            if (!a || !o) return u || o && e & Q || a && e & G ? this.preventSrc(n) : void 0
                        }
                    },
                    preventSrc: function(l) {
                        this.manager.session.prevented = !0, l.preventDefault()
                    }
                };
                var xl = 1,
                    Ll = 2,
                    Al = 4,
                    Ol = 8,
                    Nl = Ol,
                    ql = 16;

                function Pl(l) {
                    this.options = r({}, this.defaults, l || {}), this.id = N++, this.manager = null, this.options.enable = E(this.options.enable, !0), this.state = xl, this.simultaneous = {}, this.requireFail = []
                }

                function Ml(l) {
                    return l & ql ? "cancel" : l & Ol ? "end" : l & Al ? "move" : l & Ll ? "start" : ""
                }

                function Fl(l) {
                    return l == Y ? "down" : l == $ ? "up" : l == z ? "left" : l == Z ? "right" : ""
                }

                function jl(l, n) {
                    var e = n.manager;
                    return e ? e.get(l) : l
                }

                function Ul() {
                    Pl.apply(this, arguments)
                }

                function Vl() {
                    Ul.apply(this, arguments), this.pX = null, this.pY = null
                }

                function Bl() {
                    Ul.apply(this, arguments)
                }

                function Hl() {
                    Pl.apply(this, arguments), this._timer = null, this._input = null
                }

                function zl() {
                    Ul.apply(this, arguments)
                }

                function Zl() {
                    Ul.apply(this, arguments)
                }

                function $l() {
                    Pl.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
                }

                function Yl(l, n) {
                    return (n = n || {}).recognizers = E(n.recognizers, Yl.defaults.preset), new Ql(l, n)
                }

                function Ql(l, n) {
                    var e;
                    this.options = r({}, Yl.defaults, n || {}), this.options.inputTarget = this.options.inputTarget || l, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = l, this.input = new((e = this).options.inputClass || (M ? hl : F ? yl : P ? El : sl))(e, ll), this.touchAction = new Dl(this, this.options.touchAction), Gl(this, !0), g(this.options.recognizers, function(l) {
                        var n = this.add(new l[0](l[1]));
                        l[2] && n.recognizeWith(l[2]), l[3] && n.requireFailure(l[3])
                    }, this)
                }

                function Gl(l, n) {
                    var e, t = l.element;
                    t.style && (g(l.options.cssProps, function(u, o) {
                        e = O(t.style, o), n ? (l.oldCssProps[e] = t.style[e], t.style[e] = u) : t.style[e] = l.oldCssProps[e] || ""
                    }), n || (l.oldCssProps = {}))
                }
                Pl.prototype = {
                    defaults: {},
                    set: function(l) {
                        return r(this.options, l), this.manager && this.manager.touchAction.update(), this
                    },
                    recognizeWith: function(l) {
                        if (v(l, "recognizeWith", this)) return this;
                        var n = this.simultaneous;
                        return n[(l = jl(l, this)).id] || (n[l.id] = l, l.recognizeWith(this)), this
                    },
                    dropRecognizeWith: function(l) {
                        return v(l, "dropRecognizeWith", this) ? this : (l = jl(l, this), delete this.simultaneous[l.id], this)
                    },
                    requireFailure: function(l) {
                        if (v(l, "requireFailure", this)) return this;
                        var n = this.requireFail;
                        return -1 === x(n, l = jl(l, this)) && (n.push(l), l.requireFailure(this)), this
                    },
                    dropRequireFailure: function(l) {
                        if (v(l, "dropRequireFailure", this)) return this;
                        l = jl(l, this);
                        var n = x(this.requireFail, l);
                        return n > -1 && this.requireFail.splice(n, 1), this
                    },
                    hasRequireFailures: function() {
                        return this.requireFail.length > 0
                    },
                    canRecognizeWith: function(l) {
                        return !!this.simultaneous[l.id]
                    },
                    emit: function(l) {
                        var n = this,
                            e = this.state;

                        function t(e) {
                            n.manager.emit(e, l)
                        }
                        e < Ol && t(n.options.event + Ml(e)), t(n.options.event), l.additionalEvent && t(l.additionalEvent), e >= Ol && t(n.options.event + Ml(e))
                    },
                    tryEmit: function(l) {
                        if (this.canEmit()) return this.emit(l);
                        this.state = 32
                    },
                    canEmit: function() {
                        for (var l = 0; l < this.requireFail.length;) {
                            if (!(this.requireFail[l].state & (32 | xl))) return !1;
                            l++
                        }
                        return !0
                    },
                    recognize: function(l) {
                        var n = r({}, l);
                        if (!w(this.options.enable, [this, n])) return this.reset(), void(this.state = 32);
                        this.state & (Nl | ql | 32) && (this.state = xl), this.state = this.process(n), this.state & (Ll | Al | Ol | ql) && this.tryEmit(n)
                    },
                    process: function(l) {},
                    getTouchAction: function() {},
                    reset: function() {}
                }, R(Ul, Pl, {
                    defaults: {
                        pointers: 1
                    },
                    attrTest: function(l) {
                        var n = this.options.pointers;
                        return 0 === n || l.pointers.length === n
                    },
                    process: function(l) {
                        var n = this.state,
                            e = l.eventType,
                            t = n & (Ll | Al),
                            u = this.attrTest(l);
                        return t && (e & B || !u) ? n | ql : t || u ? e & V ? n | Ol : n & Ll ? n | Al : Ll : 32
                    }
                }), R(Vl, Ul, {
                    defaults: {
                        event: "pan",
                        threshold: 10,
                        pointers: 1,
                        direction: W
                    },
                    getTouchAction: function() {
                        var l = this.options.direction,
                            n = [];
                        return l & Q && n.push("pan-y"), l & G && n.push("pan-x"), n
                    },
                    directionTest: function(l) {
                        var n = this.options,
                            e = !0,
                            t = l.distance,
                            u = l.direction,
                            o = l.deltaX,
                            a = l.deltaY;
                        return u & n.direction || (n.direction & Q ? (u = 0 === o ? H : o < 0 ? z : Z, e = o != this.pX, t = Math.abs(l.deltaX)) : (u = 0 === a ? H : a < 0 ? $ : Y, e = a != this.pY, t = Math.abs(l.deltaY))), l.direction = u, e && t > n.threshold && u & n.direction
                    },
                    attrTest: function(l) {
                        return Ul.prototype.attrTest.call(this, l) && (this.state & Ll || !(this.state & Ll) && this.directionTest(l))
                    },
                    emit: function(l) {
                        this.pX = l.deltaX, this.pY = l.deltaY;
                        var n = Fl(l.direction);
                        n && (l.additionalEvent = this.options.event + n), this._super.emit.call(this, l)
                    }
                }), R(Bl, Ul, {
                    defaults: {
                        event: "pinch",
                        threshold: 0,
                        pointers: 2
                    },
                    getTouchAction: function() {
                        return ["none"]
                    },
                    attrTest: function(l) {
                        return this._super.attrTest.call(this, l) && (Math.abs(l.scale - 1) > this.options.threshold || this.state & Ll)
                    },
                    emit: function(l) {
                        1 !== l.scale && (l.additionalEvent = this.options.event + (l.scale < 1 ? "in" : "out")), this._super.emit.call(this, l)
                    }
                }), R(Hl, Pl, {
                    defaults: {
                        event: "press",
                        pointers: 1,
                        time: 251,
                        threshold: 9
                    },
                    getTouchAction: function() {
                        return ["auto"]
                    },
                    process: function(l) {
                        var n = this.options,
                            e = l.pointers.length === n.pointers,
                            t = l.distance < n.threshold,
                            u = l.deltaTime > n.time;
                        if (this._input = l, !t || !e || l.eventType & (V | B) && !u) this.reset();
                        else if (l.eventType & U) this.reset(), this._timer = h(function() {
                            this.state = Nl, this.tryEmit()
                        }, n.time, this);
                        else if (l.eventType & V) return Nl;
                        return 32
                    },
                    reset: function() {
                        clearTimeout(this._timer)
                    },
                    emit: function(l) {
                        this.state === Nl && (l && l.eventType & V ? this.manager.emit(this.options.event + "up", l) : (this._input.timeStamp = m(), this.manager.emit(this.options.event, this._input)))
                    }
                }), R(zl, Ul, {
                    defaults: {
                        event: "rotate",
                        threshold: 0,
                        pointers: 2
                    },
                    getTouchAction: function() {
                        return ["none"]
                    },
                    attrTest: function(l) {
                        return this._super.attrTest.call(this, l) && (Math.abs(l.rotation) > this.options.threshold || this.state & Ll)
                    }
                }), R(Zl, Ul, {
                    defaults: {
                        event: "swipe",
                        threshold: 10,
                        velocity: .3,
                        direction: Q | G,
                        pointers: 1
                    },
                    getTouchAction: function() {
                        return Vl.prototype.getTouchAction.call(this)
                    },
                    attrTest: function(l) {
                        var n, e = this.options.direction;
                        return e & (Q | G) ? n = l.overallVelocity : e & Q ? n = l.overallVelocityX : e & G && (n = l.overallVelocityY), this._super.attrTest.call(this, l) && e & l.offsetDirection && l.distance > this.options.threshold && l.maxPointers == this.options.pointers && p(n) > this.options.velocity && l.eventType & V
                    },
                    emit: function(l) {
                        var n = Fl(l.offsetDirection);
                        n && this.manager.emit(this.options.event + n, l), this.manager.emit(this.options.event, l)
                    }
                }), R($l, Pl, {
                    defaults: {
                        event: "tap",
                        pointers: 1,
                        taps: 1,
                        interval: 300,
                        time: 250,
                        threshold: 9,
                        posThreshold: 10
                    },
                    getTouchAction: function() {
                        return ["manipulation"]
                    },
                    process: function(l) {
                        var n = this.options,
                            e = l.pointers.length === n.pointers,
                            t = l.distance < n.threshold,
                            u = l.deltaTime < n.time;
                        if (this.reset(), l.eventType & U && 0 === this.count) return this.failTimeout();
                        if (t && u && e) {
                            if (l.eventType != V) return this.failTimeout();
                            var o = !this.pTime || l.timeStamp - this.pTime < n.interval,
                                a = !this.pCenter || ol(this.pCenter, l.center) < n.posThreshold;
                            if (this.pTime = l.timeStamp, this.pCenter = l.center, a && o ? this.count += 1 : this.count = 1, this._input = l, 0 == this.count % n.taps) return this.hasRequireFailures() ? (this._timer = h(function() {
                                this.state = Nl, this.tryEmit()
                            }, n.interval, this), Ll) : Nl
                        }
                        return 32
                    },
                    failTimeout: function() {
                        return this._timer = h(function() {
                            this.state = 32
                        }, this.options.interval, this), 32
                    },
                    reset: function() {
                        clearTimeout(this._timer)
                    },
                    emit: function() {
                        this.state == Nl && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                    }
                }), Yl.VERSION = "2.0.7", Yl.defaults = {
                    domEvents: !1,
                    touchAction: "compute",
                    enable: !0,
                    inputTarget: null,
                    inputClass: null,
                    preset: [
                        [zl, {
                            enable: !1
                        }],
                        [Bl, {
                                enable: !1
                            },
                            ["rotate"]
                        ],
                        [Zl, {
                            direction: Q
                        }],
                        [Vl, {
                                direction: Q
                            },
                            ["swipe"]
                        ],
                        [$l],
                        [$l, {
                                event: "doubletap",
                                taps: 2
                            },
                            ["tap"]
                        ],
                        [Hl]
                    ],
                    cssProps: {
                        userSelect: "none",
                        touchSelect: "none",
                        touchCallout: "none",
                        contentZooming: "none",
                        userDrag: "none",
                        tapHighlightColor: "rgba(0,0,0,0)"
                    }
                }, Ql.prototype = {
                    set: function(l) {
                        return r(this.options, l), l.touchAction && this.touchAction.update(), l.inputTarget && (this.input.destroy(), this.input.target = l.inputTarget, this.input.init()), this
                    },
                    stop: function(l) {
                        this.session.stopped = l ? 2 : 1
                    },
                    recognize: function(l) {
                        var n = this.session;
                        if (!n.stopped) {
                            var e;
                            this.touchAction.preventDefaults(l);
                            var t = this.recognizers,
                                u = n.curRecognizer;
                            (!u || u && u.state & Nl) && (u = n.curRecognizer = null);
                            for (var o = 0; o < t.length;) e = t[o], 2 === n.stopped || u && e != u && !e.canRecognizeWith(u) ? e.reset() : e.recognize(l), !u && e.state & (Ll | Al | Ol) && (u = n.curRecognizer = e), o++
                        }
                    },
                    get: function(l) {
                        if (l instanceof Pl) return l;
                        for (var n = this.recognizers, e = 0; e < n.length; e++)
                            if (n[e].options.event == l) return n[e];
                        return null
                    },
                    add: function(l) {
                        if (v(l, "add", this)) return this;
                        var n = this.get(l.options.event);
                        return n && this.remove(n), this.recognizers.push(l), l.manager = this, this.touchAction.update(), l
                    },
                    remove: function(l) {
                        if (v(l, "remove", this)) return this;
                        if (l = this.get(l)) {
                            var n = this.recognizers,
                                e = x(n, l); - 1 !== e && (n.splice(e, 1), this.touchAction.update())
                        }
                        return this
                    },
                    on: function(l, n) {
                        if (l !== i && n !== i) {
                            var e = this.handlers;
                            return g(D(l), function(l) {
                                e[l] = e[l] || [], e[l].push(n)
                            }), this
                        }
                    },
                    off: function(l, n) {
                        if (l !== i) {
                            var e = this.handlers;
                            return g(D(l), function(l) {
                                n ? e[l] && e[l].splice(x(e[l], n), 1) : delete e[l]
                            }), this
                        }
                    },
                    emit: function(l, n) {
                        this.options.domEvents && function(l, n) {
                            var e = o.createEvent("Event");
                            e.initEvent(l, !0, !0), e.gesture = n, n.target.dispatchEvent(e)
                        }(l, n);
                        var e = this.handlers[l] && this.handlers[l].slice();
                        if (e && e.length) {
                            n.type = l, n.preventDefault = function() {
                                n.srcEvent.preventDefault()
                            };
                            for (var t = 0; t < e.length;) e[t](n), t++
                        }
                    },
                    destroy: function() {
                        this.element && Gl(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                    }
                }, r(Yl, {
                    INPUT_START: U,
                    INPUT_MOVE: 2,
                    INPUT_END: V,
                    INPUT_CANCEL: B,
                    STATE_POSSIBLE: xl,
                    STATE_BEGAN: Ll,
                    STATE_CHANGED: Al,
                    STATE_ENDED: Ol,
                    STATE_RECOGNIZED: Nl,
                    STATE_CANCELLED: ql,
                    STATE_FAILED: 32,
                    DIRECTION_NONE: H,
                    DIRECTION_LEFT: z,
                    DIRECTION_RIGHT: Z,
                    DIRECTION_UP: $,
                    DIRECTION_DOWN: Y,
                    DIRECTION_HORIZONTAL: Q,
                    DIRECTION_VERTICAL: G,
                    DIRECTION_ALL: W,
                    Manager: Ql,
                    Input: J,
                    TouchAction: Dl,
                    TouchInput: yl,
                    MouseInput: sl,
                    PointerEventInput: hl,
                    TouchMouseInput: El,
                    SingleTouchInput: _l,
                    Recognizer: Pl,
                    AttrRecognizer: Ul,
                    Tap: $l,
                    Pan: Vl,
                    Swipe: Zl,
                    Pinch: Bl,
                    Rotate: zl,
                    Press: Hl,
                    on: k,
                    off: I,
                    each: g,
                    merge: C,
                    extend: _,
                    assign: r,
                    inherit: R,
                    bindFn: y,
                    prefixed: O
                }), (void 0 !== u ? u : "undefined" != typeof self ? self : {}).Hammer = Yl, (t = (function() {
                    return Yl
                }).call(n, e, n, l)) === i || (l.exports = t)
            }(window, document)
        },
        zUnb: function(l, n, e) {
            "use strict";
            e.r(n);
            var t = e("CcnG"),
                u = {
                    production: !0,
                    hostServer: ""
                },
                o = (e("yLV6"), e("0bV8")),
                a = e("67Y/"),
                i = e("9Z1F"),
                r = e("t/Na"),
                d = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/rest/admin"
                    }
                    return l.prototype.getApplicationConfiguration = function() {
                        return this.http.get(this.host + "/application-configuration").pipe(Object(a.a)(function(l) {
                            return l.config
                        }, Object(i.a)(function(l) {
                            throw l
                        })))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();

            function s(l) {
                return new o.a(l, "./../assets/i18n/", ".json")
            }
            var c = function() {
                    return function(l, n) {
                        l.getApplicationConfiguration().subscribe(function(l) {
                            n.getContainerElement().classList.add(l.application.theme + "-theme")
                        })
                    }
                }(),
                f = function() {
                    function l(l, n, e, t) {
                        this._document = l, this.titleService = n, this.translate = e, this.configurationService = t, this.translate.setDefaultLang("en")
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            l.setTitle(n.application.name);
                            var e = n.application.favicon;
                            e = decodeURIComponent(e.substring(e.lastIndexOf("/") + 1)), l._document.getElementById("favicon").setAttribute("href", "/assets/public/" + e)
                        })
                    }, l.prototype.setTitle = function(l) {
                        this.titleService.setTitle(l)
                    }, l
                }(),
                p = e("pMnS"),
                m = e("NcP4"),
                h = e("t68o"),
                v = e("zbXB"),
                g = e("BHnd"),
                b = e("y4qS"),
                _ = e("Ip0R"),
                C = e("A7o+"),
                R = e("bujt"),
                y = e("UodH"),
                w = e("dWZg"),
                E = e("lLAP"),
                k = e("wFw1"),
                I = e("pIm3"),
                S = e("337w"),
                T = e("gIcY"),
                D = e("qYH4"),
                x = e("21Lb"),
                L = e("OzfB"),
                A = e("Fzqc"),
                O = e("K9Ia"),
                N = function() {
                    function l(l) {
                        this.http = l, this.isLoggedIn = new O.a, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Users"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.hostServer + "/rest/user/authentication-details/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.get = function(l) {
                        return this.http.get(this.host + "/" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.login = function(l) {
                        return this.isLoggedIn.next(!0), this.http.post(this.hostServer + "/rest/user/login", l).pipe(Object(a.a)(function(l) {
                            return l.authentication
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.getLoggedInState = function() {
                        return this.isLoggedIn.asObservable()
                    }, l.prototype.changePassword = function(l) {
                        return this.http.get(this.hostServer + "/rest/user/change-password?current=" + l.current + "&new=" + l.new + "&repeat=" + l.repeat).pipe(Object(a.a)(function(l) {
                            return l.user
                        }), Object(i.a)(function(l) {
                            throw l.error
                        }))
                    }, l.prototype.resetPassword = function(l) {
                        return this.http.post(this.hostServer + "/rest/user/reset-password", l).pipe(Object(a.a)(function(l) {
                            return l.user
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.whoAmI = function() {
                        return this.http.get(this.hostServer + "/rest/user/whoami").pipe(Object(a.a)(function(l) {
                            return l.user
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.oauthLogin = function(l) {
                        return this.http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + l)
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                q = e("7O5W"),
                P = e("wHSu");
            q.b.add(P.b), q.a.watch();
            var M = function() {
                    function l(l, n) {
                        this.dialogData = l, this.userService = n
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.userService.get(this.dialogData.id).subscribe(function(n) {
                            l.user = n
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l
                }(),
                F = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Feedbacks"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.host + "/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.del = function(l) {
                        return this.http.delete(this.host + "/" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                j = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Recycles"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.host + "/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.U, P.m, P.u, P.a, P.O), q.a.watch();
            var U = function() {
                    function l(l, n, e, t, u) {
                        this.dialog = l, this.userService = n, this.recycleService = e, this.feedbackService = t, this.sanitizer = u, this.userColumns = ["user", "email", "user_detail"], this.recycleColumns = ["user", "quantity", "address", "icon", "pickup_date"], this.feedbackColumns = ["user", "comment", "rating", "remove"]
                    }
                    return l.prototype.ngOnInit = function() {
                        this.findAllUsers(), this.findAllRecycles(), this.findAllFeedbacks()
                    }, l.prototype.findAllUsers = function() {
                        var l = this;
                        this.userService.find().subscribe(function(n) {
                            l.userDataSource = n;
                            for (var e = 0, t = l.userDataSource; e < t.length; e++) {
                                var u = t[e];
                                u.email = l.sanitizer.bypassSecurityTrustHtml(u.email)
                            }
                        }, function(n) {
                            l.error = n, console.log(l.error)
                        })
                    }, l.prototype.findAllRecycles = function() {
                        var l = this;
                        this.recycleService.find().subscribe(function(n) {
                            l.recycleDataSource = n
                        }, function(n) {
                            l.error = n, console.log(l.error)
                        })
                    }, l.prototype.findAllFeedbacks = function() {
                        var l = this;
                        this.feedbackService.find().subscribe(function(n) {
                            l.feedbackDataSource = n;
                            for (var e = 0, t = l.feedbackDataSource; e < t.length; e++) {
                                var u = t[e];
                                u.comment = l.sanitizer.bypassSecurityTrustHtml(u.comment)
                            }
                        }, function(n) {
                            l.error = n, console.log(l.error)
                        })
                    }, l.prototype.deleteFeedback = function(l) {
                        var n = this;
                        this.feedbackService.del(l).subscribe(function() {
                            n.findAllFeedbacks()
                        }, function(l) {
                            n.error = l, console.log(n.error)
                        })
                    }, l.prototype.showUserDetail = function(l) {
                        this.dialog.open(M, {
                            data: {
                                id: l
                            }
                        })
                    }, l
                }(),
                V = e("o3x0"),
                B = e("ZYjt"),
                H = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".container[_ngcontent-%COMP%]{justify-content:center}.heading[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);justify-content:center;margin-bottom:10px;padding:12px 20px}.customer-container[_ngcontent-%COMP%], .user-container.recycle-container[_ngcontent-%COMP%]{max-width:600px;min-width:300px;width:70%}.customer-table[_ngcontent-%COMP%], .recycle-table[_ngcontent-%COMP%], .user-table[_ngcontent-%COMP%]{margin-bottom:25px}.mat-column-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], .mat-column-user_detail[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:38%}mat-cell[_ngcontent-%COMP%], mat-footer-cell[_ngcontent-%COMP%], mat-header-cell[_ngcontent-%COMP%]{align-items:normal;display:block}.mat-column-comment[_ngcontent-%COMP%]{padding:10px}mat-cell[_ngcontent-%COMP%]:last-child, mat-footer-cell[_ngcontent-%COMP%]:last-child, mat-header-cell[_ngcontent-%COMP%]:last-child{padding-right:50px}"]
                    ],
                    data: {}
                });

            function z(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], null, null)
            }

            function Z(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fas fa-user fa-lg"]
                ], null, null, null, null, null))], null, null)
            }

            function $(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Z)), t["\u0275did"](3, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    l(n, 3, 0, n.context.$implicit.token)
                }, null)
            }

            function Y(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Q(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null)], null, function(l, n) {
                    l(n, 0, 0, n.context.$implicit.email)
                })
            }

            function G(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], null, null)
            }

            function W(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showUserDetail(l.context.$implicit.id) && t), t
                }, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-eye"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode)
                })
            }

            function K(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function X(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function J(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_USER"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function ll(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.UserId)
                })
            }

            function nl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_QUANTITY"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function el(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.quantity)
                })
            }

            function tl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_ADDRESS"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function ul(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, ["", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.address)
                })
            }

            function ol(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], null, null)
            }

            function al(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fas fa-home fa-lg"]
                ], null, null, null, null, null))], null, null)
            }

            function il(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fas fa-archive fa-lg"]
                ], null, null, null, null, null))], null, null)
            }

            function rl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, al)), t["\u0275did"](3, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, il)), t["\u0275did"](5, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    l(n, 3, 0, n.context.$implicit.isPickup), l(n, 5, 0, !n.context.$implicit.isPickup)
                }, null)
            }

            function dl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PICKUP_DATE"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function sl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, ["", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.date)
                })
            }

            function cl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function fl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function pl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_USER"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function ml(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.UserId)
                })
            }

            function hl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_COMMENT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function vl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null)], null, function(l, n) {
                    l(n, 0, 0, n.context.$implicit.comment)
                })
            }

            function gl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_RATING"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function bl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 3, "bar-rating", [
                    ["readOnly", "true"]
                ], null, null, null, S.b, S.a)), t["\u0275prd"](5120, null, T.j, function(l) {
                    return [l]
                }, [D.a]), t["\u0275prd"](5120, null, T.i, function(l) {
                    return [l]
                }, [D.a]), t["\u0275did"](5, 638976, null, 0, D.a, [t.ChangeDetectorRef], {
                    rate: [0, "rate"],
                    max: [1, "max"],
                    readOnly: [2, "readOnly"]
                }, null)], function(l, n) {
                    l(n, 5, 0, n.context.$implicit.rating, 5, "true")
                }, null)
            }

            function _l(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], null, null)
            }

            function Cl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.deleteFeedback(l.context.$implicit.id) && t), t
                }, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-trash-alt"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode)
                })
            }

            function Rl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function yl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function wl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 217, "div", [
                    ["class", "container"],
                    ["fxLayout", "row"],
                    ["fxLayout.lt-md", "column"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtMd: [1, "layoutLtMd"]
                }, null), t["\u0275did"](2, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 142, "div", [
                    ["class", "user-container recycle-container"],
                    ["fxFlexAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](4, 737280, null, 0, x.a, [L.h, t.ElementRef, L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](5, 0, null, null, 58, "div", [
                    ["class", "user-table mat-elevation-z8"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](6, 0, null, null, 6, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](7, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](8, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_ADMINISTRATION"])), (l()(), t["\u0275eld"](10, 0, null, null, 2, "small", [
                    ["style", "margin-left: 10px;"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](11, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_USER"])), (l()(), t["\u0275eld"](13, 0, null, null, 50, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](14, 2342912, null, 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 1, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 2, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 3, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 4, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](19, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](21, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 5, {
                    cell: 0
                }), t["\u0275qud"](335544320, 6, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 7, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, z)), t["\u0275did"](27, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [6, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, $)), t["\u0275did"](30, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [5, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](32, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](34, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 8, {
                    cell: 0
                }), t["\u0275qud"](335544320, 9, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 10, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Y)), t["\u0275did"](40, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Q)), t["\u0275did"](43, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](45, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](47, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 11, {
                    cell: 0
                }), t["\u0275qud"](335544320, 12, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 13, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, G)), t["\u0275did"](53, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [12, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, W)), t["\u0275did"](56, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [11, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, K)), t["\u0275did"](59, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [3, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, X)), t["\u0275did"](62, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.n, null, [g.j]), (l()(), t["\u0275eld"](64, 0, null, null, 81, "div", [
                    ["class", "recycle-table mat-elevation-z8"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](65, 0, null, null, 3, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](66, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](67, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_RECYCLING"])), (l()(), t["\u0275eld"](69, 0, null, null, 76, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](70, 2342912, null, 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 14, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 15, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 16, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 17, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](75, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](77, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 18, {
                    cell: 0
                }), t["\u0275qud"](335544320, 19, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 20, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, J)), t["\u0275did"](83, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [19, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, ll)), t["\u0275did"](86, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [18, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](88, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](90, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 21, {
                    cell: 0
                }), t["\u0275qud"](335544320, 22, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 23, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, nl)), t["\u0275did"](96, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [22, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, el)), t["\u0275did"](99, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [21, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](101, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](103, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 24, {
                    cell: 0
                }), t["\u0275qud"](335544320, 25, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 26, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, tl)), t["\u0275did"](109, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [25, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, ul)), t["\u0275did"](112, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [24, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](114, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](116, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 27, {
                    cell: 0
                }), t["\u0275qud"](335544320, 28, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 29, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, ol)), t["\u0275did"](122, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [28, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, rl)), t["\u0275did"](125, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [27, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](127, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](129, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 30, {
                    cell: 0
                }), t["\u0275qud"](335544320, 31, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 32, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, dl)), t["\u0275did"](135, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [31, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, sl)), t["\u0275did"](138, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [30, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, cl)), t["\u0275did"](141, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [16, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, fl)), t["\u0275did"](144, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], b.n, null, [g.j]), (l()(), t["\u0275eld"](146, 0, null, null, 70, "div", [
                    ["class", "customer-container"],
                    ["fxFlexAlign.lt-md", "center"]
                ], null, null, null, null, null)), t["\u0275did"](147, 737280, null, 0, x.a, [L.h, t.ElementRef, L.l], {
                    alignLtMd: [0, "alignLtMd"]
                }, null), (l()(), t["\u0275eld"](148, 0, null, null, 68, "div", [
                    ["class", "customer-table mat-elevation-z8"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](149, 0, null, null, 3, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](150, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](151, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_CUSTOMER_FEEDBACK"])), (l()(), t["\u0275eld"](153, 0, null, null, 63, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](154, 2342912, null, 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 33, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 34, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 35, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 36, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](159, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](161, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 37, {
                    cell: 0
                }), t["\u0275qud"](335544320, 38, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 39, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [33, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, pl)), t["\u0275did"](167, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [38, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, ml)), t["\u0275did"](170, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [37, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](172, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](174, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 40, {
                    cell: 0
                }), t["\u0275qud"](335544320, 41, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 42, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [33, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, hl)), t["\u0275did"](180, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [41, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, vl)), t["\u0275did"](183, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [40, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](185, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](187, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 43, {
                    cell: 0
                }), t["\u0275qud"](335544320, 44, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 45, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [33, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, gl)), t["\u0275did"](193, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [44, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, bl)), t["\u0275did"](196, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [43, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](198, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](200, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 46, {
                    cell: 0
                }), t["\u0275qud"](335544320, 47, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 48, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [33, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, _l)), t["\u0275did"](206, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [47, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Cl)), t["\u0275did"](209, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [46, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, Rl)), t["\u0275did"](212, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [35, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, yl)), t["\u0275did"](215, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [34, 4]
                ], b.n, null, [g.j]), (l()(), t["\u0275eld"](217, 0, null, null, 0, "img", [
                    ["src", "assets/public/images/tracking/administration.png"]
                ], null, null, null, null, null))], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "row", "column"), l(n, 2, 0, "20px"), l(n, 4, 0, "center"), l(n, 8, 0, ""), l(n, 11, 0, ""), l(n, 14, 0, e.userDataSource), l(n, 21, 0, "user"), l(n, 34, 0, "email"), l(n, 47, 0, "user_detail"), l(n, 59, 0, e.userColumns), l(n, 62, 0, e.userColumns), l(n, 67, 0, ""), l(n, 70, 0, e.recycleDataSource), l(n, 77, 0, "user"), l(n, 90, 0, "quantity"), l(n, 103, 0, "address"), l(n, 116, 0, "icon"), l(n, 129, 0, "pickup_date"), l(n, 141, 0, e.recycleColumns), l(n, 144, 0, e.recycleColumns), l(n, 147, 0, "center"), l(n, 151, 0, ""), l(n, 154, 0, e.feedbackDataSource), l(n, 161, 0, "user"), l(n, 174, 0, "comment"), l(n, 187, 0, "rating"), l(n, 200, 0, "remove"), l(n, 212, 0, e.feedbackColumns), l(n, 215, 0, e.feedbackColumns)
                }, null)
            }

            function El(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-administration", [], null, null, null, wl, H)), t["\u0275did"](1, 114688, null, 0, U, [V.e, N, j, F, B.d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var kl = t["\u0275ccf"]("app-administration", U, El, {}, {}, []),
                Il = e("0j8l"),
                Sl = e("ZxlG"),
                Tl = e("8tEE"),
                Dl = e("twK/");
            q.b.add(Tl.e, Tl.k, Tl.j, Dl.f), q.a.watch();
            var xl = function() {
                    function l(l, n, e) {
                        this.configurationService = l, this.feedbackService = n, this.sanitizer = e, this.twitterUrl = null, this.facebookUrl = null, this.slackUrl = null, this.pressKitUrl = null, this.slideshowDataSource = [], this.images = ["assets/public/images/carousel/1.jpg", "assets/public/images/carousel/2.jpg", "assets/public/images/carousel/3.jpg", "assets/public/images/carousel/4.jpg", "assets/public/images/carousel/5.png", "assets/public/images/carousel/6.jpg", "assets/public/images/carousel/7.jpg"]
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.populateSlideshowFromFeedbacks(), this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            n && n.application && (null !== n.application.twitterUrl && (l.twitterUrl = n.application.twitterUrl), null !== n.application.facebookUrl && (l.facebookUrl = n.application.facebookUrl), null !== n.application.slackUrl && (l.slackUrl = n.application.slackUrl), null !== n.application.pressKitUrl && (l.pressKitUrl = n.application.pressKitUrl))
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.populateSlideshowFromFeedbacks = function() {
                        var l = this;
                        this.feedbackService.find().subscribe(function(n) {
                            for (var e = 0; e < n.length; e++) n[e].comment = l.sanitizer.bypassSecurityTrustHtml(n[e].comment), l.slideshowDataSource.push({
                                url: l.images[e % l.images.length],
                                caption: n[e].comment
                            })
                        }, function(l) {
                            console.log(l)
                        })
                    }, l
                }(),
                Ll = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".about-description[_ngcontent-%COMP%]{margin-left:8.33333%;width:83.3333%}.feedback[_ngcontent-%COMP%]{margin-left:8.3333%;margin-right:8.3333%;width:83.333%}.social[_ngcontent-%COMP%]{margin-top:20px}.mat-raised-button[_ngcontent-%COMP%]{margin-right:3px}"]
                    ],
                    data: {}
                });

            function Al(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], [
                    [8, "href", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fab fa-twitter fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Twitter"]))], function(l, n) {
                    l(n, 2, 0, "accent")
                }, function(l, n) {
                    l(n, 0, 0, n.component.twitterUrl), l(n, 1, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function Ol(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], [
                    [8, "href", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fab fa-facebook fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Facebook"]))], function(l, n) {
                    l(n, 2, 0, "accent")
                }, function(l, n) {
                    l(n, 0, 0, n.component.facebookUrl), l(n, 1, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function Nl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], [
                    [8, "href", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fab fa-slack fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Slack"]))], function(l, n) {
                    l(n, 2, 0, "accent")
                }, function(l, n) {
                    l(n, 0, 0, n.component.slackUrl), l(n, 1, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function ql(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], [
                    [8, "href", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "far fa-newspaper fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Press Kit"]))], function(l, n) {
                    l(n, 2, 0, "accent")
                }, function(l, n) {
                    l(n, 0, 0, n.component.pressKitUrl), l(n, 1, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function Pl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 12, "div", [
                    ["class", "social"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "h3", [], null, null, null, null, null)), (l()(), t["\u0275eld"](2, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](3, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_SOCIAL_MEDIA"])), (l()(), t["\u0275and"](16777216, null, null, 1, null, Al)), t["\u0275did"](6, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Ol)), t["\u0275did"](8, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Nl)), t["\u0275did"](10, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, ql)), t["\u0275did"](12, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, ""), l(n, 6, 0, e.twitterUrl), l(n, 8, 0, e.facebookUrl), l(n, 10, 0, e.slackUrl), l(n, 12, 0, e.pressKitUrl)
                }, null)
            }

            function Ml(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 25, "div", [
                    ["fxLayout", "row"],
                    ["fxLayout.lt-md", "column"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtMd: [1, "layoutLtMd"]
                }, null), t["\u0275did"](2, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 13, "section", [
                    ["class", "about-description"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](4, 0, null, null, 6, "h3", [], null, null, null, null, null)), (l()(), t["\u0275eld"](5, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](6, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_ABOUT"])), (l()(), t["\u0275eld"](8, 0, null, null, 2, "small", [
                    ["style", "margin-left: 10px;"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](9, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_CORPORATE_HISTORY"])), (l()(), t["\u0275eld"](11, 0, null, null, 5, "p", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. "])), (l()(), t["\u0275eld"](13, 0, null, null, 2, "a", [
                    ["href", "/ftp/legal.md?md_debug=true"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](14, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LINK_TERMS_OF_USE"])), (l()(), t["\u0275ted"](-1, null, [" Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur. "])), (l()(), t["\u0275eld"](17, 0, null, null, 8, "div", [
                    ["class", "feedback"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](18, 0, null, null, 3, "h3", [], null, null, null, null, null)), (l()(), t["\u0275eld"](19, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](20, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_CUSTOMER_FEEDBACK"])), (l()(), t["\u0275eld"](22, 0, null, null, 1, "slideshow", [], null, null, null, Il.b, Il.a)), t["\u0275did"](23, 311296, null, 0, Sl.b, [Sl.c, t.Renderer2, B.k, B.d, t.PLATFORM_ID, _.DOCUMENT], {
                    imageUrls: [0, "imageUrls"],
                    height: [1, "height"],
                    showArrows: [2, "showArrows"],
                    autoPlay: [3, "autoPlay"],
                    showDots: [4, "showDots"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Pl)), t["\u0275did"](25, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "row", "column"), l(n, 2, 0, "20px"), l(n, 6, 0, ""), l(n, 9, 0, ""), l(n, 14, 0, ""), l(n, 20, 0, ""), l(n, 23, 0, e.slideshowDataSource, "300px", !0, !0, !1), l(n, 25, 0, e.twitterUrl || e.facebookUrl)
                }, null)
            }

            function Fl(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-about", [], null, null, null, Ml, Ll)), t["\u0275did"](1, 114688, null, 0, xl, [d, F, B.d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var jl = t["\u0275ccf"]("app-about", xl, Fl, {}, {}, []),
                Ul = e("hUWP"),
                Vl = e("seP3"),
                Bl = e("lzlj"),
                Hl = e("FVSy"),
                zl = e("ure7"),
                Zl = e("u7R8"),
                $l = e("AyJq"),
                Yl = e("jlZm"),
                Ql = e("YlbQ"),
                Gl = e("dJrM"),
                Wl = e("Wf4p"),
                Kl = e("b716"),
                Xl = e("/VYK");
            q.b.add(P.b), q.a.watch();
            var Jl = function() {
                    function l(l) {
                        this.dialogData = l
                    }
                    return l.prototype.ngOnInit = function() {
                        this.title = this.dialogData.title, this.url = this.dialogData.url, this.address = this.dialogData.address, this.data = this.dialogData.data
                    }, l
                }(),
                ln = function() {
                    function l() {}
                    return Object.defineProperty(l.prototype, "nativeWindow", {
                        get: function() {
                            return window
                        },
                        enumerable: !0,
                        configurable: !0
                    }), l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                nn = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/BasketItems"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.hostServer + "/rest/basket/" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.get = function(l) {
                        return this.http.get(this.host + "/" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.put = function(l, n) {
                        return this.http.put(this.host + "/" + l, n).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.del = function(l) {
                        return this.http.delete(this.host + "/" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.checkout = function(l) {
                        return this.http.post(this.hostServer + "/rest/basket/" + l + "/checkout", {}).pipe(Object(a.a)(function(l) {
                            return l.orderConfirmation
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.applyCoupon = function(l, n) {
                        return this.http.put(this.hostServer + "/rest/basket/" + l + "/coupon/" + n, {}).pipe(Object(a.a)(function(l) {
                            return l.discount
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.z, P.B, P.e, P.q, P.k, Dl.g, P.t, Tl.b, Tl.i, Tl.d, Dl.c, P.M, P.S, P.K), q.a.watch();
            var en = function() {
                    function l(l, n, e, t, u, o) {
                        this.dialog = l, this.basketService = n, this.userService = e, this.windowRefService = t, this.configurationService = u, this.translate = o, this.displayedColumns = ["product", "price", "quantity", "total price", "remove"], this.dataSource = [], this.couponPanelExpanded = !1, this.paymentPanelExpanded = !1, this.couponControl = new T.e("", [T.o.required, T.o.minLength(10), T.o.maxLength(10)]), this.error = void 0, this.confirmation = void 0, this.twitterUrl = null, this.facebookUrl = null, this.applicationName = "OWASP Juice Shop", this.redirectUrl = null
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.load(), this.userService.whoAmI().subscribe(function(n) {
                            l.userEmail = n.email || "anonymous", l.userEmail = "(" + l.userEmail + ")"
                        }, function(l) {
                            return console.log(l)
                        }), this.couponPanelExpanded = !!localStorage.getItem("couponPanelExpanded") && JSON.parse(localStorage.getItem("couponPanelExpanded")), this.paymentPanelExpanded = !!localStorage.getItem("paymentPanelExpanded") && JSON.parse(localStorage.getItem("paymentPanelExpanded")), this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            n && n.application && (null !== n.application.twitterUrl && (l.twitterUrl = n.application.twitterUrl), null !== n.application.facebookUrl && (l.facebookUrl = n.application.facebookUrl), null !== n.application.name && (l.applicationName = n.application.name))
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.load = function() {
                        var l = this;
                        this.basketService.find(sessionStorage.getItem("bid")).subscribe(function(n) {
                            l.dataSource = n.Products
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.delete = function(l) {
                        var n = this;
                        this.basketService.del(l).subscribe(function() {
                            n.load()
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.inc = function(l) {
                        this.addToQuantity(l, 1)
                    }, l.prototype.dec = function(l) {
                        this.addToQuantity(l, -1)
                    }, l.prototype.addToQuantity = function(l, n) {
                        var e = this;
                        this.basketService.get(l).subscribe(function(t) {
                            var u = t.quantity + n;
                            e.basketService.put(l, {
                                quantity: u < 1 ? 1 : u
                            }).subscribe(function() {
                                e.load()
                            }, function(l) {
                                return console.log(l)
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.toggleCoupon = function() {
                        this.couponPanelExpanded = !this.couponPanelExpanded, localStorage.setItem("couponPanelExpanded", JSON.stringify(this.couponPanelExpanded))
                    }, l.prototype.togglePayment = function() {
                        this.paymentPanelExpanded = !this.paymentPanelExpanded, localStorage.setItem("paymentPanelExpanded", JSON.stringify(this.paymentPanelExpanded))
                    }, l.prototype.checkout = function() {
                        var l = this;
                        this.basketService.checkout(sessionStorage.getItem("bid")).subscribe(function(n) {
                            l.redirectUrl = l.basketService.hostServer + n, l.windowRefService.nativeWindow.location.replace(l.redirectUrl)
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.applyCoupon = function() {
                        var l = this;
                        this.basketService.applyCoupon(sessionStorage.getItem("bid"), encodeURIComponent(this.couponControl.value)).subscribe(function(n) {
                            l.resetForm(), l.error = void 0, l.translate.get("DISCOUNT_APPLIED", {
                                discount: n
                            }).subscribe(function(n) {
                                l.confirmation = n
                            }, function(n) {
                                l.confirmation = n
                            })
                        }, function(n) {
                            console.log(n), l.confirmation = void 0, l.error = n, l.resetForm()
                        })
                    }, l.prototype.showBitcoinQrCode = function() {
                        this.dialog.open(Jl, {
                            data: {
                                data: "bitcoin:1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
                                url: "/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
                                address: "1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm",
                                title: "TITLE_BITCOIN_ADDRESS"
                            }
                        })
                    }, l.prototype.showDashQrCode = function() {
                        this.dialog.open(Jl, {
                            data: {
                                data: "dash:Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
                                url: "/redirect?to=https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
                                address: "Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW",
                                title: "TITLE_DASH_ADDRESS"
                            }
                        })
                    }, l.prototype.showEtherQrCode = function() {
                        this.dialog.open(Jl, {
                            data: {
                                data: "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6",
                                url: "https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6",
                                address: "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6",
                                title: "TITLE_ETHER_ADDRESS"
                            }
                        })
                    }, l.prototype.resetForm = function() {
                        this.couponControl.setValue(""), this.couponControl.markAsPristine(), this.couponControl.markAsUntouched()
                    }, l
                }(),
                tn = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".container[_ngcontent-%COMP%]{min-width:380px;width:40%}mat-card[_ngcontent-%COMP%]{margin-bottom:20px;margin-top:30px}.heading[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);justify-content:center;padding:12px 20px}.mat-row[_ngcontent-%COMP%]{padding-bottom:10px}.mat-column-description[_ngcontent-%COMP%], .mat-column-price[_ngcontent-%COMP%]{margin-left:20px}.mat-column-quantity[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{width:20px}mat-form-field[_ngcontent-%COMP%]{margin-top:15px;width:100%}mat-expansion-panel[_ngcontent-%COMP%]{margin-bottom:20px}.button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{margin-right:20px;margin-top:10px}.payment-label[_ngcontent-%COMP%]{padding-top:10px}"]
                    ],
                    data: {}
                });

            function un(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRODUCT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function on(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.name)
                })
            }

            function an(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRICE"]))], function(l, n) {
                    l(n, 1, 0, ""), l(n, 2, 0, "", "")
                }, null)
            }

            function rn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](3, null, [" ", ""]))], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 3, 0, n.context.$implicit.price)
                })
            }

            function dn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_QUANTITY"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function sn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 9, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.dec(l.context.$implicit.BasketItem.id) && t), t
                }, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-minus-square"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](5, 0, null, null, 1, "span", [], null, null, null, null, null)), (l()(), t["\u0275ted"](6, null, ["", ""])), (l()(), t["\u0275eld"](7, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.inc(l.context.$implicit.BasketItem.id) && t), t
                }, R.b, R.a)), t["\u0275did"](8, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](9, 0, null, 0, 0, "i", [
                    ["class", "fas fa-plus-square"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode), l(n, 6, 0, n.context.$implicit.BasketItem.quantity), l(n, 7, 0, t["\u0275nov"](n, 8).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 8)._animationMode)
                })
            }

            function cn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_TOTAL_PRICE"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function fn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, (n.context.$implicit.price * n.context.$implicit.BasketItem.quantity).toFixed(2))
                })
            }

            function pn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], null, null)
            }

            function mn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.delete(l.context.$implicit.BasketItem.id) && t), t
                }, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "far fa-trash-alt"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode)
                })
            }

            function hn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function vn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function gn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "div", [
                    ["style", "margin-top:5px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", ""]))], null, function(l, n) {
                    l(n, 1, 0, n.component.confirmation)
                })
            }

            function bn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "div", [
                    ["style", "margin-top:5px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", ""]))], null, function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, null == e.error ? null : e.error.error)
                })
            }

            function _n(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 16384, [
                    [24, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["Coupon code must be 10 characters long."]))], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).id)
                })
            }

            function Cn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    juiceshop: 0
                }), (l()(), t["\u0275ted"](-1, null, ["THANKS_FOR_SUPPORT"]))], function(l, n) {
                    var e = l(n, 2, 0, "OWASP Juice Shop");
                    l(n, 1, 0, "", e)
                }, null)
            }

            function Rn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    appname: 0
                }), (l()(), t["\u0275ted"](-1, null, ["THANKS_FOR_SUPPORT_CUSTOMIZED"]))], function(l, n) {
                    var e = l(n, 2, 0, n.component.applicationName);
                    l(n, 1, 0, "", e)
                }, null)
            }

            function yn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["href", "/redirect?to=https://gratipay.com/juice-shop"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fab fa-gratipay fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Gratipay"]))], null, function(l, n) {
                    l(n, 1, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function wn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    juiceshop: 0
                }), (l()(), t["\u0275ted"](-1, null, ["OFFICIAL_MERCHANDISE_STORES"]))], function(l, n) {
                    var e = l(n, 2, 0, "OWASP Juice Shop");
                    l(n, 1, 0, "", e)
                }, null)
            }

            function En(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    appname: 0
                }), (l()(), t["\u0275ted"](-1, null, ["OFFICIAL_MERCHANDISE_STORES_CUSTOMIZED"]))], function(l, n) {
                    var e = l(n, 2, 0, n.component.applicationName);
                    l(n, 1, 0, "", e)
                }, null)
            }

            function kn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 214, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 212, "div", [
                    ["class", "container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](3, 0, null, null, 82, "div", [
                    ["class", "table-container mat-elevation-z8"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](4, 0, null, null, 4, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](5, null, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](7, 0, null, null, 1, "small", [], null, null, null, null, null)), (l()(), t["\u0275ted"](8, null, ["", ""])), (l()(), t["\u0275eld"](9, 0, null, null, 76, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](10, 2342912, null, 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 1, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 2, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 3, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 4, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](15, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](17, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 5, {
                    cell: 0
                }), t["\u0275qud"](335544320, 6, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 7, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, un)), t["\u0275did"](23, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [6, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, on)), t["\u0275did"](26, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [5, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](28, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](30, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 8, {
                    cell: 0
                }), t["\u0275qud"](335544320, 9, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 10, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, an)), t["\u0275did"](36, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, rn)), t["\u0275did"](39, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](41, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](43, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 11, {
                    cell: 0
                }), t["\u0275qud"](335544320, 12, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 13, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, dn)), t["\u0275did"](49, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [12, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, sn)), t["\u0275did"](52, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [11, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](54, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](56, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 14, {
                    cell: 0
                }), t["\u0275qud"](335544320, 15, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 16, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, cn)), t["\u0275did"](62, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, fn)), t["\u0275did"](65, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](67, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](69, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 17, {
                    cell: 0
                }), t["\u0275qud"](335544320, 18, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 19, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, pn)), t["\u0275did"](75, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [18, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, mn)), t["\u0275did"](78, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [17, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, hn)), t["\u0275did"](81, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [3, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, vn)), t["\u0275did"](84, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.n, null, [g.j]), (l()(), t["\u0275eld"](86, 0, null, null, 12, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](87, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](88, 0, null, 0, 4, "button", [
                    ["class", "checkout-button"],
                    ["color", "primary"],
                    ["id", "checkoutButton"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.checkout() && t), t
                }, R.b, R.a)), t["\u0275did"](89, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](90, 0, null, 0, 0, "i", [
                    ["class", "fas fa-cart-arrow-down"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](91, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](93, 0, null, 0, 2, "mat-button-toggle", [
                    ["class", "coupon-toggle mat-button-toggle"],
                    ["id", "collapseCouponButton"],
                    ["style", "margin-right:10px;margin-left:10px"]
                ], [
                    [2, "mat-button-toggle-standalone", null],
                    [2, "mat-button-toggle-checked", null],
                    [2, "mat-button-toggle-disabled", null],
                    [2, "mat-button-toggle-appearance-standard", null],
                    [1, "tabindex", 0],
                    [1, "id", 0]
                ], [
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 94).focus() && u), "change" === n && (u = !1 !== o.toggleCoupon() && u), u
                }, zl.b, zl.a)), t["\u0275did"](94, 245760, null, 0, Zl.b, [
                    [2, Zl.c], t.ChangeDetectorRef, t.ElementRef, E.h, [8, null],
                    [2, Zl.a]
                ], {
                    id: [0, "id"],
                    checked: [1, "checked"]
                }, {
                    change: "change"
                }), (l()(), t["\u0275eld"](95, 0, null, 0, 0, "i", [
                    ["class", "fas fa-gift fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](96, 0, null, 0, 2, "mat-button-toggle", [
                    ["class", "payment-toggle mat-button-toggle"],
                    ["id", "paymentCouponButton"]
                ], [
                    [2, "mat-button-toggle-standalone", null],
                    [2, "mat-button-toggle-checked", null],
                    [2, "mat-button-toggle-disabled", null],
                    [2, "mat-button-toggle-appearance-standard", null],
                    [1, "tabindex", 0],
                    [1, "id", 0]
                ], [
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 97).focus() && u), "change" === n && (u = !1 !== o.togglePayment() && u), u
                }, zl.b, zl.a)), t["\u0275did"](97, 245760, null, 0, Zl.b, [
                    [2, Zl.c], t.ChangeDetectorRef, t.ElementRef, E.h, [8, null],
                    [2, Zl.a]
                ], {
                    id: [0, "id"],
                    checked: [1, "checked"]
                }, {
                    change: "change"
                }), (l()(), t["\u0275eld"](98, 0, null, 0, 0, "i", [
                    ["class", "fas fa-credit-card fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](99, 16777216, null, null, 35, "mat-expansion-panel", [
                    ["class", "mat-expansion-panel"]
                ], [
                    [2, "mat-expanded", null],
                    [2, "_mat-animation-noopable", null],
                    [2, "mat-expansion-panel-spacing", null]
                ], null, null, $l.d, $l.a)), t["\u0275did"](100, 1753088, null, 1, Yl.c, [
                    [3, Yl.a], t.ChangeDetectorRef, Ql.d, t.ViewContainerRef, _.DOCUMENT, [2, k.a]
                ], {
                    expanded: [0, "expanded"]
                }, null), t["\u0275qud"](335544320, 20, {
                    _lazyContent: 0
                }), t["\u0275prd"](256, null, Yl.a, void 0, []), (l()(), t["\u0275and"](16777216, null, 1, 1, null, gn)), t["\u0275did"](104, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 1, 1, null, bn)), t["\u0275did"](106, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](107, 0, null, 1, 22, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](108, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 21, {
                    _control: 0
                }), t["\u0275qud"](335544320, 22, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 23, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 24, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 25, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 26, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 27, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](116, 0, null, 1, 3, "label", [], null, null, null, null, null)), (l()(), t["\u0275eld"](117, 0, null, null, 2, "small", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), t["\u0275pod"](118, {
                    twitter: 0,
                    facebook: 1
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](120, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "coupon"],
                    ["matInput", ""],
                    ["style", "margin-top:10px;"],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 121)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 121).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 121)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 121)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 126)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 126)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 126)._onInput() && u), u
                }, null, null)), t["\u0275did"](121, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](123, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](125, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](126, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    type: [1, "type"]
                }, null), t["\u0275prd"](2048, [
                    [21, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, _n)), t["\u0275did"](129, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](130, 0, null, 1, 4, "button", [
                    ["color", "accent"],
                    ["id", "applyCouponButton"],
                    ["mat-raised-button", ""],
                    ["style", "margin-top:5px;"],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.applyCoupon() && t), t
                }, R.b, R.a)), t["\u0275did"](131, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](132, 0, null, 0, 0, "i", [
                    ["class", "far fa-gem fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](133, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](135, 16777216, null, null, 79, "mat-expansion-panel", [
                    ["class", "mat-expansion-panel"]
                ], [
                    [2, "mat-expanded", null],
                    [2, "_mat-animation-noopable", null],
                    [2, "mat-expansion-panel-spacing", null]
                ], null, null, $l.d, $l.a)), t["\u0275did"](136, 1753088, null, 1, Yl.c, [
                    [3, Yl.a], t.ChangeDetectorRef, Ql.d, t.ViewContainerRef, _.DOCUMENT, [2, k.a]
                ], {
                    expanded: [0, "expanded"]
                }, null), t["\u0275qud"](335544320, 28, {
                    _lazyContent: 0
                }), t["\u0275prd"](256, null, Yl.a, void 0, []), (l()(), t["\u0275eld"](139, 0, null, 1, 11, "div", [
                    ["class", "payment-label"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](140, 0, null, null, 2, "label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](141, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PAYMENT"])), (l()(), t["\u0275eld"](143, 0, null, null, 7, "small", [
                    ["style", "margin-left: 10px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" ("])), (l()(), t["\u0275and"](16777216, null, null, 1, null, Cn)), t["\u0275did"](146, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Rn)), t["\u0275did"](148, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](149, 0, null, null, 0, "i", [
                    ["class", "fas fa-heart"],
                    ["style", "margin-left: 3px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [") "])), (l()(), t["\u0275eld"](151, 0, null, 1, 35, "div", [
                    ["class", "button-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](152, 0, null, null, 14, "form", [
                    ["action", "https://www.paypal.com/cgi-bin/webscr"],
                    ["method", "post"],
                    ["ngNoForm", ""],
                    ["style", "display: inline-block;"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](153, 0, null, null, 13, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](154, 0, null, null, 0, "input", [
                    ["name", "cmd"],
                    ["type", "hidden"],
                    ["value", "_donations"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](155, 0, null, null, 0, "input", [
                    ["name", "business"],
                    ["type", "hidden"],
                    ["value", "paypal@owasp.org"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](156, 0, null, null, 0, "input", [
                    ["name", "lc"],
                    ["type", "hidden"],
                    ["value", "BM"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](157, 0, null, null, 0, "input", [
                    ["name", "item_name"],
                    ["type", "hidden"],
                    ["value", "OWASP Juice Shop Project"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](158, 0, null, null, 0, "input", [
                    ["name", "item_number"],
                    ["type", "hidden"],
                    ["value", "OWASP Foundation"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](159, 0, null, null, 0, "input", [
                    ["name", "no_note"],
                    ["type", "hidden"],
                    ["value", "0"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](160, 0, null, null, 0, "input", [
                    ["name", "currency_code"],
                    ["type", "hidden"],
                    ["value", "EUR"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](161, 0, null, null, 0, "input", [
                    ["name", "bn"],
                    ["type", "hidden"],
                    ["value", "PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](162, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""],
                    ["name", "submit"],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](163, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](164, 0, null, 0, 0, "i", [
                    ["class", "fab fa-paypal fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" PayPal"])), (l()(), t["\u0275eld"](166, 0, null, null, 0, "img", [
                    ["alt", ""],
                    ["border", "0"],
                    ["height", "1"],
                    ["src", "https://www.paypalobjects.com/en_US/i/scr/pixel.gif"],
                    ["style", "display: none !important;"],
                    ["width", "1"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](167, 0, null, null, 4, "a", [
                    ["href", "https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part3/donations.html#credit-card-donation-step-by-step"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](168, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](169, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](170, 0, null, 0, 0, "i", [
                    ["class", "far fa-credit-card fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Credit Card"])), (l()(), t["\u0275and"](16777216, null, null, 1, null, yn)), t["\u0275did"](173, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](174, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showBitcoinQrCode() && t), t
                }, R.b, R.a)), t["\u0275did"](175, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](176, 0, null, 0, 0, "i", [
                    ["class", "fab fa-btc fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Bitcoin"])), (l()(), t["\u0275eld"](178, 0, null, null, 4, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showDashQrCode() && t), t
                }, R.b, R.a)), t["\u0275did"](179, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](180, 0, null, 0, 1, "i", [
                    ["class", "fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, ["\xd0"])), (l()(), t["\u0275ted"](-1, 0, [" Dash"])), (l()(), t["\u0275eld"](183, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showEtherQrCode() && t), t
                }, R.b, R.a)), t["\u0275did"](184, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](185, 0, null, 0, 0, "i", [
                    ["class", "fab fa-ethereum fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Ether"])), (l()(), t["\u0275eld"](187, 0, null, 1, 11, "div", [
                    ["class", "payment-label"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](188, 0, null, null, 2, "label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](189, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_MERCHANDISE"])), (l()(), t["\u0275eld"](191, 0, null, null, 7, "small", [
                    ["style", "margin-left: 10px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" ("])), (l()(), t["\u0275and"](16777216, null, null, 1, null, wn)), t["\u0275did"](194, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, En)), t["\u0275did"](196, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](197, 0, null, null, 0, "i", [
                    ["class", "fas fa-thumbs-up"],
                    ["style", "margin-left: 3px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [") "])), (l()(), t["\u0275eld"](199, 0, null, 1, 15, "div", [
                    ["class", "button-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](200, 0, null, null, 4, "a", [
                    ["href", "/redirect?to=http://shop.spreadshirt.com/juiceshop"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](201, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](202, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](203, 0, null, 0, 0, "i", [
                    ["class", "fas fa-tshirt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Spreadshirt.com"])), (l()(), t["\u0275eld"](205, 0, null, null, 4, "a", [
                    ["href", "/redirect?to=http://shop.spreadshirt.de/juiceshop"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](206, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](207, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](208, 0, null, 0, 0, "i", [
                    ["class", "fas fa-tshirt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" Spreadshirt.de"])), (l()(), t["\u0275eld"](210, 0, null, null, 4, "a", [
                    ["href", "/redirect?to=https://www.stickeryou.com/products/owasp-juice-shop/794"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](211, 0, null, null, 3, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](212, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](213, 0, null, 0, 0, "i", [
                    ["class", "fas fa-sticky-note fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" StickerYou.com"]))], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 10, 0, e.dataSource), l(n, 17, 0, "product"), l(n, 30, 0, "price"), l(n, 43, 0, "quantity"), l(n, 56, 0, "total price"), l(n, 69, 0, "remove"), l(n, 81, 0, e.displayedColumns), l(n, 84, 0, e.displayedColumns), l(n, 89, 0, !e.dataSource || e.dataSource.length < 1, "primary"), l(n, 94, 0, "collapseCouponButton", e.couponPanelExpanded), l(n, 97, 0, "paymentCouponButton", e.paymentPanelExpanded), l(n, 100, 0, e.couponPanelExpanded), l(n, 104, 0, e.confirmation && !e.couponControl.dirty), l(n, 106, 0, e.error && !e.couponControl.dirty), l(n, 123, 0, e.couponControl), l(n, 126, 0, "coupon", "text"), l(n, 129, 0, e.couponControl.invalid && (e.couponControl.errors.minlength || e.couponControl.errors.maxlength)), l(n, 131, 0, e.couponControl.invalid, "accent"), l(n, 136, 0, e.paymentPanelExpanded), l(n, 141, 0, ""), l(n, 146, 0, "OWASP Juice Shop" === e.applicationName), l(n, 148, 0, "OWASP Juice Shop" !== e.applicationName), l(n, 173, 0, !1), l(n, 189, 0, ""), l(n, 194, 0, "OWASP Juice Shop" === e.applicationName), l(n, 196, 0, "OWASP Juice Shop" !== e.applicationName)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 5, 0, t["\u0275unv"](n, 5, 0, t["\u0275nov"](n, 6).transform("TITLE_BASKET"))), l(n, 8, 0, e.userEmail), l(n, 88, 0, t["\u0275nov"](n, 89).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 89)._animationMode), l(n, 91, 0, t["\u0275unv"](n, 91, 0, t["\u0275nov"](n, 92).transform("BTN_CHECKOUT"))), l(n, 93, 0, !t["\u0275nov"](n, 94).buttonToggleGroup, t["\u0275nov"](n, 94).checked, t["\u0275nov"](n, 94).disabled, "standard" === t["\u0275nov"](n, 94).appearance, -1, t["\u0275nov"](n, 94).id), l(n, 96, 0, !t["\u0275nov"](n, 97).buttonToggleGroup, t["\u0275nov"](n, 97).checked, t["\u0275nov"](n, 97).disabled, "standard" === t["\u0275nov"](n, 97).appearance, -1, t["\u0275nov"](n, 97).id), l(n, 99, 0, t["\u0275nov"](n, 100).expanded, "NoopAnimations" === t["\u0275nov"](n, 100)._animationMode, t["\u0275nov"](n, 100)._hasSpacing()), l(n, 107, 1, ["standard" == t["\u0275nov"](n, 108).appearance, "fill" == t["\u0275nov"](n, 108).appearance, "outline" == t["\u0275nov"](n, 108).appearance, "legacy" == t["\u0275nov"](n, 108).appearance, t["\u0275nov"](n, 108)._control.errorState, t["\u0275nov"](n, 108)._canLabelFloat, t["\u0275nov"](n, 108)._shouldLabelFloat(), t["\u0275nov"](n, 108)._hideControlPlaceholder(), t["\u0275nov"](n, 108)._control.disabled, t["\u0275nov"](n, 108)._control.autofilled, t["\u0275nov"](n, 108)._control.focused, "accent" == t["\u0275nov"](n, 108).color, "warn" == t["\u0275nov"](n, 108).color, t["\u0275nov"](n, 108)._shouldForward("untouched"), t["\u0275nov"](n, 108)._shouldForward("touched"), t["\u0275nov"](n, 108)._shouldForward("pristine"), t["\u0275nov"](n, 108)._shouldForward("dirty"), t["\u0275nov"](n, 108)._shouldForward("valid"), t["\u0275nov"](n, 108)._shouldForward("invalid"), t["\u0275nov"](n, 108)._shouldForward("pending"), !t["\u0275nov"](n, 108)._animationsEnabled]);
                    var u = t["\u0275unv"](n, 117, 0, t["\u0275nov"](n, 119).transform("FOLLOW_FOR_MONTHLY_COUPONS", l(n, 118, 0, e.twitterUrl, e.facebookUrl)));
                    l(n, 117, 0, u), l(n, 120, 1, [t["\u0275nov"](n, 125).ngClassUntouched, t["\u0275nov"](n, 125).ngClassTouched, t["\u0275nov"](n, 125).ngClassPristine, t["\u0275nov"](n, 125).ngClassDirty, t["\u0275nov"](n, 125).ngClassValid, t["\u0275nov"](n, 125).ngClassInvalid, t["\u0275nov"](n, 125).ngClassPending, t["\u0275nov"](n, 126)._isServer, t["\u0275nov"](n, 126).id, t["\u0275nov"](n, 126).placeholder, t["\u0275nov"](n, 126).disabled, t["\u0275nov"](n, 126).required, t["\u0275nov"](n, 126).readonly && !t["\u0275nov"](n, 126)._isNativeSelect || null, t["\u0275nov"](n, 126)._ariaDescribedby || null, t["\u0275nov"](n, 126).errorState, t["\u0275nov"](n, 126).required.toString()]), l(n, 130, 0, t["\u0275nov"](n, 131).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 131)._animationMode), l(n, 133, 0, t["\u0275unv"](n, 133, 0, t["\u0275nov"](n, 134).transform("BTN_REDEEM"))), l(n, 135, 0, t["\u0275nov"](n, 136).expanded, "NoopAnimations" === t["\u0275nov"](n, 136)._animationMode, t["\u0275nov"](n, 136)._hasSpacing()), l(n, 162, 0, t["\u0275nov"](n, 163).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 163)._animationMode), l(n, 168, 0, t["\u0275nov"](n, 169).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 169)._animationMode), l(n, 174, 0, t["\u0275nov"](n, 175).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 175)._animationMode), l(n, 178, 0, t["\u0275nov"](n, 179).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 179)._animationMode), l(n, 183, 0, t["\u0275nov"](n, 184).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 184)._animationMode), l(n, 201, 0, t["\u0275nov"](n, 202).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 202)._animationMode), l(n, 206, 0, t["\u0275nov"](n, 207).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 207)._animationMode), l(n, 211, 0, t["\u0275nov"](n, 212).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 212)._animationMode)
                })
            }

            function In(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-basket", [], null, null, null, kn, tn)), t["\u0275did"](1, 114688, null, 0, en, [V.e, nn, N, ln, d, C.k], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Sn = t["\u0275ccf"]("app-basket", en, In, {}, {}, []),
                Tn = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/rest/captcha"
                    }
                    return l.prototype.getCaptcha = function() {
                        return this.http.get(this.host + "/").pipe(Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.J, P.A), q.a.watch();
            var Dn = function() {
                    function l(l, n, e) {
                        this.userService = l, this.captchaService = n, this.feedbackService = e, this.authorControl = new T.e({
                            value: "",
                            disabled: !0
                        }, []), this.feedbackControl = new T.e("", [T.o.required, T.o.maxLength(160)]), this.captchaControl = new T.e("", [T.o.required]), this.userIdControl = new T.e("", []), this.rating = 0, this.feedback = void 0
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.userService.whoAmI().subscribe(function(n) {
                            l.feedback = {}, l.userIdControl.setValue(n.id), l.feedback.UserId = n.id, l.authorControl.setValue(n.email || "anonymous")
                        }, function(n) {
                            l.feedback = void 0, console.log(n)
                        }), this.getNewCaptcha()
                    }, l.prototype.getNewCaptcha = function() {
                        var l = this;
                        this.captchaService.getCaptcha().subscribe(function(n) {
                            l.captcha = n.captcha, l.captchaId = n.captchaId
                        }, function(l) {
                            return l
                        })
                    }, l.prototype.save = function() {
                        var l = this;
                        this.feedback.captchaId = this.captchaId, this.feedback.captcha = this.captchaControl.value, this.feedback.comment = this.feedbackControl.value, this.feedback.rating = this.rating, this.feedback.UserId = this.userIdControl.value, this.feedbackService.save(this.feedback).subscribe(function(n) {
                            l.error = null, l.confirmation = "Thank you for your feedback" + (5 === n.rating ? " and your 5-star rating!" : "."), l.feedback = {}, l.ngOnInit(), l.resetForm()
                        }, function(n) {
                            l.error = n.error, l.confirmation = null, l.feedback = {}, l.resetForm()
                        })
                    }, l.prototype.resetForm = function() {
                        this.authorControl.markAsUntouched(), this.authorControl.markAsPristine(), this.authorControl.setValue(""), this.feedbackControl.markAsUntouched(), this.feedbackControl.markAsPristine(), this.feedbackControl.setValue(""), this.captchaControl.markAsUntouched(), this.captchaControl.markAsPristine(), this.captchaControl.setValue("")
                    }, l
                }(),
                xn = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}.rating-container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.star[_ngcontent-%COMP%]{color:#c8c8c8}.active[_ngcontent-%COMP%], .select[_ngcontent-%COMP%]{color:gold}"]
                    ],
                    data: {}
                });

            function Ln(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 1, "p", [
                    ["class", "confirmation"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](2, null, ["", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.component.confirmation)
                })
            }

            function An(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 1, "p", [
                    ["class", "error"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](2, null, ["", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.component.error)
                })
            }

            function On(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_COMMENT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Nn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_CAPTCHA"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function qn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 102, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 100, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_CONTACT"])), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Ln)), t["\u0275did"](8, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, An)), t["\u0275did"](10, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](11, 0, null, 0, 86, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](12, 0, null, null, 5, "input", [
                    ["hidden", ""],
                    ["id", "userId"],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 13)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 13).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 13)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 13)._compositionEnd(e.target.value) && u), u
                }, null, null)), t["\u0275did"](13, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](15, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](17, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), (l()(), t["\u0275eld"](18, 0, null, null, 20, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](19, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](27, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](28, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](29, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_AUTHOR"])), (l()(), t["\u0275eld"](31, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 32)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 32).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 32)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 32)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 37)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 37)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 37)._onInput() && u), u
                }, null, null)), t["\u0275did"](32, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](34, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](36, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](37, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](39, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](40, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](48, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](49, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](50, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_COMMENT"])), (l()(), t["\u0275eld"](52, 0, null, 1, 7, "textarea", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "comment"],
                    ["matInput", ""]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 53)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 53).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 53)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 53)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 58)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 58)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 58)._onInput() && u), u
                }, null, null)), t["\u0275did"](53, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](55, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](57, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](58, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"]
                }, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, On)), t["\u0275did"](61, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](62, 0, null, null, 7, "div", [
                    ["class", "rating-container"],
                    ["style", "margin-top:5px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](63, 0, null, null, 2, "label", [
                    ["style", "font-weight:bold; margin-right: 8px;"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](64, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_RATING"])), (l()(), t["\u0275eld"](66, 0, null, null, 3, "bar-rating", [], null, [
                    [null, "rateChange"]
                ], function(l, n, e) {
                    var t = !0;
                    return "rateChange" === n && (t = !1 !== (l.component.rating = e) && t), t
                }, S.b, S.a)), t["\u0275prd"](5120, null, T.j, function(l) {
                    return [l]
                }, [D.a]), t["\u0275prd"](5120, null, T.i, function(l) {
                    return [l]
                }, [D.a]), t["\u0275did"](69, 638976, null, 0, D.a, [t.ChangeDetectorRef], {
                    rate: [0, "rate"],
                    max: [1, "max"]
                }, {
                    rateChange: "rateChange"
                }), (l()(), t["\u0275eld"](70, 0, null, null, 27, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](71, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 15, {
                    _control: 0
                }), t["\u0275qud"](335544320, 16, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 17, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 18, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 19, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](79, 0, null, 1, 2, "label", [
                    ["style", "font-weight:bold;"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](80, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_CAPTCHA"])), (l()(), t["\u0275ted"](-1, 1, ["\xa0 "])), (l()(), t["\u0275eld"](83, 0, null, 1, 1, "code", [
                    ["id", "captcha"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](84, null, ["", ""])), (l()(), t["\u0275ted"](-1, 1, ["\xa0"])), (l()(), t["\u0275eld"](86, 0, null, 1, 1, "label", [], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, ["?"])), (l()(), t["\u0275eld"](88, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "captchaControl"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 89)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 89).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 89)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 89)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 94)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 94)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 94)._onInput() && u), u
                }, null, null)), t["\u0275did"](89, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](91, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](93, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](94, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    type: [1, "type"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Nn)), t["\u0275did"](97, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](98, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["id", "submitButton"],
                    ["mat-raised-button", ""],
                    ["style", "margin-top:5px;"],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.save() && t), t
                }, R.b, R.a)), t["\u0275did"](99, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](100, 0, null, 0, 0, "i", [
                    ["class", "fas fa-paper-plane fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](101, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 5, 0, ""), l(n, 8, 0, e.confirmation), l(n, 10, 0, e.error), l(n, 15, 0, e.userIdControl), l(n, 19, 0, "outline"), l(n, 28, 0, ""), l(n, 34, 0, e.authorControl), l(n, 37, 0, "text"), l(n, 40, 0, "outline"), l(n, 49, 0, ""), l(n, 55, 0, e.feedbackControl), l(n, 58, 0, "comment"), l(n, 61, 0, e.feedbackControl.invalid && e.feedbackControl.errors.required), l(n, 64, 0, ""), l(n, 69, 0, e.rating, 5), l(n, 80, 0, ""), l(n, 91, 0, e.captchaControl), l(n, 94, 0, "captchaControl", "text"), l(n, 97, 0, e.captchaControl.invalid && e.captchaControl.errors.required), l(n, 99, 0, e.authorControl.invalid || e.feedbackControl.invalid || e.captchaControl.invalid || !e.rating, "primary")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 12, 0, t["\u0275nov"](n, 17).ngClassUntouched, t["\u0275nov"](n, 17).ngClassTouched, t["\u0275nov"](n, 17).ngClassPristine, t["\u0275nov"](n, 17).ngClassDirty, t["\u0275nov"](n, 17).ngClassValid, t["\u0275nov"](n, 17).ngClassInvalid, t["\u0275nov"](n, 17).ngClassPending), l(n, 18, 1, ["standard" == t["\u0275nov"](n, 19).appearance, "fill" == t["\u0275nov"](n, 19).appearance, "outline" == t["\u0275nov"](n, 19).appearance, "legacy" == t["\u0275nov"](n, 19).appearance, t["\u0275nov"](n, 19)._control.errorState, t["\u0275nov"](n, 19)._canLabelFloat, t["\u0275nov"](n, 19)._shouldLabelFloat(), t["\u0275nov"](n, 19)._hideControlPlaceholder(), t["\u0275nov"](n, 19)._control.disabled, t["\u0275nov"](n, 19)._control.autofilled, t["\u0275nov"](n, 19)._control.focused, "accent" == t["\u0275nov"](n, 19).color, "warn" == t["\u0275nov"](n, 19).color, t["\u0275nov"](n, 19)._shouldForward("untouched"), t["\u0275nov"](n, 19)._shouldForward("touched"), t["\u0275nov"](n, 19)._shouldForward("pristine"), t["\u0275nov"](n, 19)._shouldForward("dirty"), t["\u0275nov"](n, 19)._shouldForward("valid"), t["\u0275nov"](n, 19)._shouldForward("invalid"), t["\u0275nov"](n, 19)._shouldForward("pending"), !t["\u0275nov"](n, 19)._animationsEnabled]), l(n, 31, 1, [t["\u0275nov"](n, 36).ngClassUntouched, t["\u0275nov"](n, 36).ngClassTouched, t["\u0275nov"](n, 36).ngClassPristine, t["\u0275nov"](n, 36).ngClassDirty, t["\u0275nov"](n, 36).ngClassValid, t["\u0275nov"](n, 36).ngClassInvalid, t["\u0275nov"](n, 36).ngClassPending, t["\u0275nov"](n, 37)._isServer, t["\u0275nov"](n, 37).id, t["\u0275nov"](n, 37).placeholder, t["\u0275nov"](n, 37).disabled, t["\u0275nov"](n, 37).required, t["\u0275nov"](n, 37).readonly && !t["\u0275nov"](n, 37)._isNativeSelect || null, t["\u0275nov"](n, 37)._ariaDescribedby || null, t["\u0275nov"](n, 37).errorState, t["\u0275nov"](n, 37).required.toString()]), l(n, 39, 1, ["standard" == t["\u0275nov"](n, 40).appearance, "fill" == t["\u0275nov"](n, 40).appearance, "outline" == t["\u0275nov"](n, 40).appearance, "legacy" == t["\u0275nov"](n, 40).appearance, t["\u0275nov"](n, 40)._control.errorState, t["\u0275nov"](n, 40)._canLabelFloat, t["\u0275nov"](n, 40)._shouldLabelFloat(), t["\u0275nov"](n, 40)._hideControlPlaceholder(), t["\u0275nov"](n, 40)._control.disabled, t["\u0275nov"](n, 40)._control.autofilled, t["\u0275nov"](n, 40)._control.focused, "accent" == t["\u0275nov"](n, 40).color, "warn" == t["\u0275nov"](n, 40).color, t["\u0275nov"](n, 40)._shouldForward("untouched"), t["\u0275nov"](n, 40)._shouldForward("touched"), t["\u0275nov"](n, 40)._shouldForward("pristine"), t["\u0275nov"](n, 40)._shouldForward("dirty"), t["\u0275nov"](n, 40)._shouldForward("valid"), t["\u0275nov"](n, 40)._shouldForward("invalid"), t["\u0275nov"](n, 40)._shouldForward("pending"), !t["\u0275nov"](n, 40)._animationsEnabled]), l(n, 52, 1, [t["\u0275nov"](n, 57).ngClassUntouched, t["\u0275nov"](n, 57).ngClassTouched, t["\u0275nov"](n, 57).ngClassPristine, t["\u0275nov"](n, 57).ngClassDirty, t["\u0275nov"](n, 57).ngClassValid, t["\u0275nov"](n, 57).ngClassInvalid, t["\u0275nov"](n, 57).ngClassPending, t["\u0275nov"](n, 58)._isServer, t["\u0275nov"](n, 58).id, t["\u0275nov"](n, 58).placeholder, t["\u0275nov"](n, 58).disabled, t["\u0275nov"](n, 58).required, t["\u0275nov"](n, 58).readonly && !t["\u0275nov"](n, 58)._isNativeSelect || null, t["\u0275nov"](n, 58)._ariaDescribedby || null, t["\u0275nov"](n, 58).errorState, t["\u0275nov"](n, 58).required.toString()]), l(n, 70, 1, ["standard" == t["\u0275nov"](n, 71).appearance, "fill" == t["\u0275nov"](n, 71).appearance, "outline" == t["\u0275nov"](n, 71).appearance, "legacy" == t["\u0275nov"](n, 71).appearance, t["\u0275nov"](n, 71)._control.errorState, t["\u0275nov"](n, 71)._canLabelFloat, t["\u0275nov"](n, 71)._shouldLabelFloat(), t["\u0275nov"](n, 71)._hideControlPlaceholder(), t["\u0275nov"](n, 71)._control.disabled, t["\u0275nov"](n, 71)._control.autofilled, t["\u0275nov"](n, 71)._control.focused, "accent" == t["\u0275nov"](n, 71).color, "warn" == t["\u0275nov"](n, 71).color, t["\u0275nov"](n, 71)._shouldForward("untouched"), t["\u0275nov"](n, 71)._shouldForward("touched"), t["\u0275nov"](n, 71)._shouldForward("pristine"), t["\u0275nov"](n, 71)._shouldForward("dirty"), t["\u0275nov"](n, 71)._shouldForward("valid"), t["\u0275nov"](n, 71)._shouldForward("invalid"), t["\u0275nov"](n, 71)._shouldForward("pending"), !t["\u0275nov"](n, 71)._animationsEnabled]), l(n, 84, 0, e.captcha), l(n, 88, 1, [t["\u0275nov"](n, 93).ngClassUntouched, t["\u0275nov"](n, 93).ngClassTouched, t["\u0275nov"](n, 93).ngClassPristine, t["\u0275nov"](n, 93).ngClassDirty, t["\u0275nov"](n, 93).ngClassValid, t["\u0275nov"](n, 93).ngClassInvalid, t["\u0275nov"](n, 93).ngClassPending, t["\u0275nov"](n, 94)._isServer, t["\u0275nov"](n, 94).id, t["\u0275nov"](n, 94).placeholder, t["\u0275nov"](n, 94).disabled, t["\u0275nov"](n, 94).required, t["\u0275nov"](n, 94).readonly && !t["\u0275nov"](n, 94)._isNativeSelect || null, t["\u0275nov"](n, 94)._ariaDescribedby || null, t["\u0275nov"](n, 94).errorState, t["\u0275nov"](n, 94).required.toString()]), l(n, 98, 0, t["\u0275nov"](n, 99).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 99)._animationMode), l(n, 101, 0, t["\u0275unv"](n, 101, 0, t["\u0275nov"](n, 102).transform("BTN_SUBMIT")))
                })
            }

            function Pn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-contact", [], null, null, null, qn, xn)), t["\u0275did"](1, 114688, null, 0, Dn, [N, Tn, F], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Mn = t["\u0275ccf"]("app-contact", Dn, Pn, {}, {}, []);
            q.b.add(P.D), q.a.watch();
            var Fn = function() {
                    function l(l) {
                        this.userService = l, this.passwordControl = new T.e("", [T.o.required]), this.newPasswordControl = new T.e("", [T.o.required, T.o.minLength(5), T.o.maxLength(20)]), this.repeatNewPasswordControl = new T.e("", [T.o.required])
                    }
                    return l.prototype.changePassword = function() {
                        var l = this;
                        this.userService.changePassword({
                            current: this.passwordControl.value,
                            new: this.newPasswordControl.value,
                            repeat: this.repeatNewPasswordControl.value
                        }).subscribe(function(n) {
                            l.error = void 0, l.confirmation = "Your password was successfully changed.", l.resetForm()
                        }, function(n) {
                            console.log(n), l.error = n, l.confirmation = void 0, l.resetForm()
                        })
                    }, l.prototype.resetForm = function() {
                        this.passwordControl.setValue(""), this.passwordControl.markAsPristine(), this.passwordControl.markAsUntouched(), this.newPasswordControl.setValue(""), this.newPasswordControl.markAsPristine(), this.newPasswordControl.markAsUntouched(), this.repeatNewPasswordControl.setValue(""), this.repeatNewPasswordControl.markAsPristine(), this.repeatNewPasswordControl.markAsUntouched()
                    }, l
                }(),
                jn = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}button[_ngcontent-%COMP%]{margin-top:5px}"]
                    ],
                    data: {}
                });

            function Un(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_CURRENT_PASSWORD"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Vn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_NEW_PASSWORD"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Bn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    length: 0
                }), t["\u0275did"](3, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_PASSWORD_LENGTH"]))], function(l, n) {
                    var e = l(n, 2, 0, "5-20");
                    l(n, 1, 0, "", e)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).id)
                })
            }

            function Hn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_PASSWORD_REPEAT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function zn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 87, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 85, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_CHANGE_PASSWORD"])), (l()(), t["\u0275eld"](7, 0, null, 0, 75, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 1, "div", [
                    ["class", "confirmation"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](9, null, ["", ""])), (l()(), t["\u0275eld"](10, 0, null, null, 1, "div", [
                    ["class", "error"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](11, null, ["", ""])), (l()(), t["\u0275eld"](12, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](13, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](21, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](22, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](23, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_CURRENT_PASSWORD"])), (l()(), t["\u0275eld"](25, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "currentPassword"],
                    ["matInput", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 26)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 26).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 26)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 26)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 31)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 31)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 31)._onInput() && u), u
                }, null, null)), t["\u0275did"](26, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](28, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](30, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](31, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    type: [1, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Un)), t["\u0275did"](34, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](35, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](36, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](44, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](45, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](46, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_NEW_PASSWORD"])), (l()(), t["\u0275eld"](48, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "newPassword"],
                    ["matInput", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 49)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 49).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 49)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 49)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 54)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 54)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 54)._onInput() && u), u
                }, null, null)), t["\u0275did"](49, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](51, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](53, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](54, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    type: [1, "type"]
                }, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Vn)), t["\u0275did"](57, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Bn)), t["\u0275did"](59, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](60, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](61, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 15, {
                    _control: 0
                }), t["\u0275qud"](335544320, 16, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 17, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 18, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 19, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](69, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](70, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](71, 16384, [
                    [17, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_REPEAT_NEW_PASSWORD"])), (l()(), t["\u0275eld"](73, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "newPasswordRepeat"],
                    ["matInput", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 74)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 74).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 74)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 74)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 79)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 79)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 79)._onInput() && u), u
                }, null, null)), t["\u0275did"](74, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](76, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](78, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](79, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    type: [1, "type"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Hn)), t["\u0275did"](82, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](83, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["id", "changeButton"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.changePassword() && t), t
                }, R.b, R.a)), t["\u0275did"](84, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](85, 0, null, 0, 0, "i", [
                    ["class", "fas fa-save fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](86, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 5, 0, ""), l(n, 13, 0, "outline"), l(n, 22, 0, ""), l(n, 28, 0, e.passwordControl), l(n, 31, 0, "currentPassword", "password"), l(n, 34, 0, e.passwordControl.invalid), l(n, 36, 0, "outline"), l(n, 45, 0, ""), l(n, 51, 0, e.newPasswordControl), l(n, 54, 0, "newPassword", "password"), l(n, 57, 0, (null == e.newPasswordControl ? null : e.newPasswordControl.invalid) && (null == e.newPasswordControl ? null : e.newPasswordControl.errors.required)), l(n, 59, 0, (null == e.newPasswordControl ? null : e.newPasswordControl.invalid) && ((null == e.newPasswordControl ? null : e.newPasswordControl.errors.minlength) || (null == e.newPasswordControl ? null : e.newPasswordControl.errors.maxlength))), l(n, 61, 0, "outline"), l(n, 70, 0, ""), l(n, 76, 0, e.repeatNewPasswordControl), l(n, 79, 0, "newPasswordRepeat", "password"), l(n, 82, 0, e.repeatNewPasswordControl.invalid), l(n, 84, 0, e.passwordControl.invalid || e.newPasswordControl.invalid || e.repeatNewPasswordControl.invalid, "primary")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 8, 0, !(e.confirmation && !e.passwordControl.dirty && !e.newPasswordControl.dirty && !e.repeatNewPasswordControl.dirty)), l(n, 9, 0, e.confirmation), l(n, 10, 0, !(e.error && !e.passwordControl.dirty && !e.newPasswordControl.dirty && !e.repeatNewPasswordControl.dirty)), l(n, 11, 0, e.error), l(n, 12, 1, ["standard" == t["\u0275nov"](n, 13).appearance, "fill" == t["\u0275nov"](n, 13).appearance, "outline" == t["\u0275nov"](n, 13).appearance, "legacy" == t["\u0275nov"](n, 13).appearance, t["\u0275nov"](n, 13)._control.errorState, t["\u0275nov"](n, 13)._canLabelFloat, t["\u0275nov"](n, 13)._shouldLabelFloat(), t["\u0275nov"](n, 13)._hideControlPlaceholder(), t["\u0275nov"](n, 13)._control.disabled, t["\u0275nov"](n, 13)._control.autofilled, t["\u0275nov"](n, 13)._control.focused, "accent" == t["\u0275nov"](n, 13).color, "warn" == t["\u0275nov"](n, 13).color, t["\u0275nov"](n, 13)._shouldForward("untouched"), t["\u0275nov"](n, 13)._shouldForward("touched"), t["\u0275nov"](n, 13)._shouldForward("pristine"), t["\u0275nov"](n, 13)._shouldForward("dirty"), t["\u0275nov"](n, 13)._shouldForward("valid"), t["\u0275nov"](n, 13)._shouldForward("invalid"), t["\u0275nov"](n, 13)._shouldForward("pending"), !t["\u0275nov"](n, 13)._animationsEnabled]), l(n, 25, 1, [t["\u0275nov"](n, 30).ngClassUntouched, t["\u0275nov"](n, 30).ngClassTouched, t["\u0275nov"](n, 30).ngClassPristine, t["\u0275nov"](n, 30).ngClassDirty, t["\u0275nov"](n, 30).ngClassValid, t["\u0275nov"](n, 30).ngClassInvalid, t["\u0275nov"](n, 30).ngClassPending, t["\u0275nov"](n, 31)._isServer, t["\u0275nov"](n, 31).id, t["\u0275nov"](n, 31).placeholder, t["\u0275nov"](n, 31).disabled, t["\u0275nov"](n, 31).required, t["\u0275nov"](n, 31).readonly && !t["\u0275nov"](n, 31)._isNativeSelect || null, t["\u0275nov"](n, 31)._ariaDescribedby || null, t["\u0275nov"](n, 31).errorState, t["\u0275nov"](n, 31).required.toString()]), l(n, 35, 1, ["standard" == t["\u0275nov"](n, 36).appearance, "fill" == t["\u0275nov"](n, 36).appearance, "outline" == t["\u0275nov"](n, 36).appearance, "legacy" == t["\u0275nov"](n, 36).appearance, t["\u0275nov"](n, 36)._control.errorState, t["\u0275nov"](n, 36)._canLabelFloat, t["\u0275nov"](n, 36)._shouldLabelFloat(), t["\u0275nov"](n, 36)._hideControlPlaceholder(), t["\u0275nov"](n, 36)._control.disabled, t["\u0275nov"](n, 36)._control.autofilled, t["\u0275nov"](n, 36)._control.focused, "accent" == t["\u0275nov"](n, 36).color, "warn" == t["\u0275nov"](n, 36).color, t["\u0275nov"](n, 36)._shouldForward("untouched"), t["\u0275nov"](n, 36)._shouldForward("touched"), t["\u0275nov"](n, 36)._shouldForward("pristine"), t["\u0275nov"](n, 36)._shouldForward("dirty"), t["\u0275nov"](n, 36)._shouldForward("valid"), t["\u0275nov"](n, 36)._shouldForward("invalid"), t["\u0275nov"](n, 36)._shouldForward("pending"), !t["\u0275nov"](n, 36)._animationsEnabled]), l(n, 48, 1, [t["\u0275nov"](n, 53).ngClassUntouched, t["\u0275nov"](n, 53).ngClassTouched, t["\u0275nov"](n, 53).ngClassPristine, t["\u0275nov"](n, 53).ngClassDirty, t["\u0275nov"](n, 53).ngClassValid, t["\u0275nov"](n, 53).ngClassInvalid, t["\u0275nov"](n, 53).ngClassPending, t["\u0275nov"](n, 54)._isServer, t["\u0275nov"](n, 54).id, t["\u0275nov"](n, 54).placeholder, t["\u0275nov"](n, 54).disabled, t["\u0275nov"](n, 54).required, t["\u0275nov"](n, 54).readonly && !t["\u0275nov"](n, 54)._isNativeSelect || null, t["\u0275nov"](n, 54)._ariaDescribedby || null, t["\u0275nov"](n, 54).errorState, t["\u0275nov"](n, 54).required.toString()]), l(n, 60, 1, ["standard" == t["\u0275nov"](n, 61).appearance, "fill" == t["\u0275nov"](n, 61).appearance, "outline" == t["\u0275nov"](n, 61).appearance, "legacy" == t["\u0275nov"](n, 61).appearance, t["\u0275nov"](n, 61)._control.errorState, t["\u0275nov"](n, 61)._canLabelFloat, t["\u0275nov"](n, 61)._shouldLabelFloat(), t["\u0275nov"](n, 61)._hideControlPlaceholder(), t["\u0275nov"](n, 61)._control.disabled, t["\u0275nov"](n, 61)._control.autofilled, t["\u0275nov"](n, 61)._control.focused, "accent" == t["\u0275nov"](n, 61).color, "warn" == t["\u0275nov"](n, 61).color, t["\u0275nov"](n, 61)._shouldForward("untouched"), t["\u0275nov"](n, 61)._shouldForward("touched"), t["\u0275nov"](n, 61)._shouldForward("pristine"), t["\u0275nov"](n, 61)._shouldForward("dirty"), t["\u0275nov"](n, 61)._shouldForward("valid"), t["\u0275nov"](n, 61)._shouldForward("invalid"), t["\u0275nov"](n, 61)._shouldForward("pending"), !t["\u0275nov"](n, 61)._animationsEnabled]), l(n, 73, 1, [t["\u0275nov"](n, 78).ngClassUntouched, t["\u0275nov"](n, 78).ngClassTouched, t["\u0275nov"](n, 78).ngClassPristine, t["\u0275nov"](n, 78).ngClassDirty, t["\u0275nov"](n, 78).ngClassValid, t["\u0275nov"](n, 78).ngClassInvalid, t["\u0275nov"](n, 78).ngClassPending, t["\u0275nov"](n, 79)._isServer, t["\u0275nov"](n, 79).id, t["\u0275nov"](n, 79).placeholder, t["\u0275nov"](n, 79).disabled, t["\u0275nov"](n, 79).required, t["\u0275nov"](n, 79).readonly && !t["\u0275nov"](n, 79)._isNativeSelect || null, t["\u0275nov"](n, 79)._ariaDescribedby || null, t["\u0275nov"](n, 79).errorState, t["\u0275nov"](n, 79).required.toString()]), l(n, 83, 0, t["\u0275nov"](n, 84).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 84)._animationMode), l(n, 86, 0, t["\u0275unv"](n, 86, 0, t["\u0275nov"](n, 87).transform("BTN_CHANGE")))
                })
            }

            function Zn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-change-password", [], null, null, null, zn, jn)), t["\u0275did"](1, 49152, null, 0, Fn, [N], null, null)], null, null)
            }
            var $n = t["\u0275ccf"]("app-change-password", Fn, Zn, {}, {}, []),
                Yn = e("5xlC"),
                Qn = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Complaints"
                    }
                    return l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                Gn = e("YNBZ");
            q.b.add(P.c), q.a.watch();
            var Wn = function() {
                    function l(l, n) {
                        this.userService = l, this.complaintService = n, this.customerControl = new T.e({
                            value: "",
                            disabled: !0
                        }, []), this.messageControl = new T.e("", [T.o.required, T.o.maxLength(160)]), this.fileUploadError = void 0, this.uploader = new Gn.FileUploader({
                            url: u.hostServer + "/file-upload",
                            authToken: "Bearer " + localStorage.getItem("token"),
                            allowedMimeType: ["application/pdf", "application/xml", "text/xml", "application/zip"],
                            maxFileSize: 1e5
                        }), this.userEmail = void 0, this.complaint = void 0
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.initComplaint(), this.uploader.onWhenAddingFileFailed = function(n, e) {
                            throw l.fileUploadError = e, new Error("Error due to : " + e.name)
                        }, this.uploader.onAfterAddingFile = function() {
                            l.fileUploadError = void 0
                        }, this.uploader.onSuccessItem = function() {
                            l.saveComplaint(), l.uploader.clearQueue()
                        }
                    }, l.prototype.initComplaint = function() {
                        var l = this;
                        this.userService.whoAmI().subscribe(function(n) {
                            l.complaint = {}, l.complaint.UserId = n.id, l.userEmail = n.email, l.customerControl.setValue(l.userEmail)
                        }, function(n) {
                            l.complaint = void 0, console.log(n)
                        })
                    }, l.prototype.save = function() {
                        this.uploader.queue[0] ? (this.uploader.queue[0].upload(), this.fileControl.nativeElement.value = null) : this.saveComplaint()
                    }, l.prototype.saveComplaint = function() {
                        var l = this;
                        this.complaint.message = this.messageControl.value, this.complaintService.save(this.complaint).subscribe(function(n) {
                            l.confirmation = "Customer support will get in touch with you soon! Your complaint reference is #" + n.id, l.initComplaint(), l.resetForm(), l.fileUploadError = void 0
                        }, function(l) {
                            return l
                        })
                    }, l.prototype.resetForm = function() {
                        this.messageControl.setValue(""), this.messageControl.markAsUntouched(), this.messageControl.markAsPristine(), this.fileControl.nativeElement.value = null
                    }, l
                }(),
                Kn = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}button[_ngcontent-%COMP%]{margin-top:10px}"]
                    ],
                    data: {}
                });

            function Xn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "div", [
                    ["class", "error fileUploadError"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", ""])), t["\u0275pod"](2, {
                    type: 0
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], null, function(l, n) {
                    var e = t["\u0275unv"](n, 1, 0, t["\u0275nov"](n, 3).transform("INVALID_FILE_TYPE", l(n, 2, 0, "PDF")));
                    l(n, 1, 0, e)
                })
            }

            function Jn(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "div", [
                    ["class", "error fileUploadError"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", ""])), t["\u0275pod"](2, {
                    size: 0
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], null, function(l, n) {
                    var e = t["\u0275unv"](n, 1, 0, t["\u0275nov"](n, 3).transform("INVALID_FILE_SIZE", l(n, 2, 0, "100 KB")));
                    l(n, 1, 0, e)
                })
            }

            function le(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 16384, [
                    [12, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](2, null, ["", ""])), t["\u0275pod"](3, {
                    length: 0
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).id);
                    var e = t["\u0275unv"](n, 2, 0, t["\u0275nov"](n, 4).transform("INVALID_MESSAGE_LENGTH", l(n, 3, 0, "1-160")));
                    l(n, 2, 0, e)
                })
            }

            function ne(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 16384, [
                    [12, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](2, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).id), l(n, 2, 0, t["\u0275unv"](n, 2, 0, t["\u0275nov"](n, 3).transform("MANDATORY_MESSAGE")))
                })
            }

            function ee(l) {
                return t["\u0275vid"](0, [t["\u0275qud"](402653184, 1, {
                    fileControl: 0
                }), (l()(), t["\u0275eld"](1, 0, null, null, 69, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](2, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 67, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](4, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](5, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](6, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_COMPLAIN"])), (l()(), t["\u0275eld"](8, 0, null, 0, 57, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](9, 0, null, null, 1, "div", [
                    ["class", "confirmation"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](10, null, ["", ""])), (l()(), t["\u0275and"](16777216, null, null, 1, null, Xn)), t["\u0275did"](12, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Jn)), t["\u0275did"](14, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](15, 0, null, null, 20, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](16, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 2, {
                    _control: 0
                }), t["\u0275qud"](335544320, 3, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 4, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 5, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 8, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](24, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](25, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](26, 16384, [
                    [4, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_CUSTOMER"])), (l()(), t["\u0275eld"](28, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 29)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 29).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 29)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 29)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 34)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 34)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 34)._onInput() && u), u
                }, null, null)), t["\u0275did"](29, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](31, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](33, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](34, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [2, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](36, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](37, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 9, {
                    _control: 0
                }), t["\u0275qud"](335544320, 10, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 11, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 12, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 15, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](45, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](46, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](47, 16384, [
                    [11, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_MESSAGE"])), (l()(), t["\u0275eld"](49, 0, null, 1, 7, "textarea", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["cols", "30"],
                    ["id", "complaintMessage"],
                    ["matInput", ""],
                    ["rows", "10"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 50)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 50).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 50)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 50)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 55)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 55)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 55)._onInput() && u), u
                }, null, null)), t["\u0275did"](50, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](52, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](54, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](55, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"]
                }, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, le)), t["\u0275did"](58, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, ne)), t["\u0275did"](60, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](61, 0, null, null, 2, "label", [
                    ["for", "file"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](62, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_INVOICE"])), (l()(), t["\u0275eld"](64, 0, [
                    [1, 0],
                    ["fileControl", 1]
                ], null, 1, "input", [
                    ["accept", "application/pdf application/zip"],
                    ["id", "file"],
                    ["ng2FileSelect", ""],
                    ["type", "file"]
                ], null, [
                    [null, "change"]
                ], function(l, n, e) {
                    var u = !0;
                    return "change" === n && (u = !1 !== t["\u0275nov"](l, 65).onChange() && u), u
                }, null, null)), t["\u0275did"](65, 16384, null, 0, Yn.FileSelectDirective, [t.ElementRef], {
                    uploader: [0, "uploader"]
                }, null), (l()(), t["\u0275eld"](66, 0, null, 0, 4, "button", [
                    ["accept", ".pdf .zip"],
                    ["color", "primary"],
                    ["id", "submitButton"],
                    ["mat-raised-button", ""],
                    ["placeholder", "Upload file"],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.save() && t), t
                }, R.b, R.a)), t["\u0275did"](67, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](68, 0, null, 0, 0, "i", [
                    ["class", "fas fa-bomb fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](69, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, "center"), l(n, 6, 0, ""), l(n, 12, 0, e.fileUploadError && "mimeType" == e.fileUploadError.name), l(n, 14, 0, e.fileUploadError && "fileSize" == e.fileUploadError.name), l(n, 16, 0, "outline"), l(n, 25, 0, ""), l(n, 31, 0, e.customerControl), l(n, 34, 0, "text"), l(n, 37, 0, "outline"), l(n, 46, 0, ""), l(n, 52, 0, e.messageControl), l(n, 55, 0, "complaintMessage"), l(n, 58, 0, e.messageControl.invalid && (null == e.messageControl ? null : e.messageControl.errors.maxlength)), l(n, 60, 0, e.messageControl.invalid && (null == e.messageControl ? null : e.messageControl.errors.required)), l(n, 62, 0, ""), l(n, 65, 0, e.uploader), l(n, 67, 0, e.messageControl.invalid || e.fileUploadError, "primary")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 9, 0, !(e.confirmation && !e.messageControl.dirty)), l(n, 10, 0, e.confirmation), l(n, 15, 1, ["standard" == t["\u0275nov"](n, 16).appearance, "fill" == t["\u0275nov"](n, 16).appearance, "outline" == t["\u0275nov"](n, 16).appearance, "legacy" == t["\u0275nov"](n, 16).appearance, t["\u0275nov"](n, 16)._control.errorState, t["\u0275nov"](n, 16)._canLabelFloat, t["\u0275nov"](n, 16)._shouldLabelFloat(), t["\u0275nov"](n, 16)._hideControlPlaceholder(), t["\u0275nov"](n, 16)._control.disabled, t["\u0275nov"](n, 16)._control.autofilled, t["\u0275nov"](n, 16)._control.focused, "accent" == t["\u0275nov"](n, 16).color, "warn" == t["\u0275nov"](n, 16).color, t["\u0275nov"](n, 16)._shouldForward("untouched"), t["\u0275nov"](n, 16)._shouldForward("touched"), t["\u0275nov"](n, 16)._shouldForward("pristine"), t["\u0275nov"](n, 16)._shouldForward("dirty"), t["\u0275nov"](n, 16)._shouldForward("valid"), t["\u0275nov"](n, 16)._shouldForward("invalid"), t["\u0275nov"](n, 16)._shouldForward("pending"), !t["\u0275nov"](n, 16)._animationsEnabled]), l(n, 28, 1, [t["\u0275nov"](n, 33).ngClassUntouched, t["\u0275nov"](n, 33).ngClassTouched, t["\u0275nov"](n, 33).ngClassPristine, t["\u0275nov"](n, 33).ngClassDirty, t["\u0275nov"](n, 33).ngClassValid, t["\u0275nov"](n, 33).ngClassInvalid, t["\u0275nov"](n, 33).ngClassPending, t["\u0275nov"](n, 34)._isServer, t["\u0275nov"](n, 34).id, t["\u0275nov"](n, 34).placeholder, t["\u0275nov"](n, 34).disabled, t["\u0275nov"](n, 34).required, t["\u0275nov"](n, 34).readonly && !t["\u0275nov"](n, 34)._isNativeSelect || null, t["\u0275nov"](n, 34)._ariaDescribedby || null, t["\u0275nov"](n, 34).errorState, t["\u0275nov"](n, 34).required.toString()]), l(n, 36, 1, ["standard" == t["\u0275nov"](n, 37).appearance, "fill" == t["\u0275nov"](n, 37).appearance, "outline" == t["\u0275nov"](n, 37).appearance, "legacy" == t["\u0275nov"](n, 37).appearance, t["\u0275nov"](n, 37)._control.errorState, t["\u0275nov"](n, 37)._canLabelFloat, t["\u0275nov"](n, 37)._shouldLabelFloat(), t["\u0275nov"](n, 37)._hideControlPlaceholder(), t["\u0275nov"](n, 37)._control.disabled, t["\u0275nov"](n, 37)._control.autofilled, t["\u0275nov"](n, 37)._control.focused, "accent" == t["\u0275nov"](n, 37).color, "warn" == t["\u0275nov"](n, 37).color, t["\u0275nov"](n, 37)._shouldForward("untouched"), t["\u0275nov"](n, 37)._shouldForward("touched"), t["\u0275nov"](n, 37)._shouldForward("pristine"), t["\u0275nov"](n, 37)._shouldForward("dirty"), t["\u0275nov"](n, 37)._shouldForward("valid"), t["\u0275nov"](n, 37)._shouldForward("invalid"), t["\u0275nov"](n, 37)._shouldForward("pending"), !t["\u0275nov"](n, 37)._animationsEnabled]), l(n, 49, 1, [t["\u0275nov"](n, 54).ngClassUntouched, t["\u0275nov"](n, 54).ngClassTouched, t["\u0275nov"](n, 54).ngClassPristine, t["\u0275nov"](n, 54).ngClassDirty, t["\u0275nov"](n, 54).ngClassValid, t["\u0275nov"](n, 54).ngClassInvalid, t["\u0275nov"](n, 54).ngClassPending, t["\u0275nov"](n, 55)._isServer, t["\u0275nov"](n, 55).id, t["\u0275nov"](n, 55).placeholder, t["\u0275nov"](n, 55).disabled, t["\u0275nov"](n, 55).required, t["\u0275nov"](n, 55).readonly && !t["\u0275nov"](n, 55)._isNativeSelect || null, t["\u0275nov"](n, 55)._ariaDescribedby || null, t["\u0275nov"](n, 55).errorState, t["\u0275nov"](n, 55).required.toString()]), l(n, 66, 0, t["\u0275nov"](n, 67).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 67)._animationMode), l(n, 69, 0, t["\u0275unv"](n, 69, 0, t["\u0275nov"](n, 70).transform("BTN_SUBMIT")))
                })
            }

            function te(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-complaint", [], null, null, null, ee, Kn)), t["\u0275did"](1, 114688, null, 0, Wn, [N, Qn], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var ue = t["\u0275ccf"]("app-complaint", Wn, te, {}, {}, []),
                oe = e("Z5h4"),
                ae = e("de3e"),
                ie = e("ZYCi");
            q.b.add(P.w, P.m, P.n, Tl.h), q.a.watch();
            var re = {
                    "http://demo.owasp-juice.shop": "http://demo.owasp-juice.shop",
                    "https://juice-shop.herokuapp.com": "https://juice-shop.herokuapp.com",
                    "http://juice-shop.herokuapp.com": "http://juice-shop.herokuapp.com",
                    "http://preview.owasp-juice.shop": "http://preview.owasp-juice.shop",
                    "https://juice-shop-staging.herokuapp.com": "https://juice-shop-staging.herokuapp.com",
                    "http://juice-shop-staging.herokuapp.com": "http://juice-shop-staging.herokuapp.com",
                    "http://localhost:3000": "http://local3000.owasp-juice.shop",
                    "http://127.0.0.1:3000": "http://local3000.owasp-juice.shop",
                    "http://localhost:4200": "http://local4200.owasp-juice.shop",
                    "http://127.0.0.1:4200": "http://local4200.owasp-juice.shop",
                    "http://192.168.99.100:3000": "http://localMac.owasp-juice.shop",
                    "https://juice-shop-v8.herokuapp.com": "https://juice-shop-v8.herokuapp.com",
                    "http://juice-shop-v8.herokuapp.com": "http://juice-shop-v8.herokuapp.com"
                },
                de = function() {
                    function l(l, n, e, t) {
                        this.userService = l, this.windowRefService = n, this.cookieService = e, this.router = t, this.emailControl = new T.e("", [T.o.required]), this.passwordControl = new T.e("", [T.o.required]), this.hide = !0, this.rememberMe = new T.e(!1)
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = localStorage.getItem("email");
                        l ? (this.user = {}, this.user.email = l, this.rememberMe.setValue(!0)) : this.rememberMe.setValue(!1), this.redirectUri = this.windowRefService.nativeWindow.location.protocol + "//" + this.windowRefService.nativeWindow.location.host, this.oauthUnavailable = !re[this.redirectUri], this.oauthUnavailable && console.log(this.redirectUri + " is not an authorized redirect URI for this application.")
                    }, l.prototype.login = function() {
                        var l = this;
                        this.user = {}, this.user.email = this.emailControl.value, this.user.password = this.passwordControl.value, this.userService.login(this.user).subscribe(function(n) {
                            localStorage.setItem("token", n.token), l.cookieService.put("token", n.token), sessionStorage.setItem("bid", n.bid), l.userService.isLoggedIn.next(!0), l.router.navigate(["/search"])
                        }, function(n) {
                            console.log(n), localStorage.removeItem("token"), l.cookieService.remove("token", {
                                domain: document.domain
                            }), sessionStorage.removeItem("bid"), l.error = n, l.userService.isLoggedIn.next(!1), l.emailControl.markAsPristine(), l.passwordControl.markAsPristine()
                        }), this.rememberMe.value ? localStorage.setItem("email", this.user.email) : localStorage.removeItem("email"), this.error && this.user.email && this.user.email.match(/support@.*/) && console.log("@echipa de suport: Secretul nostru comun este \xeenc\u0103 Caoimhe cu parola de master gol!")
                    }, l.prototype.googleLogin = function() {
                        this.windowRefService.nativeWindow.location.replace("https://accounts.google.com/o/oauth2/v2/auth?client_id=1005568560502-6hm16lef8oh46hr2d98vf2ohlnj4nfhq.apps.googleusercontent.com&response_type=token&scope=email&redirect_uri=" + re[this.redirectUri])
                    }, l
                }(),
                se = e("7Dvt"),
                ce = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}mat-checkbox[_ngcontent-%COMP%]{padding-bottom:30px;padding-top:30px}a[_ngcontent-%COMP%]:nth-child(3){padding-left:5px}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}mat-form-field[_ngcontent-%COMP%]:nth-child(2){padding-bottom:20px}.button-container[_ngcontent-%COMP%]{margin-top:10px}.button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:6px}"]
                    ],
                    data: {}
                });

            function fe(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function pe(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "button", [
                    ["mat-icon-button", ""],
                    ["matSuffix", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0,
                        u = l.component;
                    return "click" === n && (t = 0 != (u.hide = !u.hide) && t), t
                }, R.b, R.a)), t["\u0275did"](1, 16384, [
                    [14, 4]
                ], 0, Vl.g, [], null, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-eye"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function me(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "button", [
                    ["mat-icon-button", ""],
                    ["matSuffix", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0,
                        u = l.component;
                    return "click" === n && (t = 0 != (u.hide = !u.hide) && t), t
                }, R.b, R.a)), t["\u0275did"](1, 16384, [
                    [14, 4]
                ], 0, Vl.g, [], null, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-eye-slash"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode)
                })
            }

            function he(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_PASSWORD"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function ve(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.googleLogin() && t), t
                }, R.b, R.a)), t["\u0275did"](1, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, 0, 0, "i", [
                    ["class", "fab fa-google fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](3, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "accent")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 1)._animationMode), l(n, 3, 0, t["\u0275unv"](n, 3, 0, t["\u0275nov"](n, 4).transform("BTN_GOOGLE_LOGIN")))
                })
            }

            function ge(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 80, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 78, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 68, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](5, 0, null, null, 1, "div", [
                    ["class", "error"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](6, null, ["", ""])), (l()(), t["\u0275eld"](7, 0, null, null, 22, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](8, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](16, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](17, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](18, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EMAIL"])), (l()(), t["\u0275eld"](20, 0, [
                    ["email", 1]
                ], 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "email"],
                    ["matInput", ""],
                    ["name", "email"],
                    ["placeholder", ""]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "focus"],
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 21)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 21).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 21)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 21)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 26)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 26)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 26)._onInput() && u), "focus" === n && (u = !1 !== (o.error = null) && u), u
                }, null, null)), t["\u0275did"](21, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](23, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](25, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](26, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, fe)), t["\u0275did"](29, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](30, 0, null, null, 26, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](31, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](39, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](40, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](41, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PASSWORD"])), (l()(), t["\u0275eld"](43, 0, [
                    ["password", 1]
                ], 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "password"],
                    ["matInput", ""],
                    ["name", "password"],
                    ["placeholder", ""]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "focus"],
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 44)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 44).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 44)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 44)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 49)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 49)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 49)._onInput() && u), "focus" === n && (u = !1 !== (o.error = null) && u), u
                }, null, null)), t["\u0275did"](44, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](46, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](48, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](49, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 4, 1, null, pe)), t["\u0275did"](52, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 4, 1, null, me)), t["\u0275did"](54, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, he)), t["\u0275did"](56, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](57, 0, null, null, 7, "div", [
                    ["class", "button-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](58, 0, null, null, 4, "button", [
                    ["color", "primary"],
                    ["id", "loginButton"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.login() && t), t
                }, R.b, R.a)), t["\u0275did"](59, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](60, 0, null, 0, 0, "i", [
                    ["class", "fas fa-key fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](61, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275and"](16777216, null, null, 1, null, ve)), t["\u0275did"](64, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](65, 0, null, null, 7, "mat-checkbox", [
                    ["class", "mat-checkbox"],
                    ["id", "rememberMe"]
                ], [
                    [8, "id", 0],
                    [1, "tabindex", 0],
                    [2, "mat-checkbox-indeterminate", null],
                    [2, "mat-checkbox-checked", null],
                    [2, "mat-checkbox-disabled", null],
                    [2, "mat-checkbox-label-before", null],
                    [2, "_mat-animation-noopable", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null]
                ], null, null, oe.b, oe.a)), t["\u0275did"](66, 8568832, null, 0, ae.b, [t.ElementRef, t.ChangeDetectorRef, E.h, t.NgZone, [8, null],
                    [2, ae.a],
                    [2, k.a]
                ], {
                    id: [0, "id"]
                }, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [ae.b]), t["\u0275did"](68, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](70, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), (l()(), t["\u0275ted"](71, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](73, 0, null, 0, 3, "a", [
                    ["class", "primary-link"],
                    ["routerLink", "/forgot-password"],
                    ["translate", ""]
                ], [
                    [1, "target", 0],
                    [8, "href", 4]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 74).onClick(e.button, e.ctrlKey, e.metaKey, e.shiftKey) && u), u
                }, null, null)), t["\u0275did"](74, 671744, null, 0, ie.m, [ie.k, ie.a, _.LocationStrategy], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](75, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["FORGOT_PASSWORD"])), (l()(), t["\u0275eld"](77, 0, null, 0, 3, "a", [
                    ["class", "primary-link"],
                    ["routerLink", "/register"],
                    ["translate", ""]
                ], [
                    [1, "target", 0],
                    [8, "href", 4]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 78).onClick(e.button, e.ctrlKey, e.metaKey, e.shiftKey) && u), u
                }, null, null)), t["\u0275did"](78, 671744, null, 0, ie.m, [ie.k, ie.a, _.LocationStrategy], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](79, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["NO_CUSTOMER"]))], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 17, 0, ""), l(n, 23, 0, e.emailControl), l(n, 26, 0, "email", ""), l(n, 29, 0, e.emailControl.invalid), l(n, 40, 0, ""), l(n, 46, 0, e.passwordControl), l(n, 49, 0, "password", "", e.hide ? "password" : "text"), l(n, 52, 0, e.hide), l(n, 54, 0, !e.hide), l(n, 56, 0, e.passwordControl.invalid), l(n, 59, 0, !e.emailControl.value || !e.passwordControl.value, "primary"), l(n, 64, 0, !e.oauthUnavailable), l(n, 66, 0, "rememberMe"), l(n, 68, 0, e.rememberMe), l(n, 74, 0, "/forgot-password"), l(n, 75, 0, ""), l(n, 78, 0, "/register"), l(n, 79, 0, "")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 6, 0, null == e.error ? null : e.error.error), l(n, 7, 1, ["standard" == t["\u0275nov"](n, 8).appearance, "fill" == t["\u0275nov"](n, 8).appearance, "outline" == t["\u0275nov"](n, 8).appearance, "legacy" == t["\u0275nov"](n, 8).appearance, t["\u0275nov"](n, 8)._control.errorState, t["\u0275nov"](n, 8)._canLabelFloat, t["\u0275nov"](n, 8)._shouldLabelFloat(), t["\u0275nov"](n, 8)._hideControlPlaceholder(), t["\u0275nov"](n, 8)._control.disabled, t["\u0275nov"](n, 8)._control.autofilled, t["\u0275nov"](n, 8)._control.focused, "accent" == t["\u0275nov"](n, 8).color, "warn" == t["\u0275nov"](n, 8).color, t["\u0275nov"](n, 8)._shouldForward("untouched"), t["\u0275nov"](n, 8)._shouldForward("touched"), t["\u0275nov"](n, 8)._shouldForward("pristine"), t["\u0275nov"](n, 8)._shouldForward("dirty"), t["\u0275nov"](n, 8)._shouldForward("valid"), t["\u0275nov"](n, 8)._shouldForward("invalid"), t["\u0275nov"](n, 8)._shouldForward("pending"), !t["\u0275nov"](n, 8)._animationsEnabled]), l(n, 20, 1, [t["\u0275nov"](n, 25).ngClassUntouched, t["\u0275nov"](n, 25).ngClassTouched, t["\u0275nov"](n, 25).ngClassPristine, t["\u0275nov"](n, 25).ngClassDirty, t["\u0275nov"](n, 25).ngClassValid, t["\u0275nov"](n, 25).ngClassInvalid, t["\u0275nov"](n, 25).ngClassPending, t["\u0275nov"](n, 26)._isServer, t["\u0275nov"](n, 26).id, t["\u0275nov"](n, 26).placeholder, t["\u0275nov"](n, 26).disabled, t["\u0275nov"](n, 26).required, t["\u0275nov"](n, 26).readonly && !t["\u0275nov"](n, 26)._isNativeSelect || null, t["\u0275nov"](n, 26)._ariaDescribedby || null, t["\u0275nov"](n, 26).errorState, t["\u0275nov"](n, 26).required.toString()]), l(n, 30, 1, ["standard" == t["\u0275nov"](n, 31).appearance, "fill" == t["\u0275nov"](n, 31).appearance, "outline" == t["\u0275nov"](n, 31).appearance, "legacy" == t["\u0275nov"](n, 31).appearance, t["\u0275nov"](n, 31)._control.errorState, t["\u0275nov"](n, 31)._canLabelFloat, t["\u0275nov"](n, 31)._shouldLabelFloat(), t["\u0275nov"](n, 31)._hideControlPlaceholder(), t["\u0275nov"](n, 31)._control.disabled, t["\u0275nov"](n, 31)._control.autofilled, t["\u0275nov"](n, 31)._control.focused, "accent" == t["\u0275nov"](n, 31).color, "warn" == t["\u0275nov"](n, 31).color, t["\u0275nov"](n, 31)._shouldForward("untouched"), t["\u0275nov"](n, 31)._shouldForward("touched"), t["\u0275nov"](n, 31)._shouldForward("pristine"), t["\u0275nov"](n, 31)._shouldForward("dirty"), t["\u0275nov"](n, 31)._shouldForward("valid"), t["\u0275nov"](n, 31)._shouldForward("invalid"), t["\u0275nov"](n, 31)._shouldForward("pending"), !t["\u0275nov"](n, 31)._animationsEnabled]), l(n, 43, 1, [t["\u0275nov"](n, 48).ngClassUntouched, t["\u0275nov"](n, 48).ngClassTouched, t["\u0275nov"](n, 48).ngClassPristine, t["\u0275nov"](n, 48).ngClassDirty, t["\u0275nov"](n, 48).ngClassValid, t["\u0275nov"](n, 48).ngClassInvalid, t["\u0275nov"](n, 48).ngClassPending, t["\u0275nov"](n, 49)._isServer, t["\u0275nov"](n, 49).id, t["\u0275nov"](n, 49).placeholder, t["\u0275nov"](n, 49).disabled, t["\u0275nov"](n, 49).required, t["\u0275nov"](n, 49).readonly && !t["\u0275nov"](n, 49)._isNativeSelect || null, t["\u0275nov"](n, 49)._ariaDescribedby || null, t["\u0275nov"](n, 49).errorState, t["\u0275nov"](n, 49).required.toString()]), l(n, 58, 0, t["\u0275nov"](n, 59).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 59)._animationMode), l(n, 61, 0, t["\u0275unv"](n, 61, 0, t["\u0275nov"](n, 62).transform("BTN_LOGIN"))), l(n, 65, 1, [t["\u0275nov"](n, 66).id, null, t["\u0275nov"](n, 66).indeterminate, t["\u0275nov"](n, 66).checked, t["\u0275nov"](n, 66).disabled, "before" == t["\u0275nov"](n, 66).labelPosition, "NoopAnimations" === t["\u0275nov"](n, 66)._animationMode, t["\u0275nov"](n, 70).ngClassUntouched, t["\u0275nov"](n, 70).ngClassTouched, t["\u0275nov"](n, 70).ngClassPristine, t["\u0275nov"](n, 70).ngClassDirty, t["\u0275nov"](n, 70).ngClassValid, t["\u0275nov"](n, 70).ngClassInvalid, t["\u0275nov"](n, 70).ngClassPending]), l(n, 71, 0, t["\u0275unv"](n, 71, 0, t["\u0275nov"](n, 72).transform("REMEMBER_ME"))), l(n, 73, 0, t["\u0275nov"](n, 74).target, t["\u0275nov"](n, 74).href), l(n, 77, 0, t["\u0275nov"](n, 78).target, t["\u0275nov"](n, 78).href)
                })
            }

            function be(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-login", [], null, null, null, ge, ce)), t["\u0275did"](1, 114688, null, 0, de, [N, ln, se.d, ie.k], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var _e = t["\u0275ccf"]("app-login", de, be, {}, {}, []),
                Ce = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/SecurityQuestions"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.host + "/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.findBy = function(l) {
                        return this.http.get(this.hostServer + "/rest/user/security-question?email=" + l).pipe(Object(a.a)(function(l) {
                            return l.question
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.D), q.a.watch();
            var Re = function() {
                    function l(l, n) {
                        this.securityQuestionService = l, this.userService = n, this.emailControl = new T.e("", [T.o.required, T.o.email]), this.securityQuestionControl = new T.e("", [T.o.required]), this.passwordControl = new T.e("", [T.o.required, T.o.minLength(5)]), this.repeatPasswordControl = new T.e("", [T.o.required]), this.securityQuestion = void 0
                    }
                    return l.prototype.findSecurityQuestion = function() {
                        var l = this;
                        this.securityQuestion = void 0, this.emailControl.value && this.securityQuestionService.findBy(this.emailControl.value).subscribe(function(n) {
                            n && (l.securityQuestion = n.question)
                        }, function(l) {
                            return l
                        })
                    }, l.prototype.resetPassword = function() {
                        var l = this;
                        this.userService.resetPassword({
                            email: this.emailControl.value,
                            answer: this.securityQuestionControl.value,
                            new: this.passwordControl.value,
                            repeat: this.repeatPasswordControl.value
                        }).subscribe(function() {
                            l.error = void 0, l.confirmation = "Your password was successfully changed.", l.resetForm()
                        }, function(n) {
                            l.error = n.error, l.confirmation = void 0, l.resetForm()
                        })
                    }, l.prototype.resetForm = function() {
                        this.emailControl.setValue(""), this.emailControl.markAsPristine(), this.emailControl.markAsUntouched(), this.securityQuestionControl.setValue(""), this.securityQuestionControl.markAsPristine(), this.securityQuestionControl.markAsUntouched(), this.passwordControl.setValue(""), this.passwordControl.markAsPristine(), this.passwordControl.markAsUntouched(), this.repeatPasswordControl.setValue(""), this.repeatPasswordControl.markAsPristine(), this.repeatPasswordControl.markAsUntouched()
                    }, l
                }(),
                ye = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}button[_ngcontent-%COMP%]{margin-top:5px}"]
                    ],
                    data: {}
                });

            function we(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Ee(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function ke(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_SECURITY_ANSWER"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Ie(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_NEW_PASSWORD"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Se(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    length: 0
                }), t["\u0275did"](3, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_PASSWORD_LENGTH"]))], function(l, n) {
                    var e = l(n, 2, 0, "5-20");
                    l(n, 1, 0, "", e)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).id)
                })
            }

            function Te(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [25, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_PASSWORD_REPEAT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function De(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 70, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 21, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](2, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](10, 0, null, 3, 2, "mat-label", [], null, null, null, null, null)), t["\u0275did"](11, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](12, null, ["", ""])), (l()(), t["\u0275eld"](13, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "securityAnswer"],
                    ["matInput", ""],
                    ["placeholder", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 14)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 14).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 14)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 14)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 19)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 19)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 19)._onInput() && u), u
                }, null, null)), t["\u0275did"](14, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](16, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](18, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](19, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, ke)), t["\u0275did"](22, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](23, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](24, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 15, {
                    _control: 0
                }), t["\u0275qud"](335544320, 16, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 17, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 18, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 19, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](32, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](33, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](34, 16384, [
                    [17, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_NEW_PASSWORD"])), (l()(), t["\u0275eld"](36, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "newPassword"],
                    ["matInput", ""],
                    ["placeholder", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 37)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 37).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 37)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 37)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 42)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 42)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 42)._onInput() && u), u
                }, null, null)), t["\u0275did"](37, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](39, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](41, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](42, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Ie)), t["\u0275did"](45, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Se)), t["\u0275did"](47, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](48, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](49, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 22, {
                    _control: 0
                }), t["\u0275qud"](335544320, 23, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 24, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 25, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 26, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 27, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 28, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](57, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](58, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](59, 16384, [
                    [24, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PASSWORD_REPEAT"])), (l()(), t["\u0275eld"](61, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "newPasswordRepeat"],
                    ["matInput", ""],
                    ["placeholder", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 62)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 62).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 62)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 62)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 67)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 67)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 67)._onInput() && u), u
                }, null, null)), t["\u0275did"](62, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](64, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](66, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](67, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [22, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Te)), t["\u0275did"](70, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, "outline"), l(n, 16, 0, e.securityQuestionControl), l(n, 19, 0, "securityAnswer", "", "password"), l(n, 22, 0, e.securityQuestionControl.invalid && e.securityQuestionControl.errors.required), l(n, 24, 0, "outline"), l(n, 33, 0, ""), l(n, 39, 0, e.passwordControl), l(n, 42, 0, "newPassword", "", "password"), l(n, 45, 0, e.passwordControl.invalid && e.passwordControl.errors.required), l(n, 47, 0, e.passwordControl.invalid && e.passwordControl.errors.minlength), l(n, 49, 0, "outline"), l(n, 58, 0, ""), l(n, 64, 0, e.repeatPasswordControl), l(n, 67, 0, "newPasswordRepeat", "", "password"), l(n, 70, 0, e.repeatPasswordControl.invalid && e.repeatPasswordControl.errors.required)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 1, 1, ["standard" == t["\u0275nov"](n, 2).appearance, "fill" == t["\u0275nov"](n, 2).appearance, "outline" == t["\u0275nov"](n, 2).appearance, "legacy" == t["\u0275nov"](n, 2).appearance, t["\u0275nov"](n, 2)._control.errorState, t["\u0275nov"](n, 2)._canLabelFloat, t["\u0275nov"](n, 2)._shouldLabelFloat(), t["\u0275nov"](n, 2)._hideControlPlaceholder(), t["\u0275nov"](n, 2)._control.disabled, t["\u0275nov"](n, 2)._control.autofilled, t["\u0275nov"](n, 2)._control.focused, "accent" == t["\u0275nov"](n, 2).color, "warn" == t["\u0275nov"](n, 2).color, t["\u0275nov"](n, 2)._shouldForward("untouched"), t["\u0275nov"](n, 2)._shouldForward("touched"), t["\u0275nov"](n, 2)._shouldForward("pristine"), t["\u0275nov"](n, 2)._shouldForward("dirty"), t["\u0275nov"](n, 2)._shouldForward("valid"), t["\u0275nov"](n, 2)._shouldForward("invalid"), t["\u0275nov"](n, 2)._shouldForward("pending"), !t["\u0275nov"](n, 2)._animationsEnabled]), l(n, 12, 0, e.securityQuestion), l(n, 13, 1, [t["\u0275nov"](n, 18).ngClassUntouched, t["\u0275nov"](n, 18).ngClassTouched, t["\u0275nov"](n, 18).ngClassPristine, t["\u0275nov"](n, 18).ngClassDirty, t["\u0275nov"](n, 18).ngClassValid, t["\u0275nov"](n, 18).ngClassInvalid, t["\u0275nov"](n, 18).ngClassPending, t["\u0275nov"](n, 19)._isServer, t["\u0275nov"](n, 19).id, t["\u0275nov"](n, 19).placeholder, t["\u0275nov"](n, 19).disabled, t["\u0275nov"](n, 19).required, t["\u0275nov"](n, 19).readonly && !t["\u0275nov"](n, 19)._isNativeSelect || null, t["\u0275nov"](n, 19)._ariaDescribedby || null, t["\u0275nov"](n, 19).errorState, t["\u0275nov"](n, 19).required.toString()]), l(n, 23, 1, ["standard" == t["\u0275nov"](n, 24).appearance, "fill" == t["\u0275nov"](n, 24).appearance, "outline" == t["\u0275nov"](n, 24).appearance, "legacy" == t["\u0275nov"](n, 24).appearance, t["\u0275nov"](n, 24)._control.errorState, t["\u0275nov"](n, 24)._canLabelFloat, t["\u0275nov"](n, 24)._shouldLabelFloat(), t["\u0275nov"](n, 24)._hideControlPlaceholder(), t["\u0275nov"](n, 24)._control.disabled, t["\u0275nov"](n, 24)._control.autofilled, t["\u0275nov"](n, 24)._control.focused, "accent" == t["\u0275nov"](n, 24).color, "warn" == t["\u0275nov"](n, 24).color, t["\u0275nov"](n, 24)._shouldForward("untouched"), t["\u0275nov"](n, 24)._shouldForward("touched"), t["\u0275nov"](n, 24)._shouldForward("pristine"), t["\u0275nov"](n, 24)._shouldForward("dirty"), t["\u0275nov"](n, 24)._shouldForward("valid"), t["\u0275nov"](n, 24)._shouldForward("invalid"), t["\u0275nov"](n, 24)._shouldForward("pending"), !t["\u0275nov"](n, 24)._animationsEnabled]), l(n, 36, 1, [t["\u0275nov"](n, 41).ngClassUntouched, t["\u0275nov"](n, 41).ngClassTouched, t["\u0275nov"](n, 41).ngClassPristine, t["\u0275nov"](n, 41).ngClassDirty, t["\u0275nov"](n, 41).ngClassValid, t["\u0275nov"](n, 41).ngClassInvalid, t["\u0275nov"](n, 41).ngClassPending, t["\u0275nov"](n, 42)._isServer, t["\u0275nov"](n, 42).id, t["\u0275nov"](n, 42).placeholder, t["\u0275nov"](n, 42).disabled, t["\u0275nov"](n, 42).required, t["\u0275nov"](n, 42).readonly && !t["\u0275nov"](n, 42)._isNativeSelect || null, t["\u0275nov"](n, 42)._ariaDescribedby || null, t["\u0275nov"](n, 42).errorState, t["\u0275nov"](n, 42).required.toString()]), l(n, 48, 1, ["standard" == t["\u0275nov"](n, 49).appearance, "fill" == t["\u0275nov"](n, 49).appearance, "outline" == t["\u0275nov"](n, 49).appearance, "legacy" == t["\u0275nov"](n, 49).appearance, t["\u0275nov"](n, 49)._control.errorState, t["\u0275nov"](n, 49)._canLabelFloat, t["\u0275nov"](n, 49)._shouldLabelFloat(), t["\u0275nov"](n, 49)._hideControlPlaceholder(), t["\u0275nov"](n, 49)._control.disabled, t["\u0275nov"](n, 49)._control.autofilled, t["\u0275nov"](n, 49)._control.focused, "accent" == t["\u0275nov"](n, 49).color, "warn" == t["\u0275nov"](n, 49).color, t["\u0275nov"](n, 49)._shouldForward("untouched"), t["\u0275nov"](n, 49)._shouldForward("touched"), t["\u0275nov"](n, 49)._shouldForward("pristine"), t["\u0275nov"](n, 49)._shouldForward("dirty"), t["\u0275nov"](n, 49)._shouldForward("valid"), t["\u0275nov"](n, 49)._shouldForward("invalid"), t["\u0275nov"](n, 49)._shouldForward("pending"), !t["\u0275nov"](n, 49)._animationsEnabled]), l(n, 61, 1, [t["\u0275nov"](n, 66).ngClassUntouched, t["\u0275nov"](n, 66).ngClassTouched, t["\u0275nov"](n, 66).ngClassPristine, t["\u0275nov"](n, 66).ngClassDirty, t["\u0275nov"](n, 66).ngClassValid, t["\u0275nov"](n, 66).ngClassInvalid, t["\u0275nov"](n, 66).ngClassPending, t["\u0275nov"](n, 67)._isServer, t["\u0275nov"](n, 67).id, t["\u0275nov"](n, 67).placeholder, t["\u0275nov"](n, 67).disabled, t["\u0275nov"](n, 67).required, t["\u0275nov"](n, 67).readonly && !t["\u0275nov"](n, 67)._isNativeSelect || null, t["\u0275nov"](n, 67)._ariaDescribedby || null, t["\u0275nov"](n, 67).errorState, t["\u0275nov"](n, 67).required.toString()])
                })
            }

            function xe(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 43, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 41, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_FORGOT_PASSWORD"])), (l()(), t["\u0275eld"](7, 0, null, 0, 29, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 1, "div", [
                    ["class", "confirmation"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](9, null, ["", ""])), (l()(), t["\u0275eld"](10, 0, null, null, 1, "div", [
                    ["class", "error"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](11, null, ["", ""])), (l()(), t["\u0275eld"](12, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](13, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](21, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](22, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](23, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EMAIL"])), (l()(), t["\u0275eld"](25, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "email"],
                    ["matInput", ""],
                    ["placeholder", "Enter your email"],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "ngModelChange"],
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 26)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 26).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 26)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 26)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 31)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 31)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 31)._onInput() && u), "ngModelChange" === n && (u = !1 !== o.findSecurityQuestion() && u), u
                }, null, null)), t["\u0275did"](26, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](28, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, {
                    update: "ngModelChange"
                }), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](30, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](31, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, we)), t["\u0275did"](34, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Ee)), t["\u0275did"](36, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, De)), t["\u0275did"](38, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](39, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["id", "resetButton"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.resetPassword() && t), t
                }, R.b, R.a)), t["\u0275did"](40, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](41, 0, null, 0, 0, "i", [
                    ["class", "fas fa-save fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](42, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 5, 0, ""), l(n, 13, 0, "outline"), l(n, 22, 0, ""), l(n, 28, 0, e.emailControl), l(n, 31, 0, "email", "Enter your email", "text"), l(n, 34, 0, e.emailControl.invalid && e.emailControl.errors.required), l(n, 36, 0, e.emailControl.invalid && e.emailControl.errors.email), l(n, 38, 0, e.securityQuestion), l(n, 40, 0, e.emailControl.invalid || e.securityQuestionControl.invalid || e.passwordControl.invalid || e.repeatPasswordControl.invalid, "primary")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 8, 0, !(e.confirmation && !e.emailControl.dirty && !e.securityQuestionControl.dirty && !e.passwordControl.dirty && !e.repeatPasswordControl.dirty)), l(n, 9, 0, e.confirmation), l(n, 10, 0, !(e.error && !e.emailControl.dirty && !e.securityQuestionControl.dirty && !e.passwordControl.dirty && !e.repeatPasswordControl.dirty)), l(n, 11, 0, e.error), l(n, 12, 1, ["standard" == t["\u0275nov"](n, 13).appearance, "fill" == t["\u0275nov"](n, 13).appearance, "outline" == t["\u0275nov"](n, 13).appearance, "legacy" == t["\u0275nov"](n, 13).appearance, t["\u0275nov"](n, 13)._control.errorState, t["\u0275nov"](n, 13)._canLabelFloat, t["\u0275nov"](n, 13)._shouldLabelFloat(), t["\u0275nov"](n, 13)._hideControlPlaceholder(), t["\u0275nov"](n, 13)._control.disabled, t["\u0275nov"](n, 13)._control.autofilled, t["\u0275nov"](n, 13)._control.focused, "accent" == t["\u0275nov"](n, 13).color, "warn" == t["\u0275nov"](n, 13).color, t["\u0275nov"](n, 13)._shouldForward("untouched"), t["\u0275nov"](n, 13)._shouldForward("touched"), t["\u0275nov"](n, 13)._shouldForward("pristine"), t["\u0275nov"](n, 13)._shouldForward("dirty"), t["\u0275nov"](n, 13)._shouldForward("valid"), t["\u0275nov"](n, 13)._shouldForward("invalid"), t["\u0275nov"](n, 13)._shouldForward("pending"), !t["\u0275nov"](n, 13)._animationsEnabled]), l(n, 25, 1, [t["\u0275nov"](n, 30).ngClassUntouched, t["\u0275nov"](n, 30).ngClassTouched, t["\u0275nov"](n, 30).ngClassPristine, t["\u0275nov"](n, 30).ngClassDirty, t["\u0275nov"](n, 30).ngClassValid, t["\u0275nov"](n, 30).ngClassInvalid, t["\u0275nov"](n, 30).ngClassPending, t["\u0275nov"](n, 31)._isServer, t["\u0275nov"](n, 31).id, t["\u0275nov"](n, 31).placeholder, t["\u0275nov"](n, 31).disabled, t["\u0275nov"](n, 31).required, t["\u0275nov"](n, 31).readonly && !t["\u0275nov"](n, 31)._isNativeSelect || null, t["\u0275nov"](n, 31)._ariaDescribedby || null, t["\u0275nov"](n, 31).errorState, t["\u0275nov"](n, 31).required.toString()]), l(n, 39, 0, t["\u0275nov"](n, 40).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 40)._animationMode), l(n, 42, 0, t["\u0275unv"](n, 42, 0, t["\u0275nov"](n, 43).transform("BTN_CHANGE")))
                })
            }

            function Le(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-forgot-password", [], null, null, null, xe, ye)), t["\u0275did"](1, 49152, null, 0, Re, [Ce, N], null, null)], null, null)
            }
            var Ae = t["\u0275ccf"]("app-forgot-password", Re, Le, {}, {}, []),
                Oe = e("jQLj"),
                Ne = e("eDkP");
            q.b.add(P.A), q.a.watch();
            var qe = function() {
                    function l(l, n, e) {
                        this.recycleService = l, this.userService = n, this.configurationService = e, this.requestorControl = new T.e({
                            value: "",
                            disabled: !0
                        }, []), this.recycleAddressControl = new T.e("", [T.o.required, T.o.minLength(20), T.o.maxLength(180)]), this.recycleQuantityControl = new T.e("", [T.o.required, T.o.min(10), T.o.max(1e3)]), this.pickUpDateControl = new T.e, this.pickup = new T.e(!1), this.recycle = {}
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            n && n.application && n.application.recyclePage && (l.topImage = "assets/public/images/products/" + n.application.recyclePage.topProductImage, l.bottomImage = "assets/public/images/products/" + n.application.recyclePage.bottomProductImage)
                        }, function(l) {
                            return console.log(l)
                        }), this.initRecycle(), this.findAll()
                    }, l.prototype.initRecycle = function() {
                        var l = this;
                        this.userService.whoAmI().subscribe(function(n) {
                            l.recycle = {}, l.recycle.UserId = n.id, l.userEmail = n.email, l.requestorControl.setValue(l.userEmail)
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.save = function() {
                        var l = this;
                        this.recycle.address = this.recycleAddressControl.value, this.recycle.quantity = this.recycleQuantityControl.value, this.pickup.value && (this.recycle.isPickUp = this.pickup.value, this.recycle.date = this.pickUpDateControl.value), this.recycleService.save(this.recycle).subscribe(function(n) {
                            l.confirmation = "Thank you for using our recycling service. We will " + (n.isPickup ? "pick up your pomace on " + n.pickupDate : "deliver your recycle box asap") + ".", l.initRecycle(), l.resetForm()
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.findAll = function() {
                        var l = this;
                        this.recycleService.find().subscribe(function(n) {
                            l.recycles = n
                        }, function(l) {
                            console.log(l)
                        })
                    }, l.prototype.resetForm = function() {
                        this.recycleAddressControl.setValue(""), this.recycleAddressControl.markAsPristine(), this.recycleAddressControl.markAsUntouched(), this.recycleQuantityControl.setValue(""), this.recycleQuantityControl.markAsPristine(), this.recycleQuantityControl.markAsUntouched(), this.pickUpDateControl.setValue(""), this.pickUpDateControl.markAsPristine(), this.pickUpDateControl.markAsUntouched(), this.pickup.setValue(!1)
                    }, l
                }(),
                Pe = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card.form-card[_ngcontent-%COMP%]{margin-bottom:30px;margin-left:8.3333%;min-width:300px;width:50%}div.responsibility-container[_ngcontent-%COMP%]{margin-left:8.3333%;margin-right:8.3333%;min-width:300px;width:50%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}button[_ngcontent-%COMP%]{margin-top:5px}mat-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100px;width:auto}mat-checkbox[_ngcontent-%COMP%]{margin-bottom:20px}.fill-remaining-space[_ngcontent-%COMP%]{flex:1 1 auto}"]
                    ],
                    data: {}
                });

            function Me(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "div", [
                    ["class", "confirmation"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", " "]))], null, function(l, n) {
                    l(n, 1, 0, n.component.confirmation)
                })
            }

            function Fe(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, [" MANDATORY_QUANTITY "]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function je(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    range: 0
                }), t["\u0275did"](3, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_QUANTITY "]))], function(l, n) {
                    var e = l(n, 2, 0, "10-1000");
                    l(n, 1, 0, "", e)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).id)
                })
            }

            function Ue(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [17, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_DELIVERY_ADDRESS"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Ve(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [17, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PICKUP_ADDRESS"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Be(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, [" MANDATORY_ADDRESS "]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function He(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    length: 0
                }), t["\u0275did"](3, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_ADDRESS_LENGTH "]))], function(l, n) {
                    var e = l(n, 2, 0, "20-180");
                    l(n, 1, 0, "", e)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).id)
                })
            }

            function ze(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [25, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_DATE"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function Ze(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 31, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](1, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 22, {
                    _control: 0
                }), t["\u0275qud"](335544320, 23, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 24, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 25, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 26, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 27, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 28, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](9, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](10, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](11, 16384, [
                    [24, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PICKUP_DATE"])), (l()(), t["\u0275eld"](13, 0, null, 1, 10, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""]
                ], [
                    [1, "aria-haspopup", 0],
                    [1, "aria-owns", 0],
                    [1, "min", 0],
                    [1, "max", 0],
                    [8, "disabled", 0],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "change"],
                    [null, "keydown"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 14)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 14).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 14)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 14)._compositionEnd(e.target.value) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 15)._onInput(e.target.value) && u), "change" === n && (u = !1 !== t["\u0275nov"](l, 15)._onChange() && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 15)._onBlur() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 15)._onKeydown(e) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 22)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 22)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 22)._onInput() && u), u
                }, null, null)), t["\u0275did"](14, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275did"](15, 147456, null, 0, Oe.h, [t.ElementRef, [2, Wl.a],
                    [2, Wl.e],
                    [2, Vl.c]
                ], {
                    matDatepicker: [0, "matDatepicker"]
                }, null), t["\u0275prd"](1024, null, T.i, function(l) {
                    return [l]
                }, [Oe.h]), t["\u0275prd"](1024, null, T.j, function(l, n) {
                    return [l, n]
                }, [T.c, Oe.h]), t["\u0275did"](18, 540672, null, 0, T.f, [
                    [6, T.i],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](20, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275prd"](2048, null, Kl.a, null, [Oe.h]), t["\u0275did"](22, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [6, Kl.a], Xl.a, t.NgZone
                ], null, null), t["\u0275prd"](2048, [
                    [22, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](24, 0, null, 4, 3, "mat-datepicker-toggle", [
                    ["class", "mat-datepicker-toggle"],
                    ["matSuffix", ""]
                ], [
                    [1, "tabindex", 0],
                    [2, "mat-datepicker-toggle-active", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null]
                ], [
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 26)._button.focus() && u), u
                }, v.e, v.d)), t["\u0275did"](25, 16384, [
                    [28, 4]
                ], 0, Vl.g, [], null, null), t["\u0275did"](26, 1753088, null, 1, Oe.k, [Oe.i, t.ChangeDetectorRef, [8, null]], {
                    datepicker: [0, "datepicker"]
                }, null), t["\u0275qud"](335544320, 29, {
                    _customIcon: 0
                }), (l()(), t["\u0275eld"](28, 16777216, null, 1, 1, "mat-datepicker", [], null, null, null, v.f, v.c)), t["\u0275did"](29, 180224, [
                    ["picker", 4]
                ], 0, Oe.f, [V.e, Ne.c, t.NgZone, t.ViewContainerRef, Oe.a, [2, Wl.a],
                    [2, A.b],
                    [2, _.DOCUMENT]
                ], null, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, ze)), t["\u0275did"](31, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "outline"), l(n, 10, 0, ""), l(n, 15, 0, t["\u0275nov"](n, 29)), l(n, 18, 0, e.pickUpDateControl), l(n, 22, 0), l(n, 26, 0, t["\u0275nov"](n, 29)), l(n, 31, 0, e.pickUpDateControl.invalid)
                }, function(l, n) {
                    l(n, 0, 1, ["standard" == t["\u0275nov"](n, 1).appearance, "fill" == t["\u0275nov"](n, 1).appearance, "outline" == t["\u0275nov"](n, 1).appearance, "legacy" == t["\u0275nov"](n, 1).appearance, t["\u0275nov"](n, 1)._control.errorState, t["\u0275nov"](n, 1)._canLabelFloat, t["\u0275nov"](n, 1)._shouldLabelFloat(), t["\u0275nov"](n, 1)._hideControlPlaceholder(), t["\u0275nov"](n, 1)._control.disabled, t["\u0275nov"](n, 1)._control.autofilled, t["\u0275nov"](n, 1)._control.focused, "accent" == t["\u0275nov"](n, 1).color, "warn" == t["\u0275nov"](n, 1).color, t["\u0275nov"](n, 1)._shouldForward("untouched"), t["\u0275nov"](n, 1)._shouldForward("touched"), t["\u0275nov"](n, 1)._shouldForward("pristine"), t["\u0275nov"](n, 1)._shouldForward("dirty"), t["\u0275nov"](n, 1)._shouldForward("valid"), t["\u0275nov"](n, 1)._shouldForward("invalid"), t["\u0275nov"](n, 1)._shouldForward("pending"), !t["\u0275nov"](n, 1)._animationsEnabled]), l(n, 13, 1, [!0, (null == t["\u0275nov"](n, 15)._datepicker ? null : t["\u0275nov"](n, 15)._datepicker.opened) && t["\u0275nov"](n, 15)._datepicker.id || null, t["\u0275nov"](n, 15).min ? t["\u0275nov"](n, 15)._dateAdapter.toIso8601(t["\u0275nov"](n, 15).min) : null, t["\u0275nov"](n, 15).max ? t["\u0275nov"](n, 15)._dateAdapter.toIso8601(t["\u0275nov"](n, 15).max) : null, t["\u0275nov"](n, 15).disabled, t["\u0275nov"](n, 20).ngClassUntouched, t["\u0275nov"](n, 20).ngClassTouched, t["\u0275nov"](n, 20).ngClassPristine, t["\u0275nov"](n, 20).ngClassDirty, t["\u0275nov"](n, 20).ngClassValid, t["\u0275nov"](n, 20).ngClassInvalid, t["\u0275nov"](n, 20).ngClassPending, t["\u0275nov"](n, 22)._isServer, t["\u0275nov"](n, 22).id, t["\u0275nov"](n, 22).placeholder, t["\u0275nov"](n, 22).disabled, t["\u0275nov"](n, 22).required, t["\u0275nov"](n, 22).readonly && !t["\u0275nov"](n, 22)._isNativeSelect || null, t["\u0275nov"](n, 22)._ariaDescribedby || null, t["\u0275nov"](n, 22).errorState, t["\u0275nov"](n, 22).required.toString()]), l(n, 24, 0, -1, t["\u0275nov"](n, 26).datepicker && t["\u0275nov"](n, 26).datepicker.opened, t["\u0275nov"](n, 26).datepicker && "accent" === t["\u0275nov"](n, 26).datepicker.color, t["\u0275nov"](n, 26).datepicker && "warn" === t["\u0275nov"](n, 26).datepicker.color)
                })
            }

            function $e(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 7, "mat-checkbox", [
                    ["class", "mat-checkbox"]
                ], [
                    [8, "id", 0],
                    [1, "tabindex", 0],
                    [2, "mat-checkbox-indeterminate", null],
                    [2, "mat-checkbox-checked", null],
                    [2, "mat-checkbox-disabled", null],
                    [2, "mat-checkbox-label-before", null],
                    [2, "_mat-animation-noopable", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null]
                ], null, null, oe.b, oe.a)), t["\u0275did"](1, 8568832, null, 0, ae.b, [t.ElementRef, t.ChangeDetectorRef, E.h, t.NgZone, [8, null],
                    [2, ae.a],
                    [2, k.a]
                ], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [ae.b]), t["\u0275did"](3, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](5, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), (l()(), t["\u0275ted"](6, 0, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 3, 0, n.component.pickup)
                }, function(l, n) {
                    l(n, 0, 1, [t["\u0275nov"](n, 1).id, null, t["\u0275nov"](n, 1).indeterminate, t["\u0275nov"](n, 1).checked, t["\u0275nov"](n, 1).disabled, "before" == t["\u0275nov"](n, 1).labelPosition, "NoopAnimations" === t["\u0275nov"](n, 1)._animationMode, t["\u0275nov"](n, 5).ngClassUntouched, t["\u0275nov"](n, 5).ngClassTouched, t["\u0275nov"](n, 5).ngClassPristine, t["\u0275nov"](n, 5).ngClassDirty, t["\u0275nov"](n, 5).ngClassValid, t["\u0275nov"](n, 5).ngClassInvalid, t["\u0275nov"](n, 5).ngClassPending]), l(n, 6, 0, t["\u0275unv"](n, 6, 0, t["\u0275nov"](n, 7).transform("REQUEST_PICKUP")))
                })
            }

            function Ye(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 121, "div", [
                    ["fxLayout", "row"],
                    ["fxLayout.lt-md", "column"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtMd: [1, "layoutLtMd"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 89, "mat-card", [
                    ["class", "form-card mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_RECYCLE"])), (l()(), t["\u0275eld"](7, 0, null, 0, 79, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, Me)), t["\u0275did"](9, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](10, 0, null, null, 20, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](11, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](19, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](20, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](21, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_REQUESTOR"])), (l()(), t["\u0275eld"](23, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 24)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 24).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 24)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 24)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 29)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 29)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 29)._onInput() && u), u
                }, null, null)), t["\u0275did"](24, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](26, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](28, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](29, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](31, 0, null, null, 26, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](32, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](40, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](41, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](42, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_QUANTITY"])), (l()(), t["\u0275eld"](44, 0, null, 1, 9, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "number"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 45)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 45).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 45)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 45)._compositionEnd(e.target.value) && u), "change" === n && (u = !1 !== t["\u0275nov"](l, 46).onChange(e.target.value) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 46).onChange(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 46).onTouched() && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 51)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 51)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 51)._onInput() && u), u
                }, null, null)), t["\u0275did"](45, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275did"](46, 16384, null, 0, T.q, [t.Renderer2, t.ElementRef], null, null), t["\u0275prd"](1024, null, T.j, function(l, n) {
                    return [l, n]
                }, [T.c, T.q]), t["\u0275did"](48, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](50, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](51, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    placeholder: [0, "placeholder"],
                    type: [1, "type"]
                }, null), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Fe)), t["\u0275did"](55, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, je)), t["\u0275did"](57, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](58, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](59, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 15, {
                    _control: 0
                }), t["\u0275qud"](335544320, 16, {
                    _placeholderChild: 0
                }), t["\u0275qud"](603979776, 17, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 18, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 19, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275and"](16777216, null, 3, 1, null, Ue)), t["\u0275did"](68, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 3, 1, null, Ve)), t["\u0275did"](70, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](71, 0, null, 1, 7, "textarea", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 72)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 72).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 72)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 72)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 77)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 77)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 77)._onInput() && u), u
                }, null, null)), t["\u0275did"](72, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](74, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](76, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](77, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, Be)), t["\u0275did"](80, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, He)), t["\u0275did"](82, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Ze)), t["\u0275did"](84, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, $e)), t["\u0275did"](86, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](87, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.save() && t), t
                }, R.b, R.a)), t["\u0275did"](88, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](89, 0, null, 0, 0, "i", [
                    ["class", "fas fa-paper-plane fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](90, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](92, 0, null, null, 29, "div", [
                    ["class", "responsibility-container"],
                    ["fxLayout", "column"],
                    ["fxLayoutAlign", "center"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, null, null)), t["\u0275did"](93, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](94, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), t["\u0275did"](95, 737280, null, 0, x.d, [L.h, t.ElementRef, [6, x.e], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](96, 0, null, null, 2, "h4", [
                    ["class", "responsibility-header"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](97, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_PRESS_JUICE_RESPONSIBLY"])), (l()(), t["\u0275eld"](99, 0, null, null, 10, "mat-card", [
                    ["class", "mat-card"],
                    ["fxLayout", "row"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](100, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](101, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), t["\u0275did"](102, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](103, 0, null, 0, 1, "img", [
                    ["class", "mat-card-image"],
                    ["mat-card-image", ""]
                ], [
                    [8, "src", 4]
                ], null, null, null, null)), t["\u0275did"](104, 16384, null, 0, Hl.d, [], null, null), (l()(), t["\u0275eld"](105, 0, null, 0, 4, "mat-card-content", [
                    ["class", "mat-card-content"]
                ], null, null, null, null, null)), t["\u0275did"](106, 16384, null, 0, Hl.b, [], null, null), (l()(), t["\u0275eld"](107, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](108, 0, null, null, 1, "small", [], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, ["Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "])), (l()(), t["\u0275eld"](110, 0, null, null, 10, "mat-card", [
                    ["class", "mat-card"],
                    ["fxLayout", "row"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](111, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](112, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), t["\u0275did"](113, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](114, 0, null, 0, 1, "img", [
                    ["class", "mat-card-image"],
                    ["mat-card-image", ""]
                ], [
                    [8, "src", 4]
                ], null, null, null, null)), t["\u0275did"](115, 16384, null, 0, Hl.d, [], null, null), (l()(), t["\u0275eld"](116, 0, null, 0, 4, "mat-card-content", [
                    ["class", "mat-card-content"]
                ], null, null, null, null, null)), t["\u0275did"](117, 16384, null, 0, Hl.b, [], null, null), (l()(), t["\u0275eld"](118, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](119, 0, null, null, 1, "small", [], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, ["Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "])), (l()(), t["\u0275eld"](121, 0, null, null, 0, "span", [
                    ["class", "fill-remaining-space"]
                ], null, null, null, null, null))], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "row", "column"), l(n, 5, 0, ""), l(n, 9, 0, e.confirmation && !e.recycleQuantityControl.dirty && !e.recycleAddressControl.dirty), l(n, 11, 0, "outline"), l(n, 20, 0, ""), l(n, 26, 0, e.requestorControl), l(n, 29, 0, "text"), l(n, 32, 0, "outline"), l(n, 41, 0, ""), l(n, 48, 0, e.recycleQuantityControl), l(n, 51, 0, t["\u0275unv"](n, 51, 0, t["\u0275nov"](n, 52).transform("IN_LITERS_PLACEHOLDER")), "number"), l(n, 55, 0, e.recycleQuantityControl.invalid && e.recycleQuantityControl.errors.required), l(n, 57, 0, e.recycleQuantityControl.invalid && (e.recycleQuantityControl.errors.min || e.recycleQuantityControl.errors.max)), l(n, 59, 0, "outline"), l(n, 68, 0, !e.pickup.value), l(n, 70, 0, e.pickup.value), l(n, 74, 0, e.recycleAddressControl), l(n, 77, 0, "text"), l(n, 80, 0, e.recycleAddressControl.invalid && e.recycleAddressControl.errors.required), l(n, 82, 0, e.recycleAddressControl.invalid && (e.recycleAddressControl.errors.minlength || e.recycleAddressControl.errors.maxlength)), l(n, 84, 0, e.pickup.value && e.recycleQuantityControl.value > 100), l(n, 86, 0, e.recycleQuantityControl.value > 100), l(n, 88, 0, e.recycleAddressControl.invalid || e.recycleQuantityControl.invalid || e.pickUpDateControl.invalid, "primary"), l(n, 93, 0, "column"), l(n, 94, 0, "20px"), l(n, 95, 0, "center"), l(n, 97, 0, ""), l(n, 100, 0, "row"), l(n, 101, 0, "20px"), l(n, 111, 0, "row"), l(n, 112, 0, "20px")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 10, 1, ["standard" == t["\u0275nov"](n, 11).appearance, "fill" == t["\u0275nov"](n, 11).appearance, "outline" == t["\u0275nov"](n, 11).appearance, "legacy" == t["\u0275nov"](n, 11).appearance, t["\u0275nov"](n, 11)._control.errorState, t["\u0275nov"](n, 11)._canLabelFloat, t["\u0275nov"](n, 11)._shouldLabelFloat(), t["\u0275nov"](n, 11)._hideControlPlaceholder(), t["\u0275nov"](n, 11)._control.disabled, t["\u0275nov"](n, 11)._control.autofilled, t["\u0275nov"](n, 11)._control.focused, "accent" == t["\u0275nov"](n, 11).color, "warn" == t["\u0275nov"](n, 11).color, t["\u0275nov"](n, 11)._shouldForward("untouched"), t["\u0275nov"](n, 11)._shouldForward("touched"), t["\u0275nov"](n, 11)._shouldForward("pristine"), t["\u0275nov"](n, 11)._shouldForward("dirty"), t["\u0275nov"](n, 11)._shouldForward("valid"), t["\u0275nov"](n, 11)._shouldForward("invalid"), t["\u0275nov"](n, 11)._shouldForward("pending"), !t["\u0275nov"](n, 11)._animationsEnabled]), l(n, 23, 1, [t["\u0275nov"](n, 28).ngClassUntouched, t["\u0275nov"](n, 28).ngClassTouched, t["\u0275nov"](n, 28).ngClassPristine, t["\u0275nov"](n, 28).ngClassDirty, t["\u0275nov"](n, 28).ngClassValid, t["\u0275nov"](n, 28).ngClassInvalid, t["\u0275nov"](n, 28).ngClassPending, t["\u0275nov"](n, 29)._isServer, t["\u0275nov"](n, 29).id, t["\u0275nov"](n, 29).placeholder, t["\u0275nov"](n, 29).disabled, t["\u0275nov"](n, 29).required, t["\u0275nov"](n, 29).readonly && !t["\u0275nov"](n, 29)._isNativeSelect || null, t["\u0275nov"](n, 29)._ariaDescribedby || null, t["\u0275nov"](n, 29).errorState, t["\u0275nov"](n, 29).required.toString()]), l(n, 31, 1, ["standard" == t["\u0275nov"](n, 32).appearance, "fill" == t["\u0275nov"](n, 32).appearance, "outline" == t["\u0275nov"](n, 32).appearance, "legacy" == t["\u0275nov"](n, 32).appearance, t["\u0275nov"](n, 32)._control.errorState, t["\u0275nov"](n, 32)._canLabelFloat, t["\u0275nov"](n, 32)._shouldLabelFloat(), t["\u0275nov"](n, 32)._hideControlPlaceholder(), t["\u0275nov"](n, 32)._control.disabled, t["\u0275nov"](n, 32)._control.autofilled, t["\u0275nov"](n, 32)._control.focused, "accent" == t["\u0275nov"](n, 32).color, "warn" == t["\u0275nov"](n, 32).color, t["\u0275nov"](n, 32)._shouldForward("untouched"), t["\u0275nov"](n, 32)._shouldForward("touched"), t["\u0275nov"](n, 32)._shouldForward("pristine"), t["\u0275nov"](n, 32)._shouldForward("dirty"), t["\u0275nov"](n, 32)._shouldForward("valid"), t["\u0275nov"](n, 32)._shouldForward("invalid"), t["\u0275nov"](n, 32)._shouldForward("pending"), !t["\u0275nov"](n, 32)._animationsEnabled]), l(n, 44, 1, [t["\u0275nov"](n, 50).ngClassUntouched, t["\u0275nov"](n, 50).ngClassTouched, t["\u0275nov"](n, 50).ngClassPristine, t["\u0275nov"](n, 50).ngClassDirty, t["\u0275nov"](n, 50).ngClassValid, t["\u0275nov"](n, 50).ngClassInvalid, t["\u0275nov"](n, 50).ngClassPending, t["\u0275nov"](n, 51)._isServer, t["\u0275nov"](n, 51).id, t["\u0275nov"](n, 51).placeholder, t["\u0275nov"](n, 51).disabled, t["\u0275nov"](n, 51).required, t["\u0275nov"](n, 51).readonly && !t["\u0275nov"](n, 51)._isNativeSelect || null, t["\u0275nov"](n, 51)._ariaDescribedby || null, t["\u0275nov"](n, 51).errorState, t["\u0275nov"](n, 51).required.toString()]), l(n, 58, 1, ["standard" == t["\u0275nov"](n, 59).appearance, "fill" == t["\u0275nov"](n, 59).appearance, "outline" == t["\u0275nov"](n, 59).appearance, "legacy" == t["\u0275nov"](n, 59).appearance, t["\u0275nov"](n, 59)._control.errorState, t["\u0275nov"](n, 59)._canLabelFloat, t["\u0275nov"](n, 59)._shouldLabelFloat(), t["\u0275nov"](n, 59)._hideControlPlaceholder(), t["\u0275nov"](n, 59)._control.disabled, t["\u0275nov"](n, 59)._control.autofilled, t["\u0275nov"](n, 59)._control.focused, "accent" == t["\u0275nov"](n, 59).color, "warn" == t["\u0275nov"](n, 59).color, t["\u0275nov"](n, 59)._shouldForward("untouched"), t["\u0275nov"](n, 59)._shouldForward("touched"), t["\u0275nov"](n, 59)._shouldForward("pristine"), t["\u0275nov"](n, 59)._shouldForward("dirty"), t["\u0275nov"](n, 59)._shouldForward("valid"), t["\u0275nov"](n, 59)._shouldForward("invalid"), t["\u0275nov"](n, 59)._shouldForward("pending"), !t["\u0275nov"](n, 59)._animationsEnabled]), l(n, 71, 1, [t["\u0275nov"](n, 76).ngClassUntouched, t["\u0275nov"](n, 76).ngClassTouched, t["\u0275nov"](n, 76).ngClassPristine, t["\u0275nov"](n, 76).ngClassDirty, t["\u0275nov"](n, 76).ngClassValid, t["\u0275nov"](n, 76).ngClassInvalid, t["\u0275nov"](n, 76).ngClassPending, t["\u0275nov"](n, 77)._isServer, t["\u0275nov"](n, 77).id, t["\u0275nov"](n, 77).placeholder, t["\u0275nov"](n, 77).disabled, t["\u0275nov"](n, 77).required, t["\u0275nov"](n, 77).readonly && !t["\u0275nov"](n, 77)._isNativeSelect || null, t["\u0275nov"](n, 77)._ariaDescribedby || null, t["\u0275nov"](n, 77).errorState, t["\u0275nov"](n, 77).required.toString()]), l(n, 87, 0, t["\u0275nov"](n, 88).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 88)._animationMode), l(n, 90, 0, t["\u0275unv"](n, 90, 0, t["\u0275nov"](n, 91).transform("BTN_SUBMIT"))), l(n, 103, 0, e.topImage), l(n, 114, 0, e.bottomImage)
                })
            }

            function Qe(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-recycle", [], null, null, null, Ye, Pe)), t["\u0275did"](1, 114688, null, 0, qe, [j, N, d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Ge = t["\u0275ccf"]("app-recycle", qe, Qe, {}, {}, []),
                We = e("MlvX"),
                Ke = e("Azqq"),
                Xe = e("uGex"),
                Je = e("qAlS"),
                lt = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/SecurityAnswers"
                    }
                    return l.prototype.save = function(l) {
                        return this.http.post(this.host + "/", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.X, P.l), q.a.watch();
            var nt = function() {
                    function l(l, n, e, t) {
                        this.securityQuestionService = l, this.userService = n, this.securityAnswerService = e, this.router = t, this.emailControl = new T.e("", [T.o.required, T.o.email]), this.passwordControl = new T.e("", [T.o.required, T.o.minLength(5), T.o.maxLength(20)]), this.repeatPasswordControl = new T.e("", [T.o.required]), this.securityQuestionControl = new T.e("", [T.o.required]), this.securityAnswerControl = new T.e("", [T.o.required])
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.securityQuestionService.find(null).subscribe(function(n) {
                            l.securityQuestions = n
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.save = function() {
                        var l = this,
                            n = {
                                email: this.emailControl.value,
                                password: this.passwordControl.value,
                                passwordRepeat: this.repeatPasswordControl.value,
                                securityQuestion: this.securityQuestions.find(function(n) {
                                    return n.id === l.securityQuestionControl.value
                                }),
                                securityAnswer: this.securityAnswerControl.value
                            };
                        this.userService.save(n).subscribe(function(n) {
                            l.securityAnswerService.save({
                                UserId: n.id,
                                answer: l.securityAnswerControl.value,
                                SecurityQuestionId: l.securityQuestionControl.value
                            }).subscribe(function() {
                                l.router.navigate(["/login"])
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l
                }(),
                et = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%], .security-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}  mat-option .mat-option-text{font-size:14px}"]
                    ],
                    data: {}
                });

            function tt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function ut(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_EMAIL"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function ot(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_PASSWORD"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function at(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"],
                    translateParams: [1, "translateParams"]
                }, null), t["\u0275pod"](2, {
                    length: 0
                }), t["\u0275did"](3, 16384, [
                    [11, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["INVALID_PASSWORD_LENGTH"]))], function(l, n) {
                    var e = l(n, 2, 0, "5-20");
                    l(n, 1, 0, "", e)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).id)
                })
            }

            function it(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [18, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_PASSWORD_REPEAT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function rt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-option", [
                    ["class", "mat-option"],
                    ["role", "option"]
                ], [
                    [1, "tabindex", 0],
                    [2, "mat-selected", null],
                    [2, "mat-option-multiple", null],
                    [2, "mat-active", null],
                    [8, "id", 0],
                    [1, "aria-selected", 0],
                    [1, "aria-disabled", 0],
                    [2, "mat-option-disabled", null]
                ], [
                    [null, "click"],
                    [null, "keydown"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1)._selectViaInteraction() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleKeydown(e) && u), u
                }, We.b, We.a)), t["\u0275did"](1, 8568832, [
                    [29, 4]
                ], 0, Wl.p, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.j],
                    [2, Wl.o]
                ], {
                    value: [0, "value"]
                }, null), (l()(), t["\u0275ted"](2, 0, [" ", " "]))], function(l, n) {
                    l(n, 1, 0, n.context.$implicit.id)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1)._getTabIndex(), t["\u0275nov"](n, 1).selected, t["\u0275nov"](n, 1).multiple, t["\u0275nov"](n, 1).active, t["\u0275nov"](n, 1).id, t["\u0275nov"](n, 1).selected.toString(), t["\u0275nov"](n, 1).disabled.toString(), t["\u0275nov"](n, 1).disabled), l(n, 2, 0, n.context.$implicit.question)
                })
            }

            function dt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [25, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_SECURITY_QUESTION"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function st(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [35, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_SECURITY_ANSWER"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function ct(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 137, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 135, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_REGISTRATION"])), (l()(), t["\u0275eld"](7, 0, null, 0, 125, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](9, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](17, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](18, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](19, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EMAIL"])), (l()(), t["\u0275eld"](21, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 22)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 22).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 22)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 22)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 27)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 27)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 27)._onInput() && u), u
                }, null, null)), t["\u0275did"](22, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](24, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](26, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](27, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, tt)), t["\u0275did"](30, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, ut)), t["\u0275did"](32, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](33, 0, null, null, 24, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](34, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 8, {
                    _control: 0
                }), t["\u0275qud"](335544320, 9, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 10, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 11, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 13, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 14, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](42, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](43, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](44, 16384, [
                    [10, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PASSWORD"])), (l()(), t["\u0275eld"](46, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 47)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 47).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 47)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 47)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 52)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 52)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 52)._onInput() && u), u
                }, null, null)), t["\u0275did"](47, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](49, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](51, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](52, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, ot)), t["\u0275did"](55, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, at)), t["\u0275did"](57, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](58, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](59, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 15, {
                    _control: 0
                }), t["\u0275qud"](335544320, 16, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 17, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 18, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 19, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](67, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](68, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](69, 16384, [
                    [17, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PASSWORD_REPEAT"])), (l()(), t["\u0275eld"](71, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "password"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 72)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 72).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 72)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 72)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 77)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 77)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 77)._onInput() && u), u
                }, null, null)), t["\u0275did"](72, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](74, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](76, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](77, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    type: [0, "type"]
                }, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, it)), t["\u0275did"](80, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](81, 0, null, null, 51, "div", [
                    ["class", "security-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](82, 0, null, null, 30, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](83, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 22, {
                    _control: 0
                }), t["\u0275qud"](335544320, 23, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 24, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 25, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 26, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 27, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 28, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](91, 0, null, 3, 7, "mat-label", [], null, null, null, null, null)), t["\u0275did"](92, 16384, [
                    [24, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](93, null, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](95, 0, null, null, 0, "i", [
                    ["class", "fas fa-exclamation-circle"],
                    ["style", "margin-left:10px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](96, 0, null, null, 2, "em", [
                    ["style", "margin-left:5px;"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](97, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["CANNOT_BE_CHANGED_LATER"])), (l()(), t["\u0275eld"](99, 0, null, 1, 11, "mat-select", [
                    ["class", "mat-select"],
                    ["name", "securityQuestion"],
                    ["placeholder", ""],
                    ["role", "listbox"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [1, "id", 0],
                    [1, "tabindex", 0],
                    [1, "aria-label", 0],
                    [1, "aria-labelledby", 0],
                    [1, "aria-required", 0],
                    [1, "aria-disabled", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-owns", 0],
                    [1, "aria-multiselectable", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-activedescendant", 0],
                    [2, "mat-select-disabled", null],
                    [2, "mat-select-invalid", null],
                    [2, "mat-select-required", null],
                    [2, "mat-select-empty", null]
                ], [
                    [null, "valueChange"],
                    [null, "keydown"],
                    [null, "focus"],
                    [null, "blur"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "keydown" === n && (u = !1 !== t["\u0275nov"](l, 104)._handleKeydown(e) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 104)._onFocus() && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 104)._onBlur() && u), "valueChange" === n && (u = !1 !== (o.selected = e) && u), u
                }, Ke.b, Ke.a)), t["\u0275prd"](6144, null, Wl.j, null, [Xe.c]), t["\u0275did"](101, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [8, null],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](103, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](104, 2080768, null, 3, Xe.c, [Je.e, t.ChangeDetectorRef, t.NgZone, Wl.b, t.ElementRef, [2, A.b],
                    [2, T.m],
                    [2, T.g],
                    [2, Vl.c],
                    [6, T.k],
                    [8, null], Xe.a
                ], {
                    placeholder: [0, "placeholder"],
                    value: [1, "value"]
                }, {
                    valueChange: "valueChange"
                }), t["\u0275qud"](603979776, 29, {
                    options: 1
                }), t["\u0275qud"](603979776, 30, {
                    optionGroups: 1
                }), t["\u0275qud"](335544320, 31, {
                    customTrigger: 0
                }), t["\u0275prd"](2048, [
                    [22, 4]
                ], Vl.d, null, [Xe.c]), (l()(), t["\u0275and"](16777216, null, 1, 1, null, rt)), t["\u0275did"](110, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 5, 1, null, dt)), t["\u0275did"](112, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](113, 0, null, null, 19, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](114, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 32, {
                    _control: 0
                }), t["\u0275qud"](335544320, 33, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 34, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 35, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 36, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 37, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 38, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](122, 0, null, 1, 8, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 123)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 123).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 123)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 123)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 128)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 128)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 128)._onInput() && u), u
                }, null, null)), t["\u0275did"](123, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](125, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](127, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](128, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    placeholder: [0, "placeholder"],
                    type: [1, "type"]
                }, null), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), t["\u0275prd"](2048, [
                    [32, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, st)), t["\u0275did"](132, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](133, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["mat-raised-button", ""],
                    ["style", "margin-top:1px;"],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.save() && t), t
                }, R.b, R.a)), t["\u0275did"](134, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](135, 0, null, 0, 0, "i", [
                    ["class", "fas fa-user-plus fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](136, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 5, 0, ""), l(n, 9, 0, "outline"), l(n, 18, 0, ""), l(n, 24, 0, e.emailControl), l(n, 27, 0, "text"), l(n, 30, 0, e.emailControl.invalid && e.emailControl.errors.required), l(n, 32, 0, e.emailControl.invalid && e.emailControl.errors.email), l(n, 34, 0, "outline"), l(n, 43, 0, ""), l(n, 49, 0, e.passwordControl), l(n, 52, 0, "password"), l(n, 55, 0, e.passwordControl.invalid && e.passwordControl.errors.required), l(n, 57, 0, e.passwordControl.invalid && (e.passwordControl.errors.minlength || e.passwordControl.errors.maxlength)), l(n, 59, 0, "outline"), l(n, 68, 0, ""), l(n, 74, 0, e.repeatPasswordControl), l(n, 77, 0, "password"), l(n, 80, 0, e.repeatPasswordControl.invalid && e.repeatPasswordControl.errors.required), l(n, 97, 0, ""), l(n, 101, 0, e.securityQuestionControl), l(n, 104, 0, "", e.selected), l(n, 110, 0, e.securityQuestions), l(n, 112, 0, e.securityQuestionControl.invalid && e.securityQuestionControl.errors.required), l(n, 114, 0, "outline"), l(n, 125, 0, e.securityAnswerControl), l(n, 128, 0, t["\u0275unv"](n, 128, 0, t["\u0275nov"](n, 129).transform("SECURITY_ANSWER_PLACEHOLDER")), "text"), l(n, 132, 0, e.securityAnswerControl.invalid && e.securityAnswerControl.errors.required), l(n, 134, 0, e.emailControl.invalid || e.passwordControl.invalid || e.repeatPasswordControl.invalid || e.securityQuestionControl.invalid || e.securityAnswerControl.invalid, "primary")
                }, function(l, n) {
                    l(n, 8, 1, ["standard" == t["\u0275nov"](n, 9).appearance, "fill" == t["\u0275nov"](n, 9).appearance, "outline" == t["\u0275nov"](n, 9).appearance, "legacy" == t["\u0275nov"](n, 9).appearance, t["\u0275nov"](n, 9)._control.errorState, t["\u0275nov"](n, 9)._canLabelFloat, t["\u0275nov"](n, 9)._shouldLabelFloat(), t["\u0275nov"](n, 9)._hideControlPlaceholder(), t["\u0275nov"](n, 9)._control.disabled, t["\u0275nov"](n, 9)._control.autofilled, t["\u0275nov"](n, 9)._control.focused, "accent" == t["\u0275nov"](n, 9).color, "warn" == t["\u0275nov"](n, 9).color, t["\u0275nov"](n, 9)._shouldForward("untouched"), t["\u0275nov"](n, 9)._shouldForward("touched"), t["\u0275nov"](n, 9)._shouldForward("pristine"), t["\u0275nov"](n, 9)._shouldForward("dirty"), t["\u0275nov"](n, 9)._shouldForward("valid"), t["\u0275nov"](n, 9)._shouldForward("invalid"), t["\u0275nov"](n, 9)._shouldForward("pending"), !t["\u0275nov"](n, 9)._animationsEnabled]), l(n, 21, 1, [t["\u0275nov"](n, 26).ngClassUntouched, t["\u0275nov"](n, 26).ngClassTouched, t["\u0275nov"](n, 26).ngClassPristine, t["\u0275nov"](n, 26).ngClassDirty, t["\u0275nov"](n, 26).ngClassValid, t["\u0275nov"](n, 26).ngClassInvalid, t["\u0275nov"](n, 26).ngClassPending, t["\u0275nov"](n, 27)._isServer, t["\u0275nov"](n, 27).id, t["\u0275nov"](n, 27).placeholder, t["\u0275nov"](n, 27).disabled, t["\u0275nov"](n, 27).required, t["\u0275nov"](n, 27).readonly && !t["\u0275nov"](n, 27)._isNativeSelect || null, t["\u0275nov"](n, 27)._ariaDescribedby || null, t["\u0275nov"](n, 27).errorState, t["\u0275nov"](n, 27).required.toString()]), l(n, 33, 1, ["standard" == t["\u0275nov"](n, 34).appearance, "fill" == t["\u0275nov"](n, 34).appearance, "outline" == t["\u0275nov"](n, 34).appearance, "legacy" == t["\u0275nov"](n, 34).appearance, t["\u0275nov"](n, 34)._control.errorState, t["\u0275nov"](n, 34)._canLabelFloat, t["\u0275nov"](n, 34)._shouldLabelFloat(), t["\u0275nov"](n, 34)._hideControlPlaceholder(), t["\u0275nov"](n, 34)._control.disabled, t["\u0275nov"](n, 34)._control.autofilled, t["\u0275nov"](n, 34)._control.focused, "accent" == t["\u0275nov"](n, 34).color, "warn" == t["\u0275nov"](n, 34).color, t["\u0275nov"](n, 34)._shouldForward("untouched"), t["\u0275nov"](n, 34)._shouldForward("touched"), t["\u0275nov"](n, 34)._shouldForward("pristine"), t["\u0275nov"](n, 34)._shouldForward("dirty"), t["\u0275nov"](n, 34)._shouldForward("valid"), t["\u0275nov"](n, 34)._shouldForward("invalid"), t["\u0275nov"](n, 34)._shouldForward("pending"), !t["\u0275nov"](n, 34)._animationsEnabled]), l(n, 46, 1, [t["\u0275nov"](n, 51).ngClassUntouched, t["\u0275nov"](n, 51).ngClassTouched, t["\u0275nov"](n, 51).ngClassPristine, t["\u0275nov"](n, 51).ngClassDirty, t["\u0275nov"](n, 51).ngClassValid, t["\u0275nov"](n, 51).ngClassInvalid, t["\u0275nov"](n, 51).ngClassPending, t["\u0275nov"](n, 52)._isServer, t["\u0275nov"](n, 52).id, t["\u0275nov"](n, 52).placeholder, t["\u0275nov"](n, 52).disabled, t["\u0275nov"](n, 52).required, t["\u0275nov"](n, 52).readonly && !t["\u0275nov"](n, 52)._isNativeSelect || null, t["\u0275nov"](n, 52)._ariaDescribedby || null, t["\u0275nov"](n, 52).errorState, t["\u0275nov"](n, 52).required.toString()]), l(n, 58, 1, ["standard" == t["\u0275nov"](n, 59).appearance, "fill" == t["\u0275nov"](n, 59).appearance, "outline" == t["\u0275nov"](n, 59).appearance, "legacy" == t["\u0275nov"](n, 59).appearance, t["\u0275nov"](n, 59)._control.errorState, t["\u0275nov"](n, 59)._canLabelFloat, t["\u0275nov"](n, 59)._shouldLabelFloat(), t["\u0275nov"](n, 59)._hideControlPlaceholder(), t["\u0275nov"](n, 59)._control.disabled, t["\u0275nov"](n, 59)._control.autofilled, t["\u0275nov"](n, 59)._control.focused, "accent" == t["\u0275nov"](n, 59).color, "warn" == t["\u0275nov"](n, 59).color, t["\u0275nov"](n, 59)._shouldForward("untouched"), t["\u0275nov"](n, 59)._shouldForward("touched"), t["\u0275nov"](n, 59)._shouldForward("pristine"), t["\u0275nov"](n, 59)._shouldForward("dirty"), t["\u0275nov"](n, 59)._shouldForward("valid"), t["\u0275nov"](n, 59)._shouldForward("invalid"), t["\u0275nov"](n, 59)._shouldForward("pending"), !t["\u0275nov"](n, 59)._animationsEnabled]), l(n, 71, 1, [t["\u0275nov"](n, 76).ngClassUntouched, t["\u0275nov"](n, 76).ngClassTouched, t["\u0275nov"](n, 76).ngClassPristine, t["\u0275nov"](n, 76).ngClassDirty, t["\u0275nov"](n, 76).ngClassValid, t["\u0275nov"](n, 76).ngClassInvalid, t["\u0275nov"](n, 76).ngClassPending, t["\u0275nov"](n, 77)._isServer, t["\u0275nov"](n, 77).id, t["\u0275nov"](n, 77).placeholder, t["\u0275nov"](n, 77).disabled, t["\u0275nov"](n, 77).required, t["\u0275nov"](n, 77).readonly && !t["\u0275nov"](n, 77)._isNativeSelect || null, t["\u0275nov"](n, 77)._ariaDescribedby || null, t["\u0275nov"](n, 77).errorState, t["\u0275nov"](n, 77).required.toString()]), l(n, 82, 1, ["standard" == t["\u0275nov"](n, 83).appearance, "fill" == t["\u0275nov"](n, 83).appearance, "outline" == t["\u0275nov"](n, 83).appearance, "legacy" == t["\u0275nov"](n, 83).appearance, t["\u0275nov"](n, 83)._control.errorState, t["\u0275nov"](n, 83)._canLabelFloat, t["\u0275nov"](n, 83)._shouldLabelFloat(), t["\u0275nov"](n, 83)._hideControlPlaceholder(), t["\u0275nov"](n, 83)._control.disabled, t["\u0275nov"](n, 83)._control.autofilled, t["\u0275nov"](n, 83)._control.focused, "accent" == t["\u0275nov"](n, 83).color, "warn" == t["\u0275nov"](n, 83).color, t["\u0275nov"](n, 83)._shouldForward("untouched"), t["\u0275nov"](n, 83)._shouldForward("touched"), t["\u0275nov"](n, 83)._shouldForward("pristine"), t["\u0275nov"](n, 83)._shouldForward("dirty"), t["\u0275nov"](n, 83)._shouldForward("valid"), t["\u0275nov"](n, 83)._shouldForward("invalid"), t["\u0275nov"](n, 83)._shouldForward("pending"), !t["\u0275nov"](n, 83)._animationsEnabled]), l(n, 93, 0, t["\u0275unv"](n, 93, 0, t["\u0275nov"](n, 94).transform("LABEL_SECURITY_QUESTION"))), l(n, 99, 1, [t["\u0275nov"](n, 103).ngClassUntouched, t["\u0275nov"](n, 103).ngClassTouched, t["\u0275nov"](n, 103).ngClassPristine, t["\u0275nov"](n, 103).ngClassDirty, t["\u0275nov"](n, 103).ngClassValid, t["\u0275nov"](n, 103).ngClassInvalid, t["\u0275nov"](n, 103).ngClassPending, t["\u0275nov"](n, 104).id, t["\u0275nov"](n, 104).tabIndex, t["\u0275nov"](n, 104)._getAriaLabel(), t["\u0275nov"](n, 104)._getAriaLabelledby(), t["\u0275nov"](n, 104).required.toString(), t["\u0275nov"](n, 104).disabled.toString(), t["\u0275nov"](n, 104).errorState, t["\u0275nov"](n, 104).panelOpen ? t["\u0275nov"](n, 104)._optionIds : null, t["\u0275nov"](n, 104).multiple, t["\u0275nov"](n, 104)._ariaDescribedby || null, t["\u0275nov"](n, 104)._getAriaActiveDescendant(), t["\u0275nov"](n, 104).disabled, t["\u0275nov"](n, 104).errorState, t["\u0275nov"](n, 104).required, t["\u0275nov"](n, 104).empty]), l(n, 113, 1, ["standard" == t["\u0275nov"](n, 114).appearance, "fill" == t["\u0275nov"](n, 114).appearance, "outline" == t["\u0275nov"](n, 114).appearance, "legacy" == t["\u0275nov"](n, 114).appearance, t["\u0275nov"](n, 114)._control.errorState, t["\u0275nov"](n, 114)._canLabelFloat, t["\u0275nov"](n, 114)._shouldLabelFloat(), t["\u0275nov"](n, 114)._hideControlPlaceholder(), t["\u0275nov"](n, 114)._control.disabled, t["\u0275nov"](n, 114)._control.autofilled, t["\u0275nov"](n, 114)._control.focused, "accent" == t["\u0275nov"](n, 114).color, "warn" == t["\u0275nov"](n, 114).color, t["\u0275nov"](n, 114)._shouldForward("untouched"), t["\u0275nov"](n, 114)._shouldForward("touched"), t["\u0275nov"](n, 114)._shouldForward("pristine"), t["\u0275nov"](n, 114)._shouldForward("dirty"), t["\u0275nov"](n, 114)._shouldForward("valid"), t["\u0275nov"](n, 114)._shouldForward("invalid"), t["\u0275nov"](n, 114)._shouldForward("pending"), !t["\u0275nov"](n, 114)._animationsEnabled]), l(n, 122, 1, [t["\u0275nov"](n, 127).ngClassUntouched, t["\u0275nov"](n, 127).ngClassTouched, t["\u0275nov"](n, 127).ngClassPristine, t["\u0275nov"](n, 127).ngClassDirty, t["\u0275nov"](n, 127).ngClassValid, t["\u0275nov"](n, 127).ngClassInvalid, t["\u0275nov"](n, 127).ngClassPending, t["\u0275nov"](n, 128)._isServer, t["\u0275nov"](n, 128).id, t["\u0275nov"](n, 128).placeholder, t["\u0275nov"](n, 128).disabled, t["\u0275nov"](n, 128).required, t["\u0275nov"](n, 128).readonly && !t["\u0275nov"](n, 128)._isNativeSelect || null, t["\u0275nov"](n, 128)._ariaDescribedby || null, t["\u0275nov"](n, 128).errorState, t["\u0275nov"](n, 128).required.toString()]), l(n, 133, 0, t["\u0275nov"](n, 134).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 134)._animationMode), l(n, 136, 0, t["\u0275unv"](n, 136, 0, t["\u0275nov"](n, 137).transform("BTN_REGISTER")))
                })
            }

            function ft(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-register", [], null, null, null, ct, et)), t["\u0275did"](1, 114688, null, 0, nt, [Ce, N, lt, ie.k], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var pt = t["\u0275ccf"]("app-register", nt, ft, {}, {}, []),
                mt = e("TtEo"),
                ht = e("LC5p"),
                vt = e("b1+6"),
                gt = e("4epT"),
                bt = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/rest/product"
                    }
                    return l.prototype.get = function(l) {
                        return this.http.get(this.host + "/" + l + "/reviews").pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.create = function(l, n) {
                        return this.http.put(this.host + "/" + l + "/reviews", n).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.patch = function(l) {
                        return this.http.patch(this.host + "/reviews", l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.like = function(l) {
                        return this.http.post(this.host + "/reviews", {
                            id: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.A, P.b), q.a.watch();
            var _t = function() {
                function l(l, n, e) {
                    this.data = l, this.productReviewService = n, this.dialogRef = e, this.editReviewControl = new T.e("", [T.o.required, T.o.maxLength(160)])
                }
                return l.prototype.ngOnInit = function() {
                    this.data = this.data.reviewData, this.editReviewControl.setValue(this.data.message)
                }, l.prototype.editReview = function() {
                    var l = this;
                    this.productReviewService.patch({
                        id: this.data._id,
                        message: this.editReviewControl.value
                    }).subscribe(function() {
                        l.dialogRef.close()
                    }, function(n) {
                        console.log(n), l.error = n
                    })
                }, l
            }();
            q.b.add(P.A, P.b, P.W, P.M), q.a.watch();
            var Ct = function() {
                    function l(l, n, e, t) {
                        this.dialog = l, this.data = n, this.productReviewService = e, this.userService = t, this.reviewControl = new T.e("", [T.o.maxLength(160)])
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.data = this.data.productData, this.reviews$ = this.productReviewService.get(this.data.id), this.userSubscription = this.userService.whoAmI().subscribe(function(n) {
                            l.author = n && n.email ? n.email : "Anonymous"
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.ngOnDestroy = function() {
                        this.userSubscription && this.userSubscription.unsubscribe()
                    }, l.prototype.addReview = function(l) {
                        var n = this,
                            e = {
                                message: l.value,
                                author: this.author
                            };
                        l.value = "", this.productReviewService.create(this.data.id, e).subscribe(function() {
                            n.reviews$ = n.productReviewService.get(n.data.id)
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.editReview = function(l) {
                        var n = this;
                        this.dialog.open(_t, {
                            width: "600px",
                            height: "max-content",
                            data: {
                                reviewData: l
                            }
                        }).afterClosed().subscribe(function() {
                            return n.reviews$ = n.productReviewService.get(n.data.id)
                        })
                    }, l.prototype.likeReview = function(l) {
                        var n = this;
                        this.productReviewService.like(l._id).subscribe(function() {
                            console.log("Liked " + l._id)
                        }), setTimeout(function() {
                            return n.reviews$ = n.productReviewService.get(n.data.id)
                        }, 200)
                    }, l.prototype.isLoggedIn = function() {
                        return localStorage.getItem("token")
                    }, l
                }(),
                Rt = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Products"
                    }
                    return l.prototype.search = function(l) {
                        return this.http.get(this.hostServer + "/rest/product/search?q=" + l).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.find = function(l) {
                        return this.http.get(this.host + "/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.get = function(l) {
                        return this.http.get(this.host + "/" + l + "?d=" + encodeURIComponent((new Date).toDateString())).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                yt = e("gFX4"),
                wt = function() {
                    function l(l) {
                        var n = this;
                        this.ngZone = l, this.io = yt, this.ngZone.runOutsideAngular(function() {
                            n._socket = n.io.connect(u.hostServer)
                        })
                    }
                    return l.prototype.socket = function() {
                        return this._socket
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(t.NgZone))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.m, P.f), q.a.watch();
            var Et = function() {
                    function l(l, n, e, t, u, o, a, i, r) {
                        this.dialog = l, this.productService = n, this.basketService = e, this.translateService = t, this.router = u, this.route = o, this.sanitizer = a, this.ngZone = i, this.io = r, this.displayedColumns = ["Image", "Product", "Description", "Price", "Select"], this.confirmation = void 0
                    }
                    return l.prototype.ngAfterViewInit = function() {
                        var l = this;
                        this.productSubscription = this.productService.search("").subscribe(function(n) {
                            l.tableData = n, l.trustProductDescription(l.tableData), l.dataSource = new g.l(l.tableData), l.dataSource.paginator = l.paginator, l.filterTable(), l.routerSubscription = l.router.events.subscribe(function() {
                                l.filterTable()
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.ngOnDestroy = function() {
                        this.routerSubscription && this.routerSubscription.unsubscribe(), this.productSubscription && this.productSubscription.unsubscribe()
                    }, l.prototype.filterTable = function() {
                        var l = this,
                            n = this.route.snapshot.queryParams.q;
                        n && n.includes('<iframe src="javascript:alert(`xss`)">') && this.ngZone.runOutsideAngular(function() {
                            l.io.socket().emit("localXSSChallengeSolved", n)
                        }), n ? (n = n.trim(), this.dataSource.filter = n.toLowerCase(), this.searchValue = this.sanitizer.bypassSecurityTrustHtml(n)) : (this.dataSource.filter = "", this.searchValue = void 0)
                    }, l.prototype.showDetail = function(l) {
                        this.dialog.open(Ct, {
                            width: "500px",
                            height: "max-content",
                            data: {
                                productData: l
                            }
                        })
                    }, l.prototype.addToBasket = function(l) {
                        var n = this;
                        this.basketService.find(sessionStorage.getItem("bid")).subscribe(function(e) {
                            for (var t = e.Products, u = !1, o = 0; o < t.length; o++)
                                if (t[o].id === l) {
                                    u = !0, n.basketService.get(t[o].BasketItem.id).subscribe(function(l) {
                                        n.basketService.put(l.id, {
                                            quantity: l.quantity + 1
                                        }).subscribe(function(l) {
                                            n.productService.get(l.ProductId).subscribe(function(l) {
                                                n.translateService.get("BASKET_ADD_SAME_PRODUCT", {
                                                    product: l.name
                                                }).subscribe(function(l) {
                                                    n.confirmation = l
                                                }, function(l) {
                                                    n.confirmation = l
                                                })
                                            }, function(l) {
                                                return console.log(l)
                                            })
                                        }, function(l) {
                                            return console.log(l)
                                        })
                                    }, function(l) {
                                        return console.log(l)
                                    });
                                    break
                                } u || n.basketService.save({
                                ProductId: l,
                                BasketId: sessionStorage.getItem("bid"),
                                quantity: 1
                            }).subscribe(function(l) {
                                n.productService.get(l.ProductId).subscribe(function(l) {
                                    n.translateService.get("BASKET_ADD_PRODUCT", {
                                        product: l.name
                                    }).subscribe(function(l) {
                                        n.confirmation = l
                                    }, function(l) {
                                        n.confirmation = l
                                    })
                                }, function(l) {
                                    return console.log(l)
                                })
                            }, function(l) {
                                return console.log(l)
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.trustProductDescription = function(l) {
                        for (var n = 0; n < l.length; n++) l[n].description = this.sanitizer.bypassSecurityTrustHtml(l[n].description)
                    }, l.prototype.isLoggedIn = function() {
                        return localStorage.getItem("token")
                    }, l
                }(),
                kt = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".table-container[_ngcontent-%COMP%]{min-width:350px;width:75%}.heading[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);justify-content:center;padding:12px 20px}.img-thumbnail[_ngcontent-%COMP%]{cursor:pointer;height:auto;max-width:70%;width:70px}"]
                    ],
                    data: {}
                });

            function It(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 2, "span", [], null, null, null, null, null)), (l()(), t["\u0275ted"](2, null, ["", " - "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](4, 0, null, null, 0, "span", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null))], null, function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, t["\u0275unv"](n, 2, 0, t["\u0275nov"](n, 3).transform("TITLE_SEARCH_RESULTS"))), l(n, 4, 0, e.searchValue)
                })
            }

            function St(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], null, function(l, n) {
                    l(n, 1, 0, t["\u0275unv"](n, 1, 0, t["\u0275nov"](n, 2).transform("TITLE_ALL_PRODUCTS")))
                })
            }

            function Tt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "div", [
                    ["style", "margin-top:5px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 1, "p", [
                    ["class", "confirmation"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](2, null, ["", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.component.confirmation)
                })
            }

            function Dt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "noshrink"],
                    ["role", "columnheader"],
                    ["translate", "LABEL_IMAGE"]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], function(l, n) {
                    l(n, 1, 0, "LABEL_IMAGE"), l(n, 2, 0, "noshrink")
                }, null)
            }

            function xt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "noshrink"],
                    ["role", "gridcell"]
                ], null, [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showDetail(l.context.$implicit) && t), t
                }, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](3, 0, null, null, 0, "img", [
                    ["class", "img-responsive img-thumbnail"],
                    ["role", "button"]
                ], [
                    [8, "src", 4]
                ], null, null, null, null))], function(l, n) {
                    l(n, 1, 0, "noshrink")
                }, function(l, n) {
                    l(n, 3, 0, "assets/public/images/products/" + n.context.$implicit.image)
                })
            }

            function Lt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "20%"],
                    ["fxFlex.lt-md", "50%"],
                    ["role", "columnheader"],
                    ["translate", "LABEL_PRODUCT"]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"],
                    flexLtMd: [1, "flexLtMd"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], function(l, n) {
                    l(n, 1, 0, "LABEL_PRODUCT"), l(n, 2, 0, "20%", "50%")
                }, null)
            }

            function At(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "20%"],
                    ["fxFlex.lt-md", "50%"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"],
                    flexLtMd: [1, "flexLtMd"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](3, null, [" ", ""]))], function(l, n) {
                    l(n, 1, 0, "20%", "50%")
                }, function(l, n) {
                    l(n, 3, 0, n.context.$implicit.name)
                })
            }

            function Ot(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "1 1 50%"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "columnheader"],
                    ["translate", "LABEL_DESCRIPTION"]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](3, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](4, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], function(l, n) {
                    l(n, 1, 0, "LABEL_DESCRIPTION"), l(n, 2, 0, "1 1 50%"), l(n, 3, 0, "", "")
                }, null)
            }

            function Nt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "1 1 50%"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](4, 0, null, null, 0, "div", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null))], function(l, n) {
                    l(n, 1, 0, "1 1 50%"), l(n, 2, 0, "", "")
                }, function(l, n) {
                    l(n, 4, 0, n.context.$implicit.description)
                })
            }

            function qt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "noshrink"],
                    ["role", "columnheader"],
                    ["translate", "LABEL_PRICE"]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], function(l, n) {
                    l(n, 1, 0, "LABEL_PRICE"), l(n, 2, 0, "noshrink")
                }, null)
            }

            function Pt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "noshrink"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](3, null, [" ", ""]))], function(l, n) {
                    l(n, 1, 0, "noshrink")
                }, function(l, n) {
                    l(n, 3, 0, n.context.$implicit.price)
                })
            }

            function Mt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "none"],
                    ["role", "columnheader"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null)], function(l, n) {
                    l(n, 1, 0, "none")
                }, null)
            }

            function Ft(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.addToBasket(l.parent.context.$implicit.id) && t), t
                }, R.b, R.a)), t["\u0275did"](1, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](2, 0, null, 0, 0, "i", [
                    ["class", "fas fa-cart-plus"]
                ], null, null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 1)._animationMode)
                })
            }

            function jt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 8, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "none"],
                    ["fxLayout", "row"],
                    ["fxLayout.lt-sm", "column"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtSm: [1, "layoutLtSm"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](4, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.showDetail(l.context.$implicit) && t), t
                }, R.b, R.a)), t["\u0275did"](5, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](6, 0, null, 0, 0, "i", [
                    ["class", "fas fa-eye"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, Ft)), t["\u0275did"](8, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "row", "column"), l(n, 2, 0, "none"), l(n, 8, 0, e.isLoggedIn())
                }, function(l, n) {
                    l(n, 4, 0, t["\u0275nov"](n, 5).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 5)._animationMode)
                })
            }

            function Ut(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function Vt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function Bt(l) {
                return t["\u0275vid"](0, [t["\u0275qud"](402653184, 1, {
                    paginator: 0
                }), (l()(), t["\u0275eld"](1, 0, null, null, 91, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](2, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 89, "div", [
                    ["class", "table-container mat-elevation-z8 custom-slate"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](4, 0, null, null, 6, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, It)), t["\u0275did"](6, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, St)), t["\u0275did"](8, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Tt)), t["\u0275did"](10, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](11, 0, null, null, 76, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](12, 2342912, [
                    ["table", 4]
                ], 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 2, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 3, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 4, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 5, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](17, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](19, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 6, {
                    cell: 0
                }), t["\u0275qud"](335544320, 7, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 8, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Dt)), t["\u0275did"](25, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [7, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, xt)), t["\u0275did"](28, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [6, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](30, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](32, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 9, {
                    cell: 0
                }), t["\u0275qud"](335544320, 10, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 11, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Lt)), t["\u0275did"](38, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [10, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, At)), t["\u0275did"](41, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](43, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](45, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 12, {
                    cell: 0
                }), t["\u0275qud"](335544320, 13, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 14, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Ot)), t["\u0275did"](51, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [13, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Nt)), t["\u0275did"](54, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [12, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](56, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](58, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 15, {
                    cell: 0
                }), t["\u0275qud"](335544320, 16, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 17, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, qt)), t["\u0275did"](64, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [16, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Pt)), t["\u0275did"](67, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](69, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](71, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 18, {
                    cell: 0
                }), t["\u0275qud"](335544320, 19, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 20, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Mt)), t["\u0275did"](77, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [19, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, jt)), t["\u0275did"](80, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [18, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, Ut)), t["\u0275did"](83, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [4, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, Vt)), t["\u0275did"](86, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [3, 4]
                ], b.n, null, [g.j]), (l()(), t["\u0275eld"](88, 0, null, null, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](89, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275eld"](90, 0, null, null, 2, "mat-paginator", [
                    ["class", "mat-paginator"]
                ], null, null, null, vt.b, vt.a)), t["\u0275did"](91, 245760, [
                    [1, 4],
                    ["paginator", 4]
                ], 0, gt.b, [gt.c, t.ChangeDetectorRef], {
                    pageSize: [0, "pageSize"],
                    pageSizeOptions: [1, "pageSizeOptions"]
                }, null), t["\u0275pad"](92, 3)], function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, "center"), l(n, 6, 0, e.searchValue), l(n, 8, 0, !e.searchValue), l(n, 10, 0, e.confirmation), l(n, 12, 0, e.dataSource), l(n, 19, 0, "Image"), l(n, 32, 0, "Product"), l(n, 45, 0, "Description"), l(n, 58, 0, "Price"), l(n, 71, 0, "Select"), l(n, 83, 0, e.displayedColumns), l(n, 86, 0, e.displayedColumns);
                    var t = l(n, 92, 0, 5, 10, 20);
                    l(n, 91, 0, 10, t)
                }, function(l, n) {
                    l(n, 88, 0, t["\u0275nov"](n, 89).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 89).vertical, !t["\u0275nov"](n, 89).vertical, t["\u0275nov"](n, 89).inset)
                })
            }

            function Ht(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-search-result", [], null, null, null, Bt, kt)), t["\u0275did"](1, 4374528, null, 0, Et, [V.e, Rt, nn, C.k, ie.k, ie.a, B.d, t.NgZone, wt], null, null)], null, null)
            }
            var zt = t["\u0275ccf"]("app-search-result", Et, Ht, {}, {}, []),
                Zt = e("v9Dh"),
                $t = e("MBfO"),
                Yt = e("Z+uX"),
                Qt = e("jvCn"),
                Gt = e("miAi"),
                Wt = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/api/Challenges"
                    }
                    return l.prototype.find = function(l) {
                        return this.http.get(this.host + "/", {
                            params: l
                        }).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.repeatNotification = function(l) {
                        return this.http.get(this.hostServer + "/rest/repeat-notification", {
                            params: {
                                challenge: l
                            }
                        }).pipe(Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.continueCode = function() {
                        return this.http.get(this.hostServer + "/rest/continue-code").pipe(Object(a.a)(function(l) {
                            return l.continueCode
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.prototype.restoreProgress = function(l) {
                        return this.http.put(this.hostServer + "/rest/continue-code/apply/" + l, {}).pipe(Object(a.a)(function(l) {
                            return l.data
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.d, P.J, Dl.d, Dl.e, Tl.g, Tl.f, Tl.c, Tl.b, P.P), q.a.watch();
            var Kt = function() {
                    function l(l, n, e, t, u, o, a) {
                        this.configurationService = l, this.challengeService = n, this.windowRefService = e, this.sanitizer = t, this.ngZone = u, this.io = o, this.spinner = a, this.allChallengeCategories = [], this.displayedChallengeCategories = [], this.displayedColumns = ["name", "description", "status"], this.offsetValue = ["100%", "100%", "100%", "100%", "100%", "100%"]
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.spinner.show(), this.scoreBoardTablesExpanded = localStorage.getItem("scoreBoardTablesExpanded") ? JSON.parse(localStorage.getItem("scoreBoardTablesExpanded")) : [null, !0, !1, !1, !1, !1, !1], this.showSolvedChallenges = !localStorage.getItem("showSolvedChallenges") || JSON.parse(localStorage.getItem("showSolvedChallenges")), this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            l.allowRepeatNotifications = n.application.showChallengeSolvedNotifications && n.ctf.showFlagsInNotifications, l.showChallengeHints = n.application.showChallengeHints
                        }, function(l) {
                            return console.log(l)
                        }), this.challengeService.find().subscribe(function(n) {
                            l.challenges = n;
                            for (var e = 0; e < l.challenges.length; e++) l.challenges[e].hintUrl && (l.challenges[e].hint ? l.challenges[e].hint += " Click for more hints." : l.challenges[e].hint = "Click to open hints."), l.challenges[e].disabledEnv && (l.challenges[e].hint = "This challenge is unavailable in a " + l.challenges[e].disabledEnv + " environment!"), "Score Board" === l.challenges[e].name && (l.challenges[e].solved = !0), l.allChallengeCategories.includes(n[e].category) || l.allChallengeCategories.push(n[e].category);
                            l.allChallengeCategories.sort(), l.displayedChallengeCategories = localStorage.getItem("displayedChallengeCategories") ? JSON.parse(localStorage.getItem("displayedChallengeCategories")) : l.allChallengeCategories, l.trustDescriptionHtml(), l.calculateProgressPercentage(), l.setOffset(n), l.spinner.hide()
                        }, function(n) {
                            l.challenges = void 0, console.log(n)
                        }), this.ngZone.runOutsideAngular(function() {
                            l.io.socket().on("challenge solved", function(n) {
                                if (n && n.challenge) {
                                    for (var e = 0; e < l.challenges.length; e++)
                                        if (l.challenges[e].name === n.name) {
                                            l.challenges[e].solved = !0;
                                            break
                                        } l.calculateProgressPercentage(), l.setOffset(l.challenges)
                                }
                            })
                        })
                    }, l.prototype.trustDescriptionHtml = function() {
                        for (var l = 0; l < this.challenges.length; l++) this.challenges[l].description = this.sanitizer.bypassSecurityTrustHtml(this.challenges[l].description)
                    }, l.prototype.calculateProgressPercentage = function() {
                        for (var l = 0, n = 0; n < this.challenges.length; n++) l += this.challenges[n].solved ? 1 : 0;
                        this.percentChallengesSolved = (100 * l / this.challenges.length).toFixed(0)
                    }, l.prototype.setOffset = function(l) {
                        for (var n = 1; n <= 6; n++) {
                            for (var e = 0, t = 0, u = 0; u < l.length; u++) l[u].difficulty === n && (t++, l[u].solved && e++);
                            var o = Math.round(100 * e / t);
                            this.offsetValue[n - 1] = o = +(o = 100 - o) + "%"
                        }
                    }, l.prototype.toggleDifficulty = function(l) {
                        this.scoreBoardTablesExpanded[l] = !this.scoreBoardTablesExpanded[l], localStorage.setItem("scoreBoardTablesExpanded", JSON.stringify(this.scoreBoardTablesExpanded))
                    }, l.prototype.toggleShowSolvedChallenges = function() {
                        this.showSolvedChallenges = !this.showSolvedChallenges, localStorage.setItem("showSolvedChallenges", JSON.stringify(this.showSolvedChallenges))
                    }, l.prototype.toggleShowChallengeCategory = function(l) {
                        this.displayedChallengeCategories.includes(l) ? this.displayedChallengeCategories = this.displayedChallengeCategories.filter(function(n) {
                            return n !== l
                        }) : this.displayedChallengeCategories.push(l), localStorage.setItem("displayedChallengeCategories", JSON.stringify(this.displayedChallengeCategories))
                    }, l.prototype.repeatNotification = function(l) {
                        var n = this;
                        this.allowRepeatNotifications && this.challengeService.repeatNotification(encodeURIComponent(l.name)).subscribe(function() {
                            n.windowRefService.nativeWindow.scrollTo(0, 0)
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.openHint = function(l) {
                        this.showChallengeHints && l.hintUrl && this.windowRefService.nativeWindow.open(l.hintUrl, "_blank")
                    }, l.prototype.filterToDataSource = function(l, n, e) {
                        var t = this;
                        if (!l) return [];
                        l = l.filter(function(l) {
                            return l.difficulty === n
                        }), this.showSolvedChallenges || (l = l.filter(function(l) {
                            return !l.solved
                        })), l = (l = l.filter(function(l) {
                            return t.displayedChallengeCategories.includes(l.category)
                        })).sort(function(l, n) {
                            var t = l[e],
                                u = n[e];
                            return t < u ? -1 : t > u ? 1 : 0
                        });
                        var u = new g.l;
                        return u.data = l, u
                    }, l.prototype.filterChallengesByDifficulty = function(l) {
                        return this.challenges ? this.challenges.filter(function(n) {
                            return n.difficulty === l
                        }) : []
                    }, l.prototype.filterSolvedChallengesOfDifficulty = function(l) {
                        return this.challenges ? this.challenges.filter(function(n) {
                            return n.difficulty === l && !0 === n.solved
                        }) : []
                    }, l
                }(),
                Xt = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["footer[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%], mat-expansion-panel[_ngcontent-%COMP%]{min-width:300px;margin-left:35px;margin-right:35px;margin-bottom:35px}.category-container[_ngcontent-%COMP%], mat-table[_ngcontent-%COMP%]{margin-top:25px}.star-container[_ngcontent-%COMP%]{margin-bottom:10px;margin-top:25px}.star-container[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:hover{cursor:pointer}.mat-column-status[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{cursor:initial}.mat-column-status[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{cursor:pointer}.heading[_ngcontent-%COMP%]{padding-top:5px}.mat-raised-button[_ngcontent-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.category-toggle[_ngcontent-%COMP%]{font-size:small}"]
                    ],
                    data: {}
                });

            function Jt(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 12, "mat-button-toggle", [
                    ["class", "mat-button-toggle"]
                ], [
                    [2, "mat-button-toggle-standalone", null],
                    [2, "mat-button-toggle-checked", null],
                    [2, "mat-button-toggle-disabled", null],
                    [2, "mat-button-toggle-appearance-standard", null],
                    [1, "tabindex", 0],
                    [1, "id", 0]
                ], [
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 1).focus() && u), "change" === n && (u = !1 !== o.toggleDifficulty(l.context.$implicit) && u), u
                }, zl.b, zl.a)), t["\u0275did"](1, 245760, null, 0, Zl.b, [
                    [2, Zl.c], t.ChangeDetectorRef, t.ElementRef, E.h, [8, null],
                    [2, Zl.a]
                ], {
                    checked: [0, "checked"]
                }, {
                    change: "change"
                }), (l()(), t["\u0275eld"](2, 0, null, 0, 10, "label", [], null, null, null, null, null)), (l()(), t["\u0275eld"](3, 0, null, null, 9, "span", [
                    ["class", "fa-4x fa-layers fa-fw"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](4, 0, null, null, 4, ":svg:svg", [
                    ["aria-hidden", "true"],
                    ["class", "svg-inline--fa fa-star fa-w-18"],
                    ["data-fa-i2svg", ""],
                    ["data-icon", "star"],
                    ["data-prefix", "fa"],
                    ["role", "img"],
                    ["viewBox", "0 0 576 512"],
                    ["xmlns", "http://www.w3.org/2000/svg"]
                ], [
                    [4, "fill", null]
                ], null, null, null, null)), (l()(), t["\u0275eld"](5, 0, null, null, 2, ":svg:linearGradient", [
                    ["x1", "0"],
                    ["x2", "0"],
                    ["y1", "0"],
                    ["y2", "100%"]
                ], [
                    [8, "id", 0]
                ], null, null, null, null)), (l()(), t["\u0275eld"](6, 0, null, null, 0, ":svg:stop", [
                    ["class", "empty-star"]
                ], [
                    [1, "offset", 0]
                ], null, null, null, null)), (l()(), t["\u0275eld"](7, 0, null, null, 0, ":svg:stop", [
                    ["class", "filled-star"]
                ], [
                    [1, "offset", 0]
                ], null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 0, ":svg:path", [
                    ["d", "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"]
                ], [
                    [1, "fill", 0]
                ], null, null, null, null)), (l()(), t["\u0275eld"](9, 0, null, null, 1, "span", [
                    ["class", "fa-layers-text fa-inverse"],
                    ["data-fa-transform", "shrink-9"],
                    ["style", "font-weight:900;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](10, null, ["", ""])), (l()(), t["\u0275eld"](11, 0, null, null, 1, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](12, null, [" ", " "]))], function(l, n) {
                    l(n, 1, 0, n.component.scoreBoardTablesExpanded[n.context.$implicit])
                }, function(l, n) {
                    var e = n.component;
                    l(n, 0, 0, !t["\u0275nov"](n, 1).buttonToggleGroup, t["\u0275nov"](n, 1).checked, t["\u0275nov"](n, 1).disabled, "standard" === t["\u0275nov"](n, 1).appearance, -1, t["\u0275nov"](n, 1).id), l(n, 4, 0, "url(#" + n.context.$implicit + ")"), l(n, 5, 0, n.context.$implicit), l(n, 6, 0, e.challenges ? e.offsetValue[n.context.$implicit - 1] : "100%"), l(n, 7, 0, e.challenges ? e.offsetValue[n.context.$implicit - 1] : "100%"), l(n, 8, 0, "inherit"), l(n, 10, 0, n.context.$implicit), l(n, 11, 0, "fa-layers-counter " + (e.filterSolvedChallengesOfDifficulty(n.context.$implicit).length === e.filterChallengesByDifficulty(n.context.$implicit).length ? "accent-notification" : 0 === e.filterSolvedChallengesOfDifficulty(n.context.$implicit).length ? "warn-notification" : "primary-notification")), l(n, 12, 0, e.filterSolvedChallengesOfDifficulty(n.context.$implicit).length + "/" + e.filterChallengesByDifficulty(n.context.$implicit).length)
                })
            }

            function lu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-button-toggle", [
                    ["class", "category-toggle mat-button-toggle"]
                ], [
                    [2, "mat-button-toggle-standalone", null],
                    [2, "mat-button-toggle-checked", null],
                    [2, "mat-button-toggle-disabled", null],
                    [2, "mat-button-toggle-appearance-standard", null],
                    [1, "tabindex", 0],
                    [1, "id", 0]
                ], [
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 1).focus() && u), "change" === n && (u = !1 !== o.toggleShowChallengeCategory(l.context.$implicit) && u), u
                }, zl.b, zl.a)), t["\u0275did"](1, 245760, null, 0, Zl.b, [
                    [2, Zl.c], t.ChangeDetectorRef, t.ElementRef, E.h, [8, null],
                    [2, Zl.a]
                ], {
                    checked: [0, "checked"]
                }, {
                    change: "change"
                }), (l()(), t["\u0275ted"](2, 0, [" ", " "]))], function(l, n) {
                    l(n, 1, 0, n.component.displayedChallengeCategories.includes(n.context.$implicit))
                }, function(l, n) {
                    l(n, 0, 0, !t["\u0275nov"](n, 1).buttonToggleGroup, t["\u0275nov"](n, 1).checked, t["\u0275nov"](n, 1).disabled, "standard" === t["\u0275nov"](n, 1).appearance, -1, t["\u0275nov"](n, 1).id), l(n, 2, 0, n.context.$implicit)
                })
            }

            function nu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_NAME"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function eu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.name)
                })
            }

            function tu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxFlex", "1 1 50%"],
                    ["fxHide.lt-sm", ""],
                    ["fxShow", ""],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](3, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtSm: [1, "hideLtSm"]
                }, null), t["\u0275did"](4, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_DESCRIPTION "]))], function(l, n) {
                    l(n, 1, 0, ""), l(n, 2, 0, "1 1 50%"), l(n, 3, 0, "", "")
                }, null)
            }

            function uu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-cell", [
                    ["class", "mat-cell"],
                    ["fxFlex", "1 1 50%"],
                    ["fxHide.lt-sm", ""],
                    ["fxShow", ""],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtSm: [1, "hideLtSm"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](4, 0, null, null, 0, "div", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null))], function(l, n) {
                    l(n, 1, 0, "1 1 50%"), l(n, 2, 0, "", "")
                }, function(l, n) {
                    l(n, 4, 0, n.context.$implicit.description)
                })
            }

            function ou(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_STATUS"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function au(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 19, "mat-cell", [
                    ["class", "mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 17, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](4, 16777216, null, 0, 4, "span", [
                    ["class", "not-solved"],
                    ["matTooltipPosition", "above"]
                ], [
                    [8, "hidden", 0],
                    [8, "id", 0]
                ], [
                    [null, "click"],
                    [null, "longpress"],
                    [null, "keydown"],
                    [null, "touchend"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "longpress" === n && (u = !1 !== t["\u0275nov"](l, 5).show() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 5)._handleKeydown(e) && u), "touchend" === n && (u = !1 !== t["\u0275nov"](l, 5)._handleTouchend() && u), "click" === n && (u = !1 !== o.openHint(l.context.$implicit) && u), u
                }, null, null)), t["\u0275did"](5, 147456, null, 0, Zt.d, [Ne.c, t.ElementRef, Je.b, t.ViewContainerRef, t.NgZone, w.a, E.c, E.h, Zt.b, [2, A.b],
                    [2, Zt.a],
                    [2, B.h]
                ], {
                    position: [0, "position"],
                    message: [1, "message"]
                }, null), (l()(), t["\u0275eld"](6, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fas fa-book"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](7, null, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](9, 16777216, null, 0, 5, "span", [
                    ["class", "solved"],
                    ["matTooltipPosition", "above"]
                ], [
                    [8, "hidden", 0],
                    [8, "id", 0]
                ], [
                    [null, "click"],
                    [null, "longpress"],
                    [null, "keydown"],
                    [null, "touchend"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "longpress" === n && (u = !1 !== t["\u0275nov"](l, 10).show() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 10)._handleKeydown(e) && u), "touchend" === n && (u = !1 !== t["\u0275nov"](l, 10)._handleTouchend() && u), "click" === n && (u = !1 !== o.repeatNotification(l.context.$implicit) && u), u
                }, null, null)), t["\u0275did"](10, 147456, null, 0, Zt.d, [Ne.c, t.ElementRef, Je.b, t.ViewContainerRef, t.NgZone, w.a, E.c, E.h, Zt.b, [2, A.b],
                    [2, Zt.a],
                    [2, B.h]
                ], {
                    position: [0, "position"],
                    message: [1, "message"]
                }, null), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](12, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "far fa-flag"]
                ], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](13, null, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](15, 16777216, null, 0, 4, "span", [
                    ["class", "unavailable"],
                    ["matTooltipPosition", "above"]
                ], [
                    [8, "hidden", 0],
                    [8, "id", 0]
                ], [
                    [null, "longpress"],
                    [null, "keydown"],
                    [null, "touchend"]
                ], function(l, n, e) {
                    var u = !0;
                    return "longpress" === n && (u = !1 !== t["\u0275nov"](l, 16).show() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 16)._handleKeydown(e) && u), "touchend" === n && (u = !1 !== t["\u0275nov"](l, 16)._handleTouchend() && u), u
                }, null, null)), t["\u0275did"](16, 147456, null, 0, Zt.d, [Ne.c, t.ElementRef, Je.b, t.ViewContainerRef, t.NgZone, w.a, E.c, E.h, Zt.b, [2, A.b],
                    [2, Zt.a],
                    [2, B.h]
                ], {
                    position: [0, "position"],
                    message: [1, "message"]
                }, null), (l()(), t["\u0275eld"](17, 0, null, null, 0, "i", [
                    ["aria-hidden", "true"]
                ], [
                    [8, "className", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](18, null, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, n.context.$implicit.disabledEnv, n.context.$implicit.solved ? "accent" : "primary"), l(n, 5, 0, "above", t["\u0275inlineInterpolate"](1, "", e.showChallengeHints ? n.context.$implicit.hint : null, "")), l(n, 10, 0, "above", t["\u0275inlineInterpolate"](1, "", e.allowRepeatNotifications ? t["\u0275unv"](n, 10, 1, t["\u0275nov"](n, 11).transform("NOTIFICATION_RESEND_INSTRUCTIONS")) : null, "")), l(n, 16, 0, "above", t["\u0275inlineInterpolate"](1, "", n.context.$implicit.hint, ""))
                }, function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode), l(n, 4, 0, n.context.$implicit.solved || n.context.$implicit.disabledEnv, t["\u0275inlineInterpolate"](1, "", n.context.$implicit.name, ".notSolved")), l(n, 6, 0, !e.showChallengeHints || !(n.context.$implicit.hint || n.context.$implicit.hintUrl)), l(n, 7, 0, t["\u0275unv"](n, 7, 0, t["\u0275nov"](n, 8).transform("STATUS_UNSOLVED"))), l(n, 9, 0, !n.context.$implicit.solved || n.context.$implicit.disabledEnv, t["\u0275inlineInterpolate"](1, "", n.context.$implicit.name, ".solved")), l(n, 12, 0, !e.allowRepeatNotifications), l(n, 13, 0, t["\u0275unv"](n, 13, 0, t["\u0275nov"](n, 14).transform("STATUS_SOLVED"))), l(n, 15, 0, !n.context.$implicit.disabledEnv, t["\u0275inlineInterpolate"](1, "", n.context.$implicit.name, ".unavailable"));
                    var u = t["\u0275inlineInterpolate"](1, "fab fa-", null == n.context.$implicit.disabledEnv ? null : n.context.$implicit.disabledEnv.toLowerCase(), "");
                    l(n, 17, 0, u), l(n, 18, 0, t["\u0275unv"](n, 18, 0, t["\u0275nov"](n, 19).transform("STATUS_UNAVAILABLE")))
                })
            }

            function iu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function ru(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function du(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 50, "mat-table", [
                    ["class", "mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](1, 2342912, null, 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 2, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 3, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 4, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 5, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](6, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](8, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 6, {
                    cell: 0
                }), t["\u0275qud"](335544320, 7, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 8, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, nu)), t["\u0275did"](14, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [7, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, eu)), t["\u0275did"](17, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [6, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](19, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](21, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 9, {
                    cell: 0
                }), t["\u0275qud"](335544320, 10, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 11, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, tu)), t["\u0275did"](27, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [10, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, uu)), t["\u0275did"](30, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](32, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](34, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 12, {
                    cell: 0
                }), t["\u0275qud"](335544320, 13, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 14, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, ou)), t["\u0275did"](40, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [13, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, au)), t["\u0275did"](43, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [12, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, iu)), t["\u0275did"](46, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [4, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, ru)), t["\u0275did"](49, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [3, 4]
                ], b.n, null, [g.j])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, e.filterToDataSource(e.challenges, n.parent.context.$implicit, "name")), l(n, 8, 0, "name"), l(n, 21, 0, "description"), l(n, 34, 0, "status"), l(n, 46, 0, e.displayedColumns), l(n, 49, 0, e.displayedColumns)
                }, null)
            }

            function su(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 16777216, null, null, 21, "mat-expansion-panel", [
                    ["class", "mat-expansion-panel"]
                ], [
                    [2, "mat-expanded", null],
                    [2, "_mat-animation-noopable", null],
                    [2, "mat-expansion-panel-spacing", null]
                ], null, null, $l.d, $l.a)), t["\u0275did"](1, 1753088, null, 1, Yl.c, [
                    [3, Yl.a], t.ChangeDetectorRef, Ql.d, t.ViewContainerRef, _.DOCUMENT, [2, k.a]
                ], {
                    expanded: [0, "expanded"],
                    disabled: [1, "disabled"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _lazyContent: 0
                }), t["\u0275prd"](256, null, Yl.a, void 0, []), (l()(), t["\u0275eld"](4, 0, null, 0, 13, "mat-expansion-panel-header", [
                    ["class", "mat-expansion-panel-header"],
                    ["role", "button"]
                ], [
                    [1, "id", 0],
                    [1, "tabindex", 0],
                    [1, "aria-controls", 0],
                    [1, "aria-expanded", 0],
                    [1, "aria-disabled", 0],
                    [2, "mat-expanded", null],
                    [40, "@expansionHeight", 0]
                ], [
                    [null, "click"],
                    [null, "keydown"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 5)._toggle() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 5)._keydown(e) && u), u
                }, $l.c, $l.b)), t["\u0275did"](5, 180224, null, 0, Yl.d, [Yl.c, t.ElementRef, E.h, t.ChangeDetectorRef], null, null), t["\u0275pod"](6, {
                    collapsedHeight: 0,
                    expandedHeight: 1
                }), t["\u0275pod"](7, {
                    value: 0,
                    params: 1
                }), (l()(), t["\u0275eld"](8, 0, null, 2, 9, "span", [
                    ["fxLayout", "row"]
                ], null, null, null, null, null)), t["\u0275did"](9, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](10, 0, null, null, 3, "bar-rating", [
                    ["readOnly", "true"]
                ], null, null, null, S.b, S.a)), t["\u0275prd"](5120, null, T.j, function(l) {
                    return [l]
                }, [D.a]), t["\u0275prd"](5120, null, T.i, function(l) {
                    return [l]
                }, [D.a]), t["\u0275did"](13, 638976, null, 0, D.a, [t.ChangeDetectorRef], {
                    rate: [0, "rate"],
                    max: [1, "max"],
                    readOnly: [2, "readOnly"]
                }, null), (l()(), t["\u0275eld"](14, 0, null, null, 3, "span", [
                    ["style", "margin: 15px 0;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](15, null, ["", " ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](18, 0, null, 1, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](19, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275and"](16777216, null, 1, 1, null, du)), t["\u0275did"](21, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](0, null, null, 0))], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, e.scoreBoardTablesExpanded[n.context.$implicit], !0), l(n, 9, 0, "row"), l(n, 13, 0, n.context.$implicit, n.context.$implicit, "true"), l(n, 21, 0, e.challenges)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).expanded, "NoopAnimations" === t["\u0275nov"](n, 1)._animationMode, t["\u0275nov"](n, 1)._hasSpacing());
                    var e = t["\u0275nov"](n, 5).panel._headerId,
                        u = t["\u0275nov"](n, 5).disabled ? -1 : 0,
                        o = t["\u0275nov"](n, 5)._getPanelId(),
                        a = t["\u0275nov"](n, 5)._isExpanded(),
                        i = t["\u0275nov"](n, 5).panel.disabled,
                        r = t["\u0275nov"](n, 5)._isExpanded(),
                        d = l(n, 7, 0, t["\u0275nov"](n, 5)._getExpandedState(), l(n, 6, 0, t["\u0275nov"](n, 5).collapsedHeight, t["\u0275nov"](n, 5).expandedHeight));
                    l(n, 4, 0, e, u, o, a, i, r, d), l(n, 15, 0, t["\u0275unv"](n, 15, 0, t["\u0275nov"](n, 16).transform("LABEL_" + n.context.$implicit + "_STAR_DIFFICULTY")), t["\u0275unv"](n, 15, 1, t["\u0275nov"](n, 17).transform("LABEL_CHALLENGES"))), l(n, 18, 0, t["\u0275nov"](n, 19).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 19).vertical, !t["\u0275nov"](n, 19).vertical, t["\u0275nov"](n, 19).inset)
                })
            }

            function cu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 41, "diV", [
                    ["fxLayout", "column"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 9, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 5, "mat-card-title", [
                    ["class", "mat-card-title"]
                ], null, null, null, null, null)), t["\u0275did"](5, 16384, null, 0, Hl.f, [], null, null), (l()(), t["\u0275ted"](6, null, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](8, 0, null, null, 1, "small", [
                    ["class", "confirmation"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](9, null, ["", "%"])), (l()(), t["\u0275eld"](10, 0, null, 0, 1, "mat-progress-bar", [
                    ["aria-valuemax", "100"],
                    ["aria-valuemin", "0"],
                    ["class", "mat-progress-bar"],
                    ["mode", "determinate"],
                    ["role", "progressbar"]
                ], [
                    [1, "aria-valuenow", 0],
                    [1, "mode", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, $t.b, $t.a)), t["\u0275did"](11, 4374528, null, 0, Yt.b, [t.ElementRef, t.NgZone, [2, k.a],
                    [2, Yt.a]
                ], {
                    color: [0, "color"],
                    value: [1, "value"],
                    mode: [2, "mode"]
                }, null), (l()(), t["\u0275eld"](12, 0, null, null, 23, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](13, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](14, 0, null, 0, 3, "mat-card-title", [
                    ["class", "mat-card-title"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](15, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](16, 16384, null, 0, Hl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_DIFFICULTY"])), (l()(), t["\u0275eld"](18, 0, null, 0, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](19, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275eld"](20, 0, null, 0, 9, "div", [
                    ["class", "star-container"],
                    ["fxLayout", "row wrap"]
                ], null, null, null, null, null)), t["\u0275did"](21, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 2, null, Jt)), t["\u0275did"](23, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), t["\u0275pad"](24, 6), (l()(), t["\u0275eld"](25, 0, null, null, 4, "mat-button-toggle", [
                    ["class", "mat-button-toggle"]
                ], [
                    [2, "mat-button-toggle-standalone", null],
                    [2, "mat-button-toggle-checked", null],
                    [2, "mat-button-toggle-disabled", null],
                    [2, "mat-button-toggle-appearance-standard", null],
                    [1, "tabindex", 0],
                    [1, "id", 0]
                ], [
                    [null, "change"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "focus" === n && (u = !1 !== t["\u0275nov"](l, 26).focus() && u), "change" === n && (u = !1 !== o.toggleShowSolvedChallenges() && u), u
                }, zl.b, zl.a)), t["\u0275did"](26, 245760, null, 0, Zl.b, [
                    [2, Zl.c], t.ChangeDetectorRef, t.ElementRef, E.h, [8, null],
                    [2, Zl.a]
                ], {
                    checked: [0, "checked"]
                }, {
                    change: "change"
                }), (l()(), t["\u0275eld"](27, 0, null, 0, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fa-2x fas fa-trophy"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](28, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](30, 0, null, 0, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](31, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275eld"](32, 0, null, 0, 3, "div", [
                    ["class", "category-container"],
                    ["fxLayout", "row wrap"]
                ], null, null, null, null, null)), t["\u0275did"](33, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, lu)), t["\u0275did"](35, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 2, null, su)), t["\u0275did"](37, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), t["\u0275pad"](38, 6), (l()(), t["\u0275eld"](39, 0, null, null, 2, "mat-card", [
                    ["class", "primary-notification mat-card"]
                ], [
                    [8, "innerHTML", 1]
                ], null, null, Bl.d, Bl.a)), t["\u0275did"](40, 49152, null, 0, Hl.a, [], null, null), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](42, 0, null, null, 0, "img", [
                    ["src", "assets/public/images/tracking/scoreboard.png"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](43, 0, null, null, 1, "ngx-spinner", [], null, null, null, Qt.b, Qt.a)), t["\u0275did"](44, 770048, null, 0, Gt.a, [Gt.c], null, null)], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "column"), l(n, 11, 0, "accent", e.percentChallengesSolved, "determinate"), l(n, 15, 0, ""), l(n, 21, 0, "row wrap");
                    var t = l(n, 24, 0, 1, 2, 3, 4, 5, 6);
                    l(n, 23, 0, t), l(n, 26, 0, e.showSolvedChallenges), l(n, 33, 0, "row wrap"), l(n, 35, 0, e.allChallengeCategories);
                    var u = l(n, 38, 0, 1, 2, 3, 4, 5, 6);
                    l(n, 37, 0, u), l(n, 44, 0)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 6, 0, t["\u0275unv"](n, 6, 0, t["\u0275nov"](n, 7).transform("TITLE_SCORE_BOARD"))), l(n, 9, 0, e.percentChallengesSolved), l(n, 10, 0, t["\u0275nov"](n, 11).value, t["\u0275nov"](n, 11).mode, t["\u0275nov"](n, 11)._isNoopAnimation), l(n, 18, 0, t["\u0275nov"](n, 19).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 19).vertical, !t["\u0275nov"](n, 19).vertical, t["\u0275nov"](n, 19).inset), l(n, 25, 0, !t["\u0275nov"](n, 26).buttonToggleGroup, t["\u0275nov"](n, 26).checked, t["\u0275nov"](n, 26).disabled, "standard" === t["\u0275nov"](n, 26).appearance, -1, t["\u0275nov"](n, 26).id), l(n, 28, 0, t["\u0275unv"](n, 28, 0, t["\u0275nov"](n, 29).transform("BTN_SHOW_SOLVED"))), l(n, 30, 0, t["\u0275nov"](n, 31).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 31).vertical, !t["\u0275nov"](n, 31).vertical, t["\u0275nov"](n, 31).inset), l(n, 39, 0, t["\u0275unv"](n, 39, 0, t["\u0275nov"](n, 41).transform("CALL_FOR_CONTRIBUTIONS")))
                })
            }

            function fu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-score-board", [], null, null, null, cu, Xt)), t["\u0275did"](1, 114688, null, 0, Kt, [d, Wt, ln, B.d, t.NgZone, wt, Gt.c], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var pu = t["\u0275ccf"]("app-score-board", Kt, fu, {}, {}, []);
            q.b.add(P.y), q.a.watch();
            var mu = function() {
                    function l(l) {
                        this.router = l, this.orderIdControl = new T.e("", [T.o.required])
                    }
                    return l.prototype.save = function() {
                        this.router.navigate(["/track-result"], {
                            queryParams: {
                                id: this.orderIdControl.value
                            }
                        })
                    }, l
                }(),
                hu = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}mat-form-field[_ngcontent-%COMP%]{padding-top:10px}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}button[_ngcontent-%COMP%]{margin-top:5px}"]
                    ],
                    data: {}
                });

            function vu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-error", [
                    ["class", "mat-error"],
                    ["role", "alert"],
                    ["translate", ""]
                ], [
                    [1, "id", 0]
                ], null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, [
                    [4, 4]
                ], 0, Vl.b, [], null, null), (l()(), t["\u0275ted"](-1, null, ["MANDATORY_ORDER_ID"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).id)
                })
            }

            function gu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 35, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 33, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_TRACK_ORDERS"])), (l()(), t["\u0275eld"](7, 0, null, 0, 23, "div", [
                    ["class", "form-container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 22, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](9, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](17, 0, null, 3, 3, "mat-label", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](18, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](19, 16384, [
                    [3, 4]
                ], 0, Vl.f, [], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_ORDER_ID"])), (l()(), t["\u0275eld"](21, 0, null, 1, 7, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "orderId"],
                    ["matInput", ""],
                    ["placeholder", "xxxx-0123456789abcdef"],
                    ["type", "text"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 22)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 22).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 22)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 22)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 27)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 27)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 27)._onInput() && u), u
                }, null, null)), t["\u0275did"](22, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](24, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](26, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](27, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275and"](16777216, null, 5, 1, null, vu)), t["\u0275did"](30, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](31, 0, null, 0, 4, "button", [
                    ["color", "primary"],
                    ["id", "trackButton"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.save() && t), t
                }, R.b, R.a)), t["\u0275did"](32, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"],
                    color: [1, "color"]
                }, null), (l()(), t["\u0275eld"](33, 0, null, 0, 0, "i", [
                    ["class", "fas fa-map-marker fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](34, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 5, 0, ""), l(n, 9, 0, "outline"), l(n, 18, 0, ""), l(n, 24, 0, e.orderIdControl), l(n, 27, 0, "orderId", "xxxx-0123456789abcdef", "text"), l(n, 30, 0, e.orderIdControl.invalid), l(n, 32, 0, e.orderIdControl.invalid, "primary")
                }, function(l, n) {
                    l(n, 8, 1, ["standard" == t["\u0275nov"](n, 9).appearance, "fill" == t["\u0275nov"](n, 9).appearance, "outline" == t["\u0275nov"](n, 9).appearance, "legacy" == t["\u0275nov"](n, 9).appearance, t["\u0275nov"](n, 9)._control.errorState, t["\u0275nov"](n, 9)._canLabelFloat, t["\u0275nov"](n, 9)._shouldLabelFloat(), t["\u0275nov"](n, 9)._hideControlPlaceholder(), t["\u0275nov"](n, 9)._control.disabled, t["\u0275nov"](n, 9)._control.autofilled, t["\u0275nov"](n, 9)._control.focused, "accent" == t["\u0275nov"](n, 9).color, "warn" == t["\u0275nov"](n, 9).color, t["\u0275nov"](n, 9)._shouldForward("untouched"), t["\u0275nov"](n, 9)._shouldForward("touched"), t["\u0275nov"](n, 9)._shouldForward("pristine"), t["\u0275nov"](n, 9)._shouldForward("dirty"), t["\u0275nov"](n, 9)._shouldForward("valid"), t["\u0275nov"](n, 9)._shouldForward("invalid"), t["\u0275nov"](n, 9)._shouldForward("pending"), !t["\u0275nov"](n, 9)._animationsEnabled]), l(n, 21, 1, [t["\u0275nov"](n, 26).ngClassUntouched, t["\u0275nov"](n, 26).ngClassTouched, t["\u0275nov"](n, 26).ngClassPristine, t["\u0275nov"](n, 26).ngClassDirty, t["\u0275nov"](n, 26).ngClassValid, t["\u0275nov"](n, 26).ngClassInvalid, t["\u0275nov"](n, 26).ngClassPending, t["\u0275nov"](n, 27)._isServer, t["\u0275nov"](n, 27).id, t["\u0275nov"](n, 27).placeholder, t["\u0275nov"](n, 27).disabled, t["\u0275nov"](n, 27).required, t["\u0275nov"](n, 27).readonly && !t["\u0275nov"](n, 27)._isNativeSelect || null, t["\u0275nov"](n, 27)._ariaDescribedby || null, t["\u0275nov"](n, 27).errorState, t["\u0275nov"](n, 27).required.toString()]), l(n, 31, 0, t["\u0275nov"](n, 32).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 32)._animationMode), l(n, 34, 0, t["\u0275unv"](n, 34, 0, t["\u0275nov"](n, 35).transform("BTN_TRACK")))
                })
            }

            function bu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-track-order", [], null, null, null, gu, hu)), t["\u0275did"](1, 49152, null, 0, mu, [ie.k], null, null)], null, null)
            }
            var _u = t["\u0275ccf"]("app-track-order", mu, bu, {}, {}, []),
                Cu = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/rest/track-order"
                    }
                    return l.prototype.save = function(l) {
                        return l = encodeURIComponent(l), this.http.get(this.host + "/" + l).pipe(Object(a.a)(function(l) {
                            return l
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.Z, P.L, P.I, P.R, P.Q, P.u), q.a.watch();
            var Ru = function() {
                    function l(l, n, e) {
                        this.route = l, this.trackOrderService = n, this.sanitizer = e, this.displayedColumns = ["product", "price", "quantity", "total price"], this.dataSource = new g.l, this.results = {}
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.orderId = this.route.snapshot.queryParams.id, this.trackOrderService.save(this.orderId).subscribe(function(n) {
                            l.results.orderNo = l.sanitizer.bypassSecurityTrustHtml(n.data[0].orderId), l.results.email = n.data[0].email, l.results.totalPrice = n.data[0].totalPrice, l.results.products = n.data[0].products, l.results.eta = n.data[0].eta || "?", l.dataSource.data = l.results.products
                        })
                    }, l
                }(),
                yu = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:380px;width:25%}.table-heading[_ngcontent-%COMP%], mat-table[_ngcontent-%COMP%]{min-width:420px;width:50%}.product-name[_ngcontent-%COMP%]{margin-right:25px}.table-wrapper[_ngcontent-%COMP%]{margin-top:30px}.table-heading[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:0}.row.fa-4x[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-right:10px}"]
                    ],
                    data: {}
                });

            function wu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRODUCT"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Eu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "product-name mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.name)
                })
            }

            function ku(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](3, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRICE"]))], function(l, n) {
                    l(n, 1, 0, ""), l(n, 2, 0, "", "")
                }, null)
            }

            function Iu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-cell", [
                    ["class", "product-price mat-cell"],
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](3, null, [" ", ""]))], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 3, 0, n.context.$implicit.price)
                })
            }

            function Su(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_QUANTITY"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Tu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "product-quantity mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", ""]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.quantity)
                })
            }

            function Du(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "mat-header-cell", [
                    ["class", "mat-header-cell"],
                    ["role", "columnheader"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), t["\u0275did"](2, 16384, null, 0, g.e, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_TOTAL_PRICE"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function xu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-cell", [
                    ["class", "product-total mat-cell"],
                    ["role", "gridcell"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, g.a, [b.d, t.ElementRef], null, null), (l()(), t["\u0275ted"](2, null, [" ", " "]))], null, function(l, n) {
                    l(n, 2, 0, n.context.$implicit.total)
                })
            }

            function Lu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-header-row", [
                    ["class", "mat-header-row"],
                    ["role", "row"]
                ], null, null, null, I.d, I.a)), t["\u0275prd"](6144, null, b.k, null, [g.g]), t["\u0275did"](2, 49152, null, 0, g.g, [], null, null)], null, null)
            }

            function Au(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "mat-row", [
                    ["class", "mat-row"],
                    ["role", "row"]
                ], null, null, null, I.e, I.b)), t["\u0275prd"](6144, null, b.m, null, [g.i]), t["\u0275did"](2, 49152, null, 0, g.i, [], null, null)], null, null)
            }

            function Ou(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 25, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 23, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 1, "mat-card-header", [
                    ["class", "mat-card-header"]
                ], null, null, null, Bl.c, Bl.b)), t["\u0275did"](5, 49152, null, 0, Hl.c, [], null, null), (l()(), t["\u0275eld"](6, 0, null, 0, 5, "h3", [], null, null, null, null, null)), (l()(), t["\u0275eld"](7, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](8, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["TITLE_SEARCH_RESULTS"])), (l()(), t["\u0275ted"](-1, null, [" - "])), (l()(), t["\u0275eld"](11, 0, null, null, 0, "span", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), (l()(), t["\u0275eld"](12, 0, null, 0, 2, "h4", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](13, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EXPECTED_DELIVERY"])), (l()(), t["\u0275eld"](15, 0, null, 0, 10, "div", [
                    ["class", "container-fluid well"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](16, 0, null, null, 9, "div", [
                    ["class", "row fa-4x"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](17, 0, null, null, 0, "i", [
                    ["class", "fas fa-warehouse"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](18, 0, null, null, 0, "i", [
                    ["class", "fas fa-sync fa-spin"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](19, 0, null, null, 0, "i", [
                    ["class", "fas fa-truck-loading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](20, 0, null, null, 0, "i", [
                    ["class", "fas fa-truck"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](21, 0, null, null, 4, "span", [
                    ["class", "fa-layers fa-fw"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](22, 0, null, null, 0, "i", [
                    ["class", "fas fa-home"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](23, 0, null, null, 2, "span", [
                    ["class", "fa-layers-counter accent-notification"],
                    ["style", "width: max-content"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](24, null, ["", " ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](26, 0, null, null, 5, "div", [
                    ["class", "table-wrapper"],
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](27, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](28, 0, null, null, 3, "div", [
                    ["class", "table-heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](29, 0, null, null, 2, "h4", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](30, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRODUCT_ORDERED"])), (l()(), t["\u0275eld"](32, 0, null, null, 65, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](33, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](34, 0, null, null, 63, "mat-table", [
                    ["class", "mat-elevation-z8 mat-table"]
                ], null, null, null, I.f, I.c)), t["\u0275did"](35, 2342912, [
                    ["table", 4]
                ], 4, g.k, [t.IterableDiffers, t.ChangeDetectorRef, t.ElementRef, [8, null],
                    [2, A.b], _.DOCUMENT, w.a
                ], {
                    dataSource: [0, "dataSource"]
                }, null), t["\u0275qud"](603979776, 1, {
                    _contentColumnDefs: 1
                }), t["\u0275qud"](603979776, 2, {
                    _contentRowDefs: 1
                }), t["\u0275qud"](603979776, 3, {
                    _contentHeaderRowDefs: 1
                }), t["\u0275qud"](603979776, 4, {
                    _contentFooterRowDefs: 1
                }), (l()(), t["\u0275eld"](40, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](42, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 5, {
                    cell: 0
                }), t["\u0275qud"](335544320, 6, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 7, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, wu)), t["\u0275did"](48, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [6, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Eu)), t["\u0275did"](51, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [5, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](53, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](55, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 8, {
                    cell: 0
                }), t["\u0275qud"](335544320, 9, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 10, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, ku)), t["\u0275did"](61, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [9, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Iu)), t["\u0275did"](64, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [8, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](66, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](68, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 11, {
                    cell: 0
                }), t["\u0275qud"](335544320, 12, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 13, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Su)), t["\u0275did"](74, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [12, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, Tu)), t["\u0275did"](77, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [11, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275eld"](79, 0, null, null, 12, null, null, null, null, null, null, null)), t["\u0275prd"](6144, null, "MAT_SORT_HEADER_COLUMN_DEF", null, [g.c]), t["\u0275did"](81, 16384, null, 3, g.c, [], {
                    name: [0, "name"]
                }, null), t["\u0275qud"](335544320, 14, {
                    cell: 0
                }), t["\u0275qud"](335544320, 15, {
                    headerCell: 0
                }), t["\u0275qud"](335544320, 16, {
                    footerCell: 0
                }), t["\u0275prd"](2048, [
                    [1, 4]
                ], b.d, null, [g.c]), (l()(), t["\u0275and"](0, null, null, 2, null, Du)), t["\u0275did"](87, 16384, null, 0, g.f, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [15, 4]
                ], b.j, null, [g.f]), (l()(), t["\u0275and"](0, null, null, 2, null, xu)), t["\u0275did"](90, 16384, null, 0, g.b, [t.TemplateRef], null, null), t["\u0275prd"](2048, [
                    [14, 4]
                ], b.b, null, [g.b]), (l()(), t["\u0275and"](0, null, null, 2, null, Lu)), t["\u0275did"](93, 540672, null, 0, g.h, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [3, 4]
                ], b.l, null, [g.h]), (l()(), t["\u0275and"](0, null, null, 2, null, Au)), t["\u0275did"](96, 540672, null, 0, g.j, [t.TemplateRef, t.IterableDiffers], {
                    columns: [0, "columns"]
                }, null), t["\u0275prd"](2048, [
                    [2, 4]
                ], b.n, null, [g.j])], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "center"), l(n, 8, 0, ""), l(n, 13, 0, ""), l(n, 27, 0, "center"), l(n, 30, 0, ""), l(n, 33, 0, "center"), l(n, 35, 0, e.dataSource), l(n, 42, 0, "product"), l(n, 55, 0, "price"), l(n, 68, 0, "quantity"), l(n, 81, 0, "total price"), l(n, 93, 0, e.displayedColumns), l(n, 96, 0, e.displayedColumns)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 11, 0, e.results.orderNo), l(n, 24, 0, e.results.eta, t["\u0275unv"](n, 24, 1, t["\u0275nov"](n, 25).transform("LABEL_DAYS")))
                })
            }

            function Nu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-track-result", [], null, null, null, Ou, yu)), t["\u0275did"](1, 114688, null, 0, Ru, [ie.a, Cu, B.d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var qu = t["\u0275ccf"]("app-track-result", Ru, Nu, {}, {}, []),
                Pu = function() {
                    function l(l, n, e, t) {
                        this.cookieService = l, this.userService = n, this.router = e, this.route = t
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        console.log(this.route.snapshot.data), this.userService.oauthLogin(this.parseRedirectUrlParams().access_token).subscribe(function(n) {
                            l.userService.save({
                                email: n.email,
                                password: btoa(n.email.split("").reverse().join(""))
                            }).subscribe(function() {
                                l.login(n)
                            }, function() {
                                return l.login(n)
                            })
                        }, function(n) {
                            l.invalidateSession(n), l.router.navigate(["/login"])
                        })
                    }, l.prototype.login = function(l) {
                        var n = this;
                        this.userService.login({
                            email: l.email,
                            password: btoa(l.email.split("").reverse().join("")),
                            oauth: !0
                        }).subscribe(function(l) {
                            n.cookieService.put("token", l.token), sessionStorage.setItem("bid", l.bid), localStorage.setItem("token", l.token), n.userService.isLoggedIn.next(!0), n.router.navigate(["/"])
                        }, function(l) {
                            n.invalidateSession(l), n.router.navigate(["/login"])
                        })
                    }, l.prototype.invalidateSession = function(l) {
                        console.log(l), this.cookieService.remove("token", {
                            domain: document.domain
                        }), localStorage.removeItem("token"), sessionStorage.removeItem("bid")
                    }, l.prototype.parseRedirectUrlParams = function() {
                        for (var l = this.route.snapshot.data.params.substr(1).split("&"), n = {}, e = 0; e < l.length; e++) {
                            var t = l[e].split("=");
                            n[t[0]] = t[1]
                        }
                        return console.log(n), n
                    }, l
                }(),
                Mu = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-card[_ngcontent-%COMP%]{height:auto;min-width:300px;width:35%}"]
                    ],
                    data: {}
                });

            function Fu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 10, "div", [
                    ["fxLayoutAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.d, [L.h, t.ElementRef, [8, null], L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 8, "mat-card", [
                    ["class", "primary-notification mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](3, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 6, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](5, 0, null, null, 2, "h3", [], null, null, null, null, null)), (l()(), t["\u0275ted"](6, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](8, 0, null, null, 2, "div", [], null, null, null, null, null)), (l()(), t["\u0275ted"](9, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "center")
                }, function(l, n) {
                    l(n, 6, 0, t["\u0275unv"](n, 6, 0, t["\u0275nov"](n, 7).transform("TITLE_LOGIN"))), l(n, 9, 0, t["\u0275unv"](n, 9, 0, t["\u0275nov"](n, 10).transform("CONFIRM_LOGGED_IN_VIA_OAUTH2")))
                })
            }

            function ju(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-oauth", [], null, null, null, Fu, Mu)), t["\u0275did"](1, 114688, null, 0, Pu, [se.d, N, ie.k, ie.a], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Uu = t["\u0275ccf"]("app-oauth", Pu, ju, {}, {}, []);
            q.b.add(Tl.a, P.T, P.s, P.i, P.j, Dl.a, Dl.b), q.a.watch();
            var Vu = function() {
                    function l(l) {
                        this.configurationService = l, this.altcoinName = "Juicycoin"
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            n && n.application && null !== n.application.altcoinName && (l.altcoinName = n.application.altcoinName)
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l
                }(),
                Bu = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".container[_ngcontent-%COMP%]{justify-content:center}.heading[_ngcontent-%COMP%]{background:rgba(0,0,0,.13);justify-content:center;margin-bottom:10px;padding:12px 20px}.whitepaper-container.offer-container[_ngcontent-%COMP%]{max-width:700px;min-width:400px;width:70%}.faq-container[_ngcontent-%COMP%]{max-width:500px;min-width:200px;width:70%}.text-justify[_ngcontent-%COMP%]{text-align:justify}mat-card[_ngcontent-%COMP%]{margin-bottom:10px}"]
                    ],
                    data: {}
                });

            function Hu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 136, "div", [
                    ["class", "container"],
                    ["fxLayout", "row"],
                    ["fxLayout.lt-md", "column"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtMd: [1, "layoutLtMd"]
                }, null), t["\u0275did"](2, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 72, "div", [
                    ["class", "whitepaper-container offer-container"],
                    ["fxFlexAlign", "center"]
                ], null, null, null, null, null)), t["\u0275did"](4, 737280, null, 0, x.a, [L.h, t.ElementRef, L.l], {
                    align: [0, "align"]
                }, null), (l()(), t["\u0275eld"](5, 0, null, null, 6, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](6, 0, null, null, 5, "span", [], null, null, null, null, null)), (l()(), t["\u0275ted"](7, null, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](9, 0, null, null, 2, "small", [
                    ["style", "margin-left: 10px;"]
                ], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), t["\u0275pod"](10, {
                    juicycoin: 0
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](12, 0, null, null, 21, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](13, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](14, 0, null, 0, 8, "h4", [], null, null, null, null, null)), (l()(), t["\u0275ted"](15, null, ["", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](17, 0, null, null, 5, "small", [
                    ["style", "margin-left: 10px;"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, ["("])), (l()(), t["\u0275eld"](19, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](20, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["WHITEPAPER_REFERENCES"])), (l()(), t["\u0275ted"](-1, null, [")"])), (l()(), t["\u0275eld"](23, 0, null, 0, 10, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](24, 0, null, null, 4, "a", [
                    ["href", "https://ponzico.win/ponzico.pdf"],
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](25, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](26, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](27, 0, null, 0, 0, "i", [
                    ["class", "fas fa-university fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" PonzICO Whitepaper"])), (l()(), t["\u0275eld"](29, 0, null, null, 4, "a", [
                    ["href", "https://www.sec.gov/investor/alerts/ia_virtualcurrencies.pdf"],
                    ["rel", "noopener noreferrer"],
                    ["target", "_blank"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](30, 0, null, null, 3, "button", [
                    ["color", "accent"],
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](31, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](32, 0, null, 0, 0, "i", [
                    ["class", "fas fa-graduation-cap fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" PonziCoin Whitepaper"])), (l()(), t["\u0275eld"](34, 0, null, null, 41, "div", [
                    ["class", "offer-box"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](35, 0, null, null, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](36, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["SECTION_SALES_PITCH"])), (l()(), t["\u0275eld"](38, 0, null, null, 37, "p", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Lorem ipsum dolor sit amet "])), (l()(), t["\u0275eld"](40, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](41, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](42, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [", consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "])), (l()(), t["\u0275eld"](44, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](45, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["GIVE_US_ALL_YOUR_MONEY"])), (l()(), t["\u0275ted"](-1, null, [" Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. "])), (l()(), t["\u0275eld"](48, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](49, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["GIVE_US_ALL_YOUR_MONEY"])), (l()(), t["\u0275ted"](-1, null, [" Ut wisi enim ad minim veniam, quis "])), (l()(), t["\u0275eld"](52, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](53, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](54, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. "])), (l()(), t["\u0275eld"](56, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](57, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["GIVE_US_ALL_YOUR_MONEY"])), (l()(), t["\u0275ted"](-1, null, [" Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. "])), (l()(), t["\u0275eld"](60, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](61, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["GIVE_US_ALL_YOUR_MONEY"])), (l()(), t["\u0275ted"](-1, null, [" Duis autem vel eum "])), (l()(), t["\u0275eld"](64, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](65, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](66, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. "])), (l()(), t["\u0275eld"](68, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](69, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["GIVE_US_ALL_YOUR_MONEY"])), (l()(), t["\u0275ted"](-1, null, [" At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. "])), (l()(), t["\u0275eld"](72, 0, null, null, 2, "span", [
                    ["class", "badge"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](73, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](74, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur. "])), (l()(), t["\u0275eld"](76, 0, null, null, 59, "div", [
                    ["class", "faq-container"],
                    ["fxFlexAlign.lt-md", "center"]
                ], null, null, null, null, null)), t["\u0275did"](77, 737280, null, 0, x.a, [L.h, t.ElementRef, L.l], {
                    alignLtMd: [0, "alignLtMd"]
                }, null), (l()(), t["\u0275eld"](78, 0, null, null, 3, "div", [
                    ["class", "heading"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](79, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](80, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["ICO_FAQ"])), (l()(), t["\u0275eld"](82, 0, null, null, 14, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](83, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](84, 0, null, 0, 6, "h5", [], null, null, null, null, null)), (l()(), t["\u0275eld"](85, 0, null, null, 0, "i", [
                    ["class", "fas fa-comments fa-2x"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Stet "])), (l()(), t["\u0275eld"](87, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](88, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](89, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" clita kasd gubergren?"])), (l()(), t["\u0275eld"](91, 0, null, 0, 5, "small", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Stet clita kasd gubergren, no "])), (l()(), t["\u0275eld"](93, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](94, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](95, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "])), (l()(), t["\u0275eld"](97, 0, null, null, 10, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](98, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](99, 0, null, 0, 2, "h5", [], null, null, null, null, null)), (l()(), t["\u0275eld"](100, 0, null, null, 0, "i", [
                    ["class", "far fa-comment-alt fa-2x"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Consetetur sadipscing elitr?"])), (l()(), t["\u0275eld"](102, 0, null, 0, 5, "small", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed "])), (l()(), t["\u0275eld"](104, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](105, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](106, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "])), (l()(), t["\u0275eld"](108, 0, null, null, 10, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](109, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](110, 0, null, 0, 6, "h5", [], null, null, null, null, null)), (l()(), t["\u0275eld"](111, 0, null, null, 0, "i", [
                    ["class", "far fa-comments fa-2x"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Hendrerit "])), (l()(), t["\u0275eld"](113, 0, null, null, 2, "strong", [], null, null, null, null, null)), (l()(), t["\u0275eld"](114, 0, null, null, 0, "i", [
                    ["class", "fab fa-bitcoin"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](115, null, [" ", ""])), (l()(), t["\u0275ted"](-1, null, [" in vulputate velit?"])), (l()(), t["\u0275eld"](117, 0, null, 0, 1, "small", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. "])), (l()(), t["\u0275eld"](119, 0, null, null, 6, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](120, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](121, 0, null, 0, 2, "h5", [], null, null, null, null, null)), (l()(), t["\u0275eld"](122, 0, null, null, 0, "i", [
                    ["class", "fas fa-comment-alt fa-2x"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" Justo duo dolores et ea rebum?"])), (l()(), t["\u0275eld"](124, 0, null, 0, 1, "small", [
                    ["class", "text-justify"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, null, [" At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "])), (l()(), t["\u0275eld"](126, 0, null, null, 9, "mat-card", [
                    ["class", "mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](127, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](128, 0, null, 0, 4, "h5", [], null, null, null, null, null)), (l()(), t["\u0275eld"](129, 0, null, null, 0, "i", [
                    ["class", "fas fa-comments fa-2x"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](130, 0, null, null, 2, "span", [
                    ["style", "margin-left: 10px;"]
                ], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), t["\u0275pod"](131, {
                    juicycoin: 0
                }), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](133, 0, null, 0, 2, "small", [
                    ["class", "text-justify"],
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](134, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["ICO_FAQ_ANSWER"])), (l()(), t["\u0275eld"](136, 0, null, null, 0, "img", [
                    ["src", "/assets/public/images/tracking/tokensale.png"]
                ], null, null, null, null, null))], function(l, n) {
                    l(n, 1, 0, "row", "column"), l(n, 2, 0, "20px"), l(n, 4, 0, "center"), l(n, 20, 0, ""), l(n, 26, 0, "accent"), l(n, 31, 0, "accent"), l(n, 36, 0, ""), l(n, 45, 0, ""), l(n, 49, 0, ""), l(n, 57, 0, ""), l(n, 61, 0, ""), l(n, 69, 0, ""), l(n, 77, 0, "center"), l(n, 80, 0, ""), l(n, 134, 0, "")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 7, 0, t["\u0275unv"](n, 7, 0, t["\u0275nov"](n, 8).transform("TITLE_TOKENSALE")));
                    var u = t["\u0275unv"](n, 9, 0, t["\u0275nov"](n, 11).transform("SECTION_ICO", l(n, 10, 0, e.altcoinName)));
                    l(n, 9, 0, u), l(n, 15, 0, t["\u0275unv"](n, 15, 0, t["\u0275nov"](n, 16).transform("SECTION_WHITEPAPER"))), l(n, 25, 0, t["\u0275nov"](n, 26).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 26)._animationMode), l(n, 30, 0, t["\u0275nov"](n, 31).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 31)._animationMode), l(n, 42, 0, e.altcoinName), l(n, 54, 0, e.altcoinName), l(n, 66, 0, e.altcoinName), l(n, 74, 0, e.altcoinName), l(n, 89, 0, e.altcoinName), l(n, 95, 0, e.altcoinName), l(n, 106, 0, e.altcoinName), l(n, 115, 0, e.altcoinName);
                    var o = t["\u0275unv"](n, 130, 0, t["\u0275nov"](n, 132).transform("ICO_FAQ_QUESTION", l(n, 131, 0, e.altcoinName)));
                    l(n, 130, 0, o)
                })
            }

            function zu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-token-sale", [], null, null, null, Hu, Bu)), t["\u0275did"](1, 114688, null, 0, Vu, [d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Zu = t["\u0275ccf"]("app-token-sale", Vu, zu, {}, {}, []),
                $u = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".img-thumbnail[_ngcontent-%COMP%]{height:auto;max-width:100%;width:140px}mat-form-field[_ngcontent-%COMP%]{width:100%}blockquote[_ngcontent-%COMP%]{border-left:5px solid #d3d3d3}blockquote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-left:5px}.btn-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(2){left:530px;width:50px}"]
                    ],
                    data: {}
                });

            function Yu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "button", [
                    ["class", "review-button"],
                    ["color", "secondary"],
                    ["mat-stroked-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.editReview(l.parent.context.$implicit) && t), t
                }, R.b, R.a)), t["\u0275did"](1, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, 0, 0, "i", [
                    ["class", "fas fa-user-edit"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](3, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "secondary")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 1)._animationMode), l(n, 3, 0, t["\u0275unv"](n, 3, 0, t["\u0275nov"](n, 4).transform("BTN_EDIT")))
                })
            }

            function Qu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 16, "blockquote", [], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 13, "div", [
                    ["fxLayout", "row"]
                ], null, null, null, null, null)), t["\u0275did"](2, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](3, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](4, 0, null, null, 1, "cite", [], null, null, null, null, null)), (l()(), t["\u0275ted"](5, null, ["", ""])), (l()(), t["\u0275eld"](6, 0, null, null, 1, "p", [], null, null, null, null, null)), (l()(), t["\u0275ted"](7, null, ["", ""])), (l()(), t["\u0275eld"](8, 0, null, null, 6, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](9, 0, null, null, 5, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.likeReview(l.context.$implicit) && t), t
                }, R.b, R.a)), t["\u0275did"](10, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"]
                }, null), (l()(), t["\u0275eld"](11, 0, null, 0, 3, "span", [
                    ["class", "fa-2x fa-layers fa-fw"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](12, 0, null, null, 0, "i", [
                    ["class", "fas fa-thumbs-up"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](13, 0, null, null, 1, "span", [
                    ["class", "fa-layers-counter fa-layers-bottom-right accent-notification"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](14, null, ["", ""])), (l()(), t["\u0275and"](16777216, null, null, 1, null, Yu)), t["\u0275did"](16, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, "row"), l(n, 10, 0, n.context.$implicit.liked || !e.isLoggedIn()), l(n, 16, 0, "Anonymous" !== n.context.$implicit.author && n.context.$implicit.author === e.author)
                }, function(l, n) {
                    l(n, 5, 0, n.context.$implicit.author), l(n, 7, 0, n.context.$implicit.message), l(n, 9, 0, t["\u0275nov"](n, 10).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 10)._animationMode), l(n, 14, 0, n.context.$implicit.likesCount)
                })
            }

            function Gu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 63, "mat-dialog-content", [
                    ["class", "mat-dialog-content"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, V.i, [], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 54, "div", [
                    ["class", "container mat-typography"],
                    ["fxLayout", "column"]
                ], null, null, null, null, null)), t["\u0275did"](3, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](4, 0, null, null, 1, "h1", [], null, null, null, null, null)), (l()(), t["\u0275ted"](5, null, ["", ""])), (l()(), t["\u0275eld"](6, 0, null, null, 19, "div", [
                    ["fxLayout", "row"],
                    ["fxLayout.lt-sm", "column"],
                    ["fxLayoutGap", "20px"]
                ], null, null, null, null, null)), t["\u0275did"](7, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"],
                    layoutLtSm: [1, "layoutLtSm"]
                }, null), t["\u0275did"](8, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](9, 0, null, null, 5, "div", [
                    ["fxFlex", "noshrink"]
                ], null, null, null, null, null)), t["\u0275did"](10, 737280, null, 0, x.b, [L.h, t.ElementRef, [3, x.e], L.l, L.f], {
                    flex: [0, "flex"]
                }, null), (l()(), t["\u0275eld"](11, 0, null, null, 2, "h4", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](12, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_IMAGE"])), (l()(), t["\u0275eld"](14, 0, null, null, 0, "img", [
                    ["class", "img-thumbnail"]
                ], [
                    [8, "src", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](15, 0, null, null, 5, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](16, 0, null, null, 2, "h4", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](17, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_PRICE"])), (l()(), t["\u0275eld"](19, 0, null, null, 1, "p", [], null, null, null, null, null)), (l()(), t["\u0275ted"](20, null, ["", ""])), (l()(), t["\u0275eld"](21, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](22, 0, null, null, 2, "h4", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](23, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_DESCRIPTION"])), (l()(), t["\u0275eld"](25, 0, null, null, 0, "div", [], [
                    [8, "innerHTML", 1]
                ], null, null, null, null)), (l()(), t["\u0275eld"](26, 0, null, null, 30, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](27, 0, null, null, 2, "h3", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](28, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_REVIEWS"])), (l()(), t["\u0275and"](16777216, null, null, 2, null, Qu)), t["\u0275did"](31, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), t["\u0275pid"](131072, _.AsyncPipe, [t.ChangeDetectorRef]), (l()(), t["\u0275eld"](33, 0, null, null, 23, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](34, 0, null, null, 17, "mat-form-field", [
                    ["appearance", "outline"],
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](35, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    appearance: [0, "appearance"]
                }, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](43, 0, [
                    ["textPut", 1]
                ], 1, 8, "textarea", [
                    ["class", "mat-input-element mat-form-field-autofill-control cdk-textarea-autosize mat-autosize"],
                    ["cols", "50"],
                    ["matAutosizeMaxRows", "4"],
                    ["matAutosizeMinRows", "2"],
                    ["matInput", ""],
                    ["matTextareaAutosize", ""],
                    ["placeholder", ""],
                    ["rows", "1"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 44)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 44).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 44)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 44)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 49)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 49)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 49)._onInput() && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 50)._noopInputHandler() && u), u
                }, null, null)), t["\u0275did"](44, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](46, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](48, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](49, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    placeholder: [0, "placeholder"]
                }, null), t["\u0275did"](50, 4603904, null, 0, Kl.d, [t.ElementRef, w.a, t.NgZone], {
                    matAutosizeMinRows: [0, "matAutosizeMinRows"],
                    matAutosizeMaxRows: [1, "matAutosizeMaxRows"],
                    matTextareaAutosize: [2, "matTextareaAutosize"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](52, 0, null, null, 4, "button", [
                    ["color", "primary"],
                    ["id", "submitButton"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== l.component.addReview(t["\u0275nov"](l, 43)) && u), u
                }, R.b, R.a)), t["\u0275did"](53, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](54, 0, null, 0, 0, "i", [
                    ["class", "fas fa-paper-plane fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](55, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](57, 0, null, null, 6, "footer", [], null, null, null, null, null)), (l()(), t["\u0275eld"](58, 0, null, null, 5, "button", [
                    ["class", "close-dialog"],
                    ["mat-dialog-close", ""],
                    ["mat-raised-button", ""],
                    ["type", "button"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-label", 0]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 60).dialogRef.close(t["\u0275nov"](l, 60).dialogResult) && u), u
                }, R.b, R.a)), t["\u0275did"](59, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](60, 606208, null, 0, V.f, [
                    [2, V.k], t.ElementRef, V.e
                ], {
                    dialogResult: [0, "dialogResult"]
                }, null), (l()(), t["\u0275eld"](61, 0, null, 0, 0, "i", [
                    ["class", "fas fa-arrow-circle-left fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](62, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, "column"), l(n, 7, 0, "row", "column"), l(n, 8, 0, "20px"), l(n, 10, 0, "noshrink"), l(n, 12, 0, ""), l(n, 17, 0, ""), l(n, 23, 0, ""), l(n, 28, 0, ""), l(n, 31, 0, t["\u0275unv"](n, 31, 0, t["\u0275nov"](n, 32).transform(e.reviews$))), l(n, 35, 0, "outline"), l(n, 46, 0, e.reviewControl), l(n, 49, 0, ""), l(n, 50, 0, "2", "4", ""), l(n, 53, 0, "primary"), l(n, 60, 0, "")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 5, 0, e.data.name), l(n, 14, 0, "assets/public/images/products/" + e.data.image), l(n, 20, 0, e.data.price), l(n, 25, 0, e.data.description), l(n, 34, 1, ["standard" == t["\u0275nov"](n, 35).appearance, "fill" == t["\u0275nov"](n, 35).appearance, "outline" == t["\u0275nov"](n, 35).appearance, "legacy" == t["\u0275nov"](n, 35).appearance, t["\u0275nov"](n, 35)._control.errorState, t["\u0275nov"](n, 35)._canLabelFloat, t["\u0275nov"](n, 35)._shouldLabelFloat(), t["\u0275nov"](n, 35)._hideControlPlaceholder(), t["\u0275nov"](n, 35)._control.disabled, t["\u0275nov"](n, 35)._control.autofilled, t["\u0275nov"](n, 35)._control.focused, "accent" == t["\u0275nov"](n, 35).color, "warn" == t["\u0275nov"](n, 35).color, t["\u0275nov"](n, 35)._shouldForward("untouched"), t["\u0275nov"](n, 35)._shouldForward("touched"), t["\u0275nov"](n, 35)._shouldForward("pristine"), t["\u0275nov"](n, 35)._shouldForward("dirty"), t["\u0275nov"](n, 35)._shouldForward("valid"), t["\u0275nov"](n, 35)._shouldForward("invalid"), t["\u0275nov"](n, 35)._shouldForward("pending"), !t["\u0275nov"](n, 35)._animationsEnabled]), l(n, 43, 1, [t["\u0275nov"](n, 48).ngClassUntouched, t["\u0275nov"](n, 48).ngClassTouched, t["\u0275nov"](n, 48).ngClassPristine, t["\u0275nov"](n, 48).ngClassDirty, t["\u0275nov"](n, 48).ngClassValid, t["\u0275nov"](n, 48).ngClassInvalid, t["\u0275nov"](n, 48).ngClassPending, t["\u0275nov"](n, 49)._isServer, t["\u0275nov"](n, 49).id, t["\u0275nov"](n, 49).placeholder, t["\u0275nov"](n, 49).disabled, t["\u0275nov"](n, 49).required, t["\u0275nov"](n, 49).readonly && !t["\u0275nov"](n, 49)._isNativeSelect || null, t["\u0275nov"](n, 49)._ariaDescribedby || null, t["\u0275nov"](n, 49).errorState, t["\u0275nov"](n, 49).required.toString()]), l(n, 52, 0, t["\u0275nov"](n, 53).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 53)._animationMode), l(n, 55, 0, t["\u0275unv"](n, 55, 0, t["\u0275nov"](n, 56).transform("BTN_SUBMIT"))), l(n, 58, 0, t["\u0275nov"](n, 59).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 59)._animationMode, t["\u0275nov"](n, 60).ariaLabel), l(n, 62, 0, t["\u0275unv"](n, 62, 0, t["\u0275nov"](n, 63).transform("BTN_CLOSE")))
                })
            }

            function Wu(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-product-details", [], null, null, null, Gu, $u)), t["\u0275did"](1, 245760, null, 0, Ct, [V.e, V.a, bt, N], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var Ku = t["\u0275ccf"]("app-product-details", Ct, Wu, {}, {}, []),
                Xu = e("QViY"),
                Ju = e("JJ7l"),
                lo = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [""]
                    ],
                    data: {}
                });

            function no(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 22, "div", [
                    ["class", "qr-code mat-typography"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "header", [], null, null, null, null, null)), (l()(), t["\u0275eld"](2, 0, null, null, 2, "h3", [], null, null, null, null, null)), (l()(), t["\u0275ted"](3, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](5, 0, null, null, 10, "div", [
                    ["fxLayout", "column"],
                    ["fxLayoutGap", "10px"]
                ], null, null, null, null, null)), t["\u0275did"](6, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](7, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](8, 0, null, null, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](9, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275eld"](10, 0, null, null, 3, "div", [
                    ["class", "container"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](11, 0, null, null, 2, "a", [], [
                    [8, "href", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](12, 0, null, null, 1, "qrcode", [], null, null, null, Xu.b, Xu.a)), t["\u0275did"](13, 638976, null, 0, Ju.a, [t.ElementRef], {
                    level: [0, "level"],
                    qrdata: [1, "qrdata"],
                    size: [2, "size"]
                }, null), (l()(), t["\u0275eld"](14, 0, null, null, 1, "small", [], null, null, null, null, null)), (l()(), t["\u0275ted"](15, null, ["", ""])), (l()(), t["\u0275eld"](16, 0, null, null, 6, "footer", [], null, null, null, null, null)), (l()(), t["\u0275eld"](17, 0, null, null, 5, "button", [
                    ["class", "close-dialog"],
                    ["mat-dialog-close", ""],
                    ["mat-raised-button", ""],
                    ["type", "button"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-label", 0]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 19).dialogRef.close(t["\u0275nov"](l, 19).dialogResult) && u), u
                }, R.b, R.a)), t["\u0275did"](18, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](19, 606208, null, 0, V.f, [
                    [2, V.k], t.ElementRef, V.e
                ], {
                    dialogResult: [0, "dialogResult"]
                }, null), (l()(), t["\u0275eld"](20, 0, null, 0, 0, "i", [
                    ["class", "fas fa-arrow-circle-left fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](21, 0, [" ", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 6, 0, "column"), l(n, 7, 0, "10px"), l(n, 13, 0, "M", e.data, 300), l(n, 19, 0, "")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, t["\u0275unv"](n, 3, 0, t["\u0275nov"](n, 4).transform(e.title))), l(n, 8, 0, t["\u0275nov"](n, 9).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 9).vertical, !t["\u0275nov"](n, 9).vertical, t["\u0275nov"](n, 9).inset), l(n, 11, 0, e.url), l(n, 15, 0, e.address), l(n, 17, 0, t["\u0275nov"](n, 18).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 18)._animationMode, t["\u0275nov"](n, 19).ariaLabel), l(n, 21, 0, t["\u0275unv"](n, 21, 0, t["\u0275nov"](n, 22).transform("BTN_CLOSE")))
                })
            }

            function eo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-qr-code", [], null, null, null, no, lo)), t["\u0275did"](1, 114688, null, 0, Jl, [V.a], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var to = t["\u0275ccf"]("app-qr-code", Jl, eo, {}, {}, []),
                uo = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-divider[_ngcontent-%COMP%]{margin-bottom:10px}"]
                    ],
                    data: {}
                });

            function oo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 36, "div", [
                    ["class", "mat-typography"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 3, "header", [], null, null, null, null, null)), (l()(), t["\u0275eld"](2, 0, null, null, 2, "h3", [], null, null, null, null, null)), (l()(), t["\u0275ted"](3, null, ["", " #", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](5, 0, null, null, 1, "mat-divider", [
                    ["class", "mat-divider"],
                    ["role", "separator"]
                ], [
                    [1, "aria-orientation", 0],
                    [2, "mat-divider-vertical", null],
                    [2, "mat-divider-horizontal", null],
                    [2, "mat-divider-inset", null]
                ], null, null, mt.b, mt.a)), t["\u0275did"](6, 49152, null, 0, ht.a, [], null, null), (l()(), t["\u0275eld"](7, 0, null, null, 22, "div", [
                    ["class", "container"],
                    ["fxLayout", "column"]
                ], null, null, null, null, null)), t["\u0275did"](8, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](9, 0, null, null, 7, "div", [
                    ["fxLayout", "row"],
                    ["fxLayoutGap", "10px"]
                ], null, null, null, null, null)), t["\u0275did"](10, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](11, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](12, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](13, 0, null, null, 1, "strong", [
                    ["translate", "LABEL_EMAIL"]
                ], null, null, null, null, null)), t["\u0275did"](14, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275eld"](15, 0, null, null, 1, "p", [], null, null, null, null, null)), (l()(), t["\u0275ted"](16, null, ["", ""])), (l()(), t["\u0275eld"](17, 0, null, null, 12, "div", [
                    ["fxLayout", "row"],
                    ["fxLayoutGap", "10px"]
                ], null, null, null, null, null)), t["\u0275did"](18, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](19, 1785856, null, 0, x.f, [L.h, t.ElementRef, [6, x.e], t.NgZone, A.b, L.l], {
                    gap: [0, "gap"]
                }, null), (l()(), t["\u0275eld"](20, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](21, 0, null, null, 1, "strong", [
                    ["translate", "LABEL_CREATED_AT"]
                ], null, null, null, null, null)), t["\u0275did"](22, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275eld"](23, 0, null, null, 1, "p", [], null, null, null, null, null)), (l()(), t["\u0275ted"](24, null, ["", ""])), (l()(), t["\u0275eld"](25, 0, null, null, 4, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](26, 0, null, null, 1, "strong", [
                    ["translate", "LABEL_UPDATED_AT"]
                ], null, null, null, null, null)), t["\u0275did"](27, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275eld"](28, 0, null, null, 1, "p", [], null, null, null, null, null)), (l()(), t["\u0275ted"](29, null, ["", ""])), (l()(), t["\u0275eld"](30, 0, null, null, 6, "footer", [], null, null, null, null, null)), (l()(), t["\u0275eld"](31, 0, null, null, 5, "button", [
                    ["class", "close-dialog"],
                    ["mat-dialog-close", ""],
                    ["mat-raised-button", ""],
                    ["type", "button"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-label", 0]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 33).dialogRef.close(t["\u0275nov"](l, 33).dialogResult) && u), u
                }, R.b, R.a)), t["\u0275did"](32, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](33, 606208, null, 0, V.f, [
                    [2, V.k], t.ElementRef, V.e
                ], {
                    dialogResult: [0, "dialogResult"]
                }, null), (l()(), t["\u0275eld"](34, 0, null, 0, 0, "i", [
                    ["class", "fas fa-arrow-circle-left fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](35, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 8, 0, "column"), l(n, 10, 0, "row"), l(n, 11, 0, "10px"), l(n, 14, 0, "LABEL_EMAIL"), l(n, 18, 0, "row"), l(n, 19, 0, "10px"), l(n, 22, 0, "LABEL_CREATED_AT"), l(n, 27, 0, "LABEL_UPDATED_AT"), l(n, 33, 0, "")
                }, function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, t["\u0275unv"](n, 3, 0, t["\u0275nov"](n, 4).transform("LABEL_USER")), null == e.user ? null : e.user.id), l(n, 5, 0, t["\u0275nov"](n, 6).vertical ? "vertical" : "horizontal", t["\u0275nov"](n, 6).vertical, !t["\u0275nov"](n, 6).vertical, t["\u0275nov"](n, 6).inset), l(n, 16, 0, null == e.user ? null : e.user.email), l(n, 24, 0, null == e.user ? null : e.user.createdAt), l(n, 29, 0, null == e.user ? null : e.user.updatedAt), l(n, 31, 0, t["\u0275nov"](n, 32).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 32)._animationMode, t["\u0275nov"](n, 33).ariaLabel), l(n, 35, 0, t["\u0275unv"](n, 35, 0, t["\u0275nov"](n, 36).transform("BTN_CLOSE")))
                })
            }

            function ao(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-user-details", [], null, null, null, oo, uo)), t["\u0275did"](1, 114688, null, 0, M, [V.a, N], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var io = t["\u0275ccf"]("app-user-details", M, ao, {}, {}, []),
                ro = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [""]
                    ],
                    data: {}
                });

            function so(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 37, "mat-dialog-content", [
                    ["class", "mat-dialog-content"]
                ], null, null, null, null, null)), t["\u0275did"](1, 16384, null, 0, V.i, [], null, null), (l()(), t["\u0275eld"](2, 0, null, null, 28, "div", [
                    ["class", "container mat-typography"],
                    ["fxLayout", "column"]
                ], null, null, null, null, null)), t["\u0275did"](3, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), (l()(), t["\u0275eld"](4, 0, null, null, 2, "h1", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](5, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["LABEL_EDIT_REVIEW"])), (l()(), t["\u0275eld"](7, 0, null, null, 23, "div", [], null, null, null, null, null)), (l()(), t["\u0275eld"](8, 0, null, null, 17, "mat-form-field", [
                    ["class", "mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](9, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 1, {
                    _control: 0
                }), t["\u0275qud"](335544320, 2, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 3, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 4, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 5, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 6, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 7, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](17, 0, [
                    ["textPut", 1]
                ], 1, 8, "textarea", [
                    ["class", "mat-input-element mat-form-field-autofill-control cdk-textarea-autosize mat-autosize"],
                    ["cols", "50"],
                    ["matAutosizeMaxRows", "4"],
                    ["matAutosizeMinRows", "2"],
                    ["matInput", ""],
                    ["matTextareaAutosize", ""],
                    ["placeholder", ""],
                    ["rows", "1"]
                ], [
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "input"],
                    [null, "blur"],
                    [null, "compositionstart"],
                    [null, "compositionend"],
                    [null, "focus"]
                ], function(l, n, e) {
                    var u = !0;
                    return "input" === n && (u = !1 !== t["\u0275nov"](l, 18)._handleInput(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 18).onTouched() && u), "compositionstart" === n && (u = !1 !== t["\u0275nov"](l, 18)._compositionStart() && u), "compositionend" === n && (u = !1 !== t["\u0275nov"](l, 18)._compositionEnd(e.target.value) && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 23)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 23)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 23)._onInput() && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 24)._noopInputHandler() && u), u
                }, null, null)), t["\u0275did"](18, 16384, null, 0, T.c, [t.Renderer2, t.ElementRef, [2, T.a]], null, null), t["\u0275prd"](1024, null, T.j, function(l) {
                    return [l]
                }, [T.c]), t["\u0275did"](20, 540672, null, 0, T.f, [
                    [8, null],
                    [8, null],
                    [6, T.j],
                    [2, T.s]
                ], {
                    form: [0, "form"]
                }, null), t["\u0275prd"](2048, null, T.k, null, [T.f]), t["\u0275did"](22, 16384, null, 0, T.l, [
                    [4, T.k]
                ], null, null), t["\u0275did"](23, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [6, T.k],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    placeholder: [0, "placeholder"]
                }, null), t["\u0275did"](24, 4603904, null, 0, Kl.d, [t.ElementRef, w.a, t.NgZone], {
                    matAutosizeMinRows: [0, "matAutosizeMinRows"],
                    matAutosizeMaxRows: [1, "matAutosizeMaxRows"],
                    matTextareaAutosize: [2, "matTextareaAutosize"]
                }, null), t["\u0275prd"](2048, [
                    [1, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](26, 0, null, null, 4, "button", [
                    ["color", "primary"],
                    ["mat-raised-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.editReview() && t), t
                }, R.b, R.a)), t["\u0275did"](27, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    color: [0, "color"]
                }, null), (l()(), t["\u0275eld"](28, 0, null, 0, 0, "i", [
                    ["class", "fas fa-paper-plane fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](29, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](31, 0, null, null, 6, "footer", [], null, null, null, null, null)), (l()(), t["\u0275eld"](32, 0, null, null, 5, "button", [
                    ["class", "close-dialog"],
                    ["mat-dialog-close", ""],
                    ["mat-raised-button", ""],
                    ["type", "button"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-label", 0]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 34).dialogRef.close(t["\u0275nov"](l, 34).dialogResult) && u), u
                }, R.b, R.a)), t["\u0275did"](33, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](34, 606208, null, 0, V.f, [
                    [2, V.k], t.ElementRef, V.e
                ], {
                    dialogResult: [0, "dialogResult"]
                }, null), (l()(), t["\u0275eld"](35, 0, null, 0, 0, "i", [
                    ["class", "fas fa-arrow-circle-left fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](36, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, "column"), l(n, 5, 0, ""), l(n, 20, 0, e.editReviewControl), l(n, 23, 0, ""), l(n, 24, 0, "2", "4", ""), l(n, 27, 0, "primary"), l(n, 34, 0, "")
                }, function(l, n) {
                    l(n, 8, 1, ["standard" == t["\u0275nov"](n, 9).appearance, "fill" == t["\u0275nov"](n, 9).appearance, "outline" == t["\u0275nov"](n, 9).appearance, "legacy" == t["\u0275nov"](n, 9).appearance, t["\u0275nov"](n, 9)._control.errorState, t["\u0275nov"](n, 9)._canLabelFloat, t["\u0275nov"](n, 9)._shouldLabelFloat(), t["\u0275nov"](n, 9)._hideControlPlaceholder(), t["\u0275nov"](n, 9)._control.disabled, t["\u0275nov"](n, 9)._control.autofilled, t["\u0275nov"](n, 9)._control.focused, "accent" == t["\u0275nov"](n, 9).color, "warn" == t["\u0275nov"](n, 9).color, t["\u0275nov"](n, 9)._shouldForward("untouched"), t["\u0275nov"](n, 9)._shouldForward("touched"), t["\u0275nov"](n, 9)._shouldForward("pristine"), t["\u0275nov"](n, 9)._shouldForward("dirty"), t["\u0275nov"](n, 9)._shouldForward("valid"), t["\u0275nov"](n, 9)._shouldForward("invalid"), t["\u0275nov"](n, 9)._shouldForward("pending"), !t["\u0275nov"](n, 9)._animationsEnabled]), l(n, 17, 1, [t["\u0275nov"](n, 22).ngClassUntouched, t["\u0275nov"](n, 22).ngClassTouched, t["\u0275nov"](n, 22).ngClassPristine, t["\u0275nov"](n, 22).ngClassDirty, t["\u0275nov"](n, 22).ngClassValid, t["\u0275nov"](n, 22).ngClassInvalid, t["\u0275nov"](n, 22).ngClassPending, t["\u0275nov"](n, 23)._isServer, t["\u0275nov"](n, 23).id, t["\u0275nov"](n, 23).placeholder, t["\u0275nov"](n, 23).disabled, t["\u0275nov"](n, 23).required, t["\u0275nov"](n, 23).readonly && !t["\u0275nov"](n, 23)._isNativeSelect || null, t["\u0275nov"](n, 23)._ariaDescribedby || null, t["\u0275nov"](n, 23).errorState, t["\u0275nov"](n, 23).required.toString()]), l(n, 26, 0, t["\u0275nov"](n, 27).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 27)._animationMode), l(n, 29, 0, t["\u0275unv"](n, 29, 0, t["\u0275nov"](n, 30).transform("BTN_SUBMIT"))), l(n, 32, 0, t["\u0275nov"](n, 33).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 33)._animationMode, t["\u0275nov"](n, 34).ariaLabel), l(n, 36, 0, t["\u0275unv"](n, 36, 0, t["\u0275nov"](n, 37).transform("BTN_CLOSE")))
                })
            }

            function co(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-product-review-edit", [], null, null, null, so, ro)), t["\u0275did"](1, 114688, null, 0, _t, [V.a, bt, V.k], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var fo = t["\u0275ccf"]("app-product-review-edit", _t, co, {}, {}, []),
                po = e("c4Wm"),
                mo = e("Nsh5"),
                ho = e("2Q+G"),
                vo = e("mVsa"),
                go = e("FbN9"),
                bo = e("8mMr"),
                _o = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer, this.host = this.hostServer + "/rest/admin"
                    }
                    return l.prototype.getApplicationVersion = function() {
                        return this.http.get(this.host + "/application-version").pipe(Object(a.a)(function(l) {
                            return l.version
                        }), Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }(),
                Co = [{
                    key: "en",
                    icons: ["gb", "us"],
                    lang: "English"
                }, {
                    key: "ar_SA",
                    icons: ["ae", "tn"],
                    lang: "\u0639\u0631\u0628\u0649"
                }, {
                    key: "az_AZ",
                    icons: ["az"],
                    lang: "Az\u0259rbaycanca",
                    isFlask: !0
                }, {
                    key: "bg_BG",
                    icons: ["bg"],
                    lang: "\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438 (\u0435\u0437\u0438\u043a)"
                }, {
                    key: "cs_CZ",
                    icons: ["cz"],
                    lang: "\u010cesky",
                    isFlask: !0
                }, {
                    key: "da_DK",
                    icons: ["dk"],
                    lang: "Dansk",
                    isFlask: !0
                }, {
                    key: "de_DE",
                    icons: ["de"],
                    lang: "Deutsch"
                }, {
                    key: "el_GR",
                    icons: ["gr"],
                    lang: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
                    isFlask: !0
                }, {
                    key: "es_ES",
                    icons: ["es"],
                    lang: "Espa\xf1ol",
                    isFlask: !0
                }, {
                    key: "et_EE",
                    icons: ["ee"],
                    lang: "Eesti"
                }, {
                    key: "fi_FI",
                    icons: ["fi"],
                    lang: "Suomalainen",
                    isFlask: !0
                }, {
                    key: "fr_FR",
                    icons: ["fr"],
                    lang: "Fran\xe7ais"
                }, {
                    key: "ka_GE",
                    icons: ["ge"],
                    lang: "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8"
                }, {
                    key: "he_IL",
                    icons: ["il"],
                    lang: "\u05e2\u05d1\u05e8\u05d9",
                    isFlask: !0
                }, {
                    key: "hi_IN",
                    icons: ["in"],
                    lang: "\u0939\u093f\u0902\u0926\u0940"
                }, {
                    key: "hu_HU",
                    icons: ["hu"],
                    lang: "Magyar",
                    isFlask: !0
                }, {
                    key: "id_ID",
                    icons: ["id"],
                    lang: "Bahasa Indonesia"
                }, {
                    key: "it_IT",
                    icons: ["it"],
                    lang: "Italiano"
                }, {
                    key: "ja_JP",
                    icons: ["jp"],
                    lang: "\u65e5\u672c\u306e",
                    isFlask: !0
                }, {
                    key: "ko_KR",
                    icons: ["kr"],
                    lang: "\uc601\uc5b4"
                }, {
                    key: "lt_LT",
                    icons: ["lt"],
                    lang: "Lietuvie\u0161u",
                    isFlask: !0
                }, {
                    key: "lv_LV",
                    icons: ["lv"],
                    lang: "Latvijas",
                    isFlask: !0
                }, {
                    key: "my_MM",
                    icons: ["mm"],
                    lang: "\u103b\u1019\u1014\u1039\u1019\u102c",
                    isFlask: !0
                }, {
                    key: "nl_NL",
                    icons: ["nl"],
                    lang: "Nederlands"
                }, {
                    key: "no_NO",
                    icons: ["no"],
                    lang: "Norsk",
                    isFlask: !0
                }, {
                    key: "pl_PL",
                    icons: ["pl"],
                    lang: "J\u0119zyk Polski"
                }, {
                    key: "pt_PT",
                    icons: ["pt"],
                    lang: "Portugu\xeas",
                    isFlask: !0
                }, {
                    key: "pt_BR",
                    icons: ["br"],
                    lang: "Portugu\xeas (Brasil)"
                }, {
                    key: "ro_RO",
                    icons: ["ro"],
                    lang: "Rom\xe2nesc",
                    isFlask: !0
                }, {
                    key: "ru_RU",
                    icons: ["ru"],
                    lang: "P\u0443\u0441\u0441\u043a\u0438\u0439",
                    isFlask: !0
                }, {
                    key: "sv_SE",
                    icons: ["se"],
                    lang: "Svenska"
                }, {
                    key: "tr_TR",
                    icons: ["tr"],
                    lang: "T\xfcrk\xe7e",
                    isFlask: !0
                }, {
                    key: "ur_PK",
                    icons: ["pk"],
                    lang: "\u0627\u0631\u062f\u0648",
                    isFlask: !0
                }, {
                    key: "zh_CN",
                    icons: ["cn"],
                    lang: "\u4e2d\u56fd"
                }, {
                    key: "zh_HK",
                    icons: ["hk"],
                    lang: "\u7e41\u9ad4\u4e2d\u6587",
                    isFlask: !0
                }];
            q.b.add(P.x, P.p, P.E, P.G, P.H, P.h, P.c, P.P, P.v, P.F, P.Y, P.C, P.y, P.V, Tl.f, Dl.b), q.a.watch();
            var Ro = function() {
                    function l(l, n, e, t, u, o, a, i, r) {
                        this.administrationService = l, this.challengeService = n, this.configurationService = e, this.userService = t, this.ngZone = u, this.cookieService = o, this.router = a, this.translate = i, this.io = r, this.userEmail = "", this.languages = Co, this.selectedLanguage = this.languages[0], this.version = "", this.applicationName = "OWASP Juice Shop", this.gitHubRibbon = !0, this.logoSrc = "assets/public/images/JuiceShop_Logo.png", this.scoreBoardVisible = !1
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        if (this.administrationService.getApplicationVersion().subscribe(function(n) {
                                n && (l.version = "v" + n)
                            }, function(l) {
                                return console.log(l)
                            }), this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                                if (n && n.application && n.application.name && null !== n.application.name && (l.applicationName = n.application.name), n && n.application && null !== n.application.gitHubRibbon && (l.gitHubRibbon = n.application.gitHubRibbon), n && n.application && n.application.logo && null !== n.application.logo) {
                                    var e = n.application.logo;
                                    "http" === e.substring(0, 4) && (e = decodeURIComponent(e.substring(e.lastIndexOf("/") + 1))), l.logoSrc = "assets/public/images/" + e
                                }
                            }, function(l) {
                                return console.log(l)
                            }), localStorage.getItem("token") ? this.updateUserEmail() : this.userEmail = "", this.userService.getLoggedInState().subscribe(function(n) {
                                n ? l.updateUserEmail() : l.userEmail = ""
                            }), this.getScoreBoardStatus(), this.ngZone.runOutsideAngular(function() {
                                l.io.socket().on("challenge solved", function() {
                                    l.getScoreBoardStatus()
                                })
                            }), this.cookieService.get("language")) {
                            var n = this.cookieService.get("language");
                            this.translate.use(n), this.selectedLanguage = this.languages.find(function(l) {
                                return l.key === n
                            })
                        }
                    }, l.prototype.search = function(l) {
                        l ? this.router.navigate(["/search"], {
                            queryParams: {
                                q: l
                            }
                        }) : this.router.navigate(["/search"])
                    }, l.prototype.updateUserEmail = function() {
                        var l = this;
                        this.userService.whoAmI().subscribe(function(n) {
                            l.userEmail = n.email
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.isLoggedIn = function() {
                        return localStorage.getItem("token")
                    }, l.prototype.logout = function() {
                        localStorage.removeItem("token"), this.cookieService.remove("token", {
                            domain: document.domain
                        }), sessionStorage.removeItem("bid"), this.userService.isLoggedIn.next(!1), this.router.navigate(["/"])
                    }, l.prototype.changeLanguage = function(l) {
                        this.translate.use(l);
                        var n = new Date;
                        n.setFullYear(n.getFullYear() + 1), this.cookieService.put("language", l, {
                            expires: n
                        })
                    }, l.prototype.getScoreBoardStatus = function() {
                        var l = this;
                        this.challengeService.find({
                            name: "Score Board"
                        }).subscribe(function(n) {
                            l.ngZone.run(function() {
                                l.scoreBoardVisible = n[0].solved
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l.prototype.goToProfilePage = function() {
                        window.location.replace("/profile")
                    }, l
                }(),
                yo = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        ["mat-toolbar[_ngcontent-%COMP%]{height:auto;min-width:100%;padding-bottom:5px;width:100%}.logo[_ngcontent-%COMP%]{max-height:60px;padding-top:7px;width:auto}.fill-remaining-space[_ngcontent-%COMP%]{flex:1 1 auto}.search-input[_ngcontent-%COMP%]{font-size:14px;margin-right:10px;width:11%}.language-select[_ngcontent-%COMP%]{margin-left:10px;width:11%}  .mat-select-value-text{font-size:15px}.user-info[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}.flag-icon[_ngcontent-%COMP%]{margin-right:2px}"]
                    ],
                    data: {}
                });

            function wo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 16777216, null, null, 2, "span", [
                    ["class", "user-info"],
                    ["matTooltipPosition", "right"]
                ], null, [
                    [null, "longpress"],
                    [null, "keydown"],
                    [null, "touchend"]
                ], function(l, n, e) {
                    var u = !0;
                    return "longpress" === n && (u = !1 !== t["\u0275nov"](l, 1).show() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleKeydown(e) && u), "touchend" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleTouchend() && u), u
                }, null, null)), t["\u0275did"](1, 147456, null, 0, Zt.d, [Ne.c, t.ElementRef, Je.b, t.ViewContainerRef, t.NgZone, w.a, E.c, E.h, Zt.b, [2, A.b],
                    [2, Zt.a],
                    [2, B.h]
                ], {
                    position: [0, "position"],
                    message: [1, "message"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 0, "i", [
                    ["class", "fas fa-user-circle fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](0, null, null, 0))], function(l, n) {
                    l(n, 1, 0, "right", t["\u0275inlineInterpolate"](1, "", n.component.userEmail, ""))
                }, null)
            }

            function Eo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 3, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleMouseEnter() && u), "click" === n && (u = !1 !== o.goToProfilePage() && u), u
                }, ho.c, ho.b)), t["\u0275did"](1, 180224, [
                    [2, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](2, 0, null, 0, 0, "i", [
                    ["class", "fas fa-user-circle fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](3, 0, [" ", " "]))], null, function(l, n) {
                    var e = n.component;
                    l(n, 0, 0, t["\u0275nov"](n, 1).role, t["\u0275nov"](n, 1)._highlighted, t["\u0275nov"](n, 1)._triggersSubmenu, t["\u0275nov"](n, 1)._getTabIndex(), t["\u0275nov"](n, 1).disabled.toString(), t["\u0275nov"](n, 1).disabled || null), l(n, 3, 0, e.userEmail)
                })
            }

            function ko(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""],
                    ["routerLink", "/recycle"]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 2)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 2)._handleMouseEnter() && u), u
                }, ho.c, ho.b)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, [
                    [2, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-recycle fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/recycle")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).role, t["\u0275nov"](n, 2)._highlighted, t["\u0275nov"](n, 2)._triggersSubmenu, t["\u0275nov"](n, 2)._getTabIndex(), t["\u0275nov"](n, 2).disabled.toString(), t["\u0275nov"](n, 2).disabled || null), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("NAV_RECYCLE")))
                })
            }

            function Io(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""],
                    ["routerLink", "/track-order"]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 2)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 2)._handleMouseEnter() && u), u
                }, ho.c, ho.b)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, [
                    [2, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-map-marker fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/track-order")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).role, t["\u0275nov"](n, 2)._highlighted, t["\u0275nov"](n, 2)._triggersSubmenu, t["\u0275nov"](n, 2)._getTabIndex(), t["\u0275nov"](n, 2).disabled.toString(), t["\u0275nov"](n, 2).disabled || null), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_TRACK_ORDERS")))
                })
            }

            function So(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""],
                    ["routerLink", "/change-password"]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 2)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 2)._handleMouseEnter() && u), u
                }, ho.c, ho.b)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, [
                    [2, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-user-secret fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/change-password")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).role, t["\u0275nov"](n, 2)._highlighted, t["\u0275nov"](n, 2)._triggersSubmenu, t["\u0275nov"](n, 2)._getTabIndex(), t["\u0275nov"](n, 2).disabled.toString(), t["\u0275nov"](n, 2).disabled || null), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_CHANGE_PASSWORD")))
                })
            }

            function To(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 6, "button", [
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["mat-button", ""],
                    ["routerLink", "/login"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-sign-in-alt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](5, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/login"), l(n, 2, 0, "", "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode), l(n, 5, 0, t["\u0275unv"](n, 5, 0, t["\u0275nov"](n, 6).transform("TITLE_LOGIN")))
                })
            }

            function Do(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["mat-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.logout() && t), t
                }, R.b, R.a)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-sign-out-alt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_LOGOUT")))
                })
            }

            function xo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""],
                    ["routerLink", "/complain"]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 2)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 2)._handleMouseEnter() && u), u
                }, ho.c, ho.b)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, [
                    [4, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-bomb fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/complain")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).role, t["\u0275nov"](n, 2)._highlighted, t["\u0275nov"](n, 2)._triggersSubmenu, t["\u0275nov"](n, 2)._getTabIndex(), t["\u0275nov"](n, 2).disabled.toString(), t["\u0275nov"](n, 2).disabled || null), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("NAV_COMPLAIN")))
                })
            }

            function Lo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 6, "button", [
                    ["fxHide.lt-lg", ""],
                    ["fxShow", ""],
                    ["mat-button", ""],
                    ["routerLink", "/basket"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtLg: [1, "hideLtLg"]
                }, null), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-shopping-cart fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](5, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/basket"), l(n, 2, 0, "", "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode), l(n, 5, 0, t["\u0275unv"](n, 5, 0, t["\u0275nov"](n, 6).transform("TITLE_BASKET")))
                })
            }

            function Ao(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, "flag-icon flag-icon-" + n.context.$implicit)
                })
            }

            function Oo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, "flag-icon flag-icon-" + n.context.$implicit)
                })
            }

            function No(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fas fa-flask"]
                ], null, null, null, null, null))], null, null)
            }

            function qo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 6, "mat-option", [
                    ["class", "mat-option"],
                    ["role", "option"]
                ], [
                    [1, "tabindex", 0],
                    [2, "mat-selected", null],
                    [2, "mat-option-multiple", null],
                    [2, "mat-active", null],
                    [8, "id", 0],
                    [1, "aria-selected", 0],
                    [1, "aria-disabled", 0],
                    [2, "mat-option-disabled", null]
                ], [
                    [null, "click"],
                    [null, "keydown"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1)._selectViaInteraction() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleKeydown(e) && u), "click" === n && (u = !1 !== o.changeLanguage(l.context.$implicit.key) && u), u
                }, We.b, We.a)), t["\u0275did"](1, 8568832, [
                    [13, 4]
                ], 0, Wl.p, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.j],
                    [2, Wl.o]
                ], {
                    value: [0, "value"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Oo)), t["\u0275did"](3, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275ted"](4, 0, [" ", " "])), (l()(), t["\u0275and"](16777216, null, 0, 1, null, No)), t["\u0275did"](6, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    l(n, 1, 0, n.context.$implicit), l(n, 3, 0, n.context.$implicit.icons), l(n, 6, 0, n.context.$implicit.isFlask)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1)._getTabIndex(), t["\u0275nov"](n, 1).selected, t["\u0275nov"](n, 1).multiple, t["\u0275nov"](n, 1).active, t["\u0275nov"](n, 1).id, t["\u0275nov"](n, 1).selected.toString(), t["\u0275nov"](n, 1).disabled.toString(), t["\u0275nov"](n, 1).disabled), l(n, 4, 0, null == n.context.$implicit ? null : n.context.$implicit.lang)
                })
            }

            function Po(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["mat-button", ""],
                    ["routerLink", "/score-board"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-trophy fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/score-board")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_SCORE_BOARD")))
                })
            }

            function Mo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "a", [
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["href", "/redirect?to=https://github.com/bkimminich/juice-shop"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 3, "button", [
                    ["mat-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fab fa-github fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](-1, 0, [" GitHub"]))], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode)
                })
            }

            function Fo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 4, "a", [
                    ["fxHide", ""],
                    ["fxShow.lt-md", ""],
                    ["href", "/redirect?to=https://github.com/bkimminich/juice-shop"]
                ], null, null, null, null, null)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    showLtMd: [0, "showLtMd"],
                    hide: [1, "hide"]
                }, null), (l()(), t["\u0275eld"](2, 0, null, null, 2, "button", [
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], null, null, R.b, R.a)), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fab fa-github fa-lg"]
                ], null, null, null, null, null))], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 2, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode)
                })
            }

            function jo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 6, "button", [
                    ["fxHide", ""],
                    ["fxShow.lt-md", ""],
                    ["mat-button", ""],
                    ["routerLink", "/login"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    showLtMd: [0, "showLtMd"],
                    hide: [1, "hide"]
                }, null), t["\u0275did"](3, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 0, "i", [
                    ["class", "fas fa-sign-in-alt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](5, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/login"), l(n, 2, 0, "", "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 3).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 3)._animationMode), l(n, 5, 0, t["\u0275unv"](n, 5, 0, t["\u0275nov"](n, 6).transform("TITLE_LOGIN")))
                })
            }

            function Uo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["fxHide", ""],
                    ["fxShow.lt-md", ""],
                    ["mat-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.logout() && t), t
                }, R.b, R.a)), t["\u0275did"](1, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    showLtMd: [0, "showLtMd"],
                    hide: [1, "hide"]
                }, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-sign-out-alt fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "", "")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_LOGOUT")))
                })
            }

            function Vo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 5, "button", [
                    ["mat-button", ""],
                    ["routerLink", "/basket"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](1, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](2, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](3, 0, null, 0, 0, "i", [
                    ["class", "fas fa-shopping-cart fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](4, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 1, 0, "/basket")
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 2).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 2)._animationMode), l(n, 4, 0, t["\u0275unv"](n, 4, 0, t["\u0275nov"](n, 5).transform("TITLE_BASKET")))
                })
            }

            function Bo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, "flag-icon flag-icon-" + n.context.$implicit)
                })
            }

            function Ho(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null))], null, function(l, n) {
                    l(n, 0, 0, "flag-icon flag-icon-" + n.context.$implicit)
                })
            }

            function zo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fas fa-flask"]
                ], null, null, null, null, null))], null, null)
            }

            function Zo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 6, "mat-option", [
                    ["class", "mat-option"],
                    ["role", "option"]
                ], [
                    [1, "tabindex", 0],
                    [2, "mat-selected", null],
                    [2, "mat-option-multiple", null],
                    [2, "mat-active", null],
                    [8, "id", 0],
                    [1, "aria-selected", 0],
                    [1, "aria-disabled", 0],
                    [2, "mat-option-disabled", null]
                ], [
                    [null, "click"],
                    [null, "keydown"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 1)._selectViaInteraction() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 1)._handleKeydown(e) && u), "click" === n && (u = !1 !== o.changeLanguage(l.context.$implicit.key) && u), u
                }, We.b, We.a)), t["\u0275did"](1, 8568832, [
                    [30, 4]
                ], 0, Wl.p, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.j],
                    [2, Wl.o]
                ], {
                    value: [0, "value"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Ho)), t["\u0275did"](3, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275ted"](4, 0, [" ", " "])), (l()(), t["\u0275and"](16777216, null, 0, 1, null, zo)), t["\u0275did"](6, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    l(n, 1, 0, n.context.$implicit), l(n, 3, 0, n.context.$implicit.icons), l(n, 6, 0, n.context.$implicit.isFlask)
                }, function(l, n) {
                    l(n, 0, 0, t["\u0275nov"](n, 1)._getTabIndex(), t["\u0275nov"](n, 1).selected, t["\u0275nov"](n, 1).multiple, t["\u0275nov"](n, 1).active, t["\u0275nov"](n, 1).id, t["\u0275nov"](n, 1).selected.toString(), t["\u0275nov"](n, 1).disabled.toString(), t["\u0275nov"](n, 1).disabled), l(n, 4, 0, null == n.context.$implicit ? null : n.context.$implicit.lang)
                })
            }

            function $o(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 156, "mat-toolbar", [
                    ["class", "mat-elevation-z6 mat-toolbar"],
                    ["color", "primary"],
                    ["fxLayout", "column"],
                    ["xmlns", "http://www.w3.org/1999/html"]
                ], [
                    [2, "mat-toolbar-multiple-rows", null],
                    [2, "mat-toolbar-single-row", null]
                ], null, null, go.b, go.a)), t["\u0275did"](1, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](2, 4243456, null, 1, bo.a, [t.ElementRef, w.a, _.DOCUMENT], {
                    color: [0, "color"]
                }, null), t["\u0275qud"](603979776, 1, {
                    _toolbarRows: 1
                }), (l()(), t["\u0275eld"](4, 0, null, 1, 112, "mat-toolbar-row", [
                    ["class", "mat-toolbar-row"],
                    ["fxLayout", "row"]
                ], null, null, null, null, null)), t["\u0275did"](5, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](6, 16384, [
                    [1, 4]
                ], 0, bo.c, [], null, null), (l()(), t["\u0275eld"](7, 0, null, null, 2, "a", [
                    ["routerLink", "/search"]
                ], [
                    [1, "target", 0],
                    [8, "href", 4]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 8).onClick(e.button, e.ctrlKey, e.metaKey, e.shiftKey) && u), u
                }, null, null)), t["\u0275did"](8, 671744, null, 0, ie.m, [ie.k, ie.a, _.LocationStrategy], {
                    routerLink: [0, "routerLink"]
                }, null), (l()(), t["\u0275eld"](9, 0, null, null, 0, "img", [
                    ["class", "logo"]
                ], [
                    [8, "src", 4]
                ], null, null, null, null)), (l()(), t["\u0275eld"](10, 16777216, null, null, 3, "span", [
                    ["fxHide.lt-sm", ""],
                    ["fxShow", ""],
                    ["matTooltipPosition", "below"]
                ], null, [
                    [null, "longpress"],
                    [null, "keydown"],
                    [null, "touchend"]
                ], function(l, n, e) {
                    var u = !0;
                    return "longpress" === n && (u = !1 !== t["\u0275nov"](l, 12).show() && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 12)._handleKeydown(e) && u), "touchend" === n && (u = !1 !== t["\u0275nov"](l, 12)._handleTouchend() && u), u
                }, null, null)), t["\u0275did"](11, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtSm: [1, "hideLtSm"]
                }, null), t["\u0275did"](12, 147456, null, 0, Zt.d, [Ne.c, t.ElementRef, Je.b, t.ViewContainerRef, t.NgZone, w.a, E.c, E.h, Zt.b, [2, A.b],
                    [2, Zt.a],
                    [2, B.h]
                ], {
                    position: [0, "position"],
                    message: [1, "message"]
                }, null), (l()(), t["\u0275ted"](13, null, ["", ""])), (l()(), t["\u0275eld"](14, 16777216, null, null, 4, "button", [
                    ["aria-haspopup", "true"],
                    ["mat-icon-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-expanded", 0]
                ], [
                    [null, "mousedown"],
                    [null, "keydown"],
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "mousedown" === n && (u = !1 !== t["\u0275nov"](l, 16)._handleMousedown(e) && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 16)._handleKeydown(e) && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 16)._handleClick(e) && u), u
                }, R.b, R.a)), t["\u0275did"](15, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](16, 1196032, null, 0, vo.f, [Ne.c, t.ElementRef, t.ViewContainerRef, vo.b, [2, vo.c],
                    [8, null],
                    [2, A.b], E.h
                ], {
                    menu: [0, "menu"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, wo)), t["\u0275did"](18, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](19, 0, null, null, 12, "mat-menu", [], null, null, null, ho.d, ho.a)), t["\u0275prd"](6144, null, vo.h, null, [vo.c]), t["\u0275did"](21, 1294336, [
                    ["userMenu", 4]
                ], 2, vo.c, [t.ElementRef, t.NgZone, vo.a], null, null), t["\u0275qud"](603979776, 2, {
                    items: 1
                }), t["\u0275qud"](335544320, 3, {
                    lazyContent: 0
                }), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Eo)), t["\u0275did"](25, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, ko)), t["\u0275did"](27, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Io)), t["\u0275did"](29, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, So)), t["\u0275did"](31, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, To)), t["\u0275did"](33, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Do)), t["\u0275did"](35, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](36, 16777216, null, null, 6, "button", [
                    ["aria-haspopup", "true"],
                    ["fxHide.lt-lg", ""],
                    ["fxShow", ""],
                    ["mat-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-expanded", 0]
                ], [
                    [null, "mousedown"],
                    [null, "keydown"],
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "mousedown" === n && (u = !1 !== t["\u0275nov"](l, 39)._handleMousedown(e) && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 39)._handleKeydown(e) && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 39)._handleClick(e) && u), u
                }, R.b, R.a)), t["\u0275did"](37, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtLg: [1, "hideLtLg"]
                }, null), t["\u0275did"](38, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](39, 1196032, null, 0, vo.f, [Ne.c, t.ElementRef, t.ViewContainerRef, vo.b, [2, vo.c],
                    [8, null],
                    [2, A.b], E.h
                ], {
                    menu: [0, "menu"]
                }, null), (l()(), t["\u0275eld"](40, 0, null, 0, 0, "i", [
                    ["class", "far fa-comments fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](41, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](43, 0, null, null, 12, "mat-menu", [], null, null, null, ho.d, ho.a)), t["\u0275did"](44, 1294336, [
                    ["contactMenu", 4]
                ], 2, vo.c, [t.ElementRef, t.NgZone, vo.a], null, null), t["\u0275qud"](603979776, 4, {
                    items: 1
                }), t["\u0275qud"](335544320, 5, {
                    lazyContent: 0
                }), t["\u0275prd"](2048, null, vo.h, null, [vo.c]), (l()(), t["\u0275eld"](48, 0, null, 0, 5, "button", [
                    ["class", "mat-menu-item"],
                    ["mat-menu-item", ""],
                    ["routerLink", "/contact"]
                ], [
                    [1, "role", 0],
                    [2, "mat-menu-item-highlighted", null],
                    [2, "mat-menu-item-submenu-trigger", null],
                    [1, "tabindex", 0],
                    [1, "aria-disabled", 0],
                    [1, "disabled", 0]
                ], [
                    [null, "click"],
                    [null, "mouseenter"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 49).onClick() && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 50)._checkDisabled(e) && u), "mouseenter" === n && (u = !1 !== t["\u0275nov"](l, 50)._handleMouseEnter() && u), u
                }, ho.c, ho.b)), t["\u0275did"](49, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](50, 180224, [
                    [4, 4]
                ], 0, vo.d, [t.ElementRef, _.DOCUMENT, E.h, [2, vo.h]], null, null), (l()(), t["\u0275eld"](51, 0, null, 0, 0, "i", [
                    ["class", "fas fa-comment fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](52, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275and"](16777216, null, 0, 1, null, xo)), t["\u0275did"](55, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Lo)), t["\u0275did"](57, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](58, 0, null, null, 23, "mat-form-field", [
                    ["class", "language-select mat-form-field"],
                    ["fxHide.lt-lg", ""],
                    ["fxShow", ""]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](59, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtLg: [1, "hideLtLg"]
                }, null), t["\u0275did"](60, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 6, {
                    _control: 0
                }), t["\u0275qud"](335544320, 7, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 8, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 9, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 10, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 11, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 12, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](68, 0, null, 1, 13, "mat-select", [
                    ["class", "mat-select"],
                    ["role", "listbox"]
                ], [
                    [1, "id", 0],
                    [1, "tabindex", 0],
                    [1, "aria-label", 0],
                    [1, "aria-labelledby", 0],
                    [1, "aria-required", 0],
                    [1, "aria-disabled", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-owns", 0],
                    [1, "aria-multiselectable", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-activedescendant", 0],
                    [2, "mat-select-disabled", null],
                    [2, "mat-select-invalid", null],
                    [2, "mat-select-required", null],
                    [2, "mat-select-empty", null]
                ], [
                    [null, "valueChange"],
                    [null, "keydown"],
                    [null, "focus"],
                    [null, "blur"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "keydown" === n && (u = !1 !== t["\u0275nov"](l, 70)._handleKeydown(e) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 70)._onFocus() && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 70)._onBlur() && u), "valueChange" === n && (u = !1 !== (o.selectedLanguage = e) && u), u
                }, Ke.b, Ke.a)), t["\u0275prd"](6144, null, Wl.j, null, [Xe.c]), t["\u0275did"](70, 2080768, null, 3, Xe.c, [Je.e, t.ChangeDetectorRef, t.NgZone, Wl.b, t.ElementRef, [2, A.b],
                    [2, T.m],
                    [2, T.g],
                    [2, Vl.c],
                    [8, null],
                    [8, null], Xe.a
                ], {
                    value: [0, "value"]
                }, {
                    valueChange: "valueChange"
                }), t["\u0275qud"](603979776, 13, {
                    options: 1
                }), t["\u0275qud"](603979776, 14, {
                    optionGroups: 1
                }), t["\u0275qud"](335544320, 15, {
                    customTrigger: 0
                }), t["\u0275prd"](2048, [
                    [6, 4]
                ], Vl.d, null, [Xe.c]), (l()(), t["\u0275eld"](75, 0, null, 0, 4, "mat-select-trigger", [], null, null, null, null, null)), t["\u0275did"](76, 16384, [
                    [15, 4]
                ], 0, Xe.e, [], null, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Ao)), t["\u0275did"](78, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275ted"](79, null, [" ", " "])), (l()(), t["\u0275and"](16777216, null, 1, 1, null, qo)), t["\u0275did"](81, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275eld"](82, 0, null, null, 0, "span", [
                    ["class", "fill-remaining-space"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](83, 0, null, null, 12, "mat-form-field", [
                    ["class", "search-input mat-form-field"],
                    ["color", "accent"],
                    ["floatLabel", "never"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](84, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], {
                    color: [0, "color"],
                    floatLabel: [1, "floatLabel"]
                }, null), t["\u0275qud"](335544320, 16, {
                    _control: 0
                }), t["\u0275qud"](335544320, 17, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 18, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 19, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 20, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 21, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 22, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](92, 0, [
                    ["searchControl", 1]
                ], 1, 3, "input", [
                    ["class", "mat-input-element mat-form-field-autofill-control"],
                    ["id", "searchQuery"],
                    ["matInput", ""],
                    ["type", "text"]
                ], [
                    [2, "mat-input-server", null],
                    [1, "id", 0],
                    [1, "placeholder", 0],
                    [8, "disabled", 0],
                    [8, "required", 0],
                    [1, "readonly", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-required", 0]
                ], [
                    [null, "blur"],
                    [null, "focus"],
                    [null, "input"]
                ], function(l, n, e) {
                    var u = !0;
                    return "blur" === n && (u = !1 !== t["\u0275nov"](l, 93)._focusChanged(!1) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 93)._focusChanged(!0) && u), "input" === n && (u = !1 !== t["\u0275nov"](l, 93)._onInput() && u), u
                }, null, null)), t["\u0275did"](93, 999424, null, 0, Kl.b, [t.ElementRef, w.a, [8, null],
                    [2, T.m],
                    [2, T.g], Wl.b, [8, null], Xl.a, t.NgZone
                ], {
                    id: [0, "id"],
                    placeholder: [1, "placeholder"],
                    type: [2, "type"]
                }, null), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), t["\u0275prd"](2048, [
                    [16, 4]
                ], Vl.d, null, [Kl.b]), (l()(), t["\u0275eld"](96, 0, null, null, 2, "button", [
                    ["id", "searchButton"],
                    ["mat-icon-button", ""],
                    ["type", "submit"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== l.component.search(t["\u0275nov"](l, 92).value) && u), u
                }, R.b, R.a)), t["\u0275did"](97, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](98, 0, null, 0, 0, "i", [
                    ["class", "fas fa-search fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, Po)), t["\u0275did"](100, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](101, 0, null, null, 6, "button", [
                    ["fxHide.lt-md", ""],
                    ["fxShow", ""],
                    ["mat-button", ""],
                    ["routerLink", "/about"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 102).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](102, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](103, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    show: [0, "show"],
                    hideLtMd: [1, "hideLtMd"]
                }, null), t["\u0275did"](104, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](105, 0, null, 0, 0, "i", [
                    ["class", "fas fa-info-circle fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](106, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](108, 0, null, null, 4, "button", [
                    ["fxHide", ""],
                    ["fxShow.lt-md", ""],
                    ["mat-icon-button", ""],
                    ["routerLink", "/about"]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 109).onClick() && u), u
                }, R.b, R.a)), t["\u0275did"](109, 16384, null, 0, ie.l, [ie.k, ie.a, [8, null], t.Renderer2, t.ElementRef], {
                    routerLink: [0, "routerLink"]
                }, null), t["\u0275did"](110, 737280, null, 0, Ul.b, [L.h, [8, null], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    showLtMd: [0, "showLtMd"],
                    hide: [1, "hide"]
                }, null), t["\u0275did"](111, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), (l()(), t["\u0275eld"](112, 0, null, 0, 0, "i", [
                    ["class", "fas fa-info-circle fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, Mo)), t["\u0275did"](114, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Fo)), t["\u0275did"](116, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](117, 0, null, 1, 39, "mat-toolbar-row", [
                    ["class", "mat-toolbar-row"],
                    ["fxHide", ""],
                    ["fxLayout", "row"],
                    ["fxShow.lt-lg", ""]
                ], null, null, null, null, null)), t["\u0275did"](118, 737280, null, 0, x.e, [L.h, t.ElementRef, L.l], {
                    layout: [0, "layout"]
                }, null), t["\u0275did"](119, 737280, null, 0, Ul.b, [L.h, [6, x.e], t.ElementRef, L.l, t.PLATFORM_ID, [2, L.k]], {
                    showLtLg: [0, "showLtLg"],
                    hide: [1, "hide"]
                }, null), t["\u0275did"](120, 16384, [
                    [1, 4]
                ], 0, bo.c, [], null, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, jo)), t["\u0275did"](122, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Uo)), t["\u0275did"](124, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](125, 0, null, null, 0, "span", [
                    ["class", "fill-remaining-space"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](126, 16777216, null, null, 5, "button", [
                    ["aria-haspopup", "true"],
                    ["mat-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null],
                    [1, "aria-expanded", 0]
                ], [
                    [null, "mousedown"],
                    [null, "keydown"],
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "mousedown" === n && (u = !1 !== t["\u0275nov"](l, 128)._handleMousedown(e) && u), "keydown" === n && (u = !1 !== t["\u0275nov"](l, 128)._handleKeydown(e) && u), "click" === n && (u = !1 !== t["\u0275nov"](l, 128)._handleClick(e) && u), u
                }, R.b, R.a)), t["\u0275did"](127, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], null, null), t["\u0275did"](128, 1196032, null, 0, vo.f, [Ne.c, t.ElementRef, t.ViewContainerRef, vo.b, [2, vo.c],
                    [8, null],
                    [2, A.b], E.h
                ], {
                    menu: [0, "menu"]
                }, null), (l()(), t["\u0275eld"](129, 0, null, 0, 0, "i", [
                    ["class", "far fa-comments fa-lg"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](130, 0, [" ", " "])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275and"](16777216, null, null, 1, null, Vo)), t["\u0275did"](133, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](134, 0, null, null, 22, "mat-form-field", [
                    ["class", "language-select mat-form-field"]
                ], [
                    [2, "mat-form-field-appearance-standard", null],
                    [2, "mat-form-field-appearance-fill", null],
                    [2, "mat-form-field-appearance-outline", null],
                    [2, "mat-form-field-appearance-legacy", null],
                    [2, "mat-form-field-invalid", null],
                    [2, "mat-form-field-can-float", null],
                    [2, "mat-form-field-should-float", null],
                    [2, "mat-form-field-hide-placeholder", null],
                    [2, "mat-form-field-disabled", null],
                    [2, "mat-form-field-autofilled", null],
                    [2, "mat-focused", null],
                    [2, "mat-accent", null],
                    [2, "mat-warn", null],
                    [2, "ng-untouched", null],
                    [2, "ng-touched", null],
                    [2, "ng-pristine", null],
                    [2, "ng-dirty", null],
                    [2, "ng-valid", null],
                    [2, "ng-invalid", null],
                    [2, "ng-pending", null],
                    [2, "_mat-animation-noopable", null]
                ], null, null, Gl.b, Gl.a)), t["\u0275did"](135, 7389184, null, 7, Vl.c, [t.ElementRef, t.ChangeDetectorRef, [2, Wl.h],
                    [2, A.b],
                    [2, Vl.a], w.a, t.NgZone, [2, k.a]
                ], null, null), t["\u0275qud"](335544320, 23, {
                    _control: 0
                }), t["\u0275qud"](335544320, 24, {
                    _placeholderChild: 0
                }), t["\u0275qud"](335544320, 25, {
                    _labelChild: 0
                }), t["\u0275qud"](603979776, 26, {
                    _errorChildren: 1
                }), t["\u0275qud"](603979776, 27, {
                    _hintChildren: 1
                }), t["\u0275qud"](603979776, 28, {
                    _prefixChildren: 1
                }), t["\u0275qud"](603979776, 29, {
                    _suffixChildren: 1
                }), (l()(), t["\u0275eld"](143, 0, null, 1, 13, "mat-select", [
                    ["class", "mat-select"],
                    ["role", "listbox"]
                ], [
                    [1, "id", 0],
                    [1, "tabindex", 0],
                    [1, "aria-label", 0],
                    [1, "aria-labelledby", 0],
                    [1, "aria-required", 0],
                    [1, "aria-disabled", 0],
                    [1, "aria-invalid", 0],
                    [1, "aria-owns", 0],
                    [1, "aria-multiselectable", 0],
                    [1, "aria-describedby", 0],
                    [1, "aria-activedescendant", 0],
                    [2, "mat-select-disabled", null],
                    [2, "mat-select-invalid", null],
                    [2, "mat-select-required", null],
                    [2, "mat-select-empty", null]
                ], [
                    [null, "valueChange"],
                    [null, "keydown"],
                    [null, "focus"],
                    [null, "blur"]
                ], function(l, n, e) {
                    var u = !0,
                        o = l.component;
                    return "keydown" === n && (u = !1 !== t["\u0275nov"](l, 145)._handleKeydown(e) && u), "focus" === n && (u = !1 !== t["\u0275nov"](l, 145)._onFocus() && u), "blur" === n && (u = !1 !== t["\u0275nov"](l, 145)._onBlur() && u), "valueChange" === n && (u = !1 !== (o.selectedLanguage = e) && u), u
                }, Ke.b, Ke.a)), t["\u0275prd"](6144, null, Wl.j, null, [Xe.c]), t["\u0275did"](145, 2080768, null, 3, Xe.c, [Je.e, t.ChangeDetectorRef, t.NgZone, Wl.b, t.ElementRef, [2, A.b],
                    [2, T.m],
                    [2, T.g],
                    [2, Vl.c],
                    [8, null],
                    [8, null], Xe.a
                ], {
                    value: [0, "value"]
                }, {
                    valueChange: "valueChange"
                }), t["\u0275qud"](603979776, 30, {
                    options: 1
                }), t["\u0275qud"](603979776, 31, {
                    optionGroups: 1
                }), t["\u0275qud"](335544320, 32, {
                    customTrigger: 0
                }), t["\u0275prd"](2048, [
                    [23, 4]
                ], Vl.d, null, [Xe.c]), (l()(), t["\u0275eld"](150, 0, null, 0, 4, "mat-select-trigger", [], null, null, null, null, null)), t["\u0275did"](151, 16384, [
                    [32, 4]
                ], 0, Xe.e, [], null, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, Bo)), t["\u0275did"](153, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null), (l()(), t["\u0275ted"](154, null, [" ", " "])), (l()(), t["\u0275and"](16777216, null, 1, 1, null, Zo)), t["\u0275did"](156, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 1, 0, "column"), l(n, 2, 0, "primary"), l(n, 5, 0, "row"), l(n, 8, 0, "/search"), l(n, 11, 0, "", ""), l(n, 12, 0, "below", t["\u0275inlineInterpolate"](1, "", e.version, "")), l(n, 16, 0, t["\u0275nov"](n, 21)), l(n, 18, 0, e.isLoggedIn()), l(n, 21, 0), l(n, 25, 0, e.isLoggedIn()), l(n, 27, 0, e.isLoggedIn()), l(n, 29, 0, e.isLoggedIn()), l(n, 31, 0, e.isLoggedIn()), l(n, 33, 0, !e.isLoggedIn()), l(n, 35, 0, e.isLoggedIn()), l(n, 37, 0, "", ""), l(n, 39, 0, t["\u0275nov"](n, 44)), l(n, 44, 0), l(n, 49, 0, "/contact"), l(n, 55, 0, e.isLoggedIn()), l(n, 57, 0, e.isLoggedIn()), l(n, 59, 0, "", ""), l(n, 70, 0, e.selectedLanguage), l(n, 78, 0, e.selectedLanguage.icons), l(n, 81, 0, e.languages), l(n, 84, 0, "accent", "never"), l(n, 93, 0, "searchQuery", t["\u0275inlineInterpolate"](1, "", t["\u0275unv"](n, 93, 1, t["\u0275nov"](n, 94).transform("SEARCH_PLACEHOLDER")), ""), "text"), l(n, 100, 0, e.scoreBoardVisible), l(n, 102, 0, "/about"), l(n, 103, 0, "", ""), l(n, 109, 0, "/about"), l(n, 110, 0, "", ""), l(n, 114, 0, e.gitHubRibbon), l(n, 116, 0, e.gitHubRibbon), l(n, 118, 0, "row"), l(n, 119, 0, "", ""), l(n, 122, 0, !e.isLoggedIn()), l(n, 124, 0, e.isLoggedIn()), l(n, 128, 0, t["\u0275nov"](n, 44)), l(n, 133, 0, e.isLoggedIn()), l(n, 145, 0, e.selectedLanguage), l(n, 153, 0, e.selectedLanguage.icons), l(n, 156, 0, e.languages)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 0, 0, t["\u0275nov"](n, 2)._toolbarRows.length > 0, 0 === t["\u0275nov"](n, 2)._toolbarRows.length), l(n, 7, 0, t["\u0275nov"](n, 8).target, t["\u0275nov"](n, 8).href), l(n, 9, 0, e.logoSrc), l(n, 13, 0, e.applicationName), l(n, 14, 0, t["\u0275nov"](n, 15).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 15)._animationMode, t["\u0275nov"](n, 16).menuOpen || null), l(n, 36, 0, t["\u0275nov"](n, 38).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 38)._animationMode, t["\u0275nov"](n, 39).menuOpen || null), l(n, 41, 0, t["\u0275unv"](n, 41, 0, t["\u0275nov"](n, 42).transform("TITLE_CONTACT"))), l(n, 48, 0, t["\u0275nov"](n, 50).role, t["\u0275nov"](n, 50)._highlighted, t["\u0275nov"](n, 50)._triggersSubmenu, t["\u0275nov"](n, 50)._getTabIndex(), t["\u0275nov"](n, 50).disabled.toString(), t["\u0275nov"](n, 50).disabled || null), l(n, 52, 0, t["\u0275unv"](n, 52, 0, t["\u0275nov"](n, 53).transform("SECTION_CUSTOMER_FEEDBACK"))), l(n, 58, 1, ["standard" == t["\u0275nov"](n, 60).appearance, "fill" == t["\u0275nov"](n, 60).appearance, "outline" == t["\u0275nov"](n, 60).appearance, "legacy" == t["\u0275nov"](n, 60).appearance, t["\u0275nov"](n, 60)._control.errorState, t["\u0275nov"](n, 60)._canLabelFloat, t["\u0275nov"](n, 60)._shouldLabelFloat(), t["\u0275nov"](n, 60)._hideControlPlaceholder(), t["\u0275nov"](n, 60)._control.disabled, t["\u0275nov"](n, 60)._control.autofilled, t["\u0275nov"](n, 60)._control.focused, "accent" == t["\u0275nov"](n, 60).color, "warn" == t["\u0275nov"](n, 60).color, t["\u0275nov"](n, 60)._shouldForward("untouched"), t["\u0275nov"](n, 60)._shouldForward("touched"), t["\u0275nov"](n, 60)._shouldForward("pristine"), t["\u0275nov"](n, 60)._shouldForward("dirty"), t["\u0275nov"](n, 60)._shouldForward("valid"), t["\u0275nov"](n, 60)._shouldForward("invalid"), t["\u0275nov"](n, 60)._shouldForward("pending"), !t["\u0275nov"](n, 60)._animationsEnabled]), l(n, 68, 1, [t["\u0275nov"](n, 70).id, t["\u0275nov"](n, 70).tabIndex, t["\u0275nov"](n, 70)._getAriaLabel(), t["\u0275nov"](n, 70)._getAriaLabelledby(), t["\u0275nov"](n, 70).required.toString(), t["\u0275nov"](n, 70).disabled.toString(), t["\u0275nov"](n, 70).errorState, t["\u0275nov"](n, 70).panelOpen ? t["\u0275nov"](n, 70)._optionIds : null, t["\u0275nov"](n, 70).multiple, t["\u0275nov"](n, 70)._ariaDescribedby || null, t["\u0275nov"](n, 70)._getAriaActiveDescendant(), t["\u0275nov"](n, 70).disabled, t["\u0275nov"](n, 70).errorState, t["\u0275nov"](n, 70).required, t["\u0275nov"](n, 70).empty]), l(n, 79, 0, e.selectedLanguage.lang), l(n, 83, 1, ["standard" == t["\u0275nov"](n, 84).appearance, "fill" == t["\u0275nov"](n, 84).appearance, "outline" == t["\u0275nov"](n, 84).appearance, "legacy" == t["\u0275nov"](n, 84).appearance, t["\u0275nov"](n, 84)._control.errorState, t["\u0275nov"](n, 84)._canLabelFloat, t["\u0275nov"](n, 84)._shouldLabelFloat(), t["\u0275nov"](n, 84)._hideControlPlaceholder(), t["\u0275nov"](n, 84)._control.disabled, t["\u0275nov"](n, 84)._control.autofilled, t["\u0275nov"](n, 84)._control.focused, "accent" == t["\u0275nov"](n, 84).color, "warn" == t["\u0275nov"](n, 84).color, t["\u0275nov"](n, 84)._shouldForward("untouched"), t["\u0275nov"](n, 84)._shouldForward("touched"), t["\u0275nov"](n, 84)._shouldForward("pristine"), t["\u0275nov"](n, 84)._shouldForward("dirty"), t["\u0275nov"](n, 84)._shouldForward("valid"), t["\u0275nov"](n, 84)._shouldForward("invalid"), t["\u0275nov"](n, 84)._shouldForward("pending"), !t["\u0275nov"](n, 84)._animationsEnabled]), l(n, 92, 0, t["\u0275nov"](n, 93)._isServer, t["\u0275nov"](n, 93).id, t["\u0275nov"](n, 93).placeholder, t["\u0275nov"](n, 93).disabled, t["\u0275nov"](n, 93).required, t["\u0275nov"](n, 93).readonly && !t["\u0275nov"](n, 93)._isNativeSelect || null, t["\u0275nov"](n, 93)._ariaDescribedby || null, t["\u0275nov"](n, 93).errorState, t["\u0275nov"](n, 93).required.toString()), l(n, 96, 0, t["\u0275nov"](n, 97).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 97)._animationMode), l(n, 101, 0, t["\u0275nov"](n, 104).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 104)._animationMode), l(n, 106, 0, t["\u0275unv"](n, 106, 0, t["\u0275nov"](n, 107).transform("TITLE_ABOUT"))), l(n, 108, 0, t["\u0275nov"](n, 111).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 111)._animationMode), l(n, 126, 0, t["\u0275nov"](n, 127).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 127)._animationMode, t["\u0275nov"](n, 128).menuOpen || null), l(n, 130, 0, t["\u0275unv"](n, 130, 0, t["\u0275nov"](n, 131).transform("TITLE_CONTACT"))), l(n, 134, 1, ["standard" == t["\u0275nov"](n, 135).appearance, "fill" == t["\u0275nov"](n, 135).appearance, "outline" == t["\u0275nov"](n, 135).appearance, "legacy" == t["\u0275nov"](n, 135).appearance, t["\u0275nov"](n, 135)._control.errorState, t["\u0275nov"](n, 135)._canLabelFloat, t["\u0275nov"](n, 135)._shouldLabelFloat(), t["\u0275nov"](n, 135)._hideControlPlaceholder(), t["\u0275nov"](n, 135)._control.disabled, t["\u0275nov"](n, 135)._control.autofilled, t["\u0275nov"](n, 135)._control.focused, "accent" == t["\u0275nov"](n, 135).color, "warn" == t["\u0275nov"](n, 135).color, t["\u0275nov"](n, 135)._shouldForward("untouched"), t["\u0275nov"](n, 135)._shouldForward("touched"), t["\u0275nov"](n, 135)._shouldForward("pristine"), t["\u0275nov"](n, 135)._shouldForward("dirty"), t["\u0275nov"](n, 135)._shouldForward("valid"), t["\u0275nov"](n, 135)._shouldForward("invalid"), t["\u0275nov"](n, 135)._shouldForward("pending"), !t["\u0275nov"](n, 135)._animationsEnabled]), l(n, 143, 1, [t["\u0275nov"](n, 145).id, t["\u0275nov"](n, 145).tabIndex, t["\u0275nov"](n, 145)._getAriaLabel(), t["\u0275nov"](n, 145)._getAriaLabelledby(), t["\u0275nov"](n, 145).required.toString(), t["\u0275nov"](n, 145).disabled.toString(), t["\u0275nov"](n, 145).errorState, t["\u0275nov"](n, 145).panelOpen ? t["\u0275nov"](n, 145)._optionIds : null, t["\u0275nov"](n, 145).multiple, t["\u0275nov"](n, 145)._ariaDescribedby || null, t["\u0275nov"](n, 145)._getAriaActiveDescendant(), t["\u0275nov"](n, 145).disabled, t["\u0275nov"](n, 145).errorState, t["\u0275nov"](n, 145).required, t["\u0275nov"](n, 145).empty]), l(n, 154, 0, e.selectedLanguage.lang)
                })
            }
            q.b.add(P.N), q.a.watch();
            var Yo = function() {
                    function l(l, n, e, t, u, o) {
                        this.ngZone = l, this.challengeService = n, this.translate = e, this.cookieService = t, this.ref = u, this.io = o, this.hackingProgress = {}
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.ngZone.runOutsideAngular(function() {
                            l.io.socket().on("server started", function() {
                                var n = l.cookieService.get("continueCode");
                                n && l.challengeService.restoreProgress(encodeURIComponent(n)).subscribe(function() {
                                    l.translate.get("AUTO_RESTORED_PROGRESS").subscribe(function(n) {
                                        l.hackingProgress.autoRestoreMessage = n
                                    }, function(n) {
                                        l.hackingProgress.autoRestoreMessage = n
                                    })
                                }, function(n) {
                                    console.log(n), l.translate.get("AUTO_RESTORE_PROGRESS_FAILED", {
                                        error: n
                                    }).subscribe(function(n) {
                                        l.hackingProgress.autoRestoreMessage = n
                                    }, function(n) {
                                        l.hackingProgress.autoRestoreMessage = n
                                    })
                                }), l.ref.detectChanges()
                            })
                        })
                    }, l.prototype.closeNotification = function() {
                        this.hackingProgress.autoRestoreMessage = null
                    }, l.prototype.clearProgress = function() {
                        this.cookieService.remove("continueCode"), this.hackingProgress.cleared = !0
                    }, l
                }(),
                Qo = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".container[_ngcontent-%COMP%]{font-size:14px;margin:40px}"]
                    ],
                    data: {}
                });

            function Go(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["RESTART_REQUIRED"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Wo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](1, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["RESET_HACKING_PROGRESS"]))], function(l, n) {
                    l(n, 1, 0, "")
                }, null)
            }

            function Ko(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 18, "mat-card", [
                    ["class", "container primary-notification mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](1, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](2, 0, null, 0, 1, "mat-card-header", [
                    ["class", "mat-card-header"]
                ], null, null, null, Bl.c, Bl.b)), t["\u0275did"](3, 49152, null, 0, Hl.c, [], null, null), (l()(), t["\u0275eld"](4, 0, null, 0, 14, "mat-card-content", [
                    ["class", "mat-card-content"]
                ], null, null, null, null, null)), t["\u0275did"](5, 16384, null, 0, Hl.b, [], null, null), (l()(), t["\u0275eld"](6, 0, null, null, 2, "span", [
                    ["translate", ""]
                ], null, null, null, null, null)), t["\u0275did"](7, 8536064, null, 0, C.e, [C.k, t.ElementRef, t.ChangeDetectorRef], {
                    translate: [0, "translate"]
                }, null), (l()(), t["\u0275ted"](-1, null, ["NOTIFICATION_SERVER_STARTED"])), (l()(), t["\u0275ted"](9, null, [": ", ""])), (l()(), t["\u0275eld"](10, 0, null, null, 1, "span", [
                    ["style", "float:right;cursor:pointer"]
                ], null, [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.closeNotification() && t), t
                }, null, null)), (l()(), t["\u0275ted"](-1, null, ["X"])), (l()(), t["\u0275eld"](12, 0, null, null, 6, "button", [
                    ["mat-raised-button", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.clearProgress() && t), t
                }, R.b, R.a)), t["\u0275did"](13, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"]
                }, null), (l()(), t["\u0275eld"](14, 0, null, 0, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fas fa-trash"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Go)), t["\u0275did"](16, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, 0, 1, null, Wo)), t["\u0275did"](18, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    var e = n.component;
                    l(n, 7, 0, ""), l(n, 13, 0, e.hackingProgress.cleared), l(n, 16, 0, e.hackingProgress.cleared), l(n, 18, 0, !e.hackingProgress.cleared)
                }, function(l, n) {
                    l(n, 9, 0, n.component.hackingProgress.autoRestoreMessage), l(n, 12, 0, t["\u0275nov"](n, 13).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 13)._animationMode)
                })
            }

            function Xo(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275and"](16777216, null, null, 1, null, Ko)), t["\u0275did"](1, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null)], function(l, n) {
                    l(n, 1, 0, n.component.hackingProgress.autoRestoreMessage)
                }, null)
            }
            var Jo = e("Axip"),
                la = function() {
                    function l(l) {
                        this.http = l, this.hostServer = u.hostServer
                    }
                    return l.prototype.getCountryMapping = function() {
                        return this.http.get(this.hostServer + "/rest/country-mapping").pipe(Object(i.a)(function(l) {
                            throw l
                        }))
                    }, l.ngInjectableDef = t.defineInjectable({
                        factory: function() {
                            return new l(t.inject(r.c))
                        },
                        token: l,
                        providedIn: "root"
                    }), l
                }();
            q.b.add(P.r, P.o, P.g), q.a.watch();
            var na = function() {
                    function l(l, n, e, t, u, o, a, i) {
                        this.ngZone = l, this.configurationService = n, this.challengeService = e, this.countryMappingService = t, this.translate = u, this.cookieService = o, this.ref = a, this.io = i, this.notifications = []
                    }
                    return l.prototype.ngOnInit = function() {
                        var l = this;
                        this.ngZone.runOutsideAngular(function() {
                            l.io.socket().on("challenge solved", function(n) {
                                n && n.challenge && (n.hidden || l.showNotification(n), n.isRestore || l.saveProgress(), l.io.socket().emit("notification received", n.flag))
                            })
                        }), this.configurationService.getApplicationConfiguration().subscribe(function(n) {
                            n && n.ctf && (l.showCtfFlagsInNotifications = null !== n.ctf.showFlagsInNotifications && n.ctf.showFlagsInNotifications, n.ctf.showCountryDetailsInNotifications ? (l.showCtfCountryDetailsInNotifications = n.ctf.showCountryDetailsInNotifications, "none" !== n.ctf.showCountryDetailsInNotifications && l.countryMappingService.getCountryMapping().subscribe(function(n) {
                                l.countryMap = n
                            }, function(l) {
                                return console.log(l)
                            })) : l.showCtfCountryDetailsInNotifications = "none")
                        })
                    }, l.prototype.closeNotification = function(l) {
                        this.notifications.splice(l, 1), this.ref.detectChanges()
                    }, l.prototype.showNotification = function(l) {
                        var n = this;
                        this.translate.get("CHALLENGE_SOLVED", {
                            challenge: l.challenge
                        }).toPromise().then(function(l) {
                            return l
                        }, function(l) {
                            return l
                        }).then(function(e) {
                            var t;
                            n.showCtfCountryDetailsInNotifications && "none" !== n.showCtfCountryDetailsInNotifications && (t = n.countryMap[l.key]), n.notifications.push({
                                message: e,
                                flag: l.flag,
                                country: t,
                                copied: !1
                            }), n.ref.detectChanges()
                        })
                    }, l.prototype.saveProgress = function() {
                        var l = this;
                        this.challengeService.continueCode().subscribe(function(n) {
                            if (!n) throw new Error("Received invalid continue code from the sever!");
                            var e = new Date;
                            e.setFullYear(e.getFullYear() + 1), l.cookieService.put("continueCode", n, {
                                expires: e
                            })
                        }, function(l) {
                            return console.log(l)
                        })
                    }, l
                }(),
                ea = t["\u0275crt"]({
                    encapsulation: 0,
                    styles: [
                        [".container[_ngcontent-%COMP%]{font-size:14px;margin:40px}mat-card[_ngcontent-%COMP%]{margin-bottom:10px}"]
                    ],
                    data: {}
                });

            function ta(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "span", [], [
                    [8, "className", 0]
                ], null, null, null, null)), t["\u0275ppd"](1, 1)], null, function(l, n) {
                    var e = t["\u0275inlineInterpolate"](1, "flag-icon flag-icon-", t["\u0275unv"](n, 0, 0, l(n, 1, 0, t["\u0275nov"](n.parent.parent.parent, 0), n.parent.parent.context.$implicit.country.code)), "");
                    l(n, 0, 0, e)
                })
            }

            function ua(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 0, "i", [
                    ["class", "fa fa-globe"]
                ], null, null, null, null, null))], null, null)
            }

            function oa(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (l()(), t["\u0275ted"](1, null, [" ", " "]))], null, function(l, n) {
                    l(n, 1, 0, n.parent.parent.context.$implicit.country.name)
                })
            }

            function aa(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 7, "div", [], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, ta)), t["\u0275did"](2, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, ua)), t["\u0275did"](4, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275and"](16777216, null, null, 1, null, oa)), t["\u0275did"](6, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](7, 0, null, null, 0, "br", [], null, null, null, null, null))], function(l, n) {
                    var e = n.component;
                    l(n, 2, 0, "flag" === e.showCtfCountryDetailsInNotifications || "both" === e.showCtfCountryDetailsInNotifications), l(n, 4, 0, "name" === e.showCtfCountryDetailsInNotifications), l(n, 6, 0, "name" === e.showCtfCountryDetailsInNotifications || "both" === e.showCtfCountryDetailsInNotifications)
                }, null)
            }

            function ia(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 21, "mat-card", [
                    ["class", "accent-notification mat-card"]
                ], null, null, null, Bl.d, Bl.a)), t["\u0275did"](1, 49152, null, 0, Hl.a, [], null, null), (l()(), t["\u0275eld"](2, 0, null, 0, 3, "div", [], null, null, null, null, null)), (l()(), t["\u0275ted"](3, null, [" ", ""])), (l()(), t["\u0275eld"](4, 0, null, null, 1, "span", [
                    ["style", "float:right;cursor:pointer"]
                ], null, [
                    [null, "click"]
                ], function(l, n, e) {
                    var t = !0;
                    return "click" === n && (t = !1 !== l.component.closeNotification(l.context.index) && t), t
                }, null, null)), (l()(), t["\u0275ted"](-1, null, ["X"])), (l()(), t["\u0275eld"](6, 0, null, 0, 0, "br", [], null, null, null, null, null)), (l()(), t["\u0275eld"](7, 0, null, 0, 14, "div", [], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, aa)), t["\u0275did"](9, 16384, null, 0, _.NgIf, [t.ViewContainerRef, t.TemplateRef], {
                    ngIf: [0, "ngIf"]
                }, null), (l()(), t["\u0275eld"](10, 0, null, null, 0, "i", [
                    ["class", "fas fa-flag-checkered"]
                ], null, null, null, null, null)), (l()(), t["\u0275ted"](11, null, [" ", " "])), (l()(), t["\u0275eld"](12, 0, null, null, 9, "button", [
                    ["mat-raised-button", ""],
                    ["ngxClipboard", ""]
                ], [
                    [8, "disabled", 0],
                    [2, "_mat-animation-noopable", null]
                ], [
                    [null, "cbOnSuccess"],
                    [null, "click"]
                ], function(l, n, e) {
                    var u = !0;
                    return "click" === n && (u = !1 !== t["\u0275nov"](l, 13).onClick(e.target) && u), "cbOnSuccess" === n && (u = 0 != (l.context.$implicit.copied = !0) && u), u
                }, R.b, R.a)), t["\u0275did"](13, 212992, null, 0, Jo.b, [Jo.d], {
                    targetElm: [0, "targetElm"],
                    cbContent: [1, "cbContent"]
                }, {
                    cbOnSuccess: "cbOnSuccess"
                }), t["\u0275did"](14, 180224, null, 0, y.b, [t.ElementRef, w.a, E.h, [2, k.a]], {
                    disabled: [0, "disabled"]
                }, null), (l()(), t["\u0275eld"](15, 0, null, 0, 0, "i", [
                    ["aria-hidden", "true"],
                    ["class", "fas fa-clipboard"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](16, 0, null, 0, 2, "span", [], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](17, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef]), (l()(), t["\u0275eld"](19, 0, null, 0, 2, "span", [], [
                    [8, "hidden", 0]
                ], null, null, null, null)), (l()(), t["\u0275ted"](20, null, ["", ""])), t["\u0275pid"](131072, C.j, [C.k, t.ChangeDetectorRef])], function(l, n) {
                    l(n, 9, 0, "none" !== n.component.showCtfCountryDetailsInNotifications), l(n, 13, 0, "", n.context.$implicit.flag), l(n, 14, 0, n.context.$implicit.copied)
                }, function(l, n) {
                    var e = n.component;
                    l(n, 3, 0, n.context.$implicit.message), l(n, 7, 0, !e.showCtfFlagsInNotifications), l(n, 11, 0, n.context.$implicit.flag), l(n, 12, 0, t["\u0275nov"](n, 14).disabled || null, "NoopAnimations" === t["\u0275nov"](n, 14)._animationMode), l(n, 16, 0, !n.context.$implicit.copied), l(n, 17, 0, t["\u0275unv"](n, 17, 0, t["\u0275nov"](n, 18).transform("COPY_SUCCESS"))), l(n, 19, 0, n.context.$implicit.copied), l(n, 20, 0, t["\u0275unv"](n, 20, 0, t["\u0275nov"](n, 21).transform("COPY_TO_CLIPBOARD")))
                })
            }

            function ra(l) {
                return t["\u0275vid"](0, [t["\u0275pid"](0, _.LowerCasePipe, []), (l()(), t["\u0275eld"](1, 0, null, null, 2, "div", [
                    ["class", "container challenge-solved-toast"]
                ], null, null, null, null, null)), (l()(), t["\u0275and"](16777216, null, null, 1, null, ia)), t["\u0275did"](3, 278528, null, 0, _.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
                    ngForOf: [0, "ngForOf"]
                }, null)], function(l, n) {
                    l(n, 3, 0, n.component.notifications)
                }, null)
            }
            var da = t["\u0275crt"]({
                encapsulation: 0,
                styles: [
                    [""]
                ],
                data: {}
            });

            function sa(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 12, "div", [
                    ["class", "mat-typography"]
                ], null, null, null, null, null)), (l()(), t["\u0275eld"](1, 0, null, null, 11, "mat-sidenav-container", [
                    ["class", "mat-drawer-container mat-sidenav-container"],
                    ["fullscreen", ""]
                ], [
                    [2, "mat-drawer-container-explicit-backdrop", null]
                ], null, null, po.b, po.a)), t["\u0275did"](2, 1490944, null, 2, mo.f, [
                    [2, A.b], t.ElementRef, t.NgZone, t.ChangeDetectorRef, mo.a, [2, k.a]
                ], null, null), t["\u0275qud"](603979776, 1, {
                    _drawers: 1
                }), t["\u0275qud"](335544320, 2, {
                    _content: 0
                }), (l()(), t["\u0275eld"](5, 0, null, 2, 1, "app-navbar", [], null, null, null, $o, yo)), t["\u0275did"](6, 114688, null, 0, Ro, [_o, Wt, d, N, t.NgZone, se.d, ie.k, C.k, wt], null, null), (l()(), t["\u0275eld"](7, 0, null, 2, 1, "app-server-started-notification", [], null, null, null, Xo, Qo)), t["\u0275did"](8, 114688, null, 0, Yo, [t.NgZone, Wt, C.k, se.d, t.ChangeDetectorRef, wt], null, null), (l()(), t["\u0275eld"](9, 0, null, 2, 1, "app-challenge-solved-notification", [], null, null, null, ra, ea)), t["\u0275did"](10, 114688, null, 0, na, [t.NgZone, d, Wt, la, C.k, se.d, t.ChangeDetectorRef, wt], null, null), (l()(), t["\u0275eld"](11, 16777216, null, 2, 1, "router-outlet", [], null, null, null, null, null)), t["\u0275did"](12, 212992, null, 0, ie.o, [ie.b, t.ViewContainerRef, t.ComponentFactoryResolver, [8, null], t.ChangeDetectorRef], null, null)], function(l, n) {
                    l(n, 2, 0), l(n, 6, 0), l(n, 8, 0), l(n, 10, 0), l(n, 12, 0)
                }, function(l, n) {
                    l(n, 1, 0, t["\u0275nov"](n, 2)._backdropOverride)
                })
            }

            function ca(l) {
                return t["\u0275vid"](0, [(l()(), t["\u0275eld"](0, 0, null, null, 1, "app-root", [], null, null, null, sa, da)), t["\u0275did"](1, 114688, null, 0, f, [B.c, B.j, C.k, d], null, null)], function(l, n) {
                    l(n, 1, 0)
                }, null)
            }
            var fa = t["\u0275ccf"]("app-root", f, ca, {}, {}, []),
                pa = e("NSYL"),
                ma = function() {
                    function l() {}
                    return l.prototype.intercept = function(l, n) {
                        return localStorage.getItem("token") && (l = l.clone({
                            setHeaders: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })), localStorage.getItem("email") && (l = l.clone({
                            setHeaders: {
                                "X-User-Email": localStorage.getItem("email")
                            }
                        })), n.handle(l)
                    }, l
                }(),
                ha = e("ihYY"),
                va = e("NaJL"),
                ga = e("M2Lx"),
                ba = {
                    params: window.location.href.substr(window.location.href.indexOf("#"))
                };

            function _a(l) {
                return 0 === l.length ? null : window.location.href.includes("#access_token=") ? {
                    consumed: l
                } : null
            }

            function Ca(l) {
                return 0 === l.length ? null : l[0].toString().match(function() {
                    for (var l = [], n = 0; n < arguments.length; n++) l[n] = arguments[n];
                    var e = Array.prototype.slice.call(l),
                        t = e.shift();
                    return e.reverse().map(function(l, n) {
                        return String.fromCharCode(l - t - 45 - n)
                    }).join("")
                }(25, 184, 174, 179, 182, 186) + 36669..toString(36).toLowerCase() + function() {
                    for (var l = [], n = 0; n < arguments.length; n++) l[n] = arguments[n];
                    var e = Array.prototype.slice.call(arguments),
                        t = e.shift();
                    return e.reverse().map(function(l, n) {
                        return String.fromCharCode(l - t - 24 - n)
                    }).join("")
                }(13, 144, 87, 152, 139, 144, 83, 138) + 10..toString(36).toLowerCase()) ? {
                    consumed: l
                } : null
            }
            ie.n.forRoot([{
                path: "administration",
                component: U
            }, {
                path: "about",
                component: xl
            }, {
                path: "basket",
                component: en
            }, {
                path: "contact",
                component: Dn
            }, {
                path: "change-password",
                component: Fn
            }, {
                path: "complain",
                component: Wn
            }, {
                path: "login",
                component: de
            }, {
                path: "forgot-password",
                component: Re
            }, {
                path: "recycle",
                component: qe
            }, {
                path: "register",
                component: nt
            }, {
                path: "search",
                component: Et
            }, {
                path: "score-board",
                component: Kt
            }, {
                path: "track-order",
                component: mu
            }, {
                path: "track-result",
                component: Ru
            }, {
                matcher: _a,
                data: ba,
                component: Pu
            }, {
                matcher: Ca,
                component: Vu
            }, {
                path: "**",
                component: Et
            }], {
                useHash: !0
            });
            var Ra = e("3pJQ"),
                ya = e("V9q+"),
                wa = e("k2u+"),
                Ea = e("aR1o"),
                ka = e("S6T7"),
                Ia = e("SMsm"),
                Sa = e("4c35"),
                Ta = e("YhbO"),
                Da = e("0/Q6"),
                xa = t["\u0275cmf"](c, [f], function(l) {
                    return t["\u0275mod"]([t["\u0275mpd"](512, t.ComponentFactoryResolver, t["\u0275CodegenComponentFactoryResolver"], [
                        [8, [p.a, m.a, h.a, v.b, v.a, kl, jl, Sn, Mn, $n, ue, _e, Ae, Ge, pt, zt, pu, _u, qu, Uu, Zu, Ku, to, io, fo, fa]],
                        [3, t.ComponentFactoryResolver], t.NgModuleRef
                    ]), t["\u0275mpd"](5120, t.LOCALE_ID, t["\u0275angular_packages_core_core_o"], [
                        [3, t.LOCALE_ID]
                    ]), t["\u0275mpd"](4608, _.NgLocalization, _.NgLocaleLocalization, [t.LOCALE_ID, [2, _["\u0275angular_packages_common_common_a"]]]), t["\u0275mpd"](5120, t.APP_ID, t["\u0275angular_packages_core_core_g"], []), t["\u0275mpd"](5120, t.IterableDiffers, t["\u0275angular_packages_core_core_m"], []), t["\u0275mpd"](5120, t.KeyValueDiffers, t["\u0275angular_packages_core_core_n"], []), t["\u0275mpd"](4608, B.d, B.p, [_.DOCUMENT]), t["\u0275mpd"](6144, t.Sanitizer, null, [B.d]), t["\u0275mpd"](4608, B.g, Wl.c, [
                        [2, Wl.g],
                        [2, Wl.l]
                    ]), t["\u0275mpd"](5120, B.e, function(l, n, e, t, u, o, a, i) {
                        return [new B.n(l, n, e), new B.s(t), new B.r(u, o, a, i)]
                    }, [_.DOCUMENT, t.NgZone, t.PLATFORM_ID, _.DOCUMENT, _.DOCUMENT, B.g, t["\u0275Console"],
                        [2, B.h]
                    ]), t["\u0275mpd"](4608, B.f, B.f, [B.e, t.NgZone]), t["\u0275mpd"](135680, B.q, B.q, [_.DOCUMENT]), t["\u0275mpd"](4608, B.o, B.o, [B.f, B.q]), t["\u0275mpd"](5120, pa.a, k.e, []), t["\u0275mpd"](5120, pa.c, k.f, []), t["\u0275mpd"](4608, pa.b, k.d, [_.DOCUMENT, pa.a, pa.c]), t["\u0275mpd"](5120, t.RendererFactory2, k.g, [B.o, pa.b, t.NgZone]), t["\u0275mpd"](6144, B.t, null, [B.q]), t["\u0275mpd"](4608, t.Testability, t.Testability, [t.NgZone]), t["\u0275mpd"](4608, se.c, se.c, [se.a, t.Injector]), t["\u0275mpd"](4608, L.j, L.i, [L.d, L.g]), t["\u0275mpd"](5120, ie.h, ie.C, [ie.A]), t["\u0275mpd"](5120, t.APP_BOOTSTRAP_LISTENER, function(l, n, e) {
                        return [L.m(l, n), e]
                    }, [_.DOCUMENT, t.PLATFORM_ID, ie.h]), t["\u0275mpd"](4608, r.h, r.n, [_.DOCUMENT, t.PLATFORM_ID, r.l]), t["\u0275mpd"](4608, r.o, r.o, [r.h, r.m]), t["\u0275mpd"](5120, r.a, function(l) {
                        return [l, new ma]
                    }, [r.o]), t["\u0275mpd"](4608, T.d, T.d, []), t["\u0275mpd"](4608, T.r, T.r, []), t["\u0275mpd"](4608, ha.b, k.c, [t.RendererFactory2, B.c]), t["\u0275mpd"](5120, B.k, B.v, [_.DOCUMENT, t.APP_ID]), t["\u0275mpd"](4608, Sl.c, Sl.c, []), t["\u0275mpd"](5120, va.b, va.c, []), t["\u0275mpd"](5120, Jo.d, Jo.a, [B.c, va.b, [3, Jo.d]]), t["\u0275mpd"](4608, ga.c, ga.c, []), t["\u0275mpd"](4608, Ne.c, Ne.c, [Ne.i, Ne.e, t.ComponentFactoryResolver, Ne.h, Ne.f, t.Injector, t.NgZone, _.DOCUMENT, A.b, [2, _.Location]]), t["\u0275mpd"](5120, Ne.j, Ne.k, [Ne.c]), t["\u0275mpd"](5120, Xe.a, Xe.b, [Ne.c]), t["\u0275mpd"](5120, Zt.b, Zt.c, [Ne.c]), t["\u0275mpd"](5120, gt.c, gt.a, [
                        [3, gt.c]
                    ]), t["\u0275mpd"](4608, Wl.b, Wl.b, []), t["\u0275mpd"](5120, V.c, V.d, [Ne.c]), t["\u0275mpd"](135680, V.e, V.e, [Ne.c, t.Injector, [2, _.Location],
                        [2, V.b], V.c, [3, V.e], Ne.e
                    ]), t["\u0275mpd"](4608, Oe.i, Oe.i, []), t["\u0275mpd"](5120, Oe.a, Oe.b, [Ne.c]), t["\u0275mpd"](4608, Wl.a, Wl.v, [
                        [2, Wl.f], w.a
                    ]), t["\u0275mpd"](5120, vo.b, vo.g, [Ne.c]), t["\u0275mpd"](5120, ie.a, ie.z, [ie.k]), t["\u0275mpd"](4608, ie.d, ie.d, []), t["\u0275mpd"](6144, ie.f, null, [ie.d]), t["\u0275mpd"](135680, ie.p, ie.p, [ie.k, t.NgModuleFactoryLoader, t.Compiler, t.Injector, ie.f]), t["\u0275mpd"](4608, ie.e, ie.e, []), t["\u0275mpd"](5120, ie.D, ie.v, [ie.k, _.ViewportScroller, ie.g]), t["\u0275mpd"](5120, C.g, s, [r.c]), t["\u0275mpd"](4608, C.c, C.f, []), t["\u0275mpd"](4608, C.i, C.d, []), t["\u0275mpd"](4608, C.b, C.a, []), t["\u0275mpd"](4608, C.l, C.l, []), t["\u0275mpd"](4608, C.k, C.k, [C.l, C.g, C.c, C.i, C.b, C.m, C.n]), t["\u0275mpd"](4608, se.d, se.d, [se.c]), t["\u0275mpd"](4608, Rt, Rt, [r.c]), t["\u0275mpd"](4608, _o, _o, [r.c]), t["\u0275mpd"](4608, Ce, Ce, [r.c]), t["\u0275mpd"](4608, N, N, [r.c]), t["\u0275mpd"](4608, lt, lt, [r.c]), t["\u0275mpd"](4608, Tn, Tn, [r.c]), t["\u0275mpd"](4608, F, F, [r.c]), t["\u0275mpd"](4608, ln, ln, []), t["\u0275mpd"](4608, bt, bt, [r.c]), t["\u0275mpd"](4608, Qn, Qn, [r.c]), t["\u0275mpd"](4608, Cu, Cu, [r.c]), t["\u0275mpd"](4608, j, j, [r.c]), t["\u0275mpd"](4608, nn, nn, [r.c]), t["\u0275mpd"](4608, Wt, Wt, [r.c]), t["\u0275mpd"](1073742336, _.CommonModule, _.CommonModule, []), t["\u0275mpd"](1024, t.ErrorHandler, B.u, []), t["\u0275mpd"](1024, t.NgProbeToken, function() {
                        return [ie.u()]
                    }, []), t["\u0275mpd"](512, ie.A, ie.A, [t.Injector]), t["\u0275mpd"](1024, t.APP_INITIALIZER, function(l, n) {
                        return [B.w(l), ie.B(n)]
                    }, [
                        [2, t.NgProbeToken], ie.A
                    ]), t["\u0275mpd"](512, t.ApplicationInitStatus, t.ApplicationInitStatus, [
                        [2, t.APP_INITIALIZER]
                    ]), t["\u0275mpd"](131584, t.ApplicationRef, t.ApplicationRef, [t.NgZone, t["\u0275Console"], t.Injector, t.ErrorHandler, t.ComponentFactoryResolver, t.ApplicationInitStatus]), t["\u0275mpd"](1073742336, t.ApplicationModule, t.ApplicationModule, [t.ApplicationRef]), t["\u0275mpd"](1073742336, B.a, B.a, [
                        [3, B.a]
                    ]), t["\u0275mpd"](1024, ie.t, ie.x, [
                        [3, ie.k]
                    ]), t["\u0275mpd"](512, ie.r, ie.c, []), t["\u0275mpd"](512, ie.b, ie.b, []), t["\u0275mpd"](256, ie.g, {
                        useHash: !0
                    }, []), t["\u0275mpd"](1024, _.LocationStrategy, ie.w, [_.PlatformLocation, [2, _.APP_BASE_HREF], ie.g]), t["\u0275mpd"](512, _.Location, _.Location, [_.LocationStrategy]), t["\u0275mpd"](512, t.Compiler, t.Compiler, []), t["\u0275mpd"](512, t.NgModuleFactoryLoader, t.SystemJsNgModuleLoader, [t.Compiler, [2, t.SystemJsNgModuleLoaderConfig]]), t["\u0275mpd"](1024, ie.i, function() {
                        return [
                            [{
                                path: "administration",
                                component: U
                            }, {
                                path: "about",
                                component: xl
                            }, {
                                path: "basket",
                                component: en
                            }, {
                                path: "contact",
                                component: Dn
                            }, {
                                path: "change-password",
                                component: Fn
                            }, {
                                path: "complain",
                                component: Wn
                            }, {
                                path: "login",
                                component: de
                            }, {
                                path: "forgot-password",
                                component: Re
                            }, {
                                path: "recycle",
                                component: qe
                            }, {
                                path: "register",
                                component: nt
                            }, {
                                path: "search",
                                component: Et
                            }, {
                                path: "score-board",
                                component: Kt
                            }, {
                                path: "track-order",
                                component: mu
                            }, {
                                path: "track-result",
                                component: Ru
                            }, {
                                matcher: _a,
                                data: ba,
                                component: Pu
                            }, {
                                matcher: Ca,
                                component: Vu
                            }, {
                                path: "**",
                                component: Et
                            }]
                        ]
                    }, []), t["\u0275mpd"](1024, ie.k, ie.y, [t.ApplicationRef, ie.r, ie.b, _.Location, t.Injector, t.NgModuleFactoryLoader, t.Compiler, ie.i, ie.g, [2, ie.q],
                        [2, ie.j]
                    ]), t["\u0275mpd"](1073742336, ie.n, ie.n, [
                        [2, ie.t],
                        [2, ie.k]
                    ]), t["\u0275mpd"](1073742336, C.h, C.h, []), t["\u0275mpd"](1073742336, se.b, se.b, []), t["\u0275mpd"](1073742336, L.e, L.e, []), t["\u0275mpd"](1073742336, A.a, A.a, []), t["\u0275mpd"](1073742336, x.c, x.c, []), t["\u0275mpd"](1073742336, Ul.a, Ul.a, []), t["\u0275mpd"](1073742336, Ra.a, Ra.a, []), t["\u0275mpd"](1073742336, ya.a, ya.a, [
                        [2, L.k], t.PLATFORM_ID
                    ]), t["\u0275mpd"](1073742336, r.e, r.e, []), t["\u0275mpd"](1073742336, r.d, r.d, []), t["\u0275mpd"](1073742336, T.p, T.p, []), t["\u0275mpd"](1073742336, T.n, T.n, []), t["\u0275mpd"](1073742336, k.b, k.b, []), t["\u0275mpd"](1073742336, B.b, B.b, []), t["\u0275mpd"](1073742336, Sl.a, Sl.a, []), t["\u0275mpd"](1073742336, wa.a, wa.a, []), t["\u0275mpd"](1073742336, T.h, T.h, []), t["\u0275mpd"](1073742336, Ea.a, Ea.a, []), t["\u0275mpd"](1073742336, ka.FileUploadModule, ka.FileUploadModule, []), t["\u0275mpd"](1073742336, va.a, va.a, []), t["\u0275mpd"](1073742336, Jo.c, Jo.c, []), t["\u0275mpd"](1073742336, Gt.b, Gt.b, []), t["\u0275mpd"](1073742336, Wl.l, Wl.l, [
                        [2, Wl.d],
                        [2, B.h]
                    ]), t["\u0275mpd"](1073742336, bo.b, bo.b, []), t["\u0275mpd"](1073742336, Ia.a, Ia.a, []), t["\u0275mpd"](1073742336, ga.d, ga.d, []), t["\u0275mpd"](1073742336, Vl.e, Vl.e, []), t["\u0275mpd"](1073742336, Sa.f, Sa.f, []), t["\u0275mpd"](1073742336, w.b, w.b, []), t["\u0275mpd"](1073742336, Je.c, Je.c, []), t["\u0275mpd"](1073742336, Ne.g, Ne.g, []), t["\u0275mpd"](1073742336, Wl.u, Wl.u, []), t["\u0275mpd"](1073742336, Wl.s, Wl.s, []), t["\u0275mpd"](1073742336, Wl.q, Wl.q, []), t["\u0275mpd"](1073742336, Xe.d, Xe.d, []), t["\u0275mpd"](1073742336, y.c, y.c, []), t["\u0275mpd"](1073742336, mo.h, mo.h, []), t["\u0275mpd"](1073742336, b.p, b.p, []), t["\u0275mpd"](1073742336, g.m, g.m, []), t["\u0275mpd"](1073742336, E.a, E.a, []), t["\u0275mpd"](1073742336, Zt.e, Zt.e, []), t["\u0275mpd"](1073742336, gt.d, gt.d, []), t["\u0275mpd"](1073742336, Hl.e, Hl.e, []), t["\u0275mpd"](1073742336, Xl.c, Xl.c, []), t["\u0275mpd"](1073742336, Kl.c, Kl.c, []), t["\u0275mpd"](1073742336, ae.c, ae.c, []), t["\u0275mpd"](1073742336, V.j, V.j, []), t["\u0275mpd"](1073742336, ht.b, ht.b, []), t["\u0275mpd"](1073742336, Oe.j, Oe.j, []), t["\u0275mpd"](1073742336, Wl.w, Wl.w, []), t["\u0275mpd"](1073742336, Wl.n, Wl.n, []), t["\u0275mpd"](1073742336, Ta.c, Ta.c, []), t["\u0275mpd"](1073742336, Yl.b, Yl.b, []), t["\u0275mpd"](1073742336, Yt.c, Yt.c, []), t["\u0275mpd"](1073742336, vo.e, vo.e, []), t["\u0275mpd"](1073742336, Wl.m, Wl.m, []), t["\u0275mpd"](1073742336, Da.a, Da.a, []), t["\u0275mpd"](1073742336, Zl.d, Zl.d, []), t["\u0275mpd"](512, r.k, r.k, []), t["\u0275mpd"](2048, r.i, null, [r.k]), t["\u0275mpd"](512, r.g, r.g, [r.i]), t["\u0275mpd"](2048, r.b, null, [r.g]), t["\u0275mpd"](512, r.f, r.j, [r.b, t.Injector]), t["\u0275mpd"](512, r.c, r.c, [r.f]), t["\u0275mpd"](512, d, d, [r.c]), t["\u0275mpd"](1073742336, c, c, [d, Ne.e]), t["\u0275mpd"](256, t["\u0275APP_ROOT"], !0, []), t["\u0275mpd"](256, se.a, {}, []), t["\u0275mpd"](256, r.l, "XSRF-TOKEN", []), t["\u0275mpd"](256, r.m, "X-XSRF-TOKEN", []), t["\u0275mpd"](256, k.a, "BrowserAnimations", []), t["\u0275mpd"](256, Wl.e, Wl.i, []), t["\u0275mpd"](256, C.n, void 0, []), t["\u0275mpd"](256, C.m, void 0, [])])
                });
            u.production && Object(t.enableProdMode)(), B.m().bootstrapModuleFactory(xa).catch(function(l) {
                return console.log(l)
            })
        }
    },
    [
        [0, 0, 4]
    ]
]);
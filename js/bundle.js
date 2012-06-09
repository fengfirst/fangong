(function (a, c) {
    function d(e) {
        return !a(e).parents().andSelf().filter(function () {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    a.ui = a.ui || {};
    if (!a.ui.version) {
        a.extend(a.ui, {
            version: "1.8.11",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        a.fn.extend({
            _focus: a.fn.focus,
            focus: function (e, f) {
                return typeof e === "number" ? this.each(function () {
                    var b = this;
                    setTimeout(function () {
                        a(b).focus();
                        f && f.call(b)
                    }, e)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var e;
                e = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !e.length ? a(document) : e
            },
            zIndex: function (e) {
                if (e !== c) return this.css("zIndex", e);
                if (this.length) {
                    e = a(this[0]);
                    for (var f; e.length && e[0] !== document;) {
                        f = e.css("position");
                        if (f === "absolute" || f === "relative" || f === "fixed") {
                            f = parseInt(e.css("zIndex"), 10);
                            if (!isNaN(f) && f !== 0) return f
                        }
                        e = e.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                    e.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        a.each(["Width", "Height"], function (e, f) {
            function b(k, q, u, n) {
                a.each(g, function () {
                    q -= parseFloat(a.curCSS(k, "padding" + this, true)) || 0;
                    if (u) q -= parseFloat(a.curCSS(k, "border" + this + "Width", true)) || 0;
                    if (n) q -= parseFloat(a.curCSS(k, "margin" + this, true)) || 0
                });
                return q
            }
            var g = f === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = f.toLowerCase(),
                j = {
                    innerWidth: a.fn.innerWidth,
                    innerHeight: a.fn.innerHeight,
                    outerWidth: a.fn.outerWidth,
                    outerHeight: a.fn.outerHeight
                };
            a.fn["inner" + f] = function (k) {
                if (k === c) return j["inner" + f].call(this);
                return this.each(function () {
                    a(this).css(h, b(this, k) + "px")
                })
            };
            a.fn["outer" + f] = function (k, q) {
                if (typeof k !== "number") return j["outer" + f].call(this, k);
                return this.each(function () {
                    a(this).css(h, b(this, k, true, q) + "px")
                })
            }
        });
        a.extend(a.expr[":"], {
            data: function (e, f, b) {
                return !!a.data(e, b[3])
            },
            focusable: function (e) {
                var f = e.nodeName.toLowerCase(),
                    b = a.attr(e, "tabindex");
                if ("area" === f) {
                    f = e.parentNode;
                    b = f.name;
                    if (!e.href || !b || f.nodeName.toLowerCase() !== "map") return false;
                    e = a("img[usemap=#" + b + "]")[0];
                    return !!e && d(e)
                }
                return (/input|select|textarea|button|object/.test(f) ? !e.disabled : "a" == f ? e.href || !isNaN(b) : !isNaN(b)) && d(e)
            },
            tabbable: function (e) {
                var f = a.attr(e, "tabindex");
                return (isNaN(f) || f >= 0) && a(e).is(":focusable")
            }
        });
        a(function () {
            var e = document.body,
                f = e.appendChild(f = document.createElement("div"));
            a.extend(f.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            a.support.minHeight = f.offsetHeight === 100;
            a.support.selectstart = "onselectstart" in f;
            e.removeChild(f).style.display = "none"
        });
        a.extend(a.ui, {
            plugin: {
                add: function (e, f, b) {
                    e = a.ui[e].prototype;
                    for (var g in b) {
                        e.plugins[g] = e.plugins[g] || [];
                        e.plugins[g].push([f, b[g]])
                    }
                },
                call: function (e, f, b) {
                    if ((f = e.plugins[f]) && e.element[0].parentNode) for (var g = 0; g < f.length; g++) e.options[f[g][0]] && f[g][1].apply(e.element, b)
                }
            },
            contains: function (e, f) {
                return document.compareDocumentPosition ? e.compareDocumentPosition(f) & 16 : e !== f && e.contains(f)
            },
            hasScroll: function (e, f) {
                if (a(e).css("overflow") === "hidden") return false;
                f = f && f === "left" ? "scrollLeft" : "scrollTop";
                var b = false;
                if (e[f] > 0) return true;
                e[f] = 1;
                b = e[f] > 0;
                e[f] = 0;
                return b
            },
            isOverAxis: function (e, f, b) {
                return e > f && e < f + b
            },
            isOver: function (e, f, b, g, h, j) {
                return a.ui.isOverAxis(e, b, h) && a.ui.isOverAxis(f, g, j)
            }
        })
    }
})(jQuery);


(function (a, c) {
    if (a.cleanData) {
        var d = a.cleanData;
        a.cleanData = function (f) {
            for (var b = 0, g;
            (g = f[b]) != null; b++) a(g).triggerHandler("remove");
            d(f)
        }
    } else {
        var e = a.fn.remove;
        a.fn.remove = function (f, b) {
            return this.each(function () {
                if (!b) if (!f || a.filter(f, [this]).length) a("*", this).add([this]).each(function () {
                    a(this).triggerHandler("remove")
                });
                return e.call(a(this), f, b)
            })
        }
    }
    a.widget = function (f, b, g) {
        var h = f.split(".")[0],
            j;
        f = f.split(".")[1];
        j = h + "-" + f;
        if (!g) {
            g = b;
            b = a.Widget
        }
        a.expr[":"][j] = function (k) {
            return !!a.data(k, f)
        };
        a[h] = a[h] || {};
        a[h][f] = function (k, q) {
            arguments.length && this._createWidget(k, q)
        };
        b = new b;
        b.options = a.extend(true, {}, b.options);
        a[h][f].prototype = a.extend(true, b, {
            namespace: h,
            widgetName: f,
            widgetEventPrefix: a[h][f].prototype.widgetEventPrefix || f,
            widgetBaseClass: j
        }, g);
        a.widget.bridge(f, a[h][f])
    };
    a.widget.bridge = function (f, b) {
        a.fn[f] = function (g) {
            var h = typeof g === "string",
                j = Array.prototype.slice.call(arguments, 1),
                k = this;
            g = !h && j.length ? a.extend.apply(null, [true, g].concat(j)) : g;
            if (h && g.charAt(0) === "_") return k;
            h ? this.each(function () {
                var q = a.data(this, f),
                    u = q && a.isFunction(q[g]) ? q[g].apply(q, j) : q;
                if (u !== q && u !== c) {
                    k = u;
                    return false
                }
            }) : this.each(function () {
                var q = a.data(this, f);
                q ? q.option(g || {})._init() : a.data(this, f, new b(g, this))
            });
            return k
        }
    };
    a.Widget = function (f, b) {
        arguments.length && this._createWidget(f, b)
    };
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (f, b) {
            a.data(b, this.widgetName, this);
            this.element = a(b);
            this.options = a.extend(true, {}, this.options, this._getCreateOptions(), f);
            var g = this;
            this.element.bind("remove." + this.widgetName, function () {
                g.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (f, b) {
            var g = f;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof f === "string") {
                if (b === c) return this.options[f];
                g = {};
                g[f] = b
            }
            this._setOptions(g);
            return this
        },
        _setOptions: function (f) {
            var b = this;
            a.each(f, function (g, h) {
                b._setOption(g, h)
            });
            return this
        },
        _setOption: function (f, b) {
            this.options[f] = b;
            if (f === "disabled") this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", b);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (f, b, g) {
            var h = this.options[f];
            b = a.Event(b);
            b.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
            g = g || {};
            if (b.originalEvent) {
                f = a.event.props.length;
                for (var j; f;) {
                    j = a.event.props[--f];
                    b[j] = b.originalEvent[j]
                }
            }
            this.element.trigger(b, g);
            return !(a.isFunction(h) && h.call(this.element[0], b, g) === false || b.isDefaultPrevented())
        }
    }
})(jQuery);
(function (a) {
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var c = this;
            this.element.bind("mousedown." + this.widgetName, function (d) {
                return c._mouseDown(d)
            }).bind("click." + this.widgetName, function (d) {
                if (true === a.data(d.target, c.widgetName + ".preventClickEvent")) {
                    a.removeData(d.target, c.widgetName + ".preventClickEvent");
                    d.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (c) {
            c.originalEvent = c.originalEvent || {};
            if (!c.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(c);
                this._mouseDownEvent = c;
                var d = this,
                    e = c.which == 1,
                    f = typeof this.options.cancel == "string" ? a(c.target).parents().add(c.target).filter(this.options.cancel).length : false;
                if (!e || f || !this._mouseCapture(c)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                    d.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                    this._mouseStarted = this._mouseStart(c) !== false;
                    if (!this._mouseStarted) {
                        c.preventDefault();
                        return true
                    }
                }
                true === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (b) {
                    return d._mouseMove(b)
                };
                this._mouseUpDelegate = function (b) {
                    return d._mouseUp(b)
                };
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.preventDefault();
                return c.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function (c) {
            if (a.browser.msie && !(document.documentMode >= 9) && !c.button) return this._mouseUp(c);
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault()
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c);
            return !this._mouseStarted
        },
        _mouseUp: function (c) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                c.target == this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(c)
            }
            return false
        },
        _mouseDistanceMet: function (c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (a) {
    a.ui = a.ui || {};
    var c = /left|center|right/,
        d = /top|center|bottom/,
        e = a.fn.position,
        f = a.fn.offset;
    a.fn.position = function (b) {
        if (!b || !b.of) return e.apply(this, arguments);
        b = a.extend({}, b);
        var g = a(b.of),
            h = g[0],
            j = (b.collision || "flip").split(" "),
            k = b.offset ? b.offset.split(" ") : [0, 0],
            q, u, n;
        if (h.nodeType === 9) {
            q = g.width();
            u = g.height();
            n = {
                top: 0,
                left: 0
            }
        } else if (h.setTimeout) {
            q = g.width();
            u = g.height();
            n = {
                top: g.scrollTop(),
                left: g.scrollLeft()
            }
        } else if (h.preventDefault) {
            b.at = "left top";
            q = u = 0;
            n = {
                top: b.of.pageY,
                left: b.of.pageX
            }
        } else {
            q = g.outerWidth();
            u = g.outerHeight();
            n = g.offset()
        }
        a.each(["my", "at"], function () {
            var l = (b[this] || "").split(" ");
            if (l.length === 1) l = c.test(l[0]) ? l.concat(["center"]) : d.test(l[0]) ? ["center"].concat(l) : ["center", "center"];
            l[0] = c.test(l[0]) ? l[0] : "center";
            l[1] = d.test(l[1]) ? l[1] : "center";
            b[this] = l
        });
        if (j.length === 1) j[1] = j[0];
        k[0] = parseInt(k[0], 10) || 0;
        if (k.length === 1) k[1] = k[0];
        k[1] = parseInt(k[1], 10) || 0;
        if (b.at[0] === "right") n.left += q;
        else if (b.at[0] === "center") n.left += q / 2;
        if (b.at[1] === "bottom") n.top += u;
        else if (b.at[1] === "center") n.top += u / 2;
        n.left += k[0];
        n.top += k[1];
        return this.each(function () {
            var l = a(this),
                p = l.outerWidth(),
                s = l.outerHeight(),
                v = parseInt(a.curCSS(this, "marginLeft", true)) || 0,
                C = parseInt(a.curCSS(this, "marginTop", true)) || 0,
                D = p + v + (parseInt(a.curCSS(this, "marginRight", true)) || 0),
                F = s + C + (parseInt(a.curCSS(this, "marginBottom", true)) || 0),
                o = a.extend({}, n),
                m;
            if (b.my[0] === "right") o.left -= p;
            else if (b.my[0] === "center") o.left -= p / 2;
            if (b.my[1] === "bottom") o.top -= s;
            else if (b.my[1] === "center") o.top -= s / 2;
            o.left = Math.round(o.left);
            o.top = Math.round(o.top);
            m = {
                left: o.left - v,
                top: o.top - C
            };
            a.each(["left", "top"], function (z, B) {
                a.ui.position[j[z]] && a.ui.position[j[z]][B](o, {
                    targetWidth: q,
                    targetHeight: u,
                    elemWidth: p,
                    elemHeight: s,
                    collisionPosition: m,
                    collisionWidth: D,
                    collisionHeight: F,
                    offset: k,
                    my: b.my,
                    at: b.at
                })
            });
            a.fn.bgiframe && l.bgiframe();
            l.offset(a.extend(o, {
                using: b.using
            }))
        })
    };
    a.ui.position = {
        fit: {
            left: function (b, g) {
                var h = a(window);
                h = g.collisionPosition.left + g.collisionWidth - h.width() - h.scrollLeft();
                b.left = h > 0 ? b.left - h : Math.max(b.left - g.collisionPosition.left, b.left)
            },
            top: function (b, g) {
                var h = a(window);
                h = g.collisionPosition.top + g.collisionHeight - h.height() - h.scrollTop();
                b.top = h > 0 ? b.top - h : Math.max(b.top - g.collisionPosition.top, b.top)
            }
        },
        flip: {
            left: function (b, g) {
                if (g.at[0] !== "center") {
                    var h = a(window);
                    h = g.collisionPosition.left + g.collisionWidth - h.width() - h.scrollLeft();
                    var j = g.my[0] === "left" ? -g.elemWidth : g.my[0] === "right" ? g.elemWidth : 0,
                        k = g.at[0] === "left" ? g.targetWidth : -g.targetWidth,
                        q = -2 * g.offset[0];
                    b.left += g.collisionPosition.left < 0 ? j + k + q : h > 0 ? j + k + q : 0
                }
            },
            top: function (b, g) {
                if (g.at[1] !== "center") {
                    var h = a(window);
                    h = g.collisionPosition.top + g.collisionHeight - h.height() - h.scrollTop();
                    var j = g.my[1] === "top" ? -g.elemHeight : g.my[1] === "bottom" ? g.elemHeight : 0,
                        k = g.at[1] === "top" ? g.targetHeight : -g.targetHeight,
                        q = -2 * g.offset[1];
                    b.top += g.collisionPosition.top < 0 ? j + k + q : h > 0 ? j + k + q : 0
                }
            }
        }
    };
    if (!a.offset.setOffset) {
        a.offset.setOffset = function (b, g) {
            if (/static/.test(a.curCSS(b, "position"))) b.style.position = "relative";
            var h = a(b),
                j = h.offset(),
                k = parseInt(a.curCSS(b, "top", true), 10) || 0,
                q = parseInt(a.curCSS(b, "left", true), 10) || 0;
            j = {
                top: g.top - j.top + k,
                left: g.left - j.left + q
            };
            "using" in g ? g.using.call(b, j) : h.css(j)
        };
        a.fn.offset = function (b) {
            var g = this[0];
            if (!g || !g.ownerDocument) return null;
            if (b) return this.each(function () {
                a.offset.setOffset(this, b)
            });
            return f.call(this)
        }
    }
})(jQuery);
(function (a) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (c) {
            var d = this.options;
            if (this.helper || d.disabled || a(c.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(c);
            if (!this.handle) return false;
            return true
        },
        _mouseStart: function (c) {
            var d = this.options;
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            if (a.ui.ddmanager) a.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
            d.containment && this._setContainment();
            if (this._trigger("start", c) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(c, true);
            return true
        },
        _mouseDrag: function (c, d) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!d) {
                d = this._uiHash();
                if (this._trigger("drag", c, d) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
            return false
        },
        _mouseStop: function (c) {
            var d = false;
            if (a.ui.ddmanager && !this.options.dropBehaviour) d = a.ui.ddmanager.drop(this, c);
            if (this.dropped) {
                d = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !d || this.options.revert == "valid" && d || this.options.revert === true || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d)) {
                var e = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    e._trigger("stop", c) !== false && e._clear()
                })
            } else this._trigger("stop", c) !== false && this._clear();
            return false
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (c) {
            var d = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
            a(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == c.target) d = true
            });
            return d
        },
        _createHelper: function (c) {
            var d = this.options;
            c = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : d.helper == "clone" ? this.element.clone() : this.element;
            c.parents("body").length || c.appendTo(d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo);
            c[0] != this.element[0] && !/(fixed|absolute)/.test(c.css("position")) && c.css("position", "absolute");
            return c
        },
        _adjustOffsetFromHelper: function (c) {
            if (typeof c == "string") c = c.split(" ");
            if (a.isArray(c)) c = {
                left: +c[0],
                top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) c = {
                top: 0,
                left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var c = this.element.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [(c.containment == "document" ? 0 : a(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (c.containment == "document" ? 0 : a(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (c.containment == "document" ? 0 : a(window).scrollLeft()) + a(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (c.containment == "document" ? 0 : a(window).scrollTop()) + (a(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment) && c.containment.constructor != Array) {
                var d = a(c.containment)[0];
                if (d) {
                    c = a(c.containment).offset();
                    var e = a(d).css("overflow") != "hidden";
                    this.containment = [c.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), c.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), c.left + (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, c.top + (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom]
                }
            } else if (c.containment.constructor == Array) this.containment = c.containment
        },
        _convertPositionTo: function (c, d) {
            if (!d) d = this.position;
            c = c == "absolute" ? 1 : -1;
            var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(e[0].tagName);
            return {
                top: d.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * c),
                left: d.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * c)
            }
        },
        _generatePosition: function (c) {
            var d = this.options,
                e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(e[0].tagName),
                b = c.pageX,
                g = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) b = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) b = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (d.grid) {
                    g = this.originalPageY + Math.round((g - this.originalPageY) / d.grid[1]) * d.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : !(g - this.offset.click.top < this.containment[1]) ? g - d.grid[1] : g + d.grid[1] : g;
                    b = this.originalPageX + Math.round((b - this.originalPageX) / d.grid[0]) * d.grid[0];
                    b = this.containment ? !(b - this.offset.click.left < this.containment[0] || b - this.offset.click.left > this.containment[2]) ? b : !(b - this.offset.click.left < this.containment[0]) ? b - d.grid[0] : b + d.grid[0] : b
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()),
                left: b - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (c, d, e) {
            e = e || this._uiHash();
            a.ui.plugin.call(this, c, [d, e]);
            if (c == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return a.Widget.prototype._trigger.call(this, c, d, e)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.extend(a.ui.draggable, {
        version: "1.8.11"
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function (c, d) {
            var e = a(this).data("draggable"),
                f = e.options,
                b = a.extend({}, d, {
                    item: e.element
                });
            e.sortables = [];
            a(f.connectToSortable).each(function () {
                var g = a.data(this, "sortable");
                if (g && !g.options.disabled) {
                    e.sortables.push({
                        instance: g,
                        shouldRevert: g.options.revert
                    });
                    g.refreshPositions();
                    g._trigger("activate", c, b)
                }
            })
        },
        stop: function (c, d) {
            var e = a(this).data("draggable"),
                f = a.extend({}, d, {
                    item: e.element
                });
            a.each(e.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    e.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    e.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, f)
                }
            })
        },
        drag: function (c, d) {
            var e = a(this).data("draggable"),
                f = this;
            a.each(e.sortables, function () {
                this.instance.positionAbs = e.positionAbs;
                this.instance.helperProportions = e.helperProportions;
                this.instance.offset.click = e.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = a(f).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return d.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = e.offset.click.top;
                        this.instance.offset.click.left = e.offset.click.left;
                        this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                        e._trigger("toSortable", c);
                        e.dropped = this.instance.element;
                        e.currentItem = e.element;
                        this.instance.fromOutside = e
                    }
                    this.instance.currentItem && this.instance._mouseDrag(c)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(c, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    e._trigger("fromSortable", c);
                    e.dropped = false
                }
            })
        }
    });
    a.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var c = a("body"),
                d = a(this).data("draggable").options;
            if (c.css("cursor")) d._cursor = c.css("cursor");
            c.css("cursor", d.cursor)
        },
        stop: function () {
            var c = a(this).data("draggable").options;
            c._cursor && a("body").css("cursor", c._cursor)
        }
    });
    a.ui.plugin.add("draggable", "iframeFix", {
        start: function () {
            var c = a(this).data("draggable").options;
            a(c.iframeFix === true ? "iframe" : c.iframeFix).each(function () {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(a(this).offset()).appendTo("body")
            })
        },
        stop: function () {
            a("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    a.ui.plugin.add("draggable", "opacity", {
        start: function (c, d) {
            c = a(d.helper);
            d = a(this).data("draggable").options;
            if (c.css("opacity")) d._opacity = c.css("opacity");
            c.css("opacity", d.opacity)
        },
        stop: function (c, d) {
            c = a(this).data("draggable").options;
            c._opacity && a(d.helper).css("opacity", c._opacity)
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var c = a(this).data("draggable");
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") c.overflowOffset = c.scrollParent.offset()
        },
        drag: function (c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = false;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") if (d.overflowOffset.top + d.scrollParent[0].offsetHeight - c.pageY < e.scrollSensitivity) d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed;
                else if (c.pageY - d.overflowOffset.top < e.scrollSensitivity) d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed;
                if (!e.axis || e.axis != "y") if (d.overflowOffset.left + d.scrollParent[0].offsetWidth - c.pageX < e.scrollSensitivity) d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed;
                else if (c.pageX - d.overflowOffset.left < e.scrollSensitivity) d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed
            } else {
                if (!e.axis || e.axis != "x") if (c.pageY - a(document).scrollTop() < e.scrollSensitivity) f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed);
                else if (a(window).height() - (c.pageY - a(document).scrollTop()) < e.scrollSensitivity) f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed);
                if (!e.axis || e.axis != "y") if (c.pageX - a(document).scrollLeft() < e.scrollSensitivity) f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed);
                else if (a(window).width() - (c.pageX - a(document).scrollLeft()) < e.scrollSensitivity) f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed)
            }
            f !== false && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, c)
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function () {
            var c = a(this).data("draggable"),
                d = c.options;
            c.snapElements = [];
            a(d.snap.constructor != String ? d.snap.items || ":data(draggable)" : d.snap).each(function () {
                var e = a(this),
                    f = e.offset();
                this != c.element[0] && c.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function (c, d) {
            for (var e = a(this).data("draggable"), f = e.options, b = f.snapTolerance, g = d.offset.left, h = g + e.helperProportions.width, j = d.offset.top, k = j + e.helperProportions.height, q = e.snapElements.length - 1; q >= 0; q--) {
                var u = e.snapElements[q].left,
                    n = u + e.snapElements[q].width,
                    l = e.snapElements[q].top,
                    p = l + e.snapElements[q].height;
                if (u - b < g && g < n + b && l - b < j && j < p + b || u - b < g && g < n + b && l - b < k && k < p + b || u - b < h && h < n + b && l - b < j && j < p + b || u - b < h && h < n + b && l - b < k && k < p + b) {
                    if (f.snapMode != "inner") {
                        var s = Math.abs(l - k) <= b,
                            v = Math.abs(p - j) <= b,
                            C = Math.abs(u - h) <= b,
                            D = Math.abs(n - g) <= b;
                        if (s) d.position.top = e._convertPositionTo("relative", {
                            top: l - e.helperProportions.height,
                            left: 0
                        }).top - e.margins.top;
                        if (v) d.position.top = e._convertPositionTo("relative", {
                            top: p,
                            left: 0
                        }).top - e.margins.top;
                        if (C) d.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: u - e.helperProportions.width
                        }).left - e.margins.left;
                        if (D) d.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: n
                        }).left - e.margins.left
                    }
                    var F = s || v || C || D;
                    if (f.snapMode != "outer") {
                        s = Math.abs(l - j) <= b;
                        v = Math.abs(p - k) <= b;
                        C = Math.abs(u - g) <= b;
                        D = Math.abs(n - h) <= b;
                        if (s) d.position.top = e._convertPositionTo("relative", {
                            top: l,
                            left: 0
                        }).top - e.margins.top;
                        if (v) d.position.top = e._convertPositionTo("relative", {
                            top: p - e.helperProportions.height,
                            left: 0
                        }).top - e.margins.top;
                        if (C) d.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: u
                        }).left - e.margins.left;
                        if (D) d.position.left = e._convertPositionTo("relative", {
                            top: 0,
                            left: n - e.helperProportions.width
                        }).left - e.margins.left
                    }
                    if (!e.snapElements[q].snapping && (s || v || C || D || F)) e.options.snap.snap && e.options.snap.snap.call(e.element, c, a.extend(e._uiHash(), {
                        snapItem: e.snapElements[q].item
                    }));
                    e.snapElements[q].snapping = s || v || C || D || F
                } else {
                    e.snapElements[q].snapping && e.options.snap.release && e.options.snap.release.call(e.element, c, a.extend(e._uiHash(), {
                        snapItem: e.snapElements[q].item
                    }));
                    e.snapElements[q].snapping = false
                }
            }
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function () {
            var c = a(this).data("draggable").options;
            c = a.makeArray(a(c.stack)).sort(function (e, f) {
                return (parseInt(a(e).css("zIndex"), 10) || 0) - (parseInt(a(f).css("zIndex"), 10) || 0)
            });
            if (c.length) {
                var d = parseInt(c[0].style.zIndex) || 0;
                a(c).each(function (e) {
                    this.style.zIndex = d + e
                });
                this[0].style.zIndex = d + c.length
            }
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function (c, d) {
            c = a(d.helper);
            d = a(this).data("draggable").options;
            if (c.css("zIndex")) d._zIndex = c.css("zIndex");
            c.css("zIndex", d.zIndex)
        },
        stop: function (c, d) {
            c = a(this).data("draggable").options;
            c._zIndex && a(d.helper).css("zIndex", c._zIndex)
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var c = this.options,
                d = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = a.isFunction(d) ? d : function (e) {
                return e.is(d)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [];
            a.ui.ddmanager.droppables[c.scope].push(this);
            c.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var c = a.ui.ddmanager.droppables[this.options.scope], d = 0; d < c.length; d++) c[d] == this && c.splice(d, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (c, d) {
            if (c == "accept") this.accept = a.isFunction(d) ? d : function (e) {
                return e.is(d)
            };
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (c) {
            var d = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            d && this._trigger("activate", c, this.ui(d))
        },
        _deactivate: function (c) {
            var d = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            d && this._trigger("deactivate", c, this.ui(d))
        },
        _over: function (c) {
            var d = a.ui.ddmanager.current;
            if (!(!d || (d.currentItem || d.element)[0] == this.element[0])) if (this.accept.call(this.element[0], d.currentItem || d.element)) {
                this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                this._trigger("over", c, this.ui(d))
            }
        },
        _out: function (c) {
            var d = a.ui.ddmanager.current;
            if (!(!d || (d.currentItem || d.element)[0] == this.element[0])) if (this.accept.call(this.element[0], d.currentItem || d.element)) {
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("out", c, this.ui(d))
            }
        },
        _drop: function (c, d) {
            var e = d || a.ui.ddmanager.current;
            if (!e || (e.currentItem || e.element)[0] == this.element[0]) return false;
            var f = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var b = a.data(this, "droppable");
                if (b.options.greedy && !b.options.disabled && b.options.scope == e.options.scope && b.accept.call(b.element[0], e.currentItem || e.element) && a.ui.intersect(e, a.extend(b, {
                    offset: b.element.offset()
                }), b.options.tolerance)) {
                    f = true;
                    return false
                }
            });
            if (f) return false;
            if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", c, this.ui(e));
                return this.element
            }
            return false
        },
        ui: function (c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    });
    a.extend(a.ui.droppable, {
        version: "1.8.11"
    });
    a.ui.intersect = function (c, d, e) {
        if (!d.offset) return false;
        var f = (c.positionAbs || c.position.absolute).left,
            b = f + c.helperProportions.width,
            g = (c.positionAbs || c.position.absolute).top,
            h = g + c.helperProportions.height,
            j = d.offset.left,
            k = j + d.proportions.width,
            q = d.offset.top,
            u = q + d.proportions.height;
        switch (e) {
        case "fit":
            return j <= f && b <= k && q <= g && h <= u;
        case "intersect":
            return j < f + c.helperProportions.width / 2 && b - c.helperProportions.width / 2 < k && q < g + c.helperProportions.height / 2 && h - c.helperProportions.height / 2 < u;
        case "pointer":
            return a.ui.isOver((c.positionAbs || c.position.absolute).top + (c.clickOffset || c.offset.click).top, (c.positionAbs || c.position.absolute).left + (c.clickOffset || c.offset.click).left, q, j, d.proportions.height, d.proportions.width);
        case "touch":
            return (g >= q && g <= u || h >= q && h <= u || g < q && h > u) && (f >= j && f <= k || b >= j && b <= k || f < j && b > k);
        default:
            return false
        }
    };
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (c, d) {
            var e = a.ui.ddmanager.droppables[c.options.scope] || [],
                f = d ? d.type : null,
                b = (c.currentItem || c.element).find(":data(droppable)").andSelf(),
                g = 0;
            a: for (; g < e.length; g++) if (!(e[g].options.disabled || c && !e[g].accept.call(e[g].element[0], c.currentItem || c.element))) {
                for (var h = 0; h < b.length; h++) if (b[h] == e[g].element[0]) {
                    e[g].proportions.height = 0;
                    continue a
                }
                e[g].visible = e[g].element.css("display") != "none";
                if (e[g].visible) {
                    f == "mousedown" && e[g]._activate.call(e[g], d);
                    e[g].offset = e[g].element.offset();
                    e[g].proportions = {
                        width: e[g].element[0].offsetWidth,
                        height: e[g].element[0].offsetHeight
                    }
                }
            }
        },
        drop: function (c, d) {
            var e = false;
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function () {
                if (this.options) {
                    if (!this.options.disabled && this.visible && a.ui.intersect(c, this, this.options.tolerance)) e = e || this._drop.call(this, d);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], c.currentItem || c.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, d)
                    }
                }
            });
            return e
        },
        drag: function (c, d) {
            c.options.refreshPositions && a.ui.ddmanager.prepareOffsets(c, d);
            a.each(a.ui.ddmanager.droppables[c.options.scope] || [], function () {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var e = a.ui.intersect(c, this, this.options.tolerance);
                    if (e = !e && this.isover == 1 ? "isout" : e && this.isover == 0 ? "isover" : null) {
                        var f;
                        if (this.options.greedy) {
                            var b = this.element.parents(":data(droppable):eq(0)");
                            if (b.length) {
                                f = a.data(b[0], "droppable");
                                f.greedyChild = e == "isover" ? 1 : 0
                            }
                        }
                        if (f && e == "isover") {
                            f.isover = 0;
                            f.isout = 1;
                            f._out.call(f, d)
                        }
                        this[e] = 1;
                        this[e == "isout" ? "isover" : "isout"] = 0;
                        this[e == "isover" ? "_over" : "_out"].call(this, d);
                        if (f && e == "isout") {
                            f.isout = 0;
                            f.isover = 1;
                            f._over.call(f, d)
                        }
                    }
                }
            })
        }
    }
})(jQuery);
(function (a) {
    a.widget("ui.resizable", a.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",

            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function () {
            var e = this,
                f = this.options;
            this.element.addClass("ui-resizable");
            a.extend(this, {
                _aspectRatio: !! f.aspectRatio,
                aspectRatio: f.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: f.helper || f.ghost || f.animate ? f.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && a.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = f.handles || (!a(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var b = this.handles.split(",");
                this.handles = {};
                for (var g = 0; g < b.length; g++) {
                    var h = a.trim(b[g]),
                        j = a('<div class="ui-resizable-handle ' + ("ui-resizable-" + h) + '"></div>');
                    /sw|se|ne|nw/.test(h) && j.css({
                        zIndex: ++f.zIndex
                    });
                    "se" == h && j.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[h] = ".ui-resizable-" + h;
                    this.element.append(j)
                }
            }
            this._renderAxis = function (k) {
                k = k || this.element;
                for (var q in this.handles) {
                    if (this.handles[q].constructor == String) this.handles[q] = a(this.handles[q], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var u = a(this.handles[q], this.element),
                            n = 0;
                        n = /sw|ne|nw|se|n|s/.test(q) ? u.outerHeight() : u.outerWidth();
                        u = ["padding", /ne|nw|n/.test(q) ? "Top" : /se|sw|s/.test(q) ? "Bottom" : /^e$/.test(q) ? "Right" : "Left"].join("");
                        k.css(u, n);
                        this._proportionallyResize()
                    }
                    a(this.handles[q])
                }
            };
            this._renderAxis(this.element);
            this._handles = a(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!e.resizing) {
                    if (this.className) var k = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    e.axis = k && k[1] ? k[1] : "se"
                }
            });
            if (f.autoHide) {
                this._handles.hide();
                a(this.element).addClass("ui-resizable-autohide").hover(function () {
                    a(this).removeClass("ui-resizable-autohide");
                    e._handles.show()
                }, function () {
                    if (!e.resizing) {
                        a(this).addClass("ui-resizable-autohide");
                        e._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var e = function (b) {
                    a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
            if (this.elementIsWrapper) {
                e(this.element);
                var f = this.element;
                f.after(this.originalElement.css({
                    position: f.css("position"),
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: f.css("top"),
                    left: f.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            e(this.originalElement);
            return this
        },
        _mouseCapture: function (e) {
            var f = false;
            for (var b in this.handles) if (a(this.handles[b])[0] == e.target) f = true;
            return !this.options.disabled && f
        },
        _mouseStart: function (e) {
            var f = this.options,
                b = this.element.position(),
                g = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: a(document).scrollTop(),
                left: a(document).scrollLeft()
            };
            if (g.is(".ui-draggable") || /absolute/.test(g.css("position"))) g.css({
                position: "absolute",
                top: b.top,
                left: b.left
            });
            a.browser.opera && /relative/.test(g.css("position")) && g.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            b = c(this.helper.css("left"));
            var h = c(this.helper.css("top"));
            if (f.containment) {
                b += a(f.containment).scrollLeft() || 0;
                h += a(f.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: b,
                top: h
            };
            this.size = this._helper ? {
                width: g.outerWidth(),
                height: g.outerHeight()
            } : {
                width: g.width(),
                height: g.height()
            };
            this.originalSize = this._helper ? {
                width: g.outerWidth(),
                height: g.outerHeight()
            } : {
                width: g.width(),
                height: g.height()
            };
            this.originalPosition = {
                left: b,
                top: h
            };
            this.sizeDiff = {
                width: g.outerWidth() - g.width(),
                height: g.outerHeight() - g.height()
            };
            this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            };
            this.aspectRatio = typeof f.aspectRatio == "number" ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            f = a(".ui-resizable-" + this.axis).css("cursor");
            a("body").css("cursor", f == "auto" ? this.axis + "-resize" : f);
            g.addClass("ui-resizable-resizing");
            this._propagate("start", e);
            return true
        },
        _mouseDrag: function (e) {
            var f = this.helper,
                b = this.originalMousePosition,
                g = this._change[this.axis];
            if (!g) return false;
            b = g.apply(this, [e, e.pageX - b.left || 0, e.pageY - b.top || 0]);
            if (this._aspectRatio || e.shiftKey) b = this._updateRatio(b, e);
            b = this._respectSize(b, e);
            this._propagate("resize", e);
            f.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(b);
            this._trigger("resize", e, this.ui());
            return false
        },
        _mouseStop: function (e) {
            this.resizing = false;
            var f = this.options,
                b = this;
            if (this._helper) {
                var g = this._proportionallyResizeElements,
                    h = g.length && /textarea/i.test(g[0].nodeName);
                g = h && a.ui.hasScroll(g[0], "left") ? 0 : b.sizeDiff.height;
                h = h ? 0 : b.sizeDiff.width;
                h = {
                    width: b.helper.width() - h,
                    height: b.helper.height() - g
                };
                g = parseInt(b.element.css("left"), 10) + (b.position.left - b.originalPosition.left) || null;
                var j = parseInt(b.element.css("top"), 10) + (b.position.top - b.originalPosition.top) || null;
                f.animate || this.element.css(a.extend(h, {
                    top: j,
                    left: g
                }));
                b.helper.height(b.size.height);
                b.helper.width(b.size.width);
                this._helper && !f.animate && this._proportionallyResize()
            }
            a("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", e);
            this._helper && this.helper.remove();
            return false
        },
        _updateCache: function (e) {
            this.offset = this.helper.offset();
            if (d(e.left)) this.position.left = e.left;
            if (d(e.top)) this.position.top = e.top;
            if (d(e.height)) this.size.height = e.height;
            if (d(e.width)) this.size.width = e.width
        },
        _updateRatio: function (e) {
            var f = this.position,
                b = this.size,
                g = this.axis;
            if (e.height) e.width = b.height * this.aspectRatio;
            else if (e.width) e.height = b.width / this.aspectRatio;
            if (g == "sw") {
                e.left = f.left + (b.width - e.width);
                e.top = null
            }
            if (g == "nw") {
                e.top = f.top + (b.height - e.height);
                e.left = f.left + (b.width - e.width)
            }
            return e
        },
        _respectSize: function (e) {
            var f = this.options,
                b = this.axis,
                g = d(e.width) && f.maxWidth && f.maxWidth < e.width,
                h = d(e.height) && f.maxHeight && f.maxHeight < e.height,
                j = d(e.width) && f.minWidth && f.minWidth > e.width,
                k = d(e.height) && f.minHeight && f.minHeight > e.height;
            if (j) e.width = f.minWidth;
            if (k) e.height = f.minHeight;
            if (g) e.width = f.maxWidth;
            if (h) e.height = f.maxHeight;
            var q = this.originalPosition.left + this.originalSize.width,
                u = this.position.top + this.size.height,
                n = /sw|nw|w/.test(b);
            b = /nw|ne|n/.test(b);
            if (j && n) e.left = q - f.minWidth;
            if (g && n) e.left = q - f.maxWidth;
            if (k && b) e.top = u - f.minHeight;
            if (h && b) e.top = u - f.maxHeight;
            if ((f = !e.width && !e.height) && !e.left && e.top) e.top = null;
            else if (f && !e.top && e.left) e.left = null;
            return e
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) for (var e = this.helper || this.element, f = 0; f < this._proportionallyResizeElements.length; f++) {
                var b = this._proportionallyResizeElements[f];
                if (!this.borderDif) {
                    var g = [b.css("borderTopWidth"), b.css("borderRightWidth"), b.css("borderBottomWidth"), b.css("borderLeftWidth")],
                        h = [b.css("paddingTop"), b.css("paddingRight"), b.css("paddingBottom"), b.css("paddingLeft")];
                    this.borderDif = a.map(g, function (j, k) {
                        j = parseInt(j, 10) || 0;
                        k = parseInt(h[k], 10) || 0;
                        return j + k
                    })
                }
                a.browser.msie && (a(e).is(":hidden") || a(e).parents(":hidden").length) || b.css({
                    height: e.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: e.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function () {
            var e = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
                var f = a.browser.msie && a.browser.version < 7,
                    b = f ? 1 : 0;
                f = f ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + f,
                    height: this.element.outerHeight() + f,
                    position: "absolute",
                    left: this.elementOffset.left - b + "px",
                    top: this.elementOffset.top - b + "px",
                    zIndex: ++e.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (e, f) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function (e, f) {
                return {
                    left: this.originalPosition.left + f,
                    width: this.originalSize.width - f
                }
            },
            n: function (e, f, b) {
                return {
                    top: this.originalPosition.top + b,
                    height: this.originalSize.height - b
                }
            },
            s: function (e, f, b) {
                return {
                    height: this.originalSize.height + b
                }
            },
            se: function (e, f, b) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, f, b]))
            },
            sw: function (e, f, b) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, f, b]))
            },
            ne: function (e, f, b) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, f, b]))
            },
            nw: function (e, f, b) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, f, b]))
            }
        },
        _propagate: function (e, f) {
            a.ui.plugin.call(this, e, [f, this.ui()]);
            e != "resize" && this._trigger(e, f, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    a.extend(a.ui.resizable, {
        version: "1.8.11"
    });
    a.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var e = a(this).data("resizable").options,
                f = function (b) {
                    a(b).each(function () {
                        var g = a(this);
                        g.data("resizable-alsoresize", {
                            width: parseInt(g.width(), 10),
                            height: parseInt(g.height(), 10),
                            left: parseInt(g.css("left"), 10),
                            top: parseInt(g.css("top"), 10),
                            position: g.css("position")
                        })
                    })
                };
            if (typeof e.alsoResize == "object" && !e.alsoResize.parentNode) if (e.alsoResize.length) {
                e.alsoResize = e.alsoResize[0];
                f(e.alsoResize)
            } else a.each(e.alsoResize, function (b) {
                f(b)
            });
            else f(e.alsoResize)
        },
        resize: function (e, f) {
            var b = a(this).data("resizable");
            e = b.options;
            var g = b.originalSize,
                h = b.originalPosition,
                j = {
                    height: b.size.height - g.height || 0,
                    width: b.size.width - g.width || 0,
                    top: b.position.top - h.top || 0,
                    left: b.position.left - h.left || 0
                },
                k = function (q, u) {
                    a(q).each(function () {
                        var n = a(this),
                            l = a(this).data("resizable-alsoresize"),
                            p = {},
                            s = u && u.length ? u : n.parents(f.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        a.each(s, function (v, C) {
                            if ((v = (l[C] || 0) + (j[C] || 0)) && v >= 0) p[C] = v || null
                        });
                        if (a.browser.opera && /relative/.test(n.css("position"))) {
                            b._revertToRelativePosition = true;
                            n.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })
                        }
                        n.css(p)
                    })
                };
            typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function (q, u) {
                k(q, u)
            }) : k(e.alsoResize)
        },
        stop: function () {
            var e = a(this).data("resizable"),
                f = e.options,
                b = function (g) {
                    a(g).each(function () {
                        var h = a(this);
                        h.css({
                            position: h.data("resizable-alsoresize").position
                        })
                    })
                };
            if (e._revertToRelativePosition) {
                e._revertToRelativePosition = false;
                typeof f.alsoResize == "object" && !f.alsoResize.nodeType ? a.each(f.alsoResize, function (g) {
                    b(g)
                }) : b(f.alsoResize)
            }
            a(this).removeData("resizable-alsoresize")
        }
    });
    a.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
            var f = a(this).data("resizable"),
                b = f.options,
                g = f._proportionallyResizeElements,
                h = g.length && /textarea/i.test(g[0].nodeName),
                j = h && a.ui.hasScroll(g[0], "left") ? 0 : f.sizeDiff.height;
            h = {
                width: f.size.width - (h ? 0 : f.sizeDiff.width),
                height: f.size.height - j
            };
            j = parseInt(f.element.css("left"), 10) + (f.position.left - f.originalPosition.left) || null;
            var k = parseInt(f.element.css("top"), 10) + (f.position.top - f.originalPosition.top) || null;
            f.element.animate(a.extend(h, k && j ? {
                top: k,
                left: j
            } : {}), {
                duration: b.animateDuration,
                easing: b.animateEasing,
                step: function () {
                    var q = {
                        width: parseInt(f.element.css("width"), 10),
                        height: parseInt(f.element.css("height"), 10),
                        top: parseInt(f.element.css("top"), 10),
                        left: parseInt(f.element.css("left"), 10)
                    };
                    g && g.length && a(g[0]).css({
                        width: q.width,
                        height: q.height
                    });
                    f._updateCache(q);
                    f._propagate("resize", e)
                }
            })
        }
    });
    a.ui.plugin.add("resizable", "containment", {
        start: function () {
            var e = a(this).data("resizable"),
                f = e.element,
                b = e.options.containment;
            if (f = b instanceof a ? b.get(0) : /parent/.test(b) ? f.parent().get(0) : b) {
                e.containerElement = a(f);
                if (/document/.test(b) || b == document) {
                    e.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    e.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    e.parentData = {
                        element: a(document),
                        left: 0,
                        top: 0,
                        width: a(document).width(),
                        height: a(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var g = a(f),
                        h = [];
                    a(["Top", "Right", "Left", "Bottom"]).each(function (q, u) {
                        h[q] = c(g.css("padding" + u))
                    });
                    e.containerOffset = g.offset();
                    e.containerPosition = g.position();
                    e.containerSize = {
                        height: g.innerHeight() - h[3],
                        width: g.innerWidth() - h[1]
                    };
                    b = e.containerOffset;
                    var j = e.containerSize.height,
                        k = e.containerSize.width;
                    k = a.ui.hasScroll(f, "left") ? f.scrollWidth : k;
                    j = a.ui.hasScroll(f) ? f.scrollHeight : j;
                    e.parentData = {
                        element: f,
                        left: b.left,
                        top: b.top,
                        width: k,
                        height: j
                    }
                }
            }
        },
        resize: function (e) {
            var f = a(this).data("resizable"),
                b = f.options,
                g = f.containerOffset,
                h = f.position;
            e = f._aspectRatio || e.shiftKey;
            var j = {
                top: 0,
                left: 0
            },
                k = f.containerElement;
            if (k[0] != document && /static/.test(k.css("position"))) j = g;
            if (h.left < (f._helper ? g.left : 0)) {
                f.size.width += f._helper ? f.position.left - g.left : f.position.left - j.left;
                if (e) f.size.height = f.size.width / b.aspectRatio;
                f.position.left = b.helper ? g.left : 0
            }
            if (h.top < (f._helper ? g.top : 0)) {
                f.size.height += f._helper ? f.position.top - g.top : f.position.top;
                if (e) f.size.width = f.size.height * b.aspectRatio;
                f.position.top = f._helper ? g.top : 0
            }
            f.offset.left = f.parentData.left + f.position.left;
            f.offset.top = f.parentData.top + f.position.top;
            b = Math.abs((f._helper ? f.offset.left - j.left : f.offset.left - j.left) + f.sizeDiff.width);
            g = Math.abs((f._helper ? f.offset.top - j.top : f.offset.top - g.top) + f.sizeDiff.height);
            h = f.containerElement.get(0) == f.element.parent().get(0);
            j = /relative|absolute/.test(f.containerElement.css("position"));
            if (h && j) b -= f.parentData.left;
            if (b + f.size.width >= f.parentData.width) {
                f.size.width = f.parentData.width - b;
                if (e) f.size.height = f.size.width / f.aspectRatio
            }
            if (g + f.size.height >= f.parentData.height) {
                f.size.height = f.parentData.height - g;
                if (e) f.size.width = f.size.height * f.aspectRatio
            }
        },
        stop: function () {
            var e = a(this).data("resizable"),
                f = e.options,
                b = e.containerOffset,
                g = e.containerPosition,
                h = e.containerElement,
                j = a(e.helper),
                k = j.offset(),
                q = j.outerWidth() - e.sizeDiff.width;
            j = j.outerHeight() - e.sizeDiff.height;
            e._helper && !f.animate && /relative/.test(h.css("position")) && a(this).css({
                left: k.left - g.left - b.left,
                width: q,
                height: j
            });
            e._helper && !f.animate && /static/.test(h.css("position")) && a(this).css({
                left: k.left - g.left - b.left,
                width: q,
                height: j
            })
        }
    });
    a.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var e = a(this).data("resizable"),
                f = e.options,
                b = e.size;
            e.ghost = e.originalElement.clone();
            e.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: b.height,
                width: b.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof f.ghost == "string" ? f.ghost : "");
            e.ghost.appendTo(e.helper)
        },
        resize: function () {
            var e = a(this).data("resizable");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function () {
            var e = a(this).data("resizable");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    });
    a.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var e = a(this).data("resizable"),
                f = e.options,
                b = e.size,
                g = e.originalSize,
                h = e.originalPosition,
                j = e.axis;
            f.grid = typeof f.grid == "number" ? [f.grid, f.grid] : f.grid;
            var k = Math.round((b.width - g.width) / (f.grid[0] || 1)) * (f.grid[0] || 1);
            f = Math.round((b.height - g.height) / (f.grid[1] || 1)) * (f.grid[1] || 1);
            if (/^(se|s|e)$/.test(j)) {
                e.size.width = g.width + k;
                e.size.height = g.height + f
            } else if (/^(ne)$/.test(j)) {
                e.size.width = g.width + k;
                e.size.height = g.height + f;
                e.position.top = h.top - f
            } else {
                if (/^(sw)$/.test(j)) {
                    e.size.width = g.width + k;
                    e.size.height = g.height + f
                } else {
                    e.size.width = g.width + k;
                    e.size.height = g.height + f;
                    e.position.top = h.top - f
                }
                e.position.left = h.left - k
            }
        }
    });
    var c = function (e) {
            return parseInt(e, 10) || 0
        },
        d = function (e) {
            return !isNaN(parseInt(e, 10))
        }
})(jQuery);
(function (a) {
    a.widget("ui.selectable", a.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function () {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var d;
            this.refresh = function () {
                d = a(c.options.filter, c.element[0]);
                d.each(function () {
                    var e = a(this),
                        f = e.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: e,
                        left: f.left,
                        top: f.top,
                        right: f.left + e.outerWidth(),
                        bottom: f.top + e.outerHeight(),
                        startselected: false,
                        selected: e.hasClass("ui-selected"),
                        selecting: e.hasClass("ui-selecting"),
                        unselecting: e.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = d.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("<div class='ui-selectable-helper'></div>")
        },
        destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function (c) {
            var d = this;
            this.opos = [c.pageX, c.pageY];
            if (!this.options.disabled) {
                var e = this.options;
                this.selectees = a(e.filter, this.element[0]);
                this._trigger("start", c);
                a(e.appendTo).append(this.helper);
                this.helper.css({
                    left: c.clientX,
                    top: c.clientY,
                    width: 0,
                    height: 0
                });
                e.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function () {
                    var f = a.data(this, "selectable-item");
                    f.startselected = true;
                    if (!c.metaKey) {
                        f.$element.removeClass("ui-selected");
                        f.selected = false;
                        f.$element.addClass("ui-unselecting");
                        f.unselecting = true;
                        d._trigger("unselecting", c, {
                            unselecting: f.element
                        })
                    }
                });
                a(c.target).parents().andSelf().each(function () {
                    var f = a.data(this, "selectable-item");
                    if (f) {
                        var b = !c.metaKey || !f.$element.hasClass("ui-selected");
                        f.$element.removeClass(b ? "ui-unselecting" : "ui-selected").addClass(b ? "ui-selecting" : "ui-unselecting");
                        f.unselecting = !b;
                        f.selecting = b;
                        (f.selected = b) ? d._trigger("selecting", c, {
                            selecting: f.element
                        }) : d._trigger("unselecting", c, {
                            unselecting: f.element
                        });
                        return false
                    }
                })
            }
        },
        _mouseDrag: function (c) {
            var d = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var e = this.options,
                    f = this.opos[0],
                    b = this.opos[1],
                    g = c.pageX,
                    h = c.pageY;
                if (f > g) {
                    var j = g;
                    g = f;
                    f = j
                }
                if (b > h) {
                    j = h;
                    h = b;
                    b = j
                }
                this.helper.css({
                    left: f,
                    top: b,
                    width: g - f,
                    height: h - b
                });
                this.selectees.each(function () {
                    var k = a.data(this, "selectable-item");
                    if (!(!k || k.element == d.element[0])) {
                        var q = false;
                        if (e.tolerance == "touch") q = !(k.left > g || k.right < f || k.top > h || k.bottom < b);
                        else if (e.tolerance == "fit") q = k.left > f && k.right < g && k.top > b && k.bottom < h;
                        if (q) {
                            if (k.selected) {
                                k.$element.removeClass("ui-selected");
                                k.selected = false
                            }
                            if (k.unselecting) {
                                k.$element.removeClass("ui-unselecting");
                                k.unselecting = false
                            }
                            if (!k.selecting) {
                                k.$element.addClass("ui-selecting");
                                k.selecting = true;
                                d._trigger("selecting", c, {
                                    selecting: k.element
                                })
                            }
                        } else {
                            if (k.selecting) if (c.metaKey && k.startselected) {
                                k.$element.removeClass("ui-selecting");
                                k.selecting = false;
                                k.$element.addClass("ui-selected");
                                k.selected = true
                            } else {
                                k.$element.removeClass("ui-selecting");
                                k.selecting = false;
                                if (k.startselected) {
                                    k.$element.addClass("ui-unselecting");
                                    k.unselecting = true
                                }
                                d._trigger("unselecting", c, {
                                    unselecting: k.element
                                })
                            }
                            if (k.selected) if (!c.metaKey && !k.startselected) {
                                k.$element.removeClass("ui-selected");
                                k.selected = false;
                                k.$element.addClass("ui-unselecting");
                                k.unselecting = true;
                                d._trigger("unselecting", c, {
                                    unselecting: k.element
                                })
                            }
                        }
                    }
                });
                return false
            }
        },
        _mouseStop: function (c) {
            var d = this;
            this.dragged = false;
            a(".ui-unselecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-unselecting");
                e.unselecting = false;
                e.startselected = false;
                d._trigger("unselected", c, {
                    unselected: e.element
                })
            });
            a(".ui-selecting", this.element[0]).each(function () {
                var e = a.data(this, "selectable-item");
                e.$element.removeClass("ui-selecting").addClass("ui-selected");
                e.selecting = false;
                e.selected = true;
                e.startselected = true;
                d._trigger("selected", c, {
                    selected: e.element
                })
            });
            this._trigger("stop", c);
            this.helper.remove();
            return false
        }
    });
    a.extend(a.ui.selectable, {
        version: "1.8.11"
    })
})(jQuery);
(function (a) {
    a.widget("ui.sortable", a.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function () {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) this.items[c].item.removeData("sortable-item");
            return this
        },
        _setOption: function (c, d) {
            if (c === "disabled") {
                this.options[c] = d;
                this.widget()[d ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (c, d) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(c);
            var e = null,
                f = this;
            a(c.target).parents().each(function () {
                if (a.data(this, "sortable-item") == f) {
                    e = a(this);
                    return false
                }
            });
            if (a.data(c.target, "sortable-item") == f) e = a(c.target);
            if (!e) return false;
            if (this.options.handle && !d) {
                var b = false;
                a(this.options.handle, e).find("*").andSelf().each(function () {
                    if (this == c.target) b = true
                });
                if (!b) return false
            }
            this.currentItem = e;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (c, d, e) {
            d = this.options;
            var f = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            a.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            d.containment && this._setContainment();
            if (d.cursor) {
                if (a("body").css("cursor")) this._storedCursor = a("body").css("cursor");
                a("body").css("cursor", d.cursor)
            }
            if (d.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", d.opacity)
            }
            if (d.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", d.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", c, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!e) for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", c, f._uiHash(this));
            if (a.ui.ddmanager) a.ui.ddmanager.current = this;
            a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(c);
            return true
        },
        _mouseDrag: function (c) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var d = this.options,
                    e = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - c.pageY < d.scrollSensitivity) this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop + d.scrollSpeed;
                    else if (c.pageY - this.overflowOffset.top < d.scrollSensitivity) this.scrollParent[0].scrollTop = e = this.scrollParent[0].scrollTop - d.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - c.pageX < d.scrollSensitivity) this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft + d.scrollSpeed;
                    else if (c.pageX - this.overflowOffset.left < d.scrollSensitivity) this.scrollParent[0].scrollLeft = e = this.scrollParent[0].scrollLeft - d.scrollSpeed
                } else {
                    if (c.pageY - a(document).scrollTop() < d.scrollSensitivity) e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed);
                    else if (a(window).height() - (c.pageY - a(document).scrollTop()) < d.scrollSensitivity) e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed);
                    if (c.pageX - a(document).scrollLeft() < d.scrollSensitivity) e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed);
                    else if (a(window).width() - (c.pageX - a(document).scrollLeft()) < d.scrollSensitivity) e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)
                }
                e !== false && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, c)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (d = this.items.length - 1; d >= 0; d--) {
                e = this.items[d];
                var f = e.item[0],
                    b = this._intersectsWithPointer(e);
                if (b) if (f != this.currentItem[0] && this.placeholder[b == 1 ? "next" : "prev"]()[0] != f && !a.ui.contains(this.placeholder[0], f) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], f) : true)) {
                    this.direction = b == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) this._rearrange(c, e);
                    else break;
                    this._trigger("change", c, this._uiHash());
                    break
                }
            }
            this._contactContainers(c);
            a.ui.ddmanager && a.ui.ddmanager.drag(this, c);
            this._trigger("sort", c, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (c, d) {
            if (c) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, c);
                if (this.options.revert) {
                    var e = this;
                    d = e.placeholder.offset();
                    e.reverting = true;
                    a(this.helper).animate({
                        left: d.left - this.offset.parent.left - e.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: d.top - this.offset.parent.top - e.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        e._clear(c)
                    })
                } else this._clear(c, d);
                return false
            }
        },
        cancel: function () {
            var c = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[d].containerCache.over) {
                        this.containers[d]._trigger("out", null, c._uiHash(this));
                        this.containers[d].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                a.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (c) {
            var d = this._getItemsAsjQuery(c && c.connected),
                e = [];
            c = c || {};
            a(d).each(function () {
                var f = (a(c.item || this).attr(c.attribute || "id") || "").match(c.expression || /(.+)[-=_](.+)/);
                if (f) e.push((c.key || f[1] + "[]") + "=" + (c.key && c.expression ? f[1] : f[2]))
            });
            !e.length && c.key && e.push(c.key + "=");
            return e.join("&")
        },
        toArray: function (c) {
            var d = this._getItemsAsjQuery(c && c.connected),
                e = [];
            c = c || {};
            d.each(function () {
                e.push(a(c.item || this).attr(c.attribute || "id") || "")
            });
            return e
        },
        _intersectsWith: function (c) {
            var d = this.positionAbs.left,
                e = d + this.helperProportions.width,
                f = this.positionAbs.top,
                b = f + this.helperProportions.height,
                g = c.left,
                h = g + c.width,
                j = c.top,
                k = j + c.height,
                q = this.offset.click.top,
                u = this.offset.click.left;
            q = f + q > j && f + q < k && d + u > g && d + u < h;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > c[this.floating ? "width" : "height"] ? q : g < d + this.helperProportions.width / 2 && e - this.helperProportions.width / 2 < h && j < f + this.helperProportions.height / 2 && b - this.helperProportions.height / 2 < k
        },
        _intersectsWithPointer: function (c) {
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top, c.height);
            c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left, c.width);
            d = d && c;
            c = this._getDragVerticalDirection();
            var e = this._getDragHorizontalDirection();
            if (!d) return false;
            return this.floating ? e && e == "right" || c == "down" ? 2 : 1 : c && (c == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (c) {
            var d = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top + c.height / 2, c.height);
            c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left + c.width / 2, c.width);
            var e = this._getDragVerticalDirection(),
                f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && c || f == "left" && !c : e && (e == "down" && d || e == "up" && !d)
        },
        _getDragVerticalDirection: function () {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right" : "left")
        },
        refresh: function (c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function (c) {
            var d = [],
                e = [],
                f = this._connectWith();
            if (f && c) for (c = f.length - 1; c >= 0; c--) for (var b = a(f[c]), g = b.length - 1; g >= 0; g--) {
                var h = a.data(b[g], "sortable");
                if (h && h != this && !h.options.disabled) e.push([a.isFunction(h.options.items) ? h.options.items.call(h.element) : a(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
            }
            e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (c = e.length - 1; c >= 0; c--) e[c][0].each(function () {
                d.push(this)
            });
            return a(d)
        },
        _removeCurrentsFromItems: function () {
            for (var c = this.currentItem.find(":data(sortable-item)"), d = 0; d < this.items.length; d++) for (var e = 0; e < c.length; e++) c[e] == this.items[d].item[0] && this.items.splice(d, 1)
        },
        _refreshItems: function (c) {
            this.items = [];
            this.containers = [this];
            var d = this.items,
                e = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ],
                f = this._connectWith();
            if (f) for (var b = f.length - 1; b >= 0; b--) for (var g = a(f[b]), h = g.length - 1; h >= 0; h--) {
                var j = a.data(g[h], "sortable");
                if (j && j != this && !j.options.disabled) {
                    e.push([a.isFunction(j.options.items) ? j.options.items.call(j.element[0], c, {
                        item: this.currentItem
                    }) : a(j.options.items, j.element), j]);
                    this.containers.push(j)
                }
            }
            for (b = e.length - 1; b >= 0; b--) {
                c = e[b][1];
                f = e[b][0];
                h = 0;
                for (g = f.length; h < g; h++) {
                    j = a(f[h]);
                    j.data("sortable-item", c);
                    d.push({
                        item: j,
                        instance: c,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (c) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var d = this.items.length - 1; d >= 0; d--) {
                var e = this.items[d],
                    f = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
                if (!c) {
                    e.width = f.outerWidth();
                    e.height = f.outerHeight()
                }
                f = f.offset();
                e.left = f.left;
                e.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (d = this.containers.length - 1; d >= 0; d--) {
                f = this.containers[d].element.offset();
                this.containers[d].containerCache.left = f.left;
                this.containers[d].containerCache.top = f.top;
                this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (c) {
            var d = c || this,
                e = d.options;
            if (!e.placeholder || e.placeholder.constructor == String) {
                var f = e.placeholder;
                e.placeholder = {
                    element: function () {
                        var b = a(document.createElement(d.currentItem[0].nodeName)).addClass(f || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!f) b.style.visibility = "hidden";
                        return b
                    },
                    update: function (b, g) {
                        if (!(f && !e.forcePlaceholderSize)) {
                            g.height() || g.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10));
                            g.width() || g.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") || 0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            d.placeholder = a(e.placeholder.element.call(d.element, d.currentItem));
            d.currentItem.after(d.placeholder);
            e.placeholder.update(d, d.placeholder)
        },
        _contactContainers: function (c) {
            for (var d = null, e = null, f = this.containers.length - 1; f >= 0; f--) if (!a.ui.contains(this.currentItem[0], this.containers[f].element[0])) if (this._intersectsWith(this.containers[f].containerCache)) {
                if (!(d && a.ui.contains(this.containers[f].element[0], d.element[0]))) {
                    d = this.containers[f];
                    e = f
                }
            } else if (this.containers[f].containerCache.over) {
                this.containers[f]._trigger("out", c, this._uiHash(this));
                this.containers[f].containerCache.over = 0
            }
            if (d) if (this.containers.length === 1) {
                this.containers[e]._trigger("over", c, this._uiHash(this));
                this.containers[e].containerCache.over = 1
            } else if (this.currentContainer != this.containers[e]) {
                d = 1E4;
                f = null;
                for (var b = this.positionAbs[this.containers[e].floating ? "left" : "top"], g = this.items.length - 1; g >= 0; g--) if (a.ui.contains(this.containers[e].element[0], this.items[g].item[0])) {
                    var h = this.items[g][this.containers[e].floating ? "left" : "top"];
                    if (Math.abs(h - b) < d) {
                        d = Math.abs(h - b);
                        f = this.items[g]
                    }
                }
                if (f || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[e];
                    f ? this._rearrange(c, f, null, true) : this._rearrange(c, null, this.containers[e].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[e]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[e]._trigger("over", c, this._uiHash(this));
                    this.containers[e].containerCache.over = 1
                }
            }
        },
        _createHelper: function (c) {
            var d = this.options;
            c = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c, this.currentItem])) : d.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            c.parents("body").length || a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(c[0]);
            if (c[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (c[0].style.width == "" || d.forceHelperSize) c.width(this.currentItem.width());
            if (c[0].style.height == "" || d.forceHelperSize) c.height(this.currentItem.height());
            return c
        },
        _adjustOffsetFromHelper: function (c) {
            if (typeof c == "string") c = c.split(" ");
            if (a.isArray(c)) c = {
                left: +c[0],
                top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) c = {
                top: 0,
                left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a(c.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a(c.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment)) {
                var d = a(c.containment)[0];
                c = a(c.containment).offset();
                var e = a(d).css("overflow") != "hidden";
                this.containment = [c.left + (parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (c, d) {
            if (!d) d = this.position;
            c = c == "absolute" ? 1 : -1;
            var e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(e[0].tagName);
            return {
                top: d.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * c),
                left: d.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * c)
            }
        },
        _generatePosition: function (c) {
            var d = this.options,
                e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(e[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var b = c.pageX,
                g = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) b = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) b = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (d.grid) {
                    g = this.originalPageY + Math.round((g - this.originalPageY) / d.grid[1]) * d.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : !(g - this.offset.click.top < this.containment[1]) ? g - d.grid[1] : g + d.grid[1] : g;
                    b = this.originalPageX + Math.round((b - this.originalPageX) / d.grid[0]) * d.grid[0];
                    b = this.containment ? !(b - this.offset.click.left < this.containment[0] || b - this.offset.click.left > this.containment[2]) ? b : !(b - this.offset.click.left < this.containment[0]) ? b - d.grid[0] : b + d.grid[0] : b
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()),
                left: b - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft())
            }
        },
        _rearrange: function (c, d, e, f) {
            e ? e[0].appendChild(this.placeholder[0]) : d.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? d.item[0] : d.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var b = this,
                g = this.counter;
            window.setTimeout(function () {
                g == b.counter && b.refreshPositions(!f)
            }, 0)
        },
        _clear: function (c, d) {
            this.reverting = false;
            var e = [];
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var f in this._storedCSS) if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static") this._storedCSS[f] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !d && e.push(function (b) {
                this._trigger("receive", b, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !d) e.push(function (b) {
                this._trigger("update", b, this._uiHash())
            });
            if (!a.ui.contains(this.element[0], this.currentItem[0])) {
                d || e.push(function (b) {
                    this._trigger("remove", b, this._uiHash())
                });
                for (f = this.containers.length - 1; f >= 0; f--) if (a.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !d) {
                    e.push(function (b) {
                        return function (g) {
                            b._trigger("receive", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]));
                    e.push(function (b) {
                        return function (g) {
                            b._trigger("update", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]))
                }
            }
            for (f = this.containers.length - 1; f >= 0; f--) {
                d || e.push(function (b) {
                    return function (g) {
                        b._trigger("deactivate", g, this._uiHash(this))
                    }
                }.call(this, this.containers[f]));
                if (this.containers[f].containerCache.over) {
                    e.push(function (b) {
                        return function (g) {
                            b._trigger("out", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]));
                    this.containers[f].containerCache.over = 0
                }
            }
            this._storedCursor && a("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!d) {
                    this._trigger("beforeStop", c, this._uiHash());
                    for (f = 0; f < e.length; f++) e[f].call(this, c);
                    this._trigger("stop", c, this._uiHash())
                }
                return false
            }
            d || this._trigger("beforeStop", c, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!d) {
                for (f = 0; f < e.length; f++) e[f].call(this, c);
                this._trigger("stop", c, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            a.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (c) {
            var d = c || this;
            return {
                helper: d.helper,
                placeholder: d.placeholder || a([]),
                position: d.position,
                originalPosition: d.originalPosition,
                offset: d.positionAbs,
                item: d.currentItem,
                sender: c ? c.element : null
            }
        }
    });
    a.extend(a.ui.sortable, {
        version: "1.8.11"
    })
})(jQuery);
(function (a) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function () {
            var c = this,
                d = c.options;
            c.running = 0;
            c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            c.headers = c.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                d.disabled || a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                d.disabled || a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                d.disabled || a(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                d.disabled || a(this).removeClass("ui-state-focus")
            });
            c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (d.navigation) {
                var e = c.element.find("a").filter(d.navigationFilter).eq(0);
                if (e.length) {
                    var f = e.closest(".ui-accordion-header");
                    c.active = f.length ? f : e.closest(".ui-accordion-content").prev()
                }
            }
            c.active = c._findActive(c.active || d.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            c.active.next().addClass("ui-accordion-content-active");
            c._createIcons();
            c.resize();
            c.element.attr("role", "tablist");
            c.headers.attr("role", "tab").bind("keydown.accordion", function (b) {
                return c._keydown(b)
            }).next().attr("role", "tabpanel");
            c.headers.not(c.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            c.active.length ? c.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : c.headers.eq(0).attr("tabIndex", 0);
            a.browser.safari || c.headers.find("a").attr("tabIndex", -1);
            d.event && c.headers.bind(d.event.split(" ").join(".accordion ") + ".accordion", function (b) {
                c._clickHandler.call(c, b, this);
                b.preventDefault()
            })
        },
        _createIcons: function () {
            var c = this.options;
            if (c.icons) {
                a("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function () {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var d = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (c.autoHeight || c.fillHeight) d.css("height", "");
            return a.Widget.prototype.destroy.call(this)
        },
        _setOption: function (c, d) {
            a.Widget.prototype._setOption.apply(this, arguments);
            c == "active" && this.activate(d);
            if (c == "icons") {
                this._destroyIcons();
                d && this._createIcons()
            }
            if (c == "disabled") this.headers.add(this.headers.next())[d ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function (c) {
            if (!(this.options.disabled || c.altKey || c.ctrlKey)) {
                var d = a.ui.keyCode,
                    e = this.headers.length,
                    f = this.headers.index(c.target),
                    b = false;
                switch (c.keyCode) {
                case d.RIGHT:
                case d.DOWN:
                    b = this.headers[(f + 1) % e];
                    break;
                case d.LEFT:
                case d.UP:
                    b = this.headers[(f - 1 + e) % e];
                    break;
                case d.SPACE:
                case d.ENTER:
                    this._clickHandler({
                        target: c.target
                    }, c.target);
                    c.preventDefault()
                }
                if (b) {
                    a(c.target).attr("tabIndex", -1);
                    a(b).attr("tabIndex", 0);
                    b.focus();
                    return false
                }
                return true
            }
        },
        resize: function () {
            var c = this.options,
                d;
            if (c.fillSpace) {
                if (a.browser.msie) {
                    var e = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                d = this.element.parent().height();
                a.browser.msie && this.element.parent().css("overflow", e);
                this.headers.each(function () {
                    d -= a(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    a(this).height(Math.max(0, d - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else if (c.autoHeight) {
                d = 0;
                this.headers.next().each(function () {
                    d = Math.max(d, a(this).height("").height())
                }).height(d)
            }
            return this
        },
        activate: function (c) {
            this.options.active = c;
            c = this._findActive(c)[0];
            this._clickHandler({
                target: c
            }, c);
            return this
        },
        _findActive: function (c) {
            return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? a([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function (c, d) {
            var e = this.options;
            if (!e.disabled) if (c.target) {
                c = a(c.currentTarget || d);
                d = c[0] === this.active[0];
                e.active = e.collapsible && d ? false : this.headers.index(c);
                if (!(this.running || !e.collapsible && d)) {
                    var f = this.active;
                    j = c.next();
                    g = this.active.next();
                    h = {
                        options: e,
                        newHeader: d && e.collapsible ? a([]) : c,
                        oldHeader: this.active,
                        newContent: d && e.collapsible ? a([]) : j,
                        oldContent: g
                    };
                    var b = this.headers.index(this.active[0]) > this.headers.index(c[0]);
                    this.active = d ? a([]) : c;
                    this._toggle(j, g, h, d, b);
                    f.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
                    if (!d) {
                        c.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(e.icons.header).addClass(e.icons.headerSelected);
                        c.next().addClass("ui-accordion-content-active")
                    }
                }
            } else if (e.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(e.icons.headerSelected).addClass(e.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var g = this.active.next(),
                    h = {
                        options: e,
                        newHeader: a([]),
                        oldHeader: e.active,
                        newContent: a([]),
                        oldContent: g
                    },
                    j = this.active = a([]);
                this._toggle(j, g, h)
            }
        },
        _toggle: function (c, d, e, f, b) {
            var g = this,
                h = g.options;
            g.toShow = c;
            g.toHide = d;
            g.data = e;
            var j = function () {
                    if (g) return g._completed.apply(g, arguments)
                };
            g._trigger("changestart", null, g.data);
            g.running = d.size() === 0 ? c.size() : d.size();
            if (h.animated) {
                e = {};
                e = h.collapsible && f ? {
                    toShow: a([]),
                    toHide: d,
                    complete: j,
                    down: b,
                    autoHeight: h.autoHeight || h.fillSpace
                } : {
                    toShow: c,
                    toHide: d,
                    complete: j,
                    down: b,
                    autoHeight: h.autoHeight || h.fillSpace
                };
                if (!h.proxied) h.proxied = h.animated;
                if (!h.proxiedDuration) h.proxiedDuration = h.duration;
                h.animated = a.isFunction(h.proxied) ? h.proxied(e) : h.proxied;
                h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(e) : h.proxiedDuration;
                f = a.ui.accordion.animations;
                var k = h.duration,
                    q = h.animated;
                if (q && !f[q] && !a.easing[q]) q = "slide";
                f[q] || (f[q] = function (u) {
                    this.slide(u, {
                        easing: q,
                        duration: k || 700
                    })
                });
                f[q](e)
            } else {
                if (h.collapsible && f) c.toggle();
                else {
                    d.hide();
                    c.show()
                }
                j(true)
            }
            d.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur();
            c.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function (c) {
            this.running = c ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data)
            }
        }
    });
    a.extend(a.ui.accordion, {
        version: "1.8.11",
        animations: {
            slide: function (c, d) {
                c = a.extend({
                    easing: "swing",
                    duration: 300
                }, c, d);
                if (c.toHide.size()) if (c.toShow.size()) {
                    var e = c.toShow.css("overflow"),
                        f = 0,
                        b = {},
                        g = {},
                        h;
                    d = c.toShow;
                    h = d[0].style.width;
                    d.width(parseInt(d.parent().width(), 10) - parseInt(d.css("paddingLeft"), 10) - parseInt(d.css("paddingRight"), 10) - (parseInt(d.css("borderLeftWidth"), 10) || 0) - (parseInt(d.css("borderRightWidth"), 10) || 0));
                    a.each(["height", "paddingTop", "paddingBottom"], function (j, k) {
                        g[k] = "hide";
                        j = ("" + a.css(c.toShow[0], k)).match(/^([\d+-.]+)(.*)$/);
                        b[k] = {
                            value: j[1],
                            unit: j[2] || "px"
                        }
                    });
                    c.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show();
                    c.toHide.filter(":hidden").each(c.complete).end().filter(":visible").animate(g, {
                        step: function (j, k) {
                            if (k.prop == "height") f = k.end - k.start === 0 ? 0 : (k.now - k.start) / (k.end - k.start);
                            c.toShow[0].style[k.prop] = f * b[k.prop].value + b[k.prop].unit
                        },
                        duration: c.duration,
                        easing: c.easing,
                        complete: function () {
                            c.autoHeight || c.toShow.css("height", "");
                            c.toShow.css({
                                width: h,
                                overflow: e
                            });
                            c.complete()
                        }
                    })
                } else c.toHide.animate({
                    height: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                }, c);
                else c.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                }, c)
            },
            bounceslide: function (c) {
                this.slide(c, {
                    easing: c.down ? "easeOutBounce" : "swing",
                    duration: c.down ? 1E3 : 200
                })
            }
        }
    })
})(jQuery);
(function (a) {
    var c = 0;
    a.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function () {
            var d = this,
                e = this.element[0].ownerDocument,
                f;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (b) {
                if (!(d.options.disabled || d.element.attr("readonly"))) {
                    f = false;
                    var g = a.ui.keyCode;
                    switch (b.keyCode) {
                    case g.PAGE_UP:
                        d._move("previousPage", b);
                        break;
                    case g.PAGE_DOWN:
                        d._move("nextPage", b);
                        break;
                    case g.UP:
                        d._move("previous", b);
                        b.preventDefault();
                        break;
                    case g.DOWN:
                        d._move("next", b);
                        b.preventDefault();
                        break;
                    case g.ENTER:
                    case g.NUMPAD_ENTER:
                        if (d.menu.active) {
                            f = true;
                            b.preventDefault()
                        }
                    case g.TAB:
                        if (!d.menu.active) return;
                        d.menu.select(b);
                        break;
                    case g.ESCAPE:
                        d.element.val(d.term);
                        d.close(b);
                        break;
                    default:
                        clearTimeout(d.searching);
                        d.searching = setTimeout(function () {
                            if (d.term != d.element.val()) {
                                d.selectedItem = null;
                                d.search(null, b)
                            }
                        }, d.options.delay);
                        break
                    }
                }
            }).bind("keypress.autocomplete", function (b) {
                if (f) {
                    f = false;
                    b.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (!d.options.disabled) {
                    d.selectedItem = null;
                    d.previous = d.element.val()
                }
            }).bind("blur.autocomplete", function (b) {
                if (!d.options.disabled) {
                    clearTimeout(d.searching);
                    d.closing = setTimeout(function () {
                        d.close(b);
                        d._change(b)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function () {
                return d._response.apply(d, arguments)
            };
            this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", e)[0]).mousedown(function (b) {
                var g = d.menu.element[0];
                a(b.target).closest(".ui-menu-item").length || setTimeout(function () {
                    a(document).one("mousedown", function (h) {
                        h.target !== d.element[0] && h.target !== g && !a.ui.contains(g, h.target) && d.close()
                    })
                }, 1);
                setTimeout(function () {
                    clearTimeout(d.closing)
                }, 13)
            }).menu({
                focus: function (b, g) {
                    g = g.item.data("item.autocomplete");
                    false !== d._trigger("focus", b, {
                        item: g
                    }) && /^key/.test(b.originalEvent.type) && d.element.val(g.value)
                },
                selected: function (b, g) {
                    var h = g.item.data("item.autocomplete"),
                        j = d.previous;
                    if (d.element[0] !== e.activeElement) {
                        d.element.focus();
                        d.previous = j;
                        setTimeout(function () {
                            d.previous = j;
                            d.selectedItem = h
                        }, 1)
                    }
                    false !== d._trigger("select", b, {
                        item: h
                    }) && d.element.val(h.value);
                    d.term = d.element.val();
                    d.close(b);
                    d.selectedItem = h
                },
                blur: function () {
                    d.menu.element.is(":visible") && d.element.val() !== d.term && d.element.val(d.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            a.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            a.Widget.prototype.destroy.call(this)
        },
        _setOption: function (d, e) {
            a.Widget.prototype._setOption.apply(this, arguments);
            d === "source" && this._initSource();
            if (d === "appendTo") this.menu.element.appendTo(a(e || "body", this.element[0].ownerDocument)[0]);
            d === "disabled" && e && this.xhr && this.xhr.abort()
        },
        _initSource: function () {
            var d = this,
                e, f;
            if (a.isArray(this.options.source)) {
                e = this.options.source;
                this.source = function (b, g) {
                    g(a.ui.autocomplete.filter(e, b.term))
                }
            } else if (typeof this.options.source === "string") {
                f = this.options.source;
                this.source = function (b, g) {
                    d.xhr && d.xhr.abort();
                    d.xhr = a.ajax({
                        url: f,
                        data: b,
                        dataType: "json",
                        autocompleteRequest: ++c,
                        success: function (h) {
                            this.autocompleteRequest === c && g(h)
                        },
                        error: function () {
                            this.autocompleteRequest === c && g([])
                        }
                    })
                }
            } else this.source = this.options.source
        },
        search: function (d, e) {
            d = d != null ? d : this.element.val();
            this.term = this.element.val();
            if (d.length < this.options.minLength) return this.close(e);
            clearTimeout(this.closing);
            if (this._trigger("search", e) !== false) return this._search(d)
        },
        _search: function (d) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: d
            }, this.response)
        },
        _response: function (d) {
            if (!this.options.disabled && d && d.length) {
                d = this._normalize(d);
                this._suggest(d);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function (d) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", d)
            }
        },
        _change: function (d) {
            this.previous !== this.element.val() && this._trigger("change", d, {
                item: this.selectedItem
            })
        },
        _normalize: function (d) {
            if (d.length && d[0].label && d[0].value) return d;
            return a.map(d, function (e) {
                if (typeof e === "string") return {
                    label: e,
                    value: e
                };
                return a.extend({
                    label: e.label || e.value,
                    value: e.value || e.label
                }, e)
            })
        },
        _suggest: function (d) {
            var e = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(e, d);
            this.menu.deactivate();
            this.menu.refresh();
            e.show();
            this._resizeMenu();
            e.position(a.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next(new a.Event("mouseover"))
        },
        _resizeMenu: function () {
            var d = this.menu.element;
            d.outerWidth(Math.max(d.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function (d, e) {
            var f = this;
            a.each(e, function (b, g) {
                f._renderItem(d, g)
            })
        },
        _renderItem: function (d, e) {
            return a("<li></li>").data("item.autocomplete", e).append(a("<a></a>").text(e.label)).appendTo(d)
        },
        _move: function (d, e) {
            if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(d) || this.menu.last() && /^next/.test(d)) {
                this.element.val(this.term);
                this.menu.deactivate()
            } else this.menu[d](e);
            else this.search(null, e)
        },
        widget: function () {
            return this.menu.element
        }
    });
    a.extend(a.ui.autocomplete, {
        escapeRegex: function (d) {
            return d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function (d, e) {
            var f = new RegExp(a.ui.autocomplete.escapeRegex(e), "i");
            return a.grep(d, function (b) {
                return f.test(b.label || b.value || b)
            })
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.menu", {
        _create: function () {
            var c = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (d) {
                if (a(d.target).closest(".ui-menu-item a").length) {
                    d.preventDefault();
                    c.select(d)
                }
            });
            this.refresh()
        },
        refresh: function () {
            var c = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (d) {
                c.activate(d, a(this).parent())
            }).mouseleave(function () {
                c.deactivate()
            })
        },
        activate: function (c, d) {
            this.deactivate();
            if (this.hasScroll()) {
                var e = d.offset().top - this.element.offset().top,
                    f = this.element.attr("scrollTop"),
                    b = this.element.height();
                if (e < 0) this.element.attr("scrollTop", f + e);
                else e >= b && this.element.attr("scrollTop", f + e - b + d.height())
            }
            this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", c, {
                item: d
            })
        },
        deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        },
        next: function (c) {
            this.move("next", ".ui-menu-item:first", c)
        },
        previous: function (c) {
            this.move("prev", ".ui-menu-item:last", c)
        },
        first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function (c, d, e) {
            if (this.active) {
                c = this.active[c + "All"](".ui-menu-item").eq(0);
                c.length ? this.activate(e, c) : this.activate(e, this.element.children(d))
            } else this.activate(e, this.element.children(d))
        },
        nextPage: function (c) {
            if (this.hasScroll()) if (!this.active || this.last()) this.activate(c, this.element.children(".ui-menu-item:first"));
            else {
                var d = this.active.offset().top,
                    e = this.element.height(),
                    f = this.element.children(".ui-menu-item").filter(function () {
                        var b = a(this).offset().top - d - e + a(this).height();
                        return b < 10 && b > -10
                    });
                f.length || (f = this.element.children(".ui-menu-item:last"));
                this.activate(c, f)
            } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function (c) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(c, this.element.children(".ui-menu-item:last"));
            else {
                var d = this.active.offset().top,
                    e = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function () {
                    var f = a(this).offset().top - d + e - a(this).height();
                    return f < 10 && f > -10
                });
                result.length || (result = this.element.children(".ui-menu-item:first"));
                this.activate(c, result)
            } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function () {
            return this.element.height() < this.element.attr("scrollHeight")
        },
        select: function (c) {
            this._trigger("selected", c, {
                item: this.active
            })
        }
    })
})(jQuery);
(function (a) {
    var c, d = function (f) {
            a(":ui-button", f.target.form).each(function () {
                var b = a(this).data("button");
                setTimeout(function () {
                    b.refresh()
                }, 1)
            })
        },
        e = function (f) {
            var b = f.name,
                g = f.form,
                h = a([]);
            if (b) h = g ? a(g).find("[name='" + b + "']") : a("[name='" + b + "']", f.ownerDocument).filter(function () {
                return !this.form
            });
            return h
        };
    a.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", d);
            if (typeof this.options.disabled !== "boolean") this.options.disabled = this.element.attr("disabled");
            this._determineButtonType();
            this.hasTitle = !! this.buttonElement.attr("title");
            var f = this,
                b = this.options,
                g = this.type === "checkbox" || this.type === "radio",
                h = "ui-state-hover" + (!g ? " ui-state-active" : "");
            if (b.label === null) b.label = this.buttonElement.html();
            if (this.element.is(":disabled")) b.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function () {
                if (!b.disabled) {
                    a(this).addClass("ui-state-hover");
                    this === c && a(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                b.disabled || a(this).removeClass(h)
            }).bind("focus.button", function () {
                a(this).addClass("ui-state-focus")
            }).bind("blur.button", function () {
                a(this).removeClass("ui-state-focus")
            });
            g && this.element.bind("change.button", function () {
                f.refresh()
            });
            if (this.type === "checkbox") this.buttonElement.bind("click.button", function () {
                if (b.disabled) return false;
                a(this).toggleClass("ui-state-active");
                f.buttonElement.attr("aria-pressed", f.element[0].checked)
            });
            else if (this.type === "radio") this.buttonElement.bind("click.button", function () {
                if (b.disabled) return false;
                a(this).addClass("ui-state-active");
                f.buttonElement.attr("aria-pressed", true);
                var j = f.element[0];
                e(j).not(j).map(function () {
                    return a(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", false)
            });
            else {
                this.buttonElement.bind("mousedown.button", function () {
                    if (b.disabled) return false;
                    a(this).addClass("ui-state-active");
                    c = this;
                    a(document).one("mouseup", function () {
                        c = null
                    })
                }).bind("mouseup.button", function () {
                    if (b.disabled) return false;
                    a(this).removeClass("ui-state-active")
                }).bind("keydown.button", function (j) {
                    if (b.disabled) return false;
                    if (j.keyCode == a.ui.keyCode.SPACE || j.keyCode == a.ui.keyCode.ENTER) a(this).addClass("ui-state-active")
                }).bind("keyup.button", function () {
                    a(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function (j) {
                    j.keyCode === a.ui.keyCode.SPACE && a(this).click()
                })
            }
            this._setOption("disabled", b.disabled)
        },
        _determineButtonType: function () {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var f = this.element.parents().filter(":last"),
                    b = "label[for=" + this.element.attr("id") + "]";
                this.buttonElement = f.find(b);
                if (!this.buttonElement.length) {
                    f = f.length ? f.siblings() : this.element.siblings();
                    this.buttonElement = f.filter(b);
                    if (!this.buttonElement.length) this.buttonElement = f.find(b)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (f = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", f)
            } else this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            a.Widget.prototype.destroy.call(this)
        },
        _setOption: function (f, b) {
            a.Widget.prototype._setOption.apply(this, arguments);
            if (f === "disabled") b ? this.element.attr("disabled", true) : this.element.removeAttr("disabled");
            this._resetButton()
        },
        refresh: function () {
            var f = this.element.is(":disabled");
            f !== this.options.disabled && this._setOption("disabled", f);
            if (this.type === "radio") e(this.element[0]).each(function () {
                a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true) : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
            });
            else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
        },
        _resetButton: function () {
            if (this.type === "input") this.options.label && this.element.val(this.options.label);
            else {
                var f = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                    b = a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(f.empty()).text(),
                    g = this.options.icons,
                    h = g.primary && g.secondary,
                    j = [];
                if (g.primary || g.secondary) {
                    if (this.options.text) j.push("ui-button-text-icon" + (h ? "s" : g.primary ? "-primary" : "-secondary"));
                    g.primary && f.prepend("<span class='ui-button-icon-primary ui-icon " + g.primary + "'></span>");
                    g.secondary && f.append("<span class='ui-button-icon-secondary ui-icon " + g.secondary + "'></span>");
                    if (!this.options.text) {
                        j.push(h ? "ui-button-icons-only" : "ui-button-icon-only");
                        this.hasTitle || f.attr("title", b)
                    }
                } else j.push("ui-button-text-only");
                f.addClass(j.join(" "))
            }
        }
    });
    a.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (f, b) {
            f === "disabled" && this.buttons.button("option", f, b);
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function () {
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        },
        destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            a.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
(function (a, c) {
    var d = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    },
        e = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        };
    a.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function (f) {
                    var b = a(this).css(f).offset().top;
                    b < 0 && a(this).css("top", f.top - b)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var f = this,
                b = f.options,
                g = b.title || "&#160;",
                h = a.ui.dialog.getTitleId(f.element),
                j = (f.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + b.dialogClass).css({
                    zIndex: b.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (u) {
                    if (b.closeOnEscape && u.keyCode && u.keyCode === a.ui.keyCode.ESCAPE) {
                        f.close(u);
                        u.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": h
                }).mousedown(function (u) {
                    f.moveToTop(false, u)
                });
            f.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j);
            var k = (f.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j),
                q = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                    q.addClass("ui-state-hover")
                }, function () {
                    q.removeClass("ui-state-hover")
                }).focus(function () {
                    q.addClass("ui-state-focus")
                }).blur(function () {
                    q.removeClass("ui-state-focus")
                }).click(function (u) {
                    f.close(u);
                    return false
                }).appendTo(k);
            (f.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(q);
            a("<span></span>").addClass("ui-dialog-title").attr("id", h).html(g).prependTo(k);
            if (a.isFunction(b.beforeclose) && !a.isFunction(b.beforeClose)) b.beforeClose = b.beforeclose;
            k.find("*").add(k).disableSelection();
            b.draggable && a.fn.draggable && f._makeDraggable();
            b.resizable && a.fn.resizable && f._makeResizable();
            f._createButtons(b.buttons);
            f._isOpen = false;
            a.fn.bgiframe && j.bgiframe()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        destroy: function () {
            var f = this;
            f.overlay && f.overlay.destroy();
            f.uiDialog.hide();
            f.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            f.uiDialog.remove();
            f.originalTitle && f.element.attr("title", f.originalTitle);
            return f
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (f) {
            var b = this,
                g, h;
            if (false !== b._trigger("beforeClose", f)) {
                b.overlay && b.overlay.destroy();
                b.uiDialog.unbind("keypress.ui-dialog");
                b._isOpen = false;
                if (b.options.hide) b.uiDialog.hide(b.options.hide, function () {
                    b._trigger("close", f)
                });
                else {
                    b.uiDialog.hide();
                    b._trigger("close", f)
                }
                a.ui.dialog.overlay.resize();
                if (b.options.modal) {
                    g = 0;
                    a(".ui-dialog").each(function () {
                        if (this !== b.uiDialog[0]) {
                            h = a(this).css("z-index");
                            isNaN(h) || (g = Math.max(g, h))
                        }
                    });
                    a.ui.dialog.maxZ = g
                }
                return b
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (f, b) {
            var g = this,
                h = g.options;
            if (h.modal && !f || !h.stack && !h.modal) return g._trigger("focus", b);
            if (h.zIndex > a.ui.dialog.maxZ) a.ui.dialog.maxZ = h.zIndex;
            if (g.overlay) {
                a.ui.dialog.maxZ += 1;
                g.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)
            }
            f = {
                scrollTop: g.element.attr("scrollTop"),
                scrollLeft: g.element.attr("scrollLeft")
            };
            a.ui.dialog.maxZ += 1;
            g.uiDialog.css("z-index", a.ui.dialog.maxZ);
            g.element.attr(f);
            g._trigger("focus", b);
            return g
        },
        open: function () {
            if (!this._isOpen) {
                var f = this,
                    b = f.options,
                    g = f.uiDialog;
                f.overlay = b.modal ? new a.ui.dialog.overlay(f) : null;
                f._size();
                f._position(b.position);
                g.show(b.show);
                f.moveToTop(true);
                b.modal && g.bind("keypress.ui-dialog", function (h) {
                    if (h.keyCode === a.ui.keyCode.TAB) {
                        var j = a(":tabbable", this),
                            k = j.filter(":first");
                        j = j.filter(":last");
                        if (h.target === j[0] && !h.shiftKey) {
                            k.focus(1);
                            return false
                        } else if (h.target === k[0] && h.shiftKey) {
                            j.focus(1);
                            return false
                        }
                    }
                });
                a(f.element.find(":tabbable").get().concat(g.find(".ui-dialog-buttonpane :tabbable").get().concat(g.get()))).eq(0).focus();
                f._isOpen = true;
                f._trigger("open");
                return f
            }
        },
        _createButtons: function (f) {
            var b = this,
                g = false,
                h = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                j = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(h);
            b.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof f === "object" && f !== null && a.each(f, function () {
                return !(g = true)
            });
            if (g) {
                a.each(f, function (k, q) {
                    q = a.isFunction(q) ? {
                        click: q,
                        text: k
                    } : q;
                    k = a('<button type="button"></button>').attr(q, true).unbind("click").click(function () {
                        q.click.apply(b.element[0], arguments)
                    }).appendTo(j);
                    a.fn.button && k.button()
                });
                h.appendTo(b.uiDialog)
            }
        },
        _makeDraggable: function () {
            function f(k) {
                return {
                    position: k.position,
                    offset: k.offset
                }
            }
            var b = this,
                g = b.options,
                h = a(document),
                j;
            b.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (k, q) {
                    j = g.height === "auto" ? "auto" : a(this).height();
                    a(this).height(a(this).height()).addClass("ui-dialog-dragging");
                    b._trigger("dragStart", k, f(q))
                },
                drag: function (k, q) {
                    b._trigger("drag", k, f(q))
                },
                stop: function (k, q) {
                    g.position = [q.position.left - h.scrollLeft(), q.position.top - h.scrollTop()];
                    a(this).removeClass("ui-dialog-dragging").height(j);
                    b._trigger("dragStop", k, f(q));
                    a.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (f) {
            function b(k) {
                return {
                    originalPosition: k.originalPosition,
                    originalSize: k.originalSize,
                    position: k.position,
                    size: k.size
                }
            }
            f = f === c ? this.options.resizable : f;
            var g = this,
                h = g.options,
                j = g.uiDialog.css("position");
            f = typeof f === "string" ? f : "n,e,s,w,se,sw,ne,nw";
            g.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: g.element,
                maxWidth: h.maxWidth,
                maxHeight: h.maxHeight,
                minWidth: h.minWidth,
                minHeight: g._minHeight(),
                handles: f,
                start: function (k, q) {
                    a(this).addClass("ui-dialog-resizing");
                    g._trigger("resizeStart", k, b(q))
                },
                resize: function (k, q) {
                    g._trigger("resize", k, b(q))
                },
                stop: function (k, q) {
                    a(this).removeClass("ui-dialog-resizing");
                    h.height = a(this).height();
                    h.width = a(this).width();
                    g._trigger("resizeStop", k, b(q));
                    a.ui.dialog.overlay.resize()
                }
            }).css("position", j).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var f = this.options;
            return f.height === "auto" ? f.minHeight : Math.min(f.minHeight, f.height)
        },
        _position: function (f) {
            var b = [],
                g = [0, 0],
                h;
            if (f) {
                if (typeof f === "string" || typeof f === "object" && "0" in f) {
                    b = f.split ? f.split(" ") : [f[0], f[1]];
                    if (b.length === 1) b[1] = b[0];
                    a.each(["left", "top"], function (j, k) {
                        if (+b[j] === b[j]) {
                            g[j] = b[j];
                            b[j] = k
                        }
                    });
                    f = {
                        my: b.join(" "),
                        at: b.join(" "),
                        offset: g.join(" ")
                    }
                }
                f = a.extend({}, a.ui.dialog.prototype.options.position, f)
            } else f = a.ui.dialog.prototype.options.position;
            (h = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(a.extend({
                of: window
            }, f));
            h || this.uiDialog.hide()
        },
        _setOptions: function (f) {
            var b = this,
                g = {},
                h = false;
            a.each(f, function (j, k) {
                b._setOption(j, k);
                if (j in d) h = true;
                if (j in e) g[j] = k
            });
            h && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", g)
        },
        _setOption: function (f, b) {
            var g = this,
                h = g.uiDialog;
            switch (f) {
            case "beforeclose":
                f = "beforeClose";
                break;
            case "buttons":
                g._createButtons(b);
                break;
            case "closeText":
                g.uiDialogTitlebarCloseText.text("" + b);
                break;
            case "dialogClass":
                h.removeClass(g.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + b);
                break;
            case "disabled":
                b ? h.addClass("ui-dialog-disabled") : h.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                var j = h.is(":data(draggable)");
                j && !b && h.draggable("destroy");
                !j && b && g._makeDraggable();
                break;
            case "position":
                g._position(b);
                break;
            case "resizable":
                (j = h.is(":data(resizable)")) && !b && h.resizable("destroy");
                j && typeof b === "string" && h.resizable("option", "handles", b);
                !j && b !== false && g._makeResizable(b);
                break;
            case "title":
                a(".ui-dialog-title", g.uiDialogTitlebar).html("" + (b || "&#160;"));
                break
            }
            a.Widget.prototype._setOption.apply(g, arguments)
        },
        _size: function () {
            var f = this.options,
                b, g, h = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (f.minWidth > f.width) f.width = f.minWidth;
            b = this.uiDialog.css({
                height: "auto",
                width: f.width
            }).height();
            g = Math.max(0, f.minHeight - b);
            if (f.height === "auto") if (a.support.minHeight) this.element.css({
                minHeight: g,
                height: "auto"
            });
            else {
                this.uiDialog.show();
                f = this.element.css("height", "auto").height();
                h || this.uiDialog.hide();
                this.element.height(Math.max(f, g))
            } else this.element.height(Math.max(f.height - b, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    a.extend(a.ui.dialog, {
        version: "1.8.11",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (f) {
            f = f.attr("id");
            if (!f) {
                this.uuid += 1;
                f = this.uuid
            }
            return "ui-dialog-title-" + f
        },
        overlay: function (f) {
            this.$el = a.ui.dialog.overlay.create(f)
        }
    });
    a.extend(a.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (f) {
            return f + ".dialog-overlay"
        }).join(" "),
        create: function (f) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (g) {
                        if (a(g.target).zIndex() < a.ui.dialog.overlay.maxZ) return false
                    })
                }, 1);
                a(document).bind("keydown.dialog-overlay", function (g) {
                    if (f.options.closeOnEscape && g.keyCode && g.keyCode === a.ui.keyCode.ESCAPE) {
                        f.close(g);
                        g.preventDefault()
                    }
                });
                a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize)
            }
            var b = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            a.fn.bgiframe && b.bgiframe();
            this.instances.push(b);
            return b
        },
        destroy: function (f) {
            var b = a.inArray(f, this.instances);
            b != -1 && this.oldInstances.push(this.instances.splice(b, 1)[0]);
            this.instances.length === 0 && a([document, window]).unbind(".dialog-overlay");
            f.remove();
            var g = 0;
            a.each(this.instances, function () {
                g = Math.max(g, this.css("z-index"))
            });
            this.maxZ = g
        },
        height: function () {
            var f, b;
            if (a.browser.msie && a.browser.version < 7) {
                f = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                b = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return f < b ? a(window).height() + "px" : f + "px"
            } else return a(document).height() + "px"
        },
        width: function () {
            var f, b;
            if (a.browser.msie && a.browser.version < 7) {
                f = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                b = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return f < b ? a(window).width() + "px" : f + "px"
            } else return a(document).width() + "px"
        },
        resize: function () {
            var f = a([]);
            a.each(a.ui.dialog.overlay.instances, function () {
                f = f.add(this)
            });
            f.css({
                width: 0,
                height: 0
            }).css({
                width: a.ui.dialog.overlay.width(),
                height: a.ui.dialog.overlay.height()
            })
        }
    });
    a.extend(a.ui.dialog.overlay.prototype, {
        destroy: function () {
            a.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function (a) {
    a.widget("ui.slider", a.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var c = this,
                d = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            d.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = a([]);
            if (d.range) {
                if (d.range === true) {
                    this.range = a("<div></div>");
                    if (!d.values) d.values = [this._valueMin(), this._valueMin()];
                    if (d.values.length && d.values.length !== 2) d.values = [d.values[0], d.values[0]]
                } else this.range = a("<div></div>");
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (d.range === "min" || d.range === "max") this.range.addClass("ui-slider-range-" + d.range);
                this.range.addClass("ui-widget-header")
            }
            a(".ui-slider-handle", this.element).length === 0 && a("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (d.values && d.values.length) for (; a(".ui-slider-handle", this.element).length < d.values.length;) a("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = a(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (e) {
                e.preventDefault()
            }).hover(function () {
                d.disabled || a(this).addClass("ui-state-hover")
            }, function () {
                a(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (d.disabled) a(this).blur();
                else {
                    a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    a(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                a(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (e) {
                a(this).data("index.ui-slider-handle", e)
            });
            this.handles.keydown(function (e) {
                var f = true,
                    b = a(this).data("index.ui-slider-handle"),
                    g, h, j;
                if (!c.options.disabled) {
                    switch (e.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        f = false;
                        if (!c._keySliding) {
                            c._keySliding = true;
                            a(this).addClass("ui-state-active");
                            g = c._start(e, b);
                            if (g === false) return
                        }
                        break
                    }
                    j = c.options.step;
                    g = c.options.values && c.options.values.length ? (h = c.values(b)) : (h = c.value());
                    switch (e.keyCode) {
                    case a.ui.keyCode.HOME:
                        h = c._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        h = c._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        h = c._trimAlignValue(g + (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        h = c._trimAlignValue(g - (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (g === c._valueMax()) return;
                        h = c._trimAlignValue(g + j);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (g === c._valueMin()) return;
                        h = c._trimAlignValue(g - j);
                        break
                    }
                    c._slide(e, b, h);
                    return f
                }
            }).keyup(function (e) {
                var f = a(this).data("index.ui-slider-handle");
                if (c._keySliding) {
                    c._keySliding = false;
                    c._stop(e, f);
                    c._change(e, f);
                    a(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (c) {
            var d = this.options,
                e, f, b, g, h;
            if (d.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            e = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            f = this._valueMax() - this._valueMin() + 1;
            g = this;
            this.handles.each(function (j) {
                var k = Math.abs(e - g.values(j));
                if (f > k) {
                    f = k;
                    b = a(this);
                    h = j
                }
            });
            if (d.range === true && this.values(1) === d.min) {
                h += 1;
                b = a(this.handles[h])
            }
            if (this._start(c, h) === false) return false;
            this._mouseSliding = true;
            g._handleIndex = h;
            b.addClass("ui-state-active").focus();
            d = b.offset();
            this._clickOffset = !a(c.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: c.pageX - d.left - b.width() / 2,
                top: c.pageY - d.top - b.height() / 2 - (parseInt(b.css("borderTopWidth"), 10) || 0) - (parseInt(b.css("borderBottomWidth"), 10) || 0) + (parseInt(b.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(c, h, e);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (c) {
            var d = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            this._slide(c, this._handleIndex, d);
            return false
        },
        _mouseStop: function (c) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(c, this._handleIndex);
            this._change(c, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (c) {
            var d;
            if (this.orientation === "horizontal") {
                d = this.elementSize.width;
                c = c.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                d = this.elementSize.height;
                c = c.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            d = c / d;
            if (d > 1) d = 1;
            if (d < 0) d = 0;
            if (this.orientation === "vertical") d = 1 - d;
            c = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + d * c)
        },
        _start: function (c, d) {
            var e = {
                handle: this.handles[d],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                e.value = this.values(d);
                e.values = this.values()
            }
            return this._trigger("start", c, e)
        },
        _slide: function (c, d, e) {
            var f;
            if (this.options.values && this.options.values.length) {
                f = this.values(d ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (d === 0 && e > f || d === 1 && e < f)) e = f;
                if (e !== this.values(d)) {
                    f = this.values();
                    f[d] = e;
                    c = this._trigger("slide", c, {
                        handle: this.handles[d],
                        value: e,
                        values: f
                    });
                    this.values(d ? 0 : 1);
                    c !== false && this.values(d, e, true)
                }
            } else if (e !== this.value()) {
                c = this._trigger("slide", c, {
                    handle: this.handles[d],
                    value: e
                });
                c !== false && this.value(e)
            }
        },
        _stop: function (c, d) {
            var e = {
                handle: this.handles[d],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                e.value = this.values(d);
                e.values = this.values()
            }
            this._trigger("stop", c, e)
        },
        _change: function (c, d) {
            if (!this._keySliding && !this._mouseSliding) {
                var e = {
                    handle: this.handles[d],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    e.value = this.values(d);
                    e.values = this.values()
                }
                this._trigger("change", c, e)
            }
        },
        value: function (c) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(c);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (c, d) {
            var e, f, b;
            if (arguments.length > 1) {
                this.options.values[c] = this._trimAlignValue(d);
                this._refreshValue();
                this._change(null, c)
            }
            if (arguments.length) if (a.isArray(arguments[0])) {
                e = this.options.values;
                f = arguments[0];
                for (b = 0; b < e.length; b += 1) {
                    e[b] = this._trimAlignValue(f[b]);
                    this._change(null, b)
                }
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(c) : this.value();
            else return this._values()
        },
        _setOption: function (c, d) {
            var e, f = 0;
            if (a.isArray(this.options.values)) f = this.options.values.length;
            a.Widget.prototype._setOption.apply(this, arguments);
            switch (c) {
            case "disabled":
                if (d) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (e = 0; e < f; e += 1) this._change(null, e);
                this._animateOff = false;
                break
            }
        },
        _value: function () {
            return this._trimAlignValue(this.options.value)
        },
        _values: function (c) {
            var d, e;
            if (arguments.length) {
                d = this.options.values[c];
                return this._trimAlignValue(d)
            } else {
                d = this.options.values.slice();
                for (e = 0; e < d.length; e += 1) d[e] = this._trimAlignValue(d[e]);
                return d
            }
        },
        _trimAlignValue: function (c) {
            if (c <= this._valueMin()) return this._valueMin();
            if (c >= this._valueMax()) return this._valueMax();
            var d = this.options.step > 0 ? this.options.step : 1,
                e = (c - this._valueMin()) % d;
            alignValue = c - e;
            if (Math.abs(e) * 2 >= d) alignValue += e > 0 ? d : -d;
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var c = this.options.range,
                d = this.options,
                e = this,
                f = !this._animateOff ? d.animate : false,
                b, g = {},
                h, j, k, q;
            if (this.options.values && this.options.values.length) this.handles.each(function (u) {
                b = (e.values(u) - e._valueMin()) / (e._valueMax() - e._valueMin()) * 100;
                g[e.orientation === "horizontal" ? "left" : "bottom"] = b + "%";
                a(this).stop(1, 1)[f ? "animate" : "css"](g, d.animate);
                if (e.options.range === true) if (e.orientation === "horizontal") {
                    if (u === 0) e.range.stop(1, 1)[f ? "animate" : "css"]({
                        left: b + "%"
                    }, d.animate);
                    if (u === 1) e.range[f ? "animate" : "css"]({
                        width: b - h + "%"
                    }, {
                        queue: false,
                        duration: d.animate
                    })
                } else {
                    if (u === 0) e.range.stop(1, 1)[f ? "animate" : "css"]({
                        bottom: b + "%"
                    }, d.animate);
                    if (u === 1) e.range[f ? "animate" : "css"]({
                        height: b - h + "%"
                    }, {
                        queue: false,
                        duration: d.animate
                    })
                }
                h = b
            });
            else {
                j = this.value();
                k = this._valueMin();
                q = this._valueMax();
                b = q !== k ? (j - k) / (q - k) * 100 : 0;
                g[e.orientation === "horizontal" ? "left" : "bottom"] = b + "%";
                this.handle.stop(1, 1)[f ? "animate" : "css"](g, d.animate);
                if (c === "min" && this.orientation === "horizontal") this.range.stop(1, 1)[f ? "animate" : "css"]({
                    width: b + "%"
                }, d.animate);
                if (c === "max" && this.orientation === "horizontal") this.range[f ? "animate" : "css"]({
                    width: 100 - b + "%"
                }, {
                    queue: false,
                    duration: d.animate
                });
                if (c === "min" && this.orientation === "vertical") this.range.stop(1, 1)[f ? "animate" : "css"]({
                    height: b + "%"
                }, d.animate);
                if (c === "max" && this.orientation === "vertical") this.range[f ? "animate" : "css"]({
                    height: 100 - b + "%"
                }, {
                    queue: false,
                    duration: d.animate
                })
            }
        }
    });
    a.extend(a.ui.slider, {
        version: "1.8.11"
    })
})(jQuery);
(function (a, c) {
    function d() {
        return ++f
    }
    function e() {
        return ++b
    }
    var f = 0,
        b = 0;
    a.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function () {
            this._tabify(true)
        },
        _setOption: function (g, h) {
            if (g == "selected") this.options.collapsible && h == this.options.selected || this.select(h);
            else {
                this.options[g] = h;
                this._tabify()
            }
        },
        _tabId: function (g) {
            return g.title && g.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + d()
        },
        _sanitizeSelector: function (g) {
            return g.replace(/:/g, "\\:")
        },
        _cookie: function () {
            var g = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + e());
            return a.cookie.apply(null, [g].concat(a.makeArray(arguments)))
        },
        _ui: function (g, h) {
            return {
                tab: g,
                panel: h,
                index: this.anchors.index(g)
            }
        },
        _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var g = a(this);
                g.html(g.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function (g) {
            function h(D, F) {
                D.css("display", "");
                !a.support.opacity && F.opacity && D[0].style.removeAttribute("filter")
            }
            var j = this,
                k = this.options,
                q = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = a(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return a("a", this)[0]
            });
            this.panels = a([]);
            this.anchors.each(function (D, F) {
                var o = a(F).attr("href"),
                    m = o.split("#")[0],
                    z;
                if (m && (m === location.toString().split("#")[0] || (z = a("base")[0]) && m === z.href)) {
                    o = F.hash;
                    F.href = o
                }
                if (q.test(o)) j.panels = j.panels.add(j.element.find(j._sanitizeSelector(o)));
                else if (o && o !== "#") {
                    a.data(F, "href.tabs", o);
                    a.data(F, "load.tabs", o.replace(/#.*$/, ""));
                    o = j._tabId(F);
                    F.href = "#" + o;
                    F = j.element.find("#" + o);
                    if (!F.length) {
                        F = a(k.panelTemplate).attr("id", o).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(j.panels[D - 1] || j.list);
                        F.data("destroy.tabs", true)
                    }
                    j.panels = j.panels.add(F)
                } else k.disabled.push(D)
            });
            if (g) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (k.selected === c) {
                    location.hash && this.anchors.each(function (D, F) {
                        if (F.hash == location.hash) {
                            k.selected = D;
                            return false
                        }
                    });
                    if (typeof k.selected !== "number" && k.cookie) k.selected = parseInt(j._cookie(), 10);
                    if (typeof k.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) k.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    k.selected = k.selected || (this.lis.length ? 0 : -1)
                } else if (k.selected === null) k.selected = -1;
                k.selected = k.selected >= 0 && this.anchors[k.selected] || k.selected < 0 ? k.selected : 0;
                k.disabled = a.unique(k.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"), function (D) {
                    return j.lis.index(D)
                }))).sort();
                a.inArray(k.selected, k.disabled) != -1 && k.disabled.splice(a.inArray(k.selected, k.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (k.selected >= 0 && this.anchors.length) {
                    j.element.find(j._sanitizeSelector(j.anchors[k.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(k.selected).addClass("ui-tabs-selected ui-state-active");
                    j.element.queue("tabs", function () {
                        j._trigger("show", null, j._ui(j.anchors[k.selected], j.element.find(j._sanitizeSelector(j.anchors[k.selected].hash))[0]))
                    });
                    this.load(k.selected)
                }
                a(window).bind("unload", function () {
                    j.lis.add(j.anchors).unbind(".tabs");
                    j.lis = j.anchors = j.panels = null
                })
            } else k.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[k.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            k.cookie && this._cookie(k.selected, k.cookie);
            g = 0;
            for (var u; u = this.lis[g]; g++) a(u)[a.inArray(g, k.disabled) != -1 && !a(u).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            k.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (k.event !== "mouseover") {
                var n = function (D, F) {
                        F.is(":not(.ui-state-disabled)") && F.addClass("ui-state-" + D)
                    },
                    l = function (D, F) {
                        F.removeClass("ui-state-" + D)
                    };
                this.lis.bind("mouseover.tabs", function () {
                    n("hover", a(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    l("hover", a(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    n("focus", a(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    l("focus", a(this).closest("li"))
                })
            }
            var p, s;
            if (k.fx) if (a.isArray(k.fx)) {
                p = k.fx[0];
                s = k.fx[1]
            } else p = s = k.fx;
            var v = s ?
            function (D, F) {
                a(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                F.hide().removeClass("ui-tabs-hide").animate(s, s.duration || "normal", function () {
                    h(F, s);
                    j._trigger("show", null, j._ui(D, F[0]))
                })
            } : function (D, F) {
                a(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                F.removeClass("ui-tabs-hide");
                j._trigger("show", null, j._ui(D, F[0]))
            }, C = p ?
            function (D, F) {
                F.animate(p, p.duration || "normal", function () {
                    j.lis.removeClass("ui-tabs-selected ui-state-active");
                    F.addClass("ui-tabs-hide");
                    h(F, p);
                    j.element.dequeue("tabs")
                })
            } : function (D, F) {
                j.lis.removeClass("ui-tabs-selected ui-state-active");
                F.addClass("ui-tabs-hide");
                j.element.dequeue("tabs")
            };
            this.anchors.bind(k.event + ".tabs", function () {
                var D = this,
                    F = a(D).closest("li"),
                    o = j.panels.filter(":not(.ui-tabs-hide)"),
                    m = j.element.find(j._sanitizeSelector(D.hash));
                if (F.hasClass("ui-tabs-selected") && !k.collapsible || F.hasClass("ui-state-disabled") || F.hasClass("ui-state-processing") || j.panels.filter(":animated").length || j._trigger("select", null, j._ui(this, m[0])) === false) {
                    this.blur();
                    return false
                }
                k.selected = j.anchors.index(this);
                j.abort();
                if (k.collapsible) if (F.hasClass("ui-tabs-selected")) {
                    k.selected = -1;
                    k.cookie && j._cookie(k.selected, k.cookie);
                    j.element.queue("tabs", function () {
                        C(D, o)
                    }).dequeue("tabs");
                    this.blur();
                    return false
                } else if (!o.length) {
                    k.cookie && j._cookie(k.selected, k.cookie);
                    j.element.queue("tabs", function () {
                        v(D, m)
                    });
                    j.load(j.anchors.index(this));
                    this.blur();
                    return false
                }
                k.cookie && j._cookie(k.selected, k.cookie);
                if (m.length) {
                    o.length && j.element.queue("tabs", function () {
                        C(D, o)
                    });
                    j.element.queue("tabs", function () {
                        v(D, m)
                    });
                    j.load(j.anchors.index(this))
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                a.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        },
        _getIndex: function (g) {
            if (typeof g == "string") g = this.anchors.index(this.anchors.filter("[href$=" + g + "]"));
            return g
        },
        destroy: function () {
            var g = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var h = a.data(this, "href.tabs");
                if (h) this.href = h;
                var j = a(this).unbind(".tabs");
                a.each(["href", "load", "cache"], function (k, q) {
                    j.removeData(q + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                a.data(this, "destroy.tabs") ? a(this).remove() : a(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            g.cookie && this._cookie(null, g.cookie);
            return this
        },
        add: function (g, h, j) {
            if (j === c) j = this.anchors.length;
            var k = this,
                q = this.options;
            h = a(q.tabTemplate.replace(/#\{href\}/g, g).replace(/#\{label\}/g, h));
            g = !g.indexOf("#") ? g.replace("#", "") : this._tabId(a("a", h)[0]);
            h.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var u = k.element.find("#" + g);
            u.length || (u = a(q.panelTemplate).attr("id", g).data("destroy.tabs", true));
            u.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (j >= this.lis.length) {
                h.appendTo(this.list);
                u.appendTo(this.list[0].parentNode)
            } else {
                h.insertBefore(this.lis[j]);
                u.insertBefore(this.panels[j])
            }
            q.disabled = a.map(q.disabled, function (n) {
                return n >= j ? ++n : n
            });
            this._tabify();
            if (this.anchors.length == 1) {
                q.selected = 0;
                h.addClass("ui-tabs-selected ui-state-active");
                u.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    k._trigger("show", null, k._ui(k.anchors[0], k.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[j], this.panels[j]));
            return this
        },
        remove: function (g) {
            g = this._getIndex(g);
            var h = this.options,
                j = this.lis.eq(g).remove(),
                k = this.panels.eq(g).remove();
            if (j.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(g + (g + 1 < this.anchors.length ? 1 : -1));
            h.disabled = a.map(a.grep(h.disabled, function (q) {
                return q != g
            }), function (q) {
                return q >= g ? --q : q
            });
            this._tabify();
            this._trigger("remove", null, this._ui(j.find("a")[0], k[0]));
            return this
        },
        enable: function (g) {
            g = this._getIndex(g);
            var h = this.options;
            if (a.inArray(g, h.disabled) != -1) {
                this.lis.eq(g).removeClass("ui-state-disabled");
                h.disabled = a.grep(h.disabled, function (j) {
                    return j != g
                });
                this._trigger("enable", null, this._ui(this.anchors[g], this.panels[g]));
                return this
            }
        },
        disable: function (g) {
            g = this._getIndex(g);
            var h = this.options;
            if (g != h.selected) {
                this.lis.eq(g).addClass("ui-state-disabled");
                h.disabled.push(g);
                h.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[g], this.panels[g]))
            }
            return this
        },
        select: function (g) {
            g = this._getIndex(g);
            if (g == -1) if (this.options.collapsible && this.options.selected != -1) g = this.options.selected;
            else return this;
            this.anchors.eq(g).trigger(this.options.event + ".tabs");
            return this
        },
        load: function (g) {
            g = this._getIndex(g);
            var h = this,
                j = this.options,
                k = this.anchors.eq(g)[0],
                q = a.data(k, "load.tabs");
            this.abort();
            if (!q || this.element.queue("tabs").length !== 0 && a.data(k, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(g).addClass("ui-state-processing");
                if (j.spinner) {
                    var u = a("span", k);
                    u.data("label.tabs", u.html()).html(j.spinner)
                }
                this.xhr = a.ajax(a.extend({}, j.ajaxOptions, {
                    url: q,
                    success: function (n, l) {
                        h.element.find(h._sanitizeSelector(k.hash)).html(n);
                        h._cleanup();
                        j.cache && a.data(k, "cache.tabs", true);
                        h._trigger("load", null, h._ui(h.anchors[g], h.panels[g]));
                        try {
                            j.ajaxOptions.success(n, l)
                        } catch (p) {}
                    },
                    error: function (n, l) {
                        h._cleanup();
                        h._trigger("load", null, h._ui(h.anchors[g], h.panels[g]));
                        try {
                            j.ajaxOptions.error(n, l, g, k)
                        } catch (p) {}
                    }
                }));
                h.element.dequeue("tabs");
                return this
            }
        },
        abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function (g, h) {
            this.anchors.eq(g).removeData("cache.tabs").data("load.tabs", h);
            return this
        },
        length: function () {
            return this.anchors.length
        }
    });
    a.extend(a.ui.tabs, {
        version: "1.8.11"
    });
    a.extend(a.ui.tabs.prototype, {
        rotation: null,
        rotate: function (g, h) {
            var j = this,
                k = this.options,
                q = j._rotate || (j._rotate = function (u) {
                    clearTimeout(j.rotation);
                    j.rotation = setTimeout(function () {
                        var n = k.selected;
                        j.select(++n < j.anchors.length ? n : 0)
                    }, g);
                    u && u.stopPropagation()
                });
            h = j._unrotate || (j._unrotate = !h ?
            function (u) {
                u.clientX && j.rotate(null)
            } : function () {
                t = k.selected;
                q()
            });
            if (g) {
                this.element.bind("tabsshow", q);
                this.anchors.bind(k.event + ".tabs", h);
                q()
            } else {
                clearTimeout(j.rotation);
                this.element.unbind("tabsshow", q);
                this.anchors.unbind(k.event + ".tabs", h);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (a, c) {
    function d() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        a.extend(this._defaults, this.regional[""]);
        this.dpDiv = a('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
    }
    function e(b, g) {
        a.extend(b, g);
        for (var h in g) if (g[h] == null || g[h] == c) b[h] = g[h];
        return b
    }
    a.extend(a.ui, {
        datepicker: {
            version: "1.8.11"
        }
    });
    var f = (new Date).getTime();
    a.extend(d.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (b) {
            e(this._defaults, b || {});
            return this
        },
        _attachDatepicker: function (b, g) {
            var h = null;
            for (var j in this._defaults) {
                var k = b.getAttribute("date:" + j);
                if (k) {
                    h = h || {};
                    try {
                        h[j] = eval(k)
                    } catch (q) {
                        h[j] = k
                    }
                }
            }
            j = b.nodeName.toLowerCase();
            k = j == "div" || j == "span";
            if (!b.id) {
                this.uuid += 1;
                b.id = "dp" + this.uuid
            }
            var u = this._newInst(a(b), k);
            u.settings = a.extend({}, g || {}, h || {});
            if (j == "input") this._connectDatepicker(b, u);
            else k && this._inlineDatepicker(b, u)
        },
        _newInst: function (b, g) {
            return {
                id: b[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: b,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: g,
                dpDiv: !g ? this.dpDiv : a('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
            }
        },
        _connectDatepicker: function (b, g) {
            var h = a(b);
            g.append = a([]);
            g.trigger = a([]);
            if (!h.hasClass(this.markerClassName)) {
                this._attachments(h, g);
                h.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (j, k, q) {
                    g.settings[k] = q
                }).bind("getData.datepicker", function (j, k) {
                    return this._get(g, k)
                });
                this._autoSize(g);
                a.data(b, "datepicker", g)
            }
        },
        _attachments: function (b, g) {
            var h = this._get(g, "appendText"),
                j = this._get(g, "isRTL");
            g.append && g.append.remove();
            if (h) {
                g.append = a('<span class="' + this._appendClass + '">' + h + "</span>");
                b[j ? "before" : "after"](g.append)
            }
            b.unbind("focus", this._showDatepicker);
            g.trigger && g.trigger.remove();
            h = this._get(g, "showOn");
            if (h == "focus" || h == "both") b.focus(this._showDatepicker);
            if (h == "button" || h == "both") {
                h = this._get(g, "buttonText");
                var k = this._get(g, "buttonImage");
                g.trigger = a(this._get(g, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
                    src: k,
                    alt: h,
                    title: h
                }) : a('<button type="button"></button>').addClass(this._triggerClass).html(k == "" ? h : a("<img/>").attr({
                    src: k,
                    alt: h,
                    title: h
                })));
                b[j ? "before" : "after"](g.trigger);
                g.trigger.click(function () {
                    a.datepicker._datepickerShowing && a.datepicker._lastInput == b[0] ? a.datepicker._hideDatepicker() : a.datepicker._showDatepicker(b[0]);
                    return false
                })
            }
        },
        _autoSize: function (b) {
            if (this._get(b, "autoSize") && !b.inline) {
                var g = new Date(2009, 11, 20),
                    h = this._get(b, "dateFormat");
                if (h.match(/[DM]/)) {
                    var j = function (k) {
                            for (var q = 0, u = 0, n = 0; n < k.length; n++) if (k[n].length > q) {
                                q = k[n].length;
                                u = n
                            }
                            return u
                        };
                    g.setMonth(j(this._get(b, h.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    g.setDate(j(this._get(b, h.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - g.getDay())
                }
                b.input.attr("size", this._formatDate(b, g).length)
            }
        },
        _inlineDatepicker: function (b, g) {
            var h = a(b);
            if (!h.hasClass(this.markerClassName)) {
                h.addClass(this.markerClassName).append(g.dpDiv).bind("setData.datepicker", function (j, k, q) {
                    g.settings[k] = q
                }).bind("getData.datepicker", function (j, k) {
                    return this._get(g, k)
                });
                a.data(b, "datepicker", g);
                this._setDate(g, this._getDefaultDate(g), true);
                this._updateDatepicker(g);
                this._updateAlternate(g);
                g.dpDiv.show()
            }
        },
        _dialogDatepicker: function (b, g, h, j, k) {
            b = this._dialogInst;
            if (!b) {
                this.uuid += 1;
                this._dialogInput = a('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                a("body").append(this._dialogInput);
                b = this._dialogInst = this._newInst(this._dialogInput, false);
                b.settings = {};
                a.data(this._dialogInput[0], "datepicker", b)
            }
            e(b.settings, j || {});
            g = g && g.constructor == Date ? this._formatDate(b, g) : g;
            this._dialogInput.val(g);
            this._pos = k ? k.length ? k : [k.pageX, k.pageY] : null;
            if (!this._pos) this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            b.settings.onSelect = h;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            a.blockUI && a.blockUI(this.dpDiv);
            a.data(this._dialogInput[0], "datepicker", b);
            return this
        },
        _destroyDatepicker: function (b) {
            var g = a(b),
                h = a.data(b, "datepicker");
            if (g.hasClass(this.markerClassName)) {
                var j = b.nodeName.toLowerCase();
                a.removeData(b, "datepicker");
                if (j == "input") {
                    h.append.remove();
                    h.trigger.remove();
                    g.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else if (j == "div" || j == "span") g.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (b) {
            var g = a(b),
                h = a.data(b, "datepicker");
            if (g.hasClass(this.markerClassName)) {
                var j = b.nodeName.toLowerCase();
                if (j == "input") {
                    b.disabled = false;
                    h.trigger.filter("button").each(function () {
                        this.disabled = false
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
                } else if (j == "div" || j == "span") g.children("." + this._inlineClass).children().removeClass("ui-state-disabled");
                this._disabledInputs = a.map(this._disabledInputs, function (k) {
                    return k == b ? null : k
                })
            }
        },
        _disableDatepicker: function (b) {
            var g = a(b),
                h = a.data(b, "datepicker");
            if (g.hasClass(this.markerClassName)) {
                var j = b.nodeName.toLowerCase();
                if (j == "input") {
                    b.disabled = true;
                    h.trigger.filter("button").each(function () {
                        this.disabled = true
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
                } else if (j == "div" || j == "span") g.children("." + this._inlineClass).children().addClass("ui-state-disabled");
                this._disabledInputs = a.map(this._disabledInputs, function (k) {
                    return k == b ? null : k
                });
                this._disabledInputs[this._disabledInputs.length] = b
            }
        },
        _isDisabledDatepicker: function (b) {
            if (!b) return false;
            for (var g = 0; g < this._disabledInputs.length; g++) if (this._disabledInputs[g] == b) return true;
            return false
        },
        _getInst: function (b) {
            try {
                return a.data(b, "datepicker")
            } catch (g) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (b, g, h) {
            var j = this._getInst(b);
            if (arguments.length == 2 && typeof g == "string") return g == "defaults" ? a.extend({}, a.datepicker._defaults) : j ? g == "all" ? a.extend({}, j.settings) : this._get(j, g) : null;
            var k = g || {};
            if (typeof g == "string") {
                k = {};
                k[g] = h
            }
            if (j) {
                this._curInst == j && this._hideDatepicker();
                var q = this._getDateDatepicker(b, true),
                    u = this._getMinMaxDate(j, "min"),
                    n = this._getMinMaxDate(j, "max");
                e(j.settings, k);
                if (u !== null && k.dateFormat !== c && k.minDate === c) j.settings.minDate = this._formatDate(j, u);
                if (n !== null && k.dateFormat !== c && k.maxDate === c) j.settings.maxDate = this._formatDate(j, n);
                this._attachments(a(b), j);
                this._autoSize(j);
                this._setDateDatepicker(b, q);
                this._updateDatepicker(j)
            }
        },
        _changeDatepicker: function (b, g, h) {
            this._optionDatepicker(b, g, h)
        },
        _refreshDatepicker: function (b) {
            (b = this._getInst(b)) && this._updateDatepicker(b)
        },
        _setDateDatepicker: function (b, g) {
            if (b = this._getInst(b)) {
                this._setDate(b, g);
                this._updateDatepicker(b);
                this._updateAlternate(b)
            }
        },
        _getDateDatepicker: function (b, g) {
            (b = this._getInst(b)) && !b.inline && this._setDateFromField(b, g);
            return b ? this._getDate(b) : null
        },
        _doKeyDown: function (b) {
            var g = a.datepicker._getInst(b.target),
                h = true,
                j = g.dpDiv.is(".ui-datepicker-rtl");
            g._keyEvent = true;
            if (a.datepicker._datepickerShowing) switch (b.keyCode) {
            case 9:
                a.datepicker._hideDatepicker();
                h = false;
                break;
            case 13:
                h = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", g.dpDiv);
                h[0] ? a.datepicker._selectDay(b.target, g.selectedMonth, g.selectedYear, h[0]) : a.datepicker._hideDatepicker();
                return false;
            case 27:
                a.datepicker._hideDatepicker();
                break;
            case 33:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(g, "stepBigMonths") : -a.datepicker._get(g, "stepMonths"), "M");
                break;
            case 34:
                a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(g, "stepBigMonths") : +a.datepicker._get(g, "stepMonths"), "M");
                break;
            case 35:
                if (b.ctrlKey || b.metaKey) a.datepicker._clearDate(b.target);
                h = b.ctrlKey || b.metaKey;
                break;
            case 36:
                if (b.ctrlKey || b.metaKey) a.datepicker._gotoToday(b.target);
                h = b.ctrlKey || b.metaKey;
                break;
            case 37:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, j ? +1 : -1, "D");
                h = b.ctrlKey || b.metaKey;
                if (b.originalEvent.altKey) a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(g, "stepBigMonths") : -a.datepicker._get(g, "stepMonths"), "M");
                break;
            case 38:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, -7, "D");
                h = b.ctrlKey || b.metaKey;
                break;
            case 39:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, j ? -1 : +1, "D");
                h = b.ctrlKey || b.metaKey;
                if (b.originalEvent.altKey) a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(g, "stepBigMonths") : +a.datepicker._get(g, "stepMonths"), "M");
                break;
            case 40:
                if (b.ctrlKey || b.metaKey) a.datepicker._adjustDate(b.target, +7, "D");
                h = b.ctrlKey || b.metaKey;
                break;
            default:
                h = false
            } else if (b.keyCode == 36 && b.ctrlKey) a.datepicker._showDatepicker(this);
            else h = false;
            if (h) {
                b.preventDefault();
                b.stopPropagation()
            }
        },
        _doKeyPress: function (b) {
            var g = a.datepicker._getInst(b.target);
            if (a.datepicker._get(g, "constrainInput")) {
                g = a.datepicker._possibleChars(a.datepicker._get(g, "dateFormat"));
                var h = String.fromCharCode(b.charCode == c ? b.keyCode : b.charCode);
                return b.ctrlKey || b.metaKey || h < " " || !g || g.indexOf(h) > -1
            }
        },
        _doKeyUp: function (b) {
            b = a.datepicker._getInst(b.target);
            if (b.input.val() != b.lastVal) try {
                if (a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, a.datepicker._getFormatConfig(b))) {
                    a.datepicker._setDateFromField(b);
                    a.datepicker._updateAlternate(b);
                    a.datepicker._updateDatepicker(b)
                }
            } catch (g) {
                a.datepicker.log(g)
            }
            return true
        },
        _showDatepicker: function (b) {
            b = b.target || b;
            if (b.nodeName.toLowerCase() != "input") b = a("input", b.parentNode)[0];
            if (!(a.datepicker._isDisabledDatepicker(b) || a.datepicker._lastInput == b)) {
                var g = a.datepicker._getInst(b);
                a.datepicker._curInst && a.datepicker._curInst != g && a.datepicker._curInst.dpDiv.stop(true, true);
                var h = a.datepicker._get(g, "beforeShow");
                e(g.settings, h ? h.apply(b, [b, g]) : {});
                g.lastVal = null;
                a.datepicker._lastInput = b;
                a.datepicker._setDateFromField(g);
                if (a.datepicker._inDialog) b.value = "";
                if (!a.datepicker._pos) {
                    a.datepicker._pos = a.datepicker._findPos(b);
                    a.datepicker._pos[1] += b.offsetHeight
                }
                var j = false;
                a(b).parents().each(function () {
                    j |= a(this).css("position") == "fixed";
                    return !j
                });
                if (j && a.browser.opera) {
                    a.datepicker._pos[0] -= document.documentElement.scrollLeft;
                    a.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                h = {
                    left: a.datepicker._pos[0],
                    top: a.datepicker._pos[1]
                };
                a.datepicker._pos = null;
                g.dpDiv.empty();
                g.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                });
                a.datepicker._updateDatepicker(g);
                h = a.datepicker._checkOffset(g, h, j);
                g.dpDiv.css({
                    position: a.datepicker._inDialog && a.blockUI ? "static" : j ? "fixed" : "absolute",
                    display: "none",
                    left: h.left + "px",
                    top: h.top + "px"
                });
                if (!g.inline) {
                    h = a.datepicker._get(g, "showAnim");
                    var k = a.datepicker._get(g, "duration"),
                        q = function () {
                            a.datepicker._datepickerShowing = true;
                            var u = g.dpDiv.find("iframe.ui-datepicker-cover");
                            if (u.length) {
                                var n = a.datepicker._getBorders(g.dpDiv);
                                u.css({
                                    left: -n[0],
                                    top: -n[1],
                                    width: g.dpDiv.outerWidth(),
                                    height: g.dpDiv.outerHeight()
                                })
                            }
                        };
                    g.dpDiv.zIndex(a(b).zIndex() + 1);
                    a.effects && a.effects[h] ? g.dpDiv.show(h, a.datepicker._get(g, "showOptions"), k, q) : g.dpDiv[h || "show"](h ? k : null, q);
                    if (!h || !k) q();
                    g.input.is(":visible") && !g.input.is(":disabled") && g.input.focus();
                    a.datepicker._curInst = g
                }
            }
        },
        _updateDatepicker: function (b) {
            var g = this,
                h = a.datepicker._getBorders(b.dpDiv);
            b.dpDiv.empty().append(this._generateHTML(b));
            var j = b.dpDiv.find("iframe.ui-datepicker-cover");
            j.length && j.css({
                left: -h[0],
                top: -h[1],
                width: b.dpDiv.outerWidth(),
                height: b.dpDiv.outerHeight()
            });
            b.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                a(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev") != -1 && a(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next") != -1 && a(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover", function () {
                if (!g._isDisabledDatepicker(b.inline ? b.dpDiv.parent()[0] : b.input[0])) {
                    a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    a(this).addClass("ui-state-hover");
                    this.className.indexOf("ui-datepicker-prev") != -1 && a(this).addClass("ui-datepicker-prev-hover");
                    this.className.indexOf("ui-datepicker-next") != -1 && a(this).addClass("ui-datepicker-next-hover")
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            h = this._getNumberOfMonths(b);
            j = h[1];
            j > 1 ? b.dpDiv.addClass("ui-datepicker-multi-" + j).css("width", 17 * j + "em") : b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            b.dpDiv[(h[0] != 1 || h[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            b == a.datepicker._curInst && a.datepicker._datepickerShowing && b.input && b.input.is(":visible") && !b.input.is(":disabled") && b.input[0] != document.activeElement && b.input.focus();
            if (b.yearshtml) {
                var k = b.yearshtml;
                setTimeout(function () {
                    k === b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml);
                    k = b.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (b) {
            var g = function (h) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[h] || h
                };
            return [parseFloat(g(b.css("border-left-width"))), parseFloat(g(b.css("border-top-width")))]
        },
        _checkOffset: function (b, g, h) {
            var j = b.dpDiv.outerWidth(),
                k = b.dpDiv.outerHeight(),
                q = b.input ? b.input.outerWidth() : 0,
                u = b.input ? b.input.outerHeight() : 0,
                n = document.documentElement.clientWidth + a(document).scrollLeft(),
                l = document.documentElement.clientHeight + a(document).scrollTop();
            g.left -= this._get(b, "isRTL") ? j - q : 0;
            g.left -= h && g.left == b.input.offset().left ? a(document).scrollLeft() : 0;
            g.top -= h && g.top == b.input.offset().top + u ? a(document).scrollTop() : 0;
            g.left -= Math.min(g.left, g.left + j > n && n > j ? Math.abs(g.left + j - n) : 0);
            g.top -= Math.min(g.top, g.top + k > l && l > k ? Math.abs(k + u) : 0);
            return g
        },
        _findPos: function (b) {
            for (var g = this._get(this._getInst(b), "isRTL"); b && (b.type == "hidden" || b.nodeType != 1 || a.expr.filters.hidden(b));) b = b[g ? "previousSibling" : "nextSibling"];
            b = a(b).offset();
            return [b.left, b.top]
        },
        _hideDatepicker: function (b) {
            var g = this._curInst;
            if (!(!g || b && g != a.data(b, "datepicker"))) if (this._datepickerShowing) {
                b = this._get(g, "showAnim");
                var h = this._get(g, "duration"),
                    j = function () {
                        a.datepicker._tidyDialog(g);
                        this._curInst = null
                    };
                a.effects && a.effects[b] ? g.dpDiv.hide(b, a.datepicker._get(g, "showOptions"), h, j) : g.dpDiv[b == "slideDown" ? "slideUp" : b == "fadeIn" ? "fadeOut" : "hide"](b ? h : null, j);
                b || j();
                if (b = this._get(g, "onClose")) b.apply(g.input ? g.input[0] : null, [g.input ? g.input.val() : "", g]);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (a.blockUI) {
                        a.unblockUI();
                        a("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (b) {
            b.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (b) {
            if (a.datepicker._curInst) {
                b = a(b.target);
                b[0].id != a.datepicker._mainDivId && b.parents("#" + a.datepicker._mainDivId).length == 0 && !b.hasClass(a.datepicker.markerClassName) && !b.hasClass(a.datepicker._triggerClass) && a.datepicker._datepickerShowing && !(a.datepicker._inDialog && a.blockUI) && a.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (b, g, h) {
            b = a(b);
            var j = this._getInst(b[0]);
            if (!this._isDisabledDatepicker(b[0])) {
                this._adjustInstDate(j, g + (h == "M" ? this._get(j, "showCurrentAtPos") : 0), h);
                this._updateDatepicker(j)
            }
        },
        _gotoToday: function (b) {
            b = a(b);
            var g = this._getInst(b[0]);
            if (this._get(g, "gotoCurrent") && g.currentDay) {
                g.selectedDay = g.currentDay;
                g.drawMonth = g.selectedMonth = g.currentMonth;
                g.drawYear = g.selectedYear = g.currentYear
            } else {
                var h = new Date;
                g.selectedDay = h.getDate();
                g.drawMonth = g.selectedMonth = h.getMonth();
                g.drawYear = g.selectedYear = h.getFullYear()
            }
            this._notifyChange(g);
            this._adjustDate(b)
        },
        _selectMonthYear: function (b, g, h) {
            b = a(b);
            var j = this._getInst(b[0]);
            j._selectingMonthYear = false;
            j["selected" + (h == "M" ? "Month" : "Year")] = j["draw" + (h == "M" ? "Month" : "Year")] = parseInt(g.options[g.selectedIndex].value, 10);
            this._notifyChange(j);
            this._adjustDate(b)
        },
        _clickMonthYear: function (b) {
            var g = this._getInst(a(b)[0]);
            g.input && g._selectingMonthYear && setTimeout(function () {
                g.input.focus()
            }, 0);
            g._selectingMonthYear = !g._selectingMonthYear
        },
        _selectDay: function (b, g, h, j) {
            var k = a(b);
            if (!(a(j).hasClass(this._unselectableClass) || this._isDisabledDatepicker(k[0]))) {
                k = this._getInst(k[0]);
                k.selectedDay = k.currentDay = a("a", j).html();
                k.selectedMonth = k.currentMonth = g;
                k.selectedYear = k.currentYear = h;
                this._selectDate(b, this._formatDate(k, k.currentDay, k.currentMonth, k.currentYear))
            }
        },
        _clearDate: function (b) {
            b = a(b);
            this._getInst(b[0]);
            this._selectDate(b, "")
        },
        _selectDate: function (b, g) {
            b = this._getInst(a(b)[0]);
            g = g != null ? g : this._formatDate(b);
            b.input && b.input.val(g);
            this._updateAlternate(b);
            var h = this._get(b, "onSelect");
            if (h) h.apply(b.input ? b.input[0] : null, [g, b]);
            else b.input && b.input.trigger("change");
            if (b.inline) this._updateDatepicker(b);
            else {
                this._hideDatepicker();
                this._lastInput = b.input[0];
                typeof b.input[0] != "object" && b.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (b) {
            var g = this._get(b, "altField");
            if (g) {
                var h = this._get(b, "altFormat") || this._get(b, "dateFormat"),
                    j = this._getDate(b),
                    k = this.formatDate(h, j, this._getFormatConfig(b));
                a(g).each(function () {
                    a(this).val(k)
                })
            }
        },
        noWeekends: function (b) {
            b = b.getDay();
            return [b > 0 && b < 6, ""]
        },
        iso8601Week: function (b) {
            b = new Date(b.getTime());
            b.setDate(b.getDate() + 4 - (b.getDay() || 7));
            var g = b.getTime();
            b.setMonth(0);
            b.setDate(1);
            return Math.floor(Math.round((g - b) / 864E5) / 7) + 1
        },
        parseDate: function (b, g, h) {
            if (b == null || g == null) throw "Invalid arguments";
            g = typeof g == "object" ? g.toString() : g + "";
            if (g == "") return null;
            var j = (h ? h.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            j = typeof j != "string" ? j : (new Date).getFullYear() % 100 + parseInt(j, 10);
            for (var k = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort, q = (h ? h.dayNames : null) || this._defaults.dayNames, u = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort, n = (h ? h.monthNames : null) || this._defaults.monthNames, l = h = -1, p = -1, s = -1, v = false, C = function (w) {
                    (w = z + 1 < b.length && b.charAt(z + 1) == w) && z++;
                    return w
                }, D = function (w) {
                    var x = C(w);
                    w = new RegExp("^\\d{1," + (w == "@" ? 14 : w == "!" ? 20 : w == "y" && x ? 4 : w == "o" ? 3 : 2) + "}");
                    w = g.substring(m).match(w);
                    if (!w) throw "Missing number at position " + m;
                    m += w[0].length;
                    return parseInt(w[0], 10)
                }, F = function (w, x, J) {
                    w = C(w) ? J : x;
                    for (x = 0; x < w.length; x++) if (g.substr(m, w[x].length).toLowerCase() == w[x].toLowerCase()) {
                        m += w[x].length;
                        return x + 1
                    }
                    throw "Unknown name at position " + m;
                }, o = function () {
                    if (g.charAt(m) != b.charAt(z)) throw "Unexpected literal at position " + m;
                    m++
                }, m = 0, z = 0; z < b.length; z++) if (v) if (b.charAt(z) == "'" && !C("'")) v = false;
            else o();
            else switch (b.charAt(z)) {
            case "d":
                p = D("d");
                break;
            case "D":
                F("D", k, q);
                break;
            case "o":
                s = D("o");
                break;
            case "m":
                l = D("m");
                break;
            case "M":
                l = F("M", u, n);
                break;
            case "y":
                h = D("y");
                break;
            case "@":
                var B = new Date(D("@"));
                h = B.getFullYear();
                l = B.getMonth() + 1;
                p = B.getDate();
                break;
            case "!":
                B = new Date((D("!") - this._ticksTo1970) / 1E4);
                h = B.getFullYear();
                l = B.getMonth() + 1;
                p = B.getDate();
                break;
            case "'":
                if (C("'")) o();
                else v = true;
                break;
            default:
                o()
            }
            if (h == -1) h = (new Date).getFullYear();
            else if (h < 100) h += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h <= j ? 0 : -100);
            if (s > -1) {
                l = 1;
                p = s;
                do {
                    j = this._getDaysInMonth(h, l - 1);
                    if (p <= j) break;
                    l++;
                    p -= j
                } while (1)
            }
            B = this._daylightSavingAdjust(new Date(h, l - 1, p));
            if (B.getFullYear() != h || B.getMonth() + 1 != l || B.getDate() != p) throw "Invalid date";
            return B
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function (b, g, h) {
            if (!g) return "";
            var j = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort,
                k = (h ? h.dayNames : null) || this._defaults.dayNames,
                q = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort;
            h = (h ? h.monthNames : null) || this._defaults.monthNames;
            var u = function (C) {
                    (C = v + 1 < b.length && b.charAt(v + 1) == C) && v++;
                    return C
                },
                n = function (C, D, F) {
                    D = "" + D;
                    if (u(C)) for (; D.length < F;) D = "0" + D;
                    return D
                },
                l = function (C, D, F, o) {
                    return u(C) ? o[D] : F[D]
                },
                p = "",
                s = false;
            if (g) for (var v = 0; v < b.length; v++) if (s) if (b.charAt(v) == "'" && !u("'")) s = false;
            else p += b.charAt(v);
            else switch (b.charAt(v)) {
            case "d":
                p += n("d", g.getDate(), 2);
                break;
            case "D":
                p += l("D", g.getDay(), j, k);
                break;
            case "o":
                p += n("o", (g.getTime() - (new Date(g.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
                break;
            case "m":
                p += n("m", g.getMonth() + 1, 2);
                break;
            case "M":
                p += l("M", g.getMonth(), q, h);
                break;
            case "y":
                p += u("y") ? g.getFullYear() : (g.getYear() % 100 < 10 ? "0" : "") + g.getYear() % 100;
                break;
            case "@":
                p += g.getTime();
                break;
            case "!":
                p += g.getTime() * 1E4 + this._ticksTo1970;
                break;
            case "'":
                if (u("'")) p += "'";
                else s = true;
                break;
            default:
                p += b.charAt(v)
            }
            return p
        },
        _possibleChars: function (b) {
            for (var g = "", h = false, j = function (q) {
                    (q = k + 1 < b.length && b.charAt(k + 1) == q) && k++;
                    return q
                }, k = 0; k < b.length; k++) if (h) if (b.charAt(k) == "'" && !j("'")) h = false;
            else g += b.charAt(k);
            else switch (b.charAt(k)) {
            case "d":
            case "m":
            case "y":
            case "@":
                g += "0123456789";
                break;
            case "D":
            case "M":
                return null;
            case "'":
                if (j("'")) g += "'";
                else h = true;
                break;
            default:
                g += b.charAt(k)
            }
            return g
        },
        _get: function (b, g) {
            return b.settings[g] !== c ? b.settings[g] : this._defaults[g]
        },
        _setDateFromField: function (b, g) {
            if (b.input.val() != b.lastVal) {
                var h = this._get(b, "dateFormat"),
                    j = b.lastVal = b.input ? b.input.val() : null,
                    k, q;
                k = q = this._getDefaultDate(b);
                var u = this._getFormatConfig(b);
                try {
                    k = this.parseDate(h, j, u) || q
                } catch (n) {
                    this.log(n);
                    j = g ? "" : j
                }
                b.selectedDay = k.getDate();
                b.drawMonth = b.selectedMonth = k.getMonth();
                b.drawYear = b.selectedYear = k.getFullYear();
                b.currentDay = j ? k.getDate() : 0;
                b.currentMonth = j ? k.getMonth() : 0;
                b.currentYear = j ? k.getFullYear() : 0;
                this._adjustInstDate(b)
            }
        },
        _getDefaultDate: function (b) {
            return this._restrictMinMax(b, this._determineDate(b, this._get(b, "defaultDate"), new Date))
        },
        _determineDate: function (b, g, h) {
            var j = function (q) {
                    var u = new Date;
                    u.setDate(u.getDate() + q);
                    return u
                },
                k = function (q) {
                    try {
                        return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), q, a.datepicker._getFormatConfig(b))
                    } catch (u) {}
                    var n = (q.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date,
                        l = n.getFullYear(),
                        p = n.getMonth();
                    n = n.getDate();
                    for (var s = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, v = s.exec(q); v;) {
                        switch (v[2] || "d") {
                        case "d":
                        case "D":
                            n += parseInt(v[1], 10);
                            break;
                        case "w":
                        case "W":
                            n += parseInt(v[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            p += parseInt(v[1], 10);
                            n = Math.min(n, a.datepicker._getDaysInMonth(l, p));
                            break;
                        case "y":
                        case "Y":
                            l += parseInt(v[1], 10);
                            n = Math.min(n, a.datepicker._getDaysInMonth(l, p));
                            break
                        }
                        v = s.exec(q)
                    }
                    return new Date(l, p, n)
                };
            if (g = (g = g == null || g === "" ? h : typeof g == "string" ? k(g) : typeof g == "number" ? isNaN(g) ? h : j(g) : new Date(g.getTime())) && g.toString() == "Invalid Date" ? h : g) {
                g.setHours(0);
                g.setMinutes(0);
                g.setSeconds(0);
                g.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(g)
        },
        _daylightSavingAdjust: function (b) {
            if (!b) return null;
            b.setHours(b.getHours() > 12 ? b.getHours() + 2 : 0);
            return b
        },
        _setDate: function (b, g, h) {
            var j = !g,
                k = b.selectedMonth,
                q = b.selectedYear;
            g = this._restrictMinMax(b, this._determineDate(b, g, new Date));
            b.selectedDay = b.currentDay = g.getDate();
            b.drawMonth = b.selectedMonth = b.currentMonth = g.getMonth();
            b.drawYear = b.selectedYear = b.currentYear = g.getFullYear();
            if ((k != b.selectedMonth || q != b.selectedYear) && !h) this._notifyChange(b);
            this._adjustInstDate(b);
            if (b.input) b.input.val(j ? "" : this._formatDate(b))
        },
        _getDate: function (b) {

            return !b.currentYear || b.input && b.input.val() == "" ? null : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay))
        },
        _generateHTML: function (b) {
            var g = new Date;
            g = this._daylightSavingAdjust(new Date(g.getFullYear(), g.getMonth(), g.getDate()));
            var h = this._get(b, "isRTL"),
                j = this._get(b, "showButtonPanel"),
                k = this._get(b, "hideIfNoPrevNext"),
                q = this._get(b, "navigationAsDateFormat"),
                u = this._getNumberOfMonths(b),
                n = this._get(b, "showCurrentAtPos"),
                l = this._get(b, "stepMonths"),
                p = u[0] != 1 || u[1] != 1,
                s = this._daylightSavingAdjust(!b.currentDay ? new Date(9999, 9, 9) : new Date(b.currentYear, b.currentMonth, b.currentDay)),
                v = this._getMinMaxDate(b, "min"),
                C = this._getMinMaxDate(b, "max");
            n = b.drawMonth - n;
            var D = b.drawYear;
            if (n < 0) {
                n += 12;
                D--
            }
            if (C) {
                var F = this._daylightSavingAdjust(new Date(C.getFullYear(), C.getMonth() - u[0] * u[1] + 1, C.getDate()));
                for (F = v && F < v ? v : F; this._daylightSavingAdjust(new Date(D, n, 1)) > F;) {
                    n--;
                    if (n < 0) {
                        n = 11;
                        D--
                    }
                }
            }
            b.drawMonth = n;
            b.drawYear = D;
            F = this._get(b, "prevText");
            F = !q ? F : this.formatDate(F, this._daylightSavingAdjust(new Date(D, n - l, 1)), this._getFormatConfig(b));
            F = this._canAdjustMonth(b, -1, D, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + b.id + "', -" + l + ", 'M');\" title=\"" + F + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + F + "</span></a>" : k ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + F + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + F + "</span></a>";
            var o = this._get(b, "nextText");
            o = !q ? o : this.formatDate(o, this._daylightSavingAdjust(new Date(D, n + l, 1)), this._getFormatConfig(b));
            k = this._canAdjustMonth(b, +1, D, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + b.id + "', +" + l + ", 'M');\" title=\"" + o + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + o + "</span></a>" : k ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + o + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + o + "</span></a>";
            l = this._get(b, "currentText");
            o = this._get(b, "gotoCurrent") && b.currentDay ? s : g;
            l = !q ? l : this.formatDate(l, o, this._getFormatConfig(b));
            q = !b.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + f + '.datepicker._hideDatepicker();">' + this._get(b, "closeText") + "</button>" : "";
            j = j ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (h ? q : "") + (this._isInRange(b, o) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._gotoToday('#" + b.id + "');\">" + l + "</button>" : "") + (h ? "" : q) + "</div>" : "";
            q = parseInt(this._get(b, "firstDay"), 10);
            q = isNaN(q) ? 0 : q;
            l = this._get(b, "showWeek");
            o = this._get(b, "dayNames");
            this._get(b, "dayNamesShort");
            var m = this._get(b, "dayNamesMin"),
                z = this._get(b, "monthNames"),
                B = this._get(b, "monthNamesShort"),
                w = this._get(b, "beforeShowDay"),
                x = this._get(b, "showOtherMonths"),
                J = this._get(b, "selectOtherMonths");
            this._get(b, "calculateWeek");
            for (var K = this._getDefaultDate(b), L = "", N = 0; N < u[0]; N++) {
                for (var O = "", r = 0; r < u[1]; r++) {
                    var y = this._daylightSavingAdjust(new Date(D, n, b.selectedDay)),
                        A = " ui-corner-all",
                        E = "";
                    if (p) {
                        E += '<div class="ui-datepicker-group';
                        if (u[1] > 1) switch (r) {
                        case 0:
                            E += " ui-datepicker-group-first";
                            A = " ui-corner-" + (h ? "right" : "left");
                            break;
                        case u[1] - 1:
                            E += " ui-datepicker-group-last";
                            A = " ui-corner-" + (h ? "left" : "right");
                            break;
                        default:
                            E += " ui-datepicker-group-middle";
                            A = "";
                            break
                        }
                        E += '">'
                    }
                    E += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + A + '">' + (/all|left/.test(A) && N == 0 ? h ? k : F : "") + (/all|right/.test(A) && N == 0 ? h ? F : k : "") + this._generateMonthYearHeader(b, n, D, v, C, N > 0 || r > 0, z, B) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var G = l ? '<th class="ui-datepicker-week-col">' + this._get(b, "weekHeader") + "</th>" : "";
                    for (A = 0; A < 7; A++) {
                        var H = (A + q) % 7;
                        G += "<th" + ((A + q + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + o[H] + '">' + m[H] + "</span></th>"
                    }
                    E += G + "</tr></thead><tbody>";
                    G = this._getDaysInMonth(D, n);
                    if (D == b.selectedYear && n == b.selectedMonth) b.selectedDay = Math.min(b.selectedDay, G);
                    A = (this._getFirstDayOfMonth(D, n) - q + 7) % 7;
                    G = p ? 6 : Math.ceil((A + G) / 7);
                    H = this._daylightSavingAdjust(new Date(D, n, 1 - A));
                    for (var I = 0; I < G; I++) {
                        E += "<tr>";
                        var M = !l ? "" : '<td class="ui-datepicker-week-col">' + this._get(b, "calculateWeek")(H) + "</td>";
                        for (A = 0; A < 7; A++) {
                            var P = w ? w.apply(b.input ? b.input[0] : null, [H]) : [true, ""],
                                Q = H.getMonth() != n,
                                R = Q && !J || !P[0] || v && H < v || C && H > C;
                            M += '<td class="' + ((A + q + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Q ? " ui-datepicker-other-month" : "") + (H.getTime() == y.getTime() && n == b.selectedMonth && b._keyEvent || K.getTime() == H.getTime() && K.getTime() == y.getTime() ? " " + this._dayOverClass : "") + (R ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Q && !x ? "" : " " + P[1] + (H.getTime() == s.getTime() ? " " + this._currentClass : "") + (H.getTime() == g.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!Q || x) && P[2] ? ' title="' + P[2] + '"' : "") + (R ? "" : ' onclick="DP_jQuery_' + f + ".datepicker._selectDay('#" + b.id + "'," + H.getMonth() + "," + H.getFullYear() + ', this);return false;"') + ">" + (Q && !x ? "&#xa0;" : R ? '<span class="ui-state-default">' + H.getDate() + "</span>" : '<a class="ui-state-default' + (H.getTime() == g.getTime() ? " ui-state-highlight" : "") + (H.getTime() == s.getTime() ? " ui-state-active" : "") + (Q ? " ui-priority-secondary" : "") + '" href="#">' + H.getDate() + "</a>") + "</td>";
                            H.setDate(H.getDate() + 1);
                            H = this._daylightSavingAdjust(H)
                        }
                        E += M + "</tr>"
                    }
                    n++;
                    if (n > 11) {
                        n = 0;
                        D++
                    }
                    E += "</tbody></table>" + (p ? "</div>" + (u[0] > 0 && r == u[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    O += E
                }
                L += O
            }
            L += j + (a.browser.msie && parseInt(a.browser.version, 10) < 7 && !b.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            b._keyEvent = false;
            return L
        },
        _generateMonthYearHeader: function (b, g, h, j, k, q, u, n) {
            var l = this._get(b, "changeMonth"),
                p = this._get(b, "changeYear"),
                s = this._get(b, "showMonthAfterYear"),
                v = '<div class="ui-datepicker-title">',
                C = "";
            if (q || !l) C += '<span class="ui-datepicker-month">' + u[g] + "</span>";
            else {
                u = j && j.getFullYear() == h;
                var D = k && k.getFullYear() == h;
                C += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + b.id + "', this, 'M');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + b.id + "');\">";
                for (var F = 0; F < 12; F++) if ((!u || F >= j.getMonth()) && (!D || F <= k.getMonth())) C += '<option value="' + F + '"' + (F == g ? ' selected="selected"' : "") + ">" + n[F] + "</option>";
                C += "</select>"
            }
            s || (v += C + (q || !(l && p) ? "&#xa0;" : ""));
            b.yearshtml = "";
            if (q || !p) v += '<span class="ui-datepicker-year">' + h + "</span>";
            else {
                n = this._get(b, "yearRange").split(":");
                var o = (new Date).getFullYear();
                u = function (m) {
                    m = m.match(/c[+-].*/) ? h + parseInt(m.substring(1), 10) : m.match(/[+-].*/) ? o + parseInt(m, 10) : parseInt(m, 10);
                    return isNaN(m) ? o : m
                };
                g = u(n[0]);
                n = Math.max(g, u(n[1] || ""));
                g = j ? Math.max(g, j.getFullYear()) : g;
                n = k ? Math.min(n, k.getFullYear()) : n;
                for (b.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + b.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + b.id + "');\">"; g <= n; g++) b.yearshtml += '<option value="' + g + '"' + (g == h ? ' selected="selected"' : "") + ">" + g + "</option>";
                b.yearshtml += "</select>";
                if (a.browser.mozilla) v += '<select class="ui-datepicker-year"><option value="' + h + '" selected="selected">' + h + "</option></select>";
                else {
                    v += b.yearshtml;
                    b.yearshtml = null
                }
            }
            v += this._get(b, "yearSuffix");
            if (s) v += (q || !(l && p) ? "&#xa0;" : "") + C;
            v += "</div>";
            return v
        },
        _adjustInstDate: function (b, g, h) {
            var j = b.drawYear + (h == "Y" ? g : 0),
                k = b.drawMonth + (h == "M" ? g : 0);
            g = Math.min(b.selectedDay, this._getDaysInMonth(j, k)) + (h == "D" ? g : 0);
            j = this._restrictMinMax(b, this._daylightSavingAdjust(new Date(j, k, g)));
            b.selectedDay = j.getDate();
            b.drawMonth = b.selectedMonth = j.getMonth();
            b.drawYear = b.selectedYear = j.getFullYear();
            if (h == "M" || h == "Y") this._notifyChange(b)
        },
        _restrictMinMax: function (b, g) {
            var h = this._getMinMaxDate(b, "min");
            b = this._getMinMaxDate(b, "max");
            g = h && g < h ? h : g;
            return b && g > b ? b : g
        },
        _notifyChange: function (b) {
            var g = this._get(b, "onChangeMonthYear");
            if (g) g.apply(b.input ? b.input[0] : null, [b.selectedYear, b.selectedMonth + 1, b])
        },
        _getNumberOfMonths: function (b) {
            b = this._get(b, "numberOfMonths");
            return b == null ? [1, 1] : typeof b == "number" ? [1, b] : b
        },
        _getMinMaxDate: function (b, g) {
            return this._determineDate(b, this._get(b, g + "Date"), null)
        },
        _getDaysInMonth: function (b, g) {
            return 32 - this._daylightSavingAdjust(new Date(b, g, 32)).getDate()
        },
        _getFirstDayOfMonth: function (b, g) {
            return (new Date(b, g, 1)).getDay()
        },
        _canAdjustMonth: function (b, g, h, j) {
            var k = this._getNumberOfMonths(b);
            h = this._daylightSavingAdjust(new Date(h, j + (g < 0 ? g : k[0] * k[1]), 1));
            g < 0 && h.setDate(this._getDaysInMonth(h.getFullYear(), h.getMonth()));
            return this._isInRange(b, h)
        },
        _isInRange: function (b, g) {
            var h = this._getMinMaxDate(b, "min");
            b = this._getMinMaxDate(b, "max");
            return (!h || g.getTime() >= h.getTime()) && (!b || g.getTime() <= b.getTime())
        },
        _getFormatConfig: function (b) {
            var g = this._get(b, "shortYearCutoff");
            g = typeof g != "string" ? g : (new Date).getFullYear() % 100 + parseInt(g, 10);
            return {
                shortYearCutoff: g,
                dayNamesShort: this._get(b, "dayNamesShort"),
                dayNames: this._get(b, "dayNames"),
                monthNamesShort: this._get(b, "monthNamesShort"),
                monthNames: this._get(b, "monthNames")
            }
        },
        _formatDate: function (b, g, h, j) {
            if (!g) {
                b.currentDay = b.selectedDay;
                b.currentMonth = b.selectedMonth;
                b.currentYear = b.selectedYear
            }
            g = g ? typeof g == "object" ? g : this._daylightSavingAdjust(new Date(j, h, g)) : this._daylightSavingAdjust(new Date(b.currentYear, b.currentMonth, b.currentDay));
            return this.formatDate(this._get(b, "dateFormat"), g, this._getFormatConfig(b))
        }
    });
    a.fn.datepicker = function (b) {
        if (!this.length) return this;
        if (!a.datepicker.initialized) {
            a(document).mousedown(a.datepicker._checkExternalClick).find("body").append(a.datepicker.dpDiv);
            a.datepicker.initialized = true
        }
        var g = Array.prototype.slice.call(arguments, 1);
        if (typeof b == "string" && (b == "isDisabled" || b == "getDate" || b == "widget")) return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(g));
        if (b == "option" && arguments.length == 2 && typeof arguments[1] == "string") return a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(g));
        return this.each(function () {
            typeof b == "string" ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(g)) : a.datepicker._attachDatepicker(this, b)
        })
    };
    a.datepicker = new d;
    a.datepicker.initialized = false;
    a.datepicker.uuid = (new Date).getTime();
    a.datepicker.version = "1.8.11";
    window["DP_jQuery_" + f] = a
})(jQuery);
(function (a, c) {
    a.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            a.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function (d) {
            if (d === c) return this._value();
            this._setOption("value", d);
            return this
        },
        _setOption: function (d, e) {
            if (d === "value") {
                this.options.value = e;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function () {
            var d = this.options.value;
            if (typeof d !== "number") d = 0;
            return Math.min(this.options.max, Math.max(this.min, d))
        },
        _percentage: function () {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function () {
            var d = this.value(),
                e = this._percentage();
            if (this.oldValue !== d) {
                this.oldValue = d;
                this._trigger("change")
            }
            this.valueDiv.toggleClass("ui-corner-right", d === this.options.max).width(e.toFixed(0) + "%");
            this.element.attr("aria-valuenow", d)
        }
    });
    a.extend(a.ui.progressbar, {
        version: "1.8.11"
    })
})(jQuery);
jQuery.effects ||
function (a, c) {
    function d(n) {
        var l;
        if (n && n.constructor == Array && n.length == 3) return n;
        if (l = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n)) return [parseInt(l[1], 10), parseInt(l[2], 10), parseInt(l[3], 10)];
        if (l = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n)) return [parseFloat(l[1]) * 2.55, parseFloat(l[2]) * 2.55, parseFloat(l[3]) * 2.55];
        if (l = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n)) return [parseInt(l[1], 16), parseInt(l[2], 16), parseInt(l[3], 16)];
        if (l = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n)) return [parseInt(l[1] + l[1], 16), parseInt(l[2] + l[2], 16), parseInt(l[3] + l[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(n)) return k.transparent;
        return k[a.trim(n).toLowerCase()]
    }
    function e(n, l) {
        var p;
        do {
            p = a.curCSS(n, l);
            if (p != "" && p != "transparent" || a.nodeName(n, "body")) break;
            l = "backgroundColor"
        } while (n = n.parentNode);
        return d(p)
    }
    function f() {
        var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            l = {},
            p, s;
        if (n && n.length && n[0] && n[n[0]]) for (var v = n.length; v--;) {
            p = n[v];
            if (typeof n[p] == "string") {
                s = p.replace(/\-(\w)/g, function (C, D) {
                    return D.toUpperCase()
                });
                l[s] = n[p]
            }
        } else for (p in n) if (typeof n[p] === "string") l[p] = n[p];
        return l
    }
    function b(n) {
        var l, p;
        for (l in n) {
            p = n[l];
            if (p == null || a.isFunction(p) || l in u || /scrollbar/.test(l) || !/color/i.test(l) && isNaN(parseFloat(p))) delete n[l]
        }
        return n
    }
    function g(n, l) {
        var p = {
            _: 0
        },
            s;
        for (s in l) if (n[s] != l[s]) p[s] = l[s];
        return p
    }
    function h(n, l, p, s) {
        if (typeof n == "object") {
            s = l;
            p = null;
            l = n;
            n = l.effect
        }
        if (a.isFunction(l)) {
            s = l;
            p = null;
            l = {}
        }
        if (typeof l == "number" || a.fx.speeds[l]) {
            s = p;
            p = l;
            l = {}
        }
        if (a.isFunction(p)) {
            s = p;
            p = null
        }
        l = l || {};
        p = p || l.duration;
        p = a.fx.off ? 0 : typeof p == "number" ? p : p in a.fx.speeds ? a.fx.speeds[p] : a.fx.speeds._default;
        s = s || l.complete;
        return [n, l, p, s]
    }
    function j(n) {
        if (!n || typeof n === "number" || a.fx.speeds[n]) return true;
        if (typeof n === "string" && !a.effects[n]) return true;
        return false
    }
    a.effects = {};
    a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (n, l) {
        a.fx.step[l] = function (p) {
            if (!p.colorInit) {
                p.start = e(p.elem, l);
                p.end = d(p.end);
                p.colorInit = true
            }
            p.elem.style[l] = "rgb(" + Math.max(Math.min(parseInt(p.pos * (p.end[0] - p.start[0]) + p.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(p.pos * (p.end[1] - p.start[1]) + p.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(p.pos * (p.end[2] - p.start[2]) + p.start[2], 10), 255), 0) + ")"
        }
    });
    var k = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
        q = ["add", "remove", "toggle"],
        u = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    a.effects.animateClass = function (n, l, p, s) {
        if (a.isFunction(p)) {
            s = p;
            p = null
        }
        return this.queue("fx", function () {
            var v = a(this),
                C = v.attr("style") || " ",
                D = b(f.call(this)),
                F, o = v.attr("className");
            a.each(q, function (m, z) {
                n[z] && v[z + "Class"](n[z])
            });
            F = b(f.call(this));
            v.attr("className", o);
            v.animate(g(D, F), l, p, function () {
                a.each(q, function (m, z) {
                    n[z] && v[z + "Class"](n[z])
                });
                if (typeof v.attr("style") == "object") {
                    v.attr("style").cssText = "";
                    v.attr("style").cssText = C
                } else v.attr("style", C);
                s && s.apply(this, arguments)
            });
            D = a.queue(this);
            F = D.splice(D.length - 1, 1)[0];
            D.splice(1, 0, F);
            a.dequeue(this)
        })
    };
    a.fn.extend({
        _addClass: a.fn.addClass,
        addClass: function (n, l, p, s) {
            return l ? a.effects.animateClass.apply(this, [{
                add: n
            },
            l, p, s]) : this._addClass(n)
        },
        _removeClass: a.fn.removeClass,
        removeClass: function (n, l, p, s) {
            return l ? a.effects.animateClass.apply(this, [{
                remove: n
            },
            l, p, s]) : this._removeClass(n)
        },
        _toggleClass: a.fn.toggleClass,
        toggleClass: function (n, l, p, s, v) {
            return typeof l == "boolean" || l === c ? p ? a.effects.animateClass.apply(this, [l ? {
                add: n
            } : {
                remove: n
            },
            p, s, v]) : this._toggleClass(n, l) : a.effects.animateClass.apply(this, [{
                toggle: n
            },
            l, p, s])
        },
        switchClass: function (n, l, p, s, v) {
            return a.effects.animateClass.apply(this, [{
                add: l,
                remove: n
            },
            p, s, v])
        }
    });
    a.extend(a.effects, {
        version: "1.8.11",
        save: function (n, l) {
            for (var p = 0; p < l.length; p++) l[p] !== null && n.data("ec.storage." + l[p], n[0].style[l[p]])
        },
        restore: function (n, l) {
            for (var p = 0; p < l.length; p++) l[p] !== null && n.css(l[p], n.data("ec.storage." + l[p]))
        },
        setMode: function (n, l) {
            if (l == "toggle") l = n.is(":hidden") ? "show" : "hide";
            return l
        },
        getBaseline: function (n, l) {
            var p;
            switch (n[0]) {
            case "top":
                p = 0;
                break;
            case "middle":
                p = 0.5;
                break;
            case "bottom":
                p = 1;
                break;
            default:
                p = n[0] / l.height
            }
            switch (n[1]) {
            case "left":
                n = 0;
                break;
            case "center":
                n = 0.5;
                break;
            case "right":
                n = 1;
                break;
            default:
                n = n[1] / l.width
            }
            return {
                x: n,
                y: p
            }
        },
        createWrapper: function (n) {
            if (n.parent().is(".ui-effects-wrapper")) return n.parent();
            var l = {
                width: n.outerWidth(true),
                height: n.outerHeight(true),
                "float": n.css("float")
            },
                p = a("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                });
            n.wrap(p);
            p = n.parent();
            if (n.css("position") == "static") {
                p.css({
                    position: "relative"
                });
                n.css({
                    position: "relative"
                })
            } else {
                a.extend(l, {
                    position: n.css("position"),
                    zIndex: n.css("z-index")
                });
                a.each(["top", "left", "bottom", "right"], function (s, v) {
                    l[v] = n.css(v);
                    if (isNaN(parseInt(l[v], 10))) l[v] = "auto"
                });
                n.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return p.css(l).show()
        },
        removeWrapper: function (n) {
            if (n.parent().is(".ui-effects-wrapper")) return n.parent().replaceWith(n);
            return n
        },
        setTransition: function (n, l, p, s) {
            s = s || {};
            a.each(l, function (v, C) {
                unit = n.cssUnit(C);
                if (unit[0] > 0) s[C] = unit[0] * p + unit[1]
            });
            return s
        }
    });
    a.fn.extend({
        effect: function (n) {
            var l = h.apply(this, arguments),
                p = {
                    options: l[1],
                    duration: l[2],
                    callback: l[3]
                };
            l = p.options.mode;
            var s = a.effects[n];
            if (a.fx.off || !s) return l ? this[l](p.duration, p.callback) : this.each(function () {
                p.callback && p.callback.call(this)
            });
            return s.call(this, p)
        },
        _show: a.fn.show,
        show: function (n) {
            if (j(n)) return this._show.apply(this, arguments);
            else {
                var l = h.apply(this, arguments);
                l[1].mode = "show";
                return this.effect.apply(this, l)
            }
        },
        _hide: a.fn.hide,
        hide: function (n) {
            if (j(n)) return this._hide.apply(this, arguments);
            else {
                var l = h.apply(this, arguments);
                l[1].mode = "hide";
                return this.effect.apply(this, l)
            }
        },
        __toggle: a.fn.toggle,
        toggle: function (n) {
            if (j(n) || typeof n === "boolean" || a.isFunction(n)) return this.__toggle.apply(this, arguments);
            else {
                var l = h.apply(this, arguments);
                l[1].mode = "toggle";
                return this.effect.apply(this, l)
            }
        },
        cssUnit: function (n) {
            var l = this.css(n),
                p = [];
            a.each(["em", "px", "%", "pt"], function (s, v) {
                if (l.indexOf(v) > 0) p = [parseFloat(l), v]
            });
            return p
        }
    });
    a.easing.jswing = a.easing.swing;
    a.extend(a.easing, {
        def: "easeOutQuad",
        swing: function (n, l, p, s, v) {
            return a.easing[a.easing.def](n, l, p, s, v)
        },
        easeInQuad: function (n, l, p, s, v) {
            return s * (l /= v) * l + p
        },
        easeOutQuad: function (n, l, p, s, v) {
            return -s * (l /= v) * (l - 2) + p
        },
        easeInOutQuad: function (n, l, p, s, v) {
            if ((l /= v / 2) < 1) return s / 2 * l * l + p;
            return -s / 2 * (--l * (l - 2) - 1) + p
        },
        easeInCubic: function (n, l, p, s, v) {
            return s * (l /= v) * l * l + p
        },
        easeOutCubic: function (n, l, p, s, v) {
            return s * ((l = l / v - 1) * l * l + 1) + p
        },
        easeInOutCubic: function (n, l, p, s, v) {
            if ((l /= v / 2) < 1) return s / 2 * l * l * l + p;
            return s / 2 * ((l -= 2) * l * l + 2) + p
        },
        easeInQuart: function (n, l, p, s, v) {
            return s * (l /= v) * l * l * l + p
        },
        easeOutQuart: function (n, l, p, s, v) {
            return -s * ((l = l / v - 1) * l * l * l - 1) + p
        },
        easeInOutQuart: function (n, l, p, s, v) {
            if ((l /= v / 2) < 1) return s / 2 * l * l * l * l + p;
            return -s / 2 * ((l -= 2) * l * l * l - 2) + p
        },
        easeInQuint: function (n, l, p, s, v) {
            return s * (l /= v) * l * l * l * l + p
        },
        easeOutQuint: function (n, l, p, s, v) {
            return s * ((l = l / v - 1) * l * l * l * l + 1) + p
        },
        easeInOutQuint: function (n, l, p, s, v) {
            if ((l /= v / 2) < 1) return s / 2 * l * l * l * l * l + p;
            return s / 2 * ((l -= 2) * l * l * l * l + 2) + p
        },
        easeInSine: function (n, l, p, s, v) {
            return -s * Math.cos(l / v * (Math.PI / 2)) + s + p
        },
        easeOutSine: function (n, l, p, s, v) {
            return s * Math.sin(l / v * (Math.PI / 2)) + p
        },
        easeInOutSine: function (n, l, p, s, v) {
            return -s / 2 * (Math.cos(Math.PI * l / v) - 1) + p
        },
        easeInExpo: function (n, l, p, s, v) {
            return l == 0 ? p : s * Math.pow(2, 10 * (l / v - 1)) + p
        },
        easeOutExpo: function (n, l, p, s, v) {
            return l == v ? p + s : s * (-Math.pow(2, -10 * l / v) + 1) + p
        },
        easeInOutExpo: function (n, l, p, s, v) {
            if (l == 0) return p;
            if (l == v) return p + s;
            if ((l /= v / 2) < 1) return s / 2 * Math.pow(2, 10 * (l - 1)) + p;
            return s / 2 * (-Math.pow(2, -10 * --l) + 2) + p
        },
        easeInCirc: function (n, l, p, s, v) {
            return -s * (Math.sqrt(1 - (l /= v) * l) - 1) + p
        },
        easeOutCirc: function (n, l, p, s, v) {
            return s * Math.sqrt(1 - (l = l / v - 1) * l) + p
        },
        easeInOutCirc: function (n, l, p, s, v) {
            if ((l /= v / 2) < 1) return -s / 2 * (Math.sqrt(1 - l * l) - 1) + p;
            return s / 2 * (Math.sqrt(1 - (l -= 2) * l) + 1) + p
        },
        easeInElastic: function (n, l, p, s, v) {
            var C = 0,
                D = s;
            if (l == 0) return p;
            if ((l /= v) == 1) return p + s;
            C || (C = v * 0.3);
            if (D < Math.abs(s)) {
                D = s;
                n = C / 4
            } else n = C / (2 * Math.PI) * Math.asin(s / D);
            return -(D * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * v - n) * 2 * Math.PI / C)) + p
        },
        easeOutElastic: function (n, l, p, s, v) {
            var C = 0,
                D = s;
            if (l == 0) return p;
            if ((l /= v) == 1) return p + s;
            C || (C = v * 0.3);
            if (D < Math.abs(s)) {
                D = s;
                n = C / 4
            } else n = C / (2 * Math.PI) * Math.asin(s / D);
            return D * Math.pow(2, -10 * l) * Math.sin((l * v - n) * 2 * Math.PI / C) + s + p
        },
        easeInOutElastic: function (n, l, p, s, v) {
            var C = 0,
                D = s;
            if (l == 0) return p;
            if ((l /= v / 2) == 2) return p + s;
            C || (C = v * 0.3 * 1.5);
            if (D < Math.abs(s)) {
                D = s;
                n = C / 4
            } else n = C / (2 * Math.PI) * Math.asin(s / D);
            if (l < 1) return -0.5 * D * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * v - n) * 2 * Math.PI / C) + p;
            return D * Math.pow(2, -10 * (l -= 1)) * Math.sin((l * v - n) * 2 * Math.PI / C) * 0.5 + s + p
        },
        easeInBack: function (n, l, p, s, v, C) {
            if (C == c) C = 1.70158;
            return s * (l /= v) * l * ((C + 1) * l - C) + p
        },
        easeOutBack: function (n, l, p, s, v, C) {
            if (C == c) C = 1.70158;
            return s * ((l = l / v - 1) * l * ((C + 1) * l + C) + 1) + p
        },
        easeInOutBack: function (n, l, p, s, v, C) {
            if (C == c) C = 1.70158;
            if ((l /= v / 2) < 1) return s / 2 * l * l * (((C *= 1.525) + 1) * l - C) + p;
            return s / 2 * ((l -= 2) * l * (((C *= 1.525) + 1) * l + C) + 2) + p
        },
        easeInBounce: function (n, l, p, s, v) {
            return s - a.easing.easeOutBounce(n, v - l, 0, s, v) + p
        },
        easeOutBounce: function (n, l, p, s, v) {
            return (l /= v) < 1 / 2.75 ? s * 7.5625 * l * l + p : l < 2 / 2.75 ? s * (7.5625 * (l -= 1.5 / 2.75) * l + 0.75) + p : l < 2.5 / 2.75 ? s * (7.5625 * (l -= 2.25 / 2.75) * l + 0.9375) + p : s * (7.5625 * (l -= 2.625 / 2.75) * l + 0.984375) + p
        },
        easeInOutBounce: function (n, l, p, s, v) {
            if (l < v / 2) return a.easing.easeInBounce(n, l * 2, 0, s, v) * 0.5 + p;
            return a.easing.easeOutBounce(n, l * 2 - v, 0, s, v) * 0.5 + s * 0.5 + p
        }
    })
}(jQuery);
(function (a) {
    a.effects.blind = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right"],
                f = a.effects.setMode(d, c.options.mode || "hide"),
                b = c.options.direction || "vertical";
            a.effects.save(d, e);
            d.show();
            var g = a.effects.createWrapper(d).css({
                overflow: "hidden"
            }),
                h = b == "vertical" ? "height" : "width";
            b = b == "vertical" ? g.height() : g.width();
            f == "show" && g.css(h, 0);
            var j = {};
            j[h] = f == "show" ? b : 0;
            g.animate(j, c.duration, c.options.easing, function () {
                f == "hide" && d.hide();
                a.effects.restore(d, e);
                a.effects.removeWrapper(d);
                c.callback && c.callback.apply(d[0], arguments);
                d.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.bounce = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right"],
                f = a.effects.setMode(d, c.options.mode || "effect"),
                b = c.options.direction || "up",
                g = c.options.distance || 20,
                h = c.options.times || 5,
                j = c.duration || 250;
            /show|hide/.test(f) && e.push("opacity");
            a.effects.save(d, e);
            d.show();
            a.effects.createWrapper(d);
            var k = b == "up" || b == "down" ? "top" : "left";
            b = b == "up" || b == "left" ? "pos" : "neg";
            g = c.options.distance || (k == "top" ? d.outerHeight({
                margin: true
            }) / 3 : d.outerWidth({
                margin: true
            }) / 3);
            if (f == "show") d.css("opacity", 0).css(k, b == "pos" ? -g : g);
            if (f == "hide") g /= h * 2;
            f != "hide" && h--;
            if (f == "show") {
                var q = {
                    opacity: 1
                };
                q[k] = (b == "pos" ? "+=" : "-=") + g;
                d.animate(q, j / 2, c.options.easing);
                g /= 2;
                h--
            }
            for (q = 0; q < h; q++) {
                var u = {},
                    n = {};
                u[k] = (b == "pos" ? "-=" : "+=") + g;
                n[k] = (b == "pos" ? "+=" : "-=") + g;
                d.animate(u, j / 2, c.options.easing).animate(n, j / 2, c.options.easing);
                g = f == "hide" ? g * 2 : g / 2
            }
            if (f == "hide") {
                q = {
                    opacity: 0
                };
                q[k] = (b == "pos" ? "-=" : "+=") + g;
                d.animate(q, j / 2, c.options.easing, function () {
                    d.hide();
                    a.effects.restore(d, e);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(this, arguments)
                })
            } else {
                u = {};
                n = {};
                u[k] = (b == "pos" ? "-=" : "+=") + g;
                n[k] = (b == "pos" ? "+=" : "-=") + g;
                d.animate(u, j / 2, c.options.easing).animate(n, j / 2, c.options.easing, function () {
                    a.effects.restore(d, e);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(this, arguments)
                })
            }
            d.queue("fx", function () {
                d.dequeue()
            });
            d.dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.clip = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right", "height", "width"],
                f = a.effects.setMode(d, c.options.mode || "hide"),
                b = c.options.direction || "vertical";
            a.effects.save(d, e);
            d.show();
            var g = a.effects.createWrapper(d).css({
                overflow: "hidden"
            });
            g = d[0].tagName == "IMG" ? g : d;
            var h = {
                size: b == "vertical" ? "height" : "width",
                position: b == "vertical" ? "top" : "left"
            };
            b = b == "vertical" ? g.height() : g.width();
            if (f == "show") {
                g.css(h.size, 0);
                g.css(h.position, b / 2)
            }
            var j = {};
            j[h.size] = f == "show" ? b : 0;
            j[h.position] = f == "show" ? 0 : b / 2;
            g.animate(j, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    f == "hide" && d.hide();
                    a.effects.restore(d, e);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(d[0], arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.drop = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right", "opacity"],
                f = a.effects.setMode(d, c.options.mode || "hide"),
                b = c.options.direction || "left";
            a.effects.save(d, e);
            d.show();
            a.effects.createWrapper(d);
            var g = b == "up" || b == "down" ? "top" : "left";
            b = b == "up" || b == "left" ? "pos" : "neg";
            var h = c.options.distance || (g == "top" ? d.outerHeight({
                margin: true
            }) / 2 : d.outerWidth({
                margin: true
            }) / 2);
            if (f == "show") d.css("opacity", 0).css(g, b == "pos" ? -h : h);
            var j = {
                opacity: f == "show" ? 1 : 0
            };
            j[g] = (f == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + h;
            d.animate(j, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    f == "hide" && d.hide();
                    a.effects.restore(d, e);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(this, arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.explode = function (c) {
        return this.queue(function () {
            var d = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3,
                e = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            c.options.mode = c.options.mode == "toggle" ? a(this).is(":visible") ? "hide" : "show" : c.options.mode;
            var f = a(this).show().css("visibility", "hidden"),
                b = f.offset();
            b.top -= parseInt(f.css("marginTop"), 10) || 0;
            b.left -= parseInt(f.css("marginLeft"), 10) || 0;
            for (var g = f.outerWidth(true), h = f.outerHeight(true), j = 0; j < d; j++) for (var k = 0; k < e; k++) f.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",

                visibility: "visible",
                left: -k * (g / e),
                top: -j * (h / d)
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: g / e,
                height: h / d,
                left: b.left + k * (g / e) + (c.options.mode == "show" ? (k - Math.floor(e / 2)) * (g / e) : 0),
                top: b.top + j * (h / d) + (c.options.mode == "show" ? (j - Math.floor(d / 2)) * (h / d) : 0),
                opacity: c.options.mode == "show" ? 0 : 1
            }).animate({
                left: b.left + k * (g / e) + (c.options.mode == "show" ? 0 : (k - Math.floor(e / 2)) * (g / e)),
                top: b.top + j * (h / d) + (c.options.mode == "show" ? 0 : (j - Math.floor(d / 2)) * (h / d)),
                opacity: c.options.mode == "show" ? 1 : 0
            }, c.duration || 500);
            setTimeout(function () {
                c.options.mode == "show" ? f.css({
                    visibility: "visible"
                }) : f.css({
                    visibility: "visible"
                }).hide();
                c.callback && c.callback.apply(f[0]);
                f.dequeue();
                a("div.ui-effects-explode").remove()
            }, c.duration || 500)
        })
    }
})(jQuery);
(function (a) {
    a.effects.fade = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = a.effects.setMode(d, c.options.mode || "hide");
            d.animate({
                opacity: e
            }, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    c.callback && c.callback.apply(this, arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.fold = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right"],
                f = a.effects.setMode(d, c.options.mode || "hide"),
                b = c.options.size || 15,
                g = !! c.options.horizFirst,
                h = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(d, e);
            d.show();
            var j = a.effects.createWrapper(d).css({
                overflow: "hidden"
            }),
                k = f == "show" != g,
                q = k ? ["width", "height"] : ["height", "width"];
            k = k ? [j.width(), j.height()] : [j.height(), j.width()];
            var u = /([0-9]+)%/.exec(b);
            if (u) b = parseInt(u[1], 10) / 100 * k[f == "hide" ? 0 : 1];
            if (f == "show") j.css(g ? {
                height: 0,
                width: b
            } : {
                height: b,
                width: 0
            });
            g = {};
            u = {};
            g[q[0]] = f == "show" ? k[0] : b;
            u[q[1]] = f == "show" ? k[1] : 0;
            j.animate(g, h, c.options.easing).animate(u, h, c.options.easing, function () {
                f == "hide" && d.hide();
                a.effects.restore(d, e);
                a.effects.removeWrapper(d);
                c.callback && c.callback.apply(d[0], arguments);
                d.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.highlight = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["backgroundImage", "backgroundColor", "opacity"],
                f = a.effects.setMode(d, c.options.mode || "show"),
                b = {
                    backgroundColor: d.css("backgroundColor")
                };
            if (f == "hide") b.opacity = 0;
            a.effects.save(d, e);
            d.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(b, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    f == "hide" && d.hide();
                    a.effects.restore(d, e);
                    f == "show" && !a.support.opacity && this.style.removeAttribute("filter");
                    c.callback && c.callback.apply(this, arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.pulsate = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = a.effects.setMode(d, c.options.mode || "show");
            times = (c.options.times || 5) * 2 - 1;
            duration = c.duration ? c.duration / 2 : a.fx.speeds._default / 2;
            isVisible = d.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                d.css("opacity", 0).show();
                animateTo = 1
            }
            if (e == "hide" && isVisible || e == "show" && !isVisible) times--;
            for (e = 0; e < times; e++) {
                d.animate({
                    opacity: animateTo
                }, duration, c.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            d.animate({
                opacity: animateTo
            }, duration, c.options.easing, function () {
                animateTo == 0 && d.hide();
                c.callback && c.callback.apply(this, arguments)
            });
            d.queue("fx", function () {
                d.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.puff = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = a.effects.setMode(d, c.options.mode || "hide"),
                f = parseInt(c.options.percent, 10) || 150,
                b = f / 100,
                g = {
                    height: d.height(),
                    width: d.width()
                };
            a.extend(c.options, {
                fade: true,
                mode: e,
                percent: e == "hide" ? f : 100,
                from: e == "hide" ? g : {
                    height: g.height * b,
                    width: g.width * b
                }
            });
            d.effect("scale", c.options, c.duration, c.callback);
            d.dequeue()
        })
    };
    a.effects.scale = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = a.extend(true, {}, c.options),
                f = a.effects.setMode(d, c.options.mode || "effect"),
                b = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : f == "hide" ? 0 : 100),
                g = c.options.direction || "both",
                h = c.options.origin;
            if (f != "effect") {
                e.origin = h || ["middle", "center"];
                e.restore = true
            }
            h = {
                height: d.height(),
                width: d.width()
            };
            d.from = c.options.from || (f == "show" ? {
                height: 0,
                width: 0
            } : h);
            b = {
                y: g != "horizontal" ? b / 100 : 1,
                x: g != "vertical" ? b / 100 : 1
            };
            d.to = {
                height: h.height * b.y,
                width: h.width * b.x
            };
            if (c.options.fade) {
                if (f == "show") {
                    d.from.opacity = 0;
                    d.to.opacity = 1
                }
                if (f == "hide") {
                    d.from.opacity = 1;
                    d.to.opacity = 0
                }
            }
            e.from = d.from;
            e.to = d.to;
            e.mode = f;
            d.effect("size", e, c.duration, c.callback);
            d.dequeue()
        })
    };
    a.effects.size = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                f = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                b = ["width", "height", "overflow"],
                g = ["fontSize"],
                h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                j = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                k = a.effects.setMode(d, c.options.mode || "effect"),
                q = c.options.restore || false,
                u = c.options.scale || "both",
                n = c.options.origin,
                l = {
                    height: d.height(),
                    width: d.width()
                };
            d.from = c.options.from || l;
            d.to = c.options.to || l;
            if (n) {
                n = a.effects.getBaseline(n, l);
                d.from.top = (l.height - d.from.height) * n.y;
                d.from.left = (l.width - d.from.width) * n.x;
                d.to.top = (l.height - d.to.height) * n.y;
                d.to.left = (l.width - d.to.width) * n.x
            }
            var p = {
                from: {
                    y: d.from.height / l.height,
                    x: d.from.width / l.width
                },
                to: {
                    y: d.to.height / l.height,
                    x: d.to.width / l.width
                }
            };
            if (u == "box" || u == "both") {
                if (p.from.y != p.to.y) {
                    e = e.concat(h);
                    d.from = a.effects.setTransition(d, h, p.from.y, d.from);
                    d.to = a.effects.setTransition(d, h, p.to.y, d.to)
                }
                if (p.from.x != p.to.x) {
                    e = e.concat(j);
                    d.from = a.effects.setTransition(d, j, p.from.x, d.from);
                    d.to = a.effects.setTransition(d, j, p.to.x, d.to)
                }
            }
            if (u == "content" || u == "both") if (p.from.y != p.to.y) {
                e = e.concat(g);
                d.from = a.effects.setTransition(d, g, p.from.y, d.from);
                d.to = a.effects.setTransition(d, g, p.to.y, d.to)
            }
            a.effects.save(d, q ? e : f);
            d.show();
            a.effects.createWrapper(d);
            d.css("overflow", "hidden").css(d.from);
            if (u == "content" || u == "both") {
                h = h.concat(["marginTop", "marginBottom"]).concat(g);
                j = j.concat(["marginLeft", "marginRight"]);
                b = e.concat(h).concat(j);
                d.find("*[width]").each(function () {
                    child = a(this);
                    q && a.effects.save(child, b);
                    var s = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: s.height * p.from.y,
                        width: s.width * p.from.x
                    };
                    child.to = {
                        height: s.height * p.to.y,
                        width: s.width * p.to.x
                    };
                    if (p.from.y != p.to.y) {
                        child.from = a.effects.setTransition(child, h, p.from.y, child.from);
                        child.to = a.effects.setTransition(child, h, p.to.y, child.to)
                    }
                    if (p.from.x != p.to.x) {
                        child.from = a.effects.setTransition(child, j, p.from.x, child.from);
                        child.to = a.effects.setTransition(child, j, p.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, c.duration, c.options.easing, function () {
                        q && a.effects.restore(child, b)
                    })
                })
            }
            d.animate(d.to, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    d.to.opacity === 0 && d.css("opacity", d.from.opacity);
                    k == "hide" && d.hide();
                    a.effects.restore(d, q ? e : f);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(this, arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.shake = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right"];
            a.effects.setMode(d, c.options.mode || "effect");
            var f = c.options.direction || "left",
                b = c.options.distance || 20,
                g = c.options.times || 3,
                h = c.duration || c.options.duration || 140;
            a.effects.save(d, e);
            d.show();
            a.effects.createWrapper(d);
            var j = f == "up" || f == "down" ? "top" : "left",
                k = f == "up" || f == "left" ? "pos" : "neg";
            f = {};
            var q = {},
                u = {};
            f[j] = (k == "pos" ? "-=" : "+=") + b;
            q[j] = (k == "pos" ? "+=" : "-=") + b * 2;
            u[j] = (k == "pos" ? "-=" : "+=") + b * 2;
            d.animate(f, h, c.options.easing);
            for (b = 1; b < g; b++) d.animate(q, h, c.options.easing).animate(u, h, c.options.easing);
            d.animate(q, h, c.options.easing).animate(f, h / 2, c.options.easing, function () {
                a.effects.restore(d, e);
                a.effects.removeWrapper(d);
                c.callback && c.callback.apply(this, arguments)
            });
            d.queue("fx", function () {
                d.dequeue()
            });
            d.dequeue()
        })
    }
})(jQuery);
(function (a) {
    a.effects.slide = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = ["position", "top", "bottom", "left", "right"],
                f = a.effects.setMode(d, c.options.mode || "show"),
                b = c.options.direction || "left";
            a.effects.save(d, e);
            d.show();
            a.effects.createWrapper(d).css({
                overflow: "hidden"
            });
            var g = b == "up" || b == "down" ? "top" : "left";
            b = b == "up" || b == "left" ? "pos" : "neg";
            var h = c.options.distance || (g == "top" ? d.outerHeight({
                margin: true
            }) : d.outerWidth({
                margin: true
            }));
            if (f == "show") d.css(g, b == "pos" ? isNaN(h) ? "-" + h : -h : h);
            var j = {};
            j[g] = (f == "show" ? b == "pos" ? "+=" : "-=" : b == "pos" ? "-=" : "+=") + h;
            d.animate(j, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function () {
                    f == "hide" && d.hide();
                    a.effects.restore(d, e);
                    a.effects.removeWrapper(d);
                    c.callback && c.callback.apply(this, arguments);
                    d.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a.effects.transfer = function (c) {
        return this.queue(function () {
            var d = a(this),
                e = a(c.options.to),
                f = e.offset();
            e = {
                top: f.top,
                left: f.left,
                height: e.innerHeight(),
                width: e.innerWidth()
            };
            f = d.offset();
            var b = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({
                top: f.top,
                left: f.left,
                height: d.innerHeight(),
                width: d.innerWidth(),
                position: "absolute"
            }).animate(e, c.duration, c.options.easing, function () {
                b.remove();
                c.callback && c.callback.apply(d[0], arguments);
                d.dequeue()
            })
        })
    }
})(jQuery);
(function (a) {
    function c() {
        if (a.fn.ajaxSubmit.debug) {
            var d = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            if (window.console && window.console.log) window.console.log(d);
            else window.opera && window.opera.postError && window.opera.postError(d)
        }
    }
    a.fn.ajaxSubmit = function (d) {
        function e(l) {
            function p(I) {
                return I.contentWindow ? I.contentWindow.document : I.contentDocument ? I.contentDocument : I.document
            }
            function s() {
                function I() {
                    try {
                        var S = p(w).readyState;
                        c("state = " + S);
                        S.toLowerCase() == "uninitialized" && setTimeout(I, 50)
                    } catch (Y) {
                        c("Server abort: ", Y, " (", Y.name, ")");
                        v(N);
                        K && clearTimeout(K);
                        K = undefined
                    }
                }
                var M = g.attr("target"),
                    P = g.attr("action");
                C.setAttribute("target", z);
                f || C.setAttribute("method", "POST");
                P != o.url && C.setAttribute("action", o.url);
                if (!o.skipEncodingOverride && (!f || /post/i.test(f))) g.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                });
                if (o.timeout) K = setTimeout(function () {
                    J = true;
                    v(L)
                }, o.timeout);
                var Q = [];
                try {
                    if (o.extraData) for (var R in o.extraData) Q.push(a('<input type="hidden" name="' + R + '" />').attr("value", o.extraData[R]).appendTo(C)[0]);
                    if (!o.iframeTarget) {
                        B.appendTo("body");
                        w.attachEvent ? w.attachEvent("onload", v) : w.addEventListener("load", v, false)
                    }
                    setTimeout(I, 15);
                    C.submit()
                } finally {
                    C.setAttribute("action", P);
                    M ? C.setAttribute("target", M) : g.removeAttr("target");
                    a(Q).remove()
                }
            }
            function v(I) {
                if (!(x.aborted || A)) {
                    try {
                        r = p(w)
                    } catch (M) {
                        c("cannot access response document: ", M);
                        I = N
                    }
                    if (I === L && x) x.abort("timeout");
                    else if (I == N && x) x.abort("server abort");
                    else {
                        if (!r || r.location.href == o.iframeSrc) if (!J) return;
                        w.detachEvent ? w.detachEvent("onload", v) : w.removeEventListener("load", v, false);
                        I = "success";
                        var P;
                        try {
                            if (J) throw "timeout";
                            var Q = o.dataType == "xml" || r.XMLDocument || a.isXMLDoc(r);
                            c("isXml=" + Q);
                            if (!Q && window.opera && (r.body == null || r.body.innerHTML == "")) if (--y) {
                                c("requeing onLoad callback, DOM not available");
                                setTimeout(v, 250);
                                return
                            }
                            var R = r.body ? r.body : r.documentElement;
                            x.responseText = R ? R.innerHTML : null;
                            x.responseXML = r.XMLDocument ? r.XMLDocument : r;
                            if (Q) o.dataType = "xml";
                            x.getResponseHeader = function (W) {
                                return {
                                    "content-type": o.dataType
                                }[W]
                            };
                            if (R) {
                                x.status = Number(R.getAttribute("status")) || x.status;
                                x.statusText = R.getAttribute("statusText") || x.statusText
                            }
                            var S = (o.dataType || "").toLowerCase(),
                                Y = /(json|script|text)/.test(S);
                            if (Y || o.textarea) {
                                var T = r.getElementsByTagName("textarea")[0];
                                if (T) {
                                    x.responseText = T.value;
                                    x.status = Number(T.getAttribute("status")) || x.status;
                                    x.statusText = T.getAttribute("statusText") || x.statusText
                                } else if (Y) {
                                    var U = r.getElementsByTagName("pre")[0],
                                        X = r.getElementsByTagName("body")[0];
                                    if (U) x.responseText = U.textContent ? U.textContent : U.innerText;
                                    else if (X) x.responseText = X.textContent ? X.textContent : X.innerText
                                }
                            } else if (S == "xml" && !x.responseXML && x.responseText != null) x.responseXML = E(x.responseText);
                            try {
                                O = H(x, S, o)
                            } catch (Z) {
                                I = "parsererror";
                                x.error = P = Z || I
                            }
                        } catch (aa) {
                            c("error caught: ", aa);
                            I = "error";
                            x.error = P = aa || I
                        }
                        if (x.aborted) {
                            c("upload aborted");
                            I = null
                        }
                        if (x.status) I = x.status >= 200 && x.status < 300 || x.status === 304 ? "success" : "error";
                        if (I === "success") {
                            o.success && o.success.call(o.context, O, "success", x);
                            m && a.event.trigger("ajaxSuccess", [x, o])
                        } else if (I) {
                            if (P == undefined) P = x.statusText;
                            o.error && o.error.call(o.context, x, I, P);
                            m && a.event.trigger("ajaxError", [x, o, P])
                        }
                        m && a.event.trigger("ajaxComplete", [x, o]);
                        m && !--a.active && a.event.trigger("ajaxStop");
                        o.complete && o.complete.call(o.context, x, I);
                        A = true;
                        o.timeout && clearTimeout(K);
                        setTimeout(function () {
                            o.iframeTarget || B.remove();
                            x.responseXML = null
                        }, 100)
                    }
                }
            }
            var C = g[0],
                D, F, o, m, z, B, w, x, J, K;
            D = !! a.fn.prop;
            if (l) if (D) for (F = 0; F < l.length; F++) {
                D = a(C[l[F].name]);
                D.prop("disabled", false)
            } else for (F = 0; F < l.length; F++) {
                D = a(C[l[F].name]);
                D.removeAttr("disabled")
            }
            if (a(":input[name=submit],:input[id=submit]", C).length) alert('Error: Form elements must not have name or id of "submit".');
            else {
                o = a.extend(true, {}, a.ajaxSettings, d);
                o.context = o.context || o;
                z = "jqFormIO" + (new Date).getTime();
                if (o.iframeTarget) {
                    B = a(o.iframeTarget);
                    D = B.attr("name");
                    if (D == null) B.attr("name", z);
                    else z = D
                } else {
                    B = a('<iframe name="' + z + '" src="' + o.iframeSrc + '" />');
                    B.css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    })
                }
                w = B[0];
                x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {},
                    getResponseHeader: function () {},
                    setRequestHeader: function () {},
                    abort: function (I) {
                        var M = I === "timeout" ? "timeout" : "aborted";
                        c("aborting upload... " + M);
                        this.aborted = 1;
                        B.attr("src", o.iframeSrc);
                        x.error = M;
                        o.error && o.error.call(o.context, x, M, I);
                        m && a.event.trigger("ajaxError", [x, o, M]);
                        o.complete && o.complete.call(o.context, x, M)
                    }
                };
                (m = o.global) && !a.active++ && a.event.trigger("ajaxStart");
                m && a.event.trigger("ajaxSend", [x, o]);
                if (o.beforeSend && o.beforeSend.call(o.context, x, o) === false) o.global && a.active--;
                else if (!x.aborted) {
                    if (l = C.clk) if ((D = l.name) && !l.disabled) {
                        o.extraData = o.extraData || {};
                        o.extraData[D] = l.value;
                        if (l.type == "image") {
                            o.extraData[D + ".x"] = C.clk_x;
                            o.extraData[D + ".y"] = C.clk_y
                        }
                    }
                    var L = 1,
                        N = 2;
                    o.forceSync ? s() : setTimeout(s, 10);
                    var O, r, y = 50,
                        A, E = a.parseXML ||
                    function (I, M) {
                        if (window.ActiveXObject) {
                            M = new ActiveXObject("Microsoft.XMLDOM");
                            M.async = "false";
                            M.loadXML(I)
                        } else M = (new DOMParser).parseFromString(I, "text/xml");
                        return M && M.documentElement && M.documentElement.nodeName != "parsererror" ? M : null
                    }, G = a.parseJSON ||
                    function (I) {
                        return window.eval("(" + I + ")")
                    }, H = function (I, M, P) {
                        var Q = I.getResponseHeader("content-type") || "",
                            R = M === "xml" || !M && Q.indexOf("xml") >= 0;
                        I = R ? I.responseXML : I.responseText;
                        R && I.documentElement.nodeName === "parsererror" && a.error && a.error("parsererror");
                        if (P && P.dataFilter) I = P.dataFilter(I, M);
                        if (typeof I === "string") if (M === "json" || !M && Q.indexOf("json") >= 0) I = G(I);
                        else if (M === "script" || !M && Q.indexOf("javascript") >= 0) a.globalEval(I);
                        return I
                    }
                }
            }
        }
        if (!this.length) {
            c("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var f, b, g = this;
        if (typeof d == "function") d = {
            success: d
        };
        f = this.attr("method");
        b = this.attr("action");
        if (b = (b = typeof b === "string" ? a.trim(b) : "") || window.location.href || "") b = (b.match(/^([^#]+)/) || [])[1];
        d = a.extend(true, {
            url: b,
            success: a.ajaxSettings.success,
            type: f || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, d);
        b = {};
        this.trigger("form-pre-serialize", [this, d, b]);
        if (b.veto) {
            c("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (d.beforeSerialize && d.beforeSerialize(this, d) === false) {
            c("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var h, j, k = this.formToArray(d.semantic);
        if (d.data) {
            d.extraData = d.data;
            for (h in d.data) if (a.isArray(d.data[h])) for (var q in d.data[h]) k.push({
                name: h,
                value: d.data[h][q]
            });
            else {
                j = d.data[h];
                j = a.isFunction(j) ? j() : j;
                k.push({
                    name: h,
                    value: j
                })
            }
        }
        if (d.beforeSubmit && d.beforeSubmit(k, this, d) === false) {
            c("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [k, this, d, b]);
        if (b.veto) {
            c("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        h = a.param(k);
        if (d.type.toUpperCase() == "GET") {
            d.url += (d.url.indexOf("?") >= 0 ? "&" : "?") + h;
            d.data = null
        } else d.data = h;
        var u = [];
        d.resetForm && u.push(function () {
            g.resetForm()
        });
        d.clearForm && u.push(function () {
            g.clearForm()
        });
        if (!d.dataType && d.target) {
            var n = d.success ||
            function () {};
            u.push(function (l) {
                var p = d.replaceTarget ? "replaceWith" : "html";
                a(d.target)[p](l).each(n, arguments)
            })
        } else d.success && u.push(d.success);
        d.success = function (l, p, s) {
            for (var v = d.context || d, C = 0, D = u.length; C < D; C++) u[C].apply(v, [l, p, s || g, g])
        };
        h = a("input:file", this).length > 0;
        q = g.attr("enctype") == "multipart/form-data" || g.attr("encoding") == "multipart/form-data";
        if (d.iframe !== false && (h || d.iframe || q)) d.closeKeepAlive ? a.get(d.closeKeepAlive, function () {
            e(k)
        }) : e(k);
        else {
            if (a.browser.msie && f == "get" && typeof d.type === "undefined") {
                h = g[0].getAttribute("method");
                if (typeof h === "string") d.type = h
            }
            a.ajax(d)
        }
        this.trigger("form-submit-notify", [this, d]);
        return this
    };
    a.fn.ajaxForm = function (d) {
        if (this.length === 0) {
            var e = {
                s: this.selector,
                c: this.context
            };
            if (!a.isReady && e.s) {
                c("DOM not ready, queuing ajaxForm");
                a(function () {
                    a(e.s, e.c).ajaxForm(d)
                });
                return this
            }
            c("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", function (f) {
            if (!f.isDefaultPrevented()) {
                f.preventDefault();
                a(this).ajaxSubmit(d)
            }
        }).bind("click.form-plugin", function (f) {
            var b = f.target,
                g = a(b);
            if (!g.is(":submit,input:image")) {
                b = g.closest(":submit");
                if (b.length == 0) return;
                b = b[0]
            }
            var h = this;
            h.clk = b;
            if (b.type == "image") if (f.offsetX != undefined) {
                h.clk_x = f.offsetX;
                h.clk_y = f.offsetY
            } else if (typeof a.fn.offset == "function") {
                g = g.offset();
                h.clk_x = f.pageX - g.left;
                h.clk_y = f.pageY - g.top
            } else {
                h.clk_x = f.pageX - b.offsetLeft;
                h.clk_y = f.pageY - b.offsetTop
            }
            setTimeout(function () {
                h.clk = h.clk_x = h.clk_y = null
            }, 100)
        })
    };
    a.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    a.fn.formToArray = function (d) {
        var e = [];
        if (this.length === 0) return e;
        var f = this[0],
            b = d ? f.getElementsByTagName("*") : f.elements;
        if (!b) return e;
        var g, h, j, k, q, u;
        g = 0;
        for (q = b.length; g < q; g++) {
            h = b[g];
            if (j = h.name) if (d && f.clk && h.type == "image") {
                if (!h.disabled && f.clk == h) {
                    e.push({
                        name: j,
                        value: a(h).val()
                    });
                    e.push({
                        name: j + ".x",
                        value: f.clk_x
                    }, {
                        name: j + ".y",
                        value: f.clk_y
                    })
                }
            } else if ((k = a.fieldValue(h, true)) && k.constructor == Array) {
                h = 0;
                for (u = k.length; h < u; h++) e.push({
                    name: j,
                    value: k[h]
                })
            } else k !== null && typeof k != "undefined" && e.push({
                name: j,
                value: k
            })
        }
        if (!d && f.clk) {
            d = a(f.clk);
            b = d[0];
            if ((j = b.name) && !b.disabled && b.type == "image") {
                e.push({
                    name: j,
                    value: d.val()
                });
                e.push({
                    name: j + ".x",
                    value: f.clk_x
                }, {
                    name: j + ".y",
                    value: f.clk_y
                })
            }
        }
        return e
    };
    a.fn.formSerialize = function (d) {
        return a.param(this.formToArray(d))
    };
    a.fn.fieldSerialize = function (d) {
        var e = [];
        this.each(function () {
            var f = this.name;
            if (f) {
                var b = a.fieldValue(this, d);
                if (b && b.constructor == Array) for (var g = 0, h = b.length; g < h; g++) e.push({
                    name: f,
                    value: b[g]
                });
                else b !== null && typeof b != "undefined" && e.push({
                    name: this.name,
                    value: b
                })
            }
        });
        return a.param(e)
    };
    a.fn.fieldValue = function (d) {
        for (var e = [], f = 0, b = this.length; f < b; f++) {
            var g = a.fieldValue(this[f], d);
            g === null || typeof g == "undefined" || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(e, g) : e.push(g))
        }
        return e
    };
    a.fieldValue = function (d, e) {
        var f = d.name,
            b = d.type,
            g = d.tagName.toLowerCase();
        if (e === undefined) e = true;
        if (e && (!f || d.disabled || b == "reset" || b == "button" || (b == "checkbox" || b == "radio") && !d.checked || (b == "submit" || b == "image") && d.form && d.form.clk != d || g == "select" && d.selectedIndex == -1)) return null;
        if (g == "select") {
            g = d.selectedIndex;
            if (g < 0) return null;
            e = [];
            d = d.options;
            f = (b = b == "select-one") ? g + 1 : d.length;
            for (g = b ? g : 0; g < f; g++) {
                var h = d[g];
                if (h.selected) {
                    var j = h.value;
                    j || (j = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value);
                    if (b) return j;
                    e.push(j)
                }
            }
            return e
        }
        return a(d).val()
    };
    a.fn.clearForm = function () {
        return this.each(function () {
            a("input,select,textarea", this).clearFields()
        })
    };
    a.fn.clearFields = a.fn.clearInputs = function () {
        var d = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var e = this.type,
                f = this.tagName.toLowerCase();
            if (d.test(e) || f == "textarea") this.value = "";
            else if (e == "checkbox" || e == "radio") this.checked = false;
            else if (f == "select") this.selectedIndex = -1
        })
    };
    a.fn.resetForm = function () {
        return this.each(function () {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
        })
    };
    a.fn.enable = function (d) {
        if (d === undefined) d = true;
        return this.each(function () {
            this.disabled = !d
        })
    };
    a.fn.selected = function (d) {
        if (d === undefined) d = true;
        return this.each(function () {
            var e = this.type;
            if (e == "checkbox" || e == "radio") this.checked = d;
            else if (this.tagName.toLowerCase() == "option") {
                e = a(this).parent("select");
                d && e[0] && e[0].type == "select-one" && e.find("option").selected(false);
                this.selected = d
            }
        })
    };
    a.fn.ajaxSubmit.debug = false
})(jQuery);
eval(function (a, c, d, e, f, b) {
    f = function (g) {
        return (g < c ? "" : f(parseInt(g / c))) + ((g %= c) > 35 ? String.fromCharCode(g + 29) : g.toString(36))
    };
    if (!"".replace(/^/, String)) {
        for (; d--;) b[f(d)] = e[d] || f(d);
        e = [function (g) {
            return b[g]
        }];
        f = function () {
            return "\\w+"
        };
        d = 1
    }
    for (; d--;) if (e[d]) a = a.replace(new RegExp("\\b" + f(d) + "\\b", "g"), e[d]);
    return a
}("(9($){$.1s.A=9(o){z 4.14(9(){2H r(4,o)})};8 q={W:F,23:1,1G:1,u:7,15:3,16:7,1H:'2I',24:'2J',1i:0,B:7,1j:7,1I:7,25:7,26:7,27:7,28:7,29:7,2a:7,2b:7,1J:'<N></N>',1K:'<N></N>',2c:'2d',2e:'2d',1L:7,1M:7};$.A=9(e,o){4.5=$.17({},q,o||{});4.Q=F;4.D=7;4.H=7;4.t=7;4.R=7;4.S=7;4.O=!4.5.W?'1N':'2f';4.E=!4.5.W?'2g':'2h';8 a='',1d=e.J.1d(' ');1k(8 i=0;i<1d.K;i++){6(1d[i].2i('A-2j')!=-1){$(e).1t(1d[i]);8 a=1d[i];1l}}6(e.2k=='2K'||e.2k=='2L'){4.t=$(e);4.D=4.t.18();6(4.D.1m('A-H')){6(!4.D.18().1m('A-D'))4.D=4.D.B('<N></N>');4.D=4.D.18()}X 6(!4.D.1m('A-D'))4.D=4.t.B('<N></N>').18()}X{4.D=$(e);4.t=$(e).2M('>2l,>2m,N>2l,N>2m')}6(a!=''&&4.D.18()[0].J.2i('A-2j')==-1)4.D.B('<N 2N=\" '+a+'\"></N>');4.H=4.t.18();6(!4.H.K||!4.H.1m('A-H'))4.H=4.t.B('<N></N>').18();4.S=$('.A-11',4.D);6(4.S.u()==0&&4.5.1K!=7)4.S=4.H.1u(4.5.1K).11();4.S.V(4.J('A-11'));4.R=$('.A-19',4.D);6(4.R.u()==0&&4.5.1J!=7)4.R=4.H.1u(4.5.1J).11();4.R.V(4.J('A-19'));4.H.V(4.J('A-H'));4.t.V(4.J('A-t'));4.D.V(4.J('A-D'));8 b=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 c=4.t.2O('1v');8 d=4;6(c.u()>0){8 f=0,i=4.5.1G;c.14(9(){d.1P(4,i++);f+=d.T(4,b)});4.t.y(4.O,f+'U');6(!o||o.u===L)4.5.u=c.u()}4.D.y('1w','1x');4.R.y('1w','1x');4.S.y('1w','1x');4.2n=9(){d.19()};4.2o=9(){d.11()};4.1Q=9(){d.2p()};6(4.5.1j!=7)4.5.1j(4,'2q');6($.2r.2s){4.1e(F,F);$(2t).1y('2P',9(){d.1z()})}X 4.1z()};8 r=$.A;r.1s=r.2Q={A:'0.2.3'};r.1s.17=r.17=$.17;r.1s.17({1z:9(){4.C=7;4.G=7;4.Y=7;4.12=7;4.1a=F;4.1f=7;4.P=7;4.Z=F;6(4.Q)z;4.t.y(4.E,4.1A(4.5.1G)+'U');8 p=4.1A(4.5.23);4.Y=4.12=7;4.1p(p,F);$(2t).1R('2u',4.1Q).1y('2u',4.1Q)},2v:9(){4.t.2w();4.t.y(4.E,'2R');4.t.y(4.O,'2S');6(4.5.1j!=7)4.5.1j(4,'2v');4.1z()},2p:9(){6(4.P!=7&&4.Z)4.t.y(4.E,r.I(4.t.y(4.E))+4.P);4.P=7;4.Z=F;6(4.5.1I!=7)4.5.1I(4);6(4.5.16!=7){8 a=4;8 b=1n.1O(4.1o()/4.5.16),O=0,E=0;$('1v',4.t).14(9(i){O+=a.T(4,b);6(i+1<a.C)E=O});4.t.y(4.O,O+'U');4.t.y(4.E,-E+'U')}4.15(4.C,F)},2T:9(){4.Q=1g;4.1e()},2U:9(){4.Q=F;4.1e()},u:9(s){6(s!=L){4.5.u=s;6(!4.Q)4.1e()}z 4.5.u},2V:9(i,a){6(a==L||!a)a=i;6(4.5.u!==7&&a>4.5.u)a=4.5.u;1k(8 j=i;j<=a;j++){8 e=4.M(j);6(!e.K||e.1m('A-1b-1B'))z F}z 1g},M:9(i){z $('.A-1b-'+i,4.t)},2x:9(i,s){8 e=4.M(i),1S=0,2x=0;6(e.K==0){8 c,e=4.1C(i),j=r.I(i);1q(c=4.M(--j)){6(j<=0||c.K){j<=0?4.t.2y(e):c.1T(e);1l}}}X 1S=4.T(e);e.1t(4.J('A-1b-1B'));1U s=='2W'?e.2X(s):e.2w().2Y(s);8 a=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 b=4.T(e,a)-1S;6(i>0&&i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))-b+'U');4.t.y(4.O,r.I(4.t.y(4.O))+b+'U');z e},1V:9(i){8 e=4.M(i);6(!e.K||(i>=4.C&&i<=4.G))z;8 d=4.T(e);6(i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))+d+'U');e.1V();4.t.y(4.O,r.I(4.t.y(4.O))-d+'U')},19:9(){4.1D();6(4.P!=7&&!4.Z)4.1W(F);X 4.15(((4.5.B=='1X'||4.5.B=='G')&&4.5.u!=7&&4.G==4.5.u)?1:4.C+4.5.15)},11:9(){4.1D();6(4.P!=7&&4.Z)4.1W(1g);X 4.15(((4.5.B=='1X'||4.5.B=='C')&&4.5.u!=7&&4.C==1)?4.5.u:4.C-4.5.15)},1W:9(b){6(4.Q||4.1a||!4.P)z;8 a=r.I(4.t.y(4.E));!b?a-=4.P:a+=4.P;4.Z=!b;4.Y=4.C;4.12=4.G;4.1p(a)},15:9(i,a){6(4.Q||4.1a)z;4.1p(4.1A(i),a)},1A:9(i){6(4.Q||4.1a)z;i=r.I(i);6(4.5.B!='1c')i=i<1?1:(4.5.u&&i>4.5.u?4.5.u:i);8 a=4.C>i;8 b=r.I(4.t.y(4.E));8 f=4.5.B!='1c'&&4.C<=1?1:4.C;8 c=a?4.M(f):4.M(4.G);8 j=a?f:f-1;8 e=7,l=0,p=F,d=0;1q(a?--j>=i:++j<i){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c[a?'1u':'1T'](e)}c=e;d=4.T(e);6(p)l+=d;6(4.C!=7&&(4.5.B=='1c'||(j>=1&&(4.5.u==7||j<=4.5.u))))b=a?b+d:b-d}8 g=4.1o();8 h=[];8 k=0,j=i,v=0;8 c=4.M(i-1);1q(++k){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c.K==0?4.t.2y(e):c[a?'1u':'1T'](e)}c=e;8 d=4.T(e);6(d==0){2Z('30: 31 1N/2f 32 1k 33. 34 35 36 37 38 39. 3a...');z 0}6(4.5.B!='1c'&&4.5.u!==7&&j>4.5.u)h.3b(e);X 6(p)l+=d;v+=d;6(v>=g)1l;j++}1k(8 x=0;x<h.K;x++)h[x].1V();6(l>0){4.t.y(4.O,4.T(4.t)+l+'U');6(a){b-=l;4.t.y(4.E,r.I(4.t.y(4.E))-l+'U')}}8 n=i+k-1;6(4.5.B!='1c'&&4.5.u&&n>4.5.u)n=4.5.u;6(j>n){k=0,j=n,v=0;1q(++k){8 e=4.M(j--);6(!e.K)1l;v+=4.T(e);6(v>=g)1l}}8 o=n-k+1;6(4.5.B!='1c'&&o<1)o=1;6(4.Z&&a){b+=4.P;4.Z=F}4.P=7;6(4.5.B!='1c'&&n==4.5.u&&(n-k+1)>=1){8 m=r.10(4.M(n),!4.5.W?'1r':'1Y');6((v-m)>g)4.P=v-g-m}1q(i--\>o)b+=4.T(4.M(i));4.Y=4.C;4.12=4.G;4.C=o;4.G=n;z b},1p:9(p,a){6(4.Q||4.1a)z;4.1a=1g;8 b=4;8 c=9(){b.1a=F;6(p==0)b.t.y(b.E,0);6(b.5.B=='1X'||b.5.B=='G'||b.5.u==7||b.G<b.5.u)b.2z();b.1e();b.1Z('2A')};4.1Z('3c');6(!4.5.1H||a==F){4.t.y(4.E,p+'U');c()}X{8 o=!4.5.W?{'2g':p}:{'2h':p};4.t.1p(o,4.5.1H,4.5.24,c)}},2z:9(s){6(s!=L)4.5.1i=s;6(4.5.1i==0)z 4.1D();6(4.1f!=7)z;8 a=4;4.1f=3d(9(){a.19()},4.5.1i*3e)},1D:9(){6(4.1f==7)z;3f(4.1f);4.1f=7},1e:9(n,p){6(n==L||n==7){8 n=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='C')||4.5.u==7||4.G<4.5.u);6(!4.Q&&(!4.5.B||4.5.B=='C')&&4.5.u!=7&&4.G>=4.5.u)n=4.P!=7&&!4.Z}6(p==L||p==7){8 p=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='G')||4.C>1);6(!4.Q&&(!4.5.B||4.5.B=='G')&&4.5.u!=7&&4.C==1)p=4.P!=7&&4.Z}8 a=4;4.R[n?'1y':'1R'](4.5.2c,4.2n)[n?'1t':'V'](4.J('A-19-1E')).20('1E',n?F:1g);4.S[p?'1y':'1R'](4.5.2e,4.2o)[p?'1t':'V'](4.J('A-11-1E')).20('1E',p?F:1g);6(4.R.K>0&&(4.R[0].1h==L||4.R[0].1h!=n)&&4.5.1L!=7){4.R.14(9(){a.5.1L(a,4,n)});4.R[0].1h=n}6(4.S.K>0&&(4.S[0].1h==L||4.S[0].1h!=p)&&4.5.1M!=7){4.S.14(9(){a.5.1M(a,4,p)});4.S[0].1h=p}},1Z:9(a){8 b=4.Y==7?'2q':(4.Y<4.C?'19':'11');4.13('25',a,b);6(4.Y!==4.C){4.13('26',a,b,4.C);4.13('27',a,b,4.Y)}6(4.12!==4.G){4.13('28',a,b,4.G);4.13('29',a,b,4.12)}4.13('2a',a,b,4.C,4.G,4.Y,4.12);4.13('2b',a,b,4.Y,4.12,4.C,4.G)},13:9(a,b,c,d,e,f,g){6(4.5[a]==L||(1U 4.5[a]!='2B'&&b!='2A'))z;8 h=1U 4.5[a]=='2B'?4.5[a][b]:4.5[a];6(!$.3g(h))z;8 j=4;6(d===L)h(j,c,b);X 6(e===L)4.M(d).14(9(){h(j,4,d,c,b)});X{1k(8 i=d;i<=e;i++)6(i!==7&&!(i>=f&&i<=g))4.M(i).14(9(){h(j,4,i,c,b)})}},1C:9(i){z 4.1P('<1v></1v>',i)},1P:9(e,i){8 a=$(e).V(4.J('A-1b')).V(4.J('A-1b-'+i));a.20('3h',i);z a},J:9(c){z c+' '+c+(!4.5.W?'-3i':'-W')},T:9(e,d){8 a=e.2C!=L?e[0]:e;8 b=!4.5.W?a.1F+r.10(a,'2D')+r.10(a,'1r'):a.2E+r.10(a,'2F')+r.10(a,'1Y');6(d==L||b==d)z b;8 w=!4.5.W?d-r.10(a,'2D')-r.10(a,'1r'):d-r.10(a,'2F')-r.10(a,'1Y');$(a).y(4.O,w+'U');z 4.T(a)},1o:9(){z!4.5.W?4.H[0].1F-r.I(4.H.y('3j'))-r.I(4.H.y('3k')):4.H[0].2E-r.I(4.H.y('3l'))-r.I(4.H.y('3m'))},3n:9(i,s){6(s==L)s=4.5.u;z 1n.3o((((i-1)/s)-1n.3p((i-1)/s))*s)+1}});r.17({3q:9(d){z $.17(q,d||{})},10:9(e,p){6(!e)z 0;8 a=e.2C!=L?e[0]:e;6(p=='1r'&&$.2r.2s){8 b={'1w':'1x','3r':'3s','1N':'1i'},21,22;$.2G(a,b,9(){21=a.1F});b['1r']=0;$.2G(a,b,9(){22=a.1F});z 22-21}z r.I($.y(a,p))},I:9(v){v=3t(v);z 3u(v)?0:v}})})(3v);", 62, 218, "||||this|options|if|null|var|function||||||||||||||||||||list|size||||css|return|jcarousel|wrap|first|container|lt|false|last|clip|intval|className|length|undefined|get|div|wh|tail|locked|buttonNext|buttonPrev|dimension|px|addClass|vertical|else|prevFirst|inTail|margin|prev|prevLast|callback|each|scroll|visible|extend|parent|next|animating|item|circular|split|buttons|timer|true|jcarouselstate|auto|initCallback|for|break|hasClass|Math|clipping|animate|while|marginRight|fn|removeClass|before|li|display|block|bind|setup|pos|placeholder|create|stopAuto|disabled|offsetWidth|offset|animation|reloadCallback|buttonNextHTML|buttonPrevHTML|buttonNextCallback|buttonPrevCallback|width|ceil|format|funcResize|unbind|old|after|typeof|remove|scrollTail|both|marginBottom|notify|attr|oWidth|oWidth2|start|easing|itemLoadCallback|itemFirstInCallback|itemFirstOutCallback|itemLastInCallback|itemLastOutCallback|itemVisibleInCallback|itemVisibleOutCallback|buttonNextEvent|click|buttonPrevEvent|height|left|top|indexOf|skin|nodeName|ul|ol|funcNext|funcPrev|reload|init|browser|safari|window|resize|reset|empty|add|prepend|startAuto|onAfterAnimation|object|jquery|marginLeft|offsetHeight|marginTop|swap|new|normal|swing|UL|OL|find|class|children|load|prototype|0px|10px|lock|unlock|has|string|html|append|alert|jCarousel|No|set|items|This|will|cause|an|infinite|loop|Aborting|push|onBeforeAnimation|setTimeout|1000|clearTimeout|isFunction|jcarouselindex|horizontal|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|index|round|floor|defaults|float|none|parseInt|isNaN|jQuery".split("|"), 0, {}));
(function (a) {
    a.alerts = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: 0.01,
        overlayColor: "#FFF",
        draggable: true,
        okButton: "&nbsp;Delete&nbsp;",
        cancelButton: "&nbsp;Cancel&nbsp;",
        dialogClass: null,
        alert: function (c, d, e) {
            if (d == null) d = "Alert";
            a.alerts._show(d, c, null, "alert", function (f) {
                e && e(f)
            })
        },
        confirm: function (c, d, e) {
            if (d == null) d = "Confirm";
            a.alerts._show(d, c, null, "confirm", function (f) {
                e && e(f)
            })
        },
        prompt: function (c, d, e, f) {
            if (e == null) e = "Prompt";
            a.alerts._show(e, c, d, "prompt", function (b) {
                f && f(b)
            })
        },
        _show: function (c, d, e, f, b) {
            a.alerts._hide();
            a.alerts._overlay("show");
            a("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
            a.alerts.dialogClass && a("#popup_container").addClass(a.alerts.dialogClass);
            var g = a.browser.msie && parseInt(a.browser.version) <= 6 ? "absolute" : "fixed";
            a("#popup_container").css({
                position: g,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });
            a("#popup_title").text(c);
            a("#popup_content").addClass(f);
            a("#popup_message").text(d);
            a("#popup_message").html(a("#popup_message").text().replace(/\n/g, "<br />"));
            a("#popup_container").css({
                minWidth: a("#popup_container").outerWidth(),
                maxWidth: a("#popup_container").outerWidth()
            });
            a.alerts._reposition();
            a.alerts._maintainPosition(true);
            switch (f) {
            case "alert":
                a("#popup_message").after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /></div>');
                a("#popup_ok").click(function () {
                    a.alerts._hide();
                    b(true)
                });
                a("#popup_ok").focus().keypress(function (j) {
                    if (j.keyCode == 13 || j.keyCode == 27) a("#popup_ok").trigger("click")
                });
                break;
            case "confirm":
                a("#popup_message").after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>');
                a("#popup_ok").click(function () {
                    a.alerts._hide();
                    b && b(true)
                });
                a("#popup_cancel").click(function () {
                    a.alerts._hide();
                    b && b(false)
                });
                a("#popup_ok").focus();
                a("#popup_ok, #popup_cancel").keypress(function (j) {
                    j.keyCode == 13 && a("#popup_ok").trigger("click");
                    j.keyCode == 27 && a("#popup_cancel").trigger("click")
                });
                break;
            case "prompt":
                a("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + a.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + a.alerts.cancelButton + '" id="popup_cancel" /></div>');
                a("#popup_prompt").width(a("#popup_message").width());
                a("#popup_ok").click(function () {
                    var j = a("#popup_prompt").val();
                    a.alerts._hide();
                    b && b(j)
                });
                a("#popup_cancel").click(function () {
                    a.alerts._hide();
                    b && b(null)
                });
                a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (j) {
                    j.keyCode == 13 && a("#popup_ok").trigger("click");
                    j.keyCode == 27 && a("#popup_cancel").trigger("click")
                });
                e && a("#popup_prompt").val(e);
                a("#popup_prompt").focus().select();
                break
            }
            if (a.alerts.draggable) try {
                a("#popup_container").draggable({
                    handle: a("#popup_title")
                });
                a("#popup_title").css({
                    cursor: "move"
                })
            } catch (h) {}
        },
        _hide: function () {
            a("#popup_container").remove();
            a.alerts._overlay("hide");
            a.alerts._maintainPosition(false)
        },
        _overlay: function (c) {
            switch (c) {
            case "show":
                a.alerts._overlay("hide");

                a("BODY").append('<div id="popup_overlay"></div>');
                a("#popup_overlay").css({
                    position: "absolute",
                    zIndex: 99998,
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: a(document).height(),
                    background: a.alerts.overlayColor,
                    opacity: a.alerts.overlayOpacity
                });
                break;
            case "hide":
                a("#popup_overlay").remove();
                break
            }
        },
        _reposition: function () {
            var c = a(window).height() / 2 - a("#popup_container").outerHeight() / 2 + a.alerts.verticalOffset,
                d = a(window).width() / 2 - a("#popup_container").outerWidth() / 2 + a.alerts.horizontalOffset;
            if (c < 0) c = 0;
            if (d < 0) d = 0;
            if (a.browser.msie && parseInt(a.browser.version) <= 6) c += a(window).scrollTop();
            a("#popup_container").css({
                top: c + "px",
                left: d + "px"
            });
            a("#popup_overlay").height(a(document).height())
        },
        _maintainPosition: function (c) {
            if (a.alerts.repositionOnResize) switch (c) {
            case true:
                a(window).bind("resize", a.alerts._reposition);
                break;
            case false:
                a(window).unbind("resize", a.alerts._reposition);
                break
            }
        }
    };
    jAlert = function (c, d, e) {
        a.alerts.alert(c, d, e)
    };
    jConfirm = function (c, d, e) {
        a.alerts.confirm(c, d, e)
    };
    jPrompt = function (c, d, e, f) {
        a.alerts.prompt(c, d, e, f)
    }
})(jQuery);
(function (a) {
    a.fn.tipsy = function (c) {
        c = a.extend({}, a.fn.tipsy.defaults, c);
        return this.each(function () {
            var d = a.fn.tipsy.elementOptions(this, c);
            a(this).hover(function () {
                a.data(this, "cancel.tipsy", true);
                var e = a.data(this, "active.tipsy");
                if (!e) {
                    e = a('<div class="tipsy"><div class="tipsy-inner"/></div>');
                    e.css({
                        position: "absolute",
                        zIndex: 1E5
                    });
                    a.data(this, "active.tipsy", e)
                }
                if (a(this).attr("title") || typeof a(this).attr("original-title") != "string") a(this).attr("original-title", a(this).attr("title") || "").removeAttr("title");
                var f;
                if (typeof d.title == "string") f = a(this).attr(d.title == "title" ? "original-title" : d.title);
                else if (typeof d.title == "function") f = d.title.call(this);
                e.find(".tipsy-inner")[d.html ? "html" : "text"](f || d.fallback);
                f = a.extend({}, a(this).offset(), {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                });
                e.get(0).className = "tipsy";
                e.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).appendTo(document.body);
                var b = e[0].offsetWidth,
                    g = e[0].offsetHeight;
                switch ((typeof d.gravity == "function" ? d.gravity.call(this) : d.gravity).charAt(0)) {
                case "n":
                    e.css({
                        top: f.top + f.height,
                        left: f.left + f.width / 2 - b / 2
                    }).addClass("tipsy-north");
                    break;
                case "s":
                    e.css({
                        top: f.top - g,
                        left: f.left + f.width / 2 - b / 2
                    }).addClass("tipsy-south");
                    break;
                case "e":
                    e.css({
                        top: f.top + f.height / 2 - g / 2,
                        left: f.left - b
                    }).addClass("tipsy-east");
                    break;
                case "w":
                    e.css({
                        top: f.top + f.height / 2 - g / 2,
                        left: f.left + f.width
                    }).addClass("tipsy-west");
                    break
                }
                d.fade ? e.css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: 0.8
                }) : e.css({
                    visibility: "visible"
                })
            }, function () {
                a.data(this, "cancel.tipsy", false);
                var e = this;
                setTimeout(function () {
                    if (!a.data(this, "cancel.tipsy")) {
                        var f = a.data(e, "active.tipsy");
                        d.fade ? f.stop().fadeOut(function () {
                            a(this).remove()
                        }) : f.remove()
                    }
                }, 100)
            })
        })
    };
    a.fn.tipsy.elementOptions = function (c, d) {
        return a.metadata ? a.extend({}, d, a(c).metadata()) : d
    };
    a.fn.tipsy.defaults = {
        fade: false,
        fallback: "",
        gravity: "n",
        html: false,
        title: "title"
    };
    a.fn.tipsy.autoNS = function () {
        return a(this).offset().top > a(document).scrollTop() + a(window).height() / 2 ? "s" : "n"
    };
    a.fn.tipsy.autoWE = function () {
        return a(this).offset().left > a(document).scrollLeft() + a(window).width() / 2 ? "e" : "w"
    }
})(jQuery);
new(function (a) {
    var c = a.separator || "&",
        d = a.spaces === false ? false : true,
        e = (a.prefix === false ? false : true) ? a.hash === true ? "#" : "?" : "",
        f = a.numbers === false ? false : true;
    jQuery.query = new(function () {
        var b = function (k, q) {
                return k != undefined && k !== null && (q ? k.constructor == q : true)
            },
            g = function (k) {
                for (var q = /\[([^[]*)\]/g, u = /^([^[]+)(\[.*\])?$/.exec(k), n = u[1], l = []; k = q.exec(u[2]);) l.push(k[1]);
                return [n, l]
            },
            h = function (k, q, u) {
                var n = q.shift();
                if (typeof k != "object") k = null;
                if (n === "") {
                    k || (k = []);
                    if (b(k, Array)) k.push(q.length == 0 ? u : h(null, q.slice(0), u));
                    else if (b(k, Object)) {
                        for (n = 0; k[n++] != null;);
                        k[--n] = q.length == 0 ? u : h(k[n], q.slice(0), u)
                    } else {
                        k = [];
                        k.push(q.length == 0 ? u : h(null, q.slice(0), u))
                    }
                } else if (n && n.match(/^\s*[0-9]+\s*$/)) {
                    var l = parseInt(n, 10);
                    k || (k = []);
                    k[l] = q.length == 0 ? u : h(k[l], q.slice(0), u)
                } else if (n) {
                    l = n.replace(/^\s*|\s*$/g, "");
                    k || (k = {});
                    if (b(k, Array)) {
                        var p = {};
                        for (n = 0; n < k.length; ++n) p[n] = k[n];
                        k = p
                    }
                    k[l] = q.length == 0 ? u : h(k[l], q.slice(0), u)
                } else return u;
                return k
            },
            j = function (k) {
                var q = this;
                q.keys = {};
                k.queryObject ? jQuery.each(k.get(), function (u, n) {
                    q.SET(u, n)
                }) : jQuery.each(arguments, function () {
                    var u = "" + this;
                    u = u.replace(/^[?#]/, "");
                    u = u.replace(/[;&]$/, "");
                    if (d) u = u.replace(/[+]/g, " ");
                    jQuery.each(u.split(/[&;]/), function () {
                        var n = decodeURIComponent(this.split("=")[0] || ""),
                            l = decodeURIComponent(this.split("=")[1] || "");
                        if (n) {
                            if (f) if (/^[+-]?[0-9]+\.[0-9]*$/.test(l)) l = parseFloat(l);
                            else if (/^[+-]?[0-9]+$/.test(l)) l = parseInt(l, 10);
                            l = !l && l !== 0 ? true : l;
                            if (l !== false && l !== true && typeof l != "number") l = l;
                            q.SET(n, l)
                        }
                    })
                });
                return q
            };
        j.prototype = {
            queryObject: true,
            has: function (k, q) {
                k = this.get(k);
                return b(k, q)
            },
            GET: function (k) {
                if (!b(k)) return this.keys;
                var q = g(k);
                k = q[1];
                for (q = this.keys[q[0]]; q != null && k.length != 0;) q = q[k.shift()];
                return typeof q == "number" ? q : q || ""
            },
            get: function (k) {
                k = this.GET(k);
                if (b(k, Object)) return jQuery.extend(true, {}, k);
                else if (b(k, Array)) return k.slice(0);
                return k
            },
            SET: function (k, q) {
                q = !b(q) ? null : q;
                k = g(k);
                var u = k[0];
                this.keys[u] = h(this.keys[u], k[1].slice(0), q);
                return this
            },
            set: function (k, q) {
                return this.copy().SET(k, q)
            },
            REMOVE: function (k) {
                return this.SET(k, null).COMPACT()
            },
            remove: function (k) {
                return this.copy().REMOVE(k)
            },
            EMPTY: function () {
                var k = this;
                jQuery.each(k.keys, function (q) {
                    delete k.keys[q]
                });
                return k
            },
            load: function (k) {
                var q = k.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
                    u = k.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new j(k.length == u.length ? "" : u, k.length == q.length ? "" : q)
            },
            empty: function () {
                return this.copy().EMPTY()
            },
            copy: function () {
                return new j(this)
            },
            COMPACT: function () {
                function k(q) {
                    var u = typeof q == "object" ? b(q, Array) ? [] : {} : q;
                    if (typeof q == "object") {
                        function n(l, p, s) {
                            if (b(l, Array)) l.push(s);
                            else l[p] = s
                        }
                        jQuery.each(q, function (l, p) {
                            if (!b(p)) return true;
                            n(u, l, k(p))
                        })
                    }
                    return u
                }
                this.keys = k(this.keys);
                return this
            },
            compact: function () {
                return this.copy().COMPACT()
            },
            toString: function () {
                var k = [],
                    q = [],
                    u = function (p) {
                        p += "";
                        if (d) p = p.replace(/ /g, "+");
                        return encodeURIComponent(p)
                    },
                    n = function (p, s, v) {
                        if (!(!b(v) || v === false)) {
                            s = [u(s)];
                            if (v !== true) {
                                s.push("=");
                                s.push(u(v))
                            }
                            p.push(s.join(""))
                        }
                    },
                    l = function (p, s) {
                        var v = function (C) {
                                return !s || s == "" ? "" + C : [s, "[", C, "]"].join("")
                            };
                        jQuery.each(p, function (C, D) {
                            typeof D == "object" ? l(D, v(C)) : n(q, v(C), D)
                        })
                    };
                l(this.keys);
                q.length > 0 && k.push(e);
                k.push(q.join(c));
                return k.join("")
            }
        };
        return new j(location.search, location.hash)
    })
})(jQuery.query || {});
(function (a) {
    function c() {
        var g = d(this);
        isNaN(g.datetime) || a(this).text(e(g.datetime));
        return this
    }
    function d(g) {
        g = a(g);
        if (!g.data("timeago")) {
            g.data("timeago", {
                datetime: b.datetime(g)
            });
            var h = a.trim(g.text());
            h.length > 0 && g.attr("title", h)
        }
        return g.data("timeago")
    }
    function e(g) {
        return b.inWords(f(g))
    }
    function f(g) {
        return (new Date).getTime() - g.getTime()
    }
    a.timeago = function (g) {
        return g instanceof Date ? e(g) : typeof g == "string" ? e(a.timeago.parse(g)) : e(a.timeago.datetime(g))
    };
    var b = a.timeago;
    a.extend(a.timeago, {
        settings: {
            refreshMillis: 6E4,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (g) {
            function h(s, v) {
                return (a.isFunction(s) ? s(v) : s).replace(/%d/i, j.numbers && j.numbers[v] || v)
            }
            var j = this.settings.strings,
                k = j.prefixAgo,
                q = j.suffixAgo;
            if (this.settings.allowFuture) {
                if (g < 0) {
                    k = j.prefixFromNow;
                    q = j.suffixFromNow
                }
                g = Math.abs(g)
            }
            g = g / 1E3;
            var u = g / 60,
                n = u / 60,
                l = n / 24,
                p = l / 365;
            g = g < 45 && h(j.seconds, Math.round(g)) || g < 90 && h(j.minute, 1) || u < 45 && h(j.minutes, Math.round(u)) || u < 90 && h(j.hour, 1) || n < 24 && h(j.hours, Math.round(n)) || n < 48 && h(j.day, 1) || l < 30 && h(j.days, Math.floor(l)) || l < 60 && h(j.month, 1) || l < 365 && h(j.months, Math.floor(l / 30)) || p < 2 && h(j.year, 1) || h(j.years, Math.floor(p));
            return a.trim([k, g, q].join(" "))
        },
        parse: function (g) {
            g = a.trim(g);
            g = g.replace(/-/, "/").replace(/-/, "/");
            g = g.replace(/T/, " ").replace(/Z/, " UTC");
            g = g.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            g = g.replace(/(\.\d+)/, "");
            return new Date(g)
        },
        datetime: function (g) {
            g = a(g).get(0).tagName.toLowerCase() == "time" ? a(g).attr("datetime") : a(g).attr("title");
            return b.parse(g)
        }
    });
    a.fn.timeago = function () {
        var g = this;
        g.each(c);
        var h = b.settings;
        h.refreshMillis > 0 && setInterval(function () {
            g.each(c)
        }, h.refreshMillis);
        return g
    };
    document.createElement("abbr");
    document.createElement("time")
})(jQuery);
(function (a) {
    a.pageless = function (c) {
        a.isFunction(c) ? c.call() : a.pageless.init(c)
    };
    a.pageless.settings = {
        currentPage: 1,
        pagination: ".pagination",
        url: location.href,
        params: {},
        distance: 100,
        loaderImage: "",
        marker: null,
        scrape: function (c) {
            return c
        }
    };
    a.pageless.loaderHtml = function () {
        return a.pageless.settings.loaderHtml || '<div id="pageless-loader" style="display:none;text-align:center;width:100%;"></div>'
    };
    a.pageless.init = function (c) {
        if (!a.pageless.settings.inited) {
            a.pageless.settings.inited = true;
            c && a.extend(a.pageless.settings, c);
            a.pageless.settings.pagination && a(a.pageless.settings.pagination).remove();
            a.pageless.startListener()
        }
    };
    a.pageless.isLoading = false;
    a.fn.pageless = function (c) {
        a.pageless.init(c);
        a.pageless.el = a(this);
        if (c.loader && a(this).find(c.loader).length) a.pageless.loader = a(this).find(c.loader);
        else {
            a.pageless.loader = a(a.pageless.loaderHtml());
            a(this).append(a.pageless.loader);
            c.loaderHtml || a("#pageless-loader .msg").html(c.loaderMsg)
        }
    };
    a.pageless.loading = function (c) {
        if (c === true) {
            a.pageless.isLoading = true;
            a.pageless.loader && a.pageless.loader.fadeIn("normal")
        } else {
            a.pageless.isLoading = false;
            a.pageless.loader && a.pageless.loader.fadeOut("normal")
        }
    };
    a.pageless.stopListener = function () {
        a(window).unbind(".pageless");
        a("#" + a.pageless.settings.loader).hide()
    };
    a.pageless.startListener = function () {
        a(window).bind("scroll.pageless", a.pageless.scroll);
        a("#" + a.pageless.settings.loader).show()
    };
    a.pageless.scroll = function () {
        if (a.pageless.settings.totalPages <= a.pageless.settings.currentPage) {
            a.pageless.stopListener();
            a.pageless.settings.afterStopListener && a.pageless.settings.afterStopListener.call()
        } else {
            var c = a(document).height() - a(window).scrollTop() - a(window).height();
            if (!a.pageless.isLoading && c < a.pageless.settings.distance) {
                a.pageless.loading(true);
                a.pageless.settings.currentPage++;
                a.extend(a.pageless.settings.params, {
                    page: a.pageless.settings.currentPage
                });
                a.pageless.settings.marker && a.extend(a.pageless.settings.params, {
                    marker: a.pageless.settings.marker
                });
                c = a.pageless.settings.url;
                c = c.split("#")[0];
                a.ajax({
                    url: c,
                    type: "GET",
                    dataType: "html",
                    data: a.pageless.settings.params,
                    success: function (d) {
                        d = a.pageless.settings.scrape(d);
                        a.pageless.loader ? a.pageless.loader.before(d) : a.pageless.el.append(d);
                        a.pageless.loading(false);
                        a.pageless.settings.complete && a.pageless.settings.complete.call()
                    }
                })
            }
        }
    }
})(jQuery);
(function (a) {
    a.path = {};
    var c = {
        rotate: function (d, e) {
            var f = e * 3.141592654 / 180;
            e = Math.cos(f);
            f = Math.sin(f);
            return [e * d[0] - f * d[1], f * d[0] + e * d[1]]
        },
        scale: function (d, e) {
            return [e * d[0], e * d[1]]
        },
        add: function (d, e) {
            return [d[0] + e[0], d[1] + e[1]]
        },
        minus: function (d, e) {
            return [d[0] - e[0], d[1] - e[1]]
        }
    };
    a.path.bezier = function (d) {
        d.start = a.extend({
            angle: 0,
            length: 0.3333
        }, d.start);
        d.end = a.extend({
            angle: 0,
            length: 0.3333
        }, d.end);
        this.p1 = [d.start.x, d.start.y];
        this.p4 = [d.end.x, d.end.y];
        var e = c.minus(this.p4, this.p1),
            f = c.scale(e, d.start.length);
        f = c.rotate(f, d.start.angle);
        this.p2 = c.add(this.p1, f);
        e = c.scale(e, -1);
        e = c.scale(e, d.end.length);
        e = c.rotate(e, d.end.angle);
        this.p3 = c.add(this.p4, e);
        this.f1 = function (b) {
            return b * b * b
        };
        this.f2 = function (b) {
            return 3 * b * b * (1 - b)
        };
        this.f3 = function (b) {
            return 3 * b * (1 - b) * (1 - b)
        };
        this.f4 = function (b) {
            return (1 - b) * (1 - b) * (1 - b)
        };
        this.css = function (b) {
            var g = this.f1(b),
                h = this.f2(b),
                j = this.f3(b);
            b = this.f4(b);
            return {
                top: this.p1[1] * g + this.p2[1] * h + this.p3[1] * j + this.p4[1] * b + "px",
                left: this.p1[0] * g + this.p2[0] * h + this.p3[0] * j + this.p4[0] * b + "px"
            }
        }
    };
    a.path.arc = function (d) {
        for (var e in d) this[e] = d[e];
        for (this.dir = this.dir || 1; this.start > this.end && this.dir > 0;) this.start -= 360;
        for (; this.start < this.end && this.dir < 0;) this.start += 360;
        this.css = function (f) {
            f = this.start * f + this.end * (1 - f);
            f = f * 3.1415927 / 180;
            var b = Math.sin(f) * this.radius + this.center[0];
            return {
                top: Math.cos(f) * this.radius + this.center[1] + "px",
                left: b + "px"
            }
        }
    };
    a.fx.step.path = function (d) {
        var e = d.end.css(1 - d.pos);
        for (var f in e) d.elem.style[f] = e[f]
    }
})(jQuery);
(function () {
    function a(r, y, A) {
        if (r === y) return r !== 0 || 1 / r == 1 / y;
        if (r == null || y == null) return r === y;
        if (r._chain) r = r._wrapped;
        if (y._chain) y = y._wrapped;
        if (r.isEqual && m.isFunction(r.isEqual)) return r.isEqual(y);
        if (y.isEqual && m.isFunction(y.isEqual)) return y.isEqual(r);
        var E = j.call(r);
        if (E != j.call(y)) return false;
        switch (E) {
        case "[object String]":
            return r == String(y);
        case "[object Number]":
            return r != +r ? y != +y : r == 0 ? 1 / r == 1 / y : r == +y;
        case "[object Date]":
        case "[object Boolean]":
            return +r == +y;
        case "[object RegExp]":
            return r.source == y.source && r.global == y.global && r.multiline == y.multiline && r.ignoreCase == y.ignoreCase
        }
        if (typeof r != "object" || typeof y != "object") return false;
        for (var G = A.length; G--;) if (A[G] == r) return true;
        A.push(r);
        G = 0;
        var H = true;
        if (E == "[object Array]") {
            G = r.length;
            if (H = G == y.length) for (; G--;) if (!(H = G in r == G in y && a(r[G], y[G], A))) break
        } else {
            if ("constructor" in r != "constructor" in y || r.constructor != y.constructor) return false;
            for (var I in r) if (m.has(r, I)) {
                G++;
                if (!(H = m.has(y, I) && a(r[I], y[I], A))) break
            }
            if (H) {
                for (I in y) if (m.has(y, I) && !G--) break;
                H = !G
            }
        }
        A.pop();
        return H
    }
    var c = this,
        d = c._,
        e = {},
        f = Array.prototype,
        b = Object.prototype,
        g = f.slice,
        h = f.unshift,
        j = b.toString,
        k = b.hasOwnProperty,
        q = f.forEach,
        u = f.map,
        n = f.reduce,
        l = f.reduceRight,
        p = f.filter,
        s = f.every,
        v = f.some,
        C = f.indexOf,
        D = f.lastIndexOf;
    b = Array.isArray;
    var F = Object.keys,
        o = Function.prototype.bind,
        m = function (r) {
            return new L(r)
        };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) exports = module.exports = m;
        exports._ = m
    } else c._ = m;
    m.VERSION = "1.3.1";
    var z = m.each = m.forEach = function (r, y, A) {
            if (r != null) if (q && r.forEach === q) r.forEach(y, A);
            else if (r.length === +r.length) for (var E = 0, G = r.length; E < G; E++) {
                if (E in r && y.call(A, r[E], E, r) === e) return
            } else for (E in r) if (m.has(r, E)) if (y.call(A, r[E], E, r) === e) return
        };
    m.map = m.collect = function (r, y, A) {
        var E = [];
        if (r == null) return E;
        if (u && r.map === u) return r.map(y, A);
        z(r, function (G, H, I) {
            E[E.length] = y.call(A, G, H, I)
        });
        if (r.length === +r.length) E.length = r.length;
        return E
    };
    m.reduce = m.foldl = m.inject = function (r, y, A, E) {
        var G = arguments.length > 2;
        if (r == null) r = [];
        if (n && r.reduce === n) {
            if (E) y = m.bind(y, E);
            return G ? r.reduce(y, A) : r.reduce(y)
        }
        z(r, function (H, I, M) {
            if (G) A = y.call(E, A, H, I, M);
            else {
                A = H;
                G = true
            }
        });
        if (!G) throw new TypeError("Reduce of empty array with no initial value");
        return A
    };
    m.reduceRight = m.foldr = function (r, y, A, E) {
        var G = arguments.length > 2;
        if (r == null) r = [];
        if (l && r.reduceRight === l) {
            if (E) y = m.bind(y, E);
            return G ? r.reduceRight(y, A) : r.reduceRight(y)
        }
        var H = m.toArray(r).reverse();
        if (E && !G) y = m.bind(y, E);
        return G ? m.reduce(H, y, A, E) : m.reduce(H, y)
    };
    m.find = m.detect = function (r, y, A) {
        var E;
        B(r, function (G, H, I) {
            if (y.call(A, G, H, I)) {
                E = G;
                return true
            }
        });
        return E
    };
    m.filter = m.select = function (r, y, A) {
        var E = [];
        if (r == null) return E;
        if (p && r.filter === p) return r.filter(y, A);
        z(r, function (G, H, I) {
            if (y.call(A, G, H, I)) E[E.length] = G
        });
        return E
    };
    m.reject = function (r, y, A) {
        var E = [];
        if (r == null) return E;
        z(r, function (G, H, I) {
            y.call(A, G, H, I) || (E[E.length] = G)
        });
        return E
    };
    m.every = m.all = function (r, y, A) {
        var E = true;
        if (r == null) return E;
        if (s && r.every === s) return r.every(y, A);
        z(r, function (G, H, I) {
            if (!(E = E && y.call(A, G, H, I))) return e
        });
        return E
    };
    var B = m.some = m.any = function (r, y, A) {
            y || (y = m.identity);
            var E = false;
            if (r == null) return E;
            if (v && r.some === v) return r.some(y, A);
            z(r, function (G, H, I) {
                if (E || (E = y.call(A, G, H, I))) return e
            });
            return !!E
        };
    m.include = m.contains = function (r, y) {
        var A = false;
        if (r == null) return A;
        if (C && r.indexOf === C) return r.indexOf(y) != -1;
        return A = B(r, function (E) {
            return E === y
        })
    };
    m.invoke = function (r, y) {
        var A = g.call(arguments, 2);
        return m.map(r, function (E) {
            return (m.isFunction(y) ? y || E : E[y]).apply(E, A)
        })
    };
    m.pluck = function (r, y) {
        return m.map(r, function (A) {
            return A[y]
        })
    };
    m.max = function (r, y, A) {
        if (!y && m.isArray(r)) return Math.max.apply(Math, r);
        if (!y && m.isEmpty(r)) return -Infinity;
        var E = {
            computed: -Infinity
        };
        z(r, function (G, H, I) {
            H = y ? y.call(A, G, H, I) : G;
            H >= E.computed && (E = {
                value: G,
                computed: H
            })
        });
        return E.value
    };
    m.min = function (r, y, A) {
        if (!y && m.isArray(r)) return Math.min.apply(Math, r);
        if (!y && m.isEmpty(r)) return Infinity;
        var E = {
            computed: Infinity
        };
        z(r, function (G, H, I) {
            H = y ? y.call(A, G, H, I) : G;
            H < E.computed && (E = {
                value: G,
                computed: H
            })
        });
        return E.value
    };
    m.shuffle = function (r) {
        var y = [],
            A;
        z(r, function (E, G) {
            if (G == 0) y[0] = E;
            else {
                A = Math.floor(Math.random() * (G + 1));
                y[G] = y[A];
                y[A] = E
            }
        });
        return y
    };
    m.sortBy = function (r, y, A) {
        return m.pluck(m.map(r, function (E, G, H) {
            return {
                value: E,
                criteria: y.call(A, E, G, H)
            }
        }).sort(function (E, G) {
            E = E.criteria;
            G = G.criteria;
            return E < G ? -1 : E > G ? 1 : 0
        }), "value")
    };
    m.groupBy = function (r, y) {
        var A = {},
            E = m.isFunction(y) ? y : function (G) {
                return G[y]
            };
        z(r, function (G, H) {
            H = E(G, H);
            (A[H] || (A[H] = [])).push(G)
        });
        return A
    };
    m.sortedIndex = function (r, y, A) {
        A || (A = m.identity);
        for (var E = 0, G = r.length; E < G;) {
            var H = E + G >> 1;
            A(r[H]) < A(y) ? (E = H + 1) : (G = H)
        }
        return E
    };
    m.toArray = function (r) {
        if (!r) return [];
        if (r.toArray) return r.toArray();
        if (m.isArray(r)) return g.call(r);
        if (m.isArguments(r)) return g.call(r);
        return m.values(r)
    };
    m.size = function (r) {
        return m.toArray(r).length
    };
    m.first = m.head = function (r, y, A) {
        return y != null && !A ? g.call(r, 0, y) : r[0]
    };
    m.initial = function (r, y, A) {
        return g.call(r, 0, r.length - (y == null || A ? 1 : y))
    };
    m.last = function (r, y, A) {
        return y != null && !A ? g.call(r, Math.max(r.length - y, 0)) : r[r.length - 1]
    };
    m.rest = m.tail = function (r, y, A) {
        return g.call(r, y == null || A ? 1 : y)
    };
    m.compact = function (r) {
        return m.filter(r, function (y) {
            return !!y
        })
    };
    m.flatten = function (r, y) {
        return m.reduce(r, function (A, E) {
            if (m.isArray(E)) return A.concat(y ? E : m.flatten(E));
            A[A.length] = E;
            return A
        }, [])
    };
    m.without = function (r) {
        return m.difference(r, g.call(arguments, 1))
    };
    m.uniq = m.unique = function (r, y, A) {
        A = A ? m.map(r, A) : r;
        var E = [];
        m.reduce(A, function (G, H, I) {
            if (0 == I || (y === true ? m.last(G) != H : !m.include(G, H))) {
                G[G.length] = H;

                E[E.length] = r[I]
            }
            return G
        }, []);
        return E
    };
    m.union = function () {
        return m.uniq(m.flatten(arguments, true))
    };
    m.intersection = m.intersect = function (r) {
        var y = g.call(arguments, 1);
        return m.filter(m.uniq(r), function (A) {
            return m.every(y, function (E) {
                return m.indexOf(E, A) >= 0
            })
        })
    };
    m.difference = function (r) {
        var y = m.flatten(g.call(arguments, 1));
        return m.filter(r, function (A) {
            return !m.include(y, A)
        })
    };
    m.zip = function () {
        for (var r = g.call(arguments), y = m.max(m.pluck(r, "length")), A = new Array(y), E = 0; E < y; E++) A[E] = m.pluck(r, "" + E);
        return A
    };
    m.indexOf = function (r, y, A) {
        if (r == null) return -1;
        var E;
        if (A) {
            A = m.sortedIndex(r, y);
            return r[A] === y ? A : -1
        }
        if (C && r.indexOf === C) return r.indexOf(y);
        A = 0;
        for (E = r.length; A < E; A++) if (A in r && r[A] === y) return A;
        return -1
    };
    m.lastIndexOf = function (r, y) {
        if (r == null) return -1;
        if (D && r.lastIndexOf === D) return r.lastIndexOf(y);
        for (var A = r.length; A--;) if (A in r && r[A] === y) return A;
        return -1
    };
    m.range = function (r, y, A) {
        if (arguments.length <= 1) {
            y = r || 0;
            r = 0
        }
        A = arguments[2] || 1;
        for (var E = Math.max(Math.ceil((y - r) / A), 0), G = 0, H = new Array(E); G < E;) {
            H[G++] = r;
            r += A
        }
        return H
    };
    var w = function () {};
    m.bind = function (r, y) {
        var A, E;
        if (r.bind === o && o) return o.apply(r, g.call(arguments, 1));
        if (!m.isFunction(r)) throw new TypeError;
        E = g.call(arguments, 2);
        return A = function () {
            if (!(this instanceof A)) return r.apply(y, E.concat(g.call(arguments)));
            w.prototype = r.prototype;
            var G = new w,
                H = r.apply(G, E.concat(g.call(arguments)));
            if (Object(H) === H) return H;
            return G
        }
    };
    m.bindAll = function (r) {
        var y = g.call(arguments, 1);
        if (y.length == 0) y = m.functions(r);
        z(y, function (A) {
            r[A] = m.bind(r[A], r)
        });
        return r
    };
    m.memoize = function (r, y) {
        var A = {};
        y || (y = m.identity);
        return function () {
            var E = y.apply(this, arguments);
            return m.has(A, E) ? A[E] : (A[E] = r.apply(this, arguments))
        }
    };
    m.delay = function (r, y) {
        var A = g.call(arguments, 2);
        return setTimeout(function () {
            return r.apply(r, A)
        }, y)
    };
    m.defer = function (r) {
        return m.delay.apply(m, [r, 1].concat(g.call(arguments, 1)))
    };
    m.throttle = function (r, y) {
        var A, E, G, H, I, M = m.debounce(function () {
            I = H = false
        }, y);
        return function () {
            A = this;
            E = arguments;
            var P = function () {
                    G = null;
                    I && r.apply(A, E);
                    M()
                };
            G || (G = setTimeout(P, y));
            if (H) I = true;
            else r.apply(A, E);
            M();
            H = true
        }
    };
    m.debounce = function (r, y) {
        var A;
        return function () {
            var E = this,
                G = arguments;
            clearTimeout(A);
            A = setTimeout(function () {
                A = null;
                r.apply(E, G)
            }, y)
        }
    };
    m.once = function (r) {
        var y = false,
            A;
        return function () {
            if (y) return A;
            y = true;
            return A = r.apply(this, arguments)
        }
    };
    m.wrap = function (r, y) {
        return function () {
            var A = [r].concat(g.call(arguments, 0));
            return y.apply(this, A)
        }
    };
    m.compose = function () {
        var r = arguments;
        return function () {
            for (var y = arguments, A = r.length - 1; A >= 0; A--) y = [r[A].apply(this, y)];
            return y[0]
        }
    };
    m.after = function (r, y) {
        if (r <= 0) return y();
        return function () {
            if (--r < 1) return y.apply(this, arguments)
        }
    };
    m.keys = F ||
    function (r) {
        if (r !== Object(r)) throw new TypeError("Invalid object");
        var y = [];
        for (var A in r) if (m.has(r, A)) y[y.length] = A;
        return y
    };
    m.values = function (r) {
        return m.map(r, m.identity)
    };
    m.functions = m.methods = function (r) {
        var y = [];
        for (var A in r) m.isFunction(r[A]) && y.push(A);
        return y.sort()
    };
    m.extend = function (r) {
        z(g.call(arguments, 1), function (y) {
            for (var A in y) r[A] = y[A]
        });
        return r
    };
    m.defaults = function (r) {
        z(g.call(arguments, 1), function (y) {
            for (var A in y) if (r[A] == null) r[A] = y[A]
        });
        return r
    };
    m.clone = function (r) {
        if (!m.isObject(r)) return r;
        return m.isArray(r) ? r.slice() : m.extend({}, r)
    };
    m.tap = function (r, y) {
        y(r);
        return r
    };
    m.isEqual = function (r, y) {
        return a(r, y, [])
    };
    m.isEmpty = function (r) {
        if (m.isArray(r) || m.isString(r)) return r.length === 0;
        for (var y in r) if (m.has(r, y)) return false;
        return true
    };
    m.isElement = function (r) {
        return !!(r && r.nodeType == 1)
    };
    m.isArray = b ||
    function (r) {
        return j.call(r) == "[object Array]"
    };
    m.isObject = function (r) {
        return r === Object(r)
    };
    m.isArguments = function (r) {
        return j.call(r) == "[object Arguments]"
    };
    if (!m.isArguments(arguments)) m.isArguments = function (r) {
        return !!(r && m.has(r, "callee"))
    };
    m.isFunction = function (r) {
        return j.call(r) == "[object Function]"
    };
    m.isString = function (r) {
        return j.call(r) == "[object String]"
    };
    m.isNumber = function (r) {
        return j.call(r) == "[object Number]"
    };
    m.isNaN = function (r) {
        return r !== r
    };
    m.isBoolean = function (r) {
        return r === true || r === false || j.call(r) == "[object Boolean]"
    };
    m.isDate = function (r) {
        return j.call(r) == "[object Date]"
    };
    m.isRegExp = function (r) {
        return j.call(r) == "[object RegExp]"
    };
    m.isNull = function (r) {
        return r === null
    };
    m.isUndefined = function (r) {
        return r === void 0
    };
    m.has = function (r, y) {
        return k.call(r, y)
    };
    m.noConflict = function () {
        c._ = d;
        return this
    };
    m.identity = function (r) {
        return r
    };
    m.times = function (r, y, A) {
        for (var E = 0; E < r; E++) y.call(A, E)
    };
    m.escape = function (r) {
        return ("" + r).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    m.mixin = function (r) {
        z(m.functions(r), function (y) {
            O(y, m[y] = r[y])
        })
    };
    var x = 0;
    m.uniqueId = function (r) {
        var y = x++;
        return r ? r + y : y
    };
    m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var J = /.^/,
        K = function (r) {
            return r.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
        };
    m.template = function (r, y) {
        var A = m.templateSettings;
        r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + r.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(A.escape || J, function (G, H) {
            return "',_.escape(" + K(H) + "),'"
        }).replace(A.interpolate || J, function (G, H) {
            return "'," + K(H) + ",'"
        }).replace(A.evaluate || J, function (G, H) {
            return "');" + K(H).replace(/[\r\n\t]/g, " ") + ";__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
        var E = new Function("obj", "_", r);
        if (y) return E(y, m);
        return function (G) {
            return E.call(this, G, m)
        }
    };
    m.chain = function (r) {
        return m(r).chain()
    };
    var L = function (r) {
            this._wrapped = r
        };
    m.prototype = L.prototype;
    var N = function (r, y) {
            return y ? m(r).chain() : r
        },
        O = function (r, y) {
            L.prototype[r] = function () {
                var A = g.call(arguments);
                h.call(A, this._wrapped);
                return N(y.apply(m, A), this._chain)
            }
        };
    m.mixin(m);
    z(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (r) {
        var y = f[r];
        L.prototype[r] = function () {
            var A = this._wrapped;
            y.apply(A, arguments);
            var E = A.length;
            if ((r == "shift" || r == "splice") && E === 0) delete A[0];
            return N(A, this._chain)
        }
    });
    z(["concat", "join", "slice"], function (r) {
        var y = f[r];
        L.prototype[r] = function () {
            return N(y.apply(this._wrapped, arguments), this._chain)
        }
    });
    L.prototype.chain = function () {
        this._chain = true;
        return this
    };
    L.prototype.value = function () {
        return this._wrapped
    }
}).call(this);
(function () {
    var a = this,
        c = a.Backbone,
        d = Array.prototype.slice,
        e = Array.prototype.splice,
        f;
    f = typeof exports !== "undefined" ? exports : (a.Backbone = {});
    f.VERSION = "0.9.1";
    var b = a._;
    if (!b && typeof require !== "undefined") b = require("underscore");
    var g = a.jQuery || a.Zepto || a.ender;
    f.setDomLibrary = function (o) {
        g = o
    };
    f.noConflict = function () {
        a.Backbone = c;
        return this
    };
    f.emulateHTTP = false;
    f.emulateJSON = false;
    f.Events = {
        on: function (o, m, z) {
            var B;
            o = o.split(/\s+/);
            for (var w = this._callbacks || (this._callbacks = {}); B = o.shift();) {
                B = w[B] || (w[B] = {});
                var x = B.tail || (B.tail = B.next = {});
                x.callback = m;
                x.context = z;
                B.tail = x.next = {}
            }
            return this
        },
        off: function (o, m, z) {
            var B, w, x;
            if (o) {
                if (w = this._callbacks) for (o = o.split(/\s+/); B = o.shift();) {
                    x = w[B];
                    delete w[B];
                    if (m && x) for (;
                    (x = x.next) && x.next;) x.callback === m && (!z || x.context === z) || this.on(B, x.callback, x.context)
                }
            } else delete this._callbacks;
            return this
        },
        trigger: function (o) {
            var m, z, B, w;
            if (!(z = this._callbacks)) return this;
            B = z.all;
            for ((o = o.split(/\s+/)).push(null); m = o.shift();) {
                B && o.push({
                    next: B.next,
                    tail: B.tail,
                    event: m
                });
                if (m = z[m]) o.push({
                    next: m.next,
                    tail: m.tail
                })
            }
            for (w = d.call(arguments, 1); m = o.pop();) {
                z = m.tail;
                for (B = m.event ? [m.event].concat(w) : w;
                (m = m.next) !== z;) m.callback.apply(m.context || this, B)
            }
            return this
        }
    };
    f.Events.bind = f.Events.on;
    f.Events.unbind = f.Events.off;
    f.Model = function (o, m) {
        var z;
        o || (o = {});
        if (m && m.parse) o = this.parse(o);
        if (z = D(this, "defaults")) o = b.extend({}, z, o);
        if (m && m.collection) this.collection = m.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = b.uniqueId("c");
        if (!this.set(o, {
            silent: true
        })) throw new Error("Can't create an invalid model");
        delete this._changed;
        this._previousAttributes = b.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    b.extend(f.Model.prototype, f.Events, {
        idAttribute: "id",
        initialize: function () {},
        toJSON: function () {
            return b.clone(this.attributes)
        },
        get: function (o) {
            return this.attributes[o]
        },
        escape: function (o) {
            var m;
            if (m = this._escapedAttributes[o]) return m;
            m = this.attributes[o];
            return this._escapedAttributes[o] = b.escape(m == null ? "" : "" + m)
        },
        has: function (o) {
            return this.attributes[o] != null
        },
        set: function (o, m, z) {
            var B, w;
            if (b.isObject(o) || o == null) {
                B = o;
                z = m
            } else {
                B = {};
                B[o] = m
            }
            z || (z = {});
            if (!B) return this;
            if (B instanceof f.Model) B = B.attributes;
            if (z.unset) for (w in B) B[w] = void 0;
            if (!this._validate(B, z)) return false;
            if (this.idAttribute in B) this.id = B[this.idAttribute];
            m = this.attributes;
            var x = this._escapedAttributes,
                J = this._previousAttributes || {},
                K = this._setting;
            this._changed || (this._changed = {});
            this._setting = true;
            for (w in B) {
                o = B[w];
                b.isEqual(m[w], o) || delete x[w];
                z.unset ? delete m[w] : (m[w] = o);
                if (this._changing && !b.isEqual(this._changed[w], o)) {
                    this.trigger("change:" + w, this, o, z);
                    this._moreChanges = true
                }
                delete this._changed[w];
                if (!b.isEqual(J[w], o) || b.has(m, w) != b.has(J, w)) this._changed[w] = o
            }
            if (!K) {
                !z.silent && this.hasChanged() && this.change(z);
                this._setting = false
            }
            return this
        },
        unset: function (o, m) {
            (m || (m = {})).unset = true;
            return this.set(o, null, m)
        },
        clear: function (o) {
            (o || (o = {})).unset = true;
            return this.set(b.clone(this.attributes), o)
        },
        fetch: function (o) {
            o = o ? b.clone(o) : {};
            var m = this,
                z = o.success;
            o.success = function (B, w, x) {
                if (!m.set(m.parse(B, x), o)) return false;
                z && z(m, B)
            };
            o.error = f.wrapError(o.error, m, o);
            return (this.sync || f.sync).call(this, "read", this, o)
        },
        save: function (o, m, z) {
            var B, w;
            if (b.isObject(o) || o == null) {
                B = o;
                z = m
            } else {
                B = {};
                B[o] = m
            }
            z = z ? b.clone(z) : {};
            if (z.wait) w = b.clone(this.attributes);
            o = b.extend({}, z, {
                silent: true
            });
            if (B && !this.set(B, z.wait ? o : z)) return false;
            var x = this,
                J = z.success;
            z.success = function (K, L, N) {
                L = x.parse(K, N);
                if (z.wait) L = b.extend(B || {}, L);
                if (!x.set(L, z)) return false;
                J ? J(x, K) : x.trigger("sync", x, K, z)
            };
            z.error = f.wrapError(z.error, x, z);
            m = this.isNew() ? "create" : "update";
            m = (this.sync || f.sync).call(this, m, this, z);
            z.wait && this.set(w, o);
            return m
        },
        destroy: function (o) {
            o = o ? b.clone(o) : {};
            var m = this,
                z = o.success,
                B = function () {
                    m.trigger("destroy", m, m.collection, o)
                };
            if (this.isNew()) return B();
            o.success = function (x) {
                o.wait && B();
                z ? z(m, x) : m.trigger("sync", m, x, o)
            };
            o.error = f.wrapError(o.error, m, o);
            var w = (this.sync || f.sync).call(this, "delete", this, o);
            o.wait || B();
            return w
        },
        url: function () {
            var o = D(this.collection, "url") || D(this, "urlRoot") || F();
            if (this.isNew()) return o;
            return o + (o.charAt(o.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function (o) {
            return o
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return this.id == null
        },
        change: function (o) {
            if (this._changing || !this.hasChanged()) return this;
            this._moreChanges = this._changing = true;
            for (var m in this._changed) this.trigger("change:" + m, this, this._changed[m], o);
            for (; this._moreChanges;) {
                this._moreChanges = false;
                this.trigger("change", this, o)
            }
            this._previousAttributes = b.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this
        },
        hasChanged: function (o) {
            if (!arguments.length) return !b.isEmpty(this._changed);
            return this._changed && b.has(this._changed, o)
        },
        changedAttributes: function (o) {
            if (!o) return this.hasChanged() ? b.clone(this._changed) : false;
            var m, z = false,
                B = this._previousAttributes;
            for (var w in o) if (!b.isEqual(B[w], m = o[w]))(z || (z = {}))[w] = m;
            return z
        },
        previous: function (o) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[o]
        },
        previousAttributes: function () {
            return b.clone(this._previousAttributes)
        },
        isValid: function () {
            return !this.validate(this.attributes)
        },
        _validate: function (o, m) {
            if (m.silent || !this.validate) return true;
            o = b.extend({}, this.attributes, o);
            o = this.validate(o, m);
            if (!o) return true;
            m && m.error ? m.error(this, o, m) : this.trigger("error", this, o, m);
            return false
        }
    });
    f.Collection = function (o, m) {
        m || (m = {});
        if (m.comparator) this.comparator = m.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        o && this.reset(o, {
            silent: true,
            parse: m.parse
        })
    };
    b.extend(f.Collection.prototype, f.Events, {
        model: f.Model,
        initialize: function () {},
        toJSON: function () {
            return this.map(function (o) {
                return o.toJSON()
            })
        },
        add: function (o, m) {
            var z, B, w, x, J, K = {},
                L = {};
            m || (m = {});
            o = b.isArray(o) ? o.slice() : [o];
            z = 0;
            for (B = o.length; z < B; z++) {
                if (!(w = o[z] = this._prepareModel(o[z], m))) throw new Error("Can't add an invalid model to a collection");
                if (K[x = w.cid] || this._byCid[x] || (J = w.id) != null && (L[J] || this._byId[J])) throw new Error("Can't add the same model to a collection twice");
                K[x] = L[J] = w
            }
            for (z = 0; z < B; z++) {
                (w = o[z]).on("all", this._onModelEvent, this);
                this._byCid[w.cid] = w;
                if (w.id != null) this._byId[w.id] = w
            }
            this.length += B;
            e.apply(this.models, [m.at != null ? m.at : this.models.length, 0].concat(o));
            this.comparator && this.sort({
                silent: true
            });
            if (m.silent) return this;
            z = 0;
            for (B = this.models.length; z < B; z++) if (K[(w = this.models[z]).cid]) {
                m.index = z;
                w.trigger("add", w, this, m)
            }
            return this
        },
        remove: function (o, m) {
            var z, B, w, x;
            m || (m = {});
            o = b.isArray(o) ? o.slice() : [o];
            z = 0;
            for (B = o.length; z < B; z++) if (x = this.getByCid(o[z]) || this.get(o[z])) {
                delete this._byId[x.id];
                delete this._byCid[x.cid];
                w = this.indexOf(x);
                this.models.splice(w, 1);
                this.length--;
                if (!m.silent) {
                    m.index = w;
                    x.trigger("remove", x, this, m)
                }
                this._removeReference(x)
            }
            return this
        },
        get: function (o) {
            if (o == null) return null;
            return this._byId[o.id != null ? o.id : o]
        },
        getByCid: function (o) {
            return o && this._byCid[o.cid || o]
        },
        at: function (o) {
            return this.models[o]
        },
        sort: function (o) {
            o || (o = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var m = b.bind(this.comparator, this);
            if (this.comparator.length == 1) this.models = this.sortBy(m);
            else this.models.sort(m);
            o.silent || this.trigger("reset", this, o);
            return this
        },
        pluck: function (o) {
            return b.map(this.models, function (m) {
                return m.get(o)
            })
        },
        reset: function (o, m) {
            o || (o = []);
            m || (m = {});
            for (var z = 0, B = this.models.length; z < B; z++) this._removeReference(this.models[z]);
            this._reset();
            this.add(o, {
                silent: true,
                parse: m.parse
            });
            m.silent || this.trigger("reset", this, m);
            return this
        },
        fetch: function (o) {
            o = o ? b.clone(o) : {};
            if (o.parse === undefined) o.parse = true;
            var m = this,
                z = o.success;
            o.success = function (B, w, x) {
                m[o.add ? "add" : "reset"](m.parse(B, x), o);
                z && z(m, B)
            };
            o.error = f.wrapError(o.error, m, o);
            return (this.sync || f.sync).call(this, "read", this, o)
        },
        create: function (o, m) {
            var z = this;
            m = m ? b.clone(m) : {};
            o = this._prepareModel(o, m);
            if (!o) return false;
            m.wait || z.add(o, m);
            var B = m.success;
            m.success = function (w, x) {
                m.wait && z.add(w, m);
                B ? B(w, x) : w.trigger("sync", o, x, m)
            };
            o.save(null, m);
            return o
        },
        parse: function (o) {
            return o
        },
        chain: function () {
            return b(this.models).chain()
        },
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function (o, m) {
            if (o instanceof f.Model) {
                if (!o.collection) o.collection = this
            } else {
                o = o;
                m.collection = this;
                o = new this.model(o, m);
                o._validate(o.attributes, m) || (o = false)
            }
            return o
        },
        _removeReference: function (o) {
            this == o.collection && delete o.collection;
            o.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (o, m, z, B) {
            if (!((o == "add" || o == "remove") && z != this)) {
                o == "destroy" && this.remove(m, B);
                if (m && o === "change:" + m.idAttribute) {
                    delete this._byId[m.previous(m.idAttribute)];
                    this._byId[m.id] = m
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    b.each(["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"], function (o) {
        f.Collection.prototype[o] = function () {
            return b[o].apply(b, [this.models].concat(b.toArray(arguments)))
        }
    });
    f.Router = function (o) {
        o || (o = {});
        if (o.routes) this.routes = o.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var h = /:\w+/g,
        j = /\*\w+/g,
        k = /[-[\]{}()+?.,\\^$|#\s]/g;
    b.extend(f.Router.prototype, f.Events, {
        initialize: function () {},
        route: function (o, m, z) {
            f.history || (f.history = new f.History);
            b.isRegExp(o) || (o = this._routeToRegExp(o));
            z || (z = this[m]);
            f.history.route(o, b.bind(function (B) {
                B = this._extractParameters(o, B);
                z && z.apply(this, B);
                this.trigger.apply(this, ["route:" + m].concat(B));
                f.history.trigger("route", this, m, B)
            }, this));
            return this
        },
        navigate: function (o, m) {
            f.history.navigate(o, m)
        },
        _bindRoutes: function () {
            if (this.routes) {
                var o = [];
                for (var m in this.routes) o.unshift([m, this.routes[m]]);
                m = 0;
                for (var z = o.length; m < z; m++) this.route(o[m][0], o[m][1], this[o[m][1]])
            }
        },
        _routeToRegExp: function (o) {
            o = o.replace(k, "\\$&").replace(h, "([^/]+)").replace(j, "(.*?)");
            return new RegExp("^" + o + "$")
        },
        _extractParameters: function (o, m) {
            return o.exec(m).slice(1)
        }
    });
    f.History = function () {
        this.handlers = [];
        b.bindAll(this, "checkUrl")
    };
    var q = /^[#\/]/,
        u = /msie [\w.]+/,
        n = false;
    b.extend(f.History.prototype, f.Events, {
        interval: 50,
        getFragment: function (o, m) {
            if (o == null) if (this._hasPushState || m) {
                o = window.location.pathname;
                if (m = window.location.search) o += m
            } else o = window.location.hash;
            o = decodeURIComponent(o);
            o.indexOf(this.options.root) || (o = o.substr(this.options.root.length));
            return o.replace(q, "")
        },
        start: function (o) {
            if (n) throw new Error("Backbone.history has already been started");
            this.options = b.extend({}, {
                root: "/"
            }, this.options, o);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            o = this.getFragment();
            var m = document.documentMode;
            if (m = u.exec(navigator.userAgent.toLowerCase()) && (!m || m <= 7)) {
                this.iframe = g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(o)
            }
            if (this._hasPushState) g(window).bind("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !m) g(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = o;
            n = true;
            o = window.location;
            m = o.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !m) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && m && o.hash) {
                this.fragment = o.hash.replace(q, "");
                window.history.replaceState({}, document.title, o.protocol + "//" + o.host + this.options.root + this.fragment)
            }
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function () {
            g(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            n = false
        },
        route: function (o, m) {
            this.handlers.unshift({
                route: o,
                callback: m
            })
        },
        checkUrl: function () {
            var o = this.getFragment();
            if (o == this.fragment && this.iframe) o = this.getFragment(this.iframe.location.hash);
            if (o == this.fragment || o == decodeURIComponent(this.fragment)) return false;
            this.iframe && this.navigate(o);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function (o) {
            var m = this.fragment = this.getFragment(o);
            return b.any(this.handlers, function (z) {
                if (z.route.test(m)) {
                    z.callback(m);
                    return true
                }
            })
        },
        navigate: function (o, m) {
            if (!n) return false;
            if (!m || m === true) m = {
                trigger: m
            };
            var z = (o || "").replace(q, "");
            if (!(this.fragment == z || this.fragment == decodeURIComponent(z))) {
                if (this._hasPushState) {
                    if (z.indexOf(this.options.root) != 0) z = this.options.root + z;
                    this.fragment = z;
                    window.history[m.replace ? "replaceState" : "pushState"]({}, document.title, z)
                } else if (this._wantsHashChange) {
                    this.fragment = z;
                    this._updateHash(window.location, z, m.replace);
                    if (this.iframe && z != this.getFragment(this.iframe.location.hash)) {
                        m.replace || this.iframe.document.open().close();
                        this._updateHash(this.iframe.location, z, m.replace)
                    }
                } else window.location.assign(this.options.root + o);
                m.trigger && this.loadUrl(o)
            }
        },
        _updateHash: function (o, m, z) {
            if (z) o.replace(o.toString().replace(/(javascript:|#).*$/, "") + "#" + m);
            else o.hash = m
        }
    });
    f.View = function (o) {
        this.cid = b.uniqueId("view");
        this._configure(o || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var l = /^(\S+)\s*(.*)$/,
        p = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    b.extend(f.View.prototype, f.Events, {
        tagName: "div",
        $: function (o) {
            return this.$el.find(o)
        },
        initialize: function () {},
        render: function () {
            return this
        },
        remove: function () {
            this.$el.remove();
            return this
        },
        make: function (o, m, z) {
            o = document.createElement(o);
            m && g(o).attr(m);
            z && g(o).html(z);
            return o
        },
        setElement: function (o, m) {
            this.$el = g(o);
            this.el = this.$el[0];
            m !== false && this.delegateEvents();
            return this
        },
        delegateEvents: function (o) {
            if (o || (o = D(this, "events"))) {
                this.undelegateEvents();
                for (var m in o) {
                    var z = o[m];
                    b.isFunction(z) || (z = this[o[m]]);
                    if (!z) throw new Error('Event "' + o[m] + '" does not exist');
                    var B = m.match(l),
                        w = B[1];
                    B = B[2];
                    z = b.bind(z, this);
                    w += ".delegateEvents" + this.cid;
                    B === "" ? this.$el.bind(w, z) : this.$el.delegate(B, w, z)
                }
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function (o) {
            if (this.options) o = b.extend({}, this.options, o);
            for (var m = 0, z = p.length; m < z; m++) {
                var B = p[m];
                if (o[B]) this[B] = o[B]
            }
            this.options = o
        },
        _ensureElement: function () {
            if (this.el) this.setElement(this.el, false);
            else {
                var o = D(this, "attributes") || {};
                if (this.id) o.id = this.id;
                if (this.className) o["class"] = this.className;
                this.setElement(this.make(this.tagName, o), false)
            }
        }
    });
    f.Model.extend = f.Collection.extend = f.Router.extend = f.View.extend = function (o, m) {
        o = C(this, o, m);
        o.extend = this.extend;
        return o
    };
    var s = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    f.sync = function (o, m, z) {
        var B = s[o],
            w = {
                type: B,
                dataType: "json"
            };
        if (!z.url) w.url = D(m, "url") || F();
        if (!z.data && m && (o == "create" || o == "update")) {
            w.contentType = "application/json";
            w.data = JSON.stringify(m.toJSON())
        }
        if (f.emulateJSON) {
            w.contentType = "application/x-www-form-urlencoded";
            w.data = w.data ? {
                model: w.data
            } : {}
        }
        if (f.emulateHTTP) if (B === "PUT" || B === "DELETE") {
            if (f.emulateJSON) w.data._method = B;
            w.type = "POST";
            w.beforeSend = function (x) {
                x.setRequestHeader("X-HTTP-Method-Override", B)
            }
        }
        if (w.type !== "GET" && !f.emulateJSON) w.processData = false;
        return g.ajax(b.extend(w, z))
    };
    f.wrapError = function (o, m, z) {
        return function (B, w) {
            w = B === m ? w : B;
            o ? o(m, w, z) : m.trigger("error", m, w, z)
        }
    };
    var v = function () {},
        C = function (o, m, z) {
            var B;
            B = m && m.hasOwnProperty("constructor") ? m.constructor : function () {
                o.apply(this, arguments)
            };
            b.extend(B, o);
            v.prototype = o.prototype;
            B.prototype = new v;
            m && b.extend(B.prototype, m);
            z && b.extend(B, z);
            B.prototype.constructor = B;
            B.__super__ = o.prototype;
            return B
        },
        D = function (o, m) {
            if (!(o && o[m])) return null;
            return b.isFunction(o[m]) ? o[m]() : o[m]
        },
        F = function () {
            throw new Error('A "url" property or function must be specified');
        }
}).call(this);
window.Modernizr = function (a, c, d) {
    function e(m) {
        u.cssText = m
    }
    function f(m, z) {
        return typeof m === z
    }
    function b(m, z) {
        for (var B in m) if (u[m[B]] !== d) return z == "pfx" ? m[B] : true;
        return false
    }
    function g(m, z, B) {
        for (var w in m) {
            var x = z[m[w]];
            if (x !== d) return B === false ? m[w] : f(x, "function") ? x.bind(B || z) : x
        }
        return false
    }
    function h(m, z, B) {
        var w = m.charAt(0).toUpperCase() + m.substr(1),
            x = (m + " " + n.join(w + " ") + w).split(" ");
        return f(z, "string") || f(z, "undefined") ? b(x, z) : (x = (m + " " + l.join(w + " ") + w).split(" "), g(x, z, B))
    }
    var j = {},
        k = c.documentElement,
        q = c.createElement("modernizr"),
        u = q.style;
    a = " -webkit- -moz- -o- -ms- ".split(" ");
    var n = "Webkit Moz O ms".split(" "),
        l = "Webkit Moz O ms".toLowerCase().split(" ");
    q = {};
    var p = [],
        s = p.slice,
        v, C = function (m, z, B, w) {
            var x, J, K, L = c.createElement("div"),
                N = c.body,
                O = N ? N : c.createElement("body");
            if (parseInt(B, 10)) for (; B--;) {
                K = c.createElement("div");
                K.id = w ? w[B] : "modernizr" + (B + 1);
                L.appendChild(K)
            }
            return x = ["&#173;<style>", m, "</style>"].join(""), L.id = "modernizr", (N ? L : O).innerHTML += x, O.appendChild(L), N || (O.style.background = "", k.appendChild(O)), J = z(L, m), N ? L.parentNode.removeChild(L) : O.parentNode.removeChild(O), !! J
        },
        D = {}.hasOwnProperty,
        F;
    !f(D, "undefined") && !f(D.call, "undefined") ? (F = function (m, z) {
        return D.call(m, z)
    }) : (F = function (m, z) {
        return z in m && f(m.constructor.prototype[z], "undefined")
    });
    Function.prototype.bind || (Function.prototype.bind = function (m) {
        var z = this;
        if (typeof z != "function") throw new TypeError;
        var B = s.call(arguments, 1),
            w = function () {
                if (this instanceof w) {
                    var x = function () {};
                    x.prototype = z.prototype;
                    x = new x;
                    var J = z.apply(x, B.concat(s.call(arguments)));
                    return Object(J) === J ? J : x
                }
                return z.apply(m, B.concat(s.call(arguments)))
            };
        return w
    });
    (function (m, z) {
        m = m.join("");
        var B = z.length;
        C(m, function (w) {
            w = w.childNodes;
            for (var x = {}; B--;) x[w[B].id] = w[B];
            j.csstransforms3d = (x.csstransforms3d && x.csstransforms3d.offsetLeft) === 9 && x.csstransforms3d.offsetHeight === 3
        }, B, z)
    })([, ["@media (", a.join("transform-3d),("), "modernizr){#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
    q.csstransforms3d = function () {
        var m = !! h("perspective");
        return m && "webkitPerspective" in k.style && (m = j.csstransforms3d), m
    };
    for (var o in q) F(q, o) && (v = o.toLowerCase(), j[v] = q[o](), p.push((j[v] ? "" : "no-") + v));
    return e(""), q = null, j._version = "2.5.3", j._prefixes = a, j._domPrefixes = l, j._cssomPrefixes = n, j.testProp = function (m) {
        return b([m])
    }, j.testAllProps = h, j.testStyles = C, k.className = k.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" js " + p.join(" ")), j
}(this, this.document);
var new_pins = {
    html: "",
    number: 0,
    old_title: ""
},
    followers_json = null,
    cache = {},
    lastXhr, media_url = "http://assets.pinterest.com/",
    useLazyLoad = !window.navigator.userAgent.match(/ipad.*OS 4_/gi);
window.onerror = function (a, c, d) {
    $.ajax({
        url: "/report_error/",
        type: "POST",
        dataType: "json",
        data: {
            exception_type: a,
            url: c || window.location.href,
            line: d
        }
    });
    return true
};

function getCookie(a) {
    var c = null;
    if (document.cookie && document.cookie != "") for (var d = document.cookie.split(";"), e = 0; e < d.length; e++) {
        var f = jQuery.trim(d[e]);
        if (f.substring(0, a.length + 1) == a + "=") c = decodeURIComponent(f.substring(a.length + 1))
    }
    return c
}
$("html").ajaxSend(function (a, c) {
    c.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
});

function setCookie(a, c, d) {
    if (d) {
        var e = new Date;
        e.setTime(e.getTime() + d * 24 * 60 * 60 * 1E3);
        d = "; expires=" + e.toGMTString()
    } else d = "";
    document.cookie = a + "=" + c + d + "; path=/"
}

function deleteCookie(a) {
    setCookie(a, "", -1)
}
$.extend({
    getUrlVars: function () {
        for (var a = [], c, d = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), e = 0; e < d.length; e++) {
            c = d[e].split("=");
            a.push(c[0]);
            a[c[0]] = c[1]
        }
        return a
    },
    getUrlVar: function (a) {
        return $.getUrlVars()[a]
    }
});
(function (a) {
    a.fn.extend({
        defaultValue: function (c, d) {
            a(this).focus(function () {
                a(this).val() == c && a(this).val("")
            }).blur(function () {
                if (a(this).val() == "") {
                    a(this).val(c);
                    d && a(this).addClass(d)
                }
            })
        }
    })
})(jQuery);
if (!Array.indexOf) Array.prototype.indexOf = function (a) {
    for (var c = 0; c < this.length; c++) if (this[c] == a) return c;
    return -1
};

function is_video(a) {
    return /^http:\/\/img\.youtube\.com/.test(a) || /^http:\/\/b\.vimeocdn\.com/.test(a)
}
function getHTML(a) {
    var c = $(a).wrap("<div />").parent().html();
    $(a).unwrap();
    return c
}
var ScrollToTop = ScrollToTop || {
    setup: function () {
        var a = $(window).height() / 2;
        $(window).scroll(function () {
            (window.innerWidth ? window.pageYOffset : document.documentElement.scrollTop) >= a ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function () {
            $("html, body").animate({
                scrollTop: "0px"
            }, 400);
            return false
        })
    }
},
    Modal = Modal || {
        setup: function () {
            $(document).keydown(function (a) {
                if (a.keyCode == 27) {
                    var c = $(".ModalContainer:visible").attr("id");
                    if (c) Modal.close(c);
                    else $("#zoomScroll").length && window.history.back();
                    a.preventDefault()
                }
            })
        },
        show: function (a) {
            var c = $("#" + a),
                d = $(".modal:first", c),
                e = c.parent(),
                f = this;
            c.find(".close").on("click", function () {
                f.trigger("cancel")
            });
            if (e[0] !== $("body")[0]) {
                $("body").append(c);
                c.data("parent", e)
            }
            $("body").addClass("noscroll");
            c.show();
            e = d.outerHeight();
            d.css("margin-bottom", "-" + e / 2 + "px");
            setTimeout(function () {
                c.addClass("visible");
                c.css("-webkit-transform", "none")
            }, 1);
            this.trigger("show", a);
            return false
        },
        close: function (a) {
            var c = $("#" + a);
            c.data("parent") && c.data("parent").append(c);
            $("#zoomScroll").length === 0 && $("body").removeClass("noscroll");
            c.removeClass("visible");
            setTimeout(function () {
                c.hide();
                c.css("-webkit-transform", "translateZ(0)")
            }, 251);
            this.trigger("close", a);
            return false
        }
    };
_.extend(Modal, Backbone.Events);
var Arrays = {
    conjunct: function (a) {
        if (a.length == 1) return a[0];
        else {
            a = a.slice(0);
            last = a.pop();
            a.push("and " + last);
            return a.join(", ")
        }
    }
};
$(document).ready(function () {
    ScrollToTop.setup();
    Modal.setup();
    $(".tipsyHover").tipsy({
        gravity: "n",
        delayIn: 0.1,
        delayOut: 0.1,
        opacity: 0.7,
        live: true,
        html: true
    });
    $("#query").focus(function () {
        cache && $(this).catcomplete("search", $(this).val())
    });
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (c, d) {
            var e = this,
                f = "";
            $.each(d, function (b, g) {
                if (g.category != f) {
                    c.append("<li class='ui-autocomplete-category'>" + g.category + "</li>");
                    f = g.category
                }
                e._renderItem(c, g)
            });
            d = {
                link: "/search/?q=" + this.term
            };
            $("<li></li>").data("item.autocomplete", d).append("<a href='/search/?q=" + this.term + "' class='ui-corner-all' tabindex='-1' style='font-weight:bold; min-height:0 !important;'>Search for " + this.term + "</a>").appendTo(c)
        }
    });
    var a = $("#query").catcomplete({
        source: function (c, d) {
            Tagging.getFriends(c, function (e) {
                var f = e;
                if (myboards) {
                    f = tagmate.filter_options(myboards, c.term);
                    f = e.concat(f)
                }
                for (e = 0; e < f.length; e++) f[e].value = f[e].label;
                d(f)
            })
        },
        minLength: 1,
        delay: 0,
        appendTo: "#SearchAutocompleteHolder",
        select: function (c, d) {
            document.location.href = d.item.link
        }
    });
    if (typeof a.data("catcomplete") != "undefined") a.data("catcomplete")._renderItem = function (c, d) {
        var e = "<a href='" + d.link + "'><img src='" + d.image + "' class='AutocompletePhoto' alt='Photo of " + d.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + d.label + "</span></a>";
        return $("<li></li>").data("item.autocomplete", d).append(e).appendTo(c)
    };
    $("#query").defaultValue($("#query").attr("placeholder"), "default_value");
    $("#Search #query_button").click(function () {
        $("#Search form").submit();
        return false
    });
    $("body").on("click", "a[rel=nofollow]", function (c) {
        var d = $(this).attr("href");
        if (d === "#") return c.isDefaultPrevented();
        if (!d.match(/^(http|https):\/\//) || d.match(/(http:\/\/|https:\/\/|\.)pinterest\.com/gi) || $(this).hasClass("safelink")) return true;
        c = (c = $(this).parents(".pin").attr("data-id") || $(this).parents(".pin").attr("pin-id") || $(this).attr("data-id")) ? "&pin=" + c : "";
        var e = $(this).parents(".comment").attr("comment-id");
        e = e ? "&comment_id=" + e : "";
        var f = (new jsSHA(getCookie("csrftoken"), "ASCII")).getHash("HEX");
        window.open("/offsite/?url=" + encodeURIComponent(d) + "&shatoken=" + f + "&token=" + getCookie("csrftoken") + c + e);
        return false
    })
});
Twitter = new(function () {
    var a = this;
    this.startTwitterConnect = function () {
        a._twitterWindow = window.open("/connect/twitter/", "Pinterest", "location=0,status=0,width=800,height=400");
        a._twitterInterval = window.setInterval(a.completeTwitterConnect, 1E3)
    };
    this.completeTwitterConnect = function () {
        if (a._twitterWindow.closed) {
            window.clearInterval(a._twitterInterval);
            window.location.reload()
        }
    }
});
Facebook = new(function () {
    var a = this;
    this.startFacebookConnect = function (c, d, e, f) {
        e = e == undefined ? true : e;
        var b = "/connect/facebook/",
            g = "?";
        if (c) {
            b += g + "scope=" + c;
            g = "&"
        }
        if (d) {
            b += g + "enable_timeline=1";
            g = "&"
        }
        if (f) b += g + "ref_page=" + f;
        a._facebookWindow = window.open(b, "Pinterest", "location=0,status=0,width=800,height=400");
        if (e) a._facebookInterval = window.setInterval(this.completeFacebookConnect, 1E3)
    };
    this.completeFacebookConnect = function () {
        if (a._facebookWindow.closed) {
            window.clearInterval(a._facebookInterval);
            window.location.reload()
        }
    }
});
Google = new(function () {
    var a = this;
    this.startGoogleConnect = function () {
        a._googleWindow = window.open("/connect/google/", "Google", "location=0,status=0,width=800,height=400");
        a._googleInterval = window.setInterval(a.completeGoogleConnect, 1E3)
    };
    this.completeGoogleConnect = function () {
        if (a._googleWindow.closed) {
            window.clearInterval(a._googleInterval);
            window.location.reload()
        }
    }
});
Yahoo = new(function () {
    var a = this;
    this.startYahooConnect = function () {
        a._yahooWindow = window.open("/connect/yahoo/", "Yahoo", "location=0,status=0,width=800,height=400");
        a._yahooInterval = window.setInterval(a.completeYahooConnect, 1E3)
    };
    this.completeYahooConnect = function () {
        if (a._yahooWindow.closed) {
            window.clearInterval(a._yahooInterval);
            window.location.reload()
        }
    }
});
(function (a) {
    function c(e) {
        return typeof e == "object" ? e : {
            top: e,
            left: e
        }
    }
    var d = a.scrollTo = function (e, f, b) {
            a(window).scrollTo(e, f, b)
        };
    d.defaults = {
        axis: "xy",
        duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1
    };
    d.window = function () {
        return a(window)._scrollable()
    };
    a.fn._scrollable = function () {
        return this.map(function () {
            var e = this;
            if (!(!e.nodeName || a.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1)) return e;
            e = (e.contentWindow || e).document || e.ownerDocument || e;
            return a.browser.safari || e.compatMode == "BackCompat" ? e.body : e.documentElement
        })
    };
    a.fn.scrollTo = function (e, f, b) {
        if (typeof f == "object") {
            b = f;
            f = 0
        }
        if (typeof b == "function") b = {
            onAfter: b
        };
        if (e == "max") e = 9E9;
        b = a.extend({}, d.defaults, b);
        f = f || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) f /= 2;
        b.offset = c(b.offset);
        b.over = c(b.over);
        return this._scrollable().each(function () {
            function g(l) {
                j.animate(u, f, b.easing, l &&
                function () {
                    l.call(this, e, b)
                })
            }
            var h = this,
                j = a(h),
                k = e,
                q, u = {},
                n = j.is("html,body");
            switch (typeof k) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)) {
                    k = c(k);
                    break
                }
                k = a(k, this);
            case "object":
                if (k.is || k.style) q = (k = a(k)).offset()
            }
            a.each(b.axis.split(""), function (l, p) {
                var s = p == "x" ? "Left" : "Top",
                    v = s.toLowerCase(),
                    C = "scroll" + s,
                    D = h[C],
                    F = d.max(h, p);
                if (q) {
                    u[C] = q[v] + (n ? 0 : D - j.offset()[v]);
                    if (b.margin) {
                        u[C] -= parseInt(k.css("margin" + s)) || 0;
                        u[C] -= parseInt(k.css("border" + s + "Width")) || 0
                    }
                    u[C] += b.offset[v] || 0;
                    if (b.over[v]) u[C] += k[p == "x" ? "width" : "height"]() * b.over[v]
                } else {
                    p = k[v];
                    u[C] = p.slice && p.slice(-1) == "%" ? parseFloat(p) / 100 * F : p
                }
                if (/^\d+$/.test(u[C])) u[C] = u[C] <= 0 ? 0 : Math.min(u[C], F);
                if (!l && b.queue) {
                    D != u[C] && g(b.onAfterFirst);
                    delete u[C]
                }
            });
            g(b.onAfter)
        }).end()
    };
    d.max = function (e, f) {
        var b = f == "x" ? "Width" : "Height";
        f = "scroll" + b;
        if (!a(e).is("html,body")) return e[f] - a(e)[b.toLowerCase()]();
        b = "client" + b;
        var g = e.ownerDocument.documentElement;
        e = e.ownerDocument.body;
        return Math.max(g[f], e[f]) - Math.min(g[b], e[b])
    }
})(jQuery);
(function () {
    jQuery.each({
        getSelection: function () {
            var a = this.jquery ? this[0] : this;
            return ("selectionStart" in a &&
            function () {
                var c = a.selectionEnd - a.selectionStart;
                return {
                    start: a.selectionStart,
                    end: a.selectionEnd,
                    length: c,
                    text: a.value.substr(a.selectionStart, c)
                }
            } || document.selection &&
            function () {
                a.focus();
                var c = document.selection.createRange();
                if (c == null) return {
                    start: 0,
                    end: a.value.length,
                    length: 0
                };
                var d = a.createTextRange(),
                    e = d.duplicate();
                d.moveToBookmark(c.getBookmark());
                e.setEndPoint("EndToStart", d);
                var f = e.text.length,
                    b = f;
                for (d = 0; d < f; d++) e.text.charCodeAt(d) == 13 && b--;
                f = e = c.text.length;
                for (d = 0; d < e; d++) c.text.charCodeAt(d) == 13 && f--;
                return {
                    start: b,
                    end: b + f,
                    length: f,
                    text: c.text
                }
            } ||
            function () {
                return {
                    start: 0,
                    end: a.value.length,
                    length: 0
                }
            })()
        },
        setSelection: function (a, c) {
            var d = this.jquery ? this[0] : this,
                e = a || 0,
                f = c || 0;
            return ("selectionStart" in d &&
            function () {
                d.focus();
                d.selectionStart = e;
                d.selectionEnd = f;
                return this
            } || document.selection &&
            function () {
                d.focus();
                var b = d.createTextRange(),
                    g = e;
                for (i = 0; i < g; i++) if (d.value[i].search(/[\r\n]/) != -1) e -= 0.5;
                g = f;
                for (i = 0; i < g; i++) if (d.value[i].search(/[\r\n]/) != -1) f -= 0.5;
                b.moveEnd("textedit", -1);
                b.moveStart("character", e);
                b.moveEnd("character", f - e);
                b.select();
                return this
            } ||
            function () {
                return this
            })()
        },
        replaceSelection: function (a) {
            var c = this.jquery ? this[0] : this,
                d = a || "";
            return ("selectionStart" in c &&
            function () {
                c.value = c.value.substr(0, c.selectionStart) + d + c.value.substr(c.selectionEnd, c.value.length);
                return this
            } || document.selection &&
            function () {
                c.focus();
                document.selection.createRange().text = d;
                return this
            } ||
            function () {
                c.value += d;
                return this
            })()
        }
    }, function (a) {
        jQuery.fn[a] = this
    })
})();
var tagmate = tagmate || {
    USER_TAG_EXPR: "@\\w+(?: \\w*)?",
    HASH_TAG_EXPR: "#\\w+",
    USD_TAG_EXPR: "\\$(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    GBP_TAG_EXPR: "\\\u00a3(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    filter_options: function (a, c) {
        for (var d = [], e = 0; e < a.length; e++) {
            var f = a[e].label.toLowerCase(),
                b = c.toLowerCase();
            b.length <= f.length && f.indexOf(b) == 0 && d.push(a[e])
        }
        return d
    },
    sort_options: function (a) {
        return a.sort(function (c, d) {
            c = c.label.toLowerCase();
            d = d.label.toLowerCase();
            if (c > d) return 1;
            else if (c < d) return -1;
            return 0
        })
    }
};
(function (a) {
    function c(b, g, h) {
        b = b.substring(h || 0).search(g);
        return b >= 0 ? b + (h || 0) : b
    }
    function d(b) {
        return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    function e(b, g, h) {
        var j = {};
        for (tok in g) if (h && h[tok]) {
            var k = {},
                q = {};
            for (key in h[tok]) {
                var u = h[tok][key].value,
                    n = h[tok][key].label,
                    l = d(tok + n),
                    p = ["(?:^(", ")$|^(", ")\\W|\\W(", ")\\W|\\W(", ")$)"].join(l),
                    s = 0;
                for (p = new RegExp(p, "gm");
                (s = c(b.val(), p, s)) > -1;) {
                    var v = q[s] ? q[s] : null;
                    if (!v || k[v].length < n.length) q[s] = u;
                    k[u] = n;
                    s += n.length + 1
                }
            }
            for (s in q) j[tok + q[s]] = tok
        } else {
            k = null;
            for (p = new RegExp("(" + g[tok] + ")", "gm"); k = p.exec(b.val());) j[k[1]] = tok
        }
        b = [];
        for (l in j) b.push(l);
        return b
    }
    var f = {
        "@": tagmate.USER_TAG_EXPR,
        "#": tagmate.HASH_TAG_EXPR,
        $: tagmate.USD_TAG_EXPR,
        "\u00a3": tagmate.GBP_TAG_EXPR
    };
    a.fn.extend({
        getTags: function (b, g) {
            var h = a(this);
            b = b || h.data("_tagmate_tagchars");
            g = g || h.data("_tagmate_sources");
            return e(h, b, g)
        },
        tagmate: function (b) {
            function g(n, l, p) {
                for (l = new RegExp("[" + l + "]"); p >= 0 && !l.test(n[p]); p--);
                return p
            }
            function h(n) {
                var l = n.val(),
                    p = n.getSelection(),
                    s = -1;
                n = null;
                for (tok in u.tagchars) {
                    var v = g(l, tok, p.start);
                    if (v > s) {
                        s = v;
                        n = tok
                    }
                }
                l = l.substring(s + 1, p.start);
                if ((new RegExp("^" + u.tagchars[n])).exec(n + l)) return n + l;
                return null
            }
            function j(n, l, p) {
                var s = n.val(),
                    v = n.getSelection();
                v = g(s, l[0], v.start);
                var C = s.substr(0, v);
                s = s.substr(v + l.length);
                n.val(C + l[0] + p + s);
                s = v + p.length + 1;
                n.setSelection(s, s);
                u.replace_tag && u.replace_tag(l, p)
            }
            function k(n, l) {
                l = tagmate.sort_options(l);
                for (var p = 0; p < l.length; p++) {
                    var s = l[p].label,
                        v = l[p].image;
                    p == 0 && n.html("");
                    var C = "<span>" + s + "</span>";
                    if (v) C = "<img src='" + v + "' alt='" + s + "'/>" + C;
                    s = u.menu_option_class;
                    if (p == 0) s += " " + u.menu_option_active_class;
                    n.append("<div class='" + s + "'>" + C + "</div>")
                }
            }
            function q(n, l) {
                var p = l == "down" ? ":first-child" : ":last-child",
                    s = l == "down" ? "next" : "prev";
                l = n.children("." + u.menu_option_active_class);
                if (l.length == 0) l = n.children(p);
                else {
                    l.removeClass(u.menu_option_active_class);
                    l = l[s]().length > 0 ? l[s]() : l
                }
                l.addClass(u.menu_option_active_class);
                s = n.children();
                var v = Math.floor(a(n).height() / a(s[0]).height()) - 1;
                if (a(n).height() % a(s[0]).height() > 0) v -= 1;
                for (p = 0; p < s.length && a(s[p]).html() != a(l).html(); p++);
                p > v && p - v >= 0 && p - v < s.length && n.scrollTo(s[p - v])
            }
            var u = {
                tagchars: f,
                sources: null,
                capture_tag: null,
                replace_tag: null,
                menu: null,
                menu_class: "tagmate-menu",
                menu_option_class: "tagmate-menu-option",
                menu_option_active_class: "tagmate-menu-option-active"
            };
            return this.each(function () {
                function n() {
                    v.hide();
                    var D = h(l);
                    if (D) {
                        var F = D[0],
                            o = D.substr(1),
                            m = l.getSelection(),
                            z = g(l.val(), F, m.start);
                        m.start - z <= D.length &&
                        function (B) {
                            if (typeof u.sources[F] === "object") B(tagmate.filter_options(u.sources[F], o));
                            else typeof u.sources[F] === "function" ? u.sources[F]({
                                term: o
                            }, B) : B()
                        }(function (B) {
                            if (B && B.length > 0) {
                                k(v, B);
                                v.css("top", l.outerHeight() - 1 + "px");
                                v.show();
                                for (var w = l.data("_tagmate_sources"), x = 0; x < B.length; x++) {
                                    for (var J = false, K = 0; !J && K < w[F].length; K++) J = w[F][K].value == B[x].value;
                                    J || w[F].push(B[x])
                                }
                            }
                            D && u.capture_tag && u.capture_tag(D)
                        })
                    }
                }
                b && a.extend(u, b);
                var l = a(this);
                l.data("_tagmate_tagchars", u.tagchars);
                var p = {};
                for (var s in u.sources) p[s] = [];
                l.data("_tagmate_sources", p);
                var v = u.menu;
                if (!v) {
                    v = a("<div class='" + u.menu_class + "'></div>");
                    l.after(v)
                }
                l.offset();
                v.css("position", "absolute");
                v.hide();
                var C = false;
                a(l).unbind(".tagmate").bind("focus.tagmate", function () {
                    n()
                }).bind("blur.tagmate", function () {
                    setTimeout(function () {
                        v.hide()
                    }, 300)
                }).bind("click.tagmate", function () {
                    n()
                }).bind("keydown.tagmate", function (D) {
                    if (v.is(":visible")) if (D.keyCode == 40) {
                        q(v, "down");
                        C = true;
                        return false
                    } else if (D.keyCode == 38) {
                        q(v, "up");
                        C = true;
                        return false
                    } else if (D.keyCode == 13) {
                        D = v.children("." + u.menu_option_active_class).text();
                        var F = h(l);
                        if (F && D) {
                            j(l, F, D);
                            v.hide();
                            C = true;
                            return false
                        }
                    } else if (D.keyCode == 27) {
                        v.hide();
                        C = true;
                        return false
                    }
                }).bind("keyup.tagmate", function () {
                    if (C) {
                        C = false;
                        return true
                    }
                    n()
                });
                a("." + u.menu_class + " ." + u.menu_option_class).die("click.tagmate").live("click.tagmate", function () {
                    var D = a(this).text(),
                        F = h(l);
                    j(l, F, D);
                    v.hide();
                    C = true;
                    return false
                })
            })
        }
    })
})(jQuery);
(function (a) {
    function c(f) {
        var b;
        if (f && f.constructor == Array && f.length == 3) return f;
        if (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])];
        if (b = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) return [parseFloat(b[1]) * 2.55, parseFloat(b[2]) * 2.55, parseFloat(b[3]) * 2.55];
        if (b = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) return [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
        if (b = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16)];
        return e[a.trim(f).toLowerCase()]
    }
    function d(f, b) {
        var g;
        do {
            g = a.curCSS(f, b);
            if (g != "" && g != "transparent" || a.nodeName(f, "body")) break;
            b = "backgroundColor"
        } while (f = f.parentNode);
        return c(g)
    }
    a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, b) {
        a.fx.step[b] = function (g) {
            if (g.state == 0) {
                g.start = d(g.elem, b);
                g.end = c(g.end)
            }
            g.elem.style[b] = "rgb(" + [Math.max(Math.min(parseInt(g.pos * (g.end[0] - g.start[0]) + g.start[0]), 255), 0), Math.max(Math.min(parseInt(g.pos * (g.end[1] - g.start[1]) + g.start[1]), 255), 0), Math.max(Math.min(parseInt(g.pos * (g.end[2] - g.start[2]) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });
    var e = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
jQuery.cookie = function (a, c, d) {
    if (arguments.length > 1 && String(c) !== "[object Object]") {
        d = jQuery.extend({}, d);
        if (c === null || c === undefined) d.expires = -1;
        if (typeof d.expires === "number") {
            var e = d.expires,
                f = d.expires = new Date;
            f.setDate(f.getDate() + e)
        }
        c = String(c);
        return document.cookie = [encodeURIComponent(a), "=", d.raw ? c : encodeURIComponent(c), d.expires ? "; expires=" + d.expires.toUTCString() : "", d.path ? "; path=" + d.path : "", d.domain ? "; domain=" + d.domain : "", d.secure ? "; secure" : ""].join("")
    }
    d = c || {};
    f = d.raw ?
    function (b) {
        return b
    } : decodeURIComponent;
    return (e = (new RegExp("(?:^|; )" + encodeURIComponent(a) + "=([^;]*)")).exec(document.cookie)) ? f(e[1]) : null
};
if (!window.JSON) window.JSON = {};
(function () {
    function a(q) {
        return q < 10 ? "0" + q : q
    }
    function c(q) {
        b.lastIndex = 0;
        return b.test(q) ? '"' + q.replace(b, function (u) {
            var n = j[u];
            return typeof n === "string" ? n : "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + q + '"'
    }
    function d(q, u) {
        var n, l, p = g,
            s, v = u[q];
        if (v && typeof v === "object" && typeof v.toJSON === "function") v = v.toJSON(q);
        if (typeof k === "function") v = k.call(u, q, v);
        switch (typeof v) {
        case "string":
            return c(v);
        case "number":
            return isFinite(v) ? String(v) : "null";
        case "boolean":
        case "null":
            return String(v);
        case "object":
            if (!v) return "null";
            g += h;
            s = [];
            if (Object.prototype.toString.apply(v) === "[object Array]") {
                l = v.length;
                for (q = 0; q < l; q += 1) s[q] = d(q, v) || "null";
                u = s.length === 0 ? "[]" : g ? "[\n" + g + s.join(",\n" + g) + "\n" + p + "]" : "[" + s.join(",") + "]";
                g = p;
                return u
            }
            if (k && typeof k === "object") {
                l = k.length;
                for (q = 0; q < l; q += 1) {
                    n = k[q];
                    if (typeof n === "string") if (u = d(n, v)) s.push(c(n) + (g ? ": " : ":") + u)
                }
            } else for (n in v) if (Object.hasOwnProperty.call(v, n)) if (u = d(n, v)) s.push(c(n) + (g ? ": " : ":") + u);
            u = s.length === 0 ? "{}" : g ? "{\n" + g + s.join(",\n" + g) + "\n" + p + "}" : "{" + s.join(",") + "}";
            g = p;
            return u
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        }
    }
    var e = window.JSON,
        f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        g, h, j = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        k;
    if (typeof e.stringify !== "function") e.stringify = function (q, u, n) {
        var l;
        h = g = "";
        if (typeof n === "number") for (l = 0; l < n; l += 1) h += " ";
        else if (typeof n === "string") h = n;
        if ((k = u) && typeof u !== "function" && (typeof u !== "object" || typeof u.length !== "number")) throw new Error("JSON.stringify");
        return d("", {
            "": q
        })
    };
    if (typeof e.parse !== "function") e.parse = function (q, u) {
        function n(l, p) {
            var s, v, C = l[p];
            if (C && typeof C === "object") for (s in C) if (Object.hasOwnProperty.call(C, s)) {
                v = n(C, s);
                if (v !== undefined) C[s] = v;
                else delete C[s]
            }
            return u.call(l, p, C)
        }
        q = String(q);
        f.lastIndex = 0;
        if (f.test(q)) q = q.replace(f, function (l) {
            return "\\u" + ("0000" + l.charCodeAt(0).toString(16)).slice(-4)
        });
        if (/^[\],:{}\s]*$/.test(q.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            q = eval("(" + q + ")");
            return typeof u === "function" ? n({
                "": q
            }, "") : q
        }
        throw new SyntaxError("JSON.parse");
    }
})();
(function () {
    var a = function (n) {
            var l = [],
                p = n.length * 8,
                s;
            for (s = 0; s < p; s += 8) l[s >> 5] |= (n.charCodeAt(s / 8) & 255) << 24 - s % 32;
            return l
        },
        c = function (n) {
            var l = [],
                p = n.length,
                s, v;
            for (s = 0; s < p; s += 2) {
                v = parseInt(n.substr(s, 2), 16);
                if (isNaN(v)) return "INVALID HEX STRING";
                else l[s >> 3] |= v << 24 - 4 * (s % 8)
            }
            return l
        },
        d = function (n) {
            var l = "",
                p = n.length * 4,
                s, v;
            for (s = 0; s < p; s += 1) {
                v = n[s >> 2] >> (3 - s % 4) * 8;
                l += "0123456789abcdef".charAt(v >> 4 & 15) + "0123456789abcdef".charAt(v & 15)
            }
            return l
        },
        e = function (n) {
            var l = "",
                p = n.length * 4,
                s, v, C;
            for (s = 0; s < p; s += 3) {
                C = (n[s >> 2] >> 8 * (3 - s % 4) & 255) << 16 | (n[s + 1 >> 2] >> 8 * (3 - (s + 1) % 4) & 255) << 8 | n[s + 2 >> 2] >> 8 * (3 - (s + 2) % 4) & 255;
                for (v = 0; v < 4; v += 1) l += s * 8 + v * 6 <= n.length * 32 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(C >> 6 * (3 - v) & 63) : ""
            }
            return l
        },
        f = function (n, l) {
            return n << l | n >>> 32 - l
        },
        b = function (n, l, p) {
            return n ^ l ^ p
        },
        g = function (n, l, p) {
            return n & l ^ ~n & p
        },
        h = function (n, l, p) {
            return n & l ^ n & p ^ l & p
        },
        j = function (n, l) {
            var p = (n & 65535) + (l & 65535);
            return ((n >>> 16) + (l >>> 16) + (p >>> 16) & 65535) << 16 | p & 65535
        },
        k = function (n, l, p, s, v) {
            var C = (n & 65535) + (l & 65535) + (p & 65535) + (s & 65535) + (v & 65535);
            return ((n >>> 16) + (l >>> 16) + (p >>> 16) + (s >>> 16) + (v >>> 16) + (C >>> 16) & 65535) << 16 | C & 65535
        },
        q = function (n, l) {
            var p = [],
                s, v, C, D, F, o, m, z, B = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
                w = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
            n[l >> 5] |= 128 << 24 - l % 32;
            n[(l + 65 >> 9 << 4) + 15] = l;
            z = n.length;
            for (o = 0; o < z; o += 16) {
                l = B[0];
                s = B[1];
                v = B[2];
                C = B[3];
                D = B[4];
                for (m = 0; m < 80; m += 1) {
                    p[m] = m < 16 ? n[m + o] : f(p[m - 3] ^ p[m - 8] ^ p[m - 14] ^ p[m - 16], 1);
                    F = m < 20 ? k(f(l, 5), g(s, v, C), D, w[m], p[m]) : m < 40 ? k(f(l, 5), b(s, v, C), D, w[m], p[m]) : m < 60 ? k(f(l, 5), h(s, v, C), D, w[m], p[m]) : k(f(l, 5), b(s, v, C), D, w[m], p[m]);
                    D = C;
                    C = v;
                    v = f(s, 30);
                    s = l;
                    l = F
                }
                B[0] = j(l, B[0]);
                B[1] = j(s, B[1]);
                B[2] = j(v, B[2]);
                B[3] = j(C, B[3]);
                B[4] = j(D, B[4])
            }
            return B
        },
        u = function (n, l) {
            this.strToHash = this.strBinLen = this.sha1 = null;
            if ("HEX" === l) {
                if (0 !== n.length % 2) return "TEXT MUST BE IN BYTE INCREMENTS";
                this.strBinLen = n.length * 4;
                this.strToHash = c(n)
            } else if ("ASCII" === l || "undefined" === typeof l) {
                this.strBinLen = n.length * 8;
                this.strToHash = a(n)
            } else return "UNKNOWN TEXT INPUT TYPE"
        };
    u.prototype = {
        getHash: function (n) {
            var l = null,
                p = this.strToHash.slice();
            switch (n) {
            case "HEX":
                l = d;
                break;
            case "B64":
                l = e;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if (null === this.sha1) this.sha1 = q(p, this.strBinLen);
            return l(this.sha1)
        },
        getHMAC: function (n, l, p) {
            var s;
            s = [];
            var v = [];
            switch (p) {
            case "HEX":
                p = d;
                break;
            case "B64":
                p = e;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if ("HEX" === l) {
                if (0 !== n.length % 2) return "KEY MUST BE IN BYTE INCREMENTS";
                l = c(n);
                n = n.length * 4
            } else if ("ASCII" === l) {
                l = a(n);
                n = n.length * 8
            } else return "UNKNOWN KEY INPUT TYPE";
            if (64 < n / 8) {
                l = q(l, n);
                l[15] &= 4294967040
            } else if (64 > n / 8) l[15] &= 4294967040;
            for (n = 0; n <= 15; n += 1) {
                s[n] = l[n] ^ 909522486;
                v[n] = l[n] ^ 1549556828
            }
            s = q(s.concat(this.strToHash), 512 + this.strBinLen);
            s = q(v.concat(s), 672);
            return p(s)
        }
    };
    window.jsSHA = u
})();
var BoardLayout = function () {
        return {
            setup: function (a) {
                if (!this.setupComplete) {
                    $(document).ready(function () {
                        BoardLayout.allPins()
                    });
                    $(window).resize(_.throttle(function () {
                        BoardLayout.allPins()
                    }, 200));
                    $(function () {
                        if (window.userIsAuthenticated) {
                            Like.gridListeners();
                            Follow.listeners();
                            Comment.gridComment();
                            if (window.repinExperiment && window.repinExperiment !== "control") RepinDialog2.setup();
                            else {
                                RepinDialog.setup();
                                RepinDialog.grid()
                            }
                        }
                        Zoom.setup()
                    });
                    this.center = !! a;
                    this.setupComplete = true
                }
            },
            pinsContainer: ".BoardLayout",
            pinArray: [],
            orderedPins: [],
            mappedPins: {},
            nextPin: function (a) {
                a = this.orderedPins.indexOf(a) + 1;
                if (a >= this.orderedPins.length) return 0;
                return this.orderedPins[a]
            },
            previousPin: function (a) {
                a = this.orderedPins.indexOf(a) - 1;
                if (a >= this.orderedPins.length) return 0;
                return this.orderedPins[a]
            },
            columnCount: 4,
            columns: 0,
            columnWidthInner: 190,
            columnMargin: 20,
            columnPadding: 30,
            columnContainerWidth: 0,
            allPins: function () {
                var a = $(this.pinsContainer + " .pin"),
                    c = this.getContentArea();
                this.columnWidthOuter = this.columnWidthInner + this.columnMargin + this.columnPadding;
                this.columns = Math.max(this.columnCount, parseInt(c / this.columnWidthOuter));
                if (a.length < this.columns) this.columns = Math.max(this.columnCount, a.length);
                c = this.columnWidthOuter * this.columns - this.columnMargin;
                var d = document.getElementById("wrapper");
                if (d) d.style.width = c + "px";
                $(".LiquidContainer").css("width", c + "px");
                for (c = 0; c < this.columns; c++) this.pinArray[c] = 0;
                document.getElementById("SortableButtons") ? this.showPins() : this.flowPins(a, true);
                if ($("#ColumnContainer .pin").length === 0 && window.location.pathname === "/") {
                    $("#ColumnContainer").addClass("empty");
                    setTimeout(function () {
                        window.location.reload()
                    }, 5E3)
                }
            },
            newPins: function () {
                this.flowPins($(this.pinsContainer + ":last .pin"))
            },
            flowPins: function (a, c) {
                if (c) {
                    this.mappedPins = {};
                    this.orderedPins = []
                }
                if (this.pinArray.length > this.columns) this.pinArray = this.pinArray.slice(0, this.columns);
                for (i = 0; i < a.length; i++) {
                    c = a[i];
                    var d = $(c).attr("data-id");
                    if (d && this.mappedPins[d]) $(c).remove();
                    else {
                        var e = jQuery.inArray(Math.min.apply(Math, this.pinArray), this.pinArray),
                            f = this.pinArray[e];
                        c.style.top = f + "px";
                        c.style.left = e * this.columnWidthOuter + "px";
                        this.pinArray[e] = f + c.offsetHeight + this.columnMargin;
                        this.mappedPins[d] = this.orderedPins.length;
                        this.orderedPins.push(d)
                    }
                }
				
                $("#ColumnContainer").height(Math.max.apply(Math, this.pinArray));
                this.showPins();
                useLazyLoad && LazyLoad.invalidate()
            },
            showPins: function () {
                $.browser.msie && parseInt($.browser.version) == 7 || $(this.pinsContainer).css("opacity", 1);
                var a = $(this.pinsContainer);
                setTimeout(function () {
                    a.css({
                        visibility: "visible"
                    })
                }, 200)
            },
            imageLoaded: function () {
                $(this).removeClass("lazy")
            },
            getContentArea: function () {
                return this.contentArea || document.documentElement.clientWidth
            }
        }
    }();
	
	
var LazyLoad = new(function () {
    var a = this,
        c = 0,
        d = 0,
        e = 100,
        f = $(window);
    a.images = {};
    a.invalidate = function () {
        $("img.lazy").each(function (u, n) {
            u = $(n);
            a.images[u.attr("data-id")] = u;
            g(u) && h(u)
        })
    };
    a.check = function () {
        var u, n = false;
        return function () {
            if (!n) {
                n = true;
                clearTimeout(u);
                u = setTimeout(function () {
                    n = false;
                    b()
                }, 200)
            }
        }
    }();
    var b = function () {
            var u = 0,
                n = 0;
            for (var l in a.images) {
                var p = a.images[l];
                u++;
                if (g(p)) {
                    h(p);
                    n++
                }
            }
        };
    a.stop = function () {
        f.unbind("scroll", j);
        f.unbind("resize", k)
    };
    var g = function (u) {
            return u.offset().top <= e
        },
        h = function (u) {
            if (u.hasClass("lazy")) {
                var n = u.attr("data-src"),
                    l = u.attr("data-id");
                u.load(function () {
                    if (u[0]) u[0].style.opacity = "1";
                    delete a.images[l]
                });
                u.attr("src", n);
                u.removeClass("lazy");
                if (u[0]) u[0].style.opacity = "0"
            }
        },
        j = function () {
            c = $(window).scrollTop();
            q();
            a.check()
        },
        k = function () {
            d = $(window).height();
            q();
            a.check()
        },
        q = function () {
            e = c + d + 600
        };
    if (useLazyLoad) {
        f.ready(function () {
            j();
            k()
        });
        f.scroll(j);
        f.resize(k)
    }
});
var BoardPicker = function () {
        return {
            setup: function (a, c, d) {
                a = $(a);
                var e = $(".BoardListOverlay", a.parent()),
                    f = $(".BoardList", a),
                    b = $(".CurrentBoard", a),
                    g = $("ul", f);
                a.click(function () {
                    f.show();
                    e.show()
                });
                e.click(function () {
                    f.hide();
                    e.hide()
                });
                $(g).on("click", "li", function () {
                    if (!$(this).hasClass("noSelect")) {
                        b.text($(this).text());
                        e.hide();
                        f.hide();
                        c && c($(this).attr("data"))
                    }
                    return false
                });
                a = $(".CreateBoard", f);
                var h = $("input", a),
                    j = $(".Button", a);
                $("strong", j);
                var k = $(".CreateBoardStatus", a);
                h.defaultValue("Create New Board");
                j.click(function () {
                    if (j.attr("disabled") == "disabled") return false;
                    if (h.val() == "Create New Board") {
                        k.html("Enter a board name").css("color", "red").show();
                        return false
                    }
                    k.html("").hide();
                    j.addClass("disabled").attr("disabled", "disabled");
                    $.post("/board/create/", {
                        name: h.val(),
                        pass_category: true
                    }, function (q) {
                        if (q && q.status == "success") {
                            g.append("<li data='" + q.id + "'><span>" + q.name + "</span></li>");
                            f.hide();
                            b.text(q.name);
                            h.val("").blur();
                            j.removeClass("disabled").removeAttr("disabled");
                            d && d(q.id)
                        } else {
                            k.html(q.message).css("color", "red").show();
                            j.removeClass("disabled").removeAttr("disabled")
                        }
                    }, "json");
                    return false
                })
            }
        }
    }();
var CropImage = function () {
        this.initialize.apply(this, arguments)
    };
(function () {
    var a = Backbone.View.extend({
        el: "#CropImage",
        events: {
            "click .cancel": "onClose",
            "click .save": "onSave",
            "mousedown .drag": "onStartDrag"
        },
        dragging: false,
        mousePosition: {},
        initialize: function () {
            _.bindAll(this, "onDragging", "onStopDragging", "onImageLoaded");
            _.defaults(this.options, {
                title: "Crop Image",
                buttonTitle: "Save",
                size: {
                    width: 222,
                    height: 150
                }
            });
            this.$holder = this.$el.find(".holder");
            this.$bg = this.$el.find(".holder .bg");
            this.$overlay = this.$el.find(".holder .overlayContent");
            this.$frame = this.$el.find(".holder .frame");
            this.$mask = this.$el.find(".holder .mask");
            this.$footer = this.$el.find(".footer");
            this.$button = this.$el.find(".footer .Button.save");
            this.$spinner = this.$el.find(".holder .spinner")
        },
        render: function () {
            this.$el.find(".header span").text(this.options.title);
            this.$button.find("strong").text(this.options.buttonTitle);
            this.$button.removeClass("disabled");
            this.$holder.show().css("height", this.options.size.height + 120 + 40);
            this.$footer.find(".buttons").css("visibility", "visible");
            this.$footer.find(".complete").hide();
            this.$bg.html("").show();
            this.$spinner.hide();
            this.options.className && this.$el.addClass(this.options.className);
            this.options.overlay && this.$overlay.html("").append(this.options.overlay);
            var c = this.bounds = {
                left: this.$holder.width() / 2 - this.options.size.width / 2,
                width: this.options.size.width,
                top: 60,
                height: this.options.size.height
            };
            c.ratio = c.height / c.width;
            this.$frame.css(c);
            this.$mask.find("span").each(function (d, e) {
                d === 0 && $(e).css({
                    top: 0,
                    left: 0,
                    right: 0,
                    height: c.top
                });
                d === 1 && $(e).css({
                    top: c.top,
                    left: c.left + c.width,
                    right: 0,
                    height: c.height
                });
                d === 2 && $(e).css({
                    top: c.top + c.height,
                    left: 0,
                    right: 0,
                    bottom: 0
                });
                d === 3 && $(e).css({
                    top: c.top,
                    left: 0,
                    width: c.left,
                    height: c.height
                })
            });
            this.options.image && this.setImage(this.options.image)
        },
        onClose: function () {
            this.trigger("close");
            return false
        },
        onSave: function () {
            this.trigger("save");
            return false
        },
        onImageLoaded: function (c) {
            if (this.$img.height() === 0) return setTimeout(this.onImageLoaded, 200, c);
            this.$img.removeAttr("width").removeAttr("height");
            c = this.imageBounds = {
                originalWidth: this.$img.width(),
                originalHeight: this.$img.height()
            };
            c.ratio = c.originalHeight / c.originalWidth;
            this.$img.css({
                visibility: "visible",
                opacity: 1
            });
            this.fitImage();
            this.centerImage();
            this.hideSpinner()
        },
        onStartDrag: function (c) {
            this.mousePosition = {
                x: c.pageX,
                y: c.pageY
            };
            this.startPosition = {
                x: parseInt(this.$bg.css("left")),
                y: parseInt(this.$bg.css("top"))
            };
            this.trigger("startDrag");
            this.dragging = true;
            $("body").on({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            });
            c.preventDefault()
        },
        onDragging: function (c) {
            var d = {
                top: this.startPosition.y + (c.pageY - this.mousePosition.y),
                left: this.startPosition.x + (c.pageX - this.mousePosition.x)
            };
            if (this.enforceBounds(d)) {
                this.$bg.css(d);
                c.preventDefault()
            }
        },
        onStopDragging: function () {
            this.trigger("stopDrag");
            this.dragging = false;
            $("body").off({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            })
        },
        enforceBounds: function (c) {
            c.top = Math.min(c.top, this.bounds.top);
            c.left = Math.min(c.left, this.bounds.left);
            if (c.left + this.imageBounds.width < this.bounds.left + this.bounds.width) c.left = this.bounds.left + this.bounds.width - this.imageBounds.width + 1;
            if (c.top + this.imageBounds.height < this.bounds.top + this.bounds.height) c.top = this.bounds.top + this.bounds.height - this.imageBounds.height + 1;
            return c
        },
        showComplete: function () {
            this.$footer.find(".buttons").css("visibility", "hidden");
            this.$footer.find(".complete").fadeIn(300);
            this.hideSpinner()
        },
        setImage: function (c) {
            this.showSpinner();
            var d = this.$img = $("<img>");
            d.load(this.onImageLoaded).css({
                opacity: "0.01",
                visibility: "hidden"
            });
            d.attr("src", c);
            this.$bg.html(d)
        },
        fitImage: function () {
            var c = 1;
            c = this.imageBounds.ratio >= this.bounds.ratio ? this.bounds.width / this.imageBounds.originalWidth : this.bounds.height / this.imageBounds.originalHeight;
            this.scaleImage(c, 10)
        },
        centerImage: function () {
            var c = this.$holder.height() - 40,
                d = this.$holder.width();
            this.$bg.css({
                top: c / 2 - this.$bg.height() / 2 + 1,
                left: d / 2 - this.$bg.width() / 2 + 1
            })
        },
        scaleImage: function (c, d) {
            var e = this.imageBounds.width = this.imageBounds.originalWidth * c + d || 0;
            c = this.imageBounds.height = this.imageBounds.originalHeight * c + d || 0;
            this.$img.attr("width", e);
            this.$img.attr("height", c)
        },
        getOffset: function () {
            return {
                x: Math.abs(parseInt(this.$bg.css("left")) - this.bounds.left),
                y: Math.abs(parseInt(this.$bg.css("top")) - this.bounds.top)
            }
        },
        getScale: function () {
            return this.$img.width() / this.imageBounds.originalWidth
        },
        saving: function () {
            this.showSpinner();
            this.$button.addClass("disabled")
        },
        showSpinner: function () {
            this.$spinner.show()
        },
        hideSpinner: function () {
            this.$spinner.hide()
        }
    });
    CropImage.prototype = {
        initialize: function () {
            _.bindAll(this, "save", "close")
        },
        show: function (c) {
            var d = this;
            c = this.view = new a(c);
            this.options = this.view.options;
            c.on("save", this.save);
            c.on("close", this.close);
            c.on("stopDrag", function () {
                d.trigger("dragComplete")
            });
            Modal.show("CropImage");
            c.render()
        },
        setImage: function (c) {
            this.view.setImage(c)
        },
        setParams: function (c) {
            this.options.params = c
        },
        save: function () {
            var c = this,
                d = this.view.getOffset(),
                e = this.view.getScale();
            d = _.extend({
                x: d.x,
                y: d.y,
                width: this.options.size.width,
                height: this.options.size.height,
                scale: e
            }, this.options.params || {});
            this.view.saving();
            this.trigger("saving", d);
            $.ajax({
                url: this.options.url,
                data: d,
                dataType: "json",
                type: "POST",
                success: function (f) {
                    c.view.hideSpinner();
                    c.trigger("save", f);
                    c.options.delay !== 0 && c.view.showComplete();
                    setTimeout(c.close, c.options.delay || 1200)
                }
            })
        },
        close: function () {
            Modal.close("CropImage");
            this.view.undelegateEvents();
            this.trigger("close");
            delete this.view;
            delete this.options
        }
    };
    _.extend(CropImage.prototype, Backbone.Events)
})();
var BoardCoverSelector = function () {
        this.initialize.apply(this, arguments)
    };
(function () {
    var a = null;
    BoardCoverSelector.prototype = {
        pins: null,
        index: null,
        boardURL: null,
        initialize: function () {
            if (a) {
                a.cancel();
                a = null
            }
            _.bindAll(this, "onKeyup", "onPinsLoaded", "onSave", "onSaving", "removeListeners", "next", "previous");
            a = this;
            this.options = {};
            this.imageCrop = new CropImage;
            this.imageCrop.on("close", this.removeListeners);
            this.imageCrop.on("save", this.onSave);
            this.imageCrop.on("saving", this.onSaving);
            this.imageCrop.on("dragComplete", function () {
                trackGAEvent("board_cover", "dragged")
            });
            this.$img = $("<img>")
        },
        loadPins: function () {
            $.ajax({
                url: this.options.boardURL + "pins/",
                dataType: "json",
                success: this.onPinsLoaded
            });
            this.boardURL = this.options.boardURL
        },
        show: function (c) {
            this.options = c;
            this.imageCrop.show({
                className: "BoardCover",
                overlay: this.overlayContent(),
                params: {
                    pin: c.pin
                },
                image: this.options.image,
                size: {
                    width: 222,
                    height: 150
                },
                title: c.title || "Select a cover photo and drag to position it.",
                buttonTitle: c.buttonTitle || "Set Cover",
                url: this.options.boardURL + "cover/",
                delay: c.delay
            });
            if (!this.pins || this.boardURL != this.options.boardURL) this.loadPins();
            else this.options.image || this.setIndex(0);
            trackGAEvent("board_cover", "show");
            $("body").keyup(this.onKeyup)
        },
        onPinsLoaded: function (c) {
            var d = null;
            if (this.options.image) {
                var e = this.options.image;
                _.each(c.pins, function (f, b) {
                    if (d == null && e.match(new RegExp(f.image_key, "gi"))) d = b
                })
            }
            this.index = d || 0;
            this.pins = c.pins;
            if (this.pins.length !== 0) {
                this.pins.length === 1 ? this.hideArrows() : this.preload([d - 1, d + 1]);
                d === null && this.setIndex(0)
            }
        },
        onKeyup: function (c) {
            if (this.index !== null) {
                c.keyCode === 37 && this.previous();
                c.keyCode === 39 && this.next();
                c.keyCode === 27 && this.imageCrop.close();
                c.keyCode === 13 && this.imageCrop.save()
            }
        },
        overlayContent: function () {
            var c = this.$holder = $("<div class='BoardOverlay'></div>"),
                d = $("<a href='#' class='prev Button WhiteButton Button13'><span></span><em></em></a>").click(this.previous),
                e = $("<a href='#' class='next Button WhiteButton Button13'><span></span><em></em></a>").click(this.next);
            c.append("<h3 class='serif'>" + this.options.boardName + "</h3>");
            c.append(d, e);
            return c
        },
        next: function () {
            this.index === this.pins.length - 1 ? this.setIndex(0) : this.setIndex(this.index + 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        previous: function () {
            this.index === 0 ? this.setIndex(this.pins.length - 1) : this.setIndex(this.index - 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        setIndex: function (c) {
            var d = this.pins[c];
            if (d) {
                this.imageCrop.setImage(d.url);
                this.imageCrop.setParams({
                    pin: d.id
                });
                this.index = c;
                this.preload([this.index - 2, this.index - 1, this.index + 1, this.index + 2])
            }
        },
        preload: function (c) {
            var d = this;
            _.each(c, function (e) {
                if (e = d.pins[e])(new Image).src = e.url
            })
        },
        hideArrows: function () {
            this.$holder.find(".arrow").hide()
        },
        removeListeners: function () {
            $("body").unbind("keyup", this.onKeyup)
        },
        onSaving: function () {
            this.hideArrows()
        },
        onSave: function (c) {
            this.options.success && this.options.success(c);
            trackGAEvent("board_cover", "saved")
        }
    };
    _.extend(BoardCoverSelector.prototype, Backbone.Events)
})();
var AddDialog = function () {
        return {
            setup: function (a) {
                var c = "#" + a,
                    d = $(c),
                    e = $(".Buttons .RedButton", d),
                    f = $(".mainerror", d),
                    b = $(".DescriptionTextarea", d);
                BoardPicker.setup(c + " .BoardPicker", function (g) {
                    $(c + " #id_board").val(g)
                }, function (g) {
                    $(c + " #id_board").val(g)
                });
                AddDialog.shareCheckboxes(a);
                Tagging.initTextarea(c + " .DescriptionTextarea");
                Tagging.priceTag(c + " .DescriptionTextarea", c + " .ImagePicker");
                CharacterCount.setup(c + " .DescriptionTextarea", c + " .CharacterCount", c + " .Button");
                e.click(function () {
                    if (e.hasClass("disabled")) return false;
                    trackGAEvent("pin", "clicked", "add_dialogue");
                    if (b.val() === "" || b.val() === "Describe your pin...") {
                        f.html("Please describe your pin").slideDown(300);
                        return false
                    } else f.slideUp(300, function () {
                        f.html("")
                    });
                    e.addClass("disabled").children("strong").html("Pinning...");
                    $("#id_details", d).val(b.val());
                    Tagging.loadTags(c + " .DescriptionTextarea", c + " #peeps_holder", c + " #id_tags", c + " #currency_holder");
                    $("form", d).ajaxSubmit({
                        url: "/pin/create/",
                        type: "POST",
                        dataType: "json",
                        iframe: true,
                        success: function (g) {
                            if (g.status == "success") {
                                trackGAEvent("pin", "success", "add_dialogue");
                                window.location = g.url
                            } else if (g.captcha) {
                                RecaptchaDialog.challenge();
                                AddDialog.reset(a)
                            } else f.html(g.message).slideDown(300)
                        }
                    });
                    return false
                })
            },
            reset: function (a) {
                a === "CreateBoard" && CreateBoardDialog.reset();
                a === "ScrapePin" && ScrapePinDialog.reset();
                a === "UploadPin" && UploadPinDialog.reset();
                AddDialog._resets[a] && AddDialog._resets[a]()
            },
            close: function (a, c) {
                $("#" + a).addClass("super");
                Modal.show(c)
            },
            childClose: function (a, c) {
                var d = this,
                    e = $("#" + c);
                $(".ModalContainer", e);
                d.reset(c);
                $("#" + a).removeClass("super");
                Modal.close(a);
                Modal.close(c)
            },
            pinBottom: function (a) {
                var c = $("#" + a);
                $(".PinBottom", c).slideDown(300, function () {
                    var d = $(".modal:first", c);
                    d.css("margin-bottom", "-" + d.outerHeight() / 2 + "px")
                })
            },
            shareCheckboxes: function (a) {
                function c(f) {
                    var b = $("#" + a + " .publish_to_" + f),
                        g = $("#" + a + " #id_publish_to_" + f);
                    b.change(function () {
                        if (b.is(":checked")) {
                            g.attr("checked", "checked");
                            b.parent().addClass("active")
                        } else {
                            g.removeAttr("checked");
                            b.parent().removeClass("active")
                        }
                    });
                    var h = b.is(":checked");
                    return function () {
                        if (h) {
                            b.parent().addClass("active");
                            b.attr("checked", "checked")
                        } else {
                            b.parent().removeClass("active");
                            b.removeAttr("checked")
                        }
                    }
                }
                var d = c("facebook"),
                    e = c("twitter");
                AddDialog._resets = AddDialog._resets || {};
                AddDialog._resets[a] = function () {
                    d();
                    e()
                }
            }
        }
    }();
var Home = function () {
        return {
            setup: function () {
                var a = null,
                    c = $(window),
                    d = false;
                $(document).ready(function () {
                    if ($("#CategoriesBarPage #TopNagCallout").length) {
                        $("#SearchAutocompleteHolder ul").css("top", "71px");
                        $("#UnauthCallout .Nag").css("top", "110px")
                    }
                });
                $(window).scroll(function () {
                    var e = c.scrollTop() >= 44;
                    if ($("#CategoriesBarPage #TopNagCallout").length) e = c.scrollTop() >= 80;
                    a || (a = $("#CategoriesBar, .Nag"));
                    if (!d && e) {
                        a.addClass("fixed");
                        d = true
                    } else if (d && !e) {
                        a.removeClass("fixed");
                        d = false
                    }
                });
                $("#home_request_invite_button").click(function () {
                    var e = $(this);
                    if ($("#home_request_invite").val() == "Your Email Address" || $("#home_request_invite").val() == "") $(".signup span").html("Please enter an email").css("color", "red");
                    else {
                        e.addClass("pressed").attr("disabled", "disabled");
                        $.post("/", {
                            email: $("#home_request_invite").val()
                        }, function (f) {
                            if (f.status == "success") {
                                $(".signup span").html("Thanks. You're on the list!").css("color", "green");
                                $("#home_request_invite").val("")
                            } else {
                                $(".signup span").html(f.message).css("color", "red");
                                this_button.removeAttr("disabled").removeClass("pressed")
                            }
                        }, "json")
                    }
                    return false
                });
                $(".remove_activity_rec").live("click", function () {
                    $this_element = $(this);
                    $.get("/remove_follow_recommend/?rec_id=" + $(this).attr("data-remove_id"), function (e) {
                        if (e && e.status == "success") {
                            window.activity_feed.update_ui_followed_succeeded($this_element);
                            e = $(this).parent().siblings(".hidden")[0];
                            $(e).removeClass("hidden")
                        } else alert(e.message)
                    })
                });
                $(".remove_activity_invite").live("click", function () {
                    var e = $(this);
                    $.get("/remove_invite/?rec_id=" + $(this).attr("data-remove_id"), function (f) {
                        if (f.status == "success") {
                            window.activity_feed.update_ui_invited_user(e);
                            f = $(this).parent().siblings(".hidden")[0];
                            $(f).removeClass("hidden")
                        } else alert(f.message)
                    })
                });
                $("#follow_all_link").live("click", function () {
                    $.get("/follow_all_recommends/", function (e) {
                        e && e.status == "success" ? window.activity_feed.update_ui_followed_all_recommened() : alert(e.message)
                    })
                });
                $("#invite_all_link").live("click", function () {
                    $.get("/invite_all/", function (e) {
                        e && e.status == "success" ? window.activity_feed.update_ui_invited_all_users() : alert(e.message)
                    })
                })
            },
            activityFeedSupport: function () {
                this.init = function () {
                    this.invite_all_link = $("#invite_all_link");
                    this.follow_all_link = $("#follow_all_link")
                };
                this.update_ui_invited_user = function (a) {
                    this.fade_row(a);
                    if (this.invite_all_link && this.invite_all_link.length) if (this.invite_all_link.attr("data-total_count")) {
                        a = this.invite_all_link.attr("data-total_count");
                        if (a == "1") this.hide_invites();
                        else {
                            this.invite_all_link.attr("data-total_count", a - 1);
                            this.invite_all_link.html("Invite all (" + (a - 1) + ")")
                        }
                    }
                };
                this.update_ui_followed_succeeded = function (a) {
                    this.fade_row(a);
                    if (this.follow_all_link && this.follow_all_link.length) if (this.follow_all_link.attr("data-total_count")) {
                        a = this.follow_all_link.attr("data-total_count");
                        if (a == "1") this.hide_recommends();
                        else {
                            this.follow_all_link.attr("data-total_count", a - 1);
                            this.follow_all_link.html("Follow all (" + (a - 1) + ")")
                        }
                    }
                };
                this.update_ui_invited_all_users = function () {
                    this.hide_invites()
                };
                this.update_ui_followed_all_recommened = function () {
                    this.hide_recommends()
                };
                this.fade_row = function (a) {
                    a.parents(".story:first").fadeOut()
                };
                this.hide_invites = function () {
                    this.invite_all_link.parents("#invite_friends:first").fadeOut()
                };
                this.hide_recommends = function () {
                    this.follow_all_link.parents("#recommended_friends:first").fadeOut()
                }
            }
        }
    }();
var GetNewPins = function () {
        return {
            timeout: null,
            timeoutLength: 8192,
            timeoutLengthMax: 524288,
            marker: 0,
            indicator: "#NewIndicator",
            newPins: {
                html: "",
                number: 0,
                old_title: $("title").html()
            },
            setTimeout: function () {
                var a = this;
                a.timeout = setTimeout("GetNewPins.checkForPins()", a.timeoutLength)
            },
            resetTimeout: function () {
                window.clearTimeout(this.timeout);
                this.setTimeout()
            },
            trigerOnScroll: function () {
                var a = this;
                a.setTimeout();
                $(window).bind("scroll", function () {
                    a.timeoutLength = 8192;
                    a.resetTimeout()
                })
            },
            checkForPins: function () {
                var a = this;
                $.get("/new/", {
                    marker: a.marker,
                    number: a.newPins.number
                }, function (c) {
                    if (c.number > 0) {
                        var d = a.indicator;
                        a.marker = c.marker;
                        a.newPins.html += c.html;
                        a.newPins.number += c.number;
                        $("title").html("(" + a.newPins.number + ") " + a.newPins.old_title);
                        $(d).html(c.total_number_str);
                        $(d).hasClass("Offscreen") && $(d).removeClass("Offscreen");
                        if (a.timeoutLength < a.timeoutLengthMax) a.timeoutLength *= 2;
                        a.setTimeout()
                    }
                })
            },
            showNewPins: function () {
                var a = this,
                    c = a.indicator;
                $(".feed").length > 0 ? $(".feed").after(a.newPins.html) : $("#ColumnContainer").prepend(a.newPins.html);
                BoardLayout.allPins();
                $(c).addClass("Offscreen");
                $(c).html("");
                $("title").html(a.newPins.old_title);
                a.newPins = {
                    html: "",
                    number: 0,
                    old_title: $("title").html()
                };
                a.resetTimeout();
                $("html, body").animate({
                    scrollTop: "0px"
                }, 400);
                return false
            }
        }
    }();
var BoardSort = BoardSort || {
    StartButton: "#slk_sort_boards",
    SaveButton: "#RearrangeButton",
    FollowButtons: ".followBoard .Button",
    Container: ".sortable",
    Objects: ".pinBoard",
    Helper: "#SortableButtons",
    showControls: function () {
        $(this.Helper).slideDown();
        $(this.FollowButtons).hide();
        $(this.Objects).addClass("inMotion")
    },
    hideControls: function () {
        $(this.Helper).slideUp();
        $(this.FollowButtons).show();
        $(this.Objects).removeClass("inMotion")
    },
    start: function () {
        this.showControls();
        $(this.Container).sortable();
        return false
    },
    save: function () {
        trackGAEvent("rearrange_board_save", "clicked");
        this.hideControls();
        $(this.Container).sortable("destroy");
        $(this.Objects).removeClass("inMotion");
        var a = [];
        $(this.Objects).each(function () {
            a.push(this.id.replace("board", ""))
        });
        $.post($(this.SaveButton).attr("href"), {
            order_array: a.toString()
        }, function (c) {
            if (c.status == "success") {
                trackGAEvent("rearrange_board_save", "success");
                console.log("Sorting saved.");
                $("#SortStatus").html("Saved!").css("color", "green").stop().css("opacity", "1").animate({
                    opacity: "0"
                }, 5E3)
            } else {
                console.log("Sorting failed.");
                $("#SortStatus").html("Saved Failed &mdash; <a href='#' onclick='boardSort.save(); return false' style='font-weight: 300;'>Try Again</a>?").css("color", "#221919").css("opacity", "1")
            }
        });
        return false
    },
    cancel: function () {
        this.hideControls();
        window.location.reload();
        return false
    }
};
var SendMessage = SendMessage || {
    setup: function () {
        var a = $("#SendMessage form"),
            c = $("#SendMessage textarea"),
            d = $("#SendMessage a"),
            e = c.val(),
            f = c.height() * 3;
        c.live("focus", function () {
            d.show();
            if (c.val().match(/^Write/)) {
                c.val("");
                c.css("height", f)
            }
        });
        c.live("blur", function () {
            c.val() === "" && c.val(e)
        });
        d.live("click", function () {
            trackGAEvent("send_message", "clicked");
            var b = c.val().trim();
            if (b === "" || b.match(/^Write/)) {
                alert("Please enter a message first!");
                return false
            } else {
                d.html("<strong>Sending</strong><span></span>").addClass("disabled");
                c.val("")
            }
            $.post(a.attr("action"), {
                message: b
            }, function (g) {
                if (g.status === "success") {
                    trackGAEvent("send_message", "success");
                    d.html("<strong>Send</strong><span></span>").removeClass("disabled");
                    c.val(e);
                    $("#ProfileSidebar .activity").prepend(g.html);
                    BoardLayout.allPins()
                } else alert(g.message)
            });
            return false
        })
    }
};
var Follow = function () {
        return {
            listeners: function () {
                var a = this;
                $(".followbutton").live("click", function () {
                    trackGAEvent("follow_board", "clicked");
                    a.followBoard($(this));
                    return false
                });
                $(".unfollowbutton").live("click", function () {
                    trackGAEvent("unfollow_board", "clicked");
                    a.unfollowBoard($(this));
                    return false
                });
                $(".followuserbutton").live("click", function () {
                    trackGAEvent("follow_user", "clicked");
                    a.followUser($(this));
                    return false
                });
                $(".unfollowuserbutton").live("click", function () {
                    trackGAEvent("unfollow_user", "clicked");
                    a.unfollowUser($(this));
                    return false
                });
                $(".ignorerecommendationbutton").live("click", function () {
                    a.ignoreUser($(this));
                    return false
                })
            },
            followBoard: function (a) {
                var c = this;
                this.setFollowBoardButton(a, {
                    follow: false,
                    disabled: true
                });
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    error: function () {
                        c.setFollowBoardButton(a, {
                            follow: true,
                            disabled: false
                        })
                    },
                    success: function (d) {
                        if (d.status == "failure" && d.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        trackGAEvent("follow_board", "success");
                        c.setFollowBoardButton(a, {
                            follow: false,
                            disabled: false
                        })
                    }
                })
            },
            unfollowBoard: function (a) {
                var c = this;
                this.setFollowBoardButton(a, {
                    follow: true,
                    disabled: true
                });
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        unfollow: 1
                    },
                    error: function () {
                        c.setFollowBoardButton(a, {
                            follow: false,
                            disabled: false
                        })
                    },
                    success: function () {
                        trackGAEvent("unfollow_board", "success");
                        c.setFollowBoardButton(a, {
                            follow: true,
                            disabled: false
                        })
                    }
                })
            },
            followUser: function (a) {
                var c = $("strong", a),
                    d = $("#profile").length != 0 ? "Unfollow All" : "Unfollow",
                    e = this;
                c.length || (c = a);
                if (a.data("text-unfollow")) d = a.data("text-unfollow");
                c.text(d);
                a.removeClass("followuserbutton").addClass("disabled unfollowuserbutton").attr("disabled", "disabled");
                $(".followbutton").each(function () {
                    e.setFollowBoardButton($(this), {
                        follow: false,
                        disabled: false
                    })
                });
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    error: function () {},
                    success: function (f) {
                        if (f.status == "failure" && f.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        trackGAEvent("follow_user", "success");
                        a.removeAttr("disabled").addClass("clickable");
                        $(window).trigger("user:followed", [a])
                    }
                })
            },
            unfollowUser: function (a) {
                var c = $("strong", a),
                    d = $("#profile").length != 0 ? "Follow All" : "Follow",
                    e = this;
                c.length || (c = a);
                if (a.data("text-follow")) d = a.data("text-follow");
                c.text(d);
                a.removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
                $(".unfollowbutton").each(function () {
                    e.setFollowBoardButton($(this), {
                        follow: true,
                        disabled: false
                    })
                });
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        unfollow: 1
                    },
                    error: function () {},
                    success: function () {
                        trackGAEvent("unfollow_user", "success");
                        a.removeAttr("disabled");
                        $(window).trigger("user:unfollowed", [a])
                    }
                })
            },
            ignoreUser: function (a) {
                var c = _.map(a.closest(".section").find(".FollowStory"), function (d) {
                    return $(d).attr("data-user-id")
                });
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        displayed_user_ids: c
                    },
                    error: function () {},
                    success: function (d) {
                        var e = a.closest(".story"),
                            f = a.closest(".section"),
                            b = Follow.countStories(f);
                        trackGAEvent("ignore_user", "success", "source", a.data("source"));
                        d = $(d.html).css("padding-top", e.css("padding-top"));
                        d.insertAfter(e).hide();
                        Follow.replaceRecommendation(e, b, d, f)
                    }
                })
            },
            replaceRecommendation: function (a, c, d, e) {
                a.fadeOut(350, function () {
                    a.remove();
                    Follow.handleChangingStories(c, Follow.countStories(e));
                    d.fadeIn(350)
                })
            },
            countStories: function (a) {
                return a.find(".FollowStory").length
            },
            handleChangingStories: function (a, c) {
                if (c == 0) {
                    var d = $("#UserRecommendations");
                    d.fadeOut(350, function () {
                        d.remove()
                    })
                }
                a != c && BoardLayout.allPins()
            },
            followUserHomeActivity: function (a) {
                $.ajax({
                    url: a.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        is_home: true
                    },
                    error: function () {},
                    success: function () {
                        trackGAEvent("follow_user_home_activity", "success");
                        window.activity_feed.update_ui_followed_succeeded(a)
                    }
                })
            },
            pullRecommendation: function (a, c) {
                a = _.map($(a).closest(".section").find(".FollowStory"), function (d) {
                    return $(d).attr("data-user-id")
                });
                $.ajax({
                    url: "/recommendations/",
                    type: "GET",
                    dataType: "json",
                    data: {
                        displayed_user_ids: a
                    },
                    success: function (d) {
                        c($(d.html))
                    }
                })
            },
            setFollowBoardButton: function (a, c) {
                var d = $("strong", a),
                    e;
                e = c.follow;
                c = c.disabled;
                d.length || (d = a);
                if (e) {
                    e = a.data("text-follow") || "Follow";
                    a.removeClass("disabled clickable unfollowbutton").addClass("followbutton")
                } else {
                    e = a.data("text-unfollow") || "Unfollow";
                    a.removeClass("followbutton").addClass("disabled clickable unfollowbutton")
                }
                c ? a.attr("disabled", "disabled") : a.removeAttr("disabled");
                d.text(e)
            }
        }
    }();
var Comment = function () {
        return {
            gridShowButton: function (a) {
                a.show();
                BoardLayout.allPins()
            },
            gridComment: function () {
                var a = this;
                $(".write textarea");
                $("#ColumnContainer").on("focus", ".write .GridComment", function () {
                    var c = $(this).parents(".pin").first(),
                        d = $(this).parent().find(".Button");
                    a.gridShowButton(d);
                    d = a.getCommenters(c.find(".comments .comment"));
                    c = a.getPinner(c.find("div.attribution:first"));
                    d[c.link] = c;
                    Tagging.initTextarea($(this), d)
                });
                $("#ColumnContainer").on("click", ".actions .comment", function () {
                    trackGAEvent("comment_button", "clicked");
                    var c = $(this),
                        d = c.parents(".pin").find(".write"),
                        e = d.find(".Button");
                    if (c.hasClass("disabled")) {
                        d.slideUp("fast", function () {
                            d.find("textarea").blur();
                            BoardLayout.allPins()
                        });
                        c.removeClass("disabled clickable")
                    } else {
                        e.css("visibility", "hidden");
                        d.slideDown("fast", function () {
                            e.css("visibility", "visible");
                            d.find("textarea").focus()
                        });
                        c.addClass("disabled clickable")
                    }
                    return false
                });
                $("#ColumnContainer").on("click", ".write .Button", function () {
                    trackGAEvent("comment_submit", "clicked", "grid");
                    var c = $(this),
                        d = c.parent(),
                        e = c.parents("form"),
                        f = c.parents(".pin"),
                        b = $(".CommentsCount", f),
                        g = $("textarea", f),
                        h = g.val(),
                        j = $("div.comments", f),
                        k = $(".all", f);
                    if (h != "") {
                        Tagging.loadTags($(".GridComment", d), $(".pin_comment_replies", d));
                        if (!c.hasClass("disabled")) {
                            c.addClass("disabled");
                            $.ajax({
                                url: e.attr("action"),
                                type: "POST",
                                dataType: "json",
                                data: {
                                    text: h,
                                    replies: $(".pin_comment_replies", d).val(),
                                    home: "1",
                                    path: window.location.pathname
                                },
                                error: function (q) {
                                    alert(q.message)
                                },
                                success: function (q) {
                                    trackGAEvent("comment_submit", "success", "grid");
                                    if (q.status == "fail" && q.captcha) {
                                        RecaptchaDialog.challenge();
                                        return false
                                    }
                                    var u = $(q.html).hide();
                                    b.html(q.count_str);
                                    if (k.length != 0) {
                                        k.before(u);
                                        k.html(q.all_str)
                                    } else if (j.length === 0) {
                                        f.find(".attribution").after("<div class='comments colormuted'></div>");
                                        f.find(".comments").html(u);
                                        b.removeClass("hidden")
                                    } else f.find("div.comments .comment:last").after(u);
                                    g.remove();
                                    e.prepend(g.clone().text(""));
                                    u.slideDown("fast", function () {
                                        BoardLayout.allPins()
                                    })
                                },
                                complete: function () {
                                    c.removeClass("disabled")
                                }
                            })
                        }
                    }
                    return false
                })
            },
            closeupComment: function () {
                var a = $("#CloseupComment"),
                    c = $("#PostComment");
                a.focus(function () {
                    $("#PinAddCommentControls").slideDown(250)
                });
                a.bind("keyup", function () {
                    $("#CloseupComment").val() != "" ? c.removeClass("disabled") : c.addClass("disabled")
                });
                var d = this.getCommenters(".PinComments .comment"),
                    e = this.getPinner("#PinPinner");
                d[e.link] = e;
                Tagging.initTextarea("#CloseupComment", d);
                c.click(function () {
                    trackGAEvent("comment_submit", "clicked", "closeup");
                    Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                    var f = $(this),
                        b = $("#pin_comment_replies").val(),
                        g = a.val();
                    if (g != "") {
                        $.trim(g);
                        if (!f.hasClass("disabled")) {
                            f.addClass("disabled");
                            $.ajax({
                                url: $("#post_comment_url").val(),
                                type: "POST",
                                dataType: "json",
                                data: {
                                    text: g,
                                    replies: b,
                                    path: window.location.pathname
                                },
                                error: function (h) {
                                    alert(h.message)
                                },
                                success: function (h) {
                                    if (h.status == "fail" && h.captcha) {
                                        RecaptchaDialog.challenge(function () {
                                            f.removeClass("disabled")
                                        });
                                        return false
                                    } else if (h.status == "fail") alert(h.message);
                                    else {
                                        trackGAEvent("comment_submit", "success", "closeup");
                                        Tagging.initTextarea("#CloseupComment");
                                        a.val("");
                                        $("#pin_comment_replies").val("");
                                        var j = $(h.html).css({
                                            "background-color": "#fbffcc"
                                        });
                                        $(".PinComments").append(j)
                                    }
                                    j.removeClass("hidden").animate({
                                        backgroundColor: "#f2f0f0",
                                        display: "block"
                                    }, 1200)
                                }
                            })
                        }
                    }
                    return false
                })
            },
            zoomComment: function () {
                var a = $("#zoom"),
                    c = $("#CloseupComment", a),
                    d = $("#PostComment", a);
                c.focus(function () {
                    $("#PinAddCommentControls", a).slideDown(250)
                });
                c.bind("keyup", function () {
                    c.val() != "" ? d.removeClass("disabled") : d.addClass("disabled")
                });
                var e = this.getCommenters("#zoom .PinComments .comment"),
                    f = this.getPinner("#PinPinner");
                e[f.link] = f;
                Tagging.initTextarea("#CloseupComment", e);
                d.click(function () {
                    trackGAEvent("comment_submit", "clicked", "zoom");
                    Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                    var b = $(this),
                        g = $("#pin_comment_replies", a).val(),
                        h = c.val();
                    if (h != "") {
                        $.trim(h);
                        if (!b.hasClass("disabled")) {
                            b.addClass("disabled");
                            $.ajax({
                                url: $("#post_comment_url", a).val(),
                                type: "POST",
                                dataType: "json",
                                data: {
                                    text: h,
                                    replies: g,
                                    path: window.location.pathname
                                },
                                error: function (j) {
                                    alert(j.message)
                                },
                                success: function (j) {
                                    if (j.status == "fail" && j.captcha) {
                                        RecaptchaDialog.challenge(function () {
                                            b.removeClass("disabled")
                                        });
                                        return false
                                    } else if (j.status == "fail") alert(j.message);
                                    else {
                                        trackGAEvent("comment_submit", "success", "zoom");
                                        Tagging.initTextarea("#CloseupComment");
                                        c.val("");
                                        $("#pin_comment_replies", a).val("");
                                        j = $(j.html).css({
                                            "background-color": "#fbffcc"
                                        });
                                        $(".PinComments", a).append(j)
                                    }
                                    j.removeClass("hidden").animate({
                                        backgroundColor: "#ffffff",
                                        display: "block"
                                    }, 220)
                                }
                            })
                        }
                    }
                    return false
                })
            },
            getCommenters: function (a) {
                var c = {};
                $(a).each(function (d, e) {
                    e = $(e);
                    d = e.find("p a:first").attr("href");
                    !d || c[d] || (c[d] = {
                        label: e.find("p a:first").text(),
                        value: d.replace(/\//g, ""),
                        image: e.find("img:first").attr("src"),
                        link: d
                    })
                });
                return c
            },
            getPinner: function (a) {
                a = $(a);
                var c = a.find("a").attr("href");
                return {
                    label: a.find("p:first a:first").text(),
                    value: c.replace(/\//g, ""),
                    image: a.find("a img:first").attr("src"),
                    link: c
                }
            }
        }
    }();
var Logout = function () {
        return {
            logout: function () {
                $.ajax({
                    url: "/logout/",
                    type: "POST",
                    dataType: "json",
                    data: {},
                    error: function (a) {
                        alert(a.message)
                    },
                    success: function () {
                        window.location = "/"
                    }
                })
            }
        }
    }();
	
var zoomCount = 0,
    Zoom = function () {
        return {
            HTMLloading: "<div id='loading'><img src='" + media_url + "images/rotating_pin.png' alt='Loading Animation' /></div>",
            HTMLshow: "<div id='zoomScroll' class='visible loading'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
            HTMLzoom: "<div id='zoomScroll'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
            setup: function () {
                if (window.location.hash == "#_=_") window.location.hash = "";
                var a = this,
                    c = !navigator.userAgent.match(/ipad|ipod|iphone|android/i) && window.history.pushState;
                isWebkit = $.browser.webkit;
                isFireFox = $.browser.mozilla;
                isChrome = navigator.userAgent.match(/chrome/i);
                isFireFox && $("body").addClass("extraScroll");
                isChrome && $("body").addClass("hidefixed");

                if (c) {
                    var d = this.router = new Backbone.Router({
                        routes: {
                            "pin/:id/": "open",
                            ".*": "close"
                        }
                    });

                    d.on("route:open", function (e) {
                        isWebkit ? a.zoom(e) : a.show(e);
                        a.open = true
                    });
                    d.on("route:close", function () {
                        a.close()
                    });
                    Backbone.history.start({
                        pushState: true,
                        silent: true
                    });
                    if (isWebkit) {
                        zoomTimer = 220;
                        c = '<style type="text/css">#zoomScroll,#zoomScroll.visible #zoom,#zoomScroll.visible .PinImage img,#zoom .PriceContainer,#zoom .PriceContainer *,#zoom .convo .ImgLink,#zoom .convo .ImgLink img,#zoom .comments .comment,#zoom #loading img{-moz-transition: all ' + zoomTimer / 1E3 + "s ease-out; -webkit-transition: all " + zoomTimer / 1E3 + "s ease-out;}</style>";
                        $("head").append(c);
                        $("#ColumnContainer").on("mousedown", ".PinImage", function () {
																					
                            $(this).parents(".pin").addClass("spring")
                        });
                        $("#ColumnContainer").on("mouseout", ".spring", function () {
                            $(this).removeClass("spring")
                        })
                    }
                    $("#ColumnContainer").on("click", ".PinImage", function (e) {
                        if (e.cntrlKey || e.metaKey) return true;
                        e = $(this).parents(".pin").attr("data-id");
                        zoomCount++;
                        trackGAEvent("zoom_pin", "clicked", zoomCount);
                        d.navigate("/pin/" + e + "/", {
                            trigger: true
                        });
                        return false
                    })
                }
            },
            zoom: function (a) {
                var c = this;
                htmlZoom = c.HTMLzoom.replace("%PIN_ID%", a);
                $("body").addClass("noscroll").append(htmlZoom);
                var d = $("#zoomScroll"),
                    e = $("#zoom");
                setTimeout(function () {
                    d.addClass("visible");
                    var g = $(window).width() / 2;
                    e.css("left", g + "px");
                    b.filmDimensions[1] != 0 && b.elem.css({
                        width: b.filmDimensions[0] + "px",
                        height: b.filmDimensions[1] + "px"
                    });
                    if (f.isVideo) {
                        $(".PinImage", e).css("background-color", "black");
                        b.elem.css({
                            opacity: "0"
                        })
                    }
                    setTimeout(function () {
                        zoomFinished = true;
                        d.addClass("loading");
                        f.isVideo ? f.elem.find(".video").show() : b.elem.attr("src", b.src)
                    }, zoomTimer)
                }, 1);
                var f = {};
                f.id = a;
                f.elem = $('div[data-id="' + f.id + '"]');
                f.elem.addClass("zoomed");
                f.elem.find(".video").hide();
                f.HTMLimage = getHTML(f.elem.find(".PinImage"));
                f.offset = f.elem.offset();
                f.isVideo = f.elem.find(".video").length;
                f.elem.removeClass("spring");
                var b = {};
                b.src = f.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
                b.preload = new Image;
                b.preload.src = b.src;
                e.html(f.HTMLimage).css({
                    top: f.offset.top - $(window).scrollTop() + "px",
                    left: f.offset.left + "px"
                }).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
                b.elem = $(".PinImageImg", e);
                b.origin = $(".zoomed .PinImageImg");
                b.thumbDimensions = f.isVideo ? ["192", "144"] : [b.origin.width(), b.origin.height()];
                b.filmDimensions = [f.elem.attr("data-width"), f.elem.attr("data-height")];
                b.elem.css({
                    width: b.thumbDimensions[0] + "px",
                    height: b.thumbDimensions[1] + "px"
                });
                c.ajax(f.id);
                c.closeListeners(f.id)
            },
            show: function (a) {
                var c = this,
                    d = c.HTMLshow.replace("%PIN_ID%", a);
                $("body").addClass("noscroll").append(d);
                $("#zoomScroll");
                d = $("#zoom");
                var e = {};
                e.id = a;
                e.elem = $('div[data-id="' + e.id + '"]');
                e.elem.addClass("zoomed");
                e.HTMLimage = getHTML(e.elem.find(".PinImage"));
                e.isVideo = e.elem.find(".video").length;
                d.html(e.HTMLimage).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
                a = $(window).width() / 2;
                d.css("left", (isFireFox ? a - 7 : a) + "px");
                a = {};
                a.elem = $(".PinImageImg", d);
                a.src = e.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
                a.filmDimensions = e.isVideo ? ["600", "450"] : [e.elem.attr("data-width"), e.elem.attr("data-height")];
                e.isVideo && d.find(".video").remove();
                a.elem.attr("src", a.src).css({
                    width: a.filmDimensions[0] + "px",
                    height: a.filmDimensions[1] + "px"
                });
                c.ajax(e.id);
                c.closeListeners(e.id)
            },
            ajax: function (a) {
                var c = this,
                    d = $("#zoom");
                this.cancelAjax();
                this.xhr = $.ajax({
                    url: "/pin/" + a + "/",
                    dataType: "json",
                    error: function (e, f) {
                        if (f !== "abort") {
                            f = "Could not fetch pin :-/";
                            if (navigator.onLine) {
                                if (e.status === 404) f = "This pin has been deleted."
                            } else f = "No Internet Connection :-/";
                            d.append("<div id='error'><p class='colormuted'></p></div>").removeClass("loaded");
                            $("#error p").html(f)
                        }
                    },
                    success: function (e) {
                        if (isWebkit) typeof zoomFinished != "undefined" ? c.renderSuccess(e) : d.one("webkitTransitionEnd", function () {
                            c.renderSuccess(e)
                        });
                        else c.renderSuccess(e)
                    },
                    complete: function () {
                        c.xhr = null
                    },
                    timeout: 2E4
                })
            },
            renderSuccess: function (a) {
                var c = $("#zoomScroll"),
                    d = $("#zoom");
                d.prepend(a.header);
                $("#PinImageHolder").append(a.buttons);
                d.append(a.footer);
                c.addClass("loaded");
                c.removeClass("loading");
                $("<div>&nbsp;</div>").css({
                    height: 0,
                    "margin-top": "-10px"
                }).insertAfter(d)
            },
            closeListeners: function () {
                var a = this;
                $("#zoomScroll").click(function (c) {
                    if ($(c.target).is("#zoomScroll, #SocialShare ul, #SocialShare li")) {
                        window.history.back();
                        a.close();
                        a.cancelAjax()
                    }
                })
            },
            close: function () {
                if (this.open) {
                    trackGAEvent("zoom_pin", "closed", zoomCount);
                    $("#zoomScroll").remove();
                    $("body").removeClass("noscroll");
                    $(".zoomed").removeClass("zoomed");
                    delete zoomFinished;
                    return this.open = false
                }
            },
            cancelAjax: function () {
                if (this.xhr && this.xhr.abort) {
                    this.xhr.abort();
                    this.xhr = null
                }
            }
        }
    }();
var Like = function () {
        function a(c) {
            var d = $(c).height();
            window.setTimeout(function () {
                d !== $(c).height() && BoardLayout.allPins()
            }, 1)
        }
        return {
            ajaxLike: function (c, d, e, f) {
                $.ajax({
                    url: "/pin/" + c + "/like/",
                    type: "POST",
                    dataType: "json",
                    data: f,
                    error: function (b) {
                        d(b)
                    },
                    success: function (b) {
                        e(b)
                    },
                    timeout: 2E4
                })
            },
            ajaxUnlike: function (c, d, e, f) {
                $.ajax({
                    url: "/pin/" + c + "/like/",
                    type: "POST",
                    dataType: "json",
                    data: f,
                    error: function (b) {
                        d(b)
                    },
                    success: function (b) {
                        e(b)
                    },
                    timeout: 2E4
                })
            },
            gridListeners: function () {
                var c = this;
                $("#ColumnContainer").on("click", ".likebutton", function () {
                    trackGAEvent("like", "clicked", "grid");
                    c.gridLike($(this));
                    return false
                });
                $("#ColumnContainer").on("click", ".unlikebutton", function () {
                    trackGAEvent("unlike", "clicked", "grid");
                    c.gridUnlike($(this));
                    return false
                })
            },
            gridLike: function (c) {
                c.removeClass("likebutton").addClass("disabled unlikebutton").html(c.data("text-unlike"));
                var d = c.parents(".pin"),
                    e = d.children(".stats"),
                    f = e.find(".LikesCount");
                this.ajaxLike(d.attr("data-id"), function () {}, function (b) {
                    if (b.status == "success") {
                        a(e);
                        f.removeClass("hidden").html(b.count_str);
                        trackGAEvent("like", "success");
                        c.addClass("clickable")
                    } else {
                        if (b.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        c.removeClass("disabled unlikebutton").addClass("likebutton");
                        alert(b.message)
                    }
                })
            },
            gridUnlike: function (c) {
                c.removeClass("disabled clickable unlikebutton").addClass("likebutton").html("<em></em> " + c.data("text-like"));
                c = c.parents(".pin");
                var d = c.children(".stats"),
                    e = d.find(".LikesCount");
                this.ajaxUnlike(c.attr("data-id"), function () {}, function (f) {
                    a(d);
                    e.html(f.count_str);
                    f.count || e.addClass("hidden");
                    f.status == "success" && trackGAEvent("unlike", "success")
                }, {
                    unlike: 1
                })
            },
            zoomListeners: function () {
                var c = this;
                $("#PinImageHolder").on("click", ".ZoomLikeButton", function () {
                    trackGAEvent("like", "clicked", "zoom");
                    c.zoomLike($(this));
                    return false
                });
                $("#PinImageHolder").on("click", ".ZoomUnlikeButton", function () {
                    c.zoomUnlike($(this));
                    return false
                })
            },
            zoomLike: function (c) {
                c.removeClass("ZoomLikeButton").addClass("ZoomUnlikeButton disabled clickable").html(c.data("text-unlike"));
                this.gridLike($(".zoomed .likebutton"))
            },
            zoomUnlike: function (c) {
                c.removeClass("ZoomUnlikeButton disabled clickable ").addClass("ZoomLikeButton").html("<em></em>" + c.data("text-like"));
                this.gridUnlike($(".zoomed .unlikebutton"))
            },
            closeupListeners: function () {
                var c = this;
                $("#PinActionButtons").on("click", ".like_pin", function () {
                    trackGAEvent("like", "clicked", "closeup");
                    c.closeupLike($(this));
                    return false
                });
                $("#PinActionButtons").on("click", ".unlike_pin", function () {
                    trackGAEvent("unlike", "clicked", "closeup");
                    c.closeupUnlike($(this));
                    return false
                })
            },
            closeupLike: function (c) {
                var d = this,
                    e = $("#PinLikes");
                c.removeClass("like_pin").addClass("disabled clickable unlike_pin").html(c.data("text-unlike"));
                e.removeClass("hidden");
                c = c.attr("data-id");
                d.ajaxLike(c, function () {
                    d.closeupUnlike()
                }, function (f) {
                    if (f.status == "fail" && f.captcha) {
                        RecaptchaDialog.challenge();
                        return false
                    }
                    trackGAEvent("like", "success");
                    e.append(f.html)
                })
            },
            closeupUnlike: function (c) {
                var d = this,
                    e = $("#PinLikes");
                c.removeClass("disabled clickable unlike_pin").addClass("like_pin").html("<em></em>" + c.data("text-like"));
                $("a", e).length === 1 && e.addClass("hidden");
                c = c.attr("data-id");
                d.ajaxUnlike(c, function () {
                    d.closeupLike()
                }, function (f) {
                    trackGAEvent("unlike", "success");
                    $("#PinLikes a[href='/" + f.username + "/']").fadeOut("fast").remove()
                }, {
                    unlike: 1
                })
            }
        }
    }();
var Closeup = function () {
        return {
            setup: function () {
                $("#PinReport").live("click", function () {
                    trackGAEvent("pinreport", "clicked", "closeup");
                    Modal.show("ReportModal");
                    return false
                });
                $("#ReportModal .Button").click(function () {
                    trackGAEvent("report_modal", "clicked", "closeup");
                    $.post("flag/", {
                        reason: $("#ReportModal input[name=reason]:checked").val(),
                        explanation: $("#ReportModal textarea").val()
                    }, function (c) {
                        $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                        if (c.status == "success") {
                            trackGAEvent("report_modal", "success", "closeup");
                            $("#ReportModal .modal").addClass("PostSuccess");
                            $("#ReportModal .modal form").hide();
                            $(".PostSuccess").append('<p class="ReportSuccess">Thanks for reporting this pin! Our team will review the pin and delete it if it violates the <a href="/about/terms/">Pinterest Terms of Use</a>.</p>');
                            setTimeout('Modal.close("ReportModal"); Closeup.resetReportModal(); $("#ReportModal .SubmitButton").addClass("disabled").html("<strong>Send Email</strong><span></span>"); ', 5E3);
                            $("#PinReport").remove()
                        } else alert(c.message)
                    }, "json");
                    return false
                });
                var a;
                $("body").on("click", "a.ReportComment", function () {
                    trackGAEvent("commentreport", "clicked", "closeup");
                    a = $(this);
                    Modal.show("ReportCommentModal");
                    return false
                });
                $("#ReportCommentModal .Button").click(function () {
                    trackGAEvent("report_comment_modal", "clicked", "closeup");
                    $.post(a.attr("href"), {
                        comment_id: a.attr("data"),
                        reason: $("#ReportCommentModal input[name=reason]:checked").siblings("label").text(),
                        explanation: $("#ReportCommentModal textarea").val()
                    }, function (c) {
                        $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                        if (c.status == "success") {
                            trackGAEvent("report_modal", "success", "closeup");
                            $("#ReportCommentModal .modal").addClass("PostSuccess");
                            $("#ReportCommentModal .modal form").hide();
                            $(".PostSuccess").append('<p class="ReportSuccess">Our team will review the delete the comment if it violates our <br/><a href="http://pinterest.com/about/use">Acceptable Use Policy</a>.</p>');
                            setTimeout('Modal.close("ReportCommentModal"); Closeup.resetReportCommentModal(); $("#ReportCommentModal .SubmitButton").addClass("disabled").html("<strong>Send Email</strong><span></span>"); ', 1500);
                            a.replaceWith('<p class="floatRight" style="margin-right:0px"><strong>Thanks for reporting!</strong></p>')
                        } else alert(c.message)
                    }, "json");
                    return false
                });
                $("#EmailModal form").submit(function () {
                    trackGAEvent("email_modal", "submit", "closeup");
                    var c = $("#MessageRecipientName").val(),
                        d = $("#MessageRecipientEmail").val(),
                        e = $("#MessageBody").val();
                    if (!c) {
                        $("#MessageRecipientName").parent().find(".error").html("Please enter recipient name.");
                        return false
                    }
                    if (!d) {
                        $("#MessageRecipientEmail").parent().find(".error").html("Please enter recipient email.");
                        return false
                    }
                    $("#EmailModal .SubmitButton").addClass("disabled").text("Sending...");
                    $.ajax({
                        type: "POST",
                        url: $(this).attr("action"),
                        data: {
                            name: c,
                            email: d,
                            message: e
                        },
                        complete: function (f) {
                            f = $.parseJSON(f.responseText);
                            if (f.status == "success") {
                                trackGAEvent("email_modal", "success", "closeup");
                                $("#EmailModal .SubmitButton").text("Sent!");
                                setTimeout("Modal.close('EmailModal'); Closeup.resetEmailModal(); $('#EmailModal .SubmitButton').addClass('disabled').html('<strong>Send Email</strong><span></span>');", 500)
                            } else {
                                $("#EmailModal .SubmitButton").removeClass("disabled").html("<strong>Send Email</strong><span></span>");
                                f.message == "Invalid email address" && $("#MessageRecipientEmail").parent().after($("#EmailModal .error"));
                                $("#EmailModal .error").html(f.message)
                            }
                        }
                    });
                    return false
                });
                $("#SocialShare #PinEmbed").click(function () {
                    trackGAEvent("pin_embed", "clicked", "closeup");
                    var c = $("#PinImageHolder img");
                    if ($("#PinImageHolder iframe").length) c = $("#PinImageHolder iframe");
                    var d = c.width();
                    c = c.height();
                    max_closeup_image_width = d;
                    max_closeup_image_height = c;
                    $("#EmbedImageWidth").val(d);
                    $("#EmbedImageHeight").val(c);
                    $("#EmbedHTMLCode").val(embed_code_html_1 + d + "' height ='" + c + embed_code_html_2);
                    Modal.show("EmbedModal");
                    return false
                });
                $("#EmbedImageWidth").keyup(function () {
                    $(this).val() > max_closeup_image_width && $("#EmbedImageWidth").val(max_closeup_image_width);
                    var c = parseInt($("#EmbedImageWidth").val() * max_closeup_image_height / max_closeup_image_width);
                    $("#EmbedImageHeight").val(c);
                    $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                    return false
                });
                $("#EmbedImageHeight").keyup(function () {
                    $(this).val() > max_closeup_image_height && $("#EmbedImageHeight").val(max_closeup_image_height);
                    var c = parseInt(Math.ceil($("#EmbedImageHeight").val() * max_closeup_image_width / max_closeup_image_height));
                    $("#EmbedImageWidth").val(c);
                    $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                    return false
                });
                $(".DeleteComment").live("click", function () {
                    trackGAEvent("delete_comment", "clicked", "closeup");
                    var c = $(this);
                    if (c.attr("ban")) if (!confirm("Are you sure you want to ban " + c.attr("username") + "?")) return false;
                    c.trigger("mouseleave");
                    var d = c.parents(".comment");
                    d.slideUp("slow");
                    $.ajax({
                        url: c.attr("href"),
                        type: "POST",
                        dataType: "json",
                        data: {
                            comment: c.attr("data")
                        },
                        error: function (e) {
                            d.show();
                            e.message.length > 0 && alert(e.message)
                        },
                        success: function () {
                            trackGAEvent("delete_comment", "success", "closeup");
                            d.remove()
                        }
                    });
                    return false
                })
            },
            resetReportModal: function () {
                $("#ReportModal .PostSuccess").removeClass("PostSuccess");
                $("#ReportModal .ReportSuccess").remove();
                $('#ReportModal .option input[type="radio"]').attr("checked", false);
                $("#ReportModal select option:first-child").attr("selected", "selected");
                $("#ReportModal .Button").addClass("disabled");
                $("#ReportPin").val("").blur();
                $("#ReportModal form").show()
            },
            resetReportCommentModal: function () {
                $("#ReportCommentModal .PostSuccess").removeClass("PostSuccess");
                $("#ReportCommentModal .ReportSuccess").remove();
                $('#ReportCommentModal .option input[type="radio"]').attr("checked", false);
                $("#ReportCommentModal select option:first-child").attr("selected", "selected");
                $("#ReportCommentModal .Button").addClass("disabled");
                $("#ReportCommentModal form").show()
            },
            resetEmailModal: function () {
                $("#MessageRecipientEmail").val("").blur();
                $("#MessageRecipientName").val("").blur();
                $("#MessageBody").val("").blur();
                $("#EmailModal .error").html("")
            }
        }
    }();
var InviteForm = function () {
        return {
            setup: function () {
                var a = $("#SendInvites"),
                    c = $("#EmailAddresses .email");
                a.click(function () {
                    trackGAEvent("invite_form", "clicked");
                    c.each(function () {
                        var d = $(this),
                            e = $("textarea[name=message]"),
                            f = d.parent("li").children(".helper");
                        !d.val() == "" && InviteForm.submit(d.val(), e.val(), "somebody", function () {
                            trackGAEvent("invite_form", "success");
                            d.removeClass("error");
                            f.html("Invite Sent!").css("color", "green").slideDown();
                            d.val("").keyup();
                            e.val("").keyup()
                        }, function (b) {
                            d.addClass("error");
                            f.html(b.message).css("color", "red").slideDown()
                        })
                    });
                    return false
                })
            },
            submit: function (a, c, d, e, f) {
                $.post("/invite/new/", {
                    name: d,
                    message: c,
                    email: a
                }, function (b) {
                    b.status == "success" ? e(b) : f(b)
                }, "json")
            }
        }
    }();
var InviteModal = function () {
        return {
            show: function (a, c) {
                var d = this;
                $("#InviteModalName").empty().text(a);
                $("#InviteModalEmail").empty().text(c);
                Modal.show("InviteModal");
                $("#InviteModalMessage").val("").keyup().focus();
                $("#InviteModal .SubmitButton").unbind("click").click(function () {
                    var e = $(this),
                        f = $("#InviteModalMessage").val(),
                        b = $(".inputstatus");
                    e.addClass("disabled");
                    InviteForm.submit(c, f, a, function () {
                        b.text("").empty().css("margin-bottom", "0px");
                        b.removeClass("error").html("<span style='color: green; font-size: 18px; font-weight: 300;'>Success!</span>").css("margin-bottom", "14px");
                        setTimeout(function () {
                            Modal.close("InviteModal");
                            b.text("").empty().css("margin-bottom", "0px");
                            e.removeClass("disabled")
                        }, 1300);
                        d.trigger("invite:sent")
                    }, function () {
                        b.text("Sorry, an error has occurred. Please try again.").css("margin-bottom", "14px");
                        e.removeClass("disabled");
                        d.trigger("invite:failed")
                    })
                })
            }
        }
    }();
_.extend(InviteModal, Backbone.Events);
var FancyForm = function () {
        return {
            inputs: ".Form input, .Form textarea",
            button: ".SubmitButton",
            setup: function () {
                var a = this;
                this.inputs = $(this.inputs);
                a.inputs.each(function () {
                    var c = $(this);
                    a.checkVal(c)
                });
                a.inputs.live("keyup blur", function () {
                    var c = $(this);
                    a.checkVal(c);
                    var d = c.parents("ul"),
                        e = c.parents(".Form").find(a.button);
                    c.parents("li").hasClass("NoCheck") || a.checkDisabled(d, e)
                });
                $(a.button).live("click", function () {
                    var c = $(this).attr("data-form");
                    if ($(this).hasClass("disabled")) return false;
                    else $("#" + c + " form").submit()
                })
            },
            checkVal: function (a) {
                a.val().length > 0 ? a.parent("li").addClass("val") : a.parent("li").removeClass("val")
            },
            checkDisabled: function (a, c) {
                a.children("li:not(.optional)").length <= a.children("li.val").length ? c.removeClass("disabled") : c.addClass("disabled")
            }
        }
    }();
var MAX_PIN_CHARACTER_COUNT = 500,
    CharacterCount = CharacterCount || {
        setup: function (a, c, d, e) {
            a = $(a);
            c = $(c);
            d = $(d);
            a.focus(function () {
                CharacterCount.showCount(a, c, d, e)
            }).bind("keyup.cc input.cc paste.cc", function () {
                CharacterCount.showCount(a, c, d, e)
            })
        },
        truncateData: function (a, c) {
            a = $(a);
            c = c || MAX_PIN_CHARACTER_COUNT;
            a.val().length > c && a.val(a.val().substr(0, c - 3) + "...")
        },
        showCount: function (a, c, d, e) {
            e = e || MAX_PIN_CHARACTER_COUNT;
            a = e - a.val().length;
            c.text(a).show();
            a < 0 || a >= e ? d.addClass("disabled") : d.removeClass("disabled");
            a < 0 ? c.addClass("error") : c.removeClass("error")
        }
    };
var Tagging = function () {
        return {
            friends: null,
            friendsLinks: {},
            getFriends: function (a, c, d) {
                var e = a.term;
                (function (f) {
                    Tagging.friends ? f() : $.get("/x2ns4tdf0cd7cc9b/_getfriends/", function (b) {
                        Tagging.friends = [];
                        $.each(b, function (g, h) {
                            Tagging.friends.push({
                                label: h.name,
                                value: h.username,
                                image: h.image,
                                link: "/" + h.username + "/",
                                category: "People"
                            });
                            Tagging.friendsLinks["/" + h.username + "/"] = 1
                        });
                        f()
                    })
                })(function () {
                    var f = [];
                    if (d) for (name in d) Tagging.friendsLinks[name] || !d.hasOwnProperty(name) || f.push(d[name]);
                    f = f.concat(Tagging.friends);
                    if (Tagging.ignore) f = _.filter(f, function (b) {
                        return !Tagging.ignore[b.link]
                    });
                    if (e) f = tagmate.filter_options(f, e);
                    c(f)
                })
            },
            initInput: function (a, c, d) {
                a = $(a);
                var e = $("<div class='CollabAutocompleteHolder'></div>");
                a.after(e);
                a.autocomplete({
                    source: Tagging.getFriends,
                    minLength: 1,
                    delay: 5,
                    appendTo: e,
                    change: function (f, b) {
                        c && c(b.item)
                    },
                    select: function (f, b) {
                        c && c(b.item, true);
                        return false
                    },
                    position: {
                        my: "left top",
                        at: "left bottom",
                        offset: "0 -1"
                    }
                }).keydown(function (f) {
                    f.which == 13 && d && d()
                });
                a.data("autocomplete")._renderItem = function (f, b) {
                    return $("<li></li>").data("item.autocomplete", b).append("<a href='" + b.link + "'><img src='" + b.image + "' class='AutocompletePhoto' alt='Photo of " + b.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + b.label + "</span></a>").appendTo(f)
                }
            },
            initTextarea: function (a, c) {
                a = $(a);
                var d = {};
                d["@"] = tagmate.USER_TAG_EXPR;
                d["#"] = tagmate.HASH_TAG_EXPR;
                d.$ = tagmate.USD_TAG_EXPR;
                d["\u00a3"] = tagmate.GBP_TAG_EXPR;
                a.tagmate({
                    tagchars: d,
                    sources: {
                        "@": function (e, f) {
                            Tagging.getFriends(e, f, c)
                        }
                    }
                })
            },
            loadTags: function (a, c, d, e) {
                a = $(a).getTags();
                for (var f = [], b = [], g = null, h = 0; h < a.length; h++) {
                    a[h][0] == "@" && f.push(a[h].substr(1));
                    a[h][0] == "#" && b.push(a[h].substr(1));
                    if (a[h][0] == "$" || a[h][0] == "\u00a3") g = a[h]
                }
                $(c).val(f.join(","));
                $(d).val(b.join(","));
                $(e).val(g)
            },
            priceTag: function (a, c) {
                function d() {
                    var e = $(".price", c);
                    if (e.length <= 0) {
                        e = $("<div class='price'></div>");
                        c.prepend(e)
                    }
                    var f = a.getTags({
                        $: tagmate.USD_TAG_EXPR,
                        "\u00a3": tagmate.GBP_TAG_EXPR
                    });
                    if (f && f.length > 0) {
                        e.text(f[f.length - 1]);
                        e.addClass("visible")
                    } else {
                        e.removeClass("visible");
                        e.text("")
                    }
                }
                a = $(a);
                c = $(c);
                a.unbind(".priceTag").bind("keyup.priceTag", d).bind("focus.priceTag", d).bind("change.priceTag", d);
                d()
            }
        }
    }();
var RepinDialog = RepinDialog || {
    setup: function () {
        var a = $("#Repin"),
            c = $("form", a),
            d = $(".Buttons .Button", a),
            e = $("strong", d),
            f = $(".DescriptionTextarea", a),
            b = $(".CharacterCount", a),
            g = $(".mainerror", a);
        BoardPicker.setup("#Repin .BoardPicker", function (h) {
            $("#repin_board", a).val(h)
        }, function (h) {
            $("#repin_board", a).val(h)
        });
        AddDialog.shareCheckboxes("Repin");
        CharacterCount.setup(f, b, d);
        d.click(function () {
            if (f.val() == "") {
                g.html(f.data("text-error-empty")).slideDown();
                return false
            }
            $("#Repin #repin_details").val(f.val());
            Tagging.loadTags(f, "#Repin #repin_comment_replies", "#Repin #repin_tags", "#Repin #repin_currency_holder");
            c.submit();
            return false
        });
        c.submit(function () {
            if (d.hasClass("disabled")) return false;
            trackGAEvent("repin_submit", "clicked", "dialogue");
            d.addClass("disabled");
            e.html(d.data("text-pinning"));
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                dataType: "json",
                data: $(this).serialize(),
                success: function (h) {
                    if (h.status == "success") {
                        trackGAEvent("repin_submit", "success", "dialogue");
                        var j = $(".PostSuccess", a);
                        $(".BoardLink", j).attr("href", h.board_url).text(h.board_name);
                        $(".PinLink", j).attr("href", h.repin_url);
                        j.show();
                        setTimeout(function () {
                            a.addClass("super")
                        }, 1);
                        setTimeout(function () {
                            RepinDialog.reset()
                        }, 2500);
                        $("#CloseupRight").length > 0 && $("#PinRepins").append('<a href="' + h.repin_user_url + '" class="CommenterImage" title="Repinned by <a href=\'#\'>' + h.repin_user_name + "</a> to <a href='#'>" + h.board_name + '</a>"><img src="' + h.repin_user_image + '" alt="Thumbnail of" /></a>')
                    } else {
                        d.removeClass("disabled");
                        e.html(d.data("text-pin-it"))
                    }
                },
                error: function () {
                    d.removeAttr("disabled");
                    e.html(d.data("text-pin-it"))
                }
            });
            return false
        })
    },
    grid: function () {
        $(".BoardLayout").on("click", ".repin_link", function () {
            trackGAEvent("repin_button", "clicked", "board_layout");
            pinID = $(this).parents(".pin").attr("data-id");
            RepinDialog.show(pinID);
            return false
        })
    },
    show: function (a) {
        var c = $("#Repin");
        $.getJSON("/pin/" + a + "/repindata/", {}, function (d) {
            $(".DescriptionTextarea", c).val(d.details).parent("li").addClass("val");
            var e = '<img src="' + d.imgurl + '" />';
            if (d.video) e = '<img src="' + media_url + 'images/VideoIndicator.png" alt="Video Icon" class="video" />' + e;
            d.buyable && $(".ImagePicker .price", c).html("$" + d.buyable);
            $(".Images", c).html(e);
            $("#repin_pin_id", c).val(a);
            $("#repin_tags", c).val(d.tags.join(","));
            $("#repin_comment_replies", c).val(d.reply_usernames.join(","));
            $("form", c).attr("action", "/pin/" + a + "/repin/");
            Tagging.initTextarea("#Repin .DescriptionTextarea");
            Tagging.priceTag("#Repin .DescriptionTextarea", "#Repin .Images");
            CharacterCount.truncateData("#Repin .DescriptionTextarea", 500);
            Modal.show("Repin");
            setTimeout(function () {
                $(".DescriptionTextarea", c).focus().select()
            }, 350)
        })
    },
    reset: function () {
        var a = $("#Repin");
        Modal.close("Repin");
        a.removeClass("visible").removeClass("super");
        $(".PostSuccess", a).hide();
        $("form", a).attr("action", "");
        $(".DescriptionTextarea", a).val("");
        $(".ImagePicker .Images", a).html("");
        $(".price", a).removeClass("visible").html("");
        $(".mainerror", a).html("");
        $(".Buttons .RedButton", a).removeClass("disabled");
        $(".Buttons .RedButton strong", a).html("Pin It");
        $("#repin_pin_id", a).val("")
    }
};
var ScrapePinDialog = ScrapePinDialog || {
    id: "ScrapePin",
    setup: function () {
        var a = this;
        AddDialog.setup(a.id);
        a.initScraperInput()
    },
    initScraperInput: function () {
        function a(j) {
            return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(j)
        }
        function c(j) {
            var k = true;
            if (j.indexOf("http") != 0) j = "http://" + j;
            if (j == "") k = false;
            if (j == "http://") k = false;
            if (j.length < 2) k = false;
            if (j.indexOf(".") == -1) k = false;
            a(j) || (k = false);
            return k
        }
        function d() {
            var j = $("#" + ScrapePinDialog.id),
                k = $("#ScrapePinInput").val();
            if (h !== k) {
                h = k;
                if (c(k)) {
                    if (k.indexOf("http") != 0) k = "http://" + k;
                    $(".load", j).show();
                    $(".ImagePicker .Images ul", j).empty();
                    k = escape(k);
                    setTimeout(e, 5E3);
                    images_count = 0;
                    imagesArray = [];
                    msg = "";
                    $.getJSON("/pin/create/find_images/", {
                        url: k
                    }, function (q) {
                        if (q.status === "success") {
                            images_count = q.images.length;
                            for (var u = 0; u < q.images.length; u++) {
                                urlImage = new Image;
                                urlImage.src = q.images[u];
                                msg += "<br/>Loading " + urlImage.src;
                                urlImage.onload = function () {
                                    images_count -= 1;
                                    images_count == 0 && f()
                                };
                                imagesArray.push(urlImage)
                            }
                            q.title.length > 80 ? $("#id_title").val(q.title.substring(0, 79)) : $("#id_title").val(q.title);
                            $(".load", j).hide();
                            $("#id_link").val($("#scrape_url").val());
                            $("#PinSourceURL").html("Source: " + k).removeClass("hidden");
                            AddDialog.pinBottom("ScrapePin");
                            $(".Arrows", j).addClass("holla").show();
                            $("#ScrapeButton").removeClass("disabled")
                        } else {
                            $(".load", j).hide();
                            $("#ScrapeButton").removeClass("disabled");
                            alert("We couldn't find any images: " + q.message)
                        }
                    })
                } else alert("Not a valid URL!")
            }
        }
        function e() {
            if (images_count > 0) {
                images_count = -1;
                f()
            }
        }
        function f() {
            strHtml = "";
            imgFound = false;
            for (var j = foundCtr = 0; j < imagesArray.length; j++) {
                img = imagesArray[j];
                if (img.width >= 150 && img.height >= 50) {
                    imgFound = true;
                    foundCtr++;
                    strHtml += "<li>" + (is_video(img.src) ? "<img src='" + media_url + "images/VideoIndicator.png' alt='Video Icon' class='video' />" : "") + "<img src='" + img.src + "' width='156px' alt='' /></li>"
                }
            }
            if (strHtml != "") {
                $("#ScrapePin .ImagePicker .Images ul").html(strHtml);
                b(foundCtr)
            } else alert("No Large Images Found.")
        }
        function b() {
            var j = function (q, u) {
                    im = $(u).find("img")[0];
                    if ($(im).hasClass("video")) im = $(u).find("img")[1];
                    src = $(im).attr("src");
                    $("#id_img_url").val(src);
                    $("#id_link").val($("#ScrapePinInput").val())
                },
                k = $("#ScrapePin .ImagePicker .Images").jcarousel({
                    buttonNextHTML: null,
                    buttonPrevHTML: null,
                    initCallback: function (q) {
                        $("#ScrapePin .imagePickerNext").click(function () {
                            q.next();
                            return false
                        });
                        $("#ScrapePin .imagePickerPrevious").click(function () {
                            q.prev();
                            return false
                        })
                    },
                    animation: "fast",
                    itemVisibleInCallback: {
                        onAfterAnimation: j
                    },
                    scroll: 1
                });
            j(k, $("#ScrapePin .ImagePicker").find("li")[0], 1, "next")
        }
        function g() {
            var j = $("#ScrapeButton");
            if (c($("#ScrapePinInput").val())) {
                j.addClass("disabled");
                d()
            } else {
                alert("Please enter a valid website URL");
                j.removeClass("disabled")
            }
        }
        var h = "";
        $("#ScrapePinInput").bind("keydown", function (j) {
            j.keyCode === 13 && g()
        });
        $("#ScrapeButton").click(function () {
            g();
            return false
        })
    },
    reset: function () {
        var a = $("#" + this.id);
        $("#ScrapePinInput", a).val("");
        $(".PinBottom", a).hide();
        $(".modal", a).css("margin-bottom", "0");
        $(".Buttons .Button", a).removeClass("disabled");
        $(".Buttons .Button strong", a).html("Pin It");
        ScrapePinDialog.initScraperInput()
    }
};
var PeoplePages = PeoplePages || {
    setup: function () {
        $("#MorePeople").live("click", function () {
            var a = $(this),
                c = a.attr("href");
            a.html('<strong><img src="' + media_url + 'images/ajaxload2.gif" alt="Loader" /></strong><span></span>');
            $.get(c, function (d) {
                if (d.status == "success") {
                    $("#PeopleList").append(d.html);
                    if (d.page != undefined) {
                        d = $.query.load(c).set("page", d.page);
                        a.html("<strong>More</strong><span></span>").attr("href", d)
                    } else a.remove()
                } else alert(d.message)
            }, "json");
            return false
        })
    }
};
var Nag = Nag || {
    setup: function (a) {
        var c = $(".Nag").outerHeight();
        $("#" + a + " .NagSpacer").css("height", c + "px");
        if ($(".CloseupLeft").length > 0) {
            a = parseInt($(".CloseupLeft").css("top"), 10) + c;
            $(".CloseupLeft").css("top", a + "px")
        }
    },
    hide: function (a) {
        a = $("#" + a);
        var c = $(".Nag", a).outerHeight();
        $(".Sheet", a).css("top", "-" + c + "px").css("bottom", c + "px");
        setTimeout("$('.UndoSheet').css('top','0px').css('bottom','0px')", 1100)
    }
};
var CategorizeBoard = function () {
        return {
            setup: function (a) {
                Nag.setup(a);
                $("#" + a + " select").bind("change", function () {
                    $("#" + a + " option:selected").attr("value") != "" && setTimeout("CategorizeBoard.hideSheets()", 100)
                })
            },
            hideSheets: function () {
                Nag.hide("CategoryCallout");
                CategorizeBoard.addCategory()
            },
            addCategory: function () {
                var a = $("#CategorySelect option:selected"),
                    c = a.text();
                a = a.attr("value");
                $("#CategoryCallout .UndoSheet").show().find("p span").text(c);
                $.post(boardEndpoint, {
                    category: a
                }, function (d) {
                    data = $.parseJSON(d);
                    if (!data.status == "success") {
                        $("#CategoryCallout .error").html(data.message).show();
                        CategorizeBoard.undoCategory()
                    }
                });
                return false
            },
            undoCategory: function () {
                $("#CategoryCallout .Nag").outerHeight();
                $(".UndoSheet").css("top", "-100px").css("bottom", "100px");
                $("#CategorySelect option:first").attr("selected", "selected");
                $.post(boardEndpoint, {
                    undo: "1"
                }, function () {});
                setTimeout("CategorizeBoard.newHeights()", 750)
            },
            newHeights: function () {
                $("#CategoryCallout .Sheet1").css("top", "auto").css("bottom", "auto !important");
                $("#CategoryCallout .Sheet2").css("top", "0px").css("bottom", "-3px");
                $("#CategoryCallout .Sheet3").css("top", "0px").css("bottom", "-5px")
            }
        }
    }();
var UploadPinDialog = UploadPinDialog || {
    id: "UploadPin",
    setup: function () {
        var a = this,
            c = $("#" + a.id);
        AddDialog.setup(a.id);
        $("input[type=file]", c).change(function () {
            trackGAEvent("upload_file", "submitted");
            AddDialog.pinBottom(a.id);
            $(".ImagePicker ul", c).html("<li><img src='http://passets-cdn.pinterest.com/images/load2.gif' class='load' alt='Loading Indicator' /></li>");
            $(".ImagePicker .load", c).show();
            $("form", c).ajaxSubmit({
                type: "POST",
                dataType: "json",
                iframe: true,
                url: "/pin/preview/",
                success: function (d) {
                    if (d.status === "success") {
                        trackGAEvent("upload_file", "success");
                        $(".load", c).hide();
                        $(".ImagePicker ul", c).html("<li><img src='" + d.image_url + "' /></li>")
                    } else alert(d.message)
                }
            });
            return false
        })
    },
    reset: function () {
        var a = $("#" + this.id);
        $("input[type=file]", a).val("");
        $(".PinBottom", a).hide();
        $(".modal", a).css("margin-bottom", "0");
        $(".Buttons .Button", a).removeClass("disabled");
        $(".Buttons .Button strong", a).html("Pin It")
    }
};
var RecaptchaPublicKey = "6LdYxc8SAAAAAHyLKDUP3jgHt11fSDW_WBwSPPdF",
    RecaptchaDialog = function () {
        return {
            challenge: function (a) {
                var c = $("#CaptchaDialog");
                Modal.show("CaptchaDialog");
                $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js", function () {
                    Recaptcha.create(RecaptchaPublicKey, $("#Captcha", c)[0], {
                        theme: "clean",
                        callback: Recaptcha.focus_response_field
                    });
                    $(".Button", c).click(function () {
                        $("#CaptchaDialog span.error").text("").hide();
                        RecaptchaDialog.submit(Recaptcha.get_challenge(), Recaptcha.get_response(), a)
                    })
                })
            },
            submit: function (a, c, d) {
                $.post("/verify_captcha/", {
                    challenge: a,
                    response: c
                }, function (e) {
                    if (e.status == "success") {
                        Modal.close("CaptchaDialog");
                        Recaptcha.destroy();
                        d && d()
                    } else {
                        $("#CaptchaDialog span.error").text("Try again").slideDown();
                        Recaptcha.reload()
                    }
                }, "json")
            }
        }
    }(),
    RecaptchaPrompt = function () {
        return {
            challenge: function () {
                var a = $(".CaptchaPrompt");
                Recaptcha.create(RecaptchaPublicKey, $("#Captcha div", a)[0], {
                    theme: "clean",
                    callback: Recaptcha.focus_response_field
                });
                $("#Button", a).click(function () {
                    $("#CaptchaError").text("").hide();
                    RecaptchaPrompt.submit(Recaptcha.get_challenge(), Recaptcha.get_response())
                })
            },
            submit: function (a, c) {
                $.post("/verify_captcha/" + window.location.search, {
                    challenge: a,
                    response: c
                }, function (d) {
                    if (d.status == "success") window.location = d.url;
                    else {
                        $("#CaptchaError").text("Try again").show();
                        Recaptcha.reload()
                    }
                }, "json")
            }
        }
    }();
var CreateBoardDialog = function () {
        return {
            setup: function () {
                function a() {
                    if (!f) {
                        f = true;
                        Tagging.initInput("#CreateBoard input.collaborator_name", function (b, g) {
                            e = b;
                            g && $("#CreateBoard a.submit_collaborator").click()
                        }, function () {})
                    }
                }
                function c() {
                    var b = [];
                    $("#CurrentCollaborators .collaborator", d).each(function () {
                        b.push($(this).attr("username"))
                    });
                    return b
                }
                var d = $("#CreateBoard"),
                    e = null,
                    f = false;
                a();
                $("#CreateBoard input.collaborator_name").defaultValue($("#CreateBoard input.collaborator_name").val());
                $(".submit_collaborator", d).click(function () {
                    trackGAEvent("submit_board_collaborator", "clicked", "create_board_dialogue");
                    if (e) {
                        var b = '<li username="' + e.value + '" class="collaborator invite"><a href="' + e.value + '"><img class="collaborator_image" src="' + e.image + '" alt="Collaborator Photo"></a><a class="collaborator_name" href="' + e.value + '">' + e.label + '</a><a href="#" class="delete_collaborator invite" value="' + e.value + '">Remove</a></li>';
                        $("#CurrentCollaborators", d).prepend(b);
                        $(".collaborator_name", d).val("");
                        e = null
                    }
                });
                $(".delete_collaborator", d).live("click", function () {
                    trackGAEvent("delete_collaborator", "clicked", "create_board_dialogue");
                    $(this).parent().remove();
                    return false
                });
                BoardPicker.setup("#CreateBoard .BoardPicker", function (b) {
                    $("#id_category", d).val(b)
                });
                $("#BoardName", d).keyup(function () {
                    $(".board_name.error", d).html() !== "" && $(".board_name.error", d).html("")
                });
                $(".Submit .Button", d).click(function () {
                    trackGAEvent("create_board", "clicked", "create_board_dialogue");
                    if ($("#BoardName", d).val() == "Board Name" || $("#BoardName", d).val() == "") {
                        $(".CreateBoardStatus", d).html("Please enter a board name").show();
                        return false
                    }
                    var b = $("#id_category", d).val(),
                        g = $(".Submit .Button", d),
                        h = g.children("strong");
                    g.attr("disabled", "disabled").addClass("disabled");
                    h.html("Creating &hellip;");
                    h = {
                        name: $("#BoardName", d).val(),
                        collaborator: $("input[name='change_BoardCollaborators']:checked", d).val(),
                        "collaborators[]": c()
                    };
                    if (b) h.category = b;
                    $.post("/board/create/", h, function (j) {
                        if (j.status == "success") {
                            trackGAEvent("create_board", "success", "create_board_dialogue");
                            d.hide();
                            $("#BoardName", d).val("Board Name");
                            $(".CreateBoardStatus", d).html("").hide();
                            $("#id_category", d).val("");
                            $(".CurrentCategory", d).text("Select a Category");
                            window.location = j.url
                        } else {
                            $(".CreateBoardStatus", d).html(j.message).show();
                            g.removeAttr("disabled").removeClass("pressed").html("Create")
                        }
                    }, "json");
                    return false
                })
            },
            reset: function () {
                $("#BoardName").val("");
                $("input[value='me']").attr("checked", true);
                $("#CurrentCollaborators").empty()
            }
        }
    }();
var Login = function () {
        return {
            setup: function () {
                $(".AuthForm").submit(function () {
                    $(".Button", this).addClass("disabled")
                });
                $("#resetPassword").click(function () {
                    $("#AuthForm").hide();
                    $("#ResetForm").show();
                    return false
                });
                $("#backToLogin").click(function () {
                    $("#AuthForm").show();
                    $("#ResetForm").hide();
                    return false
                })
            }
        }
    }();
var EditPin = function () {
        return {
            setup: function () {
                Tagging.initTextarea("#description_pin_edit");
                Tagging.priceTag("#description_pin_edit", "#PinEditPreview");
                $("#PinEdit").submit(function () {
                    Tagging.loadTags("#description_pin_edit", "#id_pin_replies", "#pin_tags", "#id_buyable")
                });
                $("#description_pin_edit").keyup(function () {
                    $("#postDescription").html($(this).val())
                })
            },
            deletePin: function () {
                var a = $("#DeletePin .SubmitButton");
                a.addClass("disabled");
                $("strong", a).text("Deleting...");
                $.post("/pin/" + pinID + "/delete/", {}, function (c) {
                    if (c.status == "success") {
                        trackGAEvent("delete_pin", "success");
                        window.location = c.url
                    } else alert(c.message)
                }, "json")
            }
        }
    }();
var EditBoard = function () {
        return {
            setup: function () {
                $("#BoardEdit input.collaborator_name").defaultValue($("#BoardEdit input.collaborator_name").val());
                BoardPicker.setup("#BoardEdit .BoardPicker", function (a) {
                    $("#BoardEdit #id_category").val(a)
                });
                $("#BoardEdit .submit_collaborator").click(function () {
                    trackGAEvent("submit_collaborator", "clicked", "edit_board_dialogue");
                    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($("#BoardEdit input.collaborator_name").val())) {
                        $("#InviteCollaborator").show();
                        $("#InviteCollaborator #invite_email").val($("#BoardEdit input.collaborator_name").val());
                        invite_email = $("#BoardEdit input.collaborator_name").val();
                        $("#invite_email, #invite_message").blur();
                        $("#BoardEdit input.collaborator_name").val("Enter a name")
                    } else {
                        var a = $("#BoardEdit .add_collaborators").find("input").serialize();
                        $.post(board_collaborator, a, function (c) {
                            if (c.status == "success") {
                                Tagging.ignore[c.profile_url] = 1;
                                trackGAEvent("submit_collaborator", "success", "edit_board_dialogue");
                                $("#BoardEdit input.collaborator_username").val("");
                                $("#BoardEdit input.collaborator_name").val("");
                                c = '<li class="collaborator unaccepted"><a href="' + c.profile_url + '"><img class="collaborator_image" src="' + c.avatar_url + '" alt="Collaborator Photo" /></a><a class="collaborator_name" href="' + c.profile_url + '">' + c.full_name + '</a><a href="#" class="delete_collaborator" value="' + c.username + '" tooltip="Remove ' + c.full_name + '">x</a><span class="note">Invite sent!</span></li>';
                                c = $(c);
                                $("#BoardEdit .add_collaborators ul").prepend(c);
                                c.find("a.delete_collaborator").tipsy({
                                    title: "tooltip",
                                    gravity: "s",
                                    fade: true,
                                    html: true
                                })
                            } else alert("Looks like something went wrong! We're looking into it. Try again.")
                        })
                    }
                    return false
                });
                $("body").on("click", "a.delete_collaborator", function () {
                    trackGAEvent("delete_colaborator", "clicked", "edit_board_dialogue");
                    var a = $(this),
                        c = a.hasClass("invite") ? board_collaborator + "delete/" : board_collaborator,
                        d = a.attr("data-name") || a.parent().find(".collaborator_name").text(),
                        e = "Are you sure you want to remove " + d + " from this board?";
                    if (d === "yourself") e = "Are you sure you want to leave this board and remove it from your profile?";
                    $("#DeleteCollaborator .message").text(e);
                    Modal.show("DeleteCollaborator");
                    EditBoard.deleteCollaborator = function () {
                        $.post(c, {
                            collaborator_username: a.attr("value"),
                            remove: true
                        }, function (f) {
                            if (f.status == "success") {
                                trackGAEvent("delete_collaborator", "success", "edit_board_dialogue");
                                a.parent().remove();
                                if (d === "yourself") window.location.href = "/me/";
                                Tagging.ignore && delete Tagging.ignore["/" + a.attr("value") + "/"]
                            } else alert("Something went wrong. Try Again.");
                            Modal.close("DeleteCollaborator")
                        })
                    };
                    return false
                });
                $("#invite_submit").submit(function () {
                    trackGAEvent("invite_board", "submit", "edit_board_dialogue");
                    $.post("/invite/new/", {
                        name: "somebody",
                        email: $("#invite_email").val(),
                        message: $("#invite_message").val(),
                        board_user: board_username,
                        board_name: board_slug
                    }, function (a) {
                        data = $.parseJSON(a);
                        if (data.status == "success") {
                            trackGAEvent("invite_board", "success", "edit_board_dialogue");
                            $("#invite_name").val("");
                            $("#invite_email").val("");
                            $("#invite_response").html("Invite sent successfully to " + invite_email + ".").show().delay(2E3).fadeOut(500)
                        } else $("#invite_response").html(data.message)
                    });
                    return false
                });
                $("#invite_submit").submit(function () {
                    var a = 'Hi!\n\nI wanted to invite you to Pinterest so you can help contribute to my pinboard, "' + board_body_name + '". Pinterest is a place to catalog things you love. You can create pinboards on anything, from fashion, to gadgets, to art.\n\nEnjoy!';
                    $("#InviteCollaborator").fadeOut(250);
                    $("#InviteCollaborator #invite_email").val("");
                    $("#InviteCollaborator #invite_message").val(a);
                    $("#InviteCollaborator #invite_response").val("")
                })
            },
            init_ac: function () {
                if (!ac_init) {
                    ac_init = true;
                    Tagging.ignore = {};
                    $("#BoardEdit .add_collaborators a.collaborator_name").each(function (a, c) {
                        Tagging.ignore[$(c).attr("href")] = 1
                    });
                    Tagging.initInput("#BoardEdit input.collaborator_name", function (a, c) {
                        $("#BoardEdit input.collaborator_username").val(a ? a.value : "");
                        $("#BoardEdit input.collaborator_name").val(a ? a.label : "");
                        c && $("#BoardEdit .submit_collaborator").click()
                    }, function () {})
                }
            },
            deleteBoard: function () {
                trackGAEvent("delete_board", "clicked", "edit_board_dialogue");
                var a = $("#DeleteBoard .SubmitButton"),
                    c = window.location.pathname.split("/")[1];
                a.addClass("disabled");
                $("strong", a).text("Deleting...");
                $.ajax({
                    type: "DELETE",
                    dataType: "json",
                    url: board_settings,
                    success: function (d) {
                        trackGAEvent("delete_board", "success", "edit_board_dialogue");
                        if (d.status == "done") window.location = "/" + c;
                        else alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                    },
                    error: function () {
                        alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                    }
                })
            }
        }
    }();
(function (a) {
    a.fn.extend({
        switcher: function (c) {
            a.extend({}, c);
            if (!(a.browser.msie && a.browser.version < 9)) return this.each(function (d) {
                function e() {
                    h.checkbox.bind("change.switch", g);
                    h.switcher.live("click.switch", b)
                }
                function f() {
                    return a('<div class="switch"><div class="shadow"></div><div class="border"><div class="knob"><div class="circle"><div class="inner circle"></div></div><div class="labels"><label class="on">On</label><label class="off">Off</label></div></div></div></div>')
                }
                function b() {
                    h.checkbox.attr("checked") !== "checked" ? h.checkbox.prop("checked", true) : h.checkbox.prop("checked", false);
                    g()
                }
                function g() {
                    h.x = h.switcher.find(".knob").offset().left;
                    var j = a(".shadow", h.switcher);
                    if (h.checkbox.attr("checked") == "checked") {
                        a(".knob", h.switcher).css("margin-left", "62%");
                        j.addClass("on");
                        console.log("moveKnob on")
                    } else {
                        a(".knob", h.switcher).css("margin-left", "0%");
                        j.removeClass("on");
                        console.log("moveKnob off")
                    }
                }
                var h = {
                    checkbox: a(),
                    switcher: a(),
                    clicked: false,
                    moved: false,
                    startX: 0,
                    x: 0
                };
                h.switcher = f(d);
                h.checkbox = a(this);
                h.checkbox.hide();
                h.checkbox.after(h.switcher);
                h.startX = h.switcher.find(".knob").offset().left;
                e();
                g()
            })
        }
    })
})(jQuery);
var SelectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    events: {
        "click .close": "unselect"
    },
    initialize: function (a) {
        this.selector = a.selector;
        this.friend = a.friend;
        this.unselectedView = a.unselectedView;
        this.render()
    },
    render: function () {
        this.$el.html(FriendSelector.templates.selectedFriend(this.friend));
        this.$el.appendTo(this.selector.addedList);
        return this
    },
    unselect: function () {
        this.unselectedView.toggleSelectedMultiple();
        this.remove()
    }
}),
    UnselectedFriendView = Backbone.View.extend({
        tagName: "li",
        className: "friend",
        initialize: function (a) {
            this.ul = a.ul;
            this.friend = a.friend;
            this.selector = a.selector;
            this.isSelected = false;
            this.render()
        },
        events: {
            "click .Button": "toggleSelected"
        },
        toggleSelected: function () {
            this.selector.multiple ? this.toggleSelectedMultiple() : this.toggleSelectedSingle()
        },
        toggleSelectedMultiple: function () {
            if (this.isSelected) {
                this.selector.toggleSelected(this);
                this.$el.removeClass("added");
                this.isSelected = false;
                this.$el.show()
            } else if (this.selector.canAdd()) {
                new SelectedFriendView({
                    friend: this.friend,
                    selector: this.selector,
                    unselectedView: this
                });
                this.selector.toggleSelected(this);
                this.$el.addClass("added");
                this.isSelected = true;
                this.$el.hide()
            }
        },
        toggleSelectedSingle: function () {
            this.selector.toggleSelected(this);
            this.$el.find(".Button").toggleClass("disabled");
            (this.isSelected = !this.isSelected) && this.selector.selectionComplete()
        },
        applyFilter: function (a) {
            var c = this.$el,
                d = c.find(".name");
            if (this.friend.name.match(a)) {
                d.data("original", c.html() + "");
                a = (d.text() + "").replace(a, "<strong>$1</strong>");
                d.html(a);
                this.selector.unaddedList.append(c)
            } else {
                c.data("original") && c.html(c.data("original"));
                c.detach()
            }
            return c
        },
        render: function () {
            this.$el.html($(FriendSelector.templates.unselectedFriend(this.friend)));
            this.ul.append(this.$el);
            return this
        }
    }),
    Poller = function (a) {
        this.options = {
            maxRetries: 0
        };
        this.tries = 0;
        this.options = _.extend(this.options, a);
        this.start = function () {
            this.poll()
        };
        this.stop = function () {
            if (this.timeout) {
                window.clearTimeout(this.timeout);
                this.timeout = null
            }
        };
        this.poll = function () {
            var c = this;
            $.ajax({
                url: c.options.url,
                dataType: "json",
                cache: false,
                success: function (d) {
                    c.tries += 1;
                    if (d.success && _.isFunction(c.options.success)) c.options.success(d);
                    else if (c.options.maxRetries > 0 && c.tries > c.options.maxRetries) _.isFunction(c.options.retriesExceeded) && c.options.retriesExceeded();
                    else {
                        c.timeout = window.setTimeout(c.poll, c.options.timeout);
                        _.isFunction(c.options.error) && c.options.error(d)
                    }
                }
            })
        };
        _.bindAll(this);
        return this
    },
    FriendSelector = Backbone.View.extend({
        events: {
            "click .ActionButton": "selectionComplete",
            "keyup .filter-term": "filterFriends"
        },
        initialize: function (a) {
            _.isUndefined(FriendSelector.templates) && FriendSelector.loadTemplates();
            this.multiple = _.isBoolean(a.multiple) ? a.multiple : true;
            this.url = this.$el.data("url");
            this.maxSelections = parseInt(this.$el.data("max-selections"));
            this.unaddedList = this.$el.find(".friend-list");
            this.loading = this.$el.find(".loading");
            this.confirm = this.$el.find(".invite-confirm");
            this.confirmRecipients = this.$el.find(".invite-recipients");
            this.unaddedList.hide();
            if (this.multiple) {
                this.addedList = this.$el.find(".added-friends ul");
                this.counter = this.$el.find(".current-selections")
            }
            this.maxRetries = a.maxRetries ? a.maxRetries : 0;
            _.isFunction(a.selectionMade) && this.$el.on("selection:made", a.selectionMade);
            _.isFunction(a.noAccess) && this.$el.on("selection:no-access", a.noAccess);
            this.filterFriends = _.debounce(this.filterFriends, 100);
            this.unselectedFriends = [];
            this.selectedFriends = [];
            this.friendList = a.friendList;
            var c = this;
            this.poller = new Poller({
                url: c.url,
                timeout: 1E3,
                maxRetries: c.maxRetries,
                retriesExceeded: a.retriesExceeded,
                error: function (d) {
                    if (!d.has_access) {
                        c.poller.stop();
                        c.loading.fadeOut(300, function () {
                            c.$el.trigger("selection:no-access", [d, c])
                        })
                    }
                },
                success: function (d) {
                    if (d.friends && d.friends.length > 0) window.location.reload();
                    else {
                        c.friendList = d.friends;
                        c.loading.fadeOut(350);
                        c.buildFriendViews()
                    }
                }
            });
            if (_.isArray(this.friendList)) this.buildFriendViews();
            else {
                this.friendList = null;
                this.findFriends()
            }
            this.updateCounter();
            this.$el.data("selector", this);
            this.$el.find(".filter-term").val("");
            this.setOffsets();
            $(window).resize(_.bind(this.setOffsets, this))
        },
        setOffsets: function () {
            var a = this.$el.find(".unadded-friends");
            this.$el.find(".added-friends").css("left", a.offset().left + a.width() + 20)
        },
        findFriends: function () {
            this.loading.removeClass("hidden");
            this.poller.start();
            return this
        },
        filterFriends: function (a) {
            a = $(a.currentTarget).val();
            var c = new RegExp("(" + a + ")", "i");
            _.each(this.unselectedFriends, function (d) {
                d.applyFilter(c)
            })
        },
        removeFriends: function (a) {
            this.friendList = _.reject(this.friendList, function (d) {
                return _.include(a, d.id)
            });
            _.each(this.unselectedFriends, function (d) {
                _.include(a, d.friend.id) && d.$el.remove()
            });
            this.selectedFriends = [];
            if (this.addedList) {
                var c = this.addedList.find("li");
                c.fadeOut(350, function () {
                    c.remove()
                })
            }
        },
        canAdd: function () {
            return this.maxSelections ? this.selectedFriends.length < this.maxSelections : true
        },
        toggleSelected: function (a) {
            a.isSelected ? this.setUnselected(a) : this.setSelected(a);
            this.updateCounter()
        },
        updateCounter: function () {
            if (this.counter) {
                this.unaddedList.fadeTo(this.canAdd() ? 1 : 0.2);
                this.counter.html(this.maxSelections - this.selectedFriends.length)
            }
        },
        setSelectedState: function (a, c) {
            if (!this.multiple) this.selectedFriends = [];
            if (c) this.selectedFriends.push(a);
            else this.selectedFriends = _.without(this.selectedFriends, a)
        },
        setUnselected: function (a) {
            this.selectedFriends = this.multiple ? _.without(this.selectedFriends, a) : []
        },
        setSelected: function (a) {
            if (this.multiple) this.selectedFriends.push(a);
            else this.selectedFriends = [a]
        },
        buildFriendViews: function () {
            var a = this;
            _.each(this.friendList, function (c) {
                c = new UnselectedFriendView({
                    ul: a.unaddedList,
                    friend: c,
                    selector: a
                });
                a.unselectedFriends.push(c.render())
            });
            this.unaddedList.fadeIn(350)
        },
        afterSelection: function () {
            var a = _.pluck(this.selectedFriends, "friend");
            this.removeFriends(_.pluck(a, "id"));
            this.confirmRecipients.html(Arrays.conjunct(_.pluck(a, "name")));
            this.confirm.fadeIn(500).delay(3E3).fadeOut(500)
        },
        selectionCancelled: function () {
            _.each(this.selectedFriends, function (a) {
                a.toggleSelected()
            });
            this.selectedFriends = [];
            this.unaddedList.find(".disabled").toggleClass("disabled")
        },
        selectionComplete: function () {
            this.$el.trigger("selection:made", [_.pluck(this.selectedFriends, "friend"), this])
        }
    }, {
        initAll: function () {
            FriendSelector.loadTemplates();
            $(".friend-selector").each(function (a, c) {
                new FriendSelector({
                    el: c
                })
            })
        },
        loadTemplates: function () {
            FriendSelector.templates = {
                unselectedFriend: _.template($("#template-unselected-friend").html()),
                selectedFriend: _.template($("#template-selected-friend").html())
            }
        }
    });
$(window).ready(function () {
    $("[placeholder]").focus(function () {
        var a = $(this);
        if (a.val() == a.attr("placeholder")) {
            a.val("");
            a.removeClass("placeholder")
        }
    }).blur(function () {
        var a = $(this);
        if (a.val() == "" || a.val() == a.attr("placeholder")) {
            a.addClass("placeholder");
            a.val(a.attr("placeholder"))
        }
    }).blur().parents("form").submit(function () {
        $(this).find("[placeholder]").each(function () {
            var a = $(this);
            a.val() == a.attr("placeholder") && a.val("")
        })
    })
});
var RepinDialog2 = function () {
        function a(w) {
            var x = {};
            x[m + "transform"] = w;
            return x
        }
        function c(w, x) {
            return a("scale(" + w + "," + x + ")")
        }
        function d(w, x) {
            return s && !D ? {
                left: w + "px",
                top: x + "px"
            } : a("translate(" + Math.floor(w) + "px," + Math.floor(x) + "px)")
        }
        function e(w, x) {
            x = $.extend({
                url: "/pin/" + w + "/repindata/",
                dataType: "json",
                success: function () {},
                failure: function () {
                    RepinDialog2.close(w)
                }
            }, x || {});
            $.ajax(x)
        }
        function f(w) {
            return $('div[data-id="' + w + '"]')
        }
        function b(w, x) {
            var J = Math.min(Math.floor(x / w * p), l);
            w = Math.floor(J / x * w);
            return {
                height: J,
                width: w
            }
        }
        function g(w, x, J) {
            w = u(w, x, J);
            $("body").append(w.css({
                visibility: "hidden",
                position: "absolute"
            }));
            x = {
                base: w,
                height: w.height(),
                width: w.width()
            };
            w.remove().css({
                visibility: "",
                position: ""
            });
            return x
        }
        function h(w, x) {
            var J = $("form", x),
                K = $(".Buttons .Button", x),
                L = $("strong", K),
                N = $(".DescriptionTextarea", x),
                O = $(".CharacterCount", x),
                r = $(".mainerror", x);
            AddDialog.shareCheckboxes("Repin2");
            CharacterCount.setup(N, O, K);
            K.click(function () {
                if (N.val() == "") {
                    r.html(N.data("text-error-empty")).slideDown();
                    return false
                }
                $("#repin_details", J).val(N.val());
                Tagging.loadTags(N, $("#repin_comment_replies", J), $("#repin_tags", J), $("#repin_currency_holder", J));
                J.submit();
                return false
            });
            J.submit(function () {
                if (K.hasClass("disabled")) return false;
                trackGAEvent("repin_submit", "clicked", "dialogue");
                K.addClass("disabled");
                L.html(K.data("text-pinning"));
                $.ajax({
                    type: "POST",
                    url: $(this).attr("action"),
                    dataType: "json",
                    data: $(this).serialize(),
                    success: function (y) {
                        var A, E = 0;
                        if (y.status == "success") {
                            trackGAEvent("repin_submit", "success", "dialogue");
                            A = $('<div class="PostSuccess">' + $("#Repin .PostSuccess").html() + "</div>");
                            $(".header", A).remove();
                            $(".BoardLink", A).attr("href", y.board_url).text(y.board_name);
                            $(".PinLink", A).attr("href", y.repin_url);
                            x.empty().append(A);
                            A = 2500;
                            var G = $("#Repin2 .PostSuccess .suggestion");
                            if (y.suggestion) {
                                trackGAEvent("repin_submit", "viewed", "suggestion");
                                G.find(".boardHolder").html(y.suggestion);
                                G.fadeIn(500);
                                A = 1E4;
                                $(".pinBoard .followBoard a", G).click(function () {
                                    clearTimeout(E);
                                    trackGAEvent("repin_submit", "clicked", "suggestion");
                                    setTimeout(function () {
                                        RepinDialog2.close(w)
                                    }, 1E3)
                                })
                            } else G.hide();
                            E = setTimeout(function () {
                                RepinDialog2.close(w)
                            }, A)
                        } else {
                            K.removeClass("disabled");
                            L.html(K.data("text-pin-it"));
                            alert(y.message)
                        }
                    },
                    error: function () {
                        K.removeClass("disabled");
                        L.html(K.data("text-pin-it"))
                    }
                });
                return false
            });
            Tagging.initTextarea(N);
            Tagging.priceTag(N, $(".PinImagePreview", x));
            CharacterCount.truncateData(N, 500);
            BoardPicker.setup($(".BoardPicker", x), function (y) {
                $("#repin_board", x).val(y)
            }, function (y) {
                $("#repin_board", x).val(y)
            });
            window.setTimeout(function () {
                N.focus().select()
            }, 1)
        }
        function j() {
            var w, x, J, K;
            if (!F) {
                x = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
                w = $("div", x);
                J = $('<div style="width:50px;height:50px;overflow:hidden;overflow-y:scroll;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
                K = $("div", J);
                $("body").append(x, J);
                w = w.innerWidth() - K.innerWidth();
                x.remove();
                J.remove();
                $("head").append('<style type="text/css">.noscroll.extraScroll,.noscroll.extraScroll #CategoriesBar,.noscroll.extraScroll #Header {margin-right:' + w + "px;}</style>");
                $("body").addClass("extraScroll");
                C && $("body").addClass("hidefixed");
                F = true
            }
        }
        function k(w, x) {
            var J = new Image;
            if (typeof x === "function") J.onload = x;
            J.src = w
        }
        function q(w, x) {
            k(w.attr("src").replace(/_(b|c)\.jpg$/, "_f.jpg"), x)
        }
        function u(w, x, J) {
            var K = $("#Repin"),
                L = $('<div id="Repin2"></div>'),
                N = $(".PinForm", K).clone();
            J && N.prepend(J.clone());
            N.prepend($('<div class="PinImagePreview pin priceReveal"></div>').css({
                height: x.height + "px"
            }));
            L.append(N, $("#repinform", K).clone());
            $("#repin_pin_id", L).val(w);
            $("form", L).attr("action", "/pin/" + w + "/repin/");
            return L
        }
        function n(w, x, J) {
            J = '<div class="PinBorder"></div><img class="PinImagePreviewImg" src="' + x.imgurl + '" width="' + J.width + '" height="' + J.height + '" />';
            if (x.video) J += '<img src="' + media_url + 'images/VideoIndicator.png" alt="Video Icon" class="video" />';
            if (x.buyable) J += '<div class="price">$' + x.buyable + "</div>";
            $(".PinImagePreview", w).html(J);
            $(".DescriptionTextarea", w).val(x.details).parent("li").addClass("val");
            $("#repin_tags", w).val(x.tags.join(","));
            $("#repin_comment_replies", w).val(x.reply_usernames.join(","));
            return w
        }
        var l = 300,
            p = 370,
            s = $.browser.webkit,
            v = $.browser.mozilla,
            C = navigator.userAgent.match(/chrome/i),
            D = navigator.userAgent.match(/ipad/i),
            F = false,
            o = Modernizr.csstransforms3d && !navigator.userAgent.match(/ipod|iphone|android/i),
            m = "",
            z = {},
            B = {};
        if (s) m = "-webkit-";
        else if (v) m = "-moz-";
        return {
            setup: function () {
                var w = this,
                    x;
                $("#ColumnContainer").on("click", ".repin_link", function (J) {
                    trackGAEvent("repin_button", "clicked", "board_layout");
                    x = $(this).closest(".pin").attr("data-id");
                    w.show(x);
                    J.preventDefault()
                })
            },
            show: function (w) {
                j();
                if (o) if ($("#zoom").length) this.flipFromCloseupModal(w);
                else $(".CloseupRight").length ? this.flipFromCloseupPage(w) : this.flipFromGrid(w);
                else if ($("#zoom").length) this.simpleShowFromCloseupModal(w);
                else $(".CloseupRight").length ? this.simpleShowFromCloseupPage(w) : this.simpleShowFromGrid(w)
            },
            flip: function (w, x, J, K, L, N, O) {
                function r() {
                    if (!I.isFlipping && I.backContent && H) {
                        var V = $(".PinImagePreviewImg", ca);
                        V.attr("src", V.attr("src").replace("_b.jpg", "_f.jpg"))
                    }
                }

                function y() {
                    var V = $(window),
                        ea = V.height();
                    V = V.width();
                    ba.css(d(V < T ? T / 2 : V / 2, ea < U ? U / 2 : ea / 2))
                }
                function A() {
                    y()
                }
                function E() {
                    if (!I.isFlipping && I.backContent) {
                        ca.empty().append(I.backContent);
                        r();
                        h(w, I.backContent);
                        v && !aa.length && W.addClass("visible");
                        $(window).on("resize", A)
                    }
                }
                var G = this,
                    H = false,
                    I = {
                        isFlipping: true,
                        frontSource: K
                    },
                    M = b(x, J),
                    P = K.outerWidth(),
                    Q = K.outerHeight(),
                    R = K.offset(),
                    S = g(w, M, O),
                    Y = S.base,
                    T = S.width,
                    U = S.height,
                    X = P / T,
                    Z = Q / U,
                    aa = $("#zoomScroll"),
                    W, ba, da, ca;
                if (v && Z > 1) this.simpleShow(w, x, J, O);
                else {
                    q(L, function () {
                        H = true;
                        r()
                    });
                    W = $('<div id="flipScroll" class="repinMask"><div id="flip"><div class="front face"><div class="repinWrapper"></div></div><div class="back face"><div class="repinWrapper"></div></div></div></div>');
                    I.startScale = [X, Z];
                    I.container = W;
                    I.resizeFn = A;
                    ba = $("#flip", W);
                    x = $(".front", ba);
                    da = $(".repinWrapper", x);
                    J = $(".back", ba);
                    ca = $(".repinWrapper", J);
                    ba.css(d(R.left + P / 2, R.top - $(window).scrollTop() + Q / 2));
                    x.css({
                        top: -(Q / 2) + "px",
                        left: -(P / 2) + "px"
                    });
                    da.append(N, $('<div class="faceMask"></div>')).css({
                        height: Q + "px",
                        width: P + "px"
                    });
                    J.css({
                        top: -(U / 2) + "px",
                        left: -(T / 2) + "px"
                    });
                    ca.html("<img id='BackLoader' src='" + media_url + "images/MidLoader.gif' alt='Loading...' />").css($.extend({
                        height: U + "px",
                        width: T + "px"
                    }, c(X, Z)));
                    aa.addClass("notransition");
                    $("body").addClass("noscroll").append(W);
                    K.addClass("invisible");
                    e(w, {
                        success: function (V) {
                            if (!I.isClosing) {
                                I.backContent = n(Y, V, M);
                                E()
                            }
                        }
                    });
                    setTimeout(function () {
                        y();
                        da.css(c(1 / X, 1 / Z));
                        ca.css(a(""));
                        ba.addClass("flipped");
                        !v && !aa.length && W.addClass("visible");
                        setTimeout(function () {
                            if (!I.isClosing) {
                                I.isFlipping = false;
                                E()
                            }
                        }, 401)
                    }, 1);
                    G.closeListeners(w);
                    z[w] = I
                }
            },
            flipFromCloseupModal: function (w) {
                var x = $("#zoom"),
                    J = $(".PinImageImg", x);
                this.flip(w, J.width(), J.height(), x, J, $('<div id="zoom" class="pin"></div>').html(x.html()), $(".AttributionSource", x))
            },
            flipFromCloseupPage: function (w) {
                var x = $(".CloseupRight > .WhiteContainer"),
                    J = $("#pinCloseupImage");
                this.flip(w, J.width(), J.height(), x, J, x.clone(), $(".AttributionSource", x))
            },
            flipFromGrid: function (w) {
                var x = f(w);
                this.flip(w, x.attr("data-width"), x.attr("data-height"), x, $(".PinImageImg", x), $('<div class="pin"></div>').html(x.html()), $(".AttributionSource", x))
            },
            simpleShow: function (w, x, J, K) {
                function L() {
                    var M = $(window),
                        P = M.height();
                    M = M.width();
                    (I || r).css({
                        top: (P < G ? 0 : (P - G) / 2) + "px",
                        left: (M < E ? 0 : (M - E) / 2) + "px"
                    })
                }
                function N() {
                    L()
                }
                var O = $('<div class="repinMask simpleRepin"><div id="Repin2"><img id="BackLoader" src="' + media_url + 'images/MidLoader.gif" alt="Loading..." /></div></div>'),
                    r = $("#Repin2", O),
                    y = b(x, J);
                x = g(w, y, K);
                var A = x.base,
                    E = x.width,
                    G = x.height,
                    H = {};
                x = $("body");
                J = this;
                var I;
                x.addClass("noscroll");
                O.addClass("visible");
                r.css({
                    height: G + "px",
                    width: E + "px"
                });
                L();
                x.append(O);
                H.resizeFn = N;
                H.container = O;
                e(w, {
                    success: function (M) {
                        if (!H.isClosing) {
                            trackGAEvent("flip_grid_form", "success", "repin");
                            I = n(A, M, y);
                            r.replaceWith(I);
                            L();
                            h(w, I);
                            $(window).on("resize", N)
                        }
                    }
                });
                J.closeListeners(w);
                B[w] = H
            },
            simpleShowFromCloseupModal: function (w) {
                var x = $("#zoom"),
                    J = $(".PinImageImg", x);
                this.simpleShow(w, J.width(), J.height(), $(".AttributionSource", x))
            },
            simpleShowFromCloseupPage: function (w) {
                var x = $(".CloseupRight > .WhiteContainer"),
                    J = $("#pinCloseupImage");
                this.simpleShow(w, J.width(), J.height(), $(".AttributionSource", x))
            },
            simpleShowFromGrid: function (w) {
                var x = f(w);
                this.simpleShow(w, x.attr("data-width"), x.attr("data-height"), $(".AttributionSource", x))
            },
            closeListeners: function (w) {
                var x = this,
                    J = $(".repinMask");
                J.click(function (K) {
                    $(K.target).is(J) && x.close(w)
                })
            },
            close: function (w) {
                function x() {
                    r.remove();
                    J.length || $("body").removeClass("noscroll")
                }
                var J = $("#zoomScroll"),
                    K, L, N, O, r;
                if (z[w]) {
                    K = z[w];
                    K.isClosing = true;
                    K.isFlipping = false;
                    N = K.startScale;
                    O = K.frontSource;
                    L = O.offset();
                    r = K.container;
                    r.removeClass("visible");
                    L = $("#flip", r).removeClass("flipped").css(d(L.left + O.outerWidth() / 2, L.top - $(window).scrollTop() + O.outerHeight() / 2));
                    $(".back .repinWrapper", L).empty().css(c(N[0], N[1]));
                    $(".front .repinWrapper", L).css(a(""));
                    setTimeout(function () {
                        O.removeClass("invisible");
                        window.setTimeout(function () {
                            J.removeClass("notransition")
                        }, 1);
                        x();
                        z[w] = null
                    }, 401);
                    $(window).off("resize", K.resizeFn)
                } else if (B[w]) {
                    K = B[w];
                    K.isClosing = true;
                    r = K.container;
                    x();
                    B[w] = null;
                    $(window).off("resize", K.resizeFn)
                }
            }
        }
    }();
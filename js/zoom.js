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
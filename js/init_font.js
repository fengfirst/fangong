try { document.execCommand('BackgroundImageCache', false, true); } catch (e) {}
fontSmoothing();
function fontSmoothing(){
  var hasSmoothing = function(){
    if (typeof screen.fontSmoothingEnabled != "undefined") return screen.fontSmoothingEnabled;
    try {
        var canvas = document.createElement("canvas");

        canvas.width = "35";
        canvas.height = "35";
        canvas.style.display = "none";
        document.body.appendChild(canvas);
        
        var ctx = canvas.getContext("2d");
                
        ctx.textBaseline = "top"; 
        ctx.font = "32px Arial";
        ctx.fillStyle = "black"; 
        ctx.strokeStyle = "black";
        ctx.fillText("E", 0, 0);
        for (var y = 8; y <= 32; y++) {
          for (var x = 1; x <= 32; x++) {
            var pixelInfo = ctx.getImageData(x, y, 1, 1).data,
                alpha = pixelInfo[3];
            if (alpha != 255 && alpha != 0) {
              return document.body.removeChild(canvas), !0;
            }
          }
        }
        return document.body.removeChild(canvas), !1;
    } catch (e) {
        return null;
    }  
  };
  var winOs = navigator.userAgent.indexOf("Windows NT 5.1") > -1;
  var hasSmooth = winOs ? hasSmoothing() : !0;

  container = document.getElementsByTagName("html")[0];
  //hasSmooth === !0 ? container.className += " hasFontSmoothing-true" : hasSmooth === !1 ? container.className += " hasFontSmoothing-false" : container.className += " hasFontSmoothing-unknown"
  hasSmooth === !0 ? container.className = " hasFontSmoothing-true" : hasSmooth === !1 ? container.className = " hasFontSmoothing-false" : container.className = " hasFontSmoothing-unknown"  
}
/*
   		 var b = new function () {
            var a = this;
            a.hasSmoothing = function () {
                if (typeof screen.fontSmoothingEnabled != "undefined") return screen.fontSmoothingEnabled;
                try {
                    var a = document.createElement("canvas");
                    a.width = "35", a.height = "35", a.style.display = "none", document.body.appendChild(a);
                    var b = a.getContext("2d");
                    b.textBaseline = "top", b.font = "32px Arial", b.fillStyle = "black", b.strokeStyle = "black", b.fillText("E", 0, 0);
                    for (var c = 8; c <= 32; c++) for (var d = 1; d <= 32; d++) {
                        var e = b.getImageData(d, c, 1, 1).data,
                            f = e[3];
                        if (f != 255 && f != 0) return document.body.removeChild(a), !0
                    }
                    return document.body.removeChild(a), !1
                } catch (g) {
                    return null
                }
            }, 
			a.insertClasses = function () {
                var b = navigator.userAgent.indexOf("Windows NT 5.1") > -1,
                    c = b ? a.hasSmoothing() : !0,
                    d = document.getElementsByTagName("html")[0];
					console.log(c);
                c === !0 ? d.className += " hasFontSmoothing-true" : c === !1 ? d.className += " hasFontSmoothing-false" : d.className += " hasFontSmoothing-unknown"
            }
        };
		a.ready(function (a) {
			b.insertClasses();
		})*/
var Mosaic = function Mosaic(c) {
        var a = this;
        var b = {
            element: [],
            templateID: "clip_template",
            columns: 3,
            chunkSize: 3,
            columnWidth: 325,
            columnPadding: 0,
            rowPadding: 20,
            infiniteScrolling: false,
            feedURL: "",
            onData: function (e, d) {},
            filter: "all",
            category: "",
            sort: "current",
            order: null,
            last_id: 0,
            page: null,
            count: 15,
            results: [],
            query: null
        };
        _.extend(a.options = {}, b, c);
        a.jq = {
            win: $(window),
            doc: $(document),
            element: a.options.element,
            modemaster: a.options.element.find(".mode-master"),
            stage: a.options.element.find(".stage"),
            screen: a.options.element.find(".screen"),
            statics: a.options.element.find(".static"),
            storages: a.options.element.find(".storage")
        };
        if (a.options.infiniteScrolling) {
            a.cliptemplate = __.template(document.getElementById(a.options.templateID).innerHTML)
        }
        a.current_page = a.options.page;
        a.process();
        if (a.options.results.length > 0) {
            if (a.queue.length === 0) {
                a.createStorage(a.options.results);
                a.doQueue()
            } else {
                a.createStorage(a.options.results)
            }
        }
        a.scrollability = true;
        a.exhausted = false;
        if (a.options.infiniteScrolling) {
            a.jq.win.bind("scroll verify_visible", function (d) {
                if (a.scrollability && !a.exhausted && (a.jq.win.scrollTop() + a.jq.win.height()) >= a.height - Math.max(a.jq.win.height(), 800)) {
                    a.scrollability = false;
                    a.grabEntries()
                }
            })
        }
    };
Mosaic.prototype.process = function process() {
    var c = this;
    c.height = 0;
    c.static_height = 0;
    c.columns = [];
    c.queue = [];
    c.queue_pos = 0;
    c.calls = 0;
    var b = 0,
        a = c.options.columns;
    while (b < a) {
        c.columns[c.columns.length] = new Column({
            index: b
        }, c);
        b++
    }
    c.jq.statics.find(".statictile").each(function (d) {
        var e = $(this);
        c.static_height += e.outerHeight();
        c.processTile(e, c.columns.length - 1);
        c.jq.screen.append(e);
        c.adjustHeight();
        c.setMode("display")
    });
    c.jq.storages.each(function (d) {
        c.chunkStorage($(this))
    });
    c.current_mode = "loading";
    c.doQueue()
};
Mosaic.prototype.reprocess = function reprocess() {
    var a = this;
    a.jq.screen.find(".statictile").appendTo(a.jq.statics);
    a.jq.storages = a.jq.screen.find(".storage").appendTo(a.jq.stage);
    a.process()
};
Mosaic.prototype.grabEntries = function grabEntries() {
    var a = this;
    var b = {
        filter: a.options.filter,
        count: a.options.count
    };
    if (a.options.query) {
        b.q = a.options.query
    }
    if (a.options.order !== null) {
        b.order = a.options.order
    } else {
        b.sort = a.options.sort
    }
    if (a.options.page !== null) {
        b.page = a.current_page
    } else {
        b.last_id = a.options.last_id
    }
    if (a.options.filter === "category") {
        b.category = a.options.category
    }
    a.calls++;
    if (_.include([1, 3, 7], a.calls) && mixpanel) {
        mixpanel.track(__.sprintf("scroll %s", a.calls))
    }
    $.get(a.options.feedURL, b, function (c) {
        if (c && c.meta.code == 200) {
            a.options.onData(c, a)
        } else {}
    })
};
Mosaic.prototype.adjustHeight = function adjustHeight() {
    var a = this;
    a.height = a.getTallestColumn().height;
    a.jq.element.css("height", a.height);
    if (a.current_mode !== "display") {
        a.setMode("display")
    }
};
Mosaic.prototype.getShortestColumn = function getShortestColumn(d) {
    var c = this;
    var f = c.columns[0],
        b = 0,
        a = c.columns.length;
    while (b < a) {
        var e = c.columns[b];
        if (e.height < f.height && e !== d) {
            f = e
        }
        b++
    }
    return f
};
Mosaic.prototype.getTallestColumn = function getTallestColumn(d) {
    var c = this;
    var b = c.columns[0],
        a = c.columns.length;
    while (a--) {
        var e = c.columns[a];
        if (e.height > b.height && e !== d) {
            b = e
        }
    }
    return b
};
Mosaic.prototype.setMode = function setMode(b) {
    var a = this;
    a.current_mode = b;
    a.jq.modemaster.removeClass("loading error display").addClass(b)
};
Mosaic.prototype.chunkStorage = function chunkStorage(c) {
    var a = this;
    var b = c.find(".headertile");
    b.each(function (h) {
        var g = $(this);
        a.queue[a.queue.length] = new StandardTile(g, function (i) {
            a.processStageHeader(i)
        })
    });
    var d = c.find(".tutorialtile");
    d.each(function (g) {
        var h = $(this);
        a.queue[a.queue.length] = new StandardTile(h, function (i) {
            a.processTutorialTile(i)
        })
    });
    var f = c.find(".chunk");
    f.each(function (h) {
        var g = $(this);
        a.queue[a.queue.length] = new StandardTile(g, function (i) {
            a.processTile(i, a.getShortestColumn().options.index);
            a.doQueue()
        })
    });
    var e = c.find(".board, .add, .messagetile");
    e.each(function (h) {
        var g = $(this);
        a.queue[a.queue.length] = new StandardTile(g, function (i) {
            a.processTile(i, a.getShortestColumn().options.index);
            a.doQueue()
        })
    });
    a.queue[a.queue.length] = new Storage(c, a)
};
Mosaic.prototype.createStorage = function createStorage(c) {
    var b = this;
    var a = $(b.cliptemplate({
        clips: c
    }));
    b.jq.stage.append(a);
    b.chunkStorage(a)
};
Mosaic.prototype.processTile = function processTile(b, c) {
    var a = this;
    a.columns[c].associate(b)
};
Mosaic.prototype.processChunk = function processChunk(e) {
    var c = this;
    var b = 0,
        a = e.length;
    while (b < a) {
        var d = $(e[b]);
        c.getShortestColumn().associate(d);
        b++
    }
    c.doQueue()
};
Mosaic.prototype.processStorage = function processStorage(b) {
    var a = this;
    a.jq.screen.append(b);
    a.adjustHeight();
    a.doQueue()
};
Mosaic.prototype.processStageHeader = function processStageHeader(d) {
    var a = this;
    var e = a.getTallestColumn();
    if (e === a.columns[a.columns.length - 1] && e.height === (a.static_height + a.options.rowPadding)) {
        d.css("width", (((a.options.columns - 1) * (a.options.columnWidth)) - 20));
        var f = a.getTallestColumn(e);
        f.associate(d, true);
        var c = a.getTallestColumn();
        if (c !== a.columns[a.columns.length - 1]) {
            _.invoke(a.columns, "setHeight", c.height)
        } else {
            a.getShortestColumn().setHeight(f.height)
        }
    } else {
        d.css("width", (((a.options.columns * a.options.columnWidth)) - 20));
        e.associate(d, true);
        var b = _.without(a.columns, e);
        _.invoke(b, "setHeight", e.height)
    }
    a.doQueue()
};
Mosaic.prototype.processTutorialTile = function processTutorialTile(b) {
    var a = this;
    a.processTile(b, 1);
    a.doQueue()
};
Mosaic.prototype.doQueue = function doQueue() {
    var a = this;
    if (a.queue.length > 0 && a.queue.length !== a.queue_pos) {
        a.queue[a.queue_pos++].start()
    } else {
        a.queue = [];
        a.queue_pos = 0;
        a.scrollability = true;
        if (a.options.results.length > 0) {
            a.jq.win.trigger("verify_visible")
        }
    }
};


var Storage = function Storage(a, c) {
        var b = this;
        b.element = a;
        b.mosaic = c
    };
Storage.prototype.start = function start() {
    var a = this;
    a.mosaic.processStorage(a.element)
};
var StandardTile = function StandardTile(a, c) {
        var b = this;
        b.$element = a;
        b.callback = c
    };
StandardTile.prototype.start = function start() {
    var a = this;
    a.callback(a.$element)
};


var Column = function Column(d, b) {
        var a = this;
        a.mosaic = b;
        var c = {
            index: 0
        };
        _.extend(a.options = {}, c, d);
        a.height = 0
    };
Column.prototype.associate = function associate(b, d) {
    var c = this;
    if (d) {
        b.css("left", 0)
    } else {
        b.css("left", (c.mosaic.options.columnWidth * c.options.index + c.mosaic.options.columnPadding))
    }
    b.css("top", c.height);
    var a = b.outerHeight();
    c.height += (a + c.mosaic.options.rowPadding)
};
Column.prototype.compensate = function compensate(b) {
    var a = this;
    a.height += (b + a.mosaic.options.rowPadding)
};
Column.prototype.setHeight = function setHeight(a) {
    var b = this;
    b.height = a
};
var greek = function() {
    function example_greek_alphabet$play(n) {
        var audio = document.createElement("audio");
        audio.src = "http://www.foundalis.com/lan/" + n + ".wav", audio.loop = !1, audio.play();
    }
    function example_greek_alphabet$findContent(k) {
        for (var i = example_greek_alphabet$content.indexOf(k + ":"), j = i + 1; j < example_greek_alphabet$content.length; j++) {
            var item = example_greek_alphabet$content[j];
            if (3 == item.length && "	" != item.charAt(j)) break;
        }
        var rtv = example_greek_alphabet$content.slice(i + 1, j).join("\n");
        return rtv.replace(/(^\t+)/gm, "$1$1$1$1$1$1$1$1");
    }
    function liteui_liteui$init() {
        liteui_liteui$width = document.body.clientWidth, liteui_liteui$height = document.body.clientHeight, 
        !liteui_liteui$width && window.nativeHost && (liteui_liteui$width = nativeHost.getWidth(0), 
        liteui_liteui$height = nativeHost.getHeight(0));
        var canvas = document.createElement("canvas");
        canvas.width = liteui_liteui$width, canvas.height = liteui_liteui$height, document.body.appendChild(canvas), 
        liteui_uibase$initCanvas(canvas);
    }
    function liteui_native_canvas$executeCommand(ctx, cmd, args) {
        var cmds = ctx.cmds;
        switch (cmd) {
          case liteui_native_canvas$CMD_IMG:
          case liteui_native_canvas$CMD_FILL:
          case liteui_native_canvas$CMD_STROKE:
          case liteui_native_canvas$CMD_FILL_TEXT:
          case liteui_native_canvas$CMD_STROKE_TEXT:
            var prefixArg = 255 * ctx.globalAlpha + .5;

          case liteui_native_canvas$CMD_MEASURE:
            if (!ctx._configJSON) {
                var s = liteui_native_canvas$config(ctx);
                liteui_native_canvas$executeCommand(ctx, liteui_native_canvas$CMD_STATUS, s);
            }
            break;

          case liteui_native_canvas$CMD_PROXY:
            if (!args.cmds.length) return;
            var prefixArg = args.nativeId || 0;
            args = args.cmds.splice(0).join("");
        }
        var cmdLine = [ cmd, args.length ];
        return null != prefixArg && (cmdLine[1]++, cmdLine.push(prefixArg)), cmdLine = cmdLine.map(liteui_native_canvas$encoderValue), 
        cmdLine.push(args), cmds.push(cmdLine.join("")), liteui_native_canvas$CMD_MEASURE == cmd ? ctx.commit(!1) : void 0;
    }
    function liteui_native_canvas$Canvas(id) {
        this.style = {}, this.stack = [], this.saveCount = 0, this._style = {
            font: "10px sans-serif",
            fillStyle: "#000",
            strokeStyle: "#000",
            lineCap: "butt",
            lineJoin: "miter",
            lineWidth: 1,
            miterLimit: 10,
            textAlign: "left",
            textBaseline: "alphabetic"
        }, this._styleJSON, this.nativeId = liteui_native_canvas$nativeHost.createCanvas(id >= 0 ? id : -1), 
        this.canvas = this, this.globalAlpha = 1, this.cmds = [];
    }
    function liteui_native_canvas$encodePath(path) {
        return path && String.fromCharCode.apply(String, path);
    }
    function liteui_native_canvas$encoderValue(a) {
        return String.fromCharCode(a);
    }
    function liteui_native_canvas$config(c) {
        if (c._styleJSON) return c._styleJSON;
        var style = c._style, buf = [ '{"' ];
        for (var v in style) buf.push(v, '":'), (v = style[v]) instanceof Object ? buf.push('"', String(v), '","') : "string" == typeof v ? buf.push('"', liteui_native_canvas$formatColor(v).replace(/["\\]/g, "\\$&"), '","') : buf.push(v, ',"');
        return buf.push(buf.pop().replace(',"', "}")), c._styleJSON = buf.join("");
    }
    function liteui_native_canvas$formatColor(v) {
        var color = v.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\.\d]+))?|^#[0-9a-f]+/i);
        if (color) {
            var r = color[1];
            if (r) {
                for (v = (255 * (color[4] || 1) << 24 | r << 16 | color[2] << 8 | color[3]).toString(16); v.length < 8; ) v = "0" + v;
                v = "#" + v;
            } else v = v.replace(/#(?:(.)(.)(.)$)?/, "#FF$1$1$2$2$3$3").toUpperCase();
        } else {
            var i = liteui_native_canvas$namedColor.indexOf(v.toUpperCase());
            i >= 0 && (v = liteui_native_canvas$namedColor[i + 1]);
        }
        return v;
    }
    function liteui_native_canvas$p(c) {
        return c._path || (c._path = []);
    }
    function liteui_native_canvas$pi2char(a) {
        return a && (a = a % liteui_native_canvas$PIx2 || liteui_native_canvas$PIx2, 0 > a && (a += liteui_native_canvas$PIx2)), 
        a / liteui_native_canvas$PIx2 * 4095;
    }
    function liteui_native_canvas$CanvasGradient(type) {
        var values = [];
        this.addColorStop = function(r, color) {
            values.push(r + liteui_native_canvas$formatColor(color));
        }, this.toString = function() {
            return type + values.sort().join(",");
        };
    }
    function liteui_ui_list$UICard(width, height, getValues, getIndex, setStatus) {
        liteui_uibase$Widget.apply(this, [ width, height, this.prepare ]), this.getValues = getValues, 
        this.getIndex = getIndex, this.setStatus = setStatus;
    }
    function liteui_ui_list$UIList(width, height, getValues, setStatus) {
        liteui_uibase$Widget.apply(this, [ width, height, liteui_ui_list$uiPainter ]), this.getValues = getValues, 
        this.setStatus = setStatus, this.supportScroll = !0;
    }
    function liteui_ui_list$uiPainter() {
        this.prepare();
    }
    function liteui_ui_list$ListItem(list, i, width, height) {
        liteui_uibase$Widget.apply(this, [ width, height, liteui_ui_list$itemPainter, liteui_ui_list$itemEvent ]), 
        this.list = list, this.index = i;
        var tmps = list.template;
        this.rangeX = tmps[1], this.rangeY = tmps[2], tmps = tmps[0].concat();
        for (var i = tmps.length; i--; ) (tmps[i] = tmps[i].clone()).parentWidget = this;
        this.children = tmps;
    }
    function liteui_ui_list$itemPainter() {
        this.prepare();
    }
    function liteui_ui_list$itemEvent() {
        this.prepare();
    }
    function liteui_ui_picker$UIPicker(width, height, options, index, callback) {
        liteui_uibase$Widget.apply(this, [ width, height, liteui_ui_picker$pickerPainter, liteui_ui_picker$pickerEvent ]), 
        this.options = options, this.offset = index, callback && (this.onchange = callback);
    }
    function liteui_ui_picker$pickerPainter(ctx, w, h) {
        var cellHeight = h / 3, lw = liteui_uiconfig$lineWidth;
        ctx.lineWidth = lw, ctx.fillStyle = "#000", ctx.strokeStyle = "#4cd4bc", ctx.beginPath(), 
        ctx.lineCap = "round", ctx.moveTo(lw, cellHeight), ctx.lineTo(w - lw, cellHeight), 
        ctx.moveTo(lw, 2 * cellHeight), ctx.lineTo(w - lw, 2 * cellHeight), ctx.stroke();
        var len = this.options.length, i = -2, y0 = -cellHeight - this.offset * cellHeight;
        ctx.textBaseline = "middle", ctx.textAlign = "center";
        do {
            if (y0 > -cellHeight) {
                if (y0 > h) break;
                var offsetRate = Math.abs(y0 - cellHeight) / h, idx = (i + len) % len;
                this.drawOption(ctx, idx, w / 2, y0 + cellHeight / 2, offsetRate);
            }
            y0 += cellHeight;
        } while (i++ <= len);
    }
    function liteui_ui_picker$pickerEvent(type, e, sx, sy, x, y) {
        if (-2 == type) {
            var idx = this.getIndex(), ch = this.height / 3, dy = (y - this.previousY) / ch, offset = this.offset, len = this.options.length;
            offset > len - 1 || 0 > offset ? ((offset > len || -1 > offset) && (offset = (offset + len) % len), 
            dy /= 2) : dy *= 10 * Math.log(Math.abs(y - this.height / 2) / ch / 10 + 1), this.offset = offset - dy;
            var idx2 = this.getIndex();
            idx2 != idx && this.onchange(idx2, idx), this.repaint();
        } else -3 == type && (this.offset = this.getIndex(), this.repaint());
    }
    function liteui_ui_text$TextView(maxWidth, maxHeight, text, color, font) {
        liteui_uibase$Widget.apply(this, [ maxWidth, maxHeight, liteui_ui_text$textPainter, liteui_ui_text$textEvent ]), 
        this.text = text, this.color = color, this.font = font || "32px " + liteui_uiconfig$fontFamily, 
        this.patterns = [], this.colors = [], this.fonts = [];
    }
    function liteui_ui_text$textEvent() {}
    function liteui_ui_text$textPainter(ctx, width, height) {
        this.background && (ctx.fillStyle = this.background, ctx.fillRect(0, 0, width, height));
        var padding = this.padding || 0, rows = liteui_ui_text$buildTextLines(this.text, this.width - 2 * padding, this.font, this.patterns, this.fonts), textAlign = this.textAlign, lineHeight = this.lineHeight || 1.5 * this.font.replace(/.*?([\d\.]+)px.*/, "$1") | 0, len = rows.length, y = lineHeight + padding, contentHeight = rows.length * lineHeight + 2 * padding;
        if (contentHeight != height && (contentHeight > height && (this.parentWidget.supportScroll = !0), 
        this.parentWidget.supportScroll)) return this.resize(width, contentHeight), void console.log("resize text view:", contentHeight);
        for (var i = 0; len > i; i++) {
            var line = rows[i], x = padding;
            if ("center" == textAlign) {
                for (var w = 0, j = 0; j < line.length; j += 3) w += line[j + 1];
                x += (width - w) / 2;
            }
            for (var j = 0; j < line.length; ) {
                var patternIndex = line[j++], w = line[j++], text = line[j++], font = 0 > patternIndex ? this.font : this.fonts[patternIndex], color = 0 > patternIndex ? this.color : this.colors[patternIndex];
                ctx.font = font, ctx.fillStyle = color, ctx.fillText(text, x, y), x += w;
            }
            y += lineHeight;
        }
    }
    function liteui_ui_text$buildTextLines(text, width, font, patterns, fonts) {
        for (var patterns = liteui_ui_text$matchPatterns(text, patterns), words = liteui_ui_text$_splitText(text), len = words.length, index = 0, lineWidth = 0, line = [], rows = [ line ], i = 0; len > i; i++) {
            var word = words[i], patternIndex = liteui_ui_text$getPatternIndex(patterns, index), font = 0 > patternIndex ? font : fonts[patternIndex] || font, w = liteui_ui_text$_measureTexts(word, font), lineEnd = /\n|\r\n/.test(word);
            if ((lineEnd || lineWidth + w > width) && (rows.push(line = []), lineWidth = 0), 
            !lineEnd) {
                var lastIndex = line.length - 1, last = line[lastIndex];
                line[lastIndex - 2] == patternIndex ? (line[lastIndex - 1] += w, last.push(word)) : (last && (line[lastIndex] = last.join()), 
                line.push(patternIndex, w, [ word ])), lineWidth += w;
            }
            index += word.length;
        }
        for (var i = rows.length - 1; i >= 0; i--) line = rows[i], line.length && line.push(line.pop().join(""));
        return rows;
    }
    function liteui_ui_text$getPatternIndex(patterns, value) {
        for (var i = 0; i < patterns.length; i++) {
            for (var matchs = patterns[i], end = matchs.length - 1, start = 0, k = end >> 1; end > start; ) {
                var v = matchs[k];
                if (value > v) start = k + 1; else {
                    if (!(v > value)) return i;
                    end = k - 1;
                }
                k = start + end >> 1;
            }
            if (v = matchs[start], 0 == start) {
                if (value >= v) return i;
            } else if (1 & start ^ value > v) return i;
        }
        return -1;
    }
    function liteui_ui_text$matchPatterns(text, patterns) {
        for (var result = [], i = 0; i < patterns.length; i++) {
            var matches = [], p = patterns[i], m = p.exec(text);
            if (m && matches.push(m.index, p.lastIndex - 1), p.global) for (;m = p.exec(text); ) matches.push(m.index, p.lastIndex - 1);
            result.push(matches);
        }
        return result;
    }
    function liteui_ui_text$_splitText(words) {
        return words.match(/[\ud800-\udbff][\udc00-\udfff]|\r\n|[\s\S]/g);
    }
    function liteui_ui_text$_measureTexts(words, font) {
        var ctx = liteui_ui_text$getMeasureContext(font);
        return ctx.measureText(words).width;
    }
    function liteui_ui_text$getMeasureContext(font) {
        var ctx = liteui_ui_text$measureContextMap[font];
        return ctx || (ctx = document.createElement("canvas"), ctx.width = ctx.height = 0, 
        ctx = ctx.getContext("2d"), ctx.font = font, liteui_ui_text$measureContextMap[font] = ctx), 
        ctx;
    }
    function liteui_uibase$computeFps(frameStart, frameEnd) {
        if (liteui_uibase$fpsInc++, liteui_uibase$fpsBegin += frameStart, liteui_uibase$fpsEnd += frameEnd, 
        liteui_uibase$fpsInc > 20) {
            var record = [ 1e3 * liteui_uibase$fpsInc / (frameEnd - liteui_uibase$fpsStart), (liteui_uibase$fpsEnd - liteui_uibase$fpsBegin) / liteui_uibase$fpsInc, liteui_uibase$externalTime / liteui_uibase$fpsInc ].map(function(a) {
                return a.toFixed(1);
            }).join("	");
            liteui_uibase$fpsRecords.push(record) > 4 && liteui_uibase$fpsRecords.shift(), console.log("fps:" + record), 
            liteui_uibase$fpsStart = frameEnd, liteui_uibase$fpsInc = liteui_uibase$fpsBegin = liteui_uibase$fpsEnd = liteui_uibase$externalTime = 0;
        }
    }
    function liteui_uibase$useTime(t) {
        liteui_uibase$externalTime += +t;
    }
    function liteui_uibase$resetPage(painter, action) {
        liteui_uibase$resetAction(action), liteui_uibase$resetPainter(painter);
    }
    function liteui_uibase$doRepaint() {
        var frameStart = +new Date();
        liteui_uibase$hasRepaintRequest = -1;
        var ctx = liteui_uibase$canvas.getContext("2d");
        if (liteui_uibase$painterChanged && (liteui_uibase$painterChanged = !1, ctx.clearRect(0, 0, liteui_uibase$canvas.width, liteui_uibase$canvas.height)), 
        null != liteui_uibase$canvas.nativeId) {
            liteui_uibase$depth && console.error("invalid depth status!!!"), liteui_uibase$depth++;
            try {
                var alive = liteui_uibase$currentPainter(ctx);
            } finally {
                liteui_uibase$canvas.commit(!0);
            }
            liteui_uibase$depth--;
        } else alive = liteui_uibase$currentPainter(ctx);
        alive || liteui_uibase$hasRepaintRequest > 0 ? (liteui_uibase$hasRepaintRequest = 1, 
        liteui_uibase$requestFrame(liteui_uibase$doRepaint, "anima")) : liteui_uibase$hasRepaintRequest = 0, 
        liteui_uibase$computeFps(frameStart, +new Date());
    }
    function liteui_uibase$resetPainter(painter) {
        painter != liteui_uibase$currentPainter && (liteui_uibase$painterChanged = !0), 
        liteui_uibase$currentPainter = painter, liteui_uibase$hasRepaintRequest || liteui_uibase$requestFrame(liteui_uibase$doRepaint), 
        liteui_uibase$hasRepaintRequest = 1;
    }
    function liteui_uibase$initCanvas(el, action) {
        if (liteui_uibase$canvas != el) {
            liteui_uibase$canvas = el;
            for (var i = liteui_uibase$events.length; i--; ) liteui_uibase$canvas.addEventListener(liteui_uibase$events[i], liteui_uibase$eventHandler, !1);
            action && liteui_uibase$resetAction(action);
        }
    }
    function liteui_uibase$removeEvent(events) {
        for (var i = events.length; i--; ) liteui_uibase$canvas.removeEventListener(events[i], liteui_uibase$eventHandler, !1);
    }
    function liteui_uibase$resetAction(action) {
        liteui_uibase$reset(!0);
        var oldEvent = liteui_uibase$onevent;
        return liteui_uibase$onevent = action, oldEvent;
    }
    function liteui_uibase$onstart(e, x, y) {
        liteui_uibase$touchStart = new Date(), liteui_uibase$moveCount = 0, liteui_uibase$longPressTimeout && clearTimeout(liteui_uibase$longPressTimeout), 
        liteui_uibase$longPressTimeout = setTimeout(function() {
            liteui_uibase$longPressTimeout = 0, liteui_uibase$onevent(0, e, liteui_uibase$startX, liteui_uibase$startY, 0 | liteui_uibase$latestX, 0 | liteui_uibase$latestY);
        }, liteui_uiconfig$longPressTime), liteui_uibase$onevent(-1, e, liteui_uibase$startX = x, liteui_uibase$startY = y, liteui_uibase$latestX = x, liteui_uibase$latestY = y);
    }
    function liteui_uibase$onmove(e, x, y) {
        liteui_uibase$longPressTimeout && (Math.abs(x - liteui_uibase$startX) > liteui_uibase$moveThreshold || Math.abs(y - liteui_uibase$startY) > liteui_uibase$moveThreshold) && (liteui_uibase$longPressTimeout = clearTimeout(liteui_uibase$longPressTimeout)), 
        liteui_uibase$moveCount++, liteui_uibase$latestX = .8 * liteui_uibase$latestX + .2 * x, 
        liteui_uibase$latestY = .8 * liteui_uibase$latestY + .2 * y, liteui_uibase$onevent(-2, e, liteui_uibase$startX, liteui_uibase$startY, 0 | liteui_uibase$latestX, 0 | liteui_uibase$latestY);
    }
    function liteui_uibase$onend(e, x, y) {
        function tapTiger() {
            liteui_uibase$longPressTimeout && new Date() - liteui_uibase$touchStart < liteui_uiconfig$maxTapInterval ? liteui_uibase$tapTimeout = setTimeout(tapTiger, liteui_uiconfig$maxTapInterval) : (0 > liteui_uibase$moveCount && liteui_uibase$onevent(liteui_uibase$tapCount, e, liteui_uibase$startX, liteui_uibase$startY, x, y), 
            3 == liteui_uibase$tapCount && prompt(liteui_uibase$fpsRecords.join("\n")), liteui_uibase$tapTimeout = liteui_uibase$tapCount = 0);
        }
        try {
            liteui_uibase$longPressTimeout && (liteui_uibase$longPressTimeout = clearTimeout(liteui_uibase$longPressTimeout), 
            liteui_uibase$tapCount ? (liteui_uibase$tapCount++, clearTimeout(liteui_uibase$tapTimeout)) : liteui_uibase$tapCount = 1, 
            liteui_uibase$tapTimeout = setTimeout(tapTiger, liteui_uiconfig$maxTapInterval)), 
            liteui_uibase$onevent(-3, e, liteui_uibase$startX, liteui_uibase$startY, x, y, liteui_uibase$tapCount);
        } finally {
            liteui_uibase$reset();
        }
    }
    function liteui_uibase$reset(changeEventer) {
        liteui_uibase$longPressTimeout && (liteui_uibase$longPressTimeout = clearTimeout(liteui_uibase$longPressTimeout)), 
        changeEventer && liteui_uibase$tapTimeout && (liteui_uibase$tapTimeout = clearTimeout(liteui_uibase$tapTimeout), 
        liteui_uibase$tapCount = 0), liteui_uibase$moveCount = -1, liteui_uibase$eventSourceClientRect = null;
    }
    function liteui_uibase$eventHandler(e) {
        try {
            var start = new Date(), firstTouch = e.changedTouches && e.changedTouches[0] || e, x = firstTouch.clientX - (liteui_uibase$eventSourceClientRect || (liteui_uibase$eventSourceClientRect = e.srcElement.getBoundingClientRect())).left, y = firstTouch.clientY - liteui_uibase$eventSourceClientRect.top;
            switch (e.type) {
              case "touchstart":
                var start = new Date();
                liteui_uibase$events.length > 6 && liteui_uibase$removeEvent(liteui_uibase$events.splice(4));

              case "mousedown":
                e.preventDefault(), 0 > liteui_uibase$moveCount && liteui_uibase$onstart(e, x, y);
                break;

              case "mousemove":
                liteui_uibase$events.length > 6 && liteui_uibase$removeEvent(liteui_uibase$events.splice(0, 4));

              case "touchmove":
                if (0 > liteui_uibase$moveCount) break;
                liteui_uibase$onmove(e, x, y), e.preventDefault();
                break;

              case "touchend":
              case "touchcancel":
              case "mouseout":
              case "mouseup":
                if (e.preventDefault(), 0 > liteui_uibase$moveCount) break;
                liteui_uibase$onend(e, x, y);
                break;

              default:
                console.warn("unknow event:", e.type, e);
            }
        } finally {
            liteui_uibase$useTime(new Date() - start);
        }
    }
    function liteui_uibase$Widget(width, height, baseDrawer, baseEvent, supportScroll) {
        this.width = width || liteui_uibase$canvas.width, this.height = height || liteui_uibase$canvas.height, 
        this.draw = baseDrawer, this.event = baseEvent, this.children = [], this.rangeX = [], 
        this.rangeY = [], this.supportScroll = supportScroll, this.x = this.y = 0, this.offsetX = this.offsetY = 0, 
        this.dirty = liteui_uibase$DIRTY_SELF;
    }
    function liteui_uibase$prepareWidgetDraw(ctx, widget, clips, cmd, forceRedraw) {
        function vistChild(x, y, w, h) {
            cmd.push(widget, cmd = []);
            for (var i = 0, len = children.length; len > i; i++) {
                var child = children[i], childDirty = child.dirty;
                if (childDirty || forceRedraw) {
                    var k = i << 1, x0 = rangeX[k] - drawOffsetX, y0 = rangeY[k] - drawOffsetY, x1 = rangeX[++k] - drawOffsetX, y1 = rangeY[k] - drawOffsetY;
                    if (child.x = x0, child.y = y0, x > x1 || y > y1 || x0 > x + w || y0 > y + h) continue;
                    try {
                        liteui_uibase$prepareWidgetDraw(ctx, child, clips, cmd, forceRedraw);
                    } finally {}
                }
            }
        }
        var children = widget.children, rangeX = widget.rangeX, rangeY = widget.rangeY, w = widget.width, h = widget.height, bottom = rangeY[rangeY.length - 1], parentDirty = widget.dirty, drawOffsetX = 0;
        if (parentDirty & liteui_uibase$DIRTY_SCROLL) {
            var drawOffsetY = liteui_uibase$computeOverOffset(widget.offsetY, bottom - h), dif = drawOffsetY - (widget.drawOffsetY || 0);
            widget.drawOffsetY = drawOffsetY;
        } else var drawOffsetY = widget.drawOffsetY || 0;
        if (forceRedraw) vistChild(0, 0, w, h); else if (parentDirty > liteui_uibase$DIRTY_SCROLL) forceRedraw = !0, 
        vistChild(0, 0, w, h), liteui_uibase$appendDirtyRect(widget, 0, 0, w, h, clips); else if (parentDirty == liteui_uibase$DIRTY_SCROLL) {
            forceRedraw = !0, ctx.imageSmoothingEnabled = !1;
            var absDif = Math.abs(dif), mapHeight = h - absDif, dirtyY = dif > 0 ? h - dif - 0 : 0;
            vistChild(0, dirtyY, w, absDif);
            var absXy = liteui_uibase$getAbsolute(widget, w, h), canvasHeight = ctx.canvas.height, overedY = absXy[1] - canvasHeight;
            overedY > 0 && dirtyY > 0 ? dirtyY -= overedY : absXy[1] - h < 0 && 0 == dirtyY && (dirtyY += h - absXy[1]);
            var base = liteui_uibase$appendDirtyRect(widget, 0, dirtyY, w, absDif, clips);
            if (base) {
                {
                    var x = base[0], y = base[1];
                    ctx.canvas;
                }
                dirtyY > 0 && (y = y - dirtyY + dif), ctx.putImageData(ctx.getImageData(x, y, w, mapHeight), x, y - dif);
            }
        } else vistChild(0, 0, w, h);
    }
    function liteui_uibase$getAbsolute(p, x, y) {
        for (;;) {
            if (x += p.x, y += p.y, !p.parentWidget) return [ x, y ];
            p = p.parentWidget;
        }
    }
    function liteui_uibase$appendDirtyRect(p, x, y, w, h, clips) {
        for (;;) {
            if (0 > y ? (h += y, y = 0) : y + h > p.height && (h -= y + h - p.height), 0 >= h) return void console.log("crop to empty");
            if (x += p.x, y += p.y, !p.parentWidget) return clips.push(x, y, w, h), [ x, y ];
            p = p.parentWidget;
        }
    }
    function liteui_uibase$computeOverOffset(drawOffsetY, maxOffset) {
        if (maxOffset > 0 && drawOffsetY > maxOffset || 0 > drawOffsetY) if (0 > drawOffsetY) {
            var over = -drawOffsetY;
            drawOffsetY = 50 * -Math.log(over / 50 + 1);
        } else over = drawOffsetY - maxOffset, drawOffsetY = maxOffset + 50 * Math.log(over / 50 + 1);
        return drawOffsetY || 0;
    }
    function liteui_uibase$dispatchWidgetEvent(type, e, sx, sy, x, y, widget) {
        try {
            if (widget.event && widget.event.apply(widget, arguments)) return !0;
            for (var children = widget.children, i = children.length; i-- > 0; ) {
                var w = children[i];
                if (w) {
                    var x0 = w.x, y0 = w.y, x1 = x0 + w.width, y1 = y0 + w.height;
                    if (y1 >= sy && sy >= y0 && x1 >= sx && sx >= x0 && liteui_uibase$dispatchWidgetEvent(type, e, sx - x0, sy - y0, x - x0, y - y0, w)) return !0;
                }
            }
            widget.supportScroll && liteui_uibase$doScroll(widget, type, x, y);
        } finally {
            widget.previousY = y;
        }
    }
    function liteui_uibase$doScroll(widget, type, x, y) {
        var height = widget.height, bottom = Math.max.apply(Math, widget.rangeY), maxOffset = bottom - height;
        if (-2 == type && maxOffset > 0) {
            var dy = y - widget.previousY || 0;
            widget.offsetY -= dy, dy && widget.repaint(liteui_uibase$DIRTY_SCROLL);
        } else if (-3 == type && maxOffset > 0) {
            widget.repaint(liteui_uibase$DIRTY_SELF);
            var offsetY = widget.offsetY;
            (0 > offsetY || offsetY > maxOffset) && (widget.restore && clearInterval(widget.restore), 
            widget.restore = setInterval(function() {
                0 > offsetY ? (widget.offsetY = offsetY = Math.min(.9 * offsetY + 10, 0), widget.repaint(liteui_uibase$DIRTY_SCROLL)) : offsetY > maxOffset && (widget.offsetY = offsetY = Math.max(offsetY - 10 - .1 * (offsetY - maxOffset), maxOffset), 
                widget.repaint(liteui_uibase$DIRTY_SCROLL)), offsetY >= 0 && maxOffset >= offsetY && (widget.restore = clearInterval(widget.restore), 
                widget.repaint(liteui_uibase$DIRTY_SELF));
            }, 20));
        }
    }
    function liteui_xul$registor(tagName, factory) {
        liteui_xul$widgetFactoryMap[tagName] = factory;
    }
    function liteui_xul$loadXUL(path, args, w, h) {
        liteui_xul$width = w, liteui_xul$height = h, liteui_xul$loadURL(path, function(xml) {
            liteui_xul$xulLoaded(xml, args);
        });
    }
    function liteui_xul$checkDynamic(widget) {
        widget.prepare && widget.prepare();
        var dyn = widget._dynamic;
        if (dyn) for (var n in dyn) {
            var v = dyn[n]();
            widget[n] != v && (widget[n] = v, widget.repaint());
        }
        for (var chs = widget.children, len = chs.length, i = 0; len > i; i++) liteui_xul$checkDynamic(chs[i]);
    }
    function liteui_xul$xulLoaded(xml, args) {
        {
            var doc = new xmldom$DOMParser().parseFromString(xml), root = doc.documentElement;
            doc.model = new liteui_xul$ModelFactory(root.getAttribute("arguments"), args);
        }
        root = liteui_xul$createWidget(root, liteui_xul$width, liteui_xul$height), liteui_xul$checkDynamic(root), 
        root.attach();
    }
    function liteui_xul$ModelFactory(args, values) {
        this.idCache = {}, this.vars = args.split(/[^\w\$]+/), this.values = values, this.inc = 1;
    }
    function liteui_xul$addVarable(node) {
        for (var doc = node.ownerDocument, vars = doc.model.vars, i = arguments.length; i-- > 1; ) {
            var varName = arguments[i];
            vars.indexOf(varName) < 0 && vars.push(varName);
        }
    }
    function liteui_xul$createExpression(node, el) {
        var doc = node.ownerDocument, model = doc.model, idCache = model.idCache;
        if (el in idCache) var inc = idCache[el]; else {
            var inc = model.inc++;
            idCache[el] = inc;
        }
        return function() {
            return model.getCallback().apply(inc, arguments);
        };
    }
    function liteui_xul$registorDynamic(node, widget) {
        for (var len = arguments.length; len-- > 2; ) {
            var p = arguments[len], v = widget[p], el = liteui_xul$parseEL(node, v);
            if (el) {
                var dyn = widget._dynamic;
                dyn || (dyn = widget._dynamic = {}), dyn[p] = el;
            }
        }
    }
    function liteui_xul$parseEL(node, v, forceEL) {
        var el = v.replace(/^\s*\$\{([\s\S]+)\}\s*$/, "$1");
        return forceEL || el != v ? liteui_xul$createExpression(node, el.replace(/\bfor\.(index|lastIndex)/g, "_for_$1")) : void 0;
    }
    function liteui_xul$createWidget(dom, width, height) {
        var factory = liteui_xul$widgetFactoryMap[dom.localName] || liteui_xul$defaultFactory;
        return factory(dom, width, height);
    }
    function liteui_xul$defaultFactory(el, width, height) {
        width = liteui_xul$computeSize(el.getAttribute("width"), width, width), height = liteui_xul$computeSize(el.getAttribute("height"), height, height);
        var bgColor = el.getAttribute("background"), widget = new liteui_uibase$Widget(width, height, bgColor);
        return liteui_xul$appendChildDefault(widget, el, width, height), widget;
    }
    function liteui_xul$textFactory(el, width, height) {
        width = liteui_xul$computeSize(el.getAttribute("width"), width), height = liteui_xul$computeSize(el.getAttribute("height"), height);
        var bgColor = el.getAttribute("background"), action = el.getAttribute("action"), textColor = el.getAttribute("color"), textValue = el.getAttribute("value"), widget = new liteui_ui_text$TextView(width, height, textValue, textColor), keywordPattern = el.getAttribute("keywordPattern");
        return keywordPattern && widget.addPattern(keywordPattern, el.getAttribute("keywordStyle")), 
        action && (action = liteui_xul$parseEL(el, action, !0), widget.event = function(type) {
            if (1 == type) {
                action();
                for (var p = this; p.parentWidget; ) p = p.parentWidget;
                liteui_xul$checkDynamic(p);
            }
        }), widget.padding = liteui_xul$computeSize(el.getAttribute("padding"), width), 
        widget.textAlign = el.getAttribute("textAlign"), widget.background = bgColor, liteui_xul$registorDynamic(el, widget, "text", "color", "background"), 
        widget;
    }
    function liteui_xul$appendChildDefault(parentWidget, el, width, height) {
        for (var el = el.firstChild; el; ) {
            if (1 == el.nodeType) {
                var widget = liteui_xul$createWidget(el, width, height), l = liteui_xul$computeSize(el.getAttribute("left"), width, 0), t = liteui_xul$computeSize(el.getAttribute("top"), height, 0);
                parentWidget.add(widget, l && l, t);
            }
            el = el.nextSibling;
        }
    }
    function liteui_xul$computeSize(attr, size, defualtValue) {
        return "%" == attr.slice(-1) ? size * attr.slice(0, -1) / 100 | 0 : attr ? 1 * attr | 0 : null == defualtValue ? -2 : defualtValue;
    }
    function liteui_xul$loadURL(url, callback) {
        if (/^</.test(url)) return callback(url);
        var xhr = new XMLHttpRequest(), headers = {
            Accept: "'*/*'"
        };
        xhr.onreadystatechange = function() {
            var state = xhr.readyState;
            if (4 == state) {
                console.log("complete url:", url);
                var data = xhr.responseText, status = null != data && xhr.status, result = status ? 304 == status || status >= 200 && 300 > status : null;
                result = result ? data : "<error>" + data.replace(/</g, "&lt;") + "</error>", xhr.onreadystatechange = Function.prototype, 
                callback(result);
            }
        }, xhr.open("GET", url, !0);
        for (var n in headers) xhr.setRequestHeader(n, headers[n]);
        xhr.send("");
    }
    function xmldom$DOMParser(options) {
        this.options = options || {
            locator: {}
        };
    }
    function xmldom$buildErrorHandler(errorImpl, domBuilder, locator) {
        function build(key) {
            var fn = errorImpl[key];
            !fn && isCallback && (fn = 2 == errorImpl.length ? function(msg) {
                errorImpl(key, msg);
            } : errorImpl), errorHandler[key] = fn && function(msg) {
                fn("[xmldom " + key + "]	" + msg + xmldom$_locator(locator));
            } || function() {};
        }
        if (!errorImpl) {
            if (domBuilder instanceof xmldom$DOMHandler) return domBuilder;
            errorImpl = domBuilder;
        }
        var errorHandler = {}, isCallback = errorImpl instanceof Function;
        return locator = locator || {}, build("warning"), build("error"), build("fatalError"), 
        errorHandler;
    }
    function xmldom$DOMHandler() {
        this.cdata = !1;
    }
    function xmldom$position(locator, node) {
        node.lineNumber = locator.lineNumber, node.columnNumber = locator.columnNumber;
    }
    function xmldom$_locator(l) {
        return l ? "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]" : void 0;
    }
    function xmldom$_toString(chars, start, length) {
        return "string" == typeof chars ? chars.substr(start, length) : chars.length >= start + length || start ? new java.lang.String(chars, start, length) + "" : chars;
    }
    function xmldom$appendElement(hander, node) {
        hander.currentElement ? hander.currentElement.appendChild(node) : hander.document.appendChild(node);
    }
    function xmldom_dom$copy(src, dest) {
        for (var p in src) dest[p] = src[p];
    }
    function xmldom_dom$_extends(Class, Super) {
        function t() {}
        var pt = Class.prototype;
        if (Object.create) {
            var ppt = Object.create(Super.prototype);
            pt.__proto__ = ppt;
        }
        pt instanceof Super || (t.prototype = Super.prototype, t = new t(), xmldom_dom$copy(pt, t), 
        Class.prototype = pt = t), pt.constructor != Class && ("function" != typeof Class && console.error("unknow Class:" + Class), 
        pt.constructor = Class);
    }
    function xmldom_dom$DOMException(code, message) {
        if (message instanceof Error) var error = message; else error = this, Error.call(this, xmldom_dom$ExceptionMessage[code]), 
        this.message = xmldom_dom$ExceptionMessage[code], Error.captureStackTrace && Error.captureStackTrace(this, xmldom_dom$DOMException);
        return error.code = code, message && (this.message = this.message + ": " + message), 
        error;
    }
    function xmldom_dom$NodeList() {}
    function xmldom_dom$LiveNodeList(node, refresh) {
        this._node = node, this._refresh = refresh, xmldom_dom$_updateLiveList(this);
    }
    function xmldom_dom$_updateLiveList(list) {
        var inc = list._node._inc || list._node.ownerDocument._inc;
        if (list._inc != inc) {
            var ls = list._refresh(list._node);
            xmldom_dom$__set__(list, "length", ls.length), xmldom_dom$copy(ls, list), list._inc = inc;
        }
    }
    function xmldom_dom$NamedNodeMap() {}
    function xmldom_dom$_findNodeIndex(list, node) {
        for (var i = list.length; i--; ) if (list[i] === node) return i;
    }
    function xmldom_dom$_addNamedNode(el, list, newAttr, oldAttr) {
        if (oldAttr ? list[xmldom_dom$_findNodeIndex(list, oldAttr)] = newAttr : list[list.length++] = newAttr, 
        el) {
            newAttr.ownerElement = el;
            var doc = el.ownerDocument;
            doc && (oldAttr && xmldom_dom$_onRemoveAttribute(doc, el, oldAttr), xmldom_dom$_onAddAttribute(doc, el, newAttr));
        }
    }
    function xmldom_dom$_removeNamedNode(el, list, attr) {
        var i = xmldom_dom$_findNodeIndex(list, attr);
        if (!(i >= 0)) throw xmldom_dom$DOMException(xmldom_dom$NOT_FOUND_ERR, new Error());
        for (var lastIndex = list.length - 1; lastIndex > i; ) list[i] = list[++i];
        if (list.length = lastIndex, el) {
            var doc = el.ownerDocument;
            doc && (xmldom_dom$_onRemoveAttribute(doc, el, attr), attr.ownerElement = null);
        }
    }
    function xmldom_dom$DOMImplementation(features) {
        if (this._features = {}, features) for (var feature in features) this._features = features[feature];
    }
    function xmldom_dom$Node() {}
    function xmldom_dom$_xmlEncoder(c) {
        return "<" == c && "&lt;" || ">" == c && "&gt;" || "&" == c && "&amp;" || '"' == c && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    function xmldom_dom$_visitNode(node, callback) {
        if (callback(node)) return !0;
        if (node = node.firstChild) do if (xmldom_dom$_visitNode(node, callback)) return !0; while (node = node.nextSibling);
    }
    function xmldom_dom$Document() {}
    function xmldom_dom$_onAddAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        "http://www.w3.org/2000/xmlns/" == ns && (el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value);
    }
    function xmldom_dom$_onRemoveAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns = newAttr.namespaceURI;
        "http://www.w3.org/2000/xmlns/" == ns && delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
    }
    function xmldom_dom$_onUpdateChild(doc, el, newChild) {
        if (doc && doc._inc) {
            doc._inc++;
            var cs = el.childNodes;
            if (newChild) cs[cs.length++] = newChild; else {
                for (var child = el.firstChild, i = 0; child; ) cs[i++] = child, child = child.nextSibling;
                cs.length = i;
            }
        }
    }
    function xmldom_dom$_removeChild(parentNode, child) {
        var previous = child.previousSibling, next = child.nextSibling;
        return previous ? previous.nextSibling = next : parentNode.firstChild = next, next ? next.previousSibling = previous : parentNode.lastChild = previous, 
        xmldom_dom$_onUpdateChild(parentNode.ownerDocument, parentNode), child;
    }
    function xmldom_dom$_insertBefore(parentNode, newChild, nextChild) {
        var cp = newChild.parentNode;
        if (cp && cp.removeChild(newChild), newChild.nodeType === xmldom_dom$DOCUMENT_FRAGMENT_NODE) {
            var newFirst = newChild.firstChild;
            if (null == newFirst) return newChild;
            var newLast = newChild.lastChild;
        } else newFirst = newLast = newChild;
        var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
        newFirst.previousSibling = pre, newLast.nextSibling = nextChild, pre ? pre.nextSibling = newFirst : parentNode.firstChild = newFirst, 
        null == nextChild ? parentNode.lastChild = newLast : nextChild.previousSibling = newLast;
        do newFirst.parentNode = parentNode; while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
        return xmldom_dom$_onUpdateChild(parentNode.ownerDocument || parentNode, parentNode), 
        newChild.nodeType == xmldom_dom$DOCUMENT_FRAGMENT_NODE && (newChild.firstChild = newChild.lastChild = null), 
        newChild;
    }
    function xmldom_dom$_appendSingleChild(parentNode, newChild) {
        var cp = newChild.parentNode;
        if (cp) {
            var pre = parentNode.lastChild;
            cp.removeChild(newChild);
            var pre = parentNode.lastChild;
        }
        var pre = parentNode.lastChild;
        return newChild.parentNode = parentNode, newChild.previousSibling = pre, newChild.nextSibling = null, 
        pre ? pre.nextSibling = newChild : parentNode.firstChild = newChild, parentNode.lastChild = newChild, 
        xmldom_dom$_onUpdateChild(parentNode.ownerDocument, parentNode, newChild), newChild;
    }
    function xmldom_dom$Element() {
        this._nsMap = {};
    }
    function xmldom_dom$Attr() {}
    function xmldom_dom$CharacterData() {}
    function xmldom_dom$Text() {}
    function xmldom_dom$Comment() {}
    function xmldom_dom$CDATASection() {}
    function xmldom_dom$DocumentType() {}
    function xmldom_dom$Notation() {}
    function xmldom_dom$Entity() {}
    function xmldom_dom$EntityReference() {}
    function xmldom_dom$DocumentFragment() {}
    function xmldom_dom$ProcessingInstruction() {}
    function xmldom_dom$XMLSerializer() {}
    function xmldom_dom$serializeToString(node, buf, attributeSorter, isHTML) {
        switch (node.nodeType) {
          case xmldom_dom$ELEMENT_NODE:
            var attrs = node.attributes, len = attrs.length, child = node.firstChild, nodeName = node.tagName;
            isHTML = xmldom_dom$htmlns === node.namespaceURI || isHTML, buf.push("<", nodeName), 
            attributeSorter && buf.sort.apply(attrs, attributeSorter);
            for (var i = 0; len > i; i++) xmldom_dom$serializeToString(attrs.item(i), buf, attributeSorter, isHTML);
            if (child || isHTML && !/^(?:meta|link|img|br|hr|input|button)$/i.test(nodeName)) {
                if (buf.push(">"), isHTML && /^script$/i.test(nodeName)) child && buf.push(child.data); else for (;child; ) xmldom_dom$serializeToString(child, buf, attributeSorter, isHTML), 
                child = child.nextSibling;
                buf.push("</", nodeName, ">");
            } else buf.push("/>");
            return;

          case xmldom_dom$DOCUMENT_NODE:
          case xmldom_dom$DOCUMENT_FRAGMENT_NODE:
            for (var child = node.firstChild; child; ) xmldom_dom$serializeToString(child, buf, attributeSorter, isHTML), 
            child = child.nextSibling;
            return;

          case xmldom_dom$ATTRIBUTE_NODE:
            return buf.push(" ", node.name, '="', node.value.replace(/[<&"]/g, xmldom_dom$_xmlEncoder), '"');

          case xmldom_dom$TEXT_NODE:
            return buf.push(node.data.replace(/[<&]/g, xmldom_dom$_xmlEncoder));

          case xmldom_dom$CDATA_SECTION_NODE:
            return buf.push("<![CDATA[", node.data, "]]>");

          case xmldom_dom$COMMENT_NODE:
            return buf.push("<!--", node.data, "-->");

          case xmldom_dom$DOCUMENT_TYPE_NODE:
            var pubid = node.publicId, sysid = node.systemId;
            if (buf.push("<!DOCTYPE ", node.name), pubid) buf.push(' PUBLIC "', pubid), sysid && "." != sysid && buf.push('" "', sysid), 
            buf.push('">'); else if (sysid && "." != sysid) buf.push(' SYSTEM "', sysid, '">'); else {
                var sub = node.internalSubset;
                sub && buf.push(" [", sub, "]"), buf.push(">");
            }
            return;

          case xmldom_dom$PROCESSING_INSTRUCTION_NODE:
            return buf.push("<?", node.target, " ", node.data, "?>");

          case xmldom_dom$ENTITY_REFERENCE_NODE:
            return buf.push("&", node.nodeName, ";");

          default:
            buf.push("??", node.nodeName);
        }
    }
    function xmldom_dom$importNode(doc, node, deep) {
        var node2;
        switch (node.nodeType) {
          case xmldom_dom$ELEMENT_NODE:
            node2 = node.cloneNode(!1), node2.ownerDocument = doc;

          case xmldom_dom$DOCUMENT_FRAGMENT_NODE:
            break;

          case xmldom_dom$ATTRIBUTE_NODE:
            deep = !0;
        }
        if (node2 || (node2 = node.cloneNode(!1)), node2.ownerDocument = doc, node2.parentNode = null, 
        deep) for (var child = node.firstChild; child; ) node2.appendChild(xmldom_dom$importNode(doc, child, deep)), 
        child = child.nextSibling;
        return node2;
    }
    function xmldom_dom$cloneNode(doc, node, deep) {
        var node2 = new node.constructor();
        for (var n in node) {
            var v = node[n];
            "object" != typeof v && v != node2[n] && (node2[n] = v);
        }
        switch (node.childNodes && (node2.childNodes = new xmldom_dom$NodeList()), node2.ownerDocument = doc, 
        node2.nodeType) {
          case xmldom_dom$ELEMENT_NODE:
            var attrs = node.attributes, attrs2 = node2.attributes = new xmldom_dom$NamedNodeMap(), len = attrs.length;
            attrs2._ownerElement = node2;
            for (var i = 0; len > i; i++) node2.setAttributeNode(xmldom_dom$cloneNode(doc, attrs.item(i), !0));
            break;

          case xmldom_dom$ATTRIBUTE_NODE:
            deep = !0;
        }
        if (deep) for (var child = node.firstChild; child; ) node2.appendChild(xmldom_dom$cloneNode(doc, child, deep)), 
        child = child.nextSibling;
        return node2;
    }
    function xmldom_dom$__set__(object, key, value) {
        object[key] = value;
    }
    function xmldom_dom$getTextContent(node) {
        switch (node.nodeType) {
          case 1:
          case 11:
            var buf = [];
            for (node = node.firstChild; node; ) 7 !== node.nodeType && 8 !== node.nodeType && buf.push(xmldom_dom$getTextContent(node)), 
            node = node.nextSibling;
            return buf.join("");

          default:
            return node.nodeValue;
        }
    }
    function xmldom_sax$XMLReader() {}
    function xmldom_sax$parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
        function fixedFromCharCode(code) {
            if (code > 65535) {
                code -= 65536;
                var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (1023 & code);
                return String.fromCharCode(surrogate1, surrogate2);
            }
            return String.fromCharCode(code);
        }
        function entityReplacer(a) {
            var k = a.slice(1, -1);
            return k in entityMap ? entityMap[k] : "#" === k.charAt(0) ? fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x"))) : (errorHandler.error("entity not found:" + a), 
            a);
        }
        function appendText(end) {
            if (end > start) {
                var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
                locator && position(start), domBuilder.characters(xt, 0, end - start), start = end;
            }
        }
        function position(p, m) {
            for (;p >= lineEnd && (m = linePattern.exec(source)); ) lineStart = m.index, lineEnd = lineStart + m[0].length, 
            locator.lineNumber++;
            locator.columnNumber = p - lineStart + 1;
        }
        for (var lineStart = 0, lineEnd = 0, linePattern = /.+(?:\r\n?|\n)|.*$/g, locator = domBuilder.locator, parseStack = [ {
            currentNSMap: defaultNSMapCopy
        } ], closeMap = {}, start = 0; ;) {
            try {
                var tagStart = source.indexOf("<", start);
                if (0 > tagStart) {
                    if (!source.substr(start).match(/^\s*$/)) {
                        var doc = domBuilder.document, text = doc.createTextNode(source.substr(start));
                        doc.appendChild(text), domBuilder.currentElement = text;
                    }
                    return;
                }
                switch (tagStart > start && appendText(tagStart), source.charAt(tagStart + 1)) {
                  case "/":
                    var end = source.indexOf(">", tagStart + 3), tagName = source.substring(tagStart + 2, end), config = parseStack.pop(), localNSMap = config.localNSMap;
                    if (config.tagName != tagName && errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName), 
                    domBuilder.endElement(config.uri, config.localName, tagName), localNSMap) for (var prefix in localNSMap) domBuilder.endPrefixMapping(prefix);
                    end++;
                    break;

                  case "?":
                    locator && position(tagStart), end = xmldom_sax$parseInstruction(source, tagStart, domBuilder);
                    break;

                  case "!":
                    locator && position(tagStart), end = xmldom_sax$parseDCC(source, tagStart, domBuilder, errorHandler);
                    break;

                  default:
                    locator && position(tagStart);
                    var el = new xmldom_sax$ElementAttributes(), end = xmldom_sax$parseElementStartPart(source, tagStart, el, entityReplacer, errorHandler), len = el.length;
                    if (locator) {
                        if (len) for (var i = 0; len > i; i++) {
                            var a = el[i];
                            position(a.offset), a.offset = xmldom_sax$copyLocator(locator, {});
                        }
                        position(end);
                    }
                    !el.closed && xmldom_sax$fixSelfClosed(source, end, el.tagName, closeMap) && (el.closed = !0, 
                    entityMap.nbsp || errorHandler.warning("unclosed xml attribute")), xmldom_sax$appendElement(el, domBuilder, parseStack), 
                    "http://www.w3.org/1999/xhtml" !== el.uri || el.closed ? end++ : end = xmldom_sax$parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
                }
            } catch (e) {
                errorHandler.error("element parse error: " + e), end = -1;
            }
            end > start ? start = end : appendText(Math.max(tagStart, start) + 1);
        }
    }
    function xmldom_sax$copyLocator(f, t) {
        return t.lineNumber = f.lineNumber, t.columnNumber = f.columnNumber, t;
    }
    function xmldom_sax$parseElementStartPart(source, start, el, entityReplacer, errorHandler) {
        for (var attrName, value, p = ++start, s = xmldom_sax$S_TAG; ;) {
            var c = source.charAt(p);
            switch (c) {
              case "=":
                if (s === xmldom_sax$S_ATTR) attrName = source.slice(start, p), s = xmldom_sax$S_EQ; else {
                    if (s !== xmldom_sax$S_ATTR_S) throw new Error("attribute equal must after attrName");
                    s = xmldom_sax$S_EQ;
                }
                break;

              case "'":
              case '"':
                if (s === xmldom_sax$S_EQ) {
                    if (start = p + 1, p = source.indexOf(c, start), !(p > 0)) throw new Error("attribute value no end '" + c + "' match");
                    value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer), el.add(attrName, value, start - 1), 
                    s = xmldom_sax$S_E;
                } else {
                    if (s != xmldom_sax$S_V) throw new Error('attribute value must after "="');
                    value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer), el.add(attrName, value, start), 
                    errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!"), 
                    start = p + 1, s = xmldom_sax$S_E;
                }
                break;

              case "/":
                switch (s) {
                  case xmldom_sax$S_TAG:
                    el.setTagName(source.slice(start, p));

                  case xmldom_sax$S_E:
                  case xmldom_sax$S_S:
                  case xmldom_sax$S_C:
                    s = xmldom_sax$S_C, el.closed = !0;

                  case xmldom_sax$S_V:
                  case xmldom_sax$S_ATTR:
                  case xmldom_sax$S_ATTR_S:
                    break;

                  default:
                    throw new Error("attribute invalid close char('/')");
                }
                break;

              case "":
                errorHandler.error("unexpected end of input");

              case ">":
                switch (s) {
                  case xmldom_sax$S_TAG:
                    el.setTagName(source.slice(start, p));

                  case xmldom_sax$S_E:
                  case xmldom_sax$S_S:
                  case xmldom_sax$S_C:
                    break;

                  case xmldom_sax$S_V:
                  case xmldom_sax$S_ATTR:
                    value = source.slice(start, p), "/" === value.slice(-1) && (el.closed = !0, value = value.slice(0, -1));

                  case xmldom_sax$S_ATTR_S:
                    s === xmldom_sax$S_ATTR_S && (value = attrName), s == xmldom_sax$S_V ? (errorHandler.warning('attribute "' + value + '" missed quot(")!!'), 
                    el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start)) : (errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!'), 
                    el.add(value, value, start));
                    break;

                  case xmldom_sax$S_EQ:
                    throw new Error("attribute value missed!!");
                }
                return p;

              case "":
                c = " ";

              default:
                if (" " >= c) switch (s) {
                  case xmldom_sax$S_TAG:
                    el.setTagName(source.slice(start, p)), s = xmldom_sax$S_S;
                    break;

                  case xmldom_sax$S_ATTR:
                    attrName = source.slice(start, p), s = xmldom_sax$S_ATTR_S;
                    break;

                  case xmldom_sax$S_V:
                    var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                    errorHandler.warning('attribute "' + value + '" missed quot(")!!'), el.add(attrName, value, start);

                  case xmldom_sax$S_E:
                    s = xmldom_sax$S_S;
                } else switch (s) {
                  case xmldom_sax$S_ATTR_S:
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead!!'), 
                    el.add(attrName, attrName, start), start = p, s = xmldom_sax$S_ATTR;
                    break;

                  case xmldom_sax$S_E:
                    errorHandler.warning('attribute space is required"' + attrName + '"!!');

                  case xmldom_sax$S_S:
                    s = xmldom_sax$S_ATTR, start = p;
                    break;

                  case xmldom_sax$S_EQ:
                    s = xmldom_sax$S_V, start = p;
                    break;

                  case xmldom_sax$S_C:
                    throw new Error("elements closed character '/' and '>' must be connected to");
                }
            }
            p++;
        }
    }
    function xmldom_sax$appendElement(el, domBuilder, parseStack) {
        for (var tagName = el.tagName, localNSMap = null, currentNSMap = parseStack[parseStack.length - 1].currentNSMap, i = el.length; i--; ) {
            var a = el[i], qName = a.qName, value = a.value, nsp = qName.indexOf(":");
            if (nsp > 0) var prefix = a.prefix = qName.slice(0, nsp), localName = qName.slice(nsp + 1), nsPrefix = "xmlns" === prefix && localName; else localName = qName, 
            prefix = null, nsPrefix = "xmlns" === qName && "";
            a.localName = localName, nsPrefix !== !1 && (null == localNSMap && (localNSMap = {}, 
            xmldom_sax$_copy(currentNSMap, currentNSMap = {})), currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value, 
            a.uri = "http://www.w3.org/2000/xmlns/", domBuilder.startPrefixMapping(nsPrefix, value));
        }
        for (var i = el.length; i--; ) {
            a = el[i];
            var prefix = a.prefix;
            prefix && ("xml" === prefix && (a.uri = "http://www.w3.org/XML/1998/namespace"), 
            "xmlns" !== prefix && (a.uri = currentNSMap[prefix]));
        }
        var nsp = tagName.indexOf(":");
        nsp > 0 ? (prefix = el.prefix = tagName.slice(0, nsp), localName = el.localName = tagName.slice(nsp + 1)) : (prefix = null, 
        localName = el.localName = tagName);
        var ns = el.uri = currentNSMap[prefix || ""];
        if (domBuilder.startElement(ns, localName, tagName, el), el.closed) {
            if (domBuilder.endElement(ns, localName, tagName), localNSMap) for (prefix in localNSMap) domBuilder.endPrefixMapping(prefix);
        } else el.currentNSMap = currentNSMap, el.localNSMap = localNSMap, parseStack.push(el);
    }
    function xmldom_sax$parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
        if (/^(?:script|textarea)$/i.test(tagName)) {
            var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd), text = source.substring(elStartEnd + 1, elEndStart);
            if (/[&<]/.test(text)) return /^script$/i.test(tagName) ? (domBuilder.characters(text, 0, text.length), 
            elEndStart) : (text = text.replace(/&#?\w+;/g, entityReplacer), domBuilder.characters(text, 0, text.length), 
            elEndStart);
        }
        return elStartEnd + 1;
    }
    function xmldom_sax$fixSelfClosed(source, elStartEnd, tagName, closeMap) {
        var pos = closeMap[tagName];
        return null == pos && (pos = closeMap[tagName] = source.lastIndexOf("</" + tagName + ">")), 
        elStartEnd > pos;
    }
    function xmldom_sax$_copy(source, target) {
        for (var n in source) target[n] = source[n];
    }
    function xmldom_sax$parseDCC(source, start, domBuilder, errorHandler) {
        var next = source.charAt(start + 2);
        switch (next) {
          case "-":
            if ("-" === source.charAt(start + 3)) {
                var end = source.indexOf("-->", start + 4);
                return end > start ? (domBuilder.comment(source, start + 4, end - start - 4), end + 3) : (errorHandler.error("Unclosed comment"), 
                -1);
            }
            return -1;

          default:
            if ("CDATA[" == source.substr(start + 3, 6)) {
                var end = source.indexOf("]]>", start + 9);
                return domBuilder.startCDATA(), domBuilder.characters(source, start + 9, end - start - 9), 
                domBuilder.endCDATA(), end + 3;
            }
            var matchs = xmldom_sax$split(source, start), len = matchs.length;
            if (len > 1 && /!doctype/i.test(matchs[0][0])) {
                var name = matchs[1][0], pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0], sysid = len > 4 && matchs[4][0], lastMatch = matchs[len - 1];
                return domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, "$2"), sysid && sysid.replace(/^(['"])(.*?)\1$/, "$2")), 
                domBuilder.endDTD(), lastMatch.index + lastMatch[0].length;
            }
        }
        return -1;
    }
    function xmldom_sax$parseInstruction(source, start, domBuilder) {
        var end = source.indexOf("?>", start);
        if (end) {
            var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
            if (match) {
                {
                    match[0].length;
                }
                return domBuilder.processingInstruction(match[1], match[2]), end + 2;
            }
            return -1;
        }
        return -1;
    }
    function xmldom_sax$ElementAttributes() {}
    function xmldom_sax$_set_proto_(thiz, parent) {
        return thiz.__proto__ = parent, thiz;
    }
    function xmldom_sax$split(source, start) {
        var match, buf = [], reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
        for (reg.lastIndex = start, reg.exec(source); match = reg.exec(source); ) if (buf.push(match), 
        match[1]) return buf;
    }
    var liteui_liteui$height, liteui_liteui$width, example_greek_alphabet$alphaBeta = [ "Αα 阿尔法 Alpha", "Ββ 贝塔 Beta", "Γγ 伽玛 Gamma", "Δδ 德尔塔 Delta", "Εε 艾普西龙 Epsilon", "Ζζ 捷塔 Zeta", "Ζη 依塔 Eta", "Θθ 西塔 Theta", "Ιι 艾欧塔 Iota", "Κκ 喀帕 Kappa", "Λλ 拉姆达 Lambda", "Μμ 缪 Mu", "Νν 拗 Nu", "Ξξ 克西 Xi", "Οο 欧麦克轮 Omicron", "Ππ 派 Pi", "Ρρ 柔 Rho", "Σσ 西格玛 Sigma", "Ττ 套 Tau", "Υυ 宇普西龙 Upsilon", "Φφ fai Phi", "Χχ 器 Chi", "Ψψ 普赛 Psi", "Ωω 欧米伽 Omega" ], example_greek_alphabet$content = [ "Αα:", "A代表:", "α代表:", "	几何:", "		三角形里第一个角，在 边A的对面", "		一元二次方程里的其中一个根（β代表另一个）", "	统计:", "			统计学上的假阳性率", "			一个结果的显著性差异	", "	物理:", "		角加速度", "		双极性晶体管中集极电流与射极电流的比例", "		物理学上的精细结构常数", "		一粒α粒子（He2+）", "	热力学:", "		热胀冷缩的系数", "		热扩散率", "	天文:", "		天文测量学的赤经", "		一个星座内最亮的一个星，如：半人马座α（次亮为β，以此类推）。", "	化学:", "		α碳原子为与有机物中与官能团相连的第一个碳原子（第二个为β碳原子，以此类推），如氨基酸中与羰基中的碳相连的碳原子即为α碳原子。", "		解离度，指电解质达到解离平衡时，已解离的分子数和原有分子数之比。用希腊字母α来表示。", "	金融:", "		牺牲率的倒数", "	其他:", "		飞机的攻角", "Ββ:", "Β代表:", "	概率:", "		贝塔函数", "β代表:", "	几何:", "		三角形里的第二个角，在 边B的对面", "	代数:", "		一元二次方程里的其中一个根（α代表另一个）", "	概率:", "		统计学上的假阴性率", "	物理:", "		双极性晶体管中集极电流与基极电流的比例", "		β粒子（e-）", "		声强", "		速度除以狭义相对论上的光速", "	金融:", "		金融数学上的Beta系数（资产的不可分发率）", "	天文:", "		天文测量学上的黄道座标系统", "	其他:", "		飞机的侧滑角", "		脑或认知科学里的 beta脑电波（β-脑波）", "Γγ:", "Γ代表:", "	物理:", "		传输或电讯线路的反射系数", "		波导的光学模式的限制因子", "	数学:", "		伽玛函数（产生阶乘的函数）", "		模群", "		伽玛分布（以Γ函数定义的连续机率分布）", "		第二种的克氏符号", "		图中与一顶点中有边相连的顶点", "γ代表:", "	物理:", "		结构工程中负荷与材质的安全系数", "		物质的比重量", "	数学:", "		下不完全Γ函数", "		三角形里第三个角，在 边C的对面", "		数学上的欧拉-马歇罗尼常数", "	物理:", "		伽马射线和光子", "		热力学上的绝热指数", "		狭义相对论上的劳仑兹因子", "		阻尼系数（kg/s）", "Δδ:", "Δ代表:", "	数学:", "		有限差分", "		差分算子", "		对称差", "		拉普拉斯算子", "		一元二次方程的判别式；;b²-4ac", "	几何:", "		一条圆形曲线的圆心角", "		反矩阵的行列式", "		图中各顶点度数的最小值", "		给定变量的变化，如 ∆v 代表速度的变化", "	金融:", "		金融数学上的价格敏感度", "	天文:", "		以天文单位作单位，与地球的距离", "	化学:", "		化学式的热量", "δ代表:", "	数学:", "		变分法的一个变分", "		克罗内克函数", "		斯科罗霍德积分", "		图中最小的角度", "	金融:", "		金融数学上的复利", "		狄拉克δ函数", "	天文:", "		天文测量学上的赤纬", "		特纳函数（Turner Function）", "		光程差", "Εε:", "ε代表:", "	数学:", "		在统计学和机率论中的期望值", "		在极限中代表一个很小的正数", "		回归分析中一个随机的错误", "		集合论中最大的序数：ε，ε^ε，ε^ε^ε，……", "		列维-奇维塔符号", "		在集合中，属于一集合的元素的符号∈是由 ε 演变而来的。", "	计算机:", "		在计算机科学中的空串", "	物理:", "		电动势", "		在电磁学中的介电质电容率", "		发射率", "		在连续介质力学中的形变", "		电容率", "		力学中的应变", "	天文:", "		在天文测量学中，地球的转轴倾角", "	金融:", "		在经济学中的弹性", "	化学:", "		在化学中，发色团的莫耳吸光度", "Ϝϝ:", "Ϝ代表:", "	数学:", "		有时用作表示双伽玛函数，但通常被拉丁字母 F（差不多一样）替代。", "Ζζ:", "ζ代表:", "	数学:", "		在数学中的黎曼ζ函数和其他的ζ函数", "	物理:", "		聚合物力学的黏性系数", "		阻尼比", "		流体力学中的涡量", "Ζη:", "η代表:", "	物理:", "		指自由空间的本质阻抗", "		折射率", "		介子的一种", "		黏度", "		物理学中的效率", "		在相对论中的闵考斯基时空", "		通信系统里的杂音", "	概率统计:", "		在统计学中的部分回归系数", "		统计学中的效率", "	金融:", "		在经济学中的弹性", "	气象:", "		气象学中的绝对涡量，指将相对涡量与地球转动造成的科氏力一并考虑的涡量。", "Θθ:", "Θ代表:", "	数学:", "		指非零的序数", "	金融:", "		金融数学中已过的时间的敏感度", "θ代表:", "	数学:", "		Θ函数", "		切比雪夫函数", "	几何:", "		在几何学中的角", "		在球坐标系或圆柱坐标系中，x轴与xy平面的角", "	热力学:", "		在热力学中的位温", "	其他:", "		工程学以θ代表平均故障间隔", "		土壤含水量", "		德拜温度", "Ιι:", "ι代表:", "	计算机:", "		APL语言中的指标生成函数", "Κκ:", "κ代表:", "	物理:", "		壁面紊流", "	几何:", "		曲率", "		连通图", "		Kappa曲线", "	数学:", "		矩阵条件数，指数量在数值计算中的容易程度的衡量。", "	物理:", "		介电常数( ε / ε0)", "		热导率（亦常使用小写拉丁字母 k）", "		弹簧的劲度系数（亦常使用小写拉丁字母 k）", "		绝热指数（亦常用 γ）", "Λλ:", "Λ代表:", "	数学:", "		线性代数中特征矢量的对角矩阵", "		冯·曼戈尔特函数", "		公理系统内一个逻辑公理", "	天文:", "		宇宙学常数", "	物理:", "		Λ粒子，一种重子", "		电磁学中的磁导", "λ代表:", "	物理:", "		波长，一固定的频率里，离平衡位置的位移与时间皆相同的两个质点之间的最短距离。", "		聚变的潜热", "	数学:", "		指数衰减", "		刘维尔函数", "		卡迈克尔函数", "		等于一微升（1 µL）或 一立方毫米（1 mm³）【1 微升 = 1 立方毫米】", "	计算机:", "		λ演算", "		计算机科学中的空字符串", "	概率统计:", "		卜瓦松分布的一个参数", "		矩阵的特征值", "		等候理论的到达率", "		指数分布的一个参数", "		失效率", "		平均数", "		勒贝格可测集的勒贝格测度，等于这个集合通常意义的体积。", "	金融:", "		拉格朗日乘数，也应用于经济学的影子价格", "		经度", "	天文:", "		黄经，为黄道座标系统中用来确定天体在天球上位置的一个座标值。", "	其他:", "		线密度", "Μμ:", "μ代表:", "	数学:", "		数论中的莫比乌斯函数", "		表示模的环表示", "	概率统计:", "		概率论和统计学中总体的平均数或期望值", "		测度论中的一个测度", "		等候理论中的服务效率", "	物理:", "		物理学中的动摩擦因数", "		物理学中的黏度", "		电磁学中的磁导率", "		μ子", "		约化质量", "		凝聚态物理学中的化学势", "	其他:", "		微, 一个国际单位制词头，表示 10-6（百万分之一）", "		药理学中，使得与其结合的脑内啡有最高的亲和势的受体。", "Νν:", "ν代表:", "	物理:", "		物理学中的频率（以赫兹(Hz) 为单位）", "		材料科学中的泊松比", "		中微子", "		液体的kinematic viscosity（动黏滞率，动黏度；运动粘度；运动粘性）", "	化学:", "		化学计量系数", "	数学:", "		数学中的零空间", "Ξξ:", "Ξ代表:", "	物理:", "		统计力学中的巨正则系综", "		一类重子", "ξ代表:", "	概率统计:", "		概率论中的一个随机变量", "	物理:", "		相干长度", "		阻尼比", "	化学:", "		化学反应的程度", "Οο:", "Ο代表:", "Ππ:", "Π代表:", "	数学:", "		数学中用以表示乘积的符号", "	几何:", "		几何学中一个平面", "π代表:", "	几何:", "		圆周率，为圆的周长与直径的比值", "	数学:", "		数论中的素数计数函数", "	金融:", "		微观经济学和博弈论中的利润", "		宏观经济学中的通货膨胀率，表示为与时间有关的常数", "	概率统计:", "		马尔科夫链的状态分布", "	化学:", "		化学中的一种共价键(π键)", "	物理:", "		粒子物理学中的π介子", "		电子学中，一种小信号模型又被称为混合π模型", "ϖ代表:π一种变体) ：", "	天文:", "		流体力学中的波浪的角频率（角频率常用ω表示，但易与涡度的符号混淆）", "		天体力学中的近心点经度", "		宇宙学中的同移距离", "Ρρ:", "ρ代表:", "	物理:", "		密度", "		电阻率", "	数学:", "		矩阵的秩", "	几何:", "		极坐标系，柱坐标系和球坐标系中的半径", "	概率统计:", "		统计学中的相关系数", "	金融:", "		金融数学中的利率敏感度", "	计算机:", "		APL语言中的变形运算符", "Σσ:", "Σ代表:", "	数学:", "		求和算子", "		协方差矩阵", "	计算机:", "		形式语言中的终结符号的集合", "σ代表:", "	物理:", "		黑体辐射的斯特藩-玻尔兹曼常数", "		力学中的应力", "		电导率（电阻率的倒数）", "		面积密度", "	数学:", "		数论中的一类除数函数", "		解析数论中复变量的实部", "		群论中的一个置换", "		关系代数中的选择算子", "	概率统计:", "		概率论，统计中一个分布的标准差", "		不确定性", "	化学:", "		化学中的一种共价键 (σ键)", "Ττ:", "τ代表:", "	概率统计:", "		一个时间区间", "		指数衰减的量的平均寿命", "	物理:", "		力学中的力矩", "		τ子，粒子物理学中的一种基本粒子", "		自发发射过程的寿命", "		RC电路的时间常数", "		相对论中的原时", "		连续介质力学中的剪应力", "	几何:", "		黄金分区率0.618…… (尽管 φ 更常用)", "		拓扑学中一个指定的拓扑", "		圆周率的2倍（2π），即圆的周长与半径之比。", "	数学:", "		数论中的拉马努金τ函数", "		表示论中的缠结算子", "		高欧拉商数的除数个数（OEIS中的数列A000005）", "		类型论中的类型变量，如简单类型λ演算", "	天文:", "		天文学中，透明度的衡量，或者说，有多少阳光不能穿透大气。", "	化学:", "		Tau 蛋白，一种与微管结合的蛋白", "Υυ:", "Υ代表:", "	物理:", "		Υ介子，一种粒子", "Φφ:", "Φ代表:", "	物理:", "		逸出功，是指使一个电子立即从固体表面逸出，所需提供的最小能量。", "		磁通量", "	概率统计:", "		正态分布的累积分布函数", "	几何:", "		黄金分区率的倒数，即 1/φ", "	化学:", "		苯基", "φ代表:", "	几何:", "		平面角的大小值", "		球坐标下与 z 轴的夹角", "		黄金分区率，约等于 0.618……", "		大地测量学中的纬度", "	数学:", "		数论中的欧拉函数", "		解析空间中的全纯函数", "		复数的辐角", "		表示体积分数，符号为φ，是指分散质的体积/分散剂的体积。例如白酒标注的度数所谓的'°'其实就是指的白酒中酒精的体积分数。", "	物理:", "		辐射通量", "		电势", "		物理学和数学中的标量场", "	概率统计:", "		正态分布的密度函数", "Χχ:", "χ代表:", "	概率统计:", "		统计学中的χ分布（卡方分布（χ2分布）相对更为常见）", "		数学中的特征，特别是指狄利克雷特征", "	数学:", "		图论中一个图的着色数", "		代数拓扑中的欧拉示性数", "		数学中的指示函数", "	化学:", "		元素周期表中表示电负性", "	物理:", "		拉比频率", "		基本粒子的旋量", "		水势能", "Ψψ:", "Ψ代表:", "	数学:", "		组合子逻辑中的 quaternary 组合子", "	概率统计:", "		统计学中的残差矩阵", "ψ代表:", "	物理:", "		量子力学中薛定谔方程的波函数", "		流体动力学中的流体函数", "	其他:", "		车辆的偏航角", "	数学:", "		数论中的第二切比雪夫函数", "	几何:", "		在内蕴坐标系下，曲线的切线与x轴的夹角", "Ωω:", "Ω代表:", "	数学:", "		数学中的欧米加常数", "		与大O记号相关的一个渐进下界记号", "		算术函数Ω(n), 等于n的素因子分解中所有素因子的方次的和", "	概率统计:", "		样本空间，概率论和统计力学中所有可能的事件或系统状态的集合", "	其他:", "		欧姆，国际单位制中电阻的单位", "	几何:", "		立体角", "	物理:", "		物体的转速", "		Ω重子", "	天文:", "		天体力学中的升交点黄经", "		物理宇宙学中的密度参数", "ω代表:", "	数学:", "		第一个无穷序数", "		自然数集，常用于集合论中，其他数学领域中则常用来表示自然数集", "		与大O记号相关的一个渐进下界记号", "		三次单位根的一个，另一个是它的平方：ω²", "		算术函数ω(n) ，等于n 的不相同的素因子的个数", "		微分形式", "	概率统计:", "		概率论中，一个实验的可能结果", "	物理:", "		角速度", "		角频率", "		使用位势高度的坐标系下的垂直速度，常用于大气动力学中", "		ω介子", "	天文:", "		天体力学中的近心点幅角" ], example_greek_alphabet$values = [], example_greek_alphabet$keys = example_greek_alphabet$alphaBeta.map(function(a) {
        var m = a.split(" "), k = m[0], n = m[2].toLowerCase(), v = {
            title: "🔊 " + m[1] + " " + m[2],
            name: n,
            play: function() {
                example_greek_alphabet$play(n);
            }
        };
        return Object.defineProperty(v, "value", {
            get: function() {
                return example_greek_alphabet$findContent(k);
            }
        }), example_greek_alphabet$values.push(v), k;
    }), example_greek_alphabet$source = '<Layout width=\'100%\' height=\'100%\' background=\'#FFF\' arguments="keys,contents,index">\n	<List width="16%" height="100%" background=\'#ddd\' \n		var=\'key\' value="${keys}" observe="${index}">\n		<Button color="#333" textAlign="center" action=\'${index = for.index}\' width="100%" height="60" \n			background="${for.index == index? \'#bbb\':\'#eee\'}" value="  ${key}"/>\n	</List>\n	<Card id="content" background=\'#ddd\' \n		width="84%" height="100%" left=\'16.2%\' top=\'0\'\n		index="${index}" var="content" value=\'${contents}\'>\n		<Text padding="12" color="#000" background="#ddd"\n		     action="${content.play()}"\n		     width="100%" height="7%" value="${content.title}"/>\n		<Layout width="100%" height="93%" top="7%" background="#f99" >\n			<Text padding="12" color="#333" width="100%" height="100%" \n				value="${content.value}"\n				keywordPattern="/^[^\\s]+/gm"\n				keywordStyle="#933"\n				\n				/>\n		</Layout>\n	</Card>\n</Layout>', example_greek_alphabet$load = function() {
        liteui_liteui$load(example_greek_alphabet$source || "./assets/greek-xul.xml", [ example_greek_alphabet$keys, example_greek_alphabet$values, 1 ]);
    };
    window.onload = liteui_liteui$init;
    var liteui_liteui$load = function(path, args) {
        liteui_liteui$width || liteui_liteui$init(), liteui_xul$loadXUL(path, args, liteui_liteui$width, liteui_liteui$height);
    }, liteui_native_canvas$OP_MOVE2 = 0, liteui_native_canvas$OP_LINE2 = 1, liteui_native_canvas$OP_CLOSE = 2, liteui_native_canvas$OP_ARC6 = 3, liteui_native_canvas$CMD_PROXY = 0, liteui_native_canvas$CMD_CLIP = 1, liteui_native_canvas$CMD_IMG = 2, liteui_native_canvas$CMD_FILL = 3, liteui_native_canvas$CMD_STROKE = 4, liteui_native_canvas$CMD_FILL_TEXT = 5, liteui_native_canvas$CMD_STROKE_TEXT = 6, liteui_native_canvas$CMD_CLEAR = 7, liteui_native_canvas$CMD_SAVE = 8, liteui_native_canvas$CMD_RESTORE = 9, liteui_native_canvas$CMD_TRANSLATE = 10, liteui_native_canvas$CMD_MEASURE = 11, liteui_native_canvas$CMD_STATUS = 12, liteui_native_canvas$PIx2 = 2 * Math.PI, liteui_native_canvas$nativeHost = window.nativeHost;
    liteui_native_canvas$Canvas.prototype.commit = function(complete) {
        var rtv = liteui_native_canvas$nativeHost.commit(this.nativeId, this.cmds.join(""), !!complete);
        return this.cmds = [], rtv;
    }, "font,fillStyle,strokeStyle,lineCap,lineJoin,miterLimit,lineWidth,textAlign,textBaseline".replace(/\w+/g, function(attr) {
        Object.defineProperty(liteui_native_canvas$Canvas.prototype, attr, {
            get: function() {
                return this._style[attr];
            },
            set: function(v) {
                this._style[attr] !== v && (this._styleJSON = 0, this._style[attr] = v);
            }
        });
    }), Object.defineProperty(liteui_native_canvas$Canvas.prototype, "width", {
        get: function() {
            return this._width;
        },
        set: function(v) {
            liteui_native_canvas$nativeHost.setWidth(this.nativeId, v), this._width = v;
        }
    }), Object.defineProperty(liteui_native_canvas$Canvas.prototype, "height", {
        get: function() {
            return this._height;
        },
        set: function(v) {
            liteui_native_canvas$nativeHost.setHeight(this.nativeId, v), this._height = v;
        }
    });
    var liteui_native_canvas$namedColor = "BLACK,#FF000000,DKGRAY,#FF444444,GRAY,#FF888888,LTGRAY,#FFCCCCCC,WHITE,#FFFFFFFF,RED,#FFFF0000,GREEN,#FF00FF00,BLUE,#FF0000FF,YELLOW,#FFFFFF00,CYAN,#FF00FFFF,MAGENTA,#FFFF00FF,TRANSPARENT,#00000000".split(",");
    liteui_native_canvas$Canvas.prototype.clip = function() {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_CLIP, liteui_native_canvas$encodePath(this._path));
    }, liteui_native_canvas$Canvas.prototype.fill = function() {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_FILL, liteui_native_canvas$encodePath(this._path));
    }, liteui_native_canvas$Canvas.prototype.stroke = function() {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_STROKE, liteui_native_canvas$encodePath(this._path));
    }, liteui_native_canvas$Canvas.prototype.drawImage = function(img) {
        var args = [];
        switch (args.push.apply(args, arguments), args.length) {
          case 3:
          case 5:
          case 9:
            img.cmds.length && liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_PROXY, img), 
            args[0] = img.nativeId, console.log("image id:" + args[0]), liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_IMG, liteui_native_canvas$encodePath(args));
            break;

          default:
            console.error("error arguments" + args);
        }
    }, liteui_native_canvas$Canvas.prototype.measureText = function(text) {
        return {
            width: liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_MEASURE, text)
        };
    }, liteui_native_canvas$Canvas.prototype.fillText = function(text, x, y, maxWidth) {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_FILL_TEXT, liteui_native_canvas$encodePath([ x, y, 0 | maxWidth ]) + text);
    }, liteui_native_canvas$Canvas.prototype.strokeText = function(text, x, y, maxWidth) {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_STROKE_TEXT, liteui_native_canvas$encodePath([ x, y, 0 | maxWidth ]) + text);
    }, liteui_native_canvas$Canvas.prototype.clearRect = function(x, y, w, h) {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_CLEAR, liteui_native_canvas$encodePath([ x, y, w, h ]));
    }, liteui_native_canvas$Canvas.prototype.beginPath = function() {
        this._path = [];
    }, liteui_native_canvas$Canvas.prototype.moveTo = function(x, y) {
        liteui_native_canvas$p(this).push(liteui_native_canvas$OP_MOVE2, x, y);
    }, liteui_native_canvas$Canvas.prototype.lineTo = function(x, y) {
        liteui_native_canvas$p(this).push(liteui_native_canvas$OP_LINE2, x, y);
    }, liteui_native_canvas$Canvas.prototype.closePath = function() {
        liteui_native_canvas$p(this).push(liteui_native_canvas$OP_CLOSE);
    }, liteui_native_canvas$Canvas.prototype.arc = function(x, y, r, startAngle, endAngle, anticlockwise) {
        var a1 = liteui_native_canvas$pi2char(startAngle), ad = liteui_native_canvas$pi2char(endAngle - startAngle);
        liteui_native_canvas$p(this).push(liteui_native_canvas$OP_ARC6, x, y, r, a1, a1 + ad, anticlockwise ? 1 : 0);
    }, liteui_native_canvas$Canvas.prototype.save = function() {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_SAVE, "");
    }, liteui_native_canvas$Canvas.prototype.restore = function() {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_RESTORE, "");
    }, liteui_native_canvas$Canvas.prototype.translate = function(dx, dy) {
        liteui_native_canvas$executeCommand(this, liteui_native_canvas$CMD_TRANSLATE, liteui_native_canvas$encodePath([ dx, dy ]));
    }, liteui_native_canvas$Canvas.prototype.rotate = function() {}, liteui_native_canvas$Canvas.prototype.setTransform = function() {}, 
    liteui_native_canvas$Canvas.prototype.scale = function() {}, liteui_native_canvas$Canvas.prototype.transform = function() {}, 
    liteui_native_canvas$Canvas.prototype.resetTransform = function() {}, liteui_native_canvas$CanvasGradient.prototype = new String(), 
    liteui_native_canvas$Canvas.prototype.createLinearGradient = function(x0, y0, x1, y1) {
        return new liteui_native_canvas$CanvasGradient("linear:" + [ 0 | x0, 0 | y0, 0 | x1, 0 | y1, "" ].join(","));
    }, liteui_native_canvas$Canvas.prototype.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
        return new liteui_native_canvas$CanvasGradient("radial:" + [ 0 | x0, 0 | y0, 0 | r0, 0 | x1, 0 | y1, 0 | r1 ].join(","));
    }, liteui_native_canvas$Canvas.prototype.getImageData = function() {}, liteui_native_canvas$Canvas.prototype.putImageData = function() {}, 
    liteui_native_canvas$Canvas.prototype.rect = function(x, y, w, h) {
        this.beginPath(), this.moveTo(x, y), this.lineTo(x + w, y), this.lineTo(x + w, y + h), 
        this.lineTo(x, y + h), this.closePath();
    }, liteui_native_canvas$Canvas.prototype.strokeRect = function(x, y, w, h) {
        this.rect(x, y, w, h), this.stroke();
    }, liteui_native_canvas$Canvas.prototype.fillRect = function(x, y, w, h) {
        this.rect(x, y, w, h), this.fill();
    }, liteui_native_canvas$Canvas.prototype.getContext = function() {
        return this;
    }, liteui_native_canvas$Canvas.prototype.addEventListener = function() {
        console.log("native canvas not support event listener");
    }, liteui_native_canvas$Canvas.prototype.setLineDash = function() {}, liteui_native_canvas$Canvas.prototype.arcTo = function() {}, 
    liteui_native_canvas$Canvas.prototype.bezierCurveTo = function() {}, liteui_native_canvas$Canvas.prototype.createImageData = function() {}, 
    liteui_native_canvas$Canvas.prototype.createPattern = function() {}, liteui_native_canvas$Canvas.prototype.drawFocusIfNeeded = function() {}, 
    liteui_native_canvas$Canvas.prototype.ellipse = function() {}, liteui_native_canvas$Canvas.prototype.getLineDash = function() {}, 
    liteui_native_canvas$Canvas.prototype.isPointInPath = function() {}, liteui_native_canvas$Canvas.prototype.isPointInStroke = function() {}, 
    liteui_native_canvas$Canvas.prototype.quadraticCurveTo = function() {}, liteui_ui_list$UIList.prototype = Object.create(liteui_uibase$Widget.prototype), 
    liteui_ui_list$UICard.prototype = Object.create(liteui_uibase$Widget.prototype), 
    liteui_ui_list$UIList.prototype.prepare = function() {
        null == this.template && (this.template = [ this.children, this.rangeX, this.rangeY ], 
        this.children = [], this.rangeX = [], this.rangeY = [], this.repaint()), this.values = this.getValues();
        for (var len = this.values.length, cellHeight = this.template[0][0].height, width = this.width, dividerHeight = this.dividerHeight || 2, y = 0, i = this.children.length; len > i; i++) this.add(new liteui_ui_list$ListItem(this, i, width, cellHeight), 0, y), 
        y += cellHeight + dividerHeight;
        this.children.length = len;
    }, liteui_ui_list$UICard.prototype.prepare = function() {
        this.value = this.getValues()[this.getIndex() || 0], this.setStatus(this.value);
    }, liteui_ui_list$ListItem.prototype = Object.create(liteui_uibase$Widget.prototype), 
    liteui_ui_list$ListItem.prototype.prepare = function() {
        var list = this.list;
        list.setStatus(list.values, this.index);
    }, liteui_ui_picker$UIPicker.prototype = Object.create(liteui_uibase$Widget.prototype), 
    liteui_ui_picker$UIPicker.prototype.getIndex = function() {
        var len = this.options.length;
        return (len + Math.round(this.offset)) % len;
    }, liteui_ui_picker$UIPicker.prototype.onchange = function() {}, liteui_ui_picker$UIPicker.prototype.getValue = function() {
        return this.options[this.getIndex()];
    }, liteui_ui_picker$UIPicker.prototype.roll = function(dif) {
        var idx = this.getIndex(), len = this.options.length, idx2 = (idx + dif) % len;
        return this.offset = idx2 = 0 > idx2 ? idx2 + len : idx2, this.onchange(idx2, idx), 
        this.repaint(), Math.abs(idx2 - idx) > len - 2;
    }, liteui_ui_picker$UIPicker.prototype.drawOption = function(ctx, idx, cx, cy, offsetRate) {
        var fontRate = .2 - .1 * offsetRate;
        ctx.font = (this.height * fontRate | 0) + "px " + liteui_uiconfig$fontFamily, ctx.globalAlpha = Math.pow(Math.min(1 - offsetRate + .1, 1), 3), 
        ctx.fillText(this.options[idx], cx, cy);
    }, liteui_ui_text$TextView.prototype = Object.create(liteui_uibase$Widget.prototype), 
    liteui_ui_text$TextView.prototype.addPattern = function(keywordPattern, style) {
        if ("string" == typeof keywordPattern) {
            var end = keywordPattern.lastIndexOf("/");
            keywordPattern = new RegExp(keywordPattern.slice(1, end), keywordPattern.slice(end + 1));
        }
        this.patterns.push(keywordPattern);
        var styles = style.split(";");
        this.colors.push(styles[0]), this.fonts.push(styles[1] || this.font);
    };
    var liteui_ui_text$measureContextMap = {};
    if (!window.requestAnimationFrame) {
        for (var liteui_uibase$ps = [ "webkit", "moz", "o", "ms" ], liteui_uibase$i = liteui_uibase$ps.length; liteui_uibase$i--; ) if (requestAnimationFrame = window[liteui_uibase$ps[liteui_uibase$i] + "RequestAnimationFrame"], 
        requestAnimationFrame) {
            cancelAnimationFrame = window[liteui_uibase$ps[liteui_uibase$i] + "CancelAnimationFrame"];
            break;
        }
        requestAnimationFrame || (requestAnimationFrame = function(callback) {
            return setTimeout(callback, 1e3 / 60);
        }, cancelAnimationFrame = function(id) {
            return clearTimeout(id);
        });
    }
    var liteui_uibase$hasRepaintRequest, liteui_uibase$currentPainter, liteui_uibase$painterChanged, liteui_uibase$canvas, liteui_uibase$onevent, liteui_uibase$touchStart, liteui_uibase$tapCount, liteui_uibase$tapTimeout, liteui_uibase$longPressTimeout, liteui_uibase$eventSourceClientRect, liteui_uibase$latestX, liteui_uibase$latestY, liteui_uibase$startX, liteui_uibase$startY, liteui_uibase$depth = 0, liteui_uibase$fpsStart = +new Date(), liteui_uibase$fpsRecords = [], liteui_uibase$fpsInc = 0, liteui_uibase$externalTime = 0, liteui_uibase$fpsBegin = 0, liteui_uibase$fpsEnd = 0, liteui_uibase$requestFrame = requestAnimationFrame, liteui_uibase$latest = new Date(), liteui_uibase$requestFrame = function(fn) {
        var t = new Date();
        return liteui_uibase$latest = t, requestAnimationFrame(fn, 30);
    }, liteui_uibase$events = "touchstart,touchmove,touchend,touchcancel,mousedown,mousemove,mouseup,mouseout".split(","), liteui_uibase$moveThreshold = 10, liteui_uibase$moveCount = -1, liteui_uibase$i = liteui_uibase$events.length, liteui_uibase$DIRTY_CHILD_REPAINT = 2, liteui_uibase$DIRTY_SCROLL = 4, liteui_uibase$DIRTY_SELF = 8;
    window.matchMedia && window.matchMedia("(pointer:coarse)").matches && liteui_uibase$events.splice(4), 
    liteui_uibase$Widget.prototype.attach = function() {
        function dispatchDraw(ctx) {
            function doWidgetDraw(ctx, cmds, deep) {
                for (var i = 0; i < cmds.length; ) {
                    var w = cmds[i++], children = cmds[i++], width = w.width, height = w.height;
                    ctx.save();
                    try {
                        ctx.translate(w.x, w.y), ctx.beginPath(), ctx.rect(0, 0, width, height), ctx.closePath(), 
                        ctx.clip(), w.dirty = 0, w.draw instanceof Function ? w.draw(ctx, width, height) : (ctx.fillStyle = w.draw, 
                        ctx.fillRect(0, 0, width, height)), doWidgetDraw(ctx, children, deep + 1);
                    } finally {
                        ctx.restore();
                    }
                }
            }
            var clips = [], cmds = [];
            liteui_uibase$prepareWidgetDraw(ctx, widget, clips, cmds), ctx.save();
            try {
                ctx.beginPath();
                for (var i = 0, len = clips.length; len > i; ) ctx.rect(clips[i++], clips[i++], clips[i++], clips[i++]);
                ctx.closePath(), ctx.clip(), ctx.clearRect(0, 0, widget.width, widget.height), doWidgetDraw(ctx, cmds, 0);
            } finally {
                ctx.restore();
            }
        }
        function dispatchEvent(type, e, sx, sy, x, y) {
            return liteui_uibase$dispatchWidgetEvent(type, e, sx, sy, x, y, widget);
        }
        var widget = this;
        liteui_uibase$resetPage(this.dispatchDraw = dispatchDraw, dispatchEvent);
    }, liteui_uibase$Widget.prototype.clone = function() {
        for (var newNode = Object.create(this.__proto__ || this), cns = this.children.concat(), i = cns.length; i--; ) cns[i] = cns[i].clone();
        for (i in this) newNode[i] = this[i];
        return newNode.children = cns, newNode;
    }, liteui_uibase$Widget.prototype.resize = function(w, h) {
        if (null != w && w != this.width) this.width = w; else {
            if (null == h || h == this.height) return;
            this.height = h;
        }
        var pw = this.parentWidget, i = pw.children.indexOf(this);
        if (i >= 0) {
            i <<= 1, pw.rangeX[i + 1] = pw.rangeX[i] + this.width, pw.rangeY[i + 1] = pw.rangeY[i] + this.height;
            var maxY = Math.max.apply(Math, pw.rangeY);
            pw.offsetY = pw.drawOffsetY = Math.max(Math.min(pw.offsetY, maxY - pw.height), 0), 
            this.repaint();
        }
    }, liteui_uibase$Widget.prototype.add = function(widget, x, y) {
        null == y && (y = this.rangeY.length ? Math.max.apply(Math, this.rangeY) : 0, null == x && (x = 0)), 
        widget.parentWidget = this, this.children.push(widget), this.rangeX.push(x, widget.width + x), 
        this.rangeY.push(y, widget.height + y), this.repaint(liteui_uibase$DIRTY_CHILD_REPAINT);
    }, liteui_uibase$Widget.prototype.remove = function(widget) {
        var i = this.children.indexOf(widget);
        i >= 0 && (this.children.splice(i, 1), this.rangeX.splice(2 * i, 2), this.rangeY.splice(2 * i, 2)), 
        this.repaint(liteui_uibase$DIRTY_SCROLL);
    }, liteui_uibase$Widget.prototype.clear = function() {
        this.children.length = this.rangeX.length = this.rangeY.length = 0, this.repaint(liteui_uibase$DIRTY_SELF);
    }, liteui_uibase$Widget.prototype.repaint = function(flag) {
        this.dirty |= flag || liteui_uibase$DIRTY_SELF;
        for (var w = this; w.parentWidget; ) w = w.parentWidget, w.dirty |= liteui_uibase$DIRTY_CHILD_REPAINT;
        w.dispatchDraw && liteui_uibase$resetPainter(w.dispatchDraw);
    };
    var liteui_xul$width, liteui_xul$height, liteui_uiconfig$fontFamily = "STHeiti serif", liteui_uiconfig$lineWidth = 1.5 * devicePixelRatio, liteui_uiconfig$maxTapInterval = 240, liteui_uiconfig$longPressTime = 600, liteui_xul$widgetFactoryMap = [];
    liteui_xul$ModelFactory.prototype.getCallback = function() {
        if (!this.impl) {
            var buf = [ "return function(){switch(+this){" ];
            for (var n in this.idCache) buf.push("case ", this.idCache[n], ":", "return ", n, ";\r\n");
            buf.push("}}");
            var scope = new Function(this.vars, buf.join(""));
            this.impl = scope.apply(null, this.values);
        }
        return this.impl;
    }, liteui_xul$registor("Layout", liteui_xul$defaultFactory), liteui_xul$registor("List", function(el, width, height) {
        width = liteui_xul$computeSize(el.getAttribute("width"), width), height = liteui_xul$computeSize(el.getAttribute("height"), height);
        var varName = el.getAttribute("var"), valueEL = liteui_xul$parseEL(el, el.getAttribute("value"), !0), statusEL = liteui_xul$parseEL(el, varName + "=arguments[0][_for_index = arguments[1]];", !0), widget = new liteui_ui_list$UIList(width, height, valueEL, statusEL);
        return liteui_xul$addVarable(el, varName), liteui_xul$appendChildDefault(widget, el, width, height), 
        widget;
    }), liteui_xul$registor("Card", function(el, width, height) {
        width = liteui_xul$computeSize(el.getAttribute("width"), width), height = liteui_xul$computeSize(el.getAttribute("height"), height);
        var indexName = el.getAttribute("index").replace(/^\$\{|\}$/g, ""), varName = el.getAttribute("var"), indexEL = liteui_xul$parseEL(el, indexName, !0), valueEL = liteui_xul$parseEL(el, el.getAttribute("value"), !0), statusEL = liteui_xul$parseEL(el, varName + "=arguments[0];", !0), widget = new liteui_ui_list$UICard(width, height, valueEL, indexEL, statusEL);
        return liteui_xul$addVarable(el, indexName, varName), liteui_xul$appendChildDefault(widget, el, width, height), 
        widget;
    }), liteui_xul$registor("Button", function() {
        var widget = liteui_xul$textFactory.apply(this, arguments);
        return widget;
    }), liteui_xul$registor("Text", liteui_xul$textFactory), xmldom$DOMParser.prototype.parseFromString = function(source, mimeType) {
        var options = this.options, sax = new xmldom$XMLReader(), domBuilder = options.domBuilder || new xmldom$DOMHandler(), errorHandler = options.errorHandler, locator = options.locator, defaultNSMap = options.xmlns || {}, entityMap = {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'"
        };
        return locator && domBuilder.setDocumentLocator(locator), sax.errorHandler = xmldom$buildErrorHandler(errorHandler, domBuilder, locator), 
        sax.domBuilder = options.domBuilder || domBuilder, /\/x?html?$/.test(mimeType) && (entityMap.nbsp = " ", 
        entityMap.copy = "©", defaultNSMap[""] = "http://www.w3.org/1999/xhtml"), defaultNSMap.xml = defaultNSMap.xml || "http://www.w3.org/XML/1998/namespace", 
        source ? sax.parse(source, defaultNSMap, entityMap) : sax.errorHandler.error("invalid document source"), 
        domBuilder.document;
    }, xmldom$DOMHandler.prototype = {
        startDocument: function() {
            this.document = new xmldom$DOMImplementation().createDocument(null, null, null), 
            this.locator && (this.document.documentURI = this.locator.systemId);
        },
        startElement: function(namespaceURI, localName, qName, attrs) {
            var doc = this.document, el = doc.createElementNS(namespaceURI, qName || localName), len = attrs.length;
            xmldom$appendElement(this, el), this.currentElement = el, this.locator && xmldom$position(this.locator, el);
            for (var i = 0; len > i; i++) {
                var namespaceURI = attrs.getURI(i), value = attrs.getValue(i), qName = attrs.getQName(i), attr = doc.createAttributeNS(namespaceURI, qName);
                attr.getOffset && xmldom$position(attr.getOffset(1), attr), attr.value = attr.nodeValue = value, 
                el.setAttributeNode(attr);
            }
        },
        endElement: function() {
            {
                var current = this.currentElement;
                current.tagName;
            }
            this.currentElement = current.parentNode;
        },
        startPrefixMapping: function() {},
        endPrefixMapping: function() {},
        processingInstruction: function(target, data) {
            var ins = this.document.createProcessingInstruction(target, data);
            this.locator && xmldom$position(this.locator, ins), xmldom$appendElement(this, ins);
        },
        ignorableWhitespace: function() {},
        characters: function(chars) {
            if (chars = xmldom$_toString.apply(this, arguments), this.currentElement && chars) {
                if (this.cdata) {
                    var charNode = this.document.createCDATASection(chars);
                    this.currentElement.appendChild(charNode);
                } else {
                    var charNode = this.document.createTextNode(chars);
                    this.currentElement.appendChild(charNode);
                }
                this.locator && xmldom$position(this.locator, charNode);
            }
        },
        skippedEntity: function() {},
        endDocument: function() {
            this.document.normalize();
        },
        setDocumentLocator: function(locator) {
            (this.locator = locator) && (locator.lineNumber = 0);
        },
        comment: function(chars) {
            chars = xmldom$_toString.apply(this, arguments);
            var comm = this.document.createComment(chars);
            this.locator && xmldom$position(this.locator, comm), xmldom$appendElement(this, comm);
        },
        startCDATA: function() {
            this.cdata = !0;
        },
        endCDATA: function() {
            this.cdata = !1;
        },
        startDTD: function(name, publicId, systemId) {
            var impl = this.document.implementation;
            if (impl && impl.createDocumentType) {
                var dt = impl.createDocumentType(name, publicId, systemId);
                this.locator && xmldom$position(this.locator, dt), xmldom$appendElement(this, dt);
            }
        },
        warning: function(error) {
            console.warn("[xmldom warning]	" + error, xmldom$_locator(this.locator));
        },
        error: function(error) {
            console.error("[xmldom error]	" + error, xmldom$_locator(this.locator));
        },
        fatalError: function(error) {
            throw console.error("[xmldom fatalError]	" + error, xmldom$_locator(this.locator)), 
            error;
        }
    }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
        xmldom$DOMHandler.prototype[key] = function() {
            return null;
        };
    });
    {
        var xmldom$XMLReader = xmldom_sax$XMLReader, xmldom$DOMImplementation = xmldom_dom$DOMImplementation, xmldom_dom$htmlns = "http://www.w3.org/1999/xhtml", xmldom_dom$NodeType = {}, xmldom_dom$ELEMENT_NODE = xmldom_dom$NodeType.ELEMENT_NODE = 1, xmldom_dom$ATTRIBUTE_NODE = xmldom_dom$NodeType.ATTRIBUTE_NODE = 2, xmldom_dom$TEXT_NODE = xmldom_dom$NodeType.TEXT_NODE = 3, xmldom_dom$CDATA_SECTION_NODE = xmldom_dom$NodeType.CDATA_SECTION_NODE = 4, xmldom_dom$ENTITY_REFERENCE_NODE = xmldom_dom$NodeType.ENTITY_REFERENCE_NODE = 5, xmldom_dom$ENTITY_NODE = xmldom_dom$NodeType.ENTITY_NODE = 6, xmldom_dom$PROCESSING_INSTRUCTION_NODE = xmldom_dom$NodeType.PROCESSING_INSTRUCTION_NODE = 7, xmldom_dom$COMMENT_NODE = xmldom_dom$NodeType.COMMENT_NODE = 8, xmldom_dom$DOCUMENT_NODE = xmldom_dom$NodeType.DOCUMENT_NODE = 9, xmldom_dom$DOCUMENT_TYPE_NODE = xmldom_dom$NodeType.DOCUMENT_TYPE_NODE = 10, xmldom_dom$DOCUMENT_FRAGMENT_NODE = xmldom_dom$NodeType.DOCUMENT_FRAGMENT_NODE = 11, xmldom_dom$NOTATION_NODE = xmldom_dom$NodeType.NOTATION_NODE = 12, xmldom_dom$ExceptionCode = {}, xmldom_dom$ExceptionMessage = {}, xmldom_dom$NOT_FOUND_ERR = (xmldom_dom$ExceptionCode.INDEX_SIZE_ERR = (xmldom_dom$ExceptionMessage[1] = "Index size error", 
        1), xmldom_dom$ExceptionCode.DOMSTRING_SIZE_ERR = (xmldom_dom$ExceptionMessage[2] = "DOMString size error", 
        2), xmldom_dom$ExceptionCode.HIERARCHY_REQUEST_ERR = (xmldom_dom$ExceptionMessage[3] = "Hierarchy request error", 
        3), xmldom_dom$ExceptionCode.WRONG_DOCUMENT_ERR = (xmldom_dom$ExceptionMessage[4] = "Wrong document", 
        4), xmldom_dom$ExceptionCode.INVALID_CHARACTER_ERR = (xmldom_dom$ExceptionMessage[5] = "Invalid character", 
        5), xmldom_dom$ExceptionCode.NO_DATA_ALLOWED_ERR = (xmldom_dom$ExceptionMessage[6] = "No data allowed", 
        6), xmldom_dom$ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (xmldom_dom$ExceptionMessage[7] = "No modification allowed", 
        7), xmldom_dom$ExceptionCode.NOT_FOUND_ERR = (xmldom_dom$ExceptionMessage[8] = "Not found", 
        8)), xmldom_dom$INUSE_ATTRIBUTE_ERR = (xmldom_dom$ExceptionCode.NOT_SUPPORTED_ERR = (xmldom_dom$ExceptionMessage[9] = "Not supported", 
        9), xmldom_dom$ExceptionCode.INUSE_ATTRIBUTE_ERR = (xmldom_dom$ExceptionMessage[10] = "Attribute in use", 
        10));
        xmldom_dom$ExceptionCode.INVALID_STATE_ERR = (xmldom_dom$ExceptionMessage[11] = "Invalid state", 
        11), xmldom_dom$ExceptionCode.SYNTAX_ERR = (xmldom_dom$ExceptionMessage[12] = "Syntax error", 
        12), xmldom_dom$ExceptionCode.INVALID_MODIFICATION_ERR = (xmldom_dom$ExceptionMessage[13] = "Invalid modification", 
        13), xmldom_dom$ExceptionCode.NAMESPACE_ERR = (xmldom_dom$ExceptionMessage[14] = "Invalid namespace", 
        14), xmldom_dom$ExceptionCode.INVALID_ACCESS_ERR = (xmldom_dom$ExceptionMessage[15] = "Invalid access", 
        15);
    }
    xmldom_dom$DOMException.prototype = Error.prototype, xmldom_dom$copy(xmldom_dom$ExceptionCode, xmldom_dom$DOMException), 
    xmldom_dom$NodeList.prototype = {
        length: 0,
        item: function(index) {
            return this[index] || null;
        },
        toString: function() {
            for (var buf = [], i = 0; i < this.length; i++) xmldom_dom$serializeToString(this[i], buf);
            return buf.join("");
        }
    }, xmldom_dom$LiveNodeList.prototype.item = function(i) {
        return xmldom_dom$_updateLiveList(this), this[i];
    }, xmldom_dom$_extends(xmldom_dom$LiveNodeList, xmldom_dom$NodeList), xmldom_dom$NamedNodeMap.prototype = {
        length: 0,
        item: xmldom_dom$NodeList.prototype.item,
        getNamedItem: function(key) {
            for (var i = this.length; i--; ) {
                var attr = this[i];
                if (attr.nodeName == key) return attr;
            }
        },
        setNamedItem: function(attr) {
            var el = attr.ownerElement;
            if (el && el != this._ownerElement) throw new xmldom_dom$DOMException(xmldom_dom$INUSE_ATTRIBUTE_ERR);
            var oldAttr = this.getNamedItem(attr.nodeName);
            return xmldom_dom$_addNamedNode(this._ownerElement, this, attr, oldAttr), oldAttr;
        },
        setNamedItemNS: function(attr) {
            var oldAttr, el = attr.ownerElement;
            if (el && el != this._ownerElement) throw new xmldom_dom$DOMException(xmldom_dom$INUSE_ATTRIBUTE_ERR);
            return oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName), xmldom_dom$_addNamedNode(this._ownerElement, this, attr, oldAttr), 
            oldAttr;
        },
        removeNamedItem: function(key) {
            var attr = this.getNamedItem(key);
            return xmldom_dom$_removeNamedNode(this._ownerElement, this, attr), attr;
        },
        removeNamedItemNS: function(namespaceURI, localName) {
            var attr = this.getNamedItemNS(namespaceURI, localName);
            return xmldom_dom$_removeNamedNode(this._ownerElement, this, attr), attr;
        },
        getNamedItemNS: function(namespaceURI, localName) {
            for (var i = this.length; i--; ) {
                var node = this[i];
                if (node.localName == localName && node.namespaceURI == namespaceURI) return node;
            }
            return null;
        }
    }, xmldom_dom$DOMImplementation.prototype = {
        hasFeature: function(feature, version) {
            var versions = this._features[feature.toLowerCase()];
            return versions && (!version || version in versions) ? !0 : !1;
        },
        createDocument: function(namespaceURI, qualifiedName, doctype) {
            var doc = new xmldom_dom$Document();
            if (doc.implementation = this, doc.childNodes = new xmldom_dom$NodeList(), doc.doctype = doctype, 
            doctype && doc.appendChild(doctype), qualifiedName) {
                var root = doc.createElementNS(namespaceURI, qualifiedName);
                doc.appendChild(root);
            }
            return doc;
        },
        createDocumentType: function(qualifiedName, publicId, systemId) {
            var node = new xmldom_dom$DocumentType();
            return node.name = qualifiedName, node.nodeName = qualifiedName, node.publicId = publicId, 
            node.systemId = systemId, node;
        }
    }, xmldom_dom$Node.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        insertBefore: function(newChild, refChild) {
            return xmldom_dom$_insertBefore(this, newChild, refChild);
        },
        replaceChild: function(newChild, oldChild) {
            this.insertBefore(newChild, oldChild), oldChild && this.removeChild(oldChild);
        },
        removeChild: function(oldChild) {
            return xmldom_dom$_removeChild(this, oldChild);
        },
        appendChild: function(newChild) {
            return this.insertBefore(newChild, null);
        },
        hasChildNodes: function() {
            return null != this.firstChild;
        },
        cloneNode: function(deep) {
            return xmldom_dom$cloneNode(this.ownerDocument || this, this, deep);
        },
        normalize: function() {
            for (var child = this.firstChild; child; ) {
                var next = child.nextSibling;
                next && next.nodeType == xmldom_dom$TEXT_NODE && child.nodeType == xmldom_dom$TEXT_NODE ? (this.removeChild(next), 
                child.appendData(next.data)) : (child.normalize(), child = next);
            }
        },
        isSupported: function(feature, version) {
            return this.ownerDocument.implementation.hasFeature(feature, version);
        },
        hasAttributes: function() {
            return this.attributes.length > 0;
        },
        lookupPrefix: function(namespaceURI) {
            for (var el = this; el; ) {
                var map = el._nsMap;
                if (map) for (var n in map) if (map[n] == namespaceURI) return n;
                el = 2 == el.nodeType ? el.ownerDocument : el.parentNode;
            }
            return null;
        },
        lookupNamespaceURI: function(prefix) {
            for (var el = this; el; ) {
                var map = el._nsMap;
                if (map && prefix in map) return map[prefix];
                el = 2 == el.nodeType ? el.ownerDocument : el.parentNode;
            }
            return null;
        },
        isDefaultNamespace: function(namespaceURI) {
            var prefix = this.lookupPrefix(namespaceURI);
            return null == prefix;
        }
    }, xmldom_dom$copy(xmldom_dom$NodeType, xmldom_dom$Node), xmldom_dom$copy(xmldom_dom$NodeType, xmldom_dom$Node.prototype), 
    xmldom_dom$Document.prototype = {
        nodeName: "#document",
        nodeType: xmldom_dom$DOCUMENT_NODE,
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function(newChild, refChild) {
            if (newChild.nodeType == xmldom_dom$DOCUMENT_FRAGMENT_NODE) {
                for (var child = newChild.firstChild; child; ) {
                    var next = child.nextSibling;
                    this.insertBefore(child, refChild), child = next;
                }
                return newChild;
            }
            return null == this.documentElement && 1 == newChild.nodeType && (this.documentElement = newChild), 
            xmldom_dom$_insertBefore(this, newChild, refChild), newChild.ownerDocument = this, 
            newChild;
        },
        removeChild: function(oldChild) {
            return this.documentElement == oldChild && (this.documentElement = null), xmldom_dom$_removeChild(this, oldChild);
        },
        importNode: function(importedNode, deep) {
            return xmldom_dom$importNode(this, importedNode, deep);
        },
        getElementById: function(id) {
            var rtv = null;
            return xmldom_dom$_visitNode(this.documentElement, function(node) {
                return 1 == node.nodeType && node.getAttribute("id") == id ? (rtv = node, !0) : void 0;
            }), rtv;
        },
        createElement: function(tagName) {
            var node = new xmldom_dom$Element();
            node.ownerDocument = this, node.nodeName = tagName, node.tagName = tagName, node.childNodes = new xmldom_dom$NodeList();
            var attrs = node.attributes = new xmldom_dom$NamedNodeMap();
            return attrs._ownerElement = node, node;
        },
        createDocumentFragment: function() {
            var node = new xmldom_dom$DocumentFragment();
            return node.ownerDocument = this, node.childNodes = new xmldom_dom$NodeList(), node;
        },
        createTextNode: function(data) {
            var node = new xmldom_dom$Text();
            return node.ownerDocument = this, node.appendData(data), node;
        },
        createComment: function(data) {
            var node = new xmldom_dom$Comment();
            return node.ownerDocument = this, node.appendData(data), node;
        },
        createCDATASection: function(data) {
            var node = new xmldom_dom$CDATASection();
            return node.ownerDocument = this, node.appendData(data), node;
        },
        createProcessingInstruction: function(target, data) {
            var node = new xmldom_dom$ProcessingInstruction();
            return node.ownerDocument = this, node.tagName = node.target = target, node.nodeValue = node.data = data, 
            node;
        },
        createAttribute: function(name) {
            var node = new xmldom_dom$Attr();
            return node.ownerDocument = this, node.name = name, node.nodeName = name, node.localName = name, 
            node.specified = !0, node;
        },
        createEntityReference: function(name) {
            var node = new xmldom_dom$EntityReference();
            return node.ownerDocument = this, node.nodeName = name, node;
        },
        createElementNS: function(namespaceURI, qualifiedName) {
            var node = new xmldom_dom$Element(), pl = qualifiedName.split(":"), attrs = node.attributes = new xmldom_dom$NamedNodeMap();
            return node.childNodes = new xmldom_dom$NodeList(), node.ownerDocument = this, node.nodeName = qualifiedName, 
            node.tagName = qualifiedName, node.namespaceURI = namespaceURI, 2 == pl.length ? (node.prefix = pl[0], 
            node.localName = pl[1]) : node.localName = qualifiedName, attrs._ownerElement = node, 
            node;
        },
        createAttributeNS: function(namespaceURI, qualifiedName) {
            var node = new xmldom_dom$Attr(), pl = qualifiedName.split(":");
            return node.ownerDocument = this, node.nodeName = qualifiedName, node.name = qualifiedName, 
            node.namespaceURI = namespaceURI, node.specified = !0, 2 == pl.length ? (node.prefix = pl[0], 
            node.localName = pl[1]) : node.localName = qualifiedName, node;
        }
    }, xmldom_dom$_extends(xmldom_dom$Document, xmldom_dom$Node), xmldom_dom$Element.prototype = {
        nodeType: xmldom_dom$ELEMENT_NODE,
        hasAttribute: function(name) {
            return null != this.getAttributeNode(name);
        },
        getAttribute: function(name) {
            var attr = this.getAttributeNode(name);
            return attr && attr.value || "";
        },
        getAttributeNode: function(name) {
            return this.attributes.getNamedItem(name);
        },
        setAttribute: function(name, value) {
            var attr = this.ownerDocument.createAttribute(name);
            attr.value = attr.nodeValue = "" + value, this.setAttributeNode(attr);
        },
        removeAttribute: function(name) {
            var attr = this.getAttributeNode(name);
            attr && this.removeAttributeNode(attr);
        },
        appendChild: function(newChild) {
            return newChild.nodeType === xmldom_dom$DOCUMENT_FRAGMENT_NODE ? this.insertBefore(newChild, null) : xmldom_dom$_appendSingleChild(this, newChild);
        },
        setAttributeNode: function(newAttr) {
            return this.attributes.setNamedItem(newAttr);
        },
        setAttributeNodeNS: function(newAttr) {
            return this.attributes.setNamedItemNS(newAttr);
        },
        removeAttributeNode: function(oldAttr) {
            return this.attributes.removeNamedItem(oldAttr.nodeName);
        },
        removeAttributeNS: function(namespaceURI, localName) {
            var old = this.getAttributeNodeNS(namespaceURI, localName);
            old && this.removeAttributeNode(old);
        },
        hasAttributeNS: function(namespaceURI, localName) {
            return null != this.getAttributeNodeNS(namespaceURI, localName);
        },
        getAttributeNS: function(namespaceURI, localName) {
            var attr = this.getAttributeNodeNS(namespaceURI, localName);
            return attr && attr.value || "";
        },
        setAttributeNS: function(namespaceURI, qualifiedName, value) {
            var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
            attr.value = attr.nodeValue = "" + value, this.setAttributeNode(attr);
        },
        getAttributeNodeNS: function(namespaceURI, localName) {
            return this.attributes.getNamedItemNS(namespaceURI, localName);
        },
        getElementsByTagName: function(tagName) {
            return new xmldom_dom$LiveNodeList(this, function(base) {
                var ls = [];
                return xmldom_dom$_visitNode(base, function(node) {
                    node === base || node.nodeType != xmldom_dom$ELEMENT_NODE || "*" !== tagName && node.tagName != tagName || ls.push(node);
                }), ls;
            });
        },
        getElementsByTagNameNS: function(namespaceURI, localName) {
            return new xmldom_dom$LiveNodeList(this, function(base) {
                var ls = [];
                return xmldom_dom$_visitNode(base, function(node) {
                    node === base || node.nodeType !== xmldom_dom$ELEMENT_NODE || "*" !== namespaceURI && node.namespaceURI !== namespaceURI || "*" !== localName && node.localName != localName || ls.push(node);
                }), ls;
            });
        }
    }, xmldom_dom$Document.prototype.getElementsByTagName = xmldom_dom$Element.prototype.getElementsByTagName, 
    xmldom_dom$Document.prototype.getElementsByTagNameNS = xmldom_dom$Element.prototype.getElementsByTagNameNS, 
    xmldom_dom$_extends(xmldom_dom$Element, xmldom_dom$Node), xmldom_dom$Attr.prototype.nodeType = xmldom_dom$ATTRIBUTE_NODE, 
    xmldom_dom$_extends(xmldom_dom$Attr, xmldom_dom$Node), xmldom_dom$CharacterData.prototype = {
        data: "",
        substringData: function(offset, count) {
            return this.data.substring(offset, offset + count);
        },
        appendData: function(text) {
            text = this.data + text, this.nodeValue = this.data = text, this.length = text.length;
        },
        insertData: function(offset, text) {
            this.replaceData(offset, 0, text);
        },
        appendChild: function() {
            throw new Error(xmldom_dom$ExceptionMessage[3]);
        },
        deleteData: function(offset, count) {
            this.replaceData(offset, count, "");
        },
        replaceData: function(offset, count, text) {
            var start = this.data.substring(0, offset), end = this.data.substring(offset + count);
            text = start + text + end, this.nodeValue = this.data = text, this.length = text.length;
        }
    }, xmldom_dom$_extends(xmldom_dom$CharacterData, xmldom_dom$Node), xmldom_dom$Text.prototype = {
        nodeName: "#text",
        nodeType: xmldom_dom$TEXT_NODE,
        splitText: function(offset) {
            var text = this.data, newText = text.substring(offset);
            text = text.substring(0, offset), this.data = this.nodeValue = text, this.length = text.length;
            var newNode = this.ownerDocument.createTextNode(newText);
            return this.parentNode && this.parentNode.insertBefore(newNode, this.nextSibling), 
            newNode;
        }
    }, xmldom_dom$_extends(xmldom_dom$Text, xmldom_dom$CharacterData), xmldom_dom$Comment.prototype = {
        nodeName: "#comment",
        nodeType: xmldom_dom$COMMENT_NODE
    }, xmldom_dom$_extends(xmldom_dom$Comment, xmldom_dom$CharacterData), xmldom_dom$CDATASection.prototype = {
        nodeName: "#cdata-section",
        nodeType: xmldom_dom$CDATA_SECTION_NODE
    }, xmldom_dom$_extends(xmldom_dom$CDATASection, xmldom_dom$CharacterData), xmldom_dom$DocumentType.prototype.nodeType = xmldom_dom$DOCUMENT_TYPE_NODE, 
    xmldom_dom$_extends(xmldom_dom$DocumentType, xmldom_dom$Node), xmldom_dom$Notation.prototype.nodeType = xmldom_dom$NOTATION_NODE, 
    xmldom_dom$_extends(xmldom_dom$Notation, xmldom_dom$Node), xmldom_dom$Entity.prototype.nodeType = xmldom_dom$ENTITY_NODE, 
    xmldom_dom$_extends(xmldom_dom$Entity, xmldom_dom$Node), xmldom_dom$EntityReference.prototype.nodeType = xmldom_dom$ENTITY_REFERENCE_NODE, 
    xmldom_dom$_extends(xmldom_dom$EntityReference, xmldom_dom$Node), xmldom_dom$DocumentFragment.prototype.nodeName = "#document-fragment", 
    xmldom_dom$DocumentFragment.prototype.nodeType = xmldom_dom$DOCUMENT_FRAGMENT_NODE, 
    xmldom_dom$_extends(xmldom_dom$DocumentFragment, xmldom_dom$Node), xmldom_dom$ProcessingInstruction.prototype.nodeType = xmldom_dom$PROCESSING_INSTRUCTION_NODE, 
    xmldom_dom$_extends(xmldom_dom$ProcessingInstruction, xmldom_dom$Node), xmldom_dom$XMLSerializer.prototype.serializeToString = function(node, attributeSorter) {
        return node.toString(attributeSorter);
    }, xmldom_dom$Node.prototype.toString = function(attributeSorter) {
        var buf = [];
        return xmldom_dom$serializeToString(this, buf, attributeSorter), buf.join("");
    };
    try {
        Object.defineProperty && (Object.defineProperty(xmldom_dom$LiveNodeList.prototype, "length", {
            get: function() {
                return xmldom_dom$_updateLiveList(this), this.$$length;
            }
        }), Object.defineProperty(xmldom_dom$Node.prototype, "textContent", {
            get: function() {
                return xmldom_dom$getTextContent(this);
            },
            set: function(data) {
                switch (this.nodeType) {
                  case 1:
                  case 11:
                    for (;this.firstChild; ) this.removeChild(this.firstChild);
                    (data || String(data)) && this.appendChild(this.ownerDocument.createTextNode(data));
                    break;

                  default:
                    this.data = data, this.value = value, this.nodeValue = data;
                }
            }
        }), xmldom_dom$__set__ = function(object, key, value) {
            object["$$" + key] = value;
        });
    } catch (xmldom_dom$e) {}
    var xmldom_sax$nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, xmldom_sax$nameChar = new RegExp("[\\-\\.0-9" + xmldom_sax$nameStartChar.source.slice(1, -1) + "·̀-ͯ\\u203F-⁀]"), xmldom_sax$tagNamePattern = new RegExp("^" + xmldom_sax$nameStartChar.source + xmldom_sax$nameChar.source + "*(?::" + xmldom_sax$nameStartChar.source + xmldom_sax$nameChar.source + "*)?$"), xmldom_sax$S_TAG = 0, xmldom_sax$S_ATTR = 1, xmldom_sax$S_ATTR_S = 2, xmldom_sax$S_EQ = 3, xmldom_sax$S_V = 4, xmldom_sax$S_E = 5, xmldom_sax$S_S = 6, xmldom_sax$S_C = 7;
    return xmldom_sax$XMLReader.prototype = {
        parse: function(source, defaultNSMap, entityMap) {
            var domBuilder = this.domBuilder;
            domBuilder.startDocument(), xmldom_sax$_copy(defaultNSMap, defaultNSMap = {}), xmldom_sax$parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler), 
            domBuilder.endDocument();
        }
    }, xmldom_sax$ElementAttributes.prototype = {
        setTagName: function(tagName) {
            if (!xmldom_sax$tagNamePattern.test(tagName)) throw new Error("invalid tagName:" + tagName);
            this.tagName = tagName;
        },
        add: function(qName, value, offset) {
            if (!xmldom_sax$tagNamePattern.test(qName)) throw new Error("invalid attribute:" + qName);
            this[this.length++] = {
                qName: qName,
                value: value,
                offset: offset
            };
        },
        length: 0,
        getLocalName: function(i) {
            return this[i].localName;
        },
        getOffset: function(i) {
            return this[i].offset;
        },
        getQName: function(i) {
            return this[i].qName;
        },
        getURI: function(i) {
            return this[i].uri;
        },
        getValue: function(i) {
            return this[i].value;
        }
    }, xmldom_sax$_set_proto_({}, xmldom_sax$_set_proto_.prototype) instanceof xmldom_sax$_set_proto_ || (xmldom_sax$_set_proto_ = function(thiz, parent) {
        function p() {}
        p.prototype = parent, p = new p();
        for (parent in thiz) p[parent] = thiz[parent];
        return p;
    }), {
        load: example_greek_alphabet$load
    };
}();
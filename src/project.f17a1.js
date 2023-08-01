window.__require = function e(t, i, n) {
    function o(a, c) {
        if (!i[a]) {
            if (!t[a]) {
                var s = a.split("/");
                if (s = s[s.length - 1],
                    !t[s]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l)
                        return l(s, !0);
                    if (r)
                        return r(s, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var h = i[a] = {
                exports: {}
            };
            t[a][0].call(h.exports, function (e) {
                return o(t[a][1][e] || e)
            }, h, h.exports, e, t, i, n)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < n.length; a++)
        o(n[a]);
    return o
}({
    Common: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "6af1cJwsKNP8ZtDWCrjOn3J", "Common");
        var n = {
            user: {
                avatar: "",
                nickname: "",
                openId: ""
            },
            topScore: 0,
            gold: 0
        }
            , o = function (e) {
                return "bridgeMaster_" + n.user.openId + "_" + e
            };
        t.exports = {
            initData: function (e) {
                var t = e.avatar
                    , i = e.nickname
                    , r = e.openId;
                n.user.avatar = t,
                    n.user.nickname = i,
                    n.user.openId = r,
                    n.topScore = Number(localStorage.getItem(o("top-score"))),
                    n.gold = Number(localStorage.getItem(o("gold")))
            },
            setTopScore: function (e) {
                n.topScore = Number(e),
                    localStorage.setItem(o("top-score"), n.topScore)
            },
            getTopScore: function () {
                return n.topScore
            },
            setGold: function (e) {
                n.gold = Number(e),
                    localStorage.setItem(o("gold"), n.gold)
            },
            getGold: function () {
                return n.gold
            }
        },
            cc._RF.pop()
    }
        , {}],
    DataManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "7f58aboa2tMv7S6mi6JSnNu", "DataManager");
        var n = {
            _userData: {},
            _heroId: 1,
            _openId: 0,
            _gameId: 0,
            _weaponMaxLevel: 1,
            _score: 0,
            _godMvNum: 0
        };
        t.exports = n,
            cc._RF.pop()
    }
        , {}],
    Display: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "f1cbeA3gGxNJKdO5GNoG6+L", "Display");
        var n = cc.Class({
            name: "Display",
            properties: {
                perfabMaps: {
                    default: {}
                },
                spriteFrameMaps: {
                    default: {}
                },
                spriteAtlasMaps: {
                    default: {}
                },
                urlToNameMap: {
                    default: {}
                },
                sourceReferenceCount: {
                    default: {}
                }
            },
            ctor: function () {
                this._loadingHandle_ = {}
            },
            preload: function (e, t, i, n) {
                n || (n = 100);
                var o = e.length;
                if (0 == o)
                    return t(!0, n);
                var r = this;
                if (cc.log("preload \u52a0\u8f7d\u65b9\u5f0f", i),
                    cc.sys.isBrowser && (i = !1),
                    i) {
                    (function i() {
                        var a = e.shift()
                            , c = a[0]
                            , s = a[1];
                        r.load(c, s, function (r, a) {
                            var c = e.length;
                            if (0 == c)
                                return t(!0, n);
                            var s = parseInt(n * (o - c) / o);
                            t(!1, s),
                                setTimeout(function () {
                                    i()
                                }, 0)
                        })
                    }
                    )()
                } else
                    for (var a = 0, c = function (e) {
                        var i = e[0]
                            , c = e[1];
                        r.load(i, c, function (e, i) {
                            if (++a == o)
                                return t(!0, n);
                            var r = parseInt(n * a / o);
                            t(!1, r)
                        })
                    }, s = 0; s < o; s++)
                        c(e[s])
            },
            releaseRes: function (e) {
                if (cc.log("display release", e, this.sourceReferenceCount[e]),
                    this.sourceReferenceCount[e] || (this.sourceReferenceCount[e] = 0),
                    this.sourceReferenceCount[e]--,
                    this.sourceReferenceCount[e] <= 0) {
                    var t = this.urlToNameMap[e];
                    if (this.perfabMaps[t]) {
                        var i = cc.loader.getDependsRecursively(this.perfabMaps[t]);
                        cc.loader.release(i),
                            delete this.perfabMaps[t]
                    }
                    if (this.spriteFrameMaps[t]) {
                        var n = cc.loader.getDependsRecursively(this.spriteFrameMaps[t]);
                        cc.loader.release(n),
                            delete this.spriteFrameMaps[t]
                    }
                    if (this.spriteAtlasMaps[t]) {
                        var o = cc.loader.getDependsRecursively(this.spriteAtlasMaps[t]);
                        cc.loader.release(o),
                            delete this.spriteAtlasMaps[t]
                    }
                    delete this.urlToNameMap[e]
                }
            },
            load: function (e, t, i) {
                var n = this;
                if (this.sourceReferenceCount[e] || (this.sourceReferenceCount[e] = 0),
                    this.sourceReferenceCount[e]++,
                    this._loadingHandle_[e] || (this._loadingHandle_[e] = []),
                    this._loadingHandle_[e].push(i),
                    !(this._loadingHandle_[e].length > 1)) {
                    var o = function (e, t, i) {
                        n._loadingHandle_[e].forEach(function (e) {
                            e(t, i)
                        }),
                            delete n._loadingHandle_[e]
                    };
                    cc.loader.loadRes(e, t, function (t, i) {
                        if (t)
                            return n.sourceReferenceCount[e] = 0,
                                cc.error(t),
                                CC_WECHATGAME ? void 0 : o(e, t, i);
                        var r = i._name;
                        n.urlToNameMap[e] = r,
                            i instanceof cc.Prefab ? n.perfabMaps[r] = i : i instanceof cc.SpriteFrame ? n.spriteFrameMaps[r] = i : i instanceof cc.SpriteAtlas && (n.spriteAtlasMaps[r] = i),
                            cc.log("display load cb", e),
                            o(e, t, i)
                    })
                }
            },
            getPrefab: function (e) {
                return this.perfabMaps[e]
            },
            getSpriteFrame: function (e) {
                if (e.indexOf("#") >= 0) {
                    var t = e.split("#")
                        , i = this.spriteAtlasMaps[t[0] + ".plist"];
                    if (e = t[1],
                        i && i.getSpriteFrame(e))
                        return i.getSpriteFrame(e)
                }
                if (this.spriteFrameMaps[e])
                    return this.spriteFrameMaps[e];
                for (var n in this.spriteAtlasMaps) {
                    var o = this.spriteAtlasMaps[n];
                    if (o.getSpriteFrame(e))
                        return o.getSpriteFrame(e)
                }
                cc.assert(!1, "frameName:" + e + "\u4e0d\u5b58\u5728")
            },
            clone: function (e) {
                if (e) {
                    var t = this.isArray(e) ? [] : {};
                    for (var i in e)
                        e.hasOwnProperty(i) && (t[i] = e[i]);
                    return t
                }
            },
            isArray: function (e) {
                return "[object Array]" === toString.apply(e)
            }
        });
        t.exports = new n,
            cc._RF.pop()
    }
        , {}],
    GameGlobal: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "24cdeqsLF9Lf4ndIL6bGL6p", "GameGlobal");
        var n = cc.Class({
            extends: cc.Component,
            properties: {
                _enemyNodeArr: [],
                _isFirstEnter: !0,
                section: 2530
            },
            ctor: function () {
                this._enemyNodeArr = [],
                    this._isFirstEnter = !0,
                    this.section = 2530
            },
            setEnemyNodeArr: function (e) {
                this._enemyNodeArr.push(e)
            },
            getRandom: function (e, t) {
                var i = Math.random() * (t - e)
                    , n = Math.round(i + e);
                return n = Math.max(Math.min(n, t), e)
            },
            getDistance: function (e, t) {
                var i = Math.abs(e.x - t.x)
                    , n = Math.abs(e.y - t.y);
                return Math.pow(i * i + n * n, .5)
            },
            phoneXType: function () {
                var e = cc.view.getFrameSize();
                return e.width / e.height < .5
            },
            overallType: function () {
                var e = cc.view.getFrameSize();
                return e.width / e.height == .5
            },
            showTips: function (e, t) {
                cc.loader.loadRes("prefabs/main/Alert", cc.Prefab, function (i, n) {
                    if (n) {
                        var o = cc.director.getScene()
                            , r = cc.winSize
                            , a = new cc.Node;
                        a.x = r.width / 2,
                            a.y = r.height / 2,
                            o.addChild(a),
                            t && (a = t);
                        var c = cc.instantiate(n);
                        a.addChild(c, 9999),
                            c._script = c.getComponent("Alert"),
                            c._script.showTip(e)
                    }
                })
            }
        });
        t.exports = new n,
            cc._RF.pop()
    }
        , {}],
    HttpMgr: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e6e85h2+slAsLIDnC19ZNsw", "HttpMgr");
        var n = cc.Class({
            extends: cc.Component,
            properties: {},
            loginWeChatHandler: function (e, t, i) {
                var n = {
                    js_code: t,
                    gameid: 2
                };
                this.POST(e, n, function (e) {
                    e && 0 == e.code ? i && i(e.data) : console.warn("\u65e0\u6cd5\u83b7\u53d6openid,\u8fdb\u5165\u6e38\u620f\u5931\u8d25")
                })
            },
            getUserInfoHandler: function (e, t, i) {
                var n = {
                    openid: t,
                    gameid: 2
                };
                this.POST(e, n, function (e) {
                    e && 0 == e.code && i && i(e.data)
                }
                    .bind(this))
            },
            saveHandler: function (e, t, i, n) {
                var o = {
                    openid: i,
                    gameid: 2,
                    data: t
                };
                this.POST(e, o, function (e) {
                    e && 0 == e.code && n && n(e.data)
                }
                    .bind(this))
            },
            POST: function (e, t, i) {
                var n = new XMLHttpRequest;
                n.timeout = 5e3;
                var o = "?";
                for (var r in t || (o = ""),
                    t)
                    "?" != o && (o += "&"),
                        o += r + "=" + t[r];
                var a = e + encodeURI(o);
                return console.log("RequestURL:" + a),
                    n.open("POST", a, !0),
                    n.onreadystatechange = function () {
                        if (4 === n.readyState && n.status >= 200 && n.status < 300) {
                            console.log("http res(" + n.responseText.length + "):" + n.responseText);
                            try {
                                null !== i && i(JSON.parse(n.responseText))
                            } catch (e) {
                                console.error("err:" + e)
                            }
                        }
                    }
                    ,
                    n.send(),
                    n
            }
        });
        t.exports = new n,
            cc._RF.pop()
    }
        , {}],
    LanguageData: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = e("polyglot.min")
            , o = null;
        function r(e) {
            return window.i18n.languages[e]
        }
        function a(e) {
            e && (o ? o.replace(e) : o = new n({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
            t.exports = {
                init: function (e) {
                    if (e !== window.i18n.curLang) {
                        var t = r(e) || {};
                        window.i18n.curLang = e,
                            a(t),
                            this.inst = o
                    }
                },
                t: function (e, t) {
                    if (o)
                        return o.t(e, t)
                },
                inst: o,
                updateSceneRenderers: function () {
                    for (var e = cc.director.getScene().children, t = [], i = 0; i < e.length; ++i) {
                        var n = e[i].getComponentsInChildren("LocalizedLabel");
                        Array.prototype.push.apply(t, n)
                    }
                    for (var o = 0; o < t.length; ++o) {
                        var r = t[o];
                        r.node.active && r.updateLabel()
                    }
                    for (var a = [], c = 0; c < e.length; ++c) {
                        var s = e[c].getComponentsInChildren("LocalizedSprite");
                        Array.prototype.push.apply(a, s)
                    }
                    for (var l = 0; l < a.length; ++l) {
                        var h = a[l];
                        h.node.active && h.updateSprite(window.i18n.curLang)
                    }
                }
            },
            cc._RF.pop()
    }
        , {
        "polyglot.min": "polyglot.min"
    }],
    LocalizedLabel: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function () {
                        return this._dataID
                    },
                    set: function (e) {
                        this._dataID !== e && (this._dataID = e,
                            this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function () {
                n.inst || n.init(),
                    this.fetchRender()
            },
            fetchRender: function () {
                var e = this.getComponent(cc.Label);
                if (e)
                    return this.label = e,
                        void this.updateLabel()
            },
            updateLabel: function () {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
            cc._RF.pop()
    }
        , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: n
                }
            },
            onLoad: function () {
                this.fetchRender()
            },
            fetchRender: function () {
                var e = this.getComponent(cc.Sprite);
                if (e)
                    return this.sprite = e,
                        void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function (e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e)
                        return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function (e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame),
                        this.sprite.spriteFrame = t
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
            cc._RF.pop()
    }
        , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    Rextend: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "6c4245rJhZFo7IQHj99Ha67", "Rextend");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ;
        String.prototype.format = function (e) {
            var t = this;
            if (arguments.length > 0)
                if (1 == arguments.length && "object" == (void 0 === e ? "undefined" : n(e))) {
                    for (var i in e)
                        if (void 0 != e[i]) {
                            var o = new RegExp("({" + i + "})", "g");
                            t = t.replace(o, e[i])
                        }
                } else
                    for (var r = 0; r < arguments.length; r++) {
                        var a = new RegExp("\\{" + r + "\\}", "g");
                        t = t.replace(a, arguments[r])
                    }
            return t
        }
            ,
            Date.prototype.Format = function (e) {
                var t = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    S: this.getMilliseconds()
                };
                for (var i in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))),
                    t)
                    new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
                return e
            }
            ,
            cc.Vec2.prototype.pDistance = function (e) {
                return e ? this.sub(e).mag() : 0
            }
            ,
            cc.Node.prototype.show = function () {
                return this.active = !0,
                    this
            }
            ,
            cc.Node.prototype.hide = function () {
                return this.active = !1,
                    this
            }
            ,
            cc.Node.prototype.p = function (e, t) {
                return e || t ? (e.x === +e.x && e.y === +e.y ? this.setPosition(e) : e === +e && t === +t ? this.setPosition(e, t) : cc.error("function [p]: params type error!"),
                    this) : this.position
            }
            ,
            cc.Node.prototype.pp = function (e, t) {
                var i = e;
                null == i ? (i = .5,
                    t = .5) : null == t && (t = e.y,
                        i = e.x),
                    i -= .5,
                    t -= .5;
                var n = cc.winSize.width
                    , o = cc.winSize.height;
                if (null != this.getParent()) {
                    var r = this.getParent().getContentSize();
                    n = r.width,
                        o = r.height
                }
                return this.setPosition(n * i, o * t),
                    this
            }
            ,
            cc.Node.prototype.to = function (e, t, i) {
                return t = t || 0,
                    e ? e.addChild(this, t, i) : cc.error("function [to]: parent dose not exist!"),
                    this
            }
            ,
            cc.Node.prototype.zorder = function (e) {
                return e ? (e === +e && (this.zIndex = e),
                    this) : this.zIndex
            }
            ;
        var o = function e(t, i) {
            if (t.name == i)
                return t;
            var n = t.getChildByName(i);
            if (n)
                return n;
            for (var o = t.children, r = 0, a = o.length; r < a; r++) {
                var c = e(o[r], i);
                if (c)
                    return c
            }
            return null
        };
        cc.Node.prototype.findChildByName = function (e) {
            if (e)
                return o(this, e)
        }
            ,
            cc.Node.prototype.setTouchSwallowEnabled = function (e) {
                this._touchListener && this._touchListener.setSwallowTouches(e)
            }
            ,
            cc.Node.prototype.delayCall = function (e, t) {
                var i = cc.sequence(cc.delayTime(t), cc.callFunc(function () {
                    e && e()
                }));
                this.runAction(i)
            }
            ,
            cc.Node.prototype.bindTouchLocate = function (e) {
                var t = "function" == typeof (e = e || {}).touchBegin ? e.touchBegin : null
                    , i = "function" == typeof e.touchMove ? e.touchMove : null
                    , n = "function" == typeof e.touchEnd ? e.touchEnd : null
                    , o = "function" == typeof e.touchCancel ? e.touchCancel : n;
                return this.on(cc.Node.EventType.TOUCH_START, function (e) {
                    t && t(e)
                }, this),
                    this.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                        var t = e.getDelta();
                        this.x += t.x,
                            this.y += t.y,
                            i && i(e)
                    }, this),
                    this.on(cc.Node.EventType.TOUCH_END, function (e) {
                        n && n(e),
                            console.log("Node Location: ", this.x, this.y)
                    }, this),
                    this.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                        o && o(e),
                            console.log("Node Location: ", this.x, this.y)
                    }, this),
                    this
            }
            ,
            cc.Node.prototype.unbindTouch = function () {
                return this.off(cc.Node.EventType.TOUCH_START),
                    this.off(cc.Node.EventType.TOUCH_MOVE),
                    this.off(cc.Node.EventType.TOUCH_END),
                    this.off(cc.Node.EventType.TOUCH_CANCEL),
                    this
            }
            ,
            cc.Node.prototype.addTouchEventEx = function (e) {
                if (e) {
                    this.unbindTouch();
                    var t = "function" == typeof e.touchBegin ? e.touchBegin : null
                        , i = "function" == typeof e.touchMove ? e.touchMove : null
                        , n = "function" == typeof e.touchEnd ? e.touchEnd : null
                        , o = "function" == typeof e.touchCancel ? e.touchCancel : n
                        , r = this.scale;
                    return this.__canTouch__ = !0,
                        this.__hasTouchBegan__ = !0,
                        this.__lastClickTime__ = 0,
                        this.__touchID__ = -1,
                        this.__action__ = e.action || !1,
                        this.__oneByOne__ = e.oneByOne || !1,
                        this.__coolTime__ = 1e3 * (e.coolTime || 0),
                        this.__singleTouch__ = !e.multi,
                        this.on(cc.Node.EventType.TOUCH_START, function (e) {
                            var i = void 0;
                            if (this.__hasTouchBegan__ = !0,
                                this.__coolTime__ > 0) {
                                if (!((i = (new Date).getTime()) - this.__lastClickTime__ > this.__coolTime__))
                                    return void (this.__canTouch__ = !1);
                                this.__canTouch__ = !0
                            }
                            if (this.__singleTouch__) {
                                if (-1 != this.__touchID__)
                                    return;
                                this.__touchID__ = e.getID()
                            }
                            if (this.__action__ && (this.scale = .8 * r),
                                t) {
                                var n = t(e);
                                this.__hasTouchBegan__ = n || !this.__oneByOne__
                            }
                            this.__hasTouchBegan__ || (this.__lastClickTime__ = i,
                                this.__touchID__ = -1)
                        }, this),
                        this.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                            this.__canTouch__ && this.__hasTouchBegan__ && (this.__singleTouch__ && this.__touchID__ != e.getID() || i && i(e))
                        }, this),
                        this.on(cc.Node.EventType.TOUCH_END, function (e) {
                            this.__canTouch__ && this.__hasTouchBegan__ && (this.__singleTouch__ && this.__touchID__ != e.getID() || (this.__action__ && (this.scale = r),
                                this.__coolTime__ > 0 && (this.__lastClickTime__ = (new Date).getTime()),
                                n && n(e),
                                this.__touchID__ = -1))
                        }, this),
                        this.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                            this.__canTouch__ && this.__hasTouchBegan__ && (this.__singleTouch__ && this.__touchID__ != e.getID() || (this.__action__ && (this.scale = r),
                                this.__coolTime__ > 0 && (this.__lastClickTime__ = (new Date).getTime()),
                                o && o(e),
                                this.__touchID__ = -1))
                        }, this),
                        this
                }
            }
            ,
            cc.Node.prototype.addClickEventEx = function (e, t, i, n, o) {
                if (e) {
                    var r = new cc.Component.EventHandler;
                    r.target = e,
                        r.component = t,
                        r.handler = i,
                        r.customEventData = n;
                    var a = this.getComponent(cc.Button);
                    a || (a = this.addComponent(cc.Button)),
                        o && (a.transition = cc.Button.Transition.SCALE),
                        a.clickEvents.push(r)
                }
            }
            ,
            cc.Node.prototype.setStr = function (e) {
                this.__labelComp__ = this.__labelComp__ || this.getComponent(cc.Label),
                    this.__labelComp__ && e && (this.__labelComp__.string = e)
            }
            ,
            cc.Node.prototype.setSpr = function (e) {
                this.__spriteComp__ = this.__spriteComp__ || this.getComponent(cc.Sprite),
                    this.__spriteComp__ && e && (this.__spriteComp__.spriteFrame = e)
            }
            ,
            cc._RF.pop()
    }
        , {}],
    SpriteFrameSet: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = n,
            cc._RF.pop()
    }
        , {}],
    WxMgr: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "4a287ioPOdKuq7tUOGC+hb8", "WxMgr");
        var n = e("HttpMgr")
            , o = cc.Class({
                extends: cc.Component,
                properties: {
                    adunitList: null,
                    bannerList: []
                },
                wxLogin: function (e, t) {
                    cc.sys.platform === cc.sys.WECHAT_GAME && wx.login({
                        success: function (i) {
                            i.code ? (console.log("here===code:" + i.code),
                                n.loginWeChatHandler(e, i.code, function (e) {
                                    console.log("\u767b\u5f55resp:", e),
                                        o.adunitList = e.adunit,
                                        e.openid ? t(e) : console.warn("\u65e0\u6cd5\u83b7\u53d6openid,\u8fdb\u5165\u6e38\u620f\u5931\u8d25!")
                                })) : console.warn("\u83b7\u53d6\u7528\u6237\u767b\u5f55\u5931\u8d25")
                        },
                        fail: function (e) {
                            console.warn("\u7528\u6237\u767b\u5f55\u5931\u8d25")
                        }
                    })
                },
                navigateToMiniProgram: function (e) {
                    wx.navigateToMiniProgram({
                        appId: e,
                        success: function (e) {
                            console.log("\u8df3\u8f6c\u6210\u529f", e)
                        },
                        fail: function (e) {
                            console.log("\u8df3\u8f6c\u5931\u8d25", e)
                        }
                    })
                },
                lookVideoCallBack: function (e, t, i) {
                    console.log("here===\u89c2\u770b\u89c6\u9891"),
                        o.adunitList && o.createVideoAd(o.adunitList.video, function () {
                            e && wx.showToast({
                                title: e,
                                icon: "success",
                                duration: 1e3
                            }),
                                i && i()
                        }, function () {
                            t && wx.showToast({
                                title: t,
                                icon: "none",
                                duration: 1e3
                            })
                        })
                },
                createBottomBanner: function (e, t) {
                    if (o.adunitList) {
                        var i = this;
                        wx.getSystemInfo({
                            success: function (n) {
                                var r = n.screenWidth
                                    , a = n.screenHeight
                                    , c = wx.createBannerAd({
                                        adUnitId: o.adunitList.banner,
                                        adIntervals: 30,
                                        style: {
                                            left: 0,
                                            top: a - t,
                                            width: e,
                                            height: t
                                        }
                                    });
                                c.show(),
                                    c.onLoad(function () {
                                        i.bannerList.push(c)
                                    }),
                                    c.onError(function () {
                                        c.destroy()
                                    }),
                                    c.onResize(function (e) {
                                        c.style.top = a - e.height,
                                            c.style.left = r / 2 - e.width / 2
                                    })
                            }
                        })
                    }
                },
                showBanner: function (e) {
                    o.bannerList[0] && (e ? o.bannerList[0].show() : o.bannerList[0].hide())
                },
                shareGameToFriend: function (e) {
                    wx.aldShareAppMessage ? wx.aldShareAppMessage({
                        title: e.title,
                        imageUrl: e.imageUrl,
                        ald_desc: e.desc
                    }) : wx.shareAppMessage({
                        title: e.title,
                        imageUrl: e.imageUrl,
                        success: function (e) { },
                        fail: function (e) { }
                    })
                },
                createVideoAd: function (e, t, i) {
                    o._adcallback = t,
                        o._failcallback = i;
                    var n = wx.createRewardedVideoAd({
                        adUnitId: e
                    });
                    n.show().then(function () {
                        console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u62c9\u8d77\u6210\u529f\u3011...")
                    }).catch(function (e) {
                        console.log(e.errMsg, "\u3010\u6fc0\u52b1\u89c6\u9891\u62c9\u8d77\u5931\u8d25\u3011..."),
                            n.load().then(function () {
                                console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u91cd\u65b0\u62c9\u8d77\u89c6\u9891\u3011..."),
                                    n.show().then(function () {
                                        console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u91cd\u65b0\u62c9\u8d77\u89c6\u9891\u6210\u529f\u3011...")
                                    })
                            })
                    }),
                        o._hasCreatedAd || (o._hasCreatedAd = !0,
                            n.onLoad(function () {
                                console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u6210\u529f\u3011..."),
                                    cc.audioEngine.pauseAll()
                            }),
                            n.onError(function (e) {
                                console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\u3011...", e),
                                    cc.audioEngine.resumeAll(),
                                    o._failcallback && o._failcallback()
                            }),
                            n.onClose(function (e) {
                                console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u5173\u95ed\u3011..."),
                                    cc.audioEngine.resumeAll(),
                                    e && e.isEnded || void 0 === e ? (n.destroy(),
                                        o._adcallback && o._adcallback()) : (console.log("\u3010\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u63d0\u524d\u5173\u95ed\u3011..."),
                                            o._failcallback && o._failcallback())
                            }))
                }
            });
        t.exports = new o,
            cc._RF.pop()
    }
        , {
        HttpMgr: "HttpMgr"
    }],
    en: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "31198g29MZHZJ6pS/y3uiks", "en"),
            window.i18n || (window.i18n = {}),
            window.i18n.languages || (window.i18n.languages = {}),
            window.i18n.languages.en = {
                home: {
                    highestScore: "Best Score: %{score}",
                    retryTip: "Watch an ad to revive",
                    nowScore: "Score"
                }
            },
            cc._RF.pop()
    }
        , {}],
    gameMain: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "00acdeCYapMB5FjJSLzF+X4", "gameMain");
        var n = e("Common")
            , o = (e("Rextend"),
                e("platform"));
        e("DataManager");
        cc.Class({
            extends: cc.Component,
            properties: {
                pillarPrefab: cc.Prefab,
                petsPropPre: cc.Prefab,
                shareT: cc.Node,
                shareBtn: cc.Node,
                petFramIndex: 0,
                petBasicsScore: 0,
                rolePet: null,
                rolePetList: [],
                roleMovePoint: [],
                needDesProp: null,
                propIndex: 0,
                recordAreaScore: 0,
                pillarPreArray: [cc.Node],
                pillarPreCount: 0,
                pillarDistanceLeft: 0,
                pillarDistanceRight: 0,
                pillarParentScale: 1,
                pillarPrePos: null,
                plankCount: 1,
                currPillarNum: 0,
                plankHintWire: cc.Node,
                plankHintWireH: 0,
                currPlank: null,
                roleMoveFlg: !0,
                roleScore: 0,
                roleGold: 0,
                roleSpeed: 400,
                role: cc.Node,
                screenOnFlag: !0,
                _dir: 1,
                _hLen: 0,
                _vLen: 0,
                dieRolePos: null,
                isRoleMove: !1,
                moveOffset: null,
                reviveTimes: 0,
                isShowingAd: !1
            },
            onLoad: function () {
                this.initData()
            },
            initData: function () {
                this.pillarPreLeft = cc.find("pillars/pillarPreLeft", this.node),
                    this.pillarPreRight = cc.find("pillars/pillarPreRight", this.node),
                    this.pillars = cc.find("pillars", this.node),
                    this.hintSpr = cc.find("gameView/hintSpr", this.node),
                    this._DataManager = cc.find("dataManage", this.node),
                    this.startScreenOnEvent(),
                    this.updateRoleGold()
            },
            startScreenOnEvent: function () {
                console.log("\u5f00\u59cb\u76d1\u542c"),
                    this.node.addTouchEventEx({
                        touchBegin: this.onTouchStartEvent.bind(this),
                        touchEnd: this.onTouchEndEvent.bind(this),
                        touchCancel: this.onTouchEndEvent.bind(this)
                    })
            },
            endScreenOffEvent: function () {
                console.log("\u5173\u95ed\u76d1\u542c"),
                    this.node.unbindTouch()
            },
            getPosInNode: function (e, t) {
                if (e && t) {
                    var i = t.getParent().convertToWorldSpaceAR(t.getPosition());
                    return e.convertToNodeSpaceAR(i)
                }
            },
            getNextPos: function (e, t, i) {
                if (e && i) {
                    var n = t / 180 * Math.PI
                        , o = cc.v2(i, 0).rotate(n)
                        , r = e.add(o)
                        , a = o.project(cc.v2(1, 0))
                        , c = o.project(cc.v2(0, 1));
                    return this._hLen = Math.abs(a.x),
                        this._vLen = Math.abs(c.y),
                        r
                }
            },
            nextPillarPos: function (e, t, i) {
                var n = e.getPosition().sub(t.getPosition()).mag();
                this.getNextPos(this.pillarPreLeft.getPosition(), i, n)
            },
            plankPoint: function (e, t) {
                var i = this.getPosInNode(this.pillars, t)
                    , n = this.getPosInNode(this.pillars, e);
                return i.sub(n).mag()
            },
            random: function (e, t) {
                return Math.floor(Math.random() * (t - e + 1) + e)
            },
            getNextDistance: function () {
                return this.random(300, 1e3)
            },
            pillarNextDis: function () {
                this.pillarDistanceLeft = this.getNextDistance(),
                    this.pillarDistanceRight = this.getNextDistance()
            },
            _playAudio: function (e, t) {
                cc.loader.loadRes("audio/" + e, cc.AudioClip, function (e, t) {
                    cc.audioEngine.playEffect(t, !1),
                        1 === window.MUSIC_STATUS ? cc.audioEngine.playEffect(t, !1) : cc.audioEngine.stopAllEffects()
                })
            },
            pillarPrefabCreate: function (e, t, i, n, o) {
                this.pillarPreCount++;
                var r = cc.instantiate(e);
                r.opacity = 0,
                    this.pillarFrameChange(r),
                    this.pillarPrePos = this.getNextPos(o.getPosition(), t, i),
                    r.setPosition(this.pillarPrePos);
                var a = cc.find("scoreArea", r);
                a.scaleX = n,
                    this.createPropHandler(a),
                    this.pillars.addChild(r),
                    r.setSiblingIndex(0),
                    r.runAction(cc.fadeIn(.3)),
                    this.pillarPreArray.push(r);
                for (var c = 0; c < this.pillarPreArray.length; c++)
                    this.pillarPreArray.length > 8 && (this.pillarPreArray.splice(c, 1),
                        this.pillarPreArray[c].destroy());
                return this.pillarPreCount >= 2 && (this._dir *= -1),
                    r
            },
            pillarFrameChange: function (e) {
                cc.loader.loadRes("atlas/pillarAtlas", cc.SpriteAtlas, function (t, i) {
                    var n = this.random(1, 6);
                    cc.find("pillar", e).getComponent(cc.Sprite).spriteFrame = i.getSpriteFrame("pillar_" + n)
                }
                    .bind(this))
            },
            setPillarScale: function (e) {
                var t = this.random(5, 10);
                cc.find("pillar", e).setScale(cc.v2(t / 10, t / 10))
            },
            roleActionHandler: function (e, t, i, n, o, r) {
                this.pillarNextDis(t);
                var a = cc.find("scoreArea", t)
                    , c = cc.find("scoreArea/plank", e)
                    , s = cc.find("role", this.pillars)
                    , l = this.getPosInNode(s.parent, a)
                    , h = cc.delayTime(.3)
                    , u = Math.abs(s.x - l.x) / this.roleSpeed
                    , p = cc.delayTime(u + .3);
                this.pillarPreCount > this.currPillarNum + 5 && (this.roleSpeed = 400);
                var d = this.plankCallFunc(i, n, c, l, s)
                    , f = this.roleCallFunc(s, l, o, c, u, t)
                    , g = this.pillarParentCallFunc(r)
                    , m = cc.callFunc(function () {
                        this.pillarPreCount % 2 != 0 ? this.pillarPreRight = this.pillarPrefabCreate(this.pillarPrefab, 30, this.pillarDistanceRight, -1, this.pillarPreLeft) : this.pillarPreCount % 2 == 0 && (this.pillarPreLeft = this.pillarPrefabCreate(this.pillarPrefab, 150, this.pillarDistanceLeft, 1, this.pillarPreRight)),
                            this.hintSpr.active = !(this.pillarPreCount > 3)
                    }
                        .bind(this))
                    , _ = cc.callFunc(function () {
                        this.removePropHandler()
                    }
                        .bind(this));
                this.plankCount += 1,
                    this.plankDistanceFunc(t, c, p, g, m, a, s),
                    c.runAction(cc.sequence(d, h, _)),
                    s.runAction(cc.sequence(h, f))
            },
            plankCallFunc: function (e, t, i, n, o) {
                return cc.callFunc(function () {
                    var n = cc.rotateBy(.3, e)
                        , o = cc.skewTo(.3, 0, t);
                    i.runAction(cc.spawn([n, o])),
                        this._playAudio("plankDown", !0),
                        this.endScreenOffEvent(),
                        cc.audioEngine.stopAllEffects(),
                        this.plankHintWire.active = !1
                }
                    .bind(this))
            },
            roleCallFunc: function (e, t, i, r, a, c) {
                return cc.callFunc(function () {
                    if (this.roleMoveFlg) {
                        this.isRoleMove = !0;
                        var s = cc.callFunc(function () {
                            this.isRoleMove = !1,
                                this.startScreenOnEvent(),
                                this.plankHintWire.active = this.hintSpr.active,
                                !0 === this.plankHintWire.active && this.plankHintWireEffect(c)
                        }
                            .bind(this));
                        e.runAction(cc.sequence(cc.moveTo(a, t), cc.scaleTo(0, i, 1), s))
                    } else {
                        var l = void 0
                            , h = void 0;
                        1 === e.scaleX ? (l = cc.rotateTo(0, 90),
                            h = 30) : -1 === e.scaleX && (l = cc.rotateTo(0, -90),
                                h = 150),
                            this.dieRolePos = e.getPosition();
                        var u = cc.callFunc(function () {
                            this._playAudio("die", !0)
                        }
                            .bind(this))
                            , p = cc.callFunc(function () {
                                this.overView = cc.find("overView", this.node),
                                    this.overView.active = !0,
                                    cc.find("overView/mask", this.node).on(cc.Node.EventType.TOUCH_START, this.overViewMaskClick, this),
                                    cc.find("currScoreT", this.overView).getComponent(cc.Label).string = this.roleScore,
                                    this.roleScore > n.getTopScore() && (n.setTopScore(this.roleScore),
                                        o.reportRankScore({
                                            rankId: "cdbce3b7e70c46c3a0383fac1eca1098",
                                            score: n.getTopScore()
                                        })),
                                    o.reportRankScore({
                                        rankId: "08b0205499794220a2da49fbf427c24b",
                                        score: n.getGold()
                                    })
                            }
                                .bind(this))
                            , d = this.getPosInNode(e.parent, r)
                            , f = this.getNextPos(d, h, r.height);
                        if (void 0 == f)
                            return;
                        e.runAction(cc.sequence([cc.moveTo(1, f), l, u, cc.moveTo(1, cc.v2(f.x, f.y - 2200)), p])),
                            this.currPlank = r
                    }
                }
                    .bind(this))
            },
            onShareClick: function (e) {
                var t = this;
                o.showRewardAd({
                    onPlay: function () { },
                    onReward: function () {
                        t._continueGame()
                    },
                    onError: function () { },
                    onFinish: function () { }
                })
            },
            _continueGame: function () {
                this.reviveTimes++,
                    this.reviveTimes >= 3 && (this.shareT.active = !1,
                        this.shareBtn.active = !1),
                    this.overView.active = !1;
                var e = cc.find("pillars/role", this.node);
                e.setPosition(this.dieRolePos),
                    e.rotation = 0,
                    this.currPlank.height = 0,
                    this.currPlank.skewX = 0,
                    this.currPlank.rotation = 0,
                    this.currPlank.skewY = -this.currPlank.skewY,
                    this.plankCount -= 1,
                    this.roleMoveFlg = !0,
                    this.startScreenOnEvent()
            },
            overViewMaskClick: function (e) {
                this.overView.active = !1,
                    cc.director.loadScene("MainScene")
            },
            plankHintWireEffect: function (e) {
                var t = cc.find("scoreArea", e)
                    , i = cc.find("plank", t)
                    , n = this.pillarPreArray[this.pillarPreArray.length - 1]
                    , o = cc.find("scoreArea/perfect", n)
                    , r = this.plankPoint(i, o)
                    , a = i.height - r < o.height ? -(i.height - r) : i.height - r;
                this.plankHintWire.parent = t,
                    this.plankHintWire.scaleX = i.scaleX,
                    this.plankHintWire.position = i.position,
                    this.plankHintWire.height = a,
                    this.plankHintWire.skewY = i.skewY,
                    this.plankHintWire.active = this.hintSpr.active
            },
            pillarParentCallFunc: function () {
                return cc.callFunc(function () {
                    this.pillarsMoveAndScale()
                }
                    .bind(this))
            },
            pillarsMoveAndScale: function () {
                var e = this
                    , t = cc.find("pillar", this.pillarPreArray[this.pillarPreArray.length - 1])
                    , i = +(520 / (this._hLen + t.width / 2 * t.scale)).toFixed(2);
                i > 1 && (i = 1);
                var n = this.role.position
                    , o = cc.v2(180 * this._dir, -250).sub(n.mul(i))
                    , r = cc.spawn(cc.moveBy(.5, o), cc.scaleTo(.5, i));
                this.pillars.runAction(cc.sequence(r, cc.callFunc(function () {
                    var t = o.div(i);
                    e.moveOffset = t;
                    for (var n = e.pillars.children, r = 0, a = n.length; r < a; ++r) {
                        var c = n[r];
                        c && (c.position = c.position.add(t))
                    }
                    for (var s in e.pillarPrePos = e.pillarPrePos.add(t),
                        e.pillars.position = cc.v2(0, 0),
                        e.roleMovePoint.push(1),
                        e.rolePetList) {
                        e.rolePetList[s].com.addOffset(t)
                    }
                })))
            },
            plankDistanceFunc: function (e, t, i, n, o, r, a) {
                var c = cc.find("pillar/startRightPoint", e)
                    , s = cc.find("pillar/endRightPoint", e)
                    , l = cc.find("pillar/startLeftPoint", e)
                    , h = cc.find("pillar/endLeftPoint", e)
                    , u = this.plankPoint(t, c)
                    , p = this.plankPoint(t, s)
                    , d = this.plankPoint(t, l)
                    , f = this.plankPoint(t, h);
                if (t.height > u && t.height < p || t.height > d && t.height < f) {
                    a.runAction(cc.sequence(i, o, n)),
                        this.roleMoveFlg = !0;
                    var g = cc.delayTime(.3)
                        , m = cc.callFunc(function () {
                            this.scoreAreaHandler(r, t, e)
                        }
                            .bind(this));
                    this.node.runAction(cc.sequence([g, m])),
                        cc.log("\u8ddd\u79bb\u8fbe\u5230~~~~~~~~~")
                } else
                    this.roleMoveFlg = !1,
                        cc.log("\u8ddd\u79bb\u4e0d\u591f\uff0c\u4f60\u8f93\u4e86~~~")
            },
            scoreAreaHandler: function (e, t, i) {
                var n = cc.find("gameView/scoreT", this.node).getComponent(cc.Label)
                    , o = cc.find("qualified_1", e)
                    , r = this.plankPoint(t, o)
                    , a = t.height - r < o.height ? -(t.height - r) : t.height - r
                    , c = cc.find("qualified_2", e)
                    , s = this.plankPoint(t, c)
                    , l = t.height - s < c.height ? -(t.height - s) : t.height - s
                    , h = cc.find("excellence_1", e)
                    , u = this.plankPoint(t, h)
                    , p = t.height - u < h.height ? -(t.height - u) : t.height - u
                    , d = cc.find("excellence_2", e)
                    , f = this.plankPoint(t, d)
                    , g = t.height - f < d.height ? -(t.height - f) : t.height - f
                    , m = cc.find("perfect", e)
                    , _ = this.plankPoint(t, m)
                    , v = t.height - _ < m.height ? -(t.height - _) : t.height - _
                    , S = 5 + this.petBasicsScore
                    , C = 10 + this.petBasicsScore
                    , w = 15 + this.petBasicsScore
                    , y = 3 + this.petBasicsScore;
                if (a < o.height || l < c.height)
                    this._scoreGrade(i, 2),
                        n.string = this.roleScore += S,
                        this.areaScoreLabelEffect(e, S),
                        this._playAudio("areaScore_1", !0),
                        this._playAudio("qualifiedAudio", !0),
                        this.recordAreaScore = 0;
                else if (p < h.height || g < d.height)
                    this._scoreGrade(i, 3),
                        n.string = this.roleScore += C,
                        this.areaScoreLabelEffect(e, C),
                        this._playAudio("areaScore_1", !0),
                        this._playAudio("excellenceAudio", !0),
                        this.recordAreaScore = 0;
                else if (v < m.height)
                    this.recordAreaScore += 1,
                        this._scoreGrade(i, 5),
                        n.string = this.roleScore += w,
                        this.areaScoreLabelEffect(e, w),
                        this._playAudio("areaScore_0", !0),
                        this._areaScoreCount(),
                        this.plankHintWireH = v;
                else {
                    var P = ["basics_1", "basics_2", "basics_3", "basics_4"]
                        , b = cc.find("pillar", i);
                    this.recordAreaScore = 0;
                    for (var T = 0; T < P.length; T++) {
                        var M = cc.find(P[T], b)
                            , A = this.plankPoint(t, M);
                        if ((t.height - A < 0 ? -(t.height - A) : t.height - A) < M.height) {
                            n.string = this.roleScore += y,
                                this.areaScoreLabelEffect(e, y);
                            break
                        }
                    }
                }
                this.areaScoreResult(e)
            },
            _areaScoreCount: function () {
                var e = cc.find("gameView/goldBg", this.node)
                    , t = new cc.Node;
                e.addChild(t),
                    t.setPosition(cc.v2(157, -22)),
                    t.opacity = 0,
                    t.color = cc.Color.YELLOW;
                var i = t.addComponent(cc.Label);
                2 === this.recordAreaScore ? (n.setGold(n.getGold() + 6),
                    i.string = "+6",
                    this._playAudio("perfectAudio_2", !0),
                    this.updateRoleGold()) : this.recordAreaScore >= 3 ? (n.setGold(n.getGold() + 9),
                        i.string = "+9",
                        this._playAudio("perfectAudio_3", !0),
                        this.updateRoleGold()) : this.recordAreaScore <= 2 && this._playAudio("perfectAudio", !0),
                    t.getComponent(cc.Label).fontSize = 35,
                    t.runAction(cc.sequence(cc.fadeIn(.3), cc.moveTo(1, cc.v2(157, 22)), cc.fadeOut(.5)))
            },
            areaScoreResult: function (e) {
                var t = cc.find("scoreAreaResult", e);
                t.active = !0;
                var i = cc.spawn(cc.scaleTo(.5, 1.3, 1.4), cc.fadeOut(.5));
                t.runAction(cc.sequence([i, cc.moveTo(.5, cc.v2(t.x, t.y + 80))]))
            },
            areaScoreLabelEffect: function (e, t) {
                var i = new cc.Node;
                e.addChild(i),
                    i.addComponent(cc.Label).string = "+" + t,
                    i.scaleX = this.pillarPreCount > 0 ? -e.scaleX : e.scaleX,
                    i.getComponent(cc.Label).fontSize = i.getComponent(cc.Label).lineHeight = 70,
                    i.runAction(cc.sequence(cc.moveTo(.7, cc.v2(i.x, i.y + 130)), cc.fadeOut(.3)))
            },
            _scoreGrade: function (e, t) {
                cc.loader.loadRes("atlas/scoreEffectAtlas", cc.SpriteAtlas, function (i, n) {
                    var o = cc.find("scoreGrade", e);
                    o.getComponent(cc.Sprite).spriteFrame = n.getSpriteFrame("scoreEffect_" + t),
                        o.scaleX = e.scaleX;
                    var r = cc.spawn(cc.fadeIn(.3), cc.moveTo(.3, cc.v2(o.x, o.y + 230)))
                        , a = cc.delayTime(.5)
                        , c = cc.callFunc(function () {
                            o.destroy()
                        }
                            .bind(this));
                    o.runAction(cc.sequence([r, a, c]))
                })
            },
            updateRoleGold: function () {
                cc.find("gameView/goldBg/goldT", this.node).getComponent(cc.Label).string = n.getGold()
            },
            plankHeightAdd: function (e) {
                cc.find("scoreArea/plank", e).height += 7
            },
            onTouchStartEvent: function () {
                this._playAudio("plank", !0),
                    cc.director.getScheduler().schedule(function () {
                        this.plankCount % 2 != 0 ? this.plankHeightAdd(this.pillarPreLeft) : this.plankCount % 2 == 0 && this.plankHeightAdd(this.pillarPreRight)
                    }, this, .01, 0)
            },
            onTouchEndEvent: function () {
                this.unscheduleAllCallbacks(),
                    1 === this.plankCount ? this.roleActionHandler(this.pillarPreLeft, this.pillarPreRight, 60, 29, -1, this.pillarParentScale) : this.plankCount % 2 != 0 ? this.roleActionHandler(this.pillarPreLeft, this.pillarPreRight, -60, 29, -1, this.pillarParentScale) : this.plankCount % 2 == 0 && this.roleActionHandler(this.pillarPreRight, this.pillarPreLeft, -60, 29, 1, this.pillarParentScale)
            },
            createPropHandler: function (e) {
                1 != this.pillarPreCount && 2 != this.pillarPreCount && 62 != this.pillarPreCount && 79 != this.pillarPreCount || (this.needDesProp = cc.instantiate(this.petsPropPre),
                    e.addChild(this.needDesProp),
                    this.propIndex = 6,
                    this.petFramIndex += 1,
                    this.petsFramChange(this.needDesProp, !0))
            },
            createPropView: function () {
                if (void 0 !== this.cagePetProp && this.roleMoveFlg)
                    this._propViewEffect(this.getPetView),
                        this.cagePetProp.destroy(),
                        this.cagePetProp = void 0;
                else if (void 0 !== this.roleProp && this.roleMoveFlg)
                    this._propViewEffect(this.getRoleView),
                        this.roleProp.destroy(),
                        this.roleProp = void 0;
                else if (void 0 !== this.debrisProp && this.roleMoveFlg) {
                    var e = cc.instantiate(this.getDebrisView);
                    this.node.addChild(e),
                        this.debrisProp.destroy(),
                        this.debrisProp = void 0
                }
            },
            petsFramChange: function (e, t) {
                var i = t ? "petFramAtlas" : "petAtlas";
                cc.loader.loadRes("atlas/" + i, cc.SpriteAtlas, function (i, n) {
                    e.getComponent(cc.Sprite).spriteFrame = t ? n.getSpriteFrame("pet_" + this.petFramIndex + "_" + this.petFramIndex) : n.getSpriteFrame("pet_" + this.petFramIndex)
                }
                    .bind(this))
            },
            _propViewEffect: function (e) {
                var t = cc.instantiate(e);
                this.node.addChild(t),
                    cc.director.pause()
            },
            removePropHandler: function () {
                null !== this.needDesProp && this.roleMoveFlg && (this.needDesProp.destroy(),
                    this.needDesProp = null,
                    this.propEffect())
            },
            propEffect: function () {
                if (1 === this.propIndex) {
                    var e = new cc.Node
                        , t = e.addComponent(cc.Sprite);
                    t.sizeMode = 0,
                        e.width = 420,
                        e.height = 57,
                        this.node.addChild(e),
                        e.setPosition(cc.v2(0, -363)),
                        cc.loader.loadRes("texTrue/props/mask", cc.SpriteFrame, function (e, i) {
                            t.spriteFrame = i
                        });
                    var i = new cc.Node;
                    e.addChild(i),
                        i.setPosition(cc.v2(0, -8)),
                        i.addComponent(cc.Label).string = "\u83b7\u5f975\u4e2a\u53f0\u5b50\u7684\u79fb\u52a8\u901f\u5ea6\u52a0\u6210\uff01",
                        i.getComponent(cc.Label).fontSize = 25,
                        this.roleSpeed = 600,
                        this.currPillarNum = this.pillarPreCount,
                        e.runAction(cc.sequence(cc.delayTime(2), cc.fadeOut(.5)))
                }
                3 === this.propIndex ? (n.setGold(n.getGold() + this.random(5, 20)),
                    this.updateRoleGold()) : 6 === this.propIndex && this.addPet()
            },
            addPet: function () {
                var e = cc.instantiate(this.petsPropPre);
                e.parent = this.role.parent;
                var t = this.rolePetList[this.rolePetList.length - 1]
                    , i = 0
                    , n = {};
                if (t)
                    i = t.com.getIdx(),
                        n = t.com.getOffsetInfo();
                else {
                    var o = this.roleMovePoint.length - 15;
                    i = o > 0 ? o : 0,
                        n = {
                            offset: this.moveOffset,
                            offsetList: [this.moveOffset]
                        }
                }
                var r = e.getComponent("petsController");
                r.init(this, i, n),
                    e.com = r,
                    this.rolePetList.push(e),
                    this.petBasicsScore += 5 * this.rolePetList.length,
                    this.petsFramChange(e, !1)
            },
            update: function (e) {
                if (this.isRoleMove)
                    for (var t in this.roleMovePoint.push(this.role.position),
                        this.rolePetList) {
                        this.rolePetList[t].com.move()
                    }
            }
        }),
            cc._RF.pop()
    }
        , {
        Common: "Common",
        DataManager: "DataManager",
        Rextend: "Rextend",
        platform: "platform"
    }],
    loadSceneScript: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a617fHvW9BA8raOMBxkb13C", "loadSceneScript");
        var n = e("platform")
            , o = e("Display")
            , r = e("GameGlobal")
            , a = e("WxMgr")
            , c = (e("HttpMgr"),
                e("DataManager"))
            , s = e("Common");
        cc.Class({
            extends: cc.Component,
            properties: {
                progressBar: cc.ProgressBar
            },
            ctor: function () {
                var e = 0
                    , t = setInterval(function () {
                        e < .8 ? n.reportProgress(e += .1) : clearInterval(t)
                    }, 80);
                this.initLang()
            },
            onLoad: function () {
                var e = this;
                if ("1" === cc.sys.localStorage.getItem("bridge_master_music") && (window.MUSIC_STATUS = 1),
                    this.topScore = cc.find("topScoreT", this.node),
                    this.loadingView = cc.find("loadingView", this.node),
                    r._isFirstEnter) {
                    cc.sys.platform == cc.sys.WECHAT_GAME && wx.showShareMenu({
                        withShareTicket: !0
                    });
                    var t = [["prefabs/gamePre/pillarPrefab", cc.Prefab], ["prefabs/propPre/rolePetPre", cc.Prefab], ["prefabs/moreGamePre", cc.Prefab], ["font/scoreFonts", cc.BitmapFont], ["atlas/petAtlas", cc.SpriteAtlas], ["atlas/pillarAtlas", cc.SpriteAtlas], ["atlas/scoreEffectAtlas", cc.SpriteAtlas], ["atlas/moreGameAtlas", cc.SpriteAtlascc]];
                    this.loadRes(t, function (t, i) {
                        var o = this;
                        if (cc.log(t, i),
                            this.progressBar.progress = i / 100,
                            t)
                            if (r._isFirstEnter = !1,
                                console.log("here==\u5fae\u4fe1\u767b\u5f55"),
                                cc.sys.platform === cc.sys.WECHAT_GAME) {
                                a.wxLogin("http://39.108.136.184:1226/login", function (e) {
                                    c._openId = e.openid,
                                        o.showMainLayer()
                                })
                            } else
                                n.login(function (t) {
                                    var i = t.avatar
                                        , r = t.nickname
                                        , a = t.openId;
                                    s.initData({
                                        avatar: i,
                                        nickname: r,
                                        openId: a
                                    }),
                                        e.topScore = s.getTopScore(),
                                        e.showMainLayer(),
                                        o.showMainLayer.bind(o),
                                        setTimeout(function () {
                                            n.closeLoadingModal(),
                                                n.showTitleAd()
                                        }, 300)
                                })
                    }
                        .bind(this), !1, 100)
                }
            },
            initLang: function () {
                var t = e("LanguageData")
                    , i = n.getLang();
                switch (console.log("lang is...:", i),
                i) {
                    case "zh":
                        t.init("zh");
                        break;
                    default:
                        t.init("en")
                }
            },
            showMainLayer: function () {
                this.loadingView.active = !1,
                    minigame.startGameAsync().then(function () {
                        cc.director.loadScene("MainScene")
                    }).catch(function (e) {
                        cc.error(e)
                    })
            },
            loadRes: function (e, t, i, n) {
                cc.isValid(this) && o.preload(e, function (e, i) {
                    t(e, i)
                }, i, n)
            }
        }),
            cc._RF.pop()
    }
        , {
        Common: "Common",
        DataManager: "DataManager",
        Display: "Display",
        GameGlobal: "GameGlobal",
        HttpMgr: "HttpMgr",
        LanguageData: "LanguageData",
        WxMgr: "WxMgr",
        platform: "platform"
    }],
    mainScene: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "9d992uVs+BMa6Znu/wo8pgv", "mainScene");
        var n = e("Common")
            , o = e("LanguageData")
            , r = e("platform");
        cc.Class({
            extends: cc.Component,
            properties: {
                moreGameContent: cc.Node,
                moreGamePre: cc.Prefab,
                rankBtn: cc.Node,
                m_sp_off: cc.Node
            },
            onLoad: function () {
                this.initTopScore(),
                    cc.director.preloadScene("GameScene"),
                    "undefined" != typeof tgaGameSDK && (this.rankBtn.active = !0)
            },
            start: function () {
                this.updateMusicBtnSprite(window.MUSIC_STATUS)
            },
            initTopScore: function () {
                var e = cc.find("mainView/topScoreT", this.node).getComponent(cc.Label);
                this.rankView = cc.find("rankingView", this.node),
                    this.moreGameView = cc.find("moreGameView", this.node);
                n.getTopScore();
                e.string = o.t("home.highestScore", {
                    score: n.getTopScore()
                }),
                    this._DataManager = cc.find("dataManage", this.node)
            },
            clickEvents: function (e) {
                switch (e.target.name) {
                    case "startBtn":
                        this.startBtnClick();
                        break;
                    case "shareBtn":
                        this.shareBtnClick();
                        break;
                    case "rankBtn":
                        this.rankBtnClick();
                        break;
                    case "moreGameBtn":
                        this.moreGameBtnClick();
                        break;
                    case "rank_close":
                        this.rankCloseBtnClick()
                }
            },
            startBtnClick: function () {
                "undefined" != typeof minigame ? r.showSlotAd({
                    onPlay: function () { },
                    onError: function () { },
                    onFinish: function () {
                        cc.director.loadScene("GameScene")
                    }
                }) : cc.director.loadScene("GameScene")
            },
            shareBtnClick: function (e) {
                var t = this._DataManager.getComponent("wxDataManage");
                t.capture(function (e) {
                    wx.shareAppMessage({
                        title: t.getShareTitle(),
                        imageUrl: e,
                        success: function (e) {
                            console.log("shareAppMessage success"),
                                wx.showToast({
                                    title: "\u5206\u4eab\u6210\u529f",
                                    icon: "success",
                                    duration: 1500
                                }),
                                t.setShareReliveCount(t.getShareReliveCount() + 1)
                        },
                        fail: function (e) {
                            console.log("shareAppMessage fail")
                        }
                    })
                })
            },
            rankBtnClick: function () {
                r.showRankModal()
            },
            rankCloseBtnClick: function () {
                this.rankView.active = !1
            },
            moreGameBtnClick: function () {
                this.moreGameView.active = !0;
                for (var e = [0, 1, 3, 4, 5, 6, 7], t = ["wx1645852118fcefdd", "wx5ac91658b821681b", "wx6af89aa8417425b4", "wxc97daf8d20256bb3", "wx65a9dfe21a7692d2", "wx44651869e7834e97", "wxc97daf8d20256bb3", "wx8fe019064c61d676"], i = ["\u5c0f\u5251\u58eb", "\u50cf\u7d20\u5c0f\u9e1fBird", "\u6728\u677f\u642d\u6865", "\u76d6\u697c", "\u5168\u6c11\u94f2\u5c4e\u5b98", "2048", "\u5c0f\u9a74", "\u65b9\u9e1f\u5927\u95ef\u5173"], n = 0; n < e.length; n++) {
                    var o = cc.instantiate(this.moreGamePre);
                    this.moreGameContent.addChild(o);
                    var r = n % 3
                        , a = parseInt(n / 3)
                        , c = 75 + r * (140 + a)
                        , s = -65 - 155 * a;
                    o.position = cc.v2(c, s);
                    var l = e[n];
                    o._script = o.getComponent("otherGameScript"),
                        o._script.loadImg(l, t[l], i[l])
                }
            },
            moreGameCloseBtnClick: function () {
                this.moreGameView.active = !1
            },
            musicBtnClick: function () {
                1 == window.MUSIC_STATUS ? (window.MUSIC_STATUS = 0,
                    cc.sys.localStorage.setItem("bridge_master_music", "0"),
                    r.reportSoundStatus(!1)) : (window.MUSIC_STATUS = 1,
                        cc.sys.localStorage.setItem("bridge_master_music", "1"),
                        r.reportSoundStatus(!0)),
                    this.updateMusicBtnSprite(window.MUSIC_STATUS)
            },
            updateMusicBtnSprite: function (e) {
                this.m_sp_off.active = 1 !== e
            }
        }),
            cc._RF.pop()
    }
        , {
        Common: "Common",
        LanguageData: "LanguageData",
        platform: "platform"
    }],
    otherGameScript: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "350c7IKWfpO2IHakSkwnJyy", "otherGameScript");
        var n = e("WxMgr");
        e("Display");
        cc.Class({
            extends: cc.Component,
            properties: {
                otherGameImg: cc.Sprite,
                gameName: cc.Label
            },
            start: function () {
                this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndFun, this)
            },
            touchEndFun: function () {
                n.navigateToMiniProgram(this.gameOpenId),
                    console.log("\u5f53\u524d\u70b9\u51fb\u7684\u5c0f\u6e38\u620fappId\uff1a", this.gameOpenId)
            },
            loadImg: function (e, t, i) {
                this.gameOpenId = t;
                var n = "game_" + e;
                cc.loader.loadRes("atlas/moreGameAtlas", cc.SpriteAtlas, function (e, t) {
                    this.otherGameImg.spriteFrame = t.getSpriteFrame(n)
                }
                    .bind(this)),
                    this.gameName.string = i
            }
        }),
            cc._RF.pop()
    }
        , {
        Display: "Display",
        WxMgr: "WxMgr"
    }],
    petsController: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "a5e6ebXVhpCEatkYcCXPGao", "petsController"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _idx: 0,
                    _offsetList: [],
                    _curAngle: 0,
                    _curOffset: null,
                    _lastOffset: null
                },
                init: function (e, t, i) {
                    this.gameScene = e,
                        this._curOffset = i.offset,
                        this._offsetList = i.offsetList,
                        this._lastOffset = cc.v2(0, 0),
                        this._idx = t;
                    var n = this.gameScene.roleMovePoint[t];
                    1 == n && (this._idx++,
                        n = this.gameScene.roleMovePoint[this._idx]),
                        this.node.position = n,
                        this.node.opacity = 0,
                        this.node.runAction(cc.fadeIn(.2))
                },
                addOffset: function (e) {
                    this._curOffset = this._curOffset.add(e),
                        this._offsetList.push(e)
                },
                move: function () {
                    if (this._idx++,
                        !(this._idx >= this.gameScene.roleMovePoint.length)) {
                        var e = this.gameScene.roleMovePoint[this._idx];
                        if (1 == e) {
                            this.node.scaleX = 1 == this.gameScene.role.scaleX ? -1 : 1;
                            var t = this._offsetList.shift();
                            return t && (this._lastOffset = t,
                                this._curOffset = this._curOffset.sub(t)),
                                this.move()
                        }
                        this.node.position = e.add(this._curOffset)
                    }
                },
                getIdx: function () {
                    var e = this._idx - 15;
                    return e > 0 ? e : 0
                },
                getOffsetInfo: function () {
                    for (var e = this._curOffset, t = this._offsetList.slice(), i = 0; i < 15; i++) {
                        var n = this._idx + 1;
                        if (1 == this.gameScene.roleMovePoint[n]) {
                            e = e.add(this._lastOffset),
                                t.unshift(this._lastOffset);
                            break
                        }
                    }
                    return {
                        offsetList: t,
                        offset: e
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    platform: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "f12809hKM5LWYiuxirDbYcG", "platform"),
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
        var n = "en"
            , o = ["zh", "en"]
            , r = function (e) {
                return s()[e]
            }("lang")
            , a = "undefined" != typeof tgaGameSDK
            , c = "undefined" != typeof minigame;
        function s() {
            var e = window.location.href.split("?")[1]
                , t = {};
            e && (e.indexOf("#") > -1 && (e = e.split(/\/?#/)[0]),
                e.split("&").forEach(function (e) {
                    var i = e.split("=");
                    t[i[0]] = i[1]
                }));
            return t
        }
        i.default = {
            getLang: function () {
                return o.indexOf(r) < 0 ? n : r
            },
            reportProgress: function (e) {
                a ? tgaGameSDK.reportProgress(e) : c && minigame.setLoadingProgress(100 * e)
            },
            closeLoadingModal: function () {
                a && (tgaGameSDK.closeLoadingModal(),
                    console.log("closeLoadingModal"))
            },
            login: function (e) {
                a ? tgaGameSDK.isLogin(function (t) {
                    var i = t.code
                        , n = t.payload;
                    1e3 === i ? n ? tgaGameSDK.getUserInfo(function (t) {
                        var i = t.code
                            , n = t.payload;
                        if (1e3 === i) {
                            var o = n.avatar
                                , r = n.nickname
                                , a = n.openId;
                            e({
                                avatar: o,
                                nickname: r,
                                openId: a
                            })
                        } else
                            e(null)
                    }) : tgaGameSDK.login(function (t) {
                        var i = t.code
                            , n = t.payload;
                        if (1e3 === i) {
                            var o = n.avatar
                                , r = n.nickname
                                , a = n.openId;
                            e({
                                avatar: o,
                                nickname: r,
                                openId: a
                            })
                        } else
                            e(null)
                    }) : e(null)
                }) : (console.warn("\u672a\u63a5\u5165\u4efb\u4f55\u5e73\u53f0\uff0c\u8fd4\u56de\u4e00\u4e2a\u4e34\u65f6\u7528\u6237"),
                    e({
                        avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2F72%2F2e%2F7a%2F722e7a8d2f8e6da91f683313a1cf1258.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656145207&t=2cbf57955a1d78176ba134d547de8ca3",
                        nickname: "Test User",
                        openId: "1ddf6d57e49944dc97e446a7901de0fe"
                    }))
            },
            reportLevelPassed: function (e) {
                a && tgaGameSDK.reportLevelPassed({
                    level: e,
                    levelTitle: "\u7b2c" + e + "\u5173"
                })
            },
            reportClearGame: function () {
                a && tgaGameSDK.reportClearGame()
            },
            reportRankScore: function (e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () { }
                    ;
                if (a) {
                    var i = e.rankId
                        , n = e.score;
                    tgaGameSDK.reportRankScore({
                        scoreInfo: {
                            rankId: i,
                            score: n
                        },
                        callback: function (e) {
                            1e3 === e.code ? t({
                                code: 1e3
                            }) : (console.warn("\u4e0a\u62a5\u6392\u884c\u6570\u636e\u5931\u8d25\uff01", e),
                                t({
                                    code: 1e3
                                }))
                        }
                    })
                } else
                    console.warn("\u672a\u63a5\u5165\u4efb\u4f55\u6e38\u620f\u5e73\u53f0\uff0c\u4e0a\u62a5\u6392\u884c\u699c\u6570\u636e\u5931\u8d25\uff01"),
                        t({
                            code: 1e3
                        })
            },
            showRankModal: function () {
                a && tgaGameSDK.showRankModal()
            },
            share: function () {
                a && tgaGameSDK.share()
            },
            reportSoundStatus: function (e) {
                a && tgaGameSDK.reportSoundStatus(e)
            },
            showTitleAd: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = e.onPlay
                    , i = void 0 === t ? function () { }
                        : t
                    , n = e.onFinish
                    , o = void 0 === n ? function () { }
                        : n
                    , r = e.onError
                    , c = void 0 === r ? function () { }
                        : r;
                a ? tgaGameSDK.showTitleAd({
                    onPlay: function () {
                        i()
                    },
                    onFinish: function () {
                        o()
                    },
                    onError: c
                }) : (i(),
                    setTimeout(o, 50))
            },
            showSlotAd: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = e.onPlay
                    , i = void 0 === t ? function () { }
                        : t
                    , n = e.onFinish
                    , o = void 0 === n ? function () { }
                        : n
                    , r = e.onError
                    , s = void 0 === r ? function () { }
                        : r
                    , l = e.type;
                a ? tgaGameSDK.showSlotAd({
                    type: l,
                    onPlay: function () {
                        i()
                    },
                    onFinish: function () {
                        o()
                    },
                    onError: s
                }) : i(),o()
                    /*c ? MiniGameAds.isInterstitialReady() ? MiniGameAds.showInterstitial().then(function () {
                    console.info("====> show interstitial success"),
                        i()
                }).catch(function (e) {
                    console.error("====> show interstitial error: " + e.message),
                        s({
                            code: "AD/UNKNOWN_ERROR",
                            message: e.message
                        })
                }).finally(function () {
                    o()
                }) : (s({
                    code: "AD/UNKNOWN_ERROR",
                    message: "resource not ready"
                }),
                    o()) : (o(),
                        setTimeout(o, 50))*/
            },
            showRewardAd: function (e) {
                var t = e.onPlay
                    , i = void 0 === t ? function () { }
                        : t
                    , n = e.onReward
                    , o = void 0 === n ? function () { }
                        : n
                    , r = e.onFinish
                    , s = void 0 === r ? function () { }
                        : r
                    , l = e.onError
                    , h = void 0 === l ? function (e) { }
                        : l;
                a ? tgaGameSDK.showRewardAd({
                    beforePlay: function (e) {
                        e()
                    },
                    onPlay: function () {
                        i()
                    },
                    onReward: o,
                    onFinish: function () {
                        s()
                    },
                    onError: h
                }) : i(),o()
                    /*c ? MiniGameAds.isRewardvideoReady() && MiniGameAds.showRewardedVideo().then(function () {
                    i(),
                        o(),
                        console.info("====> show RewardedVideo success")
                }).catch(function (e) {
                    console.error("====> show RewardedVideo error: " + e.message),
                        h({
                            code: "AD/UNKNOWN_ERROR",
                            message: e.message
                        })
                }).finally(function () {
                    s()
                }) : (i(),
                    setTimeout(function () {
                        o(),
                            s()
                    }, 50))*/
            },
            showBannerAd: function () {
                a && tgaGameSDK.showBannerAd()
            },
            hideBannerAd: function () {
                a && tgaGameSDK.hideBannerAd()
            }
        },
            t.exports = i.default,
            cc._RF.pop()
    }
        , {}],
    "polyglot.min": [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ;
        (function (e, o) {
            "function" == typeof define && define.amd ? define([], function () {
                return o(e)
            }) : "object" == (void 0 === i ? "undefined" : n(i)) ? t.exports = o(e) : e.Polyglot = o(e)
        }
        )(void 0, function (e) {
            function t(e) {
                e = e || {},
                    this.phrases = {},
                    this.extend(e.phrases || {}),
                    this.currentLocale = e.locale || "en",
                    this.allowMissing = !!e.allowMissing,
                    this.warn = e.warn || l
            }
            function i(e) {
                var t, i, n, o = {};
                for (t in e)
                    if (e.hasOwnProperty(t))
                        for (n in i = e[t])
                            o[i[n]] = t;
                return o
            }
            function o(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }
            function r(e, t, i) {
                var n, r;
                return null != i && e ? n = o((r = e.split(u))[c(t, i)] || r[0]) : n = e,
                    n
            }
            function a(e) {
                var t = i(d);
                return t[e] || t.en
            }
            function c(e, t) {
                return p[a(e)](t)
            }
            function s(e, t) {
                for (var i in t)
                    "_" !== i && t.hasOwnProperty(i) && (e = e.replace(new RegExp("%\\{" + i + "\\}", "g"), t[i]));
                return e
            }
            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }
            function h(e) {
                var t = {};
                for (var i in e)
                    t[i] = e[i];
                return t
            }
            t.VERSION = "0.4.3",
                t.prototype.locale = function (e) {
                    return e && (this.currentLocale = e),
                        this.currentLocale
                }
                ,
                t.prototype.extend = function (e, t) {
                    var i;
                    for (var o in e)
                        e.hasOwnProperty(o) && (i = e[o],
                            t && (o = t + "." + o),
                            "object" == (void 0 === i ? "undefined" : n(i)) ? this.extend(i, o) : this.phrases[o] = i)
                }
                ,
                t.prototype.clear = function () {
                    this.phrases = {}
                }
                ,
                t.prototype.replace = function (e) {
                    this.clear(),
                        this.extend(e)
                }
                ,
                t.prototype.t = function (e, t) {
                    var i, n;
                    return "number" == typeof (t = null == t ? {} : t) && (t = {
                        smart_count: t
                    }),
                        "string" == typeof this.phrases[e] ? i = this.phrases[e] : "string" == typeof t._ ? i = t._ : this.allowMissing ? i = e : (this.warn('Missing translation for key: "' + e + '"'),
                            n = e),
                        "string" == typeof i && (t = h(t),
                            n = s(n = r(i, this.currentLocale, t.smart_count), t)),
                        n
                }
                ,
                t.prototype.has = function (e) {
                    return e in this.phrases
                }
                ;
            var u = "||||"
                , p = {
                    chinese: function (e) {
                        return 0
                    },
                    german: function (e) {
                        return 1 !== e ? 1 : 0
                    },
                    french: function (e) {
                        return e > 1 ? 1 : 0
                    },
                    russian: function (e) {
                        return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    czech: function (e) {
                        return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                    },
                    polish: function (e) {
                        return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    icelandic: function (e) {
                        return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                    }
                }
                , d = {
                    chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                    german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                    french: ["fr", "tl", "pt-br"],
                    russian: ["hr", "ru"],
                    czech: ["cs"],
                    polish: ["pl"],
                    icelandic: ["is"]
                };
            return t
        }),
            cc._RF.pop()
    }
        , {}],
    rankList: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "21d62SuSUZC5rttxItMO6un", "rankList");
        var n = e("DataManager")
            , o = e("Common");
        cc.Class({
            extends: cc.Component,
            properties: {
                content: {
                    default: null,
                    type: cc.Node
                },
                _openctx: null,
                _sharedCanvas: null
            },
            onLoad: function () { },
            getRankList: function () {
                console.log("here====\u83b7\u53d6\u6392\u884c\u699c"),
                    cc.sys.platform === cc.sys.WECHAT_GAME && (this._openctx = wx.getOpenDataContext(),
                        this._sharedCanvas = this._openctx.canvas,
                        this.wxsubView = this.content.getComponent(cc.WXSubContextView),
                        this.onShow())
            },
            onShow: function () {
                this.content.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this),
                    this.wxsubView.enabled = !0,
                    this._openctx && this._openctx.postMessage({
                        action: "rankScore",
                        score: o.getTopScore(),
                        myOpenId: n._openId
                    })
            },
            onHide: function () {
                this.wxsubView.enabled = !1,
                    this.content && this.content.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
            },
            onTouchMove: function (e) {
                if (this._openctx) {
                    var t = e.getDeltaY();
                    this._openctx.postMessage({
                        action: "Roll",
                        data: t
                    })
                }
            },
            onDestroy: function () {
                this.content.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
            }
        }),
            cc._RF.pop()
    }
        , {
        Common: "Common",
        DataManager: "DataManager"
    }],
    wxDataManage: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "69b2aiqvotBnYLV8P3l/ivP", "wxDataManage"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    _openId: 0,
                    _gameId: 3,
                    _topScore: 0,
                    CurScore: {
                        default: 0,
                        type: cc.Integer
                    },
                    CurGold: {
                        default: 0,
                        type: cc.Integer
                    },
                    IsShareRelive: {
                        default: !1
                    },
                    _ShareReliveCount: 0,
                    _ShareTitle: "",
                    _ShareImageUrl: ""
                },
                start: function () {
                    cc.log("DataManager start")
                },
                getCurScore: function () {
                    return this.CurScore
                },
                setCurScore: function (e) {
                    this.CurScore = e
                },
                getCurGold: function () {
                    return this.CurGold
                },
                setCurGold: function (e) {
                    this.CurGold = e
                },
                setShareRelive: function (e) {
                    void 0 != e && (this.IsShareRelive = e)
                },
                getShareRelive: function () {
                    return this.IsShareRelive
                },
                setShareTitle: function (e) {
                    this._ShareTitle = e
                },
                getShareTitle: function () {
                    return "\u770b\u6211\u6210\u7ee9, \u6d41\u5f0a\u4e0d!"
                },
                setShareImage: function (e) {
                    this._ShareImageUrl = e
                },
                getShareImage: function () {
                    return this._ShareImageUrl
                },
                setShareReliveCount: function (e) {
                    this._ShareReliveCount = e
                },
                getShareReliveCount: function () {
                    return this._ShareReliveCount
                },
                capture: function (e) {
                    if (!window.wx)
                        return cc.log(" shareImg failed!");
                    var t = cc.game.canvas;
                    t.toTempFilePath({
                        fileType: "jpg",
                        quality: 1,
                        x: 0,
                        y: 0,
                        width: t.width,
                        height: t.height / 2,
                        destWidth: 500,
                        destHeight: 400,
                        success: function (t) {
                            "function" == typeof e && e(t.tempFilePath)
                        },
                        fail: function () {
                            wx.showToast({
                                title: "\u622a\u56fe\u5931\u8d25!",
                                icon: "success",
                                duration: 1500
                            })
                        }
                    })
                }
            }),
            cc._RF.pop()
    }
        , {}],
    zh: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8aa78X0vjpFvoLg426h93lE", "zh"),
            window.i18n || (window.i18n = {}),
            window.i18n.languages || (window.i18n.languages = {}),
            window.i18n.languages.zh = {
                home: {
                    highestScore: "\u5386\u53f2\u6700\u9ad8\u5206\uff1a%{score}",
                    retryTip: "\u770b\u5e7f\u544a\u53ef\u4ee5\u7acb\u5373\u590d\u6d3b",
                    nowScore: "1\u672c\u6b21\u5f97\u5206"
                }
            },
            cc._RF.pop()
    }
        , {}]
}, {}, ["en", "zh", "DataManager", "Display", "GameGlobal", "HttpMgr", "Rextend", "WxMgr", "loadSceneScript", "Common", "gameMain", "mainScene", "petsController", "otherGameScript", "platform", "rankList", "wxDataManage", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min"]);

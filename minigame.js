!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).minigame = {})
}(this, function (e) {
    "use strict";
    function c(e, o, s, c) {
        return new (s = s || Promise)(function (r, t) {
            function i(e) {
                try {
                    a(c.next(e))
                } catch (e) {
                    t(e)
                }
            }
            function n(e) {
                try {
                    a(c.throw(e))
                } catch (e) {
                    t(e)
                }
            }
            function a(e) {
                var t;
                e.done ? r(e.value) : ((t = e.value) instanceof s ? t : new s(function (e) {
                    e(t)
                }
                )).then(i, n)
            }
            a((c = c.apply(e, o || [])).next())
        }
        )
    }
    var t = {
        OK: "OK",
        UNSUPPORTED_API: "UNSUPPORTED_API",
        TIMEOUT: "TIMEOUT",
        INVALID_PARAM: "INVALID_PARAM",
        NOT_READY: "NOT_READY",
        ADS_NO_FILL: "ADS_NO_FILL",
        AD_LOAD_FAILED: "AD_LOAD_FAILED",
        AD_DISMISSED: "AD_DISMISSED",
        AD_NOT_LOADED: "AD_NOT_LOADED",
        AD_ALREADY_LOADED: "AD_ALREADY_LOADED",
        AD_ALREADY_SHOWED: "AD_ALREADY_SHOWED"
    };
    const C = {
        CODE: t,
        OK: {
            code: t.OK,
            message: "Success"
        },
        TIMEOUT: {
            code: t.TIMEOUT,
            message: "timeout"
        },
        adLoadFail: {
            code: t.AD_LOAD_FAILED,
            message: "Ad load failed"
        },
        adDismissed: {
            code: t.AD_DISMISSED,
            message: "Ad dismissed"
        },
        adNotLoaded: {
            code: t.AD_NOT_LOADED,
            message: "Ad not loaded"
        },
        adAlreadyLoaded: {
            code: t.AD_ALREADY_LOADED,
            message: "Ad already loaded"
        },
        adAlreadyShowed: {
            code: t.AD_ALREADY_SHOWED,
            message: "Ad already showed"
        }
    };
    var n, a;
    function H(r, i) {
        return c(this, void 0, void 0, function* () {
            return new Promise((e, t) => {
                setTimeout(() => {
                    try {
                        i && i(),
                            e()
                    } catch (e) {
                        t(e)
                    }
                }
                    , 1e3 * r)
            }
            )
        })
    }
    (t = n = n || {})[t.INTERSTITIAL = 0] = "INTERSTITIAL",
        t[t.REWARDED_VIDEO = 1] = "REWARDED_VIDEO",
        t[t.BANNER = 2] = "BANNER",
        (t = a = a || {})[t.NONE = 0] = "NONE",
        t[t.NEW = 1] = "NEW",
        t[t.LOADING = 2] = "LOADING",
        t[t.LOADED = 3] = "LOADED",
        t[t.PLAYING = 4] = "PLAYING";
    const F = {
        code: "AD_INSTANCE_STILL_CREATING",
        message: "AdInstance is on creating."
    }
        , M = {
            code: "EXCEED_MAX_AD_INSTANCE",
            message: "Max AD Instance allowed: 3"
        }
        , z = {
            code: "NO_READY_AD_INSTANCE",
            message: "AD Instance Not Ready or Played too frequently"
        }
        , G = {
            code: "NOT_READY_FOR_LOAD",
            message: "Not Ready for Load"
        }
        , W = {
            code: "AD_IS_LOADING",
            message: "AD is Loading"
        }
        , V = {
            code: "NOT_READY_FOR_PLAYING",
            message: "Not Ready for Playing"
        }
        , j = {
            code: "AD_IS_PLAYING",
            message: "AD is Playing"
        }
        , U = {
            code: "NO_BANNER_AD",
            message: "No Banner Ad Instance"
        }
        , q = {
            code: "API_NOT_SUPPORT",
            message: "API Not Support"
        }
        , Y = {
            code: "TOO_FAST_SHOW",
            message: "Too Fast To Show Ads"
        }
        , K = {
            code: "NOT_PLAYING",
            message: "Ads Not Playing"
        }
        , X = {
            code: "TOO_MANY_ERRORS",
            message: "Too Many Errors, Stop Next Action"
        }
        , $ = "RATE_LIMITED"
        , J = "ADS_NO_FILL";
    function Z(e, t, r) {
        return e && void 0 !== e[t] ? e[t] : r
    }
    class Q {
        constructor(e, t) {
            this._lastShowTime = 0,
                this._refreshInterval = 0,
                this._refreshInterval = 0 < e ? e : 0,
                (this._lastShowTime = 0) < t && (this._lastShowTime = Date.now() + 1e3 * t - 1e3 * this._refreshInterval)
        }
        isReadyToRefresh() {
            return this.getNextRefreshInterval() <= 0
        }
        getNextRefreshInterval() {
            let e = 0;
            var t;
            return 0 < this._refreshInterval && 0 < this._lastShowTime && (t = Date.now(),
                e = this._refreshInterval - (t - this._lastShowTime) / 1e3),
                e
        }
        updateLastShowTime() {
            this._lastShowTime = Date.now()
        }
    }
    class ee {
        constructor(e, t, r, i) {
            this._maxLoadError = 0,
                this._errorCounter = 0,
                this._fatalError = !1,
                this._sharedTimer = null,
                this._adId = e,
                this._state = a.NONE,
                this._type = t,
                this._sharedTimer = r,
                this._fatalError = !1,
                console.assert(!!r, "sharedTimer is invalid", r),
                this._maxLoadError = Z(i, "maxLoadError", 0)
        }
        getStateName() {
            {
                var t = this._state;
                let e = "NONE";
                switch (t) {
                    case a.NEW:
                        e = "NEW";
                        break;
                    case a.LOADING:
                        e = "LOADING";
                        break;
                    case a.LOADED:
                        e = "LOADED";
                        break;
                    case a.PLAYING:
                        e = "PLAYING"
                }
                return e
            }
        }
        getAdTypeName() {
            return this._type === n.INTERSTITIAL ? "Interstitial" : this._type === n.REWARDED_VIDEO ? "RewardedVideo" : this._type === n.BANNER ? "Banner" : "UNKNOWN"
        }
        getInfo() {
            return `[${this.getAdTypeName()}:${this._adId}:${this.getStateName()}]`
        }
        isReadyToRefresh() {
            return this._sharedTimer.isReadyToRefresh()
        }
        getNextRefreshInterval() {
            return this._sharedTimer.getNextRefreshInterval()
        }
        updateLastShowTime() {
            this._sharedTimer.updateLastShowTime()
        }
        increaseErrorCounter() {
            this._errorCounter++
        }
        resetErrorCounter() {
            this._errorCounter = 0
        }
        setFatalError() {
            this._fatalError = !0
        }
        isErrorTooMany() {
            return this._fatalError || 0 < this._maxLoadError && this._errorCounter >= this._maxLoadError
        }
    }
    class te extends ee {
        constructor(e, t, r, i) {
            super(e, t, r, i),
                this._adInstance = null,
                this._autoLoadOnPlay = Z(i, "autoLoadOnPlay", !1)
        }
        loadAsync() {
            return c(this, void 0, void 0, function* () {
                if (null === this._adInstance) {
                    if (this._state !== a.NONE)
                        throw console.log("Ad Instance is still creating: " + this.getInfo()),
                        F;
                    this._state = a.NEW,
                        console.log("Get Ad Instance: " + this.getInfo()),
                        this._adInstance = yield this.createAdInstanceAsync(this._adId)
                }
                if (this._state !== a.NEW)
                    throw console.log("Not ready for preload: " + this.getInfo()),
                    this._state === a.LOADING ? (console.log("Ad is loading, do not reload" + this.getInfo()),
                        W) : G;
                if (this.isErrorTooMany())
                    throw console.log("Too many errors, stop loading: " + this.getInfo()),
                    X;
                try {
                    return this._state = a.LOADING,
                        console.log("Start Loading: " + this.getInfo()),
                        yield this._adInstance.loadAsync(),
                        this._state = a.LOADED,
                        this.resetErrorCounter(),
                        console.log("Loading Success: " + this.getInfo()),
                        !0
                } catch (e) {
                    var t;
                    throw console.info("Loading Failed: " + this.getInfo(), e),
                    e.code === J ? (console.info("Ads Not Fill, stop loading: " + this.getInfo()),
                        this.setFatalError()) : (this.increaseErrorCounter(),
                            this._state = a.NEW,
                            t = 10 * this._errorCounter + 1,
                            console.log("Reload after " + t + " seconds: " + this.getInfo()),
                            this.safeReLoadAsync(t)),
                    e
                }
            })
        }
        isReady() {
            return null !== this._adInstance && this._state === a.LOADED
        }
        safeReLoadAsync(e = 1) {
            return c(this, void 0, void 0, function* () {
                H(e, () => c(this, void 0, void 0, function* () {
                    try {
                        yield this.loadAsync()
                    } catch (e) {
                        console.info("Reload Error: ", e)
                    }
                })).catch(e => {
                    console.info("Reload failed: " + this.getInfo(), e)
                }
                )
            })
        }
        showAsync() {
            return c(this, void 0, void 0, function* () {
                if (!this.isReady())
                    throw console.log("Not Ready for play: " + this.getInfo()),
                    this._state === a.PLAYING ? j : V;
                if (!this.isReadyToRefresh())
                    throw console.log("Play too frequently, wait for " + this.getNextRefreshInterval() + " seconds: " + this.getInfo()),
                    Y;
                try {
                    return this._state = a.PLAYING,
                        console.log("Play Ads: " + this.getInfo()),
                        yield this._adInstance.showAsync(),
                        console.log("Play Success: " + this.getInfo()),
                        this._adInstance = null,
                        this._state = a.NONE,
                        this.updateLastShowTime(),
                        this._autoLoadOnPlay && (console.log("Reload after 1 seconds: " + this.getInfo()),
                            this.safeReLoadAsync(1)),
                        !0
                } catch (e) {
                    throw console.log("Play Failed: " + this.getInfo(), e),
                    e.code === $ ? this._state = a.LOADED : (this._adInstance = null,
                        this._state = a.NONE,
                        this._autoLoadOnPlay && (console.log("Reload after 1 seconds: " + this.getInfo()),
                            this.safeReLoadAsync(1))),
                    e
                }
            })
        }
    }
    class re extends te {
        constructor(e, t, r) {
            super(e, n.INTERSTITIAL, t, r)
        }
        createAdInstanceAsync(e) {
            return c(this, void 0, void 0, function* () {
                return yield FBInstant.getInterstitialAdAsync(this._adId)
            })
        }
    }
    class ie extends te {
        constructor(e, t, r) {
            super(e, n.REWARDED_VIDEO, t, r)
        }
        createAdInstanceAsync(e) {
            return c(this, void 0, void 0, function* () {
                return yield FBInstant.getRewardedVideoAsync(this._adId)
            })
        }
    }
    class ne extends ee {
        constructor(e, t, r) {
            super(e, n.BANNER, t, r)
        }
        showAsync() {
            return c(this, void 0, void 0, function* () {
                if (!this.isReadyToRefresh())
                    throw console.log("Play too frequently, wait for " + this.getNextRefreshInterval() + " seconds: " + this.getInfo()),
                    Y;
                if (this.isErrorTooMany())
                    throw console.log("Too many errors, stop: " + this.getInfo()),
                    X;
                if (this._state === a.LOADING)
                    throw console.info("Banner is loading, wait for it: " + this.getInfo()),
                    W;
                try {
                    this._state = a.LOADING,
                        console.log("Show Banner: " + this.getInfo()),
                        yield FBInstant.loadBannerAdAsync(this._adId),
                        this._state = a.PLAYING,
                        console.log("Show Banner Success: " + this.getInfo()),
                        this.updateLastShowTime(),
                        this.resetErrorCounter()
                } catch (e) {
                    throw console.info("Show Banner Failed: " + this.getInfo(), e),
                    e.code === $ ? this._state = a.NONE : e.code === J ? (console.info("Ads Not Fill, Stop: " + this.getInfo()),
                        this.setFatalError()) : (this.increaseErrorCounter(),
                            this._state = a.NONE),
                    e
                }
            })
        }
        hideAsync() {
            return c(this, void 0, void 0, function* () {
                if (this._state !== a.PLAYING)
                    throw console.log("No Banner Playing: " + this.getInfo()),
                    K;
                try {
                    console.log("Hide Banner: " + this.getInfo()),
                        yield FBInstant.hideBannerAdAsync(),
                        this._state = a.NONE
                } catch (e) {
                    throw console.info("Hide Banner Failed: " + this.getInfo(), e),
                    e
                }
            })
        }
    }
    class o {
        static getVersion() {
            return "1.0.4"
        }
        static initAdOption(e) {
            try {
                this._fb_max_ad_instance = e.fb_max_ad_instance,
                    this._fb_init_ad_count = e.fb_init_ad_count,
                    this.defaultInterstitialOption = {
                        autoLoadOnPlay: e.fb_auto_load_on_play,
                        maxLoadError: e.fb_max_interstitial_error
                    },
                    this.defaultRewardedVideoOption = {
                        autoLoadOnPlay: e.fb_auto_load_on_play,
                        maxLoadError: e.fb_max_rewarded_video_error
                    },
                    this.defaultBannerOption = {
                        autoLoadOnPlay: e.fb_auto_load_on_play,
                        maxLoadError: e.fb_max_banner_error
                    },
                    this.defaultInterstitialTimerOption = {
                        refreshInterval: e.fb_interstitial_refresh_interval,
                        delayForFirstAd: e.fb_ad_delay_for_first_interstitial
                    },
                    this.defaultRewardedVideoTimerOption = {
                        refreshInterval: e.fb_rewarded_video_refresh_interval,
                        delayForFirstAd: e.fb_ad_delay_for_first_rewarded_video
                    },
                    this.defaultBannerTimerOption = {
                        refreshInterval: e.fb_banner_refresh_interval,
                        delayForFirstAd: e.fb_ad_delay_for_first_banner
                    },
                    console.log("FBAdManager initAdOption success")
            } catch (e) {
                console.info("FBAdManager initAdOption error", e)
            }
        }
        static addInterstitial(t, r = this._fb_init_ad_count) {
            null == this._interstitialTimer && (this._interstitialTimer = new Q(this.defaultInterstitialTimerOption.refreshInterval, this.defaultInterstitialTimerOption.delayForFirstAd));
            for (let e = 0; e < r; e++) {
                if (this._interstitialAds.length >= this._fb_max_ad_instance)
                    throw console.log("Fail to add interstitial, too many instances: " + this._interstitialAds.length, t),
                    M;
                var i = new re(t, this._interstitialTimer, this.defaultInterstitialOption);
                this._interstitialAds.push(i),
                    console.log("Add Interstitial: " + t, "count: " + this._interstitialAds.length)
            }
            return this._interstitialAds.length
        }
        static addRewardedVideo(t, r = this._fb_init_ad_count) {
            null === this._rewardedVideoTimer && (this._rewardedVideoTimer = new Q(this.defaultRewardedVideoTimerOption.refreshInterval, this.defaultRewardedVideoTimerOption.delayForFirstAd));
            for (let e = 0; e < r; e++) {
                if (this._rewardedVideos.length >= this._fb_max_ad_instance)
                    throw console.log("Fail to add RewardedVideo, too many instances: " + this._rewardedVideos.length, t),
                    M;
                var i = new ie(t, this._rewardedVideoTimer, this.defaultRewardedVideoOption);
                this._rewardedVideos.push(i),
                    console.log("Add RewardedVideo: " + t, "count: " + this._rewardedVideos.length)
            }
            return this._rewardedVideos.length
        }
        static addBanner(e) {
            null == this._bannerTimer && (this._bannerTimer = new Q(this.defaultBannerTimerOption.refreshInterval, this.defaultBannerTimerOption.delayForFirstAd));
            var t = new ne(e, this._bannerTimer, this.defaultBannerOption);
            return this._banners.push(t),
                console.log("Add Banner: " + e, "count: " + this._banners.length),
                t
        }
        static loadAll() {
            return c(this, void 0, void 0, function* () {
                return yield this.loadAllAsync()
            })
        }
        static loadAllAsync() {
            return c(this, void 0, void 0, function* () {
                console.log("FBAdManager Version: " + this.getVersion()),
                    console.log("Init Ads Queue");
                for (let e = 0; e < this._rewardedVideos.length; e++) {
                    var t = this._rewardedVideos[e];
                    0 < e && (yield H(.1));
                    try {
                        yield t.loadAsync()
                    } catch (e) { }
                }
                for (let e = 0; e < this._interstitialAds.length; e++) {
                    var r = this._interstitialAds[e];
                    0 < e && (yield H(.1));
                    try {
                        yield r.loadAsync()
                    } catch (e) { }
                }
            })
        }
        static _isAdReady(e) {
            var t = e === n.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos;
            let r = !1;
            for (let e = 0; e < t.length; e++) {
                var i = t[e];
                if (i.isReady() && i.isReadyToRefresh()) {
                    r = !0;
                    break
                }
            }
            return r
        }
        static _showAsync(e) {
            var t = e === n.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos;
            let r = null;
            for (let e = 0; e < t.length; e++) {
                var i = t[e];
                if (i.isReady() && i.isReadyToRefresh()) {
                    r = i;
                    break
                }
            }
            if (null != r)
                return r.showAsync();
            throw z
        }
        static _getAdTimer(e) {
            return e === n.INTERSTITIAL ? this._interstitialTimer : e === n.REWARDED_VIDEO ? this._rewardedVideoTimer : this._bannerTimer
        }
        static isInterstitialAdReady() {
            return this._isAdReady(n.INTERSTITIAL)
        }
        static showInterstitialAd() {
            return c(this, void 0, void 0, function* () {
                return yield this._showAsync(n.INTERSTITIAL)
            })
        }
        static isRewardedVideoReady() {
            return this._isAdReady(n.REWARDED_VIDEO)
        }
        static showRewardedVideo() {
            return c(this, void 0, void 0, function* () {
                return yield this._showAsync(n.REWARDED_VIDEO)
            })
        }
        static checkApiSupport(e) {
            return 0 <= FBInstant.getSupportedAPIs().indexOf(e)
        }
        static isBannerSupport() {
            return void 0 === this._bannerSupport && (this._bannerSupport = this.checkApiSupport("loadBannerAdAsync")),
                this._bannerSupport
        }
        static isBannerReady() {
            if (this._banners.length <= 0)
                throw U;
            return this._banners[0].isReadyToRefresh()
        }
        static showBannerAsync() {
            return c(this, void 0, void 0, function* () {
                if (!this.isBannerSupport())
                    throw q;
                if (this._banners.length <= 0)
                    throw U;
                return yield this._banners[0].showAsync()
            })
        }
        static hideBannerAsync() {
            return c(this, void 0, void 0, function* () {
                if (!this.isBannerSupport())
                    throw q;
                if (this._banners.length <= 0)
                    throw U;
                return yield this._banners[0].hideAsync()
            })
        }
    }
    o._interstitialAds = [],
        o._rewardedVideos = [],
        o._banners = [],
        o._interstitialTimer = null,
        o._rewardedVideoTimer = null,
        o._bannerTimer = null,
        o._bannerSupport = void 0,
        o._fb_max_ad_instance = 1,
        o._fb_init_ad_count = 1,
        o.defaultInterstitialOption = {
            autoLoadOnPlay: !0,
            maxLoadError: 3
        },
        o.defaultRewardedVideoOption = {
            autoLoadOnPlay: !0,
            maxLoadError: 3
        },
        o.defaultBannerOption = {
            autoLoadOnPlay: !0,
            maxLoadError: 1
        },
        o.defaultInterstitialTimerOption = {
            refreshInterval: 40,
            delayForFirstAd: 30
        },
        o.defaultRewardedVideoTimerOption = {
            refreshInterval: 0,
            delayForFirstAd: 0
        },
        o.defaultBannerTimerOption = {
            refreshInterval: 40,
            delayForFirstAd: 0
        };
    const ae = class hi {
        constructor() {
            this._test = !1,
                this._enabled = !1,
                this._isBannerEnabled = !0,
                this._isAdRadical = !1,
                this._isAndroidApp = !1
        }
        static get instance() {
            return this._instance || (this._instance = new hi),
                this._instance
        }
        get isTest() {
            return this._test
        }
        get enabed() {
            return this._enabled
        }
        get isBannerEnabled() {
            return this._isBannerEnabled
        }
        isAdRadical() {
            return this._isAdRadical
        }
        get isAndroidApp() {
            return this._isAndroidApp
        }
        load(e) {
            var t, r, i;
            try {
                var n = e.options
                    , a = (this._test = e.isTest,
                        this._enabled = e.enabled,
                        this._isBannerEnabled = null == (t = e.isBannerEnabled) || t,
                        this._isAndroidApp = null != (r = e.isAndroidApp) && r,
                        this._isAdRadical = null != (i = e.isAdRadical) && i,
                        o.initAdOption(n),
                        e.config);
                o.addBanner(a.banner),
                    o.addInterstitial(a.interstitial),
                    o.addRewardedVideo(a.rewarded_video),
                    o.loadAllAsync()
            } catch (e) {
                console.log("load ads options error: ", e)
            }
        }
        showInterstitial() {
            return o.showInterstitialAd().then(() => Promise.resolve()).catch(e => Promise.reject(e))
        }
        showRewardedVideo() {
            return o.showRewardedVideo().then(() => Promise.resolve()).catch(e => Promise.reject(e))
        }
        showBanner() {
            return this._isBannerEnabled ? o.showBannerAsync().then(() => Promise.resolve()).catch(e => Promise.reject(e)) : (console.info("banner is disable"),
                Promise.resolve())
        }
        hideBanner() {
            return this._isBannerEnabled ? o.hideBannerAsync().then(() => Promise.resolve()).catch(e => Promise.reject(e)) : (console.info("banner is disable"),
                Promise.resolve())
        }
        isRewardvideoReady() {
            return o.isRewardedVideoReady()
        }
        isInterstitialReady() {
            return o.isInterstitialAdReady()
        }
        isBannerReady() {
            return o.isBannerReady()
        }
    }
        .instance;
    class oe {
        constructor() {
            this._configUrl = "",
                this._gameId = "",
                this._appId = "",
                this._channel = "",
                this._channelName = "",
                this._minigameOption = null,
                this._playPageData = null,
                this._locationSearch = "",
                this._locationPathName = ""
        }
        get configUrl() {
            return this._configUrl
        }
        get gameId() {
            return this._gameId
        }
        get appId() {
            return this._appId
        }
        get channel() {
            return this._channel
        }
        get channelName() {
            return this._channelName
        }
        get minigameOption() {
            return this._minigameOption
        }
        get playPageData() {
            return this._playPageData
        }
        set playPageData(e) {
            this._playPageData = e
        }
        get locationSearch() {
            return this._locationSearch = window.location.search,
                this._locationSearch
        }
        static get instance() {
            return this._instance || (this._instance = new oe),
                this._instance
        }
        init(e) {
            this._channel = this.getSubChannelName(),
                this._channelName = this.getChannelName(),
                this._minigameOption = e,
                this._gameId = "" + e.game_id,
                this._appId = "" + e.app_id,
                this._locationSearch = window.location.search,
                this._locationPathName = window.location.pathname,
                window.commonInfo = oe
        }
        getChannelName() {
            return window.globalPlatformInfo.channelName || window.channelName || this._playPageData.channelName
        }
        getSubChannelName() {
            return window.globalPlatformInfo.subChannelName || window.subChannelName || this._playPageData.subChannelName
        }
        getChannelConfigId() {
            return this._playPageData.channelConfigId || 0
        }
        getGameManifestJsonUrl() {
            return this._playPageData.gameManifestJsonUrl || ""
        }
        isH5AndroidApp() {
            return this._minigameOption ? this._minigameOption.android ? !!this._minigameOption.android.enabled : (console.warn("minigame config has not android field!!!"),
                !1) : (console.warn("minigame config is not exist!!!"),
                    !1)
        }
        isAdflyEnable() {
            return this._minigameOption ? this._minigameOption.cpl ? this._minigameOption.cpl.adflyer ? this._minigameOption.cpl.adflyer.enabled : (console.warn("cpl config has not adflyer field!!!"),
                !1) : (console.warn("minigame config has not cpl field!!!"),
                    !1) : (console.warn("minigame config is not exist!!!"),
                        !1)
        }
        getAdflyChannelID() {
            return this.isAdflyEnable() ? this._minigameOption.cpl.adflyer.channelId : ""
        }
        isSharpMatch() {
            var e = null == (e = this._minigameOption) ? void 0 : e.match;
            return !(null == e || !e.enabled) && "adfly" === e.platform
        }
    }
    oe._instance = null;
    const se = oe.instance;
    class ce {
        constructor(e, t, r) {
            this.type = e,
                this.isOneWay = t,
                this._serviceHandler = r
        }
        onRequest(e) {
            return c(this, void 0, void 0, function* () {
                return this._serviceHandler ? this._serviceHandler(e) : Promise.resolve(le(e))
            })
        }
    }
    function de(e, t, r, i) {
        return {
            type: e.type + "_RESPONSE",
            requestType: e.type,
            requestId: e.requestId,
            code: t,
            message: r,
            payload: i
        }
    }
    function le(e, t) {
        return de(e, C.OK.code, C.OK.message, t)
    }
    class r extends ce {
        static createRequest() {
            return {
                type: r.requestType
            }
        }
        static createService() {
            return new r(r.requestType, !1, r.handleRequestAsync)
        }
        static handleRequestAsync(r) {
            return new Promise((e, t) => {
                e(le(r, se))
            }
            )
        }
    }
    r.requestType = "CommonInfoService";
    const he = class fi {
        constructor() {
            this._playTimes = 0,
                this._interval = 2,
                this._enable = !0
        }
        static get instance() {
            return this._instance || (this._instance = new fi),
                this._instance
        }
        init(e) {
            e && (this._enable = !!e.enabled,
                this._interval = null != (e = e.interstitialAdInterval) ? e : 2,
                this._interval = 0 === this._interval ? 2 : this._interval)
        }
        onLevelStart(e = 0) {
            console.info("event level start")
        }
        onLevelFinished(e = 0, t, r) {
            return c(this, void 0, void 0, function* () {
                if (this._playTimes++,
                    console.info("event level finish times: ", this._playTimes),
                    this._playTimes % this._interval != 0)
                    return Promise.resolve();
                try {
                    return yield ae.showInterstitial(),
                        Promise.resolve()
                } catch (e) {
                    return this._playTimes--,
                        console.error("onLevelFinish show interAd error: ", e.message),
                        Promise.reject(e)
                }
            })
        }
    }
        .instance;
    class fe {
        constructor() {
            this._commonInfo = null
        }
        get commonInfo() {
            return this._commonInfo
        }
        static get instance() {
            return this._instance || (this._instance = new fe),
                this._instance
        }
        init() {
            return c(this, void 0, void 0, function* () {
                try {
                    return yield this.getCommonInfo(),
                        this.initCommonInfo(),
                        Promise.resolve()
                } catch (e) {
                    return Promise.reject({
                        code: "MINIGAMEIFNO_INIT_ERROR",
                        message: e.message
                    })
                }
            })
        }
        initCommonInfo() {
            he.init(this._commonInfo._minigameOption.event)
        }
        getCommonInfo() {
            return window.mediationClient.invokeServiceAsync(r.createRequest()).then(e => (this._commonInfo = e.payload,
                Promise.resolve(this._commonInfo))).catch(e => (console.error("get commonInfo error: ", e),
                    Promise.reject({
                        code: "GET_COMMONINFO_ERROR",
                        message: e.message
                    })))
        }
        getLocationSearch() {
            try {
                return this._commonInfo._locationSearch
            } catch (e) {
                return console.error("====> get loation error: ", e),
                    ""
            }
        }
        isH5Android() {
            return !!this._commonInfo && !!this._commonInfo._minigameOption && !!this._commonInfo._minigameOption.android && this._commonInfo._minigameOption.android.enabled
        }
        isAdflyCplEnable() {
            return !!(this._commonInfo && this._commonInfo._minigameOption && this._commonInfo._minigameOption.cpl && this._commonInfo._minigameOption.cpl.adflyer) && this._commonInfo._minigameOption.cpl.adflyer.enabled
        }
    }
    fe._instance = null;
    const ue = fe.instance;
    class s extends ce {
        static createRequest(e) {
            return {
                type: s.requestType,
                payload: e
            }
        }
        static createService() {
            return new s(s.requestType, !1, s.handleRequestAsync)
        }
        static handleRequestAsync(e) {
            var t;
            return window.AdInteractive ? (window.AdInteractive.trackEvent(e.payload),
                console.info("====> android trackEvent " + e.payload),
                Promise.resolve(le(e))) : (t = {
                    code: "ANDROID_INSTANCE_ERROR",
                    message: "Android AdInteractive not exist"
                },
                    Promise.resolve(de(e, t.code, t.message)))
        }
    }
    s.requestType = "AndroidLogEventService";
    var _e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
        , ve = {}
        , t = {
            get exports() {
                return ve
            },
            set exports(e) {
                ve = e
            }
        };
    var pe, ge = {}, me = {
        get exports() {
            return ge
        },
        set exports(e) {
            ge = e
        }
    };
    function p() {
        return pe || (pe = 1,
            me.exports = function (d) {
                var i;
                if ("undefined" != typeof window && window.crypto && (i = window.crypto),
                    "undefined" != typeof self && self.crypto && (i = self.crypto),
                    !(i = !(i = !(i = "undefined" != typeof globalThis && globalThis.crypto ? globalThis.crypto : i) && "undefined" != typeof window && window.msCrypto ? window.msCrypto : i) && void 0 !== _e && _e.crypto ? _e.crypto : i))
                    try {
                        i = require("crypto")
                    } catch (e) { }
                var r = Object.create || function (e) {
                    return t.prototype = e,
                        e = new t,
                        t.prototype = null,
                        e
                }
                    ;
                function t() { }
                var e = {}
                    , n = e.lib = {}
                    , a = n.Base = {
                        extend: function (e) {
                            var t = r(this);
                            return e && t.mixIn(e),
                                t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                                    t.$super.init.apply(this, arguments)
                                }
                                ),
                                (t.init.prototype = t).$super = this,
                                t
                        },
                        create: function () {
                            var e = this.extend();
                            return e.init.apply(e, arguments),
                                e
                        },
                        init: function () { },
                        mixIn: function (e) {
                            for (var t in e)
                                e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString)
                        },
                        clone: function () {
                            return this.init.prototype.extend(this)
                        }
                    }
                    , l = n.WordArray = a.extend({
                        init: function (e, t) {
                            e = this.words = e || [],
                                this.sigBytes = null != t ? t : 4 * e.length
                        },
                        toString: function (e) {
                            return (e || s).stringify(this)
                        },
                        concat: function (e) {
                            var t = this.words
                                , r = e.words
                                , i = this.sigBytes
                                , n = e.sigBytes;
                            if (this.clamp(),
                                i % 4)
                                for (var a = 0; a < n; a++) {
                                    var o = r[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                                    t[i + a >>> 2] |= o << 24 - (i + a) % 4 * 8
                                }
                            else
                                for (var s = 0; s < n; s += 4)
                                    t[i + s >>> 2] = r[s >>> 2];
                            return this.sigBytes += n,
                                this
                        },
                        clamp: function () {
                            var e = this.words
                                , t = this.sigBytes;
                            e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8,
                                e.length = d.ceil(t / 4)
                        },
                        clone: function () {
                            var e = a.clone.call(this);
                            return e.words = this.words.slice(0),
                                e
                        },
                        random: function (e) {
                            for (var t = [], r = 0; r < e; r += 4)
                                t.push(function () {
                                    if (i) {
                                        if ("function" == typeof i.getRandomValues)
                                            try {
                                                return i.getRandomValues(new Uint32Array(1))[0]
                                            } catch (e) { }
                                        if ("function" == typeof i.randomBytes)
                                            try {
                                                return i.randomBytes(4).readInt32LE()
                                            } catch (e) { }
                                    }
                                    throw new Error("Native crypto module could not be used to get secure random number.")
                                }());
                            return new l.init(t, e)
                        }
                    })
                    , o = e.enc = {}
                    , s = o.Hex = {
                        stringify: function (e) {
                            for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                                var a = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push((a >>> 4).toString(16)),
                                    i.push((15 & a).toString(16))
                            }
                            return i.join("")
                        },
                        parse: function (e) {
                            for (var t = e.length, r = [], i = 0; i < t; i += 2)
                                r[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                            return new l.init(r, t / 2)
                        }
                    }
                    , c = o.Latin1 = {
                        stringify: function (e) {
                            for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                                var a = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push(String.fromCharCode(a))
                            }
                            return i.join("")
                        },
                        parse: function (e) {
                            for (var t = e.length, r = [], i = 0; i < t; i++)
                                r[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                            return new l.init(r, t)
                        }
                    }
                    , h = o.Utf8 = {
                        stringify: function (e) {
                            try {
                                return decodeURIComponent(escape(c.stringify(e)))
                            } catch (e) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function (e) {
                            return c.parse(unescape(encodeURIComponent(e)))
                        }
                    }
                    , f = n.BufferedBlockAlgorithm = a.extend({
                        reset: function () {
                            this._data = new l.init,
                                this._nDataBytes = 0
                        },
                        _append: function (e) {
                            "string" == typeof e && (e = h.parse(e)),
                                this._data.concat(e),
                                this._nDataBytes += e.sigBytes
                        },
                        _process: function (e) {
                            var t, r = this._data, i = r.words, n = r.sigBytes, a = this.blockSize, o = n / (4 * a), s = (o = e ? d.ceil(o) : d.max((0 | o) - this._minBufferSize, 0)) * a, e = d.min(4 * s, n);
                            if (s) {
                                for (var c = 0; c < s; c += a)
                                    this._doProcessBlock(i, c);
                                t = i.splice(0, s),
                                    r.sigBytes -= e
                            }
                            return new l.init(t, e)
                        },
                        clone: function () {
                            var e = a.clone.call(this);
                            return e._data = this._data.clone(),
                                e
                        },
                        _minBufferSize: 0
                    })
                    , u = (n.Hasher = f.extend({
                        cfg: a.extend(),
                        init: function (e) {
                            this.cfg = this.cfg.extend(e),
                                this.reset()
                        },
                        reset: function () {
                            f.reset.call(this),
                                this._doReset()
                        },
                        update: function (e) {
                            return this._append(e),
                                this._process(),
                                this
                        },
                        finalize: function (e) {
                            return e && this._append(e),
                                this._doFinalize()
                        },
                        blockSize: 16,
                        _createHelper: function (r) {
                            return function (e, t) {
                                return new r.init(t).finalize(e)
                            }
                        },
                        _createHmacHelper: function (r) {
                            return function (e, t) {
                                return new u.HMAC.init(r, t).finalize(e)
                            }
                        }
                    }),
                        e.algo = {});
                return e
            }(Math)),
            ge
    }
    var ye, Ae = {}, we = {
        get exports() {
            return Ae
        },
        set exports(e) {
            Ae = e
        }
    };
    function Ie() {
        var e, t, n, a, r;
        return ye || (ye = 1,
            we.exports = (e = p(),
                r = (t = e).lib,
                n = r.Base,
                a = r.WordArray,
                (r = t.x64 = {}).Word = n.extend({
                    init: function (e, t) {
                        this.high = e,
                            this.low = t
                    }
                }),
                r.WordArray = n.extend({
                    init: function (e, t) {
                        e = this.words = e || [],
                            this.sigBytes = null != t ? t : 8 * e.length
                    },
                    toX32: function () {
                        for (var e = this.words, t = e.length, r = [], i = 0; i < t; i++) {
                            var n = e[i];
                            r.push(n.high),
                                r.push(n.low)
                        }
                        return a.create(r, this.sigBytes)
                    },
                    clone: function () {
                        for (var e = n.clone.call(this), t = e.words = this.words.slice(0), r = t.length, i = 0; i < r; i++)
                            t[i] = t[i].clone();
                        return e
                    }
                }),
                e)),
            Ae
    }
    var xe, Be = {}, Ee = {
        get exports() {
            return Be
        },
        set exports(e) {
            Be = e
        }
    };
    function be() {
        var t;
        return xe || (xe = 1,
            Ee.exports = (t = p(),
                function () {
                    var e, n;
                    "function" == typeof ArrayBuffer && (e = t.lib.WordArray,
                        n = e.init,
                        (e.init = function (e) {
                            if ((e = (e = e instanceof ArrayBuffer ? new Uint8Array(e) : e) instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e) instanceof Uint8Array) {
                                for (var t = e.byteLength, r = [], i = 0; i < t; i++)
                                    r[i >>> 2] |= e[i] << 24 - i % 4 * 8;
                                n.call(this, r, t)
                            } else
                                n.apply(this, arguments)
                        }
                        ).prototype = e)
                }(),
                t.lib.WordArray)),
            Be
    }
    var Se, Re = {}, De = {
        get exports() {
            return Re
        },
        set exports(e) {
            Re = e
        }
    };
    function Te() {
        var e, n, t;
        return Se || (Se = 1,
            De.exports = (e = p(),
                n = e.lib.WordArray,
                (t = e.enc).Utf16 = t.Utf16BE = {
                    stringify: function (e) {
                        for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n += 2) {
                            var a = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                            i.push(String.fromCharCode(a))
                        }
                        return i.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, r = [], i = 0; i < t; i++)
                            r[i >>> 1] |= e.charCodeAt(i) << 16 - i % 2 * 16;
                        return n.create(r, 2 * t)
                    }
                },
                t.Utf16LE = {
                    stringify: function (e) {
                        for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n += 2) {
                            var a = o(t[n >>> 2] >>> 16 - n % 4 * 8 & 65535);
                            i.push(String.fromCharCode(a))
                        }
                        return i.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, r = [], i = 0; i < t; i++)
                            r[i >>> 1] |= o(e.charCodeAt(i) << 16 - i % 2 * 16);
                        return n.create(r, 2 * t)
                    }
                },
                e.enc.Utf16)),
            Re;
        function o(e) {
            return e << 8 & 4278255360 | e >>> 8 & 16711935
        }
    }
    var Oe, ke = {}, Ne = {
        get exports() {
            return ke
        },
        set exports(e) {
            ke = e
        }
    };
    function g() {
        var e, c;
        return Oe || (Oe = 1,
            Ne.exports = (e = p(),
                c = e.lib.WordArray,
                e.enc.Base64 = {
                    stringify: function (e) {
                        for (var t = e.words, r = e.sigBytes, i = this._map, n = (e.clamp(),
                            []), a = 0; a < r; a += 3)
                            for (var o = (t[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (t[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | t[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, s = 0; s < 4 && a + .75 * s < r; s++)
                                n.push(i.charAt(o >>> 6 * (3 - s) & 63));
                        var c = i.charAt(64);
                        if (c)
                            for (; n.length % 4;)
                                n.push(c);
                        return n.join("")
                    },
                    parse: function (e) {
                        var t = e.length
                            , r = this._map;
                        if (!(i = this._reverseMap))
                            for (var i = this._reverseMap = [], n = 0; n < r.length; n++)
                                i[r.charCodeAt(n)] = n;
                        var a = r.charAt(64);
                        return a && -1 !== (a = e.indexOf(a)) && (t = a),
                            o(e, t, i)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                },
                e.enc.Base64)),
            ke;
        function o(e, t, r) {
            for (var i, n, a = [], o = 0, s = 0; s < t; s++)
                s % 4 && (i = r[e.charCodeAt(s - 1)] << s % 4 * 2,
                    n = r[e.charCodeAt(s)] >>> 6 - s % 4 * 2,
                    a[o >>> 2] |= (i | n) << 24 - o % 4 * 8,
                    o++);
            return c.create(a, o)
        }
    }
    var Le = {}
        , Pe = {
            get exports() {
                return Le
            },
            set exports(e) {
                Le = e
            }
        };
    var Ce, He = {}, Fe = {
        get exports() {
            return He
        },
        set exports(e) {
            He = e
        }
    };
    function m() {
        return Ce || (Ce = 1,
            Fe.exports = function (e) {
                for (var l = Math, t = e, r = t.lib, i = r.WordArray, n = r.Hasher, a = t.algo, b = [], o = 0; o < 64; o++)
                    b[o] = l.abs(l.sin(o + 1)) * 4294967296 | 0;
                var s = a.MD5 = n.extend({
                    _doReset: function () {
                        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function (e, t) {
                        for (var r = 0; r < 16; r++) {
                            var i = t + r;
                            var n = e[i];
                            e[i] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360
                        }
                        var a = this._hash.words;
                        var o = e[t + 0];
                        var s = e[t + 1];
                        var c = e[t + 2];
                        var d = e[t + 3];
                        var l = e[t + 4];
                        var h = e[t + 5];
                        var f = e[t + 6];
                        var u = e[t + 7];
                        var _ = e[t + 8];
                        var v = e[t + 9];
                        var p = e[t + 10];
                        var g = e[t + 11];
                        var m = e[t + 12];
                        var y = e[t + 13];
                        var A = e[t + 14];
                        var w = e[t + 15];
                        var I = a[0];
                        var x = a[1];
                        var B = a[2];
                        var E = a[3];
                        I = S(I, x, B, E, o, 7, b[0]);
                        E = S(E, I, x, B, s, 12, b[1]);
                        B = S(B, E, I, x, c, 17, b[2]);
                        x = S(x, B, E, I, d, 22, b[3]);
                        I = S(I, x, B, E, l, 7, b[4]);
                        E = S(E, I, x, B, h, 12, b[5]);
                        B = S(B, E, I, x, f, 17, b[6]);
                        x = S(x, B, E, I, u, 22, b[7]);
                        I = S(I, x, B, E, _, 7, b[8]);
                        E = S(E, I, x, B, v, 12, b[9]);
                        B = S(B, E, I, x, p, 17, b[10]);
                        x = S(x, B, E, I, g, 22, b[11]);
                        I = S(I, x, B, E, m, 7, b[12]);
                        E = S(E, I, x, B, y, 12, b[13]);
                        B = S(B, E, I, x, A, 17, b[14]);
                        x = S(x, B, E, I, w, 22, b[15]);
                        I = R(I, x, B, E, s, 5, b[16]);
                        E = R(E, I, x, B, f, 9, b[17]);
                        B = R(B, E, I, x, g, 14, b[18]);
                        x = R(x, B, E, I, o, 20, b[19]);
                        I = R(I, x, B, E, h, 5, b[20]);
                        E = R(E, I, x, B, p, 9, b[21]);
                        B = R(B, E, I, x, w, 14, b[22]);
                        x = R(x, B, E, I, l, 20, b[23]);
                        I = R(I, x, B, E, v, 5, b[24]);
                        E = R(E, I, x, B, A, 9, b[25]);
                        B = R(B, E, I, x, d, 14, b[26]);
                        x = R(x, B, E, I, _, 20, b[27]);
                        I = R(I, x, B, E, y, 5, b[28]);
                        E = R(E, I, x, B, c, 9, b[29]);
                        B = R(B, E, I, x, u, 14, b[30]);
                        x = R(x, B, E, I, m, 20, b[31]);
                        I = D(I, x, B, E, h, 4, b[32]);
                        E = D(E, I, x, B, _, 11, b[33]);
                        B = D(B, E, I, x, g, 16, b[34]);
                        x = D(x, B, E, I, A, 23, b[35]);
                        I = D(I, x, B, E, s, 4, b[36]);
                        E = D(E, I, x, B, l, 11, b[37]);
                        B = D(B, E, I, x, u, 16, b[38]);
                        x = D(x, B, E, I, p, 23, b[39]);
                        I = D(I, x, B, E, y, 4, b[40]);
                        E = D(E, I, x, B, o, 11, b[41]);
                        B = D(B, E, I, x, d, 16, b[42]);
                        x = D(x, B, E, I, f, 23, b[43]);
                        I = D(I, x, B, E, v, 4, b[44]);
                        E = D(E, I, x, B, m, 11, b[45]);
                        B = D(B, E, I, x, w, 16, b[46]);
                        x = D(x, B, E, I, c, 23, b[47]);
                        I = T(I, x, B, E, o, 6, b[48]);
                        E = T(E, I, x, B, u, 10, b[49]);
                        B = T(B, E, I, x, A, 15, b[50]);
                        x = T(x, B, E, I, h, 21, b[51]);
                        I = T(I, x, B, E, m, 6, b[52]);
                        E = T(E, I, x, B, d, 10, b[53]);
                        B = T(B, E, I, x, p, 15, b[54]);
                        x = T(x, B, E, I, s, 21, b[55]);
                        I = T(I, x, B, E, _, 6, b[56]);
                        E = T(E, I, x, B, w, 10, b[57]);
                        B = T(B, E, I, x, f, 15, b[58]);
                        x = T(x, B, E, I, y, 21, b[59]);
                        I = T(I, x, B, E, l, 6, b[60]);
                        E = T(E, I, x, B, g, 10, b[61]);
                        B = T(B, E, I, x, c, 15, b[62]);
                        x = T(x, B, E, I, v, 21, b[63]);
                        a[0] = a[0] + I | 0;
                        a[1] = a[1] + x | 0;
                        a[2] = a[2] + B | 0;
                        a[3] = a[3] + E | 0
                    },
                    _doFinalize: function () {
                        var e = this._data;
                        var t = e.words;
                        var r = this._nDataBytes * 8;
                        var i = e.sigBytes * 8;
                        t[i >>> 5] |= 128 << 24 - i % 32;
                        var n = l.floor(r / 4294967296);
                        var a = r;
                        t[(i + 64 >>> 9 << 4) + 15] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360;
                        t[(i + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                        e.sigBytes = (t.length + 1) * 4;
                        this._process();
                        var o = this._hash;
                        var s = o.words;
                        for (var c = 0; c < 4; c++) {
                            var d = s[c];
                            s[c] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360
                        }
                        return o
                    },
                    clone: function () {
                        var e = n.clone.call(this);
                        e._hash = this._hash.clone();
                        return e
                    }
                });
                function S(e, t, r, i, n, a, o) {
                    var s = e + (t & r | ~t & i) + n + o;
                    return (s << a | s >>> 32 - a) + t
                }
                function R(e, t, r, i, n, a, o) {
                    var s = e + (t & i | r & ~i) + n + o;
                    return (s << a | s >>> 32 - a) + t
                }
                function D(e, t, r, i, n, a, o) {
                    var s = e + (t ^ r ^ i) + n + o;
                    return (s << a | s >>> 32 - a) + t
                }
                function T(e, t, r, i, n, a, o) {
                    var s = e + (r ^ (t | ~i)) + n + o;
                    return (s << a | s >>> 32 - a) + t
                }
                return t.MD5 = n._createHelper(s),
                    t.HmacMD5 = n._createHmacHelper(s),
                    e.MD5
            }(p())),
            He
    }
    var Me, ze = {}, Ge = {
        get exports() {
            return ze
        },
        set exports(e) {
            ze = e
        }
    };
    function We() {
        var e, t, r, i, l, n;
        return Me || (Me = 1,
            Ge.exports = (e = p(),
                n = (t = e).lib,
                r = n.WordArray,
                i = n.Hasher,
                n = t.algo,
                l = [],
                n = n.SHA1 = i.extend({
                    _doReset: function () {
                        this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function (e, t) {
                        for (var r = this._hash.words, i = r[0], n = r[1], a = r[2], o = r[3], s = r[4], c = 0; c < 80; c++) {
                            c < 16 ? l[c] = 0 | e[t + c] : (d = l[c - 3] ^ l[c - 8] ^ l[c - 14] ^ l[c - 16],
                                l[c] = d << 1 | d >>> 31);
                            var d = (i << 5 | i >>> 27) + s + l[c];
                            d += c < 20 ? 1518500249 + (n & a | ~n & o) : c < 40 ? 1859775393 + (n ^ a ^ o) : c < 60 ? (n & a | n & o | a & o) - 1894007588 : (n ^ a ^ o) - 899497514,
                                s = o,
                                o = a,
                                a = n << 30 | n >>> 2,
                                n = i,
                                i = d
                        }
                        r[0] = r[0] + i | 0,
                            r[1] = r[1] + n | 0,
                            r[2] = r[2] + a | 0,
                            r[3] = r[3] + o | 0,
                            r[4] = r[4] + s | 0
                    },
                    _doFinalize: function () {
                        var e = this._data
                            , t = e.words
                            , r = 8 * this._nDataBytes
                            , i = 8 * e.sigBytes;
                        return t[i >>> 5] |= 128 << 24 - i % 32,
                            t[14 + (64 + i >>> 9 << 4)] = Math.floor(r / 4294967296),
                            t[15 + (64 + i >>> 9 << 4)] = r,
                            e.sigBytes = 4 * t.length,
                            this._process(),
                            this._hash
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        return e._hash = this._hash.clone(),
                            e
                    }
                }),
                t.SHA1 = i._createHelper(n),
                t.HmacSHA1 = i._createHmacHelper(n),
                e.SHA1)),
            ze
    }
    var Ve, je = {}, Ue = {
        get exports() {
            return je
        },
        set exports(e) {
            je = e
        }
    };
    function qe() {
        return Ve || (Ve = 1,
            Ue.exports = function (e) {
                var n = Math
                    , t = e
                    , r = t.lib
                    , i = r.WordArray
                    , a = r.Hasher
                    , o = t.algo
                    , s = []
                    , I = [];
                function c(e) {
                    var t = n.sqrt(e);
                    for (var r = 2; r <= t; r++)
                        if (!(e % r))
                            return false;
                    return true
                }
                function d(e) {
                    return (e - (e | 0)) * 4294967296 | 0
                }
                var l = 2
                    , h = 0;
                while (h < 64) {
                    if (c(l)) {
                        if (h < 8)
                            s[h] = d(n.pow(l, 1 / 2));
                        I[h] = d(n.pow(l, 1 / 3));
                        h++
                    }
                    l++
                }
                var x = []
                    , f = o.SHA256 = a.extend({
                        _doReset: function () {
                            this._hash = new i.init(s.slice(0))
                        },
                        _doProcessBlock: function (e, t) {
                            var r = this._hash.words;
                            var i = r[0];
                            var n = r[1];
                            var a = r[2];
                            var o = r[3];
                            var s = r[4];
                            var c = r[5];
                            var d = r[6];
                            var l = r[7];
                            for (var h = 0; h < 64; h++) {
                                if (h < 16)
                                    x[h] = e[t + h] | 0;
                                else {
                                    var f = x[h - 15];
                                    var u = (f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3;
                                    var _ = x[h - 2];
                                    var v = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
                                    x[h] = u + x[h - 7] + v + x[h - 16]
                                }
                                var p = s & c ^ ~s & d;
                                var g = i & n ^ i & a ^ n & a;
                                var m = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22);
                                var y = (s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25);
                                var A = l + y + p + I[h] + x[h];
                                var w = m + g;
                                l = d;
                                d = c;
                                c = s;
                                s = o + A | 0;
                                o = a;
                                a = n;
                                n = i;
                                i = A + w | 0
                            }
                            r[0] = r[0] + i | 0;
                            r[1] = r[1] + n | 0;
                            r[2] = r[2] + a | 0;
                            r[3] = r[3] + o | 0;
                            r[4] = r[4] + s | 0;
                            r[5] = r[5] + c | 0;
                            r[6] = r[6] + d | 0;
                            r[7] = r[7] + l | 0
                        },
                        _doFinalize: function () {
                            var e = this._data;
                            var t = e.words;
                            var r = this._nDataBytes * 8;
                            var i = e.sigBytes * 8;
                            t[i >>> 5] |= 128 << 24 - i % 32;
                            t[(i + 64 >>> 9 << 4) + 14] = n.floor(r / 4294967296);
                            t[(i + 64 >>> 9 << 4) + 15] = r;
                            e.sigBytes = t.length * 4;
                            this._process();
                            return this._hash
                        },
                        clone: function () {
                            var e = a.clone.call(this);
                            e._hash = this._hash.clone();
                            return e
                        }
                    });
                return t.SHA256 = a._createHelper(f),
                    t.HmacSHA256 = a._createHmacHelper(f),
                    e.SHA256
            }(p())),
            je
    }
    var Ye = {}
        , Ke = {
            get exports() {
                return Ye
            },
            set exports(e) {
                Ye = e
            }
        };
    var Xe, $e = {}, Je = {
        get exports() {
            return $e
        },
        set exports(e) {
            $e = e
        }
    };
    function Ze() {
        return Xe || (Xe = 1,
            Je.exports = function (e) {
                var t = e, r, i = t.lib.Hasher, n = t.x64, a = n.Word, o = n.WordArray, s = t.algo;
                function c() {
                    return a.create.apply(a, arguments)
                }
                for (var Be = [c(1116352408, 3609767458), c(1899447441, 602891725), c(3049323471, 3964484399), c(3921009573, 2173295548), c(961987163, 4081628472), c(1508970993, 3053834265), c(2453635748, 2937671579), c(2870763221, 3664609560), c(3624381080, 2734883394), c(310598401, 1164996542), c(607225278, 1323610764), c(1426881987, 3590304994), c(1925078388, 4068182383), c(2162078206, 991336113), c(2614888103, 633803317), c(3248222580, 3479774868), c(3835390401, 2666613458), c(4022224774, 944711139), c(264347078, 2341262773), c(604807628, 2007800933), c(770255983, 1495990901), c(1249150122, 1856431235), c(1555081692, 3175218132), c(1996064986, 2198950837), c(2554220882, 3999719339), c(2821834349, 766784016), c(2952996808, 2566594879), c(3210313671, 3203337956), c(3336571891, 1034457026), c(3584528711, 2466948901), c(113926993, 3758326383), c(338241895, 168717936), c(666307205, 1188179964), c(773529912, 1546045734), c(1294757372, 1522805485), c(1396182291, 2643833823), c(1695183700, 2343527390), c(1986661051, 1014477480), c(2177026350, 1206759142), c(2456956037, 344077627), c(2730485921, 1290863460), c(2820302411, 3158454273), c(3259730800, 3505952657), c(3345764771, 106217008), c(3516065817, 3606008344), c(3600352804, 1432725776), c(4094571909, 1467031594), c(275423344, 851169720), c(430227734, 3100823752), c(506948616, 1363258195), c(659060556, 3750685593), c(883997877, 3785050280), c(958139571, 3318307427), c(1322822218, 3812723403), c(1537002063, 2003034995), c(1747873779, 3602036899), c(1955562222, 1575990012), c(2024104815, 1125592928), c(2227730452, 2716904306), c(2361852424, 442776044), c(2428436474, 593698344), c(2756734187, 3733110249), c(3204031479, 2999351573), c(3329325298, 3815920427), c(3391569614, 3928383900), c(3515267271, 566280711), c(3940187606, 3454069534), c(4118630271, 4000239992), c(116418474, 1914138554), c(174292421, 2731055270), c(289380356, 3203993006), c(460393269, 320620315), c(685471733, 587496836), c(852142971, 1086792851), c(1017036298, 365543100), c(1126000580, 2618297676), c(1288033470, 3409855158), c(1501505948, 4234509866), c(1607167915, 987167468), c(1816402316, 1246189591)], Ee = [], d = 0; d < 80; d++)
                    Ee[d] = c();
                var l = s.SHA512 = i.extend({
                    _doReset: function () {
                        this._hash = new o.init([new a.init(1779033703, 4089235720), new a.init(3144134277, 2227873595), new a.init(1013904242, 4271175723), new a.init(2773480762, 1595750129), new a.init(1359893119, 2917565137), new a.init(2600822924, 725511199), new a.init(528734635, 4215389547), new a.init(1541459225, 327033209)])
                    },
                    _doProcessBlock: function (C, H) {
                        var e = this._hash.words;
                        var t = e[0];
                        var r = e[1];
                        var i = e[2];
                        var n = e[3];
                        var a = e[4];
                        var o = e[5];
                        var s = e[6];
                        var c = e[7];
                        var F = t.high;
                        var d = t.low;
                        var M = r.high;
                        var l = r.low;
                        var z = i.high;
                        var h = i.low;
                        var G = n.high;
                        var f = n.low;
                        var W = a.high;
                        var u = a.low;
                        var V = o.high;
                        var _ = o.low;
                        var j = s.high;
                        var U = s.low;
                        var q = c.high;
                        var Y = c.low;
                        var v = F;
                        var p = d;
                        var g = M;
                        var m = l;
                        var y = z;
                        var A = h;
                        var K = G;
                        var w = f;
                        var I = W;
                        var x = u;
                        var X = V;
                        var B = _;
                        var $ = j;
                        var E = U;
                        var J = q;
                        var b = Y;
                        for (var S = 0; S < 80; S++) {
                            var R;
                            var D;
                            var Z = Ee[S];
                            if (S < 16) {
                                D = Z.high = C[H + S * 2] | 0;
                                R = Z.low = C[H + S * 2 + 1] | 0
                            } else {
                                var Q = Ee[S - 15];
                                var T = Q.high;
                                var O = Q.low;
                                var ee = (T >>> 1 | O << 31) ^ (T >>> 8 | O << 24) ^ T >>> 7;
                                var te = (O >>> 1 | T << 31) ^ (O >>> 8 | T << 24) ^ (O >>> 7 | T << 25);
                                var re = Ee[S - 2];
                                var k = re.high;
                                var N = re.low;
                                var ie = (k >>> 19 | N << 13) ^ (k << 3 | N >>> 29) ^ k >>> 6;
                                var ne = (N >>> 19 | k << 13) ^ (N << 3 | k >>> 29) ^ (N >>> 6 | k << 26);
                                var ae = Ee[S - 7];
                                var oe = ae.high;
                                var se = ae.low;
                                var ce = Ee[S - 16];
                                var de = ce.high;
                                var le = ce.low;
                                R = te + se;
                                D = ee + oe + (R >>> 0 < te >>> 0 ? 1 : 0);
                                R = R + ne;
                                D = D + ie + (R >>> 0 < ne >>> 0 ? 1 : 0);
                                R = R + le;
                                D = D + de + (R >>> 0 < le >>> 0 ? 1 : 0);
                                Z.high = D;
                                Z.low = R
                            }
                            var he = I & X ^ ~I & $;
                            var fe = x & B ^ ~x & E;
                            var ue = v & g ^ v & y ^ g & y;
                            var _e = p & m ^ p & A ^ m & A;
                            var ve = (v >>> 28 | p << 4) ^ (v << 30 | p >>> 2) ^ (v << 25 | p >>> 7);
                            var pe = (p >>> 28 | v << 4) ^ (p << 30 | v >>> 2) ^ (p << 25 | v >>> 7);
                            var ge = (I >>> 14 | x << 18) ^ (I >>> 18 | x << 14) ^ (I << 23 | x >>> 9);
                            var me = (x >>> 14 | I << 18) ^ (x >>> 18 | I << 14) ^ (x << 23 | I >>> 9);
                            var ye = Be[S];
                            var Ae = ye.high;
                            var we = ye.low;
                            var L = b + me;
                            var P = J + ge + (L >>> 0 < b >>> 0 ? 1 : 0);
                            var L = L + fe;
                            var P = P + he + (L >>> 0 < fe >>> 0 ? 1 : 0);
                            var L = L + we;
                            var P = P + Ae + (L >>> 0 < we >>> 0 ? 1 : 0);
                            var L = L + R;
                            var P = P + D + (L >>> 0 < R >>> 0 ? 1 : 0);
                            var Ie = pe + _e;
                            var xe = ve + ue + (Ie >>> 0 < pe >>> 0 ? 1 : 0);
                            J = $;
                            b = E;
                            $ = X;
                            E = B;
                            X = I;
                            B = x;
                            x = w + L | 0;
                            I = K + P + (x >>> 0 < w >>> 0 ? 1 : 0) | 0;
                            K = y;
                            w = A;
                            y = g;
                            A = m;
                            g = v;
                            m = p;
                            p = L + Ie | 0;
                            v = P + xe + (p >>> 0 < L >>> 0 ? 1 : 0) | 0
                        }
                        d = t.low = d + p;
                        t.high = F + v + (d >>> 0 < p >>> 0 ? 1 : 0);
                        l = r.low = l + m;
                        r.high = M + g + (l >>> 0 < m >>> 0 ? 1 : 0);
                        h = i.low = h + A;
                        i.high = z + y + (h >>> 0 < A >>> 0 ? 1 : 0);
                        f = n.low = f + w;
                        n.high = G + K + (f >>> 0 < w >>> 0 ? 1 : 0);
                        u = a.low = u + x;
                        a.high = W + I + (u >>> 0 < x >>> 0 ? 1 : 0);
                        _ = o.low = _ + B;
                        o.high = V + X + (_ >>> 0 < B >>> 0 ? 1 : 0);
                        U = s.low = U + E;
                        s.high = j + $ + (U >>> 0 < E >>> 0 ? 1 : 0);
                        Y = c.low = Y + b;
                        c.high = q + J + (Y >>> 0 < b >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function () {
                        var e = this._data;
                        var t = e.words;
                        var r = this._nDataBytes * 8;
                        var i = e.sigBytes * 8;
                        t[i >>> 5] |= 128 << 24 - i % 32;
                        t[(i + 128 >>> 10 << 5) + 30] = Math.floor(r / 4294967296);
                        t[(i + 128 >>> 10 << 5) + 31] = r;
                        e.sigBytes = t.length * 4;
                        this._process();
                        var n = this._hash.toX32();
                        return n
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        e._hash = this._hash.clone();
                        return e
                    },
                    blockSize: 1024 / 32
                });
                return t.SHA512 = i._createHelper(l),
                    t.HmacSHA512 = i._createHmacHelper(l),
                    e.SHA512
            }(p(), Ie())),
            $e
    }
    var Qe = {}
        , et = {
            get exports() {
                return Qe
            },
            set exports(e) {
                Qe = e
            }
        };
    var tt, rt = {}, it = {
        get exports() {
            return rt
        },
        set exports(e) {
            rt = e
        }
    };
    function nt() {
        return tt || (tt = 1,
            it.exports = function (e) {
                for (var f = Math, t = e, r = t.lib, u = r.WordArray, i = r.Hasher, n, a = t.x64.Word, o = t.algo, D = [], T = [], O = [], s = 1, c = 0, d = 0; d < 24; d++) {
                    D[s + 5 * c] = (d + 1) * (d + 2) / 2 % 64;
                    var l = c % 5;
                    var h = (2 * s + 3 * c) % 5;
                    s = l;
                    c = h
                }
                for (var s = 0; s < 5; s++)
                    for (var c = 0; c < 5; c++)
                        T[s + 5 * c] = c + (2 * s + 3 * c) % 5 * 5;
                for (var _ = 1, v = 0; v < 24; v++) {
                    var p = 0;
                    var g = 0;
                    for (var m = 0; m < 7; m++) {
                        if (_ & 1) {
                            var y = (1 << m) - 1;
                            if (y < 32)
                                g ^= 1 << y;
                            else
                                p ^= 1 << y - 32
                        }
                        if (_ & 128)
                            _ = _ << 1 ^ 113;
                        else
                            _ <<= 1
                    }
                    O[v] = a.create(p, g)
                }
                for (var k = [], A = 0; A < 25; A++)
                    k[A] = a.create();
                var w = o.SHA3 = i.extend({
                    cfg: i.cfg.extend({
                        outputLength: 512
                    }),
                    _doReset: function () {
                        var e = this._state = [];
                        for (var t = 0; t < 25; t++)
                            e[t] = new a.init;
                        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                    },
                    _doProcessBlock: function (e, t) {
                        var r = this._state;
                        var i = this.blockSize / 2;
                        for (var n = 0; n < i; n++) {
                            var a = e[t + 2 * n];
                            var o = e[t + 2 * n + 1];
                            a = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                            o = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360;
                            var s = r[n];
                            s.high ^= o;
                            s.low ^= a
                        }
                        for (var c = 0; c < 24; c++) {
                            for (var d = 0; d < 5; d++) {
                                var l = 0
                                    , h = 0;
                                for (var f = 0; f < 5; f++) {
                                    var s = r[d + 5 * f];
                                    l ^= s.high;
                                    h ^= s.low
                                }
                                var u = k[d];
                                u.high = l;
                                u.low = h
                            }
                            for (var d = 0; d < 5; d++) {
                                var _ = k[(d + 4) % 5];
                                var v = k[(d + 1) % 5];
                                var p = v.high;
                                var g = v.low;
                                var l = _.high ^ (p << 1 | g >>> 31);
                                var h = _.low ^ (g << 1 | p >>> 31);
                                for (var f = 0; f < 5; f++) {
                                    var s = r[d + 5 * f];
                                    s.high ^= l;
                                    s.low ^= h
                                }
                            }
                            for (var m = 1; m < 25; m++) {
                                var l;
                                var h;
                                var s = r[m];
                                var y = s.high;
                                var A = s.low;
                                var w = D[m];
                                if (w < 32) {
                                    l = y << w | A >>> 32 - w;
                                    h = A << w | y >>> 32 - w
                                } else {
                                    l = A << w - 32 | y >>> 64 - w;
                                    h = y << w - 32 | A >>> 64 - w
                                }
                                var I = k[T[m]];
                                I.high = l;
                                I.low = h
                            }
                            var x = k[0];
                            var B = r[0];
                            x.high = B.high;
                            x.low = B.low;
                            for (var d = 0; d < 5; d++)
                                for (var f = 0; f < 5; f++) {
                                    var m = d + 5 * f;
                                    var s = r[m];
                                    var E = k[m];
                                    var b = k[(d + 1) % 5 + 5 * f];
                                    var S = k[(d + 2) % 5 + 5 * f];
                                    s.high = E.high ^ ~b.high & S.high;
                                    s.low = E.low ^ ~b.low & S.low
                                }
                            var s = r[0];
                            var R = O[c];
                            s.high ^= R.high;
                            s.low ^= R.low
                        }
                    },
                    _doFinalize: function () {
                        var e = this._data;
                        var t = e.words;
                        this._nDataBytes * 8;
                        var r = e.sigBytes * 8;
                        var i = this.blockSize * 32;
                        t[r >>> 5] |= 1 << 24 - r % 32;
                        t[(f.ceil((r + 1) / i) * i >>> 5) - 1] |= 128;
                        e.sigBytes = t.length * 4;
                        this._process();
                        var n = this._state;
                        var a = this.cfg.outputLength / 8;
                        var o = a / 8;
                        var s = [];
                        for (var c = 0; c < o; c++) {
                            var d = n[c];
                            var l = d.high;
                            var h = d.low;
                            l = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
                            h = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
                            s.push(h);
                            s.push(l)
                        }
                        return new u.init(s, a)
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        var t = e._state = this._state.slice(0);
                        for (var r = 0; r < 25; r++)
                            t[r] = t[r].clone();
                        return e
                    }
                });
                return t.SHA3 = i._createHelper(w),
                    t.HmacSHA3 = i._createHmacHelper(w),
                    e.SHA3
            }(p(), Ie())),
            rt
    }
    var at, ot = {}, st = {
        get exports() {
            return ot
        },
        set exports(e) {
            ot = e
        }
    };
    var ct, dt = {}, lt = {
        get exports() {
            return dt
        },
        set exports(e) {
            dt = e
        }
    };
    function ht() {
        var e, t, s;
        return ct || (ct = 1,
            lt.exports = (e = p(),
                t = e.lib.Base,
                s = e.enc.Utf8,
                void (e.algo.HMAC = t.extend({
                    init: function (e, t) {
                        e = this._hasher = new e.init,
                            "string" == typeof t && (t = s.parse(t));
                        for (var r = e.blockSize, i = 4 * r, e = ((t = t.sigBytes > i ? e.finalize(t) : t).clamp(),
                            this._oKey = t.clone()), t = this._iKey = t.clone(), n = e.words, a = t.words, o = 0; o < r; o++)
                            n[o] ^= 1549556828,
                                a[o] ^= 909522486;
                        e.sigBytes = t.sigBytes = i,
                            this.reset()
                    },
                    reset: function () {
                        var e = this._hasher;
                        e.reset(),
                            e.update(this._iKey)
                    },
                    update: function (e) {
                        return this._hasher.update(e),
                            this
                    },
                    finalize: function (e) {
                        var t = this._hasher
                            , e = t.finalize(e);
                        return t.reset(),
                            t.finalize(this._oKey.clone().concat(e))
                    }
                })))),
            dt
    }
    var ft, ut = {}, _t = {
        get exports() {
            return ut
        },
        set exports(e) {
            ut = e
        }
    };
    var vt, pt = {}, gt = {
        get exports() {
            return pt
        },
        set exports(e) {
            pt = e
        }
    };
    function y() {
        var e, t, r, l, i, n, a;
        return vt || (vt = 1,
            gt.exports = (e = p(),
                We(),
                ht(),
                i = (t = e).lib,
                r = i.Base,
                l = i.WordArray,
                i = t.algo,
                n = i.MD5,
                a = i.EvpKDF = r.extend({
                    cfg: r.extend({
                        keySize: 4,
                        hasher: n,
                        iterations: 1
                    }),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e)
                    },
                    compute: function (e, t) {
                        for (var r, i = this.cfg, n = i.hasher.create(), a = l.create(), o = a.words, s = i.keySize, c = i.iterations; o.length < s;) {
                            r && n.update(r),
                                r = n.update(e).finalize(t),
                                n.reset();
                            for (var d = 1; d < c; d++)
                                r = n.finalize(r),
                                    n.reset();
                            a.concat(r)
                        }
                        return a.sigBytes = 4 * s,
                            a
                    }
                }),
                t.EvpKDF = function (e, t, r) {
                    return a.create(r).compute(e, t)
                }
                ,
                e.EvpKDF)),
            pt
    }
    var mt, yt = {}, At = {
        get exports() {
            return yt
        },
        set exports(e) {
            yt = e
        }
    };
    function A() {
        var o, e, t, r, s, i, n, a, c, d, l, h, f, u, _;
        return mt || (mt = 1,
            At.exports = (e = p(),
                y(),
                void (e.lib.Cipher || (o = void 0,
                    t = (e = e).lib,
                    r = t.Base,
                    s = t.WordArray,
                    i = t.BufferedBlockAlgorithm,
                    (h = e.enc).Utf8,
                    n = h.Base64,
                    a = e.algo.EvpKDF,
                    c = t.Cipher = i.extend({
                        cfg: r.extend(),
                        createEncryptor: function (e, t) {
                            return this.create(this._ENC_XFORM_MODE, e, t)
                        },
                        createDecryptor: function (e, t) {
                            return this.create(this._DEC_XFORM_MODE, e, t)
                        },
                        init: function (e, t, r) {
                            this.cfg = this.cfg.extend(r),
                                this._xformMode = e,
                                this._key = t,
                                this.reset()
                        },
                        reset: function () {
                            i.reset.call(this),
                                this._doReset()
                        },
                        process: function (e) {
                            return this._append(e),
                                this._process()
                        },
                        finalize: function (e) {
                            return e && this._append(e),
                                this._doFinalize()
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function () {
                            function n(e) {
                                return "string" == typeof e ? _ : f
                            }
                            return function (i) {
                                return {
                                    encrypt: function (e, t, r) {
                                        return n(t).encrypt(i, e, t, r)
                                    },
                                    decrypt: function (e, t, r) {
                                        return n(t).decrypt(i, e, t, r)
                                    }
                                }
                            }
                        }()
                    }),
                    t.StreamCipher = c.extend({
                        _doFinalize: function () {
                            return this._process(!0)
                        },
                        blockSize: 1
                    }),
                    h = e.mode = {},
                    d = t.BlockCipherMode = r.extend({
                        createEncryptor: function (e, t) {
                            return this.Encryptor.create(e, t)
                        },
                        createDecryptor: function (e, t) {
                            return this.Decryptor.create(e, t)
                        },
                        init: function (e, t) {
                            this._cipher = e,
                                this._iv = t
                        }
                    }),
                    h = h.CBC = function () {
                        var e = d.extend();
                        function a(e, t, r) {
                            var i, n = this._iv;
                            n ? (i = n,
                                this._iv = o) : i = this._prevBlock;
                            for (var a = 0; a < r; a++)
                                e[t + a] ^= i[a]
                        }
                        return e.Encryptor = e.extend({
                            processBlock: function (e, t) {
                                var r = this._cipher
                                    , i = r.blockSize;
                                a.call(this, e, t, i),
                                    r.encryptBlock(e, t),
                                    this._prevBlock = e.slice(t, t + i)
                            }
                        }),
                            e.Decryptor = e.extend({
                                processBlock: function (e, t) {
                                    var r = this._cipher
                                        , i = r.blockSize
                                        , n = e.slice(t, t + i);
                                    r.decryptBlock(e, t),
                                        a.call(this, e, t, i),
                                        this._prevBlock = n
                                }
                            }),
                            e
                    }(),
                    u = (e.pad = {}).Pkcs7 = {
                        pad: function (e, t) {
                            for (var t = 4 * t, r = t - e.sigBytes % t, i = r << 24 | r << 16 | r << 8 | r, n = [], a = 0; a < r; a += 4)
                                n.push(i);
                            t = s.create(n, r);
                            e.concat(t)
                        },
                        unpad: function (e) {
                            var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                            e.sigBytes -= t
                        }
                    },
                    t.BlockCipher = c.extend({
                        cfg: c.cfg.extend({
                            mode: h,
                            padding: u
                        }),
                        reset: function () {
                            c.reset.call(this);
                            var e, t = this.cfg, r = t.iv, t = t.mode;
                            this._xformMode == this._ENC_XFORM_MODE ? e = t.createEncryptor : (e = t.createDecryptor,
                                this._minBufferSize = 1),
                                this._mode && this._mode.__creator == e ? this._mode.init(this, r && r.words) : (this._mode = e.call(t, this, r && r.words),
                                    this._mode.__creator = e)
                        },
                        _doProcessBlock: function (e, t) {
                            this._mode.processBlock(e, t)
                        },
                        _doFinalize: function () {
                            var e, t = this.cfg.padding;
                            return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize),
                                e = this._process(!0)) : (e = this._process(!0),
                                    t.unpad(e)),
                                e
                        },
                        blockSize: 4
                    }),
                    l = t.CipherParams = r.extend({
                        init: function (e) {
                            this.mixIn(e)
                        },
                        toString: function (e) {
                            return (e || this.formatter).stringify(this)
                        }
                    }),
                    h = (e.format = {}).OpenSSL = {
                        stringify: function (e) {
                            var t = e.ciphertext
                                , e = e.salt
                                , e = e ? s.create([1398893684, 1701076831]).concat(e).concat(t) : t;
                            return e.toString(n)
                        },
                        parse: function (e) {
                            var t, e = n.parse(e), r = e.words;
                            return 1398893684 == r[0] && 1701076831 == r[1] && (t = s.create(r.slice(2, 4)),
                                r.splice(0, 4),
                                e.sigBytes -= 16),
                                l.create({
                                    ciphertext: e,
                                    salt: t
                                })
                        }
                    },
                    f = t.SerializableCipher = r.extend({
                        cfg: r.extend({
                            format: h
                        }),
                        encrypt: function (e, t, r, i) {
                            i = this.cfg.extend(i);
                            var n = e.createEncryptor(r, i)
                                , t = n.finalize(t)
                                , n = n.cfg;
                            return l.create({
                                ciphertext: t,
                                key: r,
                                iv: n.iv,
                                algorithm: e,
                                mode: n.mode,
                                padding: n.padding,
                                blockSize: e.blockSize,
                                formatter: i.format
                            })
                        },
                        decrypt: function (e, t, r, i) {
                            return i = this.cfg.extend(i),
                                t = this._parse(t, i.format),
                                e.createDecryptor(r, i).finalize(t.ciphertext)
                        },
                        _parse: function (e, t) {
                            return "string" == typeof e ? t.parse(e, this) : e
                        }
                    }),
                    u = (e.kdf = {}).OpenSSL = {
                        execute: function (e, t, r, i) {
                            i = i || s.random(8);
                            e = a.create({
                                keySize: t + r
                            }).compute(e, i),
                                r = s.create(e.words.slice(t), 4 * r);
                            return e.sigBytes = 4 * t,
                                l.create({
                                    key: e,
                                    iv: r,
                                    salt: i
                                })
                        }
                    },
                    _ = t.PasswordBasedCipher = f.extend({
                        cfg: f.cfg.extend({
                            kdf: u
                        }),
                        encrypt: function (e, t, r, i) {
                            r = (i = this.cfg.extend(i)).kdf.execute(r, e.keySize, e.ivSize),
                                i.iv = r.iv,
                                e = f.encrypt.call(this, e, t, r.key, i);
                            return e.mixIn(r),
                                e
                        },
                        decrypt: function (e, t, r, i) {
                            i = this.cfg.extend(i),
                                t = this._parse(t, i.format);
                            r = i.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                            return i.iv = r.iv,
                                f.decrypt.call(this, e, t, r.key, i)
                        }
                    }))))),
            yt
    }
    var wt, It = {}, xt = {
        get exports() {
            return It
        },
        set exports(e) {
            It = e
        }
    };
    function Bt() {
        var t;
        return wt || (wt = 1,
            xt.exports = (t = p(),
                A(),
                t.mode.CFB = function () {
                    var e = t.lib.BlockCipherMode.extend();
                    function a(e, t, r, i) {
                        var n, a = this._iv;
                        a ? (n = a.slice(0),
                            this._iv = void 0) : n = this._prevBlock,
                            i.encryptBlock(n, 0);
                        for (var o = 0; o < r; o++)
                            e[t + o] ^= n[o]
                    }
                    return e.Encryptor = e.extend({
                        processBlock: function (e, t) {
                            var r = this._cipher
                                , i = r.blockSize;
                            a.call(this, e, t, i, r),
                                this._prevBlock = e.slice(t, t + i)
                        }
                    }),
                        e.Decryptor = e.extend({
                            processBlock: function (e, t) {
                                var r = this._cipher
                                    , i = r.blockSize
                                    , n = e.slice(t, t + i);
                                a.call(this, e, t, i, r),
                                    this._prevBlock = n
                            }
                        }),
                        e
                }(),
                t.mode.CFB)),
            It
    }
    var Et, bt = {}, St = {
        get exports() {
            return bt
        },
        set exports(e) {
            bt = e
        }
    };
    function Rt() {
        var r;
        return Et || (Et = 1,
            St.exports = (r = p(),
                A(),
                r.mode.CTR = function () {
                    var e = r.lib.BlockCipherMode.extend()
                        , t = e.Encryptor = e.extend({
                            processBlock: function (e, t) {
                                var r = this._cipher
                                    , i = r.blockSize
                                    , n = this._iv
                                    , a = this._counter
                                    , o = (n && (a = this._counter = n.slice(0),
                                        this._iv = void 0),
                                        a.slice(0));
                                r.encryptBlock(o, 0),
                                    a[i - 1] = a[i - 1] + 1 | 0;
                                for (var s = 0; s < i; s++)
                                    e[t + s] ^= o[s]
                            }
                        });
                    return e.Decryptor = t,
                        e
                }(),
                r.mode.CTR)),
            bt
    }
    var Dt, Tt = {}, Ot = {
        get exports() {
            return Tt
        },
        set exports(e) {
            Tt = e
        }
    };
    function kt() {
        var r;
        return Dt || (Dt = 1,
            Ot.exports = (r = p(),
                A(),
                r.mode.CTRGladman = function () {
                    var e = r.lib.BlockCipherMode.extend();
                    function c(e) {
                        var t, r, i;
                        return 255 == (e >> 24 & 255) ? (r = e >> 8 & 255,
                            i = 255 & e,
                            255 === (t = e >> 16 & 255) ? (t = 0,
                                255 === r ? (r = 0,
                                    255 === i ? i = 0 : ++i) : ++r) : ++t,
                            e = 0,
                            e = (e += t << 16) + (r << 8) + i) : e += 1 << 24,
                            e
                    }
                    var t = e.Encryptor = e.extend({
                        processBlock: function (e, t) {
                            var r = this._cipher
                                , i = r.blockSize
                                , n = this._iv
                                , a = this._counter
                                , o = (n && (a = this._counter = n.slice(0),
                                    this._iv = void 0),
                                    0 === ((n = a)[0] = c(n[0])) && (n[1] = c(n[1])),
                                    a.slice(0));
                            r.encryptBlock(o, 0);
                            for (var s = 0; s < i; s++)
                                e[t + s] ^= o[s]
                        }
                    });
                    return e.Decryptor = t,
                        e
                }(),
                r.mode.CTRGladman)),
            Tt
    }
    var Nt, Lt = {}, Pt = {
        get exports() {
            return Lt
        },
        set exports(e) {
            Lt = e
        }
    };
    function Ct() {
        var r;
        return Nt || (Nt = 1,
            Pt.exports = (r = p(),
                A(),
                r.mode.OFB = function () {
                    var e = r.lib.BlockCipherMode.extend()
                        , t = e.Encryptor = e.extend({
                            processBlock: function (e, t) {
                                var r = this._cipher
                                    , i = r.blockSize
                                    , n = this._iv
                                    , a = this._keystream;
                                n && (a = this._keystream = n.slice(0),
                                    this._iv = void 0),
                                    r.encryptBlock(a, 0);
                                for (var o = 0; o < i; o++)
                                    e[t + o] ^= a[o]
                            }
                        });
                    return e.Decryptor = t,
                        e
                }(),
                r.mode.OFB)),
            Lt
    }
    var Ht, Ft = {}, Mt = {
        get exports() {
            return Ft
        },
        set exports(e) {
            Ft = e
        }
    };
    var zt, Gt = {}, Wt = {
        get exports() {
            return Gt
        },
        set exports(e) {
            Gt = e
        }
    };
    var Vt, jt = {}, Ut = {
        get exports() {
            return jt
        },
        set exports(e) {
            jt = e
        }
    };
    var qt, Yt = {}, Kt = {
        get exports() {
            return Yt
        },
        set exports(e) {
            Yt = e
        }
    };
    var Xt, $t = {}, Jt = {
        get exports() {
            return $t
        },
        set exports(e) {
            $t = e
        }
    };
    var Zt, Qt = {}, er = {
        get exports() {
            return Qt
        },
        set exports(e) {
            Qt = e
        }
    };
    var tr, rr = {}, ir = {
        get exports() {
            return rr
        },
        set exports(e) {
            rr = e
        }
    };
    var nr, ar = {}, or = {
        get exports() {
            return ar
        },
        set exports(e) {
            ar = e
        }
    };
    function sr() {
        return nr || (nr = 1,
            or.exports = function (e) {
                for (var t = e, r, i = t.lib.BlockCipher, n = t.algo, l = [], a = [], o = [], s = [], c = [], d = [], h = [], f = [], u = [], _ = [], v = [], p = 0; p < 256; p++)
                    if (p < 128)
                        v[p] = p << 1;
                    else
                        v[p] = p << 1 ^ 283;
                for (var g = 0, m = 0, p = 0; p < 256; p++) {
                    var y = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4;
                    y = y >>> 8 ^ y & 255 ^ 99;
                    l[g] = y;
                    a[y] = g;
                    var A = v[g];
                    var w = v[A];
                    var I = v[w];
                    var x = v[y] * 257 ^ y * 16843008;
                    o[g] = x << 24 | x >>> 8;
                    s[g] = x << 16 | x >>> 16;
                    c[g] = x << 8 | x >>> 24;
                    d[g] = x;
                    var x = I * 16843009 ^ w * 65537 ^ A * 257 ^ g * 16843008;
                    h[y] = x << 24 | x >>> 8;
                    f[y] = x << 16 | x >>> 16;
                    u[y] = x << 8 | x >>> 24;
                    _[y] = x;
                    if (!g)
                        g = m = 1;
                    else {
                        g = A ^ v[v[v[I ^ A]]];
                        m ^= v[v[m]]
                    }
                }
                var B = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                    , E = n.AES = i.extend({
                        _doReset: function () {
                            var e;
                            if (this._nRounds && this._keyPriorReset === this._key)
                                return;
                            var t = this._keyPriorReset = this._key;
                            var r = t.words;
                            var i = t.sigBytes / 4;
                            var n = this._nRounds = i + 6;
                            var a = (n + 1) * 4;
                            var o = this._keySchedule = [];
                            for (var s = 0; s < a; s++)
                                if (s < i)
                                    o[s] = r[s];
                                else {
                                    e = o[s - 1];
                                    if (!(s % i)) {
                                        e = e << 8 | e >>> 24;
                                        e = l[e >>> 24] << 24 | l[e >>> 16 & 255] << 16 | l[e >>> 8 & 255] << 8 | l[e & 255];
                                        e ^= B[s / i | 0] << 24
                                    } else if (i > 6 && s % i == 4)
                                        e = l[e >>> 24] << 24 | l[e >>> 16 & 255] << 16 | l[e >>> 8 & 255] << 8 | l[e & 255];
                                    o[s] = o[s - i] ^ e
                                }
                            var c = this._invKeySchedule = [];
                            for (var d = 0; d < a; d++) {
                                var s = a - d;
                                if (d % 4)
                                    var e = o[s];
                                else
                                    var e = o[s - 4];
                                if (d < 4 || s <= 4)
                                    c[d] = e;
                                else
                                    c[d] = h[l[e >>> 24]] ^ f[l[e >>> 16 & 255]] ^ u[l[e >>> 8 & 255]] ^ _[l[e & 255]]
                            }
                        },
                        encryptBlock: function (e, t) {
                            this._doCryptBlock(e, t, this._keySchedule, o, s, c, d, l)
                        },
                        decryptBlock: function (e, t) {
                            var r = e[t + 1];
                            e[t + 1] = e[t + 3];
                            e[t + 3] = r;
                            this._doCryptBlock(e, t, this._invKeySchedule, h, f, u, _, a);
                            var r = e[t + 1];
                            e[t + 1] = e[t + 3];
                            e[t + 3] = r
                        },
                        _doCryptBlock: function (e, t, r, i, n, a, o, s) {
                            var c = this._nRounds;
                            var d = e[t] ^ r[0];
                            var l = e[t + 1] ^ r[1];
                            var h = e[t + 2] ^ r[2];
                            var f = e[t + 3] ^ r[3];
                            var u = 4;
                            for (var _ = 1; _ < c; _++) {
                                var v = i[d >>> 24] ^ n[l >>> 16 & 255] ^ a[h >>> 8 & 255] ^ o[f & 255] ^ r[u++];
                                var p = i[l >>> 24] ^ n[h >>> 16 & 255] ^ a[f >>> 8 & 255] ^ o[d & 255] ^ r[u++];
                                var g = i[h >>> 24] ^ n[f >>> 16 & 255] ^ a[d >>> 8 & 255] ^ o[l & 255] ^ r[u++];
                                var m = i[f >>> 24] ^ n[d >>> 16 & 255] ^ a[l >>> 8 & 255] ^ o[h & 255] ^ r[u++];
                                d = v;
                                l = p;
                                h = g;
                                f = m
                            }
                            var v = (s[d >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[f & 255]) ^ r[u++];
                            var p = (s[l >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[d & 255]) ^ r[u++];
                            var g = (s[h >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[l & 255]) ^ r[u++];
                            var m = (s[f >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[h & 255]) ^ r[u++];
                            e[t] = v;
                            e[t + 1] = p;
                            e[t + 2] = g;
                            e[t + 3] = m
                        },
                        keySize: 256 / 32
                    });
                return t.AES = i._createHelper(E),
                    e.AES
            }(p(), (g(),
                m(),
                y(),
                A()))),
            ar
    }
    var cr, dr = {}, lr = {
        get exports() {
            return dr
        },
        set exports(e) {
            dr = e
        }
    };
    function hr() {
        var e, t, i, r, d, l, h, f, u, n, a;
        return cr || (cr = 1,
            lr.exports = (e = p(),
                g(),
                m(),
                y(),
                A(),
                r = (t = e).lib,
                i = r.WordArray,
                r = r.BlockCipher,
                a = t.algo,
                d = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                l = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                h = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                f = [{
                    0: 8421888,
                    268435456: 32768,
                    536870912: 8421378,
                    805306368: 2,
                    1073741824: 512,
                    1342177280: 8421890,
                    1610612736: 8389122,
                    1879048192: 8388608,
                    2147483648: 514,
                    2415919104: 8389120,
                    2684354560: 33280,
                    2952790016: 8421376,
                    3221225472: 32770,
                    3489660928: 8388610,
                    3758096384: 0,
                    4026531840: 33282,
                    134217728: 0,
                    402653184: 8421890,
                    671088640: 33282,
                    939524096: 32768,
                    1207959552: 8421888,
                    1476395008: 512,
                    1744830464: 8421378,
                    2013265920: 2,
                    2281701376: 8389120,
                    2550136832: 33280,
                    2818572288: 8421376,
                    3087007744: 8389122,
                    3355443200: 8388610,
                    3623878656: 32770,
                    3892314112: 514,
                    4160749568: 8388608,
                    1: 32768,
                    268435457: 2,
                    536870913: 8421888,
                    805306369: 8388608,
                    1073741825: 8421378,
                    1342177281: 33280,
                    1610612737: 512,
                    1879048193: 8389122,
                    2147483649: 8421890,
                    2415919105: 8421376,
                    2684354561: 8388610,
                    2952790017: 33282,
                    3221225473: 514,
                    3489660929: 8389120,
                    3758096385: 32770,
                    4026531841: 0,
                    134217729: 8421890,
                    402653185: 8421376,
                    671088641: 8388608,
                    939524097: 512,
                    1207959553: 32768,
                    1476395009: 8388610,
                    1744830465: 2,
                    2013265921: 33282,
                    2281701377: 32770,
                    2550136833: 8389122,
                    2818572289: 514,
                    3087007745: 8421888,
                    3355443201: 8389120,
                    3623878657: 0,
                    3892314113: 33280,
                    4160749569: 8421378
                }, {
                    0: 1074282512,
                    16777216: 16384,
                    33554432: 524288,
                    50331648: 1074266128,
                    67108864: 1073741840,
                    83886080: 1074282496,
                    100663296: 1073758208,
                    117440512: 16,
                    134217728: 540672,
                    150994944: 1073758224,
                    167772160: 1073741824,
                    184549376: 540688,
                    201326592: 524304,
                    218103808: 0,
                    234881024: 16400,
                    251658240: 1074266112,
                    8388608: 1073758208,
                    25165824: 540688,
                    41943040: 16,
                    58720256: 1073758224,
                    75497472: 1074282512,
                    92274688: 1073741824,
                    109051904: 524288,
                    125829120: 1074266128,
                    142606336: 524304,
                    159383552: 0,
                    176160768: 16384,
                    192937984: 1074266112,
                    209715200: 1073741840,
                    226492416: 540672,
                    243269632: 1074282496,
                    260046848: 16400,
                    268435456: 0,
                    285212672: 1074266128,
                    301989888: 1073758224,
                    318767104: 1074282496,
                    335544320: 1074266112,
                    352321536: 16,
                    369098752: 540688,
                    385875968: 16384,
                    402653184: 16400,
                    419430400: 524288,
                    436207616: 524304,
                    452984832: 1073741840,
                    469762048: 540672,
                    486539264: 1073758208,
                    503316480: 1073741824,
                    520093696: 1074282512,
                    276824064: 540688,
                    293601280: 524288,
                    310378496: 1074266112,
                    327155712: 16384,
                    343932928: 1073758208,
                    360710144: 1074282512,
                    377487360: 16,
                    394264576: 1073741824,
                    411041792: 1074282496,
                    427819008: 1073741840,
                    444596224: 1073758224,
                    461373440: 524304,
                    478150656: 0,
                    494927872: 16400,
                    511705088: 1074266128,
                    528482304: 540672
                }, {
                    0: 260,
                    1048576: 0,
                    2097152: 67109120,
                    3145728: 65796,
                    4194304: 65540,
                    5242880: 67108868,
                    6291456: 67174660,
                    7340032: 67174400,
                    8388608: 67108864,
                    9437184: 67174656,
                    10485760: 65792,
                    11534336: 67174404,
                    12582912: 67109124,
                    13631488: 65536,
                    14680064: 4,
                    15728640: 256,
                    524288: 67174656,
                    1572864: 67174404,
                    2621440: 0,
                    3670016: 67109120,
                    4718592: 67108868,
                    5767168: 65536,
                    6815744: 65540,
                    7864320: 260,
                    8912896: 4,
                    9961472: 256,
                    11010048: 67174400,
                    12058624: 65796,
                    13107200: 65792,
                    14155776: 67109124,
                    15204352: 67174660,
                    16252928: 67108864,
                    16777216: 67174656,
                    17825792: 65540,
                    18874368: 65536,
                    19922944: 67109120,
                    20971520: 256,
                    22020096: 67174660,
                    23068672: 67108868,
                    24117248: 0,
                    25165824: 67109124,
                    26214400: 67108864,
                    27262976: 4,
                    28311552: 65792,
                    29360128: 67174400,
                    30408704: 260,
                    31457280: 65796,
                    32505856: 67174404,
                    17301504: 67108864,
                    18350080: 260,
                    19398656: 67174656,
                    20447232: 0,
                    21495808: 65540,
                    22544384: 67109120,
                    23592960: 256,
                    24641536: 67174404,
                    25690112: 65536,
                    26738688: 67174660,
                    27787264: 65796,
                    28835840: 67108868,
                    29884416: 67109124,
                    30932992: 67174400,
                    31981568: 4,
                    33030144: 65792
                }, {
                    0: 2151682048,
                    65536: 2147487808,
                    131072: 4198464,
                    196608: 2151677952,
                    262144: 0,
                    327680: 4198400,
                    393216: 2147483712,
                    458752: 4194368,
                    524288: 2147483648,
                    589824: 4194304,
                    655360: 64,
                    720896: 2147487744,
                    786432: 2151678016,
                    851968: 4160,
                    917504: 4096,
                    983040: 2151682112,
                    32768: 2147487808,
                    98304: 64,
                    163840: 2151678016,
                    229376: 2147487744,
                    294912: 4198400,
                    360448: 2151682112,
                    425984: 0,
                    491520: 2151677952,
                    557056: 4096,
                    622592: 2151682048,
                    688128: 4194304,
                    753664: 4160,
                    819200: 2147483648,
                    884736: 4194368,
                    950272: 4198464,
                    1015808: 2147483712,
                    1048576: 4194368,
                    1114112: 4198400,
                    1179648: 2147483712,
                    1245184: 0,
                    1310720: 4160,
                    1376256: 2151678016,
                    1441792: 2151682048,
                    1507328: 2147487808,
                    1572864: 2151682112,
                    1638400: 2147483648,
                    1703936: 2151677952,
                    1769472: 4198464,
                    1835008: 2147487744,
                    1900544: 4194304,
                    1966080: 64,
                    2031616: 4096,
                    1081344: 2151677952,
                    1146880: 2151682112,
                    1212416: 0,
                    1277952: 4198400,
                    1343488: 4194368,
                    1409024: 2147483648,
                    1474560: 2147487808,
                    1540096: 64,
                    1605632: 2147483712,
                    1671168: 4096,
                    1736704: 2147487744,
                    1802240: 2151678016,
                    1867776: 4160,
                    1933312: 2151682048,
                    1998848: 4194304,
                    2064384: 4198464
                }, {
                    0: 128,
                    4096: 17039360,
                    8192: 262144,
                    12288: 536870912,
                    16384: 537133184,
                    20480: 16777344,
                    24576: 553648256,
                    28672: 262272,
                    32768: 16777216,
                    36864: 537133056,
                    40960: 536871040,
                    45056: 553910400,
                    49152: 553910272,
                    53248: 0,
                    57344: 17039488,
                    61440: 553648128,
                    2048: 17039488,
                    6144: 553648256,
                    10240: 128,
                    14336: 17039360,
                    18432: 262144,
                    22528: 537133184,
                    26624: 553910272,
                    30720: 536870912,
                    34816: 537133056,
                    38912: 0,
                    43008: 553910400,
                    47104: 16777344,
                    51200: 536871040,
                    55296: 553648128,
                    59392: 16777216,
                    63488: 262272,
                    65536: 262144,
                    69632: 128,
                    73728: 536870912,
                    77824: 553648256,
                    81920: 16777344,
                    86016: 553910272,
                    90112: 537133184,
                    94208: 16777216,
                    98304: 553910400,
                    102400: 553648128,
                    106496: 17039360,
                    110592: 537133056,
                    114688: 262272,
                    118784: 536871040,
                    122880: 0,
                    126976: 17039488,
                    67584: 553648256,
                    71680: 16777216,
                    75776: 17039360,
                    79872: 537133184,
                    83968: 536870912,
                    88064: 17039488,
                    92160: 128,
                    96256: 553910272,
                    100352: 262272,
                    104448: 553910400,
                    108544: 0,
                    112640: 553648128,
                    116736: 16777344,
                    120832: 262144,
                    124928: 537133056,
                    129024: 536871040
                }, {
                    0: 268435464,
                    256: 8192,
                    512: 270532608,
                    768: 270540808,
                    1024: 268443648,
                    1280: 2097152,
                    1536: 2097160,
                    1792: 268435456,
                    2048: 0,
                    2304: 268443656,
                    2560: 2105344,
                    2816: 8,
                    3072: 270532616,
                    3328: 2105352,
                    3584: 8200,
                    3840: 270540800,
                    128: 270532608,
                    384: 270540808,
                    640: 8,
                    896: 2097152,
                    1152: 2105352,
                    1408: 268435464,
                    1664: 268443648,
                    1920: 8200,
                    2176: 2097160,
                    2432: 8192,
                    2688: 268443656,
                    2944: 270532616,
                    3200: 0,
                    3456: 270540800,
                    3712: 2105344,
                    3968: 268435456,
                    4096: 268443648,
                    4352: 270532616,
                    4608: 270540808,
                    4864: 8200,
                    5120: 2097152,
                    5376: 268435456,
                    5632: 268435464,
                    5888: 2105344,
                    6144: 2105352,
                    6400: 0,
                    6656: 8,
                    6912: 270532608,
                    7168: 8192,
                    7424: 268443656,
                    7680: 270540800,
                    7936: 2097160,
                    4224: 8,
                    4480: 2105344,
                    4736: 2097152,
                    4992: 268435464,
                    5248: 268443648,
                    5504: 8200,
                    5760: 270540808,
                    6016: 270532608,
                    6272: 270540800,
                    6528: 270532616,
                    6784: 8192,
                    7040: 2105352,
                    7296: 2097160,
                    7552: 0,
                    7808: 268435456,
                    8064: 268443656
                }, {
                    0: 1048576,
                    16: 33555457,
                    32: 1024,
                    48: 1049601,
                    64: 34604033,
                    80: 0,
                    96: 1,
                    112: 34603009,
                    128: 33555456,
                    144: 1048577,
                    160: 33554433,
                    176: 34604032,
                    192: 34603008,
                    208: 1025,
                    224: 1049600,
                    240: 33554432,
                    8: 34603009,
                    24: 0,
                    40: 33555457,
                    56: 34604032,
                    72: 1048576,
                    88: 33554433,
                    104: 33554432,
                    120: 1025,
                    136: 1049601,
                    152: 33555456,
                    168: 34603008,
                    184: 1048577,
                    200: 1024,
                    216: 34604033,
                    232: 1,
                    248: 1049600,
                    256: 33554432,
                    272: 1048576,
                    288: 33555457,
                    304: 34603009,
                    320: 1048577,
                    336: 33555456,
                    352: 34604032,
                    368: 1049601,
                    384: 1025,
                    400: 34604033,
                    416: 1049600,
                    432: 1,
                    448: 0,
                    464: 34603008,
                    480: 33554433,
                    496: 1024,
                    264: 1049600,
                    280: 33555457,
                    296: 34603009,
                    312: 1,
                    328: 33554432,
                    344: 1048576,
                    360: 1025,
                    376: 34604032,
                    392: 33554433,
                    408: 34603008,
                    424: 0,
                    440: 34604033,
                    456: 1049601,
                    472: 1024,
                    488: 33555456,
                    504: 1048577
                }, {
                    0: 134219808,
                    1: 131072,
                    2: 134217728,
                    3: 32,
                    4: 131104,
                    5: 134350880,
                    6: 134350848,
                    7: 2048,
                    8: 134348800,
                    9: 134219776,
                    10: 133120,
                    11: 134348832,
                    12: 2080,
                    13: 0,
                    14: 134217760,
                    15: 133152,
                    2147483648: 2048,
                    2147483649: 134350880,
                    2147483650: 134219808,
                    2147483651: 134217728,
                    2147483652: 134348800,
                    2147483653: 133120,
                    2147483654: 133152,
                    2147483655: 32,
                    2147483656: 134217760,
                    2147483657: 2080,
                    2147483658: 131104,
                    2147483659: 134350848,
                    2147483660: 0,
                    2147483661: 134348832,
                    2147483662: 134219776,
                    2147483663: 131072,
                    16: 133152,
                    17: 134350848,
                    18: 32,
                    19: 2048,
                    20: 134219776,
                    21: 134217760,
                    22: 134348832,
                    23: 131072,
                    24: 0,
                    25: 131104,
                    26: 134348800,
                    27: 134219808,
                    28: 134350880,
                    29: 133120,
                    30: 2080,
                    31: 134217728,
                    2147483664: 131072,
                    2147483665: 2048,
                    2147483666: 134348832,
                    2147483667: 133152,
                    2147483668: 32,
                    2147483669: 134348800,
                    2147483670: 134217728,
                    2147483671: 134219808,
                    2147483672: 134350880,
                    2147483673: 134217760,
                    2147483674: 134219776,
                    2147483675: 0,
                    2147483676: 133120,
                    2147483677: 2080,
                    2147483678: 131104,
                    2147483679: 134350848
                }],
                u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                n = a.DES = r.extend({
                    _doReset: function () {
                        for (var e = this._key.words, t = [], r = 0; r < 56; r++) {
                            var i = d[r] - 1;
                            t[r] = e[i >>> 5] >>> 31 - i % 32 & 1
                        }
                        for (var n = this._subKeys = [], a = 0; a < 16; a++) {
                            for (var o = n[a] = [], s = h[a], r = 0; r < 24; r++)
                                o[r / 6 | 0] |= t[(l[r] - 1 + s) % 28] << 31 - r % 6,
                                    o[4 + (r / 6 | 0)] |= t[28 + (l[r + 24] - 1 + s) % 28] << 31 - r % 6;
                            o[0] = o[0] << 1 | o[0] >>> 31;
                            for (r = 1; r < 7; r++)
                                o[r] = o[r] >>> 4 * (r - 1) + 3;
                            o[7] = o[7] << 5 | o[7] >>> 27
                        }
                        for (var c = this._invSubKeys = [], r = 0; r < 16; r++)
                            c[r] = n[15 - r]
                    },
                    encryptBlock: function (e, t) {
                        this._doCryptBlock(e, t, this._subKeys)
                    },
                    decryptBlock: function (e, t) {
                        this._doCryptBlock(e, t, this._invSubKeys)
                    },
                    _doCryptBlock: function (e, t, r) {
                        this._lBlock = e[t],
                            this._rBlock = e[t + 1],
                            _.call(this, 4, 252645135),
                            _.call(this, 16, 65535),
                            v.call(this, 2, 858993459),
                            v.call(this, 8, 16711935),
                            _.call(this, 1, 1431655765);
                        for (var i = 0; i < 16; i++) {
                            for (var n = r[i], a = this._lBlock, o = this._rBlock, s = 0, c = 0; c < 8; c++)
                                s |= f[c][((o ^ n[c]) & u[c]) >>> 0];
                            this._lBlock = o,
                                this._rBlock = a ^ s
                        }
                        var d = this._lBlock;
                        this._lBlock = this._rBlock,
                            this._rBlock = d,
                            _.call(this, 1, 1431655765),
                            v.call(this, 8, 16711935),
                            v.call(this, 2, 858993459),
                            _.call(this, 16, 65535),
                            _.call(this, 4, 252645135),
                            e[t] = this._lBlock,
                            e[t + 1] = this._rBlock
                    },
                    keySize: 2,
                    ivSize: 2,
                    blockSize: 2
                }),
                t.DES = r._createHelper(n),
                a = a.TripleDES = r.extend({
                    _doReset: function () {
                        var e = this._key.words;
                        if (2 !== e.length && 4 !== e.length && e.length < 6)
                            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
                        var t = e.slice(0, 2)
                            , r = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4)
                            , e = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
                        this._des1 = n.createEncryptor(i.create(t)),
                            this._des2 = n.createEncryptor(i.create(r)),
                            this._des3 = n.createEncryptor(i.create(e))
                    },
                    encryptBlock: function (e, t) {
                        this._des1.encryptBlock(e, t),
                            this._des2.decryptBlock(e, t),
                            this._des3.encryptBlock(e, t)
                    },
                    decryptBlock: function (e, t) {
                        this._des3.decryptBlock(e, t),
                            this._des2.encryptBlock(e, t),
                            this._des1.decryptBlock(e, t)
                    },
                    keySize: 6,
                    ivSize: 2,
                    blockSize: 2
                }),
                t.TripleDES = r._createHelper(a),
                e.TripleDES)),
            dr;
        function _(e, t) {
            t = (this._lBlock >>> e ^ this._rBlock) & t;
            this._rBlock ^= t,
                this._lBlock ^= t << e
        }
        function v(e, t) {
            t = (this._rBlock >>> e ^ this._lBlock) & t;
            this._lBlock ^= t,
                this._rBlock ^= t << e
        }
    }
    var fr, ur = {}, _r = {
        get exports() {
            return ur
        },
        set exports(e) {
            ur = e
        }
    };
    var vr, pr = {}, gr = {
        get exports() {
            return pr
        },
        set exports(e) {
            pr = e
        }
    };
    var mr, yr, d, l, h, i, f, u, _, v, w, I, Ar, x, B, wr, Ir, E, xr, Br, b, Er, S, br, Sr, Rr, R, D, Dr, Tr, Or, kr, Nr, Lr, Pr, T, O, Cr, Hr, k, N, Fr, Mr, L, P, zr, Gr = {}, Wr = {
        get exports() {
            return Gr
        },
        set exports(e) {
            Gr = e
        }
    };
    function Vr() {
        for (var e = this._X, t = this._C, r = 0; r < 8; r++)
            l[r] = t[r];
        t[0] = t[0] + 1295307597 + this._b | 0,
            t[1] = t[1] + 3545052371 + (t[0] >>> 0 < l[0] >>> 0 ? 1 : 0) | 0,
            t[2] = t[2] + 886263092 + (t[1] >>> 0 < l[1] >>> 0 ? 1 : 0) | 0,
            t[3] = t[3] + 1295307597 + (t[2] >>> 0 < l[2] >>> 0 ? 1 : 0) | 0,
            t[4] = t[4] + 3545052371 + (t[3] >>> 0 < l[3] >>> 0 ? 1 : 0) | 0,
            t[5] = t[5] + 886263092 + (t[4] >>> 0 < l[4] >>> 0 ? 1 : 0) | 0,
            t[6] = t[6] + 1295307597 + (t[5] >>> 0 < l[5] >>> 0 ? 1 : 0) | 0,
            t[7] = t[7] + 3545052371 + (t[6] >>> 0 < l[6] >>> 0 ? 1 : 0) | 0,
            this._b = t[7] >>> 0 < l[7] >>> 0 ? 1 : 0;
        for (r = 0; r < 8; r++) {
            var i = e[r] + t[r]
                , n = 65535 & i
                , a = i >>> 16;
            h[r] = ((n * n >>> 17) + n * a >>> 15) + a * a ^ ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0)
        }
        e[0] = h[0] + (h[7] << 16 | h[7] >>> 16) + (h[6] << 16 | h[6] >>> 16) | 0,
            e[1] = h[1] + (h[0] << 8 | h[0] >>> 24) + h[7] | 0,
            e[2] = h[2] + (h[1] << 16 | h[1] >>> 16) + (h[0] << 16 | h[0] >>> 16) | 0,
            e[3] = h[3] + (h[2] << 8 | h[2] >>> 24) + h[1] | 0,
            e[4] = h[4] + (h[3] << 16 | h[3] >>> 16) + (h[2] << 16 | h[2] >>> 16) | 0,
            e[5] = h[5] + (h[4] << 8 | h[4] >>> 24) + h[3] | 0,
            e[6] = h[6] + (h[5] << 16 | h[5] >>> 16) + (h[4] << 16 | h[4] >>> 16) | 0,
            e[7] = h[7] + (h[6] << 8 | h[6] >>> 24) + h[5] | 0
    }
    function jr() {
        for (var e = this._X, t = this._C, r = 0; r < 8; r++)
            u[r] = t[r];
        t[0] = t[0] + 1295307597 + this._b | 0,
            t[1] = t[1] + 3545052371 + (t[0] >>> 0 < u[0] >>> 0 ? 1 : 0) | 0,
            t[2] = t[2] + 886263092 + (t[1] >>> 0 < u[1] >>> 0 ? 1 : 0) | 0,
            t[3] = t[3] + 1295307597 + (t[2] >>> 0 < u[2] >>> 0 ? 1 : 0) | 0,
            t[4] = t[4] + 3545052371 + (t[3] >>> 0 < u[3] >>> 0 ? 1 : 0) | 0,
            t[5] = t[5] + 886263092 + (t[4] >>> 0 < u[4] >>> 0 ? 1 : 0) | 0,
            t[6] = t[6] + 1295307597 + (t[5] >>> 0 < u[5] >>> 0 ? 1 : 0) | 0,
            t[7] = t[7] + 3545052371 + (t[6] >>> 0 < u[6] >>> 0 ? 1 : 0) | 0,
            this._b = t[7] >>> 0 < u[7] >>> 0 ? 1 : 0;
        for (r = 0; r < 8; r++) {
            var i = e[r] + t[r]
                , n = 65535 & i
                , a = i >>> 16;
            _[r] = ((n * n >>> 17) + n * a >>> 15) + a * a ^ ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0)
        }
        e[0] = _[0] + (_[7] << 16 | _[7] >>> 16) + (_[6] << 16 | _[6] >>> 16) | 0,
            e[1] = _[1] + (_[0] << 8 | _[0] >>> 24) + _[7] | 0,
            e[2] = _[2] + (_[1] << 16 | _[1] >>> 16) + (_[0] << 16 | _[0] >>> 16) | 0,
            e[3] = _[3] + (_[2] << 8 | _[2] >>> 24) + _[1] | 0,
            e[4] = _[4] + (_[3] << 16 | _[3] >>> 16) + (_[2] << 16 | _[2] >>> 16) | 0,
            e[5] = _[5] + (_[4] << 8 | _[4] >>> 24) + _[3] | 0,
            e[6] = _[6] + (_[5] << 16 | _[5] >>> 16) + (_[4] << 16 | _[4] >>> 16) | 0,
            e[7] = _[7] + (_[6] << 8 | _[6] >>> 24) + _[5] | 0
    }
    function Ur() {
        for (var e = this._S, t = this._i, r = this._j, i = 0, n = 0; n < 4; n++) {
            var r = (r + e[t = (t + 1) % 256]) % 256
                , a = e[t];
            e[t] = e[r],
                e[r] = a,
                i |= e[(e[t] + e[r]) % 256] << 24 - 8 * n
        }
        return this._i = t,
            this._j = r,
            i
    }
    function qr(e, t, r) {
        return e & t | ~e & r
    }
    function Yr(e, t, r) {
        return e & r | t & ~r
    }
    function Kr(e, t) {
        return e << t | e >>> 32 - t
    }
    function Xr(e, t, r) {
        for (var i, n, a = [], o = 0, s = 0; s < t; s++)
            s % 4 && (i = r[e.charCodeAt(s - 1)] << s % 4 * 2,
                n = r[e.charCodeAt(s)] >>> 6 - s % 4 * 2,
                a[o >>> 2] |= (i | n) << 24 - o % 4 * 8,
                o++);
        return zr.create(a, o)
    }
    t.exports = (t = p(),
        Ie(),
        be(),
        Te(),
        g(),
        yr || (yr = 1,
            Pe.exports = (P = p(),
                zr = P.lib.WordArray,
                P.enc.Base64url = {
                    stringify: function (e, t = !0) {
                        for (var r = e.words, i = e.sigBytes, n = t ? this._safe_map : this._map, a = (e.clamp(),
                            []), o = 0; o < i; o += 3)
                            for (var s = (r[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = 0; c < 4 && o + .75 * c < i; c++)
                                a.push(n.charAt(s >>> 6 * (3 - c) & 63));
                        var d = n.charAt(64);
                        if (d)
                            for (; a.length % 4;)
                                a.push(d);
                        return a.join("")
                    },
                    parse: function (e, t = !0) {
                        var r = e.length
                            , i = t ? this._safe_map : this._map;
                        if (!(n = this._reverseMap))
                            for (var n = this._reverseMap = [], a = 0; a < i.length; a++)
                                n[i.charCodeAt(a)] = a;
                        var t = i.charAt(64);
                        return t && -1 !== (t = e.indexOf(t)) && (r = t),
                            Xr(e, r, n)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
                },
                P.enc.Base64url)),
        m(),
        We(),
        qe(),
        i || (i = 1,
            Ke.exports = (P = p(),
                qe(),
                Fr = (N = P).lib.WordArray,
                L = N.algo,
                Mr = L.SHA256,
                L = L.SHA224 = Mr.extend({
                    _doReset: function () {
                        this._hash = new Fr.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                    },
                    _doFinalize: function () {
                        var e = Mr._doFinalize.call(this);
                        return e.sigBytes -= 4,
                            e
                    }
                }),
                N.SHA224 = Mr._createHelper(L),
                N.HmacSHA224 = Mr._createHmacHelper(L),
                P.SHA224)),
        Ze(),
        li || (li = 1,
            et.exports = (N = p(),
                Ie(),
                Ze(),
                k = (L = N).x64,
                O = k.Word,
                Cr = k.WordArray,
                k = L.algo,
                Hr = k.SHA512,
                k = k.SHA384 = Hr.extend({
                    _doReset: function () {
                        this._hash = new Cr.init([new O.init(3418070365, 3238371032), new O.init(1654270250, 914150663), new O.init(2438529370, 812702999), new O.init(355462360, 4144912697), new O.init(1731405415, 4290775857), new O.init(2394180231, 1750603025), new O.init(3675008525, 1694076839), new O.init(1203062813, 3204075428)])
                    },
                    _doFinalize: function () {
                        var e = Hr._doFinalize.call(this);
                        return e.sigBytes -= 16,
                            e
                    }
                }),
                L.SHA384 = Hr._createHelper(k),
                L.HmacSHA384 = Hr._createHmacHelper(k),
                N.SHA384)),
        nt(),
        at || (at = 1,
            st.exports = (k = p(),
                T = (R = k).lib,
                D = T.WordArray,
                Dr = T.Hasher,
                T = R.algo,
                Tr = D.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                Or = D.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                kr = D.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                Nr = D.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                Lr = D.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                Pr = D.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                T = T.RIPEMD160 = Dr.extend({
                    _doReset: function () {
                        this._hash = D.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function (e, t) {
                        for (var r = 0; r < 16; r++) {
                            var i = t + r
                                , n = e[i];
                            e[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
                        }
                        for (var a, o, s, c, d, l, h = this._hash.words, f = Lr.words, u = Pr.words, _ = Tr.words, v = Or.words, p = kr.words, g = Nr.words, m = a = h[0], y = o = h[1], A = s = h[2], w = c = h[3], I = d = h[4], r = 0; r < 80; r += 1)
                            l = (l = Kr(l = (l = a + e[t + _[r]] | 0) + (r < 16 ? (o ^ s ^ c) + f[0] : r < 32 ? qr(o, s, c) + f[1] : r < 48 ? ((o | ~s) ^ c) + f[2] : r < 64 ? Yr(o, s, c) + f[3] : (o ^ (s | ~c)) + f[4]) | 0, p[r])) + d | 0,
                                a = d,
                                d = c,
                                c = Kr(s, 10),
                                s = o,
                                o = l,
                                l = (l = Kr(l = (l = m + e[t + v[r]] | 0) + (r < 16 ? (y ^ (A | ~w)) + u[0] : r < 32 ? Yr(y, A, w) + u[1] : r < 48 ? ((y | ~A) ^ w) + u[2] : r < 64 ? qr(y, A, w) + u[3] : (y ^ A ^ w) + u[4]) | 0, g[r])) + I | 0,
                                m = I,
                                I = w,
                                w = Kr(A, 10),
                                A = y,
                                y = l;
                        l = h[1] + s + w | 0,
                            h[1] = h[2] + c + I | 0,
                            h[2] = h[3] + d + m | 0,
                            h[3] = h[4] + a + y | 0,
                            h[4] = h[0] + o + A | 0,
                            h[0] = l
                    },
                    _doFinalize: function () {
                        for (var e = this._data, t = e.words, r = 8 * this._nDataBytes, i = 8 * e.sigBytes, i = (t[i >>> 5] |= 128 << 24 - i % 32,
                            t[14 + (64 + i >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                            e.sigBytes = 4 * (t.length + 1),
                            this._process(),
                            this._hash), n = i.words, a = 0; a < 5; a++) {
                            var o = n[a];
                            n[a] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                        }
                        return i
                    },
                    clone: function () {
                        var e = Dr.clone.call(this);
                        return e._hash = this._hash.clone(),
                            e
                    }
                }),
                R.RIPEMD160 = Dr._createHelper(T),
                R.HmacRIPEMD160 = Dr._createHmacHelper(T),
                k.RIPEMD160)),
        ht(),
        ft || (ft = 1,
            _t.exports = (R = p(),
                We(),
                ht(),
                S = (T = R).lib,
                b = S.Base,
                Er = S.WordArray,
                S = T.algo,
                br = S.SHA1,
                Sr = S.HMAC,
                Rr = S.PBKDF2 = b.extend({
                    cfg: b.extend({
                        keySize: 4,
                        hasher: br,
                        iterations: 1
                    }),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e)
                    },
                    compute: function (e, t) {
                        for (var r = this.cfg, i = Sr.create(r.hasher, e), n = Er.create(), a = Er.create([1]), o = n.words, s = a.words, c = r.keySize, d = r.iterations; o.length < c;) {
                            for (var l = i.update(t).finalize(a), h = (i.reset(),
                                l.words), f = h.length, u = l, _ = 1; _ < d; _++) {
                                u = i.finalize(u),
                                    i.reset();
                                for (var v = u.words, p = 0; p < f; p++)
                                    h[p] ^= v[p]
                            }
                            n.concat(l),
                                s[0]++
                        }
                        return n.sigBytes = 4 * c,
                            n
                    }
                }),
                T.PBKDF2 = function (e, t, r) {
                    return Rr.create(r).compute(e, t)
                }
                ,
                R.PBKDF2)),
        y(),
        A(),
        Bt(),
        Rt(),
        kt(),
        Ct(),
        Ht || (Ht = 1,
            Mt.exports = (Br = p(),
                A(),
                Br.mode.ECB = function () {
                    var e = Br.lib.BlockCipherMode.extend();
                    return e.Encryptor = e.extend({
                        processBlock: function (e, t) {
                            this._cipher.encryptBlock(e, t)
                        }
                    }),
                        e.Decryptor = e.extend({
                            processBlock: function (e, t) {
                                this._cipher.decryptBlock(e, t)
                            }
                        }),
                        e
                }(),
                Br.mode.ECB)),
        zt || (zt = 1,
            Wt.exports = (S = p(),
                A(),
                S.pad.AnsiX923 = {
                    pad: function (e, t) {
                        var r = e.sigBytes
                            , t = 4 * t
                            , t = t - r % t
                            , r = r + t - 1;
                        e.clamp(),
                            e.words[r >>> 2] |= t << 24 - r % 4 * 8,
                            e.sigBytes += t
                    },
                    unpad: function (e) {
                        var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                        e.sigBytes -= t
                    }
                },
                S.pad.Ansix923)),
        Vt || (Vt = 1,
            Ut.exports = (xr = p(),
                A(),
                xr.pad.Iso10126 = {
                    pad: function (e, t) {
                        t *= 4,
                            t -= e.sigBytes % t;
                        e.concat(xr.lib.WordArray.random(t - 1)).concat(xr.lib.WordArray.create([t << 24], 1))
                    },
                    unpad: function (e) {
                        var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                        e.sigBytes -= t
                    }
                },
                xr.pad.Iso10126)),
        qt || (qt = 1,
            Kt.exports = (E = p(),
                A(),
                E.pad.Iso97971 = {
                    pad: function (e, t) {
                        e.concat(E.lib.WordArray.create([2147483648], 1)),
                            E.pad.ZeroPadding.pad(e, t)
                    },
                    unpad: function (e) {
                        E.pad.ZeroPadding.unpad(e),
                            e.sigBytes--
                    }
                },
                E.pad.Iso97971)),
        Xt || (Xt = 1,
            Jt.exports = (b = p(),
                A(),
                b.pad.ZeroPadding = {
                    pad: function (e, t) {
                        t *= 4;
                        e.clamp(),
                            e.sigBytes += t - (e.sigBytes % t || t)
                    },
                    unpad: function (e) {
                        for (var t = e.words, r = e.sigBytes - 1, r = e.sigBytes - 1; 0 <= r; r--)
                            if (t[r >>> 2] >>> 24 - r % 4 * 8 & 255) {
                                e.sigBytes = r + 1;
                                break
                            }
                    }
                },
                b.pad.ZeroPadding)),
        Zt || (Zt = 1,
            er.exports = (br = p(),
                A(),
                br.pad.NoPadding = {
                    pad: function () { },
                    unpad: function () { }
                },
                br.pad.NoPadding)),
        tr || (tr = 1,
            ir.exports = (B = p(),
                A(),
                wr = B.lib.CipherParams,
                Ir = B.enc.Hex,
                B.format.Hex = {
                    stringify: function (e) {
                        return e.ciphertext.toString(Ir)
                    },
                    parse: function (e) {
                        e = Ir.parse(e);
                        return wr.create({
                            ciphertext: e
                        })
                    }
                },
                B.format.Hex)),
        sr(),
        hr(),
        fr || (fr = 1,
            _r.exports = (B = p(),
                g(),
                m(),
                y(),
                A(),
                I = (w = B).lib.StreamCipher,
                x = w.algo,
                Ar = x.RC4 = I.extend({
                    _doReset: function () {
                        for (var e = this._key, t = e.words, r = e.sigBytes, i = this._S = [], n = 0; n < 256; n++)
                            i[n] = n;
                        for (var n = 0, a = 0; n < 256; n++) {
                            var o = n % r
                                , o = t[o >>> 2] >>> 24 - o % 4 * 8 & 255
                                , a = (a + i[n] + o) % 256
                                , o = i[n];
                            i[n] = i[a],
                                i[a] = o
                        }
                        this._i = this._j = 0
                    },
                    _doProcessBlock: function (e, t) {
                        e[t] ^= Ur.call(this)
                    },
                    keySize: 8,
                    ivSize: 0
                }),
                w.RC4 = I._createHelper(Ar),
                x = x.RC4Drop = Ar.extend({
                    cfg: Ar.cfg.extend({
                        drop: 192
                    }),
                    _doReset: function () {
                        Ar._doReset.call(this);
                        for (var e = this.cfg.drop; 0 < e; e--)
                            Ur.call(this)
                    }
                }),
                w.RC4Drop = I._createHelper(x),
                B.RC4)),
        vr || (vr = 1,
            gr.exports = (w = p(),
                g(),
                m(),
                y(),
                A(),
                x = (I = w).lib.StreamCipher,
                v = I.algo,
                f = [],
                u = [],
                _ = [],
                v = v.Rabbit = x.extend({
                    _doReset: function () {
                        for (var e = this._key.words, t = this.cfg.iv, r = 0; r < 4; r++)
                            e[r] = 16711935 & (e[r] << 8 | e[r] >>> 24) | 4278255360 & (e[r] << 24 | e[r] >>> 8);
                        for (var i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], r = this._b = 0; r < 4; r++)
                            jr.call(this);
                        for (r = 0; r < 8; r++)
                            n[r] ^= i[r + 4 & 7];
                        if (t) {
                            var t = t.words
                                , a = t[0]
                                , t = t[1]
                                , a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                                , t = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8)
                                , o = a >>> 16 | 4294901760 & t
                                , s = t << 16 | 65535 & a;
                            n[0] ^= a,
                                n[1] ^= o,
                                n[2] ^= t,
                                n[3] ^= s,
                                n[4] ^= a,
                                n[5] ^= o,
                                n[6] ^= t,
                                n[7] ^= s;
                            for (r = 0; r < 4; r++)
                                jr.call(this)
                        }
                    },
                    _doProcessBlock: function (e, t) {
                        var r = this._X;
                        jr.call(this),
                            f[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16,
                            f[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16,
                            f[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16,
                            f[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16;
                        for (var i = 0; i < 4; i++)
                            f[i] = 16711935 & (f[i] << 8 | f[i] >>> 24) | 4278255360 & (f[i] << 24 | f[i] >>> 8),
                                e[t + i] ^= f[i]
                    },
                    blockSize: 4,
                    ivSize: 2
                }),
                I.Rabbit = x._createHelper(v),
                w.Rabbit)),
        mr || (mr = 1,
            Wr.exports = (v = p(),
                g(),
                m(),
                y(),
                A(),
                Pe = (yr = v).lib.StreamCipher,
                i = yr.algo,
                d = [],
                l = [],
                h = [],
                i = i.RabbitLegacy = Pe.extend({
                    _doReset: function () {
                        for (var e = this._key.words, t = this.cfg.iv, r = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], i = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], n = this._b = 0; n < 4; n++)
                            Vr.call(this);
                        for (n = 0; n < 8; n++)
                            i[n] ^= r[n + 4 & 7];
                        if (t) {
                            var e = t.words
                                , t = e[0]
                                , e = e[1]
                                , t = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8)
                                , e = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8)
                                , a = t >>> 16 | 4294901760 & e
                                , o = e << 16 | 65535 & t;
                            i[0] ^= t,
                                i[1] ^= a,
                                i[2] ^= e,
                                i[3] ^= o,
                                i[4] ^= t,
                                i[5] ^= a,
                                i[6] ^= e,
                                i[7] ^= o;
                            for (n = 0; n < 4; n++)
                                Vr.call(this)
                        }
                    },
                    _doProcessBlock: function (e, t) {
                        var r = this._X;
                        Vr.call(this),
                            d[0] = r[0] ^ r[5] >>> 16 ^ r[3] << 16,
                            d[1] = r[2] ^ r[7] >>> 16 ^ r[5] << 16,
                            d[2] = r[4] ^ r[1] >>> 16 ^ r[7] << 16,
                            d[3] = r[6] ^ r[3] >>> 16 ^ r[1] << 16;
                        for (var i = 0; i < 4; i++)
                            d[i] = 16711935 & (d[i] << 8 | d[i] >>> 24) | 4278255360 & (d[i] << 24 | d[i] >>> 8),
                                e[t + i] ^= d[i]
                    },
                    blockSize: 4,
                    ivSize: 2
                }),
                yr.RabbitLegacy = Pe._createHelper(i),
                v.RabbitLegacy)),
        t);
    var $r, Jr = ve;
    class Zr {
    }
    Zr.ADFLY_REPORT_URL = "https://cpl.minigame.work:19443/v1/event-publish/api/event/publish",
        Zr.ADFLY_REPORT_DOMAIN = "https://ingress.minigame.vip:30443",
        Zr.ADFLY_REPORT_PUBLISH = "v1/event-publish/api/event/publish";
    (Ke = $r = $r || {}).get = "GET",
        Ke.post = "POST";
    class Qr {
        onGameEvent(t) {
            var r = new URLSearchParams(window.location.search);
            if (r.has("clickid")) {
                var i = r.get("clickid");
                let e = "";
                r.has("gaid") && (e = r.get("gaid"));
                r = {},
                    t = (r.subject = t.eventName,
                        t.label && (r.eventValue = t.label),
                        {});
                t.channelId = se.getChannelName(),
                    t.gameId = se.minigameOption.game_id,
                    t.clickId = i,
                    t.event = r,
                    t.ts = "" + class {
                        static getTimestamp() {
                            return (new Date).getTime()
                        }
                        static getTimeBySecond() {
                            return Math.floor((new Date).getTime() / 1e3)
                        }
                        static getDate() {
                            return (new Date).toLocaleDateString()
                        }
                        static getTargetTimestamp(e = 0, t = 0, r = 0) {
                            var i = new Date((new Date).toLocaleDateString()).getTime();
                            return new Date(i + 1e3 * (3600 * e + 60 * t + r)).getTime()
                        }
                        static waitTime(t, r) {
                            return new Promise(e => {
                                setTimeout(() => {
                                    r && r(),
                                        e()
                                }
                                    , t)
                            }
                            )
                        }
                        static convertToWIB(e) {
                            let t = +e;
                            10 === e.length && (t *= 1e3);
                            e = t - 36e5,
                                e = new Date(e);
                            return this.formatDate(e)
                        }
                        static convertToIST(e) {
                            let t = +e;
                            10 === e.length && (t *= 1e3);
                            e = t - 9e6,
                                e = new Date(e);
                            return this.formatDate(e)
                        }
                        static convertToStandardTime(e, t) {
                            switch (e) {
                                case "ID":
                                    return this.convertToWIB(t);
                                case "IN":
                                    return this.convertToIST(t);
                                default:
                                    return console.warn("No corresponding country code found."),
                                        ""
                            }
                        }
                        static padTo2Digits(e) {
                            return e.toString().padStart(2, "0")
                        }
                        static formatDate(e) {
                            return [e.getFullYear(), this.padTo2Digits(e.getMonth() + 1), this.padTo2Digits(e.getDate())].join(".") + " " + [this.padTo2Digits(e.getHours()), this.padTo2Digits(e.getMinutes()), this.padTo2Digits(e.getSeconds())].join(":")
                        }
                    }
                        .getTimeBySecond(),
                    0 < e.length && (t.gaid = e),
                    this.reportToMinigameEventGateway(t),
                    console.info("====> reportModel: ", t)
            } else
                console.error("location search hasn't clickid field")
        }
        reportToMinigameEventGateway(s) {
            return c(this, void 0, void 0, function* () {
                var e = $r.post
                    , t = (new Date).toUTCString().toString()
                    , r = Jr.SHA256
                    , i = Jr.enc.Base64
                    , n = Jr.HmacSHA512
                    , a = s
                    , r = "SHA-256=" + i.stringify(r(JSON.stringify(a)))
                    , i = i.stringify(n(`(request-target): post /${Zr.ADFLY_REPORT_PUBLISH}
x-date: ${t}
digest: ` + r, "HMACSHA512-SecretKey"))
                    , n = new Headers
                    , i = (n.append("Authorization", `Signature keyId="write",algorithm="hmac-sha512",headers="(request-target) x-date digest",signature="${i}"`),
                        n.append("Content-Type", "application/json"),
                        n.append("x-date", t),
                        n.append("digest", r),
                    {
                        method: e,
                        headers: n,
                        body: JSON.stringify(a)
                    });
                const o = Zr.ADFLY_REPORT_DOMAIN + "/" + Zr.ADFLY_REPORT_PUBLISH;
                console.info("=====> reportToMinigameEventGateway: ", JSON.stringify(a)),
                    yield fetch(o, i).then(e => {
                        e.ok ? (e.json(),
                            console.info(`====> reportToMinigameEventGateway post ${o} success response: ` + JSON.stringify(e.json()))) : console.error(`====> reportToMinigameEventGateway post ${o} fail status: ` + e.status)
                    }
                    ).catch(e => {
                        console.error("====> reportToMinigameEventGateway setData error: " + e.message)
                    }
                    )
            })
        }
    }
    class ei {
        static get instance() {
            return this._instance || (this._instance = new ei),
                this._instance
        }
        constructor() {
            this._curReport = null,
                this._curReport = new Qr
        }
        onGameEvent(e) {
            e ? this._curReport ? this._curReport.onGameEvent(e) : console.error("cur report instance is null") : console.error("report event is null")
        }
    }
    ei._instance = null;
    const ti = ei.instance;
    class ri extends ce {
        static createRequest(e) {
            return {
                type: ri.requestType,
                payload: e
            }
        }
        static createService() {
            return new ri(ri.requestType, !1, ri.handleRequestAsync)
        }
        static handleRequestAsync(e) {
            return ti.onGameEvent(e.payload),
                Promise.resolve(le(e))
        }
    }
    ri.requestType = "GameEventReportService";
    let ii = document;
    function ni(a, o = !1, s) {
        return c(this, void 0, void 0, function* () {
            return new Promise((e, t) => {
                const r = ii.createElement("script");
                if (r.src = a,
                    r.async = o,
                    s)
                    for (const n in s)
                        r.setAttribute(n, s[n]);
                const i = () => {
                    r.removeEventListener("load", i),
                        e()
                }
                    ;
                r.addEventListener("load", i),
                    r.addEventListener("error", e => {
                        console.error(e),
                            t(new Error("Failed to load " + a))
                    }
                    ),
                    (ii.getElementsByTagName("head")[0] || document.documentElement).appendChild(r)
            }
            )
        })
    }
    const ai = class ui {
        constructor() {
            this._gameName = "",
                this._enabled = !1,
                this._commonInfo = null
        }
        static get instance() {
            return this._instance || (this._instance = new ui),
                this._instance
        }
        initGa(e) {
            function t() {
                window.dataLayer.push(arguments)
            }
            window.dataLayer = window.dataLayer || [],
                window.gaLog = window.gtag || t;
            var r = e.config.gid;
            r ? (console.info("[minigame] init ga with id: " + r),
                ni("https://www.googletagmanager.com/gtag/js?id=" + r, !0, e.attributes).then(() => { }
                ).catch(e => {
                    console.error("[minigame] init ga error: ", e)
                }
                ),
                t("js", new Date),
                t("config", r, {
                    cookie_flags: "max-age=7200;secure;samesite=none"
                })) : console.warn("[minigame] ga with invalid id: " + r)
        }
        init(e, t, r = 0) {
            try {
                e && e.enabled ? (this._enabled = e.enabled,
                    this._gameName = t,
                    this._enabled && this.initGa(e)) : (console.info("====> ga is disabled"),
                        this._enabled = !1)
            } catch (e) {
                this._enabled = !1,
                    console.info("Fail to load init Analytics: ", e)
            }
        }
        isH5AndroidApp() {
            return !!this._commonInfo && !!this._commonInfo._minigameOption && !!this._commonInfo._minigameOption.android && this._commonInfo._minigameOption.android.enabled
        }
        isAdflyCplEnable() {
            return !!(this._commonInfo && this._commonInfo._minigameOption && this._commonInfo._minigameOption.cpl && this._commonInfo._minigameOption.cpl.adflyer) && this._commonInfo._minigameOption.cpl.adflyer.enabled
        }
        onGameEvent(r, i, n) {
            return c(this, void 0, void 0, function* () {
                if (this._enabled) {
                    var e, t = window.mediationClient;
                    if (ue.isH5Android())
                        try {
                            yield t.invokeServiceAsync(s.createRequest(r))
                        } catch (e) {
                            console.info("android track event error: " + e)
                        }
                    else {
                        try {
                            (0,
                                window.gaLog)("event", r, {
                                    event_category: n || "game_" + this._gameName,
                                    event_label: i
                                }),
                                console.info(`gtag event action = ${r}, label = ` + i)
                        } catch (e) {
                            console.info("gtag error: ", e)
                        }
                        try {
                            ue.isAdflyCplEnable() ? (e = {
                                eventName: r,
                                label: i
                            },
                                yield t.invokeServiceAsync(ri.createRequest(e))) : console.info("adflyer cpl is disable")
                        } catch (e) {
                            console.info("game report service invoked error: " + e.message)
                        }
                    }
                } else
                    console.info("====> onGameEvent is disabled")
            })
        }
    }
        .instance
        , oi = {
            LOCAL: "local",
            MINIGAME: "minigame",
            FBIG: "fbig",
            CHALLENGE: "challenge",
            MATCH: "match",
            YANDEX: "yandex"
        }
        , si = {
            platform: oi.LOCAL,
            sdk: "https://sdk.minigame.vip/js/1.0/minigame-sdk.js",
            instance: "FBInstant",
            gameName: "minigame",
            features: {
                ads: {
                    enabled: !0,
                    isBannerEnabled: !0,
                    isAdRadical: !1,
                    isTest: !0,
                    isAndroidApp: !1,
                    config: {
                        banner: "4864743603539728_5082905605056859",
                        interstitial: "4864743603539728_5070034729677280",
                        rewarded_video: "4864743603539728_5070034119677341",
                        rewarded_interstitial: "4864743603539728_5070034119677341"
                    },
                    options: {
                        fb_max_ad_instance: 3,
                        fb_init_ad_count: 3,
                        fb_banner_refresh_interval: 0,
                        fb_interstitial_refresh_interval: 0,
                        fb_rewarded_video_refresh_interval: 0,
                        fb_max_banner_error: 1,
                        fb_max_interstitial_error: 3,
                        fb_max_rewarded_video_error: 3,
                        fb_auto_load_on_play: !0,
                        fb_auto_reload_delay: 1,
                        fb_ad_delay_for_first_banner: 0,
                        fb_ad_delay_for_first_interstitial: 0,
                        fb_ad_delay_for_first_rewarded_video: 0
                    }
                },
                leaderboard: {
                    enabled: !1
                },
                ga: {
                    enabled: !0,
                    isDefault: !1,
                    config: {
                        gid: "UA-213371115-3"
                    }
                }
            }
        };
    function ci(r) {
        return c(this, void 0, void 0, function* () {
            let t = si;
            try {
                n = r;
                var e = yield new Promise((t, r) => {
                    const i = new XMLHttpRequest;
                    i.open("GET", n),
                        i.onload = function () {
                            var e;
                            200 === i.status ? (e = JSON.parse(i.responseText),
                                console.info("config loaded:", e),
                                t(e)) : r({
                                    message: "fail to get config data from " + n
                                })
                        }
                        ,
                        i.onerror = function () {
                            r({
                                message: "fail to get config data from : " + i.statusText
                            })
                        }
                        ,
                        i.send()
                }
                );
                return t = e,
                    console.info("config loaded with XHR:", t),
                    Promise.resolve(t)
            } catch (e) {
                return console.info("use default config with XHR: ", t),
                    Promise.reject({
                        message: "load config failed width XHR: " + e.message
                    })
            }
            var n
        })
    }
    function di(r) {
        return c(this, void 0, void 0, function* () {
            try {
                var e, t;
                return window.minigamePlatform = r.platform,
                    window.minigameConfig = r.features,
                    r && r.sdk ? (yield ni(r.sdk),
                        e = r.instance || si.instance,
                        (t = window[e]) && t.initializeAsync ? (window.minigameLoader = t,
                            (window.minigame = t).initializeAsync()) : Promise.reject({
                                message: "sdk instance not found: " + e
                            })) : Promise.reject({
                                message: "sdk url is not defined: " + r
                            })
            } catch (e) {
                return Promise.reject({
                    message: "load platform failed: " + e
                })
            }
        })
    }
    var li = {
        version: "1.0.21",
        inited: !1,
        initializeAsync: function (a) {
            return c(this, void 0, void 0, function* () {
                if (this.inited)
                    return console.warn("minigame sdk already inited"),
                        Promise.reject({
                            message: "minigame sdk already inited"
                        });
                this.inited = !0,
                    console.info("minigame loader started...");
                var e = (a || "minigame.json") + "?st=" + (new Date).getTime();
                let t;
                try {
                    t = yield ci(e)
                } catch (e) {
                    return Promise.reject({
                        message: "minigame sdk load config failed: " + e.message
                    })
                }
                try {
                    yield di(t)
                } catch (e) {
                    return Promise.reject({
                        message: "minigame sdk init failed: " + e.message
                    })
                }
                if (console.info("minigame loader inited..."),
                    !t.features || !t.features.ads)
                    return console.info("missing features or missing ads"),
                        Promise.reject({
                            message: "missing features or missing ads"
                        });
                return Promise.resolve()
                /*t.platform !== oi.MATCH && (ae.load(t.features.ads),
                    window.MiniGameAds = ae,
                    window.MinigameAds = ae);
                var { features: e, platform: r } = t
                    , e = e.ads["isTest"];
                if (!e && r !== oi.FBIG && r !== oi.YANDEX && !ae.isAndroidApp)
                    try {
                        yield ue.init()
                    } catch (e) {
                        console.error("MiniGameInfo init fail: ", e)
                    }
                window.MiniGameInfo = ue,
                    window.MiniGameEvent = he;
                try {
                    var i = t.features.ga || si.features.ga
                        , n = t.gameName || si.gameName;
                    yield ai.init(i, n, e)
                } catch (e) {
                    console.error("MiniGameAnalytics init fail: ", e)
                }
                return window.Analytics = ai,
                    window.MiniGameAnalytics = ai,
                    Promise.resolve()*/
            })
        },
        setLoadingProgress: function (e) {
            throw {
                code: C.CODE.NOT_READY,
                message: "minigameLoader.setLoadingProgress not injected"
            }
        },
        startGameAsync: function () {
            throw {
                code: C.CODE.NOT_READY,
                message: "minigameLoader.startGameAsync not injected"
            }
        }
    };
    console.info("minigame sdk: " + li.version),
        window.FBInstant = li,
        window.minigame = li,
        e.MINIGAME_DEFAULT_CONFIG = si,
        e.MINIGAME_PLATFORM = oi,
        e.loadConfigAsync = function (r) {
            return c(this, void 0, void 0, function* () {
                let t = si;
                try {
                    var e = yield fetch(r);
                    return 404 === e.status ? Promise.reject({
                        message: r + " not found"
                    }) : (t = yield e.json(),
                        console.info("config loaded:", t),
                        Promise.resolve(t))
                } catch (e) {
                    return console.info("use default config: ", t),
                        Promise.reject({
                            message: "load config failed: " + e
                        })
                }
            })
        }
        ,
        e.loadPlatformAndInitAsync = di,
        e.minigameLoader = li,
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
});

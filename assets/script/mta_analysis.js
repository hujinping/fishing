function t() {
                try {
                    var t = "s" + n();
                    return wx.setStorageSync(p.prefix + "ssid", t), t;
                } catch (t) {}
            }
            function n(a) {
                for (var e = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], t = 10; 1 < t; t--) {
                    var o = D(10 * Math.random()), r = e[o];
                    e[o] = e[t - 1], e[t - 1] = r;
                }
                for (t = o = 0; 5 > t; t++) o = 10 * o + e[t];
                return (a || "") + (o + "") + +new Date();
            }
            function l() {
                var a = {
                    dm: "wechat.apps.xx",
                    url: function() {
                        try {
                            var a = getCurrentPages(), e = "/";
                            return 0 < a.length && (e = a.pop().__route__), e;
                        } catch (t) {
                            console.log("get current page path error:" + t);
                        }
                    }(),
                    pvi: "",
                    si: "",
                    ty: 0
                };
                return a.pvi = function() {
                    var e = function() {
                        try {
                            return wx.getStorageSync(p.prefix + "auid");
                        } catch (t) {}
                    }();
                    return e || (e = function() {
                        try {
                            var t = n();
                            return wx.setStorageSync(p.prefix + "auid", t), t;
                        } catch (t) {}
                    }(), a.ty = 1), e;
                }(), a.si = function() {
                    var a = function() {
                        try {
                            return wx.getStorageSync(p.prefix + "ssid");
                        } catch (t) {}
                    }();
                    return a || (a = t()), a;
                }(), a;
            }
            function s() {
                var t = function() {
                    var t = wx.getSystemInfoSync();
                    return {
                        adt: encodeURIComponent(t.model),
                        scl: t.pixelRatio,
                        scr: t.windowWidth + "x" + t.windowHeight,
                        lg: t.language,
                        fl: t.version,
                        jv: encodeURIComponent(t.system),
                        tz: encodeURIComponent(t.platform)
                    };
                }();
                return function(a) {
                    wx.getNetworkType({
                        success: function(e) {
                            a(e.networkType);
                        }
                    });
                }(function(t) {
                    try {
                        wx.setStorageSync(p.prefix + "ntdata", t);
                    } catch (t) {}
                }), t.ct = wx.getStorageSync(p.prefix + "ntdata") || "4g", t;
            }
            function o() {
                var a = r.Data.userInfo, t = [], o;
                for (o in a) a.hasOwnProperty(o) && t.push(o + "=" + a[o]);
                return a = t.join(";"), {
                    r2: p.app_id,
                    r4: "wx",
                    ext: "v=" + p.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
                };
            }
            
            var p = {
                app_id: "",
                event_id: "",
                api_base: "https://pingtas.qq.com/pingd",
                prefix: "_mta_",
                version: "1.3.6",
                stat_share_app: !1,
                stat_pull_down_fresh: !1,
                stat_reach_bottom: !1
            }, r = {
                App: {
                    init: function(a) {
                        "appID" in a && (p.app_id = a.appID), "eventID" in a && (p.event_id = a.eventID), 
                        "statShareApp" in a && (p.stat_share_app = a.statShareApp), "statPullDownFresh" in a && (p.stat_pull_down_fresh = a.statPullDownFresh), 
                        "statReachBottom" in a && (p.stat_reach_bottom = a.statReachBottom), t();
                        try {
                            "lauchOpts" in a && (r.Data.lanchInfo = a.lauchOpts, r.Data.lanchInfo.landing = 1);
                        } catch (t) {}
                    }
                },
                Page: {
                    init: function() {
                        var a = getCurrentPages()[getCurrentPages().length - 1];
                        a.onShow && function() {
                            var e = a.onShow;
                            a.onShow = function() {
                                r.Page.stat(), e.call(this, arguments);
                            };
                        }(), p.stat_pull_down_fresh && a.onPullDownRefresh && function() {
                            var e = a.onPullDownRefresh;
                            a.onPullDownRefresh = function() {
                                r.Event.stat(p.prefix + "pulldownfresh", {
                                    url: a.__route__
                                }), e.call(this, arguments);
                            };
                        }(), p.stat_reach_bottom && a.onReachBottom && function() {
                            var e = a.onReachBottom;
                            a.onReachBottom = function() {
                                r.Event.stat(p.prefix + "reachbottom", {
                                    url: a.__route__
                                }), e.call(this, arguments);
                            };
                        }(), p.stat_share_app && a.onShareAppMessage && function() {
                            var e = a.onShareAppMessage;
                            a.onShareAppMessage = function() {
                                return r.Event.stat(p.prefix + "shareapp", {
                                    url: a.__route__
                                }), e.call(this, arguments);
                            };
                        }();
                    },
                    multiStat: function(a, e) {
                        if (1 == e) r.Page.stat(a); else {
                            var o = getCurrentPages()[getCurrentPages().length - 1];
                            o.onShow && function() {
                                var e = o.onShow;
                                o.onShow = function() {
                                    r.Page.stat(a), e.call(this, arguments);
                                };
                            }();
                        }
                    },
                    stat: function(d) {
                        if ("" != p.app_id) {
                            var e = [], t = o();
                            if (d && (t.r2 = d), d = [ l(), t, s() ], r.Data.lanchInfo) {
                                d.push({
                                    ht: r.Data.lanchInfo.scene,
                                    rdm: "/",
                                    rurl: r.Data.lanchInfo.path
                                }), r.Data.lanchInfo.query && r.Data.lanchInfo.query._mta_ref_id && d.push({
                                    rarg: r.Data.lanchInfo.query._mta_ref_id
                                });
                                try {
                                    1 == r.Data.lanchInfo.landing && (t.ext += ";lp=1", r.Data.lanchInfo.landing = 0);
                                } catch (t) {}
                            }
                            d.push({
                                rand: +new Date()
                            }), t = 0;
                            for (var i = d.length; t < i; t++) for (var n in d[t]) d[t].hasOwnProperty(n) && e.push(n + "=" + (void 0 === d[t][n] ? "" : d[t][n]));
                            wx.request({
                                url: p.api_base + "?" + e.join("&").toLowerCase()
                            });
                        }
                    }
                },
                Event: {
                    stat: function(r, e) {
                        if ("" != p.event_id) {
                            var t = [], i = l(), n = o();
                            i.dm = "wxapps.click", i.url = r, n.r2 = p.event_id;
                            var a = void 0 === e ? {} : e, f = [], d;
                            for (d in a) a.hasOwnProperty(d) && f.push(encodeURIComponent(d) + "=" + encodeURIComponent(a[d]));
                            for (a = f.join(";"), n.r5 = a, a = 0, n = (i = [ i, n, s(), {
                                rand: +new Date()
                            } ]).length; a < n; a++) for (var c in i[a]) i[a].hasOwnProperty(c) && t.push(c + "=" + (void 0 === i[a][c] ? "" : i[a][c]));
                            wx.request({
                                url: p.api_base + "?" + t.join("&").toLowerCase()
                            });
                        }
                    }
                },
                Data: {
                    userInfo: null,
                    lanchInfo: null
                }
            };
            module.exports = r
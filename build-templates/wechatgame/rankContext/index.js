(function() {
    var a = function(a, b) {
            if (!a) return a;
            for (var c, d, e = 0, f = 0, g = 0; g < a.length; g++) d = a.charCodeAt(g), f += 0 <= d && 128 >= d ? 1 : 2,
                f <= b - 2 && e++;
            return f <= b ? c = a.slice(0) : (c = a.slice(0, e), c += ".."), c;
        },
        b = function(a) {
            console.log(a);
        },
        c = function(a) {
            wx.setUserCloudStorage({
                KVDataList: [{
                    key: "maxscore",
                    value: a.maxscore + ""
                }, {
                    key: "maxscore2",
                    value: a.maxscore2 + ""
                }, {
                    key: "userId",
                    value: a.userId + ""
                }],
                success: function() {
                    b("setUserCloudStorage====" + a.maxscore + "====" + JSON.stringify(arguments));
                },
                fail: function() {
                    b(JSON.stringify(arguments));
                },
                complete: function() {}
            });
        },
        d = function(a) {
            b("开放数据域逻辑加载成功！showFriendRank");
            var c = wx.getSharedCanvas(),
                d = c.getContext("2d");
            d.globalAlpha = 0, wx.getFriendCloudStorage({
                keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                success: function(b) {
                    var c = b.data;
                    d.globalAlpha = 1, f(c, a);
                },
                fail: function() {
                    b(null, JSON.stringify(arguments));
                },
                complete: function() {}
            });
        },
        e = function(a) {
            var b = "0",
                c = 0,
                d = 0;
            if (a.KVDataList && 0 < a.KVDataList.length)
                for (var e, f = 0; f < a.KVDataList.length; f++) e = a.KVDataList[f].key,
                    "userId" == e && (b = a.KVDataList[f].value), "maxscore" == e && (c = parseInt(a.KVDataList[f].value)),
                    "maxscore2" == e && (d = parseInt(a.KVDataList[f].value));
            a.userId = b, a.maxscore = c, a.maxscore2 = d;
        },
        f = function(c, d) {
            for (var f, g = 0; g < c.length && (f = c[g], !!f);) {
                e(f);
                for (var h, j = 1 == d.index ? f.maxscore : f.maxscore2, l = g - 1; 0 <= l && (h = 1 == d.index ? c[l].maxscore : c[l].maxscore2,
                        j > h);) c[l + 1] = c[l], c[l] = f, l--;
                g++;
            }
            b("drawRankList+++++++++++++++++in canvas");
            var k = wx.getSharedCanvas(),
                m = k.getContext("2d");
            if (m.textBaseline = "middle", m.textAlign = "center", c && 0 < c.length)
                for (var n = 0; 21 > n; n++) {


                    var o = n + "";
                    if (c[0].rank || (o = n + 1 + ""), n < c.length) {
                        m.font = "30px Arial bold";
                        var i = 110 * (n + 1);
                        m.fillStyle = "#a77263", m.fillRect(0, i - 2, 650, 4), m.fillStyle = "#642100";
                        if (m.textAlign = "center", 4 > n) {
                            0 == n && c[0].rank && (o = c[0].rank);
                            var p = wx.createImage();
                            p.toY = i - 55, 1 == o ? (p.src = "res/raw-assets/resources/rank/rank_1.png", p.onload = function(a) {
                                var c = a.target;
                                b("img: " + c.toY), m.drawImage(c, 0, c.toY - 24, 70, 53);
                            }) : 2 == o ? (p.src = "res/raw-assets/resources/rank/rank_2.png", p.onload = function(a) {
                                var c = a.target;
                                b("img: " + c.toY), m.drawImage(c, 0, c.toY - 24, 70, 53);
                            }) : 3 == o ? (p.src = "res/raw-assets/resources/rank/rank_3.png", p.onload = function(a) {
                                var c = a.target;
                                b("img: " + c.toY), m.drawImage(c, 0, c.toY - 24, 70, 53);
                            }) : (m.font = "38px Arial bolder", m.fillStyle = "#a53a0b", m.fillText(o, 40, i - 55));
                        } else m.font = "38px Arial bolder", m.fillStyle = "#a53a0b", m.fillText(o, 40, i - 55);
                        var q = c[n],
                            r = wx.createImage();
                        r.toY = n, r.src = "" == q.avatarUrl ? "res/raw-assets/resources/rank/defaulthead.png" : q.avatarUrl,
                            r.onload = function(a) {
                                var c = a.target,
                                    d = 33;
                                b("headImage . toY: " + n), m.drawImage(c, 73, 110 * c.toY + (55 - d), 2 * d, 2 * d);
                            }, m.font = "30px Arial bolder", m.fillStyle = "#a77263", m.textAlign = "left", m.fillText(a(q.nickname, 10), 186, i - 55),
                            m.font = "30px Arial bolder", m.fillStyle = "#a77263", m.textAlign = "right", 1 == d.index ? q.maxscore ? m.fillText(q.maxscore, 480, i - 55) : m.fillText("0", 480, i - 55) : q.maxscore2 ? m.fillText(q.maxscore2, 480, i - 55) : m.fillText("0", 480, i - 55);
                    } else m.textAlign = "center", m.fillText("", 40, i - 55), m.textAlign = "left",
                        m.fillText("", 186, i - 55);
                }
        },
        g = function() {
            var a = wx.getSharedCanvas(),
                b = a.getContext("2d");
            b.clearRect(0, 0, 530, 1890), b.fillStyle = "#24a08e", b.fillRect(0, 0, 530, 1890),
                b.font = "26px Arial", b.fillStyle = "#ffffff", b.textAlign = "center", b.fillText("加载中...", 265, 350);
        },
        h = function() {
            this;
            wx.getUserInfo({
                openIdList: ["selfOpenId"],
                lang: "zh_CN",
                success: a => {
                    console.log("success", a.data);
                    a.data[0].nickName;
                    i(a.data[0]);
                },
                fail: a => {
                    reject(a);
                }
            });
        },
        i = function(b) {
            var c = wx.getSharedCanvas(),
                d = c.getContext("2d");
            d.fillStyle = "rgba(225,225,225,0)";
            let e = wx.createImage();
            e.src = b.avatarUrl, e.width = 110, e.height = 110, e.onload = function(c) {
                var e = c.target;
                d.drawImage(e, 5, 22, 77, 77), d.font = "26px Arial bolder", d.textAlign = "left",
                    d.fillStyle = "#FFFFFF", d.fillText(a(b.nickName, 10), 130, 70);
            };
        },
        j = function(a) {
            b("开放数据域逻辑加载成功！showGroupRank");
            var c = wx.getSharedCanvas(),
                d = c.getContext("2d");
            d.globalAlpha = 0, wx.getGroupCloudStorage({
                shareTicket: a.shareTicket,
                keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                success: function(b) {
                    var c = b.data;
                    d.globalAlpha = 1, f(c, a);
                },
                fail: function() {
                    b(null, JSON.stringify(arguments));
                },
                complete: function() {}
            });
        },
        k = function(a) {
            wx.getUserInfo({
                openIdList: ["selfOpenId"],
                lang: "zh_CN",
                success: function(b) {
                    var c = wx.getSharedCanvas(),
                        d = c.getContext("2d");
                    d[a.method_id] = {
                        data: b.data,
                        status: !0
                    };
                },
                fail: function(b) {
                    var c = wx.getSharedCanvas(),
                        d = c.getContext("2d");
                    d[a.method_id] = {
                        data: b,
                        status: !1
                    };
                }
            });
        },
        l = function(a) {
            wx.getFriendCloudStorage({
                keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                success: function(b) {
                    var c = b.data,
                        d = wx.getSharedCanvas(),
                        e = d.getContext("2d");
                    e[a.method_id] = {
                        data: c,
                        status: !0
                    };
                },
                fail: function(b) {
                    var c = wx.getSharedCanvas(),
                        d = c.getContext("2d");
                    d[a.method_id] = {
                        data: b,
                        status: !1
                    };
                },
                complete: function() {}
            });
        },
        m = function(a) {
            wx.getGroupCloudStorage({
                shareTicket: a.shareTicket,
                keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                success: function(b) {
                    console.log("getGroupRankData_success" + JSON.stringify(b));
                    var c = b.data,
                        d = wx.getSharedCanvas(),
                        e = d.getContext("2d");
                    e[a.method_id] = {
                        data: c,
                        status: !0
                    };
                },
                fail: function(b) {
                    console.log("getGroupRankData_fail" + JSON.stringify(b));
                    var c = wx.getSharedCanvas(),
                        d = c.getContext("2d");
                    d[a.method_id] = {
                        data: b,
                        status: !1
                    };
                },
                complete: function() {}
            });
        },
        n = function(a) {
            if (a) try {
                for (var b, c = 0; c < a.length && (b = a[c], !!b);) {
                    e(b);
                    for (var d, f = b.maxscore2, g = c - 1; 0 <= g && (d = a[g].maxscore2, f > d);) a[g + 1] = a[g],
                        a[g] = b, g--;
                    c++;
                }
            } catch (a) {
                console.log(" scoreroat  error");
            }
        },
        o = function(a, b, c) {
            if (c = parseInt(c), !a) return null;
            try {
                for (var d, e = a.length - 1; - 1 < e && (d = a[e], !!d); e--) {
                    var f = d.openid,
                        g = d.maxscore2;
                    if (g && b != f && c < g) {
                        var d = {
                            headUrl: d.avatarUrl,
                            name: d.nickname,
                            nextScore: g,
                            userId: f
                        };
                        return d;
                    }
                }
            } catch (a) {
                console.log(" getNextPlayer  error");
            }
            return null;
        },
        p = function(a, c, d, e) {
            var f = wx.getSharedCanvas(),
                g = f.getContext("2d");
            g.clearRect(0, 0, 530, 1890);
            var h = wx.getSharedCanvas(),
                g = h.getContext("2d");
            g.textBaseline = "middle", g.textAlign = "center", g.font = "26px Arial bolder",
                g.fillStyle = "#ffffff";
            var a = a,
                i = c;
            i = i.slice(0, 5);
            var d = d;
            0 == e ? g.fillText("即将超越", 63, 25) : 1 == e && g.fillText("霸榜", 63, 25), g.fillText(i.toString(), 63, 165),
                g.fillText(d.toString() + "米", 63, 195);
            var j = wx.createImage();
            j.src = a, j.onload = function(a) {
                var c = a.target;
                b("headImage . toY: " + c), g.drawImage(c, 15, 45, 96, 96);
            };
        };
    //old_Beyond_UserId = -1, FriendCloudStorage = {};
    var q = function(a, b, c) {
            var d = o(a, b, c);
            var old_Beyond_UserId = -1;
            if (d != void 0) {
                if (old_Beyond_UserId == d.userId) return;
                old_Beyond_UserId = d.userId, p(d.headUrl, d.name, d.nextScore, 0);
            } else {
                if (old_Beyond_UserId == b) return;
                old_Beyond_UserId = b;
                try {
                    wx.getUserInfo({
                        openIdList: ["selfOpenId"],
                        lang: "zh_CN",
                        success: a => {
                            let b = a.data[0];
                            p(b.avatarUrl, b.nickName, c, 1);
                        },
                        fail: a => {
                            reject(a);
                        }
                    });
                } catch (a) {
                    console.log(" wx.getUserInfo  error");
                }
            }
        },
        r = function(a) {
            var c = wx.getSharedCanvas(),
                d = c.getContext("2d");
            d.globalAlpha = 0;
            var FriendCloudStorage = {};
            var old_Beyond_UserId = -1;
            try {
                wx.getFriendCloudStorage({
                    keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                    success: function(b) {
                        FriendCloudStorage = b, d.globalAlpha = 1, n(FriendCloudStorage.data), q(FriendCloudStorage.data, a.userId, a.score);
                    },
                    fail: function() {
                        b(null, JSON.stringify(arguments));
                    },
                    complete: function() {}
                });
            } catch (a) {
                console.log(" wx.getFriendCloudStorage  error");
            }
        },
        s = function(a) {
            var b = wx.getSharedCanvas(),
                c = b.getContext("2d");
            if (c.textBaseline = "middle", c.textAlign = "center", c.font = "26px Arial bolder",
                c.fillStyle = "#ffffff", a && 0 < a.length)
                for (var d = 0; d < a.length; d++) {
                    var e = a[d].avatarUrl,
                        f = a[d].nickname;
                    f = f.slice(0, 5);
                    var g = a[d].maxscore2;
                    c.fillText(f.toString(), 63, 165), c.fillText(g.toString(), 63, 195);
                    var h = wx.createImage();
                    h.src = e, h.onload = function(a) {
                        var b = a.target;
                        c.drawImage(b, 15, 45, 96, 96);
                    };
                }
        },
        t = function() {
            var a = wx.getSharedCanvas(),
                c = a.getContext("2d");
            c.globalAlpha = 0;
            var FriendCloudStorage = null;
            try {
                wx.getFriendCloudStorage({
                    keyList: ["avatarUrl", "nickName", "userId", "maxscore", "maxscore2"],
                    success: function(a) {
                        FriendCloudStorage = a, c.globalAlpha = 1, n(FriendCloudStorage.data), s(FriendCloudStorage.data);
                    },
                    fail: function() {
                        b(null, JSON.stringify(arguments));
                    },
                    complete: function() {}
                });
            } catch (a) {
                console.log(" wx.getFriendCloudStorage  error");
            }
        };
    wx.onMessage(function(a) {
        switch (a.method) {
            case "updateMaxScore":
                {
                    c(a);
                    break;
                }

            case "showFriendRank":
                {
                    console.log("log-----------子域 显示排行");
                    d(a);
                    break;
                }

            case "showOrigin":
                {
                    g();
                    break;
                }

            case "showUserInfo":
                {
                    h();
                    break;
                }

            case "showGroupRank":
                {
                    j(a);
                    break;
                }

            case "getUserInfo":
                {
                    k(a);
                    break;
                }

            case "getFriendRankData":
                {
                    l(a);
                    break;
                }

            case "getGroupRankData":
                {
                    m(a);
                    break;
                }

            case "showBeyond":
                {
                    r(a);
                    break;
                }

            case "showBeyondList":
                {
                    t(a);
                    break;
                }
        }
    });
})();
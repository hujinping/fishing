mg.EventDispatcher = {
                _TAG: "mg.EventDispatcher",
                events: {},
                _filtercmd: [ "heart_beat_back_from_server", "tcp_receive", "heart_beat_logic" ],
                listen: function(a, e, o) {
                    this.events[a] = this.events[a] || [], this.events[a].push({
                        scope: o || this,
                        handler: e
                    });
                },
                ignore: function(a, o, t) {
                    t = t || this;
                    var e = this.events[a];
                    e && (mg.LOGD(this._TAG, "取消监听： " + a), this.events[a] = e.filter(function(a) {
                        return a.scope != t || a.handler != o;
                    }));
                },
                ignoreScope: function(a) {
                    for (var e in this.events) {
                        var t = this.events[e];
                        t && (this.events[e] = t.filter(function(t) {
                            return t.scope != a || (mg.LOGD(null, "ty.EventDispatcher : remove listener by Scope: " + e), 
                            !1);
                        }));
                    }
                },
                trigger: function(a, e) {
                    var t = this.events[a];
                    if (t) {
                        var o;
                        -1 == this._filtercmd.indexOf(a) && mg.LOGD(this._TAG, "触发监听： " + a);
                        for (var r = 0; r < t.length; r++) (o = t[r]).handler.call(o.scope, e);
                    }
                }
            }
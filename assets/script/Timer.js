mg.Timer = {
                setTimer: function(o, e, t, d, r) {
                    o && o._TAG && mg.LOGD("mg.Timer", "----------in setTimer----------" + (o._TAG ? o._TAG : ""));
                    var n = cc.director.getScheduler();
                    null != d || cc.macro.REPEAT_FOREVER, n.schedule(e, o, t, d, r, !1);
                },
                cancelTimer: function(a, e) {
                    a && a._TAG && mg.LOGD("mg.Timer", "----------in cancelTimer ---------" + (a._TAG ? a._TAG : "")), 
                    cc.director.getScheduler().unschedule(e, a);
                },
                isScheduledTimer: function(a, e) {
                    return a && a._TAG && mg.LOGD("mg.Timer", "----------in isScheduledTimer ---------" + (a._TAG ? a._TAG : "")), 
                    cc.director.getScheduler().isScheduled(e, a);
                }
            }
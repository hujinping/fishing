mg.AudioHelper = {
                soundOpen: 0,
                init: function() {
                    this.getMusicPlayManager(), this.getMusicState();
                },
                getMusicPlayManager: function() {
                    return this.stopMusic(), this.musicPlayManager = wx.createInnerAudioContext(), this.musicPlayManager;
                },
                playMusic: function(a, e, t) {
                    if (-1 != this.soundOpen && (!this._curMusicFile || this._curMusicFile != a)) {
                        this._curMusicFile = a;
                        var o = this.getMusicPlayManager();
                        o && (3 == arguments.length && (o.volume = t), o.autoplay = !0, o.loop = e, o.src = mg.SystemInfo.cdnPath + a);
                    }
                },
                playLocalMusic: function(a, e, t) {
                    if (-1 != this.soundOpen && (!this._curMusicFile || this._curMusicFile != a)) {
                        this._curMusicFile = a;
                        var o = this.getMusicPlayManager();
                        o && (3 == arguments.length && (o.volume = t), o.autoplay = !0, o.loop = e, o.src = cc.url.raw(a));
                    }
                },
                rePlayMusic: function() {
                    this.musicPlayManager && this.musicPlayManager.loop && this.musicPlayManager.play();
                },
                stopMusic: function() {
                    this.musicPlayManager && (this.musicPlayManager.stop(), this.musicPlayManager.destroy(), 
                    this.musicPlayManager = null, this._curMusicFile = void 0);
                },
                playEffect: function(a, e, t) {
                    -1 != this.soundOpen && (3 == arguments.length && this.setEffectsVolume(t), cc.audioEngine.playEffect(mg.SystemInfo.cdnPath + a, e));
                },
                playLocalEffect: function(a, o, t) {
                    -1 != this.soundOpen && (3 == arguments.length && this.setEffectsVolume(t), cc.loader.loadRes(a, cc.AudioClip, function(a, e) {
                        cc.audioEngine.play(e, o, t);
                    }));
                },
                stopEffect: function(t) {
                    0 > t || cc.audioEngine.stopEffect(t);
                },
                stopAllEffects: function() {
                    cc.audioEngine.stopAllEffects();
                },
                unloadAll: function() {
                    cc.audioEngine.uncacheAll();
                },
                setEffectsVolume: function(t) {
                    cc.sys.localStorage.setItem("effect_sound_volume_", t), cc.audioEngine.setEffectsVolume(t), 
                    0 == t && this.stopAllEffects();
                },
                setMusicVolume: function(t) {
                    cc.sys.localStorage.setItem("music_sound_volume_", t), this.musicPlayManager && (this.musicPlayManager.volume = t), 
                    0 == t && this.stopMusic();
                },
                getMusicVolume: function() {
                    var t = cc.sys.localStorage.getItem("music_sound_volume_");
                    return t ? 1 : t;
                },
                getEffectsVolume: function() {
                    var t = cc.sys.localStorage.getItem("effect_sound_volume_");
                    return t ? 0 : t;
                },
                closeMusic: function() {
                    this.soundOpen = -1, cc.sys.localStorage.setItem("_sound_state_", -1), mg.AudioHelper.setMusicVolume(0), 
                    mg.AudioHelper.setEffectsVolume(0);
                },
                openMusic: function() {
                    this.soundOpen = 1, cc.sys.localStorage.setItem("_sound_state_", 1), mg.AudioHelper.setMusicVolume(1), 
                    mg.AudioHelper.setEffectsVolume(1);
                },
                getMusicState: function() {
                    var t = cc.sys.localStorage.getItem("_sound_state_");
                    return this.soundOpen = -1 == t ? -1 : 1, this.soundOpen;
                }
            }
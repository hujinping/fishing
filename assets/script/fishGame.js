cc.Class({
    extends: cc.Component,
    properties: {
        hammerAni: cc.Node,
        sp_skeleton: null,
        index: 0
    },
    onLoad: function() {
        fishMaster.fishGame = this, this.gameState = fishMaster.GameDefine.GAME_STATE.DEFAULT,
            mg.EventDispatcher.listen(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, this.changeGameState, this);

    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, this.changeGameState, this);
    },
    setCollision: function() {
        var t = cc.director.getCollisionManager();
        t.enabled = !0, t.enabledDebugDraw = !1;
    },
    initData: function() {
        fishMaster.disNum = 0, fishMaster.fishDisNum = 0, fishMaster.redPacketFishDisNum = 0,
            mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.FISH_STATE, fishMaster.GameDefine.FISH_STATE.DEFAULT);

        // var a = this.hammerAni.getComponent(cc.Animation);
        // a.play("renggou");

        console.log("log--------------------initData------------ATTACK");
        var sp_skeleton = this.hammerAni.getComponent(sp.Skeleton);
        sp_skeleton.setAnimation(this.index, "ATTACK", false);
        this.index++;
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.PAOGAN, !1);


        this.hammerAni.stopAllActions();
        this.hammerAni.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.callFunc(() => {
                mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.DROP_HOOK, fishMaster.GameDefine.HOOK_STATE.DOWN),
                    this.hidePointerFun();
            })
        ))
    },


    changeGameState: function(t) {
        switch (this.gameState = t, t) {
            case fishMaster.GameDefine.GAME_STATE.DEFAULT:
                var sp_skeleton = this.hammerAni.getComponent(sp.Skeleton);

                sp_skeleton.setAnimation(this.index++, "stand", true);
                this.index++;
                this.showPointerFun();
                break;

            case fishMaster.GameDefine.GAME_STATE.START:
                fishMaster.fishManage.createFish2(), fishMaster.fishManage.createBox(), fishMaster.fishManage.createRedPacketFish(),
                    this.pointerFun();
                console.log("log---------------------创建鱼节点-------------");
                break;

            case fishMaster.GameDefine.GAME_STATE.PLAYING:
            case fishMaster.GameDefine.GAME_STATE.ENDGAME:
        }
    },
    pointerFun: function() {
        this.node.getChildByName("compassView").getComponent(cc.Animation).pause(), this.node.getChildByName("compassView").getChildByName("buffNode").getChildByName("particlesystem").getComponent(cc.ParticleSystem).resetSystem();
        var o = this.node.getChildByName("compassView").getChildByName("pointer").rotation + 135,
            e = this.node.getChildByName("compassView").getChildByName("buffNode"),
            buffTxt0 = e.getChildByName("buffText0"),
            buffTxt1 = e.getChildByName("buffText1"),
            d = e.getChildByName("buff").getComponent(cc.Label),
            r = 0;
        (0 <= o && 65 > o || 115 < o && 180 >= o) && (fishMaster.buff = 1,
            d.string = "", r = 10), (65 <= o && 85 > o || 95 < o && 115 >= o) && (fishMaster.buff = 1.5,
            buffTxt0.active = true, buffTxt1.active = false, d.string = "150", r = 1e3, e.active = !0), 85 <= o && 95 >= o && (fishMaster.buff = 2,
                buffTxt0.active = false, buffTxt1.active = true, d.string = "200", r = 1e3, mg.util.vibrateLong(), e.active = !0),
            mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1);
        var n = this;
        setTimeout(function() {
            n.initData();
        }, r);
    },
    hidePointerFun: function() {
        this.node.getChildByName("compassView").active = !1;
    },
    showPointerFun: function() {
        this.node.getChildByName("compassView").active = !0, this.node.getChildByName("compassView").getComponent(cc.Animation).resume(),
            this.node.getChildByName("compassView").getChildByName("buffNode").active = !1;
    }
});
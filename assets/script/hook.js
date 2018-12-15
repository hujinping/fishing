var d = Math.ceil;
cc.Class({
    extends: cc.Component,
    properties: {
        fishTemp: cc.Node,
        hookSp: cc.Node,
        depthNum: cc.Node,
        catchNode: cc.Node
    },
    onLoad: function () {
        fishMaster.hook = this, this.depth = 0, this.ropeLength = 0, this.moveSpeed = fishMaster.GameDefine.dropSpeed,
            this.state = fishMaster.GameDefine.HOOK_STATE.DEFAULT, this.hookPosY = this.node.position.y,
            this.hookPosX = this.node.position.x, this.hookPos = this.node.position, this.hookStartShowY = cc.winSize.height / 2 - 200,
            this.hookShowY = cc.winSize.height / 2 - 200 - 130, this.tempPosX = 0, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.DROP_HOOK, this.changeState, this),
            this.graphics = this.node.getComponent(cc.Graphics);
    },
    onDestroy: function () {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.DROP_HOOK, this.changeState, this);
    },
    changeState: function (a) {
        switch (this.state = a, fishMaster.camera.showSize(!0), this.depthNum.active = !1,
        a) {
            case fishMaster.GameDefine.HOOK_STATE.DEFAULT:
                fishMaster.camera.showSize(!1), this.depth = 0, this.ropeLength = 0, mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.DEFAULT);
                break;

            case fishMaster.GameDefine.HOOK_STATE.DOWN:
                mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.HOOKDOWN, !1), this.depth = fishMaster.gameData.getFallingDepthUnit() + cc.winSize.height / 2 - this.hookPosY,
                    this.moveSpeed = fishMaster.GameDefine.dropSpeed, fishMaster.camera.freshData();
                break;

            case fishMaster.GameDefine.HOOK_STATE.STOP:
                var e = this;
                fishMaster.gameData.getGuideIndex(2) ? this.moveSpeed = 200 : (this.moveSpeed = 0,
                    fishMaster.guide.showGuide(2, function () {
                        e.moveSpeed = 200;
                    }));
                break;

            case fishMaster.GameDefine.HOOK_STATE.UP:
                this.moveSpeed = fishMaster.GameDefine.backSpeed, fishMaster.fishManage.showQipao();
                break;

            case fishMaster.GameDefine.HOOK_STATE.FULL:
                this.tempPosX = 0, e = this, this.moveSpeed = 0, this.isStop = !0, setTimeout(function () {
                    e.moveSpeed = 0, e.isStop = !1;
                }, 1e3);
                break;

            case fishMaster.GameDefine.HOOK_STATE.WAIT:
                fishMaster.fishManage.cancelQipaoTimer(), fishMaster.gameData.setFishTotal(fishMaster.disNum),
                    this.depth = 0, this.ropeLength = 0;
        }
    },
    drawLine: function (a, e) {
        this.graphics.clear(), this.graphics.moveTo(a.x, a.y), this.graphics.lineTo(e.x, e.y),
            this.graphics.stroke();
    },
    update: function (a) {
        var e = d((this.ropeLength - cc.winSize.height / 2 - this.hookPosY) / fishMaster.GameDefine.depthUnit), t = this.ropeLength > this.hookShowY - this.hookPosY;
        if (!(this.hookSp.active = t, this.state == fishMaster.GameDefine.HOOK_STATE.DOWN)) this.state == fishMaster.GameDefine.HOOK_STATE.STOP ? this.ropeLength < this.depth ? (o = this.moveSpeed * a,
            this.node.y -= o, this.ropeLength += o, fishMaster.camera.node.y = this.node.y,
            this.tempPosX -= this.tempPosX / 10, this.drawLine(cc.v2(0, 130), cc.v2(-this.tempPosX + this.hookPosX, cc.winSize.height / 2)),
            this.depthNum.active = t, this.depthNum.getComponent(cc.Label).string = "-" + e + "米") : this.changeState(fishMaster.GameDefine.HOOK_STATE.UP) : this.state == fishMaster.GameDefine.HOOK_STATE.UP ? (o = this.moveSpeed * a,
                this.node.y += o, this.ropeLength -= o, fishMaster.camera.node.y = this.node.y,
                this.ropeLength > cc.winSize.height - this.hookPosY ? (this.tempPosX -= this.tempPosX / 10,
                    this.drawLine(cc.v2(0, 130), cc.v2(-this.tempPosX + this.hookPosX, cc.winSize.height / 2))) : this.ropeLength > this.hookStartShowY - this.hookPosY && this.ropeLength <= cc.winSize.height - this.hookPosY ? (this.node.x += (this.hookPosX - this.node.x) / 20,
                        this.drawLine(cc.v2(0, 130), cc.v2(-this.node.x + this.hookPosX, -this.node.y + this.hookPosY - this.hookShowY))) : this.changeState(fishMaster.GameDefine.HOOK_STATE.FULL)) : this.state == fishMaster.GameDefine.HOOK_STATE.FULL && ((this.fishTemp.rotation = 0,
                            this.ropeLength > cc.winSize.height - this.hookPosY) ? (this.moveSpeed += this.isStop ? 20 : 300,
                                o = this.moveSpeed * a, this.node.y += o, this.ropeLength -= o, fishMaster.camera.node.y = this.node.y,
                                this.node.x += (this.hookPosX - this.node.x) / 40, this.tempPosX -= this.tempPosX / 30,
                                this.drawLine(cc.v2(0, 130), cc.v2(-this.tempPosX + this.hookPosX, cc.winSize.height / 2))) : this.ropeLength > this.hookStartShowY - this.hookPosY && this.ropeLength <= cc.winSize.height - this.hookPosY ? (this.moveSpeed += this.isStop ? 20 : 300,
                                    o = this.moveSpeed * a, this.node.y += o, this.ropeLength -= o, fishMaster.camera.node.y = this.node.y,
                                    this.node.x += (this.hookPosX - this.node.x) / 40, this.drawLine(cc.v2(0, 130), cc.v2(-this.node.x + this.hookPosX, -this.node.y + this.hookPosY - this.hookShowY))) : (this.graphics.clear(),
                                        this.node.position = this.hookPos, this.ropeLength = 0, fishMaster.camera.node.y = this.hookPosY,
                                        this.changeState(fishMaster.GameDefine.HOOK_STATE.WAIT), mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.FISH_STATE, fishMaster.GameDefine.FISH_STATE.DIE),
                                        0 >= fishMaster.disNum && (fishMaster.gameData.addGameMoney(0), mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.ENDGAME)))); else if (this.moveSpeed += 100,
                                            this.ropeLength < this.depth - 200) {
            var o = this.moveSpeed * a;
            this.node.y -= o, this.ropeLength += o, fishMaster.camera.node.y = this.node.y,
                t && (this.tempPosX -= this.tempPosX / 10, this.drawLine(cc.v2(0, 130), cc.v2(-this.tempPosX + this.hookPosX, cc.winSize.height / 2))),
                this.depthNum.active = t, this.depthNum.getComponent(cc.Label).string = "-" + e + "米";
        } else this.changeState(fishMaster.GameDefine.HOOK_STATE.STOP);
    },
    onCollisionEnter: function (t) {
        mg.LOGD("gangning 碰撞", t.tag), fishMaster.fishManage.fishKilled(t.node);
    },
    objShow: function () {
        this.objNode.opacity = 255;
    },
    objHide: function () {
        this.objNode.opacity = 0;
    }
})
cc.Class({
    extends: cc.Component,
    properties: {
        icon: cc.Sprite,
        kuang: cc.Node,
        fishSprites: [cc.SpriteFrame],
        _type: 0,
        type: {
            get: function() {
                return this._type;
            },
            set: function(t) {
                this._type = t, this.icon.spriteFrame = this.fishSprites[t], this.icon.node.scale = (this.icon.node.width > this.node.width ? this.node.width : this.icon.node.width) / this.icon.node.width,
                    this.icon.node.color = fishMaster.gameData.getOpenFish(t) ? cc.color(255, 255, 255, 255) : cc.color(0, 0, 0, 255),
                    0 == t && fishMaster.gameData.getOpenFish(0) && (this.kuang.active = !0);
            }
        }
    },
    onLoad: function() {
        mg.EventDispatcher.listen(fishMaster.EVENT_GAME.BE_SELECT, this.beSelect, this),
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.BE_SELECT, this.beSelect, this),
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    start: function() {},
    onTouchEnd: function() {
        mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.BE_SELECT), this.kuang.active = !0,
            fishMaster.handBook.updateInfoData(this.type);
    },
    beSelect: function() {
        this.kuang.active = !1;
    }
})
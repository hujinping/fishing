cc.Class({
    extends: cc.Component,
    properties: {
        friend_rank: cc.Node,
        widgetCom: cc.Widget,
        rankCanvas: cc.Node
    },
    onLoad: function() {
        fishMaster.open_rank = this, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GAME_SCORE_CHANGE, this.gameScoreChanged, this);
    },
    start: function() {
        this.updateNodePos();
    },
    updateNodePos: function() {
        var t = cc.view.getFrameSize();
        2 <= t.height / t.width && this.widgetCom && this.widgetCom.top && (this.widgetCom.top += 80);
    },
    showRankList: function() {
        if (!mg.isInCreator && this.openDataContext) {
            var a = this.openDataContext.canvas;
            a.width = 126, a.height = 215, this.texture = new cc.Texture2D(), this.spriteFrame = new cc.SpriteFrame(this.texture);
            var e = this.texture,
                t = this.spriteFrame,
                o = this.rankCanvas.getComponent(cc.Sprite),
                r = function() {
                    e.initWithElement(a), e.handleLoadedTexture(), o.spriteFrame = t, o.spriteFrame._refreshTexture(e);
                };
            r(), mg.Timer.cancelTimer(this, r), mg.Timer.setTimer(this, r, .1, 50);
        }
    },
    hideNode: function() {
        this.friend_rank.active = !1;
    },
    gameScoreChanged: function() {
        this.openDataContext = mg.OpenDataContextUtil.getOpenData(), this.openDataContext && (mg.OpenDataContextUtil.showBeyondRank(fishMaster.gameData.getFallingDepth()),
            this.showRankList(), this.friend_rank.active = !0);
    },
    onDestroy: function() {
        mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GAME_SCORE_CHANGE, this.gameScoreChanged, this);
    }
})
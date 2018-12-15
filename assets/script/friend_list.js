cc.Class({
                extends: cc.Component,
                properties: {
                    friend_rank: cc.Node,
                    rankCanvas: cc.Node
                },
                onLoad: function() {
                    fishMaster.friend_list = this, mg.EventDispatcher.listen(fishMaster.EVENT_GAME.GAME_SCORE_CHANGE, this.gameScoreChanged, this);
                },
                start: function() {},
                showRankList: function() {
                    if (!mg.isInCreator && this.openDataContext) {
                        var a = this.openDataContext.canvas;
                        a.width = 126, a.height = 1e5, this.texture = new cc.Texture2D(), this.spriteFrame = new cc.SpriteFrame(this.texture);
                        var e = this.texture, t = this.spriteFrame, o = this.rankCanvas.getComponent(cc.Sprite), r = function() {
                            e.initWithElement(a), e.handleLoadedTexture(), o.spriteFrame = t, o.spriteFrame._refreshTexture(e);
                        };
                        r(), mg.Timer.cancelTimer(this, r), mg.Timer.setTimer(this, r, .1, 200);
                    }
                },
                hideNode: function() {
                    this.friend_rank.active = !1;
                },
                gameScoreChanged: function() {},
                onDestroy: function() {
                    mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.GAME_SCORE_CHANGE, this.gameScoreChanged, this);
                }
            })
cc.Class({
                extends: cc.Component,
                properties: {
                    boxSprite: cc.Sprite,
                    boxLight: cc.Node,
                    boxSprites: [ cc.SpriteFrame ],
                    _type: 0,
                    type: {
                        get: function() {
                            return this._type;
                        },
                        set: function(a) {
                            this._type = a;
                            var e = fishMaster.boxData[a];
                            this.boxSprite.spriteFrame = this.boxSprites[a], this.canMove = e.canMove, this.speed = 4 * Math.random() + 1, 
                            this.rota = e.rota, this.minDepth = e.minDepth, this.maxDepth = e.maxDepth, this.fresh = e.fresh, 
                            this.spSize = this.boxSprite.node.getContentSize();
                        }
                    }
                },
                onLoad: function() {
                    this.state = fishMaster.GameDefine.FISH_STATE.DEFAULT, this.beCaughtTime = 0, this.beCaught = !1, 
                    mg.EventDispatcher.listen(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
                },
                onDestroy: function() {
                    mg.EventDispatcher.ignore(fishMaster.EVENT_GAME.FISH_STATE, this.changeState, this);
                },
                setPos: function(t) {
                    this.node.x = (Math.random() - .5) * (cc.winSize.width - 200), this.node.y = -cc.winSize.height - fishMaster.gameData.getFallingDepthUnit() + t * (cc.winSize.height / fishMaster.GameDefine.bgCellHeight), 
                    this.boxLight.runAction(cc.rotateBy(2, 160, 160).repeatForever());
                },
                changeState: function(t) {
                    switch (this.state = t, t) {
                      case fishMaster.GameDefine.FISH_STATE.DEFAULT:
                        break;

                      case fishMaster.GameDefine.FISH_STATE.CAUGHT:
                        this.boxBeCatch();
                        break;

                      case fishMaster.GameDefine.FISH_STATE.DIE:
                        this.beCaught && this.boxDieAni();
                    }
                },
                boxBeCatch: function() {
                    mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.CATCHGOLD, !1), mg.util.vibrateShort(), 
                    this.beCaught = !0, fishMaster.disNum += 1, this.beCaughtTime = 0, fishMaster.camera.freshData(), 
                    this.boxLight.active = !1, this.node.stopAllActions(), this.node.position = cc.v2(0, 0), 
                    this.node.parent = fishMaster.hook.fishTemp, fishMaster.disNum >= fishMaster.gameData.getHookSize() && mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.DROP_HOOK, fishMaster.GameDefine.HOOK_STATE.FULL);
                },
                boxDieAni: function() {
                    var d = this;
                    this.node.stopAllActions(), this.node.position = cc.v2(20, -380), this.node.rotation = 0, 
                    this.node.zIndex = this.beCaughtTime;
                    var e = 3;
                    24 >= fishMaster.disNum && (e = fishMaster.disNum / 8);
                    var t = cc.delayTime((fishMaster.disNum - this.node.zIndex) / fishMaster.disNum * e), i = cc.callFunc(function() {
                        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.COLLECT, !1);
                    }), r = 2 * Math.random() + 2, n = cc.spawn(cc.scaleTo(.3, r), cc.fadeTo(.3, 1)), a = cc.spawn(cc.scaleTo(.3, 1), cc.fadeOut(.3)), s = cc.callFunc(function() {
                        d.node.destroy(), fishMaster.disNum--, fishMaster.gameData.updataDailyTaskData(8, 1, 0), 
                        0 >= fishMaster.disNum && (mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.CHANGE_GAME_STATE, fishMaster.GameDefine.GAME_STATE.ENDGAME), 
                        mg.EventDispatcher.trigger(fishMaster.EVENT_GAME.SHOW_BOX));
                    });
                    this.boxSprite.node.runAction(cc.sequence(t, i, n, a, s));
                },
                update: function() {
                    if (this.beCaught || 1 != this.canMove || (this.node.x < -cc.winSize.width / 2 ? this.node.scaleX = 1 : this.node.x > cc.winSize.width / 2 && (this.node.scaleX = -1), 
                    this.node.x += this.speed * this.node.scaleX), fishMaster.hook.state == fishMaster.GameDefine.HOOK_STATE.UP && this.state != fishMaster.GameDefine.FISH_STATE.CAUGHT) {
                        var a = fishMaster.hook.fishTemp.convertToWorldSpaceAR(cc.v2(0, 0)), e = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                        c(a.y - e.y) < this.spSize.width / 2 && c(a.x - e.x) < this.spSize.height / 2 && this.changeState(fishMaster.GameDefine.FISH_STATE.CAUGHT);
                    }
                }
            })
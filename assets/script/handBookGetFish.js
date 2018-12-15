cc.Class({
                extends: cc.Component,
                properties: {
                    getFishNode: cc.Node,
                    icon: cc.Sprite,
                    fishSprites: [ cc.SpriteFrame ]
                },
                onLoad: function() {
                    fishMaster.getFishView = this;
                },
                showFishNode: function() {
                    this.getFishNode.active = !0, this.icon.spriteFrame = this.fishSprites[fishMaster.openFishArr.shift()];
                },
                openWindows: function() {
                    this.getFishNode.active = !0;
                },
                closeWindows: function() {
                    this.getFishNode.active = !1, fishMaster.homeMain.getFishFun();
                },
                giveBtnFun: function() {
                    mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), this.closeWindows();
                }
            })
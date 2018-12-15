cc.Class({
                extends: cc.Component,
                properties: {
                    handBookNode: cc.Node,
                    scrollView: cc.ScrollView,
                    content: cc.Node,
                    cell_node: cc.Node,
                    fishName: cc.Label,
                    fishMessage: cc.Label,
                    messageBg: cc.Node,
                    fishSprites: [ cc.SpriteFrame ]
                },
                btnCloseSelf: function() {
                    this.handBookNode.active = !1;
                },
                onLoad: function() {
                    fishMaster.handBook = this;
                },
                openSelf: function() {
                    this.content.removeAllChildren(), this.handBookNode.active = !0, this.fishData = fishMaster.fishInfoData;
                    for (var a = this.fishData.length, e = 0, t; e < a; e++) {
                        t = cc.instantiate(this.cell_node), this.content.addChild(t), t.active = !0;
                        var d = this.fishData[e], r = {};
                        r.index = d.index, r.name = d.name, r.information = d.information, t.getComponent("handBookCell").type = e;
                    }
                    this.content.setContentSize(cc.size(638, 159 * o(a / 4))), this.scrollView.scrollToTop(), 
                    this.updateInfoData(0);
                },
                updateInfoData: function(t) {
                    fishMaster.gameData.getOpenFish(t) ? (this.messageBg.getChildByName("fish").color = cc.color(255, 255, 255, 255), 
                    this.fishName.string = fishMaster.fishInfoData[t].name, this.fishMessage.string = fishMaster.fishInfoData[t].information) : (this.messageBg.getChildByName("fish").color = cc.color(0, 0, 0, 255), 
                    this.fishName.string = "???", this.fishMessage.string = "尚未获得"), this.messageBg.getChildByName("fish").getComponent(cc.Sprite).spriteFrame = this.fishSprites[t], 
                    this.messageBg.getChildByName("fish").scale = (this.messageBg.getChildByName("fish").width > this.messageBg.width ? this.messageBg.width : this.messageBg.getChildByName("fish").width) / this.messageBg.getChildByName("fish").width;
                },
                onDestroy: function() {}
            })
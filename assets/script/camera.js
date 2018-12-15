cc.Class({
    extends: cc.Component,
    properties: {
        catchNumBg: {
            default: null,
            type: cc.Node
        },
        getGoldLabel: {
            default: null,
            type: cc.Label
        },
        goldIcon: {
            default: null,
            type: cc.Node
        },
        getGoldNum: 0,
        root: {
            default: null,
            type: cc.Node
        },
        _useCamera: !0,
        useCamera: {
            get: function() {
                return this._useCamera;
            },
            set: function(t) {
                this._useCamera !== t && (this._useCamera = t, this.node && (this.node = t ? this.node : this.root,
                    this.node.x = this.root.x = 0, this.moveSpeed = -this.moveSpeed, this.node.active = !!t));
            }
        }
    },
    onLoad: function() {
        fishMaster.camera = this, this.node = this._useCamera ? this.node : this.root, this.getGoldNum = 0,
            this.catchNumFish = this.catchNumBg.getChildByName("catchNumFish"), this.catchNum = this.catchNumBg.getChildByName("catchNum").getComponent(cc.Label);
    },
    freshData: function() {
        this.catchNum.string = fishMaster.disNum + "/" + fishMaster.gameData.getHookSize(),
            this.getGoldNum = 0,
            this.getGoldLabel.node.active = !1;
    },
    showSize: function(t) {
        this.catchNumBg.active = t, this.getGoldLabel.node.active = !1;
    },
    showGetGold: function(t) {
        this.getGoldLabel.node.active = !0, this.getGoldNum += t, this.getGoldLabel.string = "$" + this.getGoldNum.toString();
    }
})
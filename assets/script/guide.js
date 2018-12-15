cc.Class({
    extends: cc.Component,
    properties: {
        guide1: cc.Node,
        guide2: cc.Node,
        guide3: cc.Node
    },
    onLoad: function() {
        fishMaster.guide = this;
    },
    showGuide: function(a, e) {
        console.log("log------------------showGuide  a  e=:", a, e);
        this.callback = e, this.guideIndex = a, this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBg, this),
            this.guideNode = this.node.getChildByName("guide" + a), this.guideNode.active = !0,
            this.maskNode = this.guideNode.getChildByName("maskNode");
    },
    onTouchBg: function(a) {
        var e = a.getLocation(),
            t = this.maskNode.getBoundingBoxToWorld();
        t.width -= 40, t.width = 0 >= t.width ? 0 : t.width, t.height -= 40, t.height = 0 >= t.height ? 0 : t.height,
            t.contains(e) ? (this.node._touchListener.setSwallowTouches(!1), this.guideNode.active = !1,
                fishMaster.gameData.setGuideIndex(this.guideIndex), this.destroyTouch(), this.callback && this.callback()) : this.node._touchListener.setSwallowTouches(!0);
    },
    destroyTouch: function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBg, this);
    }
})
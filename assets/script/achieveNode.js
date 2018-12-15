cc.Class({
    extends: cc.Component,
    properties: {
        achieveNode: cc.Node
    },
    onLoad: function() {
        fishMaster.achieveView = this;
    },
    showAchieveNode: function() {
        this.achieveNode.active = !0, this.achieveNode.getChildByName("gold").getComponent(cc.Label).string = "x" + (5 * fishMaster.homeMain.collectGoldNum).toString(),
            this.achieveNode.getChildByName("gongxidi").runAction(cc.rotateBy(1, 50, 50).repeatForever());
    },
    openWindows: function() {
        this.achieveNode.active = !0;
    },
    closeWindows: function() {
        this.achieveNode.active = !1;
    },
    giveBtnFun: function() {
        mg.AudioHelper.playLocalEffect(fishMaster.GameDefine.Sound.BTN, !1), fishMaster.homeMain.refreshEndGame(5 * fishMaster.homeMain.collectGoldNum),
            this.closeWindows();
    }
})
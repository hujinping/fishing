cc.Class({
    extends: cc.Component,
    properties: {
        content: cc.Node,
        cell_node: cc.Prefab
    },
    btnCloseSelf: function() {
        this.node.active = !1;
    },
    onLoad: function() {
        fishMaster.dailyTasks = this, this.taskData = fishMaster.gameData.getDailyTaskData();
        for (var a = this.taskData.length, e = 0, t; e < a; e++) t = cc.instantiate(this.cell_node),
            this.content.addChild(t);
    },
    updateTaskData: function() {
        this.taskData = fishMaster.gameData.getDailyTaskData();
        console.log("log------------this.taskData=:", this.taskData);
        for (var o = this.taskData.length, e = 0, t = 0; t < o; t++) {
            var d = this.taskData[t],
                r = this.content.children[t],
                n = {};
            n.index = d.index, n.hongbao = d.hongbao, n.reward = d.reward, n.progress = d.progress,
                n.target = d.target, n.isFinish = d.isFinish, n.isReceive = d.isReceive, n.information = d.information,
                r.getComponent("dailyTaskCell").updateItem(n, t), e++;
        }
        this.content.setContentSize(cc.size(560, 127 * e));
    },
    onDestroy: function() {
        ty.EventDispatcher.ignoreScope(this), this.unscheduleAllCallbacks();
    }
})
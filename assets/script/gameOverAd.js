cc.Class({
    extends: cc.Component,
    properties: {
        adSprite: cc.Sprite,
        adDes: cc.Label,
        adName: cc.Label,
    },


    setAdSprite(imgUrl) {
        cc.loader.load({
            url: imgUrl,
            type: 'png'
        }, (err, texture) => {
            this.adSprite.spriteFrame = new cc.SpriteFrame(texture);
        });
    },

    setAdName(name) {
        this.adName.string = name;
    },

    setAdDes(des) {
        this.adDes.string = des;
    },
})
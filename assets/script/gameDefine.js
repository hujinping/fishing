fishMaster.GameDefine = {
    GAME_STATE: cc.Enum({
        DEFAULT: 0,
        START: 1,
        PLAYING: 2,
        ENDGAME: 3
    }),
    HOOK_STATE: cc.Enum({
        DEFAULT: 0,
        DOWN: 1,
        STOP: 2,
        UP: 3,
        FULL: 4,
        WAIT: 5
    }),
    FISH_STATE: cc.Enum({
        DEFAULT: 0,
        CAUGHT: 1,
        DIE: 2
    }),
    dropTime: 4,
    dropSpeed: 500,
    backSpeed: 600,
    depthUnit: 100,
    bgCellHeight: 15,
    Sound: {
        BTN: "sounds/btn",
        CATCHGOLD: "sounds/catchgold",
        CATCHNORMAL: "sounds/catchnormal",
        COLLECT: "sounds/collect",
        ENDGAME: "sounds/endgame",
        GAMEBGM: "resources/sounds/gameBGM.mp3",
        GOLD: "sounds/gold",
        HOMEBGM: "resources/sounds/homeBGM.mp3",
        HOOKDOWN: "sounds/hookdown",
        PAOGAN: "sounds/paogan",
        UPGRADE: "sounds/upgrade"
    }
}, fishMaster.EVENT_GAME = {
    CHANGE_GAME_STATE: "change_game_state",
    SHOW_BOX: "show_box",
    RED_PACKET: "red_packet",
    DROP_HOOK: "drop_hook",
    FISH_STATE: "fish_state",
    BE_SELECT: "be_select",
    GAME_SCORE_CHANGE: "GAME_SCORE_CHANGE",
    GAME_SHOW: "game_show",
    GAME_HIDE: "game_hide",
    SHARE_RESULT: "SHARE_RESULT_RET",
    GROUP_SHARE_SUCCESS: "GROUP_SHARE_SUCCESS",
    GROUP_SHARE_FAIL: "GROUP_SHARE_FAIL",
    PROPAGATE_SHARE_SUCESS: "propagate_share_sucess",
    PROPAGATE_SHARE_FAIL: "propagate_share_fail",
    GETRFRIENDRANK_SUCCESS: "GETRFRIENDRANK_SUCCESS",
    GETUSERINFO_SUCCESS: "GETUSERINFO_SUCCESS",
    GETGROUPRANK_SUCCESS: "GETGROUPRANK_SUCCESS"
}, fishMaster.SharePoints = {
    RankViewBtnPoint: "RankViewBtnPoint",
    MainViewBtnPoint: "MainViewBtnPoint",
    GameViewBoxPoint: "GameViewBoxPoint",
    CollectDoublePoint: "CollectDoublePoint",
    CollectThreePoint: "CollectThreePoint",
    OfflineDoublePoint: "OfflineDoublePoint",
    UpGradePoint: "UpGradePoint",
    RedPacketFishPoint: "RedPacketFishPoint",
    RedPacketPoint: "RedPacketPoint"
}, fishMaster.AD_ID = {
    BannerId: "adunit-cfe36affbd00f772",
    CollectTimesId: "adunit-8226adb18facc196",
    CollectThreeId: "adunit-8226adb18facc196",
    BoxId: "adunit-8226adb18facc196",
    UpGradeId: "adunit-8226adb18facc196",
    OfflineCollectDoubelId: "adunit-8226adb18facc196",
    RedPacketId: "adunit-8226adb18facc196",
    RedPacketSaveId: "adunit-8226adb18facc196"
}, fishMaster.Bi_EventID = {
    offlineShare: 10001,
    offlineShareSuccess: 10002,
    freeUpgrade: 10003,
    freeUpgradeSuccess: 10004,
    doubleShare: 10005,
    doubleShareSuccess: 10006,
    threeShare: 10007,
    threeShareSuccess: 10008,
    boxShare: 10009,
    boxShareSuccess: 10010,
    hongbaoShare: 10011,
    hongbaoShareSuccess: 10012,
    homeShare: 10013,
    groupShare: 10014,
    rightTopShare: 10015,
    allShare: 10016,
    allShareSuccess: 10017,
    clickImgComeIn: 10018,
    friendRank: 10019,
    groupRank: 10020,
    getfishNum: 10021,
    collection: 10022,
    updateGetfishNum: 10023,
    updateGetfishDeep: 10024,
    updateGetCoinOut: 10025,
    openBox: 10026,
    clickBirdVieo: 10027,
    openBridVieo: 10028,
    clickGetCoinOutVieo: 10029,
    openGetCoinOutVieo: 10030,
    wxLoginStart: 10031,
    wxLoginSuccess: 10032,
    gameServerStart: 10033,
    gameServerSuccess: 10034,
    comeInGame: 10035,
    playVideo: 10036,
    playVideoSuccess: 10037,
    offlineCollect: 10038,
    dailyTaskGet: 10039
}
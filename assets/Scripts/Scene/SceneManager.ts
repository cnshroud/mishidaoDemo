// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { SceneEnum } from "../Enum";



const { ccclass, property } = cc._decorator;

@ccclass
export default class SenceManager extends cc.Component {

    //父类

    start() {
        cc.director.preloadScene(SceneEnum.H1)
        cc.director.preloadScene(SceneEnum.H2)
        cc.director.preloadScene(SceneEnum.H3)
        cc.director.preloadScene(SceneEnum.H4)

    }

    changeScenee(e: Event, sence: string) {
        //sence从SceneEnum中获取
        cc.director.loadScene(sence as SceneEnum)
    }
}



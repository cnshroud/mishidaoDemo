// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { RenderManager } from "../Base/RenderManager";
import { SceneEnum, eventEnum } from "../Enum";
import EventManager from "../Runtime/EventManager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class SenceManager extends RenderManager {
    //继承rendermanager，通过场景实现已存在背包里的物品不显示在场景里
    render() {

    }
    //放生成物，场景2要动态生成key，所以要在父节点存放
    @property(cc.Node)
    items: cc.Node = null;

    @property(cc.Prefab)
    inventory: cc.Prefab = null

    start() {
        super.start()
        //预加载场景
        // cc.director.preloadScene(SceneEnum.H1)
        // cc.director.preloadScene(SceneEnum.H2)
        // cc.director.preloadScene(SceneEnum.H3)
        // cc.director.preloadScene(SceneEnum.H4)
        if (this.inventory) {
            const inventory = cc.instantiate(this.inventory)
            console.log("inventory创建成功");

            this.node.addChild(inventory)
        }

    }

    changeScenee(e: Event, sence: string) {
        //sence从SceneEnum中获取
        cc.director.loadScene(sence as SceneEnum)
    }
}



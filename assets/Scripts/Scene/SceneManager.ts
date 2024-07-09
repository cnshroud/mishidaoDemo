// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { RenderManager } from "../Base/RenderManager";
import { SceneEnum, eventEnum } from "../Enum/index";
import DataManager from "../Runtime/DataManager";
import EventManager from "../Runtime/EventManager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class SenceManager extends RenderManager {
    //给每个场景写个类型
    type: SceneEnum
    //放生成物，场景2要动态生成key，所以要在父节点存放
    @property(cc.Node)
    items: cc.Node = null;

    @property(cc.Prefab)
    inventory: cc.Prefab = null

    //菜单预制体
    @property(cc.Prefab)
    Menu: cc.Prefab = null

    start() {
        super.start()
        //预加载场景
        // cc.director.preloadScene(SceneEnum.H1)
        // cc.director.preloadScene(SceneEnum.H2)
        // cc.director.preloadScene(SceneEnum.H3)
        // cc.director.preloadScene(SceneEnum.H4)
        //实例化背包
        if (this.inventory) {
            const inventory = cc.instantiate(this.inventory)
            // console.log("inventory创建成功");

            this.node.addChild(inventory)
        }
        //实例化场景
        if (this.Menu) {
            const Menu = cc.instantiate(this.Menu)
            this.node.addChild(Menu)
        }

    }

    changeScene(e: Event, sence: string) {
        //sence从SceneEnum中获取
        //
        //通过datamamager获取当前场景
        DataManager.Instance.curScene = sence as SceneEnum
    }
    //通过datamamager获取当前场景
    render() {
        //判断数据中心的场景不等于当前场景
        if (DataManager.Instance.curScene === this.type) {
            return
        }
        cc.director.loadScene(DataManager.Instance.curScene)
    }
}



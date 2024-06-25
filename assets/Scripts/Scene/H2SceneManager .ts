// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ItemStatusEnum, ItemTypeEnum } from "../Enum";
import DataManager from "../Runtime/DataManager";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H2SenceManager extends SenceManager {
    //钥匙的预制体
    @property(cc.Prefab)
    KeyPF: cc.Prefab = null;
    //钥匙存放的位置
    @property(cc.Node)
    KeyPlaceholder: cc.Node = null;


    render() {
        super.render()
        //清空子元素
        this.items.removeAllChildren()
        const Key = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key)
        if (Key && Key.status === ItemStatusEnum.Scene) {
            const KeyNode = cc.instantiate(this.KeyPF)
            this.items.addChild(KeyNode)
            //设置位置
            KeyNode.setPosition(this.KeyPlaceholder.position)
        }
    }

}



import { ItemStatusEnum, ItemTypeEnum, eventEnum } from "../Enum";
import DataManager from "../Runtime/DataManager";
import EventManager from "../Runtime/EventManager";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H4SenceManager extends SenceManager {
    //船票的预制体
    @property(cc.Prefab)
    mailPF: cc.Prefab = null;
    //船票存放的位置
    @property(cc.Node)
    mailPlaceholder: cc.Node = null;
    start(): void {
        super.start()
    }

    render() {
        super.render()
        console.log("h4");

        //清空子元素
        this.items.removeAllChildren()
        const mail = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail)
        if (mail && mail.status === ItemStatusEnum.Scene) {
            const mailNode = cc.instantiate(this.mailPF)
            this.items.addChild(mailNode)

            //设置位置
            mailNode.setPosition(this.mailPlaceholder.position)
        }
    }

}

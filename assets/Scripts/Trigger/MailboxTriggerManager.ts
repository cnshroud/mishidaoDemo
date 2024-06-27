

import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum/index";
import DataManager from "../Runtime/DataManager";
import { TriggerManager } from "./TriggerManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MailboxTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.MailBox

    @property(cc.Node)
    closeNode: cc.Node = null;
    @property(cc.Node)
    openNode: cc.Node = null;
    render() {
        //通过mailboxStatus状态查看打开和关闭图片
        super.render()
        const open = DataManager.Instance.mailboxStatus === TriggerStatusEnum.Resolved
        this.closeNode.active = !open
        this.openNode.active = open
    }

    //邮箱点击事件
    handleTrigger() {
        //判断背包是否有钥匙，并且是否选择钥匙
        if (DataManager.Instance.curItemType === ItemTypeEnum.Key && DataManager.Instance.isSelect) {
            DataManager.Instance.curItemType = null
            DataManager.Instance.isSelect = false
            //将钥匙状态设置为不存在
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key).status = ItemStatusEnum.Disable
            //将船票状态设置为在场景里
            DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Scene
            //重新赋值触发get方法
            DataManager.Instance.items = [...DataManager.Instance.items]
            console.log("船票的位置", DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status);
            //有则把状态变为打开
            DataManager.Instance.mailboxStatus = TriggerStatusEnum.Resolved
        }
    }

}

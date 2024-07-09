import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum/index";
import DataManager from "../Runtime/DataManager";
import { TriggerManager } from "./TriggerManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GrandmoTriggerMananger extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Grandmo;
    @property(cc.Node)
    dialogNode: cc.Node = null;

    @property(cc.Label)
    label: cc.Label = null;

    private readonly pendingDialogs = [
        '我年纪大了，很多事情想不起来了。',
        '你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？',
        '老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣...',
        '他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。',
        '这些古怪的电视节目真没有什么意思。',
        '老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。',
        '人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。',
        '老了才明白，万物静默如迷。',
    ]
    private readonly resolvedDialogList = [
        '没想到老头子的船票寄过来了，谢谢你。'
    ]
    render(): void {
        super.render();
        //如果与奶奶对话的索引为-1则不显示对话框
        if (DataManager.Instance.GrandmoDialogIndex === -1) {
            this.dialogNode.active = false;
            return;
        }
        //否则根据GrandmoDialogIndex展示文本内容
        this.dialogNode.active = true;
        if (DataManager.Instance.GrandmoStatus === TriggerStatusEnum.Pengind) {
            this.label.string = this.pendingDialogs[DataManager.Instance.GrandmoDialogIndex]
        } else if (DataManager.Instance.GrandmoStatus === TriggerStatusEnum.Resolved) {
            this.label.string = this.resolvedDialogList[DataManager.Instance.GrandmoDialogIndex]
        }

    }
    handleTrigger(): void {
        if (DataManager.Instance.GrandmoStatus === TriggerStatusEnum.Pengind) {
            //判断背包是否有船票，并且是否选择钥匙
            if (DataManager.Instance.curItemType === ItemTypeEnum.Mail && DataManager.Instance.isSelect) {
                DataManager.Instance.curItemType = null
                DataManager.Instance.isSelect = false

                //将船票状态设置为不存在
                DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Mail).status = ItemStatusEnum.Disable
                //重新赋值触发get方法
                DataManager.Instance.items = [...DataManager.Instance.items]
                //有则更改状态
                DataManager.Instance.GrandmoStatus = TriggerStatusEnum.Resolved
                //将文本状态设置为0
                DataManager.Instance.GrandmoDialogIndex = 0
            } else {
                if (DataManager.Instance.GrandmoDialogIndex >= this.pendingDialogs.length - 1) {
                    DataManager.Instance.GrandmoDialogIndex = -1
                } else {
                    DataManager.Instance.GrandmoDialogIndex++
                }
            }
        } else {
            if (DataManager.Instance.GrandmoDialogIndex >= this.resolvedDialogList.length - 1) {
                DataManager.Instance.GrandmoDialogIndex = -1
            } else {
                DataManager.Instance.GrandmoDialogIndex++
            }

        }

    }
}




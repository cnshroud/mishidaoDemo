import { RenderManager } from "../Base/RenderManager";
import { ItemStatusEnum, ItemTypeEnum, eventEnum } from "../Enum";
import DataManager from "../Runtime/DataManager";
import EventManager from "../Runtime/EventManager";
import ItemManager from "../item/ItemManager";

const { ccclass, property } = cc._decorator;

@ccclass
//继承RenderManager因为要根据数据做渲染
export default class InventoryManager extends RenderManager {

    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Button)
    leftBtn: cc.Button = null

    @property(cc.Button)
    rightBtn: cc.Button = null

    @property(cc.Node)
    placeholder: cc.Node = null

    @property(cc.Node)
    hand: cc.Node = null

    @property(cc.Prefab)
    KeyPF: cc.Node = null
    @property(cc.Prefab)
    MailPF: cc.Node = null


    render() {

        console.log("进入inventorymanager");

        //删除placeholder的所有子元素，方便后面加入
        if (this.placeholder.children) {
            this.placeholder.destroyAllChildren()
        }

        //首先去datamanager拿到背包相关的item，把他过滤出来
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        //如果isInventoryItems中有东西，则显示背包，没东西不显示
        this.node.active = isInventoryItems.length > 0
        if (isInventoryItems.length) {
            //用来记录当前背包显示的物品是什么，
            if (DataManager.Instance.curItemType) {
                const item = DataManager.Instance.items.find(i => i.type === DataManager.Instance.curItemType)
                //判断是否属于背包类型（未使用）
                if (item.status === ItemStatusEnum.Inventory) {
                    this.generateItem(DataManager.Instance.curItemType)
                } else {
                    //使用了物品
                    const type = isInventoryItems[0].type
                    this.generateItem(type)
                    DataManager.Instance.curItemType = type
                }
            } else {
                //如果没显示，则刷新背景（例如刚拿到钥匙的场景）
                const type = isInventoryItems[0].type
                this.generateItem(type)
                DataManager.Instance.curItemType = type
            }
        }
        this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelect

    }
    onLoad() {
        //父类onload方法没实现，所以在这边试一下
        console.log("我代为执行父类onload方法");
        // super.onLoad()
        EventManager.Instance.on(eventEnum.Render, this.render, this)
    }
    //根据type生成对应类型的预制体
    generateItem(type: ItemTypeEnum) {
        switch (type) {
            case ItemTypeEnum.Key:
                //创建key预制体，把他加入，并且修改文本信息
                const KeyNode = cc.instantiate(this.KeyPF)
                this.placeholder.addChild(KeyNode)
                KeyNode.y = 0
                KeyNode.x = 0
                this.label.string = KeyNode.getComponent(ItemManager).label
                break
            case ItemTypeEnum.Mail:
                //创建key预制体，把他加入，并且修改文本信息
                const MailNode = cc.instantiate(this.MailPF)
                this.placeholder.addChild(MailNode)
                this.label.string = MailNode.getComponent(ItemManager).label
                break
            default: break
        }
    }

    handleSelect() {
        //判断是否选中
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect
    }
}

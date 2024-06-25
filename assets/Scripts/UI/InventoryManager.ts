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
        this.placeholder.removeAllChildren()
        //拿到背包中的所有物品
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
        //将DataManager.Instance.curItemType转为boolean类型并且判断是否选择，有则显示手
        this.hand.active = Boolean(DataManager.Instance.curItemType) && DataManager.Instance.isSelect
        //调用置灰方法
        this.changBtninteractbale()

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
                MailNode.y = 0
                MailNode.x = 0
                this.label.string = MailNode.getComponent(ItemManager).label
                break
            default: break
        }
    }

    handleSelect() {
        //判断是否选中
        DataManager.Instance.isSelect = !DataManager.Instance.isSelect
    }
    //左按钮
    handleLeftBtn() {
        //判断是否选中
        if (DataManager.Instance.curItemType === null) {
            return
        }
        //首先去datamanager拿到背包相关的item，把他过滤出来
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        //获取背包里的索引值
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index > 0) {
            //取消选中
            DataManager.Instance.isSelect = false
            //将背包物品的类型换成前一个物品
            DataManager.Instance.curItemType = isInventoryItems[index - 1].type
        }
    }
    //右按钮
    handleRightBtn() {
        //判断是否选中
        if (DataManager.Instance.curItemType === null) {
            return
        }
        //首先去datamanager拿到背包相关的item，把他过滤出来
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        //获取背包里的索引值
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        if (index < isInventoryItems.length - 1) {
            //取消选中
            DataManager.Instance.isSelect = false
            //将背包物品的类型换成后一个物品
            DataManager.Instance.curItemType = isInventoryItems[index + 1].type
        }
    }
    //最左和最右置为灰色
    changBtninteractbale() {
        //判断是否选中时,直接把两个按钮设置为不可交互
        if (DataManager.Instance.curItemType === null) {
            this.leftBtn.interactable = false
            this.rightBtn.interactable = false
            return
        }
        //首先去datamanager拿到背包相关的item，把他过滤出来
        const isInventoryItems = DataManager.Instance.items.filter(i => i.status === ItemStatusEnum.Inventory)
        //获取背包里的索引值
        const index = isInventoryItems.findIndex(i => i.type === DataManager.Instance.curItemType)
        //index大于0时左边可以交互，index小于背包长度时右边可交互
        this.leftBtn.interactable = index > 0
        this.rightBtn.interactable = index < isInventoryItems.length - 1

    }
}

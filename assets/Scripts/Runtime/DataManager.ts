import Singleton from "../Base/Singleton"
import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, eventEnum } from "../Enum"





import EventManager from "./EventManager"

interface IItem {
    //泛型，下面class中数组要用
    status: ItemStatusEnum
    type: ItemTypeEnum
}

const STORAGE_KEY = "STORAGE_KEY"

//这是数据中心类，实现ui与数据分离，便于保存，把钥匙和船票都放在数组里,继承Singleton单例模式，重写父类的方法
export default class DataManager extends Singleton {
    //重写父类方法获得DataManager实例
    static get Instance() {
        return super.GetInstance<DataManager>()
    }


    //h2a正确数组
    readonly H2Aanswer = [0, 1, 2, 3, 4, 5, null]
    //初始数组
    readonly H2AInitData = [1, 0, 3, 2, 5, 4, null]
    //实时记录数组,写成结构防止H2AInitData数组被改变，这样两个数组就不一样了，就不会互相改变
    private _H2AData = [...this.H2AInitData]

    //用来记录当前背包显示的物品是什么，类型是ItemTypeEnum | null，默认为null
    private _curItemType: ItemTypeEnum | null = null
    //判断有没有选中背包物品
    private _isSelect = false
    //邮箱状态,默认没使用
    private _mailboxStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind
    //老奶奶状态,默认没使用
    private _GrandmoStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind
    //当前说到第几句话的索引
    private _GrandmoDialogIndex: number = -1
    //门状态,默认没使用
    private _DoorStatus: TriggerStatusEnum = TriggerStatusEnum.Pengind
    //场景数据
    private _curScene: SceneEnum = SceneEnum.H1

    //物品初始状态
    private _items: Array<IItem> = [
        { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
        { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
    ]

    //getset方法
    get items(): Array<IItem> {
        return this._items

    }
    set items(newData: IItem[]) {
        this._items = newData
        // console.log("进入setitem方法，触发渲染事件");
        this.render()

    }

    get curItemType() {
        return this._curItemType
    }
    set curItemType(newData: ItemTypeEnum) {
        this._curItemType = newData
        this.render()
    }

    get isSelect() {
        return this._isSelect

    }
    set isSelect(newData: boolean) {
        this._isSelect = newData
        this.render()
    }

    get mailboxStatus() {
        return this._mailboxStatus

    }
    set mailboxStatus(newData: TriggerStatusEnum) {
        this._mailboxStatus = newData
        this.render()
    }
    get GrandmoStatus() {
        return this._GrandmoStatus

    }
    set GrandmoStatus(newData: TriggerStatusEnum) {
        this._GrandmoStatus = newData
        this.render()
    }
    get GrandmoDialogIndex() {
        return this._GrandmoDialogIndex

    }
    set GrandmoDialogIndex(newData) {
        this._GrandmoDialogIndex = newData
        this.render()
    }
    get H2AData() {
        return this._H2AData

    }
    set H2AData(newData) {
        this._H2AData = newData
        this.render()
    }
    get DoorStatus() {
        return this._DoorStatus

    }
    set DoorStatus(newData) {
        this._DoorStatus = newData
        this.render()
    }
    get curScene() {
        return this._curScene

    }
    set curScene(newData) {
        this._curScene = newData
        this.render()
    }
    //触发渲染函数
    render() {
        //触发渲染
        EventManager.Instance.emit(eventEnum.Render)
        //实现本地化存储
        cc.sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            H2AData: this.H2AData,
            curItemType: this.curItemType,
            isSelect: this.isSelect,
            mailboxStatus: this.mailboxStatus,
            GrandmoStatus: this.GrandmoStatus,
            GrandmoDialogIndex: this.GrandmoDialogIndex,
            DoorStatus: this.DoorStatus,
            curScene: this.curScene,
            items: this.items,
        }))
    }

    restore() {
        //读取本地存储，继续游戏
        const _data = cc.sys.localStorage.getItem(STORAGE_KEY)
        try {
            const data = JSON.parse(_data)
            this.H2AData = data.H2AData
            this.curItemType = data.curItemType
            this.isSelect = data.isSelect
            this.mailboxStatus = data.mailboxStatus
            this.GrandmoStatus = data.GrandmoStatus
            this.GrandmoDialogIndex = data.GrandmoDialogIndex
            this.DoorStatus = data.DoorStatus
            this.curScene = data.curScene
            this.items = data.items
        } catch {
            //如果错了就执行reset()
            this.reset()
        }
    }

    reset() {
        //新游戏初始化
        this.H2AData = [...this.H2AInitData]
        this.curItemType = null
        this.isSelect = false
        this.mailboxStatus = TriggerStatusEnum.Pengind
        this.GrandmoStatus = TriggerStatusEnum.Pengind
        this.GrandmoDialogIndex = -1
        this.DoorStatus = TriggerStatusEnum.Pengind
        this.curScene = SceneEnum.H1
        this.items = [
            { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
            { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
        ]

    }

}

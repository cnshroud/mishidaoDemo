import Singleton from "../Base/Singleton"
import { ItemStatusEnum, ItemTypeEnum, eventEnum } from "../Enum"





import EventManager from "./EventManager"

interface IItem {
    //泛型，下面class中数组要用
    status: ItemStatusEnum
    type: ItemTypeEnum
}

//这是数据中心类，实现ui与数据分离，便于保存，把钥匙和船票都放在数组里,继承Singleton单例模式，重写父类的方法
export default class DataManager extends Singleton {
    //重写父类方法获得DataManager实例
    static get Instance() {
        return super.GetInstance<DataManager>()
    }



    private _items: Array<IItem> = [
        { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
        { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Scene },
    ]

    //getset方法
    get items(): Array<IItem> {
        return this._items

    }
    set items(newData: IItem[]) {
        this._items = newData
        console.log("进入setitem方法，触发渲染事件");

        //触发渲染
        EventManager.Instance.emit(eventEnum.Render)
    }
}

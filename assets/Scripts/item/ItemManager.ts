


import { RenderManager } from "../Base/RenderManager";
import { ItemTypeEnum, ItemStatusEnum, eventEnum } from "../Enum";




import DataManager from "../Runtime/DataManager";
import EventManager from "../Runtime/EventManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemManager extends RenderManager {

    //物品 有三个状态 场景，手中，使用
    //类型保存在datamanager中了所以不用自己的了
    // status: ItemStatusEnum 
    //物品类型
    type: ItemTypeEnum

    label = "物品"

    @property(cc.SpriteFrame)
    sceneSf: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    inventorySf: cc.SpriteFrame = null;
    onLoad() {
        //父类onload方法没实现，所以在这边试一下
        console.log("我代为执行父类onload方法");
        // super.onLoad()
        EventManager.Instance.on(eventEnum.Render, this.render, this)
    }


    start() {
        //防止父类的start方法被重写
        super.start();
        //监听点击事件
        //触发点击事件后回调touchend方法
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchend, this);

    }

    //销毁时触发
    onDestroy() {
        //防止父类的onDestroy方法被重写
        super.onDestroy();
        //移除点击事件
        //触发点击事件后回调touchend方法
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchend, this);
    }

    //实现RenderManager的抽象方法,

    render() {
        //根据datamanager的数据决定视图要怎么渲染,首先要拿到status,通过可链式操作拿到状态 ?.是可链式操作，如果属性不存在，可选链操作符不会抛出错误，而是返回 undefined，如果存在，它会尝试访问 status
        //可选链操作符不能用于基本数据类型（如 string、number 等），只能用于对象。只能在 TypeScript 中使用，因为它是一个 TypeScript 的特性。
        const status = DataManager.Instance.items.find(i => i.type === this.type)?.status
        // console.log("ItemManager:", DataManager.Instance.items);
        // console.log("this.type:", this.type);
        // console.log("status:", status);
        // console.log("ItemStatusEnum.Scene", ItemStatusEnum.Scene);


        //拿到sprite组件
        const sprite = this.node.getComponent(cc.Sprite)
        switch (status) {
            //如果在场景里则显示场景图片
            case ItemStatusEnum.Scene:
                // console.log("在场景中");

                this.node.active = true;
                sprite.spriteFrame = this.sceneSf;
                if (sprite.spriteFrame = this.sceneSf) {
                    // console.log("场景图片");
                }
                break;
            //如果在背包里则显示背包图片
            case ItemStatusEnum.Inventory:
                this.node.active = true;
                sprite.spriteFrame = this.inventorySf;
                break;
            case ItemStatusEnum.Disable:
                this.node.active = false;
                break;
            default:

                break;
        }

    }







    //如果状态是在场景里，则拿到手上
    touchend() {
        //在datamanager中找是否有类型与我们的type相同
        const item = DataManager.Instance.items.find(i => i.type === this.type)
        //找不到就return掉
        if (!item) {
            console.log("touchend中找不到");

            return
        }
        //如果找到了，则把状态改为手中
        if (item.status == ItemStatusEnum.Scene) {
            item.status = ItemStatusEnum.Inventory;
            console.log("touchend中修改状态为手中", item.status);
            //重新赋值,这样写能触犯manager 的set方法，就可以在set方法中加入自定义逻辑
            DataManager.Instance.items = [...DataManager.Instance.items]


        }
    }
}

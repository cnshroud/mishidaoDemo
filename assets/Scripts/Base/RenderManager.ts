




import { eventEnum } from "../Enum";
import EventManager from "../Runtime/EventManager";


const { ccclass, property } = cc._decorator;
//此类是渲染方法的抽象类
@ccclass
export abstract class RenderManager extends cc.Component {

    onload() {
        //绑定事件名称、方法、绑定上下文
        // console.log("这里是父类的onload方法");
        EventManager.Instance.on(eventEnum.Render, this.render, this)
    }

    onDestroy() {
        //解绑事件名称、方法
        EventManager.Instance.off(eventEnum.Render, this.render)
    }

    start() {
        //不管是初始化还是数据修改的时候都触发render方法（改变视图）
        //onload方法没有触发，所以在这边重新写一遍
        // EventManager.Instance.on(eventEnum.Render, this.render, this)
        this.render()
    }
    //实现一个render抽象方法让子类实现
    abstract render()
}

import Singleton from "../Base/Singleton"

//其中包含方法和上下文
//泛型IItem，泛型是为了让方法更灵活，因为方法里不仅要传入方法，haide也要传入上下文，所以数组的泛型需要用另外的类型IItem
interface IItem {
    func: Function,
    ctx: unknown
}



//这是EventManager也是单例，用于管理事件 例如渲染等
export default class EventManager extends Singleton {
    //重写父类方法获得EventManager实例
    static get Instance() {
        return super.GetInstance<EventManager>()
    }

    //发布事件模式
    //定义一个事件字典，字段其中包括：事件名称，方法的数组
    //因为方法里不仅要传入方法，haide也要传入上下文，所以数组的泛型需要用另外的类型IItem
    private eventDic: Map<string, Array<IItem>> = new Map()


    //绑定事件：往map中添加方法，因为函数的this指向不稳定，所以在调用函数时最好绑定一下可选的上下文ctx?上下文,
    on(eventName: string, func: Function, ctx?: unknown) {
        //判断字典里有没有这个事件
        if (this.eventDic.has(eventName)) {
            //如果有则把函数和上下文push进去
            this.eventDic.get(eventName).push({ func, ctx })
        } else {
            //没有则设置一个事件
            this.eventDic.set(eventName, [{ func, ctx }])
        }

    }
    //解绑事件
    off(eventName: string, func: Function, ctx?: unknown) {
        //判断字典里有没有这个事件
        if (this.eventDic.has(eventName)) {
            //查找这个函数有没有在这个数组里，要根据func来找
            const index = this.eventDic.get(eventName).findIndex(i => i.func === func && i.ctx === ctx)

            //如果有则删除函数
            index > -1 && this.eventDic.get(eventName).splice(index, 1)
        }
    }

    //触发事件（通过事件名称触发）一般触发事件都需要传入参数，所以用...params接受参数，因为不知道类型是什么所以选unknown
    emit(eventName: string, ...params: unknown[]) {
        // console.log("事件字典", this.eventDic);

        // console.log("渲染事件名称", eventName);

        if (this.eventDic.has(eventName)) {
            //遍历这个数组，用foreach执行数组里的每一个函数，在执行之前要解构出func和ctx
            // console.log("eventName", eventName);
            this.eventDic.get(eventName).forEach(({ func, ctx }) => {
                //把参数传入函数调用里，判断有没有上下文，如果有则使用.apply（）来绑定上下文，没有上下文就直接调用函数
                ctx ? func.apply(ctx, params) : func(...params)
            })
        }
    }

    //清空事件
    clear() {
        this.eventDic.clear()
    }
}   

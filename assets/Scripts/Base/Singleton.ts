//泛型单例
export default class Singleton {
    //一个私有字段
    private static _instance: any = null;

    //再暴露一个公有静态方法，不加<T>这个方法是没有类型的，所以要加个<T>泛型，返回类型为T
    static GetInstance<T>(): T {
        //判断字段是否存在
        if (this._instance === null) {
            //如果不存在，就创建一个该类型的实例
            this._instance = new this();
            // 初始化操作
        }

        //返回实例
        return this._instance
    }
}
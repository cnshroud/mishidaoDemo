import { RenderManager } from "../Base/RenderManager";
import { SceneEnum, TriggerStatusEnum } from "../Enum";
import DataManager from "../Runtime/DataManager";
import CircleManager from "./CircleManager";

const { ccclass, property } = cc._decorator;

//圆的半径
const CIRCLE_RADIUS = 80
@ccclass
export default class H2AGameManager extends RenderManager {
    @property(cc.Prefab)
    line: cc.Prefab = null;

    @property(cc.Node)
    lines: cc.Node = null;

    @property([cc.Prefab])
    ContentPF: cc.Prefab[] = [];

    //CircleManager数组
    @property([CircleManager])
    circle: CircleManager[] = [];

    private circlesMap: Map<CircleManager, CircleManager[]> = new Map()
    start() {
        super.start()
        this.genrateCirclesMap()
        this.generateLines()
        //检测游戏是否一开始就成功了
        this.checkSuccess()
    }

    render() {
        //渲染初始位置
        for (let i = 0; i < this.circle.length; i++) {
            const circle = this.circle[i]
            circle.node.removeAllChildren()

            const contentIndex = DataManager.Instance.H2AData[i]
            if (contentIndex !== null && this.ContentPF[contentIndex]) {
                const content = cc.instantiate(this.ContentPF[contentIndex])
                circle.node.addChild(content)
            }
        }

    }
    handleCircleTouch(e, _index: string) {
        //每次点击前检查一下门的状态,防止游戏已经成功了用户还乱点小游戏
        if (DataManager.Instance.DoorStatus === TriggerStatusEnum.Resolved) {
            return
        }
        const index = parseInt(_index)
        //拿到点击的circle的index值
        const curCircleContentIndex = DataManager.Instance.H2AData[index]
        if (curCircleContentIndex === null) {
            return
        }
        const curCircle = this.circle[index]
        //拿到这个circles的数组
        const circles = this.circlesMap.get(curCircle)
        console.log("circles:", circles);
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i]
            //判断有没有空位,找到null所在的index位置
            const nullIndex = DataManager.Instance.H2AData.findIndex(i => i === null)
            //找到现在点击的index位置
            const circleIndex = this.circle.findIndex(i => i === circle)
            if (nullIndex === circleIndex) {
                //根据索引设置位置
                DataManager.Instance.H2AData[circle.index] = curCircleContentIndex
                DataManager.Instance.H2AData[index] = null
                //重新赋值
                DataManager.Instance.H2AData = [...DataManager.Instance.H2AData]
            }
        }
        this.checkSuccess()
    }

    //检测小游戏是否成功完成了了
    checkSuccess() {
        //判断现在的数据是否与答案一致,如果每一项的索引和正确答案一样则返回true
        if (DataManager.Instance.H2AData.every((e, i) => DataManager.Instance.H2Aanswer[i] === e)) {
            console.log("小游戏完成");


            //相同则把h2场景 中的门的属性设置为Resolved
            DataManager.Instance.DoorStatus = TriggerStatusEnum.Resolved
            console.log(DataManager.Instance.DoorStatus);

            //跳转场景
            cc.director.loadScene(SceneEnum.H2)
        }

    }
    //重置小游戏
    resetContent() {
        DataManager.Instance.H2AData = [...DataManager.Instance.H2AInitData]
    }

    genrateCirclesMap() {
        this.circlesMap.set(this.circle[0], [this.circle[1], this.circle[4], this.circle[6]])
        this.circlesMap.set(this.circle[1], [this.circle[0], this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[2], [this.circle[4], this.circle[6]])
        this.circlesMap.set(this.circle[3], [this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[4], [this.circle[0], this.circle[2], this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[5], [this.circle[1], this.circle[4], this.circle[3], this.circle[6]])
        this.circlesMap.set(this.circle[6], [this.circle[0], this.circle[1], this.circle[2], this.circle[3], this.circle[4], this.circle[5]])
        //生成索引
        for (let i = 0; i < this.circle.length; i++) {
            const a = this.circle[i]
            a.index = i
        }
    }
    //生成线
    generateLines() {
        // //遍历map
        // for (const [curCircle, circles] of this.circlesMap) {
        //     for (const nextCircle of circles) {
        //         const curIndex = this.circle.findIndex(i => i === curCircle)
        //         const nextIndex = this.circle.findIndex(i => i === nextCircle)
        //         if (curIndex < nextIndex) {
        //             this.generateLine(curCircle, nextCircle)
        //         }
        //     }
        // }
        //上述forof方法报错，换成foreach试一下
        // 使用 forEach 方法遍历 map  
        this.circlesMap.forEach((circles: CircleManager[], curCircle: CircleManager) => {
            // 对于当前 CircleManager 关联的 CircleManager 数组进行遍历  
            circles.forEach((nextCircle: CircleManager) => {
                // 查找当前和下一个 CircleManager 在 this.circle 数组中的索引  
                const curIndex = this.circle.findIndex(i => i === curCircle);
                const nextIndex = this.circle.findIndex(i => i === nextCircle);

                // 如果当前索引小于下一个索引（确保不生成重复的线）  
                if (curIndex < nextIndex) {
                    // 生成线  
                    this.generateLine(curCircle, nextCircle);
                }
            });
        });
    }
    //生成逻辑
    generateLine(curCircle: CircleManager, nextCircle: CircleManager) {
        const line = cc.instantiate(this.line)
        const { x: x1, y: y1 } = curCircle.node.position
        const { x: x2, y: y2 } = nextCircle.node.position
        const x = (x1 + x2) / 2
        const y = (y1 + y2) / 2
        line.setPosition(x, y)
        //两条直角边
        const side1 = Math.abs(x1 - x2)
        const side2 = Math.abs(y1 - y2)
        const side3 = Math.sqrt(side1 ** 2 + side2 ** 2)
        // const uiTransform = line.getComponent(cc.UITransform)

        // uiTransform.setContentSize(side3 - 2 * CIRCLE_RADIUS, uiTransform.contentSize.height))
        //因为2.4版本无法使用uiTransform，只能用scaleX（按照比例缩放或扩大），用side3/原本线段的长度
        line.scaleX = (side3 - 2 * CIRCLE_RADIUS) / 53


        this.lines.addChild(line)
        const rad = Math.atan(side2 / side1)
        //角度
        const angle = rad * 180 / Math.PI

        const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? -1 : 1
        // line.setRotationFromEuler(0, 0, sign * angle) 2.4用setRotation

        line.setRotation(sign * angle)

    }
}

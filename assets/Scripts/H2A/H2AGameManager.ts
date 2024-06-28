import { RenderManager } from "../Base/RenderManager";
import CircleManager from "./CircleManager";

const { ccclass, property } = cc._decorator;

//圆的半径
const CIRCLE_RADIUS = 80
@ccclass
export default class H2AGameManager extends RenderManager {
    @property([cc.Prefab])
    line: cc.Prefab = null;

    @property([cc.Node])
    lines: cc.Node = null;



    //CircleManager数组
    @property([CircleManager])
    circle: CircleManager[] = [];

    private circlesMap: Map<CircleManager, CircleManager[]> = new Map()
    start() {
        super.start()
        this.genrateCirclesMap()
        this.generateLines()
    }

    render() {

    }
    genrateCirclesMap() {
        this.circlesMap.set(this.circle[0], [this.circle[1], this.circle[4], this.circle[6]])
        this.circlesMap.set(this.circle[1], [this.circle[0], this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[2], [this.circle[4], this.circle[6]])
        this.circlesMap.set(this.circle[3], [this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[4], [this.circle[0], this.circle[2], this.circle[5], this.circle[6]])
        this.circlesMap.set(this.circle[5], [this.circle[1], this.circle[4], this.circle[3], this.circle[6]])
        this.circlesMap.set(this.circle[6], [this.circle[0], this.circle[1], this.circle[2], this.circle[3], this.circle[4], this.circle[5]])
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

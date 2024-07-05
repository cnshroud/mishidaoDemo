import { RenderManager } from "../Base/RenderManager";
import DataManager from "../Runtime/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
//用于生成七个圆背景
export default class ContentManager extends RenderManager {

    //两个图片一般图片和正确图片
    @property(cc.SpriteFrame)
    normalSf: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    successSf: cc.SpriteFrame = null;
    @property(cc.Integer)
    index: number
    render() {
        //棋子移到正确位置则变色
        //拿到当前棋子的位置
        const curIndex = DataManager.Instance.H2AData.findIndex(i => i === this.index);
        //拿到答案棋子的位置
        const answerIndex = DataManager.Instance.H2Aanswer.findIndex(i => i === this.index);
        //如果在正确位置则变色
        this.getComponent(cc.Sprite).spriteFrame = curIndex === answerIndex ? this.successSf : this.normalSf;
    }
}

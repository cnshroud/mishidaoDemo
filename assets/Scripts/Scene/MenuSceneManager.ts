import { SceneEnum } from "../Enum/index";
import DataManager from "../Runtime/DataManager";
import SceneManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuSceneManager extends SceneManager {
    //这个场景就只有新游戏和继续游戏，背景用的h1场景的，只是多了个遮罩
    type: SceneEnum = SceneEnum.Menu;


    handleNewGame() {
        //重置datamanager
        DataManager.Instance.reset()
        //这个场景的跳转不需要改变数据
        cc.director.loadScene(SceneEnum.H1)

    }

    handleNewContinueGame() {
        DataManager.Instance.restore()
        //返回原场景
        cc.director.loadScene(DataManager.Instance.curScene)
    }
    //不实现父类方法
    render(): void {

    }
}

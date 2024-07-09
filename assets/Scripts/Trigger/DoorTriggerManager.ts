import { ItemStatusEnum, ItemTypeEnum, SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from "../Enum/index";
import DataManager from "../Runtime/DataManager";
import { TriggerManager } from "./TriggerManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class DoorTriggerManager extends TriggerManager {
    type: TriggerTypeEnum = TriggerTypeEnum.Door;




    render(): void {
        super.render();
        //拿到门图片,看门 的桩体是否为启用状态
        this.getComponent(cc.Sprite).enabled = DataManager.Instance.DoorStatus === TriggerStatusEnum.Pengind


    }
    handleTrigger(): void {
        //判断门的状态，如果为true就进入小游戏场景，否则进入场景h3
        if (DataManager.Instance.DoorStatus === TriggerStatusEnum.Pengind) {
            // cc.director.loadScene(SceneEnum.H2A)
            DataManager.Instance.curScene = SceneEnum.H2A
        } else {
            // cc.director.loadScene(SceneEnum.H3)
            DataManager.Instance.curScene = SceneEnum.H3
        }
    }

}




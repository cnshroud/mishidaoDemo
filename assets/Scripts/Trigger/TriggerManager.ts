

import { RenderManager } from "../Base/RenderManager";
import { TriggerTypeEnum, eventEnum } from "../Enum/index";
import EventManager from "../Runtime/EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export abstract class TriggerManager extends RenderManager {
    type: TriggerTypeEnum
    render() {

    }

    //点击事件
    abstract handleTrigger(): void

}

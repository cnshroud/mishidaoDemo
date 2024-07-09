// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { SceneEnum } from "../Enum/index";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H1SenceManager extends SenceManager {
    type: SceneEnum = SceneEnum.H1

}

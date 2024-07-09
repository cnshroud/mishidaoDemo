

import { SceneEnum } from "../Enum/index";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H3SenceManager extends SenceManager {
    type: SceneEnum = SceneEnum.H3

}

import { SceneEnum } from "../Enum/index";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuManager extends cc.Component {
    handleBackMenu() {
        //回到主菜单
        cc.director.loadScene(SceneEnum.Menu);
    }


}

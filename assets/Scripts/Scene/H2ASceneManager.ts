import { SceneEnum } from "../Enum/index";
import MusicManager from "../Music/MusicManager";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H2ASenceManager extends SenceManager {
    type: SceneEnum = SceneEnum.H2A;

    // music = new MusicManager();
    start(): void {
        super.start();
        //通过常驻节点，停止背景音乐
        cc.find("music").getComponent(MusicManager).stopMusic();
        console.log(cc.audioEngine.isMusicPlaying());
    }

}

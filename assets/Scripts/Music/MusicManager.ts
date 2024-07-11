
import Singleton from "../Base/Singleton";
import { SceneEnum } from "../Enum";
import DataManager from "../Runtime/DataManager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class MusicManager extends cc.Component {
    //设置背景音乐
    @property(cc.AudioClip)
    bgmClip: cc.AudioClip = null;
    bgm: number = null
    //将节点设置为常驻节点
    onLoad() {
        cc.game.addPersistRootNode(this.node)
    }
    start() {
        this.openBgm()
    }
    //cc.audioEngine.playMusic(this.bgmClip, true);可以设置全局的背景音乐
    //音频状态 -1是暂停，1是开始
    //同一时间只能有一个背景音乐
    openBgm() {
        this.bgm = cc.audioEngine.playMusic(this.bgmClip, true);
    }
    stopMusic() {
        cc.audioEngine.stopMusic();
    }
}

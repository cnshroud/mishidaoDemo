

import { ItemStatusEnum, ItemTypeEnum, SceneEnum, eventEnum } from "../Enum/index";
import MusicManager from "../Music/MusicManager";
import DataManager from "../Runtime/DataManager";
import EventManager from "../Runtime/EventManager";
import SenceManager from "./SceneManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class H2SenceManager extends SenceManager {
    type: SceneEnum = SceneEnum.H2


    //钥匙的预制体
    @property(cc.Prefab)
    KeyPF: cc.Prefab = null;
    //钥匙存放的位置
    @property(cc.Node)
    KeyPlaceholder: cc.Node = null;
    start(): void {
        super.start()
        //h2场景根据isMusicPlaying状态来判断是否播放背景音乐
        if (cc.audioEngine.isMusicPlaying()) {
            return
        } else {
            cc.find("music").getComponent(MusicManager).openBgm();
        }
        // this.music.stopMusic()
        console.log(cc.audioEngine.isMusicPlaying());
    }

    render() {
        super.render()
        //清空子元素
        this.items.removeAllChildren()
        const Key = DataManager.Instance.items.find(i => i.type === ItemTypeEnum.Key)
        if (Key && Key.status === ItemStatusEnum.Scene) {
            const KeyNode = cc.instantiate(this.KeyPF)
            this.items.addChild(KeyNode)
            //设置位置
            KeyNode.setPosition(this.KeyPlaceholder.position)
        }
    }

}

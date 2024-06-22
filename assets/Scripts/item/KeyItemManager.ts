




import { ItemTypeEnum } from "../Enum/index";
import ItemManager from "./ItemManager";

const { ccclass } = cc._decorator;

@ccclass
export default class KeyItemManager extends ItemManager {

    label = "信箱钥匙"
    //物品 有三个状态 场景，手中，使用
    // status: ItemStatusEnum
    //物品类型
    type: ItemTypeEnum = ItemTypeEnum.Key


    //物品图标 场景中的图片和手上的图片
    //     @property(cc.SpriteFrame)
    //     sceneSf: cc.SpriteFrame = null;
    //     @property(cc.SpriteFrame)
    //     inventorySf: cc.SpriteFrame = null;
    // 
}

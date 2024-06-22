

import { ItemTypeEnum } from "../Enum/index";
import ItemManager from "./ItemManager";

const { ccclass } = cc._decorator;

@ccclass
export default class MailItemManager extends ItemManager {
    label = "船票"
    //物品 有三个状态 场景，手中，使用
    // status: ItemStatusEnum
    //物品类型
    type: ItemTypeEnum = ItemTypeEnum.Mail
    //物品描述
    // = ItemTypeEnum.Key
    // @property(cc.SpriteFrame)
    // sceneSf: cc.SpriteFrame = null;
    // @property(cc.SpriteFrame)
    // inventorySf: cc.SpriteFrame = null;
}

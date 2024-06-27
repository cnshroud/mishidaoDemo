export enum SceneEnum {

    Loading = "Loading",
    H1 = "H1",
    H2 = "H2",
    H3 = "H3",
    H4 = "H4",
}

export enum ItemStatusEnum {
    Scene = 'Scene',
    Inventory = 'Inventory',
    Disable = 'Disable'
}

export enum ItemTypeEnum {

    Mail = "Mail",
    Key = "Key",


}
//事件枚举
export enum eventEnum {
    //渲染事件
    Render = "Render",


}
export enum TriggerTypeEnum {
    MailBox = "MailBox"
}
//Trigger状态枚举，使用和没使用
export enum TriggerStatusEnum {
    Pengind = "Pengind",    //没使用
    Resolved = "Resolved"
}
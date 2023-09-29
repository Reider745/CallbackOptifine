const DUNGEON_UTILITY = "com/reider/dungeonutility/NativeAPI";

ModAPI.addAPICallback("DungeonUtility", function(api){
    CallbackEnabled.setCallbackEnabled("setBlockFeature", false);
    let prefix = CallbackEnabled.getPrefix();
    Logger.Log("Disable feature DungeonUtility", prefix);

    const addFeatureHandler = api.Structure.addFeatureHandler;
    api.Structure.addFeatureHandler = function(){
        addFeatureHandler.apply(this, arguments);

        CallbackEnabled.setCallbackEnabled("setBlockFeature", true);
        Logger.Log("Enable feature DungeonUtility", prefix);
    } 
});
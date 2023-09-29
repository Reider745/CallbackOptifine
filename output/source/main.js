var CallbackEnabled = WRAP_JAVA("com.reider745.callbackoptifine.CallbackEnabled");
var NATIVE_CALLBACK = "com/zhekasmirnov/innercore/api/NativeCallback";
//CallbackEnabled.setCallbackEnabled(NATIVE_CALLBACK, "onLocalTick", "()V", false);
if (CallbackEnabled.isDebugBuild())
    Callback.addCallback("LevelLeft", function () { return FileTools.WriteText(__dir__ + "debug_info.txt", CallbackEnabled.getDebugInfo()); });
;
var all_disabled = [];
function registerDisabledCallback(jsName, min, func_name) {
    all_disabled.push({ jsName: jsName, min: min, func_name: func_name });
}
var DUNGEON_UTILITY = "com/reider/dungeonutility/NativeAPI";
ModAPI.addAPICallback("DungeonUtility", function (api) {
    CallbackEnabled.setCallbackEnabled("setBlockFeature", false);
    var prefix = CallbackEnabled.getPrefix();
    Logger.Log("Disable feature DungeonUtility", prefix);
    var addFeatureHandler = api.Structure.addFeatureHandler;
    api.Structure.addFeatureHandler = function () {
        addFeatureHandler.apply(this, arguments);
        CallbackEnabled.setCallbackEnabled("setBlockFeature", true);
        Logger.Log("Enable feature DungeonUtility", prefix);
    };
});
registerDisabledCallback("GenerateBiomeMap", 1, "onBiomeMapGenerated");
registerDisabledCallback(["PreProcessChunk", "GenerateChunkUniversal"], 1, "onPreChunkPostProcessed");
registerDisabledCallback(["PostProcessChunk", "GenerateChunk", "GenerateChunkUniversal"], 1, "onChunkPostProcessed");
registerDisabledCallback("EntityAddedLocal", 1, "onLocalEntityAdded");
registerDisabledCallback("EntityRemovedLocal", 1, "onLocalEntityRemoved");
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Callback.addCallback("PostLoaded", function () {
    var e_1, _a, e_2, _b;
    var prefix = CallbackEnabled.getPrefix();
    Logger.Log("Start disable callback", prefix);
    var start = new Date().getTime();
    try {
        for (var all_disabled_1 = __values(all_disabled), all_disabled_1_1 = all_disabled_1.next(); !all_disabled_1_1.done; all_disabled_1_1 = all_disabled_1.next()) {
            var data = all_disabled_1_1.value;
            if (typeof data.jsName == "string")
                var list = [data.jsName];
            else
                var list = data.jsName;
            var disable_callback = true;
            var callbacks = {};
            try {
                for (var list_1 = (e_2 = void 0, __values(list)), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                    var name = list_1_1.value;
                    var count = CallbackEnabled.getCountCallbackForName(name);
                    callbacks[name] = count;
                    if (count >= data.min) {
                        disable_callback = false;
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (list_1_1 && !list_1_1.done && (_b = list_1.return)) _b.call(list_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (disable_callback) {
                CallbackEnabled.setCallbackEnabled(data.func_name, false);
                for (var name in callbacks)
                    Logger.Log("Disabled callback " + name + ", count: " + callbacks[name], prefix);
            }
            else
                for (var name in callbacks)
                    Logger.Log("Not disabled callback " + name + ", count: " + callbacks[name], prefix);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (all_disabled_1_1 && !all_disabled_1_1.done && (_a = all_disabled_1.return)) _a.call(all_disabled_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    Logger.Log("End disable callback, time: " + (new Date().getTime() - start), prefix);
});
ModAPI.registerAPI("CallbackOptifine", {
    requireGlobal: function (command) {
        return eval(command);
    }
});

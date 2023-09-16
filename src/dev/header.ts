interface ICallbackEnabled {
    setCallbackEnabled(method: string, value: boolean): void;
    isDebugBuild(): boolean;
    getDebugInfo(): string;
    getCountCallbackForName(name: string): number;
    getPrefix(): string;
}

let CallbackEnabled: ICallbackEnabled = WRAP_JAVA("com.reider745.callbackoptifine.CallbackEnabled");
const NATIVE_CALLBACK = "com/zhekasmirnov/innercore/api/NativeCallback";


//CallbackEnabled.setCallbackEnabled(NATIVE_CALLBACK, "onLocalTick", "()V", false);
if(CallbackEnabled.isDebugBuild())
    Callback.addCallback("LevelLeft", () => FileTools.WriteText(__dir__+"debug_info.txt", CallbackEnabled.getDebugInfo()));
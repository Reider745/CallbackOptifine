Callback.addCallback("PostLoaded", () => {
	let prefix = CallbackEnabled.getPrefix();
	Logger.Log("Start disable callback", prefix);
	let start = new Date().getTime();

    for(let i in all_disabled){
        with(all_disabled[i]){
            let count = CallbackEnabled.getCountCallbackForName(jsName);
            if(count < min){
                CallbackEnabled.setCallbackEnabled(func_name, false);
                Logger.Log("Disabled callback "+jsName+", count: "+count, prefix);
            }else
                Logger.Log("Not disabled callback "+jsName+", count: "+count, prefix);
        }
    }

	Logger.Log("End disable callback, time: "+(new Date().getTime()-start), prefix);
});

ModAPI.registerAPI("CallbackOptifine", {
	requireGlobal(command){
		return eval(command);
	}
});
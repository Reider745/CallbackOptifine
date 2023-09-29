Callback.addCallback("PostLoaded", () => {
	let prefix = CallbackEnabled.getPrefix();
	Logger.Log("Start disable callback", prefix);
	let start = new Date().getTime();

    for(let data of all_disabled){
        if(typeof data.jsName == "string")
            var list = [data.jsName];
        else
            var list = data.jsName;

        let disable_callback = true;
        let callbacks: {[key: string]: number} = {};
        for(let name of list){
            let count = CallbackEnabled.getCountCallbackForName(name);
            callbacks[name] = count;
            if(count >= data.min){
                disable_callback = false;
                break;
            }
        }

        if(disable_callback){
            CallbackEnabled.setCallbackEnabled(data.func_name, false);
            for(let name in callbacks)
                Logger.Log("Disabled callback "+name+", count: "+callbacks[name], prefix);
        }else
            for(let name in callbacks)
            Logger.Log("Not disabled callback "+name+", count: "+callbacks[name], prefix);
    }

	Logger.Log("End disable callback, time: "+(new Date().getTime()-start), prefix);
});

ModAPI.registerAPI("CallbackOptifine", {
	requireGlobal(command){
		return eval(command);
	}
});
interface ICallbackList {
    jsName: string | string[], 
    min: number, 
    func_name: string
};
let all_disabled: ICallbackList[] = [];
function registerDisabledCallback(jsName: string | string[], min: number, func_name: string): void {
    all_disabled.push({jsName, min, func_name});
}


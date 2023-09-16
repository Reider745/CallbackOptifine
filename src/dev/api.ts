let all_disabled = [];
function registerDisabledCallback(jsName: string, min: number, func_name: string): void {
    all_disabled.push({jsName, min, func_name});
}


function bindContext(context) {
    return function applyConextTo(functionName) {
        context[functionName] = context[functionName].bind(context);
    }    
}

export function bindContextToFunctionList(context) {
    return function applyConextTo(functionNameList) {
        const bindCurrentContext = bindContext(context);
        functionNameList.map(bindCurrentContext);
    }    
}

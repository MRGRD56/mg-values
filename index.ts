type BoolExp = boolean | (() => boolean);

function getBoolExpValue(boolExp: BoolExp): boolean {
    return typeof boolExp === "function"
        ? boolExp()
        : boolExp;
}

export function vif<TResult>(expression: BoolExp, value: TResult, alternativeValue: TResult | string = ""): TResult | string {
    const exp = getBoolExpValue(expression);
    return exp ? value : alternativeValue;
}

export function classes(classesObj: Record<string, BoolExp>, requiredClasses: string[] | string = undefined): string {
    let reqClassesString = "";
    if (requiredClasses !== undefined) {
        reqClassesString = Array.isArray(requiredClasses)
            ? (<string[]>requiredClasses).map(c => c.trim()).join(" ")
            : <string>requiredClasses;
        reqClassesString = reqClassesString.trim();
        if (reqClassesString) {
            reqClassesString += " ";
        }
    }

    const classesByPredicates = Object.keys(classesObj)
        .map(key => key?.trim())
        .filter(key => key && Object.prototype.hasOwnProperty.call(classesObj, key))
        .map(key => {
            return {
                key: key,
                value: classesObj[key]
            };
        })
        .filter(kv => getBoolExpValue(kv.value))
        .map(kv => kv.key.trim())
        .join(" ");
    return reqClassesString + classesByPredicates;
}
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

export function classes(conditionalClasses: Record<string, BoolExp> = {}, requiredClasses: string[] | string = undefined): string {
    let requiredClassesString = "";
    if (requiredClasses !== undefined) {
        requiredClassesString = Array.isArray(requiredClasses)
            ? (<string[]>requiredClasses).filter(c => c).map(c => c.trim()).filter(c => c).join(" ")
            : <string>requiredClasses;
        requiredClassesString = requiredClassesString?.trim();
    }

    const conditionalClassesString = Object.keys(conditionalClasses)
        .map(key => key?.trim())
        .filter(key => key && Object.prototype.hasOwnProperty.call(conditionalClasses, key))
        .map(key => {
            return {
                key: key,
                value: conditionalClasses[key]
            };
        })
        .filter(kv => getBoolExpValue(kv.value))
        .map(kv => kv.key.trim())
        .join(" ");

    if (requiredClassesString && conditionalClassesString) {
        requiredClassesString += " ";
    }

    return requiredClassesString + conditionalClassesString;
}

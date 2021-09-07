import {vif, classes} from "./index";

function testEquality(testName: string, expected: any, actual: any) {
    test(testName, () => {
        expect(actual).toBe(expected);
    });
}

test("vif test 1", () => {
    const actual = vif(() => 2 > 1, "YES");
    expect(actual).toBe("YES");
});

test("vif test 2", () => {
    const actual = vif(1 > 2, 1, 5);
    expect(actual).toBe(5);
});

test("vif test 3", () => {
    const actual = vif(() => 1 > 2, { isYes: true });
    expect(actual).toBe("");
});

test("classes test 1", () => {
    const actual = classes({
        "red": true,
        "green": () => false,
        "blue": () => 1 === 1
    });
    expect(actual).toBe("red blue");
});

test("classes test empty", () => {
    const actual = classes({});
    expect(actual).toBe("");
});
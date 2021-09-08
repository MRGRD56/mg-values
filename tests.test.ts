import {vif, classes} from "./index";

test("vif test 1.1", () => {
    const actual = vif(() => 2 > 1, "YES");
    expect(actual).toBe("YES");
});

test("vif test 1.2", () => {
    const actual = vif(2 > 1, "YES");
    expect(actual).toBe("YES");
});

test("vif test 2.1", () => {
    const actual = vif(() => 1 > 2, 1, 5);
    expect(actual).toBe(5);
});

test("vif test 2.2", () => {
    const actual = vif(1 > 2, 1, 5);
    expect(actual).toBe(5);
});

test("vif test 3.1", () => {
    const actual = vif(() => 1 > 2, { isYes: true });
    expect(actual).toBe("");
});

test("vif test 3.2", () => {
    const actual = vif(1 > 2, { isYes: true });
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

test("classes test 2 empty", () => {
    const actual = classes({});
    expect(actual).toBe("");
});

test("classes test 3 with second parameter, string", () => {
    const actual = classes({
        "red": true,
        "green": false,
        "blue": 1 === 1
    }, "d-flex");
    expect(actual).toBe("d-flex red blue");
});

test("classes test 4 with second parameter, string[]", () => {
    const actual = classes({
        "red": true,
        "green": () => false,
        "blue": () => 1 === 1
    }, ["my-element", "mb-3"]);
    expect(actual).toBe("my-element mb-3 red blue");
});
import {
  createValue,
  createError,
  isValue,
  isError,
  unwrap,
} from "../utils/valueOrError";

describe("createValue", () => {
  it("should create a value object", () => {
    expect(createValue("INSERT VALUE HERE")).toEqual({
      type: "value",
      value: "INSERT VALUE HERE",
    });

    expect(createValue(true)).toEqual({
      type: "value",
      value: true,
    });
  });
});

describe("createError", () => {
  it("should create an error object", () => {
    expect(createError("INSERT ERROR HERE")).toEqual({
      type: "error",
      error: "INSERT ERROR HERE",
    });

    expect(createError(true)).toEqual({
      type: "error",
      error: true,
    });
  });
});

describe("isValue", () => {
  it("should return true if the argument is a value object", () => {
    expect(isValue(createValue(undefined))).toBe(true);
    expect(isValue(createError(undefined))).toBe(false);
  });
});

describe("isError", () => {
  it("should return true if the argument is an error object", () => {
    expect(isError(createValue(undefined))).toBe(false);
    expect(isError(createError(undefined))).toBe(true);
  });
});

describe("unwrap", () => {
  it("should return the value if given a value object, or the error if given an error object", () => {
    expect(unwrap(createValue("VALUE"))).toBe("VALUE");
    expect(unwrap(createError("ERROR"))).toBe("ERROR");
  });

  it("should error if you use invalid arguments", () => {
    // @ts-expect-error I'm testing an error
    expect(() => unwrap("hello")).toThrow();
  });
});

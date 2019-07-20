const querystring = require("../src");
const qs = require("../src/browser");
const cases = require("jest-in-case");

describe("querystring", () => {
  cases(
    "stringify(obj, sep, eq, options)",
    ({ obj, sep, eq, options }) => {
      expect(qs.stringify(obj, sep, eq, options)).toEqual(
        querystring.stringify(obj, sep, eq, options)
      );
    },
    [
      { name: "Zero", obj: {}, sep: "&", eq: "=", options: undefined },
      { name: "One", obj: { one: 1 }, sep: "&", eq: "=", options: undefined },
      {
        name: "Many",
        obj: { one: 1, two: 2 },
        sep: "&",
        eq: "=",
        options: undefined
      },
      {
        name: "Types",
        obj: {
          array: ["one", "two"],
          bigInt: BigInt(9007199254740991),
          boolean: true,
          null: null,
          object: { one: 1, two: 2 },
          string: "string",
          symbol: Symbol("symbol"),
          undefined: undefined
        },
        sep: "&",
        eq: "=",
        options: undefined
      },
      {
        name: "Quirks",
        obj: {
          array: ["one", "two"],
          bigInt: BigInt(9007199254740991),
          boolean: true,
          null: null,
          object: { one: 1, two: 2 },
          string: "string",
          symbol: Symbol("symbol"),
          undefined: undefined
        },
        sep: "=",
        eq: "&",
        options: undefined
      }
    ]
  );

  cases(
    "parse(str, sep, eq, options)",
    ({ str, sep, eq, options }) => {
      expect(qs.parse(str, sep, eq, options)).toEqual(
        querystring.parse(str, sep, eq, options)
      );
    },
    [
      { name: "Zero", str: "", sep: "&", eq: "=", options: undefined },
      {
        name: "One",
        str: querystring.stringify({ one: 1 }),
        sep: "&",
        eq: "=",
        options: undefined
      },
      {
        name: "Many",
        str: querystring.stringify({ one: 1, two: 2 }),
        sep: "&",
        eq: "=",
        options: undefined
      },
      {
        name: "Zero maxKeys",
        str: querystring.stringify({ one: 1, two: 2 }),
        sep: "&",
        eq: "=",
        options: { maxKeys: 0 }
      },
      {
        name: "1 maxKeys",
        str: querystring.stringify({ one: 1, two: 2 }),
        sep: "&",
        eq: "=",
        options: { maxKeys: 1 }
      },
      {
        name: "2 maxKeys",
        str: querystring.stringify({ one: 1, two: 2 }),
        sep: "&",
        eq: "=",
        options: { maxKeys: 2 }
      },
      {
        name: "Types",
        str: querystring.stringify({
          array: ["one", "two"],
          bigInt: BigInt(9007199254740991),
          boolean: true,
          null: null,
          object: { one: 1, two: 2 },
          string: "string",
          symbol: Symbol("symbol"),
          undefined: undefined
        }),
        sep: "&",
        eq: "=",
        options: undefined
      },
      {
        name: "Quirks",
        str: querystring.stringify(
          {
            array: ["one", "two"],
            bigInt: BigInt(9007199254740991),
            boolean: true,
            null: null,
            object: { one: 1, two: 2 },
            string: "string",
            symbol: Symbol("symbol"),
            undefined: undefined
          },
          "=",
          "&"
        ),
        sep: "=",
        eq: "&",
        options: undefined
      },
      {
        name: "Junk",
        str:
          "asdgokaspgkasdgok235235ok2etdsbo0-===-235=-235=-sdfg=2345&7=-235=0-7=&34=",
        sep: "&",
        eq: "=",
        options: undefined
      }
    ]
  );

  describe("decode", () => {
    it("is an alias to parse", () => {
      expect(qs.decode).toEqual(qs.parse);
      expect(querystring.decode).toEqual(querystring.parse);
    });
  });

  describe("encode", () => {
    it("is an alias to stringify", () => {
      expect(qs.encode).toEqual(qs.stringify);
      expect(querystring.encode).toEqual(querystring.encode);
    });
  });
});

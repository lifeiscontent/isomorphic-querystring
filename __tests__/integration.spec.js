const querystring = require("../");
const qs = require("../browser");

describe("querystring", () => {
  test("stringify", () => {
    expect(
      qs.stringify(
        {
          "foo bar bazer": 1,
          bar: "wow wow wow",
          wat: Symbol("bar"),
          big: BigInt(9007199254740991),
          quz: true,
          things: ["", "", ""],
          baz: { foo: false, bar: false }
        },
        "&",
        "="
      )
    ).toEqual(
      querystring.stringify(
        {
          "foo bar bazer": 1,
          bar: "wow wow wow",
          wat: Symbol("bar"),
          big: BigInt(9007199254740991),
          quz: true,
          things: ["", "", ""],
          baz: { foo: false, bar: false }
        },
        "&",
        "="
      )
    );
  });
  test("parse", () => {
    const string = querystring.stringify(
      {
        "foo bar bazer": 1,
        bar: "wow wow wow",
        bar: "what what what",
        wat: Symbol("bar"),
        big: BigInt(9007199254740991),
        quz: true,
        things: ["stuff", "buzz"],
        baz: { foo: false, bar: false }
      },
      "&",
      "="
    );

    expect(qs.parse(string, "=", "&", { maxKeys: 1 })).toEqual(
      querystring.parse(string, "=", "&", { maxKeys: 1 })
    );
  });
});

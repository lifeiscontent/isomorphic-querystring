function stringify(
  obj,
  sep = "&",
  eq = "=",
  { encodeURIComponent = window.encodeURIComponent } = {}
) {
  return Object.entries(obj)
    .reduce((result, [key, value]) => {
      switch (typeof value) {
        case "boolean":
        case "number":
        case "string":
          return result.concat(
            `${encodeURIComponent(key)}${eq}${encodeURIComponent(value)}`
          );
        case "object":
          if (Array.isArray(value)) {
            return result.concat(
              value.map(
                v => `${encodeURIComponent(key)}${eq}${encodeURIComponent(v)}`
              )
            );
          }
        default:
          return result.concat(`${encodeURIComponent(key)}${eq}`);
      }
    }, [])
    .join(sep);
}

function parse(
  str,
  sep = "&",
  eq = "=",
  { decodeURIComponent = window.decodeURIComponent, maxKeys = 1000 } = {}
) {
  const result = Object.create(null);
  const length = str.length;

  if (length === 0) return result;

  let key = "";
  let parsedKeys = 0;
  let state = 0;
  let value = "";

  for (let i = 0; i <= length; i++) {
    const char = str[i];

    if (char === undefined) {
      state = 2;
    }

    switch (state) {
      case 0:
        if (char !== eq) {
          key += char;
        } else {
          if (!(decodeURIComponent(key) in result)) {
            result[decodeURIComponent(key)] = undefined;
          }
          state = 1;
          parsedKeys += 1;
        }
        break;
      case 1:
      case 2:
        if (char !== sep && char !== undefined) {
          value += char;
        } else {
          if (Array.isArray(result[decodeURIComponent(key)])) {
            // concat array
            result[decodeURIComponent(key)].concat(decodeURIComponent(value));
          } else if (result[decodeURIComponent(key)] !== undefined) {
            // turn into array
            result[decodeURIComponent(key)] = [
              result[decodeURIComponent(key)]
            ].concat(decodeURIComponent(value));
          } else {
            // set value
            result[decodeURIComponent(key)] = decodeURIComponent(value);
          }
          key = "";
          value = "";
          state = 0;
        }
        break;
    }

    if (maxKeys !== 0 && parsedKeys > maxKeys) {
      break;
    }
  }
  return result;
}

const querystring = {
  decode: parse,
  encode: stringify,
  escape: window.encodeURIComponent,
  parse,
  stringify,
  unescape: window.decodeURIComponent
};

module.exports = querystring;

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
  let key = "";
  let keyOrValue = 0;
  let parsedKeys = 0;
  let value = "";

  for (let i = 0; i <= length; i++) {
    if (parsedKeys >= maxKeys) {
      break;
    }

    const char = str[i];
    switch (char) {
      case eq:
        if (!(decodeURIComponent(key) in result)) {
          result[decodeURIComponent(key)] = undefined;
        }
        parsedKeys += 1;
        keyOrValue = 1;
        break;
      case undefined:
      case sep:
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
        keyOrValue = 0;
        break;
      default:
        if (keyOrValue === 1) {
          value += char;
        } else {
          key += char;
        }
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

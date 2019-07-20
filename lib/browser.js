"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function stringify(obj) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "&";
  var eq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "=";

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$encodeURICompone = _ref.encodeURIComponent,
      encodeURIComponent = _ref$encodeURICompone === void 0 ? window.encodeURIComponent : _ref$encodeURICompone;

  return Object.entries(obj).reduce(function (result, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    switch (_typeof(value)) {
      case "boolean":
      case "number":
      case "string":
        return result.concat("".concat(encodeURIComponent(key)).concat(eq).concat(encodeURIComponent(value)));

      case "object":
        if (Array.isArray(value)) {
          return result.concat(value.map(function (v) {
            return "".concat(encodeURIComponent(key)).concat(eq).concat(encodeURIComponent(v));
          }));
        }

      default:
        return result.concat("".concat(encodeURIComponent(key)).concat(eq));
    }
  }, []).join(sep);
}

function parse(str) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "&";
  var eq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "=";

  var _ref4 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref4$decodeURICompon = _ref4.decodeURIComponent,
      decodeURIComponent = _ref4$decodeURICompon === void 0 ? window.decodeURIComponent : _ref4$decodeURICompon,
      _ref4$maxKeys = _ref4.maxKeys,
      maxKeys = _ref4$maxKeys === void 0 ? 1000 : _ref4$maxKeys;

  var result = Object.create(null);
  var length = str.length;
  if (length === 0) return result;
  var key = "";
  var parsedKeys = 0;
  var state = 0;
  var value = "";

  for (var i = 0; i <= length; i++) {
    var _char = str[i];

    if (_char === undefined) {
      state = 2;
    }

    switch (state) {
      case 0:
        if (_char !== eq) {
          key += _char;
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
        if (_char !== sep && _char !== undefined) {
          value += _char;
        } else {
          if (Array.isArray(result[decodeURIComponent(key)])) {
            // concat array
            result[decodeURIComponent(key)].concat(decodeURIComponent(value));
          } else if (result[decodeURIComponent(key)] !== undefined) {
            // turn into array
            result[decodeURIComponent(key)] = [result[decodeURIComponent(key)]].concat(decodeURIComponent(value));
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

var querystring = {
  decode: parse,
  encode: stringify,
  escape: window.encodeURIComponent,
  parse: parse,
  stringify: stringify,
  unescape: window.decodeURIComponent
};
module.exports = querystring;
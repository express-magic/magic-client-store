"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var localforage = _interopRequire(require("localforage"));

var series = require("async").series;

var self,
    emptyFn = function () {};

var Store = (function () {
  function Store(opts, cb) {
    _classCallCheck(this, Store);

    self = this;
    self.active = self.hasStore(cb);
  }

  _createClass(Store, {
    setItem: {
      value: function setItem(key, val, cb) {
        cb = is.fn(cb) ? cb : emptyFn;
        if (is.fn(val) && !cb) {
          cb = val;
          val = false;
        }
        if (!val && is.a(key, "object")) {
          if (is.string(key.val) && is.string(key.key)) {
            val = key.val;
            key = key.key;
          }
        }
        localforage.setItem(key, val, cb);
      }
    },
    getItem: {
      value: function getItem(key, cb) {
        cb = is.fn(cb) ? cb : emptyFn;

        if (is.a(key, "object")) {
          if (is.string(key.key)) {
            key = key.key;
          }
        }
        localforage.getItem(key, cb);
      }
    },
    removeItem: {
      value: function removeItem(key, cb) {
        cb = is.fn(cb) ? cb : emptyFn;

        if (is.a(key, "object")) {
          if (is.string(key.key)) {
            key = key.key;
          }
        }
        localforage.removeItem(key, cb);
      }
    },
    hasStore: {
      value: function hasStore(cb) {
        cb = is.fn(cb) ? cb : emptyFn;

        try {
          waterfall([function (wcb) {
            var item = {
              key: "itemtest235",
              val: "mod"
            };
            wcb(item);
          }, self.setItem, self.getItem, self.removeItem], function (err, item) {
            if (err) {
              throw Error(err);
            };
            cb(true);
          });
        } catch (e) {
          cb(false);
        }
      }
    }
  });

  return Store;
})();

var forage = localforage;
exports.forage = forage;

//# sourceMappingURL=index.js.map
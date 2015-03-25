import localforage from 'localforage'
import {series} from 'async';

var self
  , emptyFn = () => {}
;


class Store {
  constructor(opts, cb) {
    self = this;
    self.active = self.hasStore(cb);
  }

  setItem(key, val, cb) {
    cb = is.fn(cb) ? cb : emptyFn;
    if ( is.fn(val) && ! cb ) {
      cb = val;
      val = false;
    }
    if ( ! val && is.a(key, 'object') ) {
      if ( is.string(key.val) && is.string(key.key) ) {
        val = key.val;
        key = key.key;
      }
    }
    localforage.setItem(key, val, cb);
  }

  getItem(key, cb) {
    cb = is.fn(cb) ? cb : emptyFn;

    if ( is.a(key, 'object') ) {
      if ( is.string(key.key) ) {
        key = key.key;
      }
    }
    localforage.getItem(key, cb);
  }

  removeItem(key, cb) {
    cb = is.fn(cb) ? cb : emptyFn;

    if ( is.a(key, 'object') ) {
      if ( is.string(key.key) ) {
        key = key.key;
      }
    }
    localforage.removeItem(key, cb);
  }

  hasStore(cb) {
    cb = is.fn(cb) ? cb : emptyFn;

    try {
      waterfall([
        (wcb) => {
          var item = {
            key: 'itemtest235',
            val: 'mod'
          };
          wcb(item);
        }
        , self.setItem
        , self.getItem
        , self.removeItem
      ], (err, item) => {
        if (err) { throw Error(err) };
        cb(true);
      });
    } catch(e) {
      cb(false);
    }
  }
}

export var forage = localforage;

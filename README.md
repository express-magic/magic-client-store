# magic-client-store

stores client side data in indexdb using localforage,

has test if cookies are disabled 
(which also disables localStorage and indexDB in some browsers)

####usage (condensed, store is using async internally):
```js
  var Store = require('magic-client-store');
  var store = new Store(cb);

  try {
    waterfall([
      (cb) => {
        var item = {
          key: 'itemtest235',
          val: 'mod'
        };
        cb(item);
      }
      , store.setItem
      , store.getItem
      , store.removeItem
    ], (err, item) => {
      if (err) { throw Error(err) };
      cb(true);
    });
  } catch(e) {
    cb(false);
  }
```

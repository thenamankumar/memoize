'use strict';
const createCache = require('./createCache');

const memoize = (func, size = 0) => {
  const cache = createCache(size);

  return function(...args) {
    /* check the cache for saved value. */
    const cacheValue = cache.get(args);

    if (cacheValue === undefined) {
      /* if not present in cache, call the func and
       * set the value in cache. */
      return cache.set(args, func.apply(this, args));
    }

    return cacheValue;
  };
};

module.exports = memoize;

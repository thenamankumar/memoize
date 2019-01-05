'use strict';

function Cache(size) {
  const store = {};
  let queue = [];

  const removeFromQueue = key => {
    const keyPos = queue.findIndex(item => item === key);

    queue = Array.prototype.concat.call(
      queue.slice(0, keyPos),
      queue.slice(keyPos + 1),
    );
  };

  /* cache.set method to add items in cache. */
  Object.defineProperty(this, 'set', {
    value: (keyObject, value) => {
      const key = JSON.stringify(keyObject);

      /* check if the key is already present in store. */
      if (key in store) {
        /* if present, remove the key from the queue 
         * and insert it later at the rear position. */
        removeFromQueue(key);
      } else if (size > 0 && queue.length === size) {
        /* if not present, check if the cache has reached
         * it's max cache size limit. */

        /* config.size = 0 means there is no cache size limit. */

        /* if max size is reached remove the least recently 
         * used item from the front of the queue and store. */

        const removedKey = queue.shift();
        delete store[removedKey];
      }

      /* insert the item in at the rear of the queue and store. */
      queue.push(key);
      store[key] = value;

      return value;
    },
  });

  /* cache.get method to get item from cache. */
  Object.defineProperty(this, 'get', {
    value: keyObject => {
      const key = JSON.stringify(keyObject);

      /* if key not present, return undefined. */
      if (!(key in store)) {
        return undefined;
      }

      /* bring the key to rear position in the queue. */
      removeFromQueue(key);
      queue.push(key);

      return store[key];
    },
  });
}

const createCache = size => new Cache(size);

module.exports = createCache;

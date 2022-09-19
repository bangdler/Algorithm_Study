// Write a function called collectStrings which accepts an object and
// returns an array of all the values in the object that have a typeof string

function collectStrings(obj) {
  if (!Object.keys(obj).length) return;
  const strings = [];
  for (let key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      strings.push(value);
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      return strings.concat(collectStrings(value));
    }
  }
  return strings;
}

const obj = {
  stuff: 'foo',
  data: {
    val: {
      thing: {
        info: 'bar',
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: 'baz',
          },
        },
      },
    },
  },
};

const obj2 = {
  a: 'a',
  b: {
    c: 'c',
  },
};

console.log(collectStrings(obj)); // ["foo", "bar", "baz"])

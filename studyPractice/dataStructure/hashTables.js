// 시간복잡도
// 삽입, 삭제, 접근 모두 평균 O(1) -> hash function 이 중요하다. (고르게 분포, 빠른 계산)
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 50); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // separate chaining 방식
  set(key, value) {
    const index = this._hash(key);
    const pairs = this.keyMap[index];

    if (!pairs) {
      this.keyMap[index] = [[key, value]];
      return this.keyMap;
    }

    // 겹치는 key 확인 후 업데이트(optional)
    const foundPair = pairs.find(pair => pair[0] === key);
    if (foundPair) {
      foundPair[1] = value;
    } else {
      this.keyMap[index].push([key, value]);
    }
    return this.keyMap;
  }

  get(key) {
    const index = this._hash(key);
    const pairs = this.keyMap[index];

    if (!pairs) return undefined;

    const requiredPair = pairs.find(pair => pair[0] === key);
    if (!requiredPair) return undefined;

    return requiredPair[1];
  }

  remove(key) {
    const index = this._hash(key);
    const pairs = this.keyMap[index];
    if (!pairs) return undefined;

    let remove = false;
    const removedPairs = pairs.filter(pair => {
      if (pair[0] !== key) {
        return pair;
      } else {
        remove = true;
      }
    });
    if (remove) {
      this.keyMap[index] = removedPairs;
    }
    return remove;
  }

  keys() {
    const keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      const curPairs = this.keyMap[i];

      if (!curPairs) continue;

      curPairs.forEach(pair => {
        const curKey = pair[0];
        keysArr.push(curKey);
      });
    }
    return keysArr;
  }

  values() {
    const valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      const curPairs = this.keyMap[i];

      if (!curPairs) continue;

      curPairs.forEach(pair => {
        const curValue = pair[1];
        if (valuesArr.includes(curValue)) return;
        valuesArr.push(curValue);
      });
    }
    return valuesArr;
  }
}

const hash = new HashTable(17);
console.log(hash);
hash.set('maroon', '#80');
hash.set('yellow', '#ffff00');
hash.set('purple', '#333');
hash.set('green', '#1211');
hash.set('pink', '#555');
hash.set('violet', '#555');
console.log(hash.set('pink', '#55'));

console.log(hash.get('pink'));
console.log(hash.get('red'));
console.log(hash.keys());
console.log(hash.values());

console.log(hash.remove('pink'));
console.log(hash.remove('yellow'));
hash.set('pink', '#5555');
hash.set('yellow', '#ff00');
console.log(hash.keyMap);

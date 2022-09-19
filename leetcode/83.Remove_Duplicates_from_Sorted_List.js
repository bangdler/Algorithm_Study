/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function makeLinkedList(array) {
  let head = null;
  for (let i = 0; i < array.length; i++) {
    let node = new ListNode(array[i]);
    let current;
    if (head === null) {
      head = node;
      continue;
    }
    current = head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }
  return head;
}

let array = [1, 1, 2, 3, 3];
console.log(makeLinkedList(array));
let linka = makeLinkedList(array);

const deleteDuplicates = function (head) {
  let current = head;
  if (current === null) return null;
  while (current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
      continue;
    }
    current = current.next;
  }
  return head;
};

console.log(deleteDuplicates(linka));

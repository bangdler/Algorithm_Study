
// 연결리스트가 원형인지 확인, 마지막 노드가 가르키는 게 무엇인지.

//Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.
// Internally, pos is used to denote the index of the node that tail's next pointer is connected to.
// Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */


function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// pointer 를 만들어 마지막 노드가 pos 가 의미하는 i 번째 노드를 가르키도록 한다.
function makeCycleLinkedList (array, pos) {
    let head = null;
    let pointer = null;
    let current;
    for(let i = 0; i < array.length; i++) {
        let node = new ListNode(array[i]);
        if(pos === i) {
            pointer = node
        }
        if(head === null) {
            head = node;
            continue;
        }
        current = head;
        while(current.next !== null) {
            current = current.next
        }
        current.next = node;
    }
    if(pointer !== null) {
        current.next.next = pointer
    }
    return head;
}

let array = [1,2]

console.log(makeCycleLinkedList(array, -1))
let cycle_a = makeCycleLinkedList(array, -1)
// current 는 head부터 하나씩 pointer와 비교한다. current는 pointer 까지만 돌고 다 돌면 pointer 를 다음 노드로 설정한다.
// pointer.next 가 current 를 향한다면 cycle 이므로 true.
// n 번째 위치에 tail 이 n-1번째 노드와 순환한다면, 1부터 n 까지 n! * n 의 연산이 필요하다...
// 다른 분들 코드를 보니 두개의 포인터를 1개씩 증가, 2개씩 증가하다가 겹치는 경우 (공배수) 를 확인하는 방법도 있었다.
const hasCycle = function(head) {

    let pointer = head;
    if(head === null) return false;

    while(pointer.next !== null) {
        let current = head;
        while(current !== pointer) {
            if(pointer.next === current) return true;
            current = current.next
        }
        if(pointer.next === current) return true;
        pointer = pointer.next;
    }
    return false;
};

console.log(hasCycle(cycle_a))
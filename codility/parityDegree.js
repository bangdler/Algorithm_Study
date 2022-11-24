// find highest power of 2 that divides n.
// N 을 2의 제곱수로 나눌 때 나눌 수 있는 가장 큰 2의 제곱수의 제곱수 k 를 리턴

/*
An efficient solution is based on bit magic.
If we take a closer look, we can notice that, we basically need to find the number that has rightmost bit set at same position as n and all other bits as 0.
For example, for n = 5 (101), our output is 001. For n = 48 (110000), our output is 010000

Let n = 48 (00110000)
Subtract one from n, i.e., we do n-1. We get 47(00101111)
Do negation of (n-1), i.e., we do ~(n-1). We get (11010000).
Do n & (~(n-1)), we get 00010000 which has value 16.
*/

// 문제는 어렵지 않으나 bit 연산자로 쉽게 풀 수 있었다...
function solution(n) {
  return n & ~(n - 1);
}

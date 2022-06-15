// trie 사용해보기
// 참고 : https://velog.io/@diddnjs02/%EC%BD%94%EB%94%A9%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B0%80%EC%82%AC-%EA%B2%8C%EC%9E%84

// 글자길이마다 하나의 root tries 를 갖는다.
class TrieNode {
    constructor(value='', count = 0) {
        this.value = value
        this.children = {}
        this.count = count  // 현재 노드가 가진 자식 수 = value 로 시작하는 단어 수
        this.end = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }
    // root 에 삽입
    insert(word) {
        let current = this.root
        current.count++    // 총 단어의 수를 알기 위해 카운트
        for (let w of word) {
            if (!current.children[w]) {
                current.children[w] = new TrieNode(current.value + w, 0)
            }
            current = current.children[w]
            current.count++
        }
        current.end = true
    }

    // root 에서 특정 단어로 시작하는 개수 찾기 (물음표가 제거된 후 매개변수로 들어온다)
    search(query) {
        let current = this.root
        for (let q of query) {
            if (current.children[q]) {
                current = current.children[q]
            } else {
                return 0
            }
        }
        return current.count
    }
}

function solution(words, queries) {
    let answer = [];
    const trieRoot = {preTrie: {}, suTrie: {}}

    // trie 에 단어 추가 (정방향, 역방향)
    words.forEach((word) => {
        if(!trieRoot.preTrie[word.length]) {
            trieRoot.preTrie[word.length] = new Trie()
            trieRoot.suTrie[word.length] = new Trie()
        }
        trieRoot.preTrie[word.length].insert(word)
        trieRoot.suTrie[word.length].insert(word.split('').reverse().join(''))   // 접미사 단어 찾기 위해 거꾸로도 집어넣는다.
    })

    // trie 에서 query 찾기
    queries.forEach((query) => {
        const len = query.length
        const str = query.split('?').join('') // ? 글자 제거
        // 글자수가 다른 경우
        if(!trieRoot.preTrie[len]) {
            answer.push(0)
        }
        // 모두 물음표(????) 이거나 앞에서 시작하는 경우 (pre??)
        else if(str.length === 0 || query[0] !== '?') {
            const count = trieRoot.preTrie[len].search(str)
            answer.push(count)
        }
        // ???t 같이 뒤로 시작해야하는 경우
        else {
            const count = trieRoot.suTrie[len].search(str.split('').reverse().join(''))
            answer.push(count)
        }
    })
    return answer;
}

const words = ["frodo", "front", "arost", "frozen", "frame", "kakao"]
const queries = ["fro??", "????o", "fros?", "t????", "pro?", "?????"]

console.log(solution(words, queries))

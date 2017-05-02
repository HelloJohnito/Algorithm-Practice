function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
    let listLinkHead = new ListNode(0);
    let current = listLinkHead;
    let carry = 0;
    let x
    let y
    let sum

    while(l1 || l2){
        x = l1 ? l1.val : 0;
        y = l2 ? l2.val : 0;
        sum = x + y + carry

        current.next = new ListNode(sum%10)
        current = current.next

        carry = sum >= 10 ? 1 : 0;

        l1 = l1? l1.next : 0
        l2 = l2? l2.next : 0
    }

    if(carry > 0){
        current.next = new ListNode(carry);
    }

    return listLinkHead.next
}

/////////////////////////////////////////////////////
//Length of Longest Substrings 

function lengthOfLongestSubstring(s) {
  let len = s.length

  if(len <= 1) return len

  let lookup = {}
  let max = 0
  let start = 0

  for (let i = 0; i < len; i++) {
    let c = s[i]

    if (lookup.hasOwnProperty(c) && lookup[c] >= start) {
      start = lookup[c] + 1
    }

    lookup[c] = i

    max = Math.max(max, i - start + 1)
  }

  return max;
}

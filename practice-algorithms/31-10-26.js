function charReplacement(s, k) {
  const freq = new Map();
  let maxFreq = 0;
  let leftP = 0;
  const n = s.length;
  let maxL = 0;

  for (let rightP = 0; rightP < n; rightP++) {
    const currChar = s[rightP];
    const count = (freq.get(currChar) ?? 0) + 1;
    freq.set(currChar, count);
    maxFreq = Math.max(maxFreq, count);

    // this is how left pointer was increased based on some condition
    while (rightP - leftP + 1 - maxFreq > k) {
      freq.set(s[leftP], freq.get(s[leftP]) - 1);
      leftP++;
    }

    maxL = Math.max(maxL, rightP - leftP + 1);
  }

  return maxL;
}

console.log(charReplacement("XYYX", 1));
console.log(charReplacement("AAABABB", 1));

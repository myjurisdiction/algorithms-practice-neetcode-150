In binary search, we prefer:

```
let m = l + Math.floor((r - l) / 2);
```

instead of:

```
let m = Math.floor((l + r) / 2);
```

The main reason is to prevent integer overflow.

### 1. Understanding the difference

Suppose:

```
let l = 10;
let r = 20;
```

Both formulas produce the same result.

Approach 1:

```
m = Math.floor((10 + 20) / 2);
// 15
```

Approach 2:

```
m = 10 + Math.floor((20 - 10) / 2);
// 15
```

Mathematically, both are equivalent.

### 2. Why can the first approach be problematic?

Consider a language like Java or C++ with fixed-width integers.

Suppose:

```
l = 2,000,000,000
r = 2,100,000,000
```

Using the first approach:

```
l + r = 4,100,000,000
```

This exceeds the maximum value of a signed 32-bit integer:

```
2,147,483,647
```

The result can overflow and produce an incorrect midpoint.

But the second approach:

```
r - l = 100,000,000

100,000,000 / 2 = 50,000,000

m = 2,000,000,000 + 50,000,000
  = 2,050,000,000
```

Works correctly without overflowing.

### 3. Does this matter in JavaScript?

Not usually.

JavaScript's `Number` type uses 64-bit floating-point numbers, which can represent integers exactly up to:

```
Number.MAX_SAFE_INTEGER;
// 9007199254740991
```

For ordinary arrays, both approaches work perfectly fine.

However, near the maximum safe integer, `(l + r)` can lose integer precision, so the second formula is still preferable.

### 4. Interview takeaway

| Formula                       | Integer overflow risk             | Recommendation |
| ----------------------------- | --------------------------------- | -------------- |
| `Math.floor((l + r) / 2)`     | Yes, in fixed-width integer types | Avoid          |
| `l + Math.floor((r - l) / 2)` | Safer when `0 <= l <= r`          | Preferred      |

Bottom line: Both formulas calculate the same midpoint mathematically, but the second avoids unnecessarily adding two potentially large integers.

For DSA interviews, I recommend always using:

```
const mid = left + Math.floor((right - left) / 2);
```

It is a good habit that works across JavaScript, Java, C++, and other languages.

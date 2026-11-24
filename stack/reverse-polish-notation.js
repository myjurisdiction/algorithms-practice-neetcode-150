class Solution {
  /**
   * @param {string[]} tokens
   * @return {number}
   */
  evalRPN(tokens) {
    const stack = [];
    const operators = {
      "+": (left, right) => left + right,
      "-": (left, right) => left - right,
      "*": (left, right) => left * right,
      "/": (left, right) => Math.trunc(left / right),
    };

    for (let token of tokens) {
      if (stack.length > 1 && token in operators) {
        const rightOperand = stack[stack.length - 1];
        const leftOperand = stack[stack.length - 2];
        stack.pop();
        stack.pop();
        const result = operators[token](
          Number(leftOperand),
          Number(rightOperand),
        );

        // console.log({
        //   leftOperand,
        //   rightOperand,
        //   result,
        //   token,
        // });
        stack.push(result);
      } else {
        stack.push(token);
      }
    }

    return stack[0];
  }
}

const s = new Solution();

console.log(s.evalRPN(["1", "2", "+", "3", "*", "4", "-"]));

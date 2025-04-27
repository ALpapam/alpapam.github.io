// 获取结果显示输入框元素
const resultInput = document.getElementById('result');

// 用于检查是否已经有小数点存在，防止重复输入多个小数点
function hasDecimal(numStr) {
  return numStr.split('.').length > 1;
}

// 将字符添加到结果输入框中
function appendToResult(value) {
  const currentValue = resultInput.value;
  if (value === '.' && hasDecimal(currentValue)) {
    return; // 如果已经有小数点，不添加
  }
  resultInput.value += value;
}

// 清空结果输入框
function clearResult() {
  resultInput.value = '';
}

// 根据操作符进行相应的计算
function calculate() {
  const expression = resultInput.value;
  const tokens = expression.split(/([+\-*/])/).filter(token => token.trim()!== '');
  let result;
  try {
    if (tokens.length === 1) {
      result = parseFloat(tokens[0]);
    } else {
      result = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);
        switch (operator) {
          case '+':
            result += operand;
            break;
          case '-':
            result -= operand;
            break;
          case '*':
            result *= operand;
            break;
          case '/':
            if (operand === 0) {
              throw new Error('除数不能为0');
            }
            result /= operand;
            break;
        }
      }
    }
    resultInput.value = result.toString();
  } catch (error) {
    resultInput.value = `错误: ${error.message}`;
  }
}
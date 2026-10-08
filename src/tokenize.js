const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  let cursor = 0
  let tokens = []

  while (cursor < input.length) {
    var curr = input[cursor]
    if (isParenthesis(input[cursor])) {
      tokens.push({type: 'Parenthesis', value: curr})
    }
    if (isWhitespace(cursor)) {
      continue;
    }
    if (isNumber(curr)) {
      let start = cursor;
      let end = cursor
      while (isNumber(input[end])) {
        end = ++cursor;
      }
      tokens.push({ type: 'Number', value: +input.slice(start, end) })
      continue;
    }
    
    if (isLetter(curr)) {
      let start = cursor;
      let end = cursor
      while (isLetter(input[end])) {
        end = ++cursor;
      }
      tokens.push({ type: 'Name', value: input.slice(start, end) })
      continue;
    }

    if (isQuote(curr)) {
      let start = ++cursor;
      while (!isQuote(input[cursor++])) { }
      tokens.push({ type: 'String', value: input.slice(start, cursor - 1) })
      continue;
    }

    cursor++
  }

  return tokens;
};

module.exports = { tokenize };

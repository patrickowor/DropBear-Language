const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const evaluate = (node) => {
  if (node.type === "NumericLiteral") return node.value;
  if (node.type === "StringValue") return node.value;
  if (node.type === "Identifier") return environment[node.name]
  if (node.type === "CallExpression") {
    return environment[node.name](...node.arguments.map(evaluate))
  }

};

module.exports = { evaluate };

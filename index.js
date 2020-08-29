const getObject = require('./src/dynamodb/get-object');
exports.handler = async function handler() {
  console.log("Insde lamdba function");
  const object = await getObject("id");
  console.log("object", object);
  return {
    status: 200,
    text: "Hello, Thanks for invoking me!"
  }
}

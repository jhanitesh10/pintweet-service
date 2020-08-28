exports.handler = async function handler() {
  console.log("Insde lamdba function");
  return {
    status: 200,
    text: "Hello, Thanks for invoking me!"
  }
}

exports.handler = async function handler() {
  console.log("Inside function");
  return {
    status: 200,
    text: "Hello, Thanks for invoking me!"
  }
}

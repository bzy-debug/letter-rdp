export default test => {
  test(`42`, {
    type: "Program",
    body: {
      type: "NumericLiteral",
      value: 42,
    }
  });

  test(`"hello"`, {
    type: "Program",
    body: {
      type: "StringLiteral",
      value: "hello",
    }
  });

  test(`'hello'`, {
    type: "Program",
    body: {
      type: "StringLiteral",
      value: "hello",
    }
  });
}

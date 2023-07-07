export default (test) => {
  test('21 + 21;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'AdditiveExpression',
          value: '+',
          left: {
            type: 'NumericLiteral',
            value: 21
          },
          right: {
            type: 'NumericLiteral',
            value: 21
          }
        }
      }
    ]
  })
  test('21 + 21 * 42;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'AdditiveExpression',
          value: '+',
          left: {
            type: 'NumericLiteral',
            value: 21
          },
          right: {
            type: 'MultiplicativeExpression',
            value: '*',
            left: {
              type: 'NumericLiteral',
              value: 21
            },
            right: {
              type: 'NumericLiteral',
              value: 42
            }
          }
        }
      }
    ]
  })
  test('(21 + 21) * 42;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'MultiplicativeExpression',
          value: '*',
          left: {
            type: 'AdditiveExpression',
            value: '+',
            left: {
              type: 'NumericLiteral',
              value: 21
            },
            right: {
              type: 'NumericLiteral',
              value: 21
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 42
          }
        }
      }
    ]
  })
}

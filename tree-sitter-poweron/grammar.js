module.exports = grammar({
  name: 'poweron',

  extras: $ => [
    /\s/,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.assignment,
      $.function_call,
      $.expression,
    ),

    assignment: $ => seq(
      field('name', $.identifier),
      '=',
      field('value', $.expression),
    ),

    function_call: $ => seq(
      field('name', $.identifier),
      '(',
      optional(commaSep1($.expression)),
      ')',
    ),

    expression: $ => choice(
      $.keyword,
      $.type,
      $.constant,
      $.identifier,
      $.string,
      $.number,
      $.operator,
      $.punctuation,
    ),

    comment: $ => token(choice(
      seq(';', /.*/),
      seq('//', /.*/),
    )),

    keyword: $ => token(choice(
      'IF', 'ELSE', 'END', 'THEN', 'DO', 'WHILE', 'FOR', 'RETURN',
      'CALL', 'GOSUB', 'PROGRAM', 'PROC', 'SUBROUTINE',
    )),

    type: $ => token(choice(
      'CHAR', 'DATE', 'DECIMAL', 'INTEGER', 'MONEY', 'NUMBER', 'TEXT',
    )),

    constant: $ => token(choice('TRUE', 'FALSE', 'NULL')),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,
    string: _ => /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    number: _ => /-?[0-9]+(\.[0-9]+)?/,
    operator: _ => token(choice('==', '!=', '<=', '>=', '+', '-', '*', '/', '=', '<', '>')),
    punctuation: _ => token(choice(':', ',', '.', '(', ')', '[', ']', '{', '}')),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
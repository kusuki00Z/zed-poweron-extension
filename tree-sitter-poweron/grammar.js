module.exports = grammar({
  name: 'poweron',

  extras: $ => [
    /\s/,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.block_comment,
      $.include,
      $.section,
      $.procedure_definition,
      $.control_statement,
      $.call_statement,
      $.assignment,
      $.expression,
    ),

    block_comment: _ => /\[[^\]]*\]/,

    include: $ => seq(
      '#INCLUDE',
      field('path', $.string),
    ),

    section: $ => choice(
      'SUBROUTINE',
      'DEFINE',
      'SETUP',
      'SELECT',
      'PRINT',
      'TOTAL',
    ),

    procedure_definition: $ => seq(
      'PROCEDURE',
      field('name', $.identifier),
    ),

    control_statement: $ => choice(
      seq('IF', field('condition', $.expression)),
      seq('ELSE', optional('IF'), optional(field('condition', $.expression))),
      seq('WHILE', field('condition', $.expression)),
      seq('FOR', repeat1($.expression)),
      'THEN',
      'DO',
      'END',
      'RETURN',
      'TERMINATE',
    ),

    call_statement: $ => seq(
      'CALL',
      field('name', $.identifier),
    ),

    assignment: $ => seq(
      field('left', $.expression),
      '=',
      field('right', $.expression),
    ),

    function_call: $ => prec(1, seq(
      field('name', $.identifier),
      '(',
      optional(commaSep1($.expression)),
      ')',
    )),

    expression: $ => choice(
      $.keyword,
      $.type,
      $.constant,
      $.field_access,
      $.function_call,
      $.array_access,
      $.identifier,
      $.string,
      $.number,
      $.operator,
      $.punctuation,
    ),

    field_access: $ => seq(
      field('record', $.identifier),
      ':',
      field('field', $.identifier),
    ),

    array_access: $ => seq(
      field('name', $.identifier),
      '(',
      $.expression,
      ')',
    ),

    keyword: $ => token(choice(
      'IF', 'ELSE', 'END', 'THEN', 'DO', 'WHILE', 'FOR', 'RETURN',
      'CALL', 'GOSUB', 'PROGRAM', 'PROC', 'SUBROUTINE', 'PROCEDURE',
      'DEFINE', 'SETUP', 'SELECT', 'PRINT', 'TOTAL', 'TARGET', 'NONE',
      'TERMINATE',
    )),

    type: $ => token(choice(
      'CHARACTER', 'CHAR', 'DATE', 'DECIMAL', 'INTEGER', 'MONEY', 'NUMBER',
      'TEXT', 'ARRAY',
    )),

    constant: $ => token(choice('TRUE', 'FALSE', 'NULL')),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,
    string: _ => /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
    number: _ => /-?[0-9]+(\.[0-9]+)?/,
    operator: _ => token(choice('==', '<>', '!=', '<=', '>=', '+', '-', '*', '/', '=', '<', '>')),
    punctuation: _ => token(choice(':', ',', '.', '(', ')', '[', ']', '{', '}')),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
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
      $.placeholder_assignment,
      $.assignment,
      $.expression,
    ),

    block_comment: _ => token(prec(1, /\[[^\]]*\]/)),

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
      'ELSE',
      seq('WHILE', field('condition', $.expression)),
      $.for_statement,
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

    for_statement: $ => choice(
      seq('FOR', $.identifier, '=', $.expression, 'TO', $.expression),
      seq('FOR', $.identifier, $.identifier),
    ),

    assignment: $ => seq(
      field('left', $.lvalue),
      '=',
      field('right', $.expression),
    ),

    placeholder_assignment: $ => seq(
      field('left', $.lvalue),
      '=',
      $.block_comment,
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
      $.environment_parameter,
      $.field_access,
      $.function_call,
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

    environment_parameter: $ => seq('@', $.identifier),

    lvalue: $ => choice(
      $.identifier,
      $.field_access,
      $.function_call,
    ),

    keyword: $ => token(choice(
      'TARGET', 'NONE', 'GOSUB', 'PROGRAM', 'PROC',
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

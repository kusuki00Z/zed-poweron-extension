(block_comment) @comment
(include) @keyword
(include path: (string) @string)

(string) @string
(number) @number

(keyword) @keyword
("SUBROUTINE" @keyword)
("DEFINE" @keyword)
("SETUP" @keyword)
("SELECT" @keyword)
("PRINT" @keyword)
("TOTAL" @keyword)
("PROCEDURE" @keyword)
("IF" @keyword)
("ELSE" @keyword)
("WHILE" @keyword)
("FOR" @keyword)
("THEN" @keyword)
("DO" @keyword)
("END" @keyword)
("RETURN" @keyword)
("TERMINATE" @keyword)
("CALL" @keyword)
(type) @type
(constant) @constant
(environment_parameter) @variable.special
(function_call name: (identifier) @function)
(call_statement name: (identifier) @function)
(procedure_definition name: (identifier) @function)
(field_access record: (identifier) @type field: (identifier) @property)

(operator) @operator
(punctuation) @punctuation.delimiter
(identifier) @variable

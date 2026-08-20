(block_comment) @comment
(include) @keyword
(include path: (string) @string)

(string) @string
(number) @number

(keyword) @keyword
(type) @type
(constant) @constant
(environment_parameter) @variable.special
(function_call name: (identifier) @function)
(call_statement name: (identifier) @function)
(procedure_definition name: (identifier) @function)
(field_access record: (identifier) @type field: (identifier) @property)
(array_access name: (identifier) @variable)

(operator) @operator
(punctuation) @punctuation.delimiter
(identifier) @variable

function validateField(field, value, rules = []) {
  console.log('VALIDATING', field, value, rules);
  // We only validate if we have rules
  if (!rules.length) return null;
  for (let rule of rules) {
    console.log('Checking rule', rule);
    if (rule === 'required') {
      if (value.length === 0) {
        return `${field} can not be empty`;
      }
    }
  }

  const fieldRules = rules[name];
}

function validateForm(fields, rules) {
  const errors = [];
  for (let field of Object.keys(fields)) {
    console.log('FIELD', field);
    console.log('RULES', rules[field]);
    const invalid = validateField(field, fields[field], rules[field]);
    if (invalid) errors.push(invalid);
  }
  console.log(errors);
  return errors;
}

export { validateForm };

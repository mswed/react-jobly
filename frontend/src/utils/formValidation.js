function validateField(field, value, rules = []) {
  // We only validate if we have rules
  if (!rules.length) return null;
  for (let rule of rules) {
    if (rule === 'required') {
      if (value.length === 0) {
        return `${field} can not be empty`;
      }
    }

    // Check email format
    if (rule === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return 'Invalid email address';
      }
    }
  }
  return null;
}

function validateForm(fields, rules) {
  const errors = [];
  for (let field of Object.keys(fields)) {
    const invalid = validateField(field, fields[field], rules[field]);
    if (invalid) errors.push(invalid);
  }
  return errors;
}

export { validateForm };

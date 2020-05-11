export const updateObject = (oldObject, newProperties) => {
  return {
    ...oldObject,
    ...newProperties,
  };
};

export const checkValidity = (value, rules) => {
  if (rules.required) {
    if (value.trim() === "") {
      return false;
    }
  }

  if (rules.minLength) {
    if (value.length < rules.minLength) {
      return false;
    }
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=`{|}~-]+(?:\.[a-z0-9])/;
    if (!pattern.test(value)) {
      return false;
    }
  }

  if (rules.isNumeric) {
    const pattern = /^\d$/;
    if (!pattern.test(value)) {
      return false;
    }
  }

  if (rules.maxLength) {
    if (value.length > rules.maxLength) {
      return false;
    }
  }
  return true;
};

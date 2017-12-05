import _ from 'lodash';

export const validate = (form = {}, constrains = {}) => {
  let errors = {};
  _.forIn(form, function(value, key) {
    const constrain = constrains[key];
    if (_.isFunction(constrain)) {
      const error = constrain(value, form);
      if (error) {
        errors[key] = error;
      }
    }
  });
  return _.isEmpty(errors) ? null : errors;
};

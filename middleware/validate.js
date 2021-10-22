const express = require('express');
const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose')

// validations的type是一个Validation Chain数组
exports = module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// 函数也是一个对象，函数对象上可以添加属性
exports.isValidObjectId = (locations, fields) => {
  return buildCheckFunction(locations)(fields).custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject('ID 不是一个有效的 ObjectID')
    }
  })
}


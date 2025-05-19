/**
 * Input validators for request data
 */

const { check, validationResult } = require("express-validator");

/**
 * Validation middleware factory
 * @param {Array} validations - Array of validation checks
 * @returns {Function} - Express middleware function
 */
exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  };
};

/**
 * User registration validation rules
 */
exports.registerValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("passwordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];

/**
 * User login validation rules
 */
exports.loginValidation = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password").trim().notEmpty().withMessage("Password is required"),
];

/**
 * Product creation validation rules
 */
exports.productValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => {
      if (parseFloat(value) <= 0) {
        throw new Error("Price must be greater than 0");
      }
      return true;
    }),

  check("description")
    .trim()
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  check("category")
    .trim()
    .optional()
    .isLength({ min: 2 })
    .withMessage("Category must be at least 2 characters"),
];

/**
 * ID parameter validation
 */
exports.idParamValidation = [
  check("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID format"),
];

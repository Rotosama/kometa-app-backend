const { body } = require("express-validator");

const userValidator = [
  body(["firstName", "lastName"])
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name and Last Name must have almost 3 letters")
    .isString()
    .withMessage("Name or Last Name must be a string"),
  body("birthdate")
    .exists()
    .trim()
    .isDate()
    .withMessage("DOB should be valid date"),
  body("nationalID")
    .exists()
    .trim()
    /* .isIdentityCard("ES") */
    .withMessage("You must write a valid national ID"),
  body("phone").optional().trim().isLength({ min: 9, max: 12 }),
  body("email")
    .exists()
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide a valid email"),
  body("password").exists().trim(),
  /* .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"), */
];

const orderValidator = [
  body("orderDate")
    .exists()
    .trim()
    .isDate()
    .withMessage("You should select a valid date"),
  body("orderStatus").exists().trim(),
  body("orderCharge").exists().trim(),
  body([
    "originLatitude",
    "originLongitude",
    "destinationLatitude",
    "destinationLongitude",
  ])
    .exists()
    .trim(),
  body("description")
    .exists()
    .isAlphanumeric("es-ES")
    .withMessage("you must describe your load"),
];

module.exports = {
  userValidator,
  orderValidator,
};

module.exports = {
  friendlyName: "Register",

  description: "Register user.",

  inputs: {
    fullName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "New user created",
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: "Email address already in use",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    // All done.
    try {
      const newEmailAddress = inputs.email.toLowerCase();
      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
      });
      return exits.success({
        message: `${newUser}}account created successfully`,
      });
    } catch (error) {
      if (error.code === "E_UNIQUE") {
        return exits.emailAlreadyInUse({
          message: "Oops :) an error occurred",
          error: "This email already exits",
        });
      }
      return exits.error({
        message: "Oops :) an error occurred",
        error: error.message,
      });
    }
  },
};

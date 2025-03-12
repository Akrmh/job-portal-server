const bcrypt = require('bcrypt');
const User = require('../../database/models/user');

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;

    // validate fields
    if (!firstName) {
      return res.status(400).json({
        ok: false,
        message: 'Firstname is required'
      });
    }

    // validate fields
    if (!lastName) {
      return res.status(400).json({
        ok: false,
        message: 'Lastname is required'
      });
    }

    // validate fields
    if (!email) {
      return res.status(400).json({
        ok: false,
        message: 'Email is required'
      });
    }

    // validate fields
    if (!password) {
      return res.status(400).json({
        ok: false,
        message: 'Password is required'
      });
    }

    // hashing the password
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_NUMBER));

    // check if there is a user with the same email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        message: `User with ${email} already exists`
      });
    }

    // create a user
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // return res
    return res.status(201).json({
      ok: true,
      message: `User (${firstName}) is created successfully`
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`
    });
  }
};

module.exports = createUser;
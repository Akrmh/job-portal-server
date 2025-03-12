const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

const login = async (req, res) => {
  try {
    // grab the email and password from the body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Email or Password are required'
      });
    }

    // Check if there is a user with that email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Invalid credentials'
      });
    }

    // compare password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        ok: false,
        message: 'Invalid credentials'
      });
    }

    // create auser login token (using JWT)
    const payload = {
      id: user._id,
      firstName: user.firstName,
      email: user.email
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2d' });

    return res.status(200).json({
      ok: true,
      token
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`
    });
  }


};

module.exports = login;
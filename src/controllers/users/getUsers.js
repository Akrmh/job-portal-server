const User = require('../../database/models/user');

const getUsers = async (req, res) => {
  try {
    // get users from my db
    const users = await User.find();
    return res.status(200).json({
      ok: true,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`
    });
  }
};

module.exports = getUsers;
const User = require('../../database/models/user');

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate that email is provided
    if (!email) {
      return res.status(400).json({
        ok: false,
        message: 'Email is required to delete a user',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: `No user found with email: ${email}`,
      });
    }

    // Delete the user
    await User.deleteOne({ email });

    // Return success response
    return res.status(200).json({
      ok: true,
      message: `User with email (${email}) has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`,
    });
  }
};

module.exports = deleteUser;

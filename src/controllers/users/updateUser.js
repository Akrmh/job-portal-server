const User = require('../../database/models/user');

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from params
    const updates = req.body; // Get update data

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Update data is required'
      });
    }

    // Check if user exists before updating
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: `User with ID ${userId} not found`
      });
    }

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    // Check if update was successful
    if (!updatedUser) {
      return res.status(500).json({
        ok: false,
        message: 'User update failed'
      });
    }

    return res.status(200).json({
      ok: true,
      message: `User updated successfully`,
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: `Server error, ${error.message}`
    });
  }
};

module.exports = updateUser;

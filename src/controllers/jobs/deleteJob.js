const Job = require('../../database/models/job');

const deleteJob = async (req, res) => {
  const { id } = req.params;

  // Ensure that the job ID is provided
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: 'Job ID is required',
    });
  }

  try {
    // Try to find and delete the job by its ID
    const deletedJob = await Job.findByIdAndDelete(id);

    // If no job is found, return a 404 error
    if (!deletedJob) {
      return res.status(404).json({
        ok: false,
        message: 'Job not found',
      });
    }

    // If the job is deleted successfully
    res.status(200).json({
      ok: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      ok: false,
      message: 'Error deleting job',
      data: error.message,
    });
  }
};

module.exports = deleteJob;

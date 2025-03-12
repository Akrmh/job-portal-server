const Job = require('../../database/models/job');

const getJob = async (req, res) => {
  const { id } = req.params;

  // Ensure that the job ID is provided
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: 'Job ID is required',
    });
  }

  try {
    // Try to find the job by its ID
    const job = await Job.findById(id);

    // If no job is found, return a 404 error
    if (!job) {
      return res.status(404).json({
        ok: false,
        message: 'Job not found',
      });
    }

    // If the job is found, return it
    res.status(200).json({
      ok: true,
      data: job,
    });
  } catch (error) {
    // Catch any errors and return a 400 status code with a message
    res.status(400).json({
      ok: false,
      message: 'Invalid Job ID',
    });
  }
};

module.exports = getJob;

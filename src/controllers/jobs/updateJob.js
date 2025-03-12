const Job = require('../../database/models/job');

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: 'Job ID is required',
    });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        ok: false,
        message: 'Job not found',
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: 'Error updating job',
      data: error.message,
    });
  }
};

module.exports = updateJob;

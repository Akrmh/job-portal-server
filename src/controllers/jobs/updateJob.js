const Job = require('../../database/models/job');

const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    skills,
    companyLogo,
    employmentType,
    description,
    postedBy,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: 'Job ID is required',
    });
  }

  // Validate minPrice and maxPrice
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({
      ok: false,
      message: 'Price values should be numbers.',
    });
  }

  // Validate postingDate
  if (isNaN(new Date(postingDate))) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid posting date.',
    });
  }

  try {
    // Find the job by ID and update it
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        skills,
        companyLogo,
        employmentType,
        description,
        postedBy,
        updatedAt: Date.now(), // Ensure we have a timestamp for when the job was updated
      },
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
    console.error('Error updating job:', error); // Enhanced error logging
    res.status(500).json({
      ok: false,
      message: 'Error updating job',
      data: error.message,
    });
  }
};

module.exports = updateJob;

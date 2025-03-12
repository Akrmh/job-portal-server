const Job = require('../../database/models/job');

const getJobs = async (req, res) => {
  try {
    const filters = {};

    // Optional filtering by title, company name, or location
    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.companyName) {
      filters.companyName = { $regex: req.query.companyName, $options: 'i' };
    }
    if (req.query.jobLocation) {
      filters.jobLocation = { $regex: req.query.jobLocation, $options: 'i' };
    }

    const jobs = await Job.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      ok: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

module.exports = getJobs;

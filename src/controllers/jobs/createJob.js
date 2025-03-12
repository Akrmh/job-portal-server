const Job = require('../../database/models/job');

const createJob = async (req, res) => {
  console.log("Received data:", req.body); // Debugging: Check received data

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

  // Validate minPrice and maxPrice
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({
      ok: false,
      message: "Price values should be numbers.",
    });
  }

  // Validate postingDate
  if (isNaN(new Date(postingDate))) {
    return res.status(400).json({
      ok: false,
      message: "Invalid posting date.",
    });
  }

  try {
    const job = new Job({
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
    });

    const savedJob = await job.save();

    res.status(201).json({
      ok: true,
      message: 'Job created successfully',
      data: savedJob,
    });
  } catch (error) {
    console.error("Error creating job:", error); // Enhanced error logging
    res.status(500).json({
      ok: false,
      message: 'Error creating job',
    });
  }
};

module.exports = createJob;

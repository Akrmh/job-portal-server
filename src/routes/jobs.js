// importing express
const express = require('express');

// import controllers
const getJobsController = require('../controllers/jobs/getJobs');
const getJobController = require('../controllers/jobs/getJob');
const createJobController = require('../controllers/jobs/createJob');
const updateJobController = require('../controllers/jobs/updateJob');
const deleteJobController = require('../controllers/jobs/deleteJob');

// create a router instance
const router = express.Router();

// Get jobs route 
router.get('/jobs', getJobsController);

// Get job route
router.get('/jobs/:id', getJobController);

// Create job route
router.post('/jobs', createJobController);

// Update job route
router.put('/jobs/:id', updateJobController);

// Delete job route
router.delete('/jobs/:id', deleteJobController);

module.exports = router;
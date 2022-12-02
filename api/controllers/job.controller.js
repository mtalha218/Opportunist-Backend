const Mongoose = require("mongoose");

const { Company } = require("../data/company.model");
const { Job, validateJob } = require("../data/job.model");
const { User } = require("../data/user.model");

module.exports.postJob = async (req, res) => {
  console.log("Inside Post Job api");

  const {
    body: { title, description, salary, location, jobType },
    user: { _id },
  } = req;
  try {
    const { error: jobValidationError } = validateJob({
      title,
      description,
      salary,
      jobType,
      location,
    });
    console.log("ss", jobValidationError);
    if (jobValidationError)
      return res
        .status(406)
        .send({ error: true, message: error.details[0].message });

    const company = await Company.findOne({ hiringManager: _id });

    const job = new Job({
      companyId: company._id,
      title,
      location,
      description,
      salary,
      jobType,
    });

    company.jobs.push(job._id);
    company.save();
    job.save();

    res.send({ job, error: false, message: "Job Posted successfully" });
  } catch (err) {
    console.log("Job post api failed: ", err.message);
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.getMyPostedJobs = async (req, res) => {
  console.log("Inside get all my posted jobs for my company API");
  const {
    user: { _id },
  } = req;
  try {
    const company = await Company.findOne({ hiringManager: _id }).populate({
      path: "jobs",
      isDeleted: { $eq: false },
      populate: { path: "appliedUsers" },
    });

    if (!company)
      return res.status(404).send({ error: true, message: "No Company Found" });

    res.send({ company, message: "My Posted jobs Fetched successfully" });
  } catch (err) {
    console.log("get all my company jobs api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.getJobById = async (req, res) => {
  console.log("Inside Get job API");
  const {
    params: { id },
  } = req;
  try {
    const job = await Job.findOne({ _id: id, isDeleted: false }).populate({
      path: "appliedUsers",
    });
    res.send({ job, message: "Job Fetched successfully" });
  } catch (err) {
    console.log("get job api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.getAllJobs = async (req, res) => {
  console.log("Inside get all jobs API");
  const {
    body: { title, location },
    user: { _id },
  } = req;
  try {
    const jobs = await Job.find({
      $and: [
        {
          isDeleted: { $eq: false },
        },
        {
          title: { $regex: title, $options: "i" },
        },
        {
          location: { $regex: location, $options: "i" },
        },
      ],
    }).populate({
      path: "companyId",
    });

    const updatedJobs = jobs.map((job) => {
      job = job.toJSON();
      job.hasApplied = false;
      for (let seekerId of job.appliedUsers) {
        if (seekerId.equals(_id)) {
          job.hasApplied = true;
        }
      }
      return job;
    });

    res.send({
      jobs: updatedJobs,
      message: "All jobs Fetched successfully",
    });
  } catch (err) {
    console.log("get job api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.updateJobById = async (req, res) => {
  console.log("Inisde update job details api");
  const {
    params: { id: jobId },
    body,
  } = req;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      { _id: jobId },
      { $set: { ...body } },
      { new: true, upsert: true }
    );
    res.send({ job: updatedJob, message: "Job updated successfully" });
  } catch (err) {
    console.log("update job details api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.deleteJobById = async (req, res) => {
  console.log("Inisde delete job details api");
  const {
    params: { id },
  } = req;

  try {
    const job = await Job.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, upsert: true }
    );
    res.send({ job, message: "Job deleted successfully" });
  } catch (err) {
    console.log("delete job api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.applyToJob = async (req, res) => {
  console.log("Inside apply to job api");
  const {
    body,
    file,
    user: { _id },
  } = req;
  try {
    let resume = body?.resume;
    let _jobId = body._jobId;
    if (file) {
      const url = req.protocol + "://" + req.get("host");
      resume =
        url + req.file.path.replace(/\\/g, "/").substring("public".length);
      await User.findByIdAndUpdate(
        { _id },
        {
          resume,
        }
      );
    }
    const user = await User.findById({ _id });

    const job = await Job.findById({ _id: _jobId });
    job.appliedUsers.push(_id);
    job.save();

    user.appliedJobs.push(job._id);
    user.save();

    res.send({
      success: true,
      error: false,
      message: "Sucesssfully applied to job",
    });
  } catch (err) {
    console.log("job apply api failed: ", err);
    res.send({ success: false, error: true, message: err.message });
  }
};

module.exports.viewAppliedJobs = async (req, res) => {
  console.log("inside view jobs you have applied to api");
  try {
    const {
      user: { _id },
    } = req;

    const jobs = await Job.find({ isDeleted: false });

    const updatedJobs = jobs.filter((job) => {
      job = job.toJSON();
      job.hasApplied = false;
      for (let seekerId of job.appliedUsers) {
        if (seekerId.equals(_id)) {
          job.hasApplied = true;
        }
      }
      if (job.hasApplied) return job;
    });

    res.send({
      error: false,
      message: "Applied Jobs fetched successfully",
      appliedJobs: updatedJobs,
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.searchJobs = async (req, res) => {
  console.log("Inside search jobs api");
  const {
    body: { title, location },
  } = req;
  try {
    const jobs = await Job.find({
      $and: [
        {
          isDeleted: { $eq: false },
        },
        {
          title: { $regex: title, $options: "i" },
        },
        {
          location: { $regex: location, $options: "i" },
        },
      ],
    }).populate({
      path: "companyId",
    });

    res.send({ jobs, error: false, message: "Jobs fetched successfully" });
  } catch (err) {
    console.elog("search jobs api failed", err);
    res.send({
      error: true,
      message: err.message,
    });
  }
};

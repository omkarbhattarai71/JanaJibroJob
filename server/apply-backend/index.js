// index.js (updated)
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'containers-us-west-25.railway.app',
  user: 'root',
  password: 'abc123secure',
  database: 'railway',
  port: 5472,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to Railway MySQL DB!");
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// 👇 Root route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// 👇 Route to fetch all jobs
app.get("/jobs", (req, res) => {
  const sql = `
    SELECT ID, post_title, post_content
    FROM wp_posts 
    WHERE post_type = 'job' AND post_status = 'publish'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }

    const jobs = results.map((job) => ({
      id: job.ID,
      title: job.post_title,
      description: job.post_content,
    }));

    res.json(jobs);
  });
});

// 👇 Route to fetch a single job by ID
app.get("/jobs/:id", (req, res) => {
  const jobId = req.params.id;

  const sql = `
    SELECT ID, post_title, post_content
    FROM wp_posts 
    WHERE post_type = 'job' AND post_status = 'publish' AND ID = ?
  `;

  db.query(sql, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching job:", err);
      return res.status(500).json({ error: "Failed to fetch job" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const job = results[0];
    res.json({
      id: job.ID,
      title: job.post_title,
      description: job.post_content,
    });
  });
});

// 👇 Job Application Route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post("/apply", upload.single("cv"), (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dob,
    address,
    email,
    contact,
    facebook,
    jobId,
    jobTitle
  } = req.body;
  const cv = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO applications 
    (first_name, middle_name, last_name, dob, address, email, contact, facebook, cv, job_id, job_title)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [firstName, middleName, lastName, dob, address, email, contact, facebook, cv, jobId, jobTitle],
    (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).send("Error saving application");
      }
      res.status(200).send("Application submitted successfully!");
    }
  );
});


// 👇 Register Job Seeker
app.post("/register-jobseeker", (req, res) => {
  const { name, email, mobile, password } = req.body;

  const sql = `
    INSERT INTO job_seekers (name, email, mobile, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, mobile, password], (err, result) => {
    if (err) {
      console.error("Job Seeker Register Error:", err);
      return res.status(500).send("Registration failed");
    }
    res.send("Job Seeker registered!");
  });
});

// 👇 Register Employer
app.post("/register-employer", (req, res) => {
  const { companyName, email, mobile, password } = req.body;

  const sql = `
    INSERT INTO employers (companyName, email, mobile, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [companyName, email, mobile, password], (err, result) => {
    if (err) {
      console.error("Employer Register Error:", err);
      return res.status(500).send("Registration failed");
    }
    res.send("Employer registered!");
  });
});

// 👇 Login Job Seeker
app.post("/login-jobseeker", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM job_seekers WHERE (email = ? OR mobile = ?) AND password = ?`;
  db.query(sql, [email, email, password], (err, results) => {
    if (err) return res.status(500).send("Login failed");
    if (results.length === 0) return res.status(401).send("Invalid credentials");
    res.json({
      message: "Job Seeker Login successful",
      id: results[0].id,
    });
    // res.send("Job Seeker login successful");
  });
});

// 👇 Login Employer
app.post("/login-employer", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM employers WHERE (email = ? OR mobile = ?) AND password = ?`;
  db.query(sql, [email, email, password], (err, results) => {
    if (err) return res.status(500).send("Login failed");
    if (results.length === 0) return res.status(401).send("Invalid credentials");
    // res.send("Employer login successful");
    res.json({
      message: "Employer login successful",
      id: results[0].id, // assuming `result[0]` is the employer info
    });
  });
});

// Backend Jobseeker recent jobs
app.get('/jobseeker/recent-applications/:id', (req, res) => {
  const seekerId = req.params.id;
  const sql = `SELECT * FROM applications WHERE job_seeker_id = ? ORDER BY applied_at DESC LIMIT 5`;
  db.query(sql, [seekerId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    res.json(results);
  });
});

// app.get('/employer/recent-jobs/:id', async (req, res) => {
//   const employerId = req.params.id;
//   try {
//     const jobs = await db.query("SELECT * FROM jobs WHERE employer_id = ?", [employerId]);
//     res.json(jobs);
//   } catch (err) {
//     console.error("Error fetching recent jobs:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// Backend Employer recent jobs
app.get('/employer/recent-jobs/:id', (req, res) => {
  const employerId = req.params.id;
  const sql = `SELECT * FROM jobs WHERE employer_id = ? ORDER BY posted_at DESC LIMIT 5`;
  db.query(sql, [employerId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    res.json(results);
  });
});

// Jobseeker Profile
app.get('/jobseeker/profile/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM job_seekers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("Error fetching profile");
    res.json(result[0]);
  });
});

// Empolyer Profile
app.get('/employer/profile/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM employers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send("Error fetching profile");
    res.json(result[0]);
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




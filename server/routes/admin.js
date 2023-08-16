const express = require("express");
const { Admin, Course } = require("../db");
const {
  ADMINSECRET,
  generateJWT,
  authenticateJWTAdmin,
} = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generateJWT({ username, role: "admin" }, ADMINSECRET);
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generateJWT({ username, role: "admin" }, ADMINSECRET);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(401).json({ message: "Admin login failed" });
  }
});

router.post("/courses", authenticateJWTAdmin, async (req, res) => {
  // logic to create a course
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({ message: "Course created successfully", courseId: newCourse.id });
});

router.put("/courses/:courseId", authenticateJWTAdmin, async (req, res) => {
  // logic to edit a course
  try {
    await Course.findByIdAndUpdate(req.params.courseId, req.body);
    res.json({ message: "Course updated successfully" });
  } catch {
    res.status(404).json({ message: "Course does not exist." });
  }
});

router.get("/courses", authenticateJWTAdmin, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

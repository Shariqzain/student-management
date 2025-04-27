const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create student
router.post('/', async (req, res) => {
  try {
    // Check if student with email already exists
    const existingStudent = await Student.findOne({ email: req.body.email.trim().toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({ 
        message: 'Duplicate key error: A student with this email already exists',
        field: 'email'
      });
    }

    const student = new Student({
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      department: req.body.department,
      enrollmentYear: req.body.enrollmentYear,
      isActive: req.body.isActive ?? true
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        message: `Duplicate key error: A student with this ${field === 'studentId' ? 'Student ID' : 'email'} already exists`,
        field: field
      });
    }
    res.status(400).json({ message: err.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    // Check if email is being updated and if it conflicts with another student
    if (req.body.email) {
      const existingStudent = await Student.findOne({ 
        email: req.body.email.trim().toLowerCase(),
        _id: { $ne: req.params.id }
      });
      if (existingStudent) {
        return res.status(400).json({ 
          message: 'Duplicate key error: A student with this email already exists',
          field: 'email'
        });
      }
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updates = {
      studentId: req.body.studentId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dob: req.body.dob,
      department: req.body.department,
      enrollmentYear: req.body.enrollmentYear,
      isActive: req.body.isActive
    };

    // Remove undefined fields
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        message: `Duplicate key error: A student with this ${field === 'studentId' ? 'Student ID' : 'email'} already exists`,
        field: field
      });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
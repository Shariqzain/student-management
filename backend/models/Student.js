const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  dob: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  enrollmentYear: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 2000 && v <= new Date().getFullYear();
      },
      message: props => `${props.value} is not a valid enrollment year!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save hook to clean data
studentSchema.pre('save', function(next) {
  // Trim whitespace from string fields
  if (this.isModified('studentId')) this.studentId = this.studentId.trim();
  if (this.isModified('firstName')) this.firstName = this.firstName.trim();
  if (this.isModified('lastName')) this.lastName = this.lastName.trim();
  if (this.isModified('email')) this.email = this.email.trim().toLowerCase();
  next();
});

module.exports = mongoose.model('Student', studentSchema);
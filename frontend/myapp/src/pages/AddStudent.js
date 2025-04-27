import { useState, useEffect } from 'react';
import { Typography, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BadgeOutlined as IdIcon,
  PersonOutline as NameIcon,
  EmailOutlined as EmailIcon,
  School as DepartmentIcon,
  CalendarToday as CalendarIcon,
  Class as EnrollmentIcon,
  ArrowBack as BackIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { PageContainer, StyledCard, StyledTextField, NeonButton, FormWrapper } from '../components/StyledComponents';
import { useStudents } from '../hooks/useStudents';
import { useFormValidation } from '../hooks/useFormValidation';
import { pageTransition, cardAnimation } from '../styles/animations';

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const { errors, touched, validateForm, handleBlur, resetValidation } = useFormValidation();

  useEffect(() => {
    return () => resetValidation();
  }, [resetValidation]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isActive' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        await addStudent(formData);
        navigate('/students');
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  return (
    <PageContainer
      as={motion.div}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Typography 
        variant="h4" 
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          color: 'var(--neon-blue)', 
          textAlign: 'center',
          marginBottom: '2rem',
          textShadow: '0 0 10px var(--neon-blue)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'center'
        }}
      >
        <NameIcon style={{ fontSize: '2rem' }} />
        Add New Student
      </Typography>

      <StyledCard
        as={motion.div}
        variants={cardAnimation}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <FormWrapper onSubmit={handleSubmit}>
          <StyledTextField
            name="studentId"
            label="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.studentId && Boolean(errors.studentId)}
            helperText={touched.studentId && errors.studentId}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IdIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="dob"
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dob && Boolean(errors.dob)}
            helperText={touched.dob && errors.dob}
            required
            InputLabelProps={{ shrink: true }}
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="department"
            label="Department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.department && Boolean(errors.department)}
            helperText={touched.department && errors.department}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DepartmentIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            name="enrollmentYear"
            label="Enrollment Year"
            type="number"
            value={formData.enrollmentYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.enrollmentYear && Boolean(errors.enrollmentYear)}
            helperText={touched.enrollmentYear && errors.enrollmentYear}
            required
            className="spotlight-hover"
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EnrollmentIcon style={{ color: 'var(--neon-blue)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControlLabel
            control={
              <Switch
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                color="primary"
                className="spotlight-hover"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--neon-blue)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--neon-blue)',
                  },
                }}
              />
            }
            label="Active Student"
            style={{ color: 'var(--text-primary)' }}
          />

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <NeonButton
              type="button"
              onClick={() => navigate('/students')}
              startIcon={<BackIcon />}
              variant="outlined"
              className="spotlight-hover"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </NeonButton>
            
            <NeonButton
              type="submit"
              startIcon={<SaveIcon />}
              className="spotlight-hover"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Student
            </NeonButton>
          </div>
        </FormWrapper>
      </StyledCard>
    </PageContainer>
  );
};

export default AddStudent;
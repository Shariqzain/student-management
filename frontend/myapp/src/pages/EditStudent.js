import { useState, useEffect } from 'react';
import { Typography, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BadgeOutlined as IdIcon,
  PersonOutline as NameIcon,
  EmailOutlined as EmailIcon,
  School as DepartmentIcon,
  CalendarToday as CalendarIcon,
  Class as EnrollmentIcon,
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { PageContainer, StyledCard, StyledTextField, NeonButton, FormWrapper } from '../components/StyledComponents';
import { useStudents } from '../hooks/useStudents';
import { useFormValidation } from '../hooks/useFormValidation';
import { pageTransition, cardAnimation } from '../styles/animations';
import LoadingSpinner from '../components/LoadingSpinner';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateStudent, getStudentById } = useStudents();
  const [loading, setLoading] = useState(true);
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
    const fetchStudent = async () => {
      try {
        const student = await getStudentById(id);
        setFormData({
          ...student,
          dob: new Date(student.dob).toISOString().split('T')[0]
        });
      } catch (error) {
        // Error is handled by the hook
        navigate('/students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
    return () => resetValidation();
  }, [id, getStudentById, navigate, resetValidation]);

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
        await updateStudent(id, formData);
        navigate('/students');
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
          textShadow: '0 0 10px var(--neon-blue-glow)'
        }}
      >
        Edit Student
      </Typography>

      <StyledCard
        as={motion.div}
        variants={cardAnimation}
      >
        <NeonButton
          startIcon={<BackIcon />}
          onClick={() => navigate('/students')}
          style={{ marginBottom: '1rem' }}
        >
          Back to List
        </NeonButton>

        <FormWrapper component="form" onSubmit={handleSubmit}>
          <StyledTextField
            name="studentId"
            label="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.studentId && Boolean(errors.studentId)}
            helperText={touched.studentId && errors.studentId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IdIcon />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />

          <StyledTextField
            name="department"
            label="Department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.department && Boolean(errors.department)}
            helperText={touched.department && errors.department}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DepartmentIcon />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            name="enrollmentYear"
            label="Enrollment Year"
            value={formData.enrollmentYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.enrollmentYear && Boolean(errors.enrollmentYear)}
            helperText={touched.enrollmentYear && errors.enrollmentYear}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EnrollmentIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={handleChange}
                name="isActive"
                color="primary"
              />
            }
            label="Active Student"
            style={{ marginBottom: '1rem' }}
          />

          <NeonButton
            type="submit"
            startIcon={<SaveIcon />}
            style={{ marginTop: '1rem' }}
          >
            Save Changes
          </NeonButton>
        </FormWrapper>
      </StyledCard>
    </PageContainer>
  );
};

export default EditStudent;
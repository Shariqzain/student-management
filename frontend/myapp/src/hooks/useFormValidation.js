import { useState, useCallback } from 'react';

export const useFormValidation = (initialState) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    let error = '';

    switch (name) {
      case 'studentId':
        if (!value) {
          error = 'Student ID is required';
        } else if (!/^[A-Z0-9]+$/.test(value)) {
          error = 'Student ID must contain only uppercase letters and numbers';
        }
        break;

      case 'firstName':
      case 'lastName':
        if (!value) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.length < 2) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'dob':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const date = new Date(value);
          const now = new Date();
          const age = now.getFullYear() - date.getFullYear();
          if (age < 16 || age > 100) {
            error = 'Student must be between 16 and 100 years old';
          }
        }
        break;

      case 'department':
        if (!value) {
          error = 'Department is required';
        }
        break;

      case 'enrollmentYear':
        if (!value) {
          error = 'Enrollment year is required';
        } else {
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          if (year < 2000 || year > currentYear) {
            error = `Year must be between 2000 and ${currentYear}`;
          }
        }
        break;

      default:
        break;
    }

    return error;
  }, []);

  const validateForm = useCallback((formData) => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateForm,
    handleBlur,
    resetValidation
  };
};
import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://student-management-backendbac.onrender.com';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudent = useCallback(async (studentData) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, studentData);
      setStudents(prev => [response.data, ...prev]);
      toast.success('Student added successfully!');
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error(err.response?.data?.message || 'Failed to add student');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStudent = useCallback(async (id, studentData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      setStudents(prev => 
        prev.map(student => 
          student._id === id ? response.data : student
        )
      );
      toast.success('Student updated successfully!');
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error(err.response?.data?.message || 'Failed to update student');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setStudents(prev => prev.filter(student => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete student');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentById = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch student details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById
  };
};

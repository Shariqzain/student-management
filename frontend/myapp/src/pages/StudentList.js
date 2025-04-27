import { useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  BadgeOutlined as IdIcon,
  PersonOutline as NameIcon,
  EmailOutlined as EmailIcon,
  School as DepartmentIcon,
  Add as AddIcon,
  CheckCircleOutline as ActiveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageContainer, StyledCard, NeonButton } from '../components/StyledComponents';
import { useStudents } from '../hooks/useStudents';
import { pageTransition, staggerContainer, listItemAnimation } from '../styles/animations';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';

const StyledTableContainer = styled(TableContainer)`
  margin-top: 2rem;
  background-color: var(--darker-bg) !important;
  
  .MuiTableCell-root {
    color: white;
    border-color: rgba(0, 243, 255, 0.1);
  }

  .MuiTableRow-root {
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(0, 243, 255, 0.05);
    }
  }
`;

const ActionButton = styled(IconButton)`
  color: var(--neon-blue) !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 5px var(--neon-blue);
  }
`;

const StudentList = () => {
  const navigate = useNavigate();
  const { students, loading, fetchStudents, deleteStudent } = useStudents();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  if (loading && students.length === 0) {
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
        style={{ 
          color: 'var(--neon-blue)', 
          textShadow: '0 0 10px var(--neon-blue)', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <DepartmentIcon style={{ fontSize: '2rem' }} />
        Student List
      </Typography>

      <NeonButton
        onClick={() => navigate('/add-student')}
        className="spotlight-hover"
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        startIcon={<AddIcon />}
      >
        Add New Student
      </NeonButton>

      <StyledCard>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IdIcon /> Student ID
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <NameIcon /> Name
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <EmailIcon /> Email
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DepartmentIcon /> Department
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ActiveIcon /> Status
                  </div>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {students.map((student, index) => (
                  <motion.tr
                    key={student._id}
                    variants={listItemAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                    component={TableRow}
                    layoutId={student._id}
                  >
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.isActive ? "Active" : "Inactive"}
                        color={student.isActive ? "success" : "default"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        onClick={() => navigate(`/edit-student/${student._id}`)}
                        className="spotlight-hover"
                        component={motion.button}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <EditIcon />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDelete(student._id)}
                        className="spotlight-hover"
                        component={motion.button}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <DeleteIcon />
                      </ActionButton>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledCard>
    </PageContainer>
  );
};

export default StudentList;
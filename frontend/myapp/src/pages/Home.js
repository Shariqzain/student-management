import { Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageContainer, StyledCard } from '../components/StyledComponents';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
import { useStudents } from '../hooks/useStudents';
import { useEffect } from 'react';

const WelcomeSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  h3 {
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #00f3ff, #00a7b3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const DashboardCard = styled(motion(StyledCard))`
  height: 100%;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  overflow: hidden;
  position: relative;
  z-index: 0;
  background-color: var(--darker-bg);

  &:hover {
    border-color: var(--neon-blue);
    transform: translateY(-5px);
    z-index: 2;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: var(--neon-blue);
  margin: 1.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  svg {
    filter: drop-shadow(0 0 10px var(--neon-blue));
  }
`;

const StatsGrid = styled(Grid)`
  margin-top: 3rem;
  justify-content: center;
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const StatBox = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: rgba(0, 243, 255, 0.05);
  border: 1px solid rgba(0, 243, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  h6 {
    color: var(--neon-blue);
    margin-bottom: 0.5rem;
  }

  .number {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(45deg, #00f3ff, #00a7b3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  }
`;

const CardContainer = styled(Grid)`
  justify-content: center;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const cardVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

const statBoxVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(0, 243, 255, 0.2)",
    backgroundColor: "rgba(0, 243, 255, 0.08)",
    transition: {
      duration: 0.3
    }
  },
  tap: {
    scale: 0.95
  }
};

const Home = () => {
  const { students, fetchStudents } = useStudents();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(student => student.isActive).length;
  const activePercentage = totalStudents > 0 
    ? Math.round((activeStudents / totalStudents) * 100) 
    : 0;

  return (
    <PageContainer>
      <WelcomeSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Student Management System
        </Typography>
        <Typography variant="body1">
          A comprehensive platform for managing student information with an intuitive interface and powerful features.
          Navigate through different sections to manage student records efficiently.
        </Typography>
      </WelcomeSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContainer container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={itemVariants}>
              <CardLink to="/students">
                <DashboardCard
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="spotlight-hover"
                >
                  <IconWrapper>
                    <PeopleIcon fontSize="inherit" />
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom>
                    Students
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    View and manage all student records in one place
                  </Typography>
                </DashboardCard>
              </CardLink>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div variants={itemVariants}>
              <CardLink to="/add-student">
                <DashboardCard
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="spotlight-hover"
                >
                  <IconWrapper>
                    <PersonAddIcon fontSize="inherit" />
                  </IconWrapper>
                  <Typography variant="h5" gutterBottom>
                    Add Student
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Register new students with complete information
                  </Typography>
                </DashboardCard>
              </CardLink>
            </motion.div>
          </Grid>
        </CardContainer>
      </motion.div>

      <StatsGrid container spacing={3} component={motion.div} variants={containerVariants}>
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div variants={itemVariants}>
            <StatBox
              variants={statBoxVariants}
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <Typography variant="h6">Total Students</Typography>
              <Typography className="number">{totalStudents}</Typography>
            </StatBox>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div variants={itemVariants}>
            <StatBox
              variants={statBoxVariants}
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <Typography variant="h6">Active Students</Typography>
              <Typography className="number">{activePercentage}%</Typography>
            </StatBox>
          </motion.div>
        </Grid>
      </StatsGrid>
    </PageContainer>
  );
};

export default Home;
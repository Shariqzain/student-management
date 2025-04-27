import styled from 'styled-components';
import { Card, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
  background-color: rgba(10, 10, 10, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  
  &:hover {
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
  }
`;

export const StyledTextField = styled(TextField)`
  margin: 12px 0;
  width: 100%;
  
  .MuiInputLabel-root {
    color: white;
    font-size: 1rem;
    font-weight: 500;
    transform: translate(14px, 16px) scale(1);

    &.MuiInputLabel-shrink {
      transform: translate(14px, -6px) scale(0.85);
      background-color: #121212;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
  
  .MuiOutlinedInput-root {
    color: white;
    
    input {
      color: white;
      font-size: 1rem;
      padding: 14px;
      background: rgba(255, 255, 255, 0.05);
    }
    
    fieldset {
      border-color: rgba(0, 243, 255, 0.3);
    }
    
    &:hover fieldset {
      border-color: var(--neon-blue);
    }
    
    &.Mui-focused fieldset {
      border-color: var(--neon-blue);
      box-shadow: 0 0 10px var(--neon-blue);
    }
  }
  
  .MuiFormHelperText-root {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const NeonButton = styled(Button)`
  background: transparent !important;
  color: var(--neon-blue) !important;
  border: 1px solid var(--neon-blue) !important;
  padding: 0.5rem 2rem !important;
  margin: 1rem 0 !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 15px var(--neon-blue) !important;
    text-shadow: 0 0 5px var(--neon-blue) !important;
  }

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(0, 243, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export const AnimatedContainer = styled(motion.div)`
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;
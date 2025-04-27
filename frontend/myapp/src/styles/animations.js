export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const cardAnimation = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 0 25px rgba(0, 243, 255, 0.3)",
    transition: {
      duration: 0.3
    }
  },
  tap: { 
    scale: 0.98,
    boxShadow: "0 0 15px rgba(0, 243, 255, 0.2)" 
  }
};

export const buttonAnimation = {
  hover: {
    scale: 1.05,
    textShadow: "0 0 8px rgb(0, 243, 255)",
    boxShadow: "0 0 15px rgb(0, 243, 255)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  },
  tap: { scale: 0.95 }
};

export const listItemAnimation = {
  initial: { x: -20, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};
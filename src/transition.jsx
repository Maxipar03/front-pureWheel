import {motion} from "framer-motion"
import React from "react"


const transition = (OgComponent) => {
    return () => (
        <>
        <OgComponent />
        <motion.div
          className="slide-in"
          initial={{ scaleY: 1, transformOrigin: "top" }}
          animate={{ scaleY: 0, transformOrigin: "top" }}
          exit={{ scaleY: 1, transformOrigin: "top" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1, transformOrigin: "bottom" }}
          animate={{ scaleY: 0, transformOrigin: "bottom" }}
          exit={{ scaleY: 1, transformOrigin: "bottom" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </>
      );
    };

export default transition
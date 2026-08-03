import React from "react";
import { motion, Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Fades + slides a section up as it scrolls into view (once). */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, id }) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={itemVariants}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/** Wraps a set of RevealItem children and staggers their entrance. */
export const RevealGroup: React.FC<RevealGroupProps> = ({ children, className, id }) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={groupVariants}
  >
    {children}
  </motion.div>
);

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className }) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);

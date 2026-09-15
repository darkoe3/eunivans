'use client';
import { motion, useReducedMotion } from 'framer-motion';
export default function Reveal({children}){const reduce=useReducedMotion();return <motion.div initial={false} whileInView={reduce?{}:{opacity:[0.85,1],y:[10,0]}} viewport={{once:true,amount:0.1}} transition={{duration:0.4}}>{children}</motion.div>}

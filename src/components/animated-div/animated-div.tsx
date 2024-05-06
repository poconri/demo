import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { childrenAnimation, parentAnimation } from '@/app/utils/motion'

export type AnimatedDivProps = {
  children: ReactNode
  index?: number
}

export function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 * (props.index || 0) }}
      variants={
        typeof props.index === 'number' ? childrenAnimation : parentAnimation
      }
    >
      {props.children}
    </motion.div>
  )
}

import React, { useEffect, useRef } from 'react'
import styles from './TimeBar.module.scss'

type LinearGradientType = string | CanvasGradient | CanvasPattern

export const TimeBar = () => {
  const SECONDS_PER_QUESTION = 120
  const FRAME_PER_SECONDS = 30

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const canvasWidth = document.documentElement.scrollWidth * 0.8

  let width = 0
  let timestamp = Date.now()
  let animationFrameId: number | null = null

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d')
      const ctx = canvasCtxRef.current as CanvasRenderingContext2D

      const linearGradient: LinearGradientType = ctx.createLinearGradient(
        0,
        0,
        100,
        0
      )
      linearGradient.addColorStop(0, '#1B0085')
      linearGradient.addColorStop(0.5, '#430085')
      linearGradient.addColorStop(1, '#7900B2')

      const draw = () => {
        if (Date.now() - timestamp > 1000 / FRAME_PER_SECONDS && ctx) {
          ctx.fillStyle = linearGradient
          ctx.fillRect(0, 0, width, 150)
          width += canvasWidth / (SECONDS_PER_QUESTION * FRAME_PER_SECONDS)
          timestamp = Date.now()
        }

        if (Math.round(width) <= Math.round(canvasWidth)) {
          animationFrameId = requestAnimationFrame(draw)
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className={styles.canvas} width={canvasWidth} />
  )
}

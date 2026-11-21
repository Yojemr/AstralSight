import { useEffect, useRef, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function usePanorama() {
  const track = useRef(null)
  const viewport = useRef(null)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const behavior = reducedMotion ? 'auto' : 'smooth'

  useEffect(() => {
    const element = viewport.current
    const lane = track.current
    let mirroredLeft = 0

    function syncFromPage() {
      const max = element.scrollWidth - element.clientWidth
      const scrolled = Math.max(0, Math.min(max, -lane.getBoundingClientRect().top))
      if (Math.abs(element.scrollLeft - scrolled) > 0.5) element.scrollLeft = scrolled
      mirroredLeft = element.scrollLeft
      const fraction = max > 0 ? scrolled / max : 0
      lane.style.setProperty('--atlas-sky-progress', String(fraction))
      setProgress(Math.round(fraction * 1000) / 10)
    }

    function syncFromHorizontalScroll() {
      const left = element.scrollLeft
      if (Math.abs(left - mirroredLeft) <= 0.5) return

      const fromTop = window.scrollY + lane.getBoundingClientRect().top
      window.scrollTo({ top: fromTop + left, behavior: 'auto' })
    }

    const resize = new ResizeObserver(syncFromPage)

    resize.observe(element)
    window.addEventListener('scroll', syncFromPage, { passive: true })
    element.addEventListener('scroll', syncFromHorizontalScroll, { passive: true })
    return () => {
      resize.disconnect()
      window.removeEventListener('scroll', syncFromPage)
      element.removeEventListener('scroll', syncFromHorizontalScroll)
    }
  }, [])

  function setPosition(left, scrollBehavior) {
    const element = viewport.current
    const max = element.scrollWidth - element.clientWidth
    const fromTop = window.scrollY + track.current.getBoundingClientRect().top
    window.scrollTo({
      top: fromTop + Math.max(0, Math.min(max, left)),
      behavior: scrollBehavior,
    })
  }

  function step(direction) {
    const element = viewport.current
    setPosition(element.scrollLeft + direction * element.clientWidth * 0.74, behavior)
  }

  function goTo(fraction, scrollBehavior = behavior) {
    const element = viewport.current
    setPosition((element.scrollWidth - element.clientWidth) * fraction, scrollBehavior)
  }

  function start(event) {
    suppressClick.current = false
    if (!event.isPrimary || event.pointerType !== 'mouse' || event.button !== 0) return
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      startLeft: viewport.current.scrollLeft,
      moved: false,
    }
  }

  function move(event) {
    const pointer = gesture.current
    if (!pointer || pointer.id !== event.pointerId) return
    const offset = event.clientX - pointer.x
    if (!pointer.moved) {
      if (Math.abs(offset) < 6) return
      event.currentTarget.setPointerCapture(pointer.id)
      pointer.moved = true
      suppressClick.current = true
      setDragging(true)
    }
    setPosition(pointer.startLeft - offset, 'auto')
  }

  function finish(event) {
    if (gesture.current?.id !== event.pointerId) return
    gesture.current = null
    setDragging(false)
  }

  function preventDragClick(event) {
    if (suppressClick.current && event.detail > 0) {
      event.stopPropagation()
      event.preventDefault()
      suppressClick.current = false
    }
  }

  function handleKeyDown(event) {
    if (event.currentTarget !== event.target) return
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        step(-1)
        break
      case 'ArrowRight':
        event.preventDefault()
        step(1)
        break
      case 'Home':
        event.preventDefault()
        goTo(0)
        break
      case 'End':
        event.preventDefault()
        goTo(1)
        break
      default:
        break
    }
  }

  return {
    track, viewport, progress, dragging, step, goTo,
    viewportHandlers: {
      onPointerDown: start,
      onPointerMove: move,
      onPointerUp: finish,
      onPointerCancel: finish,
      onLostPointerCapture: finish,
      onPointerLeave: (event) => {
        if (!gesture.current?.moved) finish(event)
      },
      onClickCapture: preventDragClick,
      onKeyDown: handleKeyDown,
    },
  }
}

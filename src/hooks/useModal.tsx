import { useState } from 'react'

export function useModal() {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (): void => {
    setOpen(false)
  }
  const handleOpen = (): void => {
    setOpen(true)
  }

  return { open, handleClose, handleOpen }
}

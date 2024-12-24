import { Backdrop, CircularProgress } from '@mui/material'

export const Wait = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      open={open}
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

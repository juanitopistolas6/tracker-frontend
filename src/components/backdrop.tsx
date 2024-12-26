import { Backdrop, CircularProgress } from '@mui/material'

export const Wait = () => {
  return (
    <Backdrop
      open={true}
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

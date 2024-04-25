import { Box, Drawer, Typography, styled } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from "./Profile";

const drawerStyle = {
  left: 20,
  top: 17,
  height: '95%',
  width: '30%',
  boxShadow: 'none'
}
const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #fff;
  display: flex;
  & > p{
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
    font-size: 18px;
  };
  & > svg{
    margin-top: auto;
    font-weight: 600;
    padding: 15px;
    font-size: 3.5rem;
  }
`
const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`

const InfoDrawer = ({ open, setOpen }) => {

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >

      <Header>
        <ArrowBackIcon onClick={() => setOpen(false)} />
        <Typography>Profile</Typography>
      </Header>

      <Component>
        <Profile />
      </Component>

    </Drawer>
  )
}

export default InfoDrawer
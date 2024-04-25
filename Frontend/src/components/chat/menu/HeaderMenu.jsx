import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, styled } from '@mui/material';
import { useState } from 'react';

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  color: #4a4a4a'
  padding: 15px 60p 5px 24px;
`

const HeaderMenu = ({ setOpenDrawer }) => {
  const [open, setOpen] = useState(null)

  const handleClose = () => {
    setOpen(null)
  }
  const handleClick = (e) => {
    setOpen(e.currentTarget)
  }


  return (
    <>
      <MoreVertIcon onClick={handleClick} />
      <Menu
        keepMounted
        anchorEl={open}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuOption onClick={() => { handleClose(); setOpenDrawer(); }}>Profile</MenuOption>
      </Menu>
    </>
  )
}

export default HeaderMenu
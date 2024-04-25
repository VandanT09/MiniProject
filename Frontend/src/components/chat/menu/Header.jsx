import { useContext, useState } from "react"
import { AccountContext } from "../../../context/AccountProvider"
import { Box, styled } from "@mui/material"
import ChatIcon from '@mui/icons-material/Chat';
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

const Component = styled(Box)`
  height: 52px;
  background: #ededed;
  padding: 6px 16px;
  display: flex;
  align-items: center;
`
const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 2px;
  };
  & :first-child {
    font-size: 22px;
    margin-right: 16px;
    margin-top: 3px;
  }
`
const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%',
})

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { account } = useContext(AccountContext)

  const toggleDrawer = () => {
    setOpenDrawer(true)
  }

  return (
    <>
      <Component>
        <Image src={account.picture} alt="dp" onClick={() => toggleDrawer()} />
        <Wrapper>
          <ChatIcon />
          <HeaderMenu setOpenDrawer={toggleDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  )
}

export default Header
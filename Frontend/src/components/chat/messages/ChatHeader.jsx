import { Box, Typography, styled } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";


const Header = styled(Box)`
  height: 52px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`
const Image = styled('img')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  objectFit: 'cover'
})
const Name = styled(Typography)`
  margin-left: 12px;
`
const Status = styled(Typography)`
  margin-left: 12px;
  font-size: 12px;
  color: rgb(0,0,0,0.6);
`
const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg{
    padding: 8px;
    font-size: 36px;
    color: black;
  }
`

const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext)

  return (
    <Header>
      <Image src={person.picture} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status>
      </Box>
      <RightContainer>
        <SearchIcon />
        <MoreVertIcon />
      </RightContainer>
    </Header>
  )
}

export default ChatHeader
import { Box, Typography, styled } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AccountContext } from "../../../context/AccountProvider"
import { setConversation, getConversation } from "../../../service/api"
import { formatDate } from "../../../utils/commonUtils"

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 30px 0px;
  cursor: pointer;
  align-items: center;
  justify-content: start;
`
const Image = styled('img')({
  width: 50,
  height: 50,
  borderRadius: '50%',
  margin: '0 14px',
  padding: '5px'
})
const Container = styled(Box)`
  display: flex;
`
const TimeStamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`
const Text = styled(Typography)`
  font-size: 14px;
  color: rgba(0,0,0,0.6);
`

const People = ({ user }) => {
  const [message, setMessage] = useState([])
  const { setPerson, account, newMessageFlag } = useContext(AccountContext)

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({ senderId: account.sub, receiverId: user.sub })
      setMessage({ text: data?.message, timeStamp: data?.updatedAt })
    }
    getConversationDetails()
  }, [newMessageFlag])

  const getUser = async () => {
    setPerson(user)
    await setConversation({ senderId: account.sub, receiverId: user.sub })
  }

  return (
    <Component onClick={() => getUser()}>

      <Box>
        <Image src={user.picture} alt="dp" />
      </Box>

      <Box style={{ width: '100%' }}>
        <Container>
          <Typography>{user.name}</Typography>
          {
            message?.text &&
            <TimeStamp>{formatDate(message?.timeStamp)}</TimeStamp>
          }
        </Container>
        <Box>
          <Text>{message?.text?.includes('whatsapp-api-88n1.onrender') ? 'media' : message.text}</Text>
        </Box>
      </Box>

    </Component>
  )
}

export default People
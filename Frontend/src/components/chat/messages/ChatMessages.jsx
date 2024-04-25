import { Box, styled } from "@mui/material"
import Footer from "./Footer"
import { useContext, useEffect, useRef, useState } from "react"
import { AccountContext } from "../../../context/AccountProvider"
import { newMessage, getMessages } from "../../../service/api"
import Message from "./Message"

const Wrapper = styled(Box)`
  background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
  background-size: 50%;
`
const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`
const Container = styled(Box)`
  padding: 1px 80px;
`

const ChatMessages = ({ person, conversation }) => {
  const { account, socket, setNewMessageFlag, newMessageFlag } = useContext(AccountContext)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [file, setFile] = useState()
  const [image, setImage] = useState('')
  const [incomingMessage, setIncomingMessage] = useState(null)
  const scrollRef = useRef()


  useEffect(() => {
    const getMessageDetails = async () => {
      const data = await getMessages(conversation._id)
      setMessages(data)
    }
    conversation._id && getMessageDetails()
  }, [person._id, conversation._id, newMessageFlag])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest', transition: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.current.on('getMessage', data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && setMessages(prev => [...prev, incomingMessage])
  }, [incomingMessage, conversation])


  const sendText = async (e) => {
    const code = e.keyCode || e.which
    if (code === 13) {
      let message = {}
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'text',
          text: text,
        }
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'file',
          text: image
        }
      }

      socket.current.emit('sendMessage', message)
      await newMessage(message)
      setText('')
      setImage('')
      setFile('')
      setNewMessageFlag(prev => !prev)
    }
  }

  return (
    <Wrapper>
      <Component>
        {
          messages && messages.map(message => (
            <Container ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))
        }
      </Component>
      <Footer sendText={sendText} setText={setText} text={text} file={file} setFile={setFile} setImage={setImage} />
    </Wrapper>
  )
}

export default ChatMessages
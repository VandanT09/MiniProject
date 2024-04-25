import { Box, InputBase, styled } from "@mui/material"
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicIcon from '@mui/icons-material/Mic';
import { useEffect } from "react";
import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
  height: 47px;
  width: 100%;
  background: #ededed;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-top: 5px;
  & > *{
    margin: 5px;
    color: #919191;
  }
`
const Search = styled(Box)`
  background: white;
  border-radius: 10px;
  width: calc(94% - 100px);
`
const InputField = styled(InputBase)`
  width: 100%;
  padding: 18px;
  height: 20px;
  padding-bottom: 15px;
  font-size: 14px;
`
const AttachFile = styled(AttachFileOutlinedIcon)`
  transform: rotate(40deg)
`

const Footer = ({ sendText, setText, text, file, setFile, setImage }) => {

  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setText(e.target.files[0].name)
  }

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData()
        data.append("name", file.name)
        data.append('file', file)

        let response = await uploadFile(data)
        setImage(response.data)
      }
    }
    getImage()
  }, [file])

  return (
    <Container>
      <EmojiEmotionsOutlinedIcon />
      <label htmlFor="fileInput">
        <AttachFile />
      </label>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => onFileChange(e)} />
      <Search>
        <InputField placeholder="Type a message" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => sendText(e)} value={text} />
      </Search>
      <MicIcon />

    </Container>
  )
}

export default Footer
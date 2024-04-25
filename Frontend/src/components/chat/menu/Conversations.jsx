import { useContext, useEffect, useState } from "react"
import { getUsers } from "../../../service/api"
import { Box, Divider, styled } from "@mui/material"
import People from "./People"
import { AccountContext } from "../../../context/AccountProvider"


const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`
const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background: #e9edef;
  opacity: 0.6;
`

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([])
  const { account, socket, setActiveUsers } = useContext(AccountContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers()
      const filterData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
      setUsers(filterData)
    }
    fetchData()
  }, [text])

  useEffect(() => {
    socket.current.emit('addUsers', account)
    socket.current.on('getUsers', users => {
      setActiveUsers(users)
    })
  }, [account])

  return (
    <Component>
      {
        users.map(user => (
          user.sub !== account.sub &&
          <>
            <People user={user} />
            <StyledDivider />
          </>
        ))
      }
    </Component>
  )
}

export default Conversations
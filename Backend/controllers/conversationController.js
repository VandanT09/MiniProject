import conversation from "../model/Conversation.js"

export const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    const exist = await conversation.findOne({ members: { $all: [receiverId, senderId] } })

    if (exist) {
      return res.status(200).json('Conversation already exists')
    }
    const newConversation = new conversation({
      members: [senderId, receiverId]
    })
    await newConversation.save()
    return res.status(200).json('Conversation saved successfully')

  } catch (error) {
    return res.status(500).json('Error while saving the conversation')
  }
}

export const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId
    const conversations = await conversation.findOne({ members: { $all: [receiverId, senderId] } })
    return res.status(200).json(conversations)

  } catch (error) {
    return res.status(500).json('Error while getting the conversation')
  }
}
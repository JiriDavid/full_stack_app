const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")

// create message
exports.createMessage = catchAsync(async(req, res, next)=>{
 const message = await Message.create(req.body)

 const conversation = await  Conversation.findById(req.body.conversationId)

 if(!conversation){
  return new AppError("You cannot write to this channel", 400)
 }

 conversation.lastMessage = message.text
 conversation.lastMessageId = req.body.senderId

 await conversation.save()
  res.status(201).json({
    success: true,
    message,
  })
  
})

// get messages for particular conversation
exports.getConversationMessages = catchAsync(async(req, res, next)=>{
  const messages = await Message.find({conversationId: req.params.id})
 
 
   res.status(201).json({
     success: true,
     messages,
   })
   
 })


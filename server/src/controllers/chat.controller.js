import { v4 } from 'uuid';
import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS } from '../constants/constants.js';
import { Chat } from '../models/chat.model.js';
import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import { ApiError, ApiResponse } from '../utils/apiHanlder.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../utils/cloudinary.js';
import { emitEvent } from '../utils/features.js';
import { getOtherMember } from '../utils/helper.js';



export const createGroupChat = async (req,res) => {


    const {name,members} = req.body;
    const creatorId = req.user?._id;

    if (members.length < 3) {
        return res.status(400).json(new ApiError(400,"group chat must include at least 3 members"))
    }

    const allMembers = [...members,creatorId];

    const chat = await Chat.create({
        name,
        members: allMembers,
        creator:creatorId,
        groupChat:true
    })

    if (!chat) {
        return res.status(400).json(new ApiError(400,"couldn't generate chat")) 
    }

    emitEvent(req,ALERT,allMembers,"welcome to baba's chat")
    emitEvent(req,REFETCH_CHATS,members)

    res.status(200)
    .json(
        new ApiResponse(200,chat,"group chat created successfully")
    )

}

export const getMyAdminChats = async (req,res) => {

    const createrId = req.user._id;

    if (!createrId){
        return res.status(400).json(new ApiError(400,"creator id required"))
    }

    const chat = await Chat.find({creator : createrId,groupChat:true,members:createrId}).populate('members',"name avatar");


    if (!chat) {
        return res.status(400).json(new ApiError(400,'invalid creator id')) 
    }

    const transformedChats = chat.map(({_id,name,members,groupChat}) => {

        const otherMember = getOtherMember(members,req.user?._id)

        return {
            _id,
            name : groupChat ? name : otherMember.name,
            members : members.reduce((prev,current) => {
                if (current._id !== req.user?._id) {
                    prev.push(current._id)
                }
                return prev
            },[]),
            groupChat,
            avatar : groupChat ? members.slice(0,3).map(({avatar}) => avatar) : [otherMember.avatar]
        }
    })
    res
    .status(200)
    .json(
        new ApiResponse(200,transformedChats,"fetched my admin chats successfully")
    )

}

export const getMyChats = async (req,res) => {

    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400,"you are not logged in")
    }

    const chats = await Chat.find({members : userId}).populate("members","name avatar");

    if (!chats) {
        throw new ApiError(400,'invalid user id')
    }

    const transformedChats = chats.map(({_id,name,members,groupChat}) => {

        const otherMember = getOtherMember(members,userId)

        return {
            _id,
            name : groupChat ? name : otherMember.name,
            members : members.reduce((prev,current) => {
                if (current._id !== req.user?._id) {
                    prev.push(current._id)
                }
                return prev
            },[]),
            groupChat,
            avatar : groupChat ? members.slice(0,3).map(({avatar}) => avatar) : [otherMember.avatar]
        }
    })


    res.
    status(200)
    .json(
        new ApiResponse(200,transformedChats,"fetched chats successfully")
    )
}

export const addMembers = async (req,res) => {
    const {chatId,members} = req.body;
    const adminId = req.user?._id;

    if (!chatId && !members) {
        return res.status(400).json(new ApiError(401,"chat id and members are required"))
    }
    const chat = await Chat.findById(chatId);

    if (!chat.groupChat)  {
        return res.status(400).json(new ApiError(401,"this must be a group chat to add members"))
    }

    if (chat.creator.toString() !== adminId.toString()) {
        return res.status(400).json(new ApiResponse(401,"you must be admin to add or remove members"))
    }


    const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

    if (chat.members.length > 100) {
        throw new ApiError(401,"members length exceeds the limit")
    }

    await chat.save({validateBeforeSave:false});


    const allUserNames = allNewMembers.map((member) => member.name).join("");

    emitEvent(req,ALERT,chat.members,`${allUserNames} have been added to the group`)
    emitEvent(req,REFETCH_CHATS,chat.members)


    res
    .status(200)
    .json(
        new ApiResponse(200,chat,"added new members")
    )

}

export const removeMembers = async (req,res) => {
    const  {userId,chatId} = req.body;
    const adminId = req.user?._id;

    const chat = await Chat.findById(chatId);
    const userToBeRemoved = await User.findById(userId);



    if (!chat.groupChat)  {
        return res.status(400).json(new ApiError(401,"this must be a group chat to add members"))
    }

    if (chat.creator.toString() !== adminId.toString()) {
        return res.stauts(400).json(new ApiError(401,"you must be admin to add or remove members"))
    }

    const memberIds = chat.members.map((id) => id.toString());

    chat.members = chat.members.filter((member) => member.toString() !== userId.toString());
    await chat.save({validateBeforeSave:false});
  

    emitEvent(req,ALERT,chat.members,{
        message :`${userToBeRemoved.name} is removed from the group`,
        chatId
    });
    emitEvent(req,REFETCH_CHATS,memberIds)


    res.
    status(200)
    .json(
        new ApiResponse(200,{},`${userToBeRemoved.name} has been removed from the group`)
    )


}

export const leaveMembers = async (req,res) => {

    const {chatId} = req.params;
    const userId = req.user?._id;

    if (!chatId) {
        return res.stauts(400).json(new ApiError(401,"no chat id detected"))
    }

    const chat = await Chat.findById(chatId);

    if (!chat.groupChat) {
        return res.stauts(400).json(new ApiError(400,"this is not a group chat"))
    }

    if (chat.members.length < 3) {
        return res.stauts(400).json(new ApiError(401,"group must have at least members"))
    }



    const remaningMembers = chat.members.filter((i) => i.toString() !== userId.toString());

    
    if (chat.creator.toString() == userId.toString()) {
        const newCreator = remaningMembers[Math.floor(Math.random() * chat.members.length)];
        
        chat.creator = newCreator;
    }
    
    chat.members = remaningMembers;
    await chat.save({validateBeforeSave:false});


    emitEvent(req,ALERT,chat.members,{
        message: `${req.user.name} left the group`,
        chatId
    })
    emitEvent(req,REFETCH_CHATS,chat.members)

    
    res
    .status(200)
    .json(
        new ApiResponse(200,{},'left group successfully')
    )

    
}

export const sendAttachment = async (req,res) => {

    const {chatId} = req.body;
    const user = req?.user;
    
    const chat = await Chat.findById(chatId);

    const filePath = req.files.photo[0].path;

    if (!chat) {
        return res.stauts(400).json(new ApiError(400,"no chat found"))
    }
    if (!filePath) {
        return res.stauts(400).json(new ApiError(400,"no filePath detected"))
    }
    
    const file = await uploadToCloudinary(filePath);

    if (!file) {
        return res.stauts(400).json(new ApiError(400,"couldn't upload to cloudinary"))
    }

    const messageForRealTime = {
        content:"",
        attachments: {url : file.url},
        _id :v4(),
        sender : {
            _id: user?._id,
            name:user.name,
        },
        chat:chatId,
        createdAt : new Date().toISOString(),
    }
    
    const messageForDb = {
        content:"",
        attachment : [{url : file.url}],
        sender:user._id,
        chat : chat._id
    };

    const message = await Message.create({
        content : "",
        attachments : [{url : file.url}],
        sender : user?._id,
        chat : chat?._id

    })

    emitEvent(req,NEW_MESSAGE,chat.members,messageForRealTime);
    emitEvent(req,NEW_MESSAGE_ALERT,chat.members)

    res
    .status(200)
    .json(
        new ApiResponse(200,message,"attachment sent successfully")
    )

}

export const getChatDetails = async (req,res) => {
    if (req.query.populate == "true" ) {

        const chat = await Chat.findById(req.params?.id).populate("members","name avatar");

        if (!chat) {
            throw new ApiError(400,"chat not found")
        }

        res
        .status(200)
        .json(
            new ApiResponse(200,chat,"chat fetched successfully")
        )


    }
    else {
        const chat = await Chat.findById(req.params?.id);

        if (!chat) {
            return res.stauts(400).json(new ApiError(400,"chat not found"))
        }

        res
        .status(200)
        .json(
            new ApiResponse(200,chat,"chat fetched successfully")
        )
    }
}

export const renameGroup = async (req,res) => {
    const {id} = req.params;
    const {newName} = req.body;
    const user = req.user?._id;

    if (!id) {
        return res.stauts(400).json(new ApiError(400,"no chat id found"))
    }

    const findChat = await Chat.findById(id);
  
    if (!findChat) {
        return res.stauts(400).json(new ApiError(400,"invalid chat id"))
    }

    const chat = await Chat.findByIdAndUpdate(id,{
        $set :{
            name : newName
        }
    },{
        new : true
    });

   
    emitEvent(req,REFETCH_CHATS,chat.members,"group name changed to " + newName)

    res.status(200)
    .json(new ApiResponse(200,chat,"group name changed successfully"))
}

export const deleteGroup = async (req,res) => {

    const {id} = req.params;

    if (!id) {
        return res.stauts(400).json(new ApiError(400,"no chat id detected"))
    }
    const newchat = await Chat.findById(id);
 

    const chat = await Chat.deleteOne({_id : id});

    if (!chat) {
        return res.stauts(400).json(new ApiError(400,"couldn't delete chat"))
    }

    const message = await Message.find({chat : id,attachments : {$exists : true,$ne :[]}});

     message.forEach(async ({attachments}) => {
        await deleteFromCloudinary(attachments.url);
        console.log('deleted from cloudinary')
     });
     

    const delMessage = await Message.deleteMany({chat : id});

    if (!delMessage) {
        return res.stauts(400).json(new ApiError(400,'couldn"t delte message'))
    }


     emitEvent(req,REFETCH_CHATS,newchat.members)


    res
    .status(200)
    .json(
        new ApiResponse(200,{},'chat delted successfully')
    )

}

export const getMyMessages = async (req,res) => {
    const {id} = req.params;

    const {page = 1} = req.query;
    const limit = 20;

    const chat = await Chat.findById(id);

    if (!chat) {
        throw new ApiError(400,"no chat found")
    }

    // if (!chat.members.includes(req.user?._id)) {
    //     throw new ApiError(400,"you are not a member of this chat")
    // }

    const skip = (page  -1 ) * limit;

    const [messages,numberOfMessages] = await Promise.all([
        Message.find({chat : id})
        .sort({createdAt : 1})
        .populate("sender","name")
        .lean(),
        Message.countDocuments({chat : id})
    ]);

    const totalPages = Math.ceil(numberOfMessages / limit)

    res
    .status(200)
    .json(
        new ApiResponse(200,{messages,totalPages},"fetched meessages succesffully")
    )

}
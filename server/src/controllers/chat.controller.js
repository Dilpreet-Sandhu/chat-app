import {ApiError,ApiResponse} from '../utils/apiHanlder.js';
import {Chat} from '../models/chat.model.js';
import { emitEvent } from '../utils/features.js';
import { ALERT, REFETCH_CHATS } from '../constants/constants.js';
import { getOtherMember } from '../utils/helper.js';
import {User} from '../models/user.model.js' 

export const createGroupChat = async (req,res) => {


    const {name,members} = req.body;
    const creatorId = req.user?._id;

    if (members.length < 3) {
        throw new ApiError(400,"group chat must include at least 3 members")
    }

    const allMembers = [...members,creatorId];

    const chat = await Chat.create({
        name,
        members: allMembers,
        creator:creatorId,
        groupChat:true
    })

    if (!chat) {
        throw new ApiError(400,"couldn't generate chat")
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
        throw new ApiError(400,"creator id required")
    }

    const chat = await Chat.find({creator : createrId}).populate('members',"name avatar");


    if (!chat) {
        throw new ApiError(400,'invalid creator id')
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
        new ApiResponse(200,transformedChats,"fetched my chats successfully")
    )

}

export const getMyChats = async (req,res) => {

    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400,"you are not logged in")
    }

    const chats = await Chat.find({members : userId}).populate("members","name avatar");

    if (!chats) {
        throw new ApiError(400,'invlid user id')
    }

    const transformedChats = chats.map(({_id,name,members,groupChat}) => {

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

    res.
    status(200)
    .json(
        new ApiResponse(200,transformedChats,"fetched chats successfully")
    )
}

export const addMembers = async (req,res) => {
    const {chatId,members} = req.body;

    if (!chatId && members) {
        throw new ApiError(401,"chat id and members are required")
    }
    const chat = await Chat.findById(chatId);

    if (!chat.groupChat)  {
        throw new ApiError(401,"this must be a group chat to add members")
    }

    if (chat.creator !== req.user?._id) {
        throw new ApiError(401,"you must be admin to add or remove members")
    }


    const allNewMembersPromise = members.map((i) => User.findById(i,"name"));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    chat.members.push(...allNewMembers.map((members) => members._id));

    if (chat.members.length > 100) {
        throw new ApiError(401,"members length exceeds the limit")
    }

    await chat.save({validateBeforeSave:false});


    const allUserNames = allNewMembers.map((member) => member.name).join("");

    emitEvent(req,ALERT,chat.members,`${allUserNames} have been added to the group`)
    emitEvent(req,REFETCH_CHATS,chat.members)


}
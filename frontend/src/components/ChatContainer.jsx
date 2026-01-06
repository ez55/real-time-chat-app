import React from 'react'

import { useChatStore } from "../store/useChatStore";

import {useEffect} from "react";
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './MessageSkeleton';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser}=useChatStore()
    const { authUser } = useAuthStore();
    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader></ChatHeader>
        <MessageSkeleton></MessageSkeleton>
        <MessageInput></MessageInput>
        </div>
    )


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader> </ChatHeader>
        <div className="flex-1 overflow-y-auto, p-4, space-y-4">
            {messages.map((message) => (
                <div key={message._id}
                    className = { `chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full border">
                            <img // Sets message profile to either sender or user, with an option to default
                            src={message.senderId === authUser._id ? authUser.profilePic || "/dunger.png.png": selectedUser.profilePic || "/dunger.png.png"}
                            alt = "profile pic" >

                            </img>

                        </div>
                    </div>


                <div className="chat-header mb-1"> 
                    <time className="text-xs opacity-50 ml_1">
                        {formatMessageTime(message.createdAt)}
                    </time>
                </div>

                <div className="chat-bubble flex flex-col">
                    {message.image && (
                        <img
                            src={message.image}
                            alt='Attachment'
                            className="sm:max-w-[200px] rounded-md mb-2"
                        />

                    )}
                </div>


                </div>
            ))}

        </div>
        <MessageInput></MessageInput>
    </div>
  )
}

export default ChatContainer
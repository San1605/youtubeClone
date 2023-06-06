import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages } from '../redux/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/Name';
import ChatMessage from './ChatMessage'

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages)

    useEffect(() => {
        const i = setInterval(() => {
            console.log("api polling")
            dispatch(addMessages({
                name: generateRandomName(),
                message: makeRandomMessage(20)
            }))
        }, 1500)
        return () => clearInterval(i)
    }, [])

    const [liveMessage, setLiveMessage] = useState("")
    return (
        <>
            <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {
                        chatMessages.map((message, index) => (
                            <ChatMessage name={message.name} message={message.message} key={index} />
                        ))
                    }
                </div>
            </div>
            <form action=""
                className="w-full p-2 ml-2 border border-black"
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(addMessages({
                        name:"Sandesh Singhal",
                        message:liveMessage
                    }))
                    setLiveMessage("")
                }}
            >
                <input
                    className="px-2 w-96"
                    type="text"
                    value={liveMessage}
                    onChange={(e) => {
                        setLiveMessage(e.target.value);
                        
                    }}
                />
                <button className="px-2 mx-2 bg-green-100">Send</button>
            </form>
        </>
    )
}
export default LiveChat
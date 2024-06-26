import React, { useEffect } from 'react'
import UserSearch from './components/UserSearch'
import ChatArea from './components/ChatArea'
import UsersList from './components/UsersList';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io("https://chat-app-yl7e.onrender.com");
localStorage.setItem('socket', socket);

function Home() {
    const [searchKey, setSearchKey] = React.useState("");
    const { selectedChat, user } = useSelector((state) => state.userReducer);
    const [onlineUsers, setOnlineUsers] = React.useState([])



    useEffect(() => {
        //join the room
        if (user) {
            socket.emit("join-room", user._id);
            socket.emit("came-online", user._id)

            socket.on("online-users", (users) => {
                console.log(users);
                setOnlineUsers(users);
            })

        }
    }, [user]);

    return (

        <div className='flex gap-5'>
            {/* 1st part user search , userslist/chatlist */}
            <div className='w-96'>
                <UserSearch
                    searchKey={searchKey}
                    setSearchKey={setSearchKey} />

                <UsersList
                    searchKey={searchKey}
                    socket={socket}
                    onlineUsers={onlineUsers}
                    setSearchKey={setSearchKey}
                />
            </div>

            {/* 2nd part chat box */}

            {selectedChat && (
                <div className='w-full'>
                    <ChatArea
                        socket={socket}
                    />
                </div>
            )}

            {!selectedChat && (
                <div className='w-full h-[80vh] items-center justify-center flex flex-col bg-white'>
                    <img src="https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-0.png" alt=""
                        className='w-96 h-96' />
                    <h1 className='text-2xl font-semibold text-gray-500'>
                        Select a user to chat!!
                    </h1>
                </div>
            )}




        </div>

    )
}

export default Home

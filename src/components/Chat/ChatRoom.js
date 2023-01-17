import React, { useEffect, useState } from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import { useToast } from 'rc-toastr'

var stompClient = null;
const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username : '',
        receivername : '',
        connected : false,
        message: ''
    });
    const { toast } = useToast()
    useEffect(() => {
        console.log(userData);
      }, [userData]);

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser = () => {
    //    const value=sessionStorage.getItem("userName");
    //    console.log(value)
    //    setUserData({...userData,"username": value});
       let Sock = new SockJS('http://localhost:8080/api/ws')
       stompClient=over(Sock);
       stompClient.connect({},onConnected,onError)
    }

    const onConnected = () => {
        setUserData({...userData,"connected":true})
        stompClient.subscribe('/chatroom/public',onPublicMessageReceiver);
        stompClient.subscribe('/user/'+userData.username+'/private',onPrivateMessageReceiver);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
          senderName: userData.username,
          status:"JOIN"
        };
        stompClient.send("/api/message", {}, JSON.stringify(chatMessage));
  }

    const onPublicMessageReceiver = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                toast("You have a new message!")
                break;    
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const onPrivateMessageReceiver = (payload) => {

      var payloadData = JSON.parse(payload.body);
      if(privateChats.get(payloadData.senderName)){
        console.log(payloadData.senderName)
        privateChats.get(payloadData.senderName).push(payloadData);
        setPrivateChats(new Map(privateChats));
      }else{
          let list = [];
          list.push(payloadData);
          privateChats.set(payloadData.senderName,list);
          setPrivateChats(new Map(privateChats));
      }
      toast("You have a new message from " + payloadData.senderName)
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const sendValue=()=>{
        console.log(userData.username)
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            message: userData.message,
            status:"MESSAGE"
          };
          console.log(chatMessage);
          stompClient.send("/api/message", {}, JSON.stringify(chatMessage));

          setUserData({...userData,"message": ""});
        }
    }

    const sendPrivateValue=()=>{
        console.log(userData.username)
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/api/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    return (
        <div className="container">
          {userData.connected?
          <div className="chat-box">
          <div className="member-list">
              <ul>
                  <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                  {[...privateChats.keys()].map((name,index)=>(
                      <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                  ))}
              </ul>
          </div>
          {tab==="CHATROOM" && <div className="chat-content">
              <ul className="chat-messages">
                  {publicChats.map((chat,index)=>(
                      <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                          {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                          <div className="message-data">{chat.message}</div>
                          {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                      </li>
                  ))}
              </ul>

              <div className="send-message">
                  <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                  <button type="button" className="send-button" onClick={sendValue}>send</button>
              </div>
          </div>}
          {tab!=="CHATROOM" && <div className="chat-content">
              <ul className="chat-messages">
                  {[...privateChats.get(tab)].map((chat,index)=>(
                      <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                          {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                          <div className="message-data">{chat.message}</div>
                          {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                      </li>
                  ))}
              </ul>

              <div className="send-message">
                  <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                  <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
              </div>
          </div>}
      </div>
          :
          <div className='register'>
            <input
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
            <button className='joinChat' type='button' onClick={registerUser}>
                Join Chat
            </button>
          </div>
          }
        </div>
    )

}

export default ChatRoom
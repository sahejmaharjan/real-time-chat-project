import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Message from "./Message";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "./queries";
import { onCreateMessage } from "./graphql/subscriptions";
import { messagesByChatRoom } from "./graphql/queries";
import { createMessage, updateChatRoom } from "./graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { messagesData } from "./store/all/api";
import { fetchMessages } from "./store/all/action";

const Chat = () => {
  const user = { displayName: "Sahej", uid: "123" };
  const channelId = "123channelId";
  const channelName = "channelName";
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // const [currentChatRoomId, setCurrentChatRoomId] = useState("");
  const currentChatRoomId = useRef(null);
  // const chatRoomID = useSelector((state) => state.allReducer.data.id);
  const chatRoomID = useSelector(
    (state) =>
      state.allReducer.chatRoomData?.data?.getUser?.chatRoomUser?.items?.[0]?.id
  );
  const otherUserName = useSelector((state) => state.allReducer.otherUserName);

  const messageData = useSelector(
    (state) => state.allReducer.messageData?.data?.messagesByChatRoom?.items
  );
  const messagesEndRef = useRef(null);

  console.log("message Data ", messageData);
  const [messages, setMessages] = useState(messageData ? messageData : []);
  const chatRooms = useSelector((state) => state.allReducer.chatRoomData);
  const currentChatId = useSelector((state) => state.allReducer.currentChatId);
  // useEffect(() => {
  //   if (channelId) {
  //   }
  // }, [channelId]);

  // const [myId, setMyId] = useState(null);

  // const fetchMessages = async () => {
  //   const messagesData = await API.graphql(
  //     graphqlOperation(
  //       messagesByChatRoom, {
  //         chatRoomID: id,
  //         sortDirection: "DESC",
  //       }
  //     )
  //   )

  //   console.log("FETCH MESSAGES")
  //   setMessages(messagesData.data.messagesByChatRoom.items);
  // }

  // useEffect(() => {
  //   fetchMessages();
  // }, [])

  // useEffect(() => {
  //   const getMyId = async () => {
  //     const userInfo = await Auth.currentAuthenticatedUser();
  //     setMyId(userInfo.attributes.sub);
  //   }
  //   getMyId();
  // }, [])

  // useEffect(() => {
  //   const subscription = API.graphql(
  //     graphqlOperation(onCreateMessage)
  //   ).subscribe({
  //     next: (data) => {
  //       const newMessage = data.value.data.onCreateMessage;

  //       if (newMessage.chatRoomID !== route.params.id) {
  //         console.log("Message is in another room!")
  //         return;
  //       }

  //       fetchMessages();
  //       // setMessages([newMessage, ...messages]);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [])
  console.log("testing --->", messages);

  const updateChatRoomLastMessage = async (messageId) => {
    try {
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: chatRoomID,
            lastMessageID: messageId,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    console.log("messages in comiming my friend");
    scrollToBottom();
  }, [messageData]);
  // useEffect(() => {
  //   setCurrentChatRoomId(currentChatId);
  // }, [currentChatId]);
  currentChatRoomId.current = currentChatId;

  useEffect(() => {
    // console.log("current Chat Room id is ", currentChatRoomId);
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;
        console.log("new Message is ", newMessage);
        console.log("testinging===========> ", currentChatRoomId.current);
        console.log("newMessage ko id is ", newMessage.chatRoomID);
        if (newMessage.chatRoomID !== currentChatRoomId.current) {
          console.log("Message is in another room!");
          return;
        }
        console.log("now setting the message ");
        dispatch(fetchMessages({ data: currentChatRoomId.current }));
        setMessages(
          //   messages.push({
          [...messages, newMessage]
          //   })
        );
        // fetchMessages();
        // setMessages([newMessage, ...messages]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      // setMyId(userInfo.attributes.sub);
      console.log("answer ", chatRoomID);
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: input,
            userID: userInfo.attributes.sub,
            //chatRoomId need to get from sidechannel
            chatRoomID: currentChatId,
          },
        })
      );
      setInput("");

      await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
    } catch (e) {
      console.log(e);
    }
    //all messages are in message state from subscription which is array ... make input in another js file
    console.log("set Messages", messages);
    // setMessages(
    //   //   messages.push({
    //   [...messages, { message: input, user: user, timestamp: Date.now() }]
    //   //   })
    // );
  };
  return (
    <div className="chat">
      <ChatHeader channelName={otherUserName} />

      <div className="chat__messages">
        {/* {messages.map((message) => {
          console.log("message is ------>", message);
        })} */}
        {messageData?.map((message, index) => (
          <Message
            key={index.toString()}
            message={message?.content}
            timestamp={message?.createdAt}
            user={message?.user}
          />
        ))}
        <div ref={messagesEndRef} />
        {/* {currentChatId} */}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chat__inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            type="submit"
          >
            Send Message
          </button>
        </form>

        {/* <div className="chat__inputIcon">
          <CradGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div> */}
      </div>
    </div>
  );
};

export default Chat;

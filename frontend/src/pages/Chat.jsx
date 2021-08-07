import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import API from "../api/api";

import Avatar from "../components/Avatar";
import MessagesArea from "../components/MessagesArea";
import NewChatForm from "../components/NewChatForm";

const Chat = () => {
  const location = useLocation();
  let history = useHistory();

  const [showChats, setShowChats] = useState(false);
  let [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  const [publicName, setPublicName] = useState("");
  const [id, setId] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});

  const handleEnter = e => {
    if (e.key === "Enter") {
      e.preventDefault(); // avoid creating new line
      send();
    }
  };

  useEffect(async () => {
    try {
      const { publicName, id } = location.state;
      setPublicName(publicName);
      setId(id);

      // Retrieve chats
      const r_chats = await API.get("/chats", { withCredentials: true });
      setChats(r_chats.data);

      // Retrieve first chat
      if (r_chats.data.length !== 0) {
        const r_currentChat = await API.get(`/chats/${r_chats.data[0].id}`, {
          withCredentials: true,
        });
        setCurrentChat(r_currentChat.data);
      }
    } catch {
      history.push("/"); // not authenticated
    }

    setReady(true);
  }, [location.state]);

  const changeChat = async id => {
    const new_chat = await API.get(`/chats/${id}`, {
      withCredentials: true,
    });
    setCurrentChat(new_chat);
  };

  const send = () => {
    const payload = {
      to: currentChat.with.id,
      message,
    };

    API.post("/chats/send", payload, { withCredentials: true }).then(r => {
      let tempCurChat = Object.assign({}, currentChat);
      tempCurChat.lines.push(r.data.line);
      setCurrentChat(tempCurChat);

      let tempChats = chats.slice(); // copy
      let chatIdx = chats.findIndex(c => (c.id = r.data.chatId));
      tempChats[chatIdx].lastLine = r.data.line.message;
      setChats(tempChats);
    });

    setMessage("");
  };

  const handleChatCreated = (chatItem, chat) => {
    let tempChats = chats.slice(); // copy
    tempChats.unshift(chatItem);
    setChats(tempChats);
    setCurrentChat(chat);
  };

  const logout = () => {
    API.get(`/logout`, { withCredentials: true }).then(() => {
      history.push("/");
    });
  };

  return ready ? (
    <div className="flex w-screen h-screen bg-gray-50 fade-transition">
      <div
        className={`md:w-3/12 sm:w-5/12 md:relative absolute overflow-x-hidden h-full pt-4 bg-gradient-to-t from-gray-100 to-gray-50 block transition-all duration-500 ${
          showChats ? "w-full" : "w-0 whitespace-nowrap"
        }`}
      >
        <svg
          className={`md:hidden ml-4 h-10 w-10 fill-current text-orange-500 cursor-pointer absolute ${
            showChats ? "block" : "hidden"
          }`}
          viewBox="0 0 20 20"
          onClick={() => setShowChats(!showChats)}
        >
          <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>{" "}
        </svg>
        <div className="min-h-1/6 p-1">
          <h1 className="text-4xl md:text-5xl text-center font-ducktalk bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
            DuckTalk
          </h1>
          <div className="shadow-2xl bg-white rounded-md p-2 px-4 flex mt-1 md:mt-4 items-center">
            <span className="whitespace-nowrap flex items-center justify-center">
              <Avatar name={publicName} />
              <span className="ml-3">{publicName}</span>
            </span>
            <button onClick={logout} className="ml-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.75 8.75L19.25 12L15.75 15.25"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 12H10.75"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-5/6 p-3 flex flex-col">
          <h2 className="text-3xl font-ducktalk mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
            Chats
          </h2>
          <div className="overflow-y-auto">
            <NewChatForm
              onChatCreated={(chatItem, chat) =>
                handleChatCreated(chatItem, chat)
              }
            />
            {chats.length !== 0 ? (
              chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => changeChat(id)}
                  className={`shadow-lg rounded-md py-5 px-3 mb-1 flex hover:bg-yellow-50 cursor-pointer transition-colors ${
                    currentChat && currentChat.id === chat.id
                      ? "bg-gradient-to-r from-orange-100 to-yellow-100"
                      : "bg-white"
                  }`}
                >
                  <Avatar name={chat.with} className="flex-shrink-0" />
                  <div className="flex flex-col ml-2 overflow-hidden">
                    <span>{chat.with}</span>
                    <p className="text-xs font-light truncate">
                      {chat.lastLine}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">You don't have chats 😢 </p>
            )}
          </div>
        </div>
      </div>
      {/* Right panel */}
      {chats.length !== 0 ? (
        <div
          className={`md:w-9/12 sm:w-7/12 h-full transition-all duration-500 w-full p-2 flex flex-col space-y-2`}
        >
          <div className="bg-white w-full h-1/8 py-3 px-10 flex items-center shadow-lg rounded-lg">
            <svg
              className={`md:hidden h-10 w-10 fill-current text-orange-500 cursor-pointer -ml-5 mr-4  ${
                showChats ? "" : "block"
              }`}
              viewBox="0 0 20 20"
              onClick={() => setShowChats(!showChats)}
            >
              <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>{" "}
            </svg>
            <Avatar
              name={
                currentChat && currentChat.with
                  ? currentChat.with.publicName
                  : ""
              }
            />
            <h1 className="text-2xl ml-2">
              {currentChat.with ? currentChat.with.publicName : ""}
            </h1>
          </div>

          <MessagesArea lines={currentChat.lines} myName={publicName} />

          <div className="bg-white py-2 pr-5 rounded-xl flex shadow-xl">
            <TextareaAutosize
              maxRows={3}
              className="rounded-lg focus:outline-none font-light py-1 px-3 flex-grow mx-4 break-all resize-none"
              placeholder="Type a message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => handleEnter(e)}
            />
            <button
              className="w-9 h-9 p-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-default"
              onClick={() => send()}
              disabled={!message}
            >
              <svg className=" text-white fill-current" viewBox="0 0 20 20">
                <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <svg
          className={`md:hidden h-10 w-10 fill-current text-orange-500 cursor-pointer ml-5 mt-4  ${
            showChats ? "" : "block"
          }`}
          viewBox="0 0 20 20"
          onClick={() => setShowChats(!showChats)}
        >
          <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10"></path>{" "}
        </svg>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default Chat;

"use client";

import { closeMessageUser } from "@/stores/difference-slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ChevronDown, SendHorizontal, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { HubConnectionBuilder } from "@microsoft/signalr";
import TippyHeadless from "@tippyjs/react/headless";
import { ListMessages } from "@/const/user";

export default function Message({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const [receive, setReceive] = useState<boolean>(false);
  const [switchChat, setSwitchChat] = useState<boolean>(false);
  const differenceState = useAppSelector((state) => state.differenceSlice);
  const userState = useAppSelector((state) => state.userSlice);
  const [connection, setConnection] = useState<any>(null);
  const [textMessage, setTextMessage] = useState<string>("");
  const [messagesBot, setMessagesBot] = useState<API.TMessage[]>([]);
  const [messagesStaff, setMessagesStaff] = useState<API.TMessage[]>([]);

  const createConnection = async () => {
    const hubUrl = `${process.env.NEXT_PUBLIC_HUB_SERVER}/hub/message-hub?userId=${userState.user?.userId}&role=${userState.user?.roleId}`;
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  };

  useEffect(() => {
    const handleFetchConnection = async () => {
      if (userState.user !== null) {
        await createConnection();
      }
    };
    handleFetchConnection();
  }, [userState]);

  useEffect(() => {
    try {
      if (connection && userState.user !== null) {
        connection
          .start()
          .then(() => {
            handleFetchMessagesStaff(userState.user?.userId || "");
            connection.on("onError", (message: string) => {
              console.log(message);
            });

            connection.on("onSuccess", (message: string) => {
              console.log(message);
            });

            connection.on(
              "onReceiveMessageBot",
              (message: TResponseDataHub<API.TMessage>) => {
                setMessagesBot((prev) => [...prev, message.Value.Data]);
              }
            );

            connection.on(
              "onReceiveMessageUser",
              (message: TResponseDataHub<API.TMessage>) => {
                // setMessages((prev) => [...prev, message.Value.Data]);
                setMessagesStaff((prev) => [...prev, message.Value.Data]);
              }
            );

            connection.on(
              "onGetMessagesSenderAsync",
              (message: TResponseDataHub<API.TMessage[]>) => {
                setMessagesStaff(message.Value.Data);
              }
            );
          })
          .catch();
      }
    } catch (err) {}
  }, [connection]);

  const handleFetchMessagesStaff = async (senderId: string) => {
    if (!connection) return;

    try {
      await connection.send("GetMessagesSenderIdAsync", senderId);
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const handleCloseMessage = () => {
    dispatch(closeMessageUser());
    setMessagesBot([]);
    setMessagesStaff([]);
    setTextMessage("");
  };

  const handleSendMessageChatBot = async (message: string) => {
    if (!connection) return;

    try {
      await connection.send("SendMessageWithChatBotAsync", {
        userId: userState.user?.userId || "",
        content: message,
      });
      setMessagesBot((prev) => [
        ...prev,
        {
          SenderId: userState.user?.userId,
          Content: message,
          ReceiverId: "",
        },
      ]);
      setTextMessage("");
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const handleSendMessageChatStaff = async () => {
    if (!connection) return;

    try {
      await connection.send("SendMessageWithStaffAsync", {
        userId: userState.user?.userId || "",
        content: textMessage,
      });
      setMessagesStaff((prev) => [
        ...prev,
        {
          SenderId: userState.user?.userId,
          Content: textMessage,
          ReceiverId: "",
        },
      ]);
      setTextMessage("");
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const handleSendMessage = async () => {
    if (receive === false) await handleSendMessageChatBot(textMessage);
    if (receive === true) await handleSendMessageChatStaff();
  };

  const messageYourBox = (
    item: API.TMessage,
    isLastInGroup: boolean,
    isFirstInGroup: boolean,
    index: number
  ) => {
    const isCurrentUserMessage = userState.user?.userId === item.SenderId;

    return (
      <div
        key={index}
        className={`py-2 flex gap-x-3 items-start ${
          isCurrentUserMessage ? "justify-end" : "justify-start"
        }`}
      >
        {isFirstInGroup && !isCurrentUserMessage ? (
          <figure className="flex-shrink-0 rounded-full overflow-hidden w-10 h-10 border border-gray-300">
            <img
              src={`/images/${
                receive === false ? "ai-bot.png" : "employee-chat.png"
              }`}
              width={100}
              height={100}
              alt="avatar"
            />
          </figure>
        ) : (
          <figure className="flex-shrink-0 rounded-full overflow-hidden w-10 h-10 opacity-0 border border-gray-300">
            <img
              src={`/images/${
                receive === false ? "ai-bot.png" : "employee-chat.png"
              }`}
              width={100}
              height={100}
              alt="avatar"
            />
          </figure>
        )}
        <div
          className={`w-max flex items-center px-2 py-1 min-h-8 rounded-xl max-w-[80%] ${
            isCurrentUserMessage ? "bg-blue-200" : "bg-slate-200"
          }`}
        >
          <p className="text-[14px] font-sans">
            {item.Content || "No content available"}
          </p>
        </div>
      </div>
    );
  };

  const renderMessages = (messages: API.TMessage[]) => {
    return messages.map((message, index) => {
      const isFirstInGroup =
        index === 0 ||
        (messages[index - 1].SenderId !== message.SenderId &&
          messages[index - 1].ReceiverId !== message.ReceiverId);

      return messageYourBox(message, false, isFirstInGroup, index);
    });
  };

  const handleOpenSwitchChat = () => {
    setSwitchChat(true);
  };

  const handleToggleSwitchat = () => {
    setSwitchChat((prev) => !prev);
  };

  const handleCloseSwitchat = () => {
    setSwitchChat(false);
  };

  const handleChangeReceive = (status: boolean) => {
    setReceive(status);
    handleCloseSwitchat();
  };

  const handleClickFirstMessageBot = (message: string) => {
    handleSendMessageChatBot(message);
  };

  const renderListFirstMessageBot = () => {
    return (
      <div className="py-2">
        <div className="inline-block min-w-1/2 min-h-[100px] shadow-box-shadown rounded-lg overflow-hidden">
          {ListMessages?.map((item, index) => {
            return (
              <div
                key={index}
                className="py-2 px-4 border-b-2 hover:bg-[#0000001a] cursor-pointer"
                onClick={() => handleClickFirstMessageBot(item.value)}
              >
                <span className="text-base font-sans font-normal">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {differenceState.message.openMessageUser && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="w-[30vw] h-[80vh] bg-white rounded-lg shadow-box-shadown flex flex-col overflow-hidden">
            <header className="h-[10%] px-3 py-5 border-b flex justify-between items-center">
              <TippyHeadless
                interactive
                placement="bottom-end"
                offset={[-5, 2]}
                visible={switchChat}
                render={(attrs) => (
                  <div
                    {...attrs}
                    className="w-[300px] max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 px-2 rounded-md shadow-box bg-white z-[999999] flex flex-col gap-y-2"
                  >
                    <div
                      className="py-1 px-5 flex items-center gap-x-3 hover:bg-[#0000001a] rounded-lg cursor-pointer"
                      onClick={() => handleChangeReceive(false)}
                    >
                      <figure className="border w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer">
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "40px",
                            height: "40px",
                          }}
                          className="flex items-center justify-between"
                        >
                          <img
                            src={"/images/ai-bot.png"}
                            width={170}
                            height={170}
                            alt="avatar"
                          />
                        </div>
                      </figure>
                      <span className="text-[15px] whitespace-nowrap">
                        Chat with AI
                      </span>
                    </div>
                    <div
                      className="py-1 px-5 flex items-center gap-x-3 hover:bg-[#0000001a] rounded-lg cursor-pointer"
                      onClick={() => handleChangeReceive(true)}
                    >
                      <figure className="border w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer">
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "40px",
                            height: "40px",
                          }}
                          className="flex items-center justify-between"
                        >
                          <img
                            src={"/images/employee-chat.png"}
                            width={170}
                            height={170}
                            alt="avatar"
                          />
                        </div>
                      </figure>
                      <span className="text-[15px]">Chat to Staff</span>
                    </div>
                  </div>
                )}
                onClickOutside={handleCloseMessage}
              >
                <div
                  className="select-none flex items-center px-2 py-1 rounded-lg cursor-pointer hover:bg-[#0000001a]"
                  onClick={handleToggleSwitchat}
                >
                  {receive === false ? (
                    <Fragment>
                      <figure className="border w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer">
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "40px",
                            height: "40px",
                          }}
                          className="flex items-center justify-between"
                        >
                          <img
                            src={"/images/ai-bot.png"}
                            width={170}
                            height={170}
                            alt="avatar"
                          />
                        </div>
                      </figure>
                      <h4 className="text-base font-bold ml-2">AI Bot</h4>
                      <div>
                        <ChevronDown />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <figure className="border w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer">
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "40px",
                            height: "40px",
                          }}
                          className="flex items-center justify-between"
                        >
                          <img
                            src={"/images/employee-chat.png"}
                            width={170}
                            height={170}
                            alt="avatar"
                          />
                        </div>
                      </figure>
                      <h4 className="text-base font-bold ml-2">Staff</h4>
                      <div>
                        <ChevronDown />
                      </div>
                    </Fragment>
                  )}
                </div>
              </TippyHeadless>
              <div>
                <button
                  onClick={handleCloseMessage}
                  type="button"
                  className="py-2 px-2 rounded-sm hover:bg-gray-300"
                >
                  <span>
                    <X className="w-6 h-6" />
                  </span>
                </button>
              </div>
            </header>
            <main className="h-[80%] px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {renderMessages(receive === false ? messagesBot : messagesStaff)}
              {receive === false &&
                messagesBot?.length === 0 &&
                renderListFirstMessageBot()}
            </main>
            <footer className="h-[20%] px-2 py-6 flex flex-col gap-y-2 border">
              <div className="relative">
                <Input
                  placeholder="Enter the chat content"
                  type="text"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="border border-gray-400 rounded-3xl pr-14 py-6 focus-visible:ring-0 focus-visible:border-gray-700"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className={`absolute top-1/2 right-5 -translate-y-1/2 rounded-full py-2 px-2 bg-blue-600 ${
                    textMessage !== "" ? "opacity-1 " : "opacity-30"
                  } `}
                >
                  <span>
                    <SendHorizontal className="text-white" />
                  </span>
                </button>
              </div>
              <h3 className="text-center text-[15px]">
                {receive === false
                  ? "AI-generated information is for reference only"
                  : "Messaging with assistant"}
              </h3>
            </footer>
          </div>
        </div>
      )}
      <main>{children}</main>
    </div>
  );
}

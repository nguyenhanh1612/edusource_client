'use client';

import { useState } from "react";
import Image from "next/image";
import botChatIcon from "@/icons/botchaticon.jpg";
import { sendMessageAPI } from "@/services/customer_request/api-service";

interface Message {
    text: string;
    isUser: boolean;
}

const CRChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { text: input, isUser: true };
        setMessages([...messages, userMessage]);
        setInput("");

        const botResponse = await sendMessageAPI(input);
        setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {!isOpen && (
                <button
                    className="w-14 h-14 rounded-full shadow-lg overflow-hidden p-0 border-none"
                    onClick={toggleChat}
                >
                    <Image
                        src={botChatIcon}
                        alt="Chat Icon"
                        layout="fill" // Ensures the image fills the button
                        objectFit="cover" // Prevents distortion, keeps aspect ratio
                    />
                </button>
            )}
            {isOpen && (
                <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
                    <div className="bg-blue-500 text-white p-3 flex justify-between">
                        <span className="font-bold">ChatBot</span>
                        <button onClick={toggleChat} className="text-white">×</button>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <span className={`p-2 rounded-lg max-w-[75%] ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="bg-blue-500 text-white px-3 ml-2 rounded" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CRChatBot;

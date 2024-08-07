'use client'
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CornerDownLeft, List, Mic, NotebookTabs } from 'lucide-react';
import { useTime } from '@/context/TimeContext';
import { useConversation } from '@/context/ConversationContext';
import { UseVideoControl } from '@/context/VideoControl';
import { useUser } from '@/context/User';
import axios from 'axios';
import { socket } from '@/app/socket';
import Markdown from 'markdown-to-jsx';
import FlowChartComponent from '@/components/video/FlowChartComponent'
import { on } from 'events';

export const ChatComponents = ({ params }) => {
    const [isConnected, setIsConnected] = useState(false)
    const [transport, setTransport] = useState("N/A")

    const [message, setMessage] = useState('')
    const { user } = useUser()
    // Array of objects with message and isUser properties
    const { conversation, setConversation } = useConversation()
    const { currentTime } = useTime()

    const getResponse = async (message) => {
        try {
            // Make a POST request to the chatbot API
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}chat/ask?q=${params.slug}`, {
                message,
                timestamp: currentTime,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.access_token
                }
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            console.error('Failed to fetch response:', error);
        }
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message && user.access_token) {
            console.log('Message:', message);
            setConversation(prevConversation => [...prevConversation, { message, isUser: true }])
            getResponse(message).then((response) => {
                console.log('Response:', response)
                // setConversation(prevConversation => [...prevConversation, { message: response, isUser: false }]);
            });
        }
        setMessage('');
    }

    const handleOnChange = (event) => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true)
            setTransport(socket.io.engine.transport.name)

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name)
            });
        }

        function onDisconnect() {
            setIsConnected(false)
            setTransport("N/A")
        }
        
        function onMessage(message) {
            console.log('Message:', message);
            setConversation(prevConversation => [...prevConversation, { message, isUser: false }]);
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("message", onMessage)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }

    }, [params.slug, conversation]);

    return (
        <div className="relative h-full min-h-[50vh] rounded-xl bg-muted/50 p-4 lg:col-span-1">
            <div>
                <p>Status: { isConnected ? "connected" : "disconnected" }</p>
                <p>Transport: { transport }</p>
            </div>
            <Tabs defaultValue="chat" className="flex h-full flex-col">
                <TabsList className='h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2'>
                    <TabsTrigger value="chat" className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'>Chat</TabsTrigger>
                    <TabsTrigger value="visual">Visuals</TabsTrigger>
                </TabsList>
                <TabsContent value="visual">
                    <FlowChartComponent params={params} />
                </TabsContent>
                <TabsContent value="chat">
                    <div
                        className="flex-1 gap-2 overflow-auto h-full p-2"
                        style={{ maxHeight: "70vh", overflow: "scroll" }}
                    >
                        {conversation &&
                            conversation.map((item, index) => (
                                <ChatMessage
                                    key={index}
                                    message={item.message}
                                    isUser={item.isUser}
                                />
                            ))}
                    </div>

                    <form className="flex-grow-0 relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                        <Label htmlFor="message" className="sr-only">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={handleOnChange}
                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                        />
                        <TooltipTriggerAndContent handleSendMessage={handleSendMessage} />
                    </form>

                </TabsContent>
            </Tabs>
        </div>
    );
};

const CoustomButton = ({ onClickFn, timestamp }) => {
    return <Button size="sm" onClick={() => onClickFn(timestamp)}>{Number(timestamp) | 0}</Button>;
};


const ChatMessage = ({ message, isUser }) => {
    const { seekTo } = UseVideoControl();

    const parseMessage = (message) => {
        const timestampRegex = /(\[\d+\.\d+\])/g;

        // Function to replace timestamps with buttons
        const replaceTimestamps = (text) => {
            return text.split(timestampRegex).map((part, index) => {
                if (timestampRegex.test(part)) {
                    const timestamp = part.replace(/\[|\]/g, '');
                    return `<CoustomButton timestamp={${Number(timestamp)}} />`
                }
                return part;
            });
        };

        // Replace timestamps with buttons
        const parts = replaceTimestamps(message);
        return parts.join('');
    }

    return (
        <div className={`flex flex-col gap-2 items-start`}>
            <div className={`gap-1.5 flex flex-row`}>
                <Badge className='max-h-6 min-w-12' variant="secondary">{isUser ? "User" : "Bot"}</Badge>
                <Card className="p-2">
                    <Markdown
                        children={parseMessage(message)}
                        options={{
                            overrides: {
                                CoustomButton: {
                                    component: CoustomButton,
                                    props: {
                                        size: 'sm',
                                        onClickFn: seekTo,
                                    }
                                }
                            }
                        }}
                    />
                </Card>
            </div>
        </div>
    );
};


const TooltipTriggerAndContent = ({ handleSendMessage }) => {
    return (<div className="flex items-center p-3 pt-0">
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                    <NotebookTabs className="size-4" />
                    <span className="sr-only">Add to Notes</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Add to Notes</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                    <List className="size-4" />
                    <span className="sr-only">Get key points</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Get key points</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
        </Tooltip>
        <Button size="sm" className="ml-auto gap-1.5" onClick={handleSendMessage}>
            Send Message
            <CornerDownLeft className="size-3.5" />
        </Button>
    </div>);
};

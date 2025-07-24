import React, { useState } from 'react';
import { Mail, MessageCircle, Paperclip, SmilePlus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReplyCommentToggle = (data) => {
    const { id } = useParams();
    const [email, setEmail] = useState({ message: '' });
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.message.trim()) return;

        try {
            setStatus('loading');
            await axios.post(`http://localhost:8000/api/lead/${id}/email/create/`, {
                message: email.message,
            });

            setStatus('success');
            setEmail({ message: '' });
            setActiveTab(null);
        } catch (err) {
            console.error('Email error:', err);
            setStatus('error');
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab === activeTab ? null : tab);
    };


    return (
        <div className="relative max-h-[90dvh]">
            {activeTab && (
                <div className="">
                    <div className="bg-white border-t border-gray-200 p-4 ">
                        {activeTab === 'reply' && (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-4 text-sm text-gray-800 pb-3 border-b border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center ">
                                                <span className="text-gray-400 text-sm">TO:</span>
                                                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{data?.email}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 flex gap-4 cursor-pointer">
                                                <span>CC</span>
                                                <span>BCC</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">SUBJECT:</span>
                                            <span>{data?.salutation} {data?.name} (#CRM-LEAD-2025-{data?.id})</span>
                                        </div>
                                    </div>

                                    <textarea
                                        className="w-full border border-gray-300 rounded-md py-4 text-sm border-none focus:outline-none min-h-[180px] max-h-[300px]"
                                        placeholder="Write your reply here..."
                                        value={email.message}
                                        onChange={(e) => setEmail({ message: e.target.value })}
                                    />

                                    <div className='flex items-center justify-between border-t border-gray-200'>
                                        <div className='flex items-center gap-2'>
                                            <div className='p-1 rounded-sm hover:bg-gray-200/85 cursor-pointer'>
                                                <SmilePlus className='h-3.5 w-3.5' />
                                            </div>
                                            <div className='p-1 rounded-sm hover:bg-gray-200/85 cursor-pointer'>
                                                <Paperclip className='h-3.5 w-3.5' />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab(null)}
                                                className="text-sm px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="text-sm px-3 py-1 rounded-md bg-black text-white hover:bg-black/85 transition cursor-pointer"
                                            >
                                                {status === "loading" ? "Sending..." : "Send"}
                                            </button>
                                        </div>
                                    </div>


                                    {status === "error" && (
                                        <p className="text-red-600 text-sm mt-2">Failed to send email.</p>
                                    )}
                                    {status === "success" && (
                                        <p className="text-green-600 text-sm mt-2">Email sent successfully!</p>
                                    )}
                                </form>
                            </>
                        )}

                        {activeTab === 'comment' && (
                            <div className="text-sm text-gray-800">
                                <textarea
                                    className="w-full border border-gray-300 rounded-md p-3 text-sm min-h-[120px]"
                                    placeholder="Write your comment..."
                                ></textarea>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab(null)}
                                        className="text-sm px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm px-2 py-1 rounded-md bg-black text-white hover:bg-black/85 transition cursor-pointer"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className='border-b border-gray-200 flex gap-4 items-center py-2 px-4'>
                <button
                    onClick={() => handleTabClick('reply')}
                    className={`hover:bg-gray-200/75 rounded-lg flex gap-2 items-center p-2 cursor-pointer text-sm transition-colors ${activeTab === 'reply' ? 'bg-gray-300 font-semibold' : ''
                        }`}
                >
                    <Mail className='h-4 w-4' /> Reply
                </button>

                <button
                    onClick={() => handleTabClick('comment')}
                    className={`hover:bg-gray-200/75 rounded-lg flex gap-2 items-center p-2 cursor-pointer text-sm transition-colors ${activeTab === 'comment' ? 'bg-gray-300 font-semibold' : ''
                        }`}
                >
                    <MessageCircle className='h-4 w-4' /> Comment
                </button>
            </div>
        </div >
    );
};

export default ReplyCommentToggle;

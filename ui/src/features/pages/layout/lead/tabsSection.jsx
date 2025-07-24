import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const TabsSection = ({ activity = [], emails = [], data }) => {
    const [toggle, setToggle] = useState(1);

    const tabList = [
        { id: 1, label: 'Activity' },
        { id: 2, label: 'Emails' },
        { id: 3, label: 'Comments' },
        { id: 4, label: 'Data' },
        { id: 5, label: 'Calls' },
        { id: 6, label: 'Tasks' },
        { id: 7, label: 'Notes' },
        { id: 8, label: 'Attachments' },
    ];

    return (
        <div>
            <div className='flex border-b border-gray-200 pb-2 mb-4 space-x-4 text-sm text-gray-600'>
                {tabList.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setToggle(tab.id)}
                        className={`px-3 py-1 rounded-t ${toggle === tab.id ? 'border-b-2 border-black' : 'hover:text-black cursor-pointer'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className='max-h-[70dvh] h-[45vh] overflow-y-auto pr-2 border-b border-gray-200'>
                {toggle === 1 && <Activity activity={activity} />}
                {toggle === 2 && <Email emails={emails} />}
            </div>

        </div>
    );
};

const Activity = ({ activity }) => (
    <div className='px-12 py-4'>
        <div>Activity</div>
        {activity.length > 0 ? activity.map((item, index) => (
            <div key={index} className='flex items-start gap-3'>
                <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500'>
                    {item.user?.charAt(0) || 'U'}
                </div>
                <div>
                    <p className='text-sm'><span className='font-medium'>{item.user}</span> {item.action}</p>
                    <p className='text-xs text-gray-400'>{item.timestamp}</p>
                </div>
            </div>
        )) : <p className='text-sm text-gray-500'>No activity recorded yet for this lead.</p>}
    </div>
);

const Email = (data) => {
    const { id } = useParams();
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lead/${id}/email/`)
            .then((res) => {
                setEmails(res.data);
            })
            .catch((err) => {
                console.error("Error loading emails:", err);
            });
    }, [id]);

    if (!emails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='px-8 py-4'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold'>Emails</div>
                    <Button onClick={() => setShowReplyBox(true)} size='sm'>New Email</Button>
                </div>

                <div className='mt-4 space-y-4'>
                    {emails.map((email, index) => (
                        <div
                            key={index}
                            className='border border-gray-300 rounded-lg p-4 text-sm text-gray-800 bg-white'
                        >
                            <div className='flex items-center justify-between'>
                                <div className='font-medium text-gray-900'>{email.sender_name} Someone <span className='text-gray-600 text-xs'>&lt;{email.sent_from}&gt;</span></div>
                                <div className='text-xs text-gray-500'>
                                    {new Date(email.created).toLocaleString()}
                                </div>
                            </div>
                            <div className='mt-1 text-sm text-gray-700 font-medium'><span>{data?.salutation} {data?.name} (#CRM-LEAD-2025-{data?.id})</span></div>
                            <div className='text-xs text-gray-600 mt-0.5'>
                                To: <span className='text-gray-800'>{email.sent_to}</span>
                            </div>
                            <div className='mt-4 whitespace-pre-line text-gray-800 text-sm leading-relaxed'>
                                {email.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabsSection;

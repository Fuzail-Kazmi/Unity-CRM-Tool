import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button'
import { Link2, Mail, Paperclip } from 'lucide-react';

const NoIdProvided = React.lazy(() => import('@/components/ui/empty-states/NoIdProvided'));
const StatusDropdown = React.lazy(() => import('@/components/ui/StatusDropdown'));

const LeadDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://127.0.0.1:8000/api/lead/?id=${id}`)
      .then(response => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setNotFound(true);
        } else {
          setData(response.data);
        }
      })
      .catch(() => setNotFound(true));
  }, [id]);

  const handleConvertToCustomer = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/lead/convert/${id}/`);
      if (response.data.customer_id) {
        setData(prev => ({ ...prev, customer: response.data.customer_id }));
      }
    } catch (error) {
      console.error('Conversion failed', error);
    }
  };

  if (!id || notFound) {
    return (
      <NoIdProvided />
    );
  }

  if (!data) return <p className='p-4'>Loading lead data...</p>;

  return (
    <div>
      <div className='flex items-center justify-between pb-4 border-b border-gray-200'>
        <div className='flex items-center gap-2 text-lg font-semibold'>
          <span className='text-gray-400'>Lead /</span> {data?.salutation} {data?.name}
        </div>
        <div className='flex items-center gap-2'>
          <StatusDropdown
            leadId={id}
            currentStatus={data?.status}
            onStatusChange={newStatus => setData({ ...data, status: newStatus })}
          />
          {!data.customer && (
            <Button onClick={handleConvertToCustomer} size='sm'>Convert to Customer</Button>
          )}
        </div>
      </div>
      <div className='flex max-h-[80dvh] overflow-auto'>

        <div className='flex-10/12 py-4 border-r border-gray-200'>
          <div className='flex border-b border-gray-200 pb-2 mb-4 space-x-4 text-sm text-gray-600'>
            {['Activity', 'Emails', 'Comments', 'Data', 'Calls', 'Tasks', 'Notes', 'Attachments'].map(tab => (
              <button key={tab} className='hover:text-black cursor-pointer'>
                {tab}
              </button>
            ))}
          </div>

          <div className='space-y-4 max-h-[600px] overflow-y-auto pr-2'>
            {data?.activity?.map((activity, index) => (
              <div key={index} className='flex items-start gap-3'>
                <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500'>
                  {activity.user?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className='text-sm'>
                    <span className='font-medium'>{activity.user}</span> {activity.action}
                  </p>
                  <p className='text-xs text-gray-400'>{activity.timestamp}</p>
                </div>
              </div>
            ))}

            {!data?.activity?.length && (
              <p className='text-sm text-gray-500'>No activity recorded yet for this lead.</p>
            )}
          </div>
        </div>

        <div className='flex-2/12 py-4'>
          <div className='font-medium border-b border-gray-200 px-4 pb-1 mb-4'>
            {`CRM-LEAD-2025-${data?.id}` || 'CRM-LEAD-ID'}
          </div>

          <div className='flex items-center gap-4 px-4'>
            {/* <img
                src={data.avatar || '/avatar-placeholder.png'}
                alt='Avatar'
                className='w-12 h-12 rounded-full'
              /> */}
            <div className='h-12 w-12 rounded-4xl bg-red-400'>
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-lg font-medium'>
                {data.salutation ? `${data.salutation} ` : ''}
                {data.name || 'Name'}
              </div>

              <div className='flex items-center gap-2'>
                <button className='p-2 bg-gray-200/80 rounded-md hover:bg-gray-200 cursor-pointer'>
                  <Mail className='h-4 w-4' />
                </button>
                <button className='p-2 bg-gray-200/80 rounded-md hover:bg-gray-200 cursor-pointer'>
                  <Link2 className='h-4 w-4' />
                </button>
                <button className='p-2 bg-gray-200/80 rounded-md hover:bg-gray-200 cursor-pointer'>
                  <Paperclip className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>
        </div>



      </div>


    </div>
  );
};

export default LeadDetails;

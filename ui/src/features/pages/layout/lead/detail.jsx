import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, ExternalLink, Link2, Mail, MessageCircle, Paperclip } from 'lucide-react';
import ReplyCommentToggle from '@/components/ui/replyBtns';

const NoIdProvided = React.lazy(() => import('@/components/ui/empty-states/NoIdProvided'));
const StatusDropdown = React.lazy(() => import('@/components/ui/StatusDropdown'));
const TabsSection = React.lazy(() => import('./tabsSection'));

const LeadDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [email, setEmail] = useState({ message: '' });
  const [showDetails, setShowDetails] = useState(true);
  const [showPerson, setShowPerson] = useState(true);

  const handleSubmit = async () => {
    if (!email.message.trim()) return;

    try {
      setStatus("loading");

      await axios.post(`http://localhost:8000/lead/email/create${id}/`, {
        ...email,
      });

      setStatus("success");
      setEmail({ message: '' });
      setShowReplyBox(false);
      console.log("Email sent successfully!");
    } catch (err) {
      console.error("Email error:", err);
      console.log(err)
      setStatus("error");
    }
  };

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

  if (!id || notFound) return <NoIdProvided />;
  if (!data) return <p className='p-4'>Loading lead data...</p>;

  const leadDetails = {
    Organization: data.organization || 'N/A',
    Website: data.website || 'N/A',
    Industry: data.industry || 'Others',
    "Job Title": data.job_title || 'N/A',
    Source: data.source || 'N/A',
    "Lead Owner": data.owner_name || 'N/A',
    "Email": data.email || 'N/A',
    "Mobile": data.mobile || 'N/A',
    "Status": data.status || 'N/A',
    "Created": new Date(data.created).toLocaleDateString() || 'N/A',
  };

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
            <button
              onClick={handleConvertToCustomer}
              className='text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85 transition'
            >
              Convert to Customer
            </button>
          )}
        </div>
      </div>

      <div className='flex max-h-[90dvh] overflow-auto'>
        <div className='flex-10/12 py-4 border-r border-gray-200'>
          <div>
            <Suspense fallback={<p className='p-4'>Loading tabs...</p>}>
              <TabsSection>
              </TabsSection>
            </Suspense>
          </div>

          <div>
            <ReplyCommentToggle
            />
          </div>


        </div>
        <div className='flex-3/12 py-4'>
          <div className='font-medium border-b border-gray-200 px-4 pb-3.5 mb-4'>
            {`CRM-LEAD-2025-${data?.id}` || 'CRM-LEAD-ID'}
          </div>

          <div className='flex items-center gap-4 px-4 border-b border-gray-200 pt-2 pb-6'>
            <div className='h-12 w-12 rounded-4xl bg-red-400'></div>

            <div className='flex flex-col gap-1'>
              <div className='text-lg font-medium'>
                {data.salutation ? `${data.salutation} ` : ''}{data.name || 'Name'}
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

          <div className="p-2">
            <div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center w-full justify-between px-2 py-1 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  {showDetails ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="font-medium text-sm">Details</span>
                </div>
              </button>
              {showDetails && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm px-4 py-2">
                  {Object.entries(leadDetails).map(([label, value], idx) => (
                    <React.Fragment key={idx}>
                      <div className="text-gray-500">{label}</div>
                      <div className="truncate text-gray-800">{value}</div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setShowPerson(!showPerson)}
                className="flex items-center w-full justify-between px-2 py-1 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-1">
                  {showPerson ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="font-medium text-sm">Person</span>
                </div>
              </button>
              {showPerson && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm px-4 py-2">
                  <div className="text-gray-500">Salutation</div>
                  <div className="text-gray-500">First Name<span className="text-red-500">*</span></div>
                  <div className="text-gray-500">Email</div>
                  <div className="text-gray-500">Mobile No</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

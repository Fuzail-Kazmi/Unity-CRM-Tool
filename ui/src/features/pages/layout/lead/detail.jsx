import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoIdProvided = React.lazy(() => import('../../../../components/ui/empty-states/NoIdProvided'))
const StatusDropdown = React.lazy(() => import('../../../../components/ui/statusDropdown'))

const Index = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`http://127.0.0.1:8000/api/lead/?id=${id}`)
      .then((response) => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setNotFound(true);
        } else {
          setData(response.data);
          console.log(response.data)
        }
      })

      .catch((error) => {
        setNotFound(true);
      });
  }, [id]);

  const handleConvertToCustomer = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/lead/convert/${id}/`);
      const data = response.data;
      console.log(data);

      if (data.customer_id) {
        setData(prev => ({
          ...prev,
          customer: data.customer_id,
        }));
        console.log(data.customer_id)
      }
    } catch (error) {
      console.error("Conversion failed", error);
    }
  };

  if (!id || notFound) {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <NoIdProvided />
        </Suspense>
      </div>
    );
  }

  if (!data) return <p>Loading lead data...</p>;

  return (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h2 className="flex items-center gap-1 text-lg font-semibold"><p className='text-gray-500'>Lead/</p>{data?.salutation} {data?.name}</h2>
          <div className='flex items-center gap-2'>
            <StatusDropdown
              leadId={id}
              currentStatus={data?.status}
              onStatusChange={(newStatus) => setData({ ...data, status: newStatus })}
            />
            {!data.customer && (
              <button onClick={handleConvertToCustomer} className="text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85">
                Convert to Customer
              </button>
            )}
          </div>
        </div>
        <div>
          <h2>Lead Detail</h2>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Customer: {data.customer !== null ? `ID: ${data.customer.pk}` : 'Not a customer yet'}</p>
        </div>
      </div>
    </>
  );
}

export default Index;




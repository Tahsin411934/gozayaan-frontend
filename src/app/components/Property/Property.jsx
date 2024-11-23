"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";

export default function Property() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios.get('http://127.0.0.1:8000/api/propertySummary')
      .then((response) => {
        setData(response.data);
        console.log('Fetched Data:', response.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <div className=''>
      {data.map((property) => (
        <div key={property.property_id} className="mb-10">
          <div className='shadow-xl flex gap-5'>
            <Image
              src={`http://127.0.0.1:8000/storage/${property.main_img}`}
              alt={property.property_name}
              width={200}
              height={250}
              className="rounded-lg"
            />

            <div className='flex flex-col w-full'>
              <div className='flex justify-between items-center w-full'>
                <h1 className='font-semibold text-xl'>{property.property_name}</h1>
                <h1 className='font-normal text-right'>
                  Starting from <br />
                  <span className='font-bold text-lg'>2000 BDT</span>
                </h1>
              </div>

              {/* Render Property Summaries */}
              {property.property_summaries && (
                <div className="flex flex-col gap-3 mt-3">
                  {/* First row: Show 1 summary */}
                  <div className="flex">
                    {property.property_summaries.slice(0, 1).map((summary) => (
                      <div key={summary.id} className="flex items-center text-blue-700">
                        <Image
                          src={`http://127.0.0.1:8000/storage/${summary.image}`}
                          alt={summary.value}
                          width={20}
                          height={20}
                          className="rounded-lg"
                        />
                        <span className="ml-2 text-gray-900">{summary.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Second row: 2 summaries side by side and button on the right */}
                  <div className="flex justify-between items-center gap-4">
                    {/* Summaries */}
                    <div className="flex gap-4">
                      {property.property_summaries.slice(1, 3).map((summary) => (
                        <div key={summary.id} className="flex pb-5 items-center">
                          <Image
                            src={`http://127.0.0.1:8000/storage/${summary.image}`}
                            alt={summary.value}
                            width={20}
                            height={20}
                            className="rounded-lg"
                          />
                          <span className="ml-2 text-gray-900">{summary.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Book Now Button */}
                    <button className='px-3 h-10 bg-blue-900 text-white font-semibold text-center rounded-md'>
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import { use, useEffect, useState } from "react";
import ContactForm from "@/app/components/ContactForm/ContactForm";
import getFacilities from "@/utiles/getFacilities";
import getPropertyDetails from "@/utiles/getPropertyDetails";
import { getPropertyImages } from "@/utiles/getPropertyImages";
import ImageCarousel from "@/utiles/ImageCarousel";
import { IoLocation } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPropertyPackages from "@/utiles/getPropertyPackages";
import { FaWhatsapp } from "react-icons/fa";
import { Roboto } from "next/font/google";
import Image from "next/image";
import getContactNumber from "@/utiles/getContactNumber";
import Link from "next/link";
import AccordionBookMe from "@/utiles/Accordion";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function Page({ params }) {
  const { id } = use(params); // ✅ `use(params)` ব্যবহার করে Promise আনর‍্যাপ করা হয়েছে

  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyFacilities, setPropertyFacilities] = useState([]);
  const [propertyPackages, setPropertyPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactNumber, setContactNumber] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [images, details, facilities, packages] = await Promise.all([
          getPropertyImages(id),
          getPropertyDetails(id),
          getFacilities(id),
          getPropertyPackages(id),
        ]);
        setPropertyImages(images);
        setPropertyDetails(details);
        setPropertyFacilities(facilities);
        setPropertyPackages(packages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getContactNumber();
        setContactNumber(result);
      } catch (error) {
        console.error("Error fetching contact number data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className={`${roboto.className} pt-[80px] bg-[#EBF0F4] pb-[20px]`}>
        <div className="container w-[98%] md:w-[85%] mx-auto">
          <div className="grid-cols-1 rounded gap-8 lg:grid pr-1 pt-1">
            {/* Property Details */}
            <div className="col-span-1 p-2">
              {loading ? (
                <div>Loading...</div>
              ) : (
                propertyDetails?.map((property, index) => (
                  <div key={index}>
                    <h2
                      className={`font-heading text-xl text-blue-900 font-bold`}
                    >
                      {property.property_name}
                    </h2>
                    <p className="flex text-black items-center">
                      <strong>
                        <IoLocation />
                      </strong>{" "}
                      {property.address}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Image Carousel */}
            <div>
              {propertyImages?.length > 0 ? (
                <ImageCarousel propertyImages={propertyImages} />
              ) : (
                <div className="flex bg-gray-200 h-96 justify-center w-full items-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>
          </div>

          {/* Packages Section */}
          <div className="my-[30px]">
            <h1
              className={`font-heading text-blue-700 text-[32px] font-bold my-[32px]`}
            >
              Packages:
            </h1>
            <div className="flex flex-wrap gap-0 lg:gap-6 md:mx-[-10px] md:px-0 mx-0 px-[10px] xl:flex-nowrap">
              {loading ? (
                <div>Loading...</div>
              ) : (
                propertyPackages?.slice(0, 4).map((pkg, dd) => (
                  <div
                    key={pkg.unit_id}
                    className={`${
                      propertyPackages?.length < 4
                        ? "lg:max-w-[25%] max-w-[80%] "
                        : "max-w-[100%]"
                    } relative z-10 lg:my-0 my-[10px] md:mx-[10px] bg-white shadow-xl rounded-lg overflow-visible`}
                  >
                    {/* Discount Badge */}
                    {pkg.discount?.length > 0 && (
                      <div className="flex flex-col bg-red-700 h-14 justify-center rounded-full shadow-md text-white text-xs w-14 -right-3 -top-4 absolute font-semibold items-center py-2 z-40">
                        <span>
                          {Math.floor(pkg.discount[0].discount_percent)}%
                        </span>
                        <span className="text-[10px]">OFF</span>
                      </div>
                    )}

                    {/* Package Content */}
                    <div className="flex flex-col h-full items-center mx-auto">
                      <div className="block max-h-[60%] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${pkg.mainimg}`}
                          alt={pkg.unit_id}
                          fill
                          className="rounded-t-lg w-[100%] lg:max-h-[55%] max-h-[55%] md:max-h-[50%] xl:max-h-[50%]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-[12px] shadow-lg lg:mt-[180px] md:mt-[140px] mt-[210px] xl:mt-[180px]">
                        <h2
                          className={`font-heading text-[17px] font-bold text-blue-900 pb-2`}
                        >
                          {pkg.unit_name}
                        </h2>
                        <p
                          className={`${roboto.className} text-gray-700 text-[16px]`}
                        >
                          {pkg.unit_type} | Person Allowed: {pkg.person_allowed}{" "}
                          | Additional Bed:{" "}
                          {pkg?.additionalbed === 1
                            ? "Available"
                            : pkg?.additionalbed === 0
                            ? "Not Available"
                            : ""}
                        </p>
                        <div className="flex justify-start items-center">
                          <div
                            className={`${roboto.className} flex gap-2 mt-3 mb-4`}
                          >
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://wa.me/${contactNumber[0]?.value}`}
                            >
                              <div className="flex border border-blue-950 justify-center rounded-full text-black text-center text-sm font-heading items-center px-3 py-1 sm:w-[90px]">
                                Call Now
                              </div>
                            </Link>
                            <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://wa.me/${contactNumber[0]?.value}`}
                            >
                              <div className="flex border border-blue-950 justify-center rounded-full text-black text-sm font-heading gap-2 items-center px-3 py-1 sm:w-[120px]">
                                <FaWhatsapp className="text-[16px] text-green-500" />
                                Book Now
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className={`${roboto.className}`}>
                          {pkg.price?.length > 0 ? (
                            <p className="text-[16px] text-blue-950 font-semibold">
                              Price: {pkg.price[0].price} BDT(Per person)
                            </p>
                          ) : (
                            <p className="text-[16px] text-red-500">
                              Price: Not Available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sticky Accordion Section */}
          
          <div className="bg-white p-[15px] rounded-lg top-[80px]">
            <div className="">
              <div className="w-full">
                <div className="grid-cols-3 rounded gap-10 lg:grid">
                  <div className="col-span-2">
                    <AccordionBookMe facilities={propertyFacilities} />
                  </div>
                 
                  <div className="col-span-1 p-[10px] rounded-lg shadow-lg">
                    <div>
                      <h1
                        className={`font-heading text-base shadow-2xl bg-white font-bold text-blue-900 md:mt-0 mt-[15px]`}
                      >
                        Get consultancy/Get a call
                      </h1>
                      <ContactForm propertyDetails={propertyDetails} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Toast container*/}
        <ToastContainer />
      </div>
    </div>
  );
}

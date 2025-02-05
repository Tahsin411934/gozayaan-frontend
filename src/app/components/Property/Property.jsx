import Image from 'next/image';
import Link from 'next/link';
import propertySummary from '@/utiles/propertySummary';
import IconShow from '@/utiles/IconShow';


export default async function Property() {
  let data = [];

  try {
    data = await propertySummary();
  } catch (error) {
    console.error('Error fetching property data:', error);
    return <div>Error loading properties. Please try again later.</div>;
  }

  return (
    <div className="container lg:w-full w-screen mx-auto px-4">
      {data?.map((property) => (
        <div key={property.property_id} className="mb-5">
          <Link href={`/Property/${property.property_id}`} prefetch={true}>
            <div className="shadow-custom flex flex-col md:flex-row gap-5 p-5 rounded bg-white">
              {/* Property Image */}
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/${property.main_img}`}
                alt={property.property_name}
                width={600}
                height={300}
                className=" object-cover w-full md:w-[300px] md:h-[230px] h-[200px] mx-auto"
              />

              {/* Property Information */}
              <div className="flex flex-col w-full pr-4">
                <div className="flex justify-between items-center w-full">
                  <h1 className="font-semibold text-lg text-[#00026E] ">
                    {property.property_name}
                  </h1>
                  <h1 className="font-normal text-sm text-[#00026E] text-right">
                    Starting from <br />
                    <span className="font-bold text-lg text-blue-900">
                      {(() => {
                        const prices = property.property_uinit?.flatMap((unit) =>
                          unit.price?.map((priceObj) => priceObj.price)
                        ) || [];
                        return prices.length > 0 ? `${Math.min(...prices)} BDT` : "N/A";
                      })()}
                    </span>
                  </h1>
                </div>

                {/* Render Property Summaries */}
                {property.property_summaries && (
                  <div className="flex flex-col gap-3 mt-3">
                    {/* First row: Show 1 summary */}
                    <div className="flex flex-wrap gap-4">
                      {property.property_summaries.slice(0, 1).map((summary) => (
                        <div key={summary.id} className="flex items-center text-blue-700">
                          <IconShow iconName={summary.icons.icon_name} />
                          <span className="ml-2 text-sm text-blue-900">{summary.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Second row: 2 summaries side by side and button on the right */}
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      {/* Summaries */}
                      <div className="flex gap-4 w-full md:w-auto">
                        {property.property_summaries.slice(1, 3).map((summary) => (
                          <div key={summary.id} className="flex items-center text-gray-700">
                            <IconShow iconName={summary.icons.icon_name} />
                            <span className="ml-2 text-sm text-gray-900">{summary.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Book Now Button */}
                      <button className="px-4 py-2 mt-3 md:mt-0 bg-blue-900 text-white font-semibold rounded-md w-full md:w-auto">
                        Book Now
                      </button>
                    </div>

                    {/* Third row: One more summary */}
                    <div className="flex gap-4 w-full md:w-auto">
                      {property.property_summaries.slice(3, 4).map((summary) => (
                        <div key={summary.id} className="flex items-center text-gray-700">
                          <IconShow iconName={summary.icons.icon_name} />
                          <span className="ml-2 text-sm text-blue-900">{summary.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

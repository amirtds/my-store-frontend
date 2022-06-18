/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Banner() {
  return (
    <>
        <div className="bg-black">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-gray-800">
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">Get free delivery on orders over $300</span>
                  <span className="hidden md:inline">Get free delivery on orders over $300</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                  <Link href="#">
                    <a className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-600 bg-white hover:bg-gray-50">
                      Learn more
                    </a>
                  </Link>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  aria-label="Close"
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                ></button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

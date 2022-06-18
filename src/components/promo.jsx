import Link from "next/link";
import Image from "next/image";

export default function Promo() {
  return (
    <>
        <div className="bg-white">
          <div className="pt-32 overflow-hidden sm:pt-14">
            <div className="bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative pt-48 pb-16 sm:pb-24">
                  <div>
                    <h2
                      id="sale-heading"
                      className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
                    >
                      Final Stock
                      <br />
                      Up to 50% off
                    </h2>
                      <div className="mt-6 text-base">
                        <Link href="#">
                          <a className="font-semibold text-white">
                            Shop the sale
                            <span aria-hidden="true"> &rarr;</span>
                          </a>
                        </Link>
                      </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 sm:top-6 sm:translate-x-0">
                    <div className="ml-24 md:flex hidden space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            width={300}
                            height={250}
                            quality={80}
                            src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                            alt="Golder Retriever"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            width={300}
                            height={250}
                            quality={50}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src="https://dummyjson.com/image/i/products/12/1.jpg"
                            alt="Sketch Pad"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            width={300}
                            height={250}
                            quality={50}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src="https://dummyjson.com/image/i/products/27/1.jpg"
                            alt="english-cocker-spaniel-puppy-sitting-on-ground-beside-grass"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            width={300}
                            height={250}
                            quality={50}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src="https://dummyjson.com/image/i/products/10/1.jpg"
                            alt="adorable-fatty-cat-sitting-in-cozy-old-armchair-at-home"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            width={300}
                            height={250}
                            quality={50}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src="https://dummyjson.com/image/i/products/6/1.png"
                            alt="Man"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            width={300}
                            height={250}
                            quality={50}
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
                            alt="Architecture"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

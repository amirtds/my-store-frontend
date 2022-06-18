import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

import { XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import _ from "lodash";

export default function Products(props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const allProducts = props.allProducts;
  const [activeCategories, setActiveCategories] = useState([]);
  const [activePriceRange, setActivePriceRange] = useState();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const pageSize = 6;
  const pagesCount = Math.ceil(filteredProducts.length / pageSize);
  const pages = _.range(1, pagesCount + 1);
  const [currentPage, setCurrentPage] = useState(1);
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const [sortBy, setSortBy] = useState("price_low_high");
  const [ref, inView] = useInView({
    threshold: 0,
  });
  useEffect(() => {
    filterProducts();
  }, [activeCategories, activePriceRange, currentPage]);

  // find existing unique categories
  let categories = [];
  allProducts.map((product) => {
    if (categories.indexOf(product.attributes.category) === -1) {
      categories.push(product.attributes.category);
    }
  });

  // handle category change
  function handleCategory(e) {
    // get the category name
    const category = e.target.value;
    // check if user checked or unchecked
    const categoryEnabled = e.target.checked;
    // create list of active categories
    let allActiveCategories = [...activeCategories];
    if (categoryEnabled === true) {
      allActiveCategories = [...activeCategories, category];
    } else {
      allActiveCategories = activeCategories.filter(
        (filter) => filter !== category
      );
    }
    setActiveCategories(allActiveCategories);
    setCurrentPage(1);
  }
  // handle price range click
  function handlePrice(e) {
    const priceRange = e.target.value;
    setActivePriceRange(priceRange);
    setCurrentPage(1);
  }
  // handle sorting
  function handleSort(e) {
    const sort = e.target.name;
    if (sort === "price_low_high") {
      setFilteredProducts(filteredProducts.sort((a, b) => a.attributes.price - b.pattributes.rice));
    } else if (sort === "price_high_low") {
      setFilteredProducts(filteredProducts.sort((a, b) => b.attributes.price - a.attributes.price));
    } else if (sort === "name_a_z") {
      setFilteredProducts(
        filteredProducts.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
      );
    } else if (sort === "name_z_a") {
      setFilteredProducts(
        filteredProducts.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name))
      );
    }
    setSortBy(sort);
    setCurrentPage(1);
  }
  // handle page change
  function handlePage(page) {
    setCurrentPage(page);
  }
  function handleNextPage() {
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1);
    }
  }
  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function filterProducts() {
    if (activeCategories.length === 0 && activePriceRange === undefined) {
      setFilteredProducts(allProducts);
    } else if (
      activeCategories.length === 0 &&
      activePriceRange !== undefined
    ) {
      if (activePriceRange == "1") {
        setFilteredProducts(
          allProducts.filter((product) => product.attributes.price <= 20)
        );
      } else if (activePriceRange == "2") {
        setFilteredProducts(
          allProducts.filter(
            (product) => product.attributes.price > 20 && product.attributes.price <= 100
          )
        );
      } else if (activePriceRange == "3") {
        setFilteredProducts(
          allProducts.filter((product) => product.attributes.price > 100)
        );
      }
    } else if (
      activeCategories.length !== 0 &&
      activePriceRange === undefined
    ) {
      setFilteredProducts(
        allProducts.filter((product) =>
          activeCategories.includes(product.attributes.category)
        )
      );
    } else if (
      activeCategories.length !== 0 &&
      activePriceRange !== undefined
    ) {
      if (activePriceRange == "1") {
        setFilteredProducts(
          allProducts.filter(
            (product) =>
              activeCategories.includes(product.attributes.category) && product.attributes.price <= 20
          )
        );
      } else if (activePriceRange == "2") {
        setFilteredProducts(
          allProducts.filter(
            (product) =>
              activeCategories.includes(product.attributes.category) &&
              product.attributes.price > 20 &&
              product.attributes.price <= 100
          )
        );
      } else if (activePriceRange == "3") {
        setFilteredProducts(
          allProducts.filter(
            (product) =>
              activeCategories.includes(product.attributes.category) && product.attributes.price > 100
          )
        );
      }
    }
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {/* // category filter */}
                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                    defaultOpen={false}
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Category
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {categories.map((category) => (
                              <div key={category} className="flex items-center">
                                <input
                                  id={`filter-mobile-${category}`}
                                  name={category}
                                  defaultValue={category}
                                  type="checkbox"
                                  defaultChecked={false}
                                  onChange={handleCategory}
                                  className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${category}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {/* // Price range filter */}
                  <Disclosure
                    defaultOpen={false}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Price Range
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {/* Price Option */}
                            <div className="flex items-center">
                              <input
                                name="price"
                                defaultValue="1"
                                type="radio"
                                defaultChecked={false}
                                onChange={handlePrice}
                                className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                              />
                              <label
                                htmlFor={`filter-mobile-price`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                Less than $20
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                name="price"
                                defaultValue="2"
                                type="radio"
                                defaultChecked={false}
                                onChange={handlePrice}
                                className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                              />
                              <label
                                htmlFor={`filter-mobile-price`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                $20 - $100
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                name="price"
                                defaultValue="3"
                                type="radio"
                                defaultChecked={false}
                                onChange={handlePrice}
                                className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                              />
                              <label
                                htmlFor={`filter-mobile-price`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                More than $100
                              </label>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {/* sort option */}
                      <Menu.Item>
                        <button
                          onClick={handleSort}
                          name="price_high_low"
                          className={
                            sortBy === "price_high_low"
                              ? "text-gray-900 font-medium  block px-4 py-2 text-sm"
                              : "text-gray-500 font-medium  block px-4 py-2 text-sm"
                          }
                        >
                          Price: High to Low
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={handleSort}
                          name="price_low_high"
                          className={
                            sortBy === "price_low_high"
                              ? "text-gray-900 font-medium  block px-4 py-2 text-sm"
                              : "text-gray-500 font-medium  block px-4 py-2 text-sm"
                          }
                        >
                          Price: Low to High
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={handleSort}
                          name="name_a_z"
                          className={
                            sortBy === "name_a_z"
                              ? "text-gray-900 font-medium  block px-4 py-2 text-sm"
                              : "text-gray-500 font-medium  block px-4 py-2 text-sm"
                          }
                        >
                          Name : A-Z
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={handleSort}
                          name="name_z_a"
                          className={
                            sortBy === "name_z_a"
                              ? "text-gray-900 font-medium  block px-4 py-2 text-sm"
                              : "text-gray-500 font-medium  block px-4 py-2 text-sm"
                          }
                        >
                          Name : Z-A
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <Disclosure
                  as="div"
                  className="border-b border-gray-200 py-6"
                  defaultOpen={false}
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Category
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center">
                              <input
                                id={category}
                                name="category"
                                defaultValue={category}
                                type="checkbox"
                                defaultChecked={false}
                                onChange={handleCategory}
                                className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                              />
                              <label
                                htmlFor={`filter-${category}-${categories.indexOf(
                                  category
                                )}`}
                                className="ml-3 text-sm text-gray-600 capitalize"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-b border-gray-200 py-6"
                  defaultOpen={false}
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Price Range
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              name="price"
                              defaultValue="1"
                              type="radio"
                              defaultChecked={false}
                              onChange={handlePrice}
                              className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                            />
                            <label className="ml-3 text-sm text-gray-600 capitalize">
                              Less than $20
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              name="price"
                              defaultValue="2"
                              type="radio"
                              defaultChecked={false}
                              onChange={handlePrice}
                              className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                            />
                            <label className="ml-3 text-sm text-gray-600 capitalize">
                              $20 - $100
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              name="price"
                              defaultValue="3"
                              type="radio"
                              defaultChecked={false}
                              onChange={handlePrice}
                              className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                            />
                            <label className="ml-3 text-sm text-gray-600 capitalize">
                              More than $100
                            </label>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="">
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8 p-8">
                    {pagedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        className="group text-sm"
                      >
                        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden">
                          <Image
                            src={product.attributes.imageUrl}
                            alt={product.attributes.name}
                            quality={50}
                            width={800}
                            height={600}
                            className="w-full h-full object-center object-cover rounded-lg"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700"></h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.attributes.category}
                            </p>
                          </div>
                          {product.attributes.bestseller && (
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                              Best Seller
                            </span>
                          )}
                        </div>
                        <h3 className=" font-medium text-gray-900">
                          {product.attributes.name}
                        </h3>
                        <p className="mt-2 font-medium text-gray-900">
                          ${product.attributes.price}
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => props.handleAddToCart(product)}
                          className="mt-4 inline-flex items-center px-4 py-2 w-full border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 opacity-0 group-hover:opacity-100"
                        >
                          Add to Cart
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* pagination */}
                <nav className="border-t border-gray-200 px-4 mt-4 flex items-center justify-between sm:px-0">
                  <div className="-mt-px w-0 flex-1 flex">
                    <button
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                      className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-25"
                    >
                      <ArrowNarrowLeftIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Previous
                    </button>
                  </div>
                  <div className="hidden md:-mt-px md:flex">
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePage(page)}
                        className={
                          currentPage === page
                            ? "border-t-2  border-gray-500 text-gray-600 pt-4 px-4 inline-flex items-center text-sm font-semibold"
                            : "text-gray-600 pt-4 px-4 inline-flex items-center text-sm font-medium"
                        }
                        aria-current="page"
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    <button
                      disabled={currentPage === pages.length}
                      onClick={handleNextPage}
                      className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-25"
                    >
                      Next
                      <ArrowNarrowRightIcon
                        className="ml-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </nav>

                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

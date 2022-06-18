import gql from "graphql-tag";
import apolloClient from "../lib/apolloClient";
import Banner from "../components/banner";
import Header from "../components/header";
import Hero from "../components/hero";
import Products from "../components/products";
import Promo from "../components/promo";
import Footer from "../components/footer";
import { useState } from "react";
import Head from "next/head";

export default function Home({ featuredProduct, allProducts }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems([...cartItems, product]);
  }
  function clearCart() {
    setCartItems([]);
  }
  return (
    <div>
      <Head>
        <title>My Store</title>
        <link
          rel="icon"
          href=""
        />
        <meta
          property="og:title"
          content="My page title"
          key="title"
          lang="en"
        />
      </Head>
      <Banner />
      <Header cartItems={cartItems} clearCart={clearCart} />
      <Hero
        featuredProduct={featuredProduct}
        allProducts={allProducts}
        handleAddToCart={handleAddToCart}
      />
      <Promo />
      <Products allProducts={allProducts} handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}

// 1. GQL Queries to get data from Strapi
// 1.1 featured product
const FEATURED_PRODUCT_QUERY = "REPLACE_WITH_QUERY";

// 1.2 all products
const ALL_PRODUCTS_QUERY = "REPLACE_WITH_QUERY"


export const getStaticProps = async () => {
  // 2 Execute GQL queries to get data from Strapi
  // 2.1 Featured Product Data
  const { data: featuredProductData } = await apolloClient.query({
    query: FEATURED_PRODUCT_QUERY,
  });
  // 2.2 All Products Data
  const { data: allProductsData } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });
  return {
    props: {
      featuredProduct:
        featuredProductData.products.data.length > 0
          ? featuredProductData.products.data[0]
          : null,
      allProducts: allProductsData.products.data,
    },
  };
};

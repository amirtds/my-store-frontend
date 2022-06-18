import apolloClient from "../../lib/apolloClient";
import gql from "graphql-tag";

export default async (req, res) => {
  // all products
  const ALL_PRODUCTS_QUERY = gql`
    query {
      products(pagination: {pageSize: 50}) {
        id
        attributes {
          name
          description
          price
          published
          brand
          color
          size
          quantity
          discount_price
          discount_start_date
          discount_end_date
          category
          imageUrl
          currency
          bestseller
          featured
        }
      }
    }
  `;

  // 2.3 All Products Data
  const { data: allProductsData } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });
  res.status(200).json(allProductsData.products);
};

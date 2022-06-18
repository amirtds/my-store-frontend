import apolloClient from "../../lib/apolloClient";
import gql from "graphql-tag";

export default async (req, res) => {
  // all products
  const ALL_PRODUCTS_QUERY = "REPLACE_WITH_QUERY"

  // 2.3 All Products Data
  const { data: allProductsData } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });
  res.status(200).json(allProductsData.products);
};

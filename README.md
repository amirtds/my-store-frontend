## Introduction

This is a demo Ecommerce site that is using [Next.js](https://nextjs.org) and [Strapi](https://strapi.io).
You can access published site at [https://my-store-frontend.vercel.app](https://my-store-frontend.vercel.app) 

## Data Schema and Database

In our backend we are pulling products from miultiple channels, enriching them in Strapi CMS and pulling them to the frontend.

Here you can find gql schema for the existing components

```graphql
// 1. GQL Queries to get data from Strapi
// 1.1 featured product
const FEATURED_PRODUCT_QUERY = gql`
  query {
    products(filters: {featured: {eq: true}}) {
      data {
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
  }
`;

// 1.2 all products
const ALL_PRODUCTS_QUERY = gql`
  query {
    products(pagination: {pageSize: 50}) {
      data {
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
  }
`;
```


## Features

### FeaturedProduct

One of the products has a flag called `featured` that it's a featured product. It should be displayed above the product list.

### ProductList

The product list contains 6 items. After clicking on "Add to Cart" users can see the product in the cart. Some product in CMS can be flagged as `bestseller` and it will be displayed in the product list.

### AddtoCart

Add Cart Icon shows the numnber of available items in the Cart and when users click on it they see details of the items.
By clicking on "Clear" they can clear the cart.

### Pagination

Products are paginated. On one page we have 6 items. The pagination shows the current page.

### Sorting

Products can be sorted byt price. Hight to Low and Low to High.

### Filtering

Products are filterable. Users can filter products by their category and price range. Category names are loaded dynamically based on existing categories to the list of filters

## How to run it locally

- Create `.env` file at the root of the project and add `STRAPI_GRAPHQL_ENDPOINT = "YOUR-STRAPI-URL/graphql"` to it
- In the root of your project run `npm i`
- Run the project by `npm run dev`

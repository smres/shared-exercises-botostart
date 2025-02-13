import React from "react";
import ProductDetailsPage from "../../components/templates/ProductDetailsPage";

function ProductDetails({ data }) {
  console.log(data);

  return <ProductDetailsPage {...data} />;
}

export default ProductDetails;

export async function getStaticPaths() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseURL}products`);
  const productData = await res.json();
  console.log("productsData", productData);

  const paths = productData.data.map((product) => {
    return {
      params: {
        profileId: product.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { profileId },
  } = context;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(profileId);

  const res = await fetch(`${baseURL}products/${profileId}`);
  const data = await res.json();

  return { props: { data } };
}

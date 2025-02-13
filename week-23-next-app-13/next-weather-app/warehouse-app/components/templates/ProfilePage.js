import React from "react";
import ProductsTable from "../modules/ProductsTable";

function ProfilePage({ data }) {
  return (
    <>
      <ProductsTable data={data} />
    </>
  );
}

export default ProfilePage;

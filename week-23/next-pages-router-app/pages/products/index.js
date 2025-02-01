import ProductsPage from "../../components/templates/ProductsPage";
import api from "../../configs/api";

function Products() {
  return <ProductsPage />;
}

export default Products;

// export async function getServerSideProps() {
//   const currentPage = 1; // or get this value dynamically
//   const limitShow = 10; // or get this value dynamically
//   const res = await api.get(`products?page=${currentPage}&limit=${limitShow}`);
//   const data = res.data;
//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//   };
// }

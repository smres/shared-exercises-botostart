import { parse } from "cookie";
import ProfilePage from "../../components/templates/ProfilePage";

function index({ data }) {
  console.log(data);

  return <ProfilePage data={data} />;
}

export default index;

export async function getServerSideProps(context) {
  // console.log(context.req.headers.cookie);
  const {
    query: { page, limit },
    req,
  } = context;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  let data = [];
  try {
    if (!page) {
      const res = await fetch(`${baseURL}products`);
      data = await res.json();
    } else {
      const res = await fetch(`${baseURL}products?page=${page}&limit=${limit}`);
      data = await res.json();
    }
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: { data },
  };
}

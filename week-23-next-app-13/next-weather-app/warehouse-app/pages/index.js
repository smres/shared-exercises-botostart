import ProductStorePage from "../components/templates/ProductStorePage";

export default function Home({ images }) {
  return (
    <>
      <ProductStorePage images={images} />
    </>
  );
}

export async function getServerSideProps() {
  let randomIndex = Math.floor(Math.random() * 29);
  const res = await fetch("https://picsum.photos/v2/list");
  const data = await res.json();
  let images = [];
  if (randomIndex <= 20) {
    images = data.slice(randomIndex, 29);
  } else {
    randomIndex = Math.floor(Math.random() * 20);
    images = data.slice(randomIndex, 19);
  }

  return {
    props: {
      images,
    },
  };
}

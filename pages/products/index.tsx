import type { NextPage, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Product from "../../components/Product";
import Navbar from "./../../components/Navbar";

type Products = [
  {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
];

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Page: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div id="top"></div>
      <Navbar redirectTo="#top" />
      <div className="bg-slate-100 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product: Product) => (
          <Product key={product.id.toString()} id={product.id.toString()} title={product.title} description={product.description} image={product.image}></Product>
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data: Products = await res.json();
  return {
    props: { data },
    revalidate: 100,
  };
};

export default Page;

import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Product from "../../components/Product";
import Navbar from "./../../components/Navbar";
import { useState } from "react";
import Image from "next/image";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: Products = await res.json();

  const paths = data.map((product) => {
    return { params: { id: product.id.toString() } };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(`https://fakestoreapi.com/products/${context.params?.id || ""}`);
  const data: Product = await res.json();

  return {
    // Passed to the page component as props
    props: { data },
    revalidate: 100,
  };
};

export default function Post({ data }: InferGetStaticPropsType<GetStaticProps>) {
  const [imgRatio, setImgRatio] = useState(1 / 1);

  return (
    <>
      <Navbar redirectTo="/products" />
      <div className="text-center">
        <h1 className="text-3xl p-6 text-gray-800">{data.title}</h1>
        <Image height={"200px"} width={(200 * imgRatio).toString() + "px"} onLoadingComplete={({ naturalWidth, naturalHeight }) => setImgRatio(naturalWidth / naturalHeight)} src={data.image} alt="Product Image" />
        <h4 className="pt-6 text-2xl text-green-800 font-medium">${data.price}</h4>
        <h4 className="pb-6 text-2xl text-red-500">Amount left: {data.rating.count}</h4>
        <p className="text-lg text-gray-700 sm:mx-16">{data.description}</p>
      </div>
    </>
  );
}

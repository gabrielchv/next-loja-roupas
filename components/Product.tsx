import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Prop {
  title: string;
  description: string;
  image: string;
  id: string;
}

const Product: React.FC<Prop> = ({ title, description, image, id }: Prop) => {
  const [imgRatio, setImgRatio] = useState(1 / 1);

  return (
    <div className="p-4 bg-white rounded-2xl text-center relative">
      <h1 className="text-xl text-gray-800 font-semibold">{title}</h1>
      <div className="py-4">
        <Image height={"150px"} width={(150 * imgRatio).toString() + "px"} onLoadingComplete={({ naturalWidth, naturalHeight }) => setImgRatio(naturalWidth / naturalHeight)} src={image} alt="Product Image" />
      </div>
      <p className="text-sm text-gray-500 mb-[5rem]">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 w-[100%] p-4">
        <Link href={"/products/" + id}>
          <button className="bg-zinc-300 w-[100%] hover:bg-zinc-600 drop-shadow rounded-2xl p-3 mt-4 font-bold text-zinc-600 hover:text-zinc-300">Visit product</button>
        </Link>
      </div>
    </div>
  );
};

export default Product;

import Link from "next/link";

interface Prop {
  redirectTo: string;
}

export const Navbar = ({ redirectTo }: Prop) => {
  return (
    <>
      <nav className="p-4 w-[100vw] table-cell align-middle drop-shadow bg-white fixed z-50 top-0">
        <a className="ml-4 font-bold text-xl text-gray-600 hover:text-gray-700" href={redirectTo}>
          Gazerah Products
        </a>
      </nav>
      <div className="mb-[3.8rem]"></div>
    </>
  );
};

export default Navbar;

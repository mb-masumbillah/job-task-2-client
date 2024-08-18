import { IoIosStar, IoIosTime } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import logo from "/logo.png";
import useAuth from "../hook/useAuth";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { MdBrandingWatermark } from "react-icons/md";
import useProduct from "../hook/useProduct";

const Product = () => {
  const { logOut } = useAuth();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchName, setSearchName] = useState(null);
  const [sorting, setSorting] = useState(null);

  const { allProduct } = useProduct();

  const [categorys, setcategorys] = useState([]);
  const [category, setCategory] = useState(null);
  const [brands, setbrand] = useState([]);
  const [brand, setBrand] = useState(null);

  const [priceRange, setPriceRange] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const uniqueProducts = allProduct.reduce((acc, current) => {
      const x = acc.find((item) => item.category === current.category);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setcategorys(uniqueProducts);

    const uniqueProducts2 = allProduct.reduce((acc, current) => {
      const x = acc.find((item) => item.brand === current.brand);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setbrand(uniqueProducts2);

    setMinPrice(Number(priceRange[0]));
    setMaxPrice(Number(priceRange[2]));
  }, [allProduct, priceRange]);

  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(count / itemsPerPage);
  // console.log(numberOfPages);

  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    const d = async () => {
      if (searchName) {
        const res = await axios.get(
          `https://server-side-blond.vercel.app/allProduct/search?page=${currentPage}&size=${itemsPerPage}&name=${searchName}`
        );
        return setData(res.data);
      } else if (sorting) {
        const res = await axios.get(
          `https://server-side-blond.vercel.app/allProduct/sort?page=${currentPage}&size=${itemsPerPage}&sort=${sorting}`
        );
        return setData(res.data);
      } else if (brand && category && priceRange) {
        const res = await axios.get(
          `https://server-side-blond.vercel.app/allProduct/filter?page=${currentPage}&size=${itemsPerPage}&brand=${brand}&category=${category}&min=${minPrice}&max=${maxPrice}`
        );
        return setData(res.data);
      } else {
        const res = await axios.get(
          `https://server-side-blond.vercel.app/allProduct?page=${currentPage}&size=${itemsPerPage}`
        );
        return setData(res.data);
      }
    };
    d();
  }, [
    brand,
    category,
    currentPage,
    maxPrice,
    minPrice,
    priceRange,
    searchName,
    sorting,
  ]);

  useEffect(() => {
    fetch("https://server-side-blond.vercel.app/productsCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  const handleprevpage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const logout = () => {
    logOut();
  };

  const navlinks = (
    <div className="flex lg:flex-row flex-col gap-5 text-lg font-semibold">
      <NavLink>Home</NavLink>
      <NavLink>Shop</NavLink>
      <NavLink>Contact Us</NavLink>
      <NavLink>About</NavLink>
    </div>
  );

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <img src={logo} className="w-36" alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end gap-4">
          {/* search */}
          <div className="relative lg:flex w-full max-w-[19rem] hidden ">
            <input
              type="search"
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="search"
              className="w-full h-10 border-2 border-[#212121] px-5 pr-12 rounded-md outline-none"
            />
            <button className="!absolute right-[1px] top-[2px] rounded">
              <BiSearch className="text-3xl absolute rounded-md border p-1 border-[#212121] right-1 top-[3px]"></BiSearch>
            </button>
          </div>
          <button
            onClick={logout}
            className="btn bg-red-500 text-white font-semibold"
          >
            LogOut
          </button>
        </div>
      </div>

      <div className="lg:hidden flex gap-4 py-4">
        {/* sort ph */}
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1">
            Sorting
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
          >
            <div>
              <h2 className="text-red-500 text-xl font-bold pb-3">Sorting</h2>
              <select
                onChange={(e) => setSorting(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Sort
                </option>
                <option value="ass">Low to High</option>
                <option value="des">High to Low</option>
                <option value="date">Date : Newest first</option>
              </select>
            </div>
          </ul>
        </div>
        {/* search ph */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Search
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 -right-16 rounded-box z-[1] w-52 p-2 shadow"
          >
            <div className="relative flex w-full max-w-[19rem]">
              <input
                type="search"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="search"
                className="w-full h-10 border-2 border-[#212121] px-5 pr-12 rounded-md outline-none"
              />
              <button className="!absolute right-[1px] top-[2px] rounded">
                <BiSearch className="text-3xl absolute rounded-md border p-1 border-[#212121] right-1 top-[3px]"></BiSearch>
              </button>
            </div>
          </ul>
        </div>
        {/* category ph */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Category
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 rounded-box z-[1] w-52 -right-5 p-2 shadow"
          >
            
            <div className="pt-5">
              <h2 className="text-red-500 text-xl font-bold">Category</h2>
              <div className=" pt-4">
                <div className="flex gap-4 flex-col">
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Category
                    </option>
                    {categorys.map((f) => (
                      <option key={f._id} value={f.category}>
                        {f.category}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => setBrand(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Brand
                    </option>
                    {brands.map((f) => (
                      <option key={f._id} value={f.brand}>
                        {f.brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <select
                    onChange={(e) => setPriceRange(e.target.value.split(" "))}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Price Range
                    </option>
                    <option value="0 - 500">$0 - $500</option>
                    <option value="500 - 1000">$500 - $1000</option>
                    <option value="1000 - 1500">$1000 - $1500</option>
                    <option value="1500 - 2500">$1500 - $2500</option>
                    <option value="2500 - 3500">$2500 - $3500</option>
                    <option value="3500 - 5000">$3500 - $5000</option>
                    <option value="5000 - 7000">$5000 - $7000</option>
                    <option value="7000 - 10000">$7000 - $10000</option>
                  </select>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <div className="lg:flex justify-between py-5 flex-row-reverse items-end hidden">
        {/* sort lg*/}

        <div>
          <h2 className="text-red-500 text-xl font-bold pb-3">Sorting</h2>
          <select
            onChange={(e) => setSorting(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Sort
            </option>
            <option value="ass">Low to High</option>
            <option value="des">High to Low</option>
            <option value="date">Date : Newest first</option>
          </select>
        </div>

        {/* category lg */}

        <div className="border rounded-2xl p-5">
          <h2 className="text-red-500 text-xl font-bold">Category</h2>
          <div className="w-96 pt-4">
            <div className="flex gap-4">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Category
                </option>
                {categorys.map((f) => (
                  <option key={f._id} value={f.category}>
                    {f.category}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Brand
                </option>
                {brands.map((f) => (
                  <option key={f._id} value={f.brand}>
                    {f.brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <select
                onChange={(e) => setPriceRange(e.target.value.split(" "))}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Price Range
                </option>
                <option value="0 - 500">$0 - $500</option>
                <option value="500 - 1000">$500 - $1000</option>
                <option value="1000 - 1500">$1000 - $1500</option>
                <option value="1500 - 2500">$1500 - $2500</option>
                <option value="2500 - 3500">$2500 - $3500</option>
                <option value="3500 - 5000">$3500 - $5000</option>
                <option value="5000 - 7000">$5000 - $7000</option>
                <option value="7000 - 10000">$7000 - $10000</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((p) => (
          <div
            key={p._id}
            className="card bg-base-200 w-full shadow-xl border border-stone-800"
          >
            <figure>
              <img src={p.image} className="h-80 w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.description}</p>
              <p>${p.price}</p>
              <div className="card-actions">
                <div className="badge badge-outline">
                  <TbCategoryFilled /> {p.category}
                </div>
                <div className="badge badge-outline">
                  <MdBrandingWatermark /> {p.brand}
                </div>
                <div className="badge badge-outline">
                  {p.ratings} <IoIosStar />
                </div>
                <div className="badge badge-outline">
                  <IoIosTime /> {p.createdAt}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p>Current Page : {currentPage}</p>
        <button className="btn bg-red-500 text-white" onClick={handleprevpage}>
          prev
        </button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? "btn bg-[#FF9900]" : "btn"}
            onClick={() => {
              setCurrentPage(page);
            }}
            key={page}
          >
            {page}
          </button>
        ))}
        <button className="btn bg-red-500 text-white" onClick={handleNextPage}>
          next
        </button>
      </div>
    </>
  );
};

export default Product;

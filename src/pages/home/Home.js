import Slider from "../../components/slider/Slider";
import Product from "../../components/products/Product";
import { useEffect } from "react";

// import styles from "./Home.module.scss";
const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrolltoProduct = () => {
      if(url.includes('#products')){
        window.scrollTo({
          top:800,
          behavior:"smooth",
        })
      }
    }
    scrolltoProduct();
  },[url])

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;

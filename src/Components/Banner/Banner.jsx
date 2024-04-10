import laptop from "../Images/laptop.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <section className="bg-[#0a4abf] text-white p-20 mt-10 sm:p-8 md:p-36 flex flex-col sm:flex-row items-center justify-center">
      <div className="mx-3 text-center sm:text-left sm:w-1/2">
        <h1
          data-aos="zoom-out"
          data-aos-duration="500"
          data-aos-once="true"
          className="text-lg sm:text-3xl md:text-5xl font-bold"
        >
          Discover Exciting <br />
          <span
            data-aos="zoom-out"
            data-aos-duration="500"
            data-aos-once="true"
            className="text-sm sm:text-2xl md:text-4xl text-yellow-300"
          >
            New Products
          </span>
        </h1>
        <p
          data-aos="zoom-out"
          data-aos-duration="500"
          data-aos-once="true"
          className="mt-2 md:mt-8"
        >
          Explore our latest arrivals and find something special for you!
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center mt-4 sm:mt-0">
        <img
          data-aos="zoom-in"
          data-aos-once="true"
          className="max-w-full h-auto mt-4"
          src={laptop}
          alt=""
        />
      </div>
    </section>
  );
}

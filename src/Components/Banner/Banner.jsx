import laptop from "../Images/laptop.png";

export default function Banner() {
  return (
    <section className="bg-indigo-600 to-transparent text-white p-36 flex items-center justify-center">
      <div className="mx-9 text-center">
        <h1 className="text-5xl font-bold">
          Discover Exciting <br />
          <span className="text-4xl text-indigo-300">New Products</span>
        </h1>
        <p className="mt-4">
          Explore our latest arrivals and find something special for you!
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center ">
        <img className="" src={laptop} alt="" />
      </div>
    </section>
  );
}

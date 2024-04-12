import success from "../Images/success.png";
export default function Success() {
  return (
    <div className="grid place-items-center w-full h-screen">
      <div className="max-w-5xl rounded flex flex-col items-center">
        <span className="text-green-500 text-5xl">Payment Successful</span>
        <span className="text-green-500 text-center mt-8 text-2xl font-bold">
          Your order has been placed
        </span>
        <div className="flex justify-center items-center mx-auto my-24">
          <img src={success} alt="Success" className="w-60" />
        </div>
        <a href="/" className="text-blue-500 hover:underline">
          Navigate back to the homepage
        </a>
      </div>
    </div>
  );
}

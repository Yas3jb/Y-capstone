import cancel from "../Images/cancel.png";
export default function Cancel() {
  return (
    <div className="grid place-items-center w-full h-screen">
      <div className="max-w-5xl rounded flex flex-col items-center">
        <span className="text-red-500 text-center text-4xl">
          Something went wrong!
        </span>
        <span className="text-red-500 text-center mt-8 text-2xl font-bold">
          Please try again later
        </span>
        <div className="flex justify-center items-center mx-auto my-24">
          <img src={cancel} alt="Success" className="w-60" />
        </div>
        <a href="/" className="text-blue-500 hover:underline">
          Navigate back to the homepage
        </a>
      </div>
    </div>
  );
}

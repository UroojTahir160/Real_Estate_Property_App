import logo from "../../assets/logo.png";

export const Navbar = () => {
  return (
    <div className="flex h-16 items-center px-4">
      <nav className="flex items-center  fixed top-0 left-0 right-0 p-4 shadow-md z-50 bg-orange-200 w-full justify-between border-b">
        <div className=" flex space-x-2 lg:space-x-4  items-center">
          <img src={logo} alt="gallery-icon" className="h-[40px] w-[40px]" />
          <h1 className="font-Lora text-2xl font-semibold text-cyan-700">
            Real Estate Property
          </h1>
        </div>
      </nav>
    </div>
  );
};

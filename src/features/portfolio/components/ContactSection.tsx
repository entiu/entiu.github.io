import { FaAt, FaLinkedinIn } from "react-icons/fa6";
import { IoIdCard } from "react-icons/io5";

export const ContactSection = () => {
  return (
    <div className="text-4xl text-black pb-6">
      <div className="flex justify-center items-center  gap-6">
        <a
          className="hover:text-amber-600 hover:scale-110 transition-all"
          href="mailto:laurentiu.cel.toader@gmail.com"
          target="_blank">
          <FaAt />
        </a>
        <a
          className="hover:text-amber-600 hover:scale-110 transition-all"
          href="/CV.pdf"
          target="_blank">
          <IoIdCard />
        </a>
        <a
          className="hover:text-amber-600 hover:scale-110 transition-all"
          href="https://www.linkedin.com/in/laurentiu-cel-toader/"
          target="_blank">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

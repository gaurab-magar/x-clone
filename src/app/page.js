import Feed from "./Components/Feed";
import Input from "./Components/Input";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/' className="flex items-center justify-center md:hidden">
            <FaXTwitter className='w-16 h-16 hover:bg-gray-100 cursor-pointer p-3 rounded-full transition-all duration-200' />
        </Link>
      <Input />
      <Feed />
    </div>
  );
}

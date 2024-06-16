import { app } from "@/Firebase";
import Comments from "@/app/Components/Comments";
import Post from "@/app/Components/Post";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi"; 

export default async function post({params}){

  const db = getFirestore(app)
  let data = {};
  const quarySnapshot = await getDoc(doc(db,'posts',params.id));

  data = {
    ...quarySnapshot.data(),
    id:quarySnapshot.id
  }
  return(
    <div className="max-w-xl mx-auto border-l border-r min-h-screen">
      <div className="flex items-center space-x-2 p-2 sticky top-0 z-50 bg-slate-300 border-gray-300 border-b">
        <Link href={'/'} className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <Post post={data} id={data.id} />
      <Comments id={params.id} />
    </div>
  )
}

import React from "react";
import { useRouter } from "next/router.js";
import { useSession, signIn, signOut } from "next-auth/react";
const login = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    const emailId = session?.user?.email;
    router.push(`/temp`);
  } else {
    return (
      <div className="w-full justify-center flex items-center h-screen">
        <button 
          className="flex justify-center items-center text-6xl border-white border-2 p-5 rounded-lg hover:scale-[1.05] duration-300"
          onClick={() => signIn()}
        >
          LOGIN TO DOCIN
        </button>
      </div>
    );
  }
};

export default login;

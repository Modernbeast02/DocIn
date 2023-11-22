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
      <div className="bg-cover h-screen w-full flex justify-center items-center bg-gradient-to-r from-[#f59292] to-[#ffb88c]">
        <div className="flex justify-center items-center w-[900px] h-[500px] bg-white rounded-xl">
          <div className="flex flex-col w-full h-screen items-center justify-center">
              <div className="px-20 py-4 flex flex-col justify-centerv items-center space-y-4">
                  <h1 className="text-6xl font-semibold text-black uppercase">
                    DOC IN
                  </h1>
                  <div className="text-black text-2xl font-medium">Unlock the door to seamless document management with DocIn!!</div>
                
               </div>
                <div className="flex justify-center items-center mt-8">
                  <button onClick={() => signIn()} className="text-white py-3 px-8 flex justify-center items-center rounded-md border-2 bg-gradient-to-r from-[#ff512f] to-[#dd2476] hover:from-pink-500 hover:to-yellow-500 font-bold hover:scale-[1.05] duration-300">
                    Login in With Google
                  </button>
                </div>
          </div>
        </div>
      </div>
    );
  }
};

export default login;

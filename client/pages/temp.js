import React, { useState, useEffect } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { Checkbox } from "@mui/material";

export default function Fashion() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [inputState, setInputstate] = useState(false);
  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  function handelSubmit() {
    const formData = new FormData();
    formData.append("file", file);
    const response = axios
      .post("http://127.0.0.1:5000/getClass", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  function handleYes(){
    // Store the document for the user and redirect to user document page
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", "sampleEmail");  // Replace "sampleEmail" with the actual user ID

    const response = axios.post("http://127.0.0.1:5000/storeDoc", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
      // redirect to userPage to see all the docments
  }

  function handleNo(){
    //  do not store the document , send alert to admin for manual review
    const formData = new FormData();
    formData.append("userId", "SampleEmail2");
    const response = axios
      .post("http://127.0.0.1:5000/manualReview", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });

  }

  return mounted ? (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-end m-5 mr-10">
        <button className="flex items-center text-xl border-white border-2 p-2 rounded-lg hover:scale-[1.05] duration-300" onClick={() => {signOut({ callbackUrl: "/login" })}}>Logout</button>
      </div>
      <div>
        <h1 className="flex items-center justify-center font-extrabold text-5xl mb-11">
          {" "}
          Document Verification
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div class="flex items-center justify-center w-9/12">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              {!inputState ? (
                <div>
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setInputstate(true);
                    }}
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                  />
                </div>
              ) : (
                <div>Uploaded</div>
              )}
            </label>
          </div>
          <button
            type="button"
            class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handelSubmit()}
          >
            Submit
          </button>
        </div>
      </div>


      {data ? (
        <div>
          <h1 className="text-5xl font-extrabold justify-center items-center mt-5">
            Predicted Class : {data}
          </h1>
          <div className="grid grid-cols-3 gap-4 mt-10"></div>
          <div>
            Is Prediction Correct or Not?
            <button onClick={()=>handleYes()}>
              Yes
            </button>
            <button onClick={()=>handleNo()}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
    


  ) : (
    <div>Loading</div>
  );
}

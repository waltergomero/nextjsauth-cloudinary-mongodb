'use client';
import React from 'react'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Compressor from "compressorjs";

const UploadPage = () => {
  const router = useRouter();
  const [imageExtension, setImageExtension] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [ddCategorylist, setDDCategoryList] = useState(null);
  const [selCategoryValue, setSelCategoryValue] = useState("");
  const [selCategoryName, setSelCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const ddlData = await response.json()

    setDDCategoryList(ddlData);

  };
  fetchCategories();

}, []);

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    const ext = image.name.substr(image.name.lastIndexOf(".") + 1);

    setImageExtension(ext);

    new Compressor(image, {
      quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
      maxWidth: 1290,
      maxHeight: 1290,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
      },
    });
  };

  const handleSubmit = async (data) => {
    const userid = localStorage.getItem("user_id");
    const email = localStorage.getItem("user_email");
    if (compressedFile != null) {
      const formdata = new FormData();
      formdata.append("user_id", userid);
      formdata.append("email", email);
      formdata.append("category_id", selCategoryValue);
      formdata.append("category_name", selCategoryName);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("image", compressedFile);
      formdata.append("extension", imageExtension);
      formdata.append("upload_preset", "gallery")

      console.log(formdata)

      for (const value of formdata.values()) {
        console.log(value);
      }

      //axios.post("/api/admin/gallery/add", formdata);

    //   alertService.success("Images were added successfully.", {
    //     keepAfterRouteChange: true,
    //   });
    //   return router.push("/admin/gallery");
    // } else {
    //   setErrorMessage(true);

    }
  }

  const removeSelectedImage = () => {
    setCompressedFile();

  };

  const handleCategoryChange = (e) => {
    setSelCategoryName(e.target.options[e.target.selectedIndex].text);
    setSelCategoryValue(e.target.value);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <section className='flex h-full flex-col items-center mt-10'>
      <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
      <h2 className='text-lg leading-tight font-medium mt-2'>
        <span className='blue_gradient'>Upload Images</span>
      </h2> 
      <form onSubmit={handleSubmit}>
              <div>
                <input type="file" id='input_file' required onChange={handleCompressedUpload} />
              </div>
              <div>
                <input
                  name="title"
                  maxLength="48"
                  type="text"
                  required
                  placeholder="Title"
                  className="w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <select
                  name="_id"
                  placeholder="Select a category"
                  required
                  className="px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleCategoryChange}
                  value={selCategoryValue}
                >
                  <option value="">Select a category</option>
                  {ddCategorylist &&
                    ddCategorylist.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.category_name}
                      </option>
                    ))}
                </select>
              </div>

              {compressedFile && (
                <>
                  <div className="flex justify-center mt-4 p-2 rounded-lg border border-gray-200">
                    <img
                      className="h-72 rounded-lg"
                      src={URL.createObjectURL(compressedFile)}
                      alt="uploaded Images"
                    />
                  </div>
                  <div>
                    <button
                      onClick={removeSelectedImage}
                      className={`w-full px-1 py-1 mb-2 text-white text-xs rounded-md bg-red-500`}
                    >
                      Remove this image
                    </button>
                    <textarea
                      name="description"
                      placeholder="Description"
                      rows={2}
                      cols={5}
                      maxLength="48"
                      className="w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </>
              )}
              <div className="px-4 py-1 text-right sm:px-6">
                <button
                  id="cancel"
                  onClick={handleCancel}
                  className="px-6  text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <span>&nbsp; </span>
                <button
                  className="px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
      </div>
    </section>

  )
}

export default UploadPage

/*
for (let i = 0; i < imageInputRef.current.files.length; i++){
        const file = imageInputRef.current.files[i];
  
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "c_tags");
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API}`, {
          method: "POST",
          body: data,
        });
*/
//https://www.mridul.tech/blogs/how-to-upload-images-to-cloudinary-with-react-js

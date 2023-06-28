'use client'

import { useState, useEffect } from 'react';
import Compressor from "compressorjs";
import { alertService } from '@/services/alert.service';

const UploadPage = () => {

    const [compressedFile, setCompressedFile] = useState(null);
    const [ddCategorylist, setDDCategoryList] = useState(null);
    const [imageInformation, setImageInformation] = useState(
        { title: "", category_name: "", category_id: "", description: "", image_name:"", url:"", user_id:"", email:"" });

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
        new Compressor(image, {
          quality: 0.9, // 0.6 can also be used, but its not recommended to go below.
          maxWidth: 1290,
          maxHeight: 1290,
          success: (compressedResult) => {
            setCompressedFile(compressedResult);
          },
        });


      };

    // const handleCategoryChange = (e) => {
    //     setSelCategoryName(e.target.options[e.target.selectedIndex].text);
    //     setSelCategoryValue(e.target.value);
    // };

    const removeSelectedImage = () => {
        setCompressedFile();
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userid = localStorage.getItem("user_id");
        const useremail = localStorage.getItem("user_email");
        if (compressedFile != null) {
          const formdata = new FormData();
          formdata.append('file', compressedFile);
          formdata.append("upload_preset", "gallery")
          const data = await fetch('https://api.cloudinary.com/v1_1/wgomero-dev/image/upload', {
                        method: 'POST',
                        body: formdata
                }).then(r => r.json());
                console.log("returned data url: ", data)

          setImageInformation({...imageInformation, user_id: userid, email: useremail, url: data.url, image_name: data.public_id});
          console.log("passing data: ", imageInformation);
           await fetch("/api/admin/gallery/new", { method: "POST",  body: JSON.stringify({ imageInformation }), })
          // .then((response) => response.json())
          // .then(data => {
          //   if(data.error){
          //     alertService.error(data.error);
          //     }
          //   else{  
          //     router.push("/pages/admin/categories")
          //   }
          //   })
          // .catch(error => alertService.error(error.message))
        }
      };


  return (
    <section className='flex h-full flex-col items-center mt-10'>
    <div className="columns-sm px-8 py-2 text-left bg-white shadow-lg rounded-md border border-gray-200 ">
    <h2 className='text-lg leading-tight font-medium mt-2'>
      <span className='blue_gradient'>Upload Images</span>
    </h2> 
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" required onChange={handleCompressedUpload} />
        <input
            name="title"
            maxLength="48"
            type="text"
            onChange={(e) => setImageInformation({ ...imageInformation, title: e.target.value })}
            required
            placeholder="Title"
            className="w-full px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
        <select
            name="_id"
            placeholder="Select a category"
            required
            className="px-4 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            onChange={(e) => setImageInformation({ ...imageInformation, category_id: e.target.value, category_name: e.target.options[e.target.selectedIndex].text})}
            value={imageInformation.category_id}
             >
            <option value="">Select a category</option>
                {ddCategorylist &&
                  ddCategorylist.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.category_name}
            </option>
                  ))}
        </select>
        {compressedFile && (
        <>
            <div className="flex justify-center mt-2 p-2 rounded-lg border border-gray-200">
                <img
                    className="h-96 rounded-lg "
                    src={URL.createObjectURL(compressedFile)}
                    alt="uploaded Images"
                  />
            </div>
            <div className='flex justify-center'>
                <button
                    onClick={removeSelectedImage}
                    className="w-64 justify-center py-1 mt-1 mb-1 text-white text-xs rounded-md bg-red-500"
                  >
                    Remove this image
                </button>
            </div>
            <div>
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setImageInformation({ ...imageInformation, description: e.target.value })}
                    rows={2}
                    cols={5}
                    maxLength="48"
                    className="w-full px-1 py-1 mt-2 mb-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />                  
            </div>
        </>
        
        )}
      </div>
      <button type="submit">Upload</button>
    </form>
    </div>
    </section>
  )
}

export default UploadPage
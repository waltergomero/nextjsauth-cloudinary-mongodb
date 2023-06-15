import React from 'react'

const UploadPage = () => {
  return (
    <div>Upload Page</div>
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

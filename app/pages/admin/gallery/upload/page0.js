"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '../uploadForm';
import { alertService } from "@/services/alert.service";


  const UploadPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [ddCategorylist, setDDCategoryList] = useState(null);

  const [submitting, setIsSubmitting] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const ddlData = await response.json()

    setDDCategoryList(ddlData);

  };
  fetchCategories();

}, []);

const UploadImageHandler = async (e)=>{}
;
//   const createCategory = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     await fetch("/api/admin/categories/new", {method: "POST", body: JSON.stringify({ category}),})
//     .then((response) => response.json())
//     .then(data => {
//       if(data.error){
//         alertService.error(data.error);
//         }
//       else{
//         router.push("/pages/admin/categories")
//       }
//       })
//     .catch(error => alertService.error(error.message))
//     };



  return (
    <Form
      type='Upload'
      ddCategorylist={ddCategorylist}
      setImageData={setImageData}
      submitting={submitting}
      handleSubmit={UploadImageHandler}
    />
  );
};

export default UploadPage;

import db from '@/utils/db';
import Gallery from '@/models/gallery';


export const POST = async (request, response) => {
    const req = await request.json();
    try {
      await db.connect();
  
      const newImage = new Gallery({
        image_name: req.formdataDB.image_name,
        category_id: req.formdataDB.category_id,
        category_name: req.formdataDB.category_name,
        user_id: req.formdataDB.user_id,
        email: req.formdataDB.email,
        description: req.formdataDB.description,
        islandscape: islandscape,
        title: req.formdataDB.title,
        width: width,
        height: height,
        url: req.formdataDB.url
      });
      await newImage.save();       
      await db.disconnect();
      return  new Response(JSON.stringify({sucess: "Image was successfully added."}), { status: 201 });
      
          
        }
        catch(err){
          return  new Response(JSON.stringify({error: err}), { status: 500 });  
        }
  };

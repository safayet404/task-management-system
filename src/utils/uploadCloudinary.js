import axios from "axios";

export const uploadCloudinary = async (file) => {
    const formData = new FormData()

    formData.append("file",file)
    formData.append("upload_preset", "pp-file-upload");
    const {data} = await axios.post("https://api.cloudinary.com/v1_1/dkpnpkwur/image/upload",formData)
    console.log(data);
    
    return {publicId : data?.public_id , url : data?.secure_url}
}
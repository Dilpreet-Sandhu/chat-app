import {v2 as cloudinary} from 'cloudinary';
import {ApiError} from './apiHanlder.js';
import fs from 'fs'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME || "dofbmh6sw",
    api_key  : process.env.CLOUDINARY_API_KEY || "591147192118157",
    api_secret  :process.env.CLOUDINARY_API_SECRET  || "-4TiRTkHqoq5g_F63b4AYGaDEAM"
})


export async function uploadToCloudinary(filepath) {

    const upload = await cloudinary.uploader.upload(filepath,{
        resource_type : 'auto'
    })

    try {
        
        if (!upload) {
            throw new ApiError(400,"error while uploading file")
        }

        fs.unlink(filepath,(err) => {if (err) console.log(err)})
        return upload

    } catch (error) {
        fs.unlink(filepath)
        console.log(error)
    }

}


export async function deleteFromCloudinary(url) {
    try {
        const slashArr = url.split('/');
        const lastSlashElement = slashArr.at(-1);
        const dotArr = lastSlashElement.split('.');
        const publicId = dotArr[0];

        await cloudinary.uploader.destroy(publicId);



    } catch (error) {
        console.log(error)
    }
}
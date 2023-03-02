const cloud = require("cloudinary").v2
require("dotenv").config()

cloud.config({
    cloud_name:'djfuaborr',
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
})

const uplodImage = async(imagePath)=>{
    const options = {
        use_filename:false,
        unique_filename: false,
        overwrite:true
    }

    try {
        const result = await cloud.uploader.upload(imagePath, options)
        console.log(result.public_id);
        return(result.public_id)
    } catch (error) {
        console.log(error);
    }
}

const getimg = async(publicId)=>{
    const options = {
        colors: true
    }

    try {
        const result = await cloud.api.resource(publicId, options)
        return(result)
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {cloud, uplodImage, getimg}
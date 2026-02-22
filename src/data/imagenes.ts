import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string): Promise<string> => {
    const result : UploadApiResponse = await cloudinary.uploader.upload(filePath, {
        folder: "news_images",
        use_filename: true,
        unique_filename: false,
    });
    return result.secure_url;
}
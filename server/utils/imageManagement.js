import { v2 as cloudinary } from "cloudinary";

//imageUpload should receive a 3rd parameter : publicId , that information has to come in the request, and refers to the publicId of the picture you want to delete when updating.
//to do that, when you create a book, you could add a new field to the books model which is publicId, and send it in the response you get when creating a book 
const imageUpload = async (file, folder) => {

    if (file) {
        try {
            const result = await cloudinary.uploader.upload(file.path, { folder: folder });
            console.log(result);

            //this function has to receive the variable publicId , that it has a value similar to publicId="user_books/zsdkmsxdfjsadfkl"
            // cloudinary.uploader
            //     .destroy(publicId)
            //     .then(result => console.log("result deleting", result));
            return result.secure_url;

        } catch (e) {
            console.log(e);
            return undefined
        }
    } else {
        return undefined
    }
}

export { imageUpload };
const ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const MAX_SIZE_MB = 20; // 20 MB
async function uploadFile(file, fileName) {
    try {
        
        if(Buffer.isBuffer(file)) {
            const fileSizeMb = file.length / (1024 * 1024);
            if (fileSizeMb > MAX_SIZE_MB) {
                throw new Error(`File size exceeds ${MAX_SIZE_MB}MB.`);
            }
        }

        if(typeof file === 'string') {
            const base64str = file.split(",")[1];
            const fileSizeMb = Buffer.byteLength(base64str, 'base64') / (1024 * 1024);
            if(fileSizeMb > MAX_SIZE_MB) {
                throw new Error(`File size exceeds ${MAX_SIZE_MB}MB.`);
            }
        }

        const result = await imagekit.upload({
            file: file, //required
            fileName: fileName, //required
        });
         return result;

    } catch (error) {
        console.error("Error uploading file:", error.message);
        throw error;
    }

}

module.exports = {
    uploadFile
}
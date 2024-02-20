const { accessKeyId, secretAccessKey, region, bucket } = require('../Configs/aws.config');
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { logError, logInfo } = require("../Utils/logger");

const client = new S3Client({
    region: region, credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
// config endpoint access S3: tuong lai
async function UploadS3(stream, key) {

    try {
        const upload = new Upload({
            client,
            params: {
                Bucket: bucket,
                Key: key,
                Body: stream,
            },
            tags: [
                /*...*/
            ], // optional tags
            queueSize: 4, // optional concurrency configuration
            partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
            leavePartsOnError: false, // optional manually handle dropped parts
        });
        upload.on("httpUploadProgress", (progress) => {
            logInfo(new Date(), "progress", progress, "uploading to s3");
        });

        await upload.done();
        logInfo(new Date(), "success", "", "uploading to s3");
        return true;
    } catch (error) {
        logError(new Date(), error, "uploading to s3");
        return false;
    }
}

function GetSignedUrl(key) {

    return new Promise((resolve, reject) => {
        const getObjectParams = {
            Bucket: bucket,
            Key: key
        };

        const command = new GetObjectCommand(getObjectParams);

        getSignedUrl(client, command, { expiresIn: 60 * 30 }).then((url) => {
            resolve(url);
        }).catch((err) => {
            reject(err);
        });
    });

}

module.exports = { UploadS3, GetSignedUrl };    
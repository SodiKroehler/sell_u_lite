import { S3Client } from "@aws-sdk/client-s3";
// Create an Amazon S3 service client object.
const flamClient = new S3Client({ 
    region: process.env.APP_AWS_REGION, 
    credentials: {
        accessKeyId: process.env.APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    }

});
export { flamClient };
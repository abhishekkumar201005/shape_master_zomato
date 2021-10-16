import AWS from "aws-sdk";
require("dotenv").config();
// AWS s3 bucket config
const s3Bucket = new AWS.S3({
  apiVersion: "latest", //to remove aws error
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: "ap-south-1",
});

export const s3Upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    })
  );
};

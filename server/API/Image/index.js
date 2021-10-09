import express from "express";
import multer from "multer";
import passport from "passport";
import AWS from "aws-sdk";
//Database model
import { ImageModel } from "../../database/allModel";

//Utilities
import { s3Upload } from "../../Utils/s3";

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

//AWS S3 bucket config

/*
Route            /
Des              Uploading image to S3 bucket , and then save  file to mongodb
Params           None
Access           Public
Method           GET
*/

Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    //S3 bucket options
    const bucketOptions = {
      Bucket: "shapeaijunebatch2021",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions);
    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;

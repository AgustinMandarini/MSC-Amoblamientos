// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(publicId, options);
    // console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image
// focused on the faces, applying an outline of the
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

const cloudUploadImage = async (imagePath) => {
  // Upload the image
  const secureUrl = await uploadImage(imagePath);

  // Log the image tag to the console
  return secureUrl;
};

module.exports = { cloudUploadImage };
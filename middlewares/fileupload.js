import multer from 'multer'
import path from 'path'
import fs from 'fs'


const storage = multer.diskStorage({
    //destination of file being uploaded
  destination: (req, file, cb) => {
     const imageDir = 'uploads'
    // Ensure the folder exists, create it if it doesn't
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }
    //otherwise, save the file in the folder
    cb(null, imageDir)
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  },
});

//check if file being uploaded is an image file
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept the file
  } else {
    cb(new Error("Only image files are allowed!"), false); // reject file
  }
}

const upload = multer({storage, fileFilter})

export default upload
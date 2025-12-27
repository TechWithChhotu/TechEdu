// import path from "path";

import multer, { diskStorage } from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for storing uploads
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // Limit file size to 200 MB
  fileFilter: function (_req, file, cb) {
    // Define file filter (allow only specific file types)
    const allowedFileTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Supported types: JPEG, PNG, MP4."),
        false
      );
    }
  },
});

export default upload;

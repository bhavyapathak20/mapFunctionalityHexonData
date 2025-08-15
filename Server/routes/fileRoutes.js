// Server/routes/fileRoutes.js
import express from "express";
import multer from "multer";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { handleZipUpload } from "../controllers/fileController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authenticateJWT, upload.single("file"), handleZipUpload);

export default router;

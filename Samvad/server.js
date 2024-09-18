const express = require("express");
const multer = require("multer");
const { createWorker } = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
const upload = multer({ dest: "uploads/" });

app.post("/ocr", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const worker = await createWorker("guj");

  try {
    const {
      data: { text },
    } = await worker.recognize(req.file.path);
    await worker.terminate();

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ text });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ error: "OCR processing failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

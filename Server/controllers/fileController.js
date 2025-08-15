import AdmZip from "adm-zip";
import { insertLocation } from "../models/locationModel.js";

// Accepts a ZIP, finds a single .txt (nested is fine), parses lines:
//   name,longitude,latitude
// and inserts using insertLocation(userId, name, longitude, latitude)
export async function handleZipUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read zip from memory (multer.memoryStorage)
    const zip = new AdmZip(req.file.buffer);
    const entries = zip.getEntries();

    // find .txt anywhere in the zip (ignore directories)
    const txtEntries = entries.filter(
      (e) => !e.isDirectory && e.entryName.toLowerCase().endsWith(".txt")
    );

    if (txtEntries.length !== 1) {
      return res
        .status(400)
        .json({ message: "ZIP must contain exactly one .txt file" });
    }

    const content = txtEntries[0]
      .getData()
      .toString("utf-8")
      .replace(/\r/g, "")
      .trim();

    // split into non-empty trimmed lines
    const lines = content
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return res.status(400).json({ message: "TXT is empty" });
    }

    // if the first line isn’t numeric for lon/lat, treat it as a header
    const maybeHeader = lines[0].split(",").map((s) => s.trim());
    if (
      maybeHeader.length >= 3 &&
      (isNaN(Number(maybeHeader[1])) || isNaN(Number(maybeHeader[2])))
    ) {
      lines.shift();
    }

    let inserted = 0;
    for (const line of lines) {
      const parts = line.split(",").map((s) => s.trim());
      if (parts.length < 3) continue;

      const [name, lonStr, latStr] = parts; // your file is name,longitude,latitude
      const longitude = Number(lonStr);
      const latitude = Number(latStr);

      if (
        !name ||
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude) ||
        longitude < -180 ||
        longitude > 180 ||
        latitude < -90 ||
        latitude > 90
      ) {
        continue; // skip bad rows
      }

      // authenticateJWT sets req.userId
      await insertLocation(req.userId, name, longitude, latitude);
      inserted++;
    }

    if (inserted === 0) {
      return res
        .status(400)
        .json({ message: "No valid rows to insert in TXT" });
    }

    return res
      .status(201)
      .json({ message: `Locations added successfully: ${inserted}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

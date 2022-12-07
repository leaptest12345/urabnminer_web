import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const KNOWN_ASSET_TYPES = [
  // images
  "png",
  "jpe?g",
  "jfif",
  "pjpeg",
  "pjp",
  "gif",
  "svg",
  "ico",
  "webp",
  "avif",

  // media
  "mp4",
  "webm",
  "ogg",
  "mp3",
  "wav",
  "flac",
  "aac",

  // fonts
  "woff2?",
  "eot",
  "ttf",
  "otf",

  // other
  "webmanifest",
  "pdf",
  "txt",
];

const DEFAULT_ASSETS_RE = new RegExp(
  `\\.(` + KNOWN_ASSET_TYPES.join("|") + `)(\\?.*)?$`
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/urabnminer_web/",
  // assetsInclude: DEFAULT_ASSETS_RE,
});

"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireUser, audit } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PUBLIC_PREFIX = "/uploads";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export interface UploadResult {
  url?: string;
  error?: string;
}

/**
 * Stores an uploaded image in `public/uploads` and returns its public URL.
 * In production prefer the S3-compatible provider configured via STORAGE_*;
 * this local fallback keeps the CMS fully functional in dev.
 */
export async function uploadImage(file: File): Promise<UploadResult> {
  const user = await requireUser();

  if (!file || file.size === 0) {
    return { error: "No file was provided." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "The image is too large (5 MB maximum)." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Unsupported file type. Use JPG, PNG, WebP, GIF or SVG." };
  }

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = `${randomUUID()}${EXTENSION_BY_TYPE[file.type]}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    const url = `${PUBLIC_PREFIX}/${filename}`;
    await audit(user.id, "image:upload", "image", filename, {
      size: file.size,
      type: file.type,
    });
    return { url };
  } catch {
    return { error: "The upload failed. Please try again." };
  }
}

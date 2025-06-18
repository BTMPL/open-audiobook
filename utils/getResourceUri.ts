import * as FileSystem from "expo-file-system";

export function getResourceUri(fileName: string): string {
  if (fileName.startsWith("file://")) {
    console.warn('Found a broken URL, please fix it: "' + fileName + '"');
    /**
     * Support old file name patterns
     */
    const path = fileName.split("/").slice(-2).join("/");
    return FileSystem.documentDirectory + path;
  }
  if (fileName.startsWith("http")) {
    /**
     * Handle remote URLs
     */
    return fileName;
  }
  return FileSystem.documentDirectory + fileName;
}

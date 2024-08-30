import path from "path";
import getFileExtension from "@/utils/getFileExtension";

const getFileName = (contentDisposition: string | undefined, pathname: string, contentType: string): string => {
    const fileNameMatch = contentDisposition?.match(/filename="?([^"]*)"?/);
    if (fileNameMatch && fileNameMatch[1]) {
        return fileNameMatch[1];
    }

    const urlExtension = path.extname(pathname);
    if (urlExtension) {
        return path.basename(pathname);
    }

    const extension = getFileExtension(contentType);
    return path.basename(pathname, urlExtension) + extension;
};

export default getFileName;
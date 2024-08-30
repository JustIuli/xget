import extMap from "@/extMap";

const getFileExtensionFromContentType = (contentType: string): string => {

    const cleanContentType = contentType.split(';')[0].trim();
    return extMap[cleanContentType] || '.bin';
};

export default getFileExtensionFromContentType;
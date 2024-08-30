const extMap: Record<string, string> = {
    // Application types
    'application/zip': '.zip',
    'application/x-tar': '.tar',
    'application/gzip': '.gz',
    'application/x-gtar': '.tar',
    'application/x-rar-compressed': '.rar',
    'application/x-7z-compressed': '.7z',
    'application/pdf': '.pdf',
    'application/json': '.json',
    'application/xml': '.xml',
    'application/epub+zip': '.epub',
    'application/x-msdownload': '.exe',
    'application/x-shockwave-flash': '.swf',
    'application/vnd.ms-office': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',

    // Image types
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
    'image/bmp': '.bmp',
    'image/tiff': '.tiff',

    // Text types
    'text/plain': '.txt',
    'text/html': '.html',
    'text/css': '.css',
    'text/javascript': '.js',
    'text/csv': '.csv',
    'text/markdown': '.md',

    // Audio types
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'audio/ogg': '.ogg',

    // Video types
    'video/mp4': '.mp4',
    'video/x-matroska': '.mkv',
    'video/x-msvideo': '.avi',
    'video/x-flv': '.flv',
    'video/webm': '.webm',

    // Font types
    'application/x-font-ttf': '.ttf',
    'application/x-font-otf': '.otf',
    'font/woff': '.woff',
    'font/woff2': '.woff2',
};

export default extMap;
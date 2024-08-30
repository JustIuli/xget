import http from "http";
import url from "url";

const getResponseHeaders = (response: http.IncomingMessage) => {
    const contentType = response.headers['content-type'] || '';
    const contentDisposition = response.headers['content-disposition'] || ''

    return {contentType , contentDisposition};
}

export default getResponseHeaders;


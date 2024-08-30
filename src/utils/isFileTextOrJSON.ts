const isFileTextOrJSON = (contentType:string) => {
    return !contentType.includes('application/json') && !contentType.includes('text/plain')
}

export default isFileTextOrJSON
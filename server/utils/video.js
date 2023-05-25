//PROCESMOS LA IMAGEN DE AVATAR:
const getFilePath = (file) => { 

    const filePath = file.path;
    const fileSplit = filePath.split('/');

    if (file.size === 0) {
        return `${fileSplit[1]}/default.png`;
    }else{
        return `${fileSplit[1]}/${fileSplit[2]}`;
    }
    
}

module.exports = {
    getFilePath
};
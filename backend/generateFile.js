const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes"); // dir name gives root directory name
if (!fs.existsSync(dirCodes)) {
 fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = (language, code) => {

    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes,filename);
    fs.writeFileSync(filePath,code);
    return filePath;
};

exports = module.exports = generateFile;

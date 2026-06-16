const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, input = "") => {  // ✅ added input parameter
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    const process = exec(  // ✅ store exec in variable so we can access stdin
      `g++ "${filePath}" -o "${outPath}" && "${outPath}"`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
          return;
        }
        if (stderr) {
          reject({ stderr });
          return;
        }
        resolve(stdout);
      }
    );

    // ✅ write input to program's stdin
    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
};

module.exports = executeCpp;
const express = require("express");
const cors = require("cors");
const generateFile = require("./generateFile");
const executeCpp = require("./executeCpp");

const app = express();

// middleware
app.use(cors());                                
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hellow");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input = "" } = req.body; 

  if (code === undefined) {
    return res.status(400).json({ error: "code is required holaaa??" });
  }
  try {
    const filePath = generateFile(language, code);
    const output = await executeCpp(filePath, input);  // ✅ passing input
    res.json({ filePath, output });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("server running on 5000 port");
});
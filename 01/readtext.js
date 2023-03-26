const path = require('path');
const fs = require('fs').promises;

const readText = async () => {
  try {
    /* const pathToFile = path.join('files', 'text.txt');
        console.log(pathToFile);

        const data = await fs.readFile(pathToFile, 'utf-8');

        const text = data.toString();
        console.log(text); */

    const dir = 'files';
    /* const filesInDir = await fs.readdir(dir)
        // const fileStat = await fs.lstat(filesInDir[0])

        console.log(filesInDir[1]);
        // console.log(fileStat); */

    const pathToFile = path.join(dir, 'data.json');
    const data = await fs.readFile(pathToFile);
    console.log('🚀 ~ file: readtext.js:23 ~ data:', data);
    const text = data.toString();
    console.log('🚀 ~ file: readtext.js:25 ~ text:', text);
    // console.log(text);
    // console.log(data); //buffer

    const parsedText = JSON.parse(text);
    console.log(parsedText);

    await fs.writeFile('result.json', text);
  } catch (err) {
    console.log(err.message);
  }
};

readText();

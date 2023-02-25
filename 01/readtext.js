const path = require('path');
const fs = require('fs').promises;

const readText = async () => {
    const pathToFile = path.join('files', 'text.txt');

    console.log(pathToFile);

    const data = await fs.readFile(pathToFile, 'utf-8')
    const text = data.toString()
    console.log(text);
}

readText();
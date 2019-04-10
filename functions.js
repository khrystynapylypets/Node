const fs = require('fs');

const getNewId = array => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1;
    }
    return 1;
};

const newDate = () => new Date().toString();

const beInArray = (array, id) => new Promise((resolve, reject) => {
    const row = array.find(row => row.id == id);
    console.log(array);
    console.log(row);
    if (!row) {
        reject({
            message: 'Unknown ID',
            status: 404
        });
    }
    resolve(row);
});

const writeJSONFile = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf8', err => {
        if (err) {
            console.log(err)
        }
    });
};

module.exports = {
    getNewId,
    newDate,
    beInArray,
    writeJSONFile
};
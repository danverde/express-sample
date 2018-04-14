const express = require('express');
const fileUpload = require('express-fileupload');

const path = require('path');
const fs = require('fs');

const port = '8000';
var app = express();

// allows access straight to file system.
app.use(express.static('public'));
app.use(fileUpload());


app.get('/', (req, res) => {
    // res.send('Hello World');

    // This is how to send html files (or other files)
    res.sendFile(path.resolve('.', 'index.html'));

});


app.post('/upload', function (req, res) {
    if (!req.files) {
        res.status(400).send('No file provided');
    }
    // console.log(req.files); // the uploaded file object
    // console.log(req.files.foo); // the uploaded file object
    let uploadFile = req.files;
    fs.writeFile(uploadFile.name, uploadFile.data, (writeErr) => {
        if (writeErr) {
            console.error(writeErr);
            res.status(500).send('Unable to save file');
        }
        res.status(200).send('IT WORKED!');
    });
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
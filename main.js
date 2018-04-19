const express = require('express');
const fileUpload = require('express-fileupload');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const asyncLib = require('async');

const port = '8000';
var app = express();

// allows access straight to file system.
app.use(express.static('view'));
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));


app.get('/', (req, res) => {
    // This is how to send html files (or other files)
    res.sendFile(path.resolve('.', './view/index.html'));

});


app.post('/upload', (req, res) => {
    if (!req.files) {
        res.status(400).send('No file provided');
    }

    // imageUpload is the name attribute on the file input
    // console.log(req.files);


    // let uploadFile = req.files.imageUpload;
    let uploadFiles = req.files.imageUpload;
    uploadFiles.forEach((uploadFile) => {
        // console.log(uploadFile);

        // mv is a built in function. IDK if it works better or worse than fs
        // uploadFile.mv(`./uploads/${uploadFile.name}`, (writeErr) => {
        //     if (writeErr) {
        //         console.error(chalk.red(writeErr));
        //         res.status(500).send('Unable to save file');
        //     }

        //     res.send(`Successfully uploaded ${uploadFile.name}`);
        // });
        fs.writeFile(`./uploads/${uploadFile.name}`, uploadFile.data, (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                res.status(500).send('Unable to save file');
            }
        });
    });
    res.status(200).send('IT WORKED!');
});

app.post('/upload2', (req, res) => {
    function saveFile(uploadFile, cb) {
        fs.writeFile(`./uploads/${uploadFile.name}`, uploadFile.data, (writeErr) => {
            if (writeErr) {
                cb(writeErr);
            } else {
                res.write(`Wrote ${uploadFile.name}`);
                cb(null);
            }
        });
    } 



    let uploadFiles = req.files.imageUpload;
    asyncLib.eachSeries(uploadFiles, saveFile, (err) => {
        if (err) {
            console.error(err);
            res.send('Failed to write files');
        } else {
            res.end('Complete');
        }
    });

    // res.send(`I got the request ${JSON.stringify(req.body)}`);
});

app.get('/download', (req, res) => {
    res.download('./public/car.jpg', 'sample image.jpg', (err) => {
        if (err) {
            console.error(chalk.red(err));
            // idk how to handle that issue...
            return;
        }
        console.log('success');
    });
});

app.listen(port, () => {
    console.log(chalk.green(`server open at: http://localhost:${port}/`));
});

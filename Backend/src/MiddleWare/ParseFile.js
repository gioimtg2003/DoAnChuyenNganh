const { UploadS3 } = require('../Services/awsS3');
const formidable = require('formidable');
const Transform = require('stream').Transform;

const ParseFile = async (req) => {
    return new Promise((res, rej) => {
        let options = {
            maxFileSize: 50 * 1024 * 1024,
            allowEmptyFiles: false,
        }
        const form = new formidable.IncomingForm(options);

        form.parse(req, (err, fields, files) => { });
        form.on('error', (err) => {
            // console.error("Error", err);
            rej(err);
        });

        form.on('data', data => {
            // console.log("data", data);
            if (data.error === 0) {
                res(data.value);
            }
        });

        form.on("fileBegin", (formName, file) => {
            let key = `${Date.now()}-${file.originalFilename}`
            file.open = async function () {
                //read the file
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk)
                    }
                });

                this._writeStream.on('error', e => {
                    form.emit('error', e)
                });

                let upload = await UploadS3(this._writeStream, key);

                if (upload) {
                    form.emit('data', { error: 0, value: key });
                } else {
                    form.emit('data', { error: 1, value: "failed" });
                }
            }
        });
    })
};

module.exports = { ParseFile };
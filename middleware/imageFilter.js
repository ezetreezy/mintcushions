

module.exports = (req, file, cb) => {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

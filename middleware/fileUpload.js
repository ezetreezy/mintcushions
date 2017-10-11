const multer = require('multer');
const imageFilter = require('./imageFilter');

var storage = multer.diskStorage({ destination: function(req, file, cb) { cb(null, 'uploads/')},
                                   fileFilter: imageFilter,
                                   filename: function(req, file, cb) { cb(null, file.originalname); }
});

module.exports = multer({
 storage: storage
});

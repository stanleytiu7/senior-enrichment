const express = require('express');
const router = express();
const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const publicPath = path.join(rootPath, 'public');
const materializePath = path.join(rootPath, 'node_modules', 'materialize-css', 'dist');

router.use('/public', express.static(publicPath));
router.use('/materialize', express.static(materializePath));

module.exports = router;

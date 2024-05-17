
const express = require('express');
const router = express.Router();
const subUserService = require('./services');

const path = require('path')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_pics')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'File-' + uniqueSuffix + path.extname(file.originalname))
    req.body['suffix'] = uniqueSuffix
  }
})
const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
  const response = await subUserService.getAllSubUsers();
  res.status((response.success === true) ? 201 : 500).json(response);
});

router.post('/add-profile-pic', upload.single('avatar'), async (req, res) => {
  const response = await subUserService.addProfilePic(req);
  res.status((response.success === true) ? 201 : 500).json(response);
});

router.post('/:clientId/:username', async (req, res) => {
  const response = await subUserService.getSubUser(req);
  res.status((response.success === true) ? 201 : 500).json(response);
});

module.exports = router;

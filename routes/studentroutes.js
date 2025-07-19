const express = require('express');
const router = express.Router();
const studentcontroller = require('../controllers/studentcontroller');

router.post('/', studentcontroller.createstudent);
router.get('/', studentcontroller.getallStudents);
router.delete('/:id', studentcontroller.deletestudent);

module.exports = router;

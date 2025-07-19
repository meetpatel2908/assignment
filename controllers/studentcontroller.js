const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createstudent = async (req, res) => {
  const { firstName, lastName, rollNumber, gender } = req.body;
  if (!firstName || !lastName || !rollNumber || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const student = await prisma.student.create({
      data: { firstName, lastName, rollNumber, gender }
    });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' });
  }
};

exports.getallStudents = async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
};

exports.deletestudent = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.student.delete({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(404).json({ error: 'Student not found' });
  }
};

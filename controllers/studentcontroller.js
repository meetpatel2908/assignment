const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createstudent = async (req, res) => {
  const { firstName, lastName, rollNumber, gender } = req.body;

  if (!firstName || !lastName || !rollNumber || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
    return res.status(400).json({ error: 'Names must contain only letters' });
  }

 if (!/^\d{3,}$/.test(rollNumber)) {
  return res.status(400).json({ error: 'Roll number must be at least 3 digits' });
}

  try {
    const student = await prisma.student.create({
      data: { firstName, lastName, rollNumber, gender }
    });
    res.status(201).json(student);
  } catch (err) {
  console.error("💥 Prisma error:", err); // 👈 THIS LINE IS CRITICAL

  if (err.code === 'P2002' && err.meta?.target?.includes('rollNumber')) {
    return res.status(400).json({ error: 'This roll number already exists. Please use a different one.' });
  }

  return res.status(500).json({ error: 'Database connection error or unknown DB issue.' });
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

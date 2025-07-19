const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createstudent = async (req, res) => {
  const { firstName, lastName, rollNumber, gender } = req.body;

  console.log("📥 Received student data:", { firstName, lastName, rollNumber, gender });

  try {
    await prisma.student.create({
      data: {
        firstName,
        lastName,
        rollNumber,
        gender,
      },
    });
    res.status(201).json({ message: "Student added successfully" });
  } catch (err) {
    console.error("💥 Prisma error:", err); // 🔥 This will appear in Railway logs

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

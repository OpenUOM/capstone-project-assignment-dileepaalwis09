process.env.NODE_ENV = "test-backend";

const db = require("./backend/db-config");
const testBase = require("./backend/test/testBase");

(async () => {
  try {
    console.log("=== Resetting database ===");
    await testBase.resetDatabase(db);
    
    console.log("\n=== Testing raw SQL SELECT ===");
    const teachers = await db.raw("SELECT * FROM teacher");
    console.log("Teachers raw response:", JSON.stringify(teachers, null, 2));
    console.log("Teachers type:", typeof teachers);
    console.log("Teachers is array?", Array.isArray(teachers));
    
    const students = await db.raw("SELECT * FROM student");
    console.log("\nStudents raw response:", JSON.stringify(students, null, 2));
    console.log("Students type:", typeof students);
    console.log("Students is array?", Array.isArray(students));
    
    console.log("\n=== Testing INSERT ===");
    await db.raw("INSERT INTO teacher(id,name,age) values (?,?,?)", [99999, "Test Teacher", 50]);
    const teachersAfter = await db.raw("SELECT * FROM teacher");
    console.log("Teachers after INSERT:", JSON.stringify(teachersAfter, null, 2));
    console.log("Teacher count:", Array.isArray(teachersAfter) ? teachersAfter.length : "NOT AN ARRAY");
    
    console.log("\n=== Testing student INSERT ===");
    await db.raw("INSERT INTO student(id,name,age,hometown) values (?,?,?,?)", [99999, "Test Student", 25, "TestTown"]);
    const studentsAfter = await db.raw("SELECT * FROM student");
    console.log("Students after INSERT:", JSON.stringify(studentsAfter, null, 2));
    console.log("Student count:", Array.isArray(studentsAfter) ? studentsAfter.length : "NOT AN ARRAY");
    
    await db.destroy();
  } catch (err) {
    console.error("Error:", err);
    await db.destroy();
    process.exit(1);
  }
})();

import * as Etudiant from "./models/etudiant.js";
import * as Cours from "./models/cours.js";

const main = async () => {
  try {
    console.log("=== Application BDD-JS ===\n");

    console.log("Liste de tous les étudiants:");
    const students = await Etudiant.getAll();
    console.log(students);
    console.log("\n");

    console.log("Récupération de l'étudiant avec ID 1:");
    const student = await Etudiant.getById(4);
    console.log(student);
    console.log("\n");

    console.log("Création d'un nouvel étudiant:");
    const newStudent = await Etudiant.createStudent({
      id_card_number: `CI-0012`,
      last_name: "Fortune",
      first_name: "Sarah",
      tutor_id: 2,
    });
    console.log(newStudent);
    console.log("\n");

    console.log("Mise à jour de l'expérience de l'étudiant 9:");
    const updatedStudent = await Etudiant.updateStudentExperience(9, 10);
    console.log(updatedStudent);
    console.log("\n");

    console.log("Liste de tous les cours:");
    const courses = await Cours.getAll();
    console.log(courses);
    console.log("\n");

    console.log("Récupération du cours avec ID 1:");
    const course = await Cours.getById(1);
    console.log(course);
    console.log("\n");

    console.log("Création d'un nouveau cours:");
    const newCourse = await Cours.createLesson({
      discipline_id: 2,
      instructor_siret: "11111111111111",
      room_id: 2,
    });
    console.log(newCourse);
    console.log("\n");

    console.log(`Mise à jour du numéro de semaine du cours 9:`);
    const updatedCourse = await Cours.updateWeekNumber(9, 7);
    console.log(updatedCourse);
    console.log("\n");

    console.log("Liste des étudiants participant au cours 1:");
    const studentsInCourse = await Cours.getStudentsByLesson(1);
    console.log(studentsInCourse);
    console.log("\n");

    console.log("Opérations terminées avec succès!");
  } catch (error) {
    console.error("Erreur:", error.message);
  } finally {
    process.exit(0);
  }
};

main();

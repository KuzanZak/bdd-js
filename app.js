import * as Etudiant from "./models/etudiant.js";

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
      id_card_number: `CI-0010`,
      last_name: "Fortune",
      first_name: "Sarah",
      tutor_id: 2,
    });
    console.log(newStudent);
    console.log("\n");

    console.log("Mise à jour de l'expérience de l'étudiant 9:");
    const updatedStudent = await Etudiant.updateStudentExperience(9, 6);
    console.log(updatedStudent);
    console.log("\n");

    console.log("Opérations terminées avec succès!");
  } catch (error) {
    console.error("Erreur:", error.message);
  } finally {
    process.exit(0);
  }
};

main();

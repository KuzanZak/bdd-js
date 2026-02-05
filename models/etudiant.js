import { getConnection } from "../config/database.js";

export const getAll = async () => {
  let connection;
  try {
    connection = await getConnection();
    const statement = await connection.prepare(
      "SELECT * FROM etudiant ORDER BY etudiant_id",
    );
    const rows = await statement.execute();
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    throw error;
  } finally {
    connection?.release();
  }
};

export const getById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const statement = await connection.prepare(
      "SELECT * FROM etudiant WHERE etudiant_id = ?",
    );
    const rows = await statement.execute([id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'étudiant ${id}:`, error);
    throw error;
  } finally {
    connection?.release();
  }
};

export const createStudent = async (data) => {
  let connection;
  try {
    connection = await getConnection();

    const statement = await connection.prepare(
      `INSERT INTO etudiant (etudiant_num_carte_identite, etudiant_nom, etudiant_prenom, tuteur_Id) 
       VALUES (?, ?, ?, ?)`,
    );

    const result = await statement.execute([
      data.id_card_number,
      data.last_name,
      data.first_name,
      data.tutor_id,
    ]);

    return {
      id: Number(result.insertId),
      id_card_number: data.id_card_number,
      last_name: data.last_name,
      first_name: data.first_name,
      tutor_id: data.tutor_id,
    };
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant:", error);
    throw error;
  } finally {
    connection?.release();
  }
};

export const updateStudentExperience = async (id, studentExperience) => {
  let connection;
  try {
    connection = await getConnection();

    const statement = await connection.prepare(
      "UPDATE etudiant SET etudiant_annees_experience = ? WHERE etudiant_id = ?",
    );
    await statement.execute([studentExperience, id]);

    return await getById(id);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'étudiant ${id}:`, error);
    throw error;
  } finally {
    connection?.release();
  }
};

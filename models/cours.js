import { getConnection } from "../config/database.js";

export const getAll = async () => {
  let connection;
  try {
    connection = await getConnection();
    const statement = await connection.prepare(
      "SELECT * FROM cours ORDER BY cours_id",
    );
    const rows = await statement.execute();
    return rows;
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
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
      "SELECT * FROM cours WHERE cours_id = ?",
    );
    const rows = await statement.execute([id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du cours ${id}:`, error);
    throw error;
  } finally {
    connection?.release();
  }
};

export const createLesson = async (data) => {
  let connection;
  try {
    connection = await getConnection();

    const statement = await connection.prepare(
      `INSERT INTO cours (discipline_id, intervenant_siret, salle_id) 
       VALUES (?, ?, ?)`,
    );

    const result = await statement.execute([
      data.discipline_id,
      data.instructor_siret,
      data.room_id,
    ]);

    return {
      id: Number(result.insertId),
      discipline_id: data.discipline_id,
      instructor_siret: data.instructor_siret,
      room_id: data.room_id,
    };
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    throw error;
  } finally {
    connection?.release();
  }
};

export const updateWeekNumber = async (id, weekNumber) => {
  let connection;
  try {
    connection = await getConnection();

    const statement = await connection.prepare(
      "UPDATE cours SET cours_numero_semaine = ? WHERE cours_id = ?",
    );
    await statement.execute([weekNumber, id]);

    return await getById(id);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du cours ${id}:`, error);
    throw error;
  } finally {
    connection?.release();
  }
};

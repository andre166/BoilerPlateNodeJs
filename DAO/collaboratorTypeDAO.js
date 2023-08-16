import { query, sqlSanitize } from "../utils/query";

export async function getCollaboratorsTypes() {
  const query = "SELECT * FROM collaborator_type";

  const [result] = await query(sql);

  return rows;
}

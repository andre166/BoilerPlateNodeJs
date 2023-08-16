import { query, sqlSanitize } from "../utils/query";

export async function getCollaborators() {
  const sql = "SELECT * FROM collaborator";

  const [result] = await query(sql);

  return result;
}

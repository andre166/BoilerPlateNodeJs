import { query, sqlSanitize } from "../utils/query";

export async function getCollaboratorEnderecos(params) {
  const { id } = params;
  if (!id) return null;

  const sql = `SELECT * FROM collaborator_enderecos where id = ${id}`;

  const [result] = await query(sql);

  return result;
}

export async function _mapGetCollaboratorEndereco(collaborator) {
  const resp = await getCollaboratorEnderecos({ id: collaborator.id });

  if (resp?.error) return resp;

  collaborator.enderecos = resp || [];

  return collaborator;
}

export async function _mapGetCollaboratorEndereco2(collaborator) {
  const resp = await getCollaboratorEnderecos({ id: collaborator.id });

  if (resp?.error) return resp;

  collaborator.enderecos2 = resp || [];

  return collaborator;
}

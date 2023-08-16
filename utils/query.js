import getConnection from "../config/dbConnection";
import sqlSanitize from "sqlstring";

const query = async (sql, params) => {
  const conn = await getConnection();
  let resp = null;

  try {
    if (params) {
      resp = await conn.execute(sql, params);
    } else {
      resp = await conn.execute(sql);
    }
  } catch (err) {
    resp = [{ error: err }];
  }

  await conn?.release();

  return resp;
};

export { query, sqlSanitize };

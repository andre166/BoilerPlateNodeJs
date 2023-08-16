import express from "express";
const router = express.Router();
import { getCollaboratorsTypes } from "../DAO/collaboratorTypeDAO.js";

router.get("", async (req, res) => {
  const resp = await getCollaboratorsTypes();

  res.send(resp);
});

export default router;

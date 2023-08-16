import express from "express";
import { getCollaborators } from "../DAO/collaboratorDAO.js";
import {
  _mapGetCollaboratorEndereco,
  _mapGetCollaboratorEndereco2,
} from "../DAO/collaboratorEnderecoDAO.js";
import { wrapParallel } from "../utils/async.js";

const router = express.Router();

router.get("", async (req, res) => {
  const collaborators = await getCollaborators();

  const maps = [_mapGetCollaboratorEndereco, _mapGetCollaboratorEndereco2];

  const resp = await wrapParallel(maps, collaborators);
  res.send(resp);
});

export default router;

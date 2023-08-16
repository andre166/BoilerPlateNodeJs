import Express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import collaboratorRoute from "./routes/collaboratorRoute.js";
import collaboratorTypesRoute from "./routes/collaboratorTypesRoute.js";
import authenticateAndAuthorize from "./middlewares/authenticateAndAuthorize.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import {
  collaboratorRoles,
  collaboratorTypeRoles,
} from "./utils/routesRoles.js";
import {
  collaboratorRouteLimiter,
  collaboratorTypesRouteLimiter,
} from "./limiters/index.js";

const PORT = process.env.PORT || 5000;

const app = Express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(xss()); // tranforma <script></script> in "&lt;script>&lt;/script>"    (sanitize user input)
// app.use(corsMiddleware);
app.use(cors());

app.use(
  "/collaborator", //uri
  collaboratorRouteLimiter, //Limita as requisições por ip
  authenticateAndAuthorize(collaboratorRoles), //Autentica o token e valida o acesso do usuário ha rota
  collaboratorRoute //Rota
);
app.use(
  "/collaboratorType",
  collaboratorTypesRouteLimiter,
  authenticateAndAuthorize(collaboratorTypeRoles),
  collaboratorTypesRoute
);

// Rota para lidar com qualquer outra rota não definida
app.get("*", (req, res) => res.sendStatus(404));

app.listen(PORT, (req, res) => console.log("Server On na porta: ", PORT));

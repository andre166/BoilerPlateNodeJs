import cors from "cors";

const whitelist = ["https://meu-dominio.com"]; // Domínios permitidos

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Access not allowed"));
    }
  },
};

export default cors(corsOptions);

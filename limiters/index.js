import rateLimit from "express-rate-limit";
import minutes from "../utils/generateMinute";

const defaultParameters = {
  message: "Rate limit exceeded. Please try again later.",
  statusCode: 429, // Código de status HTTP para limite excedido
  headers: true, // Envia o cabeçalho Retry-After quando o limite é excedido
  draft_polli_ratelimit_headers: true, // Usar as definições padrão para os cabeçalhos de taxa de limite
};

export const collaboratorRouteLimiter = rateLimit({
  windowMs: minutes(30), // 1 minuto
  max: 300, // Limite de 100 solicitações por IP por minuto
  ...defaultParameters,
});
export const collaboratorTypesRouteLimiter = rateLimit({
  windowMs: minutes(30),
  max: 300,
  ...defaultParameters,
});

export const emailLimiter = rateLimit({
  windowMs: minutes(8),
  max: 10,
  ...defaultParameters,
});

function authenticateAndAuthorize(roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    const decoded = { role: 1 }; //ROLE de usuário mockado remover quando puder

    if (!token)
      return res.status(401).json({ message: "Missing authentication token." });

    if (token === "Bearer aa") {
      // Token válido, permite o acesso à rota privada
      if (!roles.includes(decoded.role))
        return res.status(403).json({ message: "Not authorized." });

      req.user = decoded;

      next();
    } else {
      res.sendStatus(401); // Token inválido, retorna código de status não autorizado
    }
  };
}

export default authenticateAndAuthorize;

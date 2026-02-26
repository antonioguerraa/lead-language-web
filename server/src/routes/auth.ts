import type { Request, Response, NextFunction } from "express";

export function basicAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Admin"');
    res.status(401).json({ error: "Autenticación requerida" });
    return;
  }

  const credentials = Buffer.from(authHeader.slice(6), "base64").toString();
  const [user, pass] = credentials.split(":");

  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASS || "admin";

  if (user === expectedUser && pass === expectedPass) {
    next();
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
}

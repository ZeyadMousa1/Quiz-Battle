import jwt from "jsonwebtoken";

interface PayLoad {
  id: number;
}

export function generateJwtToken(payLoad: PayLoad): string {
  return jwt.sign(payLoad, getSecret(), { expiresIn: "1h" });
}

export function verifyJwt(token: string): PayLoad {
  return jwt.verify(token, getSecret) as unknown as PayLoad;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("Missing jwt secret");
    process.exit(1);
  }
  return secret;
}

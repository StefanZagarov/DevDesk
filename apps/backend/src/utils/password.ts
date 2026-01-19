import bcrypt from "bcrypt";

export async function toHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function compare(storedHash: string, suppliedPassword: string) {
  return bcrypt.compare(suppliedPassword, storedHash);
}

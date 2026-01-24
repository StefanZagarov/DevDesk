import bcrypt from "bcrypt";

export async function toHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function compare(candidatePassword: string, passwordHash: string) {
  return bcrypt.compare(candidatePassword, passwordHash);
}

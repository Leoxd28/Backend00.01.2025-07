import bcrypt from "bcrypt";

const users = [
  {
    id: 1,
    email: "admin@example.com",
    passwordHash: await bcrypt.hash("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    email: "user@example.com",
    passwordHash: await bcrypt.hash("user123", 10),
    role: "user",
  },
];

export async function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}
export async function findUserById(id) {
  return users.find((u) => u.id === id);
}
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

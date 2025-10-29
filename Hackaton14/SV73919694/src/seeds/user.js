import { hashPassword, verifyPassword } from "../utils/passwords.js";

const users = new Map();
let seeded = false;

async function seed() {
  if (seeded) return;
  seeded = true;
  const admin = {
    id: "1",
    email: "admin@acme.test",
    role: "admin",
    passwordHash: await hashPassword("Admin#123"),
  };
  const user = {
    id: "2",
    email: "user@acme.test",
    role: "user",
    passwordHash: await hashPassword("User#1234"),
  };
  users.set(admin.id, admin);
  users.set(user.id, user);
}

export async function findByEmail(email) {
  await seed();
  return [...users.values()].find((u) => u.email === email) ?? null;
}

export async function findById(id) {
  await seed();
  return users.get(id) ?? null;
}

export async function validateCredentials(email, password) {
  const user = await findByEmail(email);
  if (!user) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? { id: user.id, email: user.email, role: user.role } : null;
}

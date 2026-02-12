/**
 * In-memory хранилище пользователей и сессий.
 * Данные сбрасываются при перезапуске сервера.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // plain text (учебный проект, НЕ для продакшена)
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export type PublicUser = Omit<User, "password">;

// --- In-memory stores (persist across hot-reload in dev) ---
const globalForAuth = globalThis as unknown as {
  __auth_users?: User[];
  __auth_sessions?: Session[];
};

if (!globalForAuth.__auth_users) globalForAuth.__auth_users = [];
if (!globalForAuth.__auth_sessions) globalForAuth.__auth_sessions = [];

const users: User[] = globalForAuth.__auth_users;
const sessions: Session[] = globalForAuth.__auth_sessions;

// --- Token helpers ---
function generateToken(): string {
  return crypto.randomUUID() + "-" + crypto.randomUUID();
}

function getExpirationDate(): string {
  const date = new Date();
  date.setHours(date.getHours() + 24); // 24-hour sessions
  return date.toISOString();
}

// --- User operations ---

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getAllUsers(): PublicUser[] {
  return users.map(({ password, ...rest }) => rest);
}

export function createUser(name: string, email: string, password: string): User {
  const now = new Date().toISOString();
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: now,
    updatedAt: now,
  };
  users.push(user);
  return user;
}

export function updateUser(
  id: string,
  updates: Partial<Pick<User, "name" | "email" | "password" | "avatar">>
): User | null {
  const user = findUserById(id);
  if (!user) return null;

  if (updates.name !== undefined) user.name = updates.name;
  if (updates.email !== undefined) user.email = updates.email.toLowerCase();
  if (updates.password !== undefined) user.password = updates.password;
  if (updates.avatar !== undefined) user.avatar = updates.avatar;
  user.updatedAt = new Date().toISOString();

  return user;
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  // Also remove all sessions for this user
  const sessionIndices = sessions
    .map((s, i) => (s.userId === id ? i : -1))
    .filter((i) => i !== -1)
    .reverse();
  for (const i of sessionIndices) {
    sessions.splice(i, 1);
  }
  return true;
}

// --- Session operations ---

export function createSession(userId: string): Session {
  const session: Session = {
    token: generateToken(),
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: getExpirationDate(),
  };
  sessions.push(session);
  return session;
}

export function findSessionByToken(token: string): Session | undefined {
  const session = sessions.find((s) => s.token === token);
  if (!session) return undefined;

  // Check expiration
  if (new Date(session.expiresAt) < new Date()) {
    // Remove expired session
    const index = sessions.indexOf(session);
    sessions.splice(index, 1);
    return undefined;
  }

  return session;
}

export function deleteSession(token: string): boolean {
  const index = sessions.findIndex((s) => s.token === token);
  if (index === -1) return false;
  sessions.splice(index, 1);
  return true;
}

export function deleteAllUserSessions(userId: string): number {
  const before = sessions.length;
  const remaining = sessions.filter((s) => s.userId !== userId);
  sessions.length = 0;
  sessions.push(...remaining);
  return before - sessions.length;
}

// --- Auth helper ---

export function toPublicUser(user: User): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}

export function getUserFromToken(
  authHeader: string | null
): { user: User; session: Session } | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.replace("Bearer ", "");
  const session = findSessionByToken(token);
  if (!session) return null;

  const user = findUserById(session.userId);
  if (!user) return null;

  return { user, session };
}

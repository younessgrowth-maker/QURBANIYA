const DEFAULT_ADMIN_EMAILS = ["younessgrowth@gmail.com"];

export function getAdminEmails(): string[] {
  const env = process.env.ADMIN_EMAILS;
  if (!env) return DEFAULT_ADMIN_EMAILS;
  return env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

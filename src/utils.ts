export function capitalize(string: string): string {
  if (string.length > 0) {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized;
  }

  return string;
}

export function getFrontendBaseUrl() {
  const host = process.env.NEXT_PUBLIC_FRONTEND_HOST;
  const port = process.env.NEXT_PUBLIC_FRONTEND_PORT;
  return `${host}:${port}`;
}

export function getReadUrlFor(entity: string, id: number) {
  return `${getFrontendBaseUrl()}/admin/${entity}/read/${id}`;
}

export function getEditUrlFor(entity: string, id: number) {
  return `${getFrontendBaseUrl()}/admin/${entity}/edit/${id}`;
}

export function getCreateUrlFor(entity: string) {
  return `${getFrontendBaseUrl()}/admin/${entity}/create`;
}

function getEnv(
  key: string,
  fallback?: string
) {
  const value = process.env[key];

  if (!value && !fallback) {
    throw new Error(
      `Missing environment variable: ${key}`
    );
  }

  return value ?? fallback!;
}

export const env = {
  API_URL: getEnv(
    "NEXT_PUBLIC_API_URL",
    "http://localhost:5239/api"
  ),

  APP_NAME: getEnv(
    "NEXT_PUBLIC_APP_NAME",
    "My App"
  ),

  APP_URL: getEnv(
    "NEXT_PUBLIC_APP_URL",
    "http://localhost:3000"
  ),

  NODE_ENV: process.env.NODE_ENV,
} as const;
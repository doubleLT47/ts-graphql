export default {
  app: {
    port: Number(process.env.PORT) || 3000,
    env: String(process.env.NODE_ENV),
    secret: String(process.env.SECRET),
    url: String(process.env.URL),
  },
  postgres: {
    enable: Boolean(process.env.POSTGRES_ENABLE),
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    name: String(process.env.POSTGRES_DATABASE),
    username: String(process.env.POSTGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
  },
} as const;

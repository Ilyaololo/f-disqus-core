module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    'src/**/entity/*.entity.ts',
  ],
  logging: true,
  migrations: [
    'src/migrations/*.ts',
  ],
  migrationsRun: false,
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

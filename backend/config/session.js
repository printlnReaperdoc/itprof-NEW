const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.create ? connectMongo : (connectMongo.default || connectMongo.MongoStore);

const createSessionConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production' || 
                       process.env.RENDER === 'true' || 
                       Boolean(process.env.RENDER_SERVICE_ID);
  const mongoUri = process.env.MONGO_URI;

  return session({
    secret: process.env.SESSION_SECRET || 'itprof-learning-management-system-secret-key-2026',
    name: 'itprof.sid',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    proxy: true, // Trust reverse proxy headers (e.g. Render / Cloudflare SSL termination)
    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60, // 1 day
      autoRemove: 'native'
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-domain cookie sending (Vercel <-> Render)
      partitioned: isProduction, // CHIPS partitioned cookie support for Chrome/Edge
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  });
};

module.exports = createSessionConfig;

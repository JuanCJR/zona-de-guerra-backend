import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import gestionRoutes from './routes/gestion.routes'
import adminRoutes from './routes/admin.routes'
import passport from 'passport';
import path from 'path';
import('./lib/passport');
const app = express();
//Settings
app.set('PORT', process.env.PORT ? process.env.PORT : 8081);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.use(passport.initialize()); //Indicamos a passport que se inicie
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../build")));


//Rutas
app.use('/gestion/api/v1',gestionRoutes);
app.use('/admin/api/v1',adminRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

export default app;
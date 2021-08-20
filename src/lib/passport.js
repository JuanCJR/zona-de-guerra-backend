import passport from "passport";
import passportLocal from "passport-local";
import pool from "../db/db";
import { matchPassword } from "./helpers";
//indicamos el tipo de autenticacion que utilizaremos
const LocalStrategy = passportLocal.Strategy;

//Defino la configuracion de la autenticacion

//Inicio de sesion
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "nom_usu",
      passwordField: "passwd",
      passReqToCallback: true,
    },
    async (req, nom_usu, passwd, done) => {
      let result = await await pool.query(
        `
        SELECT cod_usu, nom_usu, passwd FROM usuarios
        where nom_usu = ?
        `,
        [nom_usu]
      );

      let user = result[0];
      
      if (result.length > 0) {
        const validPassw = await matchPassword(passwd, user.passwd);
        if (validPassw) {
          done(null, user);
        } else {
          done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
); //

//GUardamos el usuario dentro de la sesion con el siguiente metodo
passport.serializeUser((user, done) => {
  done(null, user.cod_usu);
});

passport.deserializeUser(async (cod_usu, done) => {
  let result = await await pool.query(
    `
        SELECT cod_usu, nom_usu FROM usuarios
        where cod_usu = ?
        `,
    [cod_usu]
  );

  done(null, result[0]);
});

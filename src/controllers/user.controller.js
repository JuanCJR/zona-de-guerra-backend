import {
  creaUsuario,
  consultaUsuarios,
  actualizaUsuario,
  consultaUsuario,
  eliminaUsuario,
  cambiaContraseña
} from "../services/user.service";
import jwt from "jsonwebtoken";

//Funcion para cambio de contraseña
export const putChangePasswd = async (req, res, next) => {
  const { usuario } = req.body;
  let data = await cambiaContraseña(usuario);
  req.result = data;
  next();
};
//Funcion para validar login
export const getValidLogin = async (req, res, next) => {
  const { cod_usu } = req;
  let data = await consultaUsuario(cod_usu);
  req.result = data;
  next();
};

//Funcion para listar usuarios
export const getUsuarios = async (req, res, next) => {
  const data = await consultaUsuarios();
  req.result = data;
  next();
};

//Funcion para crear usuario
export const postUsuario = async (req, res, next) => {
  const { usuario } = req.body;
  const data = await creaUsuario(usuario);
  req.result = data;
  next();
};

//Funcion para actualizar usuario
export const putUsuario = async (req, res, next) => {
  const { usuario } = req.body;
  const data = await actualizaUsuario(usuario);
  req.result = data;
  next();
};

//Funcion para eliminar usuario
export const deleteUsuario = async (req, res, next) => {
  const { usuario } = req.body;
  const data = await eliminaUsuario(usuario);
  req.result = data;
  next();
};

//Funcion para realizar login
export const getUsuarioLogin = async (req, res, next) => {
  const cod_usu = req.session.passport.user;
  let data = await consultaUsuario(cod_usu);

  const token = await jwt.sign({ id: cod_usu }, process.env.SECRET, {
    expiresIn: parseInt(process.env.EXPIRES_IN),
  });

  req.result = {
    data: {
      user: data.data,
      token: token,
      expiresIn: parseInt(process.env.EXPIRES_IN),
    },
  };
  next();
};

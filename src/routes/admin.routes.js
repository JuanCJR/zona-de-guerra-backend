import { Router } from "express";
import {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
  getUsuarioLogin,
  getValidLogin,
  putChangePasswd
} from "../controllers/user.controller";
import { getResponse } from "../middleware/responses";
import passport from "passport";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();

//Rutas de usuarios - CRUD
router.get("/usuario", verifyToken, getUsuarios, getResponse); //obtiene usuarios
router.post("/usuario", postUsuario, getResponse); //crea usuario
router.put("/usuario", verifyToken, putUsuario, getResponse); //actualiza usuario
router.delete("/usuario", verifyToken, deleteUsuario, getResponse); //elimina usuario

//Rutas de usuario - Login

router.get("/usuario/login/valida-sesion", verifyToken, getValidLogin, getResponse); //Ruta para validar token

router.post(
  "/usuario/login",
  passport.authenticate("local-signin"),
  getUsuarioLogin,
  getResponse
); //Login

//Ruta para cambio de contraseña
router.put("/usuario/change-passwd",verifyToken,putChangePasswd,getResponse);



export default router;

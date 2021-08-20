import { Router } from "express";
import { getResponse } from "../middleware/responses";
import {
  getReservas,
  getReserva,
  postReserva,
  putReserva,
  deleteReserva,
  getReservasDisponibles,
} from "../controllers/reserva.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

//Rutas personalizadas
router.get("/reserva/disponibilidad", getReservasDisponibles, getResponse); //obtiene fechas disponibles

//Rutas de reservas CRUD
router.get("/reserva/:cod_reserva", getReserva, getResponse); //obtiene una reserva
router.get("/reserva", getReservas, getResponse); //obtiene reservas
router.post("/reserva", postReserva, getResponse); //crea una reserva
router.put("/reserva", verifyToken, putReserva, getResponse); //actualiza una reserva
router.delete("/reserva", verifyToken, deleteReserva, getResponse); //elimina una reserva

export default router;

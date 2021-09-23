import {
  consultaReserva,
  consultaReservas,
  creaReserva,
  actualizaReserva,
  eliminaReserva,
  consultaReservasDisponibles,
} from "../services/reservas.service";

//Funcion para listar reservas
export const getReservas = async (req, res, next) => {
  const data = await consultaReservas();
  req.result = data;
  next();
};

//Funcion para lista una reserva
export const getReserva = async (req, res, next) => {
  const { cod_reserva } = req.params;
  const data = await consultaReserva(cod_reserva);
  req.result = data;
  next();
};

//Funcion para crear reserva
export const postReserva = async (req, res, next) => {
  const reserva = req.body;
  const { comprobante } = req.files;
  const data = await creaReserva(reserva);
  req.result = data;
  next();
};

//Funcion para actualizar reserva
export const putReserva = async (req, res, next) => {
  const { reserva } = req.body;
  const data = await actualizaReserva(reserva);
  req.result = data;
  next();
};

//Funcion para eliminar reserva
export const deleteReserva = async (req, res, next) => {
  const { reserva } = req.body;
  const data = await eliminaReserva(reserva);
  req.result = data;
  next();
};

//Funcion para obtener reservas disponibles
export const getReservasDisponibles = async (req, res, next) => {
  const { fec_reserva } = req.query;
  const data = await consultaReservasDisponibles(fec_reserva);
  req.result = data;
  next();
};

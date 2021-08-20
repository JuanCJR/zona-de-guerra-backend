import pool from "../db/db";

//Funcion para listar reservas disponibles
export const consultaReservasDisponibles = async (fec_reserva) => {
  try {
    const date = new Date(fec_reserva);
    const day = date.getDay() === 0 ? 7 : date.getDay();
    console.log(day);
    let query = "";
    //1 al 5 dia de semana
    if (day <= 5) {
      query = ` select cod_horario, horario from horarios 
        where horario not in 
        (
        select date_format(fec_reserva, '%H:%i') as ocupado from reservas 
        where DATE_FORMAT(fec_reserva,'%Y/%m/%d') = ?
        )
        and horario >'15:00'
        `;
    }
    //0 y 6 fin de semana
    else if (day >= 6) {
      query = `
        select cod_horario, horario from horarios 
        where horario not in 
        (
        select date_format(fec_reserva, '%H:%i') as ocupado from reservas 
        where DATE_FORMAT(fec_reserva,'%Y/%m/%d') = ?
        ) 
    `;
    }

    const reservas = await pool.query(query, [fec_reserva]);
    return { data: reservas };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};

//Funcion para listar reservas
export const consultaReservas = async () => {
  try {
    const reservas = await pool.query(`
    SELECT reservas.cod_cli as cod_cli, cod_reserva, fec_reserva, concat(nom_cli," ", ape_cli) as cliente,
    nom_cli, ape_cli, rut_cli, telefono , email
    FROM reservas
    JOIN clientes
    ON clientes.COD_CLI = reservas.COD_CLI
    `);
    return { data: reservas };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};
//Funcion para listar una reserva
export const consultaReserva = async (cod_reserva) => {
  try {
    const reserva = await pool.query(
      `
        SELECT * FROM reservas
        JOIN clientes
        ON clientes.COD_CLI = reservas.COD_CLI
        where COD_RESERVA = ?
        `,
      [cod_reserva]
    );

    return { data: reserva };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};

//Funcion para crear reserva
export const creaReserva = async (reserva) => {
  const { nom_cli, ape_cli, rut_cli, telefono, email, fec_reserva } = reserva;
  let cod_cli = null;

  //Valida si el usuario fue registrado anteriormente
  const usuario = await pool.query(
    `
    SELECT cod_cli FROM clientes where rut_cli = ?
    `,
    [rut_cli]
  );

  cod_cli = usuario ? null : usuario[0].cod_cli;
  let newReserva = null;

  if (cod_cli) {
    //registra reserva
    newReserva = await pool.query(`INSERT INTO reservas SET ?`, {
      fec_reserva: fec_reserva,
      cod_cli: cod_cli,
    });
  } else {
    //registra usuario
    const newCliente = await pool.query(`INSERT INTO clientes SET ?`, {
      nom_cli: nom_cli,
      ape_cli: ape_cli,
      rut_cli: rut_cli,
      telefono: telefono,
      email: email,
    });
    cod_cli = newCliente.insertId;
    //registra reserva
    newReserva = await pool.query(`INSERT INTO reservas SET ?`, {
      fec_reserva: fec_reserva,
      cod_cli: cod_cli,
    });
  }

  let newReservaResponse = {
    message: "Reserva creada.",
    cod_reserva: newReserva.insertId,
    cod_cli: cod_cli,
  };

  return { data: newReservaResponse };
};

//Funcion para actualizar reserva
export const actualizaReserva = async (reserva) => {
  const {
    nom_cli,
    ape_cli,
    rut_cli,
    telefono,
    email,
    fec_reserva,
    cod_reserva,
  } = reserva;

  //Actualiza reserva y datos de usuario
  const updatedReserva = await pool.query(
    `
    UPDATE reservas r join clientes c 
    on r.cod_cli = c.cod_cli
    set fec_reserva = ?, nom_cli = ?, ape_cli = ?,
    rut_cli = ?,
    telefono = ?,
    email = ?
    WHERE r.cod_reserva = ?
    `,
    [fec_reserva, nom_cli, ape_cli, rut_cli, telefono, email, cod_reserva]
  );

  const data = {
    message: "Actualización realizada con exito",
    cod_reserva: cod_reserva,
  };

  return { data: data };
};

//Funcion para eliminar reserva
export const eliminaReserva = async (reserva) => {
  const { cod_reserva } = reserva;

  const deletedReserva = await pool.query(
    `
    DELETE FROM reservas 
    WHERE cod_reserva = ?
    `,
    [cod_reserva]
  );
  let data;
  if (deletedReserva.affectedRows > 0) {
    data = {
      message: "Reserva eliminada",
      cod_reserva: cod_reserva,
    };
  } else {
    data = {
      message: "La reserva no existe",
      cod_reserva: cod_reserva,
    };
  }

  return { data: data };
};

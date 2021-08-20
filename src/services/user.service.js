import pool from "../db/db";
import { encryptPassword } from "../lib/helpers";

//Funcion para listar usuarios
export const consultaUsuarios = async () => {
  try {
    const usuario = await pool.query(`
        SELECT cod_usu, nom_usu, email FROM usuarios
        `);
    return { data: usuario };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};
//Funcion para crear usuario
export const creaUsuario = async (usuario) => {
  try {
    //Valida que el nombre de usuario no exista
    const consultaUsuario = await pool.query(
      `SELECT cod_usu FROM usuarios where nom_usu = ?`,
      [usuario.nom_usu]
    );
    if (consultaUsuario.length) {
      return { data: { cod_usu: consultaUsuario[0].cod_usu, exists: true } };
    } else {
      //Crea usuario
      const encryptedPasswd = await encryptPassword(usuario.passwd);
      const nuevoUsuario = await pool.query(
        `
     INSERT INTO usuarios SET ? 
     `,
        {
          nom_usu: usuario.nom_usu,
          passwd: encryptedPasswd,
          email: usuario.email,
        }
      );

      return { data: { cod_usu: nuevoUsuario.insertId, exists: false } };
    }
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};
//Funcion para actualizar usuario
export const actualizaUsuario = async (usuario) => {
  try {
    //Valida que el nombre de usuario no exista
    const consultaUsuario = await pool.query(
      `SELECT cod_usu FROM usuarios where nom_usu = ?`,
      [usuario.nom_usu]
    );
    if (consultaUsuario.length) {
      return { data: { cod_usu: consultaUsuario[0].cod_usu, exists: true } };
    } else {
      const updatedUser = await pool.query(
        `UPDATE usuarios set
        nom_usu = ?,
        email = ?
        where cod_usu = ?                                    
`,
        [usuario.nom_usu, usuario.email, usuario.cod_usu]
      );
      return {
        data: { data: updatedUser, message: "Usuario Actualizado con exito" },
      };
    }
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};
//Funcion para eliminar usuario
export const eliminaUsuario = async (usuario) => {
  try {
    const { cod_usu } = usuario;
    const deletedUser = await pool.query(
      `
    DELETE FROM usuarios 
    WHERE cod_usu = ?
    `,
      [cod_usu]
    );
    return { data: deletedUser };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};

//Funcion para realizar login
export const consultaUsuario = async (cod_usu) => {
  try {
    const usuario = await pool.query(
      `SELECT cod_usu, nom_usu, email FROM usuarios where cod_usu = ?`,
      [cod_usu]
    );

    return { data: usuario[0] };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};

//Funcion para cambiar contraseña
export const cambiaContraseña = async (usuario) => {
  try {
    const { cod_usu, passwd } = usuario;
    console.log(usuario);
    const encryptedPasswd = await encryptPassword(passwd);
    const updatedUser = await pool.query(
      `UPDATE usuarios set 
       passwd = ?
       WHERE cod_usu = ?`,
      [encryptedPasswd, cod_usu]
    );

    return {
      data: { data: updatedUser, message: "Contraseña actualizada con exito" },
    };
  } catch (e) {
    const error = new Error(e);

    //Respuesta en caso de error interno
    return {
      data: [],
      error: error,
    };
  }
};

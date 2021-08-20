import bcrypt from 'bcryptjs';

//Metodo para encryptar contraseñas
export const encryptPassword = async (passwd) => {

    //Genera hash y se indica el numero de repeticiones
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwd, salt);
    return hash;

}//.


export const matchPassword = async (passwd, savedPasswd) => {

    try {
     
        return await bcrypt.compare(passwd, savedPasswd);

    }catch(e){
        console.log(e);
    }

}//.



//Evalua respuestas de metodo GET
export const evaluaGetResponses = (code, data, error) => {
    switch (code) {
        //Error Interno
        case 500:
            console.log({
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            return {
                code: code,
                message: "Internal Error",
            }
        //Datos no encontrados
        case 404:
            return {
                code: code,
                message: 'Datos no encontrados'
            }
        //Datos Incorrectos
        case 400:
            return {
                code: code,
                message: 'Datos Incorrectos'
            }
        //Datos correctos
        case 200:
            return {
                code: code,
                message: 'Ejecución exitosa',
                data: data
            }
    }
}

//Middleware para response de metodo GET
export const getResponse = (req, res) => {
    const { data, error } = req.result;
    let response;
    //Respuesta en caso de error interno
    if (error) {
        response = evaluaGetResponses(500, [], error);
    } else {
        //Respuesta para datos de entrada incorrectos
        if (data === undefined) {
            response = evaluaGetResponses(400);
        } else if (data.length) {
            //Respuesta en caso de datos
            response = evaluaGetResponses(200, data);
        } else {
            //Respuesta en caso de datos vacios
            response = evaluaGetResponses(200, data);
        }
    }

    res.status(response.code).json(response);

}



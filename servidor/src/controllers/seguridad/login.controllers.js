import {Usuario} from '../../models/seguridad/usuario.model.js';

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const {usuario, contrasena} = req.body;
        const usuarioF = await Usuario.findOne({
            where: {
                str_usuario_nombre: usuario,
                str_usuario_password: contrasena
            }
        });
        console.log("data bd",usuarioF);
        if (!usuarioF)  {
            return res.status(400).json({
                message: "Usuario o contraseña incorrectos"
            });
        }
        res.json({
            status: true,
            message: "Usuario encontrado",
            bodys: usuarioF
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el usuario",
        });
    }
};

export default {
    login
}
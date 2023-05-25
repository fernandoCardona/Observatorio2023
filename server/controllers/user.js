//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const bcrypt = require('bcryptjs');

//IMPORTS DE LA APP:
const User = require('../models/User');
const image = require('../utils/image');



const getMe = async( req, res ) => {
    //Obtenemos el use_id de req.user:
    const { user_id } = req.user;
    //console.log(user_id)
    const response = await User.findById(user_id);

    if (!response) {
        res.status(404).send({ msg: 'Usuario no encontrado'});
    }else {
        res.status(200).send(response);
    }
    
};

const getUsers = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los users:
        response = await User.find();

    } else {
        // === true queremos solo los users activos:
        response = await User.find( { active } );

    } 
    //console.log(response)
    res.status(200).send(response);
}

const createUser = async( req, res ) => {
    //Obtenemos la contraseña:
    const { firstname, lastname, company, email, password  } = req.body;

    //Pasamos email a minusculas:
    const emailLowerCase = email.toLowerCase();
    const companyLowerCase = company.toLowerCase();

    const user = new User( {...req.body, active: false, company: companyLowerCase, email: emailLowerCase });

    //Cifrar contraseña:
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
        //console.log(password);
        //console.log(hashPassword)
    user.password = hashPassword; 

    //Condicional de si llega imagen de avatar:
    
    if ( req.files.avatar ) {
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }
    
    //Guardamos usuario nuevo en la base de datos:
    user.save(( error, userStorage ) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo usuario' });
        }else {
            res.status(201).send({
                msg: 'Usuario creado correctamente',
                userStorage
            })
        }
    });
}

const updateUser = async( req, res ) => {
    const {id} = req.params;
    const userData = req.body;
 
    //Pasamos email a minusculas:
    
    
    
    if(userData.email){
        const emailLowerCase = userData.email.toLowerCase();
        userData.email = emailLowerCase;
    }

    if(userData.company){
        const companyLowerCase = userData.company.toLowerCase();
        userData.company = companyLowerCase;
    }
    
    //Controlamos el password:
    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
            //console.log(password);
            //console.log(hashPassword)
            userData.password = hashPassword;
    }else {
        delete userData.password;
    }

    //Controlamos imagen de avatar:
    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }

    //Actualizamos los datos de usuario:
    User.findByIdAndUpdate({_id: id}, userData, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el usuario' });
        }else {
            res.status(200).send({ msg: 'Actualizacion el usuario con exito' });
        }
    });
}

const deleteUser = async( req, res ) => {
    const { id } = req.params;
    User.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el usuario' });
        }else {
            res.status(200).send({ msg: 'Usuario borrado con exito' });
        }
        
    });

}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
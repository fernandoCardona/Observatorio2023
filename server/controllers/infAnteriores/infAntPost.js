
//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const InfAntPost = require('../../models/infAnteriores/infAntPost');


const createInfAntPost = async( req, res ) => {
    const infAntPost = new InfAntPost(req.body);

    //Controlamos imagen de avatar:
    if (req.files.image) {
        const imagePath = image.getFilePath(req.files.image);
        infAntPost.image = imagePath;
    }

    infAntPost.save(( error, infAntPostStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo infAntPost' });
        }else {
            res.status(201).send({
                msg: 'infAntPost creado correctamente',
                infAntPostStorage
            })
        }
    })
};

const getInfAntPost = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreHeader de forma ordenada:
        response = await InfAntPost.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreHeaderr activos:
        response = await InfAntPost.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener InfAntPost' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateInfAntPost = async( req, res ) => {
    const {id} = req.params;
    const infAntPostData = req.body;

    await deleteImagePath(id);

    //Controlamos imagen:
    if (req.files.image) {
        const imagePath = image.getFilePath(req.files.image);
        infAntPostData.image = imagePath;
    }

    InfAntPost.findByIdAndUpdate( {_id:id }, infAntPostData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el infAntPost' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del infAntPost con exito' });
        }
    });
}

const deleteInfAntPost = async( req, res ) => {
    const { id } = req.params;
    let imagePath =  '';
    
    await deleteImagePath(id);

    InfAntPost.findByIdAndDelete({_id: id}, (error) => {
        
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el InfAnterioresHeader' });
        }else {
            res.status(200).send({ msg: 'InfAnterioresHeader borrado con exito' });
        }
        
    });

}

 
    
const deleteImagePath = async (id) => {console.log('Post',id)
    try {
        const InfAntPostStored = await InfAntPost.findById(id);
        if (!InfAntPostStored) {
            throw new Error('No se ha encontrado la InfAntPost.');
        }
        const imagePath = InfAntPostStored.image;
        console.log('IMAGEPATH', imagePath);
        fs.unlink(`uploads/${imagePath}`, (error) => {
            if (error) {
                console.log('Error al borrar el archivo:', error);
            } else {
                console.log('El archivo ha sido borrado correctamente.'); 
            }
        });
    } catch (error) {
        console.log('Error al borrar el archivo:', error);
    }
};

 



module.exports = {
    createInfAntPost,
    getInfAntPost,
    updateInfAntPost,
    deleteInfAntPost
}; 
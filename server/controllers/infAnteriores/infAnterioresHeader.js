
//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const InfAnterioresHeader = require('../../models/infAnteriores/infAnterioresHeader');



const getInfAnterioresHeader = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreHeader de forma ordenada:
        response = await InfAnterioresHeader.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreHeaderr activos:
        response = await InfAnterioresHeader.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener InfAnterioresHeader' });
    } else{
        res.status(200).send(response);
    }
    
}

const createInfAnterioresHeader = async( req, res ) => {
    const infAnterioresHeader = new InfAnterioresHeader(req.body);

    //Controlamos imagen de avatar:
    if (req.files.image) {
        const imagePath = image.getFilePath(req.files.image);
        infAnterioresHeader.image = imagePath;
    }

    infAnterioresHeader.save(( error, infAnterioresHeaderStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo infAnterioresHeader' });
        }else {
            res.status(201).send({
                msg: 'infAnterioresHeader creado correctamente',
                infAnterioresHeaderStorage
            })
        }
    })
};

const updateInfAnterioresHeader = async( req, res ) => {
    const {id} = req.params;
    const infAnterioresHeaderData = req.body;

    

    //Controlamos imagen de avatar:
    if (req.files.image) {
        await deleteImagePath(id);
        const imagePath = image.getFilePath(req.files.image);
        infAnterioresHeaderData.image = imagePath;
    }

    InfAnterioresHeader.findByIdAndUpdate( {_id:id }, infAnterioresHeaderData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el infAnterioresHeader' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del infAnterioresHeader con exito' });
        }
    });
}

const deleteInfAnterioresHeader = async( req, res ) => {
    const { id } = req.params;
    await deleteImagePath(id);

    InfAnterioresHeader.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el InfAnterioresHeader' });
        }else {
            res.status(200).send({ msg: 'InfAnterioresHeader borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id) => {console.log('Post',id)
    try {
        const InfAnterioresHeaderStored = await InfAnterioresHeader.findById(id);
        if (!InfAnterioresHeaderStored) {
            throw new Error('No se ha encontrado la InfAntPost.');
        }
        const imagePath = InfAnterioresHeaderStored.image;
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
    createInfAnterioresHeader,
    getInfAnterioresHeader,
    updateInfAnterioresHeader,
    deleteInfAnterioresHeader
}; 
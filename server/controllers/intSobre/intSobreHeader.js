
//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const IntSobreHeader = require('../../models/intSobre/intSobreHeader');


const getIntSobreHeader = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreHeader de forma ordenada:
        response = await IntSobreHeader.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreHeaderr activos:
        response = await IntSobreHeader.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener IntSobreHeader' });
    } else{
        res.status(200).send(response);
    }
    
}

const createIntSobreHeader = async( req, res ) => {
    const intSobreHeader = new IntSobreHeader(req.body);

    //Controlamos imagen de avatar:
    if (req.files.image) {
        const imagePath = image.getFilePath(req.files.image);
        intSobreHeader.image = imagePath;
    }

    intSobreHeader.save(( error, intSobreHeaderStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo intSobreHeader' });
        }else {
            res.status(201).send({
                msg: 'intSobreHeader creado correctamente',
                intSobreHeaderStorage
            })
        }
    })
};



const updateIntSobreHeader = async( req, res ) => {
    const {id} = req.params;
    const intSobreHeaderData = req.body;

    let imagePath =  '';
    
    //Controlamos imagen de avatar:
    if (req.files.image) {
        await deleteImagePath(id);
        const imagePath = image.getFilePath(req.files.image);
        intSobreHeaderData.image = imagePath;
    }

    IntSobreHeader.findByIdAndUpdate( {_id:id }, intSobreHeaderData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el intSobreHeader' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del intSobreHeader con exito' });
        }
    });
}

const deleteIntSobreHeader = async( req, res ) => {
    const { id } = req.params;
    let imagePath =  '';
    
    await deleteImagePath(id);

    IntSobreHeader.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeHeader' });
        }else {
            res.status(200).send({ msg: 'IntSobreHeader borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id) => {console.log('Post',id)
    try {
        const IntSobreHeaderStored = await IntSobreHeader.findById(id);
        if (!IntSobreHeaderStored) {
            throw new Error('No se ha encontrado la IntSobreHeader.');
        }
        const imagePath = IntSobreHeaderStored.image;
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
    createIntSobreHeader,
    getIntSobreHeader,
    updateIntSobreHeader,
    deleteIntSobreHeader
}; 
//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const video = require('../../utils/video');
const HomeHeader = require('../../models/home/homeHeader');


const createHomeHeader = async( req, res ) => {
    const homeHeader = new HomeHeader(req.body);

    //Controlamos imagen de avatar:
    if (req.files.video) {
        const videoPath = video.getFilePath(req.files.video);
        homeHeader.video = videoPath;
    }

    homeHeader.save(( error, homeHeaderStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo homeHeader' });
        }else {
            res.status(201).send({
                msg: 'HomeHeader creado correctamente',
                homeHeaderStorage
            })
        }
    })
};

const getHomeHeader = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los HomeHeader de forma ordenada:
        response = await HomeHeader.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los HomeHeader activos:
        response = await HomeHeader.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener HomeHeader' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateHomeHeader = async( req, res ) => {
    const {id} = req.params;
    const homeHeaderData = req.body;

  

    //Controlamos imagen de avatar:
    if (req.files.video) {
        await deleteImagePath(id);
        const videoPath = video.getFilePath(req.files.video);
        homeHeaderData.video = videoPath;
    }

    HomeHeader.findByIdAndUpdate( {_id:id }, homeHeaderData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el homeHeader' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del homeHeader con exito' });
        }
    });
}

const deleteHomeHeader = async( req, res ) => {
    const { id } = req.params;

    await deleteImagePath(id);

    HomeHeader.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeHeader' });
        }else {
            res.status(200).send({ msg: 'HomeHeader borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id) => {console.log('Post',id)
    try {
        const HomeHeaderStored = await HomeHeader.findById(id);
        if (!HomeHeaderStored) {
            throw new Error('No se ha encontrado la HomeHeader.');
        }
        const imagePath = HomeHeaderStored.video;
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
    createHomeHeader,
    getHomeHeader,
    updateHomeHeader,
    deleteHomeHeader
}; 
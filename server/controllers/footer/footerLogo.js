//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const FooterLogo = require('../../models/footer/footerLogo');

const createFooterLogo = async( req, res ) => {
    const footerLogo = new FooterLogo(req.body);

    //Controlamos imagen de avatar:
    if (req.files.image) {
        const imagePath = image.getFilePath(req.files.image);
        footerLogo.image = imagePath;
    }

    footerLogo.save(( error, footerLogoStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo social' });
        }else {
            res.status(201).send({
                msg: 'Social creado correctamente',
                footerLogoStorage
            })
        }
    })
};

const getFooterLogos = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los FooterLogo de forma ordenada:
        response = await FooterLogo.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los FooterLogos activos:
        response = await FooterLogo.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener FooterLogos' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateFooterLogo = async( req, res ) => {
    const {id} = req.params;
    const footerLogoData = req.body;

    

    //Controlamos imagen de avatar:
    if (req.files.image) {
        await deleteImagePath(id);
        const imagePath = image.getFilePath(req.files.image);
        footerLogoData.image = imagePath;
    }

    FooterLogo.findByIdAndUpdate( {_id:id }, footerLogoData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el FooterLogo' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del FooterLogo con exito' });
        }
    });
}

const deleteFooterLogo = async( req, res ) => {
    const { id } = req.params;

    await deleteImagePath(id); 

    FooterLogo.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el FooterLogo' });
        }else {
            res.status(200).send({ msg: 'FooterLogo borrado con exito' });
        }
        
    });

}
const deleteImagePath = async (id) => {console.log('Post',id)
    try {
        const FooterLogoStored = await FooterLogo.findById(id);
        if (!FooterLogoStored) {
            throw new Error('No se ha encontrado la FooterLogo.');
        }
        const imagePath = FooterLogoStored.image;
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
    createFooterLogo,
    getFooterLogos,
    updateFooterLogo,
    deleteFooterLogo
};
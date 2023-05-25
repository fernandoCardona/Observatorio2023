//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const Social = require('../../models/footer/social');

const createSocial = async( req, res ) => {
    const social = new Social(req.body);

    //Controlamos imagen de avatar:
    if (req.files.image1) {
        const imagePath1 = image.getFilePath(req.files.image1);
        social.image1 = imagePath1;
    }
    if (req.files.image2) {
        const imagePath2 = image.getFilePath(req.files.image2);
        social.image2 = imagePath2;
    }

    social.save(( error, socialStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo social' });
        }else {
            res.status(201).send({
                msg: 'Social creado correctamente',
                socialStorage
            })
        }
    })
};

const getSocials = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los Social de forma ordenada:
        response = await Social.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los Socials activos:
        response = await Social.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener Socials' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateSocial = async( req, res ) => {
    const {id} = req.params;
    const socialData = req.body;

    //await deleteImagePath(id);
    const SocialStored = await Social.findById(id);

    //Controlamos imagen de avatar:
    // if (req.files.image) {
    //     const imagePath = image.getFilePath(req.files.image);
    //     socialData.image = imagePath;
    // }
    if (req.files.image1 ) {
        await deleteImagePath1(id);
        const imagePath1 = image.getFilePath(req.files.image1);
        socialData.image1 = imagePath1;
    } 
    if (req.files.image2) {
        await deleteImagePath2(id);
        const imagePath2 = image.getFilePath(req.files.image2);
        socialData.image2 = imagePath2;
    }

    Social.findByIdAndUpdate( {_id:id }, socialData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el Social' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del Social con exito' });
        }
    }); 
} 

const deleteSocial = async( req, res ) => {
    const { id } = req.params;
    let imagePath =  '';
    
    await deleteImagePath(id);

    Social.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el Social' });
        }else {
            res.status(200).send({ msg: 'Social borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id, image1, image2) => {console.log('Post',id)
    try {
        const SocialStored = await Social.findById(id);
        if (!SocialStored) {
            throw new Error('No se ha encontrado la InfAntPost.');
        }
        
        if (SocialStored.image ){
            const imagePath = SocialStored.image;
            console.log('IMAGEPATH', imagePath);
            fs.unlink(`uploads/${imagePath}`, (error) => {
                if (error) {
                    console.log('Error al borrar el archivo:', error);
                } else {
                    console.log('El archivo ha sido borrado correctamente.'); 
                }
            });
        }  

    } catch (error) {
        console.log('Error al borrar el archivo:', error);
    }
};
const deleteImagePath1 = async (id, image1) => { 
    try {
        const SocialStored = await Social.findById(id);
        if (!SocialStored) {
            throw new Error('No se ha encontrado la InfAntPost.');
        }
        
        if (SocialStored.image1 ){
            const imagePath1 = SocialStored.image1;
            console.log('IMAGEPATH1', imagePath1);
            fs.unlink(`uploads/${imagePath1}`, (error) => {
                if (error) {
                    console.log('Error al borrar el archivo:', error);
                } else {
                    console.log('El archivo ha sido borrado correctamente.'); 
                }
            });
        }

    } catch (error) {
        console.log('Error al borrar el archivo:', error);
    }
};
const deleteImagePath2 = async (id, image1, image2) => {console.log('Post',id)
    try {
        const SocialStored = await Social.findById(id);
        if (!SocialStored) {
            throw new Error('No se ha encontrado la InfAntPost.');
        }

        if (SocialStored.image2 ){
            const imagePath2 = SocialStored.image2;
            console.log('IMAGEPATH2', imagePath2);
           fs.unlink(`uploads/${imagePath2}`, (error) => {
                if (error) {
                    console.log('Error al borrar el archivo:', error);
                } else {
                    console.log('El archivo ha sido borrado correctamente.'); 
                }
            });
        }

    } catch (error) {
        console.log('Error al borrar el archivo:', error);
    }
};

module.exports = {
    createSocial,
    getSocials,
    updateSocial,
    deleteSocial
};
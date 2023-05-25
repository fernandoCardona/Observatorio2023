//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const lottie = require('../../utils/lotties');
const HomeArticle = require('../../models/home/homeArticle');

const getHomeArticles = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los Social de forma ordenada:
        response = await HomeArticle.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los Socials activos:
        response = await HomeArticle.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener HomeArticles' });
    } else{
        res.status(200).send(response);
    }
    
}

const createHomeArticle = async( req, res ) => {
    const homeArticle = new HomeArticle(req.body);
    
    //Controlamos imagen de avatar:
    if (req.files.image1) {
        
        const imagePath1 = image.getFilePath(req.files.image1);
        homeArticle.image1 = imagePath1;
    }
    if (req.files.lottie) {
        await deleteLottiePath(id);
        const lottiePath = lottie.getFilePath(req.files.lottie);
        homeArticle.lottie = lottiePath;
     }

    homeArticle.save(( error, homeArticleStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo social' });
        }else {
            res.status(201).send({
                msg: 'Social creado correctamente',
                homeArticleStorage
            })
        }
    })
};

const updateHomeArticle = async( req, res ) => {
    const {id} = req.params;
    const homeArticleData = req.body;
 

    //Controlamos imagen de avatar:
    if (req.files.image1) {
        await deleteImagePath(id);
        const imagePath1 = image.getFilePath(req.files.image1);
        homeArticleData.image1 = imagePath1;
    }

    if (req.files.lottie) {
         await deleteLottiePath(id);
         const lottiePath = lottie.getFilePath(req.files.lottie);
         homeArticleData.lottie = lottiePath;
    }
    
    HomeArticle.findByIdAndUpdate( {_id:id }, homeArticleData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el homeArticle' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del homeArticle con exito' });
        }
    });
}

const deleteHomeArticle = async( req, res ) => {
    const { id } = req.params;

    await deleteImagePath(id); 
    await deleteLottiePath(id);

    HomeArticle.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeArticle' });
        }else {
            res.status(200).send({ msg: 'HomeArticle borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id) => {
    try {
        const HomeArticleStored = await HomeArticle.findById(id);
        if (!HomeArticleStored) {
            throw new Error('No se ha encontrado la HomeArticle.');
        }
        const imagePath1 = HomeArticleStored.image1;
      
        fs.unlink(`uploads/${imagePath1}`, (error) => {
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
const deleteLottiePath = async (id) => {
    try {
        const HomeArticleStored = await HomeArticle.findById(id);
        if (!HomeArticleStored) {
            throw new Error('No se ha encontrado la HomeArticle.');
        }
        const lottiePath = HomeArticleStored.lottie;
        //console.log('LOTTIEPATH', lottiePath);
        fs.unlink(`uploads/${lottiePath}`, (error) => {
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
    createHomeArticle,
    getHomeArticles,
    updateHomeArticle,
    deleteHomeArticle
};
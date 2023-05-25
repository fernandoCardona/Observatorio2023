//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const IntSobreBlockTxt = require('../../models/intSobre/intSobreBlockTxt');

const getIntSobreBlockTxt = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreBlockTxt de forma ordenada:
        response = await IntSobreBlockTxt.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreBlockTxt activos:
        response = await IntSobreBlockTxt.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener IntSobreBlockTxt' });
    } else{
        res.status(200).send(response);
    }
    
}

const createIntSobreBlockTxt = async( req, res ) => {
    const intSobreBlockTxt = new IntSobreBlockTxt(req.body);

    //Controlamos imagen de IntSobreBlockTxt:
    if (req.files.image1) {
        const imagePath = image.getFilePath(req.files.image1);
        intSobreBlockTxt.image1 = imagePath;
    }
    if (req.files.image2) {
        const imagePath = image.getFilePath(req.files.image2);
        intSobreBlockTxt.image2 = imagePath;
    }

    intSobreBlockTxt.save(( error, intSobreBlockTxtStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo intSobreBlockTxt' });
        }else {
            res.status(201).send({
                msg: 'IntSobreBlockTxt creado correctamente',
                intSobreBlockTxtStorage
            })
        }
    })
};

const updateIntSobreBlockTxt = async( req, res ) => {
    const {id} = req.params;
    const intSobreBlockTxtData = req.body;

    const image1 = req.files.image1;
    const image2 = req.files.image2;
    

     //Controlamos imagen de IntSobreBlockTxt:
     if (req.files.image1) { 
        await deleteImagePath(id,  image1);
        const imagePath = image.getFilePath(req.files.image1);
        intSobreBlockTxtData.image1 = imagePath;
    }
    if (req.files.image2) {
        await deleteImagePath(id, image2);
        const imagePath = image.getFilePath(req.files.image2);
        intSobreBlockTxtData.image2 = imagePath;
    }

    IntSobreBlockTxt.findByIdAndUpdate( {_id:id }, intSobreBlockTxtData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el IntSobreBlockTxt' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del IntSobreBlockTxt con exito' });
        }
    });
}

const deleteIntSobreBlockTxt = async( req, res ) => {
    const { id } = req.params;
    
   
    await deleteImagePath(id);

    IntSobreBlockTxt.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el IntSobreBlockTxt' });
        }else {
            res.status(200).send({ msg: 'IntSobreBlockTxt borrado con exito' });
        }
        
    });

}

const deleteImagePath = async (id,  newImage1,  newImage2) => {console.log('Post',id)
    try {
        const IntSobreBlockTxtStored = await IntSobreBlockTxt.findById(id);
        if (!IntSobreBlockTxtStored) {
            throw new Error('No se ha encontrado Menu.');
        }
         
        // console.log('MenuStored.navImage1',MenuStored.navImage1)
        // console.log('MenuStored.navImage2',MenuStored.navImage2)
        // console.log('newNavIamge1',newNavIamge1)
        // console.log('newNavIamge2',newNavIamge2)
         if (IntSobreBlockTxtStored.image1 ){
             const imagePath = IntSobreBlockTxtStored.image1;
             //console.log('IMAGEPATH', imagePath);
             fs.unlink(`uploads/${imagePath}`, (error) => {
                 if (error) {
                     console.log('Error al borrar el archivo:', error);
                 } else {
                     console.log('El archivo ha sido borrado correctamente.'); 
                 }
             });
         }
         
         if (IntSobreBlockTxtStored.image2 ){
             const imagePath = IntSobreBlockTxtStored.image2;
             //console.log('IMAGEPATH', imagePath);
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

module.exports = {
    createIntSobreBlockTxt,
    getIntSobreBlockTxt,
    updateIntSobreBlockTxt,
    deleteIntSobreBlockTxt
};
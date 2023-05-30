
//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const image = require('../../utils/image');
const InfAnterioresBlockTxt = require('../../models/infAnteriores/infAntBlockTxt');

const getInfAnterioresBlockTxt = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los InfAnterioresBlockTx de forma ordenada:
        response = await InfAnterioresBlockTxt.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los InfAnterioresBlockTx activos:
        response = await InfAnterioresBlockTxt.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener InfAnterioresBlockTxt' });
    } else{
        res.status(200).send(response);
    }
    
}

const createInfAnterioresBlockTxt = async( req, res ) => {
    const infAnterioresBlockTxt = new InfAnterioresBlockTxt(req.body);
    //console.log('image1',req.body)
    
     //Controlamos imagen de InfAnterioresBlockTx:
     if (req.files?.image1) {
         const imagePath = image.getFilePath(req.files.image1);
         infAnterioresBlockTxt.image1 = imagePath;
     }
     if (req.files?.image2) {
         const imagePath = image.getFilePath(req.files.image2);
         infAnterioresBlockTxt.image2 = imagePath;
     }

    infAnterioresBlockTxt.save(( error, infAnterioresBlockTxtStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo infAnterioresBlockTxt' });
        }else {
            res.status(201).send({
                msg: 'infAnterioresBlockTxt creado correctamente',
                infAnterioresBlockTxtStorage
            })
        } 
    })
};

const updateInfAnterioresBlockTxt = async( req, res ) => {
    const {id} = req.params;
    const infAnterioresBlockTxtData = req.body; 
    //console.log('infAnterioresBlockTxtData', infAnterioresBlockTxtData)

     const image1 = req.files.image1;
     const image2 = req.files.image2;
    

     //Controlamos imagen de InfAnterioresBlockTx:
     if (req.files.image1) { 
        await deleteImagePath(id,  image1);
        const imagePath = image.getFilePath(req.files.image1);
        infAnterioresBlockTxtData.image1 = imagePath;
    }
    if (req.files.image2) {
        await deleteImagePath(id, image2);
        const imagePath = image.getFilePath(req.files.image2);
        infAnterioresBlockTxtData.image2 = imagePath;
    }

    InfAnterioresBlockTxt.findByIdAndUpdate( {_id:id }, infAnterioresBlockTxtData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el infAnterioresBlockTxt' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del infAnterioresBlockTxt con exito' });
        }
    });
}

const deleteInfAnterioresBlockTxt = async( req, res ) => {
    const { id } = req.params;

    await deleteImagePath(id);

    InfAnterioresBlockTxt.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el InfAnterioresBlockTxt' });
        }else {
            res.status(200).send({ msg: 'InfAnterioresBlockTxt borrado con exito' });
        }
        
    });

}
const deleteImagePath = async (id,  image1,  image2) => {
    //console.log('Post',id)
    try {
        const InfAnterioresBlockTxtStorage = await InfAnterioresBlockTxt.findById(id);
        if (!InfAnterioresBlockTxtStorage) {
            throw new Error('No se ha encontrado InfAnterioresBlockTxtStorage.');
        }
         
        // console.log('MenuStored.navImage1',MenuStored.navImage1)
        // console.log('MenuStored.navImage2',MenuStored.navImage2)
        // console.log('newNavIamge1',newNavIamge1)
        // console.log('newNavIamge2',newNavIamge2)
         if (InfAnterioresBlockTxtStorage.image1 ){
             const imagePath = InfAnterioresBlockTxtStorage.image1;
             //console.log('IMAGEPATH', imagePath);
             fs.unlink(`uploads/${imagePath}`, (error) => {
                 if (error) {
                     console.log('Error al borrar el archivo:', error);
                 } else {
                     console.log('El archivo ha sido borrado correctamente.'); 
                 }
             });
         }
         
         if (InfAnterioresBlockTxtStorage.image2 ){
             const imagePath = InfAnterioresBlockTxtStorage.image2;
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
    createInfAnterioresBlockTxt,
    getInfAnterioresBlockTxt,
    updateInfAnterioresBlockTxt,
    deleteInfAnterioresBlockTxt
}; 
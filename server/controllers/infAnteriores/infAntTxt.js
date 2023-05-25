
//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:
const InfAnterioresBlockTxt = require('../../models/infAnteriores/infAntBlockTxt');

const getInfAnterioresBlockTxt = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los IntSobreHeader de forma ordenada:
        response = await InfAnterioresBlockTxt.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los IntSobreHeaderr activos:
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
    console.log(req.body)
    
    // //Controlamos imagen de IntSobreBlockTxt:
    // if (req.files.image1) {
    //     const imagePath = image.getFilePath(req.files.image1);
    //     intSobreBlockTxt.image1 = imagePath;
    // }
    // if (req.files.image2) {
    //     const imagePath = image.getFilePath(req.files.image2);
    //     intSobreBlockTxt.image2 = imagePath;
    // }

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
    InfAnterioresBlockTxt.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el InfAnterioresBlockTxt' });
        }else {
            res.status(200).send({ msg: 'InfAnterioresBlockTxt borrado con exito' });
        }
        
    });

}

module.exports = {
    createInfAnterioresBlockTxt,
    getInfAnterioresBlockTxt,
    updateInfAnterioresBlockTxt,
    deleteInfAnterioresBlockTxt
}; 
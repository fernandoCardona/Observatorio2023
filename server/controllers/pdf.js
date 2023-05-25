//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS:
const fs = require('fs');
//IMPORTS DE LA APP:
const pdf = require('../utils/pdf');
const Pdf = require('../models/pdf');

const getPdfs = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los Social de forma ordenada:
        response = await Pdf.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los Socials activos:
        response = await Pdf.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener Pdfs' });
    } else{
        res.status(200).send(response);
    }
    
}

const createPdf = async( req, res ) => {
    const pdf = new Pdf(req.body);
    
    //Controlamos pdfn de avatar:
    if (req.files.pdf) {
        
        const pdfPath = pdf.getFilePath(req.files.pdf);
        homeArticle.pdf = pdfPath;
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

const updatePdf = async( req, res ) => {
    const {id} = req.params;
    const homeArticleData = req.body;
 

    //Controlamos pdfn de avatar:
    if (req.files.pdf) {
        await deletePdfPath(id);
        const pdfPath = pdf.getFilePath(req.files.pdf);
        pdfData.pdf = pdfPath;
    }

    Pdf.findByIdAndUpdate( {_id:id }, pdfData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el pdf' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del pdf con exito' });
        }
    });
}

const deletePdf = async( req, res ) => {
    const { id } = req.params;

    await deletePdfPath(id); 
  

    Pdf.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeArticle' });
        }else {
            res.status(200).send({ msg: 'HomeArticle borrado con exito' });
        }
        
    });

}

const deletePdfPath = async (id) => {
    try {
        const HomeArticleStored = await HomeArticle.findById(id);
        if (!HomeArticleStored) {
            throw new Error('No se ha encontrado la HomeArticle.');
        }
        const pdfPath1 = HomeArticleStored.pdf1;
      
        fs.unlink(`uploads/${pdfPath1}`, (error) => {
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
    createPdf,
    getPdfs,
    updatePdf,
    deletePdf
};
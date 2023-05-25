//IMPORTS DEPENDENCIAS:

//IMPORTS DE LA APP:

const HomeHeaderBox = require('../../models/home/homeHeaderBox');

const createHomeHeaderBox = async( req, res ) => {
    const homeHeaderBox = new HomeHeaderBox(req.body);

    homeHeaderBox.save(( error, homeHeaderBoxStorage ) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al crear el nuevo homeHeaderBox' });
        }else {
            res.status(201).send({
                msg: 'homeHeaderBox creado correctamente',
                homeHeaderBoxStorage
            })
        }
    })
};

const getHomeHeaderBox = async( req, res ) => {
    const { active } = req.query; 
    let response = null;

    if ( active === undefined ) {
        // === undefined queremos todos los HomeHeaderBox de forma ordenada:
        response = await HomeHeaderBox.find().sort({order: 'asc'});

    } else {
        // === true queremos solo los HomeHeaderBox activos:
        response = await HomeHeaderBox.find( { active } ).sort({order: 'asc'});

    } 
    //console.log(response)
    if (!response) {
        res.status(400).send({ msg: 'Error al obtener HomeHeaderBoxs' });
    } else{
        res.status(200).send(response);
    }
    
}

const updateHomeHeaderBox = async( req, res ) => {
    const {id} = req.params;
    const homeHeaderBoxData = req.body;

    HomeHeaderBox.findByIdAndUpdate( {_id:id }, homeHeaderBoxData, (error) =>{
        if (error) {
            res.status(400).send({ msg: 'Error al actualizar el HomeHeaderBox' });
        }else {
            res.status(200).send({ msg: 'Actualizacion del HomeHeaderBox con exito' });
        }
    });
}

const deleteHomeHeaderBox = async( req, res ) => {
    const { id } = req.params;
    HomeHeaderBox.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({ msg: 'Error al borrar el HomeHeaderBox' });
        }else {
            res.status(200).send({ msg: 'Social borrado con HomeHeaderBox' });
        }
        
    });

}

module.exports = {
    createHomeHeaderBox,
    getHomeHeaderBox,
    updateHomeHeaderBox,
    deleteHomeHeaderBox
};
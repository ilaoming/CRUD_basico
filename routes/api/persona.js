const router = require('express').Router();
const {Persona} = require('../../db');

//GET all Persona
router.get('/persona', async (req,res) =>{
    const persona = await Persona.findAll({
        attributes: ['id','name','lastName','country','occupation','dateOfBirth'],    
    });
    res.json(persona);
});


//POST Persona
router.post('/persona', async (req,res) =>{
    const persona = await Persona.create(req.body);
    res.json(persona);
});

//PUT Persona
router.put('/persona/:id', async (req,res) =>{
    const id = req.params.id
    await Persona.update(req.body,{
        where: {id : id}
    });
    res.json({success : `Persona update id: ${id}`});
});

//DELETE persona
router.delete('/persona/:id', async (req,res) =>{
    const id = req.params.id
    await Persona.destroy({
        where: {id : id}
    });
    res.json({success : `Persona delete id: ${id}`});
});


module.exports = router
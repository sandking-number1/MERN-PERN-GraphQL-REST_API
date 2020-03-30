const router = require('express').Router();
const pool = require('../db');

router.post('/', async (req, res) =>{
    
    const { username } = req.body;
    const newUser = await pool.query(
        'INSERT INTO users (username) VALUES($1)',
        [username]
    ).then(() => res.json('User addded!'))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/', async (req, res) =>{ 
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch(err) {
        console.error(err.message);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM users WHERE id = $1', [id])
        .then(user => res.json(user.rows[0]))
        .catch(err => res.status(400).json('Error: ' + err));
});

//req.query.url  //Obtener el url despues de /users?url=https://wwww.google.com 

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    await pool.query(
        'UPDATE users set username = $1 WHERE id = $2',
        [username, id]
    )
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [
        id
    ]).then(() => res.json('User was deleted!'))
      .catch(err => res.status(400).json('Error :' + err));  
});


module.exports = router;
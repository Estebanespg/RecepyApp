const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
    res.render('recipes/add');
});

router.post('/add', isLoggedIn, async (req, res) =>{
    const { title, description, ingredients, video } = req.body;
    const newRecipe = {
        title,
        description,
        ingredients,
        video,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO recipes set ?', [newRecipe]);
    res.redirect('/recipes');
});

router.get('/', isLoggedIn, async (req, res) =>{
    const recipes = await pool.query('SELECT * FROM recipes WHERE user_id = ?', [req.user.id]);
    res.render('recipes/list', { recipes });
});

//DELETE
router.get('/delete/:id', isLoggedIn,async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM recipes WHERE ID = ?', [id]);
    res.redirect('/recipes');
});

//EDIT
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const recipes = await pool.query('SELECT * FROM recipes WHERE id = ?', [id]);
    res.render('recipes/edit', { recipe: recipes[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const { title, description, ingredients, video } = req.body;
    const newRecipe = {
        title,
        description,
        ingredients,
        video
    };
    await pool.query('UPDATE recipes set ? WHERE id = ?', [newRecipe, id]);
    res.redirect('/recipes');
});

module.exports = router;
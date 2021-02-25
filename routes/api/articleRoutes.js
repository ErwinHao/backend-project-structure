const router = require('express').Router();
const isAuth = require('../../middlewares/isAuth');

const { getArticles, postArticle, getArticle } = require('../../controllers/articleController');

router.get('/', isAuth, getArticles);
router.get('/:id', getArticle);
router.post('/', isAuth, postArticle)

module.exports = router;
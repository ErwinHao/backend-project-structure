const { User, Article } = require('../models');
const createError = require('http-errors');

exports.getArticles = async (req, res, next) => {
  console.log(req);
  try {
    const fetchedArticles = await Article.findAll();

    return res.status(200).json({
      success: true,
      articles: fetchedArticles
    })
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500
    }
    return next(err)
  }
}

exports.postArticle = async (req, res, next) => {
  const { title, body } = req.body;

  const loadedUser = req.user;

  const createdArticle = await loadedUser.createArticle({
    title,body
  });

  return res.status(200).json({
    success: true,
  })
}

exports.getArticle = async (req, res, next) => {
  const  id  = req.params.id;
  console.log(id);

  try {
    const fetchedUserArticle = await Article.findOne({ where: {id}, include: [ User ] })

    console.log(fetchedUserArticle);

    if(!fetchedUserArticle){
      const error = createError(404, 'Article not found');
      return next(error)
    }

    return res.status(200).json({
      success: true,
      article: fetchedUserArticle
    })
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500
    }
    return next(err);
  }
}
const ArticleModel = require('../models/articleModel.js');

const createArticle = (newArticle) => {
  ArticleModel.create({
    title: newArticle.title,
    body: newArticle.body,
  });

  // const articleInstance = Article.build({
  //   title: newArticle.title,
  //   body: newArticle.body,
  // });

  // articleInstance.save((err, newArticle) => {
  //   if (err) {
  //     res.send(500, err);
  //   } else {
  //     res.send (200, newArticle.dataValues);
  //   }
  // });
};

module.exports = createArticle;

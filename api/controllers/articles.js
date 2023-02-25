const articles = require('../data/articles-data.json');

module.exports.getAll = (req, res) => {
    res.send(articles);
};
module.exports.get = (req, res) => {
    let slug = req.query.slug;
    let article = articles.articles.find(article => article.slug === slug);
    res.send(article);
};
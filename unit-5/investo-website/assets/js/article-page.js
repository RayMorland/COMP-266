const articleContainer = document.getElementById("article-container");
let articleTitle = document.getElementById("article-title");
let articleAuthor = document.getElementById("article-author");
let articleDate = document.getElementById("article-publish-date");
let articleMastheadImage = document.getElementById("article-masthead-img");
let articleContent = document.getElementById("article-content");
let articleTags = document.getElementById("article-tags");
let nextArticles = document.getElementById("next-article-links");
let article;

const articleSlug = window.location.pathname.split("/").splice(-1)[0].split(".")[0];

const articleData = articles;

article = articleData.find(artcl => artcl.slug == articleSlug);

console.log(article);

if (article) {
    console.log(article.title);
    document.title = `Investo: ${article.title}`;
    articleTitle.textContent = article.title;
    articleAuthor.textContent = article.author;
    articleDate.textContent = article.publishDate;
    articleMastheadImage.setAttribute("src", article.imageUrl);
    articleContent.innerHTML = article.content;
    articleTags.innerHTML = `
        ${
            article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        }
    `;
    article.nextArticles.forEach(article => {
        nextArticle = articleData.find(artcl => artcl.slug == article);
        console.log(nextArticle);
        let nextArticleEl = document.createElement("a");
        nextArticleEl.setAttribute("href", `../../learn/article/${nextArticle.slug}.html`);
        nextArticleEl.setAttribute("class", "column flex-1 white-panel m-0 next-article");
        nextArticleEl.innerHTML = `
            <img src=${nextArticle.imageUrl} alt="coins"/>
            <div id="next-article-one-description" class="article-description">
                <p class="article-date">${nextArticle.publishDate}</p>
                <h4>${nextArticle.title}</h4>
                <p class="m-0 author">${nextArticle.author}</p>
            </div>
        `;
        nextArticles.append(nextArticleEl);
    })
} else {
    articleContainer.innerHTML = "<h1>Can't find article</h1>"
}
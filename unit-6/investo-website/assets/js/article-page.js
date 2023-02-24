/*
 * title: article-page.js
 * description: functions required for the individual article pages
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// get all of the elements that will be updated by the code
const articleContainer = document.getElementById("article-container");
let articleTitle = document.getElementById("article-title");
let articleAuthor = document.getElementById("article-author");
let articleDate = document.getElementById("article-publish-date");
let articleMastheadImage = document.getElementById("article-masthead-img");
let articleContent = document.getElementById("article-content");
let articleTags = document.getElementById("article-tags");
let nextArticles = document.getElementById("next-article-links");
// declare article variable to hold this page's article
let article;

// store a local copy of the article data array
const articleData = articles;

// function to load article data and populate the page
function loadArticle() {
  // get the article's slug from the url
  const articleSlug = window.location.pathname
    .split("/")
    .splice(-1)[0]
    .split(".")[0];

  // find the article in the article data using it's slug
  article = articleData.find((artcl) => artcl.slug == articleSlug);

  // if the article exists
  if (article) {
    // set the corresponding HTML elements to the articles data
    document.title = `Investo: ${article.title}`;
    articleTitle.textContent = article.title;
    articleAuthor.textContent = article.author;
    articleDate.textContent = article.publishDate;
    articleMastheadImage.setAttribute("src", article.imageUrl);
    articleContent.innerHTML = article.content;
    articleTags.innerHTML = `
            ${article.tags
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("")}
        `;

    // for each next article get next article data and append next article card
    article.nextArticles.forEach((article) => {
      nextArticle = articleData.find((artcl) => artcl.slug == article);
      console.log(nextArticle);
      let nextArticleEl = document.createElement("a");
      nextArticleEl.setAttribute(
        "href",
        `../../learn/article/${nextArticle.slug}.html`
      );
      nextArticleEl.setAttribute(
        "class",
        "column flex-1 white-panel m-0 next-article"
      );
      nextArticleEl.innerHTML = `
                <img src=${nextArticle.imageUrl} alt="coins"/>
                <div id="next-article-one-description" class="article-description">
                    <p class="article-date">${nextArticle.publishDate}</p>
                    <h4>${nextArticle.title}</h4>
                    <p class="m-0 author">${nextArticle.author}</p>
                </div>
            `;
      nextArticles.append(nextArticleEl);
    });
  } else {
    articleContainer.innerHTML = "<h1>Can't find article</h1>";
  }
}

// load the article page 
loadArticle();

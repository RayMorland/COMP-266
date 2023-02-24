/*
 * title: article-page.js
 * description: functions required for the individual article pages
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// article data
let articleData;

// declare article variable to hold this page's article
let article;

// function to load article data and populate the page
async function loadArticle() {
  // get all of the elements that will be updated by the code
  let articleContainer = $("#article-container");
  let articleTitle = $("#article-title");
  let articleAuthor = $("#article-author");
  let articleDate = $("#article-publish-date");
  let articleMastheadImage = $("#article-masthead-img");
  let articleContent = $("#article-content");
  let articleTags = $("#article-tags");
  let nextArticles = $("#next-article-links");

  // get the article's slug from the url
  const articleSlug = window.location.pathname
    .split("/")
    .splice(-1)[0]
    .split(".")[0];

  await $.getJSON("/unit-6/investo-website/data/articles-data.json", (res) => {
    articleData = res.articles;
  });

  // find the article in the article data using it's slug
  article = articleData.find((artcl) => artcl.slug == articleSlug);
  console.log(article);
  // if the article exists
  if (article) {
    // set the corresponding HTML elements to the articles data
    document.title = `Investo: ${article.title}`;
    articleTitle.text(article.title);
    articleAuthor.text(article.author);
    console.log(articleDate);
    articleDate.text(article.publishDate);
    articleMastheadImage.attr("src", article.imageUrl);
    articleContent.html(article.content);
    articleTags.html(`
            ${article.tags
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("")}
        `);

    // for each next article get next article data and append next article card
    article.nextArticles.forEach((article) => {
      nextArticle = articleData.find((artcl) => artcl.slug == article);
      let nextArticleEl = $("<a></a>");
      nextArticleEl.attr(
        "href",
        `../../learn/article/${nextArticle.slug}.html`
      );
      nextArticleEl.attr("class", "column flex-1 white-panel m-0 next-article");
      nextArticleEl.html(`
                <img src=${nextArticle.imageUrl} alt="coins"/>
                <div id="next-article-one-description" class="article-description">
                    <p class="article-date">${nextArticle.publishDate}</p>
                    <h4>${nextArticle.title}</h4>
                    <p class="m-0 author">${nextArticle.author}</p>
                </div>
            `);
      nextArticles.append(nextArticleEl);
    });
  } else {
    articleContainer.html("<h1>Can't find article</h1>");
  }
}

$(
  // load the article page
  loadArticle()
);

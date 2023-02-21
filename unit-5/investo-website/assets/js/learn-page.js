/*
 * title: learn-page.js
 * description: functions required for the learn page
 * date: February 19, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// get the learn page article card container
let learnArticles = document.getElementById("learn-articles");
//store local copy of the articles data array
let articlesData = articles;

// function to create an article card for each article in the article data array
function loadLearnPage() {
  // if the data array contains 1 or more articles
  if (articlesData.length > 0) {
    // for each article create an article card and append it to the learn page
    // article card container
    articlesData.forEach((article) => {
      let articleCard = document.createElement("a");
      articleCard.setAttribute("href", `learn/article/${article.slug}.html`);
      articleCard.setAttribute(
        "class",
        "article-card white-panel responsive-row m-0 gap-20 justify-between"
      );
      articleCard.innerHTML = `
            <div class="column justify-between gap-20 m-0 w-50-100">
                <div class="column gap-10 m-0">
                    <p class="article-date">${article.publishDate}</p>
                    <h3>${article.title}</h3>
                    <p class="m-0 author">${article.author}</p>
                </div>
                <div class="row gap-10 m-0 tags">
                    ${article.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
            </div>
            <div class="image-wrapper">
                <img
                src=${article.imageUrl}
                alt=""
                id="article-main-image"
                />
            </div>
          `;
      learnArticles.append(articleCard);
    });
  } else {
    learnArticles.innerHTML = "<h1>Can't find article</h1>";
  }
}

// load learn page data on page load
loadLearnPage();

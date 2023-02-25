/*
 * title: learn-page.js
 * description: functions required for the learn page
 * date: February 24, 2023
 * @author Raymond Morland
 * @version 1.0
 * @copyright 2023 Raymond Morland
 */

// function to create an article card for each article in the article data array
function loadLearnPage() {
  // get the learn page article card container
  let learnArticles = $("#learn-articles");
  // get article data from json file using jQuery
  $.getJSON("/unit-6/investo-website/data/articles-data.json", (res) => {
    const articlesData = res.articles;
    // if the data array contains 1 or more articles
    if (articlesData.length > 0) {
      // for each article create an article card and append it to the learn page
      // article card container
      articlesData.forEach((article) => {
        let articleCard = $("<a></a>");
        articleCard.attr("href", `learn/article/${article.slug}.html`);
        articleCard.attr(
          "class",
          "article-card white-panel responsive-row m-0 gap-20 justify-between"
        );
        articleCard.html(`
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
          `);
        learnArticles.append(articleCard);
      });
    } else {
      learnArticles.html("<h1>Can't find article</h1>");
    }
  });
}

// load learn page data on page load
$(loadLearnPage());

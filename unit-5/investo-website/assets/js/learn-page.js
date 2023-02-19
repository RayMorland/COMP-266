let learnArticles = document.getElementById("learn-articles");
let articlesData = articles;

if (articlesData.length > 0) {
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
}

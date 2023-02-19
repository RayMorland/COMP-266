function parseURL() {
    let href = window.location.href
    .split("?")[1]
    .split("&")
    .map((param) => {
      return { [param.split("=")[0]]: param.split("=")[1] };
    });

    return queryParams;
}
const mainImg = $(`#img-main`);
const subImg = $(`.img-sub`);

subImg.on("click", function () {
  let src = $(this).attr("src");
  mainImg.attr("src", src);
});

function imgFT(c) {
  let gallery = document.getElementById("mainG");
  let imgg = gallery.getElementsByTagName("img");

  for (const value of imgg) {
    if (c === "all" || value.getAttribute("data-category") === c) {
      value.style.display = "block";
    } else {
      value.style.display = "none";
    }
  }
}

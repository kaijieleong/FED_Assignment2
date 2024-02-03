document.addEventListener("DOMContentLoaded", function () {
  setTimeout(Loadingpage, 3000);
});

function Loadingpage() {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
  // Show the main content
  document.getElementById("content").style.display = "block";
}

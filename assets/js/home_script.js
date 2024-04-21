const inputFile = document.getElementById("file");
const previewImage = document.getElementById("preview");

inputFile.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };

    reader.readAsDataURL(this.files[0]);
  }
});

const elementoImage = document.querySelectorAll(".elemento-imagen");

elementoImage.forEach((elemento) => {
  elemento.addEventListener("click", async () => {
    try {
      const valorDePosicion = elemento.textContent;
      const res = await fetch(`/imagen/imagen-${valorDePosicion}.jpg`, {
        method: "DELETE",
      });
      const data = await res.text(9);
      if (data === "exito") {
        window.location.href = "/imagen";
      } else {
        console.log("El archivo no existe en el servidor");
      }
    } catch (error) {
      console.log(error);
    }
  });
});

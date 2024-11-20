class Image {
  insertImage(elementoId, ImageLogin) {
    const img = document.createElement("img");
    img.src = ImageLogin;
    document.querySelector(elementoId).appendChild(img);
  }
}

export default Image;

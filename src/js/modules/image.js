import ImageLogin from "../../img/_access-account.svg";

class Image {
  insertImage() {
    const img = document.createElement("img");
    img.src = ImageLogin;
    document.querySelector("#image-login").appendChild(img);
  }
}

export default Image;

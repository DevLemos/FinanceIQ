import "../css/painel.css";
import ImageLogin from "../img/boy.png";
import Image from "./modules/image.js";

const image = new Image();
image.insertImage("#user_avatar", ImageLogin);

document.getElementById("open_btn").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("open-sidebar");
});

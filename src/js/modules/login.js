import { apresentarMensagem } from "./sweetalert.js";

export default function loginPage() {
  async function formValidationLogin() {
    document
      .getElementById("formLoginId")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const formDataLogin = new FormData(this);

        console.log("Dados do FormData:", Array.from(formDataLogin.entries()));

        await fetch("http://localhost/crud/assets/php/validaAcesso.php", {
          method: "POST",
          body: formDataLogin,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              window.location.href = "http://localhost/crud/assets/painel.html";
            } else {
              apresentarMensagem(
                "Erro!",
                data.message,
                "error",
                function () {}
              );
            }
          })
          .catch((erro) => {
            apresentarMensagem(
              "Erro!",
              "Algo deu errado na solicitação.",
              "error",
              function () {}
            );
            console.error("Error", erro);
          });
      });
  }
  /*Função Certa*/
  function contentManipulation() {
    const tabAccountAccess = document.getElementById("tabAccountAccess");
    const tabCreateAccount = document.getElementById("tabContentCreateAccount");
    const sectionAccount = document.getElementById("accountContentId");
    const sectionCreateAccount = document.getElementById("createAccountId");

    tabCreateAccount.addEventListener("click", () => {
      document.getElementById("txtCreateName").value = "";
      document.getElementById("txtCreateEmail").value = "";
      document.getElementById("txtCreatePassword").value = "";

      sectionAccount.classList.add("hidden");
      sectionCreateAccount.classList.toggle("hidden");
    });

    tabAccountAccess.addEventListener("click", () => {
      document.getElementById("txtEmailLogin").value = "";
      document.getElementById("txtPasswordLogin").value = "";

      sectionCreateAccount.classList.add("hidden");
      sectionAccount.classList.toggle("hidden");
    });
  }
  async function formValidationCreateAccount() {
    document
      .getElementById("formCreateAccountId")
      .addEventListener("submit", async function (event) {
        // Impede o envio do formulário para validar antes
        event.preventDefault();

        const formCreateData = new FormData(this);

        console.log("Dados do FormData:", Array.from(formCreateData.entries()));

        await fetch("http://localhost/crud/assets/php/cadastrarUsuario.php", {
          method: "POST",
          body: formCreateData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              apresentarMensagem(
                "Cadastro realizado!",
                data.message,
                "success",
                function () {
                  document.getElementById("tabAccountAccess").click();
                }
              );
            } else
              apresentarMensagem("Erro!", data.message, "error", function () {
                document.getElementById("tabAccountAccess").click();
              });
          })
          .catch((erro) => {
            apresentarMensagem(
              "Erro!",
              "Algo deu errado na solicitação.",
              "error",
              function () {
                window.location.href = "index.html";
              }
            );
            console.error("Error", erro);
          });

        // let txtEmail = document.getElementById("txtEmail").value;
        // const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;

        // if (emailRegex.test(txtEmail)) {
        // } else {
        //   apresentarMensagem("Erro");
        // }
      });
  }

  formValidationLogin();
  contentManipulation();
  formValidationCreateAccount();
}

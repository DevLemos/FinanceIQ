import Swal from "../node_modules/sweetalert2/src/sweetalert2.js";

export function apresentarMensagem(titulo,mensagem = "",icone,funcaoCallback = () => {}) {
  try {
    return Swal.fire({
        title: titulo,
        text: mensagem,
        icon: icone,
        confirmButtonText: "Ok",
      }).then((result) =>{
        if(result.isConfirmed)
          funcaoCallback(); 
      });
  } catch (err) {
    console.error(err);
  }
}

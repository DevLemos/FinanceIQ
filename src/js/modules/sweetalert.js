import Swal from "sweetalert2";

export function apresentarMensagem(
  titulo,
  mensagem = "",
  icone,
  funcaoCallback = () => {}
) {
  try {
    return Swal.fire({
      title: titulo,
      text: mensagem,
      icon: icone,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) funcaoCallback();
    });
  } catch (err) {
    console.error(err);
  }
}

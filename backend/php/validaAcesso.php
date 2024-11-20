<?php
session_start();
include 'conexao.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recebeEmailLogin = isset($_POST['txtEmailLogin']) ? $_POST['txtEmailLogin'] : null;
    $recebeSenhaLogin = isset($_POST['txtPasswordLogin']) ? $_POST['txtPasswordLogin'] : null;
    
    // Sanitização e validação do e-mail
    $filtraEmailLogin = filter_var($recebeEmailLogin, FILTER_SANITIZE_EMAIL);
    if (!filter_var($filtraEmailLogin, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'E-mail inválido.']);
        exit();
    }

    function criptoSenha($criptoSenha)
    {
        return password_hash($criptoSenha, PASSWORD_DEFAULT);
    }

    function verificaSenha($senhaDigitada, $senhaBanco)
    {
        return password_verify($senhaDigitada, $senhaBanco);
    }

    // Preparando a query usando Prepared Statements
    $stmt = $conexao->prepare("SELECT * FROM tbl_usuarios WHERE email = ?");
    $stmt->bind_param("s", $filtraEmailLogin);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Verifica se o usuário foi encontrado
    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();
        // Verifica a senha com password_verify
        if (verificaSenha($recebeSenhaLogin, $usuario['senha'])) {
            $_SESSION['login'] = true;
            $_SESSION['nome_usuario'] = $usuario['nome'];
            echo json_encode(['success' => true, 'message' => 'Login bem-sucedido.']);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Senha incorreta. Por favor volte e tente novamente!']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado. Por favor volte e tente novamente!']);
        exit();
    }

    $stmt->close();
    $conexao->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de requisição inválido.']);
}

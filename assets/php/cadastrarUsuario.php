<?php

session_start();
include 'conexao.php';

header('Content-Type: application/json');

$recebeNome = isset($_POST['txtCreateName']) ? $_POST['txtCreateName'] : null;
$recebeEmail = isset($_POST['txtCreateEmail']) ? $_POST['txtCreateEmail'] : null;
$recebeSenha = isset($_POST['txtCreatePassword']) ? $_POST['txtCreatePassword'] : null;

if (is_null($recebeNome) || is_null($recebeEmail) || is_null($recebeSenha)) {
    echo json_encode(['success' => false, 'message' => 'Dados do formulário não foram enviados corretamente.']);
    exit();
}

$filtraNome = htmlspecialchars($recebeNome, ENT_QUOTES, 'UTF-8');
$filtraEmail = filter_var($recebeEmail, FILTER_SANITIZE_EMAIL);

if (!filter_var($filtraEmail, FILTER_SANITIZE_EMAIL)) {
    echo json_encode(['sucess' => false, 'message' => 'E-mail inválido. Por favor, volte e informe um e-mail válido.']);
    exit();
}

if (empty($recebeSenha) || strlen($recebeSenha) < 6) {
    echo json_encode(['sucess' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres.']);
    exit();
}

$criptoSenha = password_hash($recebeSenha, PASSWORD_DEFAULT);

// Verificar se o e-mail já está cadastrado usando Prepared Statements
$stmt = $conexao->prepare("SELECT * FROM tbl_usuarios WHERE email = ?");
$stmt->bind_param("s", $filtraEmail);
$stmt->execute();
$consultaBanco = $stmt->get_result();

if ($consultaBanco->num_rows === 1) {
    echo json_encode(['success' => false, 'message' => 'O e-mail já está cadastrado.']);
} else {
    $stmt = $conexao->prepare("INSERT INTO tbl_usuarios (nome,email,senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $filtraNome, $filtraEmail, $criptoSenha);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar. Tente novamente mais tarde.']);
    }
}

$stmt->close();
$conexao->close();
?>
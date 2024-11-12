<?php
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '200821@Ke';
$dbName = 'sgbd_kauan';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($conexao->connect_error) {
    echo "Falha na conexão: " .$conexao->connect_error;
}

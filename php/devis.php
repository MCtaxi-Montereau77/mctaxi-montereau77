<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $adresse = htmlspecialchars($_POST['adresse']);
    $message = htmlspecialchars($_POST['message']);

    $to = "tonmail@example.com"; // ton email
    $subject = "Nouveau devis";
    $body = "Nom: $nom\nEmail: $email\nAdresse: $adresse\nMessage: $message";
    $headers = "From: $email";

    // Envoi mail
    $mailResult = mail($to, $subject, $body, $headers);

    // Envoi Telegram
    $token = "TON_TOKEN_BOT";       // Ton token Telegram
    $chat_id = "TON_CHAT_ID";       // Ton chat ID
    $text = "Nouveau devis :\nNom: $nom\nEmail: $email\nAdresse: $adresse\nMessage: $message";
    $telegramResult = file_get_contents("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($text));

    if($mailResult && $telegramResult){
        echo "Message envoyé avec succès !";
    } else {
        echo "Erreur lors de l'envoi.";
    }
}
?>
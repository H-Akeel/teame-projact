<?php
// Get form data and sanitize inputs
$firstname = htmlspecialchars($_POST['FName'] ?? '');
$lastname = htmlspecialchars($_POST['LName'] ?? '');
$birthday = htmlspecialchars($_POST['BirthDay'] ?? '');

// Check if all fields are filled
if (empty($firstname) || empty($lastname) || empty($birthday)) {
    echo "Please fill in all fields";
    exit;
}

// Display user information
echo "<h2>Welcome!</h2>";
echo "<p>Your name is: $firstname $lastname</p>";
echo "<p>Your birthday is: $birthday</p>";
?>

<style>
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f5f5f5;
    }
    h2 {
        color: #333;
    }
    p {
        color: #666;
        margin: 10px 0;
    }
</style>

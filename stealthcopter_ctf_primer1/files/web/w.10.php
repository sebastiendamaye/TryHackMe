<?php 

/* 
 This is a little hack so that if we run this script from commandline
 the arguments can be passed to $_GET
 To run this in a console we'd call something like: 
 php w.05.php 'key=test'
 */
if (!isset($_SERVER["HTTP_HOST"])) {
  parse_str($argv[1], $_GET);
}

function encrypt($plainText, $secret_key) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', str(0x22C49FE9));
    $iv = substr( hash( 'sha256', 'my_simple_secret_iv' ), 0, 16 );
    $output = base64_encode( openssl_encrypt( $plainText, $encrypt_method, $key, 0, $iv ) );
    return $output;
}

function decrypt($cipherText, $secret_key) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', 'my_simple_secret_iv' ), 0, 16 );
    $output = openssl_decrypt( base64_decode( $cipherText ), $encrypt_method, $key, 0, $iv );
    return $output;
}

if (!isset($_GET['key'])){
    die("Error: Key is not set! This time it's my favourite 9 digit number, much more secure.");
}

$key=$_GET['key'];

echo "Key entered: $key"."\n";

$ct =  "OWVzUHhVVFNsM0t6NFhDb1FiT0RJaHNrWWYrM3VRMi9FNXcyTGhxbVV0aHpKUjdOcGRVcWtZcWc3djV5OFVxQw==";

echo "CipherText: $ct\n";

$pt =  decrypt($ct, $key);

echo "PlainText: $pt \n";

?>

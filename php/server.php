<?php

$mimeType = "image/jpeg";
$path = "../img/imagem.jpg";
$sendRate = 8192;
$fp = fopen($path, "rb");
$data = [];
while (!feof($fp)) {
    $data[] = base64_encode(fread($fp, $sendRate));
	flush();
}
fclose($fp);
exit(json_encode(["type" => $mimeType, "data" => $data]));

?>
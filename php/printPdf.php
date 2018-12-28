<?php
	require 'library/mpdf/mpdf.php';

	$conf_host = "localhost/lanyard/source";

	$to = $_POST["email"];
	$subject = "Lanyard Design Studio";
	$img_src = $_POST["image"];

	$lanyard = $_POST["lanyard"];
	$clip = $_POST["clip"];
	$price = $_POST["price"];
	$file_name = $_POST["file_name"];

	$data = $img_src;
	list($list, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

	$time = time();

	file_put_contents("../tmp/design_".$time.".png", $data);

	$data = $lanyard;
	list($list, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

	file_put_contents("../tmp/lanyard_".$time.".png", $data);

	list($width, $height) = getimagesize("http://".$conf_host."/img/clips/".$clip.".png");

	$message = "<html>";
	$message .= "<head><style>";
	$message .= "::-webkit-scrollbar{display:none;}
					*{margin:30;}</style></head>";

	$message .= "<div style='margin: 20px; padding-top: 30px; background: white'>";

	$message .= "<h2 style='font-style: italic; font-size: 20px; text-align: center; margin-top: 50px;'>Lanyard Design Studio</h2>";
	$message .= "<p>Please ask your distributor to contact our design department to make any design changes to this model.</p><div style='border: 1px solid black; min-height: 500px;'><img src='../tmp/design_".$time.".png' style='width: 100%; margin-top: 30px;'/>";
	// $message .= "<div style='position: relative;'><img src='../tmp/lanyard_".$time.".png' style='position: absolute;width: 90%; margin: 5%; bottom: ".($height / 2)."px;'/>";
	// $message .= "<img style='transform: rotate(-90deg); position: absolute; bottom: 0; right: ".($height / 2)."px;' src='http://".$conf_host."/img/clips/".$clip.".png'>";
	$message .= "</div>";
	$message .= "<p style='text-align: left; font-size: 16px; font-weight: bold; margin-left: 5%;'>USD ".$price."</p>";
	$message .= "</div></div></html>";

	$mpdf = new mPDF('+a','A4','','', 0, 0, 0, 0, 0, 0);
	$mpdf -> SetDisplayMode('fullpage');
	$mpdf -> autoLangToFont = true;
	$mpdf -> list_indent_first_level = 0;
	$mpdf -> WriteHTML($message);

	file_put_contents("../tmp/pdf.html", $message);

	$mpdf -> Output("../tmp/".$file_name);

	// echo json_encode(array("success" => true, path => "tmp/design_".$time.".pdf"));
?>
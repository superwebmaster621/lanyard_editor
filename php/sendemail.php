<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'library/mailer_src/Exception.php';
	require 'library/mailer_src/PHPMailer.php';
	require 'library/mailer_src/SMTP.php';

	$conf_user = "webexpert621@hotmail.com";
	$conf_pass = "superstar115";
	$conf_host = "77.120.102.146/lanyard/";

	$to = $_POST["email"];
	$subject = "Lanyard Design Studio";
	$img_src = $_POST["image"];

	$lanyard = $_POST["lanyard"];
	$clip = $_POST["clip"];
	$price = $_POST["price"];

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

	list($width, $height) = getimagesize("/img/clips/".$clip.".png");

	$message = "<div style='margin: 20px;'>";

	$message .= "<h2 style='font-style: italic; font-size: 20px; text-align: center;'>Lanyard Design Studio</h2>";
	$message .= "<p>Please ask your distributor to contact our design department to make any design changes to this model.</p><div style='border: 1px solid black; min-height: 500px;'><img src='http://".$conf_host."/tmp/design_".$time.".png' style='width: 100%'>";
	$message .= "<div style='position:relative;'><img src='http://".$conf_host."/tmp/lanyard_".$time.".png' style='position: absolute;width: 90%; margin: 5%; bottom: ".($height / 2)."px;'>";
	// $message .= "<img style='transform: rotate(-90deg); position: absolute; bottom: 0; right: ".($height / 2)."px;' src='http://".$conf_host."/img/clips/".$clip.".png'>";
	$message .= "</div>";
	$message .= "<p style='text-align: left; font-size: 16px; font-weight: bold; margin-left: 5%;'>USD ".$price."</p>";
	$message .= "</div></div>";

	$mail = new PHPMailer(false);
	try {
		$mail -> SMTPDebug = 2;
		$mail -> isSMTP();
		$mail -> Host = "smtp.live.com";
		$mail -> SMTPAuth = true;
		$mail -> Username = $conf_user;
		$mail -> Password = $conf_pass;
		$mail -> SMTPSecure = "tls";
		$mail -> Port = 587;

		$mail -> setFrom("webexpert621@hotmail.com", "Mailer");
		$mail -> addAddress($to);
		// $mail -> addAttachment("../tmp/design_".$time.".png");

		$mail -> isHTML(true);
		$mail -> Subject = "Lanyard Design Studio";
		$mail -> Body    = $message;
		$mail -> send();
		echo json_encode(array('success' => true));
	}
	catch (Exception $e) {
		echo json_encode(array('success' => false));
	}
	
?>
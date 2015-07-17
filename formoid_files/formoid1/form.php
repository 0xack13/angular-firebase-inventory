<?php

define('EMAIL_FOR_REPORTS', '');
define('RECAPTCHA_PRIVATE_KEY', '@privatekey@');
define('FINISH_URI', 'http://');
define('FINISH_ACTION', 'message');
define('FINISH_MESSAGE', 'Thanks for filling out my form!');
define('UPLOAD_ALLOWED_FILE_TYPES', 'doc, docx, xls, csv, txt, rtf, html, zip, jpg, jpeg, png, gif');

define('_DIR_', str_replace('\\', '/', dirname(__FILE__)) . '/');
require_once _DIR_ . '/handler.php';

?>

<?php if (frmd_message()): ?>
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-biz-red.css" type="text/css" />
<span class="alert alert-success"><?php echo FINISH_MESSAGE; ?></span>
<?php else: ?>
<!-- Start Formoid form-->
<link rel="stylesheet" href="<?php echo dirname($form_path); ?>/formoid-biz-red.css" type="text/css" />
<script type="text/javascript" src="<?php echo dirname($form_path); ?>/jquery.min.js"></script>
<form class="formoid-biz-red" style="background-color:#1A2223;font-size:14px;font-family:'Open Sans','Helvetica Neue', 'Helvetica', Arial, Verdana, sans-serif;color:#ECECEC;max-width:480px;min-width:150px" method="post"><div class="title"><h2>Transfers</h2></div>
	<div class="element-date<?php frmd_add_class("date"); ?>" title="transfer date"><label class="title"><span class="required">*</span></label><input class="medium" data-format="yyyy-mm-dd" type="date" name="date" required="required" placeholder="Date"/></div>
	<div class="element-select<?php frmd_add_class("select"); ?>" title="transfer from city"><label class="title"><span class="required">*</span></label><div class="medium"><span><select name="select" required="required">

		<option value="Jeddah">Jeddah</option>
		<option value="Riyadh">Riyadh</option>
		<option value="Dammam">Dammam</option></select><i></i></span></div></div>
	<div class="element-input<?php frmd_add_class("input"); ?>"><label class="title"><span class="required">*</span></label><input class="medium" type="text" name="input" required="required" placeholder="Quantity"/></div>
<div class="submit"><input type="submit" value="Submit"/></div></form><script type="text/javascript" src="<?php echo dirname($form_path); ?>/formoid-biz-red.js"></script>

<!-- Stop Formoid form-->
<?php endif; ?>

<?php frmd_end_form(); ?>
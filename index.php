

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Image Configurator</title>

    <link rel="stylesheet" type="text/css" href="style/farbtastic.css" />
    <link rel="stylesheet" type="text/css" href="style/roundslider.css" />
    <link rel="stylesheet" type="text/css" href="style/slick.css" />
    <link rel="stylesheet" type="text/css" href="style/slick-theme.css" />
    <link rel="stylesheet" type="text/css" href="style/style.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
</head>

<script type="text/javascript" src="js/library/jquery.min.js"></script>
<script type="text/javascript" src="js/library/farbtastic.js"></script>
<script type="text/javascript" src="js/library/roundslider.js"></script>
<script type="text/javascript" src="js/library/SimpleAjaxUploader.js"></script>
<script type="text/javascript" src="js/library/fabric.min.js"></script>
<script type="text/javascript" src="js/library/html2canvas.min.js"></script>
<script type="text/javascript" src="js/library/slick.js"></script>
<script type="text/javascript" src="js/mine/main.js"></script>
<script type="text/javascript" src="js/mine/draw.js"></script>
<script type="text/javascript" src="js/mine/utils.js"></script>

<body>
    <div id="header_area">
        Design Studio
    </div>
    <div id="main_area">
        <div id="left_area">
            <section class="active">
                <h3>Type</h3>
                <div class="inner-div">
                    <dl id="type_list">
                        <dd price="0.25" id="satin_lanyard">
                            <img src="img/satin_lanyard_prev.png">
                            <p>Satin lanyard</p>
                        </dd>
                        <dd price="0.3">
                            <img src="img/grosgrain_lanyard_prev.png">
                            <p>Grosgrain lanyard</p>
                        </dd>
                        <dd price="0.35">
                            <img src="img/canvas_lanyard_prev.png">
                            <p>Canvas lanyard</p>
                        </dd>
                        <dd price="0.4">
                            <img src="img/woven_lanyard_prev.png">
                            <p>Woven lanyard</p>
                        </dd>
                        <dd price="0.45">
                            <img src="img/knitted_cord_prev.png">
                            <p>Knitted lanyard</p>
                        </dd>
                        <dd class="clear_both"></dd>
                    </dl>
                </div>
            </section>
            <section>
                <h3>Width</h3>
                <div class="inner-div">
                    <dl id="size_list">
                        <dd value="1" price="0.11" data-logoSmallPos="20" data-logoLargePos="38"><h5>1"</h5></dd>
                        <dd value="0.875" price="0.12" data-logoSmallPos="17" data-logoLargePos="33"><h5>7/8"</h5></dd>
                        <dd value="0.75" price="0.13" data-logoSmallPos="14" data-logoLargePos="29"><h5>3/4"</h5></dd>
                        <dd value="0.625" price="0.14" data-logoSmallPos="12" data-logoLargePos="24"><h5>5/8"</h5></dd>
                        <dd value="0.5" price="0.15" data-logoSmallPos="9" data-logoLargePos="18"><h5>1/2"</h5></dd>
                        <dd value="0.375" price="0.16" data-logoSmallPos="8" data-logoLargePos="15"><h5>3/8"</h5></dd>
                        <dd class="clear_both"></dd>
                    </dl>
                </div>
            </section>
            <section>
                <h3>Color</h3>
                <center>
                    <input type="text" id="color_value" class="select-class" readonly="readonly" />
                    <div id="color_picker"></div>
                </center>  
            </section>
            <section>
                <h3>Logo</h3>
                <div class="inner-div">
                    <dl id="logo_area">
                        <dd>
                            <input type="file" id="btn_file_logo1">
                            <img src="img/add_logo_icon.png">
                            <p>First Logo</p>
                        </dd>
                        <dd>
                            <input type="file" id="btn_file_logo2">
                            <img src="img/add_logo_icon.png">
                            <p>Second Logo</p>
                        </dd>
                        <dd class="clear_both"></dd>
                    </dl>
                    <select id="logo-select" class="select-class">
                        <option value="1">
                            First Logo Setting
                        </option>
                        <option value="2">
                            Second Logo Setting
                        </option>
                    </select>
                    <div id="picker-area">

                        <div id="logo-preview">
                            <div class="w-20 label-logo">Logo 1</div>
                            <div class="w-55 img">
                                <img src="" alt="" id="logo-preview-img" />
                            </div>
                            <div class="w-20 delete">
                                <div class="delete_btn" id="delete-logo"><i class="fa fa-trash" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <dl class="picker-area">
                            <dd>
                                <div id="padding-picker" class="picker">
                                </div>
                                <p>Logo Interval</p>
                            </dd>
                            <dd>
                                <div id="x-pos-picker" class="picker">
                                </div>
                                <p>Horizontal Pos.</p>
                            </dd>
                            <dd>
                                <div id="y-pos-picker" class="picker">
                                </div>
                                <p>Vertical Pos.</p>
                            </dd>
                            <dd>
                                <div id="width-picker" class="picker" data-scale="1">
                                </div>
                                <p>Logo Width</p>
                            </dd>
                            <dd>
                                <div id="height-picker" class="picker" data-scale="1">
                                </div>
                                <p>Logo Height</p>
                            </dd>
                        </dl>
                    </div>

                    <div id="picker-area1">
                        <div id="logo-preview1">
                            <div class="w-20 label-logo">Logo 2</div>
                            <div class="w-55 img">
                                <img src="" alt="" id="logo-preview-img1" />
                            </div>
                            <div class="w-20 delete">
                                <div class="delete_btn" id="delete-logo1"><i class="fa fa-trash" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <dl class="picker-area">
                            <dd>
                                <div id="padding-picker1" class="picker">
                                </div>
                                <p>Logo Interval</p>
                            </dd>
                            <dd>
                                <div id="x-pos-picker1" class="picker">
                                </div>
                                <p>Horizontal Pos.</p>
                            </dd>
                            <dd>
                                <div id="y-pos-picker1" class="picker">
                                </div>
                                <p>Vertical Pos.</p>
                            </dd>
                            <dd>
                                <div id="width-picker1" class="picker" data-scale="1">
                                </div>
                                <p>Logo Width</p>
                            </dd>
                            <dd>
                                <div id="height-picker1" class="picker" data-scale="1">
                                </div>
                                <p>Logo Height</p>
                            </dd>
                        </dl>
                    </div>

                </div>
            </section>
            <div class="action_btn back" id="switchSides">Switch Side</div>
            <div id="btn_change_hook" class="action_btn">Create Hook</div>
            <div id="btn_change_double" class="action_btn">Create Double Hook</div>
            <div id="btn_reload" class="action_btn">Refresh</div>
            <!-- <div id="breakway" class="action_btn on" >Breakways Off</div> -->
            <!-- <div id="buckle" class="action_btn on">Buckle Off</div> -->
            <section id="breakway_section">
                <h3>
                    Breakways Off
                </h3>
                <div class="inner-div">
                    <select id="break_select" class="select-class">
                        <option value="0">None</option>
                        <option value="1">CYLINDRICAL</option>
                        <option value="2">XBA</option>
                        <option value="3">XBA2P</option>
                        <option value="4">XBASEW</option>
                        <option value="5">XBASEW (White)</option>
                    </select>
                </div>
            </section>
            <section id="buckle_section">
                <h3>
                    Buckle Off
                </h3>
                <div class="inner-div">
                    <select id="buckle_select" class="select-class">
                        <option value="0">None</option>
                        <option value="2">XBUC</option>
                        <option value="3">XBUC White</option>
			<option value="12">SWIVEL</option>
                        <!--<option value="4">YMDJBLCK</option>
                        <option value="5">YMDJ</option>
                        <option value="6">YMDJ GUNM1</option>
                        <option value="7">YMDE</option>
                        <option value="8">YMDC</option>
                        <option value="9">YMDBBLK</option>
                        <option value="10">YMDB</option>
                        <option value="11">YMDA</option>
                        <option value="12">SWIVEL</option>
                        <option value="13">USB</option>
                        <option value="14">YMDD</option>
-->
                    </select>
                </div>
            </section>
        </div>
        <div id="right_area">
            <div id="render_area">
                <h2 style="text-align:right; padding:5px 20px; font-family: sans-serif" id="">
                    <span id="width_label">1/2"&nbsp</span>
                    <span id="type_label">Satin Lanyad</span>
                    <span id="sideLabel">Front View</span>
                </h2>
                <div id="small_bar">
                    <canvas id="small-logo"></canvas>
                </div>
                <div id="large_bar">
                    <canvas id="large-logo"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div id="overlay_mask"></div>
    <div id="process_mask"></div>
    <div id="spin">
        <img src="img/loading_icon.gif" class="spin_img">
    </div>
    <div id="scene_list">
        <img src="img/close.png" id="btn_close">
        <div id="main_view">
            <div class="result_view">
                <canvas width="420" height="24" id="first_img"></canvas>
                <canvas width="420" height="24" id="sec_img"></canvas>
                <canvas width="161" height="24" id="third_img"></canvas>
                <canvas width="50" height="24" id="fourth_img"></canvas>
                <div class="mask_logo"></div>
                <div class="mask_double_logo"></div>
                <img class="logo" src="img/clip_apply/2.png">
                <img class="logo_first hidden" src="img/clip_apply/2.png">
                <img class="logo_sec hidden" src="img/clip_apply/2.png">
                <canvas id="detachable" width="100" height="24" style="display: none;"></canvas>
                <img class="buckle_logo" src="img/detachable/7.png">
                <img class="mannequin" src="img/mannequin.png">

                <img src="" id="front_image_for_hook" class="hidden"/>
            </div>

            <div class="result_back_view">
                <canvas id="first_back_img" height="24" width="420"></canvas>
                <canvas id="sec_back_img" height="24" width="420"></canvas>
                <canvas id="third_back_img" height="24" width="161"></canvas>
                <canvas width="50" height="24" id="fourth_back_img"></canvas>
                <div class="mask_logo"></div>
                <div class="mask_double_logo"></div>
                <img class="logo" src="img/clip_apply/2.png">
                <img class="logo_first hidden" src="img/clip_apply/2.png">
                <img class="logo_sec hidden" src="img/clip_apply/2.png">
                <canvas id="detachable_back" width="100" height="24" style="display: none;"></canvas>
                <img class="buckle_logo" src="img/detachable/7.png">
                <img class="break_logo" src="img/break/4.png" style="display: none;">
                <img class="break_logo_mask" src="img/break_mask.png" style="display: none;">
                <img class="mannequin" src="img/mannequin.png">
                <img src="" id="back_image_for_hook" class="hidden" />
            </div>

            <div class="result_flat_view" style="width:100%">
                <canvas id="flat_lanyard" width="800" height="24"></canvas>
                <canvas id="detachable_flat" width="100" height="24" style="display: none;"></canvas>
                <img class="flat_logo" src="img/clip_apply/2.png">
                <img class="break_bottom_logo" src="img/break/4_old.png" style="display: none;">
                <img class="break_bottom_mask" src="img/break_bottom_mask.png" style="display: none;">
                <img class="buckle_bottom_logo" src="img/detachable/8.png" style="display: none;">
            </div>
        </div>
        <div class="hook_area">

        </div>
        <div class="price_view">
            <p id="total_price"></p>
        </div>

        <div class="button_area">
            <button class="copy_btn" id="copy_color">Copy front color on the back side</button>
            <button class="copy_btn" id="copy_logo">Copy logo on the back side</button>
        </div>
        <div id="btn_pdf" class="action_btn modal_btn">Print PDF</div>
        <div id="btn_email" class="action_btn modal_btn">Send Email</div>
    </div>
    <div id="email_field">
        <img src="img/close.png" id="email_close">
        <p>
            Type email address
        </p>
        <input type="email" name="email" id="target_email" placeholder="Enter email">
        <button id="send_email">
            Send
        </button>
    </div>
    <div id="footer_area"></div>
    <div id="absolutepixel" style="width: 1cm; display: none;"></div>
    <canvas id="canvas" style="display: none" width="3000" height="150"></canvas>
</body>
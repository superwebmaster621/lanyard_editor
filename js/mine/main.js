var img_rlt = [];
var json_small;
var json_large;
jQuery(document).ready(function(){
	sessionStorage.clear();
	var initObj		= new initEnv();
	
	$.ajax(
	{
		type: "GET",
		url: "php/readClips.php",
		success: function(data)
		{
			var img_list = JSON.parse(data);
			for (var i = 0; i < img_list.length; i ++)
			{
				if (img_list[i] != "." && img_list[i] != "..")
					img_rlt.push(img_list[i]);
			}
			initObj.init();
		},
		error: function()
		{
			initObj.init();
		}
	});

	
});

var initEnv			= function()
{
	var main		= this;

	main.data 		= null;
	main.scene 		= null;

	var img_pos = [
	-21, -18, -43, -43, -32, -23, -31, -25, -30, -19, -23, -15, -33,-35, -49, -33, -36, -36, -6, -5, -19, -22, -93, -5, -24, -24, -25, -52, -37, -75, -78, -81, -28, -51, -39, -36
	];

	var img_pos_left = [
	6, 4, 28, 28, 17, 8, 16, 9, 16, 4, 9, 1, 16, 20, 25, 16, 16, 16, -16, -14, 3, 3, 80, -8, 7, 7, 12, 36, 20, 60, 60, 60, 15, 36, 24, 22
	];

	var clip_available = [
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[0, 0, 0, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0],
		[1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1]
	];

	var width_array = [
		1, 0.875, 0.75, 0.625, 0.5, 0.375
	];
	
	var img_index = 2;

	// var small_canvas, large_canvas;

	var smallObj = new drawObj(null, null, "small-logo", "small_bar");
	var largeObj = new drawObj(null, null, "large-logo", "large_bar");

	main.singleParam 	= {padding: 30};
	main.secondParam 	= {padding: 30, xPos: 15};

	main.logoSmallPos = 9;
	main.logoLargePos = 18;

	main.double = 1;

	main.backgroundSrc 	= "img/satin_lanyard_prev.png";

	main.color 			= "white";

	main.clipShowing 	= false;

	main.width = 0.5;

	main.color_select = false;

	main.back_select = true;

	main.type_price = 0;
	main.width_price = 0;
	main.price = 0;

	main.buckle = true;
	main.break 	= true;

	main.backColor = "white";

	var color_flg = false;
	var logo_flg = false;
	var lanyard_clip = "Clips_BOTOPNR-CLP";

	main.init		= function()
	{
		main.initEvent();
		main.initColorPicker();
		main.initPicker();
		main.initUploader();
		$('#satin_lanyard').trigger('click');
		// main.initClipList();
		main.buckle = true;
		main.break 	= true;
	};

	

	main.initEvent 	= function()
	{
		$("#small_bar").css("background", "none");
		$("#large_bar").css("background", "none");
		$("#picker-area1").hide();
		
		smallObj.addColor("white");
		largeObj.addColor("white");


		$("#main_area").css("height", $(window).innerHeight() - 200);
		$("#left_area").css("max-height", $(window).innerHeight() - 240);

		$("#left_area").on("click", "section h3", function()
		{
			var active_obj = $("#left_area .active");

			if($(this).hasClass("disable"))
				return;

			active_obj.animate({height : "50px"}, 500, function()
			{
				$(this).removeClass("active");
			});

			$(this).parent().animate({height : "350px"}, 500, function()
			{
				$(this).addClass("active");
			})
		});

		$("#left_area").on("click", "dd", function()
		{
			$("#left_area .sel").removeClass("sel");
			$(this).addClass("sel");
		});

		$("#type_list dd").on("click", function()
		{
			var src = $(this).children("img").attr("src");
			main.type_price = parseFloat($(this).attr("price"));
			$('#type_label').html($(this).text());
			main.price = Math.floor(parseFloat(main.type_price) + parseFloat(main.width_price), 2);

			var param = {
				src: src, 
				width: $("#small_bar").width(), 
				height: $("#small_bar").height(), 
				autofit: true
			};

			smallObj.addImage(param);

			var large_param = {
				src: src, 
				width: $("#large_bar").width(), 
				height: $("#large_bar").height(), 
				autofit: true
			}
			largeObj.addImage(large_param);

			// $.farbtastic('#color_picker').setColor('#fff');
			main.backgroundSrc = src;
			main.color_select = false;
		});

		$("#size_list dd").on("click", function()
		{
			// sessionStorage.clear();
			$('#width_label').html($(this).text() +'&nbsp');
			var width = $(this).attr("value");
			main.width_price = parseFloat($(this).attr("price"));
			main.logoSmallPos = parseInt($(this).attr('data-logoSmallPos'));
			main.logoLargePos = parseInt($(this).attr('data-logoLargePos'));
			main.price = parseFloat(main.type_price) + parseFloat(main.width_price);

			$("#small_bar").css("height", width + "in");
			$("#large_bar").css("height", width * 2 + "in");

			smallObj.setAllScale($("#small_bar").height());
			largeObj.setAllScale($("#large_bar").height());

			sessionStorage.setItem('selected_small_size',$("#small_bar").height());
			sessionStorage.setItem('selected_large_size',$("#large_bar").height());

			var scale = width / main.width;

			$("#height-picker").attr('data-scale',scale);
			$("#width-picker").attr('data-scale',scale);

			$("#height-picker1").attr('data-scale',scale);
			$("#width-picker1").attr('data-scale',scale);

			if (scale == 1)
				return;
			/*
			var height = $("#height-picker").roundSlider("option", "value");
			$("#height-picker").roundSlider("option", "value", height * scale);*/

			/*var slide_width = $("#width-picker").roundSlider("option", "value");
			$("#width-picker").roundSlider("option", "value", slide_width * scale);*/

			/*var height1 = $("#height-picker1").roundSlider("option", "value");
			$("#height-picker1").roundSlider("option", "value", height1 * scale);

			var slide_width1 = $("#width-picker1").roundSlider("option", "value");
			$("#width-picker1").roundSlider("option", "value", slide_width1 * scale);*/
			main.width = width;

			// main.setHeight();
			// $(".flat_logo").css("top", ((img_pos[img_index - 1]) * main.width / 0.5)+2 + "px");
			$(".flat_logo").css("top", (img_pos[img_index - 1]) + "px");
		});

		$('#delete-logo').click(function(){
			smallObj.remove("logo");
			largeObj.remove("logo");
			$('#logo-preview').hide();
			$('#logo-preview-img').attr('src','');
		});

		$('#delete-logo1').click(function(){
			smallObj.remove("secLogo");
			largeObj.remove("secLogo");
			$('#logo-preview1').hide();
			$('#logo-preview-img1').attr('src','');
		});


		$("#btn_change_hook").click(function()
		{
			main.double = 1;
			if($('#switchSides').hasClass('front'))
			{
				$('#switchSides').trigger('click');
				setTimeout(function(){
					main.createHook();
				}, 200);
			}
			else
			{
				main.createHook();
			}
		});

		$("#buckle_select").change(function()
		{
			if ($(this).val() == 0)
			{
				main.buckle = true;
				$("#buckle_section h3").text("Buckle Off");
				return;
			}
			else 
			{
				var index = $(this).val();
				$("#buckle_section h3").text("Buckle On");
				main.buckle = false;
				$(".buckle_logo").attr("src", "img/detachable/" + (index * 2 + 1) + ".png");
				$(".buckle_bottom_logo").attr("src", "img/detachable/" + (index * 2 + 2) + ".png");
			}
		})

		main.createHook = function(){
			color_flg = false;
			logo_flg = false;
			$(".break_logo").hide();
			$(".break_bottom_logo").hide();
			$(".break_logo_mask").hide();
			$(".break_bottom_mask").hide();

			$('#fourth_img').show();
			$('#fourth_back_img').show();

			$(".buckle_logo").hide();
			$("#detachable_back").hide();
			$("#detachable").hide();
			$("#detachable_flat").hide();
			$(".buckle_bottom_logo").hide();
			$("#scene_list").css("display", "block");
			$("#overlay_mask").height($("body").height());
			$("#overlay_mask").fadeIn();
			$("html, body").animate({scrollTop: 0});

			$("#first_img").removeClass("vertical");
			$("#sec_img").removeClass("right_vertical");
			$("#third_img").removeClass("top_vertical");

			$("#first_back_img").removeClass("vertical");
			$("#sec_back_img").removeClass("right_vertical");
			$("#third_back_img").removeClass("top_vertical");

			if($('#switchSides').hasClass('back') && $('#front_image_for_hook').attr('src'))
				var newImg = smallObj.canvas.toDataURL('png');
			else if($('#front_image_for_hook').attr('src'))
				var newImg = $('#front_image_for_hook').attr('src');
			else
				var newImg = smallObj.canvas.toDataURL('png');
			
			if (main.backgroundSrc)
				main.drawImageCanvas("third_img", main.backgroundSrc);
			else 
			{
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				// Clip a rectangular area
				ctx.rect(0, 0, 3000, 150);
				ctx.stroke();
				ctx.clip();
				// Draw red rectangle after clip()
				ctx.fillStyle = main.color;
				ctx.fillRect(0, 0, 3000, 150);
				var backImg = c.toDataURL('png');
				main.drawImageCanvas("third_img", backImg);
			}
			main.drawImageCanvas("first_img", newImg);
			main.drawImageCanvas("sec_img", newImg);
			main.drawImageCanvas("fourth_img", newImg);
			// main.drawFlat("flat_lanyard", newImg);
			main.drawImageCanvas("flat_lanyard", newImg);
			main.drawImageCanvas("third_back_img", newImg);
			

			main.drawImageCanvas("detachable", newImg);
			main.drawImageCanvas("detachable_flat", newImg);
			/*if (main.backgroundSrc)
			{*/

			if( $('#switchSides').hasClass('front')){
				var backImg = smallObj.canvas.toDataURL('png');
			}else if($('#back_image_for_hook').attr('src')){
				var backImg = $('#back_image_for_hook').attr('src');
			}else{
				var backImg = main.backgroundSrc;
			}
			main.drawImageCanvas("sec_back_img", backImg);
			main.drawImageCanvas("first_back_img", backImg);
			main.drawImageCanvas('third_img', backImg);
			main.drawImageCanvas("detachable_back", backImg);
			main.drawImageCanvas("fourth_back_img", backImg);


			/*}
			else 
			{
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				// Clip a rectangular area
				ctx.rect(0, 0, 300, 150);
				ctx.stroke();
				ctx.clip();
				// Draw red rectangle after clip()
				ctx.fillStyle = main.color;
				ctx.fillRect(0, 0, 300, 150);
				var backImg = c.toDataURL('png');
				main.drawImageCanvas("first_back_img", backImg);
				main.drawImageCanvas("sec_back_img", backImg);
			}*/
			
			main.setPos("third_img");

			main.setPos("third_back_img");
			$(".logo").removeClass("hidden");
			$(".logo_first").addClass("hidden");
			$(".logo_sec").addClass("hidden");

			$("#total_price").text("USD " + parseFloat(main.price).toFixed(2));
			
			$(".hook_area").html("");
			main.initClipList();
			buckle_off();
			break_off();
			if (!main.buckle)
			{
				buckle_on();
			}
			else
			{
				buckle_off();
			}
			if (!main.break)
			{
				break_on();
			}
			else
			{
				break_off();
			}
		}

		$(document).on("click", ".hook_btn", function(evt){
			var id = $(this).attr("id");

			for (var i = 0; i < width_array.length; i ++) 
			{
				if (width_array[i] == main.width)
				{
					if (clip_available[parseInt(id) - 1][i] == 0)
					{
						alert("Selected clip is not available in current width!");
						return false;
					}
				}
			}

			if (main.buckle == true || main.double == 0)
				$(".flat_logo").css("left",'811px');
			else
				$(".flat_logo").css("left",'911px');

			lanyard_clip = id;
			img_index = id;

			if (!$(".logo").hasClass("hidden")) {
				$(".logo").attr("src", "img/clip_apply/" + id + ".png");
				$(".logo_sec").attr("src", "img/clip_apply/" + id + ".png");
				$(".logo_first").attr("src", "img/clip_apply/" + id + ".png");

				$(".flat_logo").attr("src", "img/clip_apply/" + id + ".png");
				// $(".flat_logo").css("top", (img_pos[img_index - 1]) * main.width / 0.5 + "px");
				$(".flat_logo").css("top", (img_pos[img_index - 1]) + "px");
				var current_left = parseFloat($(".flat_logo").css("left").replace("px"));
				$(".flat_logo").css("left", (img_pos_left[img_index - 1] + current_left) + "px");
			}
			else 
			{
				$(".logo").attr("src", "img/clip_apply/" + id + ".png");
				$(".logo_sec").attr("src", "img/clip_apply/" + id + ".png");
				$(".logo_first").attr("src", "img/clip_apply/" + id + ".png");

				$(".flat_logo").attr("src", "img/clip_apply/" + id + ".png");
				// $(".flat_logo").css("top", (img_pos[img_index - 1]) * main.width / 0.5 + "px");
				$(".flat_logo").css("top", (img_pos[img_index - 1]) + "px");
				var current_left = parseFloat($(".flat_logo").css("left").replace("px"));
				$(".flat_logo").css("left", (img_pos_left[img_index - 1] + current_left) + "px");
			}
		})

		$("#btn_change_double").click(function()
		{
			if($('#switchSides').hasClass('front'))
				$('#switchSides').trigger('click');

			setTimeout(function(){

				color_flg = false;
				logo_flg = false;
				$(".break_logo").hide();
				$(".break_bottom_logo").hide();
				$(".break_logo_mask").hide();
				$(".break_bottom_mask").hide();
				$("#btn_change_hook").click();
				$("#first_img").addClass("vertical");
				$("#sec_img").addClass("right_vertical");
				$("#third_img").addClass("top_vertical");
				buckle_off();
				main.double = 0;

				$("#first_back_img").addClass("vertical");
				$("#sec_back_img").addClass("right_vertical");
				$("#third_back_img").addClass("top_vertical");

				$(".logo").addClass("hidden");
				$(".logo_first").removeClass("hidden");
				$(".logo_sec").removeClass("hidden");
				main.setDoublePos("third_img");
				main.setDoublePos("third_back_img");
				$("#total_price").text("USD " + main.price);
				$('#fourth_img').hide();
				$('#fourth_back_img').hide();
				break_off();
				if (!main.break)
				{
					break_on();
				}

				// $(".hook_area").html("");
				main.initClipList();

			}, 200);

		});

		$("#buckle").click(function()
		{
			if (main.buckle)
			{
				main.buckle = false;
				$("#buckle").html("Buckle On");
			}
			else
			{
				main.buckle = true;
				$("#buckle").html("Buckle Off");
			}
		})

		function buckle_on()
		{
			if ($(".buckle_logo").css("display") != "none")
				return;
			if ($(".logo_sec").css("display") != "none")
				return;
			/*var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			// Clip a rectangular area
			ctx.rect(0, 0, 300, 150);
			ctx.stroke();
			ctx.clip();
			// Draw red rectangle after clip()
			ctx.fillStyle = main.color;
			ctx.fillRect(0, 0, 300, 150);
			var backImg = c.toDataURL('png');*/

			var top = parseFloat($(".logo").css("top").replace("px"));
			$(".buckle_logo").width($("#third_back_img").height() + 10);

			$(".buckle_logo").css("top", top + "px");
			$("#detachable_back").css("top", (top + 35) + "px");
			$("#detachable").css("top", (top + 35) + "px");

			$(".logo").css("top", (top + 92) + "px");

			$(".buckle_logo").show();
			$("#detachable").show();
			$("#detachable_back").show();
			$("#detachable_flat").show();
			$(".buckle_bottom_logo").show();
			$("#detachable_flat").css("left", "810px");
			$("#buckle").removeClass('on').addClass('off');
			var current_left = parseFloat($(".flat_logo").css("left").replace("px"));
			$(".flat_logo").css("left", (current_left + 100) + "px");
		}

		function buckle_off()
		{
			var top = parseFloat($(".mask_logo").css("top").replace("px"));
			$(".logo").css("top", (top+25) + "px").show();
			$(".buckle_logo").hide();
			$("#detachable").hide();
			$("#detachable_back").hide();
			$("#detachable_flat").hide();
			$(".buckle_bottom_logo").hide();
			// $(".flat_logo").css("left", "815px");
			$("#buckle").removeClass('off').addClass('on');
			var current_left = parseFloat($(".flat_logo").css("left").replace("px"));
			if (current_left > 850)
				$(".flat_logo").css("left", (current_left - 100) + "px");
		}

		// $("#breakway").click(function() 
		// {
		// 	if (main.break)
		// 	{
		// 		main.break = false;
		// 		$("#breakway").html("Breakway On");
		// 	}
		// 	else
		// 	{
		// 		main.break = true;
		// 		$("#breakway").html("Breakway Off");
		// 	}
		// })
		$("#break_select").change(function()
		{
			if ($(this).val() == 0)
			{
				main.break = true;
				$("#breakway_section h3").html("Breakway Off");
			}
			else 
			{
				main.break = false;
				$("#breakway_section h3").html("Breakway On");
				$(".break_logo").attr("src", "img/break/" + $(this).val() + ".png");
				$(".break_bottom_logo").attr("src", "img/break/" + $(this).val() + ".png");
			}
		})

		function break_on()
		{
			$(".break_logo").height($("#third_back_img").height() + 2);
			var top = parseInt($("#third_back_img").css("top").replace("px"));
			$(".break_logo").css("top", (top - 1) + "px");
			$(".break_logo").show();
			$(".break_logo_mask").show();
			$(".break_logo_mask").css("top", (top - 1) + "px");
			$(".break_logo_mask").width($(".break_logo").width());
			$(".break_logo_mask").height($(".break_logo").height());

			$(".break_bottom_logo").height($("#third_back_img").height() + 2);
			$(".break_bottom_logo").css("left", (410 - $(".break_bottom_logo").width() / 2) + "px");
			$(".break_bottom_logo").show();
			$(".break_bottom_mask").show();
			$(".break_bottom_mask").width($(".break_bottom_logo").width());
			$(".break_bottom_mask").height($(".break_bottom_logo").height());
			$(".break_bottom_mask").css("left", (410 - $(".break_bottom_logo").width() / 2) + "px");
			// $(this).attr('data-switch','off');
			$("#breakway").removeClass('on').addClass('off');
		}

		function break_off()
		{
			$(".break_logo").hide();

			/*$(".break_bottom_logo").height($("#third_back_img").height() + 2);
			$(".break_bottom_logo").css("left", (410 - $(".break_bottom_logo").width() / 2) + "px");*/
			$(".break_bottom_logo").hide();
			$(".break_bottom_mask").hide();
			$("#breakway").removeClass('off').addClass('on');
		}

		$("#btn_reload").click(function() 
		{
			location.reload();
		})

		$("#copy_color").click(function()
		{
			if (!main.color)
				return;

			color_flg = true;

			if (color_flg && logo_flg)
			{
				if (main.color_select)
					smallObj.addColor(main.color);
				var newImg = smallObj.canvas.toDataURL('png');
				main.drawImageCanvas("third_img", newImg);
				main.drawImageCanvas("first_back_img", newImg);
				main.drawImageCanvas("sec_back_img", newImg);
				main.drawImageCanvas("detachable_back", newImg);
				main.drawImageCanvas("fourth_back_img", newImg);
			}
			else if (color_flg)
			{
				if (!main.color_select)
					return;
				var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				// Clip a rectangular area
				ctx.rect(0, 0, 3000, 150);
				ctx.stroke();
				ctx.clip();
				// Draw red rectangle after clip()
				ctx.fillStyle = main.color;
				ctx.fillRect(0, 0, 3000, 150);
				var backImg = c.toDataURL('png');
				main.drawImageCanvas("first_back_img", backImg);
				main.drawImageCanvas("sec_back_img", backImg);
				main.drawImageCanvas("third_img", backImg);
				main.drawImageCanvas("detachable_back", backImg);
				main.drawImageCanvas("fourth_back_img", backImg);
			}
		});

		$("#copy_logo").click(function()
		{
			var newImg = smallObj.canvas.toDataURL('png');

			logo_flg = true;
			if (color_flg && logo_flg)
			{
				main.drawImageCanvas("third_img", newImg);
				main.drawImageCanvas("first_back_img", newImg);
				main.drawImageCanvas("sec_back_img", newImg);
				main.drawImageCanvas("detachable_back", newImg);
				main.drawImageCanvas("fourth_back_img", newImg);
			}
			else if (logo_flg)
			{
				if (main.singleParam.src && main.backgroundSrc)
				{
					var color = main.color;
					smallObj.addImage({src: main.backgroundSrc});
					smallObj.addColor(main.backColor);
					smallObj.canvas.renderAll();
					var newImg = smallObj.canvas.toDataURL('png');
					main.drawImageCanvas("third_img", newImg);
					main.drawImageCanvas("first_back_img", newImg);
					main.drawImageCanvas("sec_back_img", newImg);
					main.drawImageCanvas("detachable_back", newImg);
					main.drawImageCanvas("fourth_back_img", newImg);
					if (main.color_select)
					{
						smallObj.addColor(color);
						smallObj.canvas.renderAll();
					}
				}
			}
		})

		$("#btn_close").click(function()
		{
			$("#scene_list").css("display", "none");
			$("#overlay_mask").fadeOut();
			$("#breakway").removeClass('off').addClass('on');
		});

		$("#logo-select").change(function()
		{
			if ($(this).val() == 1)
			{
				$("#picker-area").show();
				$("#picker-area1").hide();
			}
			else 
			{
				$("#picker-area").hide();
				$("#picker-area1").show();
			}
		});

		$("#btn_email").click(function()
		{
			$("#email_field").css("display", "block");
			$("#overlay_mask").height($("body").height());
			$("#overlay_mask").fadeIn();
			$("html, body").animate({scrollTop: 0});
			$("#target_email").val("");
		});

		$("#email_close").click(function()
		{
			$("#email_field").css("display", "none");
			$("#overlay_mask").fadeOut();
		});

		$("#send_email").click(function()
		{
			var email = $("#target_email").val();
			if (email == "" || validateEmail(email) == false)
			{
				alert("Please type valid Email address");
			}

			$("#process_mask").css("display", "block");
			$("#spin").css("display", "block");

			html2canvas(($("#main_view")), 
			{
				allowTaint: true,
				logging: true,
				taintTest: false,
			}).then(function(canvas) {
				var myImage = canvas.toDataURL();
				var content = $("#main_view").html();
				var lanyard = smallObj.canvas.toDataURL('png');
				$.ajax(
				{
					type: "POST",
					url: "./php/sendemail.php",
					data: {
						email: email, 
						content: content, 
						image: myImage,
						lanyard: lanyard,
						clip: lanyard_clip,
						price: main.price
					},
					success: function(data) 
					{
						$("#process_mask").css("display", "none");
						$("#spin").css("display", "none");
						$("#email_close").click();
						$("#btn_close").click();
						var rlt = JSON.parse(data);
						if (rlt.success)
							alert("Sent email successfully!");
						else
							alert("failed!");
					},
					error: function()
					{
						$("#process_mask").css("display", "none");
						$("#spin").css("display", "none");
						$("#scene_list").css("display", "none");
						alert("Failed sending email!");
					}
				})
			});
		});

		$("#btn_pdf").click(function(e)
		{
			$("#process_mask").css("display", "block");
			$("#breakway").removeClass('off').addClass('on');
			$("#spin").css("display", "block");
			$(".mask_logo").css("backgroundColor", "#fff");
			var childWindow = window.open();
			html2canvas(($("#main_view")), 
			{
				allowTaint: true,
				logging: true,
				taintTest: false,
			}).then(function(canvas) {
				var myImage = canvas.toDataURL();
				var content = $("#main_view").html();
				var lanyard = smallObj.canvas.toDataURL('png');
				var date = new Date();
				var curYear = date.getFullYear(),
				curMonth = date.getMonth()+1,
				curDay = date.getDate(),
				curHour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				curMinute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				curSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

				var file_name = curYear+'_'+curMonth+'_'+curDay+'_'+curHour+'_'+curMinute+'_'+curSeconds+'.pdf';
				$.ajax(
				{
					type: "POST",
					url: "./php/printPdf.php",
					data: {
						content: content, 
						image: myImage,
						lanyard: lanyard,
						clip: lanyard_clip,
						price: main.price,
						file_name: file_name
					},
					success: function(data) 
					{
						$("#process_mask").css("display", "none");
						$("#spin").css("display", "none");
						$("#email_close").click();
						$("#btn_close").click();
						e.preventDefault();
						// window.open("./tmp/" + file_name);
						childWindow.location.href = "./tmp/" + file_name
					},
					error: function()
					{
						$("#process_mask").css("display", "none");
						$("#spin").css("display", "none");
						$("#scene_list").css("display", "none");
						childWindow.close();
						alert("Failed sending email!");
					}
				})
			});
			$(".mask_logo").css("backgroundColor", "rgb(246, 246, 246)");
		})
	}

	main.initUploader = function()
	{
		var btn_front = document.getElementById('btn_file_logo1');
		var uploader_front = new ss.SimpleUpload(
		{
			button: btn_front,
			url: 'php/file_upload.php',
			name: 'uploadfile',
			multipart: true,
			hoverClass: 'hover',
			focusClass: 'focus',
			responseType: 'json',

			onSubmit: function(filename, extension)
			{
				$("#process_mask").css("display", "block");
				$("#spin").css("display", "block");
			},

			onComplete: function( filename, response ) 
			{
				$("#process_mask").css("display", "none");
				$("#spin").css("display", "none");
				main.first_logo = "tmp/" + filename;
				main.singleParam.src = main.first_logo;
				$('#logo-preview-img').attr('src', main.first_logo);
				$('#logo-preview').show();
				smallObj.addLogo(main.singleParam, main.logoSmallPos);
				largeObj.addLogo(main.singleParam, main.logoLargePos);
				$("#btn_file_logo1").css("background-image", "url('tmp/" + filename + "')");
			},
			onError: function(err) 
			{
				$("#process_mask").css("display", "none");
				$("#spin").css("display", "none");
			}
		});

		var btn_rear = document.getElementById('btn_file_logo2');
		var uploader_rear = new ss.SimpleUpload(
		{
			button: btn_rear,
			url: 'php/file_upload.php',
			name: 'uploadfile',
			multipart: true,
			hoverClass: 'hover',
			focusClass: 'focus',
			responseType: 'json',

			onSubmit: function(filename, extension)
			{
				$("#process_mask").css("display", "block");
				$("#spin").css("display", "block");
			},

			onComplete: function( filename, response ) 
			{
				$("#process_mask").css("display", "none");
				$("#spin").css("display", "none");
				var background = "";

				main.second_logo = "tmp/" + filename;
				main.secondParam.src = main.second_logo;
				$('#logo-preview-img1').attr('src', main.second_logo);
				$('#logo-preview1').show();
				smallObj.addSecondLogo(main.secondParam, main.logoSmallPos);
				largeObj.addSecondLogo(main.secondParam, main.logoLargePos);
			},
			onError: function() 
			{
				$("#process_mask").css("display", "none");
				$("#spin").css("display", "none");
			}
		});
	}

	main.clipImage 		 = function(newImg)
	{
		var canvas=document.getElementById("canvas");
		var ctx=canvas.getContext("2d");

		var img=new Image();
		img.onload=function(){

			clip(img, 0, 0, 320, 70);

		}
		img.crossOrigin="anonymous";
		img.src=newImg;

		function clip(image, clipX, clipY, clipWidth, clipHeight)
		{
			ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight,
				0, 0, clipWidth, clipHeight);

			var clippedImg=document.getElementById("first_img");
			clippedImg.src=canvas.toDataURL();
		}
	}

	main.initColorPicker = function()
	{
		$("#color_picker").farbtastic(function(color)
		{
			main.color = color;
			if (!main.back_select)
				main.backColor = color;
			main.color_select = true;
			smallObj.addColor(color);
			largeObj.addColor(color);
			$('#color_value').val(color);
		});
		$.farbtastic('#color_picker').setColor('#fff');
	}

	main.initPicker = function()
	{
		$("#padding-picker").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: main.singleParam.padding,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				main.singleParam.padding = parseInt(val);
				return parseInt(val) / 10 + "cm";
			}
		});
		
		$("#x-pos-picker").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 0,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 10 + "cm";
			}
		});

		$("#y-pos-picker").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 50,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 20 + "cm";
			}
		});
		$("#width-picker").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 100,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				console.log(val);
				return parseInt(val) / 5 + "cm";
			}
		});
		$("#height-picker").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 100,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 20 + "cm";
			}
		});

		$("#padding-picker1").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: main.secondParam.padding,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				main.secondParam.padding = parseInt(val);
				return parseInt(val) / 10 + "cm";
			}
		});
		
		$("#x-pos-picker1").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: main.secondParam.xPos,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				main.secondParam.xPos = parseInt(val);
				return parseInt(val) / 10 + "cm";
			}
		});

		$("#y-pos-picker1").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 50,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 20 + "cm";
			}
		});
		$("#width-picker1").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 100,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 5 + "cm";
			}
		});
		$("#height-picker1").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
			radius: 50,
			width: 10,
			value: 100,
			circleShape: "pie",
			startAngle: 315,
			tooltipFormat: function(e)
			{
				var val = e.value;
				return parseInt(val) / 20 + "cm";
			}
		});
	}

	main.initClipList = function()
	{
		if ($(".hook_area").hasClass("slick-initialized"))
			$(".hook_area").removeClass("slick-initialized");
		if ($(".hook_area").hasClass("slick-slider"))
			$(".hook_area").removeClass("slick-slider");
		var inner_html = "";

		for (var i = 0; i < img_rlt.length; i ++)
		{
			if (img_rlt[i].toLowerCase().includes("small"))
			{
				continue;
			}
			else if (img_rlt[i].toLowerCase().includes("medium"))
			{
				continue;
			}
			else if (img_rlt[i].toLowerCase().includes("large"))
			{
				continue;
			}
			inner_html += "<button id='" + img_rlt[i].replace(".png", "") + "' class='hook_btn'><img src='" + "img/clips/" + img_rlt[i] +"'></button>";
		}

		$(".hook_area").html(inner_html);
		
		$(".hook_area").slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 8,
			slidesToScroll: 8,
			responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 0,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		});

		main.clipShowing = true;
	}

	/*main.drawImageCanvas = function(id, newImg)
	{
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext("2d");

		var img = new Image();
		img.onload=function()
		{
			if (id == "third_img" || id == "third_back_img")
			{
        		// ctx.drawImage(img, 0, 0, canvas.width * $("#first_img").width() / $("#third_img").width(), canvas.height);
        		ctx.drawImage(img, 0, 0, img.width / 2, img.height, 0, 0, canvas.width * $("#first_img").width() / $("#third_img").width(), canvas.height);
        	}
        	else if (id == "flat_lanyard")
        	{
        		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, $("#flat_lanyard").width(), $("#flat_lanyard").width());
        	}
        	else if (id == "first_img" || id == "sec_img") 
        	{
        		ctx.drawImage(img, 0, 0, Math.min(canvas.width * img.height / canvas.height, img.width), img.height, 0, 0, canvas.width, canvas.height);
        	}
        	else if( id == 'fourth_img' || id == 'fourth_back_img' || id == 'detachable' || id == "detachable_back" && newImg != 'img/satin_lanyard_prev.png')
        	{
        		ctx.drawImage(img, 0, 0, Math.min(canvas.width * img.height / canvas.height, img.width), img.height, 0, 0, canvas.width, canvas.height);
        	}
        	else 
        	{
        		ctx.drawImage(img, 0, 0, img.width / 2, img.height, 0, 0, canvas.width, canvas.height);
        	}

        }
        img.crossOrigin="anonymous";
        img.src=newImg;
    }*/

    main.drawImageCanvas = function(id, newImg)
	{
		var canvas = document.getElementById(id);
	    var ctx = canvas.getContext("2d");

	    var img = new Image();
	    img.onload=function()
	    {
	    	if (id == "third_img" || id == "third_back_img" || id == 'detachable' || id == "detachable_back")
	        {
        		main.fitImageOn(canvas, img);
	        }
	        else if (id == "flat_lanyard")
	        {
	        	main.fitImageOn(canvas, img);
	        }
	        else if( id == 'fourth_img' || id == 'fourth_back_img' || id == "detachable_flat" && newImg != 'img/satin_lanyard_prev.png')
        	{
        		// ctx.drawImage(img, 0, 0, Math.min(canvas.width * img.height / canvas.height, img.width), img.height, 0, 0, canvas.width, canvas.height);
        		main.fitImageOn(canvas, img);
        	}
        	else if (id == "first_img" || id == "sec_img" || id == "first_back_img" || id == "sec_back_img")
        	{
        		main.fitImageOn(canvas, img);
        	}
	        else 
	        {
	        	// ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
	        	main.fitImageOn(canvas, img);
	        }

	    }
	    img.crossOrigin="anonymous";
	    img.src=newImg;
	}

	main.fitImageOn = function(canvas, imageObj) {
		var context = canvas.getContext("2d");
		var imageAspectRatio = imageObj.width / imageObj.height;
		var canvasAspectRatio = canvas.width / canvas.height;
		var renderableHeight, renderableWidth, xStart, yStart;

		// If image's aspect ratio is less than canvas's we fit on height
		// and place the image centrally along width
		if(imageAspectRatio < canvasAspectRatio) {
			renderableHeight = canvas.height;
			renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
			xStart = (canvas.width - renderableWidth) / 2;
			yStart = 0;
			context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
		}

		// If image's aspect ratio is greater than canvas's we fit on width
		// and place the image centrally along height
		else if(imageAspectRatio > canvasAspectRatio) {
			renderableWidth = canvas.width * imageObj.height / canvas.height;
			renderableHeight = imageObj.height;
			xStart = 0;
			yStart = 0;
			context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight, 0, 0, canvas.width, canvas.height);
		}

		else {
			renderableHeight = canvas.height;
			renderableWidth = canvas.width;
			xStart = 0;
			yStart = 0;
			context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
		}
		
	};

    main.drawFlat = function(id, newImg)
    {
    	var cvs = document.getElementById(id);
    	var context = cvs.getContext("2d");

    	var img = new Image();
    	img.onload = function()
    	{
    		context.drawImage(img, 0, 0, img.width, img.height, 0, 0, cvs.width, cvs.height);
    	}
    	img.crossOrigin="anonymous";
    	img.src = newImg;
    }

    main.setPos = function(id)
    {
    	var height = ($("#" + id).height() - 40) / 2 + 6;
    	$("#" + id).css("top", height + "px");
    	$("#" + id).width(161 + ($("#" + id).height() - 40) / 2);

    	$(".logo").width(($("#first_img").height() * 1.5) + 5);
    	$(".logo").css("top", ((420 * Math.sin(80 / 180 * Math.PI) ) - 3) + "px");

    	$(".flat_logo").width(($("#flat_lanyard").height() * 1.5) + 2);

		// $(".flat_lanyard")
		$(".mask_logo").css("top", (420 * Math.sin(80 / 180 * Math.PI) - 28) + "px");
	}

	main.setHeight = function()
	{
		var height = $("#small_bar").height();
		$("#scene_list canvas").height(height / 2);
	}

	main.setDoublePos = function(id)
	{
		var width = $("#first_img").width() / 2;
		var rlt_width = $(".result_view").width() - ($(".result_view").width() - (width + 28)) * 2 + $("#" + id).height();
		// $("#" + id).width(rlt_width);
		$("#" + id).css("top", ($("#" + id).height() / 2 - 10) + "px");

		$(".logo_first").width($("#first_img").height() * 1.5);
		$(".logo_sec").width($("#first_img").height() * 1.5);

		var left = ($(".result_view").width() - $("#third_img").width()) / 2 - $("#first_img").height() / 2 + 4;
		$(".logo_first").css("left", (left) + "px");
		$(".logo_sec").css("right", (left) + "px");
		
		$(".logo_first").css("top", (400 - 15 * $(".logo_first").width() / 96 + 21) + "px");
		$(".logo_sec").css("top", (400 - 15 * $(".logo_sec").width() / 96 + 21) + "px");
	}

	main.makePdfContent = function()
	{
		var content = "";
		return content;
	}

	$('#switchSides').click(function(){
		var small_bar_size = parseInt(sessionStorage.getItem('selected_small_size'));
		var large_bar_size = parseInt(sessionStorage.getItem('selected_large_size'));
		main.back_select = !main.back_select;


		if($(this).hasClass('back'))
		{
			//saving json + props of frontside;

			sessionStorage.setItem('front_first_logo',$('#logo-preview-img').attr('src'));
			sessionStorage.setItem('front_second_logo',$('#logo-preview-img1').attr('src'));
			$('#front_image_for_hook').attr('src',smallObj.canvas.toDataURL('png'));
			var front_first_logo_values = {
				padding: $("#padding-picker").roundSlider("option", "value"),
				x_pos: parseInt($('#x-pos-picker').roundSlider("option", "value")),
				y_pos: parseInt($('#y-pos-picker').roundSlider("option", "value")),
				width: parseInt($('#width-picker').roundSlider("option", "value")),
				height: parseInt($('#height-picker').roundSlider("option", "value")),
			};
			console.log(front_first_logo_values.width);
			sessionStorage.setItem('front_first_logo_values',JSON.stringify(front_first_logo_values));

			var front_second_logo_values = {
				padding: $("#padding-picker1").roundSlider("option", "value"),
				x_pos: parseInt($('#x-pos-picker1').roundSlider("option", "value")),
				y_pos: parseInt($('#y-pos-picker1').roundSlider("option", "value")),
				width: parseInt($('#width-picker1').roundSlider("option", "value")),
				height: parseInt($('#height-picker1').roundSlider("option", "value")),
			};
			sessionStorage.setItem('front_second_logo_values',JSON.stringify(front_second_logo_values));
			
			$('#logo-preview-img').attr('src','');
			$('#logo-preview-img1').attr('src','');
			$('#logo-preview').hide();
			$('#logo-preview1').hide();

			smallObj.remove("logo");
			smallObj.remove("secLogo");

			var json_small = JSON.stringify(smallObj.canvas.toDatalessJSON(['id','type','class','padding','lockMovementX','lockMovementY','lockScalingX','lockScalingY','lockRotation','editable','name','index','width','height','scaleY','scaleX','lineHeight','charSpacing','letterSpace','bullet','bulletText','radius','startAngle','endAngle','editable','lineHeight','charSpacing']));
			sessionStorage.setItem("json_small_front", json_small);
			smallObj.clearCanvas()

			largeObj.remove("logo");
			largeObj.remove("secLogo");

			var json_large = JSON.stringify(largeObj.canvas.toDatalessJSON(['id','type','class','padding','lockMovementX','lockMovementY','lockScalingX','lockScalingY','lockRotation','editable','name','index','width','height','scaleY','scaleX','lineHeight','charSpacing','letterSpace','bullet','bulletText','radius','startAngle','endAngle','editable','lineHeight','charSpacing']));
			sessionStorage.setItem("json_large_front", json_large);
			largeObj.clearCanvas();

			//Loading json + props of backside! 

			main.singleParam.src = sessionStorage.getItem('back_first_logo');
			main.secondParam.src = sessionStorage.getItem('back_second_logo');
			if(main.singleParam.src){
				$('#logo-preview-img').attr('src',main.singleParam.src);
				$('#logo-preview').show();
			}
			if(main.secondParam.src)
			{
				$('#logo-preview-img1').attr('src',main.secondParam.src);	
				$('#logo-preview1').show();
			}

			var back_first_logo_values = JSON.parse(sessionStorage.getItem('back_first_logo_values'));
			var back_second_logo_values = JSON.parse(sessionStorage.getItem('back_second_logo_values'));

			var jsonSmall = sessionStorage.getItem('json_small_back');
			var jsonLarge = sessionStorage.getItem('json_large_back');
			smallObj.addColor("white");
			largeObj.addColor("white");
			if(jsonSmall)
			{
				smallObj.canvas.loadFromDatalessJSON(jsonSmall, smallObj.canvas.renderAll.bind(smallObj.canvas), function(o, object) {
				});
				smallObj.addLogo(main.singleParam, main.logoSmallPos,back_first_logo_values);
				smallObj.addSecondLogo(main.secondParam, main.logoSmallPos,back_second_logo_values);
			}
			if(jsonLarge)
			{
				largeObj.canvas.loadFromDatalessJSON(jsonLarge, largeObj.canvas.renderAll.bind(largeObj.canvas), function(o, object) {
				});
				largeObj.addLogo(main.singleParam, main.logoLargePos,back_first_logo_values);
				largeObj.addSecondLogo(main.secondParam, main.logoLargePos,back_second_logo_values);
			}
			if (smallObj.tmp && largeObj.tmp)
			{
				smallObj.remove("backimage");
				smallObj.addImage(smallObj.tmp);
				largeObj.remove("backimage");
				largeObj.addImage(largeObj.tmp);
			}
			if(back_first_logo_values){
				$("#padding-picker").roundSlider({value: back_first_logo_values.padding});
				$("#x-pos-picker").roundSlider({value: back_first_logo_values.x_pos});
				$("#y-pos-picker").roundSlider({value: back_first_logo_values.y_pos});
				$("#width-picker").roundSlider({value: back_first_logo_values.width});
				$("#height-picker").roundSlider({value: back_first_logo_values.height});
			}
			if(back_second_logo_values){
				$("#padding-picker1").roundSlider({value: back_second_logo_values.padding});
				$("#x-pos-picker1").roundSlider({value: back_second_logo_values.x_pos});
				$("#y-pos-picker1").roundSlider({value: back_second_logo_values.y_pos});
				$("#width-picker1").roundSlider({value: back_second_logo_values.width});
				$("#height-picker1").roundSlider({value: back_second_logo_values.height});
			}

			if(sessionStorage.getItem('back_background_color'))
				$.farbtastic('#color_picker').setColor(sessionStorage.getItem('back_background_color'));

			if(small_bar_size && large_bar_size)
			{
				smallObj.setAllScale(small_bar_size);
				largeObj.setAllScale(large_bar_size);
			}

			$('#sideLabel').text('Back view');
			$(this).removeClass('back').addClass('front');
			$.farbtastic('#color_picker').setColor(smallObj.canvas.backgroundColor);
		}
		else
		{
			//saving json + props of backside;
			$('#back_image_for_hook').attr('src',smallObj.canvas.toDataURL('png'));
			sessionStorage.setItem('back_first_logo',$('#logo-preview-img').attr('src'));
			sessionStorage.setItem('back_second_logo',$('#logo-preview-img1').attr('src'));
			$('#logo-preview-img').attr('src','');
			$('#logo-preview-img1').attr('src','');
			$('#logo-preview').hide();
			$('#logo-preview1').hide();

			var back_first_logo_values = {
				padding: $("#padding-picker").roundSlider("option", "value"),
				x_pos: parseInt($('#x-pos-picker').roundSlider("option", "value")),
				y_pos: parseInt($('#y-pos-picker').roundSlider("option", "value")),
				width: parseInt($('#width-picker').roundSlider("option", "value")),
				height: parseInt($('#height-picker').roundSlider("option", "value")),
			};
			sessionStorage.setItem('back_first_logo_values',JSON.stringify(back_first_logo_values));

			var back_second_logo_values = {
				padding: $("#padding-picker1").roundSlider("option", "value"),
				x_pos: parseInt($('#x-pos-picker1').roundSlider("option", "value")),
				y_pos: parseInt($('#y-pos-picker1').roundSlider("option", "value")),
				width: parseInt($('#width-picker1').roundSlider("option", "value")),
				height: parseInt($('#height-picker1').roundSlider("option", "value")),
			};
			sessionStorage.setItem('back_second_logo_values',JSON.stringify(back_second_logo_values));

			smallObj.remove("logo");
			smallObj.remove("secLogo");

			var json_small = JSON.stringify(smallObj.canvas.toDatalessJSON(['id','type','class','padding','lockMovementX','lockMovementY','lockScalingX','lockScalingY','lockRotation','editable','name','index','width','height','scaleY','scaleX','lineHeight','charSpacing','letterSpace','bullet','bulletText','radius','startAngle','endAngle','editable','lineHeight','charSpacing']));
			sessionStorage.setItem("json_small_back", json_small);
			
			smallObj.clearCanvas();

			largeObj.remove("logo");
			largeObj.remove("secLogo");

			var json_large = JSON.stringify(largeObj.canvas.toDatalessJSON(['id','type','class','padding','lockMovementX','lockMovementY','lockScalingX','lockScalingY','lockRotation','editable','name','index','width','height','scaleY','scaleX','lineHeight','charSpacing','letterSpace','bullet','bulletText','radius','startAngle','endAngle','editable','lineHeight','charSpacing']));
			sessionStorage.setItem("json_large_back", json_large);
			largeObj.clearCanvas();

			//Loading json + props of frontside! 

			var front_first_logo_values = JSON.parse(sessionStorage.getItem('front_first_logo_values'));
			var front_second_logo_values = JSON.parse(sessionStorage.getItem('front_second_logo_values'));

			main.singleParam.src = sessionStorage.getItem('front_first_logo');
			main.secondParam.src = sessionStorage.getItem('front_second_logo');

			if(main.singleParam.src){
				$('#logo-preview-img').attr('src',main.singleParam.src);
				$('#logo-preview').show();
			}

			if(main.secondParam.src)
			{
				$('#logo-preview-img1').attr('src',main.secondParam.src);	
				$('#logo-preview1').show();
			}

			var jsonSmall = sessionStorage.getItem('json_small_front');
			var jsonLarge = sessionStorage.getItem('json_large_front');
			if(jsonSmall)
			{
				smallObj.canvas.loadFromDatalessJSON(jsonSmall, smallObj.canvas.renderAll.bind(smallObj.canvas), function(o, object) {
				});
				smallObj.addLogo(main.singleParam, main.logoSmallPos,front_first_logo_values);
				smallObj.addSecondLogo(main.secondParam, main.logoSmallPos,front_second_logo_values);
			}

			if(jsonLarge)
			{
				largeObj.canvas.loadFromDatalessJSON(jsonLarge, largeObj.canvas.renderAll.bind(largeObj.canvas), function(o, object) {
				});
				largeObj.addLogo(main.singleParam, main.logoLargePos,front_first_logo_values);
				console.log(front_first_logo_values.width);
				largeObj.addSecondLogo(main.secondParam, main.logoLargePos,front_second_logo_values);
			}
			if (smallObj.tmp && largeObj.tmp)
			{
				smallObj.remove("backimage");
				smallObj.addImage(smallObj.tmp);
				largeObj.remove("backimage");
				largeObj.addImage(largeObj.tmp);
			}
			if(front_first_logo_values){
				$("#padding-picker").roundSlider({value: front_first_logo_values.padding});
				$("#x-pos-picker").roundSlider({value: front_first_logo_values.x_pos});
				$("#y-pos-picker").roundSlider({value: front_first_logo_values.y_pos});
				$("#width-picker").roundSlider({value: front_first_logo_values.width});
				$("#height-picker").roundSlider({value: front_first_logo_values.height});
			}
			if(front_second_logo_values){
				$("#padding-picker1").roundSlider({value: front_second_logo_values.padding});
				$("#x-pos-picker1").roundSlider({value: front_second_logo_values.x_pos});
				$("#y-pos-picker1").roundSlider({value: front_second_logo_values.y_pos});
				$("#width-picker1").roundSlider({value: front_second_logo_values.width});
				$("#height-picker1").roundSlider({value: front_second_logo_values.height});
			}
			
			if(sessionStorage.getItem('front_background_color'))
				$.farbtastic('#color_picker').setColor(sessionStorage.getItem('front_background_color'));

			if(small_bar_size && large_bar_size)
			{
				smallObj.setAllScale(small_bar_size);
				largeObj.setAllScale(large_bar_size);
			}

			$('#sideLabel').text('Front view');
			$(this).removeClass('front').addClass('back');
			$.farbtastic('#color_picker').setColor(smallObj.canvas.backgroundColor);
		}
	});
}
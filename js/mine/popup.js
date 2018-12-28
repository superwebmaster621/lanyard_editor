var classPopup 		= function()
{
	var main 		= this;

	main.mode 	 	= "save_house";
	main.src_arr 	= [];

	this.init 		= function(drawObj)
	{
		this.initEvt();
		this.initFileUpload();
	}

	main.initEvt 	= function()
	{
		$(".overlay_close").click(function()
		{
			main.hide();
		});

		$("#btn_addimg").click(function()
		{
			var mode 		= main.mode;
			var txt_label 	= "";
			var url_image 	= main.src_arr[0];
			var url_thumb 	= main.src_arr[1];
			var url_stone 	= main.src_arr[2];

			$.ajax(
			{
				type 	: "POST",
				url 	: "php/ajax.php", 
				data 	: ({mode : mode, txt_label : txt_label, url_image : url_image, url_thumb : url_thumb, url_stone : url_stone}),
				cache 	: false,
				success : function (result) 
				{
					var li_html = "";

					if(main.mode == "save_house")
					{
						li_html = "<li info='" + result + "'><img src='img/house/" + url_thumb + "'></li>";
					}
					// console.log(result);
					$("#data_list").append(li_html);
				}
			});

			main.hide();
		});
	}

	main.show 		= function(div)
	{
		main.src_arr = [];

		$("#over_overlay .popup").each(function()
		{
			$(this).css("display", "none");
		});

		$("#" + div).css("display", "block");

		$("#overlay").css("display", "block");
		$("#over_overlay").fadeIn();
	}

	main.hide 		= function()
	{
		$("#overlay").css("display", "none");
		$("#over_overlay").css("display","none");
	}

	main.initFileUpload = function()
	{
		var btn_arr 		= [];
		var dir_arr 		= ["house", "house", "stone"];
		var progressBar 	= document.getElementById('progressBar');
		var progressOuter 	= document.getElementById('progressOuter');
		
		for(var i = 1; i < 3; i ++)
		{
			var btn = document.getElementById('uploadBtn' + i);

			var uploader = new ss.SimpleUpload(
			{
				button 		: btn,
				url 		: 'php/file_upload.php',
				name 		: 'uploadfile',
				multipart 	: true,
				hoverClass 	: 'hover',
				focusClass 	: 'focus',
				responseType: 'json',
				data 		: {dirname : dir_arr[i - 1]},
				startXHR: function() 
				{
					progressOuter.style.display = 'block'; // make progress bar visible
					this.setProgressBar( progressBar );
				},
				onSubmit: function() 
				{
					console.log(this);
					this._btns[0].innerHTML = 'Uploading...'; // change button text to "Uploading..."
				},
				onComplete: function( filename, response ) 
				{
					this._btns[0].innerHTML = filename + '<br>Choose Another File';
					this._btns[0].setAttribute("fname", filename);

					main.src_arr.push(filename);

					progressOuter.style.display = 'none'; // hide progress bar when upload is completed

					if ( !response ) 
					{
						return;
					}

					if ( response.success === true ) 
					{
						console.log("success");
					}
				},
				onError: function() 
				{
					progressOuter.style.display = 'none';
				}
			});
		}
	}

	main.init();
}
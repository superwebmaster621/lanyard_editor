//***************************************************************************************//
//
//	FabricJS Object Drawing file
//
//***************************************************************************************//

var drawObj 		= function(parent, mask, id, parentID)
{
	var main 		= this;

	main.canvasID 	= id;
	main.canvWidth	= 300;
	main.canvHeight	= 300;
	main.canvas 	= null;

	main.template	= null;
	main.arrSection = [];	
	main.arrIndex 	= 0;
	main.prevScale	= 1;
	main.mask_url 	= mask;
	main.parentID 	= parentID;

	main.orgHeight  = 96;

	main.height = 0;

	main.tmp = null;
	

	main.init 		= function()
	{
		main.canvasCSS();
		main.initFabric();
		main.initEvent();
	}

	main.canvasCSS	= function(width, height)
	{
		main.canvWidth  = $("#" + main.parentID).width() * 4;
		main.canvHeight = $("#" + main.parentID).height();

		if(width)
			main.canvWidth = width;

		if(height)
			main.canvHeight = height;

		$("#" + main.canvasID).attr("width",main.canvWidth);
		$("#" + main.canvasID).attr("height",main.canvHeight);
		$("#" + main.canvasID).css("width",main.canvWidth);
		$("#" + main.canvasID).css("height",main.canvHeight);

		if(main.canvas)
		{
			main.canvas.setWidth(main.canvWidth);
			main.canvas.setHeight(main.canvHeight);

			main.canvas.renderAll();
			main.canvas.calcOffset();
		}

		main.height = main.canvHeight;
	}

	main.hideOverlay	= function()
	{
		main.canvas.setOverlayImage(null, main.canvas.renderAll.bind(main.canvas));
	}

	main.showOverlay 	= function()
	{
		var image =  new Image();

		image.onload = function()
		{
			var scale 	= Math.min(main.canvWidth / image.width, main.canvHeight / image.height);
			var left 	= (main.canvWidth - image.width * scale) / 2;
			var top 	= (main.canvHeight - image.height * scale) / 2;

			main.canvas.setOverlayImage(main.mask_url, main.canvas.renderAll.bind(main.canvas),{
				left 	: left,
				top 	: top,
				scaleX  : scale,
				scaleY  : scale,
				objectCaching: false,
			});
		}

		image.src = main.mask_url;
	}

	main.checkMobile = function()
	{
		if (window.screen.width < 415)
			return Math.max(window.screen.width / 980, window.screen.height / 1063);
		else
			return 1;
	}

	main.initFabric	= function()
	{
		fabric.Object.prototype.set({
			patternSourceCanvas: this.patternSourceCanvas
		});
		main.canvas = new fabric.Canvas(main.canvasID);
		main.canvas.includeDefaultValues = true;

	}

	main.initEvent 	= function()
	{
		main.canvas.on("mouse:down", function(evt)
		{
			var selected = main.canvas.getActiveObject();

			if(!selected || !Array.isArray(selected.paths))
			{
				$("#opion_area").css("display", "none");
				return;
			}

			var left = selected.left + selected.width  / 2 - $("#opion_area").width();
			var top  = selected.top  + selected.height / 2;

			$("#opion_area").css({left : left, top : top});
			$("#opion_area").fadeIn();
		});

		$("#option_color").on("change", function()
		{
			var selected = main.canvas.getActiveObject();

			if(!selected)
				return;

			if(!selected.paths)
				return;
			
			for(var i = 0; i < selected.paths.length; i ++)
				selected.paths[i].fill = $(this).val();

			main.canvas.renderAll();
		});
	}

	main.initTexture = function(svg)
	{
		main.arrSection = svg.files;
		main.arrIndex 	= 0;
		
		main.scale 		= Math.min(main.canvWidth / svg.origin_width, main.canvHeight / svg.origin_height);
		main.overImage 	= svg.dir + svg.mask;

		main.showOverlay();
		main.drawTemplate(svg, main.arrSection[main.arrIndex].file);
	}

	main.setAllScale 	= function(height)
	{
		main.canvWidth  = $("#" + main.parentID).width() * 4;
		main.canvHeight = $("#" + main.parentID).height();
		var obj = main.canvas.getObjects();
		main.canvas.setHeight(height);
		if (main.tmp)
		{
			main.remove("backimage");
			main.addImage(main.tmp);
		}

		main.canvas.requestRenderAll();

		main.resizePolygon('logo');
		main.resizePolygon('secLogo');
		// largeObj.resizePolygon('logo').resizePolygon('secLogo');
	}

	main.addImage 	= function(param, callback)
	{
		if (!param)
			return;

		main.remove("backimage");

		// main.canvas.backgroundColor = null;
		var imgObj = fabric.Image.fromURL(param.src, function(img)
		{
			main.canvas.setBackgroundImage(img, main.canvas.renderAll.bind(main.canvas), {
				scaleX: main.canvWidth / img.width,
				scaleY: main.canvHeight / img.height,
				mode: "backimage",
				opacity:1
			});
		});

		main.tmp = JSON.parse(JSON.stringify(param));
	}

	main.addColor 	= function(color)
	{
		/*var obj = main.canvas.getObjects();
		for ( var i = obj.length - 1; i >= 0; i -- )
		{
			if (obj[i].mode == "backimage")
			{
				main.canvas.remove(obj[i]);
			}
		}*/

		// main.canvas.setBackgroundImage(null);

		// main.tmp = null;

		main.canvas.backgroundColor = color;
		// main.canvas.renderAll();

		main.canvas.setBackgroundColor(color, main.canvas.renderAll.bind(main.canvas));
	}

	main.addText 	= function(param)
	{
		var object = new fabric.Text(param.text,
		{ 
			left 	: param.x,
			top 	: param.y, 
			fill 	: param.color,
		});

		main.canvas.add(object);

		object.bringToFront();
		main.canvas.renderAll();
	}

	main.addLogo 		= function(param, num, options)
	{
		var padding = 0;

		/*if (param.padding)
		{
			padding = convertPaddingToPixel(parseInt(param.padding) / 10);
			if (main.canvasID == "large-logo")
			{
				padding *= 2;
			}
		}*/
		if (!param.src)
			return;

		main.remove("logo");

		var scaleX = 1;
		var scaleY = 1;
		var tmp_scaleY = 1;
		if(!options){
			var tempObj = fabric.Image.fromURL(param.src, function(img)
			{
				img.scaleToHeight(main.canvas.height * main.checkMobile());
				/*img.set('scaleX', ((main.canvas.height * main.checkMobile()) - num) / img.width);
				img.set('scaleY', ((main.canvas.height * main.checkMobile()) - num) / img.height);*/
				// img.set('scaleX', ((main.canvas.height * main.checkMobile())) / img.width);
				// img.set('scaleY', ((main.canvas.height * main.checkMobile())) / img.height);
				var width = convertWidthToCenti(img.getScaledWidth());
				tmp_scaleY = img.scaleY;
				console.log(width);
				if (main.canvasID == "large-logo")
					$("#width-picker").roundSlider("option", "value", parseInt(width * 2.5));
				var height = convertWidthToCenti(img.getScaledHeight());
				if (main.canvasID == "large-logo")
					$("#height-picker").roundSlider("option", "value", parseInt(height * 10));
			});
		}

		var width, height;

		var imgObj = fabric.Image.fromURL(param.src, function(img)
		{
			
			if (param.padding)
			{
				padding = convertPaddingToPixel(parseInt(param.padding) / 10);
				if(options){
					padding = convertPaddingToPixel(parseInt(options.padding) / 10);
				}
				if (main.canvasID == "large-logo"){
					padding *= 2;
				}
			}
			if(options)
			{
				if (main.canvasID == "large-logo")
				{
					width = convertPaddingToPixel(options.width / 5) * 2;
					height = convertPaddingToPixel(options.height / 20) * 2;
				}
				else 
				{
					width = convertPaddingToPixel(options.width / 5);
					height = convertPaddingToPixel(options.height / 20);
				}
				// img.scaleToWidth(width);
				// img.scaleToHeight(height);
				img.set('scaleX', width/img.width);
				img.set('scaleY', height/img.height);
			}
			else{
				img.scaleToHeight(main.canvHeight * main.checkMobile());
				/*img.set('scaleX', ((main.canvas.height * main.checkMobile()) - num) / img.width);
				img.set('scaleY', ((main.canvas.height * main.checkMobile()) - num) / img.height);*/
				// img.set('scaleX', ((main.canvas.height * main.checkMobile())) / img.width);
				// img.set('scaleY', ((main.canvas.height * main.checkMobile())) / img.height);
			}

			var patternSourceCanvas = new fabric.StaticCanvas();
			patternSourceCanvas.add(img);
			patternSourceCanvas.renderAll();

			var pattern = new fabric.Pattern(
			{
				repeat: 'repeat-x',
				source: function() 
				{
					patternSourceCanvas.setDimensions(
					{
						width: img.getScaledWidth() + padding,
						height: (img.getScaledHeight() * 10) + padding,  //multiplier of 10 added to hide the pattern repeat at y-axis as dymanic pattern doesn't allow repeat-x property 
					});
					patternSourceCanvas.renderAll();
					return patternSourceCanvas.getElement();
				},
			});
			if(options)
			{
				pattern.offsetX = convertPaddingToPixel(parseInt(options.x_pos) / 10);
				pattern.offsetY = convertPaddingToPixel((parseInt(options.y_pos) - 50) / 20);
				if (main.canvasID == "large-logo"){
					pattern.offsetX *= 2;
					pattern.offsetY *= 2;
				}
			}

			main.canvas.add(new fabric.Polygon([
				{x: 0, y: 0},
				{x: 0, y: main.canvHeight},
				{x: main.canvWidth, y: main.canvHeight},
				{x: main.canvWidth, y: 0}
				], 
				{
					left: 0,
					top: -0.5,
					fill: pattern,
					objectCaching: false,
					mode: "logo",
					lockMovementX: true,
					lockMovementY: true,
					lockScalingX: true,
					lockScalingY: true,
					selectable:false,
					// stroke:'red',
					// strokeWidth:1
				}));

			main.canvas.requestRenderAll();


			$('#padding-picker').bind('drag change', function( event )
			{
				var val = $("#padding-picker").roundSlider("option", "value");
				padding = convertPaddingToPixel(parseInt(val) / 10);
				if (main.canvasID == "large-logo")
					padding *= 2;
				main.canvas.requestRenderAll();
			});

			$("#x-pos-picker").bind("drag change", function(evt)
			{
				var val = $("#x-pos-picker").roundSlider("option", "value");
				pattern.offsetX = convertPaddingToPixel(parseInt(val) / 10);
				if (main.canvasID == "large-logo")
					pattern.offsetX *= 2;
				main.canvas.requestRenderAll();
			});

			$("#y-pos-picker").bind("drag change", function(evt)
			{
				var val = $("#y-pos-picker").roundSlider("option", "value");
				pattern.offsetY = convertPaddingToPixel((parseInt(val) - 50) / 20);
				if (main.canvasID == "large-logo")
					pattern.offsetY *= 2;
				main.canvas.requestRenderAll();
			});

			$("#width-picker").bind("drag change", function(evt)
			{
				var val = $("#width-picker").roundSlider("option", "value");
				// val = val / Number($('#width-picker').attr('data-scale'));
				if (val == 0)
					return;
				var width;
				if (main.canvasID == "large-logo")
				{
					width = convertPaddingToPixel(val / 5) * 2;
				}
				else 
				{
					width = convertPaddingToPixel(val / 5);
				}
				img.scaleToWidth(width);
				// img.set('scaleX', width / img.width);
				main.canvas.requestRenderAll();
				var height = convertWidthToCenti(img.getScaledHeight());

				if (main.canvasID == "large-logo")
				{
					$("#height-picker").roundSlider("option", "value", parseInt(height * 10));
					evt.stopPropagation();
					evt.preventDefault();
				}
			});

			$("#height-picker").bind("drag change", function(evt)
			{
				var val = $("#height-picker").roundSlider("option", "value");
				// val = val / Number($('#height-picker').attr('data-scale'));
				if (val == 0)
					val = 1;
				var height;
				if (main.canvasID == "large-logo")
				{
					height = convertPaddingToPixel(val / 20) * 2;
				}
				else 
				{
					height = convertPaddingToPixel(val / 20);
				}
				img.scaleToHeight(height);
				// img.set('scaleY', height / img.height);
				main.canvas.requestRenderAll();
				var width = convertWidthToCenti(img.getScaledWidth());
				tmp_scaleY = img.scaleY;
				if (main.canvasID == "large-logo")
				{
					$("#width-picker").roundSlider("option", "value", parseInt(width * 2.5));
					evt.stopPropagation();
					evt.preventDefault();
				}
			});
		});
	}

	main.addSecondLogo 	= function(param,num,options)
	{

	var padding = 0;

	if (param.padding)
	{
		padding = convertPaddingToPixel(parseInt(param.padding) / 10);
		if (main.canvasID == "large-logo")
		{
			padding *= 2;
		}
	}

	var init_x = convertPaddingToPixel(parseInt(param.xPos)/10);
	if (main.canvasID == "large-logo")
	{
		init_x *= 2;
	}

	if (!param.src)
		return;

	main.remove("secLogo");

	var scaleX = 1;
	var scaleY = 1;
	var tmp_scaleY = 1;
	if(!options)
	{
		var tempObj = fabric.Image.fromURL(param.src, function(img)
		{
			img.scaleToHeight(main.canvHeight * main.checkMobile());
			/*img.set('scaleX', ((main.canvas.height * main.checkMobile()) - num) / img.width);
			img.set('scaleY', ((main.canvas.height * main.checkMobile()) - num) / img.height);*/
			// img.set('scaleX', ((main.canvas.height * main.checkMobile())) / img.width);
			// img.set('scaleY', ((main.canvas.height * main.checkMobile())) / img.height);
			var width = convertWidthToCenti(img.getScaledWidth());
			tmp_scaleY = img.scaleY;
			if (main.canvasID == "large-logo")
				$("#width-picker1").roundSlider("option", "value", parseInt(width * 2.5));
			var height = convertWidthToCenti(img.getScaledHeight());
			if (main.canvasID == "large-logo")
				$("#height-picker1").roundSlider("option", "value", parseInt(height * 10));
		});
	}

	var imgObj = fabric.Image.fromURL(param.src, function(img)
	{
		if(options)
		{
			if (main.canvasID == "large-logo")
			{
				width = convertPaddingToPixel(options.width / 5) * 2;
				height = convertPaddingToPixel(options.height / 20) * 2;
			}
			else 
			{
				width = convertPaddingToPixel(options.width / 5);
				height = convertPaddingToPixel(options.height / 20);
			}

			img.set('scaleX', width/img.width);
			img.set('scaleY', height/img.height);
		}
		else{
			img.scaleToHeight(main.canvHeight * main.checkMobile());
			/*img.set('scaleX', ((main.canvas.height * main.checkMobile()) - num) / img.width);
			img.set('scaleY', ((main.canvas.height * main.checkMobile()) - num) / img.height);*/
			// img.set('scaleX', ((main.canvas.height * main.checkMobile())) / img.width);
			// img.set('scaleY', ((main.canvas.height * main.checkMobile())) / img.height);
		}
		var patternSourceCanvas = new fabric.StaticCanvas();
		patternSourceCanvas.add(img);
		patternSourceCanvas.renderAll();
		var pattern = new fabric.Pattern(
		{
			source: function() 
			{
				patternSourceCanvas.setDimensions(
				{
					width: img.getScaledWidth() + padding,
					height: img.getScaledHeight() + padding
				});
				patternSourceCanvas.renderAll();
				return patternSourceCanvas.getElement();
			},
			repeat: 'repeat-x',
			offsetX: init_x
		});

		if(options)
		{
			pattern.offsetX = convertPaddingToPixel(parseInt(options.x_pos) / 10);
			pattern.offsetY = convertPaddingToPixel((parseInt(options.y_pos) - 50) / 20);
			if (main.canvasID == "large-logo"){
				pattern.offsetX *= 2;
				pattern.offsetY *= 2;
			}
		}

		main.canvas.add(new fabric.Polygon(
			[
			{x: 0, y: 0},
			{x: 0, y: main.canvHeight},
			{x: main.canvWidth, y: main.canvHeight},
			{x: main.canvWidth, y: 0}
			], 
			{
				left: 0,
				top: -0.5,
				fill: pattern,
				objectCaching: false,
				mode: "secLogo",
				lockMovementX: true,
				lockMovementY: true,
				lockScalingX: true,
				lockScalingY: true,
				selectable:false,
			}));

		$("#padding-picker1").bind("drag change", function(evt)
		{
			var val = $("#padding-picker1").roundSlider("option", "value");
			padding = convertPaddingToPixel(parseInt(val) / 10);
			if (main.canvasID == "large-logo")
				padding *= 2;
			main.canvas.requestRenderAll();
		});

		$("#x-pos-picker1").bind("drag change", function(evt)
		{
			var val = $("#x-pos-picker1").roundSlider("option", "value");
			pattern.offsetX = convertPaddingToPixel(parseInt(val) / 10);
			if (main.canvasID == "large-logo")
				pattern.offsetX *= 2;
			main.canvas.requestRenderAll();
		});

		$("#y-pos-picker1").bind("drag change", function(evt)
		{
			var val = $("#y-pos-picker1").roundSlider("option", "value");
			pattern.offsetY = convertPaddingToPixel((parseInt(val) - 50) / 20);
			if (main.canvasID == "large-logo")
				pattern.offsetY *= 2;
			main.canvas.requestRenderAll();
		});

		$("#width-picker1").bind("drag change", function(evt)
		{
			var val = $("#width-picker1").roundSlider("option", "value");
			// val = val / Number($('#width-picker').attr('data-scale'));
			if (val == 0)
				return;
			var width;
			if (main.canvasID == "large-logo")
			{
				width = convertPaddingToPixel(val / 5) * 2;
			}
			else 
			{
				width = convertPaddingToPixel(val / 5);
			}
			img.scaleToWidth(width);
			// img.set('scaleX', width / img.width);
			main.canvas.requestRenderAll();
			var height = convertWidthToCenti(img.getScaledHeight());

			if (main.canvasID == "large-logo")
			{
				$("#height-picker1").roundSlider("option", "value", parseInt(height * 10));
				evt.stopPropagation();
				evt.preventDefault();
			}
		});



		$("#height-picker1").bind("drag change", function(evt)
		{
			var val = $("#height-picker1").roundSlider("option", "value");
			// val = val / Number($('#height-picker').attr('data-scale'));
			if (val == 0)
				val = 1;
			var height;
			if (main.canvasID == "large-logo")
			{
				height = convertPaddingToPixel(val / 20) * 2;
			}
			else 
			{
				height = convertPaddingToPixel(val / 20);
			}
			img.scaleToHeight(height);
			// img.set('scaleY', height / img.height);
			main.canvas.requestRenderAll();
			var width = convertWidthToCenti(img.getScaledWidth());
			tmp_scaleY = img.scaleY;
			if (main.canvasID == "large-logo")
			{
				$("#width-picker1").roundSlider("option", "value", parseInt(width * 2.5));
				evt.stopPropagation();
				evt.preventDefault();
			}
		});
	});
}

main.remove 	= function(mode)
{
	var obj = main.canvas.getObjects();
	for ( var i = obj.length - 1; i >= 0; i -- )
	{
		if (obj[i].mode == mode)
			main.canvas.remove(obj[i]);
	}
}

main.resizePolygon 	= function(mode)
{
	var obj = main.canvas.getObjects();
	for ( var i = obj.length - 1; i >= 0; i -- )
	{
		if (obj[i].mode == mode)
		{
			obj[i].set({
				points:[
				{x: 0, y: 0},
				{x: 0, y: main.canvHeight},
				{x: main.canvWidth, y: main.canvHeight},
				{x: main.canvWidth, y: 0}
				]
			})
			main.canvas.renderAll();
		}
	}
}

main.clearCanvas = function()
{
	main.canvas.clear();
	main.canvas.backgroundColor = '#fff';
	main.canvas.renderAll();
}

main.init();
};
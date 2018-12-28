//***************************************************************************************//
//
//	FabricJS Object Drawing file
//
//***************************************************************************************//

var generate 		= function(parent, mask, ID)
{
	var main 		= this;

	main.canvasID 	= ID;
	main.canvWidth	= 415;
	main.canvHeight	= 500;
	main.canvas 	= null;

	main.template	= null;
	main.arrSection = [];	
	main.arrIndex 	= 0;
	main.prevScale	= 1;
	main.mask_url 	= mask;

	main.orgHeight  = 0;

	main.init 		= function()
	{
		main.canvasCSS();
		main.initFabric();
		main.initEvent();
	}

	main.canvasCSS	= function(width, height)
	{
		// main.canvWidth  = $("#" + main.canvasID).width();
		// main.canvHeight = $("#" + main.canvasID).height();

		if(width)
			main.canvWidth = width;

		if(height)
			main.canvHeight = height;

		$("#" + main.canvasID).attr("width",main.canvWidth);
		$("#" + main.canvasID).attr("height",main.canvHeight);

		if(main.canvas)
		{
			main.canvas.renderAll();
			main.canvas.calcOffset();
		}
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
				left 	: -50,
				top 	: top,
				scaleX  : scale,
				scaleY  : scale,
				objectCaching: false,
			});
		}

		image.src = main.mask_url;
	}

	main.initFabric	= function()
	{
		main.canvas = new fabric.Canvas(main.canvasID);
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
		var orgHeight = main.canvas.getHeight();
		var obj = main.canvas.getObjects();

		var scale = Math.max(height / main.orgHeight, 1);
		main.canvas.setHeight(height);

		for (var i in obj)
		{
			if (obj[i].mode == "backimage")
				obj[i].set({scaleY: scale});
		}

		main.canvas.renderAll();
	}

	main.addImage 	= function(param, callback, scaleCheck)
	{
		// if(main.pattern)
		// 	main.canvas.remove(main.pattern);

		main.canvas.backgroundColor = null;
		var imgObj = fabric.Image.fromURL(param.src, function(img)
		{
			var scale 	= Math.min(main.canvWidth / img.width, main.canvHeight / param.height);
			var width 	= param.width?param.width : img.width;
			var height  = param.height?param.height : img.height;
			var select 	= param.selectable;

			var scaleX = 500 / img.width;
			var scaleY = Math.min(50 / img.height, 1);
			main.orgHeight = img.height;

			if (param.scaleCheck)
			{
				scaleX = 1;
				scaleY = 1;
			}
			var object 	= img.set(
			{
				width 	: 415,
				height 	: height,
				selectable : true,
				angle 	: param.angle,
				scaleX 	: 1,
				scaleY  : 1,
				left 	: 50,
				lockMovementX: true,
				lockMovementY: true,
				lockScalingX: true,
				lockScalingY: true,
				rx 		: height / 2,
				ry 		: height / 2,
				mode: "backimage",
				clipTo: roundedCorners.bind(img)
			});

			main.pattern = object;
			main.canvas.add(object);

			// if(param.isFront)
			object.bringToFront();

			if(callback)
				callback(img.width, img.height);

			main.canvas.renderAll();
		});
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

	main.remove 	= function(mode)
	{
		var obj = main.canvas.getObjects();
		for ( var i = obj.length - 1; i >= 0; i -- )
		{
			if (obj[i].mode == mode)
				main.canvas.remove(obj[i]);
		}
	}

	function roundedCorners(ctx) 
	{
		var rect = new fabric.Rect(
		{
		    left:0,
		    top:0,
		    rx:20 / this.scaleX,
		    ry:20 / this.scaleY,
		    width:this.width,
		    height:this.height,
		    fill:'#000000'
		});
		rect._render(ctx, false);
	}

	main.init();
};
/*
 * Pixastic Lib - Blur Fast - v0.1.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * License: [http://www.pixastic.com/lib/license.txt]
 */

var blurfast = {
	process : function(params) {

		var amount = parseFloat(params.options.amount)||0;
		var clear = !!(params.options.clear && params.options.clear != "false");

		//amount = Math.max(0,Math.min(5,amount));
	
		var rect = params.options.rect;

		var ctx = params.canvas.getContext("2d");
		ctx.save();
		ctx.beginPath();
		ctx.rect(rect.left, rect.top, rect.width, rect.height);
		ctx.clip();

		var scale = 2;
		var smallWidth = Math.round(params.width / scale);
		var smallHeight = Math.round(params.height / scale);

		var copy = document.createElement("canvas");
		copy.width = smallWidth;
		copy.height = smallHeight;

		var clear = false;
		var steps = Math.round(amount * 20);

		var copyCtx = copy.getContext("2d");
		for (var i=0;i<steps;i++) {
			var scaledWidth = Math.max(1,Math.round(smallWidth - i));
			var scaledHeight = Math.max(1,Math.round(smallHeight - i));

			copyCtx.clearRect(0,0,smallWidth,smallHeight);

			copyCtx.drawImage(
				params.canvas,
				0,0,params.width,params.height,
				0,0,scaledWidth,scaledHeight
			);

			if (clear)
				ctx.clearRect(rect.left,rect.top,rect.width,rect.height);

			ctx.drawImage(
				copy,
				0,0,scaledWidth,scaledHeight,
				0,0,params.width,params.height
			);
		}

		ctx.restore();

		params.useData = false;
		return true;
	}
}


var prepareData = function(params, getCopy) {
	var ctx = params.canvas.getContext("2d");
	var rect = params.options.rect;
	var dataDesc = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
	var data = data;
	if (!getCopy) params.canvasData = dataDesc;
	return data;
};

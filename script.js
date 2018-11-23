$(function(){
	
	
	converter =   {
			pixels: $('.pixels'),
			space: 0,
			size: 1,
    	alpha: 'yes',
    	roundness: 0,
      toHex: function(num){
        var h = Math.round(num).toString(16);
    return h.length==0? '00': h.length==1? '0'+h : h;
      },
			run: function(){
				var img = new Image();
	    		img.src = this.image;
	    		var canvas = $('<canvas>')[0];
	    		var context = canvas.getContext('2d');
	    		context.drawImage(img, 0, 0);

	    		var shadow = [];
	    		for ( var i = 0; i < img.width; i++) {
	    			for ( var j = 0; j < img.height; j++) {
	    				var data = context.getImageData(i, j, 1, 1).data;
	    				var alpha = data[3]/255;
	    				alpha = Math.round(alpha*100)/100;
	    				var x = i+i*this.space;
	    				var y = j+j*this.space;
              if(this.alpha=='yes'){
	    					shadow.push( x+'px '+y+'px rgba('+data[0]+','+data[1]+','+data[2]+','+alpha+')' );
              }else{
                shadow.push( x+'px '+y+'px #'+this.toHex(data[0])+''+this.toHex(data[1])+''+this.toHex(data[2]) );
              }
	    			}
	    		}
	    		shadow = shadow.join(',');
	    		
	    		this.pixels	
            		.css('border-radius',this.roundness+'px')
            		.css('width',this.size)
	    					.css('height',this.size)
	    					.css('box-shadow', shadow);
	    		$('.css textarea').val('.pixels{\n\
	border-radius: '+this.roundness+';\n\
	display: inline-block;\n\
	width: '+this.size+'px;\n\
	height: '+this.size+'px;\n\
	box-shadow: '+shadow+';\n\
}');
	    		return false;
			}
	};
	
	setTimeout(function(){converter.run()}, 200);
	
	$('#upload').change(function(evt) {
		var files = evt.target.files;
		var f = files[0];
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
				converter.image = e.target.result;
				converter.run();
			};
		})(f);
	    reader.readAsDataURL(f);
	});
	$('#space').change(function(){converter.space = $(this).val();});
	$('#size').change(function(){converter.size = $(this).val();});
	$('#roundness').change(function(){converter.roundness = $(this).val();});
  $('#alpha').change(function(){converter.alpha = $(this).val();});
	$('#convert').click(function(){converter.run()});
});
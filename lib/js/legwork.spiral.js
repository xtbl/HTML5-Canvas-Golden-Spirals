/****************************************************
 * Copyright © Legwork Studio. All Rights Reserved. *
 * Updated by: Matt Wiggins, 13-Apr-2011            *
 *                                                  *
 * Now let's get serious.                           *
 ****************************************************
/                                                  */

var Legwork = Legwork || {};

(function($) {
  var $self = this;
  
  $self.Spiral = (function() {
    
    // public interface
    var public = {};
    
    // class vars
    var cnv,
        ctx,
        frame = 0,
        i = 0,
        
        // spiral math (r = ae ^ bt), hey thanks Wikipedia!
        phi = (1 + Math.sqrt(5)) / 2,		// PHI
        b = Math.log(phi) / (Math.PI / 2),	// logaritmic rate of growth, based on PHI (special b)
        e = Math.E,							// Euler's number
        t = _convertToRadians(0);			// Theta
  
    /****************************************************
     * init:void                                        *
     *                                                  *
     * Not much to say here, how's the weather?         *
     ****************************************************
    /                                                  */
    public.init = function() {
      if(Modernizr.canvas) _initCanvas();
    }
    
    /****************************************************
     * _initCanvas:void                                 *
     *                                                  *
     * Initialize the canvas.                           *
     ****************************************************
    /                                                  */
    function _initCanvas() {
      cnv = document.createElement('canvas');
      cnv.id = 'background_canvas';
      cnv.width = '1000';
      cnv.height = '600';
      
      $(cnv).css({
        'position':'absolute',
        'top':'0px',
        'left':'50%',
        'margin-left':'-500px'
      })
      .appendTo('#spirals');
      
      ctx = cnv.getContext('2d');
      ctx.translate(cnv.width / 2, cnv.height / 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      
      frame = setInterval(_spiral, 33); // 33 = 1000/30 (30 FPS)
    }
    
    /****************************************************
     * _spiral:void                                     *
     *                                                  *
     * Let's get rad with PHI.                          *
     ****************************************************
    /                                                  */
    function _spiral() {
      var x = (Math.pow(e, b*t) * Math.cos(t)),
          y = (Math.pow(e, b*t) * Math.sin(t));
      
      ctx.clearRect(-(cnv.width / 2), -(cnv.height / 2), cnv.width, cnv.height);
      ctx.lineTo(x, y);
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      t += _convertToRadians(5); // theta + 5 degrees
      
      if(t >= _convertToRadians(900)) {
        if(i > 5) clearInterval(frame);
        i += 1;
        t = _convertToRadians(0); // reset theta
        ctx.moveTo(0, 0);
        ctx.rotate(_convertToRadians(72));
      } 
    }
    
    /****************************************************
     * _convertToRadians:number                         *
     *                                                  *
     * Convert degrees to radians.                      *
     ****************************************************
    /                                                  */
    function _convertToRadians(degree) {
        return degree*(Math.PI/180);
    }
    
    return public;
  })();
  
  $self.Construct = (function() {
    $(document).ready(Legwork.Spiral.init());
  })();
}).call(Legwork, jQuery);
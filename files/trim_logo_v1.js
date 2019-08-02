      


    function svg_insert_rectangle(x,y,width,height, fillStyle) {
    var svgns = 'http://www.w3.org/2000/svg';
    var rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'x', x);
      rect.setAttributeNS(null, 'y', y);
      rect.setAttributeNS(null, 'height', height);
      rect.setAttributeNS(null, 'width', width);
      rect.setAttributeNS(null, 'fill', fillStyle);
    document.getElementById('svg_canvas').appendChild(rect);
  }



var shape_echoes=0;
var scale = 5;
var line_thickness = 1.65;

      for (var ii = 0; ii < 24; ii += line_thickness) {

        var fillStyle;
        shape_echoes++;
        if (shape_echoes % 2 === 0) {
          fillStyle = '#000';
        } else {
          fillStyle = '#fff';
        }

        // t vertical
        var x = (47+ii)*scale,
            y = (0+ii)*scale,
            width = (47-ii*2)*scale,
            height = ((47+3)*3+47-ii*2-16)*scale;
        svg_insert_rectangle(x,y,width,height, fillStyle);

        // t horizontal
        x = (0 + ii)*scale,
            y = (47+3 + ii)*scale,
            width = ((47*2) - ii*2)*scale,
            height = (47 - ii*2)*scale;
        svg_insert_rectangle(x,y,width,height, fillStyle);

        // r vertical
        x = ((47+3)*2+ii)*scale,
          y = (47+3+ii)*scale,
          width = (47 - ii*2)*scale,
          height = ((47+3)*2+47-ii*2 - 16)*scale;
        svg_insert_rectangle(x,y,width,height, fillStyle);

        // r horizontal
          x = ((47+3)*2+ii)*scale,
            y = (47+3+ii)*scale,
            width = (47*2+3 - ii*2)*scale,
            height = (47-ii*2)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // i dot
          x = ((47 + 3)*3 + ii)*scale,
            y = (0 + ii)*scale,
            width = (47 - ii*2)*scale,
            height = (47-ii*2)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // i vertical bottom
          x = ((47 + 3)*3 + ii)*scale,
            y = ((47+3)*2 + ii)*scale,
            width = (47 - ii*2)*scale,
            height = ((47*2+3)-ii*2 -16)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // m
        // left vertical
          x = ((47+3)*4+ii)*scale,
            y = (47+3+ii)*scale,
            width = (47 - ii*2)*scale,
            height = ((47+3)*2+47-ii*2 -16)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // middle vertical
          x = ((47+3)*5+ii)*scale,
            y = (47+3+ii)*scale,
            width = (47 - ii*2)*scale,
            height = ((47+3)*2+47-ii*2 -16)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // right vertical
          x = ((47+3)*6+ii)*scale,
            y = (47+3+ii)*scale,
            width = (47 - ii*2)*scale,
            height = ((47+3)*2+47-ii*2 -16)*scale
          svg_insert_rectangle(x,y,width,height, fillStyle);

        // horizontal
          x = ((47+3)*4+ii)*scale,
            y = (47+3+ii)*scale,
            width = ((47)*3+3*2 - ii*2)*scale,
            height = (47-ii*2)*scale;
          svg_insert_rectangle(x,y,width,height, fillStyle);
        ////////////////////

      }

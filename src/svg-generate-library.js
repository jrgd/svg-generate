/*

# SVG GENERATE LIBRARY 
# -> The Functions

## SVG
  - svg_insert_rectangle
    will insert a rectangle at a x,y position with width and height dimensions and fillStyle
## Interface
  - get_slider_value
## Conversions
  - number_to_hex
    converts a range from DEC 0-255 into HEX 00-FF
  - calculate_gradients
    given a start and end colours, a total number of steps and the current step, returnzs the intermediary colour in rgb format

*/


function svg_insert_rectangle(x,y,width,height, fillStyle) {
  var svgns = 'http://www.w3.org/2000/svg';
  var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', Math.floor(x));
    rect.setAttributeNS(null, 'y', Math.floor(y));
    rect.setAttributeNS(null, 'height', Math.floor(height));
    rect.setAttributeNS(null, 'width', Math.floor(width));
    rect.setAttributeNS(null, 'fill', fillStyle);
  document.getElementById('svg_canvas').appendChild(rect);
}

function get_slider_value(label, id, min_value, max_value) {
  // check if ele ID exists
  if  ( $('#'+id).length > 0) {
    // exists
    var slided_value = $('#'+id).val();
    $('#'+id+'_output').val(slided_value);
    return parseInt(slided_value);
  } else {
    // doesnt exist, so we create it
    var new_slider_container = $('<div>')
      .attr({
        'class': 'slider_container'
      })
    var new_slider_label = $('<label>')
      .attr({
        'for':id
      })
      .text( label );
    var new_slider = $('<input>')
      .attr({
        'type':'range',
        'min': min_value,
        'max': max_value,
        'id': id,
        'class': 'slider'
      })
      .val(min_value)
      .on('change', function(){
        // update display of the value
        var display_element_name = '#'+$(this).attr('id')+'_output';
        $( display_element_name ).val( $(this).val() );
        // trigger the RUN
        generate_svg();
      });
    var new_slider_display = $('<input>')
      .attr({
        'id': id+'_output',
        'readonly': 1
      })
      .val(min_value);
    
    new_slider_container.append( new_slider_label );
    new_slider_container.append( new_slider );
    new_slider_container.append( new_slider_display );
    $('#controls').append( new_slider_container );

    var slided_value = $('#'+id).val();
    return parseInt(slided_value);
  }
}

function number_to_hex(decimal, padding=2) {
  var hex = Number(decimal).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
  while (hex.length < padding) { // HEX padding to get a 00 instead of just 0
    hex = "0" + hex;
  }
  return hex;
}

function calculate_gradient(start_col, end_col, total_steps, current_step) {
  var gradient_progress = current_step / total_steps;
  var gradient_progress_invert = 1 - gradient_progress;
  var red = Math.floor(Math.abs((end_col.red * gradient_progress) + (start_col.red * gradient_progress_invert )));
  var green = Math.floor(Math.abs((end_col.green * gradient_progress) + (start_col.green * gradient_progress_invert )));
  var blue = Math.floor(Math.abs((end_col.blue * gradient_progress) + (start_col.blue * gradient_progress_invert )));

  return {red:red, blue:blue, green:green};
}
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

    // regenerate the interface
    // $('#controls').empty();
    // get_slider_value(label, id, min_value, max_value);

    return parseInt(slided_value);
  } else {
    // doesnt exist
    // we create it
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
        // trigger thre RUN
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
  while (hex.length < padding) {
    hex = "0" + hex;
  }
  return hex;
}

function calculate_gradient(start_col, end_col, total_steps, current_step) {

  var gradient_progress = current_step / total_steps;
  var gradient_progress_invert = 1 - gradient_progress;

  console.log(gradient_progress);

  var red = Math.floor(Math.abs((end_col.red * gradient_progress) + (start_col.red * gradient_progress_invert )));
  var green = Math.floor(Math.abs((end_col.green * gradient_progress) + (start_col.green * gradient_progress_invert )));
  var blue = Math.floor(Math.abs((end_col.blue * gradient_progress) + (start_col.blue * gradient_progress_invert )));

  return {red:red, blue:blue, green:green};
}
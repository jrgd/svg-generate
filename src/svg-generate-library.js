/*

# SVG GENERATE LIBRARY 
# -> The Functions

## SVG
  - svg_insert_rectangle
    will insert a rectangle at a x,y position with width and height dimensions and fillStyle
  - generate_svg
  - clear_screen
## Interface
  - get_slider_value
  - saveFile_code_temp
    in node-webkit, saves the code on each keyup
  - saveFile
  - loadFile
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
function generate_svg() {
  $('button[role=clear_svg]').trigger('click');
  var code = $('textarea[role=code]').val();

  eval(code);
}
function clear_screen() {
  $('#svg_canvas').empty();
  // $('#controls').empty();
}


function get_slider_value(label, id, min_value, max_value, default_value = undefined) {

  if (default_value === undefined) {
    default_value = min_value;
  }
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
      .val(default_value)
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
function saveFile_code_temp() {
  // ideally we should check if something is in the ghost-input, if there is nothing, it's a new file and we need to input the filename
  var fs = nw.require('fs');
  var path = "_temp.js"; //+$(name).val();//$(name).val();
  // alert(path);
  var code = $('textarea[role=code]').val();
  fs.writeFileSync(path, code);
}
function saveFile(name) {
  // ideally we should check if something is in the ghost-input, if there is nothing, it's a new file and we need to input the filename
  var fs = nw.require('fs');
  var path = $(name).val();
  var code = $('textarea[role=code]').val();
  fs.writeFileSync(path, code);
}
function loadFile(name) {
    var chooser = $(name);
    chooser.unbind('change');
    chooser.change(function(evt) {

      // Read file with Node.js API
      var fs = nw.require('fs');
      var path = $(this).val();
      fs.readFile(path, 'utf8', function(err, txt) {
        if (err) {
          console.error(err);
          return;
        }

        $('textarea[role=code]').val( txt );
      });
    });

    chooser.trigger('click');  
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
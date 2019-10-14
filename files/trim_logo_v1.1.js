var shape_echoes=0;
var scale = 1;
var line_thickness = 5;
var iterations_qu = 53;
var gap = 8;
var base_unit = iterations_qu * 2 + gap; // 53px for 25 iter.

var shape_echoes=0;
var scale = get_slider_value('Scale', 'scale', 1, 20);
var line_thickness = get_slider_value('Line thickness', 'line_thickness', 1, 20, 5);
var iterations_qu = get_slider_value('Iterations', 'iterations_qu', 1, 100, 53);
var gap = get_slider_value('Ga', 'gap', 1, 20);
var base_unit = scale * (gap + iterations_qu * line_thickness); // 53px for 25 iter.

// T vertical
var a_height = base_unit * 137/53;
// T horizontal
var b_width  = base_unit * 45/53;
// R vertical
var c_height = base_unit * 84/53;


for (var ii = iterations_qu; ii > 0; ii -= line_thickness) {

  // alternate colours
        shape_echoes++;
        if (shape_echoes % 2 === 0) {
          fillStyle = '#000';
        } else {
          fillStyle = '#fff';
        }


  // T 
  // T vertical
    svg_insert_rectangle(
      200+ b_width - ii*line_thickness, 200+0 - ii*line_thickness,
      0 + ii*2*line_thickness, a_height + ii*2*line_thickness,
      fillStyle);
  // T horizontal
    svg_insert_rectangle(
      200+0 - ii*line_thickness, 200+base_unit - ii*line_thickness,
      b_width + ii*2*line_thickness, 0 + ii*2*line_thickness,
      fillStyle);
  // R
  // R vertical
    svg_insert_rectangle(
      200+ b_width + iterations_qu*2+ gap - ii*line_thickness, 200 + base_unit - ii*line_thickness,
      0 + ii*2*line_thickness, c_height + ii*2*line_thickness,
      fillStyle);
  // R horizontal
    svg_insert_rectangle(
      200+ b_width + iterations_qu*2+ gap - ii*line_thickness, 200+base_unit - ii*line_thickness,
      base_unit + ii*2*line_thickness, 0 + ii*2*line_thickness,
      fillStyle);
  // I vertical
    svg_insert_rectangle(
      200+ b_width + iterations_qu*2+gap - ii*line_thickness + base_unit, 200 + base_unit - ii*line_thickness + gap + base_unit,
      0 + ii*2*line_thickness, c_height - gap - base_unit + ii*2*line_thickness,
      fillStyle);

  // I dot
    svg_insert_rectangle(
      200+ b_width + iterations_qu*2+gap - ii*line_thickness + base_unit, 200+0 - ii*line_thickness,
      0 + ii*2*line_thickness, 0 + ii*2*line_thickness,
      fillStyle);


  // M vertical 1
    svg_insert_rectangle(
      200+ b_width + iterations_qu*6+ gap*2 - ii*line_thickness, 200 + base_unit - ii*line_thickness,
      0 + ii*2*line_thickness, c_height + ii*2*line_thickness,
      fillStyle);

  // M vertical 2
    svg_insert_rectangle(
      200+ b_width + iterations_qu*8+ gap*3 - ii*line_thickness, 200 + base_unit - ii*line_thickness,
      0 + ii*2*line_thickness, c_height + ii*2*line_thickness,
      fillStyle);

  // M vertical 2
    svg_insert_rectangle(
      200+ b_width + iterations_qu*10+ gap*4 - ii*line_thickness, 200 + base_unit - ii*line_thickness,
      0 + ii*2*line_thickness, c_height + ii*2*line_thickness,
      fillStyle);

 // M horizontal
    svg_insert_rectangle(
      200+ b_width + iterations_qu*6+ gap*2 - ii*line_thickness, 200 + base_unit - ii*line_thickness,
      base_unit*2 + ii*2*line_thickness, 0 + ii*2*line_thickness,
      fillStyle);
}


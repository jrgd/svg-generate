
var shape_echoes=0;
var scale = get_slider_value('Scale', 'scale', 1, 20);
var line_thickness = get_slider_value('Line thickness', 'line_thickness', 1, 20, 5);
var iterations_qu = get_slider_value('Iterations', 'iterations_qu', 1, 100, 53);
var gap = get_slider_value('Ga', 'gap', 1, 20);
var base_unit = scale * (gap + iterations_qu * line_thickness); // 53px for 25 iter.

// Origins
var x_origin = get_slider_value('X Origin', 'x_origin', 1, 600, 200);
var y_origin = get_slider_value('Y Origin', 'y_origin', 1, 600, 200);

// T vertical
var a_height = base_unit * 137/53;
// T horizontal
var b_width  = base_unit * 45/53;
var b_height  = base_unit * 45/53;
// R vertical
var c_height = base_unit * 84/53;
var d_height = base_unit * 33/53;


var y_top = y_origin;
var y_bottom = y_origin + a_height;
var y_med = y_bottom - c_height
var y_med_low =  y_bottom - d_height

// I vertical
var e_height = base_unit * 33/53;

for (var ii = base_unit; ii > 0; ii -= line_thickness*scale) {
  var width, 
      height,
      x,
      y;

  // alternate colours
        shape_echoes++;
        if (shape_echoes % 2 === 0) {
          fillStyle = '#f00';
        } else {
          fillStyle = '#00f';
        }

  // T 
  x = x_origin + base_unit - ii;
  y = y_med - ii;
  // T horizontal
  width = base_unit * 45/52 + ii*2;
  height = ii *2;
  svg_insert_rectangle(x,y,width,height, fillStyle);
  // T vertical
  x = x_origin + base_unit + b_width - ii;
  y = y_top - ii;
  width = ii*2;
  height = a_height + ii*2;
  svg_insert_rectangle(x,y,width,height, fillStyle);

  // R
  // R vertical
  x = x_origin + base_unit*3 - ii;
  y = y_med - ii;
  width = ii * 2;
  height = c_height + ii*2;
  svg_insert_rectangle(x,y,width,height, fillStyle);

  // R horizontal
  x = x_origin + base_unit*3 - ii;
  y = y_med - ii;
  width = base_unit + ii * 2;
  height = ii * 2;
  svg_insert_rectangle(x,y,width,height, fillStyle);

  // I
  // I vertical
  x = x_origin + base_unit*5 - ii - base_unit;
  y = y_med_low - ii;
  width = ii * 2;
  height = e_height + ii*2;
  svg_insert_rectangle(x,y,width,height, fillStyle);
  // I dot
  // x
  y = y_top - ii
  width = ii *2;
  height = ii *2;
  svg_insert_rectangle(x,y,width,height, fillStyle);

  // M
  // M horizontal
x = x_origin + base_unit*5 - ii;
y = y_med - ii;
width = base_unit * 2 + ii * 2;
height = ii * 2;
svg_insert_rectangle(x,y,width,height, fillStyle);

  // M vertical 1
x = x_origin + base_unit*5 - ii;
y = y_med - ii;
width = ii * 2;
height = c_height + ii * 2;
svg_insert_rectangle(x,y,width,height, fillStyle);

  // M vertical 2
x = x_origin + base_unit*6 - ii;
y = y_med - ii;
width = ii * 2;
height = c_height + ii * 2;
svg_insert_rectangle(x,y,width,height, fillStyle);

  // M vertical 3
x = x_origin + base_unit*7 - ii;
y = y_med - ii;
width = ii * 2;
height = c_height + ii * 2;
svg_insert_rectangle(x,y,width,height, fillStyle);


}

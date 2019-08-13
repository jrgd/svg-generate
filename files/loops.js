
var width =   get_slider_value('element width','width', 0, 200);
var height =  get_slider_value('element height', 'height', 0, 200);

var start_red = get_slider_value('start red', 'start_red', 0, 255);
var start_green = get_slider_value('start  green', 'start_green', 0, 255);
var start_blue = get_slider_value('start  blue', 'start_blue', 0, 255);

var end_red = get_slider_value('end red', 'end_red', 0, 255);
var end_green = get_slider_value('end  green', 'end_green', 0, 255);
var end_blue = get_slider_value('end  blue', 'end_blue', 0, 255);


var quantity_x = get_slider_value('x quantity', 'x_quantity', 0, 20);
var quantity_y = get_slider_value('y quantity', 'y_quantity', 0, 20);
var gap = get_slider_value('gap', 'gap', 0, 20);

start_col = {red: start_red, blue:start_blue, green:start_green};
end_col = {red: end_red, blue: end_blue, green: end_green};


for( var repeat_x = 0; repeat_x < quantity_x; repeat_x++) {
  for( var repeat_y = 0; repeat_y < quantity_y; repeat_y++) {
    var total_steps = quantity_x * quantity_y;
    var current_step = repeat_x * repeat_y;
    var gradient = calculate_gradient(start_col,end_col,total_steps,current_step);
console.log(gradient);
    var colour = '#'+number_to_hex(gradient.red) +number_to_hex(gradient.green) + number_to_hex(gradient.blue);
    svg_insert_rectangle( (width+gap)*repeat_x, (height+gap)*repeat_y, width, height, colour);
  }
}

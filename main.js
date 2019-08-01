$(document).ready(function(){
  
  $('div.grid')
  .on('click', function(e){

    click_pos_x = e.pageX - $(this).offset().left;
    click_pos_y = e.pageY - $(this).offset().top;
    console.log(click_pos_x, click_pos_y);
  })
  // .on('mousemove', function(){
  // })

  $('button[role=generate]').on('click', function(){
    var code = $('textarea[role=code]').val();
    console.log(code);
    eval(code);
  });

  $('button[role=clear_svg]').on('click', function(){
    $('#svg_canvas').empty();
  });

})
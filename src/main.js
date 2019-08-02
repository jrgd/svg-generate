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


      

  $('button[role=load]').on('click', function(){
    loadFile('#fileDialog');
  });
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

  $('button[role=save]').on('click', function(){
    saveFile('#fileDialog');
  });
  function saveFile(name) {
    // ideally we should check if something is in the ghost-input, if there is nothing, it's a new file and we need to input the filename
    var fs = nw.require('fs');
    var path = $(name).val();
    var code = $('textarea[role=code]').val();
    fs.writeFileSync(path, code);
  }
})
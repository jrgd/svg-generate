$(document).ready(function(){
  
  $('div.grid')
  .on('click', function(e){

    click_pos_x = e.pageX - $(this).offset().left;
    click_pos_y = e.pageY - $(this).offset().top;
    console.log(click_pos_x, click_pos_y);
  })
  // .on('mousemove', function(){
  // })

  $('textarea[role=code]').on('keyup', function(){
    $('button[role=generate]').trigger('click');
  });

  $('button[role=generate]').on('click', function(){
    generate_svg();
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

  $('button[role=save_svg]').on('click', function(){
    saveFile('#fileDialog');
  });
  function saveFile(name) {
    // ideally we should check if something is in the ghost-input, if there is nothing, it's a new file and we need to input the filename
    var fs = nw.require('fs');
    var path = $(name).val();
    var code = $('textarea[role=code]').val();
    fs.writeFileSync(path, code);
  }

  $('button[role=save_svg]').on('click', function(){
    // $('#svg_canvas')
    var content =  $('#svg_container').html();
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "generated.svg");
  });
})


// ACTIONS
function generate_svg() {
  $('button[role=clear_svg]').trigger('click');
  var code = $('textarea[role=code]').val();
  eval(code);
}

// Limted Eval in time
// http://cwestblog.com/2016/03/16/javascript-detecting-infinite-loops/
// avoiding infinte loop or operation that would take too long
function limitEval(code, fnOnStop, opt_timeoutInMS) {
  var id = Math.random() + 1,
    blob = new Blob(
      ['onmessage=function(a){a=a.data;postMessage({i:a.i+1});postMessage({r:eval.call(this,a.c),i:a.i})};'],
      { type:'text/javascript' }
    ),
    myWorker = new Worker(URL.createObjectURL(blob));

  function onDone() {
    URL.revokeObjectURL(blob);
    fnOnStop.apply(this, arguments);
  }

  myWorker.onmessage = function (data) {
    data = data.data;
    if (data) {
      if (data.i === id) {
        id = 0;
        onDone(true, data.r);
      }
      else if (data.i === id + 1) {
        setTimeout(function() {
          if (id) {
            myWorker.terminate();
            onDone(false);
          }
        }, opt_timeoutInMS || 1000);
      }
    }
  };

  myWorker.postMessage({ c: code, i: id });
}
$(document).ready(function(){
  
  $('div.grid')
  .on('click', function(e){

    click_pos_x = e.pageX - $(this).offset().left;
    click_pos_y = e.pageY - $(this).offset().top;
    console.log(click_pos_x, click_pos_y);
  })

  $('textarea[role=code]').on('keyup', function(){
    $('#controls').empty();
    $('button[role=generate]').trigger('click');
    saveFile_code_temp();
  });

  $('button[role=generate]').on('click', function(){
    clear_screen();
    generate_svg();
  });

  $('button[role=clear_svg]').on('click', function(){
    clear_screen(); 
  });

  $('button[role=load]').on('click', function(){
    loadFile('#fileDialog');
  });


  $('button[role=save_svg]').on('click', function(){
    saveFile('#fileDialog');
  });

  $('button[role=save_svg]').on('click', function(){
    // $('#svg_canvas')
    var content =  $('#svg_container').html();
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "generated.svg");
  });
})

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
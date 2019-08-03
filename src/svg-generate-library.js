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
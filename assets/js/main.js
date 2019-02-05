var capture = document.querySelector('#capture');
var fileName = capture.innerHTML.trim().replace(/\s+/g, '-').toLowerCase();
var button = document.querySelector('#btn-download');

html2canvas(capture).then(canvas => {

  document.body.appendChild(canvas);

  button.setAttribute('download', fileName + '.png');

  button.addEventListener('click', function(e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  });

});

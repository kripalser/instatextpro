/*var ingredients = {
 "ingredients": [
 {
 "name": "Сельдь",
 "amount": 1,
 "measure": "штука"
 }, {
 "name": "Сливочное масло",
 "amount": 200,
 "measure": "г"
 }, {
 "name": "Яйцо",
 "amount": 2,
 "measure": "штуки"
 }, {
 "name": "Укроп",
 "amount": 30,
 "measure": "г"
 }
 ]
 };*/

$(function () {

  var itp = {};

  itp.document = {

    _target: '.container'

  };

  /*itp.data = {

   _ingredients: '<ol><li>Сельдь</li><li>Сливочное масло</li><li>Яйцо</li><li>Укроп</li></ol>',
   _steps: [
   '1. Яйцо отварить, почистить. Размять вилкой.',
   '2. Добавить к яйцу размягченное сливочное масло, сельдь рубленную, лук репчатый и горчицу (последняя по желанию).',
   '3. Провернуть все ингредиенты в блендере вместе с укропом — до кремообразного состояния.',
   '4. Приятного аппетита!'
   ]

   };*/

  itp.slide = {

    _current: 1,
    _class: 'slide',
    _data: [],

    generate: function () {

      var html = '<div class="' + itp.slide._class + '"></div>';

      $.each(itp.slide._data, function (index, value) {

        $(itp.document._target).append($(html).append(value).attr('id', 'slide' + (index + 1)));

        if ((index + 1) === itp.slide._data.length) {
          // console.log('Done!');
          itp.image.generate();
        }

      });

    }

  };

  itp.image = {

    generate: function () {

      var element = itp.slide._class + itp.slide._current;
      var elementId = '#' + element;
      var $element = $(elementId)[0];

      html2canvas($element, {

        onclone: function (clonedDocument) {
          $(clonedDocument).find(elementId).css('display', 'flex');
        }

      }).then(function (canvas) {

        var img = new Image();
        // var imgSrc = canvas.toDataURL();
        // img.src = imgSrc;
        img.src = canvas.toDataURL();
        img.className = 'slide-img';
        /*var link = document.createElement('a');
         link.appendChild(img);
         link.href = imgSrc;
         link.setAttribute('download', element + '.png');
         $('.container').append($(link));*/
        $('.container').append($(img));

        if (itp.slide._current < itp.slide._data.length) {
          itp.slide._current++;
          itp.image.generate();
        }

      });

    }

  };

  itp.init = function () {

    itp.slide._data.push('<ol><li>Сельдь</li><li>Сливочное масло</li><li>Яйцо</li><li>Укроп</li></ol>');
    itp.slide._data.push('1. Яйцо отварить, почистить. Размять вилкой.');
    itp.slide._data.push('2. Добавить к яйцу размягченное сливочное масло, сельдь рубленную, лук репчатый и горчицу (последняя по желанию).');
    itp.slide._data.push('3. Провернуть все ингредиенты в блендере вместе с укропом — до кремообразного состояния.');
    itp.slide._data.push('4. Приятного аппетита!');

    itp.slide.generate();

  };

  itp.init();

});
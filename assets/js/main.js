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
    _data: [], // Todo: store data as an object

    generate: function (bookSlide) {

      var html = '<div class="' + itp.slide._class + '"></div>';

      if (bookSlide) {

        var bookTitleRu   = itp.slide._data[0],
            bookAuthorRu  = itp.slide._data[1],
            bookTitleEn   = '',
            bookAuthorEn  = '',
            bookYear      = '';

        if (itp.slide._data[2] !== undefined && itp.slide._data[3] !== undefined) {
          bookTitleEn   = itp.slide._data[2];
          bookAuthorEn  = itp.slide._data[3];
          bookYear  = itp.slide._data[4];
        } else {
          bookYear  = itp.slide._data[2];
        }

        var bookSlideContent = '<div class="book-slide-content">' +
                                 '<h1 class="book-slide-title-primary">' + bookTitleRu + '<small>' + bookAuthorRu + '</small></h1>' +
                                 '<h2 class="book-slide-title-secondary">' + bookTitleEn + '<small>' + bookAuthorEn + '</small></h2>' +
                                 '<h2 class="book-slide-year"><small>' + bookYear + '</small></h2>' +
                               '</div>';

        $(itp.document._target).append($(html).addClass('book-slide').append(bookSlideContent).attr('id', 'slide1'));

        itp.image.generate(bookSlide);

      } else {

        $.each(itp.slide._data, function (index, value) {

          $(itp.document._target).append($(html).append(value).attr('id', 'slide' + (index + 1)));

          if ((index + 1) === itp.slide._data.length) {
            // console.log('Done!');
            itp.image.generate();
          }

        });

      }

    }

  };

  itp.image = {

    generate: function (bookSlide) {

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

        if (!bookSlide && itp.slide._current < itp.slide._data.length) {
          itp.slide._current++;
          itp.image.generate();
        }

      });

    }

  };

  itp.init = function () {

    var $form = $('form');

    /*itp.slide._data.push('<ol><li>Сельдь</li><li>Сливочное масло</li><li>Яйцо</li><li>Укроп</li></ol>');
     itp.slide._data.push('1. Яйцо отварить, почистить. Размять вилкой.');
     itp.slide._data.push('2. Добавить к яйцу размягченное сливочное масло, сельдь рубленную, лук репчатый и горчицу (последняя по желанию).');
     itp.slide._data.push('3. Провернуть все ингредиенты в блендере вместе с укропом — до кремообразного состояния.');
     itp.slide._data.push('4. Приятного аппетита!');*/

    // Todo: move the function into method
    // Todo: parse ingredients and steps as separate arrays/groups/whatever?

    function showValues(bookSlide) {
      // var dataArray = $('form').serializeArray();
      // console.log(dataArray);

      var fields = $form.serializeArray();
      $form.hide();
      // $('#results').empty();

      jQuery.each(fields, function (i, field) {
        // $('#results').append(field.name + ': ' + field.value + ', ');
        // console.log(field.name + ': ' + field.value + ', ');

        if (field.value !== '') {
          itp.slide._data.push(field.value);
        }

        if (i + 1 === fields.length) {
          itp.slide.generate(bookSlide);
        }

      });

    }

    $form.on('submit', function (e) {
      e.preventDefault();
      showValues(true);
    });

    // itp.slide.generate();

  };

  itp.init();

});
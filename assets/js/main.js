$(function () {

  var itp = {};

  itp.document = {

    _target       : '.container',
    _sourceClass  : 'book-container',
    _sourceId     : 'bookContainer'

  };

  itp.slide = {

    _class: 'slide',
    _data: {},

    generate: function () {

      var $container    = $('#' + itp.document._sourceId);
      var authorsCount  = $('.author-inputs').children().length;

      $container.find('.book-author-primary').html(itp.slide._data.bookAuthorRu);
      $container.find('.book-title-primary').html(itp.slide.addNbsp(itp.slide._data.bookTitleRu));
      $container.find('.book-series-primary').html(itp.slide.addNbsp(itp.slide._data.bookSeriesRu));
      $container.find('.book-year').html(itp.slide._data.bookYear);

      for (var i = 2; i <= authorsCount; i++) {
        if (itp.slide._data['bookAuthorRu' + i]) {
          $container.find('.book-author-primary').append(',<br>' + itp.slide._data['bookAuthorRu' + i]);
        }
      }

      itp.image.generate();

    },

    addNbsp: function (text) {
      /*! Typographer - v0.1.0 - 2015-08-18
       * https://github.com/sakharstudio/typographer
       * Copyright (c) 2015 Loginov Yura; Licensed MIT */
      var prepositions = ["в", "во", "без", "до", "из", "к", "ко", "на", "по", "о", "от", "при", "с", "у", "не", "за", "над", "для", "об", "под", "про", "и", "а", "но", "да", "или", "ли", "бы", "то", "что", "как", "я", "он", "мы", "они", "ни", "же", "вы", "им"],
        nbsp = '&nbsp;',
        prepositionsOne = prepositions.map(function (item) {
          return ' ' + item + ' ';
        }),
        prepositionsTwo = prepositions.map(function (item) {
          return '&nbsp;' + item + ' ';
        }),
        regex = new RegExp(prepositionsOne.join('|'), 'gi'),
        regex2 = new RegExp(prepositionsTwo.join('|'), 'gi'),
        replacement = function (str) {
          return str.slice(0, -1) + nbsp;
        };

      return text.replace(regex, replacement).replace(regex2, replacement);
    }

  };

  itp.image = {

    generate: function () {

      var element = itp.document._sourceId;
      var elementId = '#' + element;
      var $element = $(elementId)[0];

      html2canvas($element, {

        width: 1080,
        height: 1080,
        onclone: function (clonedDocument) {
          $(clonedDocument).find(elementId).removeClass('d-none');
          // Removes extra elements and styles to prevent the canvas offset
          $(clonedDocument).find('.form-container').remove();
          $(clonedDocument).find('body').css({'padding': 0});
        }

      }).then(function (canvas) {

        var img = new Image();

        img.src = canvas.toDataURL();
        img.className = 'book-img';

        $('.container').append($(img));

      });

    }

  };

  itp.init = function () {

    var $form = $('form');

    $form.on('submit', function (e) {
      e.preventDefault();
      $form.addClass('d-none');
      $('.btn-edit').removeClass('d-none');

      var formData = $form.serializeArray();

      $(formData).each(function (index, obj) {
        itp.slide._data[obj.name] = obj.value;
      });

      itp.slide.generate();

    });

    $('.btn-edit').on('click', function (e) {
      $('.book-img').remove();
      $('form').removeClass('d-none');
      $(e.target).addClass('d-none');
    });

    $('.btn-add-author').on('click', function (e) {
      e.preventDefault();

      var $button     = $(this),
          $container  = $('.author-inputs'),
          count       = $container.children().length + 1,
          $formGroup  = $('#formGroupAuthor').clone(),
          $label      = $formGroup.find('label'),
          $input      = $formGroup.find('input'),
          $text       = $formGroup.find('.form-text');

      $button.addClass('mt-1');
      $formGroup.attr('id', $formGroup.attr('id') + count);
      $label.attr('for', $label.attr('for') + count);
      $label.html('Ещё один автор');
      $input.val('');
      $input.attr('id', $input.attr('id') + count);
      $input.attr('name', $input.attr('name') + count);
      $input.removeAttr('required');
      $text.remove();
      $formGroup.appendTo($container);
    });

    // itp.slide.generate();

  };

  itp.init();

});
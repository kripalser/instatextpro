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
      $container.find('.book-title-primary').html(itp.slide._data.bookTitleRu);
      $container.find('.book-series-primary').html(itp.slide._data.bookSeriesRu);
      // $container.find('.book-author-secondary').html(itp.slide._data.bookAuthorOrig);
      // $container.find('.book-title-secondary').html(itp.slide._data.bookTitleOrig);
      // $container.find('.book-series-secondary').html(itp.slide._data.bookSeriesOrig);
      $container.find('.book-year').html(itp.slide._data.bookYear);

      for (var i = 2; i <= authorsCount; i++) {
        if (itp.slide._data['bookAuthorRu' + i]) {
          $container.find('.book-author-primary').append(',<br>' + itp.slide._data['bookAuthorRu' + i]);
        }
      }

/*      var bookTitleRu   = itp.slide._data.bookTitleRu,
          bookAuthorRu  = itp.slide._data.bookAuthorRu,
          bookTitleOrig   = itp.slide._data.bookTitleRu,
          bookAuthorOrig  = itp.slide._data.bookTitleRu,
          bookYear      = itp.slide._data.bookTitleRu;*/

/*
      if (itp.slide._data[2] !== undefined && itp.slide._data[3] !== undefined) {
        bookTitleEn   = itp.slide._data[2];
        bookAuthorEn  = itp.slide._data[3];
        bookYear  = itp.slide._data[4];
      } else {
        bookYear  = itp.slide._data[2];
      }
*/

      /*var bookSlideContent = '<div class="book-slide-content">' +
                             '<div class="book-slide-author-primary">' + bookAuthorRu + '</div>' +
                             '<div class="book-slide-title-primary">' + bookTitleRu + '</div>' +
                             '<div class="book-slide-title-secondary">' + bookTitleEn + '</div>' +
                             '<div class="book-slide-author-secondary">' + bookAuthorEn + '</div>' +
                             '<div class="book-slide-year">' + bookYear + '</div>' +
                             '</div>'; // Todo: create a markup in HTML then clone it

      $(itp.document._target).append($(html).addClass('book-slide').append(bookSlideContent).attr('id', 'slide1'));*/

      itp.image.generate();

    }

  };

  itp.image = {

    generate: function () {

      var element = itp.document._sourceId;
      var elementId = '#' + element;
      var $element = $(elementId)[0];

      html2canvas($element, {

        onclone: function (clonedDocument) {
          // $(clonedDocument).find(elementId).css('display', 'block');
          $(clonedDocument).find(elementId).removeClass('d-none');
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
      // itp.slide._data = $form.serializeArray();
      // $form.hide();
      $form.addClass('d-none');
      $('.btn-edit').removeClass('d-none');

      var formData = $form.serializeArray();

      $(formData).each(function(index, obj) {
        itp.slide._data[obj.name] = obj.value;
      });

      // console.log(itp.slide._data);

      itp.slide.generate();

    });

    $('.btn-edit').on('click', function (e) {
      $('.book-img').remove();
      $('form').removeClass('d-none');
      $(e.target).addClass('d-none');
    });

    $('.btn-add-author').on('click', function (e) {
      e.preventDefault();

      var $button = $(this),
          $container  =  $('.author-inputs'),
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
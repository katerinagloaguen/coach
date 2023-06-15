jQuery(function() {
    console.log('If you are seeing this, the errors you are seeing come from YouTube');

    let availableLangs = ['en', 'fr'];
    let dictionary = [];
    let currentLang = 'en';

    for (const lang of availableLangs) {
      $.getJSON('./lang/' + lang + '.json', function(data) {
        dictionary[lang] = data;
      }).fail(function(){
        console.log('Could not load lang file ' + lang);
      });
    }

    // scrollify
    $.scrollify({
      section: ".panel",
      sectionName: false,
      interstitialSection: ".footer",
      before: function(i, panels) {
        let ref = panels[i].attr("data-section-name");
        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
      },
      afterRender: function() {
        $(".pagination a").on("click", $.scrollify.move);
      }
    });
    $('.navbar-toggler').on('click', function () {
      $.scrollify.update();
    });
    $('#ctaDown').on('click', function () {
      $.scrollify.move(1);
    });

    // Event handler for the theme switch
    $('#themeToggle').on('click', function() {
      $('body').toggleClass('dark-theme');
      let themeIcon = $('#themeToggle span.fa');
      let themeText = $('#themeToggle span.hover-text');
      currentLang = $('#langToggle').data('lang');
      if ($('body').hasClass('dark-theme')) {
        themeIcon.removeClass('fa-moon');
        themeIcon.addClass('fa-sun');
        themeText.text(dictionary[currentLang]['navbar_theme_light']);
      } else {
        themeIcon.removeClass('fa-sun');
        themeIcon.addClass('fa-moon');
        themeText.text(dictionary[currentLang]['navbar_theme_dark']);
      }
    });

    // Event handler for the lang switch
    $('#langToggle').on('click', function() {
      let $langBtn = $(this);
      currentLang = $langBtn.data('lang');
      let newLang = (currentLang === 'en' ? 'fr' : 'en');

      $('[lang-tag]').each(function () {
        let $element = $(this);
        let langTag = $element.attr('lang-tag');
        $element.html(dictionary[newLang][langTag]);
      });
      $langBtn.data('lang', newLang);
      $('html').attr('lang', newLang);
      if (newLang === 'en') {
        $langBtn.find('img').attr('src', './images/france.png');
        $('#resumeLink').attr('href', 'resume/CV_K_Gloaguen_en.pdf');
      } else {
        $langBtn.find('img').attr('src', './images/uk.jpg');
        $('#resumeLink').attr('href', 'resume/CV_K_Gloaguen_fr.pdf');
      }
    });

    $('#copyright').text('©' + new Date().getFullYear());
  });



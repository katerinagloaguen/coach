jQuery(function() {
    console.log('If you are seeing this, the errors you are seeing come from YouTube');

    // scrollify
    $.scrollify({
      section: ".panel",
      sectionName: false,
      interstitialSection: ".header,.footer",
      before:function(i,panels) {
        let ref = panels[i].attr("data-section-name");
        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
      },
      afterRender:function() {
        let pagination = "<ul class=\"pagination\">";
        let activeClass = "";
        $(".panel").each(function(i) {
          activeClass = "";
          if (i===$.scrollify.currentIndex()) {
            activeClass = "active";
          }
          pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
        });

        pagination += "</ul>";

        $(".home").append(pagination);
        $(".pagination a").on("click",$.scrollify.move);
      }
    });

    // Event handler for the theme switch
    $('#themeToggle').click(function() {
      $('body').toggleClass('dark-theme');
      let themeIcon = $('#themeToggle span.fa');
      if ($('body').hasClass('dark-theme')) {
        themeIcon.removeClass('fa-moon');
        themeIcon.addClass('fa-sun');
      } else {
        themeIcon.removeClass('fa-sun');
        themeIcon.addClass('fa-moon');
      }
    });

    // Event handler for the lang switch
    $('#langToggle').click(function() {
      let $langBtn = $(this);
      let currentLang = $langBtn.data('lang');
      let newLang = (currentLang === 'en' ? 'fr' : 'en');
      $.getJSON('./lang/' + newLang + '.json', function(data) {
        $('[lang-tag]').each(function () {
          let $element = $(this);
          let langTag = $element.attr('lang-tag');
          $element.html(data[langTag]);
        });
        $langBtn.data('lang', newLang);
        $('html').attr('lang', newLang);
        if (newLang === 'en') {
          $langBtn.find('img').attr('src', './images/france.png');
        } else {
          $langBtn.find('img').attr('src', './images/uk.jpg');
        }
      }).fail(function(){
        console.log('Could not load lang file');
      });
    });

    $('#copyright').text('©' + new Date().getFullYear());
  });



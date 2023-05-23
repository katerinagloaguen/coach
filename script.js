$(document).ready(function() {
    // Event handler for the theme switch
    $('#themeToggle').click(function() {
      $('body').toggleClass('dark-theme');
      var themeIcon = $('#themeToggle');
      if ($('body').hasClass('dark-theme')) {
        themeIcon.removeClass('fa-moon');
        themeIcon.addClass('fa-sun');
      } else {
        themeIcon.removeClass('fa-sun');
        themeIcon.addClass('fa-moon');
      }
    });
  });
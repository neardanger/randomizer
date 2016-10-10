

(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 200 // Creates a dropdown of 15 years to control year
    });

function checkDate() {
	if ($('#buildDate').val() == '') {
    $('#buildDate').addClass('invalid')
  } else {
    $('#buildDate').removeClass('invalid')
  }
}

$('form').submit(function() {
  checkDate();
  return false;
});

$('#buildDate').change(function() {
  checkDate();
});

    $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
  });
})(jQuery); 



































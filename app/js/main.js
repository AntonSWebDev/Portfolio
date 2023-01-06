jQuery(document).ready(function($){

	$('#header').vide('./../videos/header-video.mp4', {
		posterType: 'detect',
		bgColor: '#50627E'
	});

	$('.modal-btn').click(function(e) {
		e.preventDefault();
		$('body').addClass('lock');
		var destinationPopup = $(this).attr("href");
		$(destinationPopup).addClass('show');
		$(destinationPopup + ' .popup__close').click(function() {
			$(destinationPopup).removeClass('show');
			$('body').removeClass('lock');
		});
		$(destinationPopup + ' .popup__body').click(function(e) {
			e.stopPropagation();
		});
		$(destinationPopup + ' .popup__overlay').click(function() {
			$(destinationPopup).removeClass('show');
			$('body').removeClass('lock');
		});
		
	});
  
});
jQuery(document).ready(function($){

	$('#header').vide('./../videos/header-video.mp4', {
		posterType: 'detect',
		bgColor: '#50627E'
	});

	$('.modal-btn').click(function(e) {
		e.preventDefault();
		var destinationPopup = $(this).attr("href");
		$(destinationPopup).addClass('show');
		$(destinationPopup + ' .popup__close').click(function() {
			$(destinationPopup).removeClass('show');
		});
		// $(destinationPopup + ' .popup__overlay').click(function() {
		// 	$(destinationPopup).removeClass('show');
		// });
	});

  $(".phone").mask("+380 (99) 999-99-99"); 
  
  jQuery('form button').click( function() {
  	var form = jQuery(this).closest('form');
  	
  	if ( form.valid() ) {
  		form.css('opacity','.5');
  		var actUrl = form.attr('action');

  		jQuery.ajax({
  			url: actUrl,
  			type: 'post',
  			dataType: 'html',
  			data: form.serialize(),
  			success: function(data) {
  				form.html(data);
  				form.css('opacity','1');
          form.find('.status').html('форма отправлена успешно');
          //$('#myModal').modal('show') // для бутстрапа
  			},
  			error:	 function() {
  			 	form.find('.status').html('серверная ошибка');
  			}
  		});
  	}
  });

});
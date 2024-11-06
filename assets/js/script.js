/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";

	// Scrolljng
	const lenis = new Lenis({
		duration: 0.7,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: 'vertical',
		smooth: true,
		smoothTouch: false,
	});
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	gsap.registerPlugin(ScrollTrigger);

	
	// Service Item
	gsap.utils.toArray(".ag-service-item-4").forEach(service_item => {
		ScrollTrigger.create({
			trigger: service_item,
			start: "top 0%", 
			end: "bottom -1%",  
			toggleClass: { targets: service_item, className: "active" },
			markers: false
		});
	});
	// Counter Up Item
	$('.counter').counterUp({
		delay: 15,
		time: 1500,
	});
	// Circle Progress Item
	if($('.count-box').length){
		$('.count-box').appear_c(function(){
			var $t = $(this),
			n = $t.find(".count-text").attr("data-stop"),
			r = parseInt($t.find(".count-text").attr("data-speed"), 10);
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
		},{accY: 0});
	};
	if($('.dial').length){
		$('.dial').appear_c(function(){
			var elm = $(this);
			var color = elm.attr('data-fgColor');  
			var perc = elm.attr('value'); 
			var thickness = elm.attr('thickness');  
			elm.knob({ 
				'value': 0, 
				'min':0,
				'max':100,
				'skin':'tron',
				'readOnly':true,
				'thickness':.2,
				'dynamicDraw': true,
				'displayInput':false
			});
			$({value: 0}).animate({ value: perc }, {
				duration: 3500,
				easing: 'swing',
				progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
			}
		});
		},{accY: 0});
	}
	// Hero Service Slider
	if($('.ag-hero-ser-slide').length) {
		let slider = new Swiper('.ag-hero-ser-slide', {
			loop: true,
			spaceBetween: 0,
			speed: 500,
			// autoplay: {
			// 	delay: 5000,
			// },
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1600: {
					slidesPerView: 4,
				},
			},

		});
	}

})(jQuery);
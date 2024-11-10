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
			autoplay: {
				delay: 5000,
			},
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
	// Item Active
	var ltn__active_item = $('.ag-s-item-1')
	ltn__active_item.mouseover(function() {
		ltn__active_item.removeClass('active');
		$(this).addClass('active');
	});
	// Grid Item Active
	var $grid = $('.grid').imagesLoaded( function() {
		$grid.masonry({
			percentPosition: true,
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer'
		}); 
	});
	var $grid = $(".grid").isotope({
		itemSelector: ".grid-item",
		layoutMode: "fitRows"
	});
	var filterFns = {
		numberGreaterThan50: function() {
			var number = $(this)
			.find(".number")
			.text();
			return parseInt(number, 10) > 50;
		},
		ium: function() {
			var name = $(this)
			.find(".name")
			.text();
			return name.match(/ium$/);
		}
	};
	$(".button-group").on("click", "button", function() {
		var filterValue = $(this).attr("data-filter");
		filterValue = filterFns[filterValue] || filterValue;
		$grid.isotope({ filter: filterValue });
	});
	$(".button-group").each(function(i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function() {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});
	// Testimonial 1
	if($('.ag-ts-slider').length) {
		let slider = new Swiper('.ag-ts-slider', {
			loop: true,
			spaceBetween: 35,
			speed: 500,
			navigation: {
				nextEl: ".test-button-next",
				prevEl: ".test-button-prev",
			},
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
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 3,
				},
			},

		});
	}
})(jQuery);
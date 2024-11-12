/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";

	// Scrolljng
	const lenis = new Lenis({
		duration: 1,
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

	document.addEventListener("mousemove", function e(t) {
		try {
			t.target;
			gsap.timeline({
				defaults: {
					x: t.clientX,
					y: t.clientY
				}
			}).to(".cursor1", {
				ease: "power2.out"
			}).to(".cursor2", {
				ease: "power2.out"
			}, "-=0.4")
		} catch (o) {
			console.log(o)
		}
	});
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	gsap.registerPlugin(ScrollTrigger);
	// search-popup-start
	$('.search_btn_toggle').on('click', function() {
		$('.overlay, .search_box_active').addClass('active');
	});

	$('.overlay, .search_box_close').on('click', function() {
		$('.search_box_active').removeClass('active');
		$('.overlay').removeClass('active');
	});
	$('.vartcal_toggle').on('click', function(){
		$('.vt-vertical-menu').toggleClass("active");
	});
	$(document).on('keydown', function(event) {
		if (event.key === 'Escape') {
			$('.search_box_active').removeClass('active');
			$('.overlay').removeClass('active');
		}
	});
	// Animation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};
	$(window).on("load", function () {
		Splitting();
	});
	jQuery('.video_box').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});

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
	// Hero Title 1
	if ($('.title_text').length) {
		gsap.utils.toArray(".title_text").forEach(element => {
			let timeline = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					end: "bottom 60%",
					scrub: false,
					markers: false,
					toggleActions: "play none none none"
				}
			});
			let splitTextInstance = new SplitText(element, { type: "lines" });
			gsap.set(element, { perspective: 500 });
			timeline.from(splitTextInstance.lines, {
				duration: 1,
				delay: 1,
				opacity: 0,
				rotationX: -80,
				force3D: true,
				transformOrigin: "top center -70",
				stagger: 0.1
			});
		});
	}
	if ($('.title_text_2').length) {
		gsap.utils.toArray(".title_text_2").forEach(element => {
			let timeline = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					end: "bottom 60%",
					scrub: false,
					markers: false,
					toggleActions: "play none none none"
				}
			});
			let splitTextInstance = new SplitText(element, { type: "words" });
			gsap.set(element, { perspective: 500 });
			timeline.from(splitTextInstance.words, {
				duration: 1,
				delay: 1,
				opacity: 0,
				x: 120,
				force3D: true,
				transformOrigin: "top center -70",
				stagger: 0.1
			});
		});
	}
	// Card Active
	const active_card = gsap.utils.toArray('.txt_item_active');
	active_card.forEach(svg => {
		gsap.to(svg, {
			scrollTrigger: {
				trigger: svg,
				start: "top 100%",
				end: "bottom bottom",
				toggleClass: "active",
				duration: 3,
				delay:1,
				toggleActions: "play play play reverse",
				once: true,
			}
		});
	});
	// TItie Animation
	window.onload = function () {
		const st = $(".txa-split-text");
		if (st.length === 0) return;
		gsap.registerPlugin(SplitText);
		st.each((index, el) => {
			const splitTextInstance = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(el, { perspective: 400 });
			if ($(el).hasClass("txa-split-in-right")) {
				gsap.set(splitTextInstance.chars, {
					opacity: 1,
					webkitTextStroke: "1px black",
					color: "transparent",
					x: 20,
					ease: "back.out",
				});
			}
			el.anim = gsap.to(splitTextInstance.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
				},
				x: 0,
				y: 0,
				rotateX: 0,
				color: "inherit",
				webkitTextStroke: "0px white",
				scale: 1,
				opacity: 1,
				duration: 0.8,
				stagger: 0.02,
			});
		});
	};
	gsap.utils.toArray('.appear_top').forEach((el) => { 
		gsap.fromTo(el, 
			{ opacity: 0, y: 150, transformOrigin: 'center center' },
			{ opacity: 1, y: 0, duration: 1, 
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 90%",
				end: "top 70%",
				toggleActions: "play none none reverse",
				markers: false
			}
		}
		);
	});
	gsap.utils.toArray(".img-zoom").forEach(function(container) {
		let image = container.querySelector("img");
		gsap.fromTo(image, 
		{ 
			scale: 1.5, 
			filter: 'grayscale(1)' 
		},
		{
			scale: 1,
			filter: 'grayscale(0)',
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
			ease: "none",
		});
	});
	gsap.utils.toArray(".img-rotate").forEach(function(container) {
		let image = container.querySelector("img");
		gsap.fromTo(image, 
		{ 
			scale: .5, 
			rotate: '360deg',
		},
		{
			scale: 1,
			rotate: '0',
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
			ease: "none",
		});
	});
	gsap.utils.toArray('.appear_angle').forEach((el) => { 
		gsap.fromTo(el, 
			{ opacity: 0, y: 250, x: -250, transformOrigin: 'center center' },
			{ opacity: 1, y: 0, x: 0, duration: 1, 
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 90%",
				end: "top 70%",
				stagger: 0.2,
				toggleActions: "play none none reverse",
				markers: false
			}
		}
		);
	});

	gsap.utils.toArray(".ag-text p").forEach(paragraph => {
		let timeline = gsap.timeline({
			scrollTrigger: {
				trigger: paragraph,
				start: "top 90%",
				end: "bottom 60%",
				toggleActions: "play none none none"
			}
		});
		let splitText = new SplitText(paragraph, { type: "lines" });
		gsap.set(paragraph, { perspective: 400 });
		timeline.from(splitText.lines, {
			opacity: 0,
			y: 20,
			transformOrigin: "top center -50",
			force3D: true,
			duration: 1,
			delay: 0.5,
			stagger: 0.1
		});
	});

})(jQuery);
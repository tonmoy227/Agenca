/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";
	jQuery(window).on('load', function(){
		jQuery('#preloader').fadeOut('slow',function(){jQuery(this).remove();});
		
	});
	gsap.config({
		nullTargetWarn: false,
	});

// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: .6, 
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
	function TXTheaderSticky() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $('.txa_sticky_header');
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass('txa_sticky');
			} else {
				$header.removeClass('txa_sticky');
				$header.removeClass('txa_sticky_show');
			}

			if ($header.hasClass('txa_sticky')) {
				if (windowTop < lastScrollTop) {
					$header.addClass('txa_sticky_show');
				} else {
					$header.removeClass('txa_sticky_show');
				}
			}

			lastScrollTop = windowTop;
		});
	}
	TXTheaderSticky();
	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > 250) {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').addClass('sticky-on')
		} else {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').removeClass('sticky-on')
		}
	});
	$('.open_mobile_menu').on("click", function() {
		$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
	});
	$('.open_mobile_menu').on('click', function () {
		$('body').toggleClass('mobile_menu_overlay_on');
	});
	jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fas fa-angle-down"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
	});
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	gsap.registerPlugin(ScrollTrigger);
	// offcanvas-start
	$('.offcanvas_toggle').on('click', function() {
		$('.overlay, .offcanvas_box_active').addClass('active');
	});

	$('.overlay, .offcanvas_box_close').on('click', function() {
		$('.offcanvas_box_active').removeClass('active');
		$('.overlay').removeClass('active');
	});

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
	if ($(".progress-bar").length) {
		var $progress_bar = $('.progress-bar');
		$progress_bar.appear();
		$(document.body).on('appear', '.progress-bar', function() {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				var percent = current_item.data('percent');
				current_item.css('width', percent + '%').addClass('appeared').parent().append('<span>' + percent + '%' + '</span>');
			}

		});
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

	// Counter Up Item
	$('.counter').counterUp({
		delay: 15,
		time: 1500,
	});
	$(document).on('click', '.mt-faq-accordion .accordion-item', function(){
		$(this).addClass('faq_active').siblings().removeClass('faq_active')
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
	var ltn__active_item_2 = $('.ag-service-item-4')
	ltn__active_item_2.mouseover(function() {
		ltn__active_item_2.removeClass('active');
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
	let price1 = new Swiper('.chy_price_1_active', {
		loop: true,
		spaceBetween: 0,
		speed: 800,
		rtl: false,
		slidesPerView: 1,
		effect: 'fade',
		autoplay: {
			delay: 5000,
		},
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: ".chy-price-1-pagination",
			clickable: true
		},
		navigation: {
			nextEl: ".chy_price_1_next",
			prevEl: ".chy_price_1_prev",
		},
	});
	var slider = new Swiper('.hap-team-slider', {
		spaceBetween: 30,
		slidesPerView: 3,
		loop: true,
		speed: 1000,
		navigation: {
			nextEl: ".hap-team-button-next",
			prevEl: ".hap-team-button-prev",
		},
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1500': {
				slidesPerView: 3,
			},
			'1400': {
				slidesPerView: 3,
			},
			'1300': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	var slider = new Swiper('.hap-gallery-slide', {
		slidesPerView: 7,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 500,

		breakpoints: {
			'1600': {
				slidesPerView: 7,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});
	if($('.ag-team-slider-3').length) {
		let slider = new Swiper('.ag-team-slider-3', {
			loop: true,
			spaceBetween: 48,
			speed: 700,
			centeredSlides: true,
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
	if (window.matchMedia("(min-width: 1400px)").matches) { 
		var Hero_pin = document.querySelectorAll(".ag-hero-section-2")
		Hero_pin.forEach((item) => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					markers: false,
					pin: true,
					pinSpacing: false,
					start: "top 0%",
					end: "bottom +=200",
					onEnter: () => {
						setTimeout(() => {
							document.querySelector(".ag-hero-wrap-2").classList.add("active");
						}, 1000); 
					},
				},
			});
		});
	}
	gsap.utils.toArray('.chy-zoomout').forEach((el, index) => { 
		let tl6 = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 1,
				start: "top 85%",
				end: "buttom 60%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tl6
		.set(el, {transformOrigin: 'center center'})
		.fromTo(el, { scale: 1}, { scale: 0, duration: 1, immediateRender: false})
	})
	if (window.matchMedia("(min-width: 1200px)").matches) { 
		gsap.utils.toArray('.ag-testimonial-content-2').forEach((el, index) => { 
			let AgTest = gsap.timeline({
				scrollTrigger: {
					trigger: ".ag-testimonial-content-2",
					scrub: 6,
					start: "top 20%",
					end: "bottom 20%",
					toggleActions: "play none none reverse", 
					markers: false
				}
			})

			AgTest
			.set(el, {transformOrigin: 'top bottom'})
			.fromTo(el, { xPercent: 0 }, { xPercent: -100 , duration: 30, immediateRender: false})
		});
	}
	if ($('.blog-item-img-slide').length > 0 ) {
		var blog_Slider = new Swiper(".blog-item-img-slide", {
			loop: true,
			slidesPerView: 1,
			centeredSlides: true,
			speed: 1000,
			navigation: {
				nextEl: ".log-blog-button-prev",
				prevEl: ".log-blog-button-next",
			},
		});
	}
	if(window.innerWidth> 1200){
		var AgProject = gsap.timeline({

			scrollTrigger: {
				animation: AgProject,
				trigger: '.ag-project-content-4',
				start: "top 10%",
				end: "bottom -=200",
				scrub: 2,
				pin: true,
				pinSpacing: true,
			}

		});

		AgProject
		.to(".pro-item-2", {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",  duration: 2})
		.to(".pro-item-3", {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",  duration: 2})
		const Agpro = gsap.utils.toArray('.ag-project-inner-4');
		Agpro.forEach(item => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					scrub: 1,
					start: "top 80%",
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					once: true,
				}
			});
		});
	}
	if (window.matchMedia("(min-width: 1200px)").matches) { 
		gsap.utils.toArray('.ag-team-bg-text-1').forEach((el, index) => { 
			let TeamBg = gsap.timeline({
				scrollTrigger: {
					trigger: ".ag-team-section-3",
					scrub: 6,
					start: "top 20%",
					end: "bottom 20%",
					toggleActions: "play none none reverse", 
					markers: false
				}
			})

			TeamBg
			.set(el, {transformOrigin: 'top bottom'})
			.fromTo(el, { x: 0 }, { x: -1920 , duration: 30, immediateRender: false})
		});
	}
	if (window.matchMedia("(min-width: 1200px)").matches) { 
		gsap.utils.toArray('.ag-team-bg-text-2').forEach((el, index) => { 
			let TeamBg = gsap.timeline({
				scrollTrigger: {
					trigger: ".ag-team-section-3",
					scrub: 6,
					start: "top 20%",
					end: "bottom 20%",
					toggleActions: "play none none reverse", 
					markers: false
				}
			})

			TeamBg
			.set(el, {transformOrigin: 'top bottom'})
			.fromTo(el, { x: -1920 }, { x: -0 , duration: 30, immediateRender: false})
		});
	}
	if (window.matchMedia("(min-width: 1200px)").matches) { 
		var TestPin = document.querySelectorAll(".ag-testimonial-section-2")
		TestPin.forEach((item) => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					markers: false,
					pin: true,
					scrub: 1,
					start: "top top",
					end: "-=200"
				},
			});
		});
	}
	function updateVisibility() {
		const elements = $('.ag-port-item-3');
		const viewportBottom = $(window).scrollTop() + $(window).height();
		const viewportTop = $(window).scrollTop();

		elements.each(function() {
			const element = $(this);
			const elementTop = element.offset().top;
			const elementBottom = elementTop + element.outerHeight();

			if (elementTop < viewportBottom && elementBottom > viewportTop) {
				element.addClass('visible');
			} else {
				element.removeClass('visible');
			}
		});
	}
	$(window).on('scroll resize', updateVisibility);
	updateVisibility();
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
			if ($(el).hasClass("txa-split-in-left")) {
				gsap.set(splitTextInstance.chars, {
					opacity: 1,
					color: "#ff3838",
					x: 30,
					scale: .95,
					ease: "back.out",
				});
			}
			if ($(el).hasClass("banner-title")) {
				gsap.set(splitTextInstance.words, {
					opacity: 1,
					y: 100,
					scale: .95,
					ease: "bounce.out",
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
				stagger: 0.01,
			});
			el.anim = gsap.to(splitTextInstance.words, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
				},
				x: 0,
				y: 0,

				color: "inherit",
				webkitTextStroke: "0px white",
				scale: 1,
				opacity: 1,
				duration: 1,
				stagger: .3,
			});
		});
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
	};
	if($('.gray_text').length) {
		var about_text = $(".gray_text");
		if(about_text.length == 0) return; gsap.registerPlugin(SplitText); about_text.each(function(index, text) {
			text.split = new SplitText(text, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			if( $(text).hasClass('gray_text') ){
				gsap.set(text.split.chars, {
					opacity: .35,
				});
			}
			text.anim = gsap.to(text.split.chars, {
				scrollTrigger: {
					trigger: text,
					start: "top 60%",
					end: "top 10%",
					markers: false,
					scrub: 1,
				},
				opacity: 1,
				duration: .7,
				stagger: 0.2,
			});

		});
	}

	if (window.matchMedia("(min-width: 1200px)").matches) { 
		gsap.utils.toArray('.img_left').forEach((el) => { 
			gsap.fromTo(el, 
				{ opacity: 1, x: 0, transformOrigin: 'center center' },
				{ opacity: 1, x: -220, duration: 1, 
				scrollTrigger: {
					trigger: ".ag-hero-content-4",
					scrub: 1,
					start: "top 75%",
					end: "bottom 0%",
					toggleActions: "play none none reverse",
					markers: false
				}
			}
			);
		});
	};
	if (window.matchMedia("(min-width: 1200px)").matches) { 
		gsap.utils.toArray('.play_move').forEach((el) => { 
			gsap.fromTo(el, 
				{ opacity: 1, y: 0, x: 0, borderRadius:0, transformOrigin: 'center center' },
				{ opacity: 1, y: 500, x: -1100, borderRadius: "300px", duration: 1, 
				scrollTrigger: {
					trigger: ".ag-hero-content-4",
					scrub: 1,
					start: "top 20%",
					end: "bottom -50%",
					toggleActions: "play none none reverse",
					markers: false
				}
			}
			);
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
			filter: 'grayscale(1)',
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
	let imageBins = gsap.timeline({
		scrollTrigger: {
			trigger: ".item-zoom-img",
			start: "top bottom",
			markers: false,
			scrub: 1,
			end: "bottom center"
		}
	})
	imageBins.to(".item-zoom-img img", {
		scale: 1.15,
		duration: 1,
	});
	let imageTl = gsap.timeline({
		scrollTrigger: {
			trigger: ".ag-video-play-section",
			start: "top bottom",
			markers: false,
			scrub: 1,
			end: "bottom center"
		}
	})
	imageTl.to(".ag-video-play-section .video-bg img", {
		scale: 1.15,
		duration: 1,
	})
	gsap.utils.toArray(".img-anim").forEach(function(container) {
		let image = container.querySelector("img");
		gsap.fromTo(image, 
		{ 
			scale: 1.5, 
			filter: "blur(10px)",
		},
		{
			scale: 1,
			filter: "blur(0px)",
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
			ease: "power2.out",
		});
	});
	gsap.utils.toArray(".img-rotate").forEach(function(container) {
		let image = container.querySelector(".item_select");
		gsap.fromTo(image, 
		{ 
			scale: .5, 
			rotate: '360deg',
		},
		{
			scale: 1.3,
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
				stagger: 0.5,
				toggleActions: "play none none reverse",
				markers: false
			}
		}
		);
	});
	gsap.utils.toArray('.play_btn').forEach((el) => { 
		gsap.fromTo(el, 
			{ opacity: 0, y: -550, rotate: '360deg',  transformOrigin: 'center center' },
			{ opacity: 1, y: 0, rotate: '0',  duration: 1, 
			scrollTrigger: {
				trigger: el,
				scrub: 2,
				start: "top 0%",
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
	gsap.utils.toArray(".ag-text-2 p").forEach(paragraph => {
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
			delay: 2,
			stagger: 0.1
		});
	});
	var ServiceImage = gsap.timeline({
		scrollTrigger: {
			animation: ServiceImage,
			trigger: '.ag-service-section-2',
			start: "top -20%",
			end: "bottom -10%",
			toggleActions: 'play reverse play reverse',
			markers: false,
		}
	});
	ServiceImage
	.to( ".ag-s-side .s-item-img-1" , { opacity: 1, duration: 1 })
	.to( ".ag-s-side .s-item-img-2" , { opacity: 1, duration: 2 })
	.to( ".ag-s-side .s-item-img-3" , { opacity: 1   , duration: 1 }, "-=1.5");

	const imageAppearContainers = document.querySelectorAll(".ptx-image-appear2");
	imageAppearContainers.forEach((container) => {
		const image = container.querySelector(".ptx-img-rvl_2");
		gsap.timeline({
			scrollTrigger: {
				trigger: container,
				toggleActions: "play none none none",
			}
		})
		.set(container, { autoAlpha: 1 })
		.from(container, {
			xPercent: 100,
			duration: 1.5,
			ease: "power2.out"
		})
		.from(image, {
			xPercent: -100,
			scale: 1.3,
			duration: 1.5,
			delay: -1.5,
			ease: "power2.out"
		});
	});
	const imageAppearContainers2 = document.querySelectorAll(".ptx-image-appear3");
	imageAppearContainers2.forEach((container) => {
		const image = container.querySelector(".ptx-img-rvl_3");
		gsap.timeline({
			scrollTrigger: {
				trigger: container,
				toggleActions: "play none none none",
			}
		})
		.set(container, { autoAlpha: 1 })
		.from(container, {
			xPercent: -100,
			duration: 1.5,
			ease: "power2.out",
		})
		.from(image, {
			xPercent: 100,
			scale: 1.3,
			duration: 1.5,
			delay: -1.5,
			ease: "power2.out",
		});
	}); 
})(jQuery);
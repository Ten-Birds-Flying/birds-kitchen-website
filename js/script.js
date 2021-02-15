// Preloader
$(window).on('load', function () {
	$('.preloader').delay(1000).fadeOut('slow');
});

// One Page Scroll
$('html').easeScroll();

// Sticky menus
$('.menu, .menu-mobile').sticky({ topSpacing: 0 });

// Avoid gap due to jquery.sticky.js accepts only one sticky menu
$(window).on('load resize', function () {
	let win = $(this);
	if (win.width() >= 767) {
		$('.menu-mobile').parent().css({
			height: '0',
		});
	}
	if (win.width() < 768) {
		$('.menu').parent().css({
			height: '0',
		});
	}
});

// Scroll full viewport on start page
function scrollDown() {
	var vheight = $(window).height();
	$('html, body').animate(
		{
			scrollTop:
				(Math.floor($(window).scrollTop() / vheight) + 1) * vheight,
		},
		500
	);
}
$('.scroll, .arrow-down').click(function (e) {
	scrollDown();
	e.preventDefault();
});

// Smooth scroll & Animated Back to top
$(document).ready(function () {
	// Smooth scrolling to any internal tags
	$('a[href*=#]:not([href=#])').click(function () {
		if (
			location.pathname.replace(/^\//, '') ==
				this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length
				? target
				: $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate(
					{
						scrollTop: target.offset().top - 60,
					},
					500
				);
				return false;
			}
		}
	});

	var offset = 100,
		scroll_top_duration = 700,
		$back_to_top = $('.btn-top'),
		$thedial = $('.dial'),
		$progress_bar = $('.progress-bar');

	// Initialize the progress dial
	$thedial.knob({
		min: 0,
		max: 100,
		width: 50,
		height: 50,
		fgColor: 'rgba(255, 255, 255, 0.5)',
		bgColor: '#6d7887',
		skin: 'tron',
		thickness: 0.2,
		displayInput: false,
		displayPreview: false,
		readOnly: true,
	});

	$(window).scroll(function () {
		// Hide or show the progress bar
		$(this).scrollTop() > offset
			? $progress_bar.addClass('is-visible')
			: $progress_bar.removeClass('is-visible');

		// Get the window position and set it to a variale
		var s = $(window).scrollTop(),
			d = $(document).height(),
			c = $(window).height();
		scrollPercent = (s / (d - c)) * 100;

		// Bind the window position to the progress dial
		$('.dial').val(scrollPercent).change();

		if (s > 0) {
			$('header').addClass('scrolled fade');
		}

		if (s <= 0) {
			$('header').removeClass('scrolled fade');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function (e) {
		e.preventDefault();
		$('body,html').animate(
			{
				scrollTop: 0,
			},
			scroll_top_duration
		);
	});
});

if (
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
) {
	$('.footer').css('position', 'relative');
	$('.contact').css('marginBottom', '0');
}

//Menu mobile
$('.icon').click(function () {
	$(' ul.menu-mobile-ul').slideToggle('slow', function () {});
});
$(' ul.menu-mobile-ul a').bind('click', function (e) {
	e.preventDefault();
	let href = $(this).attr('href');
	if ('https://github.com/fredserva/birdskitchen/wiki' === href) {
		window.open(href, '_blank');
	}
	$(' ul.menu-mobile-ul').hide();
});

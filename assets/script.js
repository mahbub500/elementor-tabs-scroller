jQuery(function ($) {
    // Main content slider
    $(".e-n-tabs-content").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: ".e-n-tabs-heading"
    });
    
    // Heading slider
    $(".e-n-tabs-heading").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".e-n-tabs-content",
        dots: false,
        variableWidth: true,
        focusOnSelect: true,
        infinite: true,  // Enable infinite loop
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">←</button>',
        nextArrow: '<button type="button" class="slick-next">→</button>'
    });
    
    // Click handler - move clicked item to first position
    $(".e-n-tabs-heading").on("click", ".slick-slide > div", function () {
        const index = $(this).closest("[data-slick-index]").data("slick-index");
        // Sync both sliders to clicked tab
        $(".e-n-tabs-heading").slick("slickGoTo", index);
        $(".e-n-tabs-content").slick("slickGoTo", index);
    });
    
    // Arrow click handlers for rotation behavior
    $(".e-n-tabs-heading").on("click", ".slick-next", function (e) {
        e.stopPropagation();
        const $slider = $(".e-n-tabs-heading");
        const currentIndex = $slider.slick("slickCurrentSlide");
        const slideCount = $slider.slick("getSlick").slideCount;
        
        // Move to next slide (rotates: 1→2, 2→3, ... 7→1)
        const nextIndex = (currentIndex + 1) % slideCount;
        $slider.slick("slickGoTo", nextIndex);
        $(".e-n-tabs-content").slick("slickGoTo", nextIndex);
    });
    
    $(".e-n-tabs-heading").on("click", ".slick-prev", function (e) {
        e.stopPropagation();
        const $slider = $(".e-n-tabs-heading");
        const currentIndex = $slider.slick("slickCurrentSlide");
        const slideCount = $slider.slick("getSlick").slideCount;
        
        // Move to previous slide (rotates: 2→1, 1→7, 7→6, ...)
        const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
        $slider.slick("slickGoTo", prevIndex);
        $(".e-n-tabs-content").slick("slickGoTo", prevIndex);
    });
});
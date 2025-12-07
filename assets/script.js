jQuery(function ($) {
    const $contentSlider = $(".e-n-tabs-content").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: ".e-n-tabs-heading"
    });

    const $headingSlider = $(".e-n-tabs-heading").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".e-n-tabs-content",
        dots: false,
        variableWidth: true,
        focusOnSelect: true,
        infinite: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    // Function to add active class to current tab
    function updateActiveTab() {
        const $slides = $headingSlider.find(".slick-slide:not(.slick-cloned)");

        // Remove previous classes and aria
        $slides
            .removeClass("active-tab")
            .addClass("not-active-tab")
            .find(".e-n-tab-title")
            .attr("aria-selected", "false");

        // Add classes and aria to the current visible slide
        const currentIndex = $headingSlider.slick("slickCurrentSlide");
        const $currentSlide = $slides.eq(currentIndex);

        $currentSlide
            .addClass("active-tab")
            .removeClass("not-active-tab")
            .find(".e-n-tab-title")
            .attr("aria-selected", "true");
    }

    // Click handler for heading slides
    $headingSlider.on("click", ".slick-slide > div", function () {
        const index = $(this).closest("[data-slick-index]").data("slick-index");

        // Sync both sliders
        $headingSlider.slick("slickGoTo", index);
        $contentSlider.slick("slickGoTo", index);

        // Add active class
        setTimeout(updateActiveTab, 50);
    });

    // Click function for arrows
    $headingSlider.on("click", ".slick-prev, .slick-next", function () {
        setTimeout(updateActiveTab, 50); // small delay to let Slick update
    });

    // Update active tab after slider changes (e.g., swipe)
    $headingSlider.on("afterChange", updateActiveTab);

    // Initial set on page load
    updateActiveTab();
});

jQuery(function ($) {
    // ------------------------------
    // Initialize main content slider
    // ------------------------------
    const $contentSlider = $(".e-n-tabs-content").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: ".e-n-tabs-heading"
    });

    // ------------------------------
    // Initialize heading slider (nav)
    // ------------------------------
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

    // ------------------------------
    // Click handler for heading slides
    // Just select the tab (do NOT move to first index)
    // ------------------------------
    $headingSlider.on("click", ".slick-slide > div", function () {
        const index = $(this).closest("[data-slick-index]").data("slick-index");

        // Sync both sliders to the clicked tab
        $headingSlider.slick("slickGoTo", index);
        $contentSlider.slick("slickGoTo", index);
    });

    // ------------------------------
    // Optional: arrow click sync (already handled by Slick)
    // If needed for custom behavior, can add here
    // ------------------------------
});

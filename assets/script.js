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
        focusOnSelect: true,   // IMPORTANT
        infinite: false
    });

    // Click + move clicked item to first
    $(".e-n-tabs-heading").on("click", ".slick-slide > div", function () {

        const index = $(this).closest("[data-slick-index]").data("slick-index");

        // Go to clicked tab (syncs both sliders)
        $(".e-n-tabs-heading").slick("slickGoTo", index);
        $(".e-n-tabs-content").slick("slickGoTo", index);

        // Shift visible frame so clicked item appears at beginning
        // scrolled position = index
        $(".e-n-tabs-heading").slick("slickGoTo", index);
    });

});

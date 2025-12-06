jQuery(document).ready(function ($) {

    // Add arrows only once
    if (!$('.tab-arrow').length) {
        $('.e-n-tabs-heading').each(function () {
            $(this).append('<div class="tab-arrow tab-arrow-left">←</div>');
            $(this).append('<div class="tab-arrow tab-arrow-right">→</div>');
        });
    }

    // Scroll on click
    $(document).on("click", ".tab-arrow-left", function () {
        let container = $(this).closest(".e-n-tabs-heading").find(".e-n-tabs-heading__list");
        container.animate({ scrollLeft: container.scrollLeft() - 150 }, 300);
    });

    $(document).on("click", ".tab-arrow-right", function () {
        let container = $(this).closest(".e-n-tabs-heading").find(".e-n-tabs-heading__list");
        container.animate({ scrollLeft: container.scrollLeft() + 150 }, 300);
    });

});

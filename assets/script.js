jQuery(function ($) {

    // 1) Prepare each tabs heading: wrap titles + inject arrows
    $('.e-n-tabs-heading').each(function () {
        var $heading = $(this);

        // Wrap all direct .e-n-tab-title in a scrollable list if not yet wrapped
        if (!$heading.find('.e-n-tabs-heading__list').length) {
            var $titles = $heading.children('.e-n-tab-title');
            $titles.wrapAll('<div class="e-n-tabs-heading__list"></div>');
        }

        // Add left arrow if missing
        if (!$heading.find('.tab-arrow-left').length) {
            $heading.prepend('<div class="tab-arrow tab-arrow-left" aria-hidden="true">←</div>');
        }

        // Add right arrow if missing
        if (!$heading.find('.tab-arrow-right').length) {
            $heading.append('<div class="tab-arrow tab-arrow-right" aria-hidden="true">→</div>');
        }
    });


    // 2) LEFT arrow → previous tab
    $(document).on('click', '.tab-arrow-left', function () {
        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $active  = $list.find('.e-n-tab-title[aria-selected="true"]');
        var $prev    = $active.prev('.e-n-tab-title');

        if ($prev.length) {
            // Scroll list to show previous tab nicely
            var newScroll = $prev.position().left + $list.scrollLeft() - 40;
            $list.animate({ scrollLeft: newScroll }, 250);

            // Let Elementor handle tab switching
            $prev.trigger('click');
        }
    });


    // 3) RIGHT arrow → next tab
    $(document).on('click', '.tab-arrow-right', function () {
        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $active  = $list.find('.e-n-tab-title[aria-selected="true"]');
        var $next    = $active.next('.e-n-tab-title');

        if ($next.length) {
            var newScroll = $next.position().left + $list.scrollLeft() - 40;
            $list.animate({ scrollLeft: newScroll }, 250);

            $next.trigger('click');
        }
    });

});

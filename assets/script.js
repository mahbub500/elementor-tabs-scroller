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


    // 2) RIGHT arrow → next tab in loop
    //    - "Area 1" (first position) becomes the next tab
    //    - Current first moves to the end
    $(document).on('click', '.tab-arrow-right', function () {
        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $tabs    = $list.find('.e-n-tab-title');

        if ($tabs.length <= 1) return;

        var $first  = $tabs.first();
        var $target = $first.next('.e-n-tab-title');

        // If for some reason there's only one, stay on it
        if (!$target.length) {
            $target = $first;
        }

        // Activate the "next" tab (which will become first)
        $target.trigger('click');   // Elementor handles aria-selected + content

        // Move old first to the end => new order: [next, ..., old-first]
        $first.appendTo($list);
    });


    // 3) LEFT arrow → previous tab in loop
    //    - Last tab moves to the front and becomes active
    $(document).on('click', '.tab-arrow-left', function () {
        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $tabs    = $list.find('.e-n-tab-title');

        if ($tabs.length <= 1) return;

        var $last = $tabs.last();

        // Move last to the front => new order: [last, 1, 2, ...]
        $last.prependTo($list);

        // Activate the new first (previously last)
        $last.trigger('click');     // Elementor handles aria-selected + content
    });

});

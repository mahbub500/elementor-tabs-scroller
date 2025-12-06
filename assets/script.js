jQuery(function ($) {

    var isAnimating = false;
    var duration = 600; // animation time in ms

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


    // -------------------------------
    // RIGHT ARROW → slide left (R→L)
    // Order: [1,2,3,4,5,6,7] -> [2,3,4,5,6,7,1]
    // -------------------------------
    $(document).on('click', '.tab-arrow-right', function () {
        if (isAnimating) return;

        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $tabs    = $list.children('.e-n-tab-title');

        if ($tabs.length <= 1) return;

        isAnimating = true;

        var $first  = $tabs.first();
        var $second = $tabs.eq(1);
        if (!$second.length) $second = $first;

        // Width of the first tab (including margin)
        var stepWidth = $first.outerWidth(true);

        // 1) Animate list to the left by one tab width
        $list.css({
            transition: 'transform ' + duration + 'ms ease-in-out',
            transform: 'translateX(-' + stepWidth + 'px)'
        });

        // 2) After animation: reset transform, move first to end, activate new first
        setTimeout(function () {

            // Reset transform without animation
            $list.css({
                transition: 'none',
                transform: 'translateX(0)'
            });

            // Reorder DOM: first → end
            $first.appendTo($list);

            // New order now rotated: [2,3,4,5,6,7,1]
            // Active tab is the visual first (previous second)
            var $newFirst = $list.children('.e-n-tab-title').first();
            $newFirst.trigger('click'); // Elementor updates aria-selected/content

            isAnimating = false;

        }, duration);
    });


    // --------------------------------
    // LEFT ARROW → slide right (L→R)
    // From [3,4,5,6,7,1,2] -> [2,3,4,5,6,7,1]
    // --------------------------------
    $(document).on('click', '.tab-arrow-left', function () {
        if (isAnimating) return;

        var $heading = $(this).closest('.e-n-tabs-heading');
        var $list    = $heading.find('.e-n-tabs-heading__list');
        var $tabs    = $list.children('.e-n-tab-title');

        if ($tabs.length <= 1) return;

        isAnimating = true;

        var $first = $tabs.first();
        var $last  = $tabs.last();

        var stepWidth = $first.outerWidth(true);

        // 1) Set initial offset to the left so we can animate back to the right
        $list.css({
            transition: 'none',
            transform: 'translateX(-' + stepWidth + 'px)'
        });

        // 2) Immediately move last to front → order becomes [last,1,2,3,...]
        $last.prependTo($list);

        // 3) Animate back to transform(0) → visual slide from left to right
        requestAnimationFrame(function () {
            $list.css({
                transition: 'transform ' + duration + 'ms ease-in-out',
                transform: 'translateX(0)'
            });
        });

        // 4) After animation, clean up and set active tab
        setTimeout(function () {

            $list.css({
                transition: 'none',
                transform: 'translateX(0)'
            });

            // New first tab (the one we moved from the end)
            var $newFirst = $list.children('.e-n-tab-title').first();
            $newFirst.trigger('click');

            isAnimating = false;

        }, duration);
    });

});

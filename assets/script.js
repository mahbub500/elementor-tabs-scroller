jQuery(function ($) {

    var isAnimating = false;
    var duration = 600; // ms – adjust for slower/faster fade

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
    // RIGHT ARROW → rotate forward
    // [1,2,3,4,5,6,7] -> [2,3,4,5,6,7,1]
    // Visually: 2nd smoothly becomes 1st, 1st slowly hides
    // -------------------------------
    $(document).on('click', '.tab-arrow-right', function () {
        if (isAnimating) return;
        isAnimating = true;

        var $heading  = $(this).closest('.e-n-tabs-heading');
        var $tabsRoot = $heading.closest('.e-n-tabs');            // wrapper of heading + content
        var $list     = $heading.find('.e-n-tabs-heading__list'); // row of tab titles
        var $tabs     = $list.children('.e-n-tab-title');

        if ($tabs.length <= 1) {
            isAnimating = false;
            return;
        }

        var $oldFirst = $tabs.eq(0);              // current first tab
        var $newFirst = $tabs.eq(1);              // will become first
        if (!$newFirst.length) $newFirst = $oldFirst;

        // 1) Rotate DOM: first -> end
        $oldFirst.appendTo($list);

        // 2) Prepare fade states (no transition yet)
        $oldFirst.css({
            transition: 'none',
            opacity: 1
        });

        $newFirst.css({
            transition: 'none',
            opacity: 0
        });

        // 3) Cross-fade: old first fades out, new first fades in
        requestAnimationFrame(function () {
            $oldFirst.css({
                transition: 'opacity ' + duration + 'ms ease-out',
                opacity: 0
            });

            $newFirst.css({
                transition: 'opacity ' + duration + 'ms ease-in',
                opacity: 1
            });
        });

        // 4) After fade: cleanup + update active tab & content
        setTimeout(function () {

            // Clean inline styles
            $oldFirst.css({
                transition: '',
                opacity: ''
            });
            $newFirst.css({
                transition: '',
                opacity: ''
            });

            // New first in DOM (should be the same as $newFirst)
            var $firstNow = $list.children('.e-n-tab-title').first();
            var newIndex  = $firstNow.data('tab-index');

            // Update header active state
            $list.children('.e-n-tab-title')
                .attr('aria-selected', 'false')
                .removeClass('elementor-active');

            $firstNow
                .attr('aria-selected', 'true')
                .addClass('elementor-active');

            // Update content active panel by data-tab-index
            var $panels = $tabsRoot.find('.e-n-tabs-content > [data-tab-index]');
            $panels.removeClass('e-active');
            $panels.filter('[data-tab-index="' + newIndex + '"]').addClass('e-active');

            isAnimating = false;
        }, duration);
    });


    // --------------------------------
    // LEFT ARROW → rotate backward
    // [3,4,5,6,7,1,2] -> [2,3,4,5,6,7,1]
    // Visually: last tab smoothly appears as 1st, old 1st slowly hides
    // --------------------------------
    $(document).on('click', '.tab-arrow-left', function () {
        if (isAnimating) return;
        isAnimating = true;

        var $heading  = $(this).closest('.e-n-tabs-heading');
        var $tabsRoot = $heading.closest('.e-n-tabs');
        var $list     = $heading.find('.e-n-tabs-heading__list');
        var $tabs     = $list.children('.e-n-tab-title');

        if ($tabs.length <= 1) {
            isAnimating = false;
            return;
        }

        var $oldFirst = $tabs.eq(0);      // current first
        var $last     = $tabs.last();     // will become new first

        // 1) Rotate DOM: last -> front
        $last.prependTo($list);

        var $newFirst = $last;

        // 2) Prepare fade states
        $oldFirst.css({
            transition: 'none',
            opacity: 1
        });

        $newFirst.css({
            transition: 'none',
            opacity: 0
        });

        // 3) Cross-fade: old first fades out, new first fades in
        requestAnimationFrame(function () {
            $oldFirst.css({
                transition: 'opacity ' + duration + 'ms ease-out',
                opacity: 0
            });

            $newFirst.css({
                transition: 'opacity ' + duration + 'ms ease-in',
                opacity: 1
            });
        });

        // 4) After fade: cleanup + update active tab & content
        setTimeout(function () {

            $oldFirst.css({
                transition: '',
                opacity: ''
            });
            $newFirst.css({
                transition: '',
                opacity: ''
            });

            var $firstNow = $list.children('.e-n-tab-title').first();
            var newIndex  = $firstNow.data('tab-index');

            // Headers
            $list.children('.e-n-tab-title')
                .attr('aria-selected', 'false')
                .removeClass('elementor-active');

            $firstNow
                .attr('aria-selected', 'true')
                .addClass('elementor-active');

            // Content
            var $panels = $tabsRoot.find('.e-n-tabs-content > [data-tab-index]');
            $panels.removeClass('e-active');
            $panels.filter('[data-tab-index="' + newIndex + '"]').addClass('e-active');

            isAnimating = false;
        }, duration);
    });

});

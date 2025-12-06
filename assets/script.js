jQuery(function ($) {

    var isAnimating = false;
    var duration = 600; // ms – adjust for slower/faster sliding

    // 1) Setup for each tabs widget
    $('.e-n-tabs').each(function () {
        var $tabsRoot = $(this);
        var $heading  = $tabsRoot.find('.e-n-tabs-heading');
        var $content  = $tabsRoot.find('.e-n-tabs-content');

        // --- HEADER: wrap titles into scrollable list ---
        if ($heading.length && !$heading.find('.e-n-tabs-heading__list').length) {
            var $titles = $heading.children('.e-n-tab-title');
            $titles.wrapAll('<div class="e-n-tabs-heading__list"></div>');
        }

        // Add arrows if not present
        if (!$heading.find('.tab-arrow-left').length) {
            $heading.prepend('<div class="tab-arrow tab-arrow-left" aria-hidden="true">←</div>');
        }
        if (!$heading.find('.tab-arrow-right').length) {
            $heading.append('<div class="tab-arrow tab-arrow-right" aria-hidden="true">→</div>');
        }

        // --- CONTENT: wrap panels in inner for sliding ---
        if ($content.length && !$content.find('.e-n-tabs-content__inner').length) {
            var $panels = $content.children('[data-tab-index]');
            $panels.wrapAll('<div class="e-n-tabs-content__inner"></div>');
        }
    });


    // -------------------------------
    // RIGHT ARROW → slide left (R→L)
    // [1,2,3,4,5,6,7] → [2,3,4,5,6,7,1]
    // -------------------------------
    $(document).on('click', '.tab-arrow-right', function () {
        if (isAnimating) return;
        isAnimating = true;

        var $heading  = $(this).closest('.e-n-tabs-heading');
        var $tabsRoot = $heading.closest('.e-n-tabs');
        var $list     = $heading.find('.e-n-tabs-heading__list');
        var $content  = $tabsRoot.find('.e-n-tabs-content');
        var $inner    = $content.find('.e-n-tabs-content__inner');

        var $tabs   = $list.children('.e-n-tab-title');
        var $panels = $inner.children('[data-tab-index]');

        if ($tabs.length <= 1 || $panels.length <= 1) {
            isAnimating = false;
            return;
        }

        var $firstTab   = $tabs.eq(0);
        var $secondTab  = $tabs.eq(1);
        var $firstPanel = $panels.eq(0);

        if (!$secondTab.length) $secondTab = $firstTab;

        var tabStep = $firstTab.outerWidth(true); // slide distance for header

        // 1) Animate header list & content inner left (R→L)
        $list.css({
            transition: 'transform ' + duration + 'ms ease-in-out',
            transform: 'translateX(-' + tabStep + 'px)'
        });

        // Panels: each is 100% width; slide one full panel
        $inner.css({
            transition: 'transform ' + duration + 'ms ease-in-out',
            transform: 'translateX(-100%)'
        });

        // 2) After animation: reset transform, rotate DOM, update active
        setTimeout(function () {
            // Reset transforms
            $list.css({
                transition: 'none',
                transform: 'translateX(0)'
            });
            $inner.css({
                transition: 'none',
                transform: 'translateX(0)'
            });

            // Rotate header: first → end
            $firstTab.appendTo($list);

            // Rotate content: first panel → end
            $firstPanel.appendTo($inner);

            // New first tab & panel
            var $newFirstTab = $list.children('.e-n-tab-title').first();
            var newIndex     = $newFirstTab.data('tab-index');

            // Update header active state
            $list.children('.e-n-tab-title')
                .attr('aria-selected', 'false')
                .removeClass('elementor-active');
            $newFirstTab
                .attr('aria-selected', 'true')
                .addClass('elementor-active');

            // Update content active state (first panel corresponds to newIndex)
            var $allPanels = $inner.children('[data-tab-index]');
            $allPanels.removeClass('e-active');
            $allPanels.filter('[data-tab-index="' + newIndex + '"]').addClass('e-active');

            isAnimating = false;

        }, duration);
    });


    // --------------------------------
    // LEFT ARROW → slide right (L→R)
    // [...,1,2] → [2,3,4,5,6,7,1] style backwards rotation
    // --------------------------------
    $(document).on('click', '.tab-arrow-left', function () {
        if (isAnimating) return;
        isAnimating = true;

        var $heading  = $(this).closest('.e-n-tabs-heading');
        var $tabsRoot = $heading.closest('.e-n-tabs');
        var $list     = $heading.find('.e-n-tabs-heading__list');
        var $content  = $tabsRoot.find('.e-n-tabs-content');
        var $inner    = $content.find('.e-n-tabs-content__inner');

        var $tabs   = $list.children('.e-n-tab-title');
        var $panels = $inner.children('[data-tab-index]');

        if ($tabs.length <= 1 || $panels.length <= 1) {
            isAnimating = false;
            return;
        }

        var $firstTab   = $tabs.eq(0);
        var $lastTab    = $tabs.last();
        var $firstPanel = $panels.eq(0);
        var $lastPanel  = $panels.last();

        var tabStep = $firstTab.outerWidth(true);

        // 1) Pre-rotate DOM: last → front (header + content)
        $lastTab.prependTo($list);
        $lastPanel.prependTo($inner);

        // 2) Start from offset left by one item, then animate back to 0
        $list.css({
            transition: 'none',
            transform: 'translateX(-' + tabStep + 'px)'
        });
        $inner.css({
            transition: 'none',
            transform: 'translateX(-100%)'
        });

        // 3) Animate back to 0 = visual slide L→R
        requestAnimationFrame(function () {
            $list.css({
                transition: 'transform ' + duration + 'ms ease-in-out',
                transform: 'translateX(0)'
            });
            $inner.css({
                transition: 'transform ' + duration + 'ms ease-in-out',
                transform: 'translateX(0)'
            });
        });

        // 4) After animation: clean up and set active
        setTimeout(function () {

            $list.css({
                transition: 'none',
                transform: 'translateX(0)'
            });
            $inner.css({
                transition: 'none',
                transform: 'translateX(0)'
            });

            var $newFirstTab = $list.children('.e-n-tab-title').first();
            var newIndex     = $newFirstTab.data('tab-index');

            // Header active state
            $list.children('.e-n-tab-title')
                .attr('aria-selected', 'false')
                .removeClass('elementor-active');
            $newFirstTab
                .attr('aria-selected', 'true')
                .addClass('elementor-active');

            // Content active state
            var $allPanels = $inner.children('[data-tab-index]');
            $allPanels.removeClass('e-active');
            $allPanels.filter('[data-tab-index="' + newIndex + '"]').addClass('e-active');

            isAnimating = false;

        }, duration);
    });

});



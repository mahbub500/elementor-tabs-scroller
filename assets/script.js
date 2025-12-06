jQuery(document).ready(function ($) {

    // Add arrows only once
    if (!$('.tab-arrow').length) {
        $('.e-n-tabs-heading').each(function () {
            $(this).append('<div class="tab-arrow tab-arrow-left">←</div>');
            $(this).append('<div class="tab-arrow tab-arrow-right">→</div>');
        });
    }

    // Function to switch tabs
    function switchTab(tabButton) {
        // Remove active state from all tabs and content panels
        $('.e-n-tab-title').attr('aria-selected', 'false').attr('tabindex', '-1');
        $('[id^="e-n-tab-content-"]').removeClass('e-active');

        // Set active state to the selected tab
        tabButton.attr('aria-selected', 'true').attr('tabindex', '0');
        
        // Get the corresponding content panel ID
        let contentId = tabButton.attr('aria-controls');
        $('#' + contentId).addClass('e-active');

        // Scroll the tab into view
        let container = tabButton.closest('.e-n-tabs-heading');
        let scrollLeft = tabButton.position().left + container.scrollLeft() - 50;
        container.animate({ scrollLeft: scrollLeft }, 300);
    }

    // Scroll left and switch to previous tab
    $(document).on("click", ".tab-arrow-left", function () {
        let container = $(this).closest(".e-n-tabs-heading");
        let activeTab = container.find('.e-n-tab-title[aria-selected="true"]');
        let prevTab = activeTab.prev('.e-n-tab-title');

        if (prevTab.length) {
            switchTab(prevTab);
        }
    });

    // Scroll right and switch to next tab
    $(document).on("click", ".tab-arrow-right", function () {
        let container = $(this).closest(".e-n-tabs-heading");
        let activeTab = container.find('.e-n-tab-title[aria-selected="true"]');
        let nextTab = activeTab.next('.e-n-tab-title');

        if (nextTab.length) {
            switchTab(nextTab);
        }
    });

    // Also handle direct tab clicks to ensure proper state management
    $(document).on("click", ".e-n-tab-title", function () {
        switchTab($(this));
    });

});
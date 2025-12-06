<?php
/**
 * Plugin Name: Elementor Tab Scroll Arrows
 * Description: Adds left & right arrows to Elementor tabs and enables scrolling.
 * Version: 1.0
 * Author: Mahbub
 */

if (!defined('ABSPATH')) exit;

class Elementor_Tab_Scroll {

    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_files']);
    }

    public function enqueue_files() {
        // CSS
        wp_enqueue_style(
            'elementor-tab-scroll-style',
            plugin_dir_url(__FILE__) . 'assets/style.css',
            [],
            '1.0'
        );

        // JS
        wp_enqueue_script(
            'elementor-tab-script-js',
            plugin_dir_url(__FILE__) . 'assets/script.js',
            ['jquery'],
            '1.0',
            true
        );
    }
}

new Elementor_Tab_Scroll();

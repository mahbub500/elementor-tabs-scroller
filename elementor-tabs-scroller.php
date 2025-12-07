<?php
/**
 * Plugin Name: Elementor Tab Scroll Arrows
 * Description: Adds left & right arrows to Elementor tabs and enables scrolling with Slick slider.
 * Version: 1.1
 * Author: Mahbub
 */

if (!defined('ABSPATH')) exit;

class Elementor_Tab_Scroll {

    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_files']);
    }

    public function enqueue_files() {
        $plugin_url = plugin_dir_url(__FILE__);

        // Your plugin CSS
        wp_enqueue_style(
            'elementor-tab-scroll-style',
            $plugin_url . 'assets/style.css',
            [],
            '1.1'
        );

        // Slick CSS
        wp_enqueue_style(
            'slick',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
            [],
            '1.8.1'
        );

        wp_enqueue_style(
            'slick-theme',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
            ['slick'],
            '1.8.1'
        );

        // Slick JS
        wp_enqueue_script(
            'slick',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            ['jquery'],
            '1.8.1',
            true
        );

        // Your plugin JS (depends on Slick)
        wp_enqueue_script(
            'elementor-tab-script-js',
            $plugin_url . 'assets/script.js',
            ['jquery', 'slick'],
            '1.1',
            true
        );
    }
}

new Elementor_Tab_Scroll();

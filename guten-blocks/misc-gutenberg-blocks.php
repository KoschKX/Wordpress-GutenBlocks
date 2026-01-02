<?php
/*
Plugin Name: GutenBlocks
Description: Adds a simple Countdown block to the block editor, no build tools required.
Version: 1.0
Author: Gary Angelone Jr.
*/

if (!defined('ABSPATH')) exit;


// Register frontend CSS for countdown block
add_action('init', function() {
    wp_register_style(
        'mgb-countdown-frontend',
        plugins_url('countdown/countdown-frontend.css', __FILE__),
        array(),
        false
    );
}, 9);

// Register block script
add_action('init', function() {
    wp_register_script(
        'mgb-countdown-block',
        plugins_url('countdown/countdown-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        false,
        true
    );
}, 9);

// Register block only once, with style and script
add_action('init', function() {
    if (!WP_Block_Type_Registry::get_instance()->is_registered('mgb/countdown')) {
        register_block_type('mgb/countdown', array(
            'editor_script' => 'mgb-countdown-block',
            'style' => 'mgb-countdown-frontend',
            'render_callback' => 'mgb_countdown_render',
            'attributes' => array(
                'date' => array('type' => 'string', 'default' => ''),
                'label' => array('type' => 'string', 'default' => ''),
                'fancy' => array('type' => 'boolean', 'default' => true),
            ),
        ));
    }
}, 10);


// Register marquee block
add_action('init', function() {
    if (!WP_Block_Type_Registry::get_instance()->is_registered('mgb/marquee')) {
        register_block_type('mgb/marquee', array(
            'editor_script' => 'mgb-marquee-block',
            'render_callback' => 'mgb_marquee_render',
            'attributes' => array(
                'text' => array('type' => 'string', 'default' => ''),
                'speed' => array('type' => 'number', 'default' => 50),
            ),
        ));
    }
}, 10);

// Enqueue marquee frontend JS only when block is used
add_action('wp_enqueue_scripts', function() {
    // Only enqueue if the block is actually on the page
    if (has_block('mgb/marquee')) {
        wp_enqueue_script(
            'mgb-marquee-frontend',
            plugins_url('marquee/marquee-frontend.js', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'marquee/marquee-frontend.js'),
            true
        );
    }
});

// Register marquee block editor script
add_action('init', function() {
    wp_register_script(
        'mgb-marquee-block',
        plugins_url('marquee/marquee-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        filemtime(plugin_dir_path(__FILE__) . 'marquee/marquee-block.js'),
        true
    );
});

// Include the countdown block PHP render function
require_once plugin_dir_path(__FILE__) . 'countdown/countdown.php';
// Include the marquee block PHP render function
require_once plugin_dir_path(__FILE__) . 'marquee/marquee.php';



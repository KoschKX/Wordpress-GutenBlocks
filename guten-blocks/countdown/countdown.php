<?php
// Enqueue countdown script and pass variables for the countdown block
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'mgb-countdown-frontend',
        plugins_url('countdown-frontend.js', __FILE__),
        array(),
        filemtime(__DIR__ . '/countdown-frontend.js'),
        true
    );
});

add_filter('render_block', function($block_content, $block) {
    if ($block['blockName'] === 'misc-gutenberg-blocks/countdown') {
        if (!empty($block['attrs'])) {
            $attributes = $block['attrs'];
            $date        = isset($attributes['date']) ? sanitize_text_field($attributes['date']) : '';
            $fancy       = isset($attributes['fancy']) ? (bool)$attributes['fancy'] : true;
            $showDays    = isset($attributes['showDays']) ? (bool)$attributes['showDays'] : true;
            $showHours   = isset($attributes['showHours']) ? (bool)$attributes['showHours'] : true;
            $showMinutes = isset($attributes['showMinutes']) ? (bool)$attributes['showMinutes'] : true;
            $showSeconds = isset($attributes['showSeconds']) ? (bool)$attributes['showSeconds'] : true;
            $timestamp = strtotime($date) * 1000;
            $id = 'mgb-countdown-' . uniqid('', true);
            wp_localize_script('mgb-countdown-frontend', 'mgbCountdownEnd', $timestamp);
            wp_localize_script('mgb-countdown-frontend', 'mgbCountdownId', $id);
            wp_localize_script('mgb-countdown-frontend', 'mgbCountdownFancy', $fancy);
            wp_localize_script('mgb-countdown-frontend', 'mgbCountdownShow', array(
                'days' => $showDays,
                'hours' => $showHours,
                'minutes' => $showMinutes,
                'seconds' => $showSeconds
            ));
        }
    }
    return $block_content;
}, 10, 2);

function mgb_countdown_render($attributes) {
    $date        = isset($attributes['date']) ? sanitize_text_field($attributes['date']) : '';
    $label       = isset($attributes['label']) ? sanitize_text_field($attributes['label']) : '';
    $showDays    = isset($attributes['showDays']) ? (bool)$attributes['showDays'] : true;
    $showHours   = isset($attributes['showHours']) ? (bool)$attributes['showHours'] : true;
    $showMinutes = isset($attributes['showMinutes']) ? (bool)$attributes['showMinutes'] : true;
    $showSeconds = isset($attributes['showSeconds']) ? (bool)$attributes['showSeconds'] : true;
    $fancy       = isset($attributes['fancy']) ? (bool)$attributes['fancy'] : true;
    $timestamp   = strtotime($date) * 1000;
    $id = 'mgb-countdown-' . uniqid('', true);
    ob_start();
    ?>
    <div class="mgb-countdown-wrapper">
        <div
            id="<?php echo esc_attr($id); ?>"
            class="mgb-countdown-timer"
            data-end="<?php echo esc_attr($timestamp); ?>"
            data-fancy="<?php echo $fancy ? '1' : '0'; ?>"
            data-show-days="<?php echo $showDays ? '1' : '0'; ?>"
            data-show-hours="<?php echo $showHours ? '1' : '0'; ?>"
            data-show-minutes="<?php echo $showMinutes ? '1' : '0'; ?>"
            data-show-seconds="<?php echo $showSeconds ? '1' : '0'; ?>"
        ></div>
        <?php if ($label): ?>
            <div class="mgb-countdown-label"><?php echo esc_html($label); ?></div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}

<?php
function mgb_marquee_render($attributes) {
    $text = isset($attributes['text']) ? esc_html($attributes['text']) : '';
    $speed = isset($attributes['speed']) ? intval($attributes['speed']) : 50;
    $id = 'mgb-marquee-' . uniqid('', true);
    ob_start();
    ?>
    <div class="mgb-marquee-wrapper">
        <div id="<?php echo esc_attr($id); ?>" class="mgb-marquee-text" data-speed="<?php echo $speed; ?>">
            <?php echo $text; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

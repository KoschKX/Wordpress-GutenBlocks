(function() {
    window.addEventListener('DOMContentLoaded', function() {
        var marquees = document.querySelectorAll('.mgb-marquee-text');
        marquees.forEach(function(el) {
            var speed = parseInt(el.getAttribute('data-speed'), 10) || 50;
            var wrapper = el.parentElement;
            el.style.whiteSpace = 'nowrap';
            el.style.display = 'inline-block';
            wrapper.style.overflow = 'hidden';
            var start = wrapper.offsetWidth;
            var end = -el.offsetWidth;
            var pos = start;
            function animate() {
                pos -= speed / 60;
                if (pos < end) pos = start;
                el.style.transform = 'translateX(' + pos + 'px)';
                requestAnimationFrame(animate);
            }
            animate();
        });
    });
})();

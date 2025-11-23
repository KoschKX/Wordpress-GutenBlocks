(function() {
    // Find all countdown timers on the page
    var timers = document.querySelectorAll('.mgb-countdown-timer');
    timers.forEach(function(el) {
        var end = parseInt(el.getAttribute('data-end'), 10);
        var fancy = el.getAttribute('data-fancy') === '1';
        var show = {
            days: el.getAttribute('data-show-days') === '1',
            hours: el.getAttribute('data-show-hours') === '1',
            minutes: el.getAttribute('data-show-minutes') === '1',
            seconds: el.getAttribute('data-show-seconds') === '1'
        };
        function update() {
            var now = Date.now();
            var diff  = Math.max(0, end - now);
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            diff -= days * (1000 * 60 * 60 * 24);
            var hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            var minutes = Math.floor(diff / (1000 * 60));
            diff -= minutes * (1000 * 60);
            var seconds = Math.floor(diff / 1000);
            if (fancy) {
                var html = "";
                if (show.days) {
                    html += `<div class="countdown_box">
                                <div class="mgb-countdown-label">Days</div>
                                <div class="mgb-countdown-value">${days}</div>
                             </div>`;
                }
                if (show.hours) {
                    html += `<div class="countdown_box">
                                <div class="mgb-countdown-label">Hours</div>
                                <div class="mgb-countdown-value">${hours}</div>
                             </div>`;
                }
                if (show.minutes) {
                    html += `<div class="countdown_box">
                                <div class="mgb-countdown-label">Minutes</div>
                                <div class="mgb-countdown-value">${minutes}</div>
                             </div>`;
                }
                if (show.seconds) {
                    html += `<div class="countdown_box">
                                <div class="mgb-countdown-label">Seconds</div>
                                <div class="mgb-countdown-value">${seconds}</div>
                             </div>`;
                }
                el.innerHTML = html;
            } else {
                var text = [];
                if (show.days)    text.push(days + "d");
                if (show.hours)   text.push(hours + "h");
                if (show.minutes) text.push(minutes + "m");
                if (show.seconds) text.push(seconds + "s");
                el.textContent = text.join(" ");
            }
            if (now < end) {
                setTimeout(update, 1000);
            } else {
                el.innerHTML = "Countdown finished!";
            }
        }
        update();
    });
})();

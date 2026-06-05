document.addEventListener('DOMContentLoaded', function() {
    var track = document.getElementById('sliderTrack');
    var dots = document.querySelectorAll('.dot');
    var slides = document.querySelectorAll('.slide');
    var totalSlides = slides.length;
    var currentSlide = 0;
    var timer;

    function changeSlide(index) {
        if (index < 0) {
            index = totalSlides-1;
        }
        if (index >= totalSlides) {
            index = 0;
        }
        currentSlide = index;
        
        var moveX = -(currentSlide * 100);
        track.style.transform = 'translateX('+ moveX + '%)';
        
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = 'dot';
        }
        dots[currentSlide].className = 'dot active';
    }

    document.querySelector('.prev-btn').addEventListener('click', function() {
        changeSlide(currentSlide - 1);
        resetTimer();
    });

    document.querySelector('.next-btn').addEventListener('click', function() {
        changeSlide(currentSlide + 1);
        resetTimer();
    });

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            changeSlide(i);
            resetTimer();
        });
    }

    function startTimer() {
        timer = setInterval(function() {
            changeSlide(currentSlide + 1);
        }, 3000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }
    
    startTimer();

    var startX = 0;
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        clearInterval(timer);
    });

    track.addEventListener('touchend', function(e) {
        var endX = e.changedTouches[0].clientX;
        if (startX-endX > 50) {
            changeSlide(currentSlide + 1);
        }
        if (endX-startX > 50) {
            changeSlide(currentSlide - 1);
        }
        startTimer();
    });
});

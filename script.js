document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('welcome-popup');
    const blurBackground = document.getElementById('background-blur');
    const images = document.querySelectorAll('.zoomable');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const captionTitle = document.getElementById('title');
    const closeBtn = document.getElementById('close');
    const volumeSlider = document.getElementById('volume-slider');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    
    let currentAudio = null;
    let currentIndex = 0;

    let introComplete = false;

    setTimeout(() => {
        popup.classList.add('hidden');
        blurBackground.classList.add('hidden');
        introComplete = true;
    }, 3000);

    modal.style.display = 'none';

    function playAudioAndOpenModal(index) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const image = images[index];
        if (image) {
            modal.style.display = 'flex';
            modalImg.src = image.src;
            captionText.innerHTML = image.getAttribute('data-message');
            captionTitle.innerHTML = image.getAttribute('data-title');

            const audioSrc = image.getAttribute('data-audio');
            currentAudio = new Audio(audioSrc);
            currentAudio.volume = volumeSlider.value;
            currentAudio.play();

            currentAudio.onended = function() {
                closeModal();
                currentIndex = (currentIndex + 1) % images.length;
                playAudioAndOpenModal(currentIndex);
            };
        }
    }

    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (introComplete) {
                currentIndex = index;
                playAudioAndOpenModal(currentIndex);
            }
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        modalImg.classList.remove('zoomed');
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    }

    closeBtn.onclick = function() {
        closeModal();
    };

    modalImg.onload = function() {
        modalImg.classList.add('zoomed');
    };

    volumeSlider.addEventListener('input', function() {
        if (currentAudio) {
            currentAudio.volume = this.value;
        }
    });

    
    nextBtn.onclick = function() {
        currentIndex = (currentIndex + 1) % images.length;
        playAudioAndOpenModal(currentIndex);
    };

   
    backBtn.onclick = function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        playAudioAndOpenModal(currentIndex);
    };
});

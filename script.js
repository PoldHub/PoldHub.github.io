document.addEventListener('DOMContentLoaded', function() {
    const targetDate = new Date('May 12, 2025 20:00:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    function updateCountdown() {
        const now = new Date().getTime();
        
        const timeLeft = targetDate - now;
        
        if (timeLeft <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            clearInterval(timer);
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    
    updateCountdown();
    
    const timer = setInterval(updateCountdown, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const vinile = document.getElementById('vinileRecord');
    const pin = document.getElementById('pinArm');
    
    const audio = new Audio('leak3.mp3');
    
    let isPlaying = false;
    
    pin.addEventListener('click', function() {
        if (!isPlaying) {
            audio.play();
            vinile.classList.add('playing');
            pin.classList.add('playing');
            isPlaying = true;
        } else {
            audio.pause();
            audio.currentTime = 0;
            vinile.classList.remove('playing');
            pin.classList.remove('playing');
            isPlaying = false;
        }
    });
    
    audio.addEventListener('ended', function() {
        vinile.classList.remove('playing');
        pin.classList.remove('playing');
        isPlaying = false;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tvContainer = document.getElementById('tvContainer');
    const donationPopup = document.getElementById('donationPopup');
    const closePopup = document.querySelector('.close-popup');
    const donorsList = document.getElementById('donorsList');
    
    tvContainer.addEventListener('click', function() {
        donationPopup.classList.add('active');
        loadDonorsFromCsv();
    });
    
    closePopup.addEventListener('click', function() {
        donationPopup.classList.remove('active');
    });
    
    donationPopup.addEventListener('click', function(e) {
        if (e.target === donationPopup) {
            donationPopup.classList.remove('active');
        }
    });
    
    function loadDonorsFromCsv() {
        fetch('donatori.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error('File CSV non trovato');
                }
                return response.text();
            })
            .then(csv => {
                const rows = csv.split('\n');
                donorsList.innerHTML = '';
                
                if (rows.length > 1) {
                    for (let i = 1; i < rows.length; i++) {
                        if (rows[i].trim() === '') continue;
                        
                        const columns = rows[i].split(',');
                        if (columns.length >= 3) {
                            const nickname = columns[0].trim();
                            const amount = columns[1].trim();
                            const message = columns[2].trim();
                            
                            const donorItem = document.createElement('div');
                            donorItem.className = 'donor-item';
                            
                            donorItem.innerHTML = `
                                <span class="donor-name">${nickname}</span>
                                <span class="donor-amount">${amount} €</span>
                                ${message ? `<div class="donor-message">${message}</div>` : ''}
                            `;
                            
                            donorsList.appendChild(donorItem);
                        }
                    }
                } else {
                    donorsList.innerHTML = '<p>Nessun donatore al momento. Sii il primo!</p>';
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento del CSV:', error);
                donorsList.innerHTML = '<p>Impossibile caricare la lista dei donatori. Riprova più tardi.</p>';
            });
    }
});

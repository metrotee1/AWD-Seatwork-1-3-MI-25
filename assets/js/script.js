let seatsAvailable = { movie1: 10, movie2: 10 };

window.onload = function() {
    const reservedMovie1 = localStorage.getItem('movie1Reserved');
    const reservedMovie2 = localStorage.getItem('movie2Reserved');
    const movie1Seats = localStorage.getItem('movie1Seats');
    const movie2Seats = localStorage.getItem('movie2Seats');
    if (reservedMovie1) {
        document.getElementById('status_movie1').innerText = reservedMovie1;
    }
    if (reservedMovie2) {
        document.getElementById('status_movie2').innerText = reservedMovie2;
    }
    if (movie1Seats) {
        seatsAvailable.movie1 = 10 - parseInt(movie1Seats);
        document.getElementById('movie1Seats').value = movie1Seats;
    }
    if (movie2Seats) {
        seatsAvailable.movie2 = 10 - parseInt(movie2Seats);
        document.getElementById('movie2Seats').value = movie2Seats;
    }
};

function reserveSeats(movie) {
    const seatsToReserve = parseInt(document.getElementById(`${movie}Seats`).value);
    const statusElement = document.getElementById(`status_${movie}`);

    if (seatsToReserve <= seatsAvailable[movie] && seatsToReserve > 0) {
        seatsAvailable[movie] -= seatsToReserve;
        statusElement.innerText = `Reserved ${seatsToReserve} seats! ${seatsAvailable[movie]} seats left.`;
        localStorage.setItem(`${movie}Reserved`, statusElement.innerText);
        localStorage.setItem(`${movie}Seats`, seatsToReserve);
        hideStatusAfterDelay(statusElement);
    } else {
        statusElement.innerText = `Not enough seats available.`;
        hideStatusAfterDelay(statusElement);
    }
}

function unreserveSeats(movie) {
    const seatsToUnreserve = parseInt(document.getElementById(`${movie}Seats`).value);
    const statusElement = document.getElementById(`status_${movie}`);

    if (seatsToUnreserve <= 10 - seatsAvailable[movie] && seatsToUnreserve > 0) {
        seatsAvailable[movie] += seatsToUnreserve;
        statusElement.innerText = `Unreserved ${seatsToUnreserve} seats. ${seatsAvailable[movie]} seats available now.`;
        localStorage.setItem(`${movie}Reserved`, statusElement.innerText);
        localStorage.setItem(`${movie}Seats`, 10 - seatsAvailable[movie]);
        hideStatusAfterDelay(statusElement);
    } else {
        statusElement.innerText = `Can't unreserve more seats than reserved.`;
        hideStatusAfterDelay(statusElement);
    }
}

function hideStatusAfterDelay(statusElement) {
    setTimeout(() => {
        statusElement.innerText = '';
    }, 5000);
}
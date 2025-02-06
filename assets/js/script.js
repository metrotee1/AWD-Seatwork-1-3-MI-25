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

    if (seatsToReserve <= seatsAvailable[movie] && seatsToReserve > 0 && seatsToReserve <= 10) {
        seatsAvailable[movie] -= seatsToReserve;
        statusElement.innerText = `Reserved ${seatsToReserve} seats! ${seatsAvailable[movie]} seats left.`;
        localStorage.setItem(`${movie}Reserved`, statusElement.innerText);
        localStorage.setItem(`${movie}Seats`, seatsToReserve);

        document.getElementById(`payment_${movie}`).style.display = 'block';
        document.getElementById(`seat-arrangement${movie}`).style.display = 'block';

        hideStatusAfterDelay(statusElement);
    } else {
        statusElement.innerText = `Not enough seats available. Max 10 seats per movie.`;
        hideStatusAfterDelay(statusElement);
    }
}

function unreserveSeats(movie) {
    const statusElement = document.getElementById(`status_${movie}`);
    const seatsToUnreserve = parseInt(document.getElementById(`${movie}Seats`).value);

    if (seatsToUnreserve > 0 && seatsAvailable[movie] + seatsToUnreserve <= 10) {
        seatsAvailable[movie] += seatsToUnreserve;
        if (seatsAvailable[movie] > 10) {
            seatsAvailable[movie] = 10;
        }

        statusElement.innerText = `Reservation removed. ${seatsAvailable[movie]} seats available.`;

        document.getElementById(`payment_${movie}`).style.display = 'none';
        document.getElementById(`seat-arrangement${movie}`).style.display = 'none';
        localStorage.removeItem(`${movie}Reserved`);
        localStorage.removeItem(`${movie}Seats`);

        hideStatusAfterDelay(statusElement);
    }
}

function hideStatusAfterDelay(element) {
    setTimeout(function() {
        element.innerText = '';
    }, 3000);
}

function payForSeats(movie) {
    const reservedSeats = parseInt(localStorage.getItem(`${movie}Seats`));
    const totalPrice = reservedSeats * 250;
    document.getElementById("payment-message").innerText = `You reserved ${reservedSeats} seats for a total of PHP ${totalPrice}.`;

    document.getElementById("payment-modal").style.display = 'block';
}

function closePaymentModal() {
    document.getElementById("payment-modal").style.display = 'none';
}

function closeSeatArrangement(movie) {
    document.getElementById(`seat-arrangement${movie}`).style.display = 'none';
}

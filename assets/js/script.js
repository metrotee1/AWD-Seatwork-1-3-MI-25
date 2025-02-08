document.addEventListener("DOMContentLoaded", function() {
    initializeSeatGrids();
});

function initializeSeatGrids() {
    const movieIds = ["movie1", "movie2"];
    
    movieIds.forEach(movieId => {
        const seatGrid = document.getElementById('seat-grid');
        if (!seatGrid) return;
        
        seatGrid.innerHTML = "";
        
        for (let i = 1; i <= 10; i++) {
            const seat = document.createElement("div");
            seat.classList.add("seat", "available");
            seat.textContent = i;
            seat.dataset.movie = movieId;
            seat.dataset.seatNumber = i;
            seat.addEventListener("click", () => toggleSeatSelection(seat));
            seatGrid.appendChild(seat);
        }
    });
}

function toggleSeatSelection(seat) {
    if (seat.classList.contains("reserved")) return;
    seat.classList.toggle("selected");
}

function openSeatSelectionPopup(movieId) {
    document.getElementById('seat-selection-popup').style.display = 'flex';
    document.getElementById('movie-id').value = movieId;
    initializeSeatGrids();
}

function closePopup() {
    document.getElementById('seat-selection-popup').style.display = 'none';
}

function confirmReservation() {
    const movieId = document.getElementById('movie-id').value;
    const selectedSeats = document.querySelectorAll(`#seat-grid .seat.selected`);
    if (selectedSeats.length === 0 || selectedSeats.length > 5) {
        alert("Please select between 1 to 5 seats.");
        return;
    }
    
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("reserved");
    });

    closePopup();
    showReceiptModal();
}

function showReceiptModal() {
    const movieId = document.getElementById('movie-id').value;
    const reservedSeats = document.querySelectorAll(`#seat-grid .seat.reserved`);
    const seatNumbers = Array.from(reservedSeats).map(seat => seat.textContent);
    const totalPrice = reservedSeats.length * 250;
    
    document.getElementById('receipt-details').textContent = 
        `You have selected seat(s) ${seatNumbers.join(", ")} for the movie.`;
    document.getElementById('receipt-total').textContent = `Total Price: PHP ${totalPrice}`;

    document.getElementById('receipt-modal').style.display = 'flex';
}

function confirmPayment() {
    alert("Payment Successful! Your seats are now confirmed.");
    document.getElementById('receipt-modal').style.display = 'none';
    resetReservedSeats();
}

function cancelPayment() {
    alert("Reservation Cancelled.");
    document.getElementById('receipt-modal').style.display = 'none';
    resetReservedSeats();
}

function resetReservedSeats() {
    const reservedSeats = document.querySelectorAll('.seat.reserved');
    reservedSeats.forEach(seat => {
        seat.classList.remove("reserved");
    });
}

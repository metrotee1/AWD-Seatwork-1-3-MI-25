document.addEventListener("DOMContentLoaded", function() {
    loadReservedSeats();
    initializeSeatGrids();
});

function initializeSeatGrids() {
    const seatGrid = document.getElementById('seat-grid');
    if (!seatGrid) return;

    seatGrid.innerHTML = "";

    for (let i = 1; i <= 10; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = i;
        seat.dataset.seatNumber = i;
        
        if (isSeatReserved(i)) {
            seat.classList.add("reserved");
            seat.style.cursor = "not-allowed";
        } else {
            seat.classList.add("available");
            seat.addEventListener("click", () => toggleSeatSelection(seat));
        }
        seatGrid.appendChild(seat);
    }
}

function toggleSeatSelection(seat) {
    if (seat.classList.contains("reserved")) return;
    seat.classList.toggle("selected");
}

function openSeatSelectionPopup() {
    document.getElementById('seat-selection-popup').style.display = 'flex';
    initializeSeatGrids();
}

function closePopup() {
    document.getElementById('seat-selection-popup').style.display = 'none';
}

function confirmReservation() {
    const selectedSeats = document.querySelectorAll(`#seat-grid .seat.selected`);
    if (selectedSeats.length === 0 || selectedSeats.length > 5) {
        alert("Please select between 1 to 5 seats.");
        return;
    }
    
    selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("reserved");
        seat.style.cursor = "not-allowed";
        saveSeatToLocalStorage(seat.dataset.seatNumber);
    });

    closePopup();
    showReceiptModal(selectedSeats.length);
}

function showReceiptModal(seatCount) {
    const totalPrice = seatCount * 250;
    document.getElementById('receipt-total').textContent = `Total Price: PHP ${totalPrice}`;
    document.getElementById('receipt-modal').style.display = 'flex';
}

function confirmPayment() {
    alert("Payment Successful! Your seats are now confirmed.");
    document.getElementById('receipt-modal').style.display = 'none';
}

function cancelPayment() {
    alert("Reservation Cancelled.");
    document.getElementById('receipt-modal').style.display = 'none';
}

function saveSeatToLocalStorage(seatNumber) {
    let reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    reservedSeats.push(seatNumber);
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
}

function loadReservedSeats() {
    let reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    reservedSeats.forEach(seatNumber => {
        const seat = document.querySelector(`.seat[data-seat-number='${seatNumber}']`);
        if (seat) {
            seat.classList.add("reserved");
            seat.style.cursor = "not-allowed";
        }
    });
}

function isSeatReserved(seatNumber) {
    let reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    return reservedSeats.includes(seatNumber.toString());
}
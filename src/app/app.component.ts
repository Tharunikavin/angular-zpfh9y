import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats = Array.from({ length: 80 }, (_, index) => ({
    seatNumber: index + 1,
    status: 'available'
  }));

  bookSeats(requestedSeats: number): void {
    if (requestedSeats <= 0 || requestedSeats > 7) {
      alert('You can book 1 to 7 seats only.');
      return;
    }

    let seatsToBook = [];
    for (let row = 0; row < 11; row++) {
      const rowSeats = this.getRowSeats(row);
      const availableSeats = rowSeats.filter(seat => seat.status === 'available');

      if (availableSeats.length >= requestedSeats) {
        seatsToBook = availableSeats.slice(0, requestedSeats);
        break;
      }
    }

    if (seatsToBook.length < requestedSeats) {
      const allAvailableSeats = this.seats.filter(seat => seat.status === 'available');
      seatsToBook = allAvailableSeats.slice(0, requestedSeats);
    }

    if (seatsToBook.length < requestedSeats) {
      alert('Not enough seats available.');
      return;
    }

    seatsToBook.forEach(seat => (seat.status = 'booked'));
    alert(`Seats booked: ${seatsToBook.map(seat => seat.seatNumber).join(', ')}`);
  }

  getRowSeats(row: number): any[] {
    const start = row * 7;
    const end = row === 10 ? start + 3 : start + 7;
    return this.seats.slice(start, end);
  }
}


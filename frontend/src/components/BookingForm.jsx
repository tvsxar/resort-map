import { useState } from "react";

function BookingForm({ selectedCabana, onCabanaSelect, bookCabana }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [bookingError, setBookingError] = useState("");

  function onChange(e) {
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "room") setRoom(e.target.value);
  }

  async function onBook(e) {
    e.preventDefault();

    if (!name.trim() || !room.trim()) {
      setBookingError("Please provide all required fields");
      return;
    }

    setBookingError("");

    try {
      await bookCabana(name, room, selectedCabana);
      onCabanaSelect(null);
    } catch (error) {
      setBookingError(error.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={onBook}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="text-xl font-semibold text-stone-900">Book a cabana</h2>

        <p className="mt-1 text-sm text-stone-500">
          Selected cabana: {selectedCabana}
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">
              Guest name
            </span>

            <input
              type="text"
              name="name"
              onChange={onChange}
              value={name}
              placeholder="Enter guest name"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">
              Room number
            </span>

            <input
              type="text"
              name="room"
              onChange={onChange}
              value={room}
              inputMode="numeric"
              placeholder="Enter room number"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onCabanaSelect(null)}
            className="rounded-lg border border-stone-300 cursor-pointer px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-amber-700 px-4 py-2 cursor-pointer text-sm font-medium text-white transition hover:bg-amber-800"
          >
            Book
          </button>
        </div>

        <div className="text-red-500 font-semibold">{bookingError}</div>
      </form>
    </div>
  );
}

export default BookingForm;

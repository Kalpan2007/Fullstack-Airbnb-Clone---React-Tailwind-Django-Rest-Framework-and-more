import Image from "next/image";
import Link from "next/link";

const reservations = [
  {
    id: "1",
    start_date: "2024-01-10",
    end_date: "2024-01-15",
    number_of_nights: 5,
    total_price: 1000,
    property: {
      id: "1",
      title: "Property name",
      image_url: "/beach_1.jpg",
    },
  },
  {
    id: "2",
    start_date: "2024-02-01",
    end_date: "2024-02-04",
    number_of_nights: 3,
    total_price: 600,
    property: {
      id: "2",
      title: "Property name",
      image_url: "/beach_1.jpg",
    },
  },
];

const MyReservationsPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My reservations</h1>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
          >
            <div className="col-span-1">
              <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                  fill
                  src={reservation.property.image_url}
                  className="hover:scale-110 object-cover transition h-full w-full"
                  alt="Beach house"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

              <p className="mb-2">
                <strong>Check in date:</strong> {reservation.start_date}
              </p>
              <p className="mb-2">
                <strong>Check out date:</strong> {reservation.end_date}
              </p>
              <p className="mb-2">
                <strong>Number of nights:</strong> {reservation.number_of_nights}
              </p>
              <p className="mb-2">
                <strong>Total price:</strong> ${reservation.total_price}
              </p>

              <Link
                href={`/properties/${reservation.property.id}`}
                className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
              >
                Go to property
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyReservationsPage;

import Image from "next/image";
import Link from "next/link";

import { getAccessToken } from "@/app/lib/actions";

const MyFavoritesPage = async () => {
    const token = await getAccessToken();

    const res = await fetch(`http://localhost:8000/api/myfavorites/`, {
        cache: 'no-store',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    const favorites = Array.isArray(data?.data) ? data.data : [];

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My favorites</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-500">You have no favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {favorites.map((property: any) => (
                        <Link
                            key={property.id}
                            href={`/properties/${property.id}`}
                            className="cursor-pointer"
                        >
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                    fill
                                    src={property.image_url}
                                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                                    className="hover:scale-110 object-cover transition h-full w-full"
                                    alt="Favorite property"
                                />
                            </div>

                            <div className="mt-2">
                                <p className="text-lg font-bold">{property.title}</p>
                            </div>

                            <div className="mt-2">
                                <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyFavoritesPage;

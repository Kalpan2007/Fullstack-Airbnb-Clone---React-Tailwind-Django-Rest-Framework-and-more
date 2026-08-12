import Image from "next/image";
import { Suspense } from "react";

import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import { getUserId } from "@/app/lib/actions";

const LandlordDetailPage = async ({params}: { params: Promise<{id: string }> }) => {
    const { id } = await params;
    const userId = await getUserId();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${id}/`, {
        cache: 'no-store',
    });
    const landlord = await res.json();

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        {landlord.avatar_url ? (
                            <Image
                                src={landlord.avatar_url}
                                width={200}
                                height={200}
                                alt={landlord.name}
                                className="rounded-full"
                            />
                        ) : (
                            <div className="w-[150px] h-[150px] rounded-full bg-gray-200 flex items-center justify-center">
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-20 h-20 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </div>
                        )}

                        <h1 className="mt-6 text-2xl">{landlord.name}</h1>

                        <ContactButton userId={userId} landlordId={id} />
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Suspense fallback={<div>Loading...</div>}>
                            <PropertyList landlord_id={id} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LandlordDetailPage;

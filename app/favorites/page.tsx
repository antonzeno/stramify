import getFavorites from "@/actions/getFavorites";
import Header from "@/components/Header";
import Image from "next/image";
import FavContent from "./components/FavContent";

export const revalidate = 0;

const Favorites = async () => {
    const songs = await getFavorites();

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image fill src={"/playlist.webp"} alt={"Playlist"} className="object-cover" />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-2 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">Playlist</p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Favorites</h1>
                        </div>
                    </div>
                </div>
            </Header>
            <FavContent songs={songs} />
        </div>
    );
};

export default Favorites;

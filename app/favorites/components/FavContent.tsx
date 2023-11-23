"use client";
import FavButton from "@/components/FavButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface FavContentProps {
    songs: Song[];
}

const FavContent: React.FC<FavContentProps> = ({ songs }) => {
    const router = useRouter();
    const onPlay = useOnPlay(songs);
    const { isLoading, user } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No favorites.</div>;
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div className="flex items-center gap-x-4 w-full">
                    <div className="flex-1 ">
                        <MediaItem onClick={() => onPlay(song.id)} data={song} />
                    </div>
                    <FavButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default FavContent;

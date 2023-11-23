"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavButtonProps {
    songId: string;
}

const FavButton: React.FC<FavButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = useUser();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const fetchData = async () => {
        const { data, error } = await supabaseClient.from("liked_songs").select("*").eq("user_id", user?.id).eq("song_id", songId).single();

        if (!error && data) {
            setIsFav(true);
        }
    };

    const Icon = isFav ? AiFillHeart : AiOutlineHeart;

    const handleFav = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isFav) {
            const { error } = await supabaseClient.from("liked_songs").delete().eq("user_id", user?.id).eq("song_id", songId);
            if (error) {
                toast.error(error.message);
            } else {
                setIsFav(false);
                toast.success("Removed from favorites.");
            }
        } else {
            const { error } = await supabaseClient.from("liked_songs").insert({
                song_id: songId,
                user_id: user?.id,
            });

            if (error) {
                toast.error(error.message);
            } else {
                setIsFav(true);
                toast.success("Added to favorites.");
            }
        }

        router.refresh();
    };

    return (
        <button className="hover:opacity-75 transition" onClick={handleFav}>
            <Icon color={isFav ? "#22c55e" : "white"} size={25} />
        </button>
    );
};

export default FavButton;

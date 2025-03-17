'use client';

import { fetchCommentAPI, postCommentAPI } from "@/services/customer_request/api-service";
import { CommentUser } from "@/services/customer_request/definition";
import { useAppSelector } from "@/stores/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const HiringPostDetailCommentsTab = () => {
    const { id } = useParams(); // Get the dynamic id from the URL - post id
    const postIdNumber = Number(id);
    const [comments, setComments] = useState<CommentUser[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const user = useAppSelector((state) => state.userSlice.user);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await fetchCommentAPI(postIdNumber);
                setComments(fetchedComments);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, [postIdNumber]);

    const handleCreateComment = async () => {
        if (!newComment.trim()) return;
        if (!user) {
            alert("Cần phải đăng nhập trước !");
            return;
        }

        const commentData: CommentUser = {
            id: Date.now(), // Temporary ID for rendering purposes
            createdAt: new Date().toISOString(),
            userName: user.firstName + user.lastName, // Assuming user object has a name field
            content: newComment,
            postId: postIdNumber,
        };

        try {
            await postCommentAPI(commentData);
            setComments([...comments, commentData]);
            setNewComment("");
        } catch (error) {
            console.error("Lỗi khi tạo bình luận:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[75vh] p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6">Bàn luận</h2>
            <div className="max-h-[400px] overflow-y-auto space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                            <div className="font-semibold text-gray-800">{comment.userName}</div>
                            <div className="ml-auto text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Viết bình luận vào đây ..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    onClick={handleCreateComment}
                >
                    Gửi
                </button>
            </div>
        </div>
    );
    
};

export default HiringPostDetailCommentsTab;

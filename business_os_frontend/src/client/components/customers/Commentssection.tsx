import React, { useState, useEffect } from "react";

// =============================================
// Types
// =============================================

interface Comment {
  id: number;
  customer_id: number;
  type: "manual" | "activity";
  comment_text: string;
  created_by: number | null;
  created_by_name?: string;
  created_at: string;
  updated_at: string | null;
}

interface CommentsSectionProps {
  customerId: string | number;
}

const API = "http://localhost:5000/api";

// Decode the JWT payload client-side (no verification needed here — just to
// read userId for UI ownership checks; the backend independently verifies
// the token signature on every request).
const getCurrentUserId = (): number | null => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.userId ?? null;
  } catch {
    return null;
  }
};

// =============================================
// Component
// =============================================

const CommentsSection: React.FC<CommentsSectionProps> = ({ customerId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const currentUserId = getCurrentUserId();

  const authHeaders = (): HeadersInit => {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    fetchComments();
  }, [customerId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/customers/${customerId}/comments`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (err) {
      console.error("Fetch comments error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/customers/${customerId}/comments`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ comment_text: newComment.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNewComment("");
        await fetchComments();
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (err) {
      console.error("Add comment error:", err);
      alert("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.comment_text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async (commentId: number) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(`${API}/customers/${customerId}/comments/${commentId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ comment_text: editText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        cancelEdit();
        await fetchComments();
      } else {
        alert(data.message || "Failed to update comment");
      }
    } catch (err) {
      console.error("Update comment error:", err);
      alert("Failed to update comment");
    }
  };

  const handleDelete = async (commentId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/customers/${customerId}/comments/${commentId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        await fetchComments();
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete comment error:", err);
      alert("Failed to delete comment");
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h3 className="text-gray-900 text-base font-semibold mb-4">Comments & Activity</h3>

      {/* Add comment box */}
      <div className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            onClick={handleAddComment}
            disabled={submitting || !newComment.trim()}
          >
            {submitting ? "Adding..." : "Add Comment"}
          </button>
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <div className="text-center text-gray-500 text-sm py-6">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-6">No comments or activity yet</div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => {
            const isActivity = comment.type === "activity";
            const isOwner = comment.created_by === currentUserId;

            return (
              <div
                key={comment.id}
                className={`flex gap-3 ${isActivity ? "" : "bg-gray-50 rounded-lg p-3"}`}
              >
                {/* Icon */}
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isActivity ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white"
                  }`}
                >
                  {isActivity ? "⚙" : (comment.created_by_name?.charAt(0).toUpperCase() || "U")}
                </div>

                <div className="flex-1 min-w-0">
                  {isActivity ? (
                    <p className="text-sm text-gray-500 italic">{comment.comment_text}</p>
                  ) : editingId === comment.id ? (
                    <div>
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleSaveEdit(comment.id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-100"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {comment.created_by_name || "User"}
                        </span>
                        {isOwner && (
                          <div className="flex gap-3 shrink-0">
                            <button
                              className="text-xs text-blue-600 hover:underline"
                              onClick={() => startEdit(comment)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-xs text-red-600 hover:underline"
                              onClick={() => handleDelete(comment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap break-words">
                        {comment.comment_text}
                      </p>
                    </>
                  )}
                  <span className="text-xs text-gray-400 mt-1 block">
                    {formatDateTime(comment.created_at)}
                    {comment.updated_at ? " (edited)" : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
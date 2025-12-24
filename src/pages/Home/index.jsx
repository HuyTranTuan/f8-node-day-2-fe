import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { appendPosts, selectPosts, setPosts } from "@/features/posts";
import {
  appendComments,
  selectComments,
  setComments,
} from "@/features/comments";
import { postsServices, commentsServices } from "@/services";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({ title: "", content: "" });

  const [isOpenComment, setIsOpenComment] = useState(false);
  const [currentComment, setCurrentComment] = useState({
    postId: "",
    content: "",
  });

  /////////////////////////////////
  /////////////POST////////////////
  /////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPost.title) toast.error("title is empty");
    try {
      const response = await postsServices.addPost(currentPost);
      dispatch(appendPosts(response.data));
      setCurrentPost({ title: "", content: "" });

      toast.success("Added post!");
    } catch (error) {
      toast.error("Error adding post:", error);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!currentPost.title) toast.error("title is empty");
    try {
      await postsServices.editPost(currentPost.id, {
        title: currentPost.title,
        content: currentPost.content,
      });

      const response = await postsServices.getPosts();
      const posts = response.data || [];

      dispatch(setPosts(posts));
      setCurrentPost({ title: "", content: "" });
      setIsOpen(false);
      toast.success("Edited post!");
    } catch (error) {
      toast.error("Error edit post:", error);
    }
  };

  const handleDetele = async (post) => {
    try {
      await postsServices.deletePost(post.id);
      setCurrentPost({ title: "", content: "" });
      const response = await postsServices.getPosts();
      const posts = response.data || [];

      dispatch(setPosts(posts));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Error delete post:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsOpenComment(false);
    setCurrentPost({ title: "", content: "" });
  };

  const handleOpen = (post) => {
    setIsOpen(true);
    setIsOpenComment(false);
    setCurrentPost(post);
  };

  /////////////////////////////////////
  //////////////Comment////////////////
  ////////////////////////////////////
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!currentComment.postId) toast.error("postId is empty");
    console.log(currentComment);
    try {
      const response = await commentsServices.addComment(currentComment);
      dispatch(appendComments(response.data));
      setCurrentComment({ postId: "", content: "" });

      toast.success("Added comment!");
    } catch (error) {
      toast.error("Error adding comment:", error);
    }
  };
  const handleSubmitEditComment = async (e) => {
    e.preventDefault();
    try {
      await commentsServices.editComment(currentComment.id, {
        content: currentComment.content,
      });

      const response = await commentsServices.getComments();
      const comments = response.data || [];

      dispatch(setComments(comments));
      setCurrentComment({ postId: "", content: "" });
      setIsOpenComment(false);
      toast.success("Edited comment!");
    } catch (error) {
      toast.error("Error edit comment:", error);
    }
  };

  const handleDeteleComment = async (comment) => {
    try {
      await commentsServices.deleteComment(comment.id);
      setCurrentComment({ postId: "", content: "" });
      const response = await commentsServices.getComments();
      const comments = response.data || [];

      dispatch(setComments(comments));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Error delete comment:", error);
    }
  };

  const handleCloseModalComment = () => {
    setIsOpen(false);
    setIsOpenComment(false);
    setCurrentComment({ postId: "", content: "" });
  };

  const handleOpenComment = (comment) => {
    setIsOpen(false);
    setIsOpenComment(true);
    setCurrentComment(comment);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await postsServices.getPosts();
        const posts = response.data || [];

        dispatch(setPosts(posts));
      } catch (error) {
        toast.error("Failed to fetch posts:", error);
      }
    })();
    (async () => {
      try {
        const response = await commentsServices.getComments();
        const comments = response.data || [];

        dispatch(setComments(comments));
      } catch (error) {
        toast.error("Failed to fetch comments:", error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="w-full h-full p-6">
      <div className="m-auto p-6 w-[80%]">
        <h2 className="text-2xl font-bold">Post List</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex justify-between items-center border border-b-black p-6"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="postTitle">Post title:</label>
            <input
              id="postTitle"
              type="text"
              placeholder="Enter post title"
              value={currentPost.title}
              onInput={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
              className="border border-amber-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="postContent">Post Content:</label>
            <textarea
              id="postContent"
              type="text"
              placeholder="Enter post content"
              value={currentPost.content}
              onInput={(e) =>
                setCurrentPost({ ...currentPost, content: e.target.value })
              }
              className="border border-amber-200"
            />
          </div>
          <button
            type="submit"
            className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
          >
            Add post
          </button>
        </form>
      </div>
      <ul className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <li
                key={post.id}
                className="w-[80%] flex justify-between m-auto shadow-lg p-1.5 rounded-md"
              >
                <div>
                  <span>Post id: {post.id}</span>
                  <h3>Title: {post.title}</h3>
                  <p>Content: {post.content}</p>
                </div>
                <div className="flex gap-0.5">
                  <Button
                    className="px-3! h-fit! py-2! border-2 bg-cyan-700 rounded-xl hover:bg-cyan-600!"
                    onClick={() => handleOpen(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="px-3! h-fit! py-2! border-2 bg-red-700 rounded-xl hover:bg-red-600!"
                    onClick={() => handleDetele(post)}
                  >
                    Del
                  </Button>
                </div>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
      <div className="m-auto p-6 w-[80%]">
        <h2 className="text-2xl font-bold">Comment List</h2>
        <form
          onSubmit={(e) => handleSubmitComment(e)}
          className="flex justify-between items-center border border-b-black p-6"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="commentPID">Post ID:</label>
            <input
              id="commentPID"
              type="text"
              placeholder="Enter post ID"
              value={currentComment.postId}
              onInput={(e) =>
                setCurrentComment({
                  ...currentComment,
                  postId: e.target.value,
                })
              }
              className="border border-amber-200 w-full h-10 overflow-y-auto"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="commentContent">Comment content:</label>
            <textarea
              id="commentContent"
              type="text"
              placeholder="Enter content"
              value={currentComment.content}
              onInput={(e) =>
                setCurrentComment({
                  ...currentComment,
                  content: e.target.value,
                })
              }
              className="border border-amber-200 w-full h-10 overflow-y-auto"
            />
          </div>

          <button
            type="submit"
            className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
          >
            Add comment
          </button>
        </form>
      </div>
      <ul className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <li
                key={comment.id}
                className="w-[80%] flex justify-between m-auto shadow-lg p-1.5 rounded-md"
              >
                <div>
                  <h3>Comment id: {comment.id}</h3>
                  <span>Post id: {comment.postId}</span>
                  <p>Content: {comment.content}</p>
                </div>
                <div className="flex gap-0.5">
                  <Button
                    onClick={() => handleOpenComment(comment)}
                    className="px-3! h-fit! py-2! border-2 bg-cyan-700 rounded-xl hover:bg-cyan-600!"
                  >
                    Edit
                  </Button>
                  <Button
                    className="px-3! h-fit! py-2! border-2 bg-red-700 rounded-xl hover:bg-red-600!"
                    onClick={() => handleDeteleComment(comment)}
                  >
                    Del
                  </Button>
                </div>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <form
          onSubmit={(e) => handleSubmitEdit(e)}
          className="flex flex-col justify-between gap-2"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="postTitle">Post title:</label>
            <input
              id="postTitle"
              type="text"
              placeholder="Enter post title"
              value={currentPost.title}
              onInput={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
              className="border border-amber-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="postContent">Post Content:</label>
            <textarea
              id="postContent"
              type="text"
              placeholder="Enter post content"
              value={currentPost.content}
              onInput={(e) =>
                setCurrentPost({ ...currentPost, content: e.target.value })
              }
              className="border border-amber-200"
            />
          </div>
          <button
            type="submit"
            className="px-3! h-fit! py-2! border-2 bg-cyan-700 rounded-xl"
          >
            Edit post
          </button>
        </form>
      </Modal>
      <Modal isOpen={isOpenComment} onRequestClose={handleCloseModalComment}>
        <form
          onSubmit={(e) => handleSubmitEditComment(e)}
          className="flex flex-col justify-between gap-2"
        >
          <div>
            <label htmlFor="commentContent">Comment content:</label>
            <textarea
              id="commentContent"
              type="text"
              placeholder="Enter content"
              value={currentComment.content}
              onInput={(e) =>
                setCurrentComment({
                  ...currentComment,
                  content: e.target.value,
                })
              }
              className="border border-amber-200 w-full h-10 overflow-y-auto"
            />
          </div>
          <button
            type="submit"
            className="px-3! h-fit! py-2! border-2 bg-cyan-700 rounded-xl"
          >
            Edit comment
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default Home;

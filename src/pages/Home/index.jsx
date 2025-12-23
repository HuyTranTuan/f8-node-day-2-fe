import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  appendPosts,
  removePostFromList,
  selectPosts,
  setPosts,
  updatePost,
} from "@/features/posts";
import { selectComments, setComments } from "@/features/comments";
import { postsServices, commentsServices } from "@/services";
import Modal from "@/components/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);

  const [postTitle, setPostTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const [commentPID, setCommentPID] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const handleChangeTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: postTitle,
    };

    try {
      const response = await postsServices.addPost(postData);

      setPostTitle("");
      dispatch(appendPosts(response.data));
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const postData = {
      title: postTitle,
    };

    try {
      const response = await postsServices.getPosts(currentPost.id, postData);

      setPostTitle("");
      setCurrentPost({});
      dispatch(updatePost(response.data));
      setIsOpen(false);
    } catch (error) {
      console.error("Error edit post:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const postData = {
      title: postTitle,
    };

    try {
      const response = await postsServices.addPost(postData);

      setPostTitle("");
      dispatch(appendPosts(response.data));
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const handleSubmitEditComment = async (e) => {
    e.preventDefault();
    const postData = {
      title: postTitle,
    };

    try {
      const response = await postsServices.getPosts(currentPost.id, postData);

      setPostTitle("");
      setCurrentPost({});
      dispatch(updatePost(response.data));
      setIsOpen(false);
    } catch (error) {
      console.error("Error edit post:", error);
    }
  };

  const handleDetele = async (post) => {
    try {
      postsServices.getPosts(post.id);
      dispatch(removePostFromList(post.id));
    } catch (error) {
      console.error("Error delete post:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentPost({});
  };

  const handleCloseModalComment = () => {
    setIsOpenComment(false);
    setCurrentComment({});
  };

  const handleOpen = (post) => {
    setIsOpen(true);
    selectPosts(post);
    setPostTitle(post.title);
  };

  const handleOpenComment = (comment) => {
    setIsOpenComment(true);
    selectComments(comment);
    setCommentContent(comment.content);
    setCommentPID(comment.userID);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await postsServices.getPosts();
        const posts = response.data || [];

        dispatch(setPosts(posts));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    })();
    (async () => {
      try {
        const response = await commentsServices.getComments();
        const comments = response.data || [];

        dispatch(setComments(comments));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="w-full h-full p-6">
      <div className="border border-b-black p-6">
        <div className="m-auto p-6 w-[80%]">
          <h1>Post List</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-between"
          >
            <div>
              <label htmlFor="postTitle">Post title:</label>
              <input
                id="postTitle"
                type="text"
                placeholder="Enter post title"
                value={postTitle}
                onInput={handleChangeTitle}
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
                <li key={post.id} className="w-full flex justify-between">
                  <div>
                    <span>{post.id}</span>
                    <h3>{post.title}</h3>
                  </div>
                  <div className="flex gap-0.5">
                    <button
                      onClick={() => handleOpen(post)}
                      className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
                    >
                      edit
                    </button>
                    <button
                      className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
                      onClick={() => handleDetele(post)}
                    >
                      del
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="border border-b-black p-6">
        <div className="m-auto p-6 w-[80%]">
          <h1>Comment List</h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-between"
          >
            <div>
              <label htmlFor="commentPID">Post ID:</label>
              <input
                id="commentPID"
                type="text"
                placeholder="Enter post ID"
                value={commentPID}
                onInput={handleChangeTitle}
                className="border border-amber-200 w-full h-10 overflow-y-auto"
              />
            </div>
            <div>
              <label htmlFor="commentContent">Comment content:</label>
              <textarea
                id="commentContent"
                type="text"
                placeholder="Enter content"
                value={commentContent}
                onInput={handleChangeTitle}
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
                <li key={comment.id} className="w-full flex justify-between">
                  <div>
                    <h3>{comment.id}</h3>
                    <p>{comment.content}</p>
                  </div>
                  <div className="flex gap-0.5">
                    <button
                      onClick={() => handleOpenComment(comment)}
                      className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
                    >
                      edit
                    </button>
                    <button
                      className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
                      onClick={() => handleDetele(comment)}
                    >
                      del
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
      <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
        <form
          onSubmit={(e) => handleSubmitEdit(e)}
          className="flex justify-between"
        >
          <div>
            <label htmlFor="postTitle">Post title:</label>
            <input
              id="postTitle"
              type="text"
              placeholder="Enter post title"
              value={postTitle}
              onInput={handleChangeTitle}
              className="border border-amber-200"
            />
          </div>
          <button
            type="submit"
            className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
          >
            Edit post
          </button>
        </form>
      </Modal>
      <Modal isOpen={isOpenComment} onRequestClose={handleCloseModalComment}>
        <form
          onSubmit={(e) => handleSubmitEdit(e)}
          className="flex justify-between"
        >
          <div>
            <label htmlFor="commentContent">Comment content:</label>
            <textarea
              id="commentContent"
              type="text"
              placeholder="Enter content"
              value={commentContent}
              onInput={handleChangeTitle}
              className="border border-amber-200 w-full h-10 overflow-y-auto"
            />
          </div>
          <button
            type="submit"
            className="border border-b-gray-500 bg-gray-400 hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
          >
            Edit comment
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default Home;

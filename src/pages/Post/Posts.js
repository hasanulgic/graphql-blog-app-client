import React from "react";
import PostCard from "./PostCard";
import Home from "../Home/Home";
import { useQuery, gql } from "@apollo/client";

const GetPosts = gql`
  query Posts {
    posts {
      id
      title
      content
      published
      createdAt
      author {
        id
        name
        email
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GetPosts);
  //   console.log(data?.posts);

  return (
    <div>
      <Home />
      <h1 className="text-center font-bold text-5xl my-4 pb-4">Posts</h1>
      <hr />

      {loading && <p className="text-center font-bold mt-4">Loading...</p>}
      {error && (
        <p className="text-center font-bold mt-4">Error : {error.message}</p>
      )}

      <div className="flex justify-center sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4 2xl:gap-8">
          {data?.posts?.length > 0 &&
            data?.posts?.map((post) => <PostCard key={post?.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Posts;

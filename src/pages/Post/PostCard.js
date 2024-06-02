import React from 'react';
import './PostCard.css'

function formatDate(timestamp) {
  var date = new Date(timestamp);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  var formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
}

const PostCard = ({ post }) => {
    
  return (
    <div className="border w-full m-4 p-4 rounded-md border-black-400">
      <h3 className="text-lg font-bold">{post?.title}</h3>
      <div className="text-state-500 text-sm text-gray-700 flex justify-between py-2">
        <p>Author: {post?.author?.name}</p>
        <p>Date: {formatDate(Number(post?.createdAt))}</p>
      </div>
      <p className="text-sm text-gray-600">{post?.content}</p>
    </div>
  );
};

export default PostCard;
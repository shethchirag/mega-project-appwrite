import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ title, featureImage, $id }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl p-4 bg-gray-100">
        <div className="w-full  justify-center mb-4">
          <img
            className="rounded-xl"
            src={appwriteService.previewFile(featureImage)}
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

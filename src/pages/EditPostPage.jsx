import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appWriteService from "../appwrite/config";
import { PostForm, Container } from "../components";

function EditPostPage() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);
  return post ? (
    <div className="p-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPostPage;

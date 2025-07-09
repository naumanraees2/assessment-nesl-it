import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Feed() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async () => {
    const res = await fetch(`/feed?page=${page}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newPosts = await res.json();
    setPosts((prev) => [...prev, ...newPosts]);
    if (newPosts.length < 10) setHasMore(false);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post, idx) => (
        <div key={idx}>
          <p><strong>{post.author.name}</strong>: {post.content}</p>
        </div>
      ))}
      {!hasMore && <p>No more posts</p>}
    </div>
  );
}

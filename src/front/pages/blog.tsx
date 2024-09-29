import { useEffect, useState } from 'react';

interface BlogPost {
	id: number;
	authorNatural: number | null; // or your actual type
	authorLegal: string | null;    // or your actual type
	title: string;
	content: string;
	date: string; // or Date if you convert it to a Date object later
  }

  const Blog = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]); // Specify the type here
  
	useEffect(() => {
	  const fetchBlogPosts = async () => {
		const response = await fetch("http://localhost:3000/api/blogPosts");
		const data = await response.json();
		setPosts(data);
	  };
  
	  fetchBlogPosts();
	}, []);
  
	return (
	  <>
		<div className="p-6">
		  <h1 className="text-4xl font-bold mb-4">Blog</h1>
		  <div className="space-y-4">
			{posts.map((post) => (
			  <div key={post.id} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
				<h2 className="text-2xl font-semibold text-red-700">{post.title}</h2>
				<p className="text-gray-600 mb-2">{new Date(post.date).toLocaleDateString()}</p>
				<p className="text-lg text-gray-800">{post.content}</p>
			  </div>
			))}
		  </div>
		</div>
	  </>
	);
  };
  
  export default Blog;
  
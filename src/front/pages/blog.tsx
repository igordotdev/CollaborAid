import { useEffect, useState } from 'react';

interface BlogPost {
	id: number;
	authorLegal: number;
	title: string;
	content: string;
	date: Date;
  }

  interface Company {
	NIP: string;
	REGON: string;
	name: string;
	legalForm: string;
	address: string;
	dateOfStart: string;
	scopeOfActivities: string;
	mainValuesAndObjectives: string;
	latestProjects: string;
	contactNumber: string;
	contactEmail: string;
  }

  const Blog: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [company, setCompany] = useState<Company | null>(null);
  
	// Fetch the blog posts when the component mounts
	useEffect(() => {
	  const fetchBlogPosts = async () => {
		try {
		  const response = await fetch("http://localhost:3000/api/blogPosts");
		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
		  const data = await response.json();
		  console.log("Fetched Blog Posts:", data); // Log the fetched posts
		  setPosts(data); // Set the posts
		} catch (error) {
		  console.error("Error fetching blog posts:", error);
		}
	  };
	  fetchBlogPosts();
	}, []); // Only runs on initial render
  
	// Fetch company data when `posts` is updated and `authorLegal` is available
	useEffect(() => {
	  const checkAuthor = async () => {
		if (posts.length > 0 && posts[0].authorLegal) {
		  try {
			const response = await fetch(`http://localhost:3000/api/legalEntities?REGON=${posts[0].authorLegal}`);
			if (!response.ok) {
			  throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log("Fetched Company Data:", data); // Log the fetched company data
			setCompany(data);
		  } catch (error) {
			console.error("Error fetching company data:", error);
		  }
		} else {
		  console.warn("No posts or authorLegal available.");
		}
	  };
	  checkAuthor();
	}, [posts]); // Re-run when `posts` changes and is populated
  
	return (
	  <>
		<div className="p-6">
		  <h1 className="text-4xl font-bold mb-4">Blog</h1>
		  <div className="space-y-4">
		  {posts.length > 0 ? (
        posts.map((post) => (
			  <div key={post.id} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
				<h2 className="text-2xl font-semibold text-red-700">{post.title}</h2>
				<p className="text-gray-600 mb-2">{new Date(post.date).toLocaleDateString()}</p>
				<p className="text-lg text-gray-800">{post.content}</p>
				<p className="text-lg text-gray-800">{company?.name}</p>
			  </div>
			))):(<h2 className="text-2xl font-semibold text-red-700">No blog posts available.</h2>)}
		  </div>
		</div>
	  </>
	);
  };
  
  export default Blog;
  
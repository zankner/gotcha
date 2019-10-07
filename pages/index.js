import React from 'react';
import HomeProfileCard from "../components/HomeProfileCard";
import TaggedCard from "../components/TaggedCard";

const Home = () => (
	<>
		<HomeProfileCard />
		<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
			<TaggedCard />
			<TaggedCard />
		</div>
		<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
			<TaggedCard />
			<TaggedCard />
		</div>
	</>
);

export default Home;

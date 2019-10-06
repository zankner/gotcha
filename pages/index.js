import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swiper from 'react-id-swiper';
import HomeProfileCard from "../components/HomeProfileCard";
import TaggedCard from "../components/TaggedCard";

const Home = () => {
	return (
		<Layout header={true} footer={true} title={'Gotcha 2019 | Home'}>
			<HomeProfileCard />
			<TaggedCard />
		</Layout>
	);
};

export default Home;

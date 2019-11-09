import React from 'react';
import TagHistory from '../components/TagHistory';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import AchievementsCarousel from '../components/AchievementsCarousel';

const Stats = () => (
	<>
		<TagHistory />
		<PieChart />
		<BarChart />
		<AchievementsCarousel />
	</>
);

export default Stats;

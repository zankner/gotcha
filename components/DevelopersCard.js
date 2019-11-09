import React from 'react';

const DevelopersCard = props => {
	return (
		<div className={props.className}>
			<div className="card">
				<div className="card-header header text-uppercase">Developers</div>
				<div className="card-body">Ankner x Litvak x Botvinick</div>
			</div>
		</div>
	);
};

export default DevelopersCard;

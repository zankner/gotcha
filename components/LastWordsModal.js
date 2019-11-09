import React from 'react';
import LastWordsForm from './LastWordsForm'
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const LastWordsModal = props => (
	<div className="modal fade" id="lastWordsModal" tabIndex="-1" role="dialog" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title header text-uppercase">Last Words</h2>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
						props.history.push('/')
					}}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					<p className="text-muted">Enter some last words before tagging yourself out. Be careful; everyone can see these.</p>
					<LastWordsForm/>
				</div>
			</div>
		</div>
	</div>
);

export default compose(
	withRouter
)(LastWordsModal);
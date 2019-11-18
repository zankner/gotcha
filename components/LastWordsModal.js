import React from 'react';
import LastWordsForm from './LastWordsForm';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const LastWordsModal = props => (
	<div className="modal fade" id="lastWordsModal" tabIndex="-1" role="dialog" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title header text-uppercase">Last Words</h2>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
						props.history.replace('/');
						window.location.reload();
					}}><span aria-hidden="true">&times;</span></button>
				</div>
				<div className="modal-body">
					<p className="text-muted">
						Enter some last words before tagging yourself out.
						Keep it PG and <strong>do not expose your tagger or target</strong> or there will be consequences.
					</p>
					<LastWordsForm />
				</div>
			</div>
		</div>
	</div>
);

export default compose(
	withRouter
)(LastWordsModal);
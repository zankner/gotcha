import React from 'react';
import LastWordsForm from './LastWordsForm'

const LastWordsModal = () => (
	<div className="modal fade" id="lastWordsModal" tabIndex="-1" role="dialog" aria-hidden="true">
		<div className="modal-dialog modal-dialog-centered" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title header text-uppercase">Last Words</h2>
					<a href="/" type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</a>
				</div>
				<div className="modal-body">
					<p className="text-muted">Enter some last words before tagging yourself out. Be careful; everyone can see these.</p>
					<LastWordsForm/>
				</div>
			</div>
		</div>
	</div>
);

export default LastWordsModal
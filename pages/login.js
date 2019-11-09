import React from 'react';
import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';

const Login = () => (
	<Layout>
		<div className="container min-vh-100">
			<div className="row vh-100 pt-nav align-items-center">
				<div className="col py-auto justify-content-center">
					<div className="card p-4 p-md-4 mx-auto w-100 w-md-75 w-lg-50">
						<h1 className="font-weight-bold mb-3 text-center">Welcome to Gotcha</h1>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	</Layout>
);

export default Login;
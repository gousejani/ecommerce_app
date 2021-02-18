import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description}></meta>
			<meta name="keywords" content={keywords}></meta>
		</Helmet>
	)
}

Meta.defaultProps = {
	title: 'Welcome to Shopping Chesko',
	description: 'Buy best electronics at low cost',
	keywords: 'Electronics, Buy Electronics, Cheap electronics',
}
export default Meta

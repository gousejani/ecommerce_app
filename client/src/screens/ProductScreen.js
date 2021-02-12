import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match }) => {
	const product = products.find((p) => p._id === match.params.id);
	return (
		<Fragment>
			<Link className="btn btn-light my-3" to="/">
				{' '}
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroupItem>
							<h3>{product.name}</h3>
						</ListGroupItem>
						<ListGroupItem>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroupItem>
						<ListGroupItem>Price: &#x20B9; {product.price}</ListGroupItem>
						<ListGroupItem>Description: {product.description}</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>&#x20B9; {product.price}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? 'InStock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Add to Cart
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

ProductScreen.propTypes = {};

export default ProductScreen;

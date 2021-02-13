import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	ListGroupItem,
	Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)
	const dispatch = useDispatch()
	const productDetails = useSelector((state) => state.productDetails)

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}
	const { loading, error, product } = productDetails
	return (
		<Fragment>
			<Link className="btn btn-light my-3" to="/">
				{' '}
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
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
								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form>
													<Form.Control
														as="select"
														style={{ color: 'red', padding: '0.75rem 0rem' }}
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{' '}
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Form>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Button
										onClick={addToCartHandler}
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
			)}
		</Fragment>
	)
}

ProductScreen.propTypes = {}

export default ProductScreen

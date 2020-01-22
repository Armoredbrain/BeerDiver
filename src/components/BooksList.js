import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

export default function BooksList() {
	const [initialBooks, setInitialBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`https://api.openbrewerydb.org/breweries`)
			.then(res => {
				setInitialBooks(res.data);
			});
	}, []);

	return (
		<div>
			<Card.Group
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				{ initialBooks.map(book => (
					<Card key={book.id}>
						<Card.Content>
							<Card.Header>
								<h2>{book.name}</h2>
							</Card.Header>
						</Card.Content>
						<Link to={`/${book.id}`}>
						</Link>
					</Card>
				)) }
			</Card.Group>
		</div>
	)
}
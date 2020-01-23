import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Input } from 'semantic-ui-react';

export default function BeersList() {
    const [initialBeers, setInitialBeers] = useState([]);
    const [filteredBeers, setFilteredBeers] = useState([]);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState(false);

    useEffect(() => {
        axios
            .get(`https://api.punkapi.com/v2/beers`)
            .then(res => {
                setInitialBeers(res.data);
				setFilteredBeers(res.data);
				setStatus(true);
            });
    }, []);

    useEffect(() => {
        const beers = initialBeers.filter(element => element.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredBeers(beers);
    }, [query, initialBeers]);

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    return !status ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50%'
            }}
        >
            Loading...
        </div>
    ) : (
        <div>
            <Input
                placeholder='Search...'
                onChange={handleInputChange}
                style={{
                    marginBottom: '2%',
                }}
                value={query}
                icon fluid
            >
                <input/>
                <Icon name='search' />
            </Input>
            <Card.Group
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                { filteredBeers.map(beer => (
                    <Card key={beer.id}>
                        <Card.Content>
                            <Card.Header>
                                <h2>{beer.name}</h2>
                                <h3>{beer.tagline}</h3>
                                <br/>
                            </Card.Header>
                        </Card.Content>
                        <Link to={`/${beer.id}`}>
                            <Image src={beer.image_url} size='small' centered />
                        </Link>
                        <Card.Content extra>
                            <Icon name='search' />
                            <Link to={`/${beer.id}`}>
                                View details
                            </Link>
                        </Card.Content>
                    </Card>
                )) }
            </Card.Group>
        </div>
    );
}

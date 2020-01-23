import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function BeerDetail({match}) {
    const [beer, setBeer] = useState(null);

    useEffect(() => {
        axios
            .get(`https://api.punkapi.com/v2/beers/${match.params.id}`)
            .then(res => {
                setBeer(res.data[0]);
            });
    }, [match.params.id]);

    return !beer ? (
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
            <Card.Group
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
            >
                <Card>
                    <Card.Content>
                        <h2>{beer.name}</h2>
                        <Card.Meta>
                            <span>First brewed : {beer.first_brewed}</span>
                            <br/>
                            <span>PH : {beer.ph}</span>
                        </Card.Meta>
                        <h5>{beer.tagline}</h5>
                        <h4>Description</h4>
                        <p>{beer.description}</p>
                        <h4>Ingredients</h4>
                        { beer.ingredients.hops[0].name !== null &&
                            <div>
                                <h5>Hops</h5>
                                <List>
                                    { beer.ingredients.hops.map( (ingredient, index) =>
                                        <List.Item key={index.toString()}>
                                            <p><Icon name='adjust'/>{ingredient.name} : {ingredient.attribute}</p>
                                        </List.Item>)}
                                </List>
                            </div>
                        }
                        <br/>
                        {beer.ingredients.malt[0].name !== null &&
                            <div>
                                <h5>Malt</h5>
                                <List>
                                    {beer.ingredients.malt.map((ingredient, index) =>
                                        <List.Item key={index.toString()}>
                                            <p><Icon name='adjust'/>{ingredient.name}</p>
                                        </List.Item>)}
                                </List>
                            </div>
                        }
                        <h5>Yeast</h5>
                        <p><Icon name='adjust'/>{beer.ingredients.yeast}</p>
                        <h4>Brewer tips</h4>
                        <p>{beer.brewers_tips}</p>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='arrow left'/>
                        <Link to="/">Back to results</Link>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Image src={beer.image_url}/>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
}

BeerDetail.propTypes = {
  match: PropTypes.shape({
      params: PropTypes.shape({
          id:PropTypes.node,
      }).isRequired
  }).isRequired
};
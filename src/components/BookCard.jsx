import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

const BookCard = ({
        thumbnail,
        title,
        authors,
        description,
    }) => {
        
    // states
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card style={{ width: '250px', height: '100%' }} className='m-auto'>
            <CardImg
                top
                style={{ width: '100%', height: '250px' }}
                src={ thumbnail }
                alt='card image'
            />
            <CardBody>
                <CardTitle className='card-title'>{ title }</CardTitle>
                <CardText>Author 1: { authors[0] } </CardText>
                {authors.length === 2 ? <CardText>Author 2: { authors[1] } </CardText> : <span/>}
                {authors.length === 3 ? <CardText>Author 3: { authors[2] } </CardText> : <span/>}
                {!isOpen && <CardText className='card-description' onClick={() => setIsOpen(!isOpen)}>{ description }</CardText>}
                {isOpen && <CardText onClick={() => setIsOpen(!isOpen)}>{ description }</CardText>}
            </CardBody>
        </Card>
    );
};

export default BookCard;
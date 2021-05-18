import React from "react";
import {ListGroup, Table} from "react-bootstrap";



const AuthorData = ({author}) => {
    
    return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item><b>Full name</b>: {author.fullName}</ListGroup.Item>
                <ListGroup.Item><b>Citations count</b>: {author.citationsCount}</ListGroup.Item>
                <ListGroup.Item><b>Estimated citations count</b>: {author.estimatedCitationsCount}</ListGroup.Item>
                <ListGroup.Item><b>Affiliation name</b>: {author.affiliationName}</ListGroup.Item>
            </ListGroup>
            
        </div>
    );
}

export default AuthorData;

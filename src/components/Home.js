import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthorsTable from "./AuthorsTable/AuthorsTable";

const Home = () => {
    return (
        <Container>
                <AuthorsTable/>
        </Container>
    );
};

export default Home;
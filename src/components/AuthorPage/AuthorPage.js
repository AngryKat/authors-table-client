import React, {useEffect, useState} from "react";
import {
    useParams
} from "react-router-dom";
import JournalsTable from "./JournalsTable";
import AuthorData from "./AuthorData";

import "../styles.css";
import api from "../../utils/api";

const AuthorPage = () => {
    let { id } = useParams();

    const [papersList, setPapersList] = useState([]);
    const [authorData, setAuthorData] = useState(
        {
            "id": id,
            "msId": id,
            "citationsCount": 0,
            "estimatedCitationsCount": 0,
            "fullName": "",
            "publicationsCount": 0,
            "affiliationMsId": 0,
            "affiliationName": "",
            "papers": null
            
        });

    useEffect(() =>{
        const getAuthor = async (a_id) => {
            const data = await fetchAuthor(a_id);
            setAuthorData(data);
        }
        
        const getPapers = async (a_id) => {
            const data = await fetchPapers(a_id);
            setPapersList(data.papers);
            
        }

        getAuthor(id);
        getPapers(id);

    }, [])

    const fetchAuthor = async (a_id) => {
        let res = await api.get("authors/"+a_id);
        res = res.data;
        return await res;
    } 
    
    const fetchPapers = async (a_id) => {
        let res = await api.get("papers/byAuthor/"+a_id);
        res = res.data;
        return await res;
    }

    return (
        <div>
            <h4 className="basic-margin">Author info</h4>
            <div className="author-data basic-margin">
                <AuthorData author={authorData}/>
            </div>
            
            
            <h3>Papers list</h3>
            <p>Pablications count: {authorData.publicationsCount}</p>
            <div className="papers-table">
                <JournalsTable papers={papersList}/>
            </div>
        </div>
    );
    
}

export default AuthorPage;
import React, {useEffect, useState} from 'react';
import {Container} from "reactstrap";
import {Button, Dropdown, DropdownButton, ProgressBar, Spinner, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import SearchField from "react-search-field";
import {
   Link,
} from "react-router-dom";

import "../styles.css";
import DropDownMenu from "./DropDownMenu";
import api from "../../utils/api";




const Authors = () => {
    const [arrows, setArrows] = useState(["↕","↕","↕","↕"]);
    const [showLoader, setShowLoader] = useState(false);
    const [authorsList, setAuthorsList] = useState([]);
    const [totalPgs, setTotalPgs] = useState(1);
    const [activePage, setActivePage] = useState( 0 );
    const [sortingType, setSortingType] = useState( 0 );
    const [sortingOrder, setSortingOrder] = useState( 0 );
    const [searchName, setSearchName] = useState( "" );
    const [searchAffiliation, setSearchAffiliation] = useState( "" );

    const fetchAuthors = async (page, name, affil, order, sortType) => {

        let res = await api.get("/authors/all?page="+page
            +"&name="+name
            +"&affiliation="+affil
            +"&orderType="+order
            +"&sortingType="+sortType);

        res = res.data;
        return await res;
    }
    const rangeList = (list) => {
        for (let i = 0; i < list.length; i++){
            list[i].rate = i+1;
        }
        return list;

    }
    
    const getFullList = async () => {
        let init_list = await api.get("/authors/all");
        init_list = init_list.data;
        setTotalPgs(init_list.totalPages);
        for(let i = 1; i < totalPgs; i++) {
            let new_list = await api.get("/authors/all?page="+i);
            init_list.concat(new_list);
        }
        
        return rangeList(init_list);

    }
    
   
    

    const dropDownItems = [
        {
            "name":"by Hirsch",
            "onClick":() => rangeAuthors(1),
            "func":"Range"
        }
    ];
    
   
    useEffect(() =>{
        const getAuthors = async () => {
            const data = await fetchAuthors(activePage, searchName, searchAffiliation, sortingOrder, sortingType);
            setAuthorsList(rangeList(data.authors));
            //setAuthorsList(getFullList);
            setTotalPgs(data.totalPages);
          
        }
        
        getAuthors();

    }, [activePage, searchName, searchAffiliation,sortingOrder, sortingType, showLoader])
    
        
       
    
    const rangeAuthors = async (rangeType) => {
        
        setShowLoader(true);
        let payload = { rankingType: '1' };
        try{
            await api.post('authors/rank?rankingType='+rangeType, payload)
                .then(function(res){
                    console.log("ranged in secs:", res)
                    setShowLoader(false);
                });
        }
        catch(exception){
            console.log(exception)
        }
        
    }
   
    
    
    
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber.selected);
    };
    
    const searchClickName = (searchWord) => {
        setSearchName(searchWord);
        setActivePage(0);
    }
    const searchClickAffiliation = (searchWord) => {
        setSearchAffiliation(searchWord);
        setActivePage(0);
    }
    
    const handleSort= (sortType) => {
        console.log("sort clicked")
        setSortingType(sortType);
        const newOrder = 0+!sortingOrder;
        setSortingOrder(newOrder);
        changeArrows(sortType, newOrder);    
    } 
    
    
    const changeArrows = (n, order) => {
        let new_arrows = ["↕","↕","↕","↕"];
        switch(order){
            case 1: new_arrows[n] = "↓"; setArrows(new_arrows); break;
            case 0: new_arrows[n] = "↑"; setArrows(new_arrows); break;
            default: new_arrows[n] = "↕"; setArrows(new_arrows); break;
        }       
    }
    
    
  
    
    
    
    return (
        <Container className="pt-4">
                <h1 className="mb-4">Search authors</h1>
                <div className="flexbox-container search-bar bottom-line">
                    <label>Search by name:</label>
                    <SearchField
                        class="search_filed"
                        placeholder="Search..."
                        classNames="search-field"
                        onSearchClick={searchClickName}
                    />

                    <label>and/or affiliation:</label>
                    <SearchField class="search_filed"
                                 placeholder="Search..."
                                 classNames="search-field"
                                 onSearchClick={searchClickAffiliation}
                    />
                    

                </div>
                <DropDownMenu title="Range" items={dropDownItems}/>
            
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={totalPgs}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}

                />
                <Table className="table-fixed-layout">
                    <thead>
                    <tr>
                        <th> </th>
                        <th>Full name</th>
                        <th>Affiliation name</th>
                        <th onClick={() => handleSort(2)}>Citations count{arrows[2]}</th>
                        <th>Estimated citations count</th>
                        <th onClick={() => handleSort(1)}>Publications count{arrows[1]}</th>
                        <th onClick={() => handleSort(3)}>Range index{arrows[3]}</th>
                    </tr>
                    </thead>
                    <tbody>
                    { authorsList.length > 0 ?
                        authorsList.map((a,index) => (
                            <tr key={index}>
                                <td>
                                    {a.rate}
                                </td>
                                <td>
                                    <Link to={"/authors/"+a.id}>{a.fullName}</Link>
                                </td>
                                <td>
                                    {a.affiliationName}
                                </td>
                                <td>
                                    {a.citationsCount}
                                </td>
                                <td>
                                    {a.estimatedCitationsCount}
                                </td>
                                <td>
                                    {a.publicationsCount}
                                </td>
                                <td>
                                    {showLoader === false ? a.rankValue :<ProgressBar label="Ranging..." now={100} animated/>}
                                </td>
                            </tr>
                        )) : <ProgressBar now={100} animated/>
                    }
                    </tbody>
                </Table>
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={totalPgs}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}

                />
             
        </Container>
    );
}

export default Authors;
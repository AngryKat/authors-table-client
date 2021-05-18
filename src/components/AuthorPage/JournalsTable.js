import React from 'react';


import {ProgressBar, Table} from "react-bootstrap";
import "../styles.css";

const JournalsTable = ({papers}) => {
    return (
        <div>
            
            <Table className="table-fixed-layout">
                <thead>
                <tr  className="paper-header-row">
                    <th className="cell-largest">Title</th>
                    <th className="cell-large">Journal title</th>
                    <th className="cell-shrink">Publisher</th>
                    <th className="cell-shrink">Publication volume</th>
                    <th className="cell-shrink">Citations count</th> 
                    <th className="cell-shrink">Estimated citations count</th>
                </tr>
                </thead>
                {
                    papers.length > 0 ? papers.map((p,index) => (
                        
                       <tbody> <tr key={index}>
                            <td className="paper-cell">
                                "{p.title}"
                            </td>
                            <td>
                                "{p.journalTitle}"
                            </td>
                            <td>
                                {p.publisherName}
                            </td>
                            <td>
                                {p.publicationVolume}
                            </td>
                            <td>
                                {p.citationCount}
                            </td> 
                            <td>
                                {p.estimatedCitationCount}
                            </td>
                       </tr></tbody>
                    )) : <ProgressBar label="Loading..." now={100} animated/>
                }
            </Table>
        </div>
    );   
   


    
}

export default JournalsTable;
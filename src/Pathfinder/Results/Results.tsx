import React from 'react';
import './Results.css';

interface ResultsProps {
    resultArray: Array<any>;
    handleHover: Function;
}

function Results(props: ResultsProps) {
    return (
        <div className="results">
            <h3>Shortest routes found:</h3>
            <div className="resultsList">
                <ul>
                    {props.resultArray.map((result, index) => {
                        return <li key={index} onClick={ () => props.handleHover(index) }>{ index + 1 }</li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Results;
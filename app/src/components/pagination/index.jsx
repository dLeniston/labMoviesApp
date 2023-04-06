import React from "react";

const Pagination = ({ numOfPages, currPage, setCurrPage }) => {

    console.log("Num of pages: ", numOfPages);
    const pageNumbers = [...Array(numOfPages + 1).keys()].slice(1);

    const nextPage = () => {
        if(currPage !== numOfPages){
            setCurrPage(currPage + 1);
        }
    }

    const prevPage = () => {
        if(currPage !== 1){
            setCurrPage(currPage - 1);
        }
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" 
                        onClick={prevPage} 
                        href='#'>
                        
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrPage(pgNumber)}  
                            className='page-link' 
                            href='#'>
                            
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" 
                        onClick={nextPage}
                        href='#'>
                        
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
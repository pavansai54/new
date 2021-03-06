import React, { Fragment } from 'react'
import Styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import './images/mobile_black.png';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = Styled.nav`
background-color: ${(props) => props.bgColor};
color: ${(props) => props.color};
position: sticky;
top: 0px;
font-size: 20px;
padding: 8px;
text-align:${(props) => props.text};
`;
const LinkTag = Styled(Link)`
color:black;
text-decoration:none;
`;
const Table = Styled.table`
border-collapse: collapse;
border: 3px solid #ddd;
`;
const TableData = Styled.td`
border: 3px solid #ddd;
height:30px;
font-size:20px;
font-weight:bold;
padding:40px;
vertical-align:bottom;
text-align:left;
&:hover {background-color: grey;}
`;
const TableRow = Styled.tr`
border: 3px solid #ddd;
 &:nth-child(even){background-color: #F2F2F2;}
`;
    
export const HomePage = () => {

    return (
        
        <Fragment>
            <Navbar bgColor="grey" color="white" text="center">
                Home page
                    </Navbar>
            <Table>
                <TableRow>
                    <TableRow><TableData>
                    <LinkTag to={"/hr"} >HR </LinkTag></TableData></TableRow>
                    <TableRow><TableData> ACCOUNTING</TableData></TableRow>
                    <TableRow><TableData>
                        <LinkTag to={"/list"} >
                            EMOPLOYEE DIRECTORY
                             </LinkTag>
                    </TableData></TableRow>
                    <TableRow><TableData> CLIENT</TableData></TableRow>
                    
                    <TableRow ><TableData>
                
                        DOCUMENTATION
                        </TableData></TableRow>
                             
                </TableRow>
            </Table>
        </Fragment>
    )
}
import React, { Fragment, useState, } from 'react';
import Styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const Navbar = Styled.nav`
background-color: ${(props) => props.bgColor};
position: sticky;
top: 0px;
padding: 8px;
color: ${(props) => props.color};
font-size: 20px;
`;
const Break = Styled.br`
`;
const Button = Styled.button`
color:black;
background-color: powderblue;
height:27px;
margin-top: -3px;
font-size: 13px;
outline: none;
border: none;
width: 100px;
float: right;
border-radius: 5px;
&:hover {
opacity: 0.5;
`;
const Container = Styled.form`
display: flex;
justify-content: center;
align-items: center;
padding: 8px;
`;
const Table = Styled.table`
border-collapse: collapse;
border: 1px solid #ddd;
width: 100%;
padding: 20px;
`;
const TableRow = Styled.tr`
border: 1px solid #ddd;
&:nth-child(even){background-color: #F2F2F2;}
&:hover {background-color: #ddd;}
`;
const TableData = Styled.td`
border: 1px solid #ddd;
height: 30px;
vertical-align: bottom;
text-align:left;
`;
const TableHeading = Styled.th`
border: 1px solid #ddd;
height: 10px;
padding:8px;
text-align:left;
`;
const LinkTag = Styled(Link)`
color:black;
text-decoration:none;
`;
const Hover = Styled.a`
&:hover {
    color:blue;
`;
const Input = Styled.input`
border-radius:5px;
width:230px;
margin-left:57%;
height:25px;
font-size:15px;
`;


export const ListOfEmployee = () => {

    const { id} = useParams();

    const Show = gql`
{
    employeeList{
    id
    name
    code
    email
    role
    department
    joinedDate
    mobileNo
    }
  }`;

    const [empId, setEmpId] = useState({ 'idToDelete': "" });

    const DELETE_Employee = gql`
    mutation DeleteEmployee($id: String!){
    deleteEmployee(id: $id){
    respCode,
    respMessage 
  }
}
`;

    const { loading, error, data } = useQuery(Show);
    const [deleteMutation] = useMutation(DELETE_Employee);

    const handleDelete = (deleteId) => {
        if (window.confirm("Do you really want to leave?")) {
            setEmpId({ 'idToDelete': deleteId });
            console.log("handleDelte", deleteId, empId);
            deleteMutation({ variables: { id: deleteId } });

        }
        else {

        }
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;

    return (

        <Fragment>
            <Navbar bgColor="grey" color="white">
                List of Employee
                <Input type="text" placeholder="Search" ></Input>
                <Button >
                    <LinkTag to={"/adding"}>Add Employee</LinkTag>
                </Button>
            </Navbar>
            <Break />
            <Container>
                <Table>
                    <TableRow>
                        <TableHeading>ID</TableHeading>
                        <TableHeading>Name</TableHeading>
                        <TableHeading>Email</TableHeading>
                        <TableHeading>Role</TableHeading>
                        <TableHeading>Department</TableHeading>
                        <TableHeading>JoiningDate</TableHeading>
                        <TableHeading>MobileNumber</TableHeading>
                        <TableHeading>Edit</TableHeading>
                        <TableHeading>Delete</TableHeading>
                    </TableRow>

                    {data.employeeList.map((employee, id) => (
                        <TableRow>
                            {/* <a href=""> */}
                                <LinkTag to={`/display/${employee.id}`}>
                                    <Hover>
                                        <TableData key={id}>{employee.code}</TableData>
                                    </Hover>
                                </LinkTag>
                            {/* </a> */}
                            <TableData>{employee.name}</TableData>
                            <TableData>{employee.email}</TableData>
                            <TableData>{employee.role}</TableData>
                            <TableData>{employee.department}</TableData>
                            <TableData>{employee.joinedDate}</TableData>
                            <TableData>{employee.mobileNo}</TableData>

                            <TableData style={{ "text-align": "center" }} >
                                <LinkTag to={`/edit/${employee.id}`}>
                                    <FontAwesomeIcon icon={faEdit} ></FontAwesomeIcon>
                                </LinkTag>
                            </TableData>
                            <TableData style={{ "text-align": "center" }} >
                                <Button onClick={() => handleDelete(employee.id)} >
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </Button>
                            </TableData>
                        </TableRow>
                    )
                    )}
                </Table>
            </Container>
        </Fragment>
    )
}

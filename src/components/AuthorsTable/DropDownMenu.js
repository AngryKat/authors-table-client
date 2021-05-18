import React from 'react'
import {Button, Dropdown, DropdownButton} from "react-bootstrap";

const DropDownMenu = ({title, items}) => {
    return (
        <DropdownButton id="dropdown-basic-button" title={title}>
            {
                items.map((item) => (
                    <Dropdown.Item onClick={item.onClick}>{item.name}
                    </Dropdown.Item>
                ))
            }
           
        </DropdownButton>
    )
}

export default DropDownMenu;
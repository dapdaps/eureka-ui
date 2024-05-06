import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';

import { ArrowDown } from '../Arrow'
import Modal from "../Modal";
import Route from "../Route";

const ListWapper = styled.div`
    &>:not(:first-child) {
        margin-top: 10px;
    }
    height: 500px;
    overflow-y: auto;
`

interface Props {
    onClose?: () => void; 
}

export default function RouteModal({ onClose }: Props) {
    const [list, setList] = useState(Array.from({length: 10}))

    return <Modal title="Bridge Route" onClose={onClose}>
        <ListWapper>
        {
            list.map((item, index) => {
                return <Route onClick={() => {
                    
                }} showOutputTitle={false} key={index}/>
            })
        }
        </ListWapper>
        
    </Modal>
}
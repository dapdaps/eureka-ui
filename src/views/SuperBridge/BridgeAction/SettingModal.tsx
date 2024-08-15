import { useState, useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';

import { ArrowDown } from '../Arrow'
import Modal from "../Modal";
import { StyledContainer } from "@/styled/styles";

const ItemWapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 19.2px;
        color: #fff;
    }
    .select-wapper {
        position: relative;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
        color: #fff;
        .trigger {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            border-radius: 8px;
            border: 1px solid rgba(55, 58, 83, 1);
            height: 36px;
            padding: 0 10px;
            gap: 10px;
            white-space: nowrap;
            width: 140px;
        }
        .layer {
            position: absolute;
            top: 37px;
            left: 0;
            right: 0;
            padding: 5px 0;
            border-radius: 8px;
            background-color: rgba(46, 49, 66, 1);
            white-space: nowrap;
            .layer-item {
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                padding: 0 10px;
                &:hover {
                    background-color: rgba(36, 38, 52, 1);
                }
            }
        }
    }
`

const sorts = [{
    key: 1,
    name: 'Cheapest',
}, {
    key: 2,
    name: 'Fastest',
}]

interface Props {
    onClose?: () => void;
    routeSortType: number;
    onSortTypeChange: (val: number) => void;
}

export default function SettingModal({ onClose, routeSortType, onSortTypeChange }: Props) {
    const [layerShow, setLayerShow] = useState(false)
    const [sortList, setSortList] = useState(sorts)
    const [selectSort, setSelectSort] = useState(sorts[0])
    const domRef = useRef<any>(null)

    const docClick = useCallback((e: any) => {
        const isChild = domRef.current?.contains(e.target)
        if (!isChild) {
            setLayerShow(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', docClick, false)

        return () => {
            document.removeEventListener('click', docClick)
        }
    }, [])

    useEffect(() => {
        const selectSort = sortList.find(item => item.key === routeSortType)
        setSelectSort(selectSort!)
    }, [routeSortType, sortList])

    return <Modal title="Setting" top="19%" onClose={onClose}>
        <ItemWapper>
            <div className="title">Preference for Route</div>
            <div className="select-wapper" ref={domRef}>
                <div className="trigger" onClick={() => {
                    setLayerShow(true)
                }}>
                    <div>{ selectSort.name }</div>
                    <div>
                        <ArrowDown />
                    </div>
                </div>
                {
                    layerShow && <div className="layer">
                        {
                            sortList.map(item => {
                                return <StyledContainer key={item.key} data-bp="1005-001" onClick={() => {
                                    onSortTypeChange(item.key)
                                    setLayerShow(false)
                                }} className="layer-item">
                                    <div>{item.name}</div>
                                    {
                                        routeSortType === item.key && <div>
                                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 4L5 8L12 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round" />
                                            </svg>

                                        </div>
                                    }
                                </StyledContainer>
                            })
                        }
                    </div>
                }
            </div>
        </ItemWapper>
    </Modal>
}
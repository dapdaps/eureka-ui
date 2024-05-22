import { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import type { Token } from '@/types';

import bg from './bg.svg'

const Container = styled.div`
    flex: 1;
    cursor: pointer;
    .panel {
        height: 217px;
        border: 1px solid rgba(55, 58, 83, 1);
        background-color: rgba(46, 49, 66, 1);
        border-radius: 10px;
        padding: 10px 0;
        .token-desc {
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            line-height: 14.2px;
            text-align: center;
        }
        .bg {
            border: 1px solid rgba(55, 58, 83, 1);
            background-color: rgba(46, 49, 66, 1);
            border-radius: 10px; 
            background: linear-gradient(180deg, #0C0E1A 0%, #262836 100%);
            height: 154px;
            margin: 10px 10px;
        }
        .token-bg {
            width: 40px;
            height: 206px;
            background: url(${bg.src}) no-repeat 0 0;
            background-size: 100% 100%;
            margin: 10px auto 0;
            text-align: center;
            .token-icon {
                width: 30px;
                height: 30px;
                border-radius: 30px;
                margin: 65px auto 0;
            }
        }
    }
`


interface Props {
    token: Token
}

export default function Token({ token }: Props) {
    return <Container>
        <div className="panel">
            <div className="token-desc">
                <div>-</div>
                <div>{ token.symbol }</div>
            </div>
            <div className="bg">
                <div className="token-bg">
                    <img className="token-icon" src={token.icon} />
                </div>
            </div>
        </div>
    </Container>
}
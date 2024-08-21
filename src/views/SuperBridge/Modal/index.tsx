import { forwardRef } from 'react'
import styled from 'styled-components';

const Layer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: -100px;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 50;
    
`

const Container = styled.div<{ size?: number | string }>`
    position: absolute;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    background-color: rgba(38, 40, 54, 1);
    padding: ${({ size = 20 }) => `${size}px`};
    &.mid {
        left: 50%;
        top: 30%;
        z-index: 51;
        transform: translate(-50%, -50%);
        min-width: 468px;
        min-height: 100px;
    }
    &.right-bottom {
        right: 10px;
        bottom: 10px;
    }
`



const TitleWapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 18px;
        font-weight: 700;
        line-height: 21.6px;
        color: #fff;
    }
`

const CloseWapper = styled.div`
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: 20px;
`

const Content = styled.div<{ size?: number | string }>`
    padding-top: ${({ size = 20 }) => `${size}px`};
`

interface Props {
    width?: number | string;
    height?: number | string;
    onClose?: () => void;
    children?: any;
    title?: string | null | React.ReactNode;
    top?: string;
    paddingSize?: number | string;
    showLayer?: boolean;
    position?: string;
}

function Modal({
    width = 468, height, onClose, title, children, paddingSize = 20, top = '50%', position = 'mid', showLayer = true
}: Props, ref: any) {
    return <div>
        {
            showLayer && <Layer onClick={() => {
                onClose && onClose()
            }}/>
        }
        
        <Container className={ position } ref={ref} size={paddingSize} style={{ top, width }}>
            <CloseWapper onClick={() => {
                onClose && onClose()
            }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
                </svg>
            </CloseWapper>
            {
                title && <TitleWapper>
                    <div className="title">{title}</div>
                </TitleWapper>
            }
            <Content size={paddingSize}>
                {children}
            </Content>
        </Container>
    </div>
}

export default forwardRef(Modal)
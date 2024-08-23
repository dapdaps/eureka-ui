import styled from "styled-components";

const Wrapper = styled.div`
    margin: 0 20px;
    color: #EBF479;
    font-size: 160px;
    font-weight: 600;
    line-height: 192px;
    overflow: hidden;
`

const Track = styled.div`
    white-space: nowrap;
    animation: scoll 200s linear 0s infinite;  
    @keyframes scoll{  
        from{  
            transform: translateX(0);  
        }  
        to{  
            transform: translateX(-800%); 
        }  
    } 
`

const list = new Array(20).fill(1)

export default function Slogan() {
    return <Wrapper>
        <Track>
            {
                list.map(item => {
                    return <>DapDap Me Up! </>
                })
            }
        </Track>
    </Wrapper>
}
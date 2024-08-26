import styled from "styled-components"

const ParallelButton = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 5px;
        background: linear-gradient(180deg, #FFFFFF 0%, #999999 100%);
        border-radius: 4px;
        transform: skew(-20deg);
        height: 18px;
        text-align: center;
        min-width: 45px;
        max-width: 55px;
`

const StyleText = styled.div`
        display: inline-block;
        transform: skew(20deg);
        font-size: 12px;
        line-height: 12px;
        color: #000;
        font-weight: 700;
        text-transform: uppercase;
        max-width: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
`

const ParallelogramButton = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
  return (
    <ParallelButton className={className}>
       <StyleText>{children}</StyleText>
    </ParallelButton>
  )
}

export default ParallelogramButton
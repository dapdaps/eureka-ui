import styled from 'styled-components';

const Container = styled.div`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
`

export default function SubmitBtn() {
    return <Container>Bridge</Container>
}
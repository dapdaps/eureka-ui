const { checked, onCheck } = props

const CheckBoxWapper = styled.div`
    display: flex;
    align-items: center;
`

const CheckBox = styled.div`
    width: 17px;
    height: 17px;
    text-align: center;
    line-height: 17px;
    border-radius: 4px;
    border: 1px solid rgba(55, 58, 83, 1);
    background: #1B1E27;
    cursor: pointer;
    &.checked {
        background: #EBF479;
    }
`

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-left: 10px;
    color: rgba(151, 154, 190, 1);
`

return <CheckBoxWapper onClick={() => onCheck(!checked)}>
    {
        checked ? <CheckBox className="checked">
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.5974L3.8125 6.45454L9.18182 1" stroke="#1E2028" stroke-width="2" stroke-linecap="round" />
            </svg>
        </CheckBox> : <CheckBox />
    }
    <Label>I'm transferring to another address</Label>
</CheckBoxWapper>
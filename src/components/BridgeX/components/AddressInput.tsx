const AddressWapper = styled.div`
    margin-top: 16px;
`

const AddressLabelBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ValidateMsg = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: rgba(57, 161, 86, 1);
    &.in-valid {
        color: #FF547D;
    }
`

const InputWapper = styled.div`
    width: 446px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid rgba(55, 58, 83, 1);
    background: #1B1E27;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    margin-top: 10px;
    &.in-valid {
        border-color: #FF547D;
    }
`

const Input = styled.input`
    border: none;
    background-color: inherit;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    flex: 1;
    color: rgba(255, 255, 255, 1);
    &:focus {
        outline: none;
        border: none;
    }
`

const CloseIcon = styled.div`
    cursor: pointer;
`

State.init({

})

return <AddressWapper>
    <AddressLabelBox>
        <Widget
            src="dapdapbos.near/widget/Bridge.CheckBox"
            props={{
                checked: props.checked,
                onCheck: props.onCheck,
            }}
        />
        {
            props.checked && props.address.length > 0
                ? (
                    props.isValidAddress ?
                        <ValidateMsg>Valid address</ValidateMsg>
                        : <ValidateMsg className="in-valid ">Invalid address</ValidateMsg>
                ) : null
        }
    </AddressLabelBox>
    {
        props.checked ? <InputWapper
            className={props.address.length > 0 && !props.isValidAddress ? 'in-valid' : ''}>
            <Input value={props.address} placeholder="Custom recipient" onChange={e => {
                props.onChange && props.onChange(e.target.value)
            }} />
            {
                props.address.length > 0 ? <CloseIcon onClick={() => props.onChange && props.onChange('')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#303142" />
                        <path d="M11.206 10.0026L13.9859 7.22273C14.1948 7.0137 14.2305 6.71044 14.0656 6.54558L13.4595 5.93947C13.2945 5.77454 12.9917 5.81072 12.7823 6.01961L10.0027 8.79939L7.22288 6.01968C7.01385 5.81044 6.71058 5.77454 6.54565 5.93968L5.93953 6.54586C5.77467 6.71051 5.81036 7.01377 6.01967 7.2228L8.79956 10.0026L6.01967 12.7826C5.81071 12.9915 5.77453 13.2945 5.93953 13.4594L6.54565 14.0656C6.71058 14.2306 7.01385 14.1948 7.22288 13.9858L10.0028 11.2058L12.7824 13.9854C12.9917 14.1949 13.2946 14.2306 13.4595 14.0656L14.0656 13.4594C14.2305 13.2945 14.1948 12.9915 13.9859 12.7823L11.206 10.0026Z" fill="#979ABE" />
                    </svg>
                </CloseIcon> : null
            }
        </InputWapper> : null
    }
</AddressWapper>
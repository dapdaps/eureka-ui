import styled from "styled-components"
import IconMedal from '@public/images/odyssey/medal.svg'
const Wrapper = styled.div`
    background: linear-gradient(90deg, #898E46 0%, #EBF479 100%);
    position: relative;
    background-clip: padding-box;
    border: 1px solid transparent;
    height: 36px;
    border-radius: 24px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 0;
      margin: 1px;
      border-radius: 24px;
      background: rgba(16, 17, 21);
    }
    padding: 4px 16px;
    .label {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        font-size: 16px;
        position: relative;
        z-index: 2;
        color: #fff;
        span {
            margin-left: 8px;
        }
    }
`

const WrapperImg = styled.div`
    display: flex;
    align-items: center;
`

const MedalList = ({
    medals
}: {
    medals: any[]
}) => {

    if (!medals || medals.length === 0) {
        return null
    }

    return (
        <Wrapper>
            <div className="label">
                {
                    medals.map(() => (
                        <WrapperImg>
                            <IconMedal />
                        </WrapperImg>
                    ))
                }
                <span>{medals.length > 1 ? `${medals.length} Medals`: 'Mode Voyager Medal'}</span>
            </div>
        </Wrapper>
    )
}

export default MedalList

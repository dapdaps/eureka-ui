import { memo, useMemo } from "react";
import styled from "styled-components";

import { StyledContainer, StyledFlex, StyledFont } from "@/styled/styles";

import MedalCard from "./components/MedalCard";
import useMedalList from "./hooks/useMedalList";

const StyledLineGradientFont = styled(StyledFont)`
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 46px */
  text-transform: uppercase;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const StyledInnerContainer = styled.div`
  width: 1287px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 5;
`
const StyledMedalsContainer = styled.div`
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`
export default memo(function MedalsView() {
  const { loading, medalList } = useMedalList()

  const medalMapping = useMemo(() => {
    const _medalMapping: any = {}
    medalList.forEach(medal => {
      _medalMapping[medal?.category] = _medalMapping[medal?.category] || []
      _medalMapping[medal?.category].push(medal)
    })
    return _medalMapping
  }, [medalList])

  return (
    <StyledContainer style={{ paddingTop: 85 }}>
      <StyledInnerContainer>
        <StyledLineGradientFont>Medal Dashboard</StyledLineGradientFont>
        {
          Object.keys(medalMapping).map(key => {
            return (
              <StyledMedalsContainer key={key}>
                <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
                  <StyledFont color='#FFF' fontSize='20px' fontWeight='600' style={{ textTransform: 'capitalize' }}>{key.split("_").join(" ")}</StyledFont>
                </StyledFlex>
                <StyledFlex gap="30px 14px" flexWrap="wrap" style={{ width: '100%' }}>
                  {
                    medalMapping[key]?.map((medal: any, index: number) => {
                      return (
                        <MedalCard
                          key={key + '|' + index} medal={medal}
                          style={{
                            width: 311,
                            height: 150,
                          }}
                          nameStyle={{
                            fontSize: 16,
                          }}
                        />
                      )
                    })
                  }
                </StyledFlex>
              </StyledMedalsContainer>
            )
          })
        }
      </StyledInnerContainer>
    </StyledContainer>
  )
})
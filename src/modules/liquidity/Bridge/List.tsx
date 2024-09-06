import {
  ListWrapper,
  StyledEmptyTips,
  SvgIcon,
  Table,
  TBody,
  Td,
  TdTxt,
  Th,
  THead,
  Tr,
  TrWrapper
} from '../styles'
import type { ColumnType } from '../types'


export default function List(props: any) {

  const {
    from,

    toast,
    prices,
    refetch,
    dataList,
    curChain,
    // detailSrc,
    dataIndex,
    defaultDex,
    columnList,
    onChangeDataIndex,
    addresses,
    addAction,
    proxyAddress,
    userPositions,
    Detail,
    ICON_VAULT_MAP
  } = props

  function renderTD(data: any, column: ColumnType, index: number) {
    if (column.type === 'slot') {
      return column.render(data, index)
    }
    if (column.type === 'svg') {
      return (
        <SvgIcon>
          {data[column.key]}
        </SvgIcon>
      )
    }
    return (
      <TdTxt>{data[column.key]}</TdTxt>
    )
  }
  return (
    <ListWrapper>
      {
        <Table>
          <THead>
            {
              columnList.map((column: ColumnType, index: number) => {
                return (
                  <Th key={index} style={{ width: column.width }}>{column.label}</Th>
                )
              })
            }
          </THead>
          {dataList && dataList.length > 0 ? (
            <TBody>
              {dataList.map((data: any, index: number) => {
                return (
                  <TrWrapper key={data.id} className={[index === dataIndex ? 'active' : ''].join(' ')}>
                    <Tr onClick={() => onChangeDataIndex(index)} className={[index === dataIndex ? 'active' : ''].join(' ')}>
                      {
                        columnList.map((column: ColumnType, columnIndex: number) => {
                          return (
                            <Td key={index + columnIndex} className={column.direction === 'column' ? 'column' : ''} style={{ width: column.width }}>{renderTD(data, column, index)}</Td>
                          )
                        })
                      }
                    </Tr>
                    {index === dataIndex && (
                      <Detail
                        {...{
                          ...props,
                          data: dataList[dataIndex]
                          ,
                        }}
                      />
                    )}
                  </TrWrapper>
                )
              })}

            </TBody>
          ) : (
            <StyledEmptyTips>You didn’t add any liquidity yet</StyledEmptyTips>
          )}

        </Table>
      }
    </ListWrapper>
  )
}

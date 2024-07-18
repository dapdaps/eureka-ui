import chains from '@/config/chains';
import { formateValue } from '@/utils/formate';

export function formatTitle(record: any) {
  let tokens = [];
  try {
    tokens = JSON.parse(record.action_tokens);
  } catch (e) {
    tokens = eval(record.action_tokens);
  }

  if (record.action_type === 'Swap') {
    return (
      <>
        Swap <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span> {tokens[0]} to{' '}
        {tokens[1]}
      </>
    );
  }
  if (record.action_type === 'Bridge') {
    return (
      <>
        Bridge <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span> {tokens[0]}{' '}
        {chains[record.chain_id]?.chainName} to {chains[record.to_chain_id]?.chainName}
      </>
    );
  }
  if (record.action_type === 'Lending') {
    if (record.extra_data) {
      try {
        const parsedExtraData = JSON.parse(record.extra_data);
        const lendingActions = parsedExtraData?.lending_actions;
        if (lendingActions.length) {
          return lendingActions.map((action: any, i: number) => (
            <div key={i}>
              {action.type} <span style={{ color: '#979abe' }}>{formateValue(action.amount, 3)}</span>{' '}
              {action.tokenSymbol}
            </div>
          ));
        }
      } catch (err) {}
    }
    return (
      <>
        {record.action_title}
        {/* Supply <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span> {tokens[0]} on{' '}
        {record.template} */}
      </>
    );
  }

  if (record.action_type === 'Yield') {
    return (
      <>
        {record.action_title.split(' ').map((txt: any, index: number) => {
          return index === 1 ? (
            <span key={index}>
              <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span>
              {' ' + txt + ' '}
            </span>
          ) : (
            txt + ' '
          );
        })}
        {/* Yield <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]}{tokens[1] ? ' to' + tokens[1] : ''} on {record.template} */}
      </>
    );
  }

  if (['Liquidity', 'Deposit'].includes(record.action_type)) {
    try {
      const parsedExtraData = JSON.parse(record.extra_data || {});
      if (parsedExtraData.type === 'univ3') {
        return (
          <>
            {parsedExtraData.action}{' '}
            <span style={{ color: '#979abe' }}>{formateValue(parsedExtraData.amount0, 3)}</span> {tokens[0]} and{' '}
            <span style={{ color: '#979abe' }}>{formateValue(parsedExtraData.amount1, 3)}</span> {tokens[1]} on{' '}
            {record.template}
          </>
        );
      }
    } catch (err) {}
    const _actionType = record.action_title?.includes('Withdraw') ? 'Withdraw' : 'Deposit';
    return (
      <>
        {_actionType} <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span> {tokens[0]}-
        {tokens[1]}
      </>
    );
  }

  if (record.action_type === 'Staking') {
    try {
      const parsedExtraData = JSON.parse(record.extra_data || {});
      if (parsedExtraData && !record.action_title) {
        return (
          <>
            {parsedExtraData.action}{' '}
            {parsedExtraData.amount && (
              <>
                {' '}
                <span style={{ color: '#979abe' }}>{formateValue(parsedExtraData.amount, 3)}</span>{' '}
                {parsedExtraData.token}{' '}
              </>
            )}
            {parsedExtraData.amount0 && (
              <>
                {' '}
                <span style={{ color: '#979abe' }}>{formateValue(parsedExtraData.amount0, 3)}</span>{' '}
                {parsedExtraData.token0Symbol}{' '}
              </>
            )}
            {parsedExtraData.amount1 && (
              <>
                add <span style={{ color: '#979abe' }}>{formateValue(parsedExtraData.amount1, 3)}</span>{' '}
                {parsedExtraData.token1Symbol}
              </>
            )}
            on {record.template}
          </>
        );
      }
    } catch (err) {}
    const action = record.action_title.split(' ')[0];
    return (
      <>
        {action} <span style={{ color: '#979abe' }}>{formateValue(record.action_amount, 3)}</span> {tokens?.[0]} on{' '}
        {record.template}
      </>
    );
  }
  return <>{record.action_title}</>;
}

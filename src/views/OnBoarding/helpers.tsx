import chains from '@/config/chains';

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
        Swap <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]} to {tokens[1]}
      </>
    );
  }
  if (record.action_type === 'Bridge') {
    return (
      <>
        Bridge <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]}{' '}
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
              {action.type} <span style={{ color: '#979abe' }}>{action.amount}</span> {action.tokenSymbol}
            </div>
          ));
        }
      } catch (err) { }
    }
    return (
      <>
        Supply <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]} on {record.template}
      </>
    );
  }
  if (record.action_type === 'Staking') {
    return (
      <>
        {record.action_title.split(" ").map((txt: any, index: number) => {
          return index === 1 ? (
            <span key={index}>
              <span style={{ color: '#979abe' }}>{record.action_amount}</span>
              {" " + txt + " "}
            </span>
          ) : txt + " "
        })}
      </>
    );
  }

  if (record.action_type === 'Yield') {
    return (
      <>
        {record.action_title.split(" ").map((txt: any, index: number) => {
          return index === 1 ? (
            <span key={index}>
              <span style={{ color: '#979abe' }}>{record.action_amount}</span>
              {" " + txt + " "}
            </span>
          ) : txt + " "
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
            {parsedExtraData.action} {parsedExtraData.amount0} {tokens[0]} and {parsedExtraData.amount1} {tokens[1]} on{' '}
            {record.template}
          </>
        );
      }
    } catch (err) { }
    return (
      <>
        Deposit <span style={{ color: '#979abe' }}>{record.action_amount}</span> {tokens[0]}-{tokens[1]}
      </>
    );
  }
}

import { memo } from 'react';

import Item from './Item';
import { StyledContainer, StyledList,StyledTitle } from './styles';

const QA = () => {
  return (
    <StyledContainer>
      <StyledTitle>Q&A</StyledTitle>
      <StyledList>
        <Item
          title="How does it work?"
          icon="/images/shush/qa-1.svg"
          content={
            <>
              <div>
                With Shush Finance you can privately swap, send or bridge between cryptocurrencies on the same of
                different blockchains.
              </div>
              <div className="title3">Step 1 - Get Your Order Quote</div>
              <ul>
                <li>Select Crypto Pair: Pick the two tokens you want to Swap, Send, or Bridge from and to.</li>
                <li>
                  Enter Amount: Specify the crypto amount to transfer. Choose Fixed for a specific amount to be received
                  or Variable for best market-dependent rates.
                </li>
                <li>Price Optimized: Shush Finance automatically finds the lowest rates.</li>
                <li>No Wallet Connect: For enhanced security, you are not required to connect your wallet.</li>
              </ul>
              <div className="title3">Step 2 - Send Your Funds to Start</div>
              <ul>
                <li>
                  Receiving Wallet Address : Input the address of the receiving wallet, ensuring it&apos;s on the same
                  blockchain as the receiving currency.
                </li>
                <li>Initiate Order: Send the specified crypto amount to the Shush Finance address provided.</li>
              </ul>
              <div className="title3">Step 3 - Transaction Completion</div>
              <ul>
                <li>
                  Transaction Processing: Takes 20-40 minutes on average for Private Transactions and 3 minutes for
                  Semi-Private.
                </li>
                <li>Track Progress: Follow your transaction&apos;s progress once your transaction initiates.</li>
                <li>
                  Contact Support: Reach out to our Support Team for assistance by clicking the link below. Order ID:
                  Please provide your Order ID to help us quickly address your issue.
                </li>
              </ul>
            </>
          }
        />
        <Item
          title="How long do transactions take?"
          icon="/images/shush/qa-2.svg"
          content={
            <>
              <div>
                While private transactions typically take 20 to 40 minutes to complete, and semi-private less than 3
                minutes, the time taken varies depending on the type of transaction, tokens involved and other external
                factors. Here’s a detailed overview:
              </div>
              <div className="title3">Private Transactions</div>
              <ul>
                <li>Standard Duration: Typically, private transactions take between 20 to 40 minutes to complete.</li>
                <li>
                  Extended Timeframe: In certain cases, these transactions may take up to an hour. Factors influencing
                  this include the specific token pair selected and potential congestion on the respective blockchains.
                </li>
                <li>
                  Blockchain Influence: Transactions involving blockchains with a higher number of required
                  verifications, and hence longer confirmation times, may result in extended transaction durations.
                </li>
              </ul>
              <div className="title3">Semi-Private Transactions</div>
              <ul>
                <li>
                  Faster Processing: Semi-private transactions are generally quicker, taking less than 3 minutes to
                  complete.
                </li>
              </ul>
              <div className="title3">Support for Delayed Transactions</div>
              <ul>
                <li>Contact Support: Reach out to our Support Bot for assistance.</li>
                <li>Provide Order ID: Make sure to provide your Order ID to help us quickly address issue.</li>
              </ul>
            </>
          }
        />
        <Item
          title="What are Private Transactions?"
          icon="/images/shush/qa-3.svg"
          content={
            <>
              <div>
                Private transactions in crypto are transfers where only the sender can trace the transaction. They
                provide a secure way of transferring crypto with guaranteed privacy, protecting both sender and
                recipient from potential exposure and risks. Here are some key features:
              </div>
              <div className="title3">Sender Anonymity</div>
              <div>
                The sender&apos;s originating wallet address remains hidden and untraceable by the recipient or any
                external parties.
              </div>
              <div className="title3">Recipient Privacy</div>
              <div>The recipient receives funds without the sender’s wallet address being traceable on-chain.</div>
              <div className="title3">Untraceability</div>
              <div>
                Unlike regular crypto transactions that are public on the blockchain, our private transactions are
                untraceable, keeping the details confidential.
              </div>
              <div className="title3">Enhanced Security</div>
              <div>
                This untraceability guards against risks like phishing, fraud, or theft, as transaction details are not
                publicly exposed.
              </div>
              <div className="title3">Ideal Use Cases</div>
              <div>
                Beneficial for those requiring financial discretion, including individuals and businesses transacting
                with third parties.
              </div>
            </>
          }
        />
        <Item
          title="What are Semi-Private Transactions?"
          icon="/images/shush/qa-4.svg"
          content={
            <>
              <div>
                Semi-private transactions offer a balance of privacy and efficiency. They offer an efficient and
                moderately private alternative for crypto transfers, particularly useful in scenarios like cross-chain
                swaps.
              </div>
              <div className="mt-10">Here&apos;s a concise overview:</div>
              <div className="title3">Intermediate Privacy</div>
              <ul>
                <li>
                  These transactions are not directly traceable with a single transaction hash, providing more privacy
                  than public transactions. However, with enough technical skill and effort, the connection between
                  sender and receiver can be traced.
                </li>
              </ul>
              <div className="title3">Transaction Structure</div>
              <ul>
                <li>They involve a single exchange, making them simpler than fully private transactions.</li>
              </ul>
              <div className="title3">Use in Bridging</div>
              <ul>
                <li>
                  Commonly used for bridging (cross-chain swaps), where they facilitate efficient movement of
                  cryptocurrencies between different blockchains.
                </li>
              </ul>
              <div className="title3">Speed and Cost Advantages</div>
              <ul>
                <li>
                  Semi-private transactions are significantly faster, about 10 times quicker than private transactions.
                  They also come with lower fees, approximately 50% less than those of private transactions.
                </li>
              </ul>
              <div className="title3">Ideal for Efficiency and Moderate Privacy</div>
              <ul>
                <li>
                  These transactions strike a balance between faster transaction speeds, lower costs, and a degree of
                  privacy, making them suitable for users who prioritize efficiency but still require some level of
                  confidentiality.
                </li>
              </ul>
            </>
          }
        />
        <Item
          title="My order is marked as 'Completed,' but I haven't received the funds?"
          icon="/images/shush/qa-5.svg"
          content={
            <>
              <div>
                A &apos;Completed&apos; order status without fund receipt is usually due to network-related delays.
                Checking the transaction history through a blockchain scanner can clarify the situation. If the issue
                persists, our Support Team is ready to help resolve it promptly. Here’s how to proceed:
              </div>
              <div className="title3">Check for Pending Transaction</div>
              <ul>
                <li>
                  Network Congestion: Often, a spike in network gas fees during the transaction confirmation time can
                  cause delays.
                </li>
                <li>
                  Use Blockchain Scanners: To verify, use a blockchain scanner like Etherscan or BSCScan. Search your
                  receiving wallet address history and check for any transactions marked as &apos;pending&apos;.
                </li>
                <li>
                  Pending Transaction Indication: If there’s a pending deposit transaction, it’s likely a temporary
                  delay due to gas fee fluctuations and should resolve with time.
                </li>
              </ul>
              <div className="title3">No Pending Transaction Found</div>
              <ul>
                <li>
                  Contact Support: If your blockchain scanner search doesn’t show a pending deposit transaction, please
                  reach out to our Support Team for assistance by clicking the link below.
                </li>
              </ul>
            </>
          }
        />
        <Item
          title="What happens if I accidentally sent the wrong currency?"
          icon="/images/shush/qa-6.svg"
          content={
            <>
              <div>
                Sending the wrong currency doesn&apos;t mean your funds are lost. We can arrange for the return of your
                funds but please note that resolving such matters can potentially take up to 24 hours. Be assured, we
                are committed to ensuring the safety of your funds and resolving the issue promptly.
              </div>
            </>
          }
        />
        <Item
          title="What should I do if my transaction shows 'Order Expired' after sending?"
          icon="/images/shush/qa-7.svg"
          content={
            <>
              <div>
                If your transaction status shows &apos;Order Expired,&apos; rest assured that your funds are secure.
                We&apos;re committed to resolving any issues promptly and ensuring the security of your transactions at
                all times.
              </div>
            </>
          }
        />
        <Item
          title="What is the difference between Variable and Fixed rates?"
          icon="/images/shush/qa-8.svg"
          content={
            <>
              <div>
                Variable rates offer flexibility and are more cost-effective but come with rate uncertainty, while fixed
                rates provide stability at a slightly higher cost. The choice depends on your transaction&apos;s
                requirements.
              </div>
              <div className="mt-10">Here&apos;s a concise overview:</div>
              <div className="title3">Variable Rates</div>
              <ul>
                <li>
                  Flexible Estimates: These rates are subject to change during the transaction due to market
                  fluctuations and exchange slippage.
                </li>
                <li>
                  Best for Defined Send Amounts: Ideal for transactions where the sending amount is fixed, not the
                  receiving amount.
                </li>
                <li>
                  Cost-Effective: Generally lower than fixed rates, making them recommended for most transactions.
                </li>
              </ul>
              <div className="title3">Fixed Rates</div>
              <ul>
                <li>
                  Stable Pricing: Rates are locked in at the start of the transaction, unaffected by market changes
                  during the process.
                </li>
                <li>
                  Suitable for Precise Receiving Amounts: Recommended for transactions requiring a fixed receiving
                  amount, like invoice payments.
                </li>
                <li>
                  Higher Rates: Rates account for market volatility, therefore typically higher than variable rates.
                </li>
              </ul>
            </>
          }
        />
        <Item
          title="What fees are Shush Finance's fees?"
          icon="/images/shush/qa-9.svg"
          content={
            <>
              <div>
                Shush Finance’s fee structure is designed to be clear, inclusive, and cost-effective and is designed
                with you in mind. We do not charge direct fees, and our partnership with exchanges ensures competitive
                rates, often lower than going directly to the exchanges themselves. Our revenue model, based on
                commissions from exchanges, ensures that your rates remain unaffected.
              </div>
              <div className="title2">Here’s How It Works</div>
              <div className="title3">No Direct User Fees</div>
              <div>We charge no direct fees to our users.</div>
              <div className="title3">Fees by Exchange Partners</div>
              <div>
                Fees for individual transactions are set independently by each exchange partner, based on factors such
                as token liquidity, market volatility, transaction slippage, and network fees.
              </div>
              <div className="title3">All-Inclusive Quote</div>
              <div>
                The fee we quote is all-inclusive. This means it covers all exchange fees, network gas fees, and swap
                spreads.
              </div>
              <div className="title3">Exchange Partner Costs</div>
              <div>Costs such as network gas fees and swap spreads are incurred by our exchange partners.</div>
              <div className="title3">Competitive Rates</div>
              <div>
                Using Shush Finance will not cost you more than if you were to go directly to the exchanges. Due to our
                established relationships with exchange partners, you are likely to pay less in most circumstances.
              </div>
              <div className="title3">Commission Model</div>
              <div>
                Shush Finance receives an industry-standard commission from the exchange for routing your transaction.
                Importantly, this commission does not impact the rate you pay.
              </div>
              <div className="title3">No Hidden Charges</div>
              <div>
                We ensure that there are no hidden fees or additional charges beyond the all-inclusive rate provided.
              </div>
              <div className="title3">Transparent Fair Fees</div>
              <div>Our aim is to provide you clarity on fees and ensure a highly competitive pricing model.</div>
            </>
          }
        />
      </StyledList>
    </StyledContainer>
  );
};

export default memo(QA);

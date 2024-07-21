import FraxComponent from './frax-component';


const Frax = function (props: any) {
  const { setShow, token0, token1, handleAddMetaMask, gem, dapp, onSuccess } = props;
  console.log(token0);

  return (
    <FraxComponent
      componentProps={{
        gem,
        dapp,
        setShow,
        token0,
        token1,
        handleAddMetaMask,
        onSuccess
      }}
    />
  )
}
export default Frax
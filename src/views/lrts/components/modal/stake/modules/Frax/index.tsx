import FraxComponent from './frax-component';


const Frax = function (props: any) {
  const { setShow, token0, token1, dapp, onSuccess } = props;
  console.log(token0);
  
  return (
    <FraxComponent
      componentProps={{
        dapp,
        setShow,
        token0, 
        token1,
        onSuccess
      }}
    />
  )
}
export default Frax
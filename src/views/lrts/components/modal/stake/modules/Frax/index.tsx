import FraxComponent from './frax-component';


const Frax = function (props: any) {
  const { setShow, token0, token1 } = props;
  console.log(token0);
  
  return (
    <FraxComponent
      componentProps={{
        setShow,
        token0, 
        token1
      }}
    />
  )
}
export default Frax
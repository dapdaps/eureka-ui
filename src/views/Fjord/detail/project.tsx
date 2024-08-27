import styled from 'styled-components';

const StyledH1 = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 39px */
`;
const StyledH2 = styled.div`
  margin-top: 40px;
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
const SytledMain = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  .flex {
    display: flex;
  }
  .rounded-3xl{
    border-radius: 1.5rem;
  } 
  .backdrop-blur-\[100px\] {
    --tw-backdrop-blur: blur(100px);
    backdrop-filter: var(--tw-backdrop-blur)
  }
  .bg-big {
    background-image: linear-gradient(270deg,rgba(2,0,94,var(--tw-bg-opacity)) 0,rgba(156,138,255,var(--tw-bg-opacity)) 100%),linear-gradient(0deg,rgba(62,104,255,var(--tw-bg-opacity)),rgba(62,104,255,var(--tw-bg-opacity)))
  }
  .bg-opacity-\[0.03\] {
    --tw-bg-opacity: 0.03;
  } 
  .border-\[#3E68FF1A\]{
    border-color: #3e68ff1a;
  }
  
  .gap-2.5{
    gap: .625rem;
  } 
  .gp-6{
    padding: 1.5rem;
  }
  .h-fit{
    height: fit-content
  } 
  .w-full {
    width: 100%;
  } 
  .flex-col{
    flex-direction: column;
  } 
  .border{
    border-width: 1px;
  } 
  .p-6 {
    padding: 1.5rem
  }
  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem
  }
  .text-xl {
    font-size: 1.5rem;
    line-height: 1.333em;
    font-weight: 600
  }
  .font-bold {
    font-weight: 700
  }
  .text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
  }
  .break-all {
    word-break: break-all
  }
  .list-inside {
    list-style-position: inside
  }
  .list-disc {
    list-style-type: disc
  }

  .text-purple-300 {
    --tw-text-opacity: 1;
    color: rgb(159 162 255/var(--tw-text-opacity))
  }
`;
const StyledLi = styled.li``;
export default function Comp({ pool }: any) {
  return (
    <SytledMain dangerouslySetInnerHTML={{
      __html: pool?.info
    }} />
  );
}

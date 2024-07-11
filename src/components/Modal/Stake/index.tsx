import { lazy } from "react"
const Lido = lazy(() => import("./modules/lido"))
const Mantle = lazy(() => import("./modules/mantle"))
const RocketPool = lazy(() => import("./modules/rocket-pool"))
import {
  StyledModal,
  StyledOverlay,
  StyledModalBody,
} from './styles'

const ComponentMapping = {
  Lido,
  Mantle,
  RocketPool
}
const Index = function (props: any) {
  const VmComponent = ComponentMapping["Lido"]
  return (
    <StyledModal>
      <StyledOverlay />
      <StyledModalBody>
        <VmComponent />
      </StyledModalBody>
    </StyledModal>
  )
}
export default Index
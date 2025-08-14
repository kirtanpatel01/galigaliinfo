import ShowcasePage from '@/components/showcase/ShowcasePage'
import { shopData } from '@/constants/shopData'

function page() {
  return (
    <ShowcasePage type='self-pick-up' showcaseItems={shopData} />
  )
}

export default page
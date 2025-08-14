import ShowcasePage from '@/components/showcase/ShowcasePage'
import { shopData } from '@/constants/shopData'

function page() {
  return (
    <ShowcasePage type='shop' showcaseItems={shopData} />
  )
}

export default page
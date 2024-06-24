import { Card, Title, Flex, CategoryBar, Text } from '@tremor/react'

//Displays land distribution
//currently not functional
//will calculate land count vs. nonland count with array mapping by using type info

function LandProps() {
  return (
    <div>
      <Card>
        <Title>Land Proportions</Title>
        <Flex>
          <Text>Land-to-Nonland Ratio</Text>
          <Text>26/100</Text>
        </Flex>
        <CategoryBar
          categoryPercentageValues={[20, 4, 12, 4, 60]}
          colors={['rose', 'yellow', 'emerald', 'yellow', 'rose']}
          percentageValue={26}
          className="mt-3"
          tooltip="This shows the proportion of land in your deck, and a quick guide to indicate if there is too few or too many"
        />
      </Card>
    </div>
  )
}

export default LandProps

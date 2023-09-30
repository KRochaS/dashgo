'use client'

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import Chart from "react-apexcharts";

type tpXaxis = 'category' | 'datetime' | 'numeric'
const tpData: tpXaxis = 'datetime'

const series1 = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
 ]

 const options = {
    chart: {
       toolbar: {
          show: false,
       },
       zoom: {
          enabled: false,
       },
       foreColor: theme.colors.gray[500]
    },
    grid: {
       show: false,
    },
    dataLabels: {
       enabled: false,
    },
    tooltip: {
       enabled: false,
    },
    xaxis: {
       type: tpData,
       axisBorder: {
          color: theme.colors.gray[600]
       },
       axisTicks: {
          color: theme.colors.gray[600] 
       },
       categories: [
          '2023-09-29T00:00:00.000Z',
          '2023-09-30T00:00:00.000Z',
          '2023-10-01T00:00:00.000Z',
          '2023-10-02T00:00:00.000Z',
          '2023-10-03T00:00:00.000Z',
          '2023-10-04T00:00:00.000Z',
          '2023-10-05T00:00:00.000Z',
       ]
    },
    fill: {
       opacity: 0.3,
       type: 'gradient',
       gradient: {
          shade: 'dark',
          opacityFrom: 0.7,
          opacityTo: 0.3,
       }
    }
 }

export default function Dashboard() {
    return (
    <Flex direction="column" h="100vh">
         <Header />
        
        <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
            <Box
                  p={["4", "8"]}
                  bg="gray.800"
                  pb="4"
                  borderRadius={8}
                  h={'250px'}
               >
                 <Text> Inscritos da semana</Text>
                 <Chart type="area" height='160px' width={'100%'} series={series1} options={options} />
            </Box>

                <Box p="8" bg="gray.800" borderRadius={8}>
                    <Text> Taxa de abertura</Text>
                    <Chart type="area" height='160px' width={'100%'} series={series1} options={options} />
                </Box>
            </SimpleGrid>
        </Flex>
    </Flex>
     
    )
}
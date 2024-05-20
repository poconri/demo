'use client'

import { Http } from '@/app/providers/https'
import { GeoLocation, isGeoLocation } from '@/app/types/geo-location'
import { SimpleLayout } from '@/components/SimpleLayout'
import { AnimatedDiv } from '@/components/animated-div/animated-div'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

export default function Graphs() {
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    const https = new Http()

    try {
      const ipData = await https.get<GeoLocation>(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IPGEOLOCATION_API_KEY}`,
        isGeoLocation,
      )

	  const weatherData = await https.get(
		`/api/weather/weather?lat=${ipData.data?.latitude}&lon=${ipData.data?.longitude}&appid=${
			process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
		}`,
		(data): data is {} =>
			typeof data === 'object' &&
			data !== null
		)


      console.log(weatherData, 'response')
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <AnimatedDiv>
      <SimpleLayout
        title="Graphs"
        intro="Graphs are a way to visualize data in a way that is easy to understand.
				"
      ></SimpleLayout>
    </AnimatedDiv>
  )
}

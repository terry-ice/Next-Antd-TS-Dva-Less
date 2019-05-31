import React from 'react'
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from 'bizcharts'
import DataSet from '@antv/data-set'
const PriceChart: React.FunctionComponent = () => {
	const data = [
		{
			date: '2.30',
			京东: 4550,
			淘宝: 4580
		},
		{
			date: '4.12',
			京东: 4260,
			淘宝: 4679
		},
		{
			date: '4.28',
			京东: 4899,
			淘宝: 4666
		},
		{
			date: '5.10',
			京东: 7824,
			淘宝: 6999
		},
		{
			date: '5.25',
			京东: 5524,
			淘宝: 4899
		},
		{
			date: '6.11',
			京东: 5360,
			淘宝: 4830
		},
		{
			date: '6.26',
			京东: 5299,
			淘宝: 4999
		},
		{
			date: '7.13',
			京东: 4899,
			淘宝: 4599
		},
		{
			date: '7.31',
			京东: 4720,
			淘宝: 4600
		},
		{
			date: '8.15',
			京东: 4566,
			淘宝: 4500
		},
		{
			date: '8.31',
			京东: 5000,
			淘宝: 4800
		},
		{
			date: '9.10',
			京东: 4545,
			淘宝: 4420
		}
	]
	const ds = new DataSet()
	const dv = ds.createView().source(data)
	dv.transform({
		type: 'fold',
		fields: ['京东', '淘宝'],
		// 展开字段集
		key: 'from',
		// key字段
		value: 'price' // value字段
	})
	console.log(dv)
	const cols = {
		date: {
			range: [0, 1]
		}
	}
	return (
		<Chart height={400} data={dv} scale={cols} forceFit>
			<Legend />
			<Axis name="date" />
			{/* <Axis
                    name="price"
                    label={{
                        formatter: val => `${val}°C`,
                    }}
                /> */}
			<Tooltip
				crosshairs={{
					type: 'y'
				}}
			/>
			<Geom type="line" position="date*price" size={2} color={'from'} shape={'smooth'} />
		</Chart>
	)
}

export default PriceChart

// /components/Home/Home.js 页面组件
import React, { Fragment } from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import Layout from '../Layout'
const Home = () => (
	<Layout title="首页">
		<Fragment>
			<h1>Hello Next.js</h1>
			<Link href="/userList">
				<Button type="primary">用户列表页</Button>
			</Link>
		</Fragment>
	</Layout>
)
export default Home

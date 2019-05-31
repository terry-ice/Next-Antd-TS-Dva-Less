import React, { useState, useEffect } from 'react'
import Layout from '@/layouts/Layout'
import style from './Detail.less'

// import img from '@/assets/pro1.jpg'
import { Tag, Button, Icon, Tabs } from 'antd'
let PriceChart
if (process.browser) {
	PriceChart = require('../components/PriceChart/PriceChart').default
}

import { getSimGoods, getSearchResult } from '@/services/api'

const bg = { jd: '/static/jd.jpg', suning: '/static/suning.jpg' }

const TabPane = Tabs.TabPane
const Detail: React.FC = props => {
	const payload = {
		cid: '987594b8ad6f598dbbc034b218e2487c',
		size: 2000
	}

	const [simGoodsList, setSimGoodsList] = useState([])
	const [bijiaList, setBijiaList] = useState({})
	const [moreProVisibleList, setMoreProVisibleList] = useState<boolean[]>([])

	useEffect(() => {
		getSimGoods().then(res => {
			console.log(res)
			setSimGoodsList(res)
		})
		getSearchResult(payload).then(res => {
			let temp = {}
			for (const item of res.items) {
				temp[item.platform] = temp[item.platform] ? [...temp[item.platform], item] : [item]
			}
			console.log(temp)
			setMoreProVisibleList(new Array(Object.keys(temp).length).fill(false))
			setBijiaList(temp)
		})
	}, [])

	const tabChangeHandler = (key: string) => {
		console.log(key)
	}
	const showMorePro = (index: number) => {
		console.log(index)
		let temp = [...moreProVisibleList]
		temp[index] = !temp[index]
		setMoreProVisibleList(temp)
	}
	return (
		<Layout menuDrop={false}>
			<main>
				{/* 商品细节信息 */}
				<div className={style.proDetail}>
					<div className="layout">
						<h3 className={style.proDetailTitle}>
							<a href="">Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待</a>
						</h3>
						<div className={style.proDetailMain}>
							<div className={style.proDetailImg}>
								<a href="">
									<img src="/static/pro1.jpg" alt="" />
								</a>
							</div>
							<div className={style.proDetailInfo}>
								<div className={style.proDetailPrice}>
									<span>¥</span>
									<span className={style.priceAmount}>6999</span>
									<Tag style={{ background: '#fff', marginLeft: 10 }}>免邮</Tag>
								</div>
								<div className={style.proDetailTrendPrice}>价格走势：</div>
								{/* 图标根据服务端和客户端渲染而显示不同 */}
								<div className={style.proDetailTrend}>{!process.browser && <div>这是一个图标占位图</div>}</div>
								<div className={style.proDetailTrend}>{process.browser && <PriceChart />}</div>
								<div className={style.proDetailSrc}>
									<div>
										京东商城
										<Tag style={{ background: '#fff', marginLeft: 10 }}>自营</Tag>
									</div>
									<div style={{ marginTop: 10 }}>
										<span>
											<em>108</em>个商家比价>
										</span>
										<span style={{ marginLeft: 20 }}>
											全网销量<em>15966.6万</em>
										</span>
									</div>
								</div>
								<div className={style.proDetailBtn}>
									<Button
										size="large"
										style={{
											background: '#ff3366',
											color: '#fff',
											border: 'none'
										}}
									>
										去京东看看
									</Button>
									<Button
										size="large"
										style={{
											background: '#595959',
											color: '#fff',
											border: 'none',
											marginLeft: 50
										}}
									>
										同类热销商品
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 商家比价 */}
				<div className="layout">
					<div className={style.detailLayout}>
						<Tabs defaultActiveKey="1" onChange={tabChangeHandler}>
							<TabPane tab="商家比价" key="1">
								<div className={style.comparisonList}>
									{Object.keys(bijiaList).map((key, index) => {
										return (
											<div className={style.comparisonBox}>
												<div className={style.comparisonItem}>
													<div className={style.col1}>
														<a href="">
															<img src={bg[bijiaList[key][0].platform]} alt="" className={style.proImg} />
														</a>
													</div>
													<div className={style.col2}>
														<p className={style.proTitle}>
															<a href="">{bijiaList[key][0].title}</a>
														</p>
														<div className={style.proTag}>
															<Tag
																style={{
																	background: '#fff'
																}}
															>
																自营
															</Tag>
															<Tag
																style={{
																	background: '#fff'
																}}
															>
																免邮
															</Tag>
														</div>
													</div>
													<div className={style.col3}>
														<span className={style.proPrice}>¥{bijiaList[key][0].price}.00</span>
													</div>
													<div className={style.col4}>
														<div className="more_info">
															<span>货到付款</span>
															<br />
															<span>正规发票</span>
														</div>
													</div>
													<div className={style.col5}>
														<Button className={style.proBtn}>优惠购买</Button>
													</div>
													<Button className={style.moreProBtn} onClick={showMorePro.bind(this, index)}>
														{moreProVisibleList[index] ? '收起' : '展开'}
														更多商品
													</Button>
												</div>

												<div
													className={style.morePro}
													style={{
														display: moreProVisibleList[index] ? 'block' : 'none'
													}}
												>
													{bijiaList[key].slice(0).map(item => (
														<div className={style.comparisonItem}>
															<div className={style.col1}>
																<a href="">
																	<img src={bg[item.platform]} alt="" className={style.proImg} />
																</a>
															</div>
															<div className={style.col2}>
																<p className={style.proTitle}>
																	<a href="">{item.title}</a>
																</p>
																<div className={style.proTag}>
																	<Tag
																		style={{
																			background: '#fff'
																		}}
																	>
																		自营
																	</Tag>
																	<Tag
																		style={{
																			background: '#fff'
																		}}
																	>
																		免邮
																	</Tag>
																</div>
															</div>
															<div className={style.col3}>
																<span className={style.proPrice}>¥{item.price}.00</span>
															</div>
															<div className={style.col4}>
																<div className="more_info">
																	<span>货到付款</span>
																	<br />
																	<span>正规发票</span>
																</div>
															</div>
															<div className={style.col5}>
																<Button className={style.proBtn}>优惠购买</Button>
															</div>
														</div>
													))}
												</div>
											</div>
										)
									})}
								</div>
							</TabPane>
							<TabPane tab="商品参数" key="2">
								Content of Tab Pane 2
							</TabPane>
							<TabPane tab="商品评论" key="3">
								Content of Tab Pane 3
							</TabPane>
						</Tabs>
					</div>
				</div>

				{/* 相似商品 */}
				<div className={style.container}>
					<div className="layout">
						<div className={style.detailLayout} style={{ marginBottom: 20 }}>
							<div className={style.conTitle}>
								<h3>相似商品</h3>
							</div>
							<ul className={style.goodsList + ' clearfix'}>
								{simGoodsList.map(item => (
									<li key={item.key} className={style.goodsBox}>
										<a href="" className={style.goodsItem}>
											<img className={style.proImg} src={item['pic_url']} alt="" />
											<p className={style.proTitle} title={item.title}>
												{item.title}
											</p>
											<p className={style.proPrice}>
												¥<span>{item.price}</span>
											</p>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}
Detail.getInitialProps = async () => {
	// console.log(process.browser)
	return {}
}
export default Detail

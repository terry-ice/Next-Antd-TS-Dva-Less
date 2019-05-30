import React from 'react'
import { Carousel, Icon } from 'antd'
import style from './Index.less'
import Layout from '@/layouts/Layout'
// import banner from '@/assets/banner.jpg'
// import img1 from '@/assets/pro1.jpg'
// import img2 from '@/assets/pro2.jpg'
// import img3 from '@/assets/pro3.jpg'
// import img4 from '@/assets/pro4.jpg'
// import img5 from '@/assets/pro5.jpg'
// const imgArr = [img1, img2, img3, img4, img5]

const Index: React.FC = props => {
	return (
		<Layout menuDrop={true}>
			<main>
				<div className="banner">
					<div className="layout" style={{ textAlign: 'center' }}>
						<div className={style.indexTop}>
							<Carousel autoplay={true} className={style.slide}>
								<div>
									<h3>1</h3>
								</div>
								<div>
									<h3>2</h3>
								</div>
								<div>
									<h3>3</h3>
								</div>
								<div>
									<h3>4</h3>
								</div>
							</Carousel>
							<div className={style.indexBanner}>{/* <img src={banner} alt="" style={{ display: 'block' }} /> */}</div>
						</div>
					</div>
				</div>

				{/* 低价推荐栏 */}
				<div className={style.lowPriceCon}>
					<div className="layout">
						<div className={style.lowProTitle}>
							<div className={style.ProTitleLeft}>
								<h2 />
								<div className={style.tagList}>
									<span>
										<a href="">智能穿戴</a>
									</span>
									<span>
										<a href="">蓝牙耳机</a>
									</span>
									<span>
										<a href="">智能手机</a>
									</span>
								</div>
							</div>
							<a href="">
								<Icon type="plus" style={{ fontSize: '12px' }} />
								{'  '}更多
							</a>
						</div>
						<ul className={style.goodsList + ' clearfix'}>
							{[1, 2, 3, 4, 5, 6].map(item => (
								<li key={item} className={style.goodsBox}>
									<a href="" className={style.goodsItem}>
										<img className={style.proImg} src={'/static/pro1.jpg'} alt="" />
										<p
											className={style.proTitle}
											title="JBL E55BT 无线蓝牙耳机 头戴式耳机 手机耳机 HIFI音乐耳机
                                            游戏耳机"
										>
											JBL E55BT 无线蓝牙耳机 头戴式耳机 手机耳机 HIFI音乐耳机 游戏耳机
										</p>
										<p className={style.proPrice}>
											¥<span>1234</span>
										</p>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Index

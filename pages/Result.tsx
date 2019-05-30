import React, { useEffect, useState } from 'react'
import { Breadcrumb, Checkbox, Icon, Pagination } from 'antd'
import Layout from '@/layouts/Layout'
import style from './Result.less'
import * as api from '@/services/api'
import Box from './Box'
const Result = () => {
	const payload = {
		attribute: [],
		catId: [],
		page: 1,
		query: '手机',
		size: 40
	}
	const [catList, setCatList] = useState([])

	const [goodsList, setGoodsList] = useState([])
	useEffect(() => {
		// api.getCategory(442).then(res => {
		//     let temp = []
		//     temp = res.attrKeys
		//     for (const i of temp) {
		//         i.list = res.attrValues.filter(item => item.key_id === i.id)
		//     }
		//     console.log(temp)

		//     setCatList(temp)
		// })

		api.getSearchResult(payload).then(res => {
			console.log(res.items)

			setGoodsList(res.items)
		})
	}, [])
	return (
		<Layout menuDrop={false}>
			<main>
				<div className="layout">
					<Breadcrumb separator=">" style={{ margin: '15px 0' }}>
						<Breadcrumb.Item href="">全部商品分类</Breadcrumb.Item>
						<Breadcrumb.Item href="">手机通讯</Breadcrumb.Item>
						<Breadcrumb.Item href="">手机</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				{/* 搜索结果页分类列表 */}
				<div className={style.catList}>
					<div className="layout" style={{ borderTop: '1px solid #eaeaea' }}>
						{catList.map(cat => (
							<div key={cat.id} className={style.catLine}>
								<div className={style.catLeft}>
									<span>{cat.name}:</span>
								</div>
								<div className={style.catRight}>
									{cat.list.map(tag => (
										<span key={tag.id} className={style.attrValue}>
											<a href="">{tag.name}</a>
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={style.filterLabel}>
					<div className={'layout ' + style.filterLabelCon}>
						<div className={style.filterBarL}>
							<span className={style.filterActive}>综合排序</span>
							<span>销量</span>
							<span className={style.priceFilter} style={{ position: 'relative' }}>
								价格
								<Icon
									type="caret-up"
									style={{
										position: 'absolute',
										right: -18,
										top: -2,
										fontSize: 12
									}}
								/>
								<Icon
									type="caret-down"
									style={{
										position: 'absolute',
										right: -18,
										bottom: -2,
										fontSize: 12
									}}
								/>
							</span>
						</div>
						<div className={style.filterBarR}>
							<Checkbox>优惠券</Checkbox>
						</div>
					</div>
				</div>

				{/* 搜索结果列表 */}
				<div className={style.goodsList}>
					<div className="layout">
						<div className={style.goodsWrap}>
							{goodsList.map(item => (
								<Box product={item} key={item.key} />
							))}
							<Pagination style={{ margin: '10px auto' }} defaultCurrent={1} total={500} />
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Result
